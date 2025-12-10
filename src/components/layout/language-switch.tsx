'use client'

import { useLanguage } from '@/context/language-context'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/lib/i18n-config'
import { Button } from '@/components/ui/button'

export default function LanguageSwitch() {
  const { lang } = useLanguage();
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  // Currently disabled
  if (true) return null;

  return (
    <div className="flex items-center gap-1">
      {i18n.locales.map(locale => {
        const isActive = lang === locale;
        return (
          <Button
            key={locale}
            variant={isActive ? 'secondary' : 'ghost'}
            size="icon"
            className="w-8 h-8 rounded-full"
            asChild
          >
            <Link href={redirectedPathName(locale)}>
              <span className={`text-sm ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                {locale === 'es' ? '🇪🇸' : '🇺🇸'}
              </span>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
