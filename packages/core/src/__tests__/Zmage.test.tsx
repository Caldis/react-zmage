/**
 * 基础渲染测试 — 覆盖 mount/unmount/StrictMode 场景
 */
import React, { StrictMode } from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import Zmage from '../Zmage'
import { resolvePreset } from '../types/default'

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
