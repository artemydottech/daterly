# [@artemy-tech/datepicker](https://www.npmjs.com/package/@artemy-tech/datepicker)

[![npm version](https://img.shields.io/npm/v/@artemy-tech/datepicker?color=blue)](https://www.npmjs.com/package/@artemy-tech/datepicker)
[![npm downloads](https://img.shields.io/npm/dm/@artemy-tech/datepicker?color=green)](https://www.npmjs.com/package/@artemy-tech/datepicker)
[![CI](https://github.com/artemydottech/datepicker/actions/workflows/ci.yml/badge.svg)](https://github.com/artemydottech/datepicker/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/artemydottech/datepicker/branch/main/graph/badge.svg)](https://codecov.io/gh/artemydottech/datepicker)
[![publish size](https://badgen.net/packagephobia/publish/@artemy-tech/datepicker)](https://packagephobia.com/result?p=@artemy-tech/datepicker)

React DatePicker с опциональной поддержкой react-hook-form. Построен на базе [react-day-picker v9](https://daypicker.dev/) (headless) и [date-fns v4](https://date-fns.org/).

## Возможности

- Выбор одиночной даты и диапазона дат
- Контролируемый и неконтролируемый режимы
- Выбор времени (`showTime`)
- Кастомный триггер через `customTrigger` — render-функция, получает текущее значение и `onClick`
- Кастомный инпут через `renderInput` — интеграция с любой UI-библиотекой (Ant Design, MUI, shadcn и др.)
- Интеграция с react-hook-form (нулевые издержки если не используется)
- Стилизация через CSS-переменные (`--datepicker-*`)
- Полная поддержка TypeScript

## Установка

```bash
npm install @artemy-tech/datepicker
```

Для интеграции с react-hook-form:

```bash
npm install @artemy-tech/datepicker react-hook-form
```

## Peer-зависимости

```text
react >= 17.0.0
react-hook-form >= 7.0.0  # опционально
```

## Использование

### Подключение стилей

```tsx
import '@artemy-tech/datepicker/styles';
```

### DatePicker

```tsx
import { DatePicker } from '@artemy-tech/datepicker'

// Неконтролируемый
<DatePicker label="Дата рождения" />

// Контролируемый
const [date, setDate] = useState<Date | undefined>()
<DatePicker label="Дата" value={date} onChange={setDate} />

// С выбором времени
<DatePicker label="Дата и время" showTime={{ format: 'HH:mm' }} />

// Ограничение диапазона
<DatePicker label="Дата заезда" fromDate={new Date()} />
```

### DateRangePicker

```tsx
import { DateRangePicker } from '@artemy-tech/datepicker'
import type { DateRange } from '@artemy-tech/datepicker'

const [range, setRange] = useState<DateRange | undefined>()

<DateRangePicker
  label="Период проживания"
  value={range}
  onChange={setRange}
  calendarLayout="horizontal"
/>
```

### Кастомный триггер (`customTrigger`)

Через `customTrigger` можно передать render-функцию, которая получает отформатированное значение и обработчик клика.

```tsx
import { DatePicker } from '@artemy-tech/datepicker';

<DatePicker
  customTrigger={(value, onClick) => (
    <button type="button" onClick={onClick}>
      {value || 'Выбрать дату'}
    </button>
  )}
/>;
```

### Кастомный инпут (`renderInput`)

Через `renderInput` можно заменить встроенный `<input>` на компонент из любой UI-библиотеки. Вся логика маски, валидации и попапа остаётся внутри `DatePicker`.

```tsx
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { DatePicker } from '@artemy-tech/datepicker';

<DatePicker
  renderInput={({ ref, className, ...props }) => (
    <Input ref={ref as React.Ref<InputRef>} {...props} />
  )}
/>;
```

### С react-hook-form

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { RHFDatePicker, RHFDateRangePicker } from '@artemy-tech/datepicker/rhf';
import type { DateRange } from '@artemy-tech/datepicker';

interface FormValues {
  checkIn: Date | undefined;
  period: DateRange | undefined;
}

function BookingForm() {
  const methods = useForm<FormValues>({
    defaultValues: { checkIn: undefined, period: undefined },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>
        <RHFDatePicker
          name="checkIn"
          label="Дата заезда"
          rules={{ validate: (v) => v !== undefined || 'Выберите дату' }}
        />
        <RHFDateRangePicker
          name="period"
          label="Период"
          rules={{
            validate: (v) => v?.from !== undefined || 'Выберите период',
          }}
        />
        <button type="submit">Отправить</button>
      </form>
    </FormProvider>
  );
}
```

## Props

### DatePicker — пропсы

| Prop            | Тип                                                 | По умолчанию       | Описание                                       |
| --------------- | --------------------------------------------------- | ------------------ | ---------------------------------------------- |
| `value`         | `Date`                                              | —                  | Контролируемое значение                        |
| `defaultValue`  | `Date`                                              | —                  | Значение по умолчанию (неконтролируемый режим) |
| `onChange`      | `(date: Date \| undefined) => void`                 | —                  | Callback при изменении                         |
| `label`         | `string`                                            | —                  | Плавающий лейбл                                |
| `placeholder`   | `string`                                            | `дд.мм.гггг`       | Плейсхолдер                                    |
| `fromDate`      | `Date`                                              | —                  | Минимально допустимая дата                     |
| `toDate`        | `Date`                                              | —                  | Максимально допустимая дата                    |
| `showTime`      | `boolean \| { format: 'HH:mm' \| 'HH:mm:ss' }`      | —                  | Включить выбор времени                         |
| `noCalendar`    | `boolean`                                           | `false`            | Только ввод, без попапа                        |
| `size`          | `'s' \| 'm' \| 'l'`                                 | `'m'`              | Размер                                         |
| `disabled`      | `boolean`                                           | `false`            |                                                |
| `failed`        | `boolean`                                           | `false`            | Состояние ошибки                               |
| `loading`       | `boolean`                                           | `false`            | Состояние загрузки                             |
| `icon`          | `ReactNode \| false`                                | `<CalendarIcon />` | Иконка (`false` — скрыть)                      |
| `iconPosition`  | `'start' \| 'end'`                                  | `'end'`            | Позиция иконки                                 |
| `renderInput`   | `(props: DatePickerInputProps) => ReactNode`        | —                  | Кастомный `<input>`; маска и попап сохраняются |
| `customTrigger` | `(value: string, onClick: () => void) => ReactNode` | —                  | Render-функция для произвольного триггера      |
| `className`     | `string`                                            | —                  | CSS-класс на корневом элементе                 |

### DateRangePicker — пропсы

| Prop             | Тип                                            | По умолчанию       | Описание                    |
| ---------------- | ---------------------------------------------- | ------------------ | --------------------------- |
| `value`          | `DateRange`                                    | —                  | Контролируемое значение     |
| `defaultValue`   | `DateRange`                                    | —                  | Значение по умолчанию       |
| `onChange`       | `(range: DateRange \| undefined) => void`      | —                  | Callback при изменении      |
| `label`          | `string`                                       | —                  | Плавающий лейбл             |
| `fromDate`       | `Date`                                         | —                  | Минимально допустимая дата  |
| `toDate`         | `Date`                                         | —                  | Максимально допустимая дата |
| `calendarLayout` | `'vertical' \| 'horizontal'`                   | `'horizontal'`     | Расположение двух месяцев   |
| `showTime`       | `boolean \| { format: 'HH:mm' \| 'HH:mm:ss' }` | —                  | Включить выбор времени      |
| `size`           | `'s' \| 'm' \| 'l'`                            | `'m'`              | Размер                      |
| `disabled`       | `boolean`                                      | `false`            |                             |
| `failed`         | `boolean`                                      | `false`            |                             |
| `loading`        | `boolean`                                      | `false`            |                             |
| `icon`           | `ReactNode \| false`                           | `<CalendarIcon />` | Иконка                      |
| `iconPosition`   | `'start' \| 'end'`                             | `'end'`            |                             |
| `className`      | `string`                                       | —                  |                             |

### RHFDatePicker / RHFDateRangePicker — пропсы

Принимают все пропсы соответствующего компонента, плюс:

| Prop    | Тип               | Описание                          |
| ------- | ----------------- | --------------------------------- |
| `name`  | `string`          | Имя поля в форме                  |
| `rules` | `RegisterOptions` | Правила валидации react-hook-form |

## Стилизация

Подключите базовые стили и переопределите нужные токены:

```css
@import '@artemy-tech/datepicker/styles';

:root {
  --datepicker-color-accent: #6366f1;
  --datepicker-radius: 8px;
  --datepicker-font-size: 14px;
  --datepicker-border-color: #e0e0e0;
  --datepicker-border-color-focus: #6366f1;
  --datepicker-bg: #ffffff;
  --datepicker-color-text: #1a1a1a;
  --datepicker-color-placeholder: #9e9e9e;
}
```

Состояния задаются через `data-*`-атрибуты на корневом элементе, что позволяет стилизовать их без JS:

```css
.datepicker[data-focused] {
  ...;
}
.datepicker[data-filled] {
  ...;
}
.datepicker[data-failed] {
  ...;
}
.datepicker[data-disabled] {
  ...;
}
```

## Лицензия

MIT
