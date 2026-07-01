# AGENTS.md — daterly

Machine-oriented quick reference for AI agents working with **daterly**. For repo build/release rules see [CLAUDE.md](./CLAUDE.md).

## What it is

`daterly` — React date-input library for the Russian market. Built on **react-day-picker v9** (headless calendar) + **date-fns v4** (parse/format). Ships its own digit mask — no `imask`/`react-input-mask` needed.

- Defaults: locale `ru`, format `dd.MM.yyyy`.
- Peer deps: `react >=17`. `react-hook-form >=7` (optional, only for the `./rhf` entry).
- Styling is headless: CSS custom properties (`--daterly-*`) + `data-*` state attributes. No JS class toggling.

## Install

```bash
npm install daterly
```

```tsx
import 'daterly/styles' // required once, app entry — base CSS vars + calendar styles
import { DatePicker } from 'daterly'
```

## Exports

| Import | Provides |
|--------|----------|
| `daterly` | `Calendar`, `DatePicker`, `DateRangePicker`, `Button` + their prop types, `DateRange` |
| `daterly/rhf` | `RHFDatePicker`, `RHFDateRangePicker` (react-hook-form wrappers) |
| `daterly/styles` | CSS variables + react-day-picker base styles |

## Usage

```tsx
// Uncontrolled
<DatePicker label="Дата рождения" defaultValue={new Date()} />

// Controlled — controlled mode is detected by `value !== undefined`
const [date, setDate] = useState<Date>()
<DatePicker value={date} onChange={setDate} />

// Range — DateRange = { from?: Date; to?: Date } (re-exported from react-day-picker)
import { DateRangePicker, type DateRange } from 'daterly'
const [range, setRange] = useState<DateRange>()
<DateRangePicker value={range} onChange={setRange} />

// Bare calendar — CalendarProps = DayPickerProps & { className? }
import { Calendar } from 'daterly'
<Calendar mode="single" selected={date} onSelect={setDate} />
```

## Key props

`DatePicker` (all optional):

| Prop | Type | Default | Note |
|------|------|---------|------|
| `value` / `defaultValue` | `Date` | — | controlled vs uncontrolled |
| `onChange` | `(date?: Date) => void` | — | |
| `label` / `placeholder` | `string` | auto | placeholder derived from format |
| `locale` | date-fns `Locale` | `ru` | any date-fns locale |
| `dateFormat` | `string` | `'dd.MM.yyyy'` | mask + placeholder derive from it |
| `fromDate` / `toDate` | `Date` | — | selectable range bounds |
| `showTime` | `boolean \| { format: 'HH:mm' \| 'HH:mm:ss' }` | — | adds time to mask |
| `timePickerType` | `'input' \| 'drum'` | `'input'` | |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | |
| `disabled` / `failed` / `loading` | `boolean` | `false` | drive `data-*` state |
| `noCalendar` | `boolean` | `false` | text field only, no popover |
| `icon` | `ReactNode \| false` | calendar | `false` hides it |
| `usePortal` | `boolean` | `false` | render popover in a portal |
| `renderInput` / `customTrigger` | render fns | — | full input/trigger override |

`DateRangePicker` — same core props, plus `calendarLayout?: 'vertical' | 'horizontal'` (default `'horizontal'`). Mask covers two dates (`dd.MM.yyyy — dd.MM.yyyy`). Range selection is two-phase: first click sets anchor, second confirms and closes.

## Locale & format

Two props cover it — the mask, placeholder, and validation all derive automatically:

```tsx
import { enUS } from 'date-fns/locale'
<DatePicker locale={enUS} dateFormat="MM/dd/yyyy" />
```

## react-hook-form

Wrappers read `control` from context — mount inside `FormProvider`. Props = `DatePickerProps` minus `value`/`onChange`/`failed`, plus `name` and `rules`. Validation error sets `failed` and renders under the field.

```tsx
import { FormProvider, useForm } from 'react-hook-form'
import { RHFDatePicker } from 'daterly/rhf'

const methods = useForm<{ birthday: Date | null }>()
<FormProvider {...methods}>
  <RHFDatePicker name="birthday" rules={{ required: 'Обязательное поле' }} />
</FormProvider>
```

## Theming

Override CSS variables (prefix `--daterly-*`, NOT `--datepicker-*`). Component state is exposed via `data-*` attributes on the root — style against them, do not toggle classes.

```css
:root {
  --daterly-color-accent: #7c3aed;
  --daterly-color-border-focus: #7c3aed;
  --daterly-height: 44px;
  --daterly-radius: 8px;
}
```

State attributes on the root: `data-focused`, `data-filled`, `data-failed`, `data-disabled`.

## Gotchas

- Import `daterly/styles` exactly once at the app entry — components are unstyled without it.
- Controlled mode = `value` is passed (even `undefined` counts as controlled). For uncontrolled, use `defaultValue` and never pass `value`.
- Invalid dates (e.g. `32.01.2024`) are rejected by a round-trip check `format(parse(x)) === x`.
- The mask is digit-only; paste strips non-digits; backspace skips separators.

## Repo dev (contributors)

```bash
npm run build   # tsup → dist/ (ESM + CJS + d.ts)
npm run test    # vitest
npm run test:e2e # playwright component tests
npm -w docs run dev  # docs site (Next.js + Fumadocs, i18n ru/en)
```

Docs live in `docs/` (Fumadocs, App Router). Content: `docs/content/docs/**` — `*.mdx` = ru (default), `*.en.mdx` = en; order/labels in `meta.json` / `meta.en.json`.
