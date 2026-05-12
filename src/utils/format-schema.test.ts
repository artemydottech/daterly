import { describe, it, expect } from 'vitest'
import { enUS, ru, de } from 'date-fns/locale'
import { applySchemaMask, buildFormatSchema } from './format-schema'

describe('buildFormatSchema', () => {
  it('builds schema for dd.MM.yyyy (default, ru)', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null)
    expect(s.format).toBe('dd.MM.yyyy')
    expect(s.digitCount).toBe(8)
    expect(s.separators).toEqual([
      { afterDigit: 2, chars: '.' },
      { afterDigit: 4, chars: '.' },
    ])
    expect(s.placeholder).toBe('дд.мм.гггг')
  })

  it('uses english placeholders for non-ru locale', () => {
    const s = buildFormatSchema('MM/dd/yyyy', null, enUS)
    expect(s.format).toBe('MM/dd/yyyy')
    expect(s.digitCount).toBe(8)
    expect(s.separators).toEqual([
      { afterDigit: 2, chars: '/' },
      { afterDigit: 4, chars: '/' },
    ])
    expect(s.placeholder).toBe('mm/dd/yyyy')
  })

  it('handles yyyy-MM-dd (ISO)', () => {
    const s = buildFormatSchema('yyyy-MM-dd', null, enUS)
    expect(s.digitCount).toBe(8)
    expect(s.separators).toEqual([
      { afterDigit: 4, chars: '-' },
      { afterDigit: 6, chars: '-' },
    ])
    expect(s.placeholder).toBe('yyyy-mm-dd')
  })

  it('appends time format (HH:mm)', () => {
    const s = buildFormatSchema('dd.MM.yyyy', 'HH:mm')
    expect(s.format).toBe('dd.MM.yyyy HH:mm')
    expect(s.digitCount).toBe(12)
    expect(s.separators).toEqual([
      { afterDigit: 2, chars: '.' },
      { afterDigit: 4, chars: '.' },
      { afterDigit: 8, chars: ' ' },
      { afterDigit: 10, chars: ':' },
    ])
    expect(s.placeholder).toBe('дд.мм.гггг чч:мм')
  })

  it('appends time format (HH:mm:ss)', () => {
    const s = buildFormatSchema('dd.MM.yyyy', 'HH:mm:ss')
    expect(s.digitCount).toBe(14)
    expect(s.placeholder).toBe('дд.мм.гггг чч:мм:сс')
  })

  it('treats undefined locale as ru', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null)
    expect(s.placeholder).toBe('дд.мм.гггг')
  })

  it('treats explicit ru locale as ru', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null, ru)
    expect(s.placeholder).toBe('дд.мм.гггг')
  })

  it('falls back to english placeholders for non-ru locales (e.g. de)', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null, de)
    expect(s.placeholder).toBe('dd.mm.yyyy')
  })

  it('throws when a date token is missing', () => {
    expect(() => buildFormatSchema('dd.MM', null)).toThrow(/yyyy/)
  })

  it('throws when a date token is duplicated', () => {
    expect(() => buildFormatSchema('dd.dd.yyyy', null)).toThrow(/MM/)
  })

  it('throws on time tokens in dateFormat', () => {
    expect(() => buildFormatSchema('dd.MM.yyyy HH:mm', null)).toThrow(/showTime/)
  })
})

describe('applySchemaMask', () => {
  it('returns empty string for no input', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null)
    expect(applySchemaMask('', s)).toBe('')
  })

  it('builds partial mask for dd.MM.yyyy', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null)
    expect(applySchemaMask('01', s)).toBe('01')
    expect(applySchemaMask('010', s)).toBe('01.0')
    expect(applySchemaMask('0101', s)).toBe('01.01')
    expect(applySchemaMask('01011', s)).toBe('01.01.1')
    expect(applySchemaMask('01012024', s)).toBe('01.01.2024')
  })

  it('builds mask for MM/dd/yyyy', () => {
    const s = buildFormatSchema('MM/dd/yyyy', null, enUS)
    expect(applySchemaMask('01152024', s)).toBe('01/15/2024')
  })

  it('builds mask for yyyy-MM-dd', () => {
    const s = buildFormatSchema('yyyy-MM-dd', null, enUS)
    expect(applySchemaMask('20240115', s)).toBe('2024-01-15')
  })

  it('truncates to digitCount', () => {
    const s = buildFormatSchema('dd.MM.yyyy', null)
    expect(applySchemaMask('0101202499', s)).toBe('01.01.2024')
  })

  it('inserts time separators', () => {
    const s = buildFormatSchema('dd.MM.yyyy', 'HH:mm')
    expect(applySchemaMask('010120241430', s)).toBe('01.01.2024 14:30')
  })

  it('inserts seconds separator', () => {
    const s = buildFormatSchema('dd.MM.yyyy', 'HH:mm:ss')
    expect(applySchemaMask('01012024143045', s)).toBe('01.01.2024 14:30:45')
  })
})
