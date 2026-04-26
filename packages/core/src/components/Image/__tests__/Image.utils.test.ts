/**
 * 锁定 cover/zoom 几何计算用 viewport (innerWidth/innerHeight) 而不是 body.scrollWidth.
 *
 * 历史 bug: full-bleed 布局下大图把 body 撑出横向滚动条, scrollWidth >> innerWidth,
 *  导致 Zmage 点击放大动画从屏幕左下方"飘出"而不是从原图位置长出. 修复后, 即使页面
 *  有横向滚动, 几何参考系仍是视口.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getCoverStyle } from '../Image.utils'
import type { ContextType } from '../../context'

describe('getCoverStyle 跨 viewport 几何', () => {
  let originalInnerWidth: number
  let originalInnerHeight: number
  let originalScrollWidthDescriptor: PropertyDescriptor | undefined

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
    originalInnerHeight = window.innerHeight
    originalScrollWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth')
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, configurable: true })
    if (originalScrollWidthDescriptor) {
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', originalScrollWidthDescriptor)
    }
  })

  function buildCoverImg ({ left, top, width, height }: { left: number, top: number, width: number, height: number }) {
    const img = document.createElement('img')
    Object.defineProperty(img, 'naturalWidth', { value: width, configurable: true })
    img.getBoundingClientRect = () => ({
      left, top, width, height,
      right: left + width, bottom: top + height,
      x: left, y: top,
      toJSON: () => ({}),
    } as DOMRect)
    return img
  }

  function buildContext (cover: HTMLImageElement, pageIsCover = true) {
    return {
      coverRef: { current: cover },
      coverPos: undefined,
      rotate: 0,
      pageIsCover,
    } as unknown as ContextType
  }

  it('horizontally overflowing body — cover offset uses viewport width, not scrollWidth', () => {
    // 视口 1000×800, body 因大图被撑到 4000 宽 (横向有 3000px 隐藏在视口右侧)
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { value: 4000, configurable: true })

    // 封面图正好在视口中心 (left=400, width=200 → 中心 X = 500 = innerWidth/2)
    const cover = buildCoverImg({ left: 400, top: 350, width: 200, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    // 封面在视口正中央 → x 偏移应当为 0 (相对视口中心), 不是 -1500 (相对 body 中心)
    expect(style.x).toBe(0)
    expect(style.y).toBe(0)
  })

  it('cover off to the right of viewport center — x offset positive, not skewed by scrollWidth', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { value: 4000, configurable: true })

    // 封面图中心 X = 800, 视口中心 X = 500 → 期望 x = 300
    const cover = buildCoverImg({ left: 700, top: 350, width: 200, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    expect(style.x).toBe(300)
  })

  it('non-overflowing body — backwards compatible', () => {
    // 普通页面: scrollWidth == innerWidth
    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { value: 1024, configurable: true })

    const cover = buildCoverImg({ left: 200, top: 100, width: 100, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    // 中心 X = 250, 视口中心 = 512 → 期望 x = -262
    expect(style.x).toBe(250 - 512)
    // 中心 Y = 150, 视口中心 = 384 → 期望 y = -234
    expect(style.y).toBe(150 - 384)
  })
})
