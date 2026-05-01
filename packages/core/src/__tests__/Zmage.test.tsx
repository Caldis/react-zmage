/**
 * 基础渲染测试 — 覆盖 mount/unmount/StrictMode 场景
 */
import React, { StrictMode } from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import Zmage from '../Zmage'
import { defPropsWithEnv, resolvePreset } from '../types/default'
import { pageIsCover } from '../components/Browser/Browser.utils'
import type { ControllerSet, GestureSet, HotKey } from '../types/global'

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

describe('Zmage Wrapper', () => {
  const A = 'https://example.com/wrapper-a.jpg'
  const B = 'https://example.com/wrapper-b.jpg'

  afterEach(async () => {
    const close = document.getElementById('zmageControlClose')
    if (close) {
      fireEvent.click(close)
      await act(async () => { await new Promise(r => setTimeout(r, 600)) })
    }
    document.getElementById('zmagePortal')?.remove()
  })

  it('显式 set 时按被点击 img 定位初始页', async () => {
    render(
      <Zmage.Wrapper
        set={[
          { src: A, alt: 'viewer-a' },
          { src: B, alt: 'viewer-b' },
        ]}
      >
        <article>
          <img src={A} alt="cover-a" />
          <img src={B} alt="cover-b" />
        </article>
      </Zmage.Wrapper>
    )

    fireEvent.click(screen.getByAltText('cover-b'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    const img = document.getElementById('zmageImage') as HTMLImageElement
    expect(img.src).toContain('wrapper-b.jpg')
    expect(img.alt).toBe('viewer-b')
  })

  it('未传 set 时从临近 figcaption 读取 caption', async () => {
    render(
      <Zmage.Wrapper>
        <article>
          <figure>
            <img src={A} alt="cover-a" />
            <figcaption>Caption from rich text</figcaption>
          </figure>
        </article>
      </Zmage.Wrapper>
    )

    fireEvent.click(screen.getByAltText('cover-a'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    expect(document.getElementById('zmageCaption')?.textContent).toBe('Caption from rich text')
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
    expect(countListeners('touchcancel')).toBe(0)
  })
})

describe('Zmage desktop wheel zoom Phase 3', () => {
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  const prepareViewerImage = () => {
    const image = document.getElementById('zmageImage') as HTMLImageElement | null
    if (!image) throw new Error('expected #zmageImage to be mounted')
    Object.defineProperty(image, 'naturalWidth', { value: 2000, configurable: true })
    Object.defineProperty(image, 'naturalHeight', { value: 1200, configurable: true })
    fireEvent.load(image)
    return image
  }

  const getImageScale = () => {
    const image = document.getElementById('zmageImage') as HTMLImageElement | null
    if (!image) throw new Error('expected #zmageImage to be mounted')
    const match = image.style.transform.match(/scale3d\((-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?), 1\)/)
    if (!match) throw new Error(`unexpected transform: ${image.style.transform}`)
    return Number(match[1])
  }

  const openAndZoomDesktop = async (props: React.ComponentProps<typeof Zmage> = {}) => {
    const result = render(
      <Zmage
        src="https://example.com/wheel-a.jpg"
        alt="wheel-zoom"
        preset="desktop"
        {...props}
      />
    )
    fireEvent.click(screen.getByAltText('wheel-zoom'))
    await wait(50)
    prepareViewerImage()
    fireEvent.keyDown(window, { code: 'Space' })
    await wait(420)
    return result
  }

  const dispatchWheel = (deltaY: number, point = { x: 700, y: 400 }) => {
    const event = new WheelEvent('wheel', {
      deltaY,
      deltaMode: 0,
      clientX: point.x,
      clientY: point.y,
      bubbles: true,
      cancelable: true,
    })
    window.dispatchEvent(event)
    return event
  }

  const withWindowListenerCapture = () => {
    const originalAdd = window.addEventListener.bind(window)
    const originalRemove = window.removeEventListener.bind(window)
    const listeners = new Map<string, Set<EventListenerOrEventListenerObject>>()
    const options = new Map<string, unknown[]>()

    window.addEventListener = vi.fn(((type: string, listener: EventListenerOrEventListenerObject, listenerOptions?: unknown) => {
      let bucket = listeners.get(type)
      if (!bucket) {
        bucket = new Set()
        listeners.set(type, bucket)
      }
      bucket.add(listener)
      let optionList = options.get(type)
      if (!optionList) {
        optionList = []
        options.set(type, optionList)
      }
      optionList.push(listenerOptions)
      return originalAdd(type, listener, listenerOptions as AddEventListenerOptions)
    }) as typeof window.addEventListener)
    window.removeEventListener = vi.fn(((type: string, listener: EventListenerOrEventListenerObject, listenerOptions?: unknown) => {
      listeners.get(type)?.delete(listener)
      return originalRemove(type, listener, listenerOptions as EventListenerOptions)
    }) as typeof window.removeEventListener)

    return {
      count: (type: string) => listeners.get(type)?.size ?? 0,
      options: (type: string) => options.get(type) ?? [],
      restore: () => {
        window.addEventListener = originalAdd
        window.removeEventListener = originalRemove
      },
    }
  }

  it('desktop preset 只在进入 zoom 后注册 passive:false wheel listener, 退出 zoom 后清理', async () => {
    const capture = withWindowListenerCapture()
    try {
      const { unmount } = render(<Zmage src="https://example.com/wheel-a.jpg" alt="wheel-zoom" preset="desktop"/>)
      fireEvent.click(screen.getByAltText('wheel-zoom'))
      await wait(50)
      prepareViewerImage()
      expect(capture.count('wheel')).toBe(0)

      fireEvent.keyDown(window, { code: 'Space' })
      await wait(50)
      expect(capture.count('wheel')).toBe(1)
      expect(capture.options('wheel')).toContainEqual({ passive: false })

      fireEvent.keyDown(window, { code: 'Space' })
      await wait(50)
      expect(capture.count('wheel')).toBe(0)

      unmount()
      await wait(600)
      expect(capture.count('wheel')).toBe(0)
    } finally {
      capture.restore()
    }
  })

  it('gesture.wheelZoom=false 时即使进入 zoom 也不注册 wheel listener', async () => {
    const capture = withWindowListenerCapture()
    try {
      const { unmount } = await openAndZoomDesktop({ gesture: { wheelZoom: false } })
      expect(capture.count('wheel')).toBe(0)
      unmount()
      await wait(600)
    } finally {
      capture.restore()
    }
  })

  it('browsing 态 wheel 不阻止默认滚动行为', async () => {
    render(<Zmage src="https://example.com/wheel-a.jpg" alt="wheel-zoom" preset="desktop"/>)
    fireEvent.click(screen.getByAltText('wheel-zoom'))
    await wait(50)

    const event = dispatchWheel(-100)

    expect(event.defaultPrevented).toBe(false)
  })

  it('zoom 态 wheel 阻止默认滚动, 放大后 mousemove 不把 scale 拉回 1', async () => {
    await openAndZoomDesktop({ gesture: { wheelZoom: { smooth: false } } })

    let event!: WheelEvent
    await act(async () => {
      event = dispatchWheel(-100)
    })
    expect(event.defaultPrevented).toBe(true)
    await wait(50)
    const scaleAfterWheel = getImageScale()
    expect(scaleAfterWheel).toBeGreaterThan(1.05)

    fireEvent.mouseMove(window, { clientX: 100, clientY: 400 })
    await wait(420)

    expect(getImageScale()).toBeGreaterThan(1.05)
  })

  it('wheel 缩小到 minScale 时立即退出 zoom, 并在默认保护时间内拦截残留 wheel', async () => {
    const onZooming = vi.fn()
    await openAndZoomDesktop({
      onZooming,
      gesture: { wheelZoom: { smooth: false, minScale: 1 } },
    })
    onZooming.mockClear()

    await act(async () => {
      dispatchWheel(100)
    })
    await wait(50)

    expect(onZooming).toHaveBeenCalledWith(false)

    let guardedEvent!: WheelEvent
    await act(async () => {
      guardedEvent = dispatchWheel(100)
    })

    expect(guardedEvent.defaultPrevented).toBe(true)
  })

  it('gesture.wheelZoom.exitGuardDuration 控制 wheel 退出 zoom 后的保护时间', async () => {
    const onZooming = vi.fn()
    await openAndZoomDesktop({
      onZooming,
      gesture: { wheelZoom: { smooth: false, minScale: 1, exitGuardDuration: 50 } },
    })

    await act(async () => {
      dispatchWheel(100)
    })
    await wait(60)

    let afterGuardEvent!: WheelEvent
    await act(async () => {
      afterGuardEvent = dispatchWheel(100)
    })

    expect(onZooming).toHaveBeenCalledWith(false)
    expect(afterGuardEvent.defaultPrevented).toBe(false)
  })

  it('gesture.wheelZoom.reverse=true 时反转滚轮缩放方向', async () => {
    await openAndZoomDesktop({
      gesture: { wheelZoom: { smooth: false, minScale: 1, reverse: true } },
    })

    await act(async () => {
      dispatchWheel(100)
    })
    await wait(50)

    expect(getImageScale()).toBeGreaterThan(1.05)
  })
})

describe('Zmage mobile gesture Phase 1', () => {
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  const buildTouchEvent = (
    type: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
    point: { x: number, y: number } | Array<{ x: number, y: number }>,
    activePoint?: { x: number, y: number } | Array<{ x: number, y: number }>,
  ) => {
    const event = new Event(type, { bubbles: true, cancelable: true }) as TouchEvent
    const changedTouches = (Array.isArray(point) ? point : [point]).map(p => ({ clientX: p.x, clientY: p.y }))
    const activeSource = activePoint === undefined ? point : activePoint
    const activeTouches = (Array.isArray(activeSource) ? activeSource : [activeSource]).map(p => ({ clientX: p.x, clientY: p.y }))
    Object.defineProperty(event, 'touches', {
      configurable: true,
      value: type === 'touchcancel' || (type === 'touchend' && activePoint === undefined) ? [] : activeTouches,
    })
    Object.defineProperty(event, 'changedTouches', {
      configurable: true,
      value: changedTouches,
    })
    return event
  }

  const dispatchTouch = (
    type: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
    point: { x: number, y: number } | Array<{ x: number, y: number }>,
    activePoint?: { x: number, y: number } | Array<{ x: number, y: number }>,
  ) => {
    const event = buildTouchEvent(type, point, activePoint)
    window.dispatchEvent(event)
    return event
  }

  const getImageTranslateY = () => {
    const image = document.getElementById('zmageImage') as HTMLImageElement | null
    if (!image) throw new Error('expected #zmageImage to be mounted')
    const match = image.style.transform.match(/translate3d\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px, 0px\) scale3d/)
    if (!match) throw new Error(`unexpected transform: ${image.style.transform}`)
    return Number(match[2])
  }

  const getImageTranslate = () => {
    const image = document.getElementById('zmageImage') as HTMLImageElement | null
    if (!image) throw new Error('expected #zmageImage to be mounted')
    const match = image.style.transform.match(/translate3d\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px, 0px\) scale3d/)
    if (!match) throw new Error(`unexpected transform: ${image.style.transform}`)
    return { x: Number(match[1]), y: Number(match[2]) }
  }

  const getImageScale = () => {
    const image = document.getElementById('zmageImage') as HTMLImageElement | null
    if (!image) throw new Error('expected #zmageImage to be mounted')
    return getElementScale(image)
  }

  const getElementScale = (image: HTMLImageElement) => {
    const match = image.style.transform.match(/scale3d\((-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?), 1\)/)
    if (!match) throw new Error(`unexpected transform: ${image.style.transform}`)
    return Number(match[1])
  }

  const getSideImages = () => (
    Array.from(document.querySelectorAll('#zmage img'))
      .filter((image): image is HTMLImageElement => image instanceof HTMLImageElement && image.id !== 'zmageImage')
  )

  const prepareViewerImage = () => {
    const image = document.getElementById('zmageImage') as HTMLImageElement | null
    const viewport = document.getElementById('zmageViewport') as HTMLElement | null
    if (!image) throw new Error('expected #zmageImage to be mounted')
    if (!viewport) throw new Error('expected #zmageViewport to be mounted')
    viewport.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 1000,
      height: 800,
      right: 1000,
      bottom: 800,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)
    Object.defineProperty(image, 'naturalWidth', { value: 2000, configurable: true })
    Object.defineProperty(image, 'naturalHeight', { value: 1000, configurable: true })
    fireEvent.load(image)
    return image
  }

  const renderMobileSet = (props: {
    gesture?: boolean | GestureSet,
    loop?: boolean,
    onBrowsing?: (v: boolean) => void,
    onSwitching?: (page: number) => void,
    onZooming?: (v: boolean) => void,
  } = {}) =>
    render(
      <Zmage
        src="https://example.com/mobile-a.jpg"
        alt="mobile-gesture"
        preset="mobile"
        gesture={props.gesture}
        loop={props.loop}
        onBrowsing={props.onBrowsing}
        onSwitching={props.onSwitching}
        onZooming={props.onZooming}
        set={[
          { src: 'https://example.com/mobile-a.jpg', alt: 'a', caption: 'first' },
          { src: 'https://example.com/mobile-b.jpg', alt: 'b', caption: 'second' },
        ]}
      />
    )

  it('mobile preset 注册 touchmove 时使用 passive:false, 卸载后清理监听', async () => {
    const originalAdd = window.addEventListener.bind(window)
    const originalRemove = window.removeEventListener.bind(window)
    const touchMoveOptions: unknown[] = []
    const listeners = new Map<string, Set<EventListenerOrEventListenerObject>>()

    window.addEventListener = vi.fn(((type: string, listener: EventListenerOrEventListenerObject, options?: unknown) => {
      if (type === 'touchmove') touchMoveOptions.push(options)
      let bucket = listeners.get(type)
      if (!bucket) {
        bucket = new Set()
        listeners.set(type, bucket)
      }
      bucket.add(listener)
      return originalAdd(type, listener, options as AddEventListenerOptions)
    }) as typeof window.addEventListener)
    window.removeEventListener = vi.fn(((type: string, listener: EventListenerOrEventListenerObject, options?: unknown) => {
      listeners.get(type)?.delete(listener)
      return originalRemove(type, listener, options as EventListenerOptions)
    }) as typeof window.removeEventListener)

    try {
      const { unmount } = renderMobileSet()
      fireEvent.click(screen.getByAltText('mobile-gesture'))
      await wait(50)

      expect(touchMoveOptions).toContainEqual({ passive: false })
      expect(listeners.get('touchcancel')?.size ?? 0).toBe(1)

      unmount()
      await wait(600)
      expect(listeners.get('touchstart')?.size ?? 0).toBe(0)
      expect(listeners.get('touchmove')?.size ?? 0).toBe(0)
      expect(listeners.get('touchend')?.size ?? 0).toBe(0)
      expect(listeners.get('touchcancel')?.size ?? 0).toBe(0)
    } finally {
      window.addEventListener = originalAdd
      window.removeEventListener = originalRemove
    }
  })

  it('mobile preset 默认把 viewer touch-action 管理为 none', async () => {
    renderMobileSet()
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    expect(document.getElementById('zmageViewport')?.style.touchAction).toBe('none')
  })

  it('pinchZoom=false 且 doubleTapZoom 保持开启时 touch-action 为 manipulation', async () => {
    renderMobileSet({ gesture: { pinchZoom: false } })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    expect(document.getElementById('zmageViewport')?.style.touchAction).toBe('manipulation')
  })

  it('gesture=false 时 touch-action 回到 auto', async () => {
    renderMobileSet({ gesture: false })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    expect(document.getElementById('zmageViewport')?.style.touchAction).toBe('auto')
  })

  it('gesture.touchAction 显式值优先于 managed 规则', async () => {
    renderMobileSet({ gesture: { touchAction: 'auto' } })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    expect(document.getElementById('zmageViewport')?.style.touchAction).toBe('auto')
  })

  it('双指 pinch 在 mobile 模式进入 zoom, 并在移动时阻止默认页面手势', async () => {
    const onZooming = vi.fn()
    renderMobileSet({ onZooming })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', [{ x: 400, y: 300 }, { x: 600, y: 300 }])
      const move = dispatchTouch('touchmove', [{ x: 350, y: 300 }, { x: 650, y: 300 }])
      expect(move.defaultPrevented).toBe(true)
      await new Promise(r => setTimeout(r, 80))
    })

    expect(onZooming).toHaveBeenCalledWith(true)
    expect(getImageScale()).toBeGreaterThan(0.7)
  })

  it('双指 pinch 缩回 fit 后退出 zoom, viewer 保持打开', async () => {
    const onZooming = vi.fn()
    renderMobileSet({ onZooming })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', [{ x: 350, y: 300 }, { x: 650, y: 300 }])
      dispatchTouch('touchmove', [{ x: 300, y: 300 }, { x: 700, y: 300 }])
      await new Promise(r => setTimeout(r, 80))
      dispatchTouch('touchmove', [{ x: 450, y: 300 }, { x: 550, y: 300 }])
      dispatchTouch('touchend', [{ x: 450, y: 300 }, { x: 550, y: 300 }])
      await new Promise(r => setTimeout(r, 80))
    })

    expect(document.getElementById('zmage')).toBeTruthy()
    expect(onZooming).toHaveBeenCalledWith(false)
    expect(getImageScale()).toBeLessThanOrEqual(0.51)
  })

  it('pinch 序列中抬起一根手指后不退化成 swipe 翻页', async () => {
    const onSwitching = vi.fn()
    renderMobileSet({ onSwitching })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', [{ x: 350, y: 300 }, { x: 650, y: 300 }])
      dispatchTouch('touchmove', [{ x: 300, y: 300 }, { x: 700, y: 300 }])
      dispatchTouch('touchend', { x: 700, y: 300 }, [{ x: 300, y: 300 }])
      dispatchTouch('touchmove', { x: 80, y: 305 })
      dispatchTouch('touchend', { x: 80, y: 305 })
      await new Promise(r => setTimeout(r, 120))
    })

    expect(onSwitching).not.toHaveBeenCalled()
    expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('mobile-a.jpg')
  })

  it('pinchZoom=false 时双指触摸不退化成 swipe 翻页', async () => {
    const onSwitching = vi.fn()
    renderMobileSet({ gesture: { pinchZoom: false, doubleTapZoom: false }, onSwitching })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', [{ x: 350, y: 300 }, { x: 650, y: 300 }])
      const move = dispatchTouch('touchmove', [{ x: 80, y: 305 }, { x: 680, y: 305 }])
      dispatchTouch('touchend', [{ x: 80, y: 305 }, { x: 680, y: 305 }])
      expect(move.defaultPrevented).toBe(false)
      await new Promise(r => setTimeout(r, 120))
    })

    expect(onSwitching).not.toHaveBeenCalled()
    expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('mobile-a.jpg')
  })

  it('单指双击在 mobile 模式进入 zoom, 并以第二次 tap 位置作为缩放中心', async () => {
    const onZooming = vi.fn()
    renderMobileSet({ onZooming })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', { x: 760, y: 300 })
      dispatchTouch('touchend', { x: 760, y: 300 })
      await new Promise(r => setTimeout(r, 80))
      dispatchTouch('touchstart', { x: 760, y: 300 })
      dispatchTouch('touchend', { x: 760, y: 300 })
      await new Promise(r => setTimeout(r, 120))
    })

    expect(document.getElementById('zmageViewport')?.style.touchAction).toBe('none')
    expect(onZooming).toHaveBeenCalledWith(true)
    expect(getImageScale()).toBeCloseTo(1, 2)
    expect(getImageTranslate().x).toBeLessThan(-200)

    await act(async () => {
      fireEvent.click(document.getElementById('zmageImage') as HTMLImageElement)
      await new Promise(r => setTimeout(r, 80))
    })
    expect(onZooming).not.toHaveBeenCalledWith(false)
    expect(getImageScale()).toBeCloseTo(1, 2)
  })

  it('zoom 态下单指双击退出 zoom, 回到默认 fit 视图', async () => {
    const onZooming = vi.fn()
    renderMobileSet({ onZooming })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 60))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 120))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 60))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 120))
    })

    expect(onZooming).toHaveBeenCalledWith(true)
    expect(onZooming).toHaveBeenCalledWith(false)
    expect(getImageScale()).toBeLessThanOrEqual(0.51)
  })

  it('zoom 态下单指拖曳平移当前图片', async () => {
    renderMobileSet()
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 60))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 420))
    })

    expect(getImageScale()).toBeCloseTo(1, 2)
    const before = getImageTranslate()

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      const move = dispatchTouch('touchmove', { x: 570, y: 340 })
      dispatchTouch('touchend', { x: 570, y: 340 })
      expect(move.defaultPrevented).toBe(true)
      await new Promise(r => setTimeout(r, 50))
    })

    const after = getImageTranslate()
    expect(after.x).toBeGreaterThan(before.x + 40)
    expect(after.y).toBeGreaterThan(before.y + 20)
    expect(getImageScale()).toBeCloseTo(1, 2)
  })

  it('zoom 态下单指拖曳到边缘时允许阻尼越界, 松手后回弹到边界内', async () => {
    renderMobileSet()
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 60))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 420))
    })

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchmove', { x: 1200, y: 300 })
      await new Promise(r => setTimeout(r, 20))
    })

    const during = getImageTranslate()
    expect(during.x).toBeGreaterThan(550)
    expect(during.x).toBeLessThan(700)

    await act(async () => {
      dispatchTouch('touchend', { x: 1200, y: 300 })
      await new Promise(r => setTimeout(r, 50))
    })

    expect(getImageTranslate().x).toBeLessThanOrEqual(550)
  })

  it('zoom 退出时不以 zoom scale 首帧挂载侧边预热图', async () => {
    renderMobileSet()
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 60))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 500))
    })
    expect(getImageScale()).toBeCloseTo(1, 2)

    await act(async () => {
      fireEvent.click(document.getElementById('zmageImage') as HTMLImageElement)
    })

    const immediateSideScales = getSideImages().map(getElementScale)
    expect(immediateSideScales.every(scale => scale <= 0.55)).toBe(true)

    await wait(80)
    const settledSideScales = getSideImages().map(getElementScale)
    expect(settledSideScales.length).toBeGreaterThan(0)
    expect(settledSideScales.every(scale => scale <= 0.55)).toBe(true)
  })

  it('gesture.doubleTapZoom=false 时单指双击不进入 zoom', async () => {
    const onZooming = vi.fn()
    renderMobileSet({ gesture: { doubleTapZoom: false }, onZooming })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)
    prepareViewerImage()

    await act(async () => {
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 80))
      dispatchTouch('touchstart', { x: 500, y: 300 })
      dispatchTouch('touchend', { x: 500, y: 300 })
      await new Promise(r => setTimeout(r, 120))
    })

    expect(onZooming).not.toHaveBeenCalled()
    expect(getImageScale()).toBeLessThanOrEqual(0.51)
  })

  it('desktop preset 不注册 Phase 1 touch listeners', async () => {
    const originalAdd = window.addEventListener.bind(window)
    const touchTypes: string[] = []
    window.addEventListener = vi.fn(((type: string, listener: EventListenerOrEventListenerObject, options?: unknown) => {
      if (type.startsWith('touch')) touchTypes.push(type)
      return originalAdd(type, listener, options as AddEventListenerOptions)
    }) as typeof window.addEventListener)

    try {
      render(
        <Zmage
          src="https://example.com/desktop-a.jpg"
          alt="desktop-gesture"
          preset="desktop"
          set={[
            { src: 'https://example.com/desktop-a.jpg', alt: 'a' },
            { src: 'https://example.com/desktop-b.jpg', alt: 'b' },
          ]}
        />
      )
      fireEvent.click(screen.getByAltText('desktop-gesture'))
      await wait(50)

      expect(touchTypes).toEqual([])
    } finally {
      window.addEventListener = originalAdd
    }
  })

  it('mobile 左划触发下一页并调用 onSwitching', async () => {
    const onSwitching = vi.fn()
    renderMobileSet({ onSwitching })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 200, y: 100 })
      const move = dispatchTouch('touchmove', { x: 40, y: 105 })
      dispatchTouch('touchend', { x: 40, y: 105 })
      expect(move.defaultPrevented).toBe(true)
      await new Promise(r => setTimeout(r, 80))
    })

    expect(onSwitching).toHaveBeenCalledWith(1)
    expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('mobile-b.jpg')
  })

  it('gesture.swipe=false 禁止横向拖曳翻页', async () => {
    const onSwitching = vi.fn()
    renderMobileSet({ gesture: { swipe: false }, onSwitching })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 200, y: 100 })
      const move = dispatchTouch('touchmove', { x: 40, y: 105 })
      dispatchTouch('touchend', { x: 40, y: 105 })
      expect(move.defaultPrevented).toBe(false)
      await new Promise(r => setTimeout(r, 80))
    })

    expect(onSwitching).not.toHaveBeenCalled()
    expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('mobile-a.jpg')
  })

  it('mobile 纵向拖曳通过现有 close path 调用 onBrowsing(false)', async () => {
    const onBrowsing = vi.fn()
    renderMobileSet({ onBrowsing })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 100, y: 100 })
      const move = dispatchTouch('touchmove', { x: 102, y: 220 })
      dispatchTouch('touchend', { x: 102, y: 220 })
      expect(move.defaultPrevented).toBe(true)
      await new Promise(r => setTimeout(r, 800))
    })

    expect(onBrowsing).toHaveBeenCalledWith(false)
    expect(document.getElementById('zmage')).toBeNull()
  })

  it('mobile 纵向拖曳退出沿用 350ms browsing close 时长', async () => {
    const onBrowsing = vi.fn()
    renderMobileSet({ onBrowsing })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 100, y: 100 })
      dispatchTouch('touchmove', { x: 102, y: 220 })
      dispatchTouch('touchend', { x: 102, y: 220 })
      await new Promise(r => setTimeout(r, 420))
    })

    expect(onBrowsing).toHaveBeenCalledWith(false)
    expect(document.getElementById('zmage')).toBeNull()
  })

  it('mobile 纵向拖曳退出时 backdrop 立即开始 fadeout', async () => {
    renderMobileSet()
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 100, y: 100 })
      dispatchTouch('touchmove', { x: 102, y: 220 })
      dispatchTouch('touchend', { x: 102, y: 220 })
      await new Promise(r => setTimeout(r, 30))
    })

    const background = document.getElementById('zmageBackground') as HTMLDivElement
    expect(background).toBeTruthy()
    expect(background.style.opacity).toBe('0')
    expect(background.style.transitionDelay).toBe('0s')
  })

  it('mobile 纵向拖曳退出从松手位置续接 out 动画, 不先回中心', async () => {
    renderMobileSet()
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 100, y: 100 })
      dispatchTouch('touchmove', { x: 102, y: 220 })
    })
    expect(getImageTranslateY()).toBe(120)

    await act(async () => {
      dispatchTouch('touchend', { x: 102, y: 220 })
      await new Promise(r => setTimeout(r, 30))
    })
    expect(Math.abs(getImageTranslateY())).toBeGreaterThan(80)
  })

  it('gesture.dragExit=false 禁止纵向拖曳关闭', async () => {
    const onBrowsing = vi.fn()
    renderMobileSet({ gesture: { dragExit: false }, onBrowsing })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 100, y: 100 })
      const move = dispatchTouch('touchmove', { x: 102, y: 220 })
      dispatchTouch('touchend', { x: 102, y: 220 })
      expect(move.defaultPrevented).toBe(false)
      await new Promise(r => setTimeout(r, 120))
    })

    expect(onBrowsing).not.toHaveBeenCalledWith(false)
    expect(document.getElementById('zmage')).toBeTruthy()
  })

  it('gesture=false 同时禁止横向翻页和纵向关闭', async () => {
    const onBrowsing = vi.fn()
    const onSwitching = vi.fn()
    renderMobileSet({ gesture: false, onBrowsing, onSwitching })
    fireEvent.click(screen.getByAltText('mobile-gesture'))
    await wait(50)

    await act(async () => {
      dispatchTouch('touchstart', { x: 200, y: 100 })
      dispatchTouch('touchmove', { x: 40, y: 105 })
      dispatchTouch('touchend', { x: 40, y: 105 })
      dispatchTouch('touchstart', { x: 100, y: 100 })
      dispatchTouch('touchmove', { x: 102, y: 220 })
      dispatchTouch('touchend', { x: 102, y: 220 })
      await new Promise(r => setTimeout(r, 120))
    })

    expect(onSwitching).not.toHaveBeenCalled()
    expect(onBrowsing).not.toHaveBeenCalledWith(false)
    expect(document.getElementById('zmage')).toBeTruthy()
  })
})

describe('Zmage controller Phase 5', () => {
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  type ControllerRenderParameters = Parameters<NonNullable<ControllerSet['render']>>[0]

  it('controller 默认 placement 为 top-right', async () => {
    render(<Zmage src={SRC} alt="controller-placement-default" preset="desktop" />)
    fireEvent.click(screen.getByAltText('controller-placement-default'))
    await wait(50)

    expect(document.getElementById('zmageControl')?.dataset.placement).toBe('top-right')
  })

  it('controller.placement 支持 bottom-center', async () => {
    render(<Zmage src={SRC} alt="controller-placement-bottom" controller={{ placement: 'bottom-center' }} />)
    fireEvent.click(screen.getByAltText('controller-placement-bottom'))
    await wait(50)

    expect(document.getElementById('zmageControl')?.dataset.placement).toBe('bottom-center')
  })

  it('controller.placement 运行时非法值回退到 top-right', async () => {
    render(<Zmage src={SRC} alt="controller-placement-invalid" controller={{ placement: 'bad-place' } as any} />)
    fireEvent.click(screen.getByAltText('controller-placement-invalid'))
    await wait(50)

    expect(document.getElementById('zmageControl')?.dataset.placement).toBe('top-right')
  })

  it('controller.placement 只移动 toolbar, 不移动翻页和分页节点', async () => {
    render(
      <Zmage
        src="https://example.com/controller-a.jpg"
        alt="controller-placement-scope"
        loop={false}
        controller={{ placement: 'left-center' }}
        set={[
          { src: 'https://example.com/controller-a.jpg' },
          { src: 'https://example.com/controller-b.jpg' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('controller-placement-scope'))
    await wait(50)

    expect(document.getElementById('zmageControl')?.dataset.placement).toBe('left-center')
    expect(document.getElementById('zmageControlFlipRight')).toBeTruthy()
    expect(document.getElementById('zmageControlPagination')).toBeTruthy()
  })

  it('controller.placement 不破坏 animate.browsing=false 的无动画契约', async () => {
    render(
      <Zmage
        src={SRC}
        alt="controller-placement-no-anim"
        controller={{ placement: 'bottom-left' }}
        animate={{ browsing: false }}
      />
    )
    fireEvent.click(screen.getByAltText('controller-placement-no-anim'))
    await wait(0)

    expect(document.getElementById('zmageControl')?.style.transition).toBe('none')
    expect(document.getElementById('zmageControl')?.dataset.placement).toBe('bottom-left')
  })

  it('controller=false 不渲染默认控制器且不调用 controller.render', async () => {
    const renderController = vi.fn(() => <button>custom</button>)
    render(<Zmage src={SRC} alt="controller-render-false" controller={false} />)
    render(<Zmage src={SRC} alt="controller-render-unused" controller={{ render: renderController }} />)
    fireEvent.click(screen.getByAltText('controller-render-false'))
    await wait(50)

    expect(document.getElementById('zmageControl')).toBeNull()
    expect(renderController).not.toHaveBeenCalled()
  })

  it('controller.render 接收公开状态并可关闭 viewer', async () => {
    const renderController = vi.fn(({ state, actions }: ControllerRenderParameters) => (
      <button
        data-testid="custom-close"
        data-page={state.page}
        data-total={state.total}
        onClick={actions.close}
      >
        close
      </button>
    ))
    render(<Zmage src={SRC} alt="controller-render-close" controller={{ render: renderController }} />)
    fireEvent.click(screen.getByAltText('controller-render-close'))
    await wait(50)

    expect(renderController.mock.calls.at(-1)?.[0].state).toMatchObject({
      page: 0,
      total: 1,
      canPrev: false,
      canNext: false,
      canDownload: true,
      placement: 'top-right',
    })

    fireEvent.click(screen.getByTestId('custom-close'))
    await wait(500)
    expect(document.getElementById('zmage')).toBeNull()
  })

  it('controller.render actions.next 沿用现有翻页逻辑', async () => {
    const onSwitching = vi.fn()
    const renderController = ({ actions }: ControllerRenderParameters) => (
      <button data-testid="custom-next" onClick={actions.next}>next</button>
    )
    render(
      <Zmage
        src="https://example.com/controller-a.jpg"
        alt="controller-render-next"
        onSwitching={onSwitching}
        controller={{ render: renderController }}
        set={[
          { src: 'https://example.com/controller-a.jpg' },
          { src: 'https://example.com/controller-b.jpg' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('controller-render-next'))
    await wait(50)
    fireEvent.click(screen.getByTestId('custom-next'))
    await wait(80)

    expect(onSwitching).toHaveBeenCalledWith(1)
    expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('controller-b.jpg')
  })

  it('controller.render actions.toPage 支持直接跳页', async () => {
    const renderController = ({ actions }: ControllerRenderParameters) => (
      <button data-testid="custom-page" onClick={() => actions.toPage(1)}>page</button>
    )
    render(
      <Zmage
        src="https://example.com/controller-a.jpg"
        alt="controller-render-page"
        controller={{ render: renderController }}
        set={[
          { src: 'https://example.com/controller-a.jpg' },
          { src: 'https://example.com/controller-b.jpg' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('controller-render-page'))
    await wait(50)
    fireEvent.click(screen.getByTestId('custom-page'))
    await wait(80)

    expect((document.getElementById('zmageImage') as HTMLImageElement).src).toContain('controller-b.jpg')
  })

  it('controller.render 可复用默认 Toolbar slot', async () => {
    const renderController = ({ slots }: ControllerRenderParameters) => <>{slots.Toolbar}</>
    render(<Zmage src={SRC} alt="controller-render-slot" controller={{ render: renderController }} />)
    fireEvent.click(screen.getByAltText('controller-render-slot'))
    await wait(50)

    expect(document.getElementById('zmageControl')).toBeTruthy()
    expect(document.getElementById('zmageControlClose')).toBeTruthy()
  })

  it('controller.render 返回 null 时隐藏全部 controller UI', async () => {
    render(
      <Zmage
        src="https://example.com/controller-a.jpg"
        alt="controller-render-null"
        controller={{ render: () => null }}
        set={[
          { src: 'https://example.com/controller-a.jpg' },
          { src: 'https://example.com/controller-b.jpg' },
        ]}
      />
    )
    fireEvent.click(screen.getByAltText('controller-render-null'))
    await wait(50)

    expect(document.getElementById('zmageControl')).toBeNull()
    expect(document.getElementById('zmageControlFlipRight')).toBeNull()
    expect(document.getElementById('zmageControlPagination')).toBeNull()
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

  it('未传 preset 默认按 auto 解析: mobile-like 环境使用 mobile preset', () => {
    stubMatchMedia(true)
    expect(resolvePreset(undefined)).toBe('mobile')
    expect(defPropsWithEnv(undefined).gesture.wheelZoom).toBe(false)
  })

  it('未传 preset 默认按 auto 解析: 非粗指针环境使用 desktop preset', () => {
    stubMatchMedia(false)
    expect(resolvePreset(undefined)).toBe('desktop')
    expect(defPropsWithEnv(undefined).gesture.pinchZoom).toBe(false)
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

  it('object-fit: cover 的封面打开首帧写入 clip-path 和 cover 圆角', async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(<Zmage src="https://example.com/object-fit.jpg" alt="object-fit-cover"/>)
      const cover = screen.getByAltText('object-fit-cover') as HTMLImageElement
      Object.defineProperty(cover, 'naturalWidth', { value: 1000, configurable: true })
      Object.defineProperty(cover, 'naturalHeight', { value: 500, configurable: true })
      cover.style.objectFit = 'cover'
      cover.style.objectPosition = '50% 50%'
      cover.style.borderRadius = '12px'
      cover.getBoundingClientRect = () => ({
        left: 400,
        top: 300,
        width: 200,
        height: 200,
        right: 600,
        bottom: 500,
        x: 400,
        y: 300,
        toJSON: () => ({}),
      } as DOMRect)

      fireEvent.click(cover)
      await wait(30)

      const image = document.getElementById('zmageImage') as HTMLImageElement
      expect(image.style.transform).toContain('scale3d(0.4, 0.4, 1)')
      // clip-path / border-radius use image-local coordinates before transform.
      // Visual crop 100px and visual radius 12px at scale .4 become 250px and 30px locally.
      expect(image.style.clipPath).toBe('inset(0px 250px 0px 250px round 30px)')
      expect(image.style.borderRadius).toBe('30px')
    } finally {
      if (originalClientWidth) { Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth) } else { delete (HTMLElement.prototype as any).clientWidth }
      if (originalClientHeight) { Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight) } else { delete (HTMLElement.prototype as any).clientHeight }
    }
  })

  it('animate.cover=false 时 object-fit 封面沿用旧几何且不写入 clip-path', async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(<Zmage src="https://example.com/object-fit-legacy.jpg" alt="object-fit-legacy" animate={{ cover: false }}/>)
      const cover = screen.getByAltText('object-fit-legacy') as HTMLImageElement
      Object.defineProperty(cover, 'naturalWidth', { value: 1000, configurable: true })
      Object.defineProperty(cover, 'naturalHeight', { value: 500, configurable: true })
      cover.style.objectFit = 'cover'
      cover.getBoundingClientRect = () => ({
        left: 400,
        top: 300,
        width: 200,
        height: 200,
        right: 600,
        bottom: 500,
        x: 400,
        y: 300,
        toJSON: () => ({}),
      } as DOMRect)

      fireEvent.click(cover)
      await wait(30)

      const image = document.getElementById('zmageImage') as HTMLImageElement
      expect(image.style.transform).toContain('scale3d(0.2, 0.2, 1)')
      expect(image.style.clipPath).toBe('')
    } finally {
      if (originalClientWidth) { Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth) } else { delete (HTMLElement.prototype as any).clientWidth }
      if (originalClientHeight) { Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight) } else { delete (HTMLElement.prototype as any).clientHeight }
    }
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
      expect(Math.abs(x)).toBeGreaterThanOrEqual(1010)
    } finally {
      if (originalNaturalWidth) { Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', originalNaturalWidth) } else { delete (HTMLImageElement.prototype as any).naturalWidth }
      if (originalNaturalHeight) { Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', originalNaturalHeight) } else { delete (HTMLImageElement.prototype as any).naturalHeight }
      if (originalClientWidth) { Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth) } else { delete (HTMLElement.prototype as any).clientWidth }
      if (originalClientHeight) { Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight) } else { delete (HTMLElement.prototype as any).clientHeight }
    }
  })

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

    // 翻页后仍只渲染 center, 且 src 已切到下一页
    clickById('zmageControlFlipRight')
    await wait(50)
    const imgsAfterFlip = Array.from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
    expect(imgsAfterFlip.length).toBe(1)
    expect(imgsAfterFlip[0].id).toBe('zmageImage')
    expect(imgsAfterFlip[0].src).toContain('02.jpg')
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
    await wait(30)
    fireEvent.load(document.getElementById('zmageImage') as HTMLImageElement)
    await wait(60)

    const sideImage = Array
      .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
      .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg'))
    expect(sideImage).toBeTruthy()
    // fade 配置: { offset: 0, overflow: 0, opacity: 0 }
    expect(sideImage!.style.opacity).toBe('0')
    // fade.offset = 0: transform 中横向位移恒为 0px (与 crossFade 区分)
    expect(sideImage!.style.transform).toMatch(/translate3d\(0px,/)
  })

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
    await wait(30)
    fireEvent.load(document.getElementById('zmageImage') as HTMLImageElement)
    await wait(60)

    const sideImage = Array
      .from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
      .find(img => img.id !== 'zmageImage' && img.src.includes('02.jpg'))
    expect(sideImage).toBeTruthy()
    // crossFade 配置: { offset: 30, overflow: 0, opacity: 0 }, 右边图 step=-1 时 transform 含 -30px
    expect(sideImage!.style.opacity).toBe('0')
    expect(sideImage!.style.transform).toMatch(/translate3d\(-?30px,/)
  })

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
    // jsdom 下 naturalWidth=0 → calcFitScale 返回 1.002 (epsilon), overflow=0.08 应让 scale3d 大于 1.05 (实测 1.082).
    // 阈值 > 1.05 隔离 epsilon, 让 overflow 漂移到 0 时立即失败.
    const m = sideImage!.style.transform.match(/scale3d\(([\d.]+),/)
    expect(m).not.toBeNull()
    expect(Number(m![1])).toBeGreaterThan(1.05)
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
        window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32 } as KeyboardEventInit))
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
        window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32 } as KeyboardEventInit))
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
  // 工具: 直接向 window 派发 keydown (lib 的监听器挂在 window 上, 通过 e.code 匹配)
  const dispatchArrow = async (which: 'left' | 'right') => {
    await act(async () => {
      const keyCode = which === 'left' ? 37 : 39
      const code = which === 'left' ? 'ArrowLeft' : 'ArrowRight'
      window.dispatchEvent(new KeyboardEvent('keydown', { key: code, code, keyCode } as KeyboardEventInit))
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

describe('Zmage hotKey 旋转 ([ / ]) — desktop preset 默认开启', () => {
  const dispatchKey = async (init: KeyboardEventInit & { code: string }) => {
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', init))
      await new Promise(r => setTimeout(r, 50))
    })
  }

  it('默认 desktop preset: [ 触发 onRotating(-90)', async () => {
    const onRotating = vi.fn()
    render(<Zmage src={SRC} alt="rot-l" preset="desktop" onRotating={onRotating}/>)
    fireEvent.click(screen.getByAltText('rot-l'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    await dispatchKey({ code: 'BracketLeft', key: '[' })
    expect(onRotating).toHaveBeenLastCalledWith(-90)
  })

  it('默认 desktop preset: ] 触发 onRotating(+90)', async () => {
    const onRotating = vi.fn()
    render(<Zmage src={SRC} alt="rot-r" preset="desktop" onRotating={onRotating}/>)
    fireEvent.click(screen.getByAltText('rot-r'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    await dispatchKey({ code: 'BracketRight', key: ']' })
    expect(onRotating).toHaveBeenLastCalledWith(90)
  })

  it('hotKey={{ rotate: false }} → [ / ] 不触发 (umbrella 关闭)', async () => {
    const onRotating = vi.fn()
    render(<Zmage src={SRC} alt="rot-off" preset="desktop" hotKey={{ rotate: false }} onRotating={onRotating}/>)
    fireEvent.click(screen.getByAltText('rot-off'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    await dispatchKey({ code: 'BracketLeft', key: '[' })
    await dispatchKey({ code: 'BracketRight', key: ']' })
    expect(onRotating).not.toHaveBeenCalled()
  })

  it('自定义按键: hotKey={{ rotateLeft: "KeyA" }} → A 触发, [ 不再触发', async () => {
    const onRotating = vi.fn()
    render(
      <Zmage src={SRC} alt="rot-custom" preset="desktop"
             hotKey={{ rotate: false, rotateLeft: 'KeyA' }} onRotating={onRotating}/>
    )
    fireEvent.click(screen.getByAltText('rot-custom'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    // 默认键不再生效 (per-side 自定义胜出, umbrella 也关闭)
    await dispatchKey({ code: 'BracketLeft', key: '[' })
    expect(onRotating).not.toHaveBeenCalled()

    // 自定义 KeyA 生效
    await dispatchKey({ code: 'KeyA', key: 'a' })
    expect(onRotating).toHaveBeenLastCalledWith(-90)
  })
})

describe('Zmage hotKey 下载 (Mod+S) — desktop preset 默认关闭, 跨平台', () => {
  const dispatchKey = async (init: KeyboardEventInit & { code: string }) => {
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', init))
      await new Promise(r => setTimeout(r, 50))
    })
  }

  // 下载实现是创建 <a> 调用 .click(), 用 spy 截获 anchor click 验证 src
  const installAnchorSpy = () => {
    const clicks: string[] = []
    const orig = HTMLAnchorElement.prototype.click
    HTMLAnchorElement.prototype.click = function () { clicks.push(this.href) }
    return { clicks, restore: () => { HTMLAnchorElement.prototype.click = orig } }
  }

  it('默认 desktop preset 不启用下载: Cmd+S / Ctrl+S 都不触发', async () => {
    const { clicks, restore } = installAnchorSpy()
    try {
      render(<Zmage src={SRC} alt="dl-default"/>)
      fireEvent.click(screen.getByAltText('dl-default'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })

      await dispatchKey({ code: 'KeyS', key: 's', metaKey: true })
      await dispatchKey({ code: 'KeyS', key: 's', ctrlKey: true })
      expect(clicks).toHaveLength(0)
    } finally { restore() }
  })

  it('hotKey={{ download: true }}: Cmd+S (Mac) 触发下载', async () => {
    const { clicks, restore } = installAnchorSpy()
    try {
      render(<Zmage src={SRC} alt="dl-mac" hotKey={{ download: true }}/>)
      fireEvent.click(screen.getByAltText('dl-mac'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })

      await dispatchKey({ code: 'KeyS', key: 's', metaKey: true })
      expect(clicks).toHaveLength(1)
      expect(clicks[0]).toContain('test.jpg')
    } finally { restore() }
  })

  it('hotKey={{ download: true }}: Ctrl+S (Win/Linux) 触发下载', async () => {
    const { clicks, restore } = installAnchorSpy()
    try {
      render(<Zmage src={SRC} alt="dl-win" hotKey={{ download: true }}/>)
      fireEvent.click(screen.getByAltText('dl-win'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })

      await dispatchKey({ code: 'KeyS', key: 's', ctrlKey: true })
      expect(clicks).toHaveLength(1)
    } finally { restore() }
  })

  it('hotKey={{ download: true }}: 裸 S (无修饰键) 不触发, 防误触', async () => {
    const { clicks, restore } = installAnchorSpy()
    try {
      render(<Zmage src={SRC} alt="dl-bare" hotKey={{ download: true }}/>)
      fireEvent.click(screen.getByAltText('dl-bare'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })

      await dispatchKey({ code: 'KeyS', key: 's' })
      expect(clicks).toHaveLength(0)
    } finally { restore() }
  })

  it('hotKey={{ download: true }}: Cmd+Shift+S 不触发 (严格修饰键, 多了 Shift)', async () => {
    const { clicks, restore } = installAnchorSpy()
    try {
      render(<Zmage src={SRC} alt="dl-strict" hotKey={{ download: true }}/>)
      fireEvent.click(screen.getByAltText('dl-strict'))
      await act(async () => { await new Promise(r => setTimeout(r, 50)) })

      await dispatchKey({ code: 'KeyS', key: 'S', metaKey: true, shiftKey: true })
      expect(clicks).toHaveLength(0)
    } finally { restore() }
  })

  it('阻止浏览器默认 "Save Page As" — keydown.preventDefault 被调用', async () => {
    render(<Zmage src={SRC} alt="dl-prevent" hotKey={{ download: true }}/>)
    fireEvent.click(screen.getByAltText('dl-prevent'))
    await act(async () => { await new Promise(r => setTimeout(r, 50)) })

    const e = new KeyboardEvent('keydown', { code: 'KeyS', key: 's', metaKey: true, cancelable: true })
    await act(async () => {
      window.dispatchEvent(e)
      await new Promise(r => setTimeout(r, 50))
    })
    expect(e.defaultPrevented).toBe(true)
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

describe('Zmage hideOnDblClick (#195)', () => {
  it('hideOnDblClick=true 时, 双击中心图关闭浏览层', async () => {
    render(<Zmage src={SRC} alt="dbl" hideOnDblClick/>)
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
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27 } as KeyboardEventInit))
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

describe('Zmage 翻页 fit-scale 跟随当前页比例 (#167)', () => {
  // 真实回归: 多图模式下不同长宽比的 set, 翻页后 currentStyle.scale 必须按当前页 naturalWidth/Height 重算,
  // 不能保留 defaultPage 的 scale. 现有测试套全用同一张测试图, naturalWidth=0, scale 始终落到 1, 巧合掩盖 bug.

  type Dim = { w: number, h: number }
  const stripQuery = (s: string) => s.split('?')[0]

  // src 维度的 prototype 级 mock — 比 prototype 全局 mock 多了"按 src 查"的语义,
  // 让多图测试场景下每张图自带独立 naturalWidth/Height/complete.
  const mockImageDimensionsBySrc = (mapping: Record<string, Dim>) => {
    const origW = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const origH = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const origC = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete')
    const lookup = (img: HTMLImageElement) => mapping[stripQuery(img.getAttribute('src') || img.src || '')]
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.w ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.h ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement) !== undefined },
    })
    return () => {
      if (origW) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', origW)
      else delete (HTMLImageElement.prototype as any).naturalWidth
      if (origH) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', origH)
      else delete (HTMLImageElement.prototype as any).naturalHeight
      if (origC) Object.defineProperty(HTMLImageElement.prototype, 'complete', origC)
      else delete (HTMLImageElement.prototype as any).complete
    }
  }

  const parseScale = (transform: string): number | null => {
    const m = transform.match(/scale3d\(([\d.]+),/)
    return m ? Number(m[1]) : null
  }

  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  it('从 2:1 wide 翻到 1:2 tall 后, scale 必须重算 (现有 bug: 保留前一页 scale)', async () => {
    const WIDE = 'https://example.com/wide.jpg'   // 2000x1000 → 2:1
    const TALL = 'https://example.com/tall.jpg'   // 1000x2000 → 1:2
    const restore = mockImageDimensionsBySrc({
      [WIDE]: { w: 2000, h: 1000 },
      [TALL]: { w: 1000, h: 2000 },
    })
    const origCW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const origCH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(
        <Zmage
          src={WIDE}
          alt="aspect-flip"
          preset="desktop"
          set={[
            { src: WIDE, alt: 'wide' },
            { src: TALL, alt: 'tall' },
          ]}
        />
      )
      fireEvent.click(screen.getByAltText('aspect-flip'))
      await wait(50)

      // 第一页 (wide 2000x1000): fit-scale = min(1024/2000, 768/1000) = min(0.512, 0.768) = 0.512
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      expect(center0).toBeTruthy()
      // 触发 load 让 currentStyle 计算 (jsdom 不会自动派发)
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 80)) })
      const scale0 = parseScale(center0.style.transform)
      expect(scale0).toBeCloseTo(0.512, 2)

      // 翻页到第二页 (tall 1000x2000): 期望 fit-scale = min(1024/1000, 768/2000) = min(1.024, 0.384) = 0.384
      const flipRight = document.getElementById('zmageControlFlipRight')
      if (!flipRight) throw new Error('expected #zmageControlFlipRight')
      await act(async () => { fireEvent.click(flipRight); await new Promise(r => setTimeout(r, 80)) })

      const center1 = document.getElementById('zmageImage') as HTMLImageElement
      expect(center1.getAttribute('src')).toContain('tall.jpg')
      // 现有 bug: side image 节点被复用为新 center, src 已就位但浏览器不再触发 load,
      // → currentStyle 保留 0.512. 修复后应该重算到 0.384.
      const scale1 = parseScale(center1.style.transform)
      expect(scale1).toBeCloseTo(0.384, 2)
      // 关键回归断言: 翻页前后 scale 必须发生变化
      expect(scale1).not.toBeCloseTo(scale0!, 2)
    } finally {
      restore()
      if (origCW) Object.defineProperty(HTMLElement.prototype, 'clientWidth', origCW)
      if (origCH) Object.defineProperty(HTMLElement.prototype, 'clientHeight', origCH)
    }
  })
})

describe('Zmage scale 校准 transition 中断 (Bug 1 / Bug 2)', () => {
  // 真实回归: 翻页后目标页 dims (naturalWidth/Height) 通过 onLoad 异步落地, React 据此
  // 把 transform 从"错误回退 scale (前一页 fit)" 重新计算为"正确 ownFit", 触发 350ms
  // CSS scale transition. flip='none' 永不渲染 side, swipe 在 ±2 出环跳页时也会撞上.
  // 本套用例锁定: cdU 检测到 dim 到达 → setNodeTransitionNone 中断这条 transition.

  type Dim = { w: number, h: number }
  const stripQuery = (s: string) => s.split('?')[0]
  const mockImageDimensionsBySrc = (mapping: Record<string, Dim>) => {
    const origW = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const origH = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const origC = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete')
    const lookup = (img: HTMLImageElement) => mapping[stripQuery(img.getAttribute('src') || img.src || '')]
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.w ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.h ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement) !== undefined },
    })
    return () => {
      if (origW) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', origW)
      else delete (HTMLImageElement.prototype as any).naturalWidth
      if (origH) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', origH)
      else delete (HTMLImageElement.prototype as any).naturalHeight
      if (origC) Object.defineProperty(HTMLImageElement.prototype, 'complete', origC)
      else delete (HTMLImageElement.prototype as any).complete
    }
  }
  const parseScale = (transform: string): number | null => {
    const m = transform.match(/scale3d\(([\d.]+),/)
    return m ? Number(m[1]) : null
  }
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  it("flip='none' 切换 AR 不一致图片 → onLoad 触发 interrupt, 无 350ms scale 动画 (Bug 1)", async () => {
    const WIDE = 'https://example.com/wide.jpg'
    const TALL = 'https://example.com/tall.jpg'
    const restore = mockImageDimensionsBySrc({
      [WIDE]: { w: 2000, h: 1000 },
      [TALL]: { w: 1000, h: 2000 },
    })
    const origCW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const origCH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(
        <Zmage
          src={WIDE}
          alt="bug1"
          preset="desktop"
          animate={{ flip: 'none' }}
          set={[
            { src: WIDE, alt: 'wide' },
            { src: TALL, alt: 'tall' },
          ]}
        />
      )
      fireEvent.click(screen.getByAltText('bug1'))
      await wait(50)

      // 让 page 0 dims 落地
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 80)) })

      // 切到 page 1. flip='none' 不渲染 side → dims[1] 此前从未记录过.
      clickById('zmageControlFlipRight')
      await wait(20)

      const center1 = document.getElementById('zmageImage') as HTMLImageElement
      expect(center1.src).toContain('tall.jpg')

      // 模拟 onLoad: 触发 handleRecordImageDimensions(1) → cdU ② 检测 dim 到达 → cancelScaleCalibrationAnimation
      await act(async () => {
        fireEvent.load(center1)
        await new Promise(r => setTimeout(r, 5))  // cdU 已跑, RAF (~16ms) 尚未触发
      })

      // 关键断言: interrupt 把 inline transition 写为 'none', 取消即将触发的 350ms 动画
      expect(center1.style.transition).toBe('none')
      // transform 已 snap 到 ownFit(TALL) = min(1024/1000, 768/2000) = 0.384
      expect(parseScale(center1.style.transform)).toBeCloseTo(0.384, 2)

      // RAF 一帧后恢复 inline transition = '', React 重新接管 transition
      await wait(30)
      expect(center1.style.transition).toBe('')
    } finally {
      restore()
      if (origCW) Object.defineProperty(HTMLElement.prototype, 'clientWidth', origCW)
      if (origCH) Object.defineProperty(HTMLElement.prototype, 'clientHeight', origCH)
    }
  })

  it("flip='swipe' pagination 1→4 跳转 (out-of-ring) 不出现 scale 校准动画 (Bug 2)", async () => {
    const SRCS = Array.from({ length: 6 }, (_, i) => `https://example.com/img${i}.jpg`)
    const dimsMap: Record<string, Dim> = {}
    SRCS.forEach((src, i) => { dimsMap[src] = i % 2 === 0 ? { w: 2000, h: 1000 } : { w: 1000, h: 2000 } })
    const restore = mockImageDimensionsBySrc(dimsMap)
    const origCW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const origCH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(
        <Zmage
          src={SRCS[0]}
          alt="bug2"
          preset="desktop"
          animate={{ flip: 'swipe' }}
          set={SRCS.map((src, i) => ({ src, alt: `p${i}` }))}
        />
      )
      fireEvent.click(screen.getByAltText('bug2'))
      await wait(50)

      // 用 pagination dot 跳转: page 0 → page 3 (= 用户描述的 1 → 4, 步长 +3 在 ±2 预渲染环外)
      const dots = document.querySelectorAll<HTMLElement>('#zmageControlPagination > span')
      expect(dots.length).toBe(6)
      const dot3 = dots[3]
      expect(dot3).toBeTruthy()
      await act(async () => {
        fireEvent.click(dot3)
        await new Promise(r => setTimeout(r, 20))
      })

      const center3 = document.getElementById('zmageImage') as HTMLImageElement
      expect(center3.src).toContain('img3.jpg')

      // dims[3] 从未记录 (P=0 的 sides ring = {1,2,4,5} via ±2 wrap, 唯一漏的就是 page 3)
      await act(async () => {
        fireEvent.load(center3)
        await new Promise(r => setTimeout(r, 5))
      })

      expect(center3.style.transition).toBe('none')

      await wait(30)
      expect(center3.style.transition).toBe('')
    } finally {
      restore()
      if (origCW) Object.defineProperty(HTMLElement.prototype, 'clientWidth', origCW)
      if (origCH) Object.defineProperty(HTMLElement.prototype, 'clientHeight', origCH)
    }
  })

  it("flip='crossFade' in-ring 翻页 (dims 已知) 不触发 interrupt, 留 flip transition 正常播放", async () => {
    // 红队关注的关键负向用例: in-ring 翻页时 side 节点已被复用为 center, 此时 dims 已通过
    // side 的 onLoad 落地. 此场景不应进 interrupt 路径, 否则会杀掉合法 crossFade 动画
    // (= 上一次修复"首次切换无动画"反向 bug 的根因).
    const A = 'https://example.com/a.jpg'
    const B = 'https://example.com/b.jpg'
    const restore = mockImageDimensionsBySrc({
      [A]: { w: 1000, h: 1000 },
      [B]: { w: 1500, h: 1500 },
    })
    const origCW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })

    try {
      render(
        <Zmage
          src={A}
          alt="inring"
          preset="desktop"
          animate={{ flip: 'crossFade' }}
          set={[{ src: A }, { src: B }]}
        />
      )
      fireEvent.click(screen.getByAltText('inring'))
      await wait(50)

      // 预先让 page 0 (cover) 与 page 1 (side) dims 都落地
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 50)) })
      const sideB = Array.from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
        .find(img => img.id !== 'zmageImage' && img.src.includes('b.jpg'))
      expect(sideB).toBeTruthy()
      await act(async () => { fireEvent.load(sideB!); await new Promise(r => setTimeout(r, 5)) })

      // 翻页. dims[1] 已知 → cdU ① 把 pendingDimCalibration 设成 null → ② 永不触发.
      clickById('zmageControlFlipRight')
      await wait(5)  // 5ms < 16ms RAF, 若 interrupt 误触, transition 会停在 'none'

      const center1 = document.getElementById('zmageImage') as HTMLImageElement
      expect(center1.src).toContain('b.jpg')
      // 关键断言: interrupt 不应触发 (旧方案"切页就 setNodeTransitionNone"在此处会失败)
      expect(center1.style.transition).not.toBe('none')
    } finally {
      restore()
      if (origCW) Object.defineProperty(HTMLElement.prototype, 'clientWidth', origCW)
    }
  })

  it("Cover→browsing 动画期间 dims 到达 (慢网首开) 不被 interrupt 误中断", async () => {
    // 验证 pendingDimCalibration 守门正确: 首次开 viewer 没有 page change, 即便 onLoad
    // 在 cover→browsing 350ms 动画 (50-400ms 窗口) 期间触发, interrupt 不应触发.
    // (validator 早期方案的 _type === 'browsing' 守门会在此处误中断 cover→browsing 动画.)
    const A = 'https://example.com/a.jpg'
    const restore = mockImageDimensionsBySrc({ [A]: { w: 1000, h: 1000 } })

    try {
      render(<Zmage src={A} alt="cover-b" preset="desktop" set={[{ src: A }]}/>)
      fireEvent.click(screen.getByAltText('cover-b'))
      // 等 100ms: debounce(50ms) 已 fire → _type 切到 'browsing', cover→browsing 动画在跑.
      await wait(100)

      const center = document.getElementById('zmageImage') as HTMLImageElement
      // 模拟慢网下 onLoad 现在才到 (在动画窗口内). 此时没有 page change → pending 仍 null.
      await act(async () => {
        fireEvent.load(center)
        await new Promise(r => setTimeout(r, 5))
      })

      // 关键断言: interrupt 不应触发, cover→browsing 动画继续
      expect(center.style.transition).not.toBe('none')
    } finally {
      restore()
    }
  })
})

describe('Zmage 跳页与 fade 降级 (Issue 1 / Issue 2)', () => {
  // 共享根因: Browser.handleToPage 此前用 raw step (= targetPage - currentPage), 让 loop 场景下
  // 分页器跳页路径与方向键路径分裂. 两个新行为:
  //   (a) handleToPage 用 resolveShortestStep → loop=true 时 N=6 dot 0→5 走 step=-1 路径, 与左方向键合流
  //       → 命中预取环 step-1 节点 → React 复用 + slide-in (Issue 2 修复)
  //   (b) handleSwitchPages |step|>2 时 cap pageWithStep 推进量到 ±1 → 强制无 React key 复用 →
  //       新 center fresh mount → Image.cdU 加 jumpFadeIn class 触发 CSS @keyframes opacity 0→1 (Issue 1)

  type Dim = { w: number, h: number }
  const stripQuery = (s: string) => s.split('?')[0]
  const mockImageDimensionsBySrc = (mapping: Record<string, Dim>) => {
    const origW = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const origH = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const origC = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete')
    const lookup = (img: HTMLImageElement) => mapping[stripQuery(img.getAttribute('src') || img.src || '')]
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.w ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.h ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement) !== undefined },
    })
    return () => {
      if (origW) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', origW)
      else delete (HTMLImageElement.prototype as any).naturalWidth
      if (origH) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', origH)
      else delete (HTMLImageElement.prototype as any).naturalHeight
      if (origC) Object.defineProperty(HTMLImageElement.prototype, 'complete', origC)
      else delete (HTMLImageElement.prototype as any).complete
    }
  }
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }
  const buildSixSet = () => {
    const SRCS = Array.from({ length: 6 }, (_, i) => `https://example.com/img${i}.jpg`)
    return {
      SRCS,
      restore: mockImageDimensionsBySrc(Object.fromEntries(SRCS.map((src, i) => [
        src, i % 2 === 0 ? { w: 2000, h: 1000 } : { w: 1000, h: 2000 },
      ]))),
    }
  }
  const clickPaginationDot = (idx: number) => {
    const dots = document.querySelectorAll<HTMLElement>('#zmageControlPagination > span')
    const dot = dots[idx]
    if (!dot) throw new Error(`expected pagination dot ${idx} in DOM`)
    fireEvent.click(dot)
  }

  it("Issue 2: N=6 loop=true 分页器 0→5 走 shortest-path step=-1, 复用预取环 step-1 节点", async () => {
    const { SRCS, restore } = buildSixSet()
    try {
      render(
        <Zmage src={SRCS[0]} alt="issue2" preset="desktop" animate={{ flip: 'crossFade' }}
          set={SRCS.map((src, i) => ({ src, alt: `p${i}` }))}/>
      )
      fireEvent.click(screen.getByAltText('issue2'))
      await wait(50)

      // page 0 时 step-1 (loop wrap) 是 page 5 / image 6 (= SRCS[5])
      const sideStepMinus1 = Array.from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
        .find(img => img.id !== 'zmageImage' && img.src.includes('img5.jpg'))
      expect(sideStepMinus1).toBeTruthy()

      // 分页器跳到 page 5. 修复前 step=+5, pageWithStep+=5, 新 key 与旧 step-1 不对齐 → fresh mount, 无动画 (Issue 2 bug).
      // 修复后 resolveShortestStep(+5,6)=-1, pageWithStep+=-1, 新 center key=(X-1)-img5.jpg 命中旧 step-1 → React 复用.
      await act(async () => { clickPaginationDot(5); await new Promise(r => setTimeout(r, 30)) })

      const newCenter = document.getElementById('zmageImage') as HTMLImageElement
      expect(newCenter.src).toContain('img5.jpg')
      // 关键断言: 新 center 是旧 step-1 同一个 DOM 节点 (= 等同左方向键路径)
      expect(newCenter).toBe(sideStepMinus1)
    } finally {
      restore()
    }
  })

  it("Issue 1: N=6 loop=true 分页器 0→3 (跳页 |step|=3>2) 给新 center 加 jumpFadeIn class", async () => {
    const { SRCS, restore } = buildSixSet()
    try {
      render(
        <Zmage src={SRCS[0]} alt="issue1" preset="desktop" animate={{ flip: 'swipe' }}
          set={SRCS.map((src, i) => ({ src, alt: `p${i}` }))}/>
      )
      fireEvent.click(screen.getByAltText('issue1'))
      await wait(50)

      await act(async () => { clickPaginationDot(3); await new Promise(r => setTimeout(r, 5)) })

      const newCenter = document.getElementById('zmageImage') as HTMLImageElement
      expect(newCenter.src).toContain('img3.jpg')
      expect(newCenter.className).toContain('jumpFadeIn')

      // animationDuration (350ms) + 10ms 后 timer 移除 class
      await wait(380)
      expect(newCenter.className).not.toContain('jumpFadeIn')
    } finally {
      restore()
    }
  })

  it("Issue 1 Exception: flip='none' 跳页不加 jumpFadeIn class", async () => {
    const { SRCS, restore } = buildSixSet()
    try {
      render(
        <Zmage src={SRCS[0]} alt="none-jump" preset="desktop" animate={{ flip: 'none' }}
          set={SRCS.map((src, i) => ({ src, alt: `p${i}` }))}/>
      )
      fireEvent.click(screen.getByAltText('none-jump'))
      await wait(50)

      await act(async () => { clickPaginationDot(3); await new Promise(r => setTimeout(r, 5)) })

      const newCenter = document.getElementById('zmageImage') as HTMLImageElement
      expect(newCenter.src).toContain('img3.jpg')
      // flip='none' 是显式 instant-cut 语义, 不应叠加 fade
      expect(newCenter.className).not.toContain('jumpFadeIn')
    } finally {
      restore()
    }
  })

  it("In-range 不退化: N=6 分页器 0→2 (|step|=2 ≤ 2) 走预取环正常 slide", async () => {
    const { SRCS, restore } = buildSixSet()
    try {
      render(
        <Zmage src={SRCS[0]} alt="in-range" preset="desktop" animate={{ flip: 'swipe' }}
          set={SRCS.map((src, i) => ({ src, alt: `p${i}` }))}/>
      )
      fireEvent.click(screen.getByAltText('in-range'))
      await wait(50)

      const sideStepPlus2 = Array.from(document.querySelectorAll<HTMLImageElement>('#zmage img'))
        .find(img => img.id !== 'zmageImage' && img.src.includes('img2.jpg'))
      expect(sideStepPlus2).toBeTruthy()

      await act(async () => { clickPaginationDot(2); await new Promise(r => setTimeout(r, 5)) })

      const newCenter = document.getElementById('zmageImage') as HTMLImageElement
      expect(newCenter.src).toContain('img2.jpg')
      // 应该 React 复用旧 step+2 节点
      expect(newCenter).toBe(sideStepPlus2)
      // 不应该 fade
      expect(newCenter.className).not.toContain('jumpFadeIn')
    } finally {
      restore()
    }
  })

  it("StrictMode unmount: jumpFadeTimer 被 clearTimeout 不泄漏", async () => {
    const { SRCS, restore } = buildSixSet()
    try {
      const { unmount } = render(
        <Zmage src={SRCS[0]} alt="cleanup" preset="desktop" animate={{ flip: 'swipe' }}
          set={SRCS.map((src, i) => ({ src, alt: `p${i}` }))}/>
      )
      fireEvent.click(screen.getByAltText('cleanup'))
      await wait(50)

      await act(async () => { clickPaginationDot(3); await new Promise(r => setTimeout(r, 5)) })
      const newCenter = document.getElementById('zmageImage') as HTMLImageElement
      expect(newCenter.className).toContain('jumpFadeIn')

      // unmount 在 360ms timer 触发之前
      unmount()
      // 等更久, timer 不应再触发任何残留副作用 (无报错即通过)
      await wait(400)
      // 节点已脱离 DOM, classList 操作即便发生也不报错
      expect(document.getElementById('zmageImage')).toBeNull()
    } finally {
      restore()
    }
  })
})

describe('Zmage canZoom 切页路径收敛 (#regression-zoom-after-flip)', () => {
  // 真实回归: handleSwitchPages 切页时把 canZoom 乐观 reset 成 true, 设计意图是新图 onLoad
  // 触发 reportCanZoom 把 canZoom 修正成准确值. 但 key-reused side→center 节点 src 不变,
  // 浏览器不派发 onLoad → reportCanZoom 永不调用 → 小图切到时 canZoom 卡在 true → 放大按钮
  // 不禁用, 空格键也能错误进入 zoom. 修复: 在 cdU 切页路径补一次 reportCanZoom, 让
  // handleResize / handleImageLoad / 切页 三个触发源都收敛到 reportCanZoom.

  type Dim = { w: number, h: number }
  const stripQuery = (s: string) => s.split('?')[0]
  const mockImageDimensionsBySrc = (mapping: Record<string, Dim>) => {
    const origW = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const origH = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const origC = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete')
    const lookup = (img: HTMLImageElement) => mapping[stripQuery(img.getAttribute('src') || img.src || '')]
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.w ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.h ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement) !== undefined },
    })
    return () => {
      if (origW) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', origW)
      else delete (HTMLImageElement.prototype as any).naturalWidth
      if (origH) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', origH)
      else delete (HTMLImageElement.prototype as any).naturalHeight
      if (origC) Object.defineProperty(HTMLImageElement.prototype, 'complete', origC)
      else delete (HTMLImageElement.prototype as any).complete
    }
  }
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  it("从大图 (canZoom=true) 切到小图 (key-reuse 路径) 后, 放大按钮立刻进入禁用态", async () => {
    const BIG = 'https://example.com/big.jpg'
    const SMALL = 'https://example.com/small.jpg'
    const restore = mockImageDimensionsBySrc({
      [BIG]: { w: 5000, h: 5000 },     // 远大于 viewport 1024 → canZoom=true
      [SMALL]: { w: 500, h: 500 },     // 远小于 viewport → canZoom=false
    })
    const origCW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const origCH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(
        <Zmage src={BIG} alt="zoom-conv" preset="desktop"
          set={[{ src: BIG, alt: 'big' }, { src: SMALL, alt: 'small' }]}/>
      )
      fireEvent.click(screen.getByAltText('zoom-conv'))
      await wait(50)

      // 让 page 0 (big) onLoad 触发 handleImageLoad → reportCanZoom → canZoom=true
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 50)) })

      const zoomBtn = document.getElementById('zmageControlZoom') as HTMLDivElement
      expect(zoomBtn).toBeTruthy()
      // big 图: canZoom=true, 按钮不应有 disabled class
      expect(zoomBtn.className).not.toContain('disabled')

      // 切到 page 1 (small). 这是 step+1 in-range, 旧 step+1 side[small] 节点会被 React key 复用
      // 为新 center → src 不变 → 浏览器不派发 onLoad → handleImageLoad 不会调用 reportCanZoom
      // → 修复前 canZoom 卡在 true (bug); 修复后 cdU 路径补的 reportCanZoom 把 canZoom 修成 false.
      clickById('zmageControlFlipRight')
      await wait(20)

      // 关键回归断言
      expect(zoomBtn.className).toContain('disabled')
    } finally {
      restore()
      if (origCW) Object.defineProperty(HTMLElement.prototype, 'clientWidth', origCW)
      if (origCH) Object.defineProperty(HTMLElement.prototype, 'clientHeight', origCH)
    }
  })

  it("从小图 (canZoom=false) 切到大图 (key-reuse 路径) 后, 放大按钮立刻解除禁用", async () => {
    // 反向案例: 确保收敛是双向的 — 小→大 也能正确更新 canZoom
    const BIG = 'https://example.com/big2.jpg'
    const SMALL = 'https://example.com/small2.jpg'
    const restore = mockImageDimensionsBySrc({
      [BIG]: { w: 5000, h: 5000 },
      [SMALL]: { w: 500, h: 500 },
    })
    const origCW = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const origCH = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1024 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 768 })

    try {
      render(
        <Zmage src={SMALL} alt="zoom-conv-r" preset="desktop"
          set={[{ src: SMALL, alt: 'small' }, { src: BIG, alt: 'big' }]}/>
      )
      fireEvent.click(screen.getByAltText('zoom-conv-r'))
      await wait(50)

      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 50)) })

      const zoomBtn = document.getElementById('zmageControlZoom') as HTMLDivElement
      // small 图: canZoom=false, 按钮应有 disabled class
      expect(zoomBtn.className).toContain('disabled')

      // 切到 page 1 (big). 同 key-reuse 场景.
      clickById('zmageControlFlipRight')
      await wait(20)

      // canZoom 应被修正成 true → 按钮解除 disabled
      expect(zoomBtn.className).not.toContain('disabled')
    } finally {
      restore()
      if (origCW) Object.defineProperty(HTMLElement.prototype, 'clientWidth', origCW)
      if (origCH) Object.defineProperty(HTMLElement.prototype, 'clientHeight', origCH)
    }
  })
})

describe('Zmage Loading 显示策略 (anti-flicker, loadingDelay prop)', () => {
  // 真实回归: 切页时 handleImageLoadStart 同步 setState({isFetching: true}), 加 500ms polling
  // 兜底, 缓存图切页会 flash Loading ~500ms. 修复: 切页 cdU 中检查 node.complete,
  //   - 完成 → handleImageLoadEnd 直接走 fast-path, Loading 完全不显示
  //   - 未完成 → handleImageLoadStart 推迟 isFetching=true 到 loadingDelay (默认 200ms) 后,
  //              且若 image 在延迟内通过 onLoad 完成, cancel timer → Loading 仍永不显示
  // 业界参考: Ant Design Spin (delay prop) / react-loadable (delay 200ms 默认) / TanStack Query
  // (placeholderData) / React Suspense (useTransition).

  type Dim = { w: number, h: number }
  const stripQuery = (s: string) => s.split('?')[0]
  const mockImageDimensionsBySrc = (mapping: Record<string, Dim>) => {
    const origW = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth')
    const origH = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalHeight')
    const origC = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete')
    const lookup = (img: HTMLImageElement) => mapping[stripQuery(img.getAttribute('src') || img.src || '')]
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.w ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement)?.h ?? 0 },
    })
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get () { return lookup(this as HTMLImageElement) !== undefined },
    })
    return () => {
      if (origW) Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', origW)
      else delete (HTMLImageElement.prototype as any).naturalWidth
      if (origH) Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', origH)
      else delete (HTMLImageElement.prototype as any).naturalHeight
      if (origC) Object.defineProperty(HTMLImageElement.prototype, 'complete', origC)
      else delete (HTMLImageElement.prototype as any).complete
    }
  }
  const wait = async (ms: number) => {
    await act(async () => { await new Promise(r => setTimeout(r, ms)) })
  }

  it("缓存图切页 (fast-path) 全程不显示 Loading", async () => {
    const A = 'https://example.com/cached-a.jpg'
    const B = 'https://example.com/cached-b.jpg'
    const restore = mockImageDimensionsBySrc({
      [A]: { w: 1000, h: 1000 },
      [B]: { w: 1500, h: 1500 },
    })

    try {
      render(
        <Zmage src={A} alt="cached" preset="desktop" animate={{ flip: 'crossFade' }}
          set={[{ src: A }, { src: B }]}/>
      )
      fireEvent.click(screen.getByAltText('cached'))
      await wait(50)

      // 让 page 0 onLoad 触发, 清除初始 isFetching
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 50)) })
      expect(document.getElementById('zmageLoading')).toBeNull()

      // 切到 page 1 — 缓存图 + key-reuse → cdU fast-path 立即 handleImageLoadEnd → 永不显示 Loading
      clickById('zmageControlFlipRight')

      // 立即检查 (sync 后): Loading 不应出现
      expect(document.getElementById('zmageLoading')).toBeNull()

      // 等待超过默认 loadingDelay (200ms) — 仍不应出现
      await wait(250)
      expect(document.getElementById('zmageLoading')).toBeNull()
    } finally {
      restore()
    }
  })

  it("loadingDelay prop 生效: 自定义 50ms 延迟下, 未完成图片在 50ms 后显示 Loading", async () => {
    // 方法: 一张图在 mock 中 (complete=true), 另一张不在 (complete=false → 走 slow path)
    const CACHED = 'https://example.com/cached-2.jpg'
    const UNCACHED = 'https://example.com/uncached-2.jpg'
    const restore = mockImageDimensionsBySrc({ [CACHED]: { w: 1000, h: 1000 } })

    try {
      render(
        <Zmage src={CACHED} alt="prop" preset="desktop" animate={{ flip: 'none' }}
          loadingDelay={50}
          set={[{ src: CACHED }, { src: UNCACHED }]}/>
      )
      fireEvent.click(screen.getByAltText('prop'))
      await wait(50)
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 50)) })

      // 切到 uncached 页. flip='none' 保证新 center 是 fresh mount, complete=false.
      clickById('zmageControlFlipRight')

      // delay 内 (20ms < 50ms): Loading 不应出现
      await wait(20)
      expect(document.getElementById('zmageLoading')).toBeNull()

      // 超过 delay (60ms 总, > 50ms): Loading 应出现
      await wait(50)
      expect(document.getElementById('zmageLoading')).toBeTruthy()
    } finally {
      restore()
    }
  })

  it("loadingDelay 内 onLoad 触发 → cancel timer, Loading 永不出现 (fast-load)", async () => {
    // 方法: loadingDelay 较长 (200ms), 切到 fresh-mount, 在 delay 内 fireEvent.load → 应取消 timer
    const A = 'https://example.com/fast-a.jpg'
    const B = 'https://example.com/fast-b.jpg'
    const restoreA = mockImageDimensionsBySrc({ [A]: { w: 1000, h: 1000 } })

    try {
      render(
        <Zmage src={A} alt="fast" preset="desktop" animate={{ flip: 'none' }}
          loadingDelay={200}
          set={[{ src: A }, { src: B }]}/>
      )
      fireEvent.click(screen.getByAltText('fast'))
      await wait(50)
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 50)) })

      // 切到 page 1. flip='none' fresh mount + B 不在 mapping → complete=false → slow path.
      clickById('zmageControlFlipRight')

      // delay 内 (50ms < 200ms): Loading 不应出现 (timer 还没触发)
      await wait(50)
      expect(document.getElementById('zmageLoading')).toBeNull()

      // 此刻把 B 加进 mapping 模拟 onLoad fire (避免直接 fireEvent.load — 因为现实 jsdom 中 fireEvent.load 已经在我们 fix 中调 handleImageLoadEnd)
      restoreA()  // 清除旧 mock
      const restoreB = mockImageDimensionsBySrc({ [A]: { w: 1000, h: 1000 }, [B]: { w: 800, h: 800 } })
      try {
        const center1 = document.getElementById('zmageImage') as HTMLImageElement
        await act(async () => {
          fireEvent.load(center1)
          await new Promise(r => setTimeout(r, 5))
        })

        // delay timer 应被 onLoad → handleImageLoadEnd cancel → Loading 永不出现
        // 等到原 delay 后窗口 (250ms 总), 仍不应出现
        await wait(200)
        expect(document.getElementById('zmageLoading')).toBeNull()
      } finally {
        restoreB()
      }
    } catch (e) {
      restoreA()
      throw e
    }
  })

  it("StrictMode unmount: loadingShowDelayTimer 被 clearTimeout 不泄漏", async () => {
    const A = 'https://example.com/leak-a.jpg'
    const B = 'https://example.com/leak-b.jpg'
    const restore = mockImageDimensionsBySrc({ [A]: { w: 1000, h: 1000 } })  // 仅 A

    try {
      const { unmount } = render(
        <Zmage src={A} alt="leak" preset="desktop" animate={{ flip: 'none' }}
          loadingDelay={500}  // 较长延迟, 确保 timer 在 unmount 前还活着
          set={[{ src: A }, { src: B }]}/>
      )
      fireEvent.click(screen.getByAltText('leak'))
      await wait(50)
      const center0 = document.getElementById('zmageImage') as HTMLImageElement
      await act(async () => { fireEvent.load(center0); await new Promise(r => setTimeout(r, 30)) })

      // 切到 uncached → schedules 500ms delay timer
      clickById('zmageControlFlipRight')
      await wait(50)

      // unmount 在 timer 触发前
      unmount()

      // 等够 timer 时间 — 不应有任何 setState 报错或残留 #zmageLoading
      await wait(600)
      expect(document.getElementById('zmageLoading')).toBeNull()
      expect(document.getElementById('zmage')).toBeNull()
    } finally {
      restore()
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

  it('closing-follow RAF 同步写入 clip-path 和 border-radius', async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const originalClientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 800 })

    try {
      render(<Zmage src="https://example.com/raf-clip.jpg" alt="raf-clip" preset="desktop"/>)
      const cover = screen.getByAltText('raf-clip') as HTMLImageElement
      Object.defineProperty(cover, 'naturalWidth', { value: 1000, configurable: true })
      Object.defineProperty(cover, 'naturalHeight', { value: 500, configurable: true })
      cover.style.objectFit = 'cover'
      cover.style.objectPosition = '50% 50%'
      cover.style.borderRadius = '12px'
      const coverBox = installMutableCoverBCR(cover)
      coverBox.left = 400
      coverBox.top = 300
      coverBox.width = 200
      coverBox.height = 200

      fireEvent.click(cover)
      await wait(80)

      clickById('zmageControlClose')
      await wait(80)

      const center = document.getElementById('zmageImage') as HTMLImageElement
      expect(center.style.transition).toBe('none')
      expect(center.style.clipPath).toContain('inset(')
      expect(center.style.clipPath).toContain('round')
      expect(center.style.borderRadius).not.toBe('')
    } finally {
      if (originalClientWidth) { Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth) } else { delete (HTMLElement.prototype as any).clientWidth }
      if (originalClientHeight) { Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeight) } else { delete (HTMLElement.prototype as any).clientHeight }
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
