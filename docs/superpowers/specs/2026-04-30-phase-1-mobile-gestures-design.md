# Phase 1: Mobile Single-Finger Gestures

**Date:** 2026-04-30
**Status:** Approved for specification. Implementation has not started.
**Depends on:** `2026-04-30-zmage-next-interactions-overview.md`
**Scope:** `gesture` public API foundation, preset-driven defaults, single-finger swipe paging, single-finger drag-exit, listener cleanup, and regression tests.

## Goal

Make mobile single-finger gestures explicit, testable, and preset-driven:

1. `preset="mobile"` enables horizontal drag paging and vertical drag-to-exit by default.
2. `preset="desktop"` keeps those mobile gestures disabled by default.
3. `preset="auto"` inherits whichever preset `resolvePreset()` resolves to.
4. Users can disable all gestures with `gesture={false}` or override only one gesture with `gesture={{ swipe: false }}` or `gesture={{ dragExit: { threshold: 120 } }}`.

This phase also fixes the current touch behavior classification path before adding any more gesture complexity.

## Public API Changes

Add the `gesture` prop and the Phase 1 subset of `GestureSet`:

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

export interface GestureSet {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
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
```

`pinchZoom` and `wheelZoom` must not be exported in Phase 1. Public options must
not exist before they have runtime behavior and tests. Later phases extend
`GestureSet` when those features are implemented.

## Preset Defaults

Update `defPreset`:

```ts
desktop: {
  gesture: {
    swipe: false,
    dragExit: false,
  },
}

mobile: {
  gesture: {
    swipe: {
      threshold: 120,
      velocity: 0.35,
      axisLock: 1.2,
      resistance: 0.35,
    },
    dragExit: {
      threshold: 80,
      velocity: 0.35,
      axisLock: 1.2,
      opacity: true,
    },
  },
}
```

The normalized runtime shape should use option objects for enabled features, not raw `true`, so gesture handlers can read thresholds without repeated branching.

## Compatibility Rules

- Existing users who do not pass `gesture` keep desktop behavior unchanged.
- Existing mobile users gain stable drag paging and drag-exit behavior under `preset="mobile"`, matching the intended mobile viewer behavior.
- `gesture={false}` disables swipe and drag-exit even on mobile preset.
- `gesture={{ swipe: false }}` disables only horizontal drag paging.
- `gesture={{ dragExit: false }}` disables only vertical drag-to-exit.
- `gesture.swipe` does not affect keyboard, controller, pagination, or imperative `toPage()` navigation.
- `gesture.dragExit` closes through the existing `outBrowsing()` path and must trigger existing `onBrowsing(false)` semantics.
- `loop` remains the source of truth for whether horizontal swipe wraps at the ends.
- `zoom=true` blocks Phase 1 single-finger swipe and drag-exit. Later pinch work may revise zoom-state touch handling, but Phase 1 must not combine zoom panning with page switching.
- `animate.browsing=false` removes open and close transition timing but must not disable gesture recognition.
- `animate.flip=false` disables page-switch transition, not gesture recognition. If swipe changes page while flip is false, the page should still switch instantly.

## Internal Architecture

### Gesture Normalization

Add a `getGestureConfig()` method next to the existing `getControllerConfig()`, `getHotKeyConfig()`, and `getAnimateConfig()` in `Browser`.

Expected behavior:

```ts
getGestureConfig = (gesture: Props['gesture'], fallback: GestureSet): GestureSet => {
  if (gesture === false) return {}
  if (typeof gesture !== 'object') return normalizeGestureSet(fallback)
  return normalizeGestureSet({ ...fallback, ...gesture })
}
```

`normalizeGestureSet()` should live in a small utility location that can be unit-tested. It converts `true` into default option objects and preserves `false` as disabled.

### Touch State

The current `TouchProfile` should be corrected or replaced with a small single-finger profile. The minimum needed behavior:

- Store start point, current point, start time, locked gesture kind, and last offset.
- Decide gesture kind once the movement passes a small threshold.
- Use `axisLock` so diagonal movement does not fire both swipe and drag-exit.
- Expose current offset for visual transform.
- On end, decide action using both distance and velocity thresholds.

The likely current bug is that `TouchProfile.update()` only tries to classify when `behavior !== IDLE`, while the initial behavior is `IDLE`. Phase 1 must add a failing test for this path before fixing it.

### Event Listeners

In mobile preset:

- Register touch listeners only while the viewer is mounted and shown.
- `touchstart` may be passive if it only records state.
- `touchmove` must be `{ passive: false }` because it needs `preventDefault()` when swipe or drag-exit can consume the gesture.
- `touchend` can be passive if it does not call `preventDefault()`.
- All listener options must be compatible with removal. If the code stores an options object, it should reuse or avoid relying on object identity by removing without options when valid.

The handler should call `preventDefault()` only after it knows the viewer owns the gesture. It should not block unrelated page touches when the viewer is closed.

### Visual Feedback

Horizontal swipe:

- While moving, center image follows horizontal offset.
- Side images continue to use existing side-image render path.
- At the boundary with `loop=false`, apply `resistance` to show a bounded drag instead of a full page drag.
- On accepted end, call `toNextPage()` or `toPrevPage()`.
- On rejected end, return to current page with the existing touch end transition.

Vertical drag-exit:

- While moving, center image follows vertical offset.
- If `dragExit.opacity !== false`, background opacity may reduce with drag distance. The exact opacity curve can stay simple in Phase 1.
- On accepted end, call `outBrowsing()`.
- On rejected end, return to centered browsing style.

Phase 1 should not introduce pinch, wheel zoom, or zoom-state touch panning.

## Files To Touch

Core public types and defaults:

- `packages/core/src/types/global.ts`
- `packages/core/src/types/default.ts`
- `packages/core/src/index.ts` if new gesture types need re-export

Runtime:

- `packages/core/src/components/context.tsx`
- `packages/core/src/components/Browser/Browser.tsx`
- `packages/core/src/components/Image/Image.tsx`
- `packages/core/src/components/Image/Image.utils.ts`

Tests:

- `packages/core/src/components/Image/__tests__/Image.utils.test.ts`
- `packages/core/src/__tests__/Zmage.test.tsx`

Public docs for this phase:

- `README.md`
- `README.zh-CN.md` if present when implemented
- `AGENTS.md`
- `llms.txt`
- `packages/home/src/schema/param-schema.ts`
- relevant home docs and i18n files

Docs should be updated in the implementation phase that lands the public `gesture` API, not deferred.

## Tests

### Pure Function Tests

Add or extend tests for the gesture profile:

- `IDLE` movement that crosses horizontal threshold becomes `SWIPING`.
- `IDLE` movement that crosses vertical threshold becomes `LIVING` or the final chosen drag-exit behavior name.
- Movement below threshold remains idle and does not trigger page switch or close.
- Horizontal movement that does not satisfy `axisLock` does not become swipe.
- Vertical movement that does not satisfy `axisLock` does not become drag-exit.
- Distance threshold alone can accept a gesture.
- Velocity threshold alone can accept a gesture.
- `loop=false` boundary applies resistance.

Add tests for gesture normalization:

- `undefined` on desktop resolves to desktop defaults.
- `undefined` on mobile resolves to mobile defaults.
- `false` resolves to an empty gesture set.
- `{ swipe: false }` disables swipe and leaves other preset defaults.
- `{ dragExit: { threshold: 120 } }` merges only that option.

### Component Tests

Add or extend Vitest + jsdom tests:

- `preset="mobile"` registers touch listeners and cleans them on unmount.
- `preset="desktop"` does not register Phase 1 mobile touch listeners.
- `preset="auto"` follows `matchMedia('(pointer: coarse) and (hover: none)')`.
- Horizontal swipe on mobile calls `onSwitching(nextPage)` and changes page.
- Horizontal swipe respects `loop=false` at first and last page.
- `gesture={{ swipe: false }}` prevents horizontal swipe page switching.
- Vertical drag-exit on mobile calls `onBrowsing(false)` through the existing close path.
- `gesture={{ dragExit: false }}` prevents vertical drag-exit.
- `zoom=true` prevents Phase 1 single-finger swipe and drag-exit.
- `animate.browsing=false` does not add transition to close path but still allows drag-exit.

### Cleanup Tests

Extend StrictMode listener tests:

- No leaked `touchstart`, `touchmove`, or `touchend` listeners after StrictMode unmount.
- No setState warning after quick open and close.
- Any new RAF or timer used by drag settle is cancelled in `componentWillUnmount`.

## Done When

Phase 1 is done when:

- Public `gesture` types and defaults exist.
- `Browser.getPropsWithEnv()` includes normalized `gesture`.
- Mobile preset uses gesture defaults from `defPreset`, not hard-coded handler assumptions.
- Single-finger swipe and drag-exit behavior are controlled by `gesture.swipe` and `gesture.dragExit`.
- Desktop default behavior stays unchanged.
- Tests cover defaults, overrides, disabled states, listener cleanup, and core gesture actions.
- Public docs mention `gesture` and the preset-driven mobile defaults.
- `pnpm --filter react-zmage test` and `pnpm --filter react-zmage run build` pass during development.
- `pnpm -w run check` passes before merging this public API phase.

## Out Of Scope

- Pinch zoom.
- Wheel zoom.
- Cover object-fit and clip transition.
- Controller placement or custom render.
- Per-frame gesture callbacks.
- Browser visual verification claims.

## Next Phase Gate

Before writing Phase 2 spec:

1. Review the Phase 1 diff.
2. Check the final normalized `gesture` shape and tests.
3. Check whether `TouchProfile` was repaired or replaced.
4. Record any constraints that affect cover geometry or later zoom scale work.
5. Update the overview if Phase 1 changed any shared defaults or merge rules.
