import { Controller, useFormContext, type FieldValues } from 'react-hook-form'
import { DatePicker } from '../DatePicker'
import type { RHFDatePickerProps } from './RHFDatePicker.types'

export function RHFDatePicker<T extends FieldValues>({ name, rules, ...props }: RHFDatePickerProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="datepicker-rhf">
          <DatePicker value={value} onChange={onChange} failed={Boolean(error)} {...props} />
          {error?.message && <span className="datepicker-rhf__error">{error.message}</span>}
        </div>
      )}
    />
  )
}
