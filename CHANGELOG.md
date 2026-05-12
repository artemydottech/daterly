# @artemy-tech/datepicker

## 0.5.0

### Minor Changes

- Добавлены unit/component тесты (Vitest + Testing Library), запуск тестов в CI (GitHub Actions) и pre-commit хук (Husky), который прогоняет тесты перед коммитом. Внутренний рефакторинг: логика маски ввода вынесена в `src/utils/date-mask` и `src/utils/range-mask`. `DatePicker` и `DateRangePicker` теперь корректно инициализируют отображаемое значение из `value` (а не только из `defaultValue`) при первом рендере в controlled-режиме.

## 0.4.3

### Patch Changes

- Rename `customInput` → `customTrigger`; change type from `ReactElement` to render-function `(value: string, onClick: () => void) => ReactNode`. Fixes bug where selected date was not displayed inside the trigger element.

## 0.4.2

### Patch Changes

- Add CONTRIBUTING.md with setup instructions, commit style guide, and PR process (Russian + English).

## 0.4.1

### Patch Changes

- Add `customInput` prop to `DatePicker` — pass any `ReactElement` to use as a trigger (button, chip, etc.). The element receives `value` and `onClick` via `cloneElement`; no `forwardRef` needed.

- Export `DatePickerInputProps` type from the public API (`@artemy-tech/datepicker`).

## 0.4.0

### Minor Changes

- Add Button component, RHF wrappers, and fix form integration.

  New exports via `./rhf`: `RHFDatePicker`, `RHFDateRangePicker` — Controller-based wrappers for react-hook-form with automatic error display.

  New `Button` component with `primary`/`secondary` variants, `s`/`m` sizes, and `loading` state with centered spinner.

  Fix: spinner drift in Button loading state (animation transform conflict with centering transform).

  Fix: `DatePicker` and `DateRangePicker` not clearing on `methods.reset()` when used inside react-hook-form — `wasControlledRef` was never set due to early return on value echo.

### Patch Changes

- Fixed style & date issues

## 0.3.0

### Minor Changes

- Add `Button` component with `primary`/`secondary` variants, `s`/`m`/`l` sizes, and `loading` state with a centered spinner.

- Add `RHFDatePicker` and `RHFDateRangePicker` — Controller-based wrappers for react-hook-form, exported via `@artemy-tech/datepicker/rhf`. Automatically display validation error messages under the field.

- Fix: spinner drifting in `Button` loading state — CSS animation `transform` was overriding the centering `translate`, replaced with `calc()`-based positioning.

- Fix: `DatePicker` and `DateRangePicker` not clearing when `methods.reset()` is called inside react-hook-form — `wasControlledRef` was skipped due to an early return on value echo-back.

## 0.2.0

### Minor Changes

- Add icon support for DatePicker and DateRangePicker.

  New props `icon` and `iconPosition` allow rendering a start or end icon inside the input field. Default icon is a calendar SVG. Pass `false` to hide the icon entirely, or any `ReactNode` to use a custom one.
