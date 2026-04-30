# Zmage Next Interactions Overview

**Date:** 2026-04-30
**Status:** Approved for staged specification. Implementation has not started.
**Scope:** `packages/core` public interaction API, image geometry, mobile gestures, zoom input, controller extension, and the public docs that describe those changes.

## Goal

Add the next interaction layer for `react-zmage` without splitting behavior into unrelated switches. New gesture, zoom, cover-transition, and controller features must be controlled by explicit public parameters, must inherit sensible defaults from `preset`, and must remain compatible with the existing `controller`, `hotKey`, `animate`, `loop`, and lifecycle callback contracts.

The work is intentionally split into small phases. Each phase gets its own spec and implementation plan. Before writing any later phase spec, the previous phase implementation must be checked so the next spec can adjust to the actual code shape, tests, and any discovered constraints.

## Phase Map

| Phase | Spec | Purpose | May start after |
|---|---|---|---|
| 1 | `2026-04-30-phase-1-mobile-gestures-design.md` | Preset-driven single-finger mobile swipe and drag-exit | This overview |
| 2 | `2026-04-30-phase-2-cover-geometry-clip-design.md` | Cover object-fit geometry, clip-path, and radius transition | Phase 1 implementation is reviewed |
| 3 | `2026-04-30-phase-3-wheel-zoom-design.md` | Shared zoom-scale model plus wheel zoom | Phase 2 implementation is reviewed |
| 4 | `2026-04-30-phase-4-pinch-zoom-design.md` | Mobile pinch zoom, reset-to-fit, and gesture locking | Phase 3 implementation is reviewed |
| 5 | `2026-04-30-phase-5-controller-api-design.md` | Controller placement and full custom render callback | Phase 4 implementation is reviewed |

Only Phase 1 is fully specified now. Phase 2-5 names and purposes are fixed, but their detailed specs stay unwritten until the previous phase lands and is reviewed.

## Public API Direction

### Gesture

Add `gesture` next to the existing functional props. The final target shape is:

```ts
export interface FunctionalParams {
  controller?: boolean | ControllerSet
  hotKey?: boolean | HotKey
  animate?: boolean | Animate
  gesture?: boolean | GestureSet
}

export interface FunctionalNormalizedParams {
  controller?: ControllerSet
  hotKey?: HotKey
  animate?: Animate
  gesture?: GestureSet
}
```

The merge rule must mirror `controller`, `hotKey`, and `animate`:

- `gesture === false`: disable every gesture and wheel-zoom feature.
- `gesture === true` or `gesture === undefined`: use the current preset default.
- `typeof gesture === 'object'`: shallow-merge the object over the current preset default.
- A child value set to `false` disables only that child feature.
- A child value set to `true` enables that child feature with its default options.
- A child object enables that child feature and overrides only the specified options.

```ts
export interface GestureSet {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
  pinchZoom?: boolean | GesturePinchZoomOptions
  wheelZoom?: boolean | GestureWheelZoomOptions
}

export interface GestureSwipeOptions {
  threshold?: number
  velocity?: number
  axisLock?: number
  resistance?: number
}

export interface GestureDragExitOptions {
  threshold?: number
  velocity?: number
  axisLock?: number
  opacity?: boolean
}

export interface GesturePinchZoomOptions {
  minScale?: 'fit' | number
  maxScale?: number
  resetBelowFit?: boolean
  center?: 'gesture' | 'viewport'
}

export interface GestureWheelZoomOptions {
  step?: number
  smooth?: boolean
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'pointer' | 'viewport'
}
```

Each phase may publish only the gesture keys it implements. A key must not be
exported in public types or documented as available before it has runtime
behavior and tests. The final target shape above is the shared direction, not a
license to ship no-op options.

### Preset Defaults

At the end of all interaction phases, `preset` decides the default interaction
family:

```ts
desktop: {
  gesture: {
    swipe: false,
    dragExit: false,
    pinchZoom: false,
    wheelZoom: true,
  },
}

mobile: {
  gesture: {
    swipe: true,
    dragExit: true,
    pinchZoom: true,
    wheelZoom: false,
  },
}
```

`preset="auto"` continues to resolve through `resolvePreset()`. Once resolved, it uses the corresponding desktop or mobile gesture defaults.

During staged implementation, each phase adds only the defaults for the keys it
implements. For example, Phase 1 adds `swipe` and `dragExit`; Phase 3 adds
`wheelZoom`; Phase 4 adds `pinchZoom`.

Default option values:

```ts
swipe: {
  threshold: 120,
  velocity: 0.35,
  axisLock: 1.2,
  resistance: 0.35,
}

dragExit: {
  threshold: 80,
  velocity: 0.35,
  axisLock: 1.2,
  opacity: true,
}

pinchZoom: {
  minScale: 'fit',
  maxScale: 4,
  resetBelowFit: true,
  center: 'gesture',
}

wheelZoom: {
  step: 0.12,
  smooth: true,
  minScale: 'fit',
  maxScale: 4,
  center: 'pointer',
}
```

### Animate Cover

Phase 2 adds `animate.cover` as the controlled escape hatch for cover geometry improvements:

```ts
export interface Animate {
  browsing?: boolean
  flip?: AnimateFlip
  cover?: boolean | AnimateCoverOptions
}

export interface AnimateCoverOptions {
  objectFit?: boolean
  clip?: boolean
  radius?: boolean
}
```

Default:

```ts
cover: {
  objectFit: true,
  clip: true,
  radius: true,
}
```

Compatibility rules:

- `animate.cover === false` keeps the old cover geometry path.
- `animate.browsing === false` still wins on transition timing: compute correct geometry, but do not animate it.
- `animate.flip` continues to control page switching only.

### Controller

Phase 5 extends `ControllerSet`:

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

export type ControllerRender = (args: {
  state: {
    show: boolean
    zoom: boolean
    page: number
    total: number
    canZoom: boolean
    preset: 'desktop' | 'mobile'
    placement: ControllerPlacement
    current?: Set
  }
  actions: {
    close: () => void
    zoom: () => void
    openOriginal: () => void
    rotateLeft: () => void
    rotateRight: () => void
    prev: () => void
    next: () => void
    toPage: (page: number) => void
    download: () => void
  }
  slots: {
    Toolbar: React.ReactNode
    Pagination: React.ReactNode
    FlipLeft: React.ReactNode
    FlipRight: React.ReactNode
  }
}) => React.ReactNode
```

Compatibility rules:

- `controller=false` has the highest priority and disables all controller UI, including `render`.
- Existing per-button `ControllerItem` behavior stays valid.
- `placement` changes the default toolbar position and enter direction only. It must not move flip-left, flip-right, or pagination unless a later design explicitly says so.
- The render callback exposes stable public state only. It must not expose `mounted`, `pageWithStep`, `zoomShakeKey`, `zoomTrigger`, or other internal fields.

## Architecture Constraints

### State Ownership

- `Browser` remains the owner of viewer state: `show`, `zoom`, `page`, `rotate`, `canZoom`, and lifecycle callback dispatch.
- `Image` remains the owner of image geometry, touch/wheel input handling, RAF interpolation, and DOM-adjacent transient values.
- `Control` remains a UI layer. It must not own gesture state.
- `Context` may carry normalized `gesture`, but should not expose per-frame gesture values.

### Vercel React Best Practices Constraints

The implementation must follow these rules:

- High-frequency values such as touch position, wheel target scale, pinch center, velocity, and RAF target style must live in instance fields or refs, not React state.
- React state is reserved for values that affect rendered structure or public status.
- Global listeners must be registered only while needed and cleaned synchronously on close and unmount.
- Use `passive: true` only for listeners that never call `preventDefault()`. Gesture and wheel handlers that must block page scroll must use `passive: false`.
- Batch DOM reads before writes. `getBoundingClientRect()` and `getComputedStyle()` must be read before writing `transform`, `clipPath`, or `borderRadius`.
- Reuse the existing `zoom-enter` and `zoom-follow` split. Wheel and pinch are new target sources, not new animation systems.
- Do not add runtime heavy dependencies for gestures or zoom. Browser tests may add test-only dependencies.
- Keep SSR and RSC safe: no unguarded top-level `window` or `document` reads.
- Do not define React components inside React components when splitting controller slots.

### Existing Contract Preservation

- `animate.browsing=false` is still a full-chain no-animation contract. Browser, Background, Control, Caption, and Image must stay synchronized.
- Keyboard and control zoom must keep using the same zoom pipeline. Differences may only be input target or center point.
- `loop` remains the source of truth for page wrap behavior.
- `onBrowsing`, `onZooming`, `onSwitching`, `onRotating`, and `onError` callback signatures must not change.
- Mobile preset defaults may gain gesture behavior, but current desktop behavior must remain unchanged unless the user explicitly enables a new feature.

## Documentation Rules

Public API changes must be propagated in the same implementation phase that introduces them:

- `packages/core/src/types/global.ts`
- `packages/core/src/types/default.ts`
- `packages/core/src/index.ts` type exports when new public types are added
- `README.md`
- `README.zh-CN.md` if present at implementation time
- `AGENTS.md` public contract section if the public contract changes
- `llms.txt`
- `packages/home` docs and prop schema

The `sync-public-docs` skill applies to implementation phases that touch public props or defaults.

## Testing Strategy

Use the smallest reliable test for each behavior:

- Pure geometry and state-machine logic belongs in `packages/core/src/components/Image/__tests__/Image.utils.test.ts` or focused sibling test files.
- React wiring, callbacks, normalized props, listener registration, and DOM inline style strings belong in Vitest + jsdom component tests.
- Browser-only behavior such as real touch input, `clip-path` pixels, and wheel smoothness should get small Playwright smoke tests once the relevant phase introduces browser-sensitive behavior.
- Agent runs may verify automated commands, but must not claim human visual verification of gesture feel or animation quality.

Standard verification chain:

```bash
pnpm --filter react-zmage test
pnpm --filter react-zmage run build
pnpm -w run check
git diff --check
```

Individual phases may use a narrower command during development, but public API phases and final integration must run the full chain.

## Dynamic Spec Rule

Before writing Phase 2, Phase 3, Phase 4, or Phase 5 spec:

1. Check the previous phase implementation diff.
2. Read any new or changed tests.
3. Record implementation facts that affect the next phase.
4. Adjust the next phase API or architecture only if the previous phase exposes a real constraint.
5. Keep this overview as the source for shared defaults. If a later phase must change shared defaults, update this overview in the same PR as that phase spec.

## Out Of Scope

- Shipping all phases in one PR.
- Adding per-frame lifecycle callbacks for drag, pinch, or wheel.
- Adding a new animation engine.
- Using third-party gesture libraries in the runtime package.
- Claiming visual or tactile gesture quality from automated tests alone.
