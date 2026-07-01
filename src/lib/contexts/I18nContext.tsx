"use client";

import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import pt from "@/lib/i18n/pt-BR.json";
import en from "@/lib/i18n/en.json";

type Locale = "pt-BR" | "en";

interface I18nContextType {
  t: (key: string, vars?: Record<string, string | number>) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  t: () => "",
  locale: "pt-BR",
  setLocale: () => {},
});

const translations: Record<Locale, Record<string, string>> = { "pt-BR": pt, en };

function lookup(obj: Record<string, string>, path: string): string {
  return obj[path] || path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt-BR");

  const t = useMemo(() => {
    const dict = translations[locale] || pt;
    return (key: string, vars?: Record<string, string | number>) => {
      let value = lookup(dict, key);
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    };
  }, [locale]);

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
