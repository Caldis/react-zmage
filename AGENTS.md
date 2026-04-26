# AGENTS.md — react-zmage

> 给 AI Agent / LLM 编排用的浓缩版项目信息。
> 人类完整文档见 [README.md](./README.md)。

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
  Preset,                    // 'desktop' | 'mobile' | 'auto' (auto deprecated)
  ControllerSet, HotKey, Animate, AnimateFlip,
} from 'react-zmage'

// Three usage modes
<Zmage src="..." />                                  // 1. Component
Zmage.browsing(props): () => void                    // 2. Imperative; returns destructor
<Zmage.wrapper>{children}</Zmage.wrapper>            // 3. Auto-attach to <img> in children

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
| Data | `src`, `alt`, `txt`, `set`, `defaultPage` | `set` enables multi-image mode |
| Preset | `preset: 'desktop' \| 'mobile'` | drives default `controller` / `hotKey` / `animate` |
| Controlled | `browsing` | omit for self-managed; pair with `onBrowsing` if set |
| Functional | `controller`, `hotKey`, `animate` | pass `boolean` to disable, or partial object to override |
| Interface | `hideOnScroll`, `coverVisible`, `backdrop`, `zIndex`, `radius`, `edge`, `loop` | desktop-only flags noted in README |
| Lifecycle | `onBrowsing`, `onZooming`, `onSwitching`, `onRotating` | callback args: `boolean`/`boolean`/`number`/`number` |
| Native | All `HTMLAttributes<HTMLImageElement>` | className, style, onClick, etc. transparently forwarded to inner `<img>` |

Defaults & sub-shapes: see [`packages/core/src/types/default.ts`](./packages/core/src/types/default.ts) and [`packages/core/src/types/global.ts`](./packages/core/src/types/global.ts) (single source of truth).

## Common pitfalls (LLM-written code often hits these)

1. **Forgetting `import 'react-zmage/style.css'`** — component renders but viewer is unstyled.
2. **Passing `preset='auto'`** — deprecated; will warn. Use `'desktop'` or `'mobile'`.
3. **Treating `Zmage` as a class** — it is a `forwardRef` exotic component. ❌ `new Zmage()`. ✅ JSX or `Zmage.browsing()`.
4. **Mixing controlled and uncontrolled** — if `browsing` is in props, it must be a fully controlled `boolean` (provide `onBrowsing` to receive changes). Mixing both modes silently breaks state sync.
5. **Calling `Zmage.browsing` server-side** — it manipulates `document.body`. Guard with `typeof window !== 'undefined'` or call from event handlers / effects.
6. **Wrapping with `Zmage.wrapper` without re-rendering** — wrapper attaches click handlers in `componentDidMount` / `componentDidUpdate` by querying `wrapperRef.current.querySelectorAll('img')`. Dynamically-injected `<img>` (after wrapper update) won't get attached unless wrapper re-renders.

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
  home/                          # demo site (Vite)
  sandbox-r17/                   # ┐
  sandbox-r18/                   # ├ R17/18/19 real-npm-consumer integration tests
  sandbox-r19/                   # ┘  (installed via `pnpm pack` tgz, NOT workspace:*)
```

## Build & test

```bash
pnpm install
pnpm build               # turbo: tsup + tsc -- core; vite -- home
pnpm test                # vitest in jsdom
pnpm -w run check        # FULL: build → pack → install --force → tsc all sandboxes
```

The `pnpm -w run check` is the single command that verifies dist correctness
across all React versions. Use it before claiming a build is good.

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
- **`react-dom/client` must be loaded via runtime `require`**, not static
  `import`. Static imports break R16/17 consumer bundlers ("Module not found").
  See `resolveMountAdapter` in `Zmage.callee.tsx`.

## Where the docs are right

If README and source disagree, **source wins**:
- props & defaults: `packages/core/src/types/global.ts` + `default.ts`
- exported runtime API: `packages/core/src/index.ts`
- package contract: `packages/core/package.json` (`exports` field)

## How to verify your change

Before claiming a fix:
1. `pnpm test` — unit tests must stay green (currently 11 tests).
2. `pnpm -w run check` — all 3 sandboxes must pass strict tsc.
3. If you touched callee or Browser, also confirm no React "setState on
   unmounted component" warnings appear in test output.
