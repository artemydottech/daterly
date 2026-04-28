import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { DateRange } from './DateRangePicker'
import { DateRangePicker } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Компоненты/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '460px',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

export const БезLabel: Story = {}

export const СFloatingLabel: Story = {
  args: {
    label: 'Период проживания',
  },
}

export const Отключённый: Story = {
  args: {
    label: 'Период',
    disabled: true,
  },
}

export const Контролируемый: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return (
      <div>
        <DateRangePicker label="Период" value={range} onChange={setRange} />
        <p style={{ marginTop: 8, fontSize: 13, color: '#9e9e9e' }}>
          {range?.from
            ? `С ${range.from.toLocaleDateString('ru-RU')}${range.to ? ` по ${range.to.toLocaleDateString('ru-RU')}` : ' — выберите конечную дату'}`
            : 'Диапазон не выбран'}
        </p>
      </div>
    )
  },
}
