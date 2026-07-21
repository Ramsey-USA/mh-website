import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE_NAME, PATH_LOCALE_HEADER_NAME } from "@/lib/i18n/locale";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const requestedLocale = await requestLocale;
  const localeCandidate =
    headerStore.get(PATH_LOCALE_HEADER_NAME) ??
    requestedLocale ??
    cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  const locale = hasLocale(routing.locales, localeCandidate)
    ? localeCandidate
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../../../messages/${locale}.json`))
      .default as Record<string, unknown>,
  };
});
