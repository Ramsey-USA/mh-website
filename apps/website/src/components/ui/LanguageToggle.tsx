"use client";

import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale() as SupportedLocale;
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: SupportedLocale) {
    if (next === currentLocale) return;

    setClientLocale(next);
    const queryString = searchParams.toString();
    const targetPath = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(targetPath, { locale: next });
      router.refresh();
    });
  }

  return (
    <div
      className={[
        "relative inline-flex items-center overflow-hidden rounded-lg sm:rounded-xl max-[360px]:rounded-md border-2 border-brand-secondary bg-brand-primary shadow-lg outline-2 outline-offset-2 outline-brand-secondary/50 transition-shadow duration-300",
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
            "min-w-9.5 min-h-9.5 max-[360px]:min-w-8.5 max-[360px]:min-h-8.5 xs:min-w-11 xs:min-h-11 sm:min-w-12 sm:min-h-12 px-2 max-[360px]:px-1.5 xs:px-2.5 text-xs xs:text-sm font-bold transition-all duration-300 touch-manipulation disabled:opacity-70 disabled:cursor-wait",
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
