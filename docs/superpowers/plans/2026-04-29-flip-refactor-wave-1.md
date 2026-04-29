# Flip 模块重构 — 第一波实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 flip 动画相关代码中分散的派生逻辑、配置 switch、几何特殊分支收敛成可测纯函数与 single-source 配置,同时补齐覆盖空白 — 不改变任何用户可见行为。

**Architecture:** 按"先补测试锁行为 → 抽 selector → Record 化配置 → 抽几何纯函数"四阶段推进。每阶段独立 commit,每个 commit 独立通过 `pnpm --filter react-zmage test`。重构期间公共 API、CSS keyframes、默认值、preset 行为全部不动。

**Tech Stack:** React class + functional components, vitest, @testing-library/react, TypeScript, less modules。

**Working dir:** `D:/Code/react-zmage/.worktrees/refactor-flip` (branch `refactor/flip-wave-1` based on `master`)

**核心约束**:
- 不改公共类型 (`AnimateFlip`, `Animate`, `HotKey`, `ControllerSet`)
- 不改默认值 (`defPreset.{desktop,mobile}`)
- 不改 CSS / keyframes
- 不改 motion phase 状态机 (留给第二/三波)
- 不删 `// eslint-disable-next-line prefer-const` (留给第二波)

---

## File Structure

| 文件 | 角色 | 本计划改动 |
|---|---|---|
| `packages/core/src/components/Image/Image.utils.ts` | flip 算法核心 | 改 `getAnimateConfig` + 新增 `getSwipeOffset` + 新增 `getSideImageOffset` + 新增 `selectFlipKind` + 新增 `isFlipAnimated` |
| `packages/core/src/components/Image/Image.tsx` | flip 渲染层 | 替换 3 处 cast + 替换 1 处 flipKind 派生 + getStyle 用 `getSideImageOffset` |
| `packages/core/src/components/Caption/Caption.tsx` | flip caption 联动 | 替换 1 处 flipKind 派生 |
| `packages/core/src/components/Image/__tests__/Image.utils.test.ts` | utils 单测 | 新增 `selectFlipKind` / `isFlipAnimated` / `getSwipeOffset` / `getSideImageOffset` / `getAnimateConfig('none')` 的测试 |
| `packages/core/src/__tests__/Zmage.test.tsx` | 集成测试 | 新增 `flip='none'` DOM 测试 + fade/crossFade/zoom 几何测试 + swipe 宽边图测试 |

---

## Task 1: 补 `getAnimateConfig('none')` 单测 (锁基线)

**Why:** 当前 `getAnimateConfig('none')` 返回 `{0,0,0}`(`Image.utils.ts:295-315` switch 的 `'none'` case 不赋值),但无测试。重构 switch 时这个 case 容易丢。

**Files:**
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts:193-208`

- [ ] **Step 1: 添加 `'none'` 断言到现有测试**

打开 `packages/core/src/components/Image/__tests__/Image.utils.test.ts`,在第 203 行 `expect(getAnimateConfig()).toEqual...` 之前插入:

```typescript
      expect(getAnimateConfig('none')).toEqual({ offset: 0, overflow: 0, opacity: 0 })
```

完整修改后的相关行:

```typescript
      expect(getAnimateConfig('fade')).toEqual({ offset: 0, overflow: 0, opacity: 0 })
      expect(getAnimateConfig('crossFade')).toEqual({ offset: 30, overflow: 0, opacity: 0 })
      expect(getAnimateConfig('swipe')).toEqual({ offset: 1010, overflow: 0, opacity: 1 })
      expect(getAnimateConfig('zoom')).toEqual({ offset: 0, overflow: 0.08, opacity: 0 })
      expect(getAnimateConfig('none')).toEqual({ offset: 0, overflow: 0, opacity: 0 })
      expect(getAnimateConfig(false)).toEqual({ offset: 0, overflow: 0, opacity: 0 })
      expect(getAnimateConfig()).toEqual({ offset: 0, overflow: 0, opacity: 0 })
```

- [ ] **Step 2: 运行测试,期望 PASS**

Run: `cd D:/Code/react-zmage/.worktrees/refactor-flip && pnpm --filter react-zmage test -- Image.utils`
Expected: 所有 utils 测试通过(11/11 → 11/11,断言数 +1)

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/components/Image/__tests__/Image.utils.test.ts
git commit -m "test(core): assert getAnimateConfig('none') returns zero config"
```

---

## Task 2: 补 `flip='none'` DOM 行为测试

**Why:** Image.tsx:745 与 Caption.tsx:51 都有 `flipKind !== 'none'` 短路。重构时若把这条短路误删,只有专项测试能立刻发现。

**Files:**
- Modify: `packages/core/src/__tests__/Zmage.test.tsx`(在 "Zmage 动画行为" describe 内,第 359 行 swipe 测试之后插入)

- [ ] **Step 1: 写测试 — `flip='none'` 不渲染 side image**

在 `packages/core/src/__tests__/Zmage.test.tsx` 第 359 行之后(swipe 节点复用测试结束、`Space 触发 zoom` 测试之前)插入:

```typescript
  it("animate.flip='none' 不渲染 side image, 翻页瞬间替换", async () => {
    render(
      <Zmage
        src="https://example.com/01.jpg"
        alt="cover"
        preset="desktop"
        animate={{ flip: 'none' }}
        set={[
          { src: 'https://example.com/01.jpg', alt: 'p1', caption: 'first' },
          { src: 'https://example.com/02.jpg', alt: 'p2', caption: 'second' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('cover'))
    await wait(50)

    // flip='none' 时 buildImageSeries 走单图分支, 仅渲染 center
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
    expect(imgs.length).toBe(1)
    expect(imgs[0].id).toBe('zmageImage')
  })

  it("animate.flip='none' 翻页时 caption 不进入 switching 类 (无过渡)", async () => {
    render(
      <Zmage
        src="https://example.com/01.jpg"
        alt="cover"
        preset="desktop"
        animate={{ flip: 'none' }}
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
    // switchFade/CrossFade/Swipe/Zoom 类全部不应出现
    expect(cap?.className).not.toMatch(/switch(Fade|CrossFade|Swipe|Zoom)/)
  })
```

- [ ] **Step 2: 运行测试,期望 PASS**

Run: `cd D:/Code/react-zmage/.worktrees/refactor-flip && pnpm --filter react-zmage test -- Zmage.test`
Expected: 新增 2 个测试通过,无回归

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/__tests__/Zmage.test.tsx
git commit -m "test(core): assert flip='none' skips side images and caption transitions"
```

---

## Task 3: 补 fade / crossFade / zoom 三种 flip 的 DOM 几何测试

**Why:** 当前只 swipe 有节点几何断言。fade/crossFade/zoom 三种模式的 side image transform / opacity 行为无人验证。重构 `getAnimateConfig` 的 Record 化时,数值漂移这三种最先出问题。

**Files:**
- Modify: `packages/core/src/__tests__/Zmage.test.tsx`(继 Task 2 之后追加)

- [ ] **Step 1: 写 fade 测试**

在 Task 2 插入的两条测试之后追加:

```typescript
  it("animate.flip='fade' 边图初始 opacity=0, transform 不带 offset", async () => {
    render(
      <Zmage
        src="https://example.com/01.jpg"
        alt="cover"
        preset="desktop"
        animate={{ flip: 'fade' }}
        set={[
          { src: 'https://example.com/01.jpg', alt: 'p1' },
          { src: 'https://example.com/02.jpg', alt: 'p2' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('cover'))
    await wait(50)

    const sideImage = Array
      .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
      .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg'))
    expect(sideImage).toBeTruthy()
    // fade 配置: { offset: 0, overflow: 0, opacity: 0 }
    expect(sideImage!.style.opacity).toBe('0')
  })
```

- [ ] **Step 2: 写 crossFade 测试**

紧跟其后追加:

```typescript
  it("animate.flip='crossFade' 边图初始带 30px 横向 offset 且 opacity=0", async () => {
    render(
      <Zmage
        src="https://example.com/01.jpg"
        alt="cover"
        preset="desktop"
        animate={{ flip: 'crossFade' }}
        set={[
          { src: 'https://example.com/01.jpg', alt: 'p1' },
          { src: 'https://example.com/02.jpg', alt: 'p2' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('cover'))
    await wait(50)

    const sideImage = Array
      .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
      .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg'))
    expect(sideImage).toBeTruthy()
    // crossFade 配置: { offset: 30, overflow: 0, opacity: 0 }, step=1 时 transform 含 +30px
    expect(sideImage!.style.opacity).toBe('0')
    expect(sideImage!.style.transform).toMatch(/translate3d\(30px,/)
  })
```

- [ ] **Step 3: 写 zoom 测试**

紧跟其后追加:

```typescript
  it("animate.flip='zoom' 边图初始 overflow=0.08 (scale 比 center 多 8%)", async () => {
    render(
      <Zmage
        src="https://example.com/01.jpg"
        alt="cover"
        preset="desktop"
        animate={{ flip: 'zoom' }}
        set={[
          { src: 'https://example.com/01.jpg', alt: 'p1' },
          { src: 'https://example.com/02.jpg', alt: 'p2' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('cover'))
    await wait(50)

    const sideImage = Array
      .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
      .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg'))
    expect(sideImage).toBeTruthy()
    // zoom 配置: { offset: 0, overflow: 0.08, opacity: 0 }
    expect(sideImage!.style.opacity).toBe('0')
    // sideScale = ownScale + 0.08 → transform 中 scale3d 第一参 > 1 (jsdom 默认 fit 后是 1.x)
    const m = sideImage!.style.transform.match(/scale3d\(([\d.]+),/)
    expect(m).not.toBeNull()
    expect(Number(m![1])).toBeGreaterThan(1)
  })
```

- [ ] **Step 4: 运行测试,期望 PASS**

Run: `pnpm --filter react-zmage test -- Zmage.test`
Expected: 新增 3 个测试通过,共 +3

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/__tests__/Zmage.test.tsx
git commit -m "test(core): assert fade/crossFade/zoom flip side-image geometry"
```

---

## Task 4: 抽 `selectFlipKind` 与 `isFlipAnimated` selector

**Why:** Image.tsx:417 / 675 / 744 + Caption.tsx:44-45 共 4 处 flipKind 派生用 3 种写法。统一成纯函数,删除 `as Animate & { flip?: false }` cast。

**Files:**
- Modify: `packages/core/src/components/Image/Image.utils.ts`(在文件末尾添加)
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`(在文件末尾添加 describe)

### 4.1 写新函数的失败测试

- [ ] **Step 1: 写 selectFlipKind 单测(失败)**

在 `packages/core/src/components/Image/__tests__/Image.utils.test.ts` 顶部 import 区追加 `selectFlipKind` 与 `isFlipAnimated`:

```typescript
import {
  closingEase,
  getAnimateConfig,
  getBrowsingStyle,
  getCoverStyle,
  getImageTransition,
  ImageStyleType,
  lerpCoverStyle,
  makeCubicBezierEase,
  selectFlipKind,
  isFlipAnimated,
} from '../Image.utils'
```

在文件末尾添加:

```typescript
describe('selectFlipKind (flipKind 派生 selector)', () => {
  it('animate=false → false', () => {
    expect(selectFlipKind(false)).toBe(false)
  })
  it('animate={flip:"swipe"} → "swipe"', () => {
    expect(selectFlipKind({ flip: 'swipe' })).toBe('swipe')
  })
  it('animate={flip:"none"} → "none"', () => {
    expect(selectFlipKind({ flip: 'none' })).toBe('none')
  })
  it('animate={} → undefined', () => {
    expect(selectFlipKind({})).toBeUndefined()
  })
  it('animate=undefined → undefined', () => {
    expect(selectFlipKind(undefined)).toBeUndefined()
  })
  it('animate=true → undefined (boolean true 等同未配置)', () => {
    expect(selectFlipKind(true as unknown as boolean)).toBeUndefined()
  })
})

describe('isFlipAnimated (是否有动画过渡的判定)', () => {
  it('"fade"/"crossFade"/"swipe"/"zoom" → true', () => {
    expect(isFlipAnimated('fade')).toBe(true)
    expect(isFlipAnimated('crossFade')).toBe(true)
    expect(isFlipAnimated('swipe')).toBe(true)
    expect(isFlipAnimated('zoom')).toBe(true)
  })
  it('"none" → false (有 flip 配置但无过渡)', () => {
    expect(isFlipAnimated('none')).toBe(false)
  })
  it('false / undefined → false', () => {
    expect(isFlipAnimated(false)).toBe(false)
    expect(isFlipAnimated(undefined)).toBe(false)
  })
})
```

- [ ] **Step 2: 运行测试,期望 FAIL**

Run: `pnpm --filter react-zmage test -- Image.utils`
Expected: 新两个 describe 报 `selectFlipKind is not a function` / `isFlipAnimated is not a function`

### 4.2 实现 selector

- [ ] **Step 3: 在 Image.utils.ts 添加 selector**

打开 `packages/core/src/components/Image/Image.utils.ts`,在 `import { AnimateFlip } from '../../types/global'` 改成同时 import `Animate`:

```typescript
import { Animate, AnimateFlip } from '../../types/global'
```

在文件最末尾(TouchProfile class 之后)追加:

```typescript
/**
 * Flip selectors
 * 把 props.animate 上的 flip 派生收敛成单一来源。
 *
 * 调用方语义:
 * - selectFlipKind: 取出 flip 类型的 raw 值 (含 'none' 与 false)
 * - isFlipAnimated: 是否需要 transition (只有真正的动画类型返回 true)
 *
 * 历史: animate=false 在 Browser 标准化时塞入 { flip: false },
 * 但 Animate.flip 类型不允许 false; 这里用一个 cast 收敛, 不在调用点重复.
 */
export const selectFlipKind = (
  animate: Animate | boolean | undefined
): AnimateFlip | false | undefined => {
  if (animate === false) return false
  if (animate && typeof animate === 'object') {
    return (animate as Animate & { flip?: AnimateFlip | false }).flip
  }
  return undefined
}

export const isFlipAnimated = (
  kind: AnimateFlip | false | undefined
): kind is Exclude<AnimateFlip, 'none'> => !!kind && kind !== 'none'
```

- [ ] **Step 4: 运行测试,期望 PASS**

Run: `pnpm --filter react-zmage test -- Image.utils`
Expected: 新增 9 个 selector 断言通过

### 4.3 替换 4 处 callsites

- [ ] **Step 5: 替换 Image.tsx 中 3 处 cast + 1 处 flipKind 派生**

打开 `packages/core/src/components/Image/Image.tsx`。

在 import 区追加 `selectFlipKind`(已存在 `getAnimateConfig` 等的 import):

把 `from './Image.utils'` 块的最后一行 `TouchProfile,` 之前补一行 `selectFlipKind,`:

修改前(106 行附近):
```typescript
    animateConfig: getAnimateConfig(this.context, this.context.animate?.flip),
```

修改后:
```typescript
    animateConfig: getAnimateConfig(this.context, selectFlipKind(this.context.animate)),
```

修改前(417 行附近 `setCurrentStyle`):
```typescript
  setCurrentStyle = (nextStyle: ImageStyleType, callback?: () => void) => {
    const { animate } = this.context
    const animateParams = (animate || {}) as Animate & { flip?: false }
    const { currentStyle } = this.state
    this.setState({
      currentStyle: nextStyle._behavior === 'merge' ? { ...currentStyle, ...nextStyle } : nextStyle,
      animateConfig: getAnimateConfig(this.context, animateParams.flip),
    }, callback)
  }
```

修改后:
```typescript
  setCurrentStyle = (nextStyle: ImageStyleType, callback?: () => void) => {
    const { animate } = this.context
    const { currentStyle } = this.state
    this.setState({
      currentStyle: nextStyle._behavior === 'merge' ? { ...currentStyle, ...nextStyle } : nextStyle,
      animateConfig: getAnimateConfig(this.context, selectFlipKind(animate)),
    }, callback)
  }
```

修改前(675 行附近 `getStyle` 头部):
```typescript
    const { animate, set, zoom, page } = this.context
    const { invalidate, currentStyle, touchProfile, animateConfig } = this.state
    const animateParams = (animate || {}) as Animate & { flip?: false }
```

修改后:
```typescript
    const { animate, set, zoom, page } = this.context
    const { invalidate, currentStyle, touchProfile, animateConfig } = this.state
    const flipKind = selectFlipKind(animate)
```

把同一函数内 694 行附近:
```typescript
      if (animateParams.flip === 'swipe' && ownScale != null) {
```
改为:
```typescript
      if (flipKind === 'swipe' && ownScale != null) {
```

把 730 行附近:
```typescript
        flip: animateParams.flip,
```
改为:
```typescript
        flip: flipKind,
```

修改前(744 行附近 `buildImageSeries`):
```typescript
    const flipKind = (typeof animate === 'object' && animate?.flip) ? animate.flip : undefined
    if (set.length > 1 && flipKind !== 'none') {
```

修改后:
```typescript
    const flipKind = selectFlipKind(animate)
    if (set.length > 1 && flipKind !== 'none') {
```

至此 `Animate` 类型在 Image.tsx 不再被消费,删除 import 中的 `Animate`(第 14 行附近):
```typescript
import { Animate } from '../../types/global'
```
若 `Animate` 是从该 import 唯一引入的成员则删整行;若与其他类型同 import 则只删 `Animate,`。

(此项检查靠 tsc/eslint 验证,见步骤 7)

- [ ] **Step 6: 替换 Caption.tsx 中 1 处 flipKind 派生**

打开 `packages/core/src/components/Caption/Caption.tsx`。

在 import 区追加:

```typescript
import { selectFlipKind } from '../Image/Image.utils'
```

修改前(44-45 行):
```typescript
  // 当前 flip 类型, caption 切换时跟随它的过渡形态 (而非固定 bottom fadein)
  const flipKind: AnimateFlip | undefined =
    typeof animate === 'object' && animate?.flip ? (animate.flip as AnimateFlip) : undefined
```

修改后:
```typescript
  // 当前 flip 类型, caption 切换时跟随它的过渡形态 (而非固定 bottom fadein)
  const rawFlipKind = selectFlipKind(animate)
  const flipKind: AnimateFlip | undefined = rawFlipKind && rawFlipKind !== false ? rawFlipKind : undefined
```

注: 这里保留原 `flipKind: AnimateFlip | undefined` 类型契约不变,以减少其他位置(`switching` useEffect 依赖、`switchClass` 计算)的连锁修改风险。

- [ ] **Step 7: 跑全量测试 + tsc, 期望 PASS**

Run:
```bash
pnpm --filter react-zmage test 2>&1 | tail -5
pnpm --filter react-zmage exec tsc -p tsconfig.declarations.json --noEmit 2>&1 | tail -10
```
Expected: 68 + 6 (新增 selector test) = 74 tests passed; tsc 无新错误

如果 tsc 报 `'Animate' is declared but never used`,删除该未使用 import。

- [ ] **Step 8: Commit**

```bash
git add packages/core/src/components/Image/Image.utils.ts \
        packages/core/src/components/Image/Image.tsx \
        packages/core/src/components/Caption/Caption.tsx \
        packages/core/src/components/Image/__tests__/Image.utils.test.ts
git commit -m "refactor(core): consolidate flipKind derivation into selectFlipKind selector"
```

---

## Task 5: `getAnimateConfig` 改 Record + 抽 `getSwipeOffset`

**Why:** switch + 重载签名让"加 case 时 TS 不强制提示"。Record 化后任何漏掉的 `AnimateFlip` 成员立即报 TS 错误。

**Files:**
- Modify: `packages/core/src/components/Image/Image.utils.ts`(改 `getAnimateConfig` 与上下相关常量)
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`(为 `getSwipeOffset` 加专项测试)

### 5.1 写 `getSwipeOffset` 失败测试

- [ ] **Step 1: 在 Image.utils.test.ts 末尾追加测试**

import 区追加 `getSwipeOffset`:

```typescript
import {
  // ... existing
  getSwipeOffset,
} from '../Image.utils'
```

在文件末尾追加:

```typescript
describe('getSwipeOffset (swipe 模式 viewport 依赖的 offset)', () => {
  it('返回 viewport.width + SWIPE_GAP (10)', () => {
    const originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { value: 800, configurable: true })

    try {
      expect(getSwipeOffset()).toBe(810)
    } finally {
      if (originalClientWidthDescriptor) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidthDescriptor)
    }
  })
})
```

- [ ] **Step 2: 运行测试,期望 FAIL**

Run: `pnpm --filter react-zmage test -- Image.utils`
Expected: `getSwipeOffset is not a function`

### 5.2 实现 Record + getSwipeOffset

- [ ] **Step 3: 重写 `getAnimateConfig` 区块**

在 `packages/core/src/components/Image/Image.utils.ts` 中找到第 278-317 行的 `/* 动画属性 */` 区块(从 `const CROSS_FADE_OFFSET = 30` 到 `getAnimateConfig` 函数结束),整体替换为:

```typescript
/* 动画属性 */
const CROSS_FADE_OFFSET = 30
export const SWIPE_GAP = 10
const ZOOM_OVERFLOW = 0.08

export interface ImageAnimateType {
  offset: number
  overflow: number
  opacity: number
}

/**
 * 静态 flip 视觉参数表 — 单一来源.
 *
 * swipe 的 offset 在这里给 0, 真实 offset 由 getSwipeOffset(context) 在调用点叠加,
 * 避免 getAnimateConfig 因 viewport 依赖而需要 context 重载.
 */
const FLIP_VISUAL: Record<AnimateFlip, ImageAnimateType> = {
  fade:      { offset: 0,                 overflow: 0,            opacity: 0 },
  crossFade: { offset: CROSS_FADE_OFFSET, overflow: 0,            opacity: 0 },
  swipe:     { offset: 0,                 overflow: 0,            opacity: 1 },
  zoom:      { offset: 0,                 overflow: ZOOM_OVERFLOW, opacity: 0 },
  none:      { offset: 0,                 overflow: 0,            opacity: 0 },
}

const FLIP_VISUAL_FALLBACK: ImageAnimateType = { offset: 0, overflow: 0, opacity: 0 }

/**
 * swipe 模式 side image 的视口宽度依赖 offset.
 * 与 FLIP_VISUAL.swipe.offset (=0) 在调用点求和: 让 swipe 配置在 Record 内静态可视,
 * viewport 依赖单独一条纯函数, 互不污染.
 */
export const getSwipeOffset = (context?: Pick<ContextType, 'viewportRef'>): number =>
  getViewportRect(context).width + SWIPE_GAP

export function getAnimateConfig(type?: AnimateFlip | false): ImageAnimateType
export function getAnimateConfig(context: ContextType, type?: AnimateFlip | false): ImageAnimateType
export function getAnimateConfig(
  contextOrType?: ContextType | AnimateFlip | false,
  maybeType?: AnimateFlip | false
): ImageAnimateType {
  const context = typeof contextOrType === 'object' && contextOrType !== null ? contextOrType : undefined
  const type = context ? maybeType : (contextOrType as AnimateFlip | false | undefined)
  if (!type) return FLIP_VISUAL_FALLBACK
  const base = FLIP_VISUAL[type]
  if (type === 'swipe') {
    return { ...base, offset: getSwipeOffset(context) }
  }
  return base
}
```

注: 函数签名与外部行为完全等价(无参 / `false` / 五个 enum case 全部沿用旧返回值)。

- [ ] **Step 4: 运行测试,期望 PASS**

Run: `pnpm --filter react-zmage test -- Image.utils`
Expected: 新增 `getSwipeOffset` 测试通过 + 既有 `getAnimateConfig` 6 条断言全部仍通过 (含 Task 1 新增的 `'none'`)

- [ ] **Step 5: 全量回归**

Run: `pnpm --filter react-zmage test 2>&1 | tail -5`
Expected: 全部测试通过(75 tests,Task 1-3 + Task 4 + Task 5 累计)

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/components/Image/Image.utils.ts \
        packages/core/src/components/Image/__tests__/Image.utils.test.ts
git commit -m "refactor(core): convert getAnimateConfig switch to Record + extract getSwipeOffset"
```

---

## Task 6: 抽 `getSideImageOffset` 纯函数 + 补宽边图测试

**Why:** Image.tsx getStyle 第 693-702 行 swipe 模式三层嵌套 inline 计算 effectiveOffset,且无几何测试。抽成纯函数可以单独覆盖"宽 side 撑出视口"分支。

**Files:**
- Modify: `packages/core/src/components/Image/Image.utils.ts`(添加 `getSideImageOffset`)
- Modify: `packages/core/src/components/Image/Image.tsx`(getStyle 用新函数)
- Modify: `packages/core/src/components/Image/__tests__/Image.utils.test.ts`(纯函数测试)

### 6.1 失败测试驱动新函数

- [ ] **Step 1: 写测试**

在 `packages/core/src/components/Image/__tests__/Image.utils.test.ts` import 追加 `getSideImageOffset`:

```typescript
import {
  // ... existing
  getSideImageOffset,
} from '../Image.utils'
```

在末尾追加 describe:

```typescript
describe('getSideImageOffset (side image 横向 offset)', () => {
  const viewport = { left: 0, top: 0, width: 1000, height: 800 }

  it("非 swipe 模式: 返回 baseOffset 不变 (fade/crossFade/zoom)", () => {
    expect(getSideImageOffset({
      flipKind: 'crossFade',
      baseOffset: 30,
      ownScale: 1,
      dims: { w: 500, h: 500 },
      viewport,
    })).toBe(30)
    expect(getSideImageOffset({
      flipKind: 'fade',
      baseOffset: 0,
      ownScale: 1,
      dims: { w: 500, h: 500 },
      viewport,
    })).toBe(0)
  })

  it('swipe 模式: 窄 side (物理宽 < viewport) 仍用 baseOffset', () => {
    // viewport=1000, dims.w*scale/2 = 250*1/2 = 125, base=1010
    // viewport半宽 + side半宽 + gap = 500 + 125 + 10 = 635 < 1010 → 用 baseOffset
    expect(getSideImageOffset({
      flipKind: 'swipe',
      baseOffset: 1010,
      ownScale: 1,
      dims: { w: 250, h: 250 },
      viewport,
    })).toBe(1010)
  })

  it('swipe 模式: 宽 side (1000x500 在窄 center 旁) 用动态 max', () => {
    // ownScale=1.5, dims.w=1000 → ownPhysicalHalfWidth = 1000*1.5/2 = 750
    // viewport半宽 + side半宽 + gap = 500 + 750 + 10 = 1260 > base=1010 → 用 1260
    expect(getSideImageOffset({
      flipKind: 'swipe',
      baseOffset: 1010,
      ownScale: 1.5,
      dims: { w: 1000, h: 500 },
      viewport,
    })).toBe(1260)
  })

  it('swipe 模式: ownScale 为 null (尚未拿到 dimensions) → 跳过修正, 用 baseOffset', () => {
    expect(getSideImageOffset({
      flipKind: 'swipe',
      baseOffset: 1010,
      ownScale: null,
      dims: { w: 1000, h: 500 },
      viewport,
    })).toBe(1010)
  })

  it('swipe 模式: dims 为 null → 跳过修正', () => {
    expect(getSideImageOffset({
      flipKind: 'swipe',
      baseOffset: 1010,
      ownScale: 1,
      dims: null,
      viewport,
    })).toBe(1010)
  })
})
```

- [ ] **Step 2: 运行测试,期望 FAIL**

Run: `pnpm --filter react-zmage test -- Image.utils`
Expected: `getSideImageOffset is not a function`

### 6.2 实现纯函数

- [ ] **Step 3: 在 Image.utils.ts 添加 `getSideImageOffset`**

在 `getSwipeOffset` 之后(`getAnimateConfig` 之前)插入:

```typescript
/**
 * side image 的实际横向 offset (考虑 swipe 模式宽边图修正).
 *
 * swipe 模式默认 baseOffset 用 center viewport.width 估算, 但 side image 自己
 * 物理宽度可能更宽 (如 1000x500 wide 在窄 center 旁), 用动态 max 把 side 完全推到
 * 视口外, 避免 "探头进镜头" (Issue #167 配套修复).
 *
 * 其他模式 (fade/crossFade/zoom/none) baseOffset 是 Record 内静态值, 直接返回.
 */
export const getSideImageOffset = ({
  flipKind,
  baseOffset,
  ownScale,
  dims,
  viewport,
}: {
  flipKind: AnimateFlip | false | undefined
  baseOffset: number
  ownScale: number | null
  dims: { w: number, h: number } | null | undefined
  viewport: ViewportRect
}): number => {
  if (flipKind !== 'swipe' || ownScale == null || !dims) return baseOffset
  const sideScale = ownScale + FLIP_VISUAL.swipe.overflow
  const ownPhysicalHalfWidth = (dims.w * sideScale) / 2
  return Math.max(baseOffset, viewport.width / 2 + ownPhysicalHalfWidth + SWIPE_GAP)
}
```

- [ ] **Step 4: 运行测试,期望 PASS**

Run: `pnpm --filter react-zmage test -- Image.utils`
Expected: 5 个新测试通过

### 6.3 在 Image.tsx 替换 inline 几何

- [ ] **Step 5: 修改 Image.tsx getStyle**

打开 `packages/core/src/components/Image/Image.tsx`,在 import 区把 `getSideImageOffset` 加入 from `./Image.utils`:

```typescript
import {
  // ...
  getSideImageOffset,
  // ...
} from './Image.utils'
```

修改前(683-708 行):

```typescript
    if (isSideImage) {
      // side image 用自己的 fit-scale ...
      const ownScale = currentStyle._type === 'browsing' ? this.getOwnFitScale(imageIndex) : null
      const sideScale = (ownScale ?? (currentStyle.scale || 0)) + overflow
      // swipe 模式: 默认 offset ...
      let effectiveOffset = offset
      if (flipKind === 'swipe' && ownScale != null) {
        const dims = this.state.imageDimensions[imageIndex]
        if (dims) {
          const viewport = getViewportRect(this.context)
          const ownPhysicalHalfWidth = (dims.w * sideScale) / 2
          effectiveOffset = Math.max(offset, viewport.width / 2 + ownPhysicalHalfWidth + SWIPE_GAP)
        }
      }
      // 仅对左右两张图做滑动跟踪
      const x = distance === 1 ? (currentStyle.x || 0) + touch.x + effectiveOffset * step : (currentStyle.x || 0) + effectiveOffset * step
      const y = currentStyle.y
      transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${sideScale}, ${sideScale}, 1) rotate3d(0, 0, 1, 0deg)`
      zIndex = 10 * distance
      pointerEvents = 'none'
    } else {
```

修改后:

```typescript
    if (isSideImage) {
      // side image 用自己的 fit-scale ...
      const ownScale = currentStyle._type === 'browsing' ? this.getOwnFitScale(imageIndex) : null
      const sideScale = (ownScale ?? (currentStyle.scale || 0)) + overflow
      const effectiveOffset = getSideImageOffset({
        flipKind,
        baseOffset: offset,
        ownScale,
        dims: this.state.imageDimensions[imageIndex],
        viewport: getViewportRect(this.context),
      })
      // 仅对左右两张图做滑动跟踪
      const x = distance === 1 ? (currentStyle.x || 0) + touch.x + effectiveOffset * step : (currentStyle.x || 0) + effectiveOffset * step
      const y = currentStyle.y
      transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${sideScale}, ${sideScale}, 1) rotate3d(0, 0, 1, 0deg)`
      zIndex = 10 * distance
      pointerEvents = 'none'
    } else {
```

至此 `SWIPE_GAP` 不再在 Image.tsx 直接被引用(Task 6 把它的唯一使用收进 `getSideImageOffset`)。从 Image.tsx 顶部 import 中删除 `SWIPE_GAP`:

修改前(import 区):
```typescript
import {
  // ...
  SWIPE_GAP,
  // ...
} from './Image.utils'
```

修改后:删除 `SWIPE_GAP,` 这一行(整体 import 块继续保留)。

- [ ] **Step 6: 全量回归 + tsc**

Run:
```bash
pnpm --filter react-zmage test 2>&1 | tail -5
pnpm --filter react-zmage exec tsc -p tsconfig.declarations.json --noEmit 2>&1 | tail -10
```
Expected: 80 tests passing(68 baseline + 1 (Task1) + 2 (Task2) + 3 (Task3) + 6 (Task4) + 1 (Task5 getSwipeOffset) - 1 (Task5 重复? 实际+9 共 80) … 实际数靠运行确认。tsc 无错。

注: 上面累计算法仅供参考。最后执行时以实际数为准, 任何未达预期的失败必须修复后才提交。

### 6.4 集成测试: 宽边图 swipe(可选,Task 6 后追加)

- [ ] **Step 7: 写集成测试 (锁 swipe 探头修复)**

在 `packages/core/src/__tests__/Zmage.test.tsx` 既有 swipe 节点复用测试(第 329-359 行)之后,但在 Task 2 插入的 `flip='none'` 测试之前,追加:

```typescript
  it('swipe 模式: side image 物理宽超过 viewport 时 effectiveOffset 动态扩张', async () => {
    // 让所有 img 的 natural 尺寸为 2000x800 (远超 1000 视口宽), ownScale=0.5 fit;
    // sideScale ≈ 0.5 + 0 = 0.5, ownPhysicalHalfWidth = 2000*0.5/2 = 500;
    // viewport.width(1000)/2 + 500 + 10 = 1010, baseOffset = viewport.width + SWIPE_GAP = 1010 → max=1010 (恰相等).
    // 这条测试主要回归: 即使在 baseOffset 与动态 max 相等的临界, 不应 < baseOffset.
    const originalNaturalWidth = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const originalNaturalHeight = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')

    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 2000 })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 800 })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(
        <Zmage
          src="https://example.com/01.jpg"
          alt="cover"
          preset="desktop"
          animate={{ flip: 'swipe' }}
          set={[
            { src: 'https://example.com/01.jpg', alt: 'p1' },
            { src: 'https://example.com/02.jpg', alt: 'p2' },
          ]}
        />
      )
      fireEvent.click(screen.getByAltText('cover'))
      await wait(60)

      const sideImage = Array
        .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
        .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg'))
      expect(sideImage).toBeTruthy()
      // step=1 (右侧 side), x = effectiveOffset * 1 ≥ 1010 (= viewport+gap 起步)
      const m = sideImage!.style.transform.match(/translate3d\((-?[\d.]+)px,/g)
      expect(m).not.toBeNull()
      // 第二个 translate3d 是 (x, y, 0); x 从中提取
      const second = m!.find(s => !s.includes('-50%'))
      expect(second).toBeDefined()
      const x = Number(second!.match(/translate3d\(([-\d.]+)px,/)![1])
      expect(x).toBeGreaterThanOrEqual(1010)
    } finally {
      if (originalNaturalWidth) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', originalNaturalWidth)
      if (originalNaturalHeight) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', originalNaturalHeight)
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })
```

- [ ] **Step 8: 运行回归,期望 PASS**

Run: `pnpm --filter react-zmage test -- Zmage.test 2>&1 | tail -5`
Expected: 全部通过

- [ ] **Step 9: Commit**

```bash
git add packages/core/src/components/Image/Image.utils.ts \
        packages/core/src/components/Image/Image.tsx \
        packages/core/src/components/Image/__tests__/Image.utils.test.ts \
        packages/core/src/__tests__/Zmage.test.tsx
git commit -m "refactor(core): extract getSideImageOffset pure function from Image.getStyle"
```

---

## Task 7: 终验 + 准备 PR

- [ ] **Step 1: 全量测试**

Run: `pnpm --filter react-zmage test 2>&1 | tail -10`
Expected: 全绿

- [ ] **Step 2: 类型检查**

Run: `pnpm --filter react-zmage exec tsc -p tsconfig.declarations.json --noEmit`
Expected: 无 error

- [ ] **Step 3: lint**

Run: `pnpm --filter react-zmage lint 2>&1 | tail -10`
Expected: 无新增 warning(原有 `prefer-const` disable 注释保留,本波不动)

- [ ] **Step 4: 跨版本沙盒回归(关键!CLAUDE.md 要求)**

Run: `pnpm -w run check 2>&1 | tail -20`
Expected: r17 / r18 / r19 / nextjs 四个 sandbox 都通过

如果某个 sandbox 因 `.pack/` tgz 问题失败,确保 `.worktrees/refactor-flip/.pack/` 存在 baseline tgz(已在 worktree setup 阶段拷贝)。

- [ ] **Step 5: 简短自查**

打开各个 commit diff 简评:
- 公共 API surface 是否完全未变(`packages/core/src/index.ts` 不应被改)
- 默认值是否未变(`packages/core/src/types/default.ts` 不应被改)
- CSS / keyframes 是否未变

- [ ] **Step 6: 输出汇总,等用户确认是否合并**

向用户报告:
- 改动文件数与 LOC
- 新增测试数(累计)
- 全量测试通过状态
- 沙盒回归状态
- 让用户决定: 直接 fast-forward merge 到 master,或先 push 该 branch + 开 PR review

---

## 总结表

| 任务 | 改动文件 | 新增测试 | 风险 |
|---|---|---|---|
| Task 1 | utils.test.ts | +1 断言 | 极低 |
| Task 2 | Zmage.test.tsx | +2 测试 | 极低 |
| Task 3 | Zmage.test.tsx | +3 测试 | 极低 |
| Task 4 | utils.ts + Image.tsx + Caption.tsx + utils.test.ts | +9 单测 | 低 (selector 替换) |
| Task 5 | utils.ts + utils.test.ts | +1 单测 | 低 (Record 重写) |
| Task 6 | utils.ts + Image.tsx + utils.test.ts + Zmage.test.tsx | +5 单测 + 1 集成 | 中 (getStyle 改写) |
| Task 7 | (验证) | - | - |

**预期净变化**:
- LOC: +~250 / -~60(主要是测试 + selector 实现)
- 公共类型 / 默认值 / CSS:零变更
- 用户可见行为:零变更
- 测试覆盖:从 68 涨到约 89(+21)

---

## 退出条件

下列任一不满足即视为本波失败,不要合并:

1. `pnpm --filter react-zmage test` 全绿
2. `pnpm -w run check`(r17/r18/r19/nextjs)全部通过
3. 公共类型 / 默认值 / CSS 文件零变更(仅可改 Image.tsx / Image.utils.ts / Caption.tsx + 对应测试)
4. 没有 `// @ts-ignore` / `// @ts-expect-error` / 新增 `eslint-disable` 注释
5. `Animate` import 在 Image.tsx 已删干净(由 tsc/eslint 验证)
