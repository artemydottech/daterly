import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const SITE_URL = 'https://artemydottech.github.io/daterly';
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
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b06bff"
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
  ),
  project: {
    link: 'https://github.com/artemydottech/daterly',
  },
  chat: {
    link: 'https://www.npmjs.com/package/daterly',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0v24h24V0H0zm19.2 19.2h-2.4v-12h-4.8v12H4.8V4.8h14.4v14.4z" />
      </svg>
    ),
  },
  docsRepositoryBase: 'https://github.com/artemydottech/daterly/tree/main/docs',
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://artemy.tech" target="_blank" rel="noreferrer">
          a.tech
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
          content="react, daterly, date picker, daterly-range, date range, react-hook-form, rhf, date-fns, маска ввода, календарь, ru, ru-RU, typescript"
        />
        <meta name="author" content="artemydottech" />
        <meta name="theme-color" content="#0a0a14" />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="daterly" />
        <meta property="og:title" content="daterly" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="daterly" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImage} />
      </>
    );
  },
};

export default config;
