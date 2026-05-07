# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # compile with tsup → dist/
npm run dev            # watch mode
npm run storybook      # dev server at localhost:6006
npm run test           # vitest
npm run test:coverage  # vitest --coverage
npm run release        # build + changeset publish
```

## Architecture

This is a React component library (`@artemy-tech/datepicker`) built on top of **react-day-picker v9** (headless) and **date-fns v3**, targeting the Russian market (locale `ru`, date format `dd.MM.yyyy`).

### Package exports

| Export | Entry | Description |
|--------|-------|-------------|
| `.` | `src/index.ts` | `Calendar`, `DatePicker`, `DateRangePicker` |
| `./rhf` | `src/rhf.ts` | react-hook-form wrappers (optional peer dep) |
| `./styles` | `src/styles/variables.css` | CSS variables + react-day-picker base styles |

Build outputs both ESM and CJS via tsup with `.d.ts` declarations.

### Component layer

- **`Calendar`** — thin wrapper around `DayPicker`, adds `datepicker-calendar` class and bridges `--datepicker-*` tokens to `--rdp-*` variables.
- **`DatePicker`** — input with a masked text field (`dd.MM.yyyy`) + popover Calendar. Supports controlled (`value`/`onChange`) and uncontrolled (`defaultValue`) modes. Detects controlled mode by checking `value !== undefined`.
- **`DateRangePicker`** — same pattern, but the mask covers two dates (`dd.MM.yyyy — dd.MM.yyyy`, up to 16 digits). Calendar range selection uses a two-phase click: first click sets the anchor, second click confirms and closes.

### Input masking

Both picker components implement their own digit-only mask without a third-party library:
- `applyMask` / `applyRangeMask` — rebuild the masked string from raw digits on every keystroke.
- Cursor position is restored with `requestAnimationFrame` after React re-renders the input.
- Backspace at a separator position skips over it.
- Paste strips non-digits before masking.
- Date validity uses a round-trip check: `format(parse(masked)) === masked` to catch day-overflow (e.g. `32.01.2024`).

### Styling

All visual tokens are CSS custom properties prefixed `--datepicker-*`. Component state (focus, filled, failed, disabled) is expressed via HTML `data-*` attributes (`data-focused`, `data-filled`, `data-failed`, `data-disabled`) on the root element — no JS class toggling.

### Versioning

Releases use [Changesets](https://github.com/changesets/changesets).

**ВАЖНО: не запускать `npm run changeset` интерактивно.** Пользователь однажды случайно выбрал `minor` вместо `patch` и версия ушла в 0.4.0 вместо 0.3.1.

#### Правильный процесс релиза

Когда пользователь говорит "готовим релиз" или "сделай changeset":

1. Посмотреть что изменилось: `git log <last-tag>..HEAD --oneline`
2. Определить тип бампа:
   - `patch` — bug fix, стили, внутренний рефакторинг
   - `minor` — новый проп/фича, обратно совместимое изменение API
   - `major` — breaking change
3. Создать файл `.changeset/<slug>.md` вручную (не через CLI):

```markdown
---
"@artemy-tech/datepicker": patch
---

Описание изменений для CHANGELOG.
```

1. Пользователь сам запускает финальные команды:

   ```bash
   npm run cs:version   # применяет changeset → обновляет package.json и CHANGELOG.md
   npm run release      # build + publish на npm
   ```

Имя файла — любой slug, например `fix-timezone-noon.md`. Файл удаляется автоматически после `cs:version`.
