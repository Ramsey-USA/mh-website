export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE_NAME = "locale";
const LOCALE_COOKIE_REGEX = new RegExp(
  String.raw`(?:^|;\s*)${LOCALE_COOKIE_NAME}=([^;]+)`,
);

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(
  value: string | null | undefined,
): SupportedLocale {
  if (!value) return DEFAULT_LOCALE;
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

export function readLocaleFromCookieString(
  cookieString: string | null | undefined,
): SupportedLocale {
  if (!cookieString) return DEFAULT_LOCALE;

  const match = LOCALE_COOKIE_REGEX.exec(cookieString);
  return normalizeLocale(match?.[1]);
}

export function getClientLocale(): SupportedLocale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  return readLocaleFromCookieString(document.cookie);
}

export function setClientLocale(locale: SupportedLocale): void {
  if (typeof document === "undefined") return;

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  document.documentElement.lang = locale;

  if (globalThis.window !== undefined) {
    globalThis.dispatchEvent(new Event("localechange"));
  }
}

export function getPreferredLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): SupportedLocale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const sortedCandidates = acceptLanguage
    .split(",")
    .map((entry) => {
      const parts = entry.trim().split(";");
      const langRange = (parts[0] ?? "").toLowerCase();
      const qualityParam = parts.find((param) =>
        param.trim().toLowerCase().startsWith("q="),
      );

      const quality = qualityParam
        ? Number.parseFloat(qualityParam.split("=")[1] ?? "1")
        : 1;

      return {
        langRange,
        quality: Number.isNaN(quality) ? 1 : quality,
      };
    })
    .filter((candidate) => candidate.langRange.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const candidate of sortedCandidates) {
    const baseLanguage = candidate.langRange.split("-")[0];
    if (baseLanguage !== undefined && isSupportedLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return DEFAULT_LOCALE;
}
