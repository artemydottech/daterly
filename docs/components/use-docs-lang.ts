'use client'

import { usePathname } from 'next/navigation'

export type DocsLang = 'ru' | 'en'

export function useDocsLang(): DocsLang {
  const pathname = usePathname()
  return pathname?.split('/')[1] === 'en' ? 'en' : 'ru'
}
