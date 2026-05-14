# daterly

[![npm version](https://img.shields.io/npm/v/daterly?color=blue)](https://www.npmjs.com/package/daterly)
[![npm downloads](https://img.shields.io/npm/dm/daterly?color=green)](https://www.npmjs.com/package/daterly)
[![CI](https://github.com/artemydottech/daterly/actions/workflows/ci.yml/badge.svg)](https://github.com/artemydottech/daterly/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/artemydottech/daterly/branch/main/graph/badge.svg)](https://codecov.io/gh/artemydottech/daterly)
[![publish size](https://badgen.net/packagephobia/publish/daterly)](https://packagephobia.com/result?p=daterly)

React DatePicker с маской ввода, поддержкой произвольных локалей и форматов даты, выбором диапазона и времени, опциональной интеграцией с react-hook-form. Построен на [react-day-picker v9](https://daypicker.dev/) и [date-fns v4](https://date-fns.org/).

**📚 [Документация и примеры →](https://artemydottech.github.io/daterly)**

## Возможности

- Одиночная дата и диапазон
- Контролируемый и неконтролируемый режимы
- Выбор времени (`showTime`)
- **Произвольная локаль** через проп `locale` (любая локаль `date-fns`)
- **Произвольный формат даты** через проп `dateFormat` (`dd.MM.yyyy`, `MM/dd/yyyy`, `yyyy-MM-dd`, …) — маска ввода генерится автоматически
- Кастомный триггер (`customTrigger`) и кастомный инпут (`renderInput`) — интеграция с Ant Design, MUI, shadcn/ui и др.
- Интеграция с react-hook-form (нулевые издержки если не используется)
- Стилизация через CSS-переменные `--daterly-*`
- Полная поддержка TypeScript, в т.ч. дженерики для RHF-компонентов

## Установка

```bash
npm install daterly
```

Для интеграции с react-hook-form установите его как peer-зависимость:

```bash
npm install react-hook-form
```

## Quick start

```tsx
import 'daterly/styles';
import { DatePicker } from 'daterly';

export const Example = () => <DatePicker label="Дата рождения" />;
```

## Примеры

### DatePicker

```tsx
import { useState } from 'react';
import { DatePicker } from 'daterly';

// Неконтролируемый
<DatePicker label="Дата рождения" />

// Контролируемый
const [date, setDate] = useState<Date | undefined>();
<DatePicker label="Дата" value={date} onChange={setDate} />

// С выбором времени
<DatePicker label="Дата и время" showTime={{ format: 'HH:mm' }} />

// Ограничение диапазона
<DatePicker label="Дата заезда" fromDate={new Date()} />
```

### DateRangePicker

```tsx
import { useState } from 'react';
import { DateRangePicker, type DateRange } from 'daterly';

const [range, setRange] = useState<DateRange | undefined>();

<DateRangePicker
  label="Период проживания"
  value={range}
  onChange={setRange}
  calendarLayout="horizontal"
/>;
```

### Локали и форматы

По умолчанию: `locale = ru`, `dateFormat = 'dd.MM.yyyy'`. Любую локаль `date-fns` можно подключить точечно — маска и плейсхолдер пересчитаются автоматически.

```tsx
import { enUS, de } from 'date-fns/locale';
import { DatePicker, DateRangePicker } from 'daterly';

<DatePicker
  locale={enUS}
  dateFormat="MM/dd/yyyy"
  label="Birth date"
/>

<DatePicker
  locale={enUS}
  dateFormat="yyyy-MM-dd"
  label="ISO date"
/>

<DateRangePicker
  locale={de}
  dateFormat="dd.MM.yyyy"
  label="Zeitraum"
/>
```

Поддерживаемые токены в `dateFormat`: `dd`, `MM`, `yyyy`. Разделители — любые одиночные символы (`.`, `/`, `-`, ` `). Время добавляется через проп `showTime`, а не через `dateFormat`.

### С react-hook-form

`RHFDatePicker` и `RHFDateRangePicker` принимают дженерик-параметр — тип значений формы. Это даёт автокомплит и типобезопасность для `name`:

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { RHFDatePicker, RHFDateRangePicker } from 'daterly/rhf';
import type { DateRange } from 'daterly';

interface BookingFormValues {
  checkIn: Date | undefined;
  period: DateRange | undefined;
}

const BookingForm = () => {
  const methods = useForm<BookingFormValues>({
    defaultValues: { checkIn: undefined, period: undefined },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>
        <RHFDatePicker<BookingFormValues>
          name="checkIn"
          label="Дата заезда"
          rules={{ validate: (v) => v !== undefined || 'Выберите дату' }}
        />
        <RHFDateRangePicker<BookingFormValues>
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
};
```

> Полные рецепты для **Zod**, **Joi** и **shadcn/ui Form** — на [странице документации](https://artemydottech.github.io/daterly/docs/recipes).

## Стилизация

Подключите базовые стили и переопределите нужные CSS-переменные:

```css
@import 'daterly/styles';

:root {
  --daterly-color-accent: #6366f1;
  --daterly-radius: 8px;
  --daterly-border-color-focus: #6366f1;
}
```

Состояния задаются через `data-*`-атрибуты на корневом элементе (`data-focused`, `data-filled`, `data-failed`, `data-disabled`) — стилизуются без JS.

Полный список токенов и data-атрибутов — в [разделе Theming](https://artemydottech.github.io/daterly/docs/theming).

## API

Подробная справка по пропсам, типам и edge-cases — в [документации](https://artemydottech.github.io/daterly/docs).

## Лицензия

MIT
