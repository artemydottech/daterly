import { DayPicker, DayPickerProps } from 'react-day-picker'

export type CalendarProps = DayPickerProps & {
  className?: string
}

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={['rtdp-calendar', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
