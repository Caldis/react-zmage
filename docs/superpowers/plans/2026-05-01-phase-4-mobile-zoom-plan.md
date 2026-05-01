# Phase 4 Mobile Zoom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add preset-driven mobile pinch zoom and double tap zoom while reusing the Phase 3 scale-aware zoom path.

**Architecture:** Extend `gesture` with `pinchZoom`, `doubleTapZoom`, and `touchAction`, then add pure gesture helpers in `Image.utils.ts`. `Image.tsx` owns high-frequency pinch and tap transient state in instance fields, writes active pinch frames directly to the center image, and commits React state only at gesture boundaries.

**Tech Stack:** React class components, TypeScript, Vitest/jsdom, existing `Image` touch listeners and zoom RAF helpers.

---

### Task 1: Gesture Types, Defaults, And Pure Helpers

**Files:**
- Modify: `packages/core/src/types/global.ts`
- Modify: `packages/core/src/types/default.ts`
- Modify: `packages/core/src/components/Image/Image.utils.ts`
- Test: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`

- [x] Add failing tests for `pinchZoom`, `doubleTapZoom`, `touchAction`, scale range, touch distance, touch midpoint, pinch scale, and double tap detection.
- [x] Run `pnpm --filter react-zmage test -- Image.utils.test.ts` and confirm the new tests fail because the new symbols do not exist.
- [x] Add `GesturePinchZoomOptions`, `GestureDoubleTapZoomOptions`, `GestureTouchAction`, defaults, and preset defaults.
- [x] Extend `normalizeGestureSet()` with explicit false markers and per-child shallow merge for the new gesture keys.
- [x] Add shared helpers: `getZoomScaleRange()`, `getTouchDistance()`, `getTouchMidpoint()`, `getNextPinchZoomScale()`, `resolveGestureTouchAction()`, and `DoubleTapGesture`.
- [x] Route the existing wheel scale range helper through the shared range helper.
- [x] Run `pnpm --filter react-zmage test -- Image.utils.test.ts`.

### Task 2: Viewer Touch-Action And Listener Lifecycle

**Files:**
- Modify: `packages/core/src/components/Browser/Browser.tsx`
- Modify: `packages/core/src/components/context.tsx`
- Modify: `packages/core/src/components/Image/Image.tsx`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [x] Add failing component tests for mobile managed `touch-action`, explicit `touchAction`, and `touchcancel` cleanup in StrictMode.
- [x] Run `pnpm --filter react-zmage test -- Zmage.test.tsx` and confirm the new tests fail.
- [x] Add `pinch` and `doubleTap` to internal `ZoomTrigger`.
- [x] Pass resolved `touch-action` onto `#zmageViewport`.
- [x] Register and remove `touchcancel` with the existing mobile touch listener family.
- [x] Add a click suppression guard so touch double tap can block the following synthetic click.
- [x] Run `pnpm --filter react-zmage test -- Zmage.test.tsx`.

### Task 3: Pinch Zoom Runtime

**Files:**
- Modify: `packages/core/src/components/Image/Image.tsx`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [x] Add failing component tests for pinch enter, pinch move `preventDefault()`, reset-to-fit zoom exit, and no swipe after a pinch sequence.
- [x] Run `pnpm --filter react-zmage test -- Zmage.test.tsx` and confirm the new tests fail for missing pinch behavior.
- [x] Add two-touch extraction, pinch sequence ownership, and pinch cleanup fields to `Image`.
- [x] On two-finger start, suspend single-finger `TouchGesture` and lock the sequence as pinch.
- [x] On pinch move, compute target scale/focus, write the zoom style directly with `transition: none`, and keep high-frequency values in instance fields.
- [x] On pinch end, commit the last target style once; if scale is at fit and `resetBelowFit !== false`, call `toggleZoom('pinch')`.
- [x] Run `pnpm --filter react-zmage test -- Zmage.test.tsx`.

### Task 4: Double Tap Zoom Runtime

**Files:**
- Modify: `packages/core/src/components/Image/Image.tsx`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [x] Add failing component tests for double tap zoom-in, double tap zoom-out, inert behavior when disabled, and synthetic click suppression.
- [x] Run `pnpm --filter react-zmage test -- Zmage.test.tsx` and confirm the new tests fail for missing double tap behavior.
- [x] Add single-touch tap tracking through `DoubleTapGesture`.
- [x] On double tap zoom-in, resolve target scale and focus, store the target for the next zoom-enter style, and call `toggleZoom('doubleTap')`.
- [x] On double tap zoom-out, suppress the following click and call `toggleZoom('doubleTap')`.
- [x] Keep swipe, drag-exit, pinch, and double tap mutually exclusive for a touch sequence.
- [x] Run `pnpm --filter react-zmage test -- Zmage.test.tsx`.

### Task 5: Public Docs And Verification

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `llms.txt`
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/i18n/*.ts`
- Modify: `packages/home/src/playground/controls/*`
- Modify: `packages/llms-eval/eval.test.mjs`

- [x] Document `gesture.pinchZoom`, `gesture.doubleTapZoom`, `gesture.touchAction`, reset-to-fit behavior, and viewer-scoped `touch-action`.
- [x] Add home schema/docs/i18n/playground controls for the new mobile zoom options.
- [x] Add llms-eval assertions that the public docs mention the new gesture controls.
- [x] Run `pnpm --filter react-zmage-home run build`.
- [x] Verify all 7 i18n files have the same key count.
- [x] Run `pnpm --filter llms-eval run test`.
- [x] Run `pnpm --filter react-zmage test`.
- [x] Run `pnpm --filter react-zmage run build`.
- [x] Run `pnpm -w run check`.
- [x] Run `git diff --check`.
