# @artemy-tech/datepicker

## 0.6.0

### Minor Changes

- fix(DatePicker, DateRangePicker): the calendar now follows the selected date as the user types into the masked input (controlled `month`/`onMonthChange`) — previously the popover had to be closed and reopened to see the month change.
- chore(deps): bump `date-fns` to `^4.0.0` to deduplicate it with the copy pulled in by `react-day-picker` (was shipping both `date-fns@3` and `date-fns@4`).
- chore: drop `react-dom` from `peerDependencies` — it is never imported by the package and any React consumer already has it installed.
- docs: replace the bundle-size badge with bundlejs.com (pkg-size.dev's build pipeline was failing).

## 0.5.0

### Minor Changes

- Add unit and component tests (Vitest + Testing Library), wire them into CI (GitHub Actions), and add a Husky pre-commit hook that runs the test suite. Upgrade Vitest stack to v3 to fix a v8 coverage-provider race. Internal refactor: input-mask logic extracted to `src/utils/date-mask` and `src/utils/range-mask`. Fix: `DatePicker` and `DateRangePicker` now correctly initialise the displayed string from `value` (not only `defaultValue`) on first render in controlled mode.

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
