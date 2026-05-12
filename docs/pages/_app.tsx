import type { AppProps } from 'next/app'
import '@artemy-tech/datepicker/styles'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
