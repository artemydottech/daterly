import type { Meta, StoryObj } from '@storybook/react';
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
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
    size: { control: 'radio', options: ['s', 'm', 'l'] },
    iconPosition: { control: 'radio', options: ['start', 'end'] },
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
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { size: 'm' },
};

export const WithLabel: Story = {
  args: { label: 'Дата рождения', size: 'm' },
};

export const WithTimePicker: Story = {
  args: {
    label: 'Дата и время',
    showTime: { format: 'HH:mm' } as never,
    size: 'm',
  },
};

export const InputOnly: Story = {
  args: { label: 'Дата', noCalendar: true, size: 'm' },
};

export const Disabled: Story = {
  args: { label: 'Дата', disabled: true, size: 'm' },
};

export const Loading: Story = {
  args: { label: 'Дата', loading: true, size: 'm' },
};

export const WithError: Story = {
  args: { label: 'Дата', failed: true, size: 'm' },
};

export const IconAtStart: Story = {
  args: { label: 'Дата', iconPosition: 'start', size: 'm' },
};

export const NoIcon: Story = {
  args: { label: 'Дата', icon: false, size: 'm' },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div>
        <DatePicker label="Дата заезда" value={date} onChange={setDate} />
        <p style={{ marginTop: 8, fontSize: 13, color: '#9e9e9e' }}>
          {date
            ? `Выбрано: ${date.toLocaleDateString('ru-RU')}`
            : 'Дата не выбрана'}
        </p>
      </div>
    );
  },
};

export const WithDateConstraints: Story = {
  render: () => (
    <DatePicker
      label="Дата (не раньше сегодня)"
      fromDate={new Date()}
      size="m"
    />
  ),
};

export const WithCustomInput: Story = {
  name: 'Кастомный триггер (customInput)',
  parameters: {
    docs: {
      description: {
        story: `Через проп \`customInput\` можно передать любой элемент-триггер — кнопку, chip и т.д.
DatePicker инжектит в него \`value\` (отформатированная дата) и \`onClick\` (открыть/закрыть календарь).
\`forwardRef\` не нужен.

\`\`\`tsx
<DatePicker
  customInput={<button type="button">Выбрать дату</button>}
/>
\`\`\``,
      },
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div>
        <DatePicker
          value={date}
          onChange={setDate}
          icon={false}
          customInput={
            <button
              type="button"
              style={{ padding: '6px 14px', cursor: 'pointer', borderRadius: 6, border: '1px solid #d9d9d9' }}
            >
              {date ? undefined : 'Выбрать дату'}
            </button>
          }
        />
        <p style={{ marginTop: 8, fontSize: 13, color: '#9e9e9e' }}>
          {date ? `Выбрано: ${date.toLocaleDateString('ru-RU')}` : 'Дата не выбрана'}
        </p>
      </div>
    );
  },
};

export const WithAntdInput: Story = {
  name: 'Кастомный инпут (Ant Design)',
  parameters: {
    docs: {
      description: {
        story: `Через проп \`renderInput\` можно заменить встроенный инпут на любой другой компонент UI-библиотеки.
Вся логика маски, валидации и попапа остаётся внутри \`DatePicker\` — кастомному инпуту нужно лишь пробросить полученные пропсы.

\`\`\`tsx
import { Input } from 'antd'
import type { InputRef } from 'antd'

<DatePicker
  icon={false}
  renderInput={({ ref, className, ...props }) => (
    <Input ref={ref as React.Ref<InputRef>} {...props} />
  )}
/>
\`\`\``,
      },
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ maxWidth: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          icon={false}
          renderInput={({ ref, className, ...props }) => (
            <Input
              ref={ref as React.Ref<InputRef>}
              {...props}
              placeholder="дд.мм.гггг"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            />
          )}
        />
        <p style={{ marginTop: 8, fontSize: 13, color: '#9e9e9e' }}>
          {date
            ? `Выбрано: ${date.toLocaleDateString('ru-RU')}`
            : 'Дата не выбрана'}
        </p>
      </div>
    );
  },
};
