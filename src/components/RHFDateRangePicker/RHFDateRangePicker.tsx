import { Controller, useFormContext, type FieldValues } from 'react-hook-form'
import { DateRangePicker } from '../DateRangePicker'
import type { RHFDateRangePickerProps } from './RHFDateRangePicker.types'

export function RHFDateRangePicker<T extends FieldValues>({ name, rules, ...props }: RHFDateRangePickerProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="rtdp-rhf">
          <DateRangePicker value={value} onChange={onChange} failed={Boolean(error)} {...props} />
          {error?.message && <span className="rtdp-rhf__error">{error.message}</span>}
        </div>
      )}
    />
  )
}
