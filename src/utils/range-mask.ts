import { format, isValid, parse } from 'date-fns'
import type { DatePickerShowTime } from '../components/DatePicker/DatePicker'

const DATE_FORMAT = 'dd.MM.yyyy'

export function applyDateMask(digits: string): string {
  const d = digits.slice(0, 8)
  let result = ''
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += '.'
    result += d[i]
  }
  return result
}

export function applyRangeMask(digits: string): string {
  const all = digits.slice(0, 16)
  const fromMasked = applyDateMask(all.slice(0, 8))
  const toDigits = all.slice(8)
  if (toDigits.length === 0) return fromMasked
  return `${fromMasked} — ${applyDateMask(toDigits)}`
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

export function parseDate(masked: string): Date | undefined {
  if (masked.replace(/\D/g, '').length !== 8) return undefined
  const date = parse(masked, DATE_FORMAT, new Date())
  if (!isValid(date) || format(date, DATE_FORMAT) !== masked) return undefined
  return toDateOnly(date)
}

export function formatRange(from: Date | undefined, to: Date | undefined): string {
  if (!from) return ''
  const fromStr = format(from, DATE_FORMAT)
  if (!to) return fromStr
  return `${fromStr} — ${format(to, DATE_FORMAT)}`
}

export function resolveShowSeconds(showTime?: DatePickerShowTime): boolean {
  if (!showTime) return false
  if (showTime === true) return true
  return showTime.format === 'HH:mm:ss'
}
