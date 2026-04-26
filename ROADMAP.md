# Roadmap

> 已知规划项与暂未解决的问题。
> 此文件中的条目欢迎以 [Issue](https://github.com/Caldis/react-zmage/issues) 或 [PR](https://github.com/Caldis/react-zmage/pulls) 推进。

状态约定：
- 🟢 **planned** — 已确定方向，等待实现
- 🟡 **investigating** — 需要先做技术调研或方案确认
- 🔴 **bug** — 已确认的缺陷，但暂时没有清晰修复路径

---

## 1.x 范围内（向后兼容）

### 🟢 按钮颜色 / 主题配置
**当前**：按钮颜色硬编码在 less 里。
**目标**：通过 CSS 变量或 props 暴露。
**位置**：`packages/core/src/components/Control/Control.module.less` + `Control.tsx`。

### 🟢 移动端拖拽翻页
**当前**：移动端翻页只能通过左右按钮（且默认隐藏）；上下拖拽用于退出。
**目标**：左右拖拽切换图片，类似 iOS Photos。
**位置**：`packages/core/src/components/Image/Image.tsx` 的 `handleTouchMove` / `Image.utils.ts` 的 `TouchProfile`。
**取舍**：需要与现有"上下拖拽 → 退出"的手势协同，避免方向冲突。

### 🟢 禁用移动端的滑动退出
**当前**：移动端始终响应上下拖拽退出，无法关闭。
**目标**：通过 prop 关掉，比如 `swipeToClose: false`。
**位置**：`Image.tsx` 的 `setTouchProfile` + 类型 `InterfaceAndInteractionParams`。

### 🔴 Safari 全屏模式下无法锁定滚动
**当前**：iOS Safari 在 fullscreen mode 下 `document.body.overflow = 'hidden'` 不生效，背景仍可滚动。
**位置**：`packages/core/src/utils/index.ts` 的 `lockTouchInteraction` / `disableScroll` 系列。
**调研方向**：可能需要监听 `touchmove` + `preventDefault`，或者用 `inert` 属性，或检测 fullscreen API 状态走不同分支。
**已用 workaround**：保留 FIXME 注释；目前没有干净的跨浏览器解。

---

## 2.0 范围（破坏性改动）

如果做 2.0，建议把以下打包到一次破坏中（避免多次破坏）。详见 [README.md](./README.md) 与 [Issues](https://github.com/Caldis/react-zmage/issues) 中的相关讨论。

### 🟡 类组件 → 函数组件 + Hooks
**收益**：与 React 18/19 习惯接轨；降低维护心智；让 ref/effect 清理逻辑更直观。
**风险**：完全重写 `Browser.tsx` / `Image.tsx` 两个核心容器；现有的 `getDerivedStateFromProps` + 实例属性句柄管理需要换成 `useRef` + `useEffect` 模式。要确保不丢架构不变量（见 [CONTRIBUTING.md](./CONTRIBUTING.md#架构不变量) §1-2）。

### 🟡 TypeScript 5 + 严格模式
**收益**：能用上 `satisfies`、`const` 类型参数、verbatimModuleSyntax；为 `@types/react@18+` 升级铺路。
**风险**：现有代码 `tsconfig.json` 只开了 `noImplicitAny`，开 `strict` 会暴露大量 `null`/`undefined` 处理缺漏。`Browser.tsx:54` 的 `context: ContextType` 等模式需要重写。

### 🟡 CSS / 样式分发现代化
**当前**：自定义 esbuild + less + postcss-modules 插件（见 [`tsup.config.ts`](./packages/core/tsup.config.ts)）。
**目标**：迁移到现代化方案（vanilla-extract / Linaria / 原生 CSS）或直接用 Vite 提供的能力。

### 🟡 用 `<dialog>` 元素重写遮罩层
**收益**：原生 focus trap、ESC 处理、a11y 友好（screen reader 自动识别 modal）。
**风险**：需要 polyfill 老浏览器；旧版 Safari 支持不全。

### 🟡 移除 CJS 产物，仅保留 ESM
**当前**：tsup 输出 cjs/esm/iife。
**收益**：包体减小约 1/3。
**风险**：仍有少量旧 webpack 4 / require-only 工具链消费者。

---

## 测试基础设施

### 🟢 跨 React 版本的运行时 smoke test
**当前**：sandbox-r17/r18/r19 只跑 strict tsc（类型层面），不跑实际渲染。
**目标**：在每个 sandbox 加最小 jsdom 渲染测试，验证 `Zmage.browsing()` 在对应 React 版本能正确 mount/unmount。
**优先级**：中。Type-check 已经能挡住绝大部分回归；运行时 bug 需要这一层来兜底。

### 🟡 浏览器 e2e (Playwright)
**目标**：在 `packages/home` 跑 Playwright，覆盖：
- 桌面：点击放大 → 快捷键缩放/翻页/旋转 → ESC 关闭 → 滚动锁定恢复
- 移动 viewport：触摸滑动翻页 → 上滑退出
- StrictMode 包裹下不泄漏监听器
**优先级**：低，等 1.x 稳定后再做。
