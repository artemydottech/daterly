'use client'

import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    window.location.replace('ru/')
  }, [])

  return (
    <>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <meta httpEquiv="refresh" content="0; url=ru/" />
      </noscript>
      <p style={{ padding: 24 }}>
        <a href="ru/">daterly →</a>
      </p>
    </>
  )
}
