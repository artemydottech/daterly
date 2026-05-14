import { useState } from 'react'
import { DatePicker } from '../../../src/components/DatePicker'

export function ControlledDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 0, 1, 12, 0, 0))
  return (
    <div>
      <DatePicker value={date} onChange={setDate} />
      <button onClick={() => setDate(new Date(2024, 5, 15, 12, 0, 0))}>Change</button>
    </div>
  )
}
