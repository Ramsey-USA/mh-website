/**
 * @jest-environment node
 */

const mockCookies = jest.fn();
const mockHeaders = jest.fn();

jest.mock("next/headers", () => ({
  cookies: () => mockCookies(),
  headers: () => mockHeaders(),
}));

jest.mock("next-intl/server", () => ({
  getRequestConfig: (factory: unknown) => factory,
}));

import getRequestConfig from "../request";

describe("i18n request config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHeaders.mockResolvedValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  it("uses spanish locale and messages when locale cookie is es", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "es" }),
    });

    const config = await getRequestConfig({} as never);

    expect(config.locale).toBe("es");
    expect(
      (config.messages as { common: { signIn: string } }).common.signIn,
    ).toBe("Iniciar sesión");
  });

  it("falls back to english when locale cookie is invalid", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "fr" }),
    });

    const config = await getRequestConfig({} as never);

    expect(config.locale).toBe("en");
    expect(
      (config.messages as { common: { signIn: string } }).common.signIn,
    ).toBe("Sign In");
  });

  it("falls back to english when locale cookie is missing", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    const config = await getRequestConfig({} as never);

    expect(config.locale).toBe("en");
    expect(
      (config.messages as { common: { signIn: string } }).common.signIn,
    ).toBe("Sign In");
  });

  it("prefers locale from rewritten path header over cookie", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "en" }),
    });
    mockHeaders.mockResolvedValue({
      get: jest.fn((name: string) =>
        name === "x-mh-path-locale" ? "es" : null,
      ),
    });

    const config = await getRequestConfig({} as never);

    expect(config.locale).toBe("es");
    expect(
      (config.messages as { common: { signIn: string } }).common.signIn,
    ).toBe("Iniciar sesión");
  });

  it("uses validated requestLocale when provided by next-intl", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "en" }),
    });

    const config = await getRequestConfig({
      requestLocale: Promise.resolve("es"),
    } as never);

    expect(config.locale).toBe("es");
  });

  it("rejects unsupported requestLocale values and falls back to english", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "es" }),
    });

    const config = await getRequestConfig({
      requestLocale: Promise.resolve("fr"),
    } as never);

    expect(config.locale).toBe("en");
  });
});
