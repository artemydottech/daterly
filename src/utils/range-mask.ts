import { format, isValid, parse } from 'date-fns'
import type { DatePickerShowTime } from '../components/DatePicker/DatePicker'
import { applySchemaMask, type FormatSchema } from './format-schema'

export function applyDateMask(digits: string, schema: FormatSchema): string {
  return applySchemaMask(digits, schema)
}

export function applyRangeMask(digits: string, schema: FormatSchema): string {
  const total = schema.digitCount * 2
  const all = digits.slice(0, total)
  const fromMasked = applyDateMask(all.slice(0, schema.digitCount), schema)
  const toDigits = all.slice(schema.digitCount)
  if (toDigits.length === 0) return fromMasked
  return `${fromMasked} — ${applyDateMask(toDigits, schema)}`
}

export function getRangeCursorPos(masked: string, digitCount: number): number {
  if (digitCount === 0) return 0
  let count = 0
  for (let i = 0; i < masked.length; i++) {
    if (/\d/.test(masked[i])) {
      count++
      if (count === digitCount) return i + 1
    }
  }
  return masked.length
}

export function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
}

export function parseDate(masked: string, schema: FormatSchema): Date | undefined {
  if (masked.replace(/\D/g, '').length !== schema.digitCount) return undefined
  const date = parse(masked, schema.format, new Date())
  if (!isValid(date) || format(date, schema.format) !== masked) return undefined
  return /[Hms]/.test(schema.format) ? date : toDateOnly(date)
}

export function formatRange(
  from: Date | undefined,
  to: Date | undefined,
  schema: FormatSchema,
): string {
  if (!from) return ''
  const fromStr = format(from, schema.format)
  if (!to) return fromStr
  return `${fromStr} — ${format(to, schema.format)}`
}

export function resolveShowSeconds(showTime?: DatePickerShowTime): boolean {
  if (!showTime) return false
  if (showTime === true) return true
  return showTime.format === 'HH:mm:ss'
}
