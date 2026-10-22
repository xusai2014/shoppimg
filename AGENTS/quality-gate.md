# AGENTS/quality-gate.md — 评估工程与质量门禁

任何功能开发或问题修复，**合入前必须通过质量门禁**：

```bash
pnpm typecheck   # 1. 类型检查：tsc --noEmit
pnpm build       # 2. 构建验证：next build（含静态渲染校验）
pnpm eval        # 3. 一键门禁：依次执行 1→2→自检脚本
```

`scripts/eval.mjs` 自检项（新增检查项在此登记）：

1. **i18n 完整性**：`dictionaries.ts` 中 zh / en 键集合必须完全一致（递归 diff）。
2. **商品数据完整性**：每个商品的每个 SKU 必须有 zh/en label；SKU priceDelta ≥ 0；stock > 0。
3. **路由覆盖**：`app/[locale]` 下的 page 文件与 Agents.md §2 路由表一一对应。
4. **i18n 硬编码扫描**：`app/`、`components/` 下禁止新增硬编码中文文案（正则 `[\u4e00-\u9fff]`，白名单：`dictionaries.ts`、`data/products.ts`）。

CI 端在 `.github/workflows/quality-gate.yml` 复用同一脚本，本地与 CI 门禁口径一致。

**失败怎么办**：eval 输出带 `[FAIL]` 行号定位；修复后重跑，全绿才算完成。禁止跳过门禁合码。
