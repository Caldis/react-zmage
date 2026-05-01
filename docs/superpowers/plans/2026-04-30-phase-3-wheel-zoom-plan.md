# Phase 3 Wheel Zoom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add preset-driven desktop wheel zoom that reuses the existing zoom-follow RAF pipeline.

**Architecture:** Extend `gesture` with `wheelZoom`, make `getZoomingStyle()` accept a target scale, and let `Image` own wheel target scale plus the short wheel-exit guard in instance fields. Wheel input runs while the viewer is open and already in zoom mode, plus the configured guard window after a wheel-triggered zoom exit.

**Tech Stack:** React class components, TypeScript, Vitest/jsdom, existing `Image` RAF helpers.

---

### Task 1: Public Types And Pure Helpers

**Files:**
- Modify: `packages/core/src/types/global.ts`
- Modify: `packages/core/src/types/default.ts`
- Modify: `packages/core/src/index.ts`
- Modify: `packages/core/src/components/Image/Image.utils.ts`
- Test: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`

- [ ] Add failing tests for `GestureWheelZoomOptions`, `normalizeGestureSet()`, `normalizeWheelDelta()`, `getNextWheelZoomScale()`, and scale-aware `getZoomingStyle()`.
- [ ] Run `pnpm --filter react-zmage test -- Image.utils.test.ts` and confirm the new tests fail because wheel helpers/types are missing.
- [ ] Add `GestureWheelZoomOptions` with `reverse` / `exitGuardDuration`, `defaultGestureWheelZoomOptions`, `wheelZoom` preset defaults, `normalizeWheelDelta()`, `getZoomScaleRange()`, and `getNextWheelZoomScale()`.
- [ ] Update `getZoomingStyle()` to accept `{ scale?: number }` while preserving default `scale: 1`.
- [ ] Run `pnpm --filter react-zmage test -- Image.utils.test.ts`.

### Task 2: Wheel Listener And Runtime Behavior

**Files:**
- Modify: `packages/core/src/components/Image/Image.tsx`
- Modify: `packages/core/src/components/context.tsx`
- Test: `packages/core/src/__tests__/Zmage.test.tsx`

- [ ] Add failing component tests for desktop wheel listener registration in zoom mode, mobile default disabled behavior, `gesture={{ wheelZoom: false }}`, active `preventDefault()`, inactive no-capture behavior, scale preservation after mousemove, min-scale exit guard, and `reverse=true`.
- [ ] Run `pnpm --filter react-zmage test -- Zmage.test.tsx` and confirm the new tests fail.
- [ ] Add `ZoomTrigger = 'control' | 'keyboard' | 'wheel'`.
- [ ] Add `wheel` listener lifecycle in `Image` with `{ passive: false }` only while `show && (zoom || wheelExitGuardActive) && wheelZoom` is enabled.
- [ ] Store high-frequency wheel target scale/point in `Image` instance fields, not React state.
- [ ] Route wheel target styles through `startZoomFollow()`; when zoom-out reaches `minScale`, start the `exitGuardDuration` timer and call `toggleZoom('wheel')` immediately.
- [ ] Run `pnpm --filter react-zmage test -- Zmage.test.tsx`.

### Task 3: Public Docs And Verification

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `llms.txt`
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/i18n/*.ts`
- Modify: `packages/home/src/playground/controls/*`
- Modify: `packages/llms-eval/eval.test.mjs`

- [ ] Document `gesture.wheelZoom` defaults and options, including `reverse` and `exitGuardDuration`.
- [ ] Add home schema/docs/i18n/playground controls.
- [ ] Add llms-eval assertion that wheelZoom is wired across types, defaults, and `llms.txt`.
- [ ] Run `pnpm --filter react-zmage-home run build`.
- [ ] Run i18n key count for all 7 languages.
- [ ] Run `pnpm --filter llms-eval run test`.
- [ ] Run `pnpm --filter react-zmage test`.
- [ ] Run `pnpm --filter react-zmage run build`.
- [ ] Run `pnpm -w run check`.
- [ ] Run `git diff --check`.
