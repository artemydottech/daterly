import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>@artemy-tech/datepicker</span>,
  project: {
    link: 'https://github.com/artemydottech/datepicker',
  },
  chat: {
    link: 'https://www.npmjs.com/package/@artemy-tech/datepicker',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0v24h24V0H0zm19.2 19.2h-2.4v-12h-4.8v12H4.8V4.8h14.4v14.4z" />
      </svg>
    ),
  },
  docsRepositoryBase:
    'https://github.com/artemydottech/datepicker/tree/main/docs',
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/artemydottech" target="_blank" rel="noreferrer">
          artemydottech
        </a>
      </span>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
  },
  i18n: [],
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="@artemy-tech/datepicker" />
      <meta
        property="og:description"
        content="React DatePicker с маской ввода, локалями и поддержкой react-hook-form"
      />
    </>
  ),
}

export default config
