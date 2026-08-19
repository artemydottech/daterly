import type { FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import type { DateRange } from 'react-day-picker'
import type { DateRangePickerProps } from '../DateRangePicker'

/** Paths of T that hold a DateRange, so `rules` can infer the field value. */
export type DateRangePath<T extends FieldValues> = {
  [K in Path<T>]: FieldPathValue<T, K> extends DateRange | undefined ? K : never
}[Path<T>]

export interface RHFDateRangePickerProps<T extends FieldValues> extends Omit<DateRangePickerProps, 'value' | 'onChange' | 'failed'> {
  name: DateRangePath<T>
  rules?: Omit<RegisterOptions<T, DateRangePath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
