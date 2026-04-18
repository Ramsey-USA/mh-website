import { cookies } from "next/headers";
import {
  LOCALE_COOKIE_NAME,
  normalizeLocale,
  type SupportedLocale,
} from "./locale";

export async function getServerLocale(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
}
