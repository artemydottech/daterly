import { Html, Head, Main, NextScript } from 'next/document'

const FAVICON_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b06bff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='3'/%3E%3Cpath d='M16 2v4M8 2v4M3 10h18'/%3E%3C/svg%3E"

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href={FAVICON_SVG} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
