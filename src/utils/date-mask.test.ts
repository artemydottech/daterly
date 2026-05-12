import { describe, it, expect } from 'vitest'
import {
  applyMask,
  buildDateFormat,
  buildMaxDigits,
  buildPlaceholder,
  getCursorPos,
  parseDateTime,
  resolveTimeFormat,
  toDateOnly,
} from './date-mask'

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

describe('buildDateFormat', () => {
  it('returns date-only format when no time', () => {
    expect(buildDateFormat(null)).toBe('dd.MM.yyyy')
  })

  it('appends time format', () => {
    expect(buildDateFormat('HH:mm')).toBe('dd.MM.yyyy HH:mm')
    expect(buildDateFormat('HH:mm:ss')).toBe('dd.MM.yyyy HH:mm:ss')
  })
})

describe('buildMaxDigits', () => {
  it('returns 8 for date only', () => {
    expect(buildMaxDigits(null)).toBe(8)
  })

  it('returns 12 for HH:mm', () => {
    expect(buildMaxDigits('HH:mm')).toBe(12)
  })

  it('returns 14 for HH:mm:ss', () => {
    expect(buildMaxDigits('HH:mm:ss')).toBe(14)
  })
})

describe('buildPlaceholder', () => {
  it('returns date placeholder', () => {
    expect(buildPlaceholder(null)).toBe('дд.мм.гггг')
  })

  it('returns datetime placeholder for HH:mm', () => {
    expect(buildPlaceholder('HH:mm')).toBe('дд.мм.гггг чч:мм')
  })

  it('returns datetime placeholder for HH:mm:ss', () => {
    expect(buildPlaceholder('HH:mm:ss')).toBe('дд.мм.гггг чч:мм:сс')
  })
})

describe('applyMask', () => {
  it('returns empty string for no digits', () => {
    expect(applyMask('', 8)).toBe('')
  })

  it('builds partial mask without separators yet', () => {
    expect(applyMask('01', 8)).toBe('01')
    expect(applyMask('010', 8)).toBe('01.0')
    expect(applyMask('0101', 8)).toBe('01.01')
    expect(applyMask('01011', 8)).toBe('01.01.1')
  })

  it('produces a full date mask', () => {
    expect(applyMask('01012024', 8)).toBe('01.01.2024')
  })

  it('inserts space and colons for HH:mm', () => {
    expect(applyMask('010120241430', 12)).toBe('01.01.2024 14:30')
  })

  it('inserts seconds separator for HH:mm:ss', () => {
    expect(applyMask('01012024143045', 14)).toBe('01.01.2024 14:30:45')
  })

  it('respects maxDigits by truncating', () => {
    expect(applyMask('010120241430459999', 12)).toBe('01.01.2024 14:30')
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
    expect(parseDateTime('01.01', 'dd.MM.yyyy', 8)).toBeUndefined()
    expect(parseDateTime('', 'dd.MM.yyyy', 8)).toBeUndefined()
  })

  it('returns undefined for invalid day', () => {
    expect(parseDateTime('32.01.2024', 'dd.MM.yyyy', 8)).toBeUndefined()
  })

  it('returns undefined for invalid month', () => {
    expect(parseDateTime('01.13.2024', 'dd.MM.yyyy', 8)).toBeUndefined()
  })

  it('parses a valid date and normalizes to noon', () => {
    const result = parseDateTime('15.03.2024', 'dd.MM.yyyy', 8)
    expect(result).toBeDefined()
    expect(result?.getDate()).toBe(15)
    expect(result?.getMonth()).toBe(2)
    expect(result?.getFullYear()).toBe(2024)
    expect(result?.getHours()).toBe(12)
  })

  it('parses datetime with HH:mm', () => {
    const result = parseDateTime('15.03.2024 14:30', 'dd.MM.yyyy HH:mm', 12)
    expect(result).toBeDefined()
    expect(result?.getHours()).toBe(14)
    expect(result?.getMinutes()).toBe(30)
  })

  it('parses datetime with HH:mm:ss', () => {
    const result = parseDateTime('15.03.2024 14:30:45', 'dd.MM.yyyy HH:mm:ss', 14)
    expect(result).toBeDefined()
    expect(result?.getSeconds()).toBe(45)
  })

  it('returns undefined for impossible date like Feb 30', () => {
    expect(parseDateTime('30.02.2024', 'dd.MM.yyyy', 8)).toBeUndefined()
  })
})
