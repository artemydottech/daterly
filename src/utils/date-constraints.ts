import { dateMatchModifiers, type Matcher } from 'react-day-picker'

export type { Matcher }

export type DisabledDates = Matcher | Matcher[]

export function buildDisabledMatchers(
  fromDay: Date | undefined,
  toDay: Date | undefined,
  disabledDates: DisabledDates | undefined,
): Matcher[] {
  const matchers: Matcher[] = []
  if (fromDay) matchers.push({ before: fromDay })
  if (toDay) matchers.push({ after: toDay })
  if (Array.isArray(disabledDates)) matchers.push(...disabledDates)
  else if (disabledDates !== undefined) matchers.push(disabledDates)
  return matchers
}

export function isDayDisabled(date: Date, matchers: Matcher[]): boolean {
  if (matchers.length === 0) return false
  return dateMatchModifiers(date, matchers)
}
