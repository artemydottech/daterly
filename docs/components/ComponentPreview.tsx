import { useState, type ReactNode } from 'react'
import { ru, enUS, de } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import {
  DatePicker,
  DateRangePicker,
  Calendar,
  type DateRange,
} from '@artemy-tech/rtdp'
import styles from './ComponentPreview.module.css'

type Kind = 'date' | 'range' | 'calendar'
type LocaleKey = 'ru' | 'en' | 'de'
type Size = 's' | 'm' | 'l'
type CalendarMode = 'single' | 'range' | 'multiple'

type Props = {
  kind: Kind
  title?: ReactNode
  showTime?: boolean | { format: 'HH:mm' | 'HH:mm:ss' }
  locale?: LocaleKey
  dateFormat?: string
  size?: Size
  label?: string
  mode?: CalendarMode
  numberOfMonths?: number
}

const LOCALES: Record<LocaleKey, Locale> = {
  ru,
  en: enUS,
  de,
}

const LOCALE_LABEL: Record<LocaleKey, string> = {
  ru: 'ru',
  en: 'en-US',
  de: 'de',
}

export default function ComponentPreview({
  kind,
  title,
  showTime,
  locale,
  dateFormat,
  size,
  label,
  mode = 'single',
  numberOfMonths,
}: Props) {
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  const [multi, setMulti] = useState<Date[] | undefined>()

  const localeObj = locale ? LOCALES[locale] : undefined
  const titleSuffix = [
    locale && `locale=${LOCALE_LABEL[locale]}`,
    dateFormat && `format=${dateFormat}`,
    size && `size=${size}`,
    showTime && (typeof showTime === 'object' ? showTime.format : 'HH:mm:ss'),
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.badge}>preview</span>
        <span className={styles.title}>
          {title ?? 'Живой компонент'}
          {titleSuffix && (
            <span className={styles.titleMeta}> · {titleSuffix}</span>
          )}
        </span>
      </div>
      <div className={styles.stage} data-kind={kind}>
        {kind === 'date' && (
          <DatePicker
            label={label ?? 'Дата'}
            value={date}
            onChange={setDate}
            showTime={showTime}
            locale={localeObj}
            dateFormat={dateFormat}
            size={size}
          />
        )}
        {kind === 'range' && (
          <DateRangePicker
            label={label ?? 'Период'}
            value={range}
            onChange={setRange}
            showTime={showTime}
            locale={localeObj}
            dateFormat={dateFormat}
            size={size}
          />
        )}
        {kind === 'calendar' && mode === 'single' && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={localeObj}
            numberOfMonths={numberOfMonths}
          />
        )}
        {kind === 'calendar' && mode === 'range' && (
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            locale={localeObj}
            numberOfMonths={numberOfMonths ?? 2}
          />
        )}
        {kind === 'calendar' && mode === 'multiple' && (
          <Calendar
            mode="multiple"
            selected={multi}
            onSelect={setMulti}
            locale={localeObj}
            numberOfMonths={numberOfMonths}
          />
        )}
      </div>
    </div>
  )
}
