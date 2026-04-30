[English](./README.md) | 简体中文

<div align="center">
  <a href="https://github.com/Caldis/react-zmage">
    <img width="150" height="150" src="docs/logo.png" alt="react-zmage logo">
  </a>

  <h1>react-zmage</h1>

  <p>
    把任意 <code>&lt;img&gt;</code> 变成全屏、可键盘导航的图片查看器。<br>
    即插即用，零配置，兼容 React 16.8 → 19。
  </p>

  <p>
    <a href="https://www.npmjs.com/package/react-zmage"><img alt="npm version" src="https://img.shields.io/npm/v/react-zmage.svg?style=flat-square&color=cb3837"></a>
    <a href="https://www.npmjs.com/package/react-zmage"><img alt="npm downloads/month" src="https://img.shields.io/npm/dm/react-zmage.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/react-zmage"><img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/react-zmage?style=flat-square"></a>
    <a href="#react-兼容性"><img alt="React 16.8 — 19" src="https://img.shields.io/badge/react-16.8%E2%80%9319-61dafb?style=flat-square"></a>
    <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square"></a>
  </p>

  <p>
    <a href="https://zmage.caldis.me">在线 Demo</a> ·
    <a href="https://zmage.caldis.me/playground">参数调试台</a> ·
    <a href="#api">API</a> ·
    <a href="./AGENTS.md">AGENTS.md</a>
  </p>
</div>

---

## 特性

- **`<img>` 即插即用替换**。原生属性（`className`、`style`、`onClick` 等）全部透传到底层 `<img>`，不需要额外的 portal 或状态管线。
- **SSR / RSC 安全**。提供独立的 `react-zmage/ssr` 入口，import 阶段不会触碰 `document`。已在 Next.js 15 App Router、Vite SSR、Express renderToString 上验证。
- **三种调用方式**。可作为组件、命令式调用（`Zmage.browsing()`），或包裹任意 HTML 子树自动给内部所有 `<img>` 接上查看器。

---

## 安装

```bash
pnpm add react-zmage    # 或: npm i react-zmage / yarn add react-zmage
```

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

<Zmage src="/photo.jpg" alt="风景" />
```

Peer deps：`react@>=16.8 <20`、`react-dom@>=16.8 <20`。库内部用运行时 feature detection 自动选择 mount API（React 18+ 用 `react-dom/client`），消费方无需配置。

---

## 三种调用方式

react-zmage 通过三种调用方式暴露相同的配置接口。**选哪种取决于你对页面 HTML 的控制程度。**

### 组件 — 默认方式

**何时使用：** 你完全控制要渲染的 JSX 时。这是最干净的路径，优先选这个。

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

export default function Gallery() {
  return <Zmage src="/photo.jpg" alt="风景" />
}
```

所有原生 HTML 属性（`className`、`style`、`onClick`、`loading` 等）都会按原样转发到内部 `<img>`。

### 命令式 — `Zmage.browsing()`

**何时使用：** 你没有合适的封面 `<img>`，或者不希望在组件树里多挂载节点。从事件处理器、第三方回调、异步流程等任意位置弹出查看器。

```tsx
import Zmage from 'react-zmage'

function Trigger() {
  return (
    <button onClick={() => Zmage.browsing({ src: '/photo.jpg' })}>
      打开查看器
    </button>
  )
}
```

`Zmage.browsing(opts)` 接受与 `<Zmage>` 完全相同的 props，并返回一个 `() => void` 的 destructor 函数（用于手动关闭）。

> 如果可能在服务端代码路径中执行，记得加 `typeof window !== 'undefined'` 保护。`react-zmage/ssr` 入口提供同样的 API，import 时不触碰 `document`。

### 包裹器 — `<Zmage.Wrapper>`

**何时使用：** 渲染出的 HTML 不在你的控制之内时 —— markdown 输出、CMS 富文本、`dangerouslySetInnerHTML`。把这棵子树整个包起来，内部所有 `<img>` 自动获得查看能力，无需修改原始内容。

```tsx
<Zmage.Wrapper backdrop="#0a0a0a">
  <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
</Zmage.Wrapper>
```

包裹器会在 `componentDidMount` / `componentDidUpdate` 期间查找子节点中的 `<img>`。包裹器渲染之后再注入的图片，需等到包裹器重新渲染时才会被绑定。

包裹器模式下的参数范围：

- `src` / `alt` 应放在子级 `<img>` 上。顶层 `src` / `alt` 会被点击的 DOM 节点覆盖。
- 查看器配置仍然写在 `<Zmage.Wrapper>` 上：`preset`、`controller`、`hotKey`、`animate`、`backdrop`、`zIndex`、`radius`、`edge`、`loop`、`coverVisible`、`hideOnScroll`、`hideOnDblClick`、`loadingDelay` 和生命周期回调。
- 需要让包裹区内图片作为共享图库时传 `set`。若被点击图片的 `src` 出现在 `set` 中，Wrapper 会打开匹配索引；`defaultPage` 只作为兜底。
- 不传 `set` 时，被点击图片按单图打开。`data-zmage-caption` 或最近的 `figcaption` 可作为查看器 caption。
- 受控态 `browsing` 属于组件模式，不能控制 `<Zmage.Wrapper>`。

<details>
<summary><strong>TypeScript</strong></summary>

```tsx
import Zmage from 'react-zmage'
import type { BaseType } from 'react-zmage'
import { useRef } from 'react'

const config: BaseType = {
  src: '/photo.jpg',
  alt: '示例',
  onBrowsing: (state) => console.log('browsing:', state),
}

const ref = useRef<HTMLImageElement>(null)
return <Zmage {...config} ref={ref} />
```

`BaseType` 是所有 props 的并集类型。子类型 `ControllerSet` / `HotKey` / `Animate` / `Set` / `Preset` / `AnimateFlip` 也都从 `react-zmage` 导出。

</details>

<details>
<summary><strong>SSR / RSC（Next.js、Remix）</strong></summary>

```tsx
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
```

API 完全一致，仅 import 路径不同。SSR 产物为 platform-neutral，避免在模块加载阶段引用浏览器 API。已在 Next.js 15 App Router (`packages/sandbox-nextjs`) 与 Express + Vite renderToString (`apps/demo-ssr`) 上验证。

</details>

---

## API

> 所有 props 都由单一的 `BaseType` 暴露。`<Zmage>` 与 `Zmage.browsing()` 接受同样的参数对象。

### 数据

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `src` | `string` | — | 图片 URL，等同于 `<img>` 的 `src`。 |
| `alt` | `string` | `''` | 图片标题，查看模式时显示在大图上方。 |
| `caption` | `string \| { text: string; style?: CSSProperties; className?: string }` | `''` | 大图下方的辅助文案。string 形式取默认胶囊样式；对象形式可通过 `style` / `className` 覆盖样式或主题化。多图模式下可由 `set[i].caption` 单独覆盖。 |
| `set` | `Set[]` | `[]` | 多图集合，传入后启用浏览模式（左右键翻页）。在包裹器模式下，传 `set` 表示包裹区内图片属于同一个共享图库；若被点击图片的 `src` 出现在 `set` 中，会打开匹配索引。 |
| `defaultPage` | `number` | `0` | `set` 非空时的初始页索引（从 0 开始）。在包裹器模式下它只作为兜底；被点击图片能匹配 `set[i].src` 时，以匹配索引为准。 |

### 预设

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `preset` | `'desktop' \| 'mobile' \| 'auto'` | `'desktop'` | 端预设。决定 `controller` / `hotKey` / `animate` 的默认值集合。`'auto'` 走 CSS media query `(pointer: coarse) and (hover: none)` 判定：满足则取 mobile 默认，否则 desktop；SSR / 无 `matchMedia` 环境 fallback 到 desktop。 |

### 功能控制

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `controller` | `boolean \| ControllerSet` | preset 决定 | 顶部工具栏按钮显隐。传 `false` 关闭整组，或传部分对象单独覆盖。 |
| `hotKey` | `boolean \| HotKey` | preset 决定 | 键盘快捷键开关。 |
| `animate` | `boolean \| Animate` | preset 决定 | 浏览动画 + 翻页动画。 |

#### `ControllerSet`

```ts
interface ControllerSet {
  pagination?:  boolean | ReactNode             // 多页指示器
  zoom?:        boolean | string | ReactNode    // 缩放按钮
  download?:    boolean | string | ReactNode
  close?:       boolean | string | ReactNode
  rotate?:      boolean | string | ReactNode    // 组合开关，覆盖 rotateLeft + rotateRight
  rotateLeft?:  boolean | string | ReactNode
  rotateRight?: boolean | string | ReactNode
  flip?:        boolean | string | ReactNode    // 组合开关，覆盖 flipLeft + flipRight
  flipLeft?:    boolean | string | ReactNode
  flipRight?:   boolean | string | ReactNode
}
```

> `rotate` 与 `flip` 是组合开关 —— 启用 umbrella 时同时强制开启对应的两侧按钮，覆盖单侧标志。

#### 预设的默认值

| 字段 | desktop | mobile |
|---|---|---|
| `pagination` | ✅ | ✅ |
| `rotate` | ✅ | — |
| `zoom` | ✅ | — |
| `download` | — | — |
| `close` | ✅ | ✅ |
| `flip` | ✅ | — |

#### `HotKey`

```ts
interface HotKey {
  close?:    boolean   // ESC 关闭
  zoom?:     boolean   // 空格切换 1:1 缩放
  flip?:     boolean   // ←/→ 翻页 (umbrella)
  flipLeft?: boolean
  flipRight?: boolean
}
```

桌面端默认全开；移动端默认全关。

#### `Animate`

```ts
interface Animate {
  browsing?: boolean
  flip?:     'fade' | 'crossFade' | 'swipe' | 'zoom' | 'none'
}
```

默认值：desktop = `{ browsing: true, flip: 'crossFade' }`，mobile = `{ browsing: true, flip: 'swipe' }`。`flip: 'none'` 跳过相邻页渲染 —— 翻页瞬间替换，无过渡。

### 界面交互

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `hideOnScroll` | `boolean` | `true` | 滚动时是否自动关闭查看器（仅桌面端）。 |
| `hideOnDblClick` | `boolean` | `false` | 双击图片时是否自动关闭查看器。默认关闭；启用后浏览态双击图片即退出。 |
| `coverVisible` | `boolean` | `false` | 放大期间是否保留封面图（默认会隐藏避免动画穿帮）。 |
| `backdrop` | `string` | `'#FFFFFF'` | 查看器背景色，接受任何合法 CSS color / gradient。**默认白色** —— 深色站点请显式覆盖（例如 `'#111'`）。 |
| `zIndex` | `number` | `1000` | Portal 容器的 `z-index`。 |
| `radius` | `number` | `0` | 查看模式下图片圆角 (px)。 |
| `edge` | `number` | `0` | 图片距屏幕边缘的留白 (px)。 |
| `loop` | `boolean` | `true` | 多图模式：尾页是否循环回首页。 |
| `loadingDelay` | `number` | `200` | Loading 指示器显示前的延迟 (ms)。在此期间内图片加载完成则不显示 loading，避免快速切换缓存图时的视觉闪烁。默认 200ms (业界 react-loadable 经典值)；设为 0 = 立即显示 (旧行为)。 |

### 生命周期

| 配置项 | 签名 | 触发时机 |
|---|---|---|
| `onBrowsing` | `(isBrowsing: boolean) => void` | 进入 / 退出查看模式 |
| `onZooming` | `(isZooming: boolean) => void` | 1:1 缩放切换 |
| `onSwitching` | `(page: number) => void` | 翻页时回传新页码 |
| `onRotating` | `(deg: number) => void` | 旋转时回传当前角度 |
| `onError` | `(e: SyntheticEvent<HTMLImageElement>) => void` | 封面 **或** 浏览层图片加载失败（封面仍同步走原生 `<img>` `onError` 透传；本回调是观察浏览层失败的唯一入口） |

### 受控

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `browsing` | `boolean` | _(uncontrolled)_ | 受控态属性，与静态方法 `Zmage.browsing()` 同名但用途不同。设置后由父组件全权管理状态，需配合 `onBrowsing` 接收变更；不传则组件自治。它不控制 `<Zmage.Wrapper>`。 |

### 原生属性透传

所有 `HTMLAttributes<HTMLImageElement>`（`className`、`style`、`width`、`height`、`loading`、`id`、`data-*` 等）都会转发到封面 `<img>`。

### 完整类型

```ts
export type BaseType =
  & BaseParams                    // src / alt / caption / set / defaultPage
  & PresetParams                  // preset
  & FunctionalParams              // controller / hotKey / animate
  & InterfaceAndInteractionParams // hideOnScroll / hideOnDblClick / coverVisible / backdrop / zIndex / radius / edge / loop / loadingDelay
  & LifeCycleParams               // onBrowsing / onZooming / onSwitching / onRotating / onError
  & ControlledParams              // browsing
  & HTMLAttributes<HTMLImageElement>
```

类型定义的 single source of truth：
- [`packages/core/src/types/global.ts`](./packages/core/src/types/global.ts) —— prop 类型
- [`packages/core/src/types/default.ts`](./packages/core/src/types/default.ts) —— 预设默认值

---

## React 兼容性

| React | 状态 | Mount API |
|---|---|---|
| 16.8 — 17.x | ✅ 完全支持 | `ReactDOM.render` |
| 18.x | ✅ 完全支持 | `createRoot`（自动检测） |
| 19.x | ✅ 完全支持 | `createRoot`（必须，已自动适配） |

库内部用运行时 feature detection 选择 mount API，无需消费方做任何配置。具体见 [`Zmage.callee.tsx`](./packages/core/src/Zmage.callee.tsx) 的 `resolveMountAdapter`。

---

## 配方

### 多图画廊

```tsx
<Zmage
  src="/cover.jpg"
  set={[
    { src: '/01.jpg', alt: '页 1', style: { borderRadius: 30 } },
    { src: '/02.jpg', alt: '页 2' },
  ]}
/>
```

在组件和命令式模式下，设置 `set` 后，进入查看模式的首图来自 `set[defaultPage]`，不再是 `src`。如需让封面与首页保持一致，把封面同时塞进 `set[0]` 即可。在包裹器模式下，如果被点击子图能匹配 `set[i].src`，会自动打开这个索引。

### 选择性关闭按钮

```tsx
<Zmage
  src="/x.jpg"
  controller={{ download: true, rotate: false }}
/>
```

### 受控状态

```tsx
const [open, setOpen] = useState(false)

return (
  <>
    <button onClick={() => setOpen(true)}>查看</button>
    <Zmage src="/x.jpg" browsing={open} onBrowsing={setOpen} />
  </>
)
```

### 主题化背景

```tsx
<Zmage src="/x.jpg" backdrop="linear-gradient(90deg, #00d4ff, #1a5ed7)" />
```

更多场景请打开线上 [参数调试台](https://zmage.caldis.me/playground) —— 每个 prop 都可调，URL 可分享。

---

## 贡献

欢迎发起 PR —— 项目结构与架构不变量请见 [`AGENTS.md`](./AGENTS.md)。

仓库布局是 pnpm + turbo 单仓多包：

```
packages/
  core/                    # 发布到 npm 的 react-zmage 库
  home/                    # CSR 演示站（Vite SPA，可切换 React 版本）
  sandbox-r{17,18,19}/     # 真实 npm 消费者集成测试
  sandbox-nextjs/          # Next.js 15 + RSC 消费者 build smoke
apps/
  demo-ssr/                # Express + Vite SSR 演示（R19）
  demo-nextjs/             # Next.js 15 App Router 演示
```

常用命令：

```bash
pnpm install
pnpm build               # 构建 core + home
pnpm test                # vitest in jsdom
pnpm -w run check        # 完整跨版本: build → pack → reinstall → 4 sandbox tsc + ssr-smoke

# 交互式 demo（用于人工验收 GUI / 动画 / 交互）
pnpm dev:csr-r17 / r18 / r19   # CSR · Vite SPA
pnpm dev:ssr-r19                # SSR · Express        (:8090)
pnpm dev:nextjs                 # RSC · Next.js        (:8095)
```

每个 demo 顶部会显示 `ContextBanner`，标明当前实际加载的 React 版本与渲染模式，便于切换不同环境时确认上下文。

---

## 证书

[MIT](./LICENSE)

---

## 引用

- 图标 —— [Material Icons](https://material.io/tools/icons/)
- AI 友好的安装指引：[`zmage.caldis.me/llms.txt`](https://zmage.caldis.me/llms.txt) —— 把这个 URL 交给你的 AI Agent。
