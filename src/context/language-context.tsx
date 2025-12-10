'use client'

import React, { createContext, useContext } from 'react';
import type { Locale } from '@/lib/i18n-config';

type LanguageContextType = {
  lang: Locale;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Locale
}) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    // Return a default value for now
    return { lang: 'es' as Locale };
  }
  return context;
}
