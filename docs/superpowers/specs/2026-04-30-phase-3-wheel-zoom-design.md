# Phase 3 - Wheel Zoom And Shared Zoom Scale

**Date:** 2026-04-30
**Status:** Draft for review
**Depends on:** Phase 2 cover geometry implementation, commit `a0573d7`
**Scope:** `packages/core` desktop wheel zoom, shared zoom scale model, `gesture.wheelZoom` public API, tests, and public docs.

## Phase 2 Facts Checked

Phase 2 landed these details that affect this phase:

- `ImageStyleType` now carries `scale`, `radius`, and optional `clip`. Any zoom style update must preserve `clip` endpoint behavior by using the existing `getEndpointClip(context)` path.
- `MotionPhase` is currently `idle | browsing-instant | zoom-enter | zoom-follow | closing-follow`.
- `zoom-follow` RAF already interpolates `x`, `y`, `scale`, and `rotate` and writes `transform` directly with `transition: none`.
- `getZoomingStyle()` still hard-codes `scale: 1`, so mousemove in zoom mode always targets 1:1 natural-size zoom.
- `handleMouseMove()` already funnels pointer-follow updates into `startZoomFollow()`.
- `ZoomTrigger` is currently `'control' | 'keyboard'`.
- `normalizeGestureSet()` currently knows only `swipe` and `dragExit`; `gesture=false` returns explicit false markers only for those two keys.
- Touch gestures are disabled while `zoom=true`. Phase 3 must not change that; pinch zoom is Phase 4.

These facts make the Phase 3 implementation smaller than the original overview suggested: wheel zoom can reuse `zoom-follow`; the main missing piece is an explicit target zoom scale.

## Problem

Current zoom is binary:

- browsing style uses fit-to-screen scale.
- zoom style uses natural-size scale `1`.
- mousemove only changes position, not zoom scale.

That blocks wheel zoom because a wheel event needs to change scale incrementally and smoothly. If wheel zoom writes its own transform path, it will diverge from keyboard/control zoom and from the existing RAF cleanup rules.

## Goals

- In zoom mode, desktop users can use the mouse wheel or trackpad scroll to zoom in and out smoothly.
- Wheel zoom uses the existing `zoom-follow` RAF interpolation rather than a new animation system.
- Mousemove and wheel zoom share the same target scale. Moving the pointer after wheel zoom must not snap scale back to `1`.
- `gesture.wheelZoom` is preset-driven and configurable.
- Default desktop behavior enables wheel zoom in zoom mode; default mobile behavior keeps it disabled.
- Wheel zoom must not capture page scroll while the viewer is open but not in zoom mode.
- Zooming out to `minScale` exits zoom mode through the existing zoom-out path, then protects against residual wheel/trackpad momentum for a configurable duration.
- Users can reverse the wheel zoom direction without changing the default direction.
- Existing keyboard/control zoom semantics and callback signatures remain compatible.

## Non-Goals

- Pinch zoom.
- Touch panning while zoomed.
- Arbitrary per-frame zoom callbacks.
- Changing `onZooming(boolean)` to expose scale.
- Enabling wheel zoom while browsing mode is not zoomed.
- Changing `hideOnScroll` behavior outside zoom mode.

## Public API

Extend `GestureSet` with Phase 3 wheel zoom only:

```ts
export interface GestureSet {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
  wheelZoom?: boolean | GestureWheelZoomOptions
}

export interface GestureWheelZoomOptions {
  step?: number
  smooth?: boolean
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'pointer' | 'viewport'
  reverse?: boolean
  exitGuardDuration?: number
}
```

Defaults:

```ts
export const defaultGestureWheelZoomOptions = {
  step: 0.12,
  smooth: true,
  minScale: 'fit',
  maxScale: 4,
  center: 'pointer',
  reverse: false,
  exitGuardDuration: 1000,
}
```

Preset defaults:

```ts
desktop.gesture.wheelZoom = { ...defaultGestureWheelZoomOptions }
mobile.gesture.wheelZoom = false
```

Normalization rules:

- `gesture=false` returns `{ swipe: false, dragExit: false, wheelZoom: false }`.
- `gesture={{ wheelZoom: false }}` disables only wheel zoom and leaves existing swipe/dragExit preset defaults intact.
- `gesture={{ wheelZoom: true }}` enables wheel zoom with default wheel options.
- `gesture={{ wheelZoom: { maxScale: 3 } }}` shallow-merges default/preset wheel options and the user object.

Extend `ZoomTrigger` internally:

```ts
export type ZoomTrigger = 'control' | 'keyboard' | 'wheel'
```

This is not a new public callback argument. It only keeps the existing context routing explicit.

## Behavior

Wheel zoom is active only when all conditions are true:

- viewer is shown.
- `zoom === true`.
- normalized `gesture.wheelZoom` is an option object.
- current image can zoom according to existing `canZoom` behavior.

When inactive, wheel events must not call `preventDefault()`.

When active:

1. Normalize wheel delta to pixel-like units.
2. Apply direction config:

```ts
zoomDeltaY = reverse ? -pixelDeltaY : pixelDeltaY
```

3. Convert delta into a multiplicative scale factor:

```ts
factor = Math.exp((-zoomDeltaY / 100) * step)
nextScale = clamp(currentTargetScale * factor, minScale, maxScale)
```

4. If `center === 'pointer'`, use the wheel event point as the zoom focus.
5. If `center === 'viewport'`, use the viewport center.
6. Compute the next zooming style with the shared target scale.
7. If `smooth !== false`, send the style into `startZoomFollow()`.
8. If `smooth === false`, write/settle the style immediately with `transition: none`.
9. If zooming out reaches `minScale`, call `startWheelZoomExitGuard(exitGuardDuration)` and then `toggleZoom('wheel')`.
10. During the guard window, wheel events are still listened to in browsing mode and call `preventDefault()` only to absorb residual wheel/trackpad momentum. After the timer expires, the wheel listener is removed and normal browsing scroll behavior resumes.

## Shared Zoom Scale Model

The current `getZoomingStyle()` should become scale-aware:

```ts
getZoomingStyle(context, imageRef, pointer, { scale })
```

Rules:

- If `scale` is omitted, keep current behavior and use `1`.
- Mousemove in zoom mode passes the current wheel target scale instead of omitting scale.
- Keyboard/control zoom enter initializes the target scale to `1`, preserving existing behavior.
- Wheel zoom mutates only instance fields during high-frequency input; React state is updated only when the RAF settles or when zoom mode exits.

Suggested instance fields in `Image`:

```ts
zoomTargetScale?: number
zoomTargetPoint?: Coordinate
wheelZoomExitGuardUntil: number
wheelZoomExitGuardTimer?: ReturnType<typeof setTimeout>
```

`zoomTargetScale` is cleared by `resetZoomMotionState()` and page/show changes. It should be initialized to `1` on normal zoom enter.

`getCurrentWheelZoomScale()` should prefer:

1. `zoomFollowTargetStyle?.scale`
2. `zoomTargetScale`
3. `state.currentStyle.scale` when `_type === 'zooming'`
4. `1`

This prevents rapid wheel events from using stale settled state.

## Geometry

Add small pure helpers in `Image.utils.ts`:

```ts
export interface ZoomScaleRange {
  min: number
  max: number
  fit: number
}

export const getZoomScaleRange(...)
export const normalizeWheelDelta(...)
export const getNextWheelZoomScale(...)
```

`fit` should use the existing `calcFitScale(naturalWidth, naturalHeight, edge, viewport)` so wheel zoom agrees with browsing fit geometry.

`minScale: 'fit'` resolves to `fit`.

For explicit `minScale`, clamp to a finite positive number. If the user passes invalid values, fall back to defaults rather than throwing during input handling.

The scale-aware `getZoomingStyle()` should compute x/y from the physical image size at the requested scale:

```ts
imageWidth = naturalWidth * scale
imageHeight = naturalHeight * scale
```

When the scaled image is smaller than the viewport on an axis, that axis offset is `0`. This keeps small or fully zoomed-out images centered.

## Listener Lifecycle

Add a wheel listener next to existing zoom mousemove listener management.

- Register only while `show && zoom && wheelZoomEnabled`.
- Use `{ passive: false }` because active wheel zoom calls `preventDefault()`.
- Remove synchronously on zoom exit, close, page switch, and unmount.
- Do not reuse touch listener options for wheel; define a dedicated `WHEEL_LISTENER_OPTIONS`.

This follows the same cleanup invariant as touch and RAF state.

## Tests

### Pure Tests

Add tests in `Image.utils.test.ts`:

- `normalizeGestureSet(false)` returns explicit `wheelZoom: false`.
- `gesture={{ wheelZoom: false }}` disables only wheel zoom.
- `gesture={{ wheelZoom: { maxScale: 3 } }}` merges default wheel options.
- desktop fallback with `wheelZoom: true` normalizes to the wheel option object.
- `getNextWheelZoomScale()` zooms in for negative `deltaY` and zooms out for positive `deltaY`.
- scale clamps to resolved `minScale` and `maxScale`.
- `minScale: 'fit'` resolves through `calcFitScale`.
- `getZoomingStyle(..., { scale: 2 })` returns `scale: 2`, not `1`.
- scale-aware zoom style centers an axis when the scaled image is smaller than the viewport on that axis.

### Component Tests

Add tests in `Zmage.test.tsx`:

- desktop preset registers a `wheel` listener only after entering zoom mode.
- mobile preset does not register wheel zoom by default.
- `gesture={{ wheelZoom: false }}` prevents wheel listener registration.
- wheel in zoom mode calls `preventDefault()`.
- wheel in browsing mode does not call `preventDefault()`.
- wheel zoom updates the center image transform through RAF and preserves the new scale on subsequent mousemove.
- first zoom-out wheel event at `minScale` only restores the fitted size; the next same-direction event calls `onZooming(false)` through the existing zoom-out path.
- `gesture.wheelZoom.reverse=true` reverses the zoom direction.
- StrictMode unmount cleans the wheel listener and cancels any pending zoom-follow RAF.

## Documentation Sync

Because Phase 3 adds public API and defaults, update:

- `packages/core/src/types/global.ts`
- `packages/core/src/types/default.ts`
- `packages/core/src/index.ts`
- `README.md`
- `AGENTS.md`
- `llms.txt`
- `packages/home/src/schema/param-schema.ts`
- `packages/home/src/docs/sections/Props.tsx`
- all `packages/home/src/i18n/*.ts`
- `packages/home/src/playground/controls/AnimateControl.tsx` only if the existing control surface can expose `gesture.wheelZoom` cleanly; otherwise add it in the gesture control area.
- `packages/llms-eval/eval.test.mjs`

Rebuild home after root `llms.txt` changes so `docs/llms.txt` and built assets are refreshed.

## Compatibility

- Existing keyboard/control zoom still enters 1:1 zoom.
- Existing `onZooming(boolean)` signature is unchanged.
- Existing `onSwitching`, `onBrowsing`, and `onRotating` signatures are unchanged.
- `hideOnScroll` remains meaningful while not zoomed because wheel zoom does not prevent wheel events in browsing mode.
- Mobile preset does not gain wheel zoom by default.
- `gesture=false` disables wheel zoom along with existing implemented gestures.
- SSR remains safe: no top-level `window` / `document` reads.

## Done When

- `GestureWheelZoomOptions` is typed, exported, defaulted, normalized, documented, and covered by llms eval.
- Desktop preset enables wheel zoom only while zoomed.
- Wheel zoom reuses `zoom-follow` RAF and does not add a second transform animation system.
- Mousemove after wheel zoom preserves target scale.
- Zooming out to `minScale` exits zoom mode immediately and guards residual wheel events for `exitGuardDuration` ms.
- `reverse=true` flips wheel zoom direction.
- Wheel listener is passive:false only when needed and is cleaned on exit/unmount.
- Focused tests pass during development.
- Before commit, run:

```bash
pnpm --filter react-zmage test
pnpm --filter react-zmage run build
pnpm --filter react-zmage-home run build
pnpm --filter llms-eval run test
pnpm -w run check
git diff --check
```
