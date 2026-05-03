import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { calcFitScale, computeMinPageDistance, getTargetPage, resolveShortestStep } from '../../utils'

describe('calcFitScale', () => {
  let originalClientWidthDescriptor: PropertyDescriptor | undefined
  let originalClientHeightDescriptor: PropertyDescriptor | undefined

  beforeEach(() => {
    originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    originalClientHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { value: 1000, configurable: true })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { value: 800, configurable: true })
  })

  afterEach(() => {
    if (originalClientWidthDescriptor) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidthDescriptor)
    if (originalClientHeightDescriptor) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalClientHeightDescriptor)
  })

  it('returns 1 when image already fits the edge-safe viewport', () => {
    expect(calcFitScale(100, 100, 0)).toBe(1)
  })

  it('respects edge padding as viewport margin', () => {
    const scale = calcFitScale(2000, 1200, 50)
    const marginX = (1000 - 2000 * scale) / 2

    expect(scale).toBeCloseTo(0.45, 5)
    expect(marginX).toBeCloseTo(50, 5)
  })
})

describe('getTargetPage', () => {
  it('wraps around when loop is enabled', () => {
    expect(getTargetPage(0, 5, -1, { loop: true })).toBe(4)
    expect(getTargetPage(4, 5, 1, { loop: true })).toBe(0)
  })

  it('returns undefined when moving out of range without loop', () => {
    expect(getTargetPage(0, 3, -1, { loop: false })).toBeUndefined()
  })

  it('moves forward within bounds when loop disabled', () => {
    expect(getTargetPage(1, 4, 1, { loop: false })).toBe(2)
  })
})

describe('resolveShortestStep (loop-aware 最短路径解析)', () => {
  it('正向已是最短: raw 在 [-N/2, N/2] 内不变', () => {
    expect(resolveShortestStep(1, 6)).toBe(1)
    expect(resolveShortestStep(2, 6)).toBe(2)
    expect(resolveShortestStep(-1, 6)).toBe(-1)
    expect(resolveShortestStep(-2, 6)).toBe(-2)
  })
  it('正向超过半圈: 反向 wrap 更短', () => {
    expect(resolveShortestStep(5, 6)).toBe(-1)   // 0→5 等于 -1 wrap
    expect(resolveShortestStep(4, 6)).toBe(-2)   // 0→4 等于 -2 wrap
    expect(resolveShortestStep(7, 8)).toBe(-1)
    expect(resolveShortestStep(9, 10)).toBe(-1)
  })
  it('反向超过半圈: 正向 wrap 更短', () => {
    expect(resolveShortestStep(-5, 6)).toBe(1)   // 5→0 等于 +1 wrap
    expect(resolveShortestStep(-4, 6)).toBe(2)
    expect(resolveShortestStep(-9, 10)).toBe(1)
  })
  it('正反向距离相等时取正向 (≤)', () => {
    expect(resolveShortestStep(3, 6)).toBe(3)    // 0→3, |+3|=|-3|, 取正
    expect(resolveShortestStep(-3, 6)).toBe(3)   // 由 mod 计算: ((-3)%6+6)%6 = 3, backward = -3, abs 相等取 forward
    expect(resolveShortestStep(5, 10)).toBe(5)   // |+5|=|-5|, 取正
  })
  it('N=2/3 边界', () => {
    expect(resolveShortestStep(1, 2)).toBe(1)
    expect(resolveShortestStep(-1, 2)).toBe(1)   // 1→0 等于 +1 wrap
    expect(resolveShortestStep(2, 3)).toBe(-1)   // 0→2, forward=2, backward=-1, 取 -1
    expect(resolveShortestStep(-2, 3)).toBe(1)
  })
  it('N≤1 退化为 raw 返回', () => {
    expect(resolveShortestStep(5, 1)).toBe(5)
    expect(resolveShortestStep(-3, 0)).toBe(-3)
  })
})

describe('computeMinPageDistance (页距 — 跳页 fade 触发判定的核心)', () => {
  it('loop=false 用绝对差', () => {
    expect(computeMinPageDistance(0, 3, 6, false)).toBe(3)
    expect(computeMinPageDistance(0, 5, 6, false)).toBe(5)
    expect(computeMinPageDistance(2, 0, 6, false)).toBe(2)
  })
  it('loop=true 用最短路径', () => {
    expect(computeMinPageDistance(0, 5, 6, true)).toBe(1)   // wrap, 修复 Issue 2
    expect(computeMinPageDistance(0, 4, 6, true)).toBe(2)   // wrap 仍在预取环
    expect(computeMinPageDistance(0, 3, 6, true)).toBe(3)   // 真正跳页 (=user 的 sweep 案例)
    expect(computeMinPageDistance(5, 0, 6, true)).toBe(1)   // wrap
  })
  it('N=10 边界 (Issue 1 typical)', () => {
    expect(computeMinPageDistance(1, 6, 10, true)).toBe(5)  // |+5|=|-5|, 跳页
    expect(computeMinPageDistance(0, 8, 10, true)).toBe(2)  // wrap shorter, 不跳
    expect(computeMinPageDistance(0, 9, 10, true)).toBe(1)  // wrap shorter, 不跳
  })
})
