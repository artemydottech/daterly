import { describe, it, expect } from 'vitest'
import {
  applyDateMask,
  applyRangeMask,
  formatRange,
  getRangeCursorPos,
  parseDate,
  resolveShowSeconds,
} from './range-mask'

describe('applyDateMask', () => {
  it('returns empty string for no input', () => {
    expect(applyDateMask('')).toBe('')
  })

  it('adds dots at correct positions', () => {
    expect(applyDateMask('01')).toBe('01')
    expect(applyDateMask('010')).toBe('01.0')
    expect(applyDateMask('0101')).toBe('01.01')
    expect(applyDateMask('01011')).toBe('01.01.1')
    expect(applyDateMask('01012024')).toBe('01.01.2024')
  })

  it('limits output to 8 digits', () => {
    expect(applyDateMask('010120241234')).toBe('01.01.2024')
  })
})

describe('applyRangeMask', () => {
  it('returns only from-date when no to-digits', () => {
    expect(applyRangeMask('01012024')).toBe('01.01.2024')
  })

  it('returns partial from-date', () => {
    expect(applyRangeMask('01012')).toBe('01.01.2')
  })

  it('shows separator and partial to-date', () => {
    expect(applyRangeMask('010120243112')).toBe('01.01.2024 — 31.12')
  })

  it('shows full range', () => {
    expect(applyRangeMask('0101202431122024')).toBe('01.01.2024 — 31.12.2024')
  })

  it('limits to 16 digits', () => {
    expect(applyRangeMask('010120243112202499')).toBe('01.01.2024 — 31.12.2024')
  })
})

describe('getRangeCursorPos', () => {
  it('returns 0 for zero count', () => {
    expect(getRangeCursorPos('01.01.2024 — 31.12.2024', 0)).toBe(0)
  })

  it('positions correctly in the from-date', () => {
    expect(getRangeCursorPos('01.01.2024 — 31.12.2024', 2)).toBe(2)
    expect(getRangeCursorPos('01.01.2024 — 31.12.2024', 3)).toBe(4)
  })

  it('positions correctly in the to-date (skips em-dash separator)', () => {
    const masked = '01.01.2024 — 31.12.2024'
    // 9th digit is '3' in '31' of the to-date — cursor sits after it at index 14
    expect(getRangeCursorPos(masked, 9)).toBe(14)
  })

  it('returns string length when count exceeds digits', () => {
    const masked = '01.01.2024'
    expect(getRangeCursorPos(masked, 20)).toBe(masked.length)
  })
})

describe('parseDate', () => {
  it('returns undefined for incomplete input', () => {
    expect(parseDate('')).toBeUndefined()
    expect(parseDate('01.01')).toBeUndefined()
    expect(parseDate('01.01.202')).toBeUndefined()
  })

  it('returns undefined for invalid date', () => {
    expect(parseDate('32.01.2024')).toBeUndefined()
    expect(parseDate('30.02.2024')).toBeUndefined()
  })

  it('parses a valid date and normalizes to noon', () => {
    const result = parseDate('15.03.2024')
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
    expect(result?.getFullYear()).toBe(2024)
    expect(result?.getHours()).toBe(12)
  })
})

describe('formatRange', () => {
  it('returns empty string when from is undefined', () => {
    expect(formatRange(undefined, undefined)).toBe('')
  })

  it('returns from date only when to is undefined', () => {
    expect(formatRange(new Date(2024, 0, 1, 12, 0, 0), undefined)).toBe('01.01.2024')
  })

  it('returns full range string with em-dash separator', () => {
    const from = new Date(2024, 0, 1, 12, 0, 0)
    const to = new Date(2024, 11, 31, 12, 0, 0)
    expect(formatRange(from, to)).toBe('01.01.2024 — 31.12.2024')
  })
})

describe('resolveShowSeconds', () => {
  it('returns false for falsy showTime', () => {
    expect(resolveShowSeconds(undefined)).toBe(false)
    expect(resolveShowSeconds(false)).toBe(false)
  })

  it('returns true when showTime is boolean true', () => {
    expect(resolveShowSeconds(true)).toBe(true)
  })

  it('returns false for HH:mm format', () => {
    expect(resolveShowSeconds({ format: 'HH:mm' })).toBe(false)
  })

  it('returns true for HH:mm:ss format', () => {
    expect(resolveShowSeconds({ format: 'HH:mm:ss' })).toBe(true)
  })
})
