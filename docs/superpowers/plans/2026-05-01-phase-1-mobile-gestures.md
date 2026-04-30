# Phase 1 Mobile Gestures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add preset-driven mobile single-finger swipe paging and drag-exit through a public `gesture` prop.

**Architecture:** `Browser` normalizes the public `gesture` prop from resolved preset defaults and passes it through Context. `Image` owns touch input and transient movement, using a new `TouchGesture` state machine in `Image.utils.ts` instead of repairing the old `TouchProfile`. Public docs are updated in the same change because `gesture` is a new API.

**Tech Stack:** React class components, TypeScript, Vitest + jsdom, Testing Library, Less CSS, pnpm workspace.

---

### Task 1: Update Specs

**Files:**
- Modify: `docs/superpowers/specs/2026-04-30-zmage-next-interactions-overview.md`
- Modify: `docs/superpowers/specs/2026-04-30-phase-1-mobile-gestures-design.md`

- [x] Record per-child `gesture` merge semantics.
- [x] Record explicit false-marker normalized shape.
- [x] Record the decision to replace `TouchProfile` with `TouchGesture`.
- [x] Remove `openOriginal` from the future controller render actions.

### Task 2: Red Tests

**Files:**
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`
- Modify: `packages/core/src/__tests__/Zmage.test.tsx`

- [x] Add pure tests for `normalizeGestureSet()`:
  - `undefined` uses fallback defaults.
  - `false` returns explicit false markers.
  - `{ swipe: false }` disables only swipe.
  - `{ dragExit: { threshold: 120 } }` preserves velocity, axisLock, and opacity.
- [x] Add pure tests for `TouchGesture`:
  - horizontal movement past the detect floor locks to `swiping`.
  - vertical movement past the detect floor locks to `dragExiting`.
  - movement below the detect floor stays `detecting`.
  - accepted horizontal and vertical gestures report final kind and offset.
- [x] Add component tests:
  - mobile preset registers touch listeners with `touchmove` passive false.
  - desktop preset does not register Phase 1 touch listeners.
  - mobile left swipe calls `onSwitching(1)` and changes to the next page.
  - `gesture={{ swipe: false }}` prevents horizontal swipe paging.
  - mobile vertical drag calls `onBrowsing(false)`.
  - `gesture={{ dragExit: false }}` prevents vertical drag close.
  - `gesture={false}` disables both features.

### Task 3: Public Types And Defaults

**Files:**
- Modify: `packages/core/src/types/global.ts`
- Modify: `packages/core/src/types/default.ts`
- Modify: `packages/core/src/index.ts`
- Modify: `packages/core/src/components/context.tsx`
- Modify: `packages/core/src/components/Browser/Browser.tsx`

- [x] Add `GestureSet`, `GestureSwipeOptions`, and `GestureDragExitOptions`.
- [x] Add `gesture?: boolean | GestureSet` to `FunctionalParams`.
- [x] Add normalized `gesture?: GestureSet` to `FunctionalNormalizedParams`.
- [x] Add desktop/mobile `defPreset.gesture` defaults.
- [x] Include `gesture` in `getConfigFromProps()`.
- [x] Add `getGestureConfig()` to `Browser` with per-child merge behavior.
- [x] Pass normalized `gesture` through Context.
- [x] Re-export the new public gesture types from `packages/core/src/index.ts`.

### Task 4: Touch Runtime

**Files:**
- Modify: `packages/core/src/components/Image/Image.utils.ts`
- Modify: `packages/core/src/components/Image/Image.tsx`

- [x] Replace `TouchProfile` with `TouchGesture`.
- [x] Keep the private 5px detect floor separate from public accept thresholds.
- [x] Use `gesture.swipe` and `gesture.dragExit` to decide which touch behavior can lock.
- [x] Register `touchmove` with `{ passive: false }`.
- [x] Do not call `preventDefault()` on `touchstart`.
- [x] Call `preventDefault()` on `touchmove` only after the gesture is owned by swipe or drag-exit.
- [x] Skip horizontal swipe when `set.length <= 1`.
- [x] Keep `lockTouchInteraction()` / `unlockTouchInteraction()` behavior unchanged.

### Task 5: Public Docs

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `llms.txt`
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/i18n/*.ts`
- Modify: `packages/llms-eval/eval.test.mjs` if the public API assertions need a new `gesture` check.

- [x] Add `gesture` to public prop tables and quick reference.
- [x] Document mobile preset defaults and desktop unchanged behavior.
- [x] Add home schema entries and matching i18n keys in all language files.
- [x] Add llms contract text and eval assertion if needed.

### Task 6: Verification

**Commands:**

```bash
pnpm --filter react-zmage test
pnpm --filter react-zmage run build
pnpm -w run check
git diff --check
```

- [x] During development, run focused Vitest commands after each red/green cycle.
- [x] Before final handoff, run the full verification chain.
