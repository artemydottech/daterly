import { useState } from 'react'
import { DateRangePicker } from '../../../src/components/DateRangePicker'
import type { DateRange } from '../../../src/components/DateRangePicker'

export function RangeSelectionWrapper() {
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <div>
      <DateRangePicker onChange={setRange} />
      <div data-testid="result">
        {range?.from ? `from:${range.from.getDate()}` : 'none'}
        {range?.to ? ` to:${range.to.getDate()}` : ''}
      </div>
    </div>
  )
}
