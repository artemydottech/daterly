import { describe, it, expect } from 'vitest'
import { enUS } from 'date-fns/locale'
import {
  applyMask,
  getCursorPos,
  parseDateTime,
  resolveTimeFormat,
  toDateOnly,
} from './date-mask'
import { buildFormatSchema } from './format-schema'

const ruSchema = buildFormatSchema('dd.MM.yyyy', null)
const ruSchemaHM = buildFormatSchema('dd.MM.yyyy', 'HH:mm')
const ruSchemaHMS = buildFormatSchema('dd.MM.yyyy', 'HH:mm:ss')
const usSchema = buildFormatSchema('MM/dd/yyyy', null, enUS)
const isoSchema = buildFormatSchema('yyyy-MM-dd', null, enUS)

describe('resolveTimeFormat', () => {
  it('returns null when showTime is falsy', () => {
    expect(resolveTimeFormat(undefined)).toBe(null)
    expect(resolveTimeFormat(false)).toBe(null)
  })

  it('returns HH:mm:ss when showTime is true', () => {
    expect(resolveTimeFormat(true)).toBe('HH:mm:ss')
  })

  it('returns format from object', () => {
    expect(resolveTimeFormat({ format: 'HH:mm' })).toBe('HH:mm')
    expect(resolveTimeFormat({ format: 'HH:mm:ss' })).toBe('HH:mm:ss')
  })
})

describe('applyMask', () => {
  it('returns empty string for no digits', () => {
    expect(applyMask('', ruSchema)).toBe('')
  })

  it('builds partial mask without separators yet', () => {
    expect(applyMask('01', ruSchema)).toBe('01')
    expect(applyMask('010', ruSchema)).toBe('01.0')
    expect(applyMask('0101', ruSchema)).toBe('01.01')
    expect(applyMask('01011', ruSchema)).toBe('01.01.1')
  })

  it('produces a full date mask', () => {
    expect(applyMask('01012024', ruSchema)).toBe('01.01.2024')
  })

  it('produces full mask for MM/dd/yyyy', () => {
    expect(applyMask('01152024', usSchema)).toBe('01/15/2024')
  })

  it('produces full mask for yyyy-MM-dd', () => {
    expect(applyMask('20240115', isoSchema)).toBe('2024-01-15')
  })

  it('inserts space and colons for HH:mm', () => {
    expect(applyMask('010120241430', ruSchemaHM)).toBe('01.01.2024 14:30')
  })

  it('inserts seconds separator for HH:mm:ss', () => {
    expect(applyMask('01012024143045', ruSchemaHMS)).toBe('01.01.2024 14:30:45')
  })

  it('respects digitCount by truncating', () => {
    expect(applyMask('010120241430459999', ruSchemaHM)).toBe('01.01.2024 14:30')
  })
})

describe('getCursorPos', () => {
  it('returns 0 for zero digit count', () => {
    expect(getCursorPos('01.01.2024', 0)).toBe(0)
  })

  it('returns correct position before first separator', () => {
    expect(getCursorPos('01.01.2024', 2)).toBe(2)
  })

  it('returns correct position after first separator', () => {
    expect(getCursorPos('01.01.2024', 3)).toBe(4)
  })

  it('returns correct position after second separator', () => {
    expect(getCursorPos('01.01.2024', 5)).toBe(7)
  })

  it('returns string length when digitCount exceeds digits in string', () => {
    expect(getCursorPos('01.01', 10)).toBe(5)
  })
})

describe('toDateOnly', () => {
  it('preserves year, month, day', () => {
    const result = toDateOnly(new Date(2024, 2, 15, 9, 30, 0))
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(2)
    expect(result.getDate()).toBe(15)
  })

  it('normalizes time to noon to avoid DST issues', () => {
    const result = toDateOnly(new Date(2024, 0, 1, 0, 0, 0))
    expect(result.getHours()).toBe(12)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
  })
})

describe('parseDateTime', () => {
  it('returns undefined for incomplete input', () => {
    expect(parseDateTime('01.01', ruSchema)).toBeUndefined()
    expect(parseDateTime('', ruSchema)).toBeUndefined()
  })

  it('returns undefined for invalid day', () => {
    expect(parseDateTime('32.01.2024', ruSchema)).toBeUndefined()
  })

  it('returns undefined for invalid month', () => {
    expect(parseDateTime('01.13.2024', ruSchema)).toBeUndefined()
  })

  it('parses a valid date and normalizes to noon', () => {
    const result = parseDateTime('15.03.2024', ruSchema)
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
    expect(result?.getFullYear()).toBe(2024)
    expect(result?.getHours()).toBe(12)
  })

  it('parses datetime with HH:mm', () => {
    const result = parseDateTime('15.03.2024 14:30', ruSchemaHM)
    expect(result).toBeDefined()
    expect(result?.getHours()).toBe(14)
    expect(result?.getMinutes()).toBe(30)
  })

  it('parses datetime with HH:mm:ss', () => {
    const result = parseDateTime('15.03.2024 14:30:45', ruSchemaHMS)
    expect(result).toBeDefined()
    expect(result?.getSeconds()).toBe(45)
  })

  it('returns undefined for impossible date like Feb 30', () => {
    expect(parseDateTime('30.02.2024', ruSchema)).toBeUndefined()
  })

  it('parses MM/dd/yyyy format', () => {
    const result = parseDateTime('03/15/2024', usSchema)
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
  })

  it('parses yyyy-MM-dd format', () => {
    const result = parseDateTime('2024-03-15', isoSchema)
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
  })
})
