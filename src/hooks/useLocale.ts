"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  normalizeLocale,
  type SupportedLocale,
} from "@/lib/i18n/locale";

function readLocaleFromCookie(): SupportedLocale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;

  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE_NAME}=([^;]+)`),
  );
  return normalizeLocale(match?.[1]);
}

export function useLocale() {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocale(readLocaleFromCookie());

    const syncLocale = () => {
      setLocale(readLocaleFromCookie());
    };

    window.addEventListener("localechange", syncLocale);
    window.addEventListener("focus", syncLocale);

    return () => {
      window.removeEventListener("localechange", syncLocale);
      window.removeEventListener("focus", syncLocale);
    };
  }, []);

  return locale;
}
