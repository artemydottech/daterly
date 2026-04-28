import { useCallback, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Calendar } from '../Calendar'

const DATE_FORMAT = 'dd.MM.yyyy'

function applyDateMask(digits: string): string {
  const d = digits.slice(0, 8)
  let result = ''
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += '.'
    result += d[i]
  }
  return result
}

function applyRangeMask(digits: string): string {
  const all = digits.slice(0, 16)
  const fromMasked = applyDateMask(all.slice(0, 8))
  const toDigits = all.slice(8)
  if (toDigits.length === 0) return fromMasked
  return `${fromMasked} — ${applyDateMask(toDigits)}`
}

function getRangeCursorPos(masked: string, digitCount: number): number {
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

function parseDate(masked: string): Date | undefined {
  if (masked.replace(/\D/g, '').length !== 8) return undefined
  const date = parse(masked, DATE_FORMAT, new Date())
  return isValid(date) && format(date, DATE_FORMAT) === masked ? date : undefined
}

function formatRange(from: Date | undefined, to: Date | undefined): string {
  if (!from) return ''
  const fromStr = format(from, DATE_FORMAT)
  if (!to) return fromStr
  return `${fromStr} — ${format(to, DATE_FORMAT)}`
}

export type { DateRange }

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  label?: string
  fromDate?: Date
  toDate?: Date
  disabled?: boolean
  failed?: boolean
  className?: string
}

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  label,
  fromDate: fromConstraint,
  toDate: toConstraint,
  disabled = false,
  failed = false,
  className,
}: DateRangePickerProps) {
  const isControlled = value !== undefined

  const [internalFrom, setInternalFrom] = useState<Date | undefined>(defaultValue?.from)
  const [internalTo, setInternalTo] = useState<Date | undefined>(defaultValue?.to)
  const [inputValue, setInputValue] = useState(() =>
    formatRange(defaultValue?.from, defaultValue?.to),
  )
  const [inputInvalid, setInputInvalid] = useState(false)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  // Calendar picking state — managed separately from confirmed dates
  const [anchorDate, setAnchorDate] = useState<Date | undefined>(undefined)
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const confirmedFrom = isControlled ? value?.from : internalFrom
  const confirmedTo = isControlled ? value?.to : internalTo
  const filled = inputValue.length > 0

  const close = useCallback(() => {
    setOpen(false)
    setAnchorDate(undefined)
    setHoveredDate(undefined)
  }, [])
  useClickOutside(containerRef, close)

  // Visual range shown in calendar
  const calendarSelected: DateRange | undefined = anchorDate
    ? hoveredDate
      ? anchorDate <= hoveredDate
        ? { from: anchorDate, to: hoveredDate }
        : { from: hoveredDate, to: anchorDate }
      : { from: anchorDate, to: undefined }
    : { from: confirmedFrom, to: confirmedTo }

  // ── Calendar handlers ─────────────────────────────────────────

  // All selection logic lives here. onSelect is a no-op so calendar display is fully controlled.
  function handleDayClick(day: Date) {
    if (!anchorDate) {
      // Phase 1: pick the "from" anchor
      setAnchorDate(day)
      if (!isControlled) { setInternalFrom(day); setInternalTo(undefined) }
      setInputValue(format(day, DATE_FORMAT))
      setInputInvalid(false)
      onChange?.(day ? { from: day, to: undefined } : undefined)
    } else {
      // Phase 2: pick "to" and close
      let from = anchorDate, to = day
      if (day < anchorDate) { from = day; to = anchorDate }
      if (!isControlled) { setInternalFrom(from); setInternalTo(to) }
      setInputValue(formatRange(from, to))
      setInputInvalid(false)
      onChange?.({ from, to })
      close()
    }
  }

  function handleDayMouseEnter(day: Date) {
    if (anchorDate) setHoveredDate(day)
  }

  // ── Text input handlers ───────────────────────────────────────

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target
    const cursorPos = input.selectionStart ?? 0
    const raw = input.value
    const digits = raw.replace(/\D/g, '').slice(0, 16)
    const masked = applyRangeMask(digits)
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, '').length

    setInputValue(masked)
    setAnchorDate(undefined)
    setHoveredDate(undefined)

    const fromDigits = digits.slice(0, 8)
    const toDigits = digits.slice(8)
    const parsedFrom = fromDigits.length === 8 ? parseDate(applyDateMask(fromDigits)) : undefined
    const parsedTo = toDigits.length === 8 ? parseDate(applyDateMask(toDigits)) : undefined
    const fromComplete = fromDigits.length === 8
    const toComplete = toDigits.length === 8
    setInputInvalid((fromComplete && !parsedFrom) || (toComplete && !parsedTo))

    if (!isControlled) { setInternalFrom(parsedFrom); setInternalTo(parsedTo) }
    onChange?.(parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : undefined)

    requestAnimationFrame(() =>
      inputRef.current?.setSelectionRange(
        getRangeCursorPos(masked, digitsBeforeCursor),
        getRangeCursorPos(masked, digitsBeforeCursor),
      ),
    )
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.currentTarget
    const pos = input.selectionStart ?? 0

    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      return
    }
    if (e.key === 'Backspace' && pos > 0 && /[\s—]/.test(input.value[pos - 1])) {
      // skip over separator characters
      e.preventDefault()
      const val = input.value
      const charsToSkip = val.slice(0, pos).match(/[\s—]+$/)?.[0].length ?? 1
      const newPos = pos - charsToSkip
      const masked = applyRangeMask((val.slice(0, newPos - 1) + val.slice(newPos)).replace(/\D/g, ''))
      setInputValue(masked)
      requestAnimationFrame(() => input.setSelectionRange(newPos - 1, newPos - 1))
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    const digits = text.replace(/\D/g, '').slice(0, 16)
    const masked = applyRangeMask(digits)
    setInputValue(masked)
    setAnchorDate(undefined)
    setHoveredDate(undefined)

    const parsedFrom = digits.length >= 8 ? parseDate(applyDateMask(digits.slice(0, 8))) : undefined
    const parsedTo = digits.length >= 16 ? parseDate(applyDateMask(digits.slice(8, 16))) : undefined
    setInputInvalid((digits.length >= 8 && !parsedFrom) || (digits.length >= 16 && !parsedTo))
    if (!isControlled) { setInternalFrom(parsedFrom); setInternalTo(parsedTo) }
    onChange?.(parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : undefined)

    requestAnimationFrame(() => inputRef.current?.setSelectionRange(masked.length, masked.length))
  }

  const placeholder = label && !focused && !filled ? undefined : 'дд.мм.гггг — дд.мм.гггг'

  return (
    <div
      ref={containerRef}
      className={['datepicker', 'daterangepicker', className].filter(Boolean).join(' ')}
      data-focused={focused || open || undefined}
      data-filled={filled || undefined}
      data-failed={failed || inputInvalid || undefined}
      data-disabled={disabled || undefined}
    >
      <div className="datepicker__field" onClick={() => !disabled && inputRef.current?.focus()}>
        {label && <span className="datepicker__label">{label}</span>}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className="datepicker__input"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => { setFocused(true); if (!disabled) setOpen(true) }}
          onBlur={() => setFocused(false)}
          aria-label={label ?? 'Выберите период'}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={inputInvalid || undefined}
        />
      </div>
      {open && (
        <div className="datepicker__popover" role="dialog" aria-label="Выберите период">
          <Calendar
            mode="range"
            selected={calendarSelected}
            onSelect={() => {}}
            onDayClick={handleDayClick}
            onDayMouseEnter={handleDayMouseEnter}
            onDayMouseLeave={() => setHoveredDate(undefined)}
            startMonth={fromConstraint}
            endMonth={toConstraint}
            numberOfMonths={2}
            locale={ru}
          />
        </div>
      )}
    </div>
  )
}
