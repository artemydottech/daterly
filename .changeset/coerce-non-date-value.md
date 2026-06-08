---
"daterly": patch
---

Fix crash when `value`/`defaultValue` is a non-`Date` (e.g. an ISO string from RHF defaultValues or URL params). `DatePicker` and `DateRangePicker` now coerce incoming values to `Date` at the boundary: valid `Date`/ISO string/timestamp are accepted, anything unparseable renders empty instead of throwing `selected.getFullYear is not a function`.
