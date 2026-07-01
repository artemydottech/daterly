import { RootProvider } from 'fumadocs-ui/provider/next'
import { i18nProvider } from 'fumadocs-ui/i18n'
import { translations } from '@/lib/layout.shared'
import SearchDialog from '@/components/search'
import { HtmlLang } from '@/components/html-lang'

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  return (
    <RootProvider
      i18n={i18nProvider(translations, lang)}
      search={{ SearchDialog }}
      theme={{ defaultTheme: 'dark' }}
    >
      <HtmlLang lang={lang} />
      {children}
    </RootProvider>
  )
}
