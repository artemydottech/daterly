import { describe, it, expect } from 'vitest'
import { enUS } from 'date-fns/locale'
import {
  applyDateMask,
  applyRangeMask,
  formatRange,
  getRangeCursorPos,
  parseDate,
  resolveShowSeconds,
} from './range-mask'
import { buildFormatSchema } from './format-schema'

const ruSchema = buildFormatSchema('dd.MM.yyyy', null)
const usSchema = buildFormatSchema('MM/dd/yyyy', null, enUS)

describe('applyDateMask', () => {
  it('returns empty string for no input', () => {
    expect(applyDateMask('', ruSchema)).toBe('')
  })

  it('adds dots at correct positions', () => {
    expect(applyDateMask('01', ruSchema)).toBe('01')
    expect(applyDateMask('010', ruSchema)).toBe('01.0')
    expect(applyDateMask('0101', ruSchema)).toBe('01.01')
    expect(applyDateMask('01011', ruSchema)).toBe('01.01.1')
    expect(applyDateMask('01012024', ruSchema)).toBe('01.01.2024')
  })

  it('limits output to digitCount', () => {
    expect(applyDateMask('010120241234', ruSchema)).toBe('01.01.2024')
  })

  it('works with MM/dd/yyyy', () => {
    expect(applyDateMask('01152024', usSchema)).toBe('01/15/2024')
  })
})

describe('applyRangeMask', () => {
  it('returns only from-date when no to-digits', () => {
    expect(applyRangeMask('01012024', ruSchema)).toBe('01.01.2024')
  })

  it('returns partial from-date', () => {
    expect(applyRangeMask('01012', ruSchema)).toBe('01.01.2')
  })

  it('shows separator and partial to-date', () => {
    expect(applyRangeMask('010120243112', ruSchema)).toBe('01.01.2024 — 31.12')
  })

  it('shows full range', () => {
    expect(applyRangeMask('0101202431122024', ruSchema)).toBe('01.01.2024 — 31.12.2024')
  })

  it('limits to digitCount * 2', () => {
    expect(applyRangeMask('010120243112202499', ruSchema)).toBe(
      '01.01.2024 — 31.12.2024',
    )
  })

  it('handles US format range', () => {
    expect(applyRangeMask('0115202412312024', usSchema)).toBe('01/15/2024 — 12/31/2024')
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
    expect(getRangeCursorPos(masked, 9)).toBe(14)
  })

  it('returns string length when count exceeds digits', () => {
    const masked = '01.01.2024'
    expect(getRangeCursorPos(masked, 20)).toBe(masked.length)
  })
})

describe('parseDate', () => {
  it('returns undefined for incomplete input', () => {
    expect(parseDate('', ruSchema)).toBeUndefined()
    expect(parseDate('01.01', ruSchema)).toBeUndefined()
    expect(parseDate('01.01.202', ruSchema)).toBeUndefined()
  })

  it('returns undefined for invalid date', () => {
    expect(parseDate('32.01.2024', ruSchema)).toBeUndefined()
    expect(parseDate('30.02.2024', ruSchema)).toBeUndefined()
  })

  it('parses a valid date and normalizes to noon', () => {
    const result = parseDate('15.03.2024', ruSchema)
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
    expect(result?.getFullYear()).toBe(2024)
    expect(result?.getHours()).toBe(12)
  })

  it('parses MM/dd/yyyy', () => {
    const result = parseDate('03/15/2024', usSchema)
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
  })
})

describe('formatRange', () => {
  it('returns empty string when from is undefined', () => {
    expect(formatRange(undefined, undefined, ruSchema)).toBe('')
  })

  it('returns from date only when to is undefined', () => {
    expect(formatRange(new Date(2024, 0, 1, 12, 0, 0), undefined, ruSchema)).toBe(
      '01.01.2024',
    )
  })

  it('returns full range string with em-dash separator', () => {
    const from = new Date(2024, 0, 1, 12, 0, 0)
    const to = new Date(2024, 11, 31, 12, 0, 0)
    expect(formatRange(from, to, ruSchema)).toBe('01.01.2024 — 31.12.2024')
  })

  it('formats range in US format', () => {
    const from = new Date(2024, 0, 1, 12, 0, 0)
    const to = new Date(2024, 11, 31, 12, 0, 0)
    expect(formatRange(from, to, usSchema)).toBe('01/01/2024 — 12/31/2024')
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
