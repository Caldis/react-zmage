English | [简体中文](./README.zh-CN.md)

<div align="center">
  <a href="https://github.com/Caldis/react-zmage">
    <img width="150" height="150" src="docs/logo.png" alt="react-zmage logo">
  </a>

  <h1>react-zmage</h1>

  <p>
    Turn any <code>&lt;img&gt;</code> into a fullscreen, keyboard-navigable image viewer.<br>
    Drop-in. Zero config. React 16.8 → 19.
  </p>

  <p>
    <a href="https://www.npmjs.com/package/react-zmage"><img alt="npm version" src="https://img.shields.io/npm/v/react-zmage.svg?style=flat-square&color=cb3837"></a>
    <a href="https://www.npmjs.com/package/react-zmage"><img alt="npm downloads/month" src="https://img.shields.io/npm/dm/react-zmage.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/react-zmage"><img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/react-zmage?style=flat-square"></a>
    <a href="#react-compatibility"><img alt="React 16.8 — 19" src="https://img.shields.io/badge/react-16.8%E2%80%9319-61dafb?style=flat-square"></a>
    <a href="./LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square"></a>
  </p>

  <p>
    <a href="https://zmage.caldis.me">Live Demo</a> ·
    <a href="https://zmage.caldis.me/playground">Playground</a> ·
    <a href="#api-reference">API</a> ·
    <a href="./AGENTS.md">AGENTS.md</a>
  </p>
</div>

---

## Highlights

- **Drop-in `<img>` replacement.** Native props (`className`, `style`, `onClick`, …) pass through to the underlying image. No portals to wire up, no state plumbing.
- **SSR / RSC safe.** A separate `react-zmage/ssr` entry avoids touching `document` at import time. Verified against Next.js 15 App Router, Vite SSR, and Express renderToString.
- **Three call modes.** Use it as a component, call it imperatively (`Zmage.browsing()`), or wrap any HTML subtree to auto-attach the viewer to every `<img>` inside.

---

## Install

```bash
pnpm add react-zmage    # or: npm i react-zmage / yarn add react-zmage
```

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

<Zmage src="/photo.jpg" alt="hero" />
```

Peer deps: `react@>=16.8 <20` and `react-dom@>=16.8 <20`. The library auto-detects React 18+ at runtime and uses `react-dom/client` when available — consumers configure nothing.

---

## Three ways to use it

react-zmage exposes the same configuration surface through three call shapes. **Pick based on how much control you have over the rendered HTML.**

### Component — the default

**When to use:** you control the JSX you render. This is the cleanest path; reach for it first.

```tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

export default function Gallery() {
  return <Zmage src="/photo.jpg" alt="landscape" />
}
```

All native HTML attributes (`className`, `style`, `onClick`, `loading`, …) pass through to the underlying `<img>`.

### Imperative — `Zmage.browsing()`

**When to use:** you have no good cover `<img>`, or you don't want to mount extra nodes in your component tree. Open the viewer from event handlers, async callbacks, or third-party widgets — anywhere.

```tsx
import Zmage from 'react-zmage'

function Trigger() {
  return (
    <button onClick={() => Zmage.browsing({ src: '/photo.jpg' })}>
      Open viewer
    </button>
  )
}
```

`Zmage.browsing(opts)` accepts the same props bag as `<Zmage>` and returns a `() => void` destructor for manual close.

> Guard with `typeof window !== 'undefined'` if it can run on the server. The `react-zmage/ssr` entry provides the same API without touching `document` at import time.

### Wrapper — `<Zmage.Wrapper>`

**When to use:** you don't control the rendered HTML — markdown output, CMS rich text, `dangerouslySetInnerHTML`. Wrap the subtree and every `<img>` inside automatically gains the viewer, without modifying the source content.

```tsx
<Zmage.Wrapper backdrop="#0a0a0a">
  <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
</Zmage.Wrapper>
```

The wrapper queries `<img>` descendants in `componentDidMount` / `componentDidUpdate`. Imgs injected after the wrapper renders won't get bound until the wrapper re-renders.

Wrapper-specific prop scope:

- Put `src` / `alt` on the child `<img>` nodes. Top-level `src` / `alt` are overwritten by the clicked DOM node.
- Viewer configuration still belongs on `<Zmage.Wrapper>`: `preset`, `controller`, `hotKey`, `animate`, `backdrop`, `zIndex`, `radius`, `edge`, `loop`, `coverVisible`, `hideOnScroll`, `hideOnDblClick`, `loadingDelay`, and lifecycle callbacks.
- Pass `set` when the wrapped subtree should behave as one shared gallery. If the clicked image's `src` appears in `set`, Wrapper opens that matching index; `defaultPage` is only the fallback.
- Without `set`, the clicked image opens as a single image. `data-zmage-caption` or the nearest `figcaption` can provide the viewer caption.
- The controlled `browsing` prop is for component mode; it does not control `<Zmage.Wrapper>`.

<details>
<summary><strong>TypeScript</strong></summary>

```tsx
import Zmage from 'react-zmage'
import type { BaseType } from 'react-zmage'
import { useRef } from 'react'

const config: BaseType = {
  src: '/photo.jpg',
  alt: 'hero',
  onBrowsing: (state) => console.log('browsing:', state),
}

const ref = useRef<HTMLImageElement>(null)
return <Zmage {...config} ref={ref} />
```

`BaseType` is the union of every prop. Sub-types — `ControllerSet`, `HotKey`, `Animate`, `Set`, `Preset`, `AnimateFlip` — are also exported from `react-zmage`.

</details>

<details>
<summary><strong>SSR / RSC (Next.js, Remix)</strong></summary>

```tsx
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
```

API is identical — only the import path changes. The SSR build is platform-neutral and avoids browser APIs at module load. Verified against Next.js 15 App Router (`packages/sandbox-nextjs`) and Express + Vite renderToString (`apps/demo-ssr`).

</details>

---

## API reference

> All props live on a single `BaseType`. The same options bag works for `<Zmage>` and `Zmage.browsing()`.

### Data

| Prop | Type | Default | Notes |
|---|---|---|---|
| `src` | `string` | — | Image URL. Same as `<img src>`. |
| `alt` | `string` | `''` | Image title; rendered above the viewer in browsing mode. |
| `caption` | `string \| { text: string; style?: CSSProperties; className?: string }` | `''` | Caption rendered below the viewer. String form uses the default pill style; object form lets you override styling or theme it. Per-page override available via `set[i].caption`. |
| `set` | `Set[]` | `[]` | Multi-image gallery. When non-empty, arrow keys flip pages. In Wrapper mode, pass `set` to treat wrapped images as one shared gallery; clicking an image whose `src` appears in `set` opens that matching index. |
| `defaultPage` | `number` | `0` | Initial index when `set` is non-empty. In Wrapper mode this is a fallback only; a clicked image that matches `set[i].src` wins. |

### Preset

| Prop | Type | Default | Notes |
|---|---|---|---|
| `preset` | `'desktop' \| 'mobile' \| 'auto'` | `'desktop'` | Bundles defaults for `controller`, `hotKey`, and `animate`. `'auto'` resolves at runtime via `matchMedia('(pointer: coarse) and (hover: none)')` — coarse + no-hover → `mobile`, otherwise `desktop`. SSR / no `matchMedia` falls back to `desktop`. |

### Functional

| Prop | Type | Default | Notes |
|---|---|---|---|
| `controller` | `boolean \| ControllerSet` | preset-driven | Per-button toggles in the top toolbar. Pass `false` to hide all, or a partial object to override individual buttons. |
| `hotKey` | `boolean \| HotKey` | preset-driven | Keyboard shortcuts. |
| `animate` | `boolean \| Animate` | preset-driven | Open/close + page-flip animations. |

#### `ControllerSet`

```ts
interface ControllerSet {
  pagination?:  boolean | ReactNode             // page indicator
  zoom?:        boolean | string | ReactNode    // zoom button
  download?:    boolean | string | ReactNode
  close?:       boolean | string | ReactNode
  rotate?:      boolean | string | ReactNode    // umbrella over rotateLeft + rotateRight
  rotateLeft?:  boolean | string | ReactNode
  rotateRight?: boolean | string | ReactNode
  flip?:        boolean | string | ReactNode    // umbrella over flipLeft + flipRight
  flipLeft?:    boolean | string | ReactNode
  flipRight?:   boolean | string | ReactNode
  // visual
  backdrop?:    string                          // control bar bg; falls back to top-level `backdrop`
  color?:       string                          // control bar icon color; falls back to `currentColor`
}
```

> `rotate` and `flip` are umbrella switches — enabling either forces both per-side counterparts on, regardless of those flags.

> `backdrop` and `color` decouple the toolbar from the modal backdrop. Pair them when the modal `backdrop` is dark — e.g. `backdrop="#111"` + `controller={{ backdrop: 'rgba(0,0,0,0.4)', color: '#fff' }}` keeps the toolbar legible. Per-button color overrides (e.g. `controller={{ zoom: '#ff8800' }}`) still win over `controller.color`.

#### Preset defaults

| Field | desktop | mobile |
|---|---|---|
| `pagination` | ✅ | ✅ |
| `rotate` | ✅ | — |
| `zoom` | ✅ | — |
| `download` | — | — |
| `close` | ✅ | ✅ |
| `flip` | ✅ | — |

#### `HotKey`

```ts
type HotKeyValue = boolean | string | string[]
//  true     — use default binding
//  false    — disabled, event passes to outer listeners
//  string   — descriptor: 'Escape' / 'BracketLeft' / 'S' / 'Mod+S'
//             (e.code names — layout-independent;
//              Mod = ⌘ on macOS, Ctrl on Windows/Linux)
//  string[] — multiple bindings, any matches triggers

interface HotKey {
  close?:        HotKeyValue   // default 'Escape'
  zoom?:         HotKeyValue   // default 'Space'
  flip?:         boolean       // umbrella for flipLeft / flipRight
  flipLeft?:     HotKeyValue   // default 'ArrowLeft'
  flipRight?:    HotKeyValue   // default 'ArrowRight'
  rotate?:       boolean       // umbrella for rotateLeft / rotateRight
  rotateLeft?:   HotKeyValue   // default 'BracketLeft'  ([)
  rotateRight?:  HotKeyValue   // default 'BracketRight' (])
  download?:     HotKeyValue   // default 'Mod+S' (when enabled)
}
```

Desktop default: `close` / `zoom` / `flip` / `rotate` on; `download` off (opt-in — turning it on hijacks the browser's `Cmd`/`Ctrl+S` shortcut). Mobile default: all off.

Strict modifier matching: `'Space'` is never matched by `Cmd+Space` (macOS input-method switch); undeclared modifiers must NOT be pressed. Per-side string descriptor wins over the umbrella (e.g. `{ rotate: true, rotateLeft: 'KeyA' }` rebinds left to `A` while keeping `]` for right).

Examples:

```tsx
// Enable Cmd/Ctrl+S to download the current image
<Zmage src="..." hotKey={{ download: true }} />

// Rebind rotate to A / D, keep download default
<Zmage src="..." hotKey={{ rotate: false, rotateLeft: 'KeyA', rotateRight: 'KeyD' }} />

// Add Q as a second close key alongside Escape
<Zmage src="..." hotKey={{ close: ['Escape', 'KeyQ'] }} />
```

#### `Animate`

```ts
interface Animate {
  browsing?: boolean
  flip?:     'fade' | 'crossFade' | 'swipe' | 'zoom' | 'none'
}
```

Defaults: desktop = `{ browsing: true, flip: 'crossFade' }`, mobile = `{ browsing: true, flip: 'swipe' }`. `flip: 'none'` skips adjacent-page rendering — page change is an instant swap with no transition.

### Interface & interaction

| Prop | Type | Default | Notes |
|---|---|---|---|
| `hideOnScroll` | `boolean` | `true` | Auto-close when the page scrolls (desktop only). |
| `hideOnDblClick` | `boolean` | `false` | Auto-close when the user double-clicks the image. Off by default; turn on to allow dismissing with a double-click. |
| `coverVisible` | `boolean` | `false` | Keep the cover `<img>` visible while the modal is open. |
| `backdrop` | `string` | `'#FFFFFF'` | Viewer backdrop. Any valid CSS color or gradient. **Default is white** — override (`'#111'`, etc.) for dark UIs. |
| `zIndex` | `number` | `1000` | Portal stacking. |
| `radius` | `number` | `0` | Image corner radius (px). |
| `edge` | `number` | `0` | Minimum margin between image and viewport (px). |
| `loop` | `boolean` | `true` | Wrap-around when paging past the ends. |
| `loadingDelay` | `number` | `200` | Delay (ms) before showing the loading indicator. If the image loads within this window, the indicator never appears — prevents the flash on cached page changes. Set 0 for legacy instant-show. |

### Lifecycle

| Prop | Signature | Triggered when |
|---|---|---|
| `onBrowsing` | `(isBrowsing: boolean) => void` | viewer opens / closes |
| `onZooming` | `(isZooming: boolean) => void` | 1:1 zoom toggles |
| `onSwitching` | `(page: number) => void` | page changes |
| `onRotating` | `(deg: number) => void` | image rotates |
| `onError` | `(e: SyntheticEvent<HTMLImageElement>) => void` | cover **or** viewer image fails to load (the only hook for the viewer-side failure; cover still also flows via native `<img>` `onError` passthrough) |

### Controlled

| Prop | Type | Default | Notes |
|---|---|---|---|
| `browsing` | `boolean` | _(uncontrolled)_ | Controlled-mode prop, distinct from the static method `Zmage.browsing()`. Pair with `onBrowsing` so external state stays in sync. Omit for self-managed open/close. Does not control `<Zmage.Wrapper>`. |

### Native passthrough

Every `HTMLAttributes<HTMLImageElement>` (`className`, `style`, `width`, `height`, `loading`, `id`, `data-*`, …) is forwarded to the cover `<img>`.

### Full type

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

Canonical sources of truth:
- [`packages/core/src/types/global.ts`](./packages/core/src/types/global.ts) — prop types
- [`packages/core/src/types/default.ts`](./packages/core/src/types/default.ts) — preset defaults

---

## React compatibility

| React | Status | Mount API |
|---|---|---|
| 16.8 — 17.x | ✅ Supported | `ReactDOM.render` |
| 18.x | ✅ Supported | `createRoot` (auto-detected) |
| 19.x | ✅ Supported | `createRoot` (required, auto-adapted) |

Runtime feature detection picks the right mount API; consumers configure nothing. See `resolveMountAdapter` in [`Zmage.callee.tsx`](./packages/core/src/Zmage.callee.tsx).

---

## Recipes

### Multi-image gallery

```tsx
<Zmage
  src="/cover.jpg"
  set={[
    { src: '/01.jpg', alt: 'page 1', style: { borderRadius: 30 } },
    { src: '/02.jpg', alt: 'page 2' },
  ]}
/>
```

In component and imperative modes, when `set` is non-empty, the first image you see in browsing mode is `set[defaultPage]`, not `src`. To keep the cover and the first viewer page in sync, put the cover in `set[0]` and pass it to `src` as well. In Wrapper mode, a clicked child image that matches `set[i].src` opens that index automatically.

### Selectively disable controls

```tsx
<Zmage
  src="/x.jpg"
  controller={{ download: true, rotate: false }}
/>
```

### Controlled state

```tsx
const [open, setOpen] = useState(false)

return (
  <>
    <button onClick={() => setOpen(true)}>View</button>
    <Zmage src="/x.jpg" browsing={open} onBrowsing={setOpen} />
  </>
)
```

### Theme-aware backdrop

```tsx
<Zmage src="/x.jpg" backdrop="linear-gradient(90deg, #00d4ff, #1a5ed7)" />
```

For more recipes, see the live [Playground](https://zmage.caldis.me/playground) — every prop is controllable and the URL is shareable.

---

## Contributing

PRs welcome — see [`AGENTS.md`](./AGENTS.md) for an at-a-glance project map and the architectural invariants to respect.

This is a pnpm + turbo monorepo:

```
packages/
  core/                    # the published react-zmage package
  home/                    # CSR demo (Vite SPA, switchable React via env)
  sandbox-r{17,18,19}/     # real-npm-consumer integration tests
  sandbox-nextjs/          # Next.js 15 + RSC consumer build smoke
apps/
  demo-ssr/                # Express + Vite SSR demo (R19)
  demo-nextjs/             # Next.js 15 App Router demo
```

Common commands:

```bash
pnpm install
pnpm build               # build core + home
pnpm test                # vitest in jsdom
pnpm -w run check        # full cross-version: build → pack → reinstall → 4 sandboxes tsc + ssr-smoke

# Interactive demos for human verification
pnpm dev:csr-r17 / r18 / r19   # CSR · Vite SPA
pnpm dev:ssr-r19                # SSR · Express        (:8090)
pnpm dev:nextjs                 # RSC · Next.js        (:8095)
```

Each demo shows a top-bar `ContextBanner` with the actual loaded React version and render mode, so you can confirm context when switching environments.

---

## License

[MIT](./LICENSE)

---

## Acknowledgements

- Icons — [Material Icons](https://material.io/tools/icons/)
- AI-friendly install instruction available at [`zmage.caldis.me/llms.txt`](https://zmage.caldis.me/llms.txt) — paste the URL to your AI agent.
