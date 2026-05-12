import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const SITE_URL = 'https://artemydottech.github.io/datepicker';
const SITE_DESCRIPTION =
  'React DatePicker с маской ввода, локалями date-fns, диапазонами, временем и опциональной интеграцией с react-hook-form.';

const config: DocsThemeConfig = {
  logo: (
    <span
      style={{
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b06bff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      @artemy-tech/datepicker
    </span>
  ),
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
        <a
          href="https://github.com/artemydottech"
          target="_blank"
          rel="noreferrer"
        >
          artemydottech
        </a>
      </span>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: undefined,
  },
  color: {
    hue: 270,
    saturation: 90,
  },
  i18n: [],
  head() {
    const { asPath, defaultLocale, locale } = useRouter();
    const url = `${SITE_URL}${
      defaultLocale === locale ? asPath : `/${locale}${asPath}`
    }`;
    const ogImage = `${SITE_URL}/og.png`;

    return (
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="keywords"
          content="react, datepicker, date picker, daterangepicker, date range, react-hook-form, rhf, date-fns, маска ввода, календарь, ru, ru-RU, typescript"
        />
        <meta name="author" content="artemydottech" />
        <meta name="theme-color" content="#0a0a14" />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="@artemy-tech/datepicker" />
        <meta property="og:title" content="@artemy-tech/datepicker" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="@artemy-tech/datepicker" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImage} />

        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b06bff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='3'/%3E%3Cpath d='M16 2v4M8 2v4M3 10h18'/%3E%3C/svg%3E"
        />
      </>
    );
  },
};

export default config;
