import type { FieldPathValue, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import type { DatePickerProps } from '../DatePicker'

/** Paths of T that hold a Date, so `rules` can infer the field value. */
export type DatePath<T extends FieldValues> = {
  [K in Path<T>]: FieldPathValue<T, K> extends Date | undefined ? K : never
}[Path<T>]

export interface RHFDatePickerProps<T extends FieldValues> extends Omit<DatePickerProps, 'value' | 'onChange' | 'failed'> {
  name: DatePath<T>
  rules?: Omit<RegisterOptions<T, DatePath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
