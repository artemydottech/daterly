import type { Metadata } from 'next'
import Landing from '@/components/Landing'
import { i18n } from '@/lib/i18n'

const SITE_URL = 'https://artemydottech.github.io/daterly'

type Lang = 'ru' | 'en'

const META: Record<Lang, { title: string; description: string; locale: string }> = {
  ru: {
    title: 'daterly — React DatePicker с маской ввода',
    description:
      'React DatePicker с маской ввода, локалями date-fns, диапазонами, временем и опциональной интеграцией с react-hook-form.',
    locale: 'ru_RU',
  },
  en: {
    title: 'daterly — React DatePicker with input masking',
    description:
      'React DatePicker with input masking, date-fns locales, ranges, time and optional react-hook-form integration.',
    locale: 'en_US',
  },
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }))
}

export async function generateMetadata(
  props: PageProps<'/[lang]'>,
): Promise<Metadata> {
  const { lang } = await props.params
  const m = META[(lang as Lang) in META ? (lang as Lang) : 'ru']

  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}` },
    openGraph: {
      type: 'website',
      siteName: 'daterly',
      title: m.title,
      description: m.description,
      locale: m.locale,
      images: '/og.png',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: '/og.png',
    },
  }
}

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params
  const key: Lang = (lang as Lang) in META ? (lang as Lang) : 'ru'
  const m = META[key]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        name: 'daterly',
        description: m.description,
        url: SITE_URL,
        codeRepository: 'https://github.com/artemydottech/daterly',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'React',
        license: 'https://opensource.org/licenses/MIT',
      },
      {
        '@type': 'WebSite',
        name: 'daterly',
        url: SITE_URL,
        inLanguage: key === 'en' ? 'en-US' : 'ru-RU',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Landing initialLang={key} />
    </>
  )
}
