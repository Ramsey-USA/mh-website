"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  getClientLocale,
  type SupportedLocale,
} from "@/lib/i18n/locale";

export function useLocale() {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocale(getClientLocale());

    const syncLocale = () => {
      setLocale(getClientLocale());
    };

    globalThis.addEventListener("localechange", syncLocale);
    globalThis.addEventListener("focus", syncLocale);

    return () => {
      globalThis.removeEventListener("localechange", syncLocale);
      globalThis.removeEventListener("focus", syncLocale);
    };
  }, []);

  return locale;
}
