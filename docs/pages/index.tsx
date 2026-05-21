import dynamic from 'next/dynamic'
import Head from 'next/head'

const Landing = dynamic(() => import('../components/Landing'), { ssr: false })

const SITE_URL = 'https://artemydottech.github.io/daterly'
const SITE_TITLE = 'daterly — React DatePicker с маской ввода'
const SITE_DESCRIPTION =
  'React DatePicker с маской ввода, локалями date-fns, диапазонами, временем и опциональной интеграцией с react-hook-form.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareSourceCode',
      name: 'daterly',
      description:
        'React DatePicker с маской ввода, локалями date-fns, диапазонами, временем и опциональной интеграцией с react-hook-form.',
      url: SITE_URL,
      codeRepository: 'https://github.com/artemydottech/daterly',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React',
      license: 'https://opensource.org/licenses/MIT',
      author: {
        '@type': 'Person',
        name: 'artemydottech',
        url: 'https://artemy-tech.vercel.app',
      },
      keywords: [
        'react',
        'daterly',
        'date range picker',
        'react-hook-form',
        'date-fns',
        'маска ввода',
        'календарь',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'daterly',
      url: SITE_URL,
      inLanguage: 'ru-RU',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/docs?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="daterly" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Landing />
    </>
  )
}
