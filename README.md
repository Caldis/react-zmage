[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests) [![React](https://img.shields.io/badge/react-16.8%20--%2019-61dafb.svg)](#react-版本兼容)

<div align="center">
  <a href="https://github.com/Caldis/react-zmage">
    <img width="150" height="150" src="docs/logo.png" alt="react-zmage logo">
  </a>

  <h1>react-zmage</h1>

  <p>基于 React 的图片缩放查看器 — 替换 <code>&lt;img&gt;</code> 即可获得放大查看、多图浏览、缩放、旋转、键盘快捷键等能力</p>

  <p>
    <a href="https://zmage.caldis.me">在线 Demo</a> ·
    <a href="#api">API</a> ·
    <a href="./AGENTS.md">AI Agent 速查</a>
  </p>
</div>

---

## Quick Contract

```ts
// 主入口 (浏览器 / 现代 bundler)
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

// SSR / RSC 入口 (Next.js App Router / Remix Server Components)
import Zmage from 'react-zmage/ssr'

// 三种使用方式
<Zmage src="..." />                                // 1. 替换 <img>
Zmage.browsing({ src: '...' })                     // 2. 命令式调用; 返回 destructor
<Zmage.wrapper>{htmlWithImgTags}</Zmage.wrapper>   // 3. 自动包裹 children 中的 <img>
```

| | |
|---|---|
| **默认导出** | `Zmage` — `forwardRef` 组件，ref 转发到内部 `<img>` |
| **静态方法** | `Zmage.browsing(props)` ｜ `Zmage.wrapper` |
| **主类型** | `BaseType` (从 `react-zmage` 导出，含全部 props 联合) |
| **样式入口** | `react-zmage/style.css` (必须显式 import) |
| **SSR 入口** | `react-zmage/ssr` |
| **Peer Deps** | `react: >=16.8.0 <20`, `react-dom: >=16.8.0 <20` |

---

## 目录

- [Demo](#demo)
- [安装](#安装)
- [React 版本兼容](#react-版本兼容)
- [使用](#使用)
  - [1. 作为组件](#1-作为组件)
  - [2. 命令式调用](#2-命令式调用)
  - [3. 自动包裹 HTML](#3-自动包裹-html)
  - [4. TypeScript 用法](#4-typescript-用法)
  - [5. SSR / RSC](#5-ssr--rsc)
- [API](#api)
  - [基础 Props](#基础-props)
  - [预设 Props](#预设-props)
  - [受控 Props](#受控-props)
  - [功能控制 Props](#功能控制-props)
  - [界面交互 Props](#界面交互-props)
  - [生命周期回调](#生命周期回调)
  - [完整类型定义](#完整类型定义)
- [Props 示例](#props-示例)
- [贡献](#贡献)
- [证书](#证书)

---

## Demo

**在线**: <https://zmage.caldis.me>

**本地**:
```bash
git clone https://github.com/Caldis/react-zmage
cd react-zmage
pnpm install
pnpm dev
```

---

## 安装

```bash
pnpm add react-zmage
# 或
npm i react-zmage
# 或
yarn add react-zmage
```

需要预先安装 `react` / `react-dom`（peer dependency）：

```bash
pnpm add react react-dom
```

---

## React 版本兼容

| React | 状态 | 实现 |
|---|---|---|
| 16.8 ~ 17.x | ✅ 完全支持 | 走 `ReactDOM.render` |
| 18.x | ✅ 完全支持 | 自动检测并使用 `createRoot` |
| 19.x | ✅ 完全支持 | 必须使用 `createRoot`（已自动适配） |

库内部用运行时 feature detection 选择 mount API，无需消费方做任何配置。具体见 [`Zmage.callee.tsx`](./packages/core/src/Zmage.callee.tsx) 的 `resolveMountAdapter`。

---

## 使用

### 1. 作为组件

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

export default function Gallery() {
  return <Zmage src="/photo.jpg" alt="风景" />
}
```

> 把 `<img>` 替换成 `<Zmage>` 即可。点击图片进入查看器。

### 2. 命令式调用

不依赖封面图，直接弹出查看器：

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

`Zmage.browsing` 接受与 `<Zmage>` 完全相同的 props，并返回一个 `() => void` 的 destructor 函数（手动关闭用）。

### 3. 自动包裹 HTML

适合渲染 markdown / 富文本输出，自动给所有 `<img>` 加查看功能：

```tsx
<Zmage.wrapper>
  <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
</Zmage.wrapper>
```

### 4. TypeScript 用法

完整类型支持，支持泛型 ref 转发：

```tsx
import Zmage from 'react-zmage'
import type { BaseType } from 'react-zmage'
import 'react-zmage/style.css'
import { useRef } from 'react'

export function App() {
  const imgRef = useRef<HTMLImageElement>(null)

  const config: BaseType = {
    src: '/photo.jpg',
    alt: '示例',
    onBrowsing: (state) => console.log('browsing:', state),
  }

  return <Zmage {...config} ref={imgRef} />
}
```

### 5. SSR / RSC

Next.js App Router / Remix 等 Server Components 环境，使用 SSR 友好入口：

```tsx
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
```

API 完全一致，仅产物为 platform-neutral，避免 SSR 阶段引用浏览器 API。

---

## API

> **类型签名约定**：表中的 `类型` 列均为 TypeScript 字面量。`?` 表示可选。

### 基础 Props

最少了解这 5 个就能用：

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `src` | `string` | `""` | 图片 URL，等同于 `<img>` 的 `src` |
| `alt` | `string` | `""` | 图片占位文字，等同于 `<img>` 的 `alt` |
| `txt` | `string` | `""` | 图片描述文本（除标题外的二级文案，可选） |
| `set` | `Set[]` | `[]` | 多图集合，传入后启用浏览模式（左右翻页） |
| `defaultPage` | `number` | `0` | 多图模式下的初始页码 |

### 预设 Props

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `preset` | `'desktop' \| 'mobile'` | `'desktop'` | 端预设。决定 `controller` / `hotKey` / `animate` 的默认值集合（[详见预设表](./packages/core/src/types/default.ts)） |

> ⚠️ 旧值 `'auto'` 已废弃，会 fallback 到 `'desktop'` 并打 warning。

### 受控 Props

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `browsing` | `boolean` | _(uncontrolled)_ | 显式控制查看器开关。设置后由父组件全权管理状态，需配合 `onBrowsing` 接收变更。不传则组件自治。 |

### 功能控制 Props

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `controller` | `boolean \| ControllerSet` | preset 决定 | 顶部工具栏按钮显隐 |
| `hotKey` | `boolean \| HotKey` | preset 决定 | 键盘快捷键开关 |
| `animate` | `boolean \| Animate` | preset 决定 | 动画行为 |

#### `ControllerSet` 全字段

```ts
interface ControllerSet {
  pagination?: boolean | ReactNode  // 多页指示器
  zoom?: boolean | string | ReactNode  // 缩放按钮
  download?: boolean | string | ReactNode  // 下载按钮
  close?: boolean | string | ReactNode  // 关闭按钮
  rotate?: boolean | string | ReactNode  // 旋转 (左+右组合按钮)
  rotateLeft?: boolean | string | ReactNode  // 仅左旋
  rotateRight?: boolean | string | ReactNode  // 仅右旋
  flip?: boolean | string | ReactNode  // 翻页 (左+右)
  flipLeft?: boolean | string | ReactNode  // 仅上一页
  flipRight?: boolean | string | ReactNode  // 仅下一页
}
```

#### 预设的默认 `ControllerSet`

| 字段 | desktop | mobile |
|---|---|---|
| `pagination` | `true` | `true` |
| `rotate` | `true` | `false` |
| `zoom` | `true` | `false` |
| `download` | `false` | `false` |
| `close` | `true` | `true` |
| `flip` | `true` | `false` |

#### `HotKey` 字段

```ts
interface HotKey {
  close?: boolean  // ESC 关闭
  zoom?: boolean   // 空格缩放
  flip?: boolean   // 左右键翻页
}
```

桌面端默认全开；移动端默认全关。

#### `Animate` 字段

```ts
interface Animate {
  browsing?: boolean              // 进入/退出动画 (暂不可配, 仅占位)
  flip?: 'fade' | 'crossFade' | 'swipe' | 'zoom'  // 翻页动画
}
```

> ⚠️ 当 `set.length < 3` 时，`flip` 强制为 `'fade'`（避免单/双图边图为空时的视觉破绽）。
>
> 默认值：desktop = `'fade'`，mobile = `'swipe'`。

### 界面交互 Props

| 配置项 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `hideOnScroll` | `boolean` | `true` | 桌面端：滚动时是否自动关闭查看器（移动端无效） |
| `coverVisible` | `boolean` | `false` | 桌面端：放大期间是否保留封面图占位（默认会隐藏避免动画穿帮） |
| `backdrop` | `string` | `"#FFFFFF"` | 查看器背景色（接受任何合法 CSS color / gradient） |
| `zIndex` | `number` | `1000` | Portal 容器的 `z-index` |
| `radius` | `number` | desktop:`0` / mobile:`0` | 查看模式下图片圆角 (px) |
| `edge` | `number` | desktop:`0` / mobile:`0` | 图片距屏幕边缘的留白 (px) |
| `loop` | `boolean` | `true` | 多图模式：尾页是否循环回首页 |

### 生命周期回调

| 配置项 | 签名 | 触发时机 |
|---|---|---|
| `onBrowsing` | `(isBrowsing: boolean) => void` | 进入/退出查看模式 |
| `onZooming` | `(isZooming: boolean) => void` | 放大/缩小切换 |
| `onSwitching` | `(page: number) => void` | 翻页时回传新页码 |
| `onRotating` | `(deg: number) => void` | 旋转时回传当前角度 |

### 完整类型定义

所有 props 通过单一交叉类型 `BaseType` 暴露：

```ts
export type BaseType =
  & BaseParams                    // src / alt / txt / set / defaultPage
  & PresetParams                  // preset
  & FunctionalParams              // controller / hotKey / animate
  & InterfaceAndInteractionParams // hideOnScroll / coverVisible / backdrop / zIndex / radius / edge / loop
  & LifeCycleParams               // onBrowsing / onZooming / onSwitching / onRotating
  & ControlledParams              // browsing
  & HTMLAttributes<HTMLImageElement>  // 透传给底层 <img> 的全部原生属性 (className, style, onClick, ...)
```

子类型完整定义见 [`packages/core/src/types/global.ts`](./packages/core/src/types/global.ts)。

---

## Props 示例

### `set`

```tsx
<Zmage
  src="/cover.jpg"
  set={[
    { src: '/01.jpg', alt: '页 1', style: { borderRadius: 30 }, className: 'custom' },
    { src: '/02.jpg', alt: '页 2' },
  ]}
/>
```

> 设置 `set` 后，进入查看模式的首图来自 `set[defaultPage]`，不再是 `src`。如果需要让封面与查看模式共享一张图，把它放进 `set[0]` 并保留 `src`。

### `controller`

按需关闭部分按钮：

```tsx
<Zmage
  src="/x.jpg"
  controller={{
    download: true,    // 启用下载
    rotate: false,     // 关闭旋转
  }}
/>
```

### `hotKey`

```tsx
<Zmage src="/x.jpg" hotKey={{ flip: false }} />  // 禁用左右键翻页
```

### `animate`

```tsx
<Zmage src="/x.jpg" set={[...]} animate={{ flip: 'crossFade' }} />
```

### `backdrop`

```tsx
<Zmage src="/x.jpg" backdrop="linear-gradient(90deg, #00d4ff 0%, #1a5ed7 100%)" />
```

### `browsing` (受控)

```tsx
const [open, setOpen] = useState(false)

return (
  <>
    <button onClick={() => setOpen(true)}>查看</button>
    <Zmage
      src="/x.jpg"
      browsing={open}
      onBrowsing={setOpen}
    />
  </>
)
```

### 生命周期

```tsx
<Zmage
  src="/x.jpg"
  onBrowsing={(state) => console.info('Browsing:', state)}
  onZooming={(state) => console.info('Zooming:', state)}
  onSwitching={(page) => console.info('Switching to page:', page)}
  onRotating={(deg) => console.info('Rotating:', deg, 'deg')}
/>
```

---

## 贡献

欢迎发起 [PR](https://github.com/Caldis/react-zmage/pulls) 改进代码，或通过 [Issues](https://github.com/Caldis/react-zmage/issues) 反馈问题。

仓库布局是 pnpm + turbo 单仓多包：
- `packages/core` — 发布到 npm 的 `react-zmage` 库
- `packages/home` — 演示站源码（构建产物在 `docs/`）
- `packages/sandbox-r{17,18,19}` — 真实 npm 消费者集成测试沙箱

常用命令：
```bash
pnpm install     # 安装所有 workspace 依赖
pnpm build       # 构建 core 与 home
pnpm test        # 跑单元测试
pnpm -w run check  # 跑跨 React 版本兼容性测试 (build → pack → reinstall → 三 sandbox tsc)
```

---

## 引用

- 图标来源：[Material Icons](https://material.io/tools/icons/)

---

## 证书

[MIT](./LICENSE)
