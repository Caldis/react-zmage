/**
 * 基础渲染测试 — 覆盖 mount/unmount/StrictMode 场景
 */
import React, { StrictMode } from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import Zmage from '../Zmage'
import { resolvePreset } from '../types/default'
import { pageIsCover } from '../components/Browser/Browser.utils'
import type { HotKey } from '../types/global'

const SRC = 'https://example.com/test.jpg'

function clickById (id: string) {
  const el = document.getElementById(id)
  if (!el) throw new Error(`expected #${id} to be in the DOM at this point`)
  fireEvent.click(el)
}

describe('Zmage 基础组件', () => {
  it('封面 img 可被渲染并附加 zoom-in cursor', () => {
    render(<Zmage src={SRC} alt="t"/>)
    const img = screen.getByAltText('t') as HTMLImageElement
    expect(img.tagName).toBe('IMG')
    expect(img.src).toContain('test.jpg')
    expect(img.style.cursor).toBe('zoom-in')
  })

  it('点击封面图后浏览层挂载到 body', () => {
    render(<Zmage src={SRC} alt="t"/>)
    const img = screen.getByAltText('t')
    fireEvent.click(img)
    expect(document.getElementById('zmage')).toBeTruthy()
  })

  it('卸载组件后浏览层 portal 节点被移除', () => {
    const { unmount } = render(<Zmage src={SRC} alt="t"/>)
    fireEvent.click(screen.getByAltText('t'))
    expect(document.getElementById('zmage')).toBeTruthy()
    unmount()
    expect(document.getElementById('zmage')).toBeNull()
  })
})

describe('Zmage StrictMode 双 mount/unmount 不应泄漏副作用', () => {
  let originalAddEventListener: typeof window.addEventListener
  let originalRemoveEventListener: typeof window.removeEventListener
  let listeners: Map<string, Set<EventListenerOrEventListenerObject>>

  beforeEach(() => {
    listeners = new Map()
    originalAddEventListener = window.addEventListener.bind(window)
    originalRemoveEventListener = window.removeEventListener.bind(window)
    window.addEventListener = vi.fn(((type: string, fn: EventListenerOrEventListenerObject) => {
      let bucket = listeners.get(type)
      if (!bucket) {
        bucket = new Set()
        listeners.set(type, bucket)
      }
      bucket.add(fn)
      return originalAddEventListener(type, fn)
    }) as typeof window.addEventListener)
    window.removeEventListener = vi.fn(((type: string, fn: EventListenerOrEventListenerObject) => {
      listeners.get(type)?.delete(fn)
      return originalRemoveEventListener(type, fn)
    }) as typeof window.removeEventListener)
  })

  afterEach(() => {
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
  })

  const countListeners = (type: string) => listeners.get(type)?.size ?? 0

  it('StrictMode 包裹的 Zmage 卸载后, keydown/scroll/mousemove 监听器全部清理', async () => {
    const { unmount } = render(
      <StrictMode>
        <Zmage src={SRC} alt="t" preset="desktop"/>
      </StrictMode>
    )
    // 触发浏览模式以注册各类监听
    fireEvent.click(screen.getByAltText('t'))
    // 等待 init 内部 requestAnimationFrame 完成
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    unmount()
    // 等待 unInit 链路完成 (animationDuration 约 200ms)
    await act(async () => { await new Promise(r => setTimeout(r, 600)) })

    expect(countListeners('keydown')).toBe(0)
    expect(countListeners('scroll')).toBe(0)
    expect(countListeners('mousemove')).toBe(0)
    expect(countListeners('resize')).toBe(0)
  })

  it('mobile preset 下 StrictMode 卸载后 touch 监听器全部清理', async () => {
    const { unmount } = render(
      <StrictMode>
        <Zmage src={SRC} alt="t" preset="mobile"/>
      </StrictMode>
    )
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    unmount()
    await act(async () => { await new Promise(r => setTimeout(r, 600)) })

    expect(countListeners('touchstart')).toBe(0)
    expect(countListeners('touchmove')).toBe(0)
    expect(countListeners('touchend')).toBe(0)
  })
})

describe('pageIsCover (close 动画方向判定)', () => {
  // mock 一个能响应 getAttribute('src') 的 coverRef
  const mkCover = (src: string | null) => ({
    current: src === null ? null : ({
      getAttribute: (k: string) => k === 'src' ? src : null,
    } as unknown as HTMLImageElement),
  }) as React.RefObject<HTMLImageElement>

  const set = [{ src: '/a.jpg' }, { src: '/b.jpg' }, { src: '/c.jpg' }]

  it('cover 与 set[page].src 匹配 → true (返回 cover 位置)', () => {
    expect(pageIsCover(mkCover('/b.jpg'), set, 1)).toBe(true)
  })

  it('cover 与 set[page].src 不匹配 → false (close 走 fly-out)', () => {
    expect(pageIsCover(mkCover('/b.jpg'), set, 0)).toBe(false)
    expect(pageIsCover(mkCover('/b.jpg'), set, 2)).toBe(false)
  })

  it('回归: defaultPage>0 时切到 page 0, 不应被旧 page === 0 短路误判', () => {
    // hero 场景: 用户点了第二张图 (cover.src=/b.jpg), 在 viewer 里翻回第一张
    expect(pageIsCover(mkCover('/b.jpg'), set, 0)).toBe(false)
  })

  it('coverRef 为 null (命令式调用) → false', () => {
    expect(pageIsCover(mkCover(null), set, 0)).toBe(false)
  })
})

describe('resolvePreset (preset=auto 媒体查询解析)', () => {
  const realMatchMedia = window.matchMedia

  afterEach(() => {
    // 复原, 避免污染其它 case
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: realMatchMedia })
  })

  const stubMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((q: string) => ({
        matches,
        media: q,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
        onchange: null,
      })),
    })
  }

  it('显式 desktop / mobile 不走媒体查询', () => {
    stubMatchMedia(true) // 即便 mobile-like, 显式 desktop 仍返回 desktop
    expect(resolvePreset('desktop')).toBe('desktop')
    expect(resolvePreset('mobile')).toBe('mobile')
  })

  it('未传 preset 默认 desktop', () => {
    stubMatchMedia(true)
    expect(resolvePreset(undefined)).toBe('desktop')
  })

  it('auto + (pointer:coarse hover:none) → mobile', () => {
    stubMatchMedia(true)
    expect(resolvePreset('auto')).toBe('mobile')
  })

  it('auto + 非粗指针 → desktop', () => {
    stubMatchMedia(false)
    expect(resolvePreset('auto')).toBe('desktop')
  })

  it('auto + 无 matchMedia (SSR-like) → desktop fallback', () => {
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: undefined })
    expect(resolvePreset('auto')).toBe('desktop')
  })
})

describe('Zmage caption 渲染', () => {
  it('单图模式: 顶层 caption prop 在浏览模式渲染为 #zmageCaption', async () => {
    render(<Zmage src={SRC} alt="t" caption="hello caption"/>)
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    const cap = document.getElementById('zmageCaption')
    expect(cap).toBeTruthy()
    expect(cap?.textContent).toBe('hello caption')
  })

  it('空 caption 不渲染节点', async () => {
    render(<Zmage src={SRC} alt="t"/>)
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    expect(document.getElementById('zmageCaption')).toBeNull()
  })

  it('对象形式 caption: 应用用户传入的 style 与 className', async () => {
    render(
      <Zmage
        src={SRC}
        alt="t"
        caption={{ text: 'styled', style: { color: 'rgb(255, 0, 0)', fontSize: '20px' }, className: 'my-cap' }}
      />
    )
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    const cap = document.getElementById('zmageCaption')
    expect(cap?.textContent).toBe('styled')
    expect(cap?.style.color).toBe('rgb(255, 0, 0)')
    expect(cap?.style.fontSize).toBe('20px')
    expect(cap?.className.includes('my-cap')).toBe(true)
  })

  it('多图模式: 翻页后 caption 跟随当前 set[page].caption 切换', async () => {
    render(
      <Zmage
        src={SRC}
        alt="t"
        set={[
          { src: SRC, alt: 'p1', caption: 'first' },
          { src: SRC, alt: 'p2', caption: 'second' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
    // 触发右翻按钮 (DOM 事件比 window keydown 在 JSDOM 下更可靠)
    const flipRight = document.getElementById('zmageControlFlipRight')
    if (!flipRight) throw new Error('expected #zmageControlFlipRight in DOM')
    await act(async () => {
      fireEvent.click(flipRight)
      await new Promise(r => setTimeout(r, 50))
    })
    expect(document.getElementById('zmageCaption')?.textContent).toBe('second')
  })
})

describe('Zmage 动画行为', () => {
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  it('关闭时按最小角度恢复旋转, 不按累计点击次数反转', async () => {
    render(<Zmage src={SRC} alt="t"/>)
    fireEvent.click(screen.getByAltText('t'))
    await wait(50)

    const rotateRight = document.getElementById('zmageControlRotateRight')
    if (!rotateRight) throw new Error('expected #zmageControlRotateRight in DOM')
    await act(async () => {
      for (let i = 0; i < 5; i++) {
        fireEvent.click(rotateRight)
      }
      await new Promise(r => setTimeout(r, 80))
    })

    expect((document.getElementById('zmageImage') as HTMLImageElement).style.transform).toContain('450deg')

    clickById('zmageControlClose')
    // closing-follow RAF 用 lerp 从 currentStyle.rotate=450 推进到 closingRotate=360.
    // wait 80ms 时 RAF 跑了几帧, rotate 应已朝 360 收敛 — 数值落在 [360, 450].
    // 不能等到 portal 卸载 (340ms 后 mounted=false), 也不依赖具体某帧字符串 (RAF 时序不稳).
    await wait(80)

    const closingImage = document.getElementById('zmageImage') as HTMLImageElement
    const m = closingImage.style.transform.match(/rotate3d\(0,\s*0,\s*1,\s*([-\d.]+)deg\)/)
    expect(m).not.toBeNull()
    const rotateValue = Number(m![1])
    // 关键回归: closingRotate = round(450/360)*360 = 360, 朝 360 走 (90deg 短路径), 不会反向 450 度回 0.
    // 任何中间帧 rotate ∈ [360, 450]; 修复前 (transition + React state=360) 与修复后 (RAF lerp) 都满足.
    expect(rotateValue).toBeGreaterThanOrEqual(360)
    expect(rotateValue).toBeLessThanOrEqual(450)
  })

  it('animate.browsing=false 时打开/关闭不使用过渡, 且关闭立即卸载 portal', async () => {
    render(<Zmage src={SRC} alt="t" caption="instant" animate={{ browsing: false }}/>)
    fireEvent.click(screen.getByAltText('t'))
    await wait(50)

    expect(document.getElementById('zmageImage')?.style.transition).toBe('none')
    expect(document.getElementById('zmageBackground')?.style.transition).toBe('none')
    expect(document.getElementById('zmageControl')?.style.transition).toBe('none')
    expect(document.getElementById('zmageCaption')?.style.transition).toBe('none')

    clickById('zmageControlClose')
    await wait(0)
    expect(document.getElementById('zmage')).toBeNull()
  })

  it('animate=false 同时禁用打开和翻页图片过渡', async () => {
    render(
      <Zmage
        src="https://example.com/a.jpg"
        alt="cover"
        animate={false}
        set={[
          { src: 'https://example.com/a.jpg', alt: 'a' },
          { src: 'https://example.com/b.jpg', alt: 'b' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('cover'))
    await wait(50)

    clickById('zmageControlFlipRight')
    await wait(50)

    const centerImage = document.getElementById('zmageImage') as HTMLImageElement
    expect(centerImage.src).toContain('b.jpg')
    expect(centerImage.style.transition).toBe('none')
  })

  it('flip 动画复用左右边图节点, 让新旧页面可以执行 transition', async () => {
    render(
      <Zmage
        src="https://example.com/01.jpg"
        alt="cover"
        preset="desktop"
        animate={{ flip: 'swipe' }}
        set={[
          { src: 'https://example.com/01.jpg', alt: 'p1', caption: 'first' },
          { src: 'https://example.com/02.jpg', alt: 'p2', caption: 'second' },
          { src: 'https://example.com/03.jpg', alt: 'p3', caption: 'third' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('cover'))
    await wait(50)

    const nextSideImage = Array
      .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
      .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg') && img.style.transform.includes('10px'))

    expect(nextSideImage).toBeTruthy()

    clickById('zmageControlFlipRight')
    await wait(50)

    const centerImage = document.getElementById('zmageImage') as HTMLImageElement
    expect(centerImage.src).toContain('02.jpg')
    expect(centerImage).toBe(nextSideImage)
    expect(document.getElementById('zmageCaption')?.textContent).toBe('second')
  })

  it('Space 触发 zoom 时直接放大到当前鼠标位置', async () => {
    const originalNaturalWidth = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const originalNaturalHeight = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')

    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 2000 })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(<Zmage src={SRC} alt="keyboard-zoom"/>)
      fireEvent.click(screen.getByAltText('keyboard-zoom'))
      await wait(50)

      await act(async () => {
        fireEvent.mouseMove(document.body, { clientX: 900, clientY: 700 })
        window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', keyCode: 32 } as KeyboardEventInit))
        await new Promise(r => setTimeout(r, 80))
      })

      const centerImage = document.getElementById('zmageImage') as HTMLImageElement
      expect(centerImage.style.transition).toContain('transform 350ms')
      expect(centerImage.style.transform).toContain('translate3d(-440px, -112.5px, 0px)')
    } finally {
      if (originalNaturalWidth) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', originalNaturalWidth)
      if (originalNaturalHeight) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', originalNaturalHeight)
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })

  it('控制按钮触发 zoom 时保留中心放大过渡', async () => {
    const originalNaturalWidth = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const originalNaturalHeight = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')

    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 2000 })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(<Zmage src={SRC} alt="control-zoom"/>)
      fireEvent.click(screen.getByAltText('control-zoom'))
      await wait(50)

      clickById('zmageControlZoom')
      await wait(80)

      const centerImage = document.getElementById('zmageImage') as HTMLImageElement
      expect(centerImage.style.transition).toContain('transform 350ms')
      expect(centerImage.style.transform).toContain('translate3d(0px, 0px, 0px)')
    } finally {
      if (originalNaturalWidth) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', originalNaturalWidth)
      if (originalNaturalHeight) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', originalNaturalHeight)
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })

  it('zoom 鼠标跟随使用 RAF 插值, 不用 CSS transition 追鼠标', async () => {
    const originalNaturalWidth = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const originalNaturalHeight = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')

    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 2000 })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(<Zmage src={SRC} alt="zoom-target"/>)
      fireEvent.click(screen.getByAltText('zoom-target'))
      await wait(50)

      await act(async () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', keyCode: 32 } as KeyboardEventInit))
        await new Promise(r => setTimeout(r, 80))
      })

      await act(async () => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 900, clientY: 700 }))
        await new Promise(r => setTimeout(r, 20))
      })

      const centerImage = document.getElementById('zmageImage') as HTMLImageElement
      const firstTransform = centerImage.style.transform
      expect(centerImage.style.transition).toContain('transform 350ms')
      expect(firstTransform).toContain('scale3d(1, 1, 1)')

      await act(async () => {
        await new Promise(r => setTimeout(r, 320))
      })

      expect(centerImage.style.transition).toBe('none')
      expect(centerImage.style.transform).not.toBe(firstTransform)

      await act(async () => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }))
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 500, clientY: 400 }))
        await new Promise(r => setTimeout(r, 20))
      })

      expect(centerImage.style.transition).toBe('none')
      expect(centerImage.style.transform).not.toBe(firstTransform)
    } finally {
      if (originalNaturalWidth) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', originalNaturalWidth)
      if (originalNaturalHeight) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', originalNaturalHeight)
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })
})

describe('Zmage hotKey 翻页 (umbrella + 单边)', () => {
  // 工具: 直接向 window 派发 keydown (lib 的监听器挂在 window 上, 用 e.keyCode 判断)
  const dispatchArrow = async (which: 'left' | 'right') => {
    await act(async () => {
      const keyCode = which === 'left' ? 37 : 39
      const key = which === 'left' ? 'ArrowLeft' : 'ArrowRight'
      window.dispatchEvent(new KeyboardEvent('keydown', { key, keyCode } as KeyboardEventInit))
      await new Promise(r => setTimeout(r, 50))
    })
  }

  const renderTwoPageSet = (hotKey: boolean | HotKey) =>
    render(
      <Zmage
        src={SRC}
        alt="t"
        preset="desktop"
        hotKey={hotKey}
        set={[
          { src: SRC, alt: 'p1', caption: 'first' },
          { src: SRC, alt: 'p2', caption: 'second' },
        ]}
      />
    )

  it('hotKey={{ flip: true }} → ← 与 → 都翻页 (legacy 行为保留)', async () => {
    renderTwoPageSet({ flip: true })
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
    // → 翻到 second
    await dispatchArrow('right')
    expect(document.getElementById('zmageCaption')?.textContent).toBe('second')
    // ← 翻回 first
    await dispatchArrow('left')
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
  })

  it('hotKey={{ flip: false, flipLeft: true, flipRight: false }} → 仅 ← 生效', async () => {
    // 注: desktop preset 默认带 flip: true (umbrella), 用户必须显式 flip: false
    // 才能测试单边语义 — 否则 umbrella 强制覆盖两侧.
    renderTwoPageSet({ flip: false, flipLeft: true, flipRight: false })
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
    // → 不应翻页 (flipRight=false 且 umbrella flip=false)
    await dispatchArrow('right')
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
    // ← 翻到 second (loop=true 默认 → wrap to last)
    await dispatchArrow('left')
    expect(document.getElementById('zmageCaption')?.textContent).toBe('second')
  })

  it('hotKey={{ flip: false, flipLeft: false, flipRight: true }} → 仅 → 生效', async () => {
    renderTwoPageSet({ flip: false, flipLeft: false, flipRight: true })
    fireEvent.click(screen.getByAltText('t'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
    // ← 不应翻页
    await dispatchArrow('left')
    expect(document.getElementById('zmageCaption')?.textContent).toBe('first')
    // → 翻到 second
    await dispatchArrow('right')
    expect(document.getElementById('zmageCaption')?.textContent).toBe('second')
  })
})

describe('Zmage onError 透传 (#148)', () => {
  it('cover 图加载失败触发用户传入的 onError', () => {
    const onError = vi.fn()
    render(<Zmage src={SRC} alt="cover-err" onError={onError}/>)
    const cover = screen.getByAltText('cover-err') as HTMLImageElement
    fireEvent.error(cover)
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('浏览态图片加载失败触发用户传入的 onError', async () => {
    const onError = vi.fn()
    render(<Zmage src={SRC} alt="viewer-err" onError={onError}/>)
    fireEvent.click(screen.getByAltText('viewer-err'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    const centerImage = document.getElementById('zmageImage') as HTMLImageElement
    expect(centerImage).toBeTruthy()
    // 触发浏览层中心图的 error (cover 已加载, 不会再触发, 仅计中心图)
    const before = onError.mock.calls.length
    fireEvent.error(centerImage)
    expect(onError.mock.calls.length).toBe(before + 1)
  })
})

describe('Zmage closeOnDoubleClick (#195)', () => {
  it('closeOnDoubleClick=true 时, 双击中心图关闭浏览层', async () => {
    render(<Zmage src={SRC} alt="dbl" closeOnDoubleClick/>)
    fireEvent.click(screen.getByAltText('dbl'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    expect(document.getElementById('zmage')).toBeTruthy()
    const centerImage = document.getElementById('zmageImage') as HTMLImageElement
    fireEvent.doubleClick(centerImage)
    // 等待 outBrowsing 的卸载链路
    await act(async () => { await new Promise(r => setTimeout(r, 600)) })
    expect(document.getElementById('zmage')).toBeNull()
  })

  it('默认未启用时, 双击中心图不关闭浏览层', async () => {
    render(<Zmage src={SRC} alt="no-dbl"/>)
    fireEvent.click(screen.getByAltText('no-dbl'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    const centerImage = document.getElementById('zmageImage') as HTMLImageElement
    fireEvent.doubleClick(centerImage)
    await act(async () => { await new Promise(r => setTimeout(r, 100)) })
    expect(document.getElementById('zmage')).toBeTruthy()
  })
})

describe('Zmage ESC 与外层 modal/dialog 隔离 (#184)', () => {
  // 模拟挂在 window bubble 阶段的外层 modal keydown 监听器 (类似 react-modal / radix 等常见做法)
  const installOuterListener = () => {
    const onOuterKey = vi.fn()
    window.addEventListener('keydown', onOuterKey)
    return {
      onOuterKey,
      uninstall: () => window.removeEventListener('keydown', onOuterKey),
    }
  }

  const dispatchEsc = async () => {
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 } as KeyboardEventInit))
      await new Promise(r => setTimeout(r, 50))
    })
  }

  it('hotKey.close 开 (默认) 时, ESC 关闭 zmage 且外层 keydown 监听不被触发', async () => {
    const { onOuterKey, uninstall } = installOuterListener()
    try {
      render(<Zmage src={SRC} alt="esc-modal" preset="desktop"/>)
      fireEvent.click(screen.getByAltText('esc-modal'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })
      expect(document.getElementById('zmage')).toBeTruthy()

      // 确认 zmage 监听器已挂载之后再派发 — 派发的事件应被 zmage capture 吃掉, 不冒泡到外层
      onOuterKey.mockClear()
      await dispatchEsc()

      // zmage 关闭走动画再卸载
      await act(async () => { await new Promise(r => setTimeout(r, 600)) })
      expect(document.getElementById('zmage')).toBeNull()
      expect(onOuterKey).not.toHaveBeenCalled()
    } finally {
      uninstall()
    }
  })

  it('hotKey.close=false 时, ESC 不关 zmage 也不阻断外层监听', async () => {
    const { onOuterKey, uninstall } = installOuterListener()
    try {
      render(<Zmage src={SRC} alt="esc-passthrough" preset="desktop" hotKey={{ close: false, zoom: true, flip: true }}/>)
      fireEvent.click(screen.getByAltText('esc-passthrough'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })
      expect(document.getElementById('zmage')).toBeTruthy()

      onOuterKey.mockClear()
      await dispatchEsc()

      // zmage 仍开
      expect(document.getElementById('zmage')).toBeTruthy()
      // 外层 modal 收到 ESC (用户期望由其处理)
      expect(onOuterKey).toHaveBeenCalledTimes(1)
    } finally {
      uninstall()
    }
  })
})

describe('Zmage 命令式调用', () => {
  it('Zmage.browsing 返回 destructor 函数; 调用后 portal 节点移除', async () => {
    const destroy = Zmage.browsing({ src: SRC, alt: 't' })
    // 等待 inBrowsing 的 requestAnimationFrame
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })
    expect(document.getElementById('zmagePortal')).toBeTruthy()

    expect(typeof destroy).toBe('function')
    destroy?.()
    // 等待 outBrowsing 的 setTimeout 销毁
    await act(async () => { await new Promise(r => setTimeout(r, 600)) })
    expect(document.getElementById('zmagePortal')).toBeNull()
  })
})

/**
 * 关闭路径 cover 实时追踪 (RAF) — 核心回归
 *
 * 修复前: 关闭瞬间 getCoverStyle 把 cover 视口坐标 snapshot 进 transform,
 *         350ms transition 内不再重算 → 用户滚动时大图飞向旧位置,"慢半拍".
 * 修复后: 关闭路径走 RAF, 每帧重新 getBoundingClientRect 拿 cover 当前视口位置,
 *         直接命令式 setNodeTransform — 滚动时大图 1 帧内追上 cover.
 */
describe('关闭路径 cover 实时追踪 (RAF)', () => {
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  // 解析 transform 字符串里第二段 translate3d 的 y (RAF/render 写出的 cover 偏移)
  // 形如: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(...)`
  const parseTransformY = (transform: string): number | null => {
    const matches = transform.match(/translate3d\([^)]+\)/g)
    if (!matches || matches.length < 2) return null
    const m = matches[1].match(/-?[\d.]+px,\s*(-?[\d.]+)px/)
    return m ? Number(m[1]) : null
  }

  // 给 cover img 装一个由外部 closure 控制的可变 BCR — 中途改 box 即可模拟滚动
  const installMutableCoverBCR = (cover: HTMLImageElement) => {
    const box = { left: 0, top: 0, width: 100, height: 100 }
    cover.getBoundingClientRect = () => ({
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
      right: box.left + box.width,
      bottom: box.top + box.height,
      x: box.left,
      y: box.top,
      toJSON: () => ({}),
    } as DOMRect)
    return box
  }

  it('关闭过程中 cover 视口位置变化 → 大图 transform 跟随更新 (修复前会保留旧 snapshot)', async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(<Zmage src={SRC} alt="track-cover" preset="desktop"/>)
      const cover = screen.getByAltText('track-cover') as HTMLImageElement
      const coverBox = installMutableCoverBCR(cover)

      // 起始 cover 在 viewport 顶部
      coverBox.top = 100

      fireEvent.click(cover)
      await wait(60) // init RAF + first updateStyle

      const center = document.getElementById('zmageImage') as HTMLImageElement
      expect(center).toBeTruthy()

      // 触发关闭 — 走 startClosingFollow 路径
      clickById('zmageControlClose')
      await wait(30) // 让 RAF 跑出一两帧的 inline transform

      // closing-follow 期间 transition 必须是 none, 让 RAF 的 setNodeTransform 直接生效
      expect(center.style.transition).toBe('none')
      const y1 = parseTransformY(center.style.transform)
      expect(y1).not.toBeNull()

      // 模拟用户在关闭动画中途滚动了 500px (cover 视口位置随之改变)
      coverBox.top = 600

      // 再等几帧 — RAF 应该读到新的 BCR 并把 transform 重写到追赶位置
      await wait(40)
      const y2 = parseTransformY(center.style.transform)
      expect(y2).not.toBeNull()

      // 修复前: y2 == y1 完全相同 (target 是 setState 时 snapshot 的, 不会跟 cover 变化).
      // 修复后: 任何非零差距都证明 RAF 在每帧重读 BCR. 不断言量级 — cubic-bezier(0.6,0,0.1,1)
      // 起步极慢 (jsdom 下 RAF tick ≤ 几帧时 eased 还在 0.05 以下), 量级波动太大测不稳.
      // "y2 != y1" 已经能区分 fix vs regression: 修复前两个值会精确相等.
      expect(y2).not.toBe(y1)
    } finally {
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })

  it('动画结束后 inline transition/transform 让位给 React state — RAF 已退场', async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(<Zmage src={SRC} alt="raf-handoff" preset="desktop"/>)
      const cover = screen.getByAltText('raf-handoff') as HTMLImageElement
      installMutableCoverBCR(cover)

      fireEvent.click(cover)
      await wait(60)

      clickById('zmageControlClose')
      // 等比 closeDelay (340ms) 长一些, 确保 RAF 跑完且 React state 同步、portal 卸载
      await wait(500)
      // portal 应已卸载, 标志整条关闭链路 (RAF + setTimeout finalize) 都干净退场
      expect(document.getElementById('zmage')).toBeNull()
    } finally {
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })

  it('animate.browsing=false 时不走 RAF — 关闭立即落 transition=none 并卸载', async () => {
    // 防回归: instant 路径必须保留 (走 updateCurrentImageStyleWithoutBrowsingTransition, 不进入 startClosingFollow)
    render(<Zmage src={SRC} alt="instant-close" animate={{ browsing: false }}/>)
    fireEvent.click(screen.getByAltText('instant-close'))
    await wait(50)

    expect(document.getElementById('zmageImage')?.style.transition).toBe('none')

    clickById('zmageControlClose')
    await wait(0)
    // 立即卸载 (closeDelay=0), 不存在 RAF 残留
    expect(document.getElementById('zmage')).toBeNull()
  })

  it('快速重新打开 — closing 动画中途切回 open 不会让 portal 卸载 (RAF 被取消)', async () => {
    // 防回归: 修复前 closing-follow RAF 持续写 inline transform, 与 open 动画的 React render 抢同一个 inline.transform.
    // 主要保护点是: 重开后 portal 仍存活, 中心图节点存在 — 没有崩溃 / 没被 unmount 链路误清.
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      const { rerender } = render(<RzControlled alt="reopen" browsing={false}/>)
      rerender(<RzControlled alt="reopen" browsing={true}/>)
      await wait(60)
      // 关闭 (closing RAF 启动)
      rerender(<RzControlled alt="reopen" browsing={false}/>)
      await wait(20)
      // 关闭动画刚跑了一两帧就立刻重开
      rerender(<RzControlled alt="reopen" browsing={true}/>)
      await wait(80)

      // portal + 中心图都还在 — 说明重开链路没被 closing RAF 残余打断
      expect(document.getElementById('zmage')).toBeTruthy()
      expect(document.getElementById('zmageImage')).toBeTruthy()

      // 再等一段时间, 期间不应有任何卸载 (closing 那个 setTimeout finalize 应该被新 init 接管掉)
      await wait(500)
      expect(document.getElementById('zmage')).toBeTruthy()
    } finally {
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
      if (originalClientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight)
    }
  })
})

// 受控组件帮手 — 用于"快速重开"测试, 通过 props.browsing 切换浏览状态而不依赖 click
function RzControlled (props: { alt: string, browsing: boolean }) {
  const [_, setLocal] = React.useState(props.browsing)
  React.useEffect(() => { setLocal(props.browsing) }, [props.browsing])
  return (
    <Zmage
      src={SRC}
      alt={props.alt}
      preset="desktop"
      browsing={props.browsing}
      onBrowsing={setLocal}
    />
  )
}
