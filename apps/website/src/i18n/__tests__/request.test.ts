/**
 * @jest-environment node
 */

const mockCookies = jest.fn();

jest.mock("next/headers", () => ({
  cookies: () => mockCookies(),
}));

jest.mock("next-intl/server", () => ({
  getRequestConfig: (factory: unknown) => factory,
}));

import getRequestConfig from "../request";

describe("i18n request config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
