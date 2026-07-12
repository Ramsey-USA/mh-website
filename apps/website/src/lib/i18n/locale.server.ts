import { cookies, headers } from "next/headers";
import {
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  PATH_LOCALE_HEADER_NAME,
  normalizeLocale,
  type SupportedLocale,
} from "./locale";

export async function getServerLocale(): Promise<SupportedLocale> {
  const headerStore = await headers();
  const localeFromPath = headerStore.get(PATH_LOCALE_HEADER_NAME);
  if (localeFromPath && isSupportedLocale(localeFromPath)) {
    return localeFromPath;
  }

  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
}
