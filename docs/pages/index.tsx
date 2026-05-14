import dynamic from 'next/dynamic'
import Head from 'next/head'

const Landing = dynamic(() => import('../components/Landing'), { ssr: false })

const SITE_URL = 'https://artemydottech.github.io/daterly'

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
        <title>daterly — React DatePicker с маской ввода</title>
        <meta
          name="description"
          content="React DatePicker с маской ввода, локалями date-fns, диапазонами, временем и опциональной интеграцией с react-hook-form."
        />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Landing />
    </>
  )
}
