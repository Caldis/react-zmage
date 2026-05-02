# Blur Flip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `animate.flip='blur'` as a public, optional page flip effect with matching image and caption transitions.

**Architecture:** Keep the existing flip architecture. The new effect is a new `AnimateFlip` union member, one new `FLIP_VISUAL` entry, one optional `blur` field in `ImageAnimateType`, and one caption switch class. Public docs and playground controls are synchronized because this extends the core API surface.

**Tech Stack:** React class components, TypeScript, Less modules, Vitest, Testing Library, pnpm workspace, Vite home site.

---

## Files

- Modify: `packages/core/src/types/global.ts`
- Modify: `packages/core/src/components/Image/Image.utils.ts`
- Modify: `packages/core/src/components/Image/Image.tsx`
- Modify: `packages/core/src/components/Image/Image.module.less`
- Modify: `packages/core/src/config/anim.ts`
- Modify: `packages/core/src/components/Caption/Caption.tsx`
- Modify: `packages/core/src/components/Caption/Caption.module.less`
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`
- Modify: `packages/core/src/__tests__/Zmage.test.tsx`
- Modify: `README.md`
- Modify: `README.zh-CN.md`
- Modify: `docs/llms.txt`
- Modify: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/playground/controls/AnimateControl.tsx`
- Modify: `packages/home/src/components/CommandK.tsx`
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: `packages/home/src/i18n/en.ts`
- Modify: `packages/home/src/i18n/de.ts`
- Modify: `packages/home/src/i18n/es.ts`
- Modify: `packages/home/src/i18n/fr.ts`
- Modify: `packages/home/src/i18n/ja.ts`
- Modify: `packages/home/src/i18n/ko.ts`
- Modify: `packages/home/src/i18n/zh-CN.ts`

## Task 1: Write failing core tests

**Files:**
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`
- Modify: `packages/core/src/__tests__/Zmage.test.tsx`

- [ ] **Step 1: Add utility test for the new flip config**

In `packages/core/src/components/Image/__tests__/Image.utils.test.ts`, update the `getAnimateConfig 翻页动画参数` test:

```ts
expect(getAnimateConfig('blur')).toEqual({ offset: 0, overflow: 0.018, opacity: 0, blur: 14 })
```

- [ ] **Step 2: Add DOM test for blur side image**

In `packages/core/src/__tests__/Zmage.test.tsx`, near the existing `fade` / `crossFade` / `zoom` tests, add:

```tsx
it('animate.flip=\'blur\' 边图初始失焦、淡出，并轻微放大', async () => {
  render(
    <Zmage
      src="https://example.com/01.jpg"
      alt="cover"
      preset="desktop"
      animate={{ flip: 'blur' }}
      set={[
        { src: 'https://example.com/01.jpg', alt: 'p1' },
        { src: 'https://example.com/02.jpg', alt: 'p2' },
      ]}
    />
  )
  fireEvent.click(screen.getByAltText('cover'))
  await wait(50)

  const sideImage = requireDefined(Array
    .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
    .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg')), 'expected blur side image')
  expect(sideImage.style.opacity).toBe('0')
  expect(sideImage.style.filter).toBe('blur(14px)')
  const m = requireDefined(sideImage.style.transform.match(/scale3d\(([\d.]+),/), 'expected side scale transform')
  expect(Number(m[1])).toBeGreaterThan(1.01)
})
```

- [ ] **Step 3: Add caption switching test for blur**

In `packages/core/src/__tests__/Zmage.test.tsx`, near the `flip='none'` caption test, add:

```tsx
it('animate.flip=\'blur\' 翻页时 caption 使用 switchBlur 类', async () => {
  render(
    <Zmage
      src="https://example.com/01.jpg"
      alt="cover"
      preset="desktop"
      animate={{ flip: 'blur' }}
      set={[
        { src: 'https://example.com/01.jpg', alt: 'p1', caption: 'first' },
        { src: 'https://example.com/02.jpg', alt: 'p2', caption: 'second' },
      ]}
    />
  )
  fireEvent.click(screen.getByAltText('cover'))
  await wait(50)

  clickById('zmageControlFlipRight')
  await wait(20)

  const cap = document.getElementById('zmageCaption')
  expect(cap?.textContent).toBe('second')
  expect(cap?.className).toMatch(/switchBlur/)
})
```

- [ ] **Step 4: Update the none caption guard**

Change the existing guard from:

```ts
expect(cap?.className).not.toMatch(/switch(Fade|CrossFade|Swipe|Zoom)/)
```

to:

```ts
expect(cap?.className).not.toMatch(/switch(Fade|CrossFade|Swipe|Zoom|Blur)/)
```

- [ ] **Step 5: Verify RED**

Run:

```bash
pnpm --filter react-zmage test -- --run src/components/Image/__tests__/Image.utils.test.ts src/__tests__/Zmage.test.tsx
```

Expected: FAIL because `blur` is not assignable to `AnimateFlip`, `getAnimateConfig('blur')` is not implemented, and `switchBlur` is missing.

## Task 2: Implement core blur flip

**Files:**
- Modify: `packages/core/src/types/global.ts`
- Modify: `packages/core/src/components/Image/Image.utils.ts`
- Modify: `packages/core/src/components/Image/Image.tsx`
- Modify: `packages/core/src/components/Image/Image.module.less`
- Modify: `packages/core/src/config/anim.ts`
- Modify: `packages/core/src/components/Caption/Caption.tsx`
- Modify: `packages/core/src/components/Caption/Caption.module.less`

- [ ] **Step 1: Extend `AnimateFlip`**

In `packages/core/src/types/global.ts`, add:

```ts
| 'blur'      // 失焦淡入淡出
```

between `zoom` and `none`.

- [ ] **Step 2: Extend flip visual config**

In `packages/core/src/components/Image/Image.utils.ts`, add `blur?: number`:

```ts
export interface ImageAnimateType {
  offset: number
  overflow: number
  opacity: number
  blur?: number
}
```

Add the config:

```ts
blur:      { offset: 0,                 overflow: 0.018,         opacity: 0, blur: 14 },
```

- [ ] **Step 3: Apply optional image filter**

In `packages/core/src/components/Image/Image.tsx`, destructure `blur` from `animateConfig` and add:

```ts
const filter = typeof blur === 'number'
  ? isSideImage ? `blur(${blur}px)` : 'blur(0px)'
  : undefined
```

Return it in style only when defined:

```ts
...(filter ? { filter } : {}),
```

- [ ] **Step 4: Include filter in image transitions**

In `packages/core/src/components/Image/Image.module.less`, include `filter` in `transition` and `will-change`:

```less
transition: transform @animationDuration @animationFunction, opacity @animationDuration @animationFunction, filter @animationDuration @animationFunction, clip-path @animationDuration @animationFunction, border-radius @animationDuration @animationFunction;
will-change: transform, top, opacity, filter, clip-path, border-radius;
```

In `packages/core/src/config/anim.ts`, include filter in `animationTransition()`:

```ts
export const animationTransition = (multiple = 1) => `transform ${animationDuration * multiple}ms ${animationFunction}, opacity ${animationDuration * multiple}ms ${animationFunction}, filter ${animationDuration * multiple}ms ${animationFunction}, clip-path ${animationDuration * multiple}ms ${animationFunction}`
```

- [ ] **Step 5: Add caption blur switch**

In `packages/core/src/components/Caption/Caption.tsx`, add:

```ts
blur: 'switchBlur',
```

In `Caption.module.less`, add:

```less
&.switchBlur {
  animation: capBlur @animationDuration @animationFunction;
}

@keyframes capBlur {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translate(var(--zmage-caption-translate-x, -50%), 0) scale(0.985);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translate(var(--zmage-caption-translate-x, -50%), 0) scale(1);
  }
}
```

- [ ] **Step 6: Verify GREEN**

Run:

```bash
pnpm --filter react-zmage test -- --run src/components/Image/__tests__/Image.utils.test.ts src/__tests__/Zmage.test.tsx
```

Expected: PASS.

## Task 3: Sync public docs and playground

**Files:**
- Modify: `README.md`
- Modify: `README.zh-CN.md`
- Modify: `docs/llms.txt`
- Modify: `packages/home/src/docs/sections/Props.tsx`
- Modify: `packages/home/src/playground/controls/AnimateControl.tsx`
- Modify: `packages/home/src/components/CommandK.tsx`
- Modify: `packages/home/src/schema/param-schema.ts`
- Modify: all 7 `packages/home/src/i18n/*.ts`

- [ ] **Step 1: Update English docs surfaces**

Add `blur` anywhere the full `animate.flip` union is listed:

```ts
'fade' | 'crossFade' | 'swipe' | 'zoom' | 'blur' | 'none'
```

Apply to `README.md`, `docs/llms.txt`, `Props.tsx`, and local home schema/control types.

- [ ] **Step 2: Update Chinese README**

Apply the same union to `README.zh-CN.md` and describe `blur` as `失焦淡入淡出`.

- [ ] **Step 3: Add playground option**

In `AnimateControl.tsx` and `CommandK.tsx`, insert:

```ts
{ value: 'blur', labelKey: 'animate.flip.blur' },
```

or the matching `leaf: 'blur'` shape in `CommandK`.

- [ ] **Step 4: Add all i18n labels**

Add `animate.flip.blur` in every locale:

```ts
// en
'animate.flip.blur': 'Blur',
// zh-CN
'animate.flip.blur': '失焦',
// de
'animate.flip.blur': 'Unschärfe',
// es
'animate.flip.blur': 'Desenfoque',
// fr
'animate.flip.blur': 'Flou',
// ja
'animate.flip.blur': 'ぼかし',
// ko
'animate.flip.blur': '블러',
```

- [ ] **Step 5: Verify i18n key parity**

Run:

```bash
for lang in en de es fr ja ko zh-CN; do
  count=$(grep -cE "^[[:space:]]+'[^']+':" "packages/home/src/i18n/$lang.ts")
  echo "$lang: $count keys"
done
```

Expected: all 7 counts match.

## Task 4: Full verification

**Files:**
- No new file edits unless a verification failure requires a fix.

- [ ] **Step 1: Run core tests**

Run:

```bash
pnpm --filter react-zmage test
```

Expected: PASS.

- [ ] **Step 2: Run workspace test**

Run:

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 3: Run full sandbox check**

Run:

```bash
pnpm -w run check
```

Expected: PASS for build, pack, sandbox tsc, SSR smoke, and Next build.

- [ ] **Step 4: Run whitespace check**

Run:

```bash
git diff --check
```

Expected: no output.

## Task 5: Commit scoped changes

**Files:**
- Stage only files listed in this plan plus this plan file.

- [ ] **Step 1: Review changed files**

Run:

```bash
git status --short
```

Expected: only blur flip implementation, docs sync, generated check artifacts if `pnpm -w run check` refreshes sandbox tgz refs, and this plan file.

- [ ] **Step 2: Commit**

Run:

```bash
git add docs/superpowers/plans/2026-05-03-blur-flip-implementation.md packages/core/src/types/global.ts packages/core/src/components/Image/Image.utils.ts packages/core/src/components/Image/Image.tsx packages/core/src/components/Image/Image.module.less packages/core/src/config/anim.ts packages/core/src/components/Caption/Caption.tsx packages/core/src/components/Caption/Caption.module.less packages/core/src/components/Image/__tests__/Image.utils.test.ts packages/core/src/__tests__/Zmage.test.tsx README.md README.zh-CN.md docs/llms.txt packages/home/src/docs/sections/Props.tsx packages/home/src/playground/controls/AnimateControl.tsx packages/home/src/components/CommandK.tsx packages/home/src/schema/param-schema.ts packages/home/src/i18n/en.ts packages/home/src/i18n/de.ts packages/home/src/i18n/es.ts packages/home/src/i18n/fr.ts packages/home/src/i18n/ja.ts packages/home/src/i18n/ko.ts packages/home/src/i18n/zh-CN.ts
git commit -m "feat(core): add blur flip animation"
```

If `pnpm -w run check` legitimately updates sandbox tgz files or lockfile refs, inspect those diffs and stage only the expected generated files before committing.
