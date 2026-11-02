# daterly

**English** | [Русский](README.ru.md)

![daterly](docs/public/og.png)

[![npm version](https://img.shields.io/npm/v/daterly?color=blue)](https://www.npmjs.com/package/daterly)
[![npm downloads](https://img.shields.io/npm/dm/daterly?color=green)](https://www.npmjs.com/package/daterly)
[![CI](https://github.com/artemydottech/daterly/actions/workflows/ci.yml/badge.svg)](https://github.com/artemydottech/daterly/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/artemydottech/daterly/branch/main/graph/badge.svg)](https://codecov.io/gh/artemydottech/daterly)
[![Brotli size](https://img.shields.io/badge/brotli-~34_kB-blue)](https://bundlephobia.com/package/daterly)

React DatePicker with input masking, custom locales and date formats, range and time selection, and optional react-hook-form integration. Built on [react-day-picker v9](https://daypicker.dev/) and [date-fns v4](https://date-fns.org/).

**📚 [Documentation and examples →](https://artemydottech.github.io/daterly/en/)**

## Features

- Single dates and date ranges
- Controlled and uncontrolled modes
- Time selection (`showTime`)
- **Custom locale** through the `locale` prop (any `date-fns` locale)
- **Custom date format** through `dateFormat` (`dd.MM.yyyy`, `MM/dd/yyyy`, `yyyy-MM-dd`, …), with an automatically generated input mask
- Custom triggers (`customTrigger`) and inputs (`renderInput`) for integration with Ant Design, MUI, shadcn/ui, and other component libraries
- Optional react-hook-form integration, with no overhead when unused
- Theming through `--daterly-*` CSS custom properties
- Full TypeScript support, including generic RHF components

## Installation

```bash
npm install daterly
```

To use the react-hook-form integration, install its peer dependency:

```bash
npm install react-hook-form
```

## Quick start

```tsx
import { DatePicker } from 'daterly';

export const Example = () => <DatePicker label="Date of birth" />;
```

## Examples

### DatePicker

```tsx
import { useState } from 'react';
import { DatePicker } from 'daterly';

// Uncontrolled
<DatePicker label="Date of birth" />

// Controlled
const [date, setDate] = useState<Date | undefined>();
<DatePicker label="Date" value={date} onChange={setDate} />

// With time selection
<DatePicker label="Date and time" showTime={{ format: 'HH:mm' }} />

// Date constraints
<DatePicker label="Check-in date" fromDate={new Date()} />
```

### DateRangePicker

```tsx
import { useState } from 'react';
import { DateRangePicker, type DateRange } from 'daterly';

const [range, setRange] = useState<DateRange | undefined>();

<DateRangePicker
  label="Booking period"
  value={range}
  onChange={setRange}
  calendarLayout="horizontal"
/>;
```

### Locales and formats

Defaults: `locale = ru`, `dateFormat = 'dd.MM.yyyy'`. Import any `date-fns` locale individually; the mask and placeholder update automatically.

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

Supported `dateFormat` tokens: `dd`, `MM`, `yyyy`. Separators can be any single character (`.`, `/`, `-`, ` `). Add time through `showTime`, rather than `dateFormat`.

### With react-hook-form

`RHFDatePicker` and `RHFDateRangePicker` accept a generic form values type, providing autocomplete and type safety for `name`:

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
          label="Check-in date"
          rules={{ validate: (v) => v !== undefined || 'Choose a date' }}
        />
        <RHFDateRangePicker<BookingFormValues>
          name="period"
          label="Period"
          rules={{
            validate: (v) => v?.from !== undefined || 'Choose a period',
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
```

> Full recipes for **Zod**, **Joi**, and **shadcn/ui Form** are available in the [documentation](https://artemydottech.github.io/daterly/en/docs/recipes).

## Theming

Base styles load automatically when importing from `daterly` or `daterly/rhf`. Your app bundler must support CSS imports. Override the CSS custom properties you need:

```css
:root {
  --daterly-color-accent: #6366f1;
  --daterly-radius: 8px;
  --daterly-color-border-focus: #6366f1;
}
```

State is exposed through root `data-*` attributes (`data-focused`, `data-filled`, `data-failed`, `data-disabled`), so state styling requires no JavaScript.

See the [Theming guide](https://artemydottech.github.io/daterly/en/docs/theming) for the complete list of tokens and data attributes.

## API

See the [documentation](https://artemydottech.github.io/daterly/en/docs) for the full reference of props, types, and edge cases.

## License

MIT

[Contributing](CONTRIBUTING.md) · [Changelog](CHANGELOG.md)
