# Agents.md — CYG Mall

> 本文件是 AI 编程 harness 的**唯一稳定入口**。遵循「渐进式披露」原则：
> 先读本文件 → 按任务类型加载对应二级文档 → 仅在需要时再读源码。
> **不要一次性加载整个仓库文档**，按需取用以节省 token。

## 1. 项目一句话

Next.js (App Router) + MUI + framer-motion 的电商演示站（中英双语），Mock 数据、无后端、可一键部署 Vercel，附带评估质量门禁。

## 2. 路由表（先看这里再动代码）

| 路由 | 说明 | 文件 |
| --- | --- | --- |
| `/` | 重定向到 `/zh` | `app/page.tsx` |
| `/[locale]` | 首页（Hero + 推荐） | `app/[locale]/page.tsx` |
| `/[locale]/products` | 商品列表 / 搜索 / 分类 | `app/[locale]/products/page.tsx` |
| `/[locale]/products/[id]` | 商品详情（SKU/数量/加购） | `components/ProductDetailClient.tsx` |
| `/[locale]/cart` | 购物车 | `components/CartPageClient.tsx` |
| `/[locale]/checkout` | 结算（地址/支付 Mock） | `components/CheckoutClient.tsx` |
| `/[locale]/checkout/success` | 下单成功 | `app/[locale]/checkout/success/page.tsx` |
| `/[locale]/orders` | 订单列表 | `components/OrdersClient.tsx` |

## 3. 分层约定

- **数据层**：`data/products.ts`（商品 Mock）、`lib/orders.ts`（订单，localStorage 持久化）。改数据结构只动这两个文件。
- **i18n**：`i18n/config.ts`（locale 白名单）+ `i18n/dictionaries.ts`（全部文案）。**新增文案必须同时补 zh 与 en**，缺一会被 eval 拦截。
- **UI 层**：页面尽量是 Server Component，仅交互部分抽成 `components/*Client.tsx`（标注 `"use client"`）。
- **状态**：购物车为 `context/CartContext.tsx` + localStorage；不引入全局状态库。

## 4. 按需加载的二级文档

| 你要做的事… | 再读 |
| --- | --- |
| 新增页面/功能 | 本文件 §2、§3，及 `AGENTS/pages.md` |
| 改文案 / 加语言 | `i18n/dictionaries.ts` 顶部注释 + `AGENTS/i18n.md` |
| 修 Bug / 提 PR | `AGENTS/quality-gate.md`（必须先跑 `pnpm eval`） |
| 部署 | `README.md` §部署 |

## 5. 硬性规则（所有任务生效）

1. 包管理用 **pnpm**；类型必须过 `pnpm typecheck`。
2. 中文市场配色习惯与元素价格：**涨红跌绿**不适用本场景，价格用主题色 `primary.main`。
3. 任何新组件：优先 Server Component；需要 hooks 才加 `"use client"`。
4. 不引入后端；所有“接口”走 Mock + localStorage。
5. 提交前必须通过评估门禁：`pnpm eval`（见 §4 二级文档）。
