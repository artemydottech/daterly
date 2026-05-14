import { DatePicker } from '../../../src/components/DatePicker'

export function CustomTriggerDatePicker() {
  return (
    <DatePicker
      customTrigger={(value, onClick) => (
        <button type="button" data-testid="custom-trigger" onClick={onClick}>
          {value || 'Select date'}
        </button>
      )}
    />
  )
}
