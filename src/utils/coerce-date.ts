import { isValid } from 'date-fns'
import type { DateRange } from 'react-day-picker'

export function coerceDate(value: unknown): Date | undefined {
  if (value == null) return undefined
  if (value instanceof Date) return isValid(value) ? value : undefined
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value)
    return isValid(date) ? date : undefined
  }
  return undefined
}

export function coerceRange(value: unknown): DateRange | undefined {
  if (value == null || typeof value !== 'object') return undefined
  const from = coerceDate((value as { from?: unknown }).from)
  const to = coerceDate((value as { to?: unknown }).to)
  if (!from && !to) return undefined
  return { from, to }
}
