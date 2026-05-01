# Phase 5 - Controller Placement And Custom Render API

**Date:** 2026-05-01
**Status:** Draft for review
**Depends on:** Phase 4 mobile zoom implementation in the current working tree
**Scope:** `packages/core` controller placement, full custom controller rendering, tests, public docs, and home playground controls.

## Phase 4 Facts Checked

Phase 4 landed these details that affect this phase:

- `ContextType` already exposes stable viewer state needed by a controller: `show`, `zoom`, `page`, `canZoom`, `set`, `presetIsMobile`, `presetIsDesktop`, and action handlers.
- `ZoomTrigger` now includes `control`, `keyboard`, `wheel`, `pinch`, and `doubleTap`. Phase 5 should not expose this internal value through the custom controller state.
- `#zmageViewport` receives viewer-scoped `touch-action` from normalized `gesture`; controller placement must not move or restyle the viewport.
- Mobile zoom/pan state lives in `Image` instance fields. Controller render must stay a UI layer and must not own gesture or RAF state.
- Mobile default controller remains minimal: pagination and close enabled, rotate/zoom/download/flip disabled.
- `Control.tsx` currently renders three logical groups in one component: toolbar, side flip buttons, and pagination.
- `animate.browsing=false` currently passes `transition: none` to the toolbar, default buttons, and pagination. Phase 5 must keep this full-chain no-animation contract.
- `controller=false` is normalized to `{}` in `Browser.getControllerConfig()`. Phase 5 must keep it as the highest-priority disable switch, including for `controller.render`.
- The recent backdrop fix made close fade timing consistent across desktop and mobile. Controller placement must not reintroduce mobile-only animation delays.

## Problem

The current controller API can toggle or replace individual button nodes, but it cannot:

- place the default toolbar on another screen edge,
- make the toolbar enter from the edge it is attached to,
- replace the whole controller surface with user-owned UI,
- compose a custom controller from the library's default toolbar, pagination, and flip controls.

Users can pass React nodes per button today, but that still keeps the library's wrapper, positioning, grouping, and animation. That is not enough for product-specific controls.

## Goals

- Add preset-compatible `controller.placement` for the default toolbar.
- Make the default toolbar enter from the configured edge.
- Add `controller.render(args)` so users can draw the whole controller UI themselves.
- Give the render callback stable state, stable actions, and reusable default slots.
- Preserve all current `ControllerItem` and umbrella behavior.
- Preserve `controller=false` as a full controller UI disable.
- Preserve desktop and mobile preset defaults.
- Keep `Control` as a UI layer; do not move gesture, zoom geometry, or page-switch state into it.
- Keep SSR/RSC safe: no top-level browser globals and no browser reads inside type/default code.

## Non-Goals

- Moving side flip buttons or pagination with `controller.placement`.
- Adding draggable or responsive controller layout rules.
- Adding new lifecycle callbacks for controller actions.
- Exposing internal fields such as `mounted`, `pageWithStep`, `zoomShakeKey`, `zoomTrigger`, or gesture state.
- Adding a theme provider.
- Making home playground support arbitrary callback source editing. The playground may demonstrate placement and document render, but it does not need to serialize user-provided functions into the URL.

## Public API

Extend `ControllerSet`:

```ts
export type ControllerPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'

export interface ControllerRenderState {
  show: boolean
  zoom: boolean
  page: number
  total: number
  canZoom: boolean
  canPrev: boolean
  canNext: boolean
  canDownload: boolean
  preset: 'desktop' | 'mobile'
  placement: ControllerPlacement
  current?: Set
}

export interface ControllerRenderActions {
  close: () => void
  zoom: () => void
  rotateLeft: () => void
  rotateRight: () => void
  prev: () => void
  next: () => void
  toPage: (page: number) => void
  download: () => void
}

export interface ControllerRenderSlots {
  Toolbar: ReactNode
  Pagination: ReactNode
  FlipLeft: ReactNode
  FlipRight: ReactNode
}

export type ControllerRender = (args: {
  state: ControllerRenderState
  actions: ControllerRenderActions
  slots: ControllerRenderSlots
}) => ReactNode

export interface ControllerSet {
  pagination?: Exclude<ControllerItem, string>
  rotate?: ControllerItem
  rotateLeft?: ControllerItem
  rotateRight?: ControllerItem
  zoom?: ControllerItem
  download?: ControllerItem
  close?: ControllerItem
  flip?: ControllerItem
  flipLeft?: ControllerItem
  flipRight?: ControllerItem
  backdrop?: string
  color?: string
  placement?: ControllerPlacement
  render?: ControllerRender
}
```

Default:

```ts
controller.placement = 'top-right'
```

Preset defaults:

```ts
desktop.controller.placement = 'top-right'
mobile.controller.placement = 'top-right'
```

Normalization rules:

- `controller=false` returns `{}` and disables default slots and `render`.
- `controller=true` or missing uses the resolved preset controller.
- `controller` object shallow-merges over the resolved preset controller.
- Missing `placement` resolves to `'top-right'`.
- Invalid placement values are not part of the TypeScript surface. Runtime should fall back to `'top-right'` if JavaScript users pass an unknown string.
- Existing umbrella rules stay unchanged: `rotate` forces both rotate buttons on; `flip` forces both side buttons on.

## Placement Behavior

`placement` affects only the default toolbar container `#zmageControl`.

It does not move:

- `#zmageControlFlipLeft`
- `#zmageControlFlipRight`
- `#zmageControlPagination`

Toolbar placement and enter direction:

| placement | position | hidden transform | shown transform |
|---|---|---|---|
| `top-right` | top right | `translateX(100%)` | `translateX(0)` |
| `top-left` | top left | `translateX(-100%)` | `translateX(0)` |
| `bottom-right` | bottom right | `translateX(100%)` | `translateX(0)` |
| `bottom-left` | bottom left | `translateX(-100%)` | `translateX(0)` |
| `top-center` | top center | `translate(-50%, -100%)` | `translate(-50%, 0)` |
| `bottom-center` | bottom center | `translate(-50%, 100%)` | `translate(-50%, 0)` |
| `left-center` | left center | `translate(-100%, -50%)` | `translate(0, -50%)` |
| `right-center` | right center | `translate(100%, -50%)` | `translate(0, -50%)` |

The existing `top-right` behavior is preserved exactly.

Implementation should add a `data-placement` attribute to `#zmageControl` for tests and debugging. Styling should still be CSS-module class based, not inline transform strings, so host styles can override in the usual way.

## Custom Render Behavior

If `controller.render` is a function, `Control` calls it and renders its return value directly in place of the default controller fragment.

Rules:

- `controller=false` wins and `render` is not called.
- `render` receives state, actions, and default slots.
- Returning `null` hides all controller UI.
- Returning only custom nodes means the library does not wrap or position them.
- Rendering `slots.Toolbar`, `slots.Pagination`, `slots.FlipLeft`, or `slots.FlipRight` composes the existing library UI.
- Slots are React nodes created from module-level components or helper functions. Do not define React component types inside `Control()` render.
- The render callback may be called during close with `state.show=false`; users can use that to run their own out animation.
- The callback must not be called when the viewer is fully unmounted.

Action semantics:

- `actions.close()` closes the viewer through `outBrowsing()`, even if `state.zoom` is true.
- `actions.zoom()` toggles viewer zoom through the existing control zoom path. If `state.zoom` is false and `state.canZoom` is false, it is a no-op.
- `actions.rotateLeft()` and `actions.rotateRight()` use the existing rotate callbacks and preserve `onRotating`.
- `actions.prev()`, `actions.next()`, and `actions.toPage(page)` use existing page-switch logic and preserve `loop`, `onSwitching`, and flip animation behavior.
- `actions.download()` downloads `state.current.src` through the same helper as the default controller. It is a no-op when there is no current image.

Default slots preserve existing visibility rules:

- Toolbar is hidden while `zoom=true`, matching the current `!zoom && show` class logic.
- Pagination is rendered only for multi-image sets.
- Flip slots are rendered only for multi-image sets and respect boundary/`loop` behavior.
- The default mobile zoom button keeps the current behavior if users explicitly enable it in the default toolbar slot.

Derived state rules:

- `total` is `set.length`.
- `current` is `set[page]`.
- `canPrev` and `canNext` are false when `total <= 1`.
- With `loop=true` and `total > 1`, `canPrev` and `canNext` are both true.
- With `loop=false`, `canPrev` is `page > 0` and `canNext` is `page < total - 1`.
- `canDownload` is true only when `current?.src` is a non-empty string.

## Architecture

Recommended split in `packages/core/src/components/Control/Control.tsx`:

- Keep `Control` as the context consumer and high-level coordinator.
- Extract module-level helpers for:
  - placement resolution,
  - default toolbar node,
  - default flip-left node,
  - default flip-right node,
  - default pagination node,
  - render args creation.
- Keep `getControllerItem()` as a shared helper, but allow slot builders to use it.
- Keep transient UI-only refs such as the zoom shake ref inside the default toolbar path.
- Do not add React state for placement or render args. Derive them from context and normalized controller.

Vercel React best-practice constraints:

- Do not create component definitions inside `Control()`.
- Do not put high-frequency values in React state.
- Use derived values during render instead of effects.
- Keep callbacks simple and local; no new global listeners.
- Keep CSS placement in classes and `data-placement`, not repeated inline object churn for transform.

## Tests

Add component tests in `packages/core/src/__tests__/Zmage.test.tsx`:

- Default desktop toolbar keeps `data-placement="top-right"`.
- `controller={{ placement: 'bottom-center' }}` applies `data-placement="bottom-center"` to `#zmageControl`.
- `controller={{ placement: 'left-center' }}` changes only `#zmageControl`; side flip buttons and pagination remain in their existing DOM positions.
- Unknown runtime placement falls back to `top-right`.
- `animate={{ browsing: false }}` still sets `#zmageControl.style.transition` to `none` with non-default placement.
- `controller=false` does not render `#zmageControl` and does not call `controller.render`.
- `controller.render` receives stable public state: `page`, `total`, `current`, `canPrev`, `canNext`, `canZoom`, `canDownload`, `preset`, and `placement`.
- A custom close button using `actions.close()` closes the viewer.
- A custom next button using `actions.next()` switches image and calls `onSwitching`.
- A custom pagination button using `actions.toPage(1)` switches directly.
- A callback that returns `slots.Toolbar` preserves default toolbar IDs and button behavior.
- A callback returning `null` hides toolbar, pagination, and flip buttons.

Add type/doc contract checks:

- `ControllerPlacement`, `ControllerRender`, `ControllerRenderState`, `ControllerRenderActions`, and `ControllerRenderSlots` are exported from `react-zmage`.
- `llms-eval` asserts the new controller API appears in `llms.txt`.

## Documentation Sync

Because Phase 5 changes public types and defaults, update:

- `packages/core/src/types/global.ts`
- `packages/core/src/types/default.ts`
- `packages/core/src/index.ts` type exports if needed
- `README.md`
- `AGENTS.md`
- `llms.txt`
- `packages/home/src/schema/param-schema.ts`
- `packages/home/src/docs/sections/Props.tsx`
- `packages/home/src/i18n/*.ts`
- `packages/home/src/playground/controls/ControllerControl.tsx`
- `packages/llms-eval/eval.test.mjs`

Docs must explain:

- `controller.placement` values and default.
- Placement moves only the toolbar, not side flips or pagination.
- `controller.render` replaces the whole controller surface.
- `controller=false` disables `render`.
- Render receives state/actions/slots.
- The callback is a UI render hook, not a lifecycle callback, so users must keep it pure and avoid calling actions during render.

## Verification

Implementation verification should run:

```bash
pnpm --filter react-zmage test
pnpm --filter react-zmage run build
pnpm --filter react-zmage-home run build
pnpm --filter llms-eval run test
pnpm -w run check
git diff --check
```

Agents must not claim human visual verification. Placement animation direction and custom controller feel still need maintainer review in a browser after automated checks pass.
