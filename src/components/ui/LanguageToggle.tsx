"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const SUPPORTED_LOCALES = ["en", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const raw = match?.[1] ?? "en";
  return (SUPPORTED_LOCALES as readonly string[]).includes(raw)
    ? (raw as Locale)
    : "en";
}

export function LanguageToggle() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");

  useEffect(() => {
    setCurrentLocale(readLocaleCookie());
  }, []);

  function switchLocale(next: Locale) {
    if (next === currentLocale) return;
    document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
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
