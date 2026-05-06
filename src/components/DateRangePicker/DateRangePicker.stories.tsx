import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { DateRange } from './DateRangePicker'
import { DateRangePicker } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Поле выбора диапазона дат. Первый клик устанавливает начало периода, второй — конец.',
      },
      story: { height: '460px' },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['s', 'm', 'l'] },
    calendarLayout: { control: 'radio', options: ['vertical', 'horizontal'] },
    iconPosition: { control: 'radio', options: ['start', 'end'] },
    showTime: {
      control: 'select',
      options: ['—', 'HH:mm', 'HH:mm:ss'],
      mapping: { '—': undefined, 'HH:mm': { format: 'HH:mm' }, 'HH:mm:ss': { format: 'HH:mm:ss' } },
    },
    value: { control: false },
    defaultValue: { control: false },
    fromDate: { control: false },
    toDate: { control: false },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  args: { size: 'm' },
}

export const WithLabel: Story = {
  args: { label: 'Период проживания', size: 'm' },
}

export const WithTimePicker: Story = {
  args: { label: 'Период', showTime: { format: 'HH:mm' } as never, size: 'm' },
}

export const Horizontal: Story = {
  args: { label: 'Период', calendarLayout: 'horizontal', size: 'm' },
  parameters: { docs: { story: { height: '420px' } } },
}

export const Disabled: Story = {
  args: { label: 'Период', disabled: true, size: 'm' },
}

export const Loading: Story = {
  args: { label: 'Период', loading: true, size: 'm' },
}

export const WithError: Story = {
  args: { label: 'Период', failed: true, size: 'm' },
}

export const NoIcon: Story = {
  args: { label: 'Период', icon: false, size: 'm' },
}

export const Controlled: Story = {
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
