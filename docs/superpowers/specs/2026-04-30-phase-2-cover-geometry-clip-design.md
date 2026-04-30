# Phase 2 - Cover Geometry And Clip Transition

**Date:** 2026-04-30
**Status:** Ready for implementation
**Depends on:** Phase 1 mobile gestures implementation, commit `154b646`
**Scope:** `packages/core` cover-to-viewer geometry, `animate.cover` public API, tests, and public docs.

## Phase 1 Facts Checked

Phase 1 landed these implementation details that affect this phase:

- `gesture` is already normalized through `Browser.getPropsWithEnv()` and stored in context. Phase 2 does not need new gesture state.
- Mobile drag-exit close uses the existing `outBrowsing()` path.
- Accepted drag-exit keeps its ended visual offset in `TouchGesture`, and `Image.startClosingFollow()` starts from `getCurrentVisualStyle()`.
- Normal close uses `closing-follow` RAF. During that phase React transition is disabled and `Image.stepClosingFollow()` writes inline transform and opacity directly.
- `getBrowsingAnimationDuration()` is back to the original browsing duration for both desktop and mobile close.

Phase 2 must preserve those constraints. The new cover geometry cannot be CSS-only because the RAF close path must also write clip/radius every frame.

## Problem

`getCoverStyle()` currently assumes the cover image visual box is the full natural image scaled by:

```ts
scale = coverRect.width / naturalWidth
x = coverRect.centerX - viewport.centerX
y = coverRect.centerY - viewport.centerY
```

That works only when the cover displays the whole image at the same aspect ratio. It fails when the cover is narrower or wider than the original image and CSS uses `object-fit: cover`. In that case the actual rendered image is larger than the `<img>` element box and is clipped by the element. The current initial viewer frame behaves like a contain-style full image, so it does not match the visible cover frame.

The same path also needs to preserve cover border radius when opening and closing.

## Goals

- The first visible fullscreen image frame must match the clicked cover's rendered pixels when the cover uses `object-fit: cover`.
- Opening and closing must transition from that exact cover frame to the browsing frame.
- The clip and radius interpolation must work in both normal CSS transition paths and `closing-follow` RAF paths.
- `animate.cover` must provide an explicit public escape hatch for the new behavior.
- Existing `animate.browsing`, `animate.flip`, `radius`, `edge`, `coverVisible`, Wrapper, callee, controlled browsing, and Phase 1 mobile gestures must stay compatible.

## Public API

Add `AnimateCoverOptions`:

```ts
export interface AnimateCoverOptions {
  objectFit?: boolean
  clip?: boolean
  radius?: boolean
}

export interface Animate {
  browsing?: boolean
  flip?: AnimateFlip
  cover?: boolean | AnimateCoverOptions
}
```

Preset defaults:

```ts
desktop.animate.cover = {
  objectFit: true,
  clip: true,
  radius: true,
}

mobile.animate.cover = {
  objectFit: true,
  clip: true,
  radius: true,
}
```

Normalization rules:

- `animate === false` disables browsing, flip, and cover improvements:
  `{ browsing: false, flip: false, cover: false }`.
- `animate.cover === false` keeps the old cover geometry path.
- `animate.cover === true` or missing uses the resolved preset cover defaults.
- `animate.cover` object shallow-merges over the resolved preset cover defaults.
- `animate.browsing === false` still wins on timing. Phase 2 should compute the correct geometry but return `transition: none`.
- `animate.flip` remains page-switch-only and must not affect cover geometry.

## Geometry Model

Extend `ImageStyleType` with clip metadata:

```ts
export interface ClipInsets {
  top: number
  right: number
  bottom: number
  left: number
}

export interface ImageStyleType {
  _type: 'cover' | 'browsing' | 'zooming'
  _behavior?: 'merge'
  x?: number
  y: number
  opacity?: number
  scale?: number
  rotate?: number
  radius?: number
  clip?: ClipInsets
}
```

`clip` is stored in image-local CSS pixels, not viewport pixels. This matters
because `clip-path` and `border-radius` are applied before the image
`transform: scale(...)`. `radius` is stored as the desired visual radius in
viewport pixels, then converted to image-local CSS pixels while rendering.

Rendering converts `clip` and `radius` to:

```css
clip-path: inset(<localTop>px <localRight>px <localBottom>px <localLeft>px round <localRadius>px);
border-radius: <localRadius>px;
```

Use the same values for `-webkit-clip-path`.

The conversion is:

```ts
localInset = visualInset / currentScale
localRadius = visualRadius / currentScale
```

### Cover Object-Fit Calculation

For a cover image element:

1. Read `getBoundingClientRect()`.
2. Read `naturalWidth`, `naturalHeight`.
3. Read computed `object-fit`, `object-position`, `opacity`, and `border-radius`.
4. Compute the rendered object rect inside or around the element box.

For `object-fit: cover`:

```ts
scale = max(rect.width / naturalWidth, rect.height / naturalHeight)
objectWidth = naturalWidth * scale
objectHeight = naturalHeight * scale
objectLeft = rect.left + (rect.width - objectWidth) * positionX
objectTop = rect.top + (rect.height - objectHeight) * positionY
```

`object-position` defaults to `50% 50%`. Phase 2 should support percentages and pixel lengths for the first two tokens. Complex CSS position syntax may fall back to center.

The viewer image transform should use the rendered object center:

```ts
x = objectLeft + objectWidth / 2 - viewport.centerX
y = objectTop + objectHeight / 2 - viewport.centerY
scale = objectWidth / naturalWidth
```

The visual clip insets trim the rendered image to the visible cover element box:

```ts
visualClip.top = max(0, rect.top - objectTop)
visualClip.right = max(0, objectLeft + objectWidth - (rect.left + rect.width))
visualClip.bottom = max(0, objectTop + objectHeight - (rect.top + rect.height))
visualClip.left = max(0, rect.left - objectLeft)
```

Store those clip values in image-local coordinates:

```ts
clip.top = visualClip.top / scale
clip.right = visualClip.right / scale
clip.bottom = visualClip.bottom / scale
clip.left = visualClip.left / scale
```

For `object-fit: contain`, `none`, and `scale-down`, use the browser-equivalent uniform object size where possible. For `fill`, Phase 2 may fall back to the old uniform width-based path because current rendering supports only one `scale` value, not separate `scaleX` and `scaleY`.

If any required cover data is missing, fall back to the old path.

### Browsing And Zoom Styles

`getBrowsingStyle()` and `getZoomingStyle()` should return `clip: zeroClip` and `radius` from context. This gives CSS a concrete endpoint for clip/radius animation.

Side images do not need cover clip. They may render with zero clip/radius from the current browsing style.

### Closing Follow RAF

`lerpCoverStyle()` must interpolate `clip` insets and `radius`.

`Image.stepClosingFollow()` must write the same visual properties as normal render:

- transform
- opacity
- clip-path
- `-webkit-clip-path`
- border-radius

This keeps drag-exit close and desktop close visually continuous.

## Implementation Plan

1. Add failing pure tests for object-fit cover geometry:
   - narrower cover with `object-fit: cover` produces rendered object width larger than cover width.
   - initial `x`, `scale`, and clip insets match the rendered object rect, not the element rect.
   - `animate.cover=false` preserves the old `width / naturalWidth` path.
   - `lerpCoverStyle()` interpolates clip and radius.
2. Add `AnimateCoverOptions` types and defaults.
3. Add animate cover normalization in `Browser.getAnimateConfig()`.
4. Extract cover geometry helpers in `Image.utils.ts`.
5. Render clip/radius in `Image.getStyle()`.
6. Add imperative DOM writers for clip/radius in the RAF close path.
7. Add component-level tests for inline `clipPath`, `borderRadius`, and `animate.browsing=false`.
8. Sync public docs for the new `animate.cover` API.

## Tests

### Pure Tests

- `getCoverStyle()` with `object-fit: cover`, natural `1000x500`, element `200x200`, center position:
  - scale is `0.4`.
  - rendered object width is `400`.
  - x is based on rendered object center.
  - visual clip left/right are `100`.
  - stored local clip left/right are `250`.
- `object-position: 0% 50%` clips only the right side in the same case.
- missing natural size falls back without throwing.
- `animate.cover=false` returns old scale and no clip.
- `getBrowsingStyle()` returns zero clip.
- `lerpCoverStyle()` interpolates all four clip insets.
- cover radius can be disabled independently with `animate.cover.radius=false`.

### Component Tests

- Opening from a cover with `object-fit: cover` applies inline `clip-path` and `border-radius` to `#zmageImage`.
- `animate.browsing=false` still computes clip/radius but leaves transition as `none`.
- Close RAF writes clip/radius before unmount.
- Wrapper mode gets the same cover geometry because `coverRef` points at the clicked child `<img>`.

Automated tests should not claim visual verification. Human verification should still check the visible cover-to-viewer transition in `pnpm dev:csr-r19`.

## Documentation Sync

Because this phase adds public API and defaults, update:

- `packages/core/src/types/global.ts`
- `packages/core/src/types/default.ts`
- `packages/core/src/index.ts`
- `packages/home/src/schema/param-schema.ts`
- relevant home docs and all i18n files if new prose keys are added
- root `llms.txt`
- `README.md`
- `AGENTS.md`
- `packages/llms-eval/eval.test.mjs` if the public API contract assertions need a new check

Do not edit `docs/llms.txt` directly. If root `llms.txt` changes, rebuild home so the generated docs copy is refreshed.

## Compatibility

- No change to default desktop controls or hotkeys.
- No change to Phase 1 gesture thresholds or touch listener registration.
- No change to callback signatures.
- No new runtime dependency.
- SSR remains safe: no top-level `window` or `document` reads.
- `animate.cover=false` is the compatibility opt-out for consumers that rely on legacy cover geometry.

## Performance And Limits

- The JS geometry work is small: opening normally computes cover geometry once, and the closing RAF path only adds simple clip/radius interpolation to the existing transform/opacity writes.
- Rendering cost is higher than pure `transform` / `opacity`. Animating `clip-path: inset(...)` and `border-radius` may repaint, especially on large images, weaker mobile devices, and iOS Safari.
- `animate.cover` only inspects the clicked `<img>` itself. It does not infer clipping introduced by parent wrappers, including `overflow: hidden`, parent border radius, masks, complex `clip-path`, or transforms.
- Consumers that prefer performance or legacy behavior can disable the heavier parts with `animate={{ cover: { clip: false } }}`, `animate={{ cover: { radius: false } }}`, or disable the whole cover geometry path with `animate={{ cover: false }}`.

## Done When

- `animate.cover` is typed, exported, defaulted by preset, normalized, and documented.
- Object-fit cover initial frame matches the rendered cover object with clip.
- Radius and clip animate through both CSS transition and RAF close paths.
- Focused tests pass during development.
- Before commit, run:

```bash
pnpm --filter react-zmage test
pnpm --filter react-zmage run build
pnpm -w run check
git diff --check
```
