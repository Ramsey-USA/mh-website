"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  DEFAULT_LOCALE,
  getClientLocale,
  setClientLocale,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from "@/lib/i18n/locale";

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "EN",
  es: "ES",
};

export function LanguageToggle() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] =
    useState<SupportedLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    setCurrentLocale(getClientLocale());
  }, []);

  function switchLocale(next: SupportedLocale) {
    if (next === currentLocale) return;

    setClientLocale(next);
    setCurrentLocale(next);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex items-center gap-0 rounded-full border border-white/30 overflow-hidden text-xs font-semibold"
      aria-label="Language selector"
    >
      {SUPPORTED_LOCALES.map((locale, i) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={isPending}
          aria-pressed={locale === currentLocale}
          className={[
            "px-2.5 py-1 transition-colors",
            i > 0 ? "border-l border-white/30" : "",
            locale === currentLocale
              ? "bg-white text-brand-primary font-bold"
              : "bg-transparent text-white hover:bg-white/10",
          ].join(" ")}
        >
          {LOCALE_LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
