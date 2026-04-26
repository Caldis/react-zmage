/**
 * 锁定 cover/zoom 几何计算用 documentElement.clientWidth/Height (布局视口),
 * 而不是 body.scrollWidth (内容宽) 或 window.innerWidth (含滚动条占位).
 *
 * 历史 bug 双重:
 *   1. body.scrollWidth: full-bleed 大图把 body 撑出横向滚动条时, scrollWidth >> 视口宽,
 *      点击放大动画从屏幕左下方"飘出"而不是从原图位置长出.
 *   2. window.innerWidth: 普通竖向滚动页面 (有右侧滚动条占位) 时, innerWidth 比布局视口
 *      宽 ~15-17px, 计算的中心位置整体向左偏一个滚动条宽.
 * 正确选择是 clientWidth/Height — getBoundingClientRect / event.clientX / position:fixed
 * 的盒子三者都用这个参考系.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getCoverStyle } from '../Image.utils'
import type { ContextType } from '../../context'

describe('getCoverStyle 跨 viewport 几何', () => {
  let originalInnerWidth: number
  let originalInnerHeight: number
  let originalScrollWidthDescriptor: PropertyDescriptor | undefined
  let originalClientWidthDescriptor: PropertyDescriptor | undefined
  let originalClientHeightDescriptor: PropertyDescriptor | undefined

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
    originalInnerHeight = window.innerHeight
    originalScrollWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth')
    originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    originalClientHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, configurable: true })
    if (originalScrollWidthDescriptor) Object.defineProperty(HTMLElement.prototype, 'scrollWidth', originalScrollWidthDescriptor)
    if (originalClientWidthDescriptor) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidthDescriptor)
    if (originalClientHeightDescriptor) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeightDescriptor)
  })

  function setViewport ({ inner, client, scroll }: {
    inner: { w: number, h: number }
    client: { w: number, h: number }
    scroll?: { w: number }
  }) {
    Object.defineProperty(window, 'innerWidth', { value: inner.w, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: inner.h, configurable: true })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { value: client.w, configurable: true })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { value: client.h, configurable: true })
    if (scroll) Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { value: scroll.w, configurable: true })
  }

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

  it('full-bleed (横向溢出): cover-at-viewport-center → x=0, 不被 scrollWidth 拉走', () => {
    // 视口可见 1000×800, 但 body 被大图撑到 4000 宽 (3000px 在视口右侧滚出可见)
    setViewport({
      inner: { w: 1000, h: 800 },
      client: { w: 1000, h: 800 },  // 无 scrollbar (假设)
      scroll: { w: 4000 },
    })

    const cover = buildCoverImg({ left: 400, top: 350, width: 200, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    expect(style.x).toBe(0)
    expect(style.y).toBe(0)
  })

  it('普通页面 + 竖向滚动条: x 用 clientWidth, 不偏一个 scrollbar 宽', () => {
    // 1920px 显示器, 视口含 17px 竖向滚动条占位
    // innerWidth = 1920 (含 scrollbar)
    // clientWidth = 1903 (不含)
    setViewport({
      inner: { w: 1920, h: 1080 },
      client: { w: 1903, h: 1080 },
    })

    // 封面图中心 X = 951.5 (左移到 client viewport 中心)
    const cover = buildCoverImg({ left: 851.5, top: 0, width: 200, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    // 期望 x = 0 (cover 在布局视口中心); 用 innerWidth 会得 -8.5 (= 951.5 - 960)
    expect(style.x).toBe(0)
  })

  it('cover 偏右 + 有竖向滚动条: x 反映布局视口相对偏移', () => {
    setViewport({
      inner: { w: 1920, h: 1080 },
      client: { w: 1903, h: 1080 },
    })

    // 封面中心 X = 1500 (相对布局视口中心 951.5 偏 +548.5)
    const cover = buildCoverImg({ left: 1400, top: 100, width: 200, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    expect(style.x).toBeCloseTo(548.5, 5)
  })

  it('普通页面无任何滚动: 行为不变', () => {
    setViewport({
      inner: { w: 1024, h: 768 },
      client: { w: 1024, h: 768 },
      scroll: { w: 1024 },
    })

    const cover = buildCoverImg({ left: 200, top: 100, width: 100, height: 100 })
    const style = getCoverStyle(buildContext(cover))

    // 中心 X = 250, 视口中心 = 512 → x = -262
    expect(style.x).toBe(250 - 512)
    expect(style.y).toBe(150 - 384)
  })
})
