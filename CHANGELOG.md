# daterly

## 1.1.0

### Minor Changes

- - feat: добавлен компонент `TimeInput` — альтернатива барабанному `TimePanel` с прямым вводом часов/минут/секунд.
  - feat: новый проп `timePickerType: 'drum' | 'input'` в `DatePicker` и `DateRangePicker` для выбора варианта ввода времени.
  - feat: расширен набор CSS-токенов `--datepicker-*` для кастомизации time-инпутов.
  - fix: `RHFDatePicker` и `RHFDateRangePicker` корректно обрабатывают `null`/`undefined` из react-hook-form (значение больше не «залипает» после сброса формы).
  - docs: обновлены страницы `datepicker` и `daterangepicker` с примерами `timePickerType`.

## 1.0.0

### Major Changes — ребрендинг

- **Пакет переименован**: `@artemy-tech/rtdp` → **`daterly`** (без скоупа, новый пакет на npm).
- **Импорты**: `'@artemy-tech/rtdp'` → `'daterly'`, `'@artemy-tech/rtdp/rhf'` → `'daterly/rhf'`, `'@artemy-tech/rtdp/styles'` → `'daterly/styles'`.
- **CSS-переменные**: префикс `--rtdp-*` → `--daterly-*` (например, `--rtdp-color-accent` → `--daterly-color-accent`).
- **CSS-классы**: `.rtdp` → `.daterly`, `.rtdp__field` → `.daterly__field`, `.rtdp-calendar` → `.daterly-calendar`, `.rtdp-range` → `.daterly-range`, `.rtdp-spinner` → `.daterly-spinner` и так далее по всем BEM-частям.
- Имена React-компонентов (`DatePicker`, `DateRangePicker`, `Calendar`, `RHFDatePicker`, `RHFDateRangePicker`) **не изменились** — мигрируется только то, что пишется через дефис.

### Миграция

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
