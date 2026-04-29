/**
 * 锁定 cover/zoom 几何计算用 Zmage overlay 的实际盒子尺寸。
 *
 * 没有 overlay ref 时回退到 documentElement.clientWidth/Height, 保持旧测试环境和
 * 普通页面行为稳定。真实浏览器里优先读 overlay.getBoundingClientRect(), 避免
 * Chrome 移动端模拟 + 宿主横向溢出时 clientWidth / innerWidth / fixed 层尺寸分裂。
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  closingEase,
  getAnimateConfig,
  getBrowsingStyle,
  getCoverStyle,
  getImageTransition,
  getSideImageOffset,
  getSwipeOffset,
  ImageStyleType,
  lerpCoverStyle,
  makeCubicBezierEase,
  selectFlipKind,
} from '../Image.utils'
import { animationCurve } from '../../../config/anim'
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
    Object.defineProperty(img, 'naturalHeight', { value: height, configurable: true })
    img.getBoundingClientRect = () => ({
      left, top, width, height,
      right: left + width, bottom: top + height,
      x: left, y: top,
      toJSON: () => ({}),
    } as DOMRect)
    return img
  }

  function buildViewport ({ left = 0, top = 0, width, height }: { left?: number, top?: number, width: number, height: number }) {
    const viewport = document.createElement('div')
    viewport.getBoundingClientRect = () => ({
      left, top, width, height,
      right: left + width, bottom: top + height,
      x: left, y: top,
      toJSON: () => ({}),
    } as DOMRect)
    return viewport
  }

  function buildContext (cover: HTMLImageElement, pageIsCover = true, viewport?: HTMLElement) {
    return {
      coverRef: { current: cover },
      coverPos: undefined,
      viewportRef: { current: viewport || null },
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

  it('移动端模拟 + 宿主横向溢出: 几何跟随 overlay 实际盒子, 不跟 clientWidth 分裂', () => {
    setViewport({
      inner: { w: 481, h: 1043 },
      client: { w: 430, h: 932 },
      scroll: { w: 481 },
    })

    const viewport = buildViewport({ width: 481, height: 1043 })
    const cover = buildCoverImg({ left: 190.5, top: 471.5, width: 100, height: 100 })
    const style = getCoverStyle(buildContext(cover, true, viewport))

    // 若仍用 clientWidth/clientHeight, x/y 会分别偏 25.5 / 55.5。
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

  it('模态 img 尚未读到 natural 尺寸时, 用同 src 封面图尺寸直接计算 browsing fit', () => {
    setViewport({
      inner: { w: 1000, h: 800 },
      client: { w: 1000, h: 800 },
    })

    const cover = buildCoverImg({ left: 0, top: 0, width: 2000, height: 1000 })
    cover.setAttribute('src', 'same.jpg')
    const modalImg = document.createElement('img')
    Object.defineProperty(modalImg, 'naturalWidth', { value: 0, configurable: true })
    Object.defineProperty(modalImg, 'naturalHeight', { value: 0, configurable: true })

    const style = getBrowsingStyle({
      coverRef: { current: cover },
      edge: 0,
      page: 0,
      radius: 0,
      rotate: 0,
      set: [{ src: 'same.jpg' }],
    } as unknown as ContextType, { current: modalImg })

    expect(style.scale).toBeCloseTo(0.502, 5)
  })
})

describe('getAnimateConfig 翻页动画参数', () => {
  it('四种 flip 动画返回可区分的初始态; 未指定时隐藏边图', () => {
    const originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { value: 1000, configurable: true })

    try {
      expect(getAnimateConfig('fade')).toEqual({ offset: 0, overflow: 0, opacity: 0 })
      expect(getAnimateConfig('crossFade')).toEqual({ offset: 30, overflow: 0, opacity: 0 })
      expect(getAnimateConfig('swipe')).toEqual({ offset: 1010, overflow: 0, opacity: 1 })
      expect(getAnimateConfig('zoom')).toEqual({ offset: 0, overflow: 0.08, opacity: 0 })
      expect(getAnimateConfig('none')).toEqual({ offset: 0, overflow: 0, opacity: 0 })
      expect(getAnimateConfig(false)).toEqual({ offset: 0, overflow: 0, opacity: 0 })
      expect(getAnimateConfig()).toEqual({ offset: 0, overflow: 0, opacity: 0 })
    } finally {
      if (originalClientWidthDescriptor) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidthDescriptor)
    }
  })
})

describe('getImageTransition 动画边界', () => {
  it('zoom 进入动画不受 flip=false 影响, 鼠标跟随禁用 transition', () => {
    expect(getImageTransition({
      role: 'center',
      motionPhase: 'zoom-enter',
      flip: false,
      imageType: 'zooming',
    })).toContain('transform 350ms')

    expect(getImageTransition({
      role: 'center',
      motionPhase: 'zoom-follow',
      flip: false,
      imageType: 'zooming',
    })).toBe('none')
  })

  it('closing-follow 阶段必须返回 none — 让 RAF 接管, 防止 CSS transition 内插覆盖每帧的 setNodeTransform', () => {
    expect(getImageTransition({
      role: 'center',
      motionPhase: 'closing-follow',
      imageType: 'cover',
    })).toBe('none')
  })

  it('flip=false 只在非 zoom 图片状态下关闭图片 transition', () => {
    expect(getImageTransition({
      role: 'center',
      motionPhase: 'idle',
      flip: false,
      imageType: 'browsing',
    })).toBe('none')

    expect(getImageTransition({
      role: 'center',
      motionPhase: 'idle',
      flip: false,
      imageType: 'zooming',
    })).toBeUndefined()
  })

  it("flip='none' 走 fall-through, 不进入 false 短路 (保证 rotate / zoom-toggle / resize 等非翻页 transition 仍生效)", () => {
    // 防御 "Bonus B" 草案 (`flip === false || flip === 'none'`) 复活: 此变更会让
    // animate.flip='none' 模式下的旋转 / 窗口 resize / zoom 切换全部变瞬移, 与
    // "flip='none' = 仅页面切换无过渡" 的语义不符.
    expect(getImageTransition({
      role: 'center',
      motionPhase: 'idle',
      flip: 'none',
      imageType: 'browsing',
    })).toBeUndefined()
  })
})

/**
 * 关闭路径 RAF 用到的纯函数
 *
 * lerpCoverStyle: 在动画起点 (browsing 状态) 与实时 cover 视口位置之间逐帧插值
 * closingEase: cubic-bezier(animationCurve) 的 t→y 求解器, 让 RAF 视觉与 CSS transition 同曲线
 */
describe('lerpCoverStyle (关闭路径 RAF 插值)', () => {
  const browsingStyle: ImageStyleType = {
    _type: 'browsing',
    x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, radius: 0,
  }
  const coverStyle: ImageStyleType = {
    _type: 'cover',
    x: 200, y: 100, scale: 0.25, rotate: 360, opacity: 1, radius: 8,
  }

  it('t=0 → from (动画起点)', () => {
    const out = lerpCoverStyle(browsingStyle, coverStyle, 0)
    expect(out._type).toBe('cover')
    expect(out.x).toBe(0)
    expect(out.y).toBe(0)
    expect(out.scale).toBe(1)
    expect(out.rotate).toBe(0)
    expect(out.radius).toBe(0)
  })

  it('t=1 → to (动画终点)', () => {
    const out = lerpCoverStyle(browsingStyle, coverStyle, 1)
    expect(out.x).toBe(200)
    expect(out.y).toBe(100)
    expect(out.scale).toBe(0.25)
    expect(out.rotate).toBe(360)
    expect(out.radius).toBe(8)
  })

  it('t=0.5 → 中点 (线性插值)', () => {
    const out = lerpCoverStyle(browsingStyle, coverStyle, 0.5)
    expect(out.x).toBe(100)
    expect(out.y).toBe(50)
    expect(out.scale).toBe(0.625)
    expect(out.rotate).toBe(180)
    expect(out.radius).toBe(4)
  })

  it('undefined 字段按默认值: x/y/scale/rotate=0, opacity=1, radius=0', () => {
    const sparseFrom: ImageStyleType = { _type: 'browsing', y: 0 }
    const sparseTo: ImageStyleType = { _type: 'cover', y: 0 }
    const out = lerpCoverStyle(sparseFrom, sparseTo, 0.5)
    expect(out.x).toBe(0)
    expect(out.scale).toBe(0)
    expect(out.rotate).toBe(0)
    expect(out.opacity).toBe(1)
    expect(out.radius).toBe(0)
  })

  it('始终返回 _type="cover" 让上层走 cover 渲染分支', () => {
    expect(lerpCoverStyle(browsingStyle, coverStyle, 0.3)._type).toBe('cover')
    expect(lerpCoverStyle(coverStyle, browsingStyle, 0.7)._type).toBe('cover')
  })
})

describe('closingEase (cubic-bezier 求解器)', () => {
  it('与 anim.ts 的 animationCurve 同步 — 单一来源验证', () => {
    // 防止 animationCurve 改了但 closingEase 没跟随的回归
    const ease = makeCubicBezierEase(...animationCurve)
    expect(closingEase(0.25)).toBeCloseTo(ease(0.25), 6)
    expect(closingEase(0.75)).toBeCloseTo(ease(0.75), 6)
  })

  it('边界: t=0 → 0, t=1 → 1', () => {
    expect(closingEase(0)).toBe(0)
    expect(closingEase(1)).toBe(1)
  })

  it('越界 clamp: t<0 → 0, t>1 → 1', () => {
    expect(closingEase(-0.5)).toBe(0)
    expect(closingEase(1.5)).toBe(1)
  })

  it('单调递增 (没有反向)', () => {
    let prev = closingEase(0)
    for (let i = 1; i <= 100; i++) {
      const v = closingEase(i / 100)
      expect(v).toBeGreaterThanOrEqual(prev)
      prev = v
    }
  })

  it('cubic-bezier(0.6, 0, 0.1, 1) 中段加速特征 — t=0.5 时已超过 0.5 (后段慢出)', () => {
    expect(closingEase(0.5)).toBeGreaterThan(0.5)
  })

  it('makeCubicBezierEase 通用性: linear (0,0,1,1) 应该是恒等函数', () => {
    const linear = makeCubicBezierEase(0, 0, 1, 1)
    expect(linear(0.25)).toBeCloseTo(0.25, 4)
    expect(linear(0.5)).toBeCloseTo(0.5, 4)
    expect(linear(0.75)).toBeCloseTo(0.75, 4)
  })
})

describe('selectFlipKind (flipKind 派生 selector)', () => {
  it('animate=false → false', () => {
    expect(selectFlipKind(false)).toBe(false)
  })
  it('animate={flip:false} → false (Browser normalizes animate=false to this object form)', () => {
    expect(selectFlipKind({ flip: false } as unknown as { flip: false })).toBe(false)
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

describe('getSideImageOffset (side image 横向 offset)', () => {
  const viewport = { left: 0, top: 0, width: 1000, height: 800 }

  it("非 swipe 模式: 返回 baseOffset 不变 (fade/crossFade/zoom/none/false/undefined)", () => {
    // 类型签名允许的所有非 swipe 值都应早返回 baseOffset, 文档化"任意 non-swipe 输入安全"契约
    const dims = { w: 500, h: 500 }
    expect(getSideImageOffset({ flipKind: 'crossFade', baseOffset: 30, ownScale: 1, dims, viewport })).toBe(30)
    expect(getSideImageOffset({ flipKind: 'fade',      baseOffset: 0,  ownScale: 1, dims, viewport })).toBe(0)
    expect(getSideImageOffset({ flipKind: 'zoom',      baseOffset: 0,  ownScale: 1, dims, viewport })).toBe(0)
    expect(getSideImageOffset({ flipKind: 'none',      baseOffset: 0,  ownScale: 1, dims, viewport })).toBe(0)
    expect(getSideImageOffset({ flipKind: false,       baseOffset: 0,  ownScale: 1, dims, viewport })).toBe(0)
    expect(getSideImageOffset({ flipKind: undefined,   baseOffset: 0,  ownScale: 1, dims, viewport })).toBe(0)
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
