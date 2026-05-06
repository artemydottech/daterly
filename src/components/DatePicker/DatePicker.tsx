import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { format, isValid, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Calendar } from '../Calendar'
import { TimePanel } from '../TimePanel'
import { CalendarIcon } from '../icons/CalendarIcon'
import { Spinner } from '../icons/Spinner'

export type DatePickerSize = 's' | 'm' | 'l'
export type DatePickerShowTime = boolean | { format: 'HH:mm' | 'HH:mm:ss' }

const DATE_FORMAT = 'dd.MM.yyyy'

function resolveTimeFormat(showTime?: DatePickerShowTime): 'HH:mm' | 'HH:mm:ss' | null {
  if (!showTime) return null
  if (showTime === true) return 'HH:mm:ss'
  return showTime.format
}

function buildDateFormat(timeFormat: string | null) {
  return timeFormat ? `${DATE_FORMAT} ${timeFormat}` : DATE_FORMAT
}

function buildMaxDigits(timeFormat: string | null) {
  if (!timeFormat) return 8
  return timeFormat === 'HH:mm' ? 12 : 14
}

function buildPlaceholder(timeFormat: string | null) {
  if (!timeFormat) return 'дд.мм.гггг'
  return timeFormat === 'HH:mm' ? 'дд.мм.гггг чч:мм' : 'дд.мм.гггг чч:мм:сс'
}

function applyMask(digits: string, maxDigits: number): string {
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

function getCursorPos(masked: string, digitCount: number): number {
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

function parseDateTime(masked: string, dateFormat: string, maxDigits: number): Date | undefined {
  if (masked.replace(/\D/g, '').length !== maxDigits) return undefined
  const date = parse(masked, dateFormat, new Date())
  return isValid(date) && format(date, dateFormat) === masked ? date : undefined
}

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
  placeholder?: string
  fromDate?: Date
  toDate?: Date
  disabled?: boolean
  failed?: boolean
  loading?: boolean
  size?: DatePickerSize
  noCalendar?: boolean
  showTime?: DatePickerShowTime
  icon?: ReactNode | false
  iconPosition?: 'start' | 'end'
  className?: string
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  fromDate,
  toDate,
  disabled = false,
  failed = false,
  loading = false,
  size = 'm',
  noCalendar = false,
  showTime,
  icon,
  iconPosition = 'end',
  className,
}: DatePickerProps) {
  const timeFormat = resolveTimeFormat(showTime)
  const dateFormat = buildDateFormat(timeFormat)
  const maxDigits = buildMaxDigits(timeFormat)
  const defaultPlaceholder = placeholder ?? buildPlaceholder(timeFormat)
  const showSeconds = timeFormat === 'HH:mm:ss'

  const resolvedIcon = loading ? <Spinner /> : icon === false ? null : (icon ?? <CalendarIcon />)

  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inputValue, setInputValue] = useState(() =>
    defaultValue && isValid(defaultValue) ? format(defaultValue, dateFormat) : '',
  )
  const [inputInvalid, setInputInvalid] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastValidRef = useRef(inputValue)
  // Track what we last emitted via onChange so we can ignore parent echoing it back
  const lastEmittedRef = useRef<Date | undefined>(value !== undefined ? value : defaultValue)
  // Once we see a defined value, we always sync external changes (handles RHF reset)
  const wasControlledRef = useRef(value !== undefined)

  const selected = isControlled ? value : internalDate
  const filled = inputValue.length > 0

  const close = useCallback(() => setOpen(false), [])
  useClickOutside(containerRef, close)

  // Sync inputValue when value changes externally (e.g. form reset)
  useEffect(() => {
    if (value !== undefined) wasControlledRef.current = true
    const lastTime = lastEmittedRef.current?.getTime() ?? null
    const valueTime = value?.getTime() ?? null
    if (valueTime === lastTime) return
    if (!wasControlledRef.current && value === undefined) return

    const formatted = value && isValid(value) ? format(value, dateFormat) : ''
    setInputValue(formatted)
    lastValidRef.current = formatted
    setInputInvalid(false)
    if (!isControlled) setInternalDate(value)
    lastEmittedRef.current = value
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  function applyValid(masked: string, date: Date | undefined) {
    lastEmittedRef.current = date
    lastValidRef.current = masked
    setInputValue(masked)
    setInputInvalid(false)
    if (!isControlled) setInternalDate(date)
    onChange?.(date)
  }

  function commit(masked: string) {
    const digits = masked.replace(/\D/g, '')
    if (digits.length === 0) {
      lastEmittedRef.current = undefined
      lastValidRef.current = ''
      setInputInvalid(false)
      if (!isControlled) setInternalDate(undefined)
      onChange?.(undefined)
    } else if (digits.length === maxDigits) {
      const date = parseDateTime(masked, dateFormat, maxDigits)
      lastEmittedRef.current = date
      if (date) lastValidRef.current = masked
      setInputInvalid(!date)
      if (!isControlled) setInternalDate(date)
      onChange?.(date)
    } else {
      setInputInvalid(false)
    }
  }

  function handleBlur() {
    setFocused(false)
    const digits = inputValue.replace(/\D/g, '')
    if ((digits.length > 0 && digits.length < maxDigits) || inputInvalid) {
      setInputValue(lastValidRef.current)
      setInputInvalid(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target
    const cursorPos = input.selectionStart ?? 0
    const raw = input.value
    const digits = raw.replace(/\D/g, '').slice(0, maxDigits)
    const masked = applyMask(digits, maxDigits)
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, '').length
    const newCursorPos = getCursorPos(masked, digitsBeforeCursor)
    setInputValue(masked)
    commit(masked)
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(newCursorPos, newCursorPos))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.currentTarget
    const pos = input.selectionStart ?? 0

    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      return
    }

    if (e.key === 'Backspace' && pos > 0 && /[.: ]/.test(input.value[pos - 1])) {
      e.preventDefault()
      const val = input.value
      const masked = applyMask((val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ''), maxDigits)
      setInputValue(masked)
      commit(masked)
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2))
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const masked = applyMask(e.clipboardData.getData('text').replace(/\D/g, ''), maxDigits)
    setInputValue(masked)
    commit(masked)
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(masked.length, masked.length))
  }

  function handleCalendarSelect(date: Date | undefined) {
    if (!date || !isValid(date)) {
      applyValid('', undefined)
      if (!timeFormat) setOpen(false)
      return
    }

    let dateToCommit = date
    if (timeFormat) {
      const base = selected && isValid(selected) ? selected : new Date(0)
      dateToCommit = new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        base.getHours(), base.getMinutes(), base.getSeconds(),
      )
    }

    applyValid(format(dateToCommit, dateFormat), dateToCommit)
    if (!timeFormat) setOpen(false)
  }

  function handleTimeChange(h: number, m: number, s: number) {
    const base = selected && isValid(selected) ? selected : new Date()
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s)
    applyValid(format(newDate, dateFormat), newDate)
  }

  const interactive = !disabled && !loading

  return (
    <div
      ref={containerRef}
      className={['datepicker', `datepicker--${size}`, className].filter(Boolean).join(' ')}
      data-focused={focused || open || undefined}
      data-filled={filled || undefined}
      data-failed={failed || inputInvalid || undefined}
      data-disabled={!interactive || undefined}
    >
      <div
        className="datepicker__field"
        data-icon-start={resolvedIcon && iconPosition === 'start' ? true : undefined}
        data-icon-end={resolvedIcon && iconPosition === 'end' ? true : undefined}
        onClick={() => interactive && inputRef.current?.focus()}
      >
        {resolvedIcon && iconPosition === 'start' && (
          <span className="datepicker__icon datepicker__icon--start">{resolvedIcon}</span>
        )}
        {label && <span className="datepicker__label">{label}</span>}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className="datepicker__input"
          value={inputValue}
          placeholder={label && !focused ? undefined : defaultPlaceholder}
          disabled={!interactive}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => { setFocused(true); if (interactive && !noCalendar) setOpen(true) }}
          onBlur={handleBlur}
          aria-label={label ?? 'Выберите дату'}
          aria-expanded={!noCalendar ? open : undefined}
          aria-haspopup={!noCalendar ? 'dialog' : undefined}
          aria-invalid={inputInvalid || undefined}
        />
        {resolvedIcon && iconPosition === 'end' && (
          <span className="datepicker__icon datepicker__icon--end">{resolvedIcon}</span>
        )}
      </div>
      {!noCalendar && open && (
        <div
          className={[
            'datepicker__popover',
            `datepicker__popover--${size}`,
            timeFormat && 'datepicker__popover--with-time',
          ].filter(Boolean).join(' ')}
          role="dialog"
          aria-label="Календарь"
        >
          {timeFormat ? (
            <>
              <div className="datepicker__popover-body">
                <div className="datepicker__popover-calendar">
                  <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={handleCalendarSelect}
                    startMonth={fromDate}
                    endMonth={toDate}
                    locale={ru}
                  />
                </div>
                <div className="datepicker__time-separator" />
                <div className="datepicker__popover-time">
                  <TimePanel
                    value={selected}
                    showSeconds={showSeconds}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
              <div className="datepicker__popover-footer">
                <button
                  className="datepicker__ok-btn"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  OK
                </button>
              </div>
            </>
          ) : (
            <Calendar
              mode="single"
              selected={selected}
              onSelect={handleCalendarSelect}
              startMonth={fromDate}
              endMonth={toDate}
              locale={ru}
            />
          )}
        </div>
      )}
    </div>
  )
}
