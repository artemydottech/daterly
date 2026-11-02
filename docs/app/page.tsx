'use client'

import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    window.location.replace('en/')
  }, [])

  return (
    <>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <meta httpEquiv="refresh" content="0; url=en/" />
      </noscript>
      <p style={{ padding: 24 }}>
        <a href="en/">daterly →</a>
      </p>
    </>
  )
}
