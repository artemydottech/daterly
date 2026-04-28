import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Компоненты/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Базовый календарь — всегда виден, без инпута. Используйте как строительный блок или когда нужен inline-выбор даты на странице. Для выбора даты через поле ввода используйте **DatePicker**.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const ОдиночнаяДата: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return <Calendar mode="single" selected={date} onSelect={setDate} />
  },
}

export const Диапазон: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()
    return <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
  },
}
