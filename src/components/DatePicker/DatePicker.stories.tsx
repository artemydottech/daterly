import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Компоненты/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Поле ввода даты с выпадающим календарём. Используйте когда нужно встроить выбор даты в форму. Если нужен просто календарь без инпута — используйте **Calendar**.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['s', 'm', 'l'],
    },
    showTime: {
      control: 'select',
      options: ['—', 'HH:mm', 'HH:mm:ss'],
      mapping: {
        '—': undefined,
        'HH:mm': { format: 'HH:mm' },
        'HH:mm:ss': { format: 'HH:mm:ss' },
      },
    },
    value: { control: false },
    defaultValue: { control: false },
    fromDate: { control: false },
    toDate: { control: false },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const БезLabel: Story = {
  args: {
    size: 'm',
  },
}

export const СFloatingLabel: Story = {
  args: {
    label: 'Дата рождения',
    size: 'm',
  },
}

export const СВыборомВремени: Story = {
  args: {
    label: 'Дата и время',
    showTime: { format: 'HH:mm' } as never,
    size: 'm',
  },
}

export const ТолькоИнпут: Story = {
  args: {
    label: 'Дата',
    noCalendar: true,
    size: 'm',
  },
}

export const Отключённый: Story = {
  args: {
    label: 'Дата',
    disabled: true,
    size: 'm',
  },
}

export const Ошибка: Story = {
  args: {
    label: 'Дата',
    failed: true,
    size: 'm',
  },
}

export const Контролируемый: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <div>
        <DatePicker label="Дата заезда" value={date} onChange={setDate} />
        <p style={{ marginTop: 8, fontSize: 13, color: '#9e9e9e' }}>
          {date ? `Выбрано: ${date.toLocaleDateString('ru-RU')}` : 'Дата не выбрана'}
        </p>
      </div>
    )
  },
}

export const СОграничениемДат: Story = {
  args: {
    label: 'Дата (не раньше сегодня)',
    fromDate: new Date(),
    size: 'm',
  },
}
