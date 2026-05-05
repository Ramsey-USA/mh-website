import {
  DEFAULT_LOCALE,
  getPreferredLocaleFromAcceptLanguage,
  normalizeLocale,
  readLocaleFromCookieString,
} from "../locale";

describe("locale utilities", () => {
  it("normalizes supported locales", () => {
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("es")).toBe("es");
  });

  it("falls back to default locale for unsupported values", () => {
    expect(normalizeLocale("fr")).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale(undefined)).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale(null)).toBe(DEFAULT_LOCALE);
  });

  it("reads locale from cookie string", () => {
    expect(readLocaleFromCookieString("locale=es; theme=dark")).toBe("es");
    expect(readLocaleFromCookieString("theme=dark; locale=en")).toBe("en");
  });

  it("returns default locale when cookie is missing or invalid", () => {
    expect(readLocaleFromCookieString("theme=dark")).toBe(DEFAULT_LOCALE);
    expect(readLocaleFromCookieString("locale=fr")).toBe(DEFAULT_LOCALE);
    expect(readLocaleFromCookieString("")).toBe(DEFAULT_LOCALE);
  });

  it("prefers spanish when Accept-Language ranks es above en", () => {
    expect(
      getPreferredLocaleFromAcceptLanguage("es-MX,es;q=0.9,en-US;q=0.8"),
    ).toBe("es");
  });

  it("falls back to default locale when Accept-Language has no supported locale", () => {
    expect(getPreferredLocaleFromAcceptLanguage("fr-FR,fr;q=0.9")).toBe(
      DEFAULT_LOCALE,
    );
  });
});
