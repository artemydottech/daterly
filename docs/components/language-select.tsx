'use client'

import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover'
import { useI18n } from 'fumadocs-ui/contexts/i18n'
import type { LanguageSelectProps } from 'fumadocs-ui/layouts/shared/slots/language-select'

export { LanguageSelectText } from 'fumadocs-ui/layouts/shared/slots/language-select'

const CHOOSE_LANGUAGE: Record<string, string> = {
  ru: 'Выберите язык',
  en: 'Choose a language',
}

export function LanguageSelect({ className, variant = 'ghost', children, ...rest }: LanguageSelectProps) {
  const { locale, locales, onChange } = useI18n()
  const chooseLanguage = CHOOSE_LANGUAGE[locale ?? ''] ?? CHOOSE_LANGUAGE.en

  return (
    <Popover>
      <PopoverTrigger
        aria-label={chooseLanguage}
        className={[
          buttonVariants({ variant }),
          'gap-1.5 p-1.5 data-[state=open]:bg-fd-accent',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="flex flex-col gap-0.5 p-1">
        <p className="p-2 text-xs font-medium text-fd-muted-foreground">{chooseLanguage}</p>
        {locales?.map((item) => (
          <button
            key={item.locale}
            type="button"
            className={[
              'px-2 py-1.5 text-start text-sm rounded-lg transition-colors',
              item.locale === locale
                ? 'bg-fd-primary/10 text-fd-primary'
                : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
            ].join(' ')}
            onClick={() => onChange?.(item.locale)}
          >
            {item.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
