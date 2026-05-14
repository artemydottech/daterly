import { useState } from 'react'
import { DateRangePicker } from '../../../src/components/DateRangePicker'
import type { DateRange } from '../../../src/components/DateRangePicker'

export function ControlledDateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1, 12, 0, 0),
    to: new Date(2024, 5, 30, 12, 0, 0),
  })
  return (
    <div>
      <DateRangePicker value={range} onChange={setRange} />
      <button
        onClick={() =>
          setRange({
            from: new Date(2024, 2, 1, 12, 0, 0),
            to: new Date(2024, 8, 30, 12, 0, 0),
          })
        }
      >
        Change
      </button>
    </div>
  )
}
