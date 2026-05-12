import type { Locale } from 'date-fns'

export interface FormatSeparator {
  afterDigit: number
  chars: string
}

export interface FormatSchema {
  format: string
  digitCount: number
  separators: FormatSeparator[]
  placeholder: string
}

const DATE_TOKENS = ['yyyy', 'dd', 'MM'] as const
const TIME_TOKENS = ['HH', 'mm', 'ss'] as const
const ALL_TOKENS = [...DATE_TOKENS, ...TIME_TOKENS] as const

type Token = (typeof ALL_TOKENS)[number]

const TOKEN_LENGTH: Record<Token, number> = {
  yyyy: 4,
  dd: 2,
  MM: 2,
  HH: 2,
  mm: 2,
  ss: 2,
}

const RU_TOKEN_PLACEHOLDER: Record<Token, string> = {
  yyyy: 'гггг',
  dd: 'дд',
  MM: 'мм',
  HH: 'чч',
  mm: 'мм',
  ss: 'сс',
}

const EN_TOKEN_PLACEHOLDER: Record<Token, string> = {
  yyyy: 'yyyy',
  dd: 'dd',
  MM: 'mm',
  HH: 'hh',
  mm: 'mm',
  ss: 'ss',
}

type ParsedPart = { kind: 'token'; token: Token } | { kind: 'sep'; char: string }

function tokenize(format: string, allowTime: boolean): ParsedPart[] {
  const parts: ParsedPart[] = []
  let i = 0
  while (i < format.length) {
    let matched: Token | null = null
    for (const token of ALL_TOKENS) {
      if (format.startsWith(token, i)) {
        matched = token
        break
      }
    }
    if (matched) {
      if (!allowTime && TIME_TOKENS.includes(matched as (typeof TIME_TOKENS)[number])) {
        throw new Error(
          `dateFormat must not contain time tokens (got "${matched}"). Use the "showTime" prop instead.`,
        )
      }
      parts.push({ kind: 'token', token: matched })
      i += matched.length
      continue
    }
    parts.push({ kind: 'sep', char: format[i] })
    i++
  }
  return parts
}

function validateDateParts(parts: ParsedPart[]) {
  const counts: Partial<Record<Token, number>> = {}
  for (const p of parts) {
    if (p.kind === 'token') counts[p.token] = (counts[p.token] ?? 0) + 1
  }
  for (const token of DATE_TOKENS) {
    if (counts[token] !== 1) {
      throw new Error(
        `dateFormat must contain "${token}" exactly once. Supported tokens: dd, MM, yyyy. Got: ${
          counts[token] ?? 0
        }`,
      )
    }
  }
}

function buildSchemaFromParts(parts: ParsedPart[], isRu: boolean): FormatSchema {
  const placeholderMap = isRu ? RU_TOKEN_PLACEHOLDER : EN_TOKEN_PLACEHOLDER
  const separators: FormatSeparator[] = []
  let digitCount = 0
  let format = ''
  let placeholder = ''
  let pendingSep = ''

  for (const part of parts) {
    if (part.kind === 'sep') {
      pendingSep += part.char
      format += part.char
      placeholder += part.char
      continue
    }
    if (pendingSep) {
      separators.push({ afterDigit: digitCount, chars: pendingSep })
      pendingSep = ''
    }
    digitCount += TOKEN_LENGTH[part.token]
    format += part.token
    placeholder += placeholderMap[part.token]
  }

  return { format, digitCount, separators, placeholder }
}

function isRuLocale(locale?: Locale): boolean {
  if (!locale) return true
  return locale.code === 'ru'
}

export type TimeFormat = 'HH:mm' | 'HH:mm:ss' | null

export function buildFormatSchema(
  dateFormat: string,
  timeFormat: TimeFormat,
  locale?: Locale,
): FormatSchema {
  const dateParts = tokenize(dateFormat, false)
  validateDateParts(dateParts)

  const parts: ParsedPart[] = [...dateParts]
  if (timeFormat) {
    parts.push({ kind: 'sep', char: ' ' })
    parts.push(...tokenize(timeFormat, true))
  }

  return buildSchemaFromParts(parts, isRuLocale(locale))
}

export function applySchemaMask(digits: string, schema: FormatSchema): string {
  const d = digits.slice(0, schema.digitCount)
  let result = ''
  let sepIdx = 0
  for (let i = 0; i < d.length; i++) {
    while (sepIdx < schema.separators.length && schema.separators[sepIdx].afterDigit === i) {
      result += schema.separators[sepIdx].chars
      sepIdx++
    }
    result += d[i]
  }
  return result
}
