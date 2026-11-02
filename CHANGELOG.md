# daterly

**English** | [Русский](CHANGELOG.ru.md)

## 2.2.1

### Patch Changes

- Automatically load calendar and input styles when importing from daterly or daterly/rhf, removing the need for a separate daterly/styles import. Preserve the existing stylesheet export and ensure Next.js keeps automatic styles during tree shaking.

## 2.2.0

### Minor Changes

- Add a `disabledDates` prop to `DatePicker` and `DateRangePicker` for blocking arbitrary dates. It accepts react-day-picker's `Matcher` shapes (`Date`, array, interval, day of week, predicate) and combines with `fromDate` / `toDate`.

  Fix `DateRangePicker` ignoring `fromDate` / `toDate` in two places:

  - the calendar rendered without `showTime` received neither `disabled` nor day-normalized `startMonth` / `endMonth`, so out-of-range days stayed clickable;
  - typed and pasted input was parsed and emitted through `onChange` without checking the constraints at all.

  Out-of-range input is now flagged invalid (`aria-invalid`, `onChange` receives `undefined` for that end) instead of being accepted.

## 2.1.0

### Minor Changes

- 2c65b2a: Add `clearable` and `clearIcon` props to `DatePicker` and `DateRangePicker`. With `clearable`, a clear button appears in the field while it holds a value; clicking it resets the value, emits `onChange(undefined)` and keeps focus in the input. `clearIcon` replaces the built-in cross. Styling goes through the new `--daterly-clear-color` and `--daterly-clear-color-hover` tokens.

## 2.0.0

### Major Changes

- 4a80533: Remove accidentally exported `Button` component from the public API.

  `Button` was never part of the intended surface of the library — it was unused
  internally and only reachable because `src/index.ts` re-exported it. The component,
  its `ButtonProps` type and the related `.dp-btn*` styles have been removed.

  **Migration:** if you imported `Button` from `daterly`, replace it with your own
  button component or a native `<button>`.

## 1.4.0

### Minor Changes

- Add `usePortal` to `DatePicker` and `DateRangePicker`.

  With `usePortal={true}`, the popover renders into `document.body` through `React.createPortal` with `position: fixed`. This prevents clipping and horizontal scrolling inside containers with `overflow: hidden`, including sidebars and modals.

  Changes:

  - `DatePicker`: new `usePortal?: boolean` prop, defaulting to `false`.
  - `DateRangePicker`: new `usePortal?: boolean` prop, defaulting to `false`.
  - Add `useFloatingPosition` to calculate `{ top, left }` for fixed popovers and update their position on scroll and resize.
  - Extend `useClickOutside` with `excludeRefs` so clicks inside portal popovers do not close them.
  - Add `.daterly__popover--portal` with `position: fixed; z-index: 9999`.

## 1.3.1

### Patch Changes

- 09c9a10: Inline react-day-picker base styles into the published `dist/styles/variables.css` at build time. The shipped stylesheet no longer contains `@import 'react-day-picker/style.css'`, so consumers' bundlers no longer need to resolve that import from `node_modules` (fixes broken styling in setups like CRA without `react-app-rewired`).

## 1.3.0

### Minor Changes

- 8462f22: Make `DatePicker` and `DateRangePicker` fill their container width with `display: block`, matching Ant Design behavior. Control their width through the wrapper.

  Add `--daterly-field-min-width` (220px) and `--daterly-range-min-width` (280px) CSS tokens to override the minimum width without `!important`.

## 1.2.1

### Patch Changes

- 6fa0185: Fix crash when `value`/`defaultValue` is a non-`Date` (e.g. an ISO string from RHF defaultValues or URL params). `DatePicker` and `DateRangePicker` now coerce incoming values to `Date` at the boundary: valid `Date`/ISO string/timestamp are accepted, anything unparseable renders empty instead of throwing `selected.getFullYear is not a function`.

## 1.2.0

### Minor Changes

- 63c3784: Improve accessibility for `DatePicker` and `DateRangePicker` inputs with `role="combobox"`, `aria-controls`, `aria-expanded`, and `aria-haspopup`. Previously, popup attributes were set on a plain textbox, causing an `aria-allowed-attr` violation.

  - Set `aria-invalid` on the input when `failed` is enabled, in addition to `data-failed` on the root.
  - Increase test coverage from 92.8% to 97.5% with `TimeInput` masking and keyboard tests, tests for `showTime` handlers, and axe accessibility checks.

  > Migration: the input role changed from `textbox` to `combobox`. Replace `getByRole('textbox')` with `getByRole('combobox')` in tests. With `noCalendar`, the role remains `textbox`.

## 1.1.0

### Minor Changes

- Add `TimeInput` as an alternative to the drum-style `TimePanel`, with direct hour, minute, and second input.
- Add `timePickerType: 'drum' | 'input'` to `DatePicker` and `DateRangePicker` to choose the time input mode.
- Extend `--datepicker-*` CSS tokens for time input customization.
- Fix `RHFDatePicker` and `RHFDateRangePicker` handling of `null` and `undefined` from react-hook-form so values no longer persist after a form reset.
- Update the `datepicker` and `daterangepicker` documentation with `timePickerType` examples.

## 1.0.0

### Major Changes — rebranding

- Rename the package from `@artemy-tech/rtdp` to **`daterly`**, published as an unscoped npm package.
- Update imports: `'@artemy-tech/rtdp'` to `'daterly'`, `'@artemy-tech/rtdp/rhf'` to `'daterly/rhf'`, and `'@artemy-tech/rtdp/styles'` to `'daterly/styles'`.
- Change the CSS custom property prefix from `--rtdp-*` to `--daterly-*`, for example `--rtdp-color-accent` to `--daterly-color-accent`.
- Rename CSS classes from `.rtdp` to `.daterly`, `.rtdp__field` to `.daterly__field`, `.rtdp-calendar` to `.daterly-calendar`, `.rtdp-range` to `.daterly-range`, `.rtdp-spinner` to `.daterly-spinner`, and the remaining BEM classes accordingly.
- React component names (`DatePicker`, `DateRangePicker`, `Calendar`, `RHFDatePicker`, and `RHFDateRangePicker`) remain unchanged.

### Migration

```diff
- npm install @artemy-tech/rtdp
+ npm install daterly
```

```diff
- import { DatePicker } from '@artemy-tech/rtdp'
- import '@artemy-tech/rtdp/styles'
+ import { DatePicker } from 'daterly'
+ import 'daterly/styles'
```

```diff
- :root { --rtdp-color-accent: #7c5cff; }
+ :root { --daterly-color-accent: #7c5cff; }
```

```diff
- <div className="rtdp rtdp--s">
+ <div className="daterly daterly--s">
```
