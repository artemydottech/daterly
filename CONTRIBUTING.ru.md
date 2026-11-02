# Вклад в проект

[English](CONTRIBUTING.md) | **Русский**

Спасибо, что хотите улучшить библиотеку! Любые вклады приветствуются — баг-репорты, предложения, PR.

### Подготовка окружения

```bash
git clone https://github.com/artemydottech/daterly.git
cd daterly
npm install
```

Репозиторий — npm-workspace: корень (библиотека) и `docs/` (сайт документации на Next.js).

### Команды

```bash
npm run dev            # watch-сборка библиотеки → dist/
npm run test           # тесты (vitest)
npm run test:watch     # тесты в watch-режиме
npm run test:coverage  # тесты с покрытием
npm run test:e2e       # e2e-тесты компонентов (playwright)
npm run build          # production-сборка → dist/
npm run typecheck      # проверка TypeScript
npm run test:package   # проверки готового пакета после сборки
npm run size           # замер размера бандла (size-limit)
npm -w docs run dev    # локальный сайт документации
npm -w docs run build  # production-сборка документации
```

### Процесс отправки PR

1. Форкните репозиторий и создайте ветку от `main`:
   ```bash
   git checkout -b fix/my-bug-fix
   ```
2. Внесите изменения. Новую функциональность покройте тестами; при изменении API обновите документацию в `docs/`.
3. Убедитесь, что тесты проходят: `npm run test` (и `npm run test:e2e`, если затронуты компоненты).
4. Откройте Pull Request с описанием что и зачем изменено.

### Стиль коммитов

Сообщения коммитов пишутся на английском в формате [Conventional Commits](https://www.conventionalcommits.org/) с номером соответствующей задачи:

```
feat(#<issue>): add a custom input renderer
fix(#<issue>): handle backspace at separator positions
tech(#<issue>): update bilingual documentation
```

### Релиз

Релизами занимается мейнтейнер. Если ваш PR влечёт изменение версии, опишите это в теле PR — мейнтейнер создаст changeset сам.

### Языки документации

Основной язык — английский. Английская и русская версии находятся в отдельных файлах со ссылками друг на друга:

- `README.md` и `README.ru.md`.
- `CONTRIBUTING.md` и `CONTRIBUTING.ru.md`.
- `CHANGELOG.md` и `CHANGELOG.ru.md` с одинаковыми разделами версий.
- Страницы сайта: `docs/content/docs/**/*.mdx` для английского и `*.ru.mdx` для русского. Навигация находится в `meta.json` и `meta.ru.json`.

При изменении поведения обновляйте оба языка. Сайт документации открывается на английском, русские страницы доступны по `/ru/`.

Changeset пишется на английском. Перед публикацией обновляется русская история изменений для той же версии. Для обоих языков используется один тег, например `v2.2.1`. Заголовок GitHub Release пишется на английском, описание содержит раздел `English`, затем раздел `Русский` с одинаковым перечнем изменений и инструкциями по миграции. Тег и GitHub Release публикуются после успешного CI на релизном коммите. Для обновлений документации существующие теги не перемещаются.
