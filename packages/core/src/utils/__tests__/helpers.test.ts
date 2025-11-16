import { describe, expect, it } from 'vitest'
import { calcFitScale, getTargetPage } from '../../utils'

describe('calcFitScale', () => {
  it('returns a minimal scale increment when image already fits viewport', () => {
    expect(calcFitScale(100, 100, 0)).toBeCloseTo(0.002, 5)
  })

  it('respects edge padding and keeps scale under or equal to 1', () => {
    const scale = calcFitScale(2000, 1200, 50)
    expect(scale).toBeLessThanOrEqual(1)
    expect(scale).toBeGreaterThan(0)
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
