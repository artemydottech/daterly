import type { AppProps } from 'next/app'
import '@artemy-tech/datepicker/styles'
import '../styles/global.css'
import '../styles/nextra-overrides.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
