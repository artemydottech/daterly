# @artemy-tech/datepicker

React DatePicker с опциональной поддержкой react-hook-form. Построен на базе [react-day-picker v9](https://daypicker.dev/) (headless) и [date-fns v3](https://date-fns.org/).

## Возможности

- Выбор одиночной даты и диапазона дат
- Контролируемый и неконтролируемый режимы
- Интеграция с react-hook-form (нулевые издержки если не используется)
- Стилизация через CSS-переменные (`--datepicker-*`)
- Полная поддержка TypeScript
- Доступность (через react-day-picker)

## Установка

```bash
npm install @artemy-tech/datepicker
```

Для интеграции с react-hook-form:

```bash
npm install @artemy-tech/datepicker react-hook-form
```

## Peer-зависимости

```
react >= 17.0.0
react-dom >= 17.0.0
react-hook-form >= 7.0.0  # опционально
```

## Использование

### DatePicker

```tsx
import { DatePicker } from '@artemy-tech/datepicker'
import '@artemy-tech/datepicker/styles'

// Неконтролируемый
<DatePicker />

// Контролируемый
const [date, setDate] = useState<Date>()
<DatePicker value={date} onChange={setDate} />
```

### DateRangePicker

```tsx
import { DateRangePicker } from '@artemy-tech/datepicker'

const [range, setRange] = useState<{ from: Date; to?: Date }>()
<DateRangePicker value={range} onChange={setRange} />
```

### С react-hook-form

```tsx
import { useForm } from 'react-hook-form'
import { RHFDatePicker } from '@artemy-tech/datepicker/rhf'

const { control } = useForm()

<RHFDatePicker name="date" control={control} />
```

## Стилизация

Подключите базовые стили и переопределите через CSS-переменные:

```css
@import '@artemy-tech/datepicker/styles';

:root {
  --datepicker-color-accent: #6366f1;
  --datepicker-radius: 8px;
  --datepicker-font-size: 14px;
}
```

## Лицензия

MIT
