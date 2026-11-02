# daterly

[English](CHANGELOG.md) | **Русский**

## 2.2.1

### Исправления

- Базовые стили календаря и полей ввода автоматически подключаются при импорте из `daterly` или `daterly/rhf`. Отдельный импорт `daterly/styles` больше не нужен, но остаётся доступен для совместимости. Стили сохраняются при tree shaking, включая оптимизацию экспортов Next.js.

## 2.2.0

### Новые возможности

- Добавлен проп `disabledDates` для `DatePicker` и `DateRangePicker`, позволяющий блокировать произвольные даты. Он принимает типы `Matcher` из react-day-picker (`Date`, массив, интервал, день недели, предикат) и работает совместно с `fromDate` и `toDate`.

  Исправлены два случая, когда `DateRangePicker` игнорировал ограничения `fromDate` и `toDate`:

  - календарь без `showTime` не получал ни `disabled`, ни нормализованные до начала дня `startMonth` и `endMonth`, поэтому даты за пределами диапазона оставались доступны;
  - введённые и вставленные значения разбирались и передавались в `onChange` без проверки ограничений.

  Значения за пределами диапазона теперь помечаются невалидными: поле получает `aria-invalid`, а `onChange` получает `undefined` для соответствующей границы.

## 2.1.0

### Новые возможности

- 2c65b2a: Добавлены пропсы `clearable` и `clearIcon` для `DatePicker` и `DateRangePicker`. При `clearable` в заполненном поле появляется кнопка очистки. Нажатие сбрасывает значение, вызывает `onChange(undefined)` и сохраняет фокус в поле. `clearIcon` заменяет стандартный крестик. Стилизация доступна через новые токены `--daterly-clear-color` и `--daterly-clear-color-hover`.

## 2.0.0

### Несовместимые изменения

- 4a80533: Удалён случайно экспортированный компонент `Button` из публичного API.

  `Button` не использовался внутри библиотеки и был доступен только из-за реэкспорта в `src/index.ts`. Компонент, его тип `ButtonProps` и связанные стили `.dp-btn*` удалены.

  **Миграция:** замените импорт `Button` из `daterly` собственным компонентом кнопки или HTML-элементом `<button>`.

## 1.4.0

### Новые возможности

- Добавлен проп `usePortal` для `DatePicker` и `DateRangePicker`.

  При `usePortal={true}` popover рендерится через `React.createPortal` в `document.body` с `position: fixed`, что позволяет ему корректно отображаться внутри `overflow: hidden` контейнеров (сайдбары, модалы и т.д.) без обрезания и горизонтального скролла.

  Изменения:

  - `DatePicker`: новый проп `usePortal?: boolean` (по умолчанию `false`)
  - `DateRangePicker`: новый проп `usePortal?: boolean` (по умолчанию `false`)
  - Новый хук `useFloatingPosition` — вычисляет `{ top, left }` для `position: fixed` popover-а, обновляется при scroll и resize
  - `useClickOutside` расширен параметром `excludeRefs` — клики внутри portal popover-а не закрывают его
  - CSS: новый класс-модификатор `.daterly__popover--portal` с `position: fixed; z-index: 9999`

## 1.3.1

### Исправления

- 09c9a10: Базовые стили react-day-picker встраиваются в публикуемый `dist/styles/variables.css` во время сборки. Готовый файл больше не содержит `@import 'react-day-picker/style.css'`, поэтому сборщику приложения не нужно разрешать этот импорт из `node_modules`. Это исправляет стили в конфигурациях вроде CRA без `react-app-rewired`.

## 1.3.0

### Новые возможности

- 8462f22: DatePicker и DateRangePicker теперь растягиваются на 100% контейнера (`display: block`) — как в antd. Ширина контролируется обёрткой.

  Добавлены CSS-токены `--daterly-field-min-width` (220px) и `--daterly-range-min-width` (280px) для переопределения минимальной ширины без `!important`.

## 1.2.1

### Исправления

- 6fa0185: Исправлено падение, когда `value` или `defaultValue` не являются `Date`, например при передаче ISO-строки из значений RHF или параметров URL. `DatePicker` и `DateRangePicker` приводят входные значения к `Date`: принимают корректные `Date`, ISO-строки и временные метки. Значения, которые не удалось разобрать, отображаются как пустые вместо ошибки `selected.getFullYear is not a function`.

## 1.2.0

### Новые возможности

- 63c3784: - a11y: инпут `DatePicker` и `DateRangePicker` получил корректную ARIA-семантику комбобокса — `role="combobox"` с `aria-controls`, ссылающимся на попап-календарь. Раньше `aria-expanded`/`aria-haspopup` стояли на голом textbox, что нарушало `aria-allowed-attr`.

  - a11y: проп `failed` теперь выставляет `aria-invalid` на инпуте (раньше синхронизировался только с `data-failed`).
  - test: покрытие тестами 92.8% → 97.5% — добавлен набор для `TimeInput` (маска, клавиатурная навигация по сегментам), тесты `showTime`-хендлеров и axe-проверки доступности.

  > Замечание для миграции: роль инпута изменилась с `textbox` на `combobox`. Если в тестах вы ищете инпут через `getByRole('textbox')`, замените на `getByRole('combobox')`. Вариант `noCalendar` остаётся `textbox`.

## 1.1.0

### Новые возможности

- - feat: добавлен компонент `TimeInput` — альтернатива барабанному `TimePanel` с прямым вводом часов/минут/секунд.
  - feat: новый проп `timePickerType: 'drum' | 'input'` в `DatePicker` и `DateRangePicker` для выбора варианта ввода времени.
  - feat: расширен набор CSS-токенов `--datepicker-*` для кастомизации time-инпутов.
  - fix: `RHFDatePicker` и `RHFDateRangePicker` корректно обрабатывают `null`/`undefined` из react-hook-form (значение больше не «залипает» после сброса формы).
  - docs: обновлены страницы `datepicker` и `daterangepicker` с примерами `timePickerType`.

## 1.0.0

### Несовместимые изменения — ребрендинг

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
