import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE_NAME,
  PATH_LOCALE_HEADER_NAME,
  normalizeLocale,
  type SupportedLocale,
} from "@/lib/i18n/locale";

export default getRequestConfig(async () => {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const locale = normalizeLocale(
    headerStore.get(PATH_LOCALE_HEADER_NAME) ??
      cookieStore.get(LOCALE_COOKIE_NAME)?.value,
  ) as SupportedLocale;

  return {
    locale,
    messages: (await import(`../../../../messages/${locale}.json`))
      .default as Record<string, unknown>,
  };
});
