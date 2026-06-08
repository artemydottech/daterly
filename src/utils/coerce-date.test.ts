import { describe, expect, it } from 'vitest'
import { coerceDate, coerceRange } from './coerce-date'

describe('coerceDate', () => {
  it('returns a valid Date unchanged', () => {
    const d = new Date(2024, 0, 15)
    expect(coerceDate(d)).toBe(d)
  })

  it('parses an ISO string into a Date', () => {
    const result = coerceDate('2024-01-15')
    expect(result).toBeInstanceOf(Date)
    expect(result?.getFullYear()).toBe(2024)
  })

  it('parses a numeric timestamp', () => {
    const ts = new Date(2024, 0, 15).getTime()
    expect(coerceDate(ts)?.getTime()).toBe(ts)
  })

  it('returns undefined for null and undefined', () => {
    expect(coerceDate(null)).toBeUndefined()
    expect(coerceDate(undefined)).toBeUndefined()
  })

  it('returns undefined for an invalid Date', () => {
    expect(coerceDate(new Date('nope'))).toBeUndefined()
  })

  it('returns undefined for an unparseable string', () => {
    expect(coerceDate('not a date')).toBeUndefined()
    expect(coerceDate('')).toBeUndefined()
  })

  it('returns undefined for objects and booleans', () => {
    expect(coerceDate({})).toBeUndefined()
    expect(coerceDate(true)).toBeUndefined()
  })
})

describe('coerceRange', () => {
  it('coerces string members into Dates', () => {
    const result = coerceRange({ from: '2024-01-15', to: '2024-01-20' })
    expect(result?.from?.getFullYear()).toBe(2024)
    expect(result?.to?.getDate()).toBe(20)
  })

  it('keeps valid Date members', () => {
    const from = new Date(2024, 0, 15)
    expect(coerceRange({ from, to: undefined })?.from).toBe(from)
  })

  it('drops invalid members to undefined', () => {
    const result = coerceRange({ from: '2024-01-15', to: 'garbage' })
    expect(result?.from).toBeInstanceOf(Date)
    expect(result?.to).toBeUndefined()
  })

  it('returns undefined when both members are invalid', () => {
    expect(coerceRange({ from: 'x', to: 'y' })).toBeUndefined()
  })

  it('returns undefined for null and non-objects', () => {
    expect(coerceRange(null)).toBeUndefined()
    expect(coerceRange('2024-01-15')).toBeUndefined()
  })
})
