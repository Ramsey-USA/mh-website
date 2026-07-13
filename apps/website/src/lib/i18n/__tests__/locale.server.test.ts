/**
 * @jest-environment node
 */

import { getServerLocale } from "../locale.server";

const mockHeaders = jest.fn();
const mockCookies = jest.fn();

jest.mock("next/headers", () => ({
  __esModule: true,
  headers: jest.fn(() => mockHeaders()),
  cookies: jest.fn(() => mockCookies()),
}));

describe("getServerLocale", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHeaders.mockResolvedValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  it("returns locale from cookie when supported", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "es" }),
    });

    await expect(getServerLocale()).resolves.toBe("es");
  });

  it("falls back to default locale when cookie is unsupported", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "fr" }),
    });

    await expect(getServerLocale()).resolves.toBe("en");
  });

  it("falls back to default locale when cookie is missing", async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    await expect(getServerLocale()).resolves.toBe("en");
  });
});
