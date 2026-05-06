import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { format, isValid, parse, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import type { DatePickerShowTime } from '../DatePicker/DatePicker';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Calendar } from '../Calendar';
import { TimePanel } from '../TimePanel';
import { CalendarIcon } from '../icons/CalendarIcon';
import { Spinner } from '../icons/Spinner';

const DATE_FORMAT = 'dd.MM.yyyy';

function applyDateMask(digits: string): string {
  const d = digits.slice(0, 8);
  let result = '';
  for (let i = 0; i < d.length; i++) {
    if (i === 2 || i === 4) result += '.';
    result += d[i];
  }
  return result;
}

function applyRangeMask(digits: string): string {
  const all = digits.slice(0, 16);
  const fromMasked = applyDateMask(all.slice(0, 8));
  const toDigits = all.slice(8);
  if (toDigits.length === 0) return fromMasked;
  return `${fromMasked} — ${applyDateMask(toDigits)}`;
}

function getRangeCursorPos(masked: string, digitCount: number): number {
  if (digitCount === 0) return 0;
  let count = 0;
  for (let i = 0; i < masked.length; i++) {
    if (/\d/.test(masked[i])) {
      count++;
      if (count === digitCount) return i + 1;
    }
  }
  return masked.length;
}

function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
}

function parseDate(masked: string): Date | undefined {
  if (masked.replace(/\D/g, '').length !== 8) return undefined;
  const date = parse(masked, DATE_FORMAT, new Date());
  if (!isValid(date) || format(date, DATE_FORMAT) !== masked) return undefined;
  return toDateOnly(date);
}

function formatRange(from: Date | undefined, to: Date | undefined): string {
  if (!from) return '';
  const fromStr = format(from, DATE_FORMAT);
  if (!to) return fromStr;
  return `${fromStr} — ${format(to, DATE_FORMAT)}`;
}

function resolveShowSeconds(showTime?: DatePickerShowTime): boolean {
  if (!showTime) return false;
  if (showTime === true) return true;
  return showTime.format === 'HH:mm:ss';
}

export type { DateRange };
export type { DatePickerShowTime };

export type DateRangePickerSize = 's' | 'm' | 'l';
export type DateRangePickerCalendarLayout = 'vertical' | 'horizontal';

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  label?: string;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
  failed?: boolean;
  loading?: boolean;
  size?: DateRangePickerSize;
  calendarLayout?: DateRangePickerCalendarLayout;
  showTime?: DatePickerShowTime;
  icon?: ReactNode | false;
  iconPosition?: 'start' | 'end';
  className?: string;
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
  loading = false,
  size = 'm',
  calendarLayout = 'horizontal',
  showTime,
  icon,
  iconPosition = 'end',
  className,
}: DateRangePickerProps) {
  const resolvedIcon = loading ? (
    <Spinner />
  ) : icon === false ? null : (
    icon ?? <CalendarIcon />
  );

  const isControlled = value !== undefined;
  const showSeconds = resolveShowSeconds(showTime);

  const fromDay = fromConstraint ? startOfDay(fromConstraint) : undefined;
  const toDay = toConstraint ? startOfDay(toConstraint) : undefined;
  const disabledDays = [
    ...(fromDay ? [{ before: fromDay }] : []),
    ...(toDay ? [{ after: toDay }] : []),
  ];

  const [internalFrom, setInternalFrom] = useState<Date | undefined>(
    defaultValue?.from,
  );
  const [internalTo, setInternalTo] = useState<Date | undefined>(
    defaultValue?.to,
  );
  const [inputValue, setInputValue] = useState(() =>
    formatRange(defaultValue?.from, defaultValue?.to),
  );
  const [inputInvalid, setInputInvalid] = useState(false);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const [anchorDate, setAnchorDate] = useState<Date | undefined>(undefined);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Track last emitted range to ignore parent echoing it back
  const lastEmittedFromRef = useRef<Date | undefined>(
    value !== undefined ? value?.from : defaultValue?.from,
  );
  const lastEmittedToRef = useRef<Date | undefined>(
    value !== undefined ? value?.to : defaultValue?.to,
  );
  const wasControlledRef = useRef(value !== undefined);

  const confirmedFrom = isControlled ? value?.from : internalFrom;
  const confirmedTo = isControlled ? value?.to : internalTo;
  const filled = inputValue.length > 0;

  const close = useCallback(() => {
    setOpen(false);
    setAnchorDate(undefined);
    setHoveredDate(undefined);
  }, []);
  useClickOutside(containerRef, close);

  // Sync inputValue when value changes externally (e.g. form reset)
  useEffect(() => {
    if (value !== undefined) wasControlledRef.current = true;
    const newFrom = value?.from;
    const newTo = value?.to;
    const fromTime = newFrom?.getTime() ?? null;
    const toTime = newTo?.getTime() ?? null;
    const lastFromTime = lastEmittedFromRef.current?.getTime() ?? null;
    const lastToTime = lastEmittedToRef.current?.getTime() ?? null;
    if (fromTime === lastFromTime && toTime === lastToTime) return;
    if (!wasControlledRef.current && value === undefined) return;

    setInputValue(formatRange(newFrom, newTo));
    setInputInvalid(false);
    if (!isControlled) {
      setInternalFrom(newFrom);
      setInternalTo(newTo);
    }
    setAnchorDate(undefined);
    setHoveredDate(undefined);
    lastEmittedFromRef.current = newFrom;
    lastEmittedToRef.current = newTo;
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const calendarSelected: DateRange | undefined = anchorDate
    ? hoveredDate
      ? anchorDate <= hoveredDate
        ? { from: anchorDate, to: hoveredDate }
        : { from: hoveredDate, to: anchorDate }
      : { from: anchorDate, to: undefined }
    : { from: confirmedFrom, to: confirmedTo };

  function handleDayClick(day: Date) {
    if (!anchorDate) {
      const from = showTime
        ? new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            confirmedFrom?.getHours() ?? 0,
            confirmedFrom?.getMinutes() ?? 0,
            confirmedFrom?.getSeconds() ?? 0,
          )
        : toDateOnly(day);
      setAnchorDate(from);
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(undefined);
      }
      setInputValue(format(day, DATE_FORMAT));
      setInputInvalid(false);
      lastEmittedFromRef.current = from;
      lastEmittedToRef.current = undefined;
      onChange?.({ from, to: undefined });
    } else {
      let from = anchorDate,
        to = showTime
          ? new Date(
              day.getFullYear(),
              day.getMonth(),
              day.getDate(),
              confirmedTo?.getHours() ?? 0,
              confirmedTo?.getMinutes() ?? 0,
              confirmedTo?.getSeconds() ?? 0,
            )
          : toDateOnly(day);
      if (day < anchorDate) {
        const tmp = from;
        from = to;
        to = tmp;
      }
      if (!isControlled) {
        setInternalFrom(from);
        setInternalTo(to);
      }
      setInputValue(formatRange(from, to));
      setInputInvalid(false);
      lastEmittedFromRef.current = from;
      lastEmittedToRef.current = to;
      onChange?.({ from, to });
      if (!showTime) close();
      else setAnchorDate(undefined);
    }
  }

  function handleDayMouseEnter(day: Date) {
    if (anchorDate) setHoveredDate(day);
  }

  function handleFromTimeChange(h: number, m: number, s: number) {
    const base = confirmedFrom ?? new Date();
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s,
    );
    if (!isControlled) setInternalFrom(newDate);
    lastEmittedFromRef.current = newDate;
    onChange?.({ from: newDate, to: confirmedTo });
  }

  function handleToTimeChange(h: number, m: number, s: number) {
    const base = confirmedTo ?? new Date();
    const newDate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      s,
    );
    if (!isControlled) setInternalTo(newDate);
    lastEmittedToRef.current = newDate;
    onChange?.({ from: confirmedFrom, to: newDate });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const cursorPos = input.selectionStart ?? 0;
    const raw = input.value;
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    const masked = applyRangeMask(digits);
    const digitsBeforeCursor = raw
      .slice(0, cursorPos)
      .replace(/\D/g, '').length;

    setInputValue(masked);
    setAnchorDate(undefined);
    setHoveredDate(undefined);

    const fromDigits = digits.slice(0, 8);
    const toDigits = digits.slice(8);
    const parsedFrom =
      fromDigits.length === 8
        ? parseDate(applyDateMask(fromDigits))
        : undefined;
    const parsedTo =
      toDigits.length === 8 ? parseDate(applyDateMask(toDigits)) : undefined;
    const fromComplete = fromDigits.length === 8;
    const toComplete = toDigits.length === 8;
    setInputInvalid((fromComplete && !parsedFrom) || (toComplete && !parsedTo));

    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange?.(
      parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : undefined,
    );

    requestAnimationFrame(() =>
      inputRef.current?.setSelectionRange(
        getRangeCursorPos(masked, digitsBeforeCursor),
        getRangeCursorPos(masked, digitsBeforeCursor),
      ),
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;

    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      return;
    }
    if (
      e.key === 'Backspace' &&
      pos > 0 &&
      /[\s—]/.test(input.value[pos - 1])
    ) {
      e.preventDefault();
      const val = input.value;
      const charsToSkip = val.slice(0, pos).match(/[\s—]+$/)?.[0].length ?? 1;
      const newPos = pos - charsToSkip;
      const masked = applyRangeMask(
        (val.slice(0, newPos - 1) + val.slice(newPos)).replace(/\D/g, ''),
      );
      setInputValue(masked);
      requestAnimationFrame(() =>
        input.setSelectionRange(newPos - 1, newPos - 1),
      );
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const digits = text.replace(/\D/g, '').slice(0, 16);
    const masked = applyRangeMask(digits);
    setInputValue(masked);
    setAnchorDate(undefined);
    setHoveredDate(undefined);

    const parsedFrom =
      digits.length >= 8
        ? parseDate(applyDateMask(digits.slice(0, 8)))
        : undefined;
    const parsedTo =
      digits.length >= 16
        ? parseDate(applyDateMask(digits.slice(8, 16)))
        : undefined;
    setInputInvalid(
      (digits.length >= 8 && !parsedFrom) || (digits.length >= 16 && !parsedTo),
    );
    if (!isControlled) {
      setInternalFrom(parsedFrom);
      setInternalTo(parsedTo);
    }
    lastEmittedFromRef.current = parsedFrom;
    lastEmittedToRef.current = parsedTo;
    onChange?.(
      parsedFrom || parsedTo ? { from: parsedFrom, to: parsedTo } : undefined,
    );

    requestAnimationFrame(() =>
      inputRef.current?.setSelectionRange(masked.length, masked.length),
    );
  }

  const placeholder =
    label && !focused && !filled ? undefined : 'дд.мм.гггг — дд.мм.гггг';
  const interactive = !disabled && !loading;

  return (
    <div
      ref={containerRef}
      className={[
        'datepicker',
        'daterangepicker',
        `datepicker--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-focused={focused || open || undefined}
      data-filled={filled || undefined}
      data-failed={failed || inputInvalid || undefined}
      data-disabled={!interactive || undefined}
    >
      <div
        className="datepicker__field"
        data-icon-start={
          resolvedIcon && iconPosition === 'start' ? true : undefined
        }
        data-icon-end={
          resolvedIcon && iconPosition === 'end' ? true : undefined
        }
        onClick={() => interactive && inputRef.current?.focus()}
      >
        {resolvedIcon && iconPosition === 'start' && (
          <span className="datepicker__icon datepicker__icon--start">
            {resolvedIcon}
          </span>
        )}
        {label && <span className="datepicker__label">{label}</span>}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className="datepicker__input"
          value={inputValue}
          placeholder={placeholder}
          disabled={!interactive}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => {
            setFocused(true);
            if (interactive) setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          aria-label={label ?? 'Выберите период'}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={inputInvalid || undefined}
        />
        {resolvedIcon && iconPosition === 'end' && (
          <span className="datepicker__icon datepicker__icon--end">
            {resolvedIcon}
          </span>
        )}
      </div>
      {open && (
        <div
          className={[
            'datepicker__popover',
            `datepicker__popover--${size}`,
            calendarLayout === 'horizontal' &&
              'datepicker__popover--horizontal',
            showTime && 'datepicker__popover--with-time',
          ]
            .filter(Boolean)
            .join(' ')}
          role="dialog"
          aria-label="Выберите период"
        >
          {showTime ? (
            <>
              <div className="datepicker__popover-body">
                <div className="datepicker__popover-calendar">
                  <Calendar
                    mode="range"
                    selected={calendarSelected}
                    onSelect={() => {}}
                    onDayClick={handleDayClick}
                    onDayMouseEnter={handleDayMouseEnter}
                    onDayMouseLeave={() => setHoveredDate(undefined)}
                    startMonth={fromDay}
                    endMonth={toDay}
                    disabled={disabledDays.length ? disabledDays : undefined}
                    numberOfMonths={2}
                    locale={ru}
                  />
                </div>
              </div>
              <div className="datepicker__time-row">
                <div className="datepicker__time-col">
                  <span className="datepicker__time-label">Начало</span>
                  <TimePanel
                    value={confirmedFrom}
                    showSeconds={showSeconds}
                    onChange={handleFromTimeChange}
                  />
                </div>
                <div className="datepicker__time-separator" />
                <div className="datepicker__time-col">
                  <span className="datepicker__time-label">Конец</span>
                  <TimePanel
                    value={confirmedTo}
                    showSeconds={showSeconds}
                    onChange={handleToTimeChange}
                  />
                </div>
              </div>
              <div className="datepicker__popover-footer">
                <button
                  className="datepicker__ok-btn"
                  type="button"
                  onClick={close}
                >
                  OK
                </button>
              </div>
            </>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}
