import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import '@artemy-tech/rtdp/styles'
import '../styles/global.css'
import '../styles/nextra-overrides.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isDocs = router.pathname.startsWith('/docs')

  if (isDocs) return <Component {...pageProps} />

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
