#!/usr/bin/env node
/**
 * 评估 harness 质量门禁：typecheck → build → 静态自检
 * 用法: pnpm eval / npm run eval
 */
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
let failed = false;
const fail = (msg) => { failed = true; console.error(`[FAIL] ${msg}`); };
const ok = (msg) => console.log(`[PASS] ${msg}`);

// ---------- Step 1: typecheck ----------
try {
  console.log("→ typecheck (tsc --noEmit) ...");
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  ok("typecheck");
} catch { fail("typecheck 失败"); }

// ---------- Step 2: build ----------
try {
  console.log("→ build (next build) ...");
  execSync("npx next build", { stdio: "inherit" });
  ok("build");
} catch { fail("build 失败"); }

// ---------- Step 3: i18n 完整性 ----------
try {
  const src = readFileSync(join(root, "i18n/dictionaries.ts"), "utf8");
  const m = src.match(/export const dictionaries = (\{[\s\S]*?\n\}) as const;/);
  if (!m) throw new Error("cannot parse dictionaries");
  const dict = eval(`(${m[1]})`);
  const keys = (o, p = "") =>
    Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
  const zh = new Set(keys(dict.zh)), en = new Set(keys(dict.en));
  const onlyZh = [...zh].filter((k) => !en.has(k));
  const onlyEn = [...en].filter((k) => !zh.has(k));
  if (onlyZh.length || onlyEn.length) {
    fail(`i18n 键不一致 onlyZh=${onlyZh} onlyEn=${onlyEn}`);
  } else ok(`i18n 键完整（${zh.size} 项 zh/en 一致）`);
} catch (e) { fail(`i18n 解析: ${e.message}`); }

// ---------- Step 4: 商品数据完整性 ----------
try {
  const src = readFileSync(join(root, "data/products.ts"), "utf8");
  const skuMatches = [...src.matchAll(/sku\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*(-?\d+),\s*(\d+)\)/g)];
  if (skuMatches.length === 0) throw new Error("no skus found");
  for (const [, id, zh, en, delta, stock] of skuMatches) {
    if (!zh || !en) fail(`SKU ${id} 缺少双语 label`);
    if (+delta < 0) fail(`SKU ${id} priceDelta < 0`);
    if (+stock <= 0) fail(`SKU ${id} stock <= 0`);
  }
  ok(`商品数据完整（${skuMatches.length} 个 SKU 校验通过）`);
} catch (e) { fail(`商品数据解析: ${e.message}`); }

// ---------- Step 5: 路由覆盖 ----------
try {
  const expected = [
    "app/[locale]/page.tsx",
    "app/[locale]/products/page.tsx",
    "app/[locale]/products/[id]/page.tsx",
    "app/[locale]/cart/page.tsx",
    "app/[locale]/checkout/page.tsx",
    "app/[locale]/checkout/success/page.tsx",
    "app/[locale]/orders/page.tsx",
  ];
  const missing = expected.filter((p) => { try { statSync(join(root, p)); return false; } catch { return true; } });
  if (missing.length) fail(`路由缺失: ${missing}`);
  else ok(`路由覆盖完整（${expected.length} 条）`);
} catch (e) { fail(`路由检查: ${e.message}`); }

// ---------- Step 6: 硬编码中文扫描 ----------
try {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
      const p = join(dir, d.name);
      return d.isDirectory() ? walk(p) : [p];
    });
  const allow = (p) => /dictionaries\.ts$|data\/products\.ts$|Agents\.md$|AGENTS\//.test(p) || p.endsWith(".css") || p.endsWith(".md");
  const hits = [];
  for (const dir of ["app", "components", "context", "lib", "i18n"]) {
    for (const f of walk(join(root, dir))) {
      if (!/\.(tsx?|jsx?)$/.test(f) || allow(f)) continue;
      const lines = readFileSync(f, "utf8").split("\n");
      lines.forEach((l, i) => { if (/[\u4e00-\u9fff]/.test(l)) hits.push(`${f}:${i + 1}: ${l.trim().slice(0, 60)}`); });
    }
  }
  if (hits.length) fail(`发现硬编码中文文案:\n  ${hits.join("\n  ")}`);
  else ok("无硬编码中文文案");
} catch (e) { fail(`扫描: ${e.message}`); }

console.log(failed ? "\n✗ 质量门禁未通过" : "\n✓ 质量门禁全部通过");
process.exit(failed ? 1 : 0);
