---
"@artemy-tech/datepicker": patch
---

Файл `dist/styles/variables.css` теперь действительно включается в публикуемый пакет. Раньше `package.json` экспортировал `./styles`, но tsup не копировал CSS из `src/styles/` в `dist/` — импорт `@artemy-tech/datepicker/styles` падал у потребителей. Сборка теперь копирует CSS на шаге `onSuccess`.
