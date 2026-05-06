---
"@artemy-tech/datepicker": minor
---

Add Button component, RHF wrappers, and fix form integration.

New exports via `./rhf`: `RHFDatePicker`, `RHFDateRangePicker` — Controller-based wrappers for react-hook-form with automatic error display.

New `Button` component with `primary`/`secondary` variants, `s`/`m` sizes, and `loading` state with centered spinner.

Fix: spinner drift in Button loading state (animation transform conflict with centering transform).

Fix: `DatePicker` and `DateRangePicker` not clearing on `methods.reset()` when used inside react-hook-form — `wasControlledRef` was never set due to early return on value echo.
