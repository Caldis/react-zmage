# Contributing to react-zmage

感谢你愿意贡献。本文是给人类协作者的指南；AI Agent 协作者请优先阅读 [AGENTS.md](./AGENTS.md)。

## 目录
- [项目结构](#项目结构)
- [本地开发](#本地开发)
- [跑测试](#跑测试)
- [代码风格](#代码风格)
- [架构不变量](#架构不变量)
- [提 Issue](#提-issue)
- [发起 Pull Request](#发起-pull-request)
- [提交信息约定](#提交信息约定)

## 项目结构

pnpm + turbo 单仓多包：

```
packages/
  core/                  # ★ 发布到 npm 的 react-zmage 库
  home/                  # 演示站源码 (Vite)
  sandbox-r17/           # ┐
  sandbox-r18/           # ├ R17/18/19 真实 npm 消费者集成测试 (npm pack)
  sandbox-r19/           # ┘
docs/                    # 演示站构建产物 (GitHub Pages)
```

类型与默认值的 single-source-of-truth：
- [`packages/core/src/types/global.ts`](./packages/core/src/types/global.ts) — 所有 props 类型
- [`packages/core/src/types/default.ts`](./packages/core/src/types/default.ts) — 所有默认值与预设
- [`packages/core/src/index.ts`](./packages/core/src/index.ts) — 运行时导出

## 本地开发

需要 [pnpm](https://pnpm.io) 9.x 与 Node.js 18+。

```bash
git clone https://github.com/Caldis/react-zmage
cd react-zmage
pnpm install
pnpm dev          # 启动演示站, 默认 http://localhost:5173
```

修改 `packages/core` 后 home 应用会通过 workspace 链接热更新。

## 跑测试

| 命令 | 用途 |
|---|---|
| `pnpm test` | core 单元测试 (vitest + @testing-library/react，jsdom 环境) |
| `pnpm build` | 产出 dist/ (tsup 出 cjs/esm/iife + tsc 出 .d.ts) |
| `pnpm lint` | eslint + stylelint |
| `pnpm -w run check` | **完整跨版本兼容性测试**：build → pack → 强制重装 → R17/18/19 三套 sandbox 各自跑 strict tsc |

**任何会改动 `packages/core/src` 或 `packages/core/package.json` 的 PR，合入前必须能通过 `pnpm -w run check`。**

CI 会在 GitHub Actions 上分别跑 build job 和 sandbox-matrix job (R17/R18/R19 三组并行)。

## 代码风格

- TypeScript，所有源码已 `.tsx` / `.ts` 化
- ESLint + Stylelint 见仓库根的 `.eslintrc.js` / `.stylelintrc.js`
- 现有代码以 React 类组件为主（`React.Component<P, S>` + arrow methods）。新增内部组件可以是函数组件，但**不要在同一个 PR 里做大规模 class→function 迁移**——这是 2.0 级别的改动
- 缩进 2 空格，不带分号风格被现有代码混用，跟随就近文件
- 导入顺序：libs → components → utils → types（参考 `Zmage.tsx` 顶部）

## 架构不变量

下面这些是历史 PR 已经修过的坑，**新代码必须保持**，否则会回退到已知 bug：

1. **所有异步操作的句柄必须可取消并在 `componentWillUnmount` 中取消**。
   `requestAnimationFrame` / `setTimeout` / `setInterval` 都要存为实例属性，卸载时显式 cancel。否则 React StrictMode 双 mount/unmount 会泄漏监听器，并触发"setState on unmounted component"警告。
   - 参考：`Browser.tsx` 的 `initRaf` / `unInitTimer`、`Image.tsx` 的 `pendingRafHandles`、`Zmage.callee.tsx` 的 `inBrowsingRaf` / `outBrowsingTimer`

2. **`unInit({force: true})` 必须同步执行清理副作用**，不要把 `enableScroll` / `unlockTouchInteraction` / `removeEventListener` 等放在 `setState → setTimeout → setState` 链尾——卸载路径下 setState 会被丢弃，副作用永远跑不到。

3. **`packages/core/src/types/global.ts` 不能改回 `.d.ts`**。tsc 默认不 emit 源 `.d.ts`；改回去会让 dist 缺关键类型，下游消费者所有 prop 推断退化为 `any`。

4. **公共组件类型保持 callable + statics 形态，不要用 `ForwardRefExoticComponent` 交叉**。当前 `ReactZmageComponent = ((props) => JSX.Element | null) & { browsing, wrapper, ... }` 是有意为之，绕开了 `@types/react@18+` 的 `ReactPortal` 回归与 `defaultProps` 引发的 prop 推断丢失。改回 `ForwardRefExoticComponent` 会破坏 R18/R19 消费者的严格 JSX 检查。

5. **`react-dom/client` 必须通过运行时 `require` 获取，不能静态 `import`**。静态 import 会让 R16/17 消费方 bundler 报 "Module not found"。当前 `Zmage.callee.tsx` 的 `resolveMountAdapter()` 用 `require + try/catch` 平滑降级。

6. **`tsup.config.ts` 的 `external` 必须包含 `react`、`react-dom`、`react-dom/client`**。少一个会让 R18+ 的 mount 适配器无法在打包后被消费方解析。

详细技术背景可看对应的 PR commit message：
- `c38a936` PR-2 — StrictMode 清理
- `54ccaf2` PR-1 — .d.ts pipeline + 类型 refactor
- `46c744e` PR-3 — R18/19 mount adapter

## 提 Issue

[新建 Issue](https://github.com/Caldis/react-zmage/issues/new)。请尽量提供：

- React 版本（16/17/18/19）
- react-zmage 版本
- 浏览器与桌面/移动环境
- 最小可复现代码（CodeSandbox / StackBlitz 链接最佳）
- 期望 vs 实际行为

与"未规划但有意义"的方向也欢迎以 Issue 起讨论。已知规划见 [ROADMAP.md](./ROADMAP.md)。

## 发起 Pull Request

1. Fork → 建分支（建议 `feat/xxx` / `fix/xxx` / `docs/xxx`）
2. 改完代码 → `pnpm test` → `pnpm -w run check` 都过
3. 提交（见下方约定）
4. Push → 在 GitHub 上发起 PR 到 `master`
5. PR 描述请覆盖：
   - **改动动机**（解决什么问题 / 实现什么需求）
   - **方案要点**（关键设计决策与权衡）
   - **验证方式**（跑了哪些测试 / 在什么环境下手动验证）
   - 如果触及架构不变量，明确说明仍然遵守

## 提交信息约定

使用类似 [Conventional Commits](https://www.conventionalcommits.org/) 的简化形式：

```
<type>: <subject>

<body explaining why and what>
```

`<type>` 取值：
- `feat` — 新功能
- `fix` — 修 bug
- `docs` — 文档
- `chore` — 构建 / 工具 / 依赖
- `refactor` — 不改外部行为的重构
- `test` — 测试相关
- `perf` — 性能优化

Body 描述建议包含**为什么**而不仅仅是**做了什么**——README/ AGENTS.md 已经描述 what，commit message 应该解释 why。

跨多文件的功能性改动可以走 PR 编号（参考最近的 `PR-0 .. PR-4` 命名风格）。
