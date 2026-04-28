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
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const БезLabel: Story = {
  args: {
    placeholder: 'дд.мм.гггг',
  },
}

export const СFloatingLabel: Story = {
  args: {
    label: 'Дата рождения',
  },
}

export const Отключённый: Story = {
  args: {
    label: 'Дата',
    disabled: true,
  },
}

export const Ошибка: Story = {
  args: {
    label: 'Дата',
    failed: true,
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
  },
}
