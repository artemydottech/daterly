import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { uiTranslations } from 'fumadocs-ui/i18n'
import { i18n } from '@/lib/i18n'

const Logo = (
  <span
    style={{
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-fd-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 11h18" />
      <path d="M7 15.5h2" />
      <path d="M11 15.5h2" />
      <path d="M15 15.5h2" />
      <path d="M17 13.5v4" strokeWidth="2.4" />
    </svg>
    daterly
  </span>
)

const NpmIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M0 0v24h24V0H0zm19.2 19.2h-2.4v-12h-4.8v12H4.8V4.8h14.4v14.4z" />
  </svg>
)

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: Logo,
      url: `/${locale}`,
    },
    githubUrl: 'https://github.com/artemydottech/daterly',
    links: [
      {
        type: 'main',
        text: locale === 'en' ? 'Documentation' : 'Документация',
        url: `/${locale}/docs`,
      },
      {
        type: 'icon',
        icon: NpmIcon,
        text: 'npm',
        url: 'https://www.npmjs.com/package/daterly',
      },
    ],
  }
}

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: 'English' },
    ru: {
      displayName: 'Русский',
      'Back to Home(404 page)': 'На главную',
      'Choose a language(language switcher)': 'Выберите язык',
      'Choose a language(language switcher)(aria-label)': 'Выберите язык',
      'Close Banner(banner)(aria-label)': 'Закрыть баннер',
      'Close Search(search dialog)(aria-label)': 'Закрыть поиск',
      'Collapse Sidebar(sidebar)(aria-label)': 'Свернуть панель',
      'Copied Text(code block)(aria-label)': 'Скопировано',
      'Copy Anchor Link(heading anchor)(aria-label)': 'Копировать ссылку на раздел',
      'Copy Link(accordion)(aria-label)': 'Копировать ссылку',
      'Copy Markdown(page actions)': 'Копировать Markdown',
      'Copy Text(code block)(aria-label)': 'Копировать',
      'Dark(theme switcher)(aria-label)': 'Тёмная',
      'Default(type table)': 'По умолчанию',
      'Edit on GitHub(edit page)': 'Редактировать на GitHub',
      'Last updated on(page footer)': 'Обновлено',
      'Light(theme switcher)(aria-label)': 'Светлая',
      'Next Page(pagination)': 'Следующая',
      'No Headings(table of contents)': 'Нет заголовков',
      'No results found(search dialog)': 'Ничего не найдено',
      'On this page(table of contents)': 'На этой странице',
      'Open Search(search trigger)(aria-label)': 'Открыть поиск',
      'Open Sidebar(sidebar)(aria-label)': 'Открыть панель',
      'Open in ChatGPT(page actions)': 'Открыть в ChatGPT',
      'Open in Claude(page actions)': 'Открыть в Claude',
      'Open in Cursor(page actions)': 'Открыть в Cursor',
      'Open in GitHub(page actions)': 'Открыть в GitHub',
      'Open in Scira AI(page actions)': 'Открыть в Scira AI',
      'Open(page actions)': 'Открыть',
      'Page Not Found(404 page)': 'Страница не найдена',
      'Parameters(type table)': 'Параметры',
      'Previous Page(pagination)': 'Предыдущая',
      'Prop(type table)': 'Свойство',
      'Read {url}, I want to ask questions about it.(page actions)':
        'Прочитай {url}, хочу задать по нему вопросы.',
      'Returns(type table)': 'Возвращает',
      'Search(search dialog)': 'Поиск',
      'Search(search trigger)': 'Поиск',
      'System(theme switcher)(aria-label)': 'Системная',
      'Table of Contents(inline table of contents)': 'Содержание',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
        'Возможно, страница была удалена, переименована или временно недоступна.',
      'Toggle Menu(mobile menu)(aria-label)': 'Меню',
      'Toggle Theme(theme switcher)(aria-label)': 'Переключить тему',
      'Type(type table)': 'Тип',
      'View as Markdown(page actions)': 'Открыть как Markdown',
    },
  })
