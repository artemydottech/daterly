import { useCallback, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Calendar } from '../Calendar'

const DATE_FORMAT = 'dd.MM.yyyy'

function applyMask(digits: string): string {
  const d = digits.slice(0, 8)
  let result = ''
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += '.'
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

function parseDate(masked: string): Date | undefined {
  if (masked.replace(/\D/g, '').length !== 8) return undefined
  const date = parse(masked, DATE_FORMAT, new Date())
  // round-trip check prevents day-overflow (e.g. 32.01 → Jan 32 → Feb 1)
  return isValid(date) && format(date, DATE_FORMAT) === masked ? date : undefined
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
  className?: string
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  placeholder = 'дд.мм.гггг',
  fromDate,
  toDate,
  disabled = false,
  failed = false,
  className,
}: DatePickerProps) {
  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inputValue, setInputValue] = useState(() =>
    defaultValue && isValid(defaultValue) ? format(defaultValue, DATE_FORMAT) : '',
  )
  const [inputInvalid, setInputInvalid] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = isControlled ? value : internalDate
  const filled = inputValue.length > 0

  const close = useCallback(() => setOpen(false), [])
  useClickOutside(containerRef, close)

  function commit(masked: string) {
    const digits = masked.replace(/\D/g, '')
    if (digits.length === 0) {
      setInputInvalid(false)
      if (!isControlled) setInternalDate(undefined)
      onChange?.(undefined)
    } else if (digits.length === 8) {
      const date = parseDate(masked)
      setInputInvalid(!date)
      if (!isControlled) setInternalDate(date)
      onChange?.(date)
    } else {
      setInputInvalid(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target
    const cursorPos = input.selectionStart ?? 0
    const raw = input.value
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    const masked = applyMask(digits)
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

    if (e.key === 'Backspace' && pos > 0 && input.value[pos - 1] === '.') {
      e.preventDefault()
      const val = input.value
      const masked = applyMask((val.slice(0, pos - 2) + val.slice(pos)).replace(/\D/g, ''))
      setInputValue(masked)
      commit(masked)
      requestAnimationFrame(() => input.setSelectionRange(pos - 2, pos - 2))
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const masked = applyMask(e.clipboardData.getData('text').replace(/\D/g, ''))
    setInputValue(masked)
    commit(masked)
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(masked.length, masked.length))
  }

  function handleSelect(date: Date | undefined) {
    if (!isControlled) setInternalDate(date)
    setInputValue(date && isValid(date) ? format(date, DATE_FORMAT) : '')
    setInputInvalid(false)
    onChange?.(date)
    setOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className={['datepicker', className].filter(Boolean).join(' ')}
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
          placeholder={label && !focused ? undefined : placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => { setFocused(true); if (!disabled) setOpen(true) }}
          onBlur={() => setFocused(false)}
          aria-label={label ?? 'Выберите дату'}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={inputInvalid || undefined}
        />
      </div>
      {open && (
        <div className="datepicker__popover" role="dialog" aria-label="Календарь">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            startMonth={fromDate}
            endMonth={toDate}
            locale={ru}
          />
        </div>
      )}
    </div>
  )
}
