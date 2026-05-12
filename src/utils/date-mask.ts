import { format, isValid, parse } from 'date-fns'
import type { DatePickerShowTime } from '../components/DatePicker/DatePicker'

export const DATE_FORMAT = 'dd.MM.yyyy'

export function resolveTimeFormat(showTime?: DatePickerShowTime): 'HH:mm' | 'HH:mm:ss' | null {
  if (!showTime) return null
  if (showTime === true) return 'HH:mm:ss'
  return showTime.format
}

export function buildDateFormat(timeFormat: string | null): string {
  return timeFormat ? `${DATE_FORMAT} ${timeFormat}` : DATE_FORMAT
}

export function buildMaxDigits(timeFormat: string | null): number {
  if (!timeFormat) return 8
  return timeFormat === 'HH:mm' ? 12 : 14
}

export function buildPlaceholder(timeFormat: string | null): string {
  if (!timeFormat) return 'дд.мм.гггг'
  return timeFormat === 'HH:mm' ? 'дд.мм.гггг чч:мм' : 'дд.мм.гггг чч:мм:сс'
}

export function applyMask(digits: string, maxDigits: number): string {
  const d = digits.slice(0, maxDigits)
  let result = ''
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += '.'
    else if (i === 8) result += ' '
    else if (i === 10 || i === 12) result += ':'
    result += d[i]
  }
  return result
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

export function parseDateTime(
  masked: string,
  dateFormat: string,
  maxDigits: number,
): Date | undefined {
  if (masked.replace(/\D/g, '').length !== maxDigits) return undefined
  const date = parse(masked, dateFormat, new Date())
  if (!isValid(date) || format(date, dateFormat) !== masked) return undefined
  return maxDigits === 8 ? toDateOnly(date) : date
}
