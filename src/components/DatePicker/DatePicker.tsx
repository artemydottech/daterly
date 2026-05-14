import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { format, isValid, startOfDay } from 'date-fns'
import { ru, type Locale } from 'date-fns/locale'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Calendar } from '../Calendar'
import { TimePanel } from '../TimePanel'
import { CalendarIcon } from '../icons/CalendarIcon'
import { Spinner } from '../icons/Spinner'
import {
  applyMask,
  DEFAULT_DATE_FORMAT,
  getCursorPos,
  parseDateTime,
  resolveTimeFormat,
  toDateOnly,
} from '../../utils/date-mask'
import { buildFormatSchema } from '../../utils/format-schema'

export type DatePickerSize = 's' | 'm' | 'l'
export type DatePickerShowTime = boolean | { format: 'HH:mm' | 'HH:mm:ss' }

export interface DatePickerInputProps {
  ref: React.Ref<HTMLInputElement>
  type: 'text'
  inputMode: 'numeric'
  className: string
  value: string
  placeholder: string | undefined
  disabled: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
  onPaste: React.ClipboardEventHandler<HTMLInputElement>
  onFocus: React.FocusEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
  'aria-label': string
  'aria-expanded': boolean | undefined
  'aria-haspopup': 'dialog' | undefined
  'aria-invalid': true | undefined
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
  renderInput?: (props: DatePickerInputProps) => ReactNode
  customTrigger?: (value: string, onClick: () => void) => ReactNode
  locale?: Locale
  dateFormat?: string
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
  renderInput,
  customTrigger,
  locale = ru,
  dateFormat: dateFormatProp = DEFAULT_DATE_FORMAT,
}: DatePickerProps) {
  const timeFormat = resolveTimeFormat(showTime)
  const schema = useMemo(
    () => buildFormatSchema(dateFormatProp, timeFormat, locale),
    [dateFormatProp, timeFormat, locale],
  )
  const dateFormat = schema.format
  const maxDigits = schema.digitCount
  const defaultPlaceholder = placeholder ?? schema.placeholder
  const showSeconds = timeFormat === 'HH:mm:ss'

  const fromDay = fromDate ? startOfDay(fromDate) : undefined
  const toDay = toDate ? startOfDay(toDate) : undefined
  const disabledDays = [
    ...(fromDay ? [{ before: fromDay }] : []),
    ...(toDay ? [{ after: toDay }] : []),
  ]

  const resolvedIcon = loading ? <Spinner /> : icon === false ? null : (icon ?? <CalendarIcon />)

  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inputValue, setInputValue] = useState(() => {
    const initial = value ?? defaultValue
    return initial && isValid(initial) ? format(initial, dateFormat) : ''
  })
  const [inputInvalid, setInputInvalid] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastValidRef = useRef(inputValue)
  // Track what we last emitted via onChange so we can ignore parent echoing it back
  const lastEmittedRef = useRef<Date | undefined>(value !== undefined ? value : defaultValue)
  // Once we see a defined value, we always sync external changes (handles RHF reset)
  const wasControlledRef = useRef(value !== undefined)

  const selected = isControlled ? value : internalDate
  const [month, setMonth] = useState<Date>(
    () => (selected && isValid(selected) ? selected : new Date()),
  )
  const [draftTime, setDraftTime] = useState<Date>(() => new Date())
  const filled = inputValue.length > 0

  useEffect(() => {
    if (open && (!selected || !isValid(selected))) {
      setDraftTime(new Date())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (selected && isValid(selected)) setMonth(selected)
  }, [selected?.getFullYear(), selected?.getMonth()]) // eslint-disable-line react-hooks/exhaustive-deps

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
      const date = parseDateTime(masked, schema)
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
    const masked = applyMask(digits, schema)
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

    const separatorChars = new Set<string>()
    schema.separators.forEach((s) => {
      for (const ch of s.chars) separatorChars.add(ch)
    })
    if (e.key === 'Backspace' && pos > 0 && separatorChars.has(input.value[pos - 1])) {
      e.preventDefault()
      const val = input.value
      const masked = applyMask((val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ''), schema)
      setInputValue(masked)
      commit(masked)
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2))
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const masked = applyMask(e.clipboardData.getData('text').replace(/\D/g, ''), schema)
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

    let dateToCommit: Date
    if (timeFormat) {
      const base = selected && isValid(selected) ? selected : draftTime
      dateToCommit = new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        base.getHours(), base.getMinutes(), base.getSeconds(),
      )
    } else {
      dateToCommit = toDateOnly(date)
    }

    applyValid(format(dateToCommit, dateFormat), dateToCommit)
    if (!timeFormat) setOpen(false)
  }

  function handleTimeChange(h: number, m: number, s: number) {
    const base = selected && isValid(selected) ? selected : draftTime
    const newDate = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s)
    applyValid(format(newDate, dateFormat), newDate)
  }

  const interactive = !disabled && !loading

  return (
    <div
      ref={containerRef}
      className={['daterly', `daterly--${size}`, className].filter(Boolean).join(' ')}
      data-focused={focused || open || undefined}
      data-filled={filled || undefined}
      data-failed={failed || inputInvalid || undefined}
      data-disabled={!interactive || undefined}
    >
      {customTrigger
        ? customTrigger(inputValue, () => interactive && setOpen(prev => !prev))
        : (
          <div
            className={['daterly__field', renderInput ? 'daterly__field--custom' : ''].filter(Boolean).join(' ')}
            data-icon-start={resolvedIcon && iconPosition === 'start' ? true : undefined}
            data-icon-end={resolvedIcon && iconPosition === 'end' ? true : undefined}
            onClick={() => interactive && inputRef.current?.focus()}
          >
            {resolvedIcon && iconPosition === 'start' && (
              <span className="daterly__icon daterly__icon--start">{resolvedIcon}</span>
            )}
            {label && <span className="daterly__label">{label}</span>}
            {(() => {
              const inputProps: DatePickerInputProps = {
                ref: inputRef,
                type: 'text',
                inputMode: 'numeric',
                className: 'daterly__input',
                value: inputValue,
                placeholder: label && !focused ? undefined : defaultPlaceholder,
                disabled: !interactive,
                onChange: handleChange,
                onKeyDown: handleKeyDown,
                onPaste: handlePaste,
                onFocus: () => { setFocused(true); if (interactive && !noCalendar) setOpen(true) },
                onBlur: handleBlur,
                'aria-label': label ?? 'Выберите дату',
                'aria-expanded': !noCalendar ? open : undefined,
                'aria-haspopup': !noCalendar ? 'dialog' : undefined,
                'aria-invalid': inputInvalid || undefined,
              }
              if (renderInput) return renderInput(inputProps)
              const { ref, ...rest } = inputProps
              return <input ref={ref as React.RefObject<HTMLInputElement>} {...rest} />
            })()}
            {resolvedIcon && iconPosition === 'end' && (
              <span className="daterly__icon daterly__icon--end">{resolvedIcon}</span>
            )}
          </div>
        )
      }
      {!noCalendar && open && (
        <div
          className={[
            'daterly__popover',
            `daterly__popover--${size}`,
            timeFormat && 'daterly__popover--with-time',
          ].filter(Boolean).join(' ')}
          role="dialog"
          aria-label="Календарь"
        >
          {timeFormat ? (
            <>
              <div className="daterly__popover-body">
                <div className="daterly__popover-calendar">
                  <Calendar
                    mode="single"
                    selected={selected}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleCalendarSelect}
                    startMonth={fromDay}
                    endMonth={toDay}
                    disabled={disabledDays.length ? disabledDays : undefined}
                    navLayout="around"
                    locale={locale}
                  />
                </div>
                <div className="daterly__time-separator" />
                <div className="daterly__popover-time">
                  <TimePanel
                    value={selected && isValid(selected) ? selected : draftTime}
                    showSeconds={showSeconds}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
              <div className="daterly__popover-footer">
                <button
                  className="daterly__ok-btn"
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
              month={month}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
              startMonth={fromDay}
              endMonth={toDay}
              disabled={disabledDays.length ? disabledDays : undefined}
              navLayout="around"
              locale={locale}
            />
          )}
        </div>
      )}
    </div>
  )
}
