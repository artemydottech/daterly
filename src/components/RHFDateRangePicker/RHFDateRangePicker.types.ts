import type { FieldValues, Path, RegisterOptions } from 'react-hook-form'
import type { DateRangePickerProps } from '../DateRangePicker'

export interface RHFDateRangePickerProps<T extends FieldValues> extends Omit<DateRangePickerProps, 'value' | 'onChange' | 'failed'> {
  name: Path<T>
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
