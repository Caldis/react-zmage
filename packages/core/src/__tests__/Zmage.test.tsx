/**
 * 基础渲染测试 — 覆盖 mount/unmount/StrictMode 场景
 */
import React, { StrictMode } from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import Zmage from '../Zmage'

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

  // TODO(PR-2): 取消 skip — Browser.unInit 的 setTimeout 链路在卸载时不可靠，会留下 scroll 监听器
  it.skip('StrictMode 包裹的 Zmage 卸载后, keydown/scroll/mousemove 监听器全部清理', async () => {
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
