import { format, isValid, parse } from 'date-fns'
import type { DatePickerShowTime } from '../components/DatePicker/DatePicker'
import { applySchemaMask, type FormatSchema, type TimeFormat } from './format-schema'

export const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy'

export function resolveTimeFormat(showTime?: DatePickerShowTime): TimeFormat {
  if (!showTime) return null
  if (showTime === true) return 'HH:mm:ss'
  return showTime.format
}

export function applyMask(digits: string, schema: FormatSchema): string {
  return applySchemaMask(digits, schema)
}

export function getCursorPos(masked: string, digitCount: number): number {
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

export function parseDateTime(masked: string, schema: FormatSchema): Date | undefined {
  if (masked.replace(/\D/g, '').length !== schema.digitCount) return undefined
  const date = parse(masked, schema.format, new Date())
  if (!isValid(date) || format(date, schema.format) !== masked) return undefined
  return schema.digitCount === 8 ? toDateOnly(date) : date
}
