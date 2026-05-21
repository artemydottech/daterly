---
"daterly": minor
---

- a11y: инпут `DatePicker` и `DateRangePicker` получил корректную ARIA-семантику комбобокса — `role="combobox"` с `aria-controls`, ссылающимся на попап-календарь. Раньше `aria-expanded`/`aria-haspopup` стояли на голом textbox, что нарушало `aria-allowed-attr`.
- a11y: проп `failed` теперь выставляет `aria-invalid` на инпуте (раньше синхронизировался только с `data-failed`).
- test: покрытие тестами 92.8% → 97.5% — добавлен набор для `TimeInput` (маска, клавиатурная навигация по сегментам), тесты `showTime`-хендлеров и axe-проверки доступности.

> Замечание для миграции: роль инпута изменилась с `textbox` на `combobox`. Если в тестах вы ищете инпут через `getByRole('textbox')`, замените на `getByRole('combobox')`. Вариант `noCalendar` остаётся `textbox`.
