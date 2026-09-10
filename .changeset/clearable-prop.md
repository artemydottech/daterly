---
"daterly": minor
---

Add `clearable` and `clearIcon` props to `DatePicker` and `DateRangePicker`. With `clearable`, a clear button appears in the field while it holds a value; clicking it resets the value, emits `onChange(undefined)` and keeps focus in the input. `clearIcon` replaces the built-in cross. Styling goes through the new `--daterly-clear-color` and `--daterly-clear-color-hover` tokens.
