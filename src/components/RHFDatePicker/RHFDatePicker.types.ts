import type { FieldValues, Path, RegisterOptions } from 'react-hook-form'
import type { DatePickerProps } from '../DatePicker'

export interface RHFDatePickerProps<T extends FieldValues> extends Omit<DatePickerProps, 'value' | 'onChange' | 'failed'> {
  name: Path<T>
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
