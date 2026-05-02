import { describe, expect, test } from 'vitest'
import { cx } from '../utils'

describe('cx', () => {
  test('joins string classes and ignores empty values', () => {
    expect(cx('base', undefined, null, false, '', 'visible')).toBe('base visible')
  })

  test('includes object keys only when their value is truthy', () => {
    expect(cx('base', { visible: true, hidden: false, active: 1, empty: 0 })).toBe('base visible active')
  })
})
