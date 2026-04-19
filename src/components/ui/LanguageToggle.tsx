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

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
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
      className={[
        "relative inline-flex items-center overflow-hidden rounded-lg sm:rounded-xl border-2 border-brand-secondary bg-brand-primary shadow-lg outline outline-2 outline-offset-2 outline-brand-secondary/50 transition-shadow duration-300",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Language selector"
    >
      {SUPPORTED_LOCALES.map((locale, i) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchLocale(locale)}
          disabled={isPending}
          aria-pressed={locale === currentLocale}
          className={[
            "min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] px-2 xs:px-2.5 text-xs xs:text-sm font-bold transition-all duration-300 touch-manipulation disabled:opacity-70 disabled:cursor-wait",
            i > 0 ? "border-l-2 border-brand-secondary/70" : "",
            locale === currentLocale
              ? "bg-brand-secondary text-brand-primary"
              : "bg-transparent text-brand-secondary hover:bg-brand-primary-dark hover:text-brand-secondary-light",
          ].join(" ")}
        >
          {LOCALE_LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
