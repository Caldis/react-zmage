# Phase 4 - Mobile Pinch And Double Tap Zoom

**Date:** 2026-05-01
**Status:** Draft for review
**Depends on:** Phase 3 wheel zoom implementation, commit `b2f55ce`
**Scope:** `packages/core` mobile pinch zoom, mobile double tap zoom, touch-action policy, shared zoom scale reuse, tests, and public docs.

## Phase 3 Facts Checked

Phase 3 landed these details that affect this phase:

- `ZoomTrigger` is currently `'control' | 'keyboard' | 'wheel'`.
- `ImageStyleType.scale` now represents the absolute rendered scale against the natural image size.
- `getZoomingStyle(context, imageRef, pointer, { scale })` is scale-aware.
- `zoomTargetScale`, `getCurrentZoomTargetScale()`, `startZoomFollow()`, and `applyZoomStyleImmediately()` exist in `Image.tsx`.
- Wheel zoom exits zoom mode when the resolved scale reaches `minScale`, then uses `exitGuardDuration` to absorb residual wheel momentum.
- `getWheelZoomScaleRange()` resolves `minScale: 'fit'` through `calcFitScale()`.
- Mobile touch handling is still single-pointer only: `handleTouchStart()` reads one touch point and starts `TouchGesture`.
- `TouchGesture` only models single-finger `swipe` and `dragExit`.
- `getActiveGesture()` disables `swipe` and `dragExit` while `zoom=true`.
- `normalizeGestureSet()` currently knows `swipe`, `dragExit`, and `wheelZoom`.
- `#zmageViewport` has no `touch-action` style today.

The useful Phase 3 result is the shared scale-aware zoom geometry. Phase 4 should reuse it instead of adding another transform model.

## Browser Behavior Checked

Native mobile browser double-tap zoom cannot be treated as a normal default action that can always be canceled after the second tap.

Relevant platform guidance:

- Pointer Events says viewport panning and zooming cannot be suppressed by canceling pointer events; authors must declare intended behavior through `touch-action`.
- MDN recommends `touch-action` even when an app uses Touch Events, so the browser knows the intent before event listeners run.
- Chrome and WebKit both describe `touch-action: manipulation` as the element-level way to remove browser double-tap zoom while keeping panning and pinch zoom.
- For a surface that implements its own pinch zoom, `touch-action: none` is the correct declaration for that surface. It should be scoped to the viewer, not applied to the page.

References:

- https://www.w3.org/TR/pointerevents3/#the-touch-action-css-property
- https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
- https://developer.chrome.com/blog/300ms-tap-delay-gone-away
- https://webkit.org/blog/5610/more-responsive-tapping-on-ios/

## Problem

Mobile browsing now supports single-finger swipe and drag-exit, but it still lacks mobile zoom gestures:

- Users cannot pinch to zoom the image.
- Users cannot double tap the image to enter or exit zoom.
- Browser native double-tap zoom can compete with app-level double tap unless the viewer declares the right `touch-action`.
- The current single-finger `TouchGesture` path has no way to lock a multi-touch sequence, so a two-finger gesture could accidentally degrade into swipe or drag-exit when one finger is lifted.

## Goals

- Mobile users can pinch to zoom into the current image.
- Pinch updates reuse the shared scale-aware zoom geometry from Phase 3.
- If pinch zoom ends at or below the resolved fit scale, the image exits zoom mode and returns to the normal centered browsing view. The viewer stays open.
- Mobile users can double tap the image to enter zoom, then double tap again to exit zoom.
- Browser native double-tap zoom and page pinch zoom must not compete with viewer gestures on the fullscreen viewer surface.
- Gesture defaults are preset-driven and can be controlled through public options.
- High-frequency touchmove data stays out of React state during the gesture.
- Existing swipe, drag-exit, wheel zoom, hotkey, controller, and callback contracts remain compatible.

## Non-Goals

- Single-finger panning while zoomed.
- Momentum or rubber-band physics for pinch.
- Changing `onZooming(boolean)` to expose scale.
- Changing `reportCanZoom()` semantics for the desktop zoom button and keyboard zoom.
- Using `user-scalable=no` or any global viewport meta requirement.
- Capturing gestures outside the fullscreen viewer.
- Replacing existing mouse wheel zoom behavior.

## Public API

Extend `GestureSet` with Phase 4 mobile zoom controls:

```ts
export type GestureTouchAction = 'managed' | 'auto' | 'manipulation' | 'none'

export interface GestureSet {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
  wheelZoom?: boolean | GestureWheelZoomOptions
  pinchZoom?: boolean | GesturePinchZoomOptions
  doubleTapZoom?: boolean | GestureDoubleTapZoomOptions
  touchAction?: GestureTouchAction
}

export interface GesturePinchZoomOptions {
  minScale?: 'fit' | number
  maxScale?: number
  resetBelowFit?: boolean
  center?: 'gesture' | 'viewport'
}

export interface GestureDoubleTapZoomOptions {
  scale?: number
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'tap' | 'viewport'
  interval?: number
  distance?: number
}
```

Defaults:

```ts
export const defaultGesturePinchZoomOptions = {
  minScale: 'fit',
  maxScale: 4,
  resetBelowFit: true,
  center: 'gesture',
}

export const defaultGestureDoubleTapZoomOptions = {
  scale: 1,
  minScale: 'fit',
  maxScale: 4,
  center: 'tap',
  interval: 300,
  distance: 32,
}
```

Preset defaults:

```ts
desktop.gesture.pinchZoom = false
desktop.gesture.doubleTapZoom = false
desktop.gesture.touchAction = 'managed'

mobile.gesture.pinchZoom = { ...defaultGesturePinchZoomOptions }
mobile.gesture.doubleTapZoom = { ...defaultGestureDoubleTapZoomOptions }
mobile.gesture.touchAction = 'managed'
```

`touchAction: 'managed'` is the default because the correct CSS value depends on which gestures are enabled:

- if normalized `pinchZoom` is enabled, resolved viewer `touch-action` is `none`.
- else if normalized `doubleTapZoom` is enabled, resolved viewer `touch-action` is `manipulation`.
- else resolved viewer `touch-action` is `auto`.

Explicit user values win:

- `touchAction: 'none'` always applies `touch-action: none`.
- `touchAction: 'manipulation'` always applies `touch-action: manipulation`.
- `touchAction: 'auto'` always applies `touch-action: auto`.

Normalization rules:

- `gesture=false` returns explicit false markers for all implemented gesture features and `touchAction: 'auto'`.
- `gesture={{ pinchZoom: false }}` disables only pinch zoom.
- `gesture={{ doubleTapZoom: false }}` disables only double tap zoom.
- `gesture={{ pinchZoom: true }}` enables pinch zoom with default pinch options.
- `gesture={{ doubleTapZoom: true }}` enables double tap zoom with default double tap options.
- Child option objects shallow-merge default options, preset options, and user options.
- Invalid numeric options fall back to defaults instead of throwing during input handling.

Extend `ZoomTrigger` internally:

```ts
export type ZoomTrigger = 'control' | 'keyboard' | 'wheel' | 'pinch' | 'doubleTap'
```

This remains internal state only. It does not change lifecycle callback arguments.

## Touch-Action Policy

The implementation should apply the resolved `touch-action` to `#zmageViewport`, not to `html`, `body`, or the consumer page.

Reasoning:

- The viewer is the custom direct-manipulation surface.
- Page-level `user-scalable=no` is bad for accessibility and outside a component library's ownership.
- `touch-action: none` is needed when the viewer owns pinch.
- `touch-action: manipulation` is enough when the viewer only needs custom double tap and can leave native pinch alone.
- Scoping the style to the viewer avoids changing the host app after the viewer unmounts.

Implementation can use either an inline style on `#zmageViewport` or stable CSS classes. The value must come from normalized gesture config.

## Pinch Behavior

Pinch zoom is active only when all conditions are true:

- viewer is shown.
- resolved preset is mobile.
- normalized `gesture.pinchZoom` is an option object.
- when entering from browsing, the current image can enter zoom according to existing `canZoom` state.
- the touch sequence starts with at least two active touches on the center image.

When inactive, pinch handling must not call `preventDefault()`.

`canZoom` is only the gate for entering zoom from browsing. If the image is already zoomed, pinch may adjust scale even if later image load bookkeeping changes `canZoom`.

When active:

1. Start a `PinchGesture` sequence from the first two touches.
2. Cancel or suspend the current single-finger `TouchGesture`.
3. Lock the whole touch sequence as pinch until all fingers are lifted.
4. Resolve the scale range:

```ts
minScale = options.minScale === 'fit' ? fitScale : options.minScale
maxScale = Math.max(minScale, options.maxScale)
```

5. Use the current visual scale as `baseScale`. In browsing mode this is the fit scale; in zoom mode this is `getCurrentZoomTargetScale()`.
6. Compute the next scale from the two-finger distance ratio:

```ts
nextScale = clamp(baseScale * (currentDistance / startDistance), minScale, maxScale)
```

7. If `center === 'gesture'`, use the two-finger midpoint as the zoom focus.
8. If `center === 'viewport'`, use the viewport center as the zoom focus.
9. If the image is not already zoomed, enter zoom with trigger `'pinch'` without running the normal natural-size `zoom-enter` transition.
10. During touchmove, write transform, opacity, clip, and radius directly to the center image with `transition: none`.
11. Store high-frequency target scale and focus in instance fields, not React state.
12. On touchend, commit the final style to React state once.

Reset-to-fit semantics:

- If `resetBelowFit !== false` and the final scale is at or below `minScale`, call `toggleZoom('pinch')` to leave zoom mode.
- The close of zoom mode returns to the normal centered browsing view.
- The viewer remains open.
- This matches the wheel zoom meaning of "scale back to the default fit view", without adding a third visible state.

If `resetBelowFit === false`, the image may remain in zoom mode at `minScale`; this is an opt-in advanced behavior.

## Double Tap Behavior

Double tap zoom is active only when all conditions are true:

- viewer is shown.
- resolved preset is mobile.
- normalized `gesture.doubleTapZoom` is an option object.
- when entering from browsing, the current image can enter zoom according to existing `canZoom` state.
- the touch sequence is a single-touch sequence that starts on the center image.
- no swipe, drag-exit, or pinch gesture has locked the current sequence.
- movement stays within `distance`.
- the second tap arrives within `interval`.

When active:

1. The first tap records time and point.
2. If the second tap matches interval and distance, treat it as a double tap.
3. If currently not zoomed, enter zoom with trigger `'doubleTap'`.
4. If currently zoomed, exit zoom with trigger `'doubleTap'`.
5. For zoom-in, resolve the double tap scale range in the same way as pinch:

```ts
minScale = options.minScale === 'fit' ? fitScale : options.minScale
maxScale = Math.max(minScale, options.maxScale)
```

6. Resolve target scale:

```ts
targetScale = clamp(options.scale, minScale, maxScale)
```

The default `scale: 1` means natural-size zoom, matching existing keyboard/control zoom.

7. If `center === 'tap'`, use the second tap point as the zoom focus.
8. If `center === 'viewport'`, use the viewport center as the zoom focus.
9. Use the existing zoom transition for zoom-in and zoom-out. Double tap is discrete, not direct manipulation.
10. Suppress the browser-generated `click`/`dblclick` events that can follow a touch double tap, so the image does not immediately toggle back out or trigger `hideOnDblClick`.

The implementation should not rely on React `onDoubleClick` for mobile double tap. Native mobile double tap and delayed click behavior vary by browser; the gesture must be detected from touch events.

## Gesture Locking

Phase 4 should keep three gesture paths separate:

- single-finger `TouchGesture`: swipe and drag-exit.
- two-finger `PinchGesture`: direct zoom scale changes.
- single-finger `DoubleTapGesture`: discrete zoom toggle.

Rules:

- Once pinch locks a sequence, no swipe, drag-exit, or double tap may fire until all touches end.
- Once swipe or drag-exit owns a sequence, double tap may not fire.
- A second finger appearing during a detecting single-finger gesture should cancel the single-finger detector and attempt pinch if pinch is enabled.
- When one finger remains after a pinch, do not resume swipe or drag-exit in the same sequence.
- Page switching through swipe remains disabled while `zoom=true`.
- Drag-exit remains disabled while `zoom=true`.

## Shared Helpers

Add small pure helpers in `Image.utils.ts`:

```ts
export interface ZoomScaleRange {
  minScale: number
  maxScale: number
  fitScale: number
}

export const getZoomScaleRange(...)
export const getNextPinchZoomScale(...)
export const getTouchMidpoint(...)
export const getTouchDistance(...)
export const resolveGestureTouchAction(...)
```

`getZoomScaleRange()` should be shared by wheel, pinch, and double tap where practical. `getWheelZoomScaleRange()` may either call the shared helper or be replaced by it if tests are updated at the same time.

Add focused gesture helpers:

```ts
export class PinchGesture { ... }
export class DoubleTapGesture { ... }
```

They should be pure enough to test without rendering React.

## Image Implementation Notes

Suggested instance fields:

```ts
pinchGesture = new PinchGesture()
doubleTapGesture = new DoubleTapGesture()
touchSequenceOwner?: 'single' | 'pinch'
pinchActive = false
touchClickSuppressUntil = 0
pinchTargetStyle?: ImageStyleType
pinchTargetScale?: number
```

Implementation details:

- Keep `touchstart` passive if possible; rely on `touch-action` for browser gesture ownership.
- Keep `touchmove` passive false because active pinch and existing swipe/drag-exit need `preventDefault()`.
- Add `touchcancel` cleanup. Current code listens to `touchstart`, `touchmove`, and `touchend`; pinch needs cancellation cleanup to avoid stuck sequence ownership.
- Filter pinch and double tap starts to the center image so controls do not unexpectedly zoom the image.
- Do not update React state on every pinch move.
- Use the same DOM write primitives already used by wheel zoom follow: transform, opacity, clip-path, and border-radius must stay in sync.
- Clear pinch and double tap transient fields on page switch, zoom exit, close, and unmount.
- `resetZoomMotionState()` should clear Phase 4 zoom fields as well as Phase 3 wheel fields.

## Browser Component Notes

`Browser.tsx` should pass the resolved touch-action value to `#zmageViewport`.

`handleToggleZoom()` should handle new triggers without changing the public callback:

- `'pinch'`: Image owns the starting visual style and should avoid the default natural-size `zoom-enter` path.
- `'doubleTap'`: Image uses the configured double tap focus and target scale, then follows the normal zoom transition.

`onZooming(nextZoom)` remains the only public zoom lifecycle callback.

## Tests

### Pure Tests

Add tests in `Image.utils.test.ts`:

- `normalizeGestureSet(false)` returns `pinchZoom: false`, `doubleTapZoom: false`, `wheelZoom: false`, `swipe: false`, `dragExit: false`, and `touchAction: 'auto'`.
- mobile fallback normalizes `pinchZoom` and `doubleTapZoom` to option objects.
- desktop fallback keeps `pinchZoom` and `doubleTapZoom` disabled.
- `gesture={{ pinchZoom: false }}` disables only pinch zoom.
- `gesture={{ doubleTapZoom: false }}` disables only double tap zoom.
- `gesture={{ pinchZoom: { maxScale: 3 } }}` merges default pinch options.
- `gesture={{ doubleTapZoom: { scale: 2 } }}` merges default double tap options.
- double tap target scale clamps to resolved `minScale` and `maxScale`.
- `resolveGestureTouchAction()` returns `none` for managed custom pinch.
- `resolveGestureTouchAction()` returns `manipulation` for managed double tap without custom pinch.
- `resolveGestureTouchAction()` returns explicit user values when provided.
- `getTouchDistance()` and `getTouchMidpoint()` compute stable values from two touches.
- `getNextPinchZoomScale()` zooms in when touch distance grows and zooms out when distance shrinks.
- pinch scale clamps to resolved `minScale` and `maxScale`.
- `DoubleTapGesture` accepts taps within interval and distance.
- `DoubleTapGesture` rejects taps outside interval or distance.

### Component Tests

Add tests in `Zmage.test.tsx`:

- mobile preset applies `touch-action: none` to `#zmageViewport` by default.
- mobile `gesture={{ pinchZoom: false }}` with double tap enabled resolves to `touch-action: manipulation`.
- mobile `gesture={{ pinchZoom: false, doubleTapZoom: false }}` resolves to `touch-action: auto`.
- explicit `gesture={{ touchAction: 'auto' }}` wins over managed behavior.
- two-finger pinch in mobile mode enters zoom and calls `onZooming(true)` once.
- pinch move calls `preventDefault()` only after pinch owns the sequence.
- pinch ending at fit scale calls `onZooming(false)` and returns to browsing style.
- lifting one finger after pinch does not trigger swipe or drag-exit.
- double tap on the center image enters zoom with trigger `'doubleTap'`.
- double tap while zoomed exits zoom.
- touch double tap suppresses the following click so the image does not immediately zoom out.
- `gesture={{ doubleTapZoom: false }}` leaves double tap inert.
- desktop preset does not enable pinch or double tap by default.
- StrictMode unmount removes `touchcancel` and any changed touch listeners.

Where jsdom lacks native `TouchEvent` construction, tests can create events and define `touches` / `changedTouches` with `Object.defineProperty()`.

## Documentation Sync

Because Phase 4 adds public API and defaults, implementation must update:

- `packages/core/src/types/global.ts`
- `packages/core/src/types/default.ts`
- README prop tables and examples
- `packages/home` docs schema and localized copy
- playground examples if gesture configuration examples exist there
- `llms.txt`
- `AGENTS.md` public API quick reference if the prop list changes

Docs must explain:

- `gesture.pinchZoom`
- `gesture.doubleTapZoom`
- `gesture.touchAction`
- why the library uses viewer-scoped `touch-action`
- why the library does not require `user-scalable=no`
- reset-to-fit behavior for pinch zoom

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

Agents must not claim human visual verification. Mobile pinch and double tap feel still need maintainer testing in a real browser/device after automated checks pass.
