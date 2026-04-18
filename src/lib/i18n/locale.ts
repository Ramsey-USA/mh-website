import { cookies } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE_NAME = "locale";

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(
  value: string | null | undefined,
): SupportedLocale {
  if (!value) return DEFAULT_LOCALE;
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

export async function getServerLocale(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
}
