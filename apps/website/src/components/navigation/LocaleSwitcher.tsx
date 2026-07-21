"use client";

import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  setClientLocale,
  type SupportedLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n/locale";

type LocaleSwitcherProps = {
  labels: {
    currentLanguageLabel: string;
    switcherLabel: string;
    english: string;
    spanish: string;
  };
};

const APPROVED_SPANISH_PATHS = new Set<string>([
  "/",
  "/about",
  "/allies",
  "/careers",
  "/contact",
  "/cool-desert-nights",
  "/events",
  "/faq",
  "/jeremy-thamert",
  "/projects",
  "/public-sector",
  "/public-sector/tri-state-government-construction",
  "/public-sector/veteran-led-compliance",
  "/resources",
  "/resources/safety-manual/contents",
  "/resources/safety-manual/forms",
  "/safety",
  "/services",
  "/team",
  "/terms",
  "/testimonials",
  "/veterans",
  "/veterans/public-sector-construction",
  "/accessibility",
  "/privacy",
]);

function resolveTargetPathname(
  pathname: string,
  currentLocale: SupportedLocale,
  nextLocale: SupportedLocale,
): string {
  if (currentLocale === nextLocale) {
    return pathname;
  }

  if (nextLocale === "es" && !APPROVED_SPANISH_PATHS.has(pathname)) {
    return "/";
  }

  return pathname;
}

function getAdjacentLocale(
  locale: SupportedLocale,
  direction: 1 | -1,
): SupportedLocale {
  const currentIndex = SUPPORTED_LOCALES.indexOf(locale);
  const nextIndex =
    (currentIndex + direction + SUPPORTED_LOCALES.length) %
    SUPPORTED_LOCALES.length;

  return SUPPORTED_LOCALES[nextIndex] ?? locale;
}

export function LocaleSwitcher({ labels }: Readonly<LocaleSwitcherProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale() as SupportedLocale;
  const [isPending, startTransition] = useTransition();

  const currentLanguageLabel =
    locale === "es" ? labels.spanish : labels.english;

  const handleLocaleChange = (nextLocale: SupportedLocale) => {
    if (nextLocale === locale) {
      return;
    }

    const targetPathname = resolveTargetPathname(pathname, locale, nextLocale);
    const queryString = searchParams.toString();
    const targetPath = queryString
      ? `${targetPathname}?${queryString}`
      : targetPathname;

    setClientLocale(nextLocale);

    startTransition(() => {
      router.replace(targetPath, { locale: nextLocale });
      router.refresh();
    });
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="font-subheading text-xs tracking-[0.04em] text-gray-700 dark:text-gray-200"
        aria-live="polite"
        aria-atomic="true"
      >
        {labels.currentLanguageLabel}: {currentLanguageLabel}
      </span>
      <div
        role="radiogroup"
        aria-label={labels.switcherLabel}
        className="inline-flex rounded-md border border-brand-primary/25 bg-white dark:border-gray-700 dark:bg-gray-900"
      >
        {SUPPORTED_LOCALES.map((supportedLocale) => {
          const isCurrent = supportedLocale === locale;
          const label =
            supportedLocale === "es" ? labels.spanish : labels.english;

          return (
            <button
              key={supportedLocale}
              type="button"
              role="radio"
              aria-checked={isCurrent}
              aria-label={label}
              disabled={isPending}
              className={`font-subheading min-h-9 px-3 text-xs tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                isCurrent
                  ? "bg-brand-primary text-white"
                  : "text-brand-primary hover:bg-brand-primary/10 dark:text-brand-secondary-light dark:hover:bg-brand-secondary/20"
              } ${supportedLocale === "es" ? "border-l border-brand-primary/25 dark:border-gray-700" : ""}`}
              onClick={() => handleLocaleChange(supportedLocale)}
              onKeyDown={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  event.preventDefault();
                  handleLocaleChange(supportedLocale);
                  return;
                }

                if (
                  event.key === "ArrowRight" ||
                  event.key === "ArrowDown" ||
                  event.key === "ArrowLeft" ||
                  event.key === "ArrowUp"
                ) {
                  event.preventDefault();

                  const nextLocale = getAdjacentLocale(
                    supportedLocale,
                    event.key === "ArrowRight" || event.key === "ArrowDown"
                      ? 1
                      : -1,
                  );

                  handleLocaleChange(nextLocale);
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
