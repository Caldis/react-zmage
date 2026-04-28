/**
 * 基础渲染测试 — 覆盖 mount/unmount/StrictMode 场景
 */
import React, { StrictMode } from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import Zmage from '../Zmage'
import { resolvePreset } from '../types/default'
import { pageIsCover } from '../components/Browser/Browser.utils'

const SRC = 'https://example.com/test.jpg'

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
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type)!.add(fn)
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
    expect(flipRight).toBeTruthy()
    await act(async () => {
      fireEvent.click(flipRight!)
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
    expect(rotateRight).toBeTruthy()
    await act(async () => {
      for (let i = 0; i < 5; i++) {
        fireEvent.click(rotateRight!)
      }
      await new Promise(r => setTimeout(r, 80))
    })

    expect((document.getElementById('zmageImage') as HTMLImageElement).style.transform).toContain('450deg')

    fireEvent.click(document.getElementById('zmageControlClose')!)
    await wait(80)

    const closingImage = document.getElementById('zmageImage') as HTMLImageElement
    expect(closingImage.style.transform).toContain('360deg')
  })

  it('animate.browsing=false 时打开/关闭不使用过渡, 且关闭立即卸载 portal', async () => {
    render(<Zmage src={SRC} alt="t" caption="instant" animate={{ browsing: false }}/>)
    fireEvent.click(screen.getByAltText('t'))
    await wait(50)

    expect(document.getElementById('zmageImage')?.style.transition).toBe('none')
    expect(document.getElementById('zmageBackground')?.style.transition).toBe('none')
    expect(document.getElementById('zmageControl')?.style.transition).toBe('none')
    expect(document.getElementById('zmageCaption')?.style.transition).toBe('none')

    fireEvent.click(document.getElementById('zmageControlClose')!)
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

    fireEvent.click(document.getElementById('zmageControlFlipRight')!)
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

    fireEvent.click(document.getElementById('zmageControlFlipRight')!)
    await wait(50)

    const centerImage = document.getElementById('zmageImage') as HTMLImageElement
    expect(centerImage.src).toContain('02.jpg')
    expect(centerImage).toBe(nextSideImage)
    expect(document.getElementById('zmageCaption')?.textContent).toBe('second')
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
      expect(centerImage.style.transition).toBe('none')
      expect(firstTransform).toContain('scale3d(1, 1, 1)')

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

  const renderTwoPageSet = (hotKey: any) =>
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
