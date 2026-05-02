# AGENTS.md — react-zmage

> 给 AI Agent / LLM 编排用的浓缩版项目信息。
> 人类完整文档见 [README.md](./README.md)。

## Works

如果你发现工作区中有额外变更, 始终假定是另一个 AI Agent 在当前分支中同步工作, 你需要做的是优先处理重突 (如果有) 并遵循工作互不干涉原则

如果非用户主动要求, 不允许在 worktree 上执行改动。

## What this package does (1 sentence)

A React component that turns any `<img>` into a fullscreen-zoomable, multi-image,
keyboard-navigable image viewer. Drop-in replacement for `<img>`.

## Public API surface (treat as contract)

```ts
// Default + statics
import Zmage from 'react-zmage'                  // browser / bundler entry
import Zmage from 'react-zmage/ssr'              // SSR / RSC entry
import 'react-zmage/style.css'                   // required for visuals

// Types (also exported from the same module)
import type {
  BaseType,                  // union of all props (use this when typing config objects)
  ReactZmageComponent,       // typeof Zmage
  Set,                       // shape of items in `set` prop
  Preset,                    // 'desktop' | 'mobile' | 'auto' (auto = matchMedia-driven)
  ControllerSet, ControllerPlacement, ControllerOverlayLayout, ControllerLayoutTargets,
  ControllerLayoutTarget, ControllerLayoutInset, ControllerLayoutInsetValue, ControllerRender, ControllerRenderState,
  ControllerRenderActions, ControllerRenderSlots, HotKey, Animate, AnimateFlip, AnimateCoverOptions,
  GestureSet, GestureSwipeOptions, GestureDragExitOptions, GestureWheelZoomOptions,
  GesturePinchZoomOptions, GestureDoubleTapZoomOptions, GestureTouchAction,
} from 'react-zmage'

// Three usage modes
<Zmage src="..." />                                  // 1. Component
Zmage.browsing(props): () => void                    // 2. Imperative; returns destructor
<Zmage.Wrapper>{children}</Zmage.Wrapper>            // 3. Auto-attach to <img> in children

// Ref forwarding
const ref = useRef<HTMLImageElement>(null)
<Zmage src="..." ref={ref} />                        // ref points to the cover <img>
```

## Required peer deps

- `react: >=16.8.0 <20`
- `react-dom: >=16.8.0 <20`

The library auto-detects React 18+ at runtime and uses `react-dom/client.createRoot`
when available, falling back to legacy `ReactDOM.render` otherwise. No consumer
configuration needed.

## Minimum reproducible example

```tsx
import { useState } from 'react'
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

export default function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Zmage
        src="https://example.com/photo.jpg"
        alt="example"
        browsing={open}
        onBrowsing={setOpen}
        set={[
          { src: 'https://example.com/01.jpg', alt: 'p1' },
          { src: 'https://example.com/02.jpg', alt: 'p2' },
        ]}
      />
    </>
  )
}
```

## Prop quick reference

Single `BaseType` covers all. Grouped here by purpose:

| Group | Props | Notes |
|---|---|---|
| Data | `src`, `alt`, `caption`, `set`, `defaultPage` | `set` enables multi-image mode. `caption` is `string \| { text, style?, className? }` — renders below the image; per-set override via `set[i].caption`. In Wrapper mode, child `<img>` nodes provide `src` / `alt`; top-level `set` may define a shared gallery, and clicked `img.src` opens the matching `set[i]` before falling back to `defaultPage`. Without `set`, `data-zmage-caption` or nearest `figcaption` may provide caption. |
| Preset | `preset: 'desktop' \| 'mobile' \| 'auto'` | defaults to `'auto'` when omitted; drives default `controller` / `hotKey` / `animate` / `gesture` plus preset-aware viewer spacing. `'auto'` resolves via `matchMedia('(pointer: coarse) and (hover: none)')` on the client; SSR falls back to desktop |
| Controlled | `browsing` | omit for self-managed; pair with `onBrowsing` if set. Does not control `<Zmage.Wrapper>` |
| Functional | `controller`, `hotKey`, `animate`, `gesture` | pass `boolean` to disable, or partial object to override. `controller.flip` / `hotKey.flip` and `controller.rotate` / `hotKey.rotate` are umbrellas over their per-side counterparts; enabling the umbrella forces both sides on. `controller.placement` moves only the toolbar capsule (`top-right` default); side flips and pagination keep their existing positions. `controller.layout` adjusts toolbar / flip / pagination / caption overlay safe insets without changing image animation geometry; number = px, string = CSS length, scalar `inset` follows each target's natural edge (toolbar by placement, flip left/right, pagination/caption bottom), and `layout.mobile` overrides base layout for mobile preset. Desktop defaults include `pagination.inset=24` and `caption.inset=60`; mobile leaves `layout` unset unless configured. `controller.render({ state, actions, slots })` replaces the whole controller UI, and `controller=false` disables both built-in slots and render. **`hotKey` entries accept `boolean \| string \| string[]`** — string is an `e.code` descriptor (`'Escape'` / `'BracketLeft'` / `'S'`) with cross-platform `Mod` prefix (= ⌘ on macOS, Ctrl elsewhere; e.g. `'Mod+S'`). New defaults: `[`/`]` rotate, `Mod+S` download (download is opt-in: defaults `false` because it hijacks the browser's "Save Page As"). Per-side string descriptor wins over umbrella. `controller.backdrop` / `controller.color` decouple the toolbar bg/icon-color from the modal `backdrop` (set both when `backdrop` is solid dark). `animate.cover` is preset-driven and defaults to `{ objectFit: true, clip: true, radius: true }`; it reads the cover `<img>` itself and does not infer parent-wrapper clipping. `clip-path` / `border-radius` animation may repaint; use `cover.clip=false` or `cover.radius=false` for performance-sensitive mobile pages. Set `animate={{ cover: false }}` for legacy cover geometry. `animate.slowMotion` defaults `false`; when enabled, holding `Shift` while opening or closing slows the full browsing transition to 10x for inspection and demos. `gesture` is preset-driven: desktop enables `wheelZoom` while already zoomed and disables `swipe` / `dragExit` / `pinchZoom` / `doubleTapZoom`; mobile enables horizontal drag paging, vertical drag-to-exit, pinch zoom, and double-tap zoom, while disabling `wheelZoom`. `gesture.touchAction` defaults to `'managed'`: pinch uses CSS `touch-action: none`, double-tap-only uses `manipulation`, otherwise `auto`; set it explicitly if the host page owns touch behavior. `pinchZoom.resetBelowFit` defaults `true`, so shrinking back to fit exits zoom and recenters. `doubleTapZoom.interval` / `distance` define the second-tap window. `wheelZoom.reverse` flips wheel direction; `wheelZoom.exitGuardDuration` defaults to `1000`, so wheel zooming out to `minScale` exits zoom immediately and blocks residual wheel events for that duration. `gesture=false` disables all gestures, and per-child overrides such as `gesture={{ swipe: false }}` / `gesture={{ wheelZoom: false }}` / `gesture={{ pinchZoom: false }}` keep the other preset defaults intact |
| Interface | `hideOnScroll`, `hideOnDblClick`, `coverVisible`, `backdrop`, `zIndex`, `radius`, `edge`, `loop`, `loadingDelay` | desktop-only flags noted in README. `radius` defaults to desktop `8` / mobile `0`; `edge` defaults to desktop `30` / mobile `0`. `hideOnScroll` and `hideOnDblClick` are the auto-dismiss trigger family (user action → close viewer); `hideOnDblClick` defaults `false`. `loadingDelay` defaults `200ms` — anti-flicker delay before showing the loading indicator (set 0 for legacy instant-show) |
| Lifecycle | `onBrowsing`, `onZooming`, `onSwitching`, `onRotating`, `onError` | first 4 callback args: `boolean`/`boolean`/`number`/`number`. `onError(e: SyntheticEvent<HTMLImageElement>)` fires for cover **or** viewer img-load failure — the only hook for the viewer-side failure (cover also flows via native `<img>` `onError` passthrough) |
| Native | All `HTMLAttributes<HTMLImageElement>` | className, style, onClick, etc. transparently forwarded to inner `<img>` |

Defaults & sub-shapes: see [`packages/core/src/types/default.ts`](./packages/core/src/types/default.ts) and [`packages/core/src/types/global.ts`](./packages/core/src/types/global.ts) (single source of truth).

## Common pitfalls (LLM-written code often hits these)

1. **Forgetting `import 'react-zmage/style.css'`** — component renders but viewer is unstyled.
2. **Hard-coding `preset='desktop'` on a touch-targeted page** — omitted `preset` already defaults to `'auto'`. The desktop bundle ships hotkeys + arrow buttons, enables wheel zoom while zoomed, and disables mobile `gesture.swipe` / `gesture.dragExit` / `gesture.pinchZoom` / `gesture.doubleTapZoom`. Use `'desktop'` only when the page deliberately wants desktop behavior on touch devices.
3. **Treating `Zmage` as a class** — it is a `forwardRef` exotic component. ❌ `new Zmage()`. ✅ JSX or `Zmage.browsing()`.
4. **Mixing controlled and uncontrolled** — if `browsing` is in props, it must be a fully controlled `boolean` (provide `onBrowsing` to receive changes). Mixing both modes silently breaks state sync.
5. **Calling `Zmage.browsing` server-side** — it manipulates `document.body`. Guard with `typeof window !== 'undefined'` or call from event handlers / effects.
6. **Putting `src` / `alt` on `<Zmage.Wrapper>` as if it rendered an image** — Wrapper binds real descendant `<img>` nodes. Put image data in the HTML, and pass only viewer config / optional shared `set` to Wrapper.
7. **Wrapping with `Zmage.Wrapper` without re-rendering** — wrapper attaches click handlers in `componentDidMount` / `componentDidUpdate` by querying `wrapperRef.current.querySelectorAll('img')`. Dynamically-injected `<img>` (after wrapper update) won't get attached unless wrapper re-renders.

## File layout (when generating PRs)

```
packages/
  core/                          # the published package "react-zmage"
    src/
      Zmage.tsx                  # component entry (forwardRef)
      Zmage.callee.tsx           # imperative entry (Zmage.browsing)
      Zmage.wrapper.tsx          # wrapper entry (Zmage.wrapper)
      components/
        Browser/                 # main viewer container (state owner)
        Image/                   # image rendering + touch/zoom logic
        Control/                 # toolbar buttons
        Background/              # backdrop layer
        Portal/                  # ReactDOM.createPortal wrapper
      types/
        global.ts                # ★ canonical prop types (BaseType, etc.)
        default.ts               # ★ canonical defaults (defProp, defPreset)
        externals.d.ts           # *.less ambient module decl
      utils/                     # debounce, click monitor, math helpers
      __tests__/                 # vitest + @testing-library/react
    tsup.config.ts               # build config (esm/cjs/iife + ssr subentry)
    tsconfig.declarations.json   # tsc -- emitDeclarationOnly for .d.ts
    package.json                 # exports map: . | ./ssr | ./style.css
  home/                          # CSR demo (Vite SPA, switchable React via env)
  sandbox-r17/                   # ┐
  sandbox-r18/                   # ├ R17/18/19 real-npm-consumer integration tests
  sandbox-r19/                   # │  (installed via `pnpm pack` tgz, NOT workspace:*)
                                 # │  each: tsc --noEmit + node ssr-smoke.cjs
  sandbox-nextjs/                # ┘  Next.js 15 + R19 + RSC, runs `next build`
apps/
  demo-ssr/                      # Express + Vite SSR demo (R19 only)
  demo-nextjs/                   # Next.js 15 App Router demo (R19)
```

## Build & test

```bash
pnpm install
pnpm build               # turbo: tsup + tsc -- core; vite -- home
pnpm test                # vitest in jsdom (component-level)
pnpm -w run check        # FULL: build → pack → install → tsc + ssr-smoke for each sandbox
```

`pnpm -w run check` is the single command that verifies dist correctness across
React versions. The `scripts/refresh-sandbox-tgz.mjs` helper makes it idempotent
on Windows by only invalidating the react-zmage cache entry rather than
rerunning a full `--force` install (which races on Windows + Next.js's many
small files).

## Interactive demos (human verification, not for agents)

These exist for the human maintainer to visually verify GUI/animation/
interaction behavior. Agents shouldn't claim "demo verified" — only the human
who actually opened the page in a browser can.

```bash
pnpm dev:csr-r17   # CSR R17  :8080
pnpm dev:csr-r18   # CSR R18  :8080
pnpm dev:csr-r19   # CSR R19  :8080
pnpm dev:ssr-r19   # SSR R19  :8090
pnpm dev:nextjs    # RSC R19  :8095
```

Each page shows a fixed top-bar `ContextBanner` with the React.version actually
loaded and the render mode label.

## Architectural invariants (don't break these)

- **All cleanup must be cancelable**. Class components in this codebase track
  every `requestAnimationFrame` / `setTimeout` handle as instance properties
  and cancel them in `componentWillUnmount`. New async work must follow the
  same pattern; otherwise StrictMode dev mode leaks listeners or fires setState
  on unmounted components. See `Browser.tsx` `initRaf` / `unInitTimer`,
  `Image.tsx` `pendingRafHandles`, `Zmage.callee.tsx` `inBrowsingRaf`.
- **`unInit({force: true})` must run cleanup synchronously**. Don't bury cleanup
  in `setState → setTimeout → setState` chains; on unmount path the inner
  setState is dropped and side effects (scroll lock release, cover restore)
  never run.
- **`global.ts` must NOT be `global.d.ts`**. tsc does not emit source `.d.ts`
  to outDir; renaming to `.ts` keeps `BaseType` reachable in the published
  `dist/index.d.ts`. Do not rename it back.
- **Public component type stays callable, NOT `ForwardRefExoticComponent`**.
  The exported `ReactZmageComponent` deliberately uses `(props) =>
  JSX.Element | null` + statics, NOT an intersection with
  `ForwardRefExoticComponent`. The latter triggers two cross-version TS bugs
  (R18+ ReactPortal regression; defaultProps-driven prop inference loss).
  Cast via `as unknown as ReactZmageComponent`.
- **`react-dom/client` stays a static import and remains externalized by tsup**.
  Do not reintroduce browser runtime `require`; the browser ESM build cannot
  rely on it. React 16/17 compatibility is guarded by the sandbox checks and
  SSR smoke tests, while React 18+ resolves `createRoot` through that external
  import. See `resolveMountAdapter` in `Zmage.callee.tsx`.

## Where the docs are right

If README and source disagree, **source wins**:
- props & defaults: `packages/core/src/types/global.ts` + `default.ts`
- exported runtime API: `packages/core/src/index.ts`
- package contract: `packages/core/package.json` (`exports` field)

## How to verify your change

Before claiming a fix:
1. `pnpm test` — unit tests must stay green (currently 11 tests).
2. `pnpm -w run check` — all 4 sandboxes must pass: tsc + ssr-smoke for r17/r18/r19, `next build` for sandbox-nextjs.
3. If you touched callee or Browser, also confirm no React "setState on
   unmounted component" warnings appear in test output.
4. **Do not claim GUI/animation/interaction behavior verified.** That requires
   a human to open `pnpm dev:csr-r19` / `pnpm dev:ssr-r19` / `pnpm dev:nextjs`
   and check the actual rendering. Agents cannot do this.

## Browser screenshots — playwright MCP

When invoking any playwright MCP screenshot tool
(`mcp__plugin_playwright_*__browser_take_screenshot`, or any descendant), **the
output path must live under `tmp/screenshot/`**. Never write to:

- the repo root (pollutes `git status` and risks accidental commits)
- `docs/` (those are committed assets — logo, demo images)
- any tracked directory

Concrete rules:

1. Always pass an explicit `filename` / `path` argument like
   `tmp/screenshot/<descriptive-name>.png`.
2. If `tmp/screenshot/` doesn't exist yet, create it first
   (`mkdir -p tmp/screenshot/`).
3. `tmp/` is gitignored, so screenshots never make it into commits.

Background: a previous session dropped five MCP screenshots into the repo root
(`before-click.png`, `narrow-zmage.png`, `scrolled-x.png`,
`scrolled-zmage-first.png`, `zmage-during.png`), polluting `git status`. The
gitignore now defensively blocks `/*.png`, but the primary mechanism is
agents passing the right path on each call.

> Note: Playwright's `testConfig.snapshotPathTemplate` only governs
> `@playwright/test` assertions (`toHaveScreenshot` / `toMatchSnapshot`). It
> does **not** affect the MCP plugin — MCP screenshot paths are caller-controlled.
> Hence the rule is enforced here rather than in a config file.
