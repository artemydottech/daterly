# Contributing / Вклад в проект

English version below ↓

---

## Русский

Спасибо, что хотите улучшить библиотеку! Любые вклады приветствуются — баг-репорты, предложения, PR.

### Подготовка окружения

```bash
git clone https://github.com/artemydottech/daterly.git
cd daterly
npm install
```

### Команды

```bash
npm run storybook      # dev-сервер документации на localhost:6006
npm run dev            # watch-сборка библиотеки
npm run test           # запуск тестов (vitest)
npm run test:coverage  # тесты с покрытием
npm run build          # production-сборка → dist/
```

### Процесс отправки PR

1. Форкните репозиторий и создайте ветку от `main`:
   ```bash
   git checkout -b fix/my-bug-fix
   ```
2. Внесите изменения. Если это новая функциональность — добавьте Story в Storybook.
3. Убедитесь, что тесты проходят: `npm run test`.
4. Откройте Pull Request с описанием что и зачем изменено.

### Стиль коммитов

Используем [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(DatePicker): add customInput prop
fix(mask): handle backspace at separator position
docs: update README examples
```

### Релиз

Релизами занимается мейнтейнер. Если ваш PR влечёт изменение версии, опишите это в теле PR — мейнтейнер создаст changeset сам.

---

## English

Thank you for your interest in contributing! Bug reports, suggestions, and pull requests are all welcome.

### Setup

```bash
git clone https://github.com/artemydottech/daterly.git
cd daterly
npm install
```

### Scripts

```bash
npm run storybook      # documentation dev server at localhost:6006
npm run dev            # library watch build
npm run test           # run tests (vitest)
npm run test:coverage  # tests with coverage
npm run build          # production build → dist/
```

### Submitting a PR

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b fix/my-bug-fix
   ```
2. Make your changes. For new features, add a Story to Storybook.
3. Make sure tests pass: `npm run test`.
4. Open a Pull Request describing what changed and why.

### Commit style

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(DatePicker): add customInput prop
fix(mask): handle backspace at separator position
docs: update README examples
```

### Releases

Releases are managed by the maintainer. If your PR warrants a version bump, describe the nature of the change in the PR body — the maintainer will create the changeset.
