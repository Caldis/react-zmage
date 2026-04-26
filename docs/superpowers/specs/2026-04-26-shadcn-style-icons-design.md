# Shadcn/Lucide-Style Icon Refresh

**Date:** 2026-04-26
**Scope:** `packages/core/src/asserts/icons/`
**Status:** Approved (pending implementation plan)

## Goal

Replace the 7 control-bar icons in `packages/core` with Lucide (shadcn/ui's default icon set) geometry, hand-written as inline SVG. No new runtime dependency.

## Non-Goal

- Not adding `lucide-react` (or any icon library) as a dependency.
- Not touching `IconLoading` or `IconRefresh` — they sit on a different surface (loading overlay) and are out of scope for this pass.
- Not changing the `Control.tsx` consumer or its className/id contracts.

## Why hand-write paths instead of importing Lucide

`packages/core` ships to npm as `react-zmage`. A new dependency propagates to every consumer's bundle and version matrix, even with tree-shaking. For 7 single-path icons the cost/benefit doesn't justify a runtime dep. Lucide is ISC-licensed, so vendoring the path data is permitted.

## Scope: icons replaced

| Existing component | Lucide source | Notes |
|---|---|---|
| `IconClose` | `X` | — |
| `IconDownload` | `Download` | — |
| `IconRotateLeft` | `RotateCcw` | — |
| `IconRotateRight` | `RotateCw` | — |
| `IconZoom` | `Maximize` | Four corner brackets (fullscreen frame). Original was a four-corner expand mark; `Maximize2` (diagonal arrows) was tried first but felt visually heavier than the surrounding icons because its geometry spans corner-to-corner. `Maximize` keeps the four-corner motif but with bracket corners + empty center, balancing the visual weight against `X` / rotate icons. Do not substitute `ZoomIn` (magnifier glass). |
| `IconArrowLeft` | `ChevronLeft` | Pager flip control |
| `IconArrowRight` | `ChevronRight` | Pager flip control |

`IconLoading`, `IconRefresh` — untouched.

## Visual contract

All 7 icons share the Lucide rendering convention:

```tsx
<svg width="23" height="23" viewBox="0 0 23 23"
     fill="none" stroke={color || 'currentColor'}
     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  {/* path(s) — Lucide standard 0-24 coordinates */}
</svg>
```

- `viewBox` is **0 0 23 23** (NOT the Lucide-standard 0 0 24 24), an empirical visual-centering tweak.
  Path data is unchanged from Lucide (still uses 0–24 coordinates internally), but the smaller viewBox effectively shifts the rendered glyph ~0.5 css px to the right when CSS forces svg to 24px.
  This compensates for a perceived ~1px left-bias in the rendered icons (caused by stroke anti-aliasing weight distribution at fractional positions on certain DPRs).
  Verified empirically: viewBox 24 looked left-shifted to the user; viewBox 23 looked centered.
- `fill="none"`, color now drives `stroke`.
- `strokeWidth=2`, `strokeLinecap=round`, `strokeLinejoin=round` — Lucide defaults.

## CSS architecture (Control.module.less)

- `.baseButton` is a flex container (`display: flex; align-items: center; justify-content: center`) so any svg child centers automatically regardless of size.
- `.controls` (the pill-shaped container) owns edge spacing via `padding: 0 0.4rem` (NOT via `:first-of-type` / `:last-of-type` margins on children — that pattern was removed because it makes children responsible for their own neighbours, breaking when buttons are reordered or added).
- `.pinButton > svg` declares svg size once (`width: 1.5rem; height: 1.5rem`), inherited by all 4 icon variants instead of duplicated per-class.
- The `IconClose` X path was widened from Lucide standard `(6,6)–(18,18)` to `(4,4)–(20,20)` to match the visual weight of rotate / Maximize, whose glyphs naturally span more of the viewBox.

## Interface change (minor)

The `color` prop semantic shifts from "fill color" to "stroke color". Default value is `currentColor` so when `color` is omitted (no string passed), the icon inherits the parent's `color` CSS — same as current behavior in `Control.tsx`.

External users who previously passed a color string to `controller.close = "#ff0000"` etc. will see the same visual result (just stroked instead of filled). No breaking API rename.

## File layout

Unchanged. Each icon stays in its own `IconX.tsx` under `packages/core/src/asserts/icons/`. `index.ts` exports unchanged.

## Verification

- Build: `pnpm --filter react-zmage run build` — must pass.
- Visual: open `pnpm dev:csr-r19` and inspect all 7 icons in the control bar (rotate, download, zoom, close, flip arrows). All should render as thin-stroke Lucide-style.
- Test: `pnpm --filter react-zmage run test` — existing tests should still pass (icons are not assert-tested directly).
- Smoke: `pnpm check` — exercise the full pack/sandbox cycle if user requests release-readiness.

## Out of scope (deferred)

- `IconLoading` / `IconRefresh` style sync — defer until someone reports they look out-of-place against the new ones.
- Icon size token / theming — current 24px hardcode stays.
- Pagination dot indicators — already non-iconographic.
