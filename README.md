# CYG Mall — 电商演示站

Next.js 15 (App Router) + Material UI 6 + framer-motion，中英双语 i18n，Mock 数据无后端，Vercel 一键部署，内置 AI 编程 harness（AGENTS.md）与评估质量门禁。

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:3000 → 自动跳转 /zh
```

## 功能

- **商品浏览与搜索**：首页推荐、分类筛选、关键词搜索、商品详情（SKU 规格、库存、数量步进器）
- **购物车**：Context + localStorage 持久化，数量修改 / 删除 / 合计
- **下单结算**：收货地址表单校验、Mock 在线支付、订单摘要、成功页
- **我的订单**：localStorage 持久化的订单列表
- **i18n**：`/zh` 与 `/en` 独立路由，顶栏一键切换，文案全部收敛在 `i18n/dictionaries.ts`

## 工程化（AI harness）

| 文件 | 作用 |
| --- | --- |
| `AGENTS.md` | 渐进式披露入口：路由表 + 分层约定 + 二级文档索引，AI 按需加载省 token |
| `AGENTS/quality-gate.md` | 质量门禁说明（评估工程规则） |
| `scripts/eval.mjs` | 评估脚本：typecheck → build → i18n 键完整性 → Mock 数据校验 → 路由覆盖 → 硬编码文案扫描 |
| `.github/workflows/quality-gate.yml` | CI 复用同一 `pnpm eval`，本地与 CI 口径一致 |

功能开发或修复的完成标准：`pnpm eval` 全绿。

## 部署到 Vercel

1. 推送到 GitHub；2. Vercel 导入仓库，Framework 选 **Next.js**，默认构建命令即可；3. 无环境变量（无后端）。CI 门禁会在 PR 上先行运行 `pnpm eval`。

## 技术栈

Next.js 15 · React 19 · MUI 6 · framer-motion · TypeScript(strict) · pnpm
