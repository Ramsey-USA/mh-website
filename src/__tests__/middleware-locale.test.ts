/** @jest-environment node */

import { NextRequest } from "next/server";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/locale";

jest.mock("../../src/middleware/security", () => ({
  securityMiddleware: jest.fn(async () => {
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.next();
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { middleware } =
  require("../../middleware") as typeof import("../../middleware");

function makeRequest(
  path: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
  },
): NextRequest {
  return new NextRequest(`http://localhost:3000${path}`, {
    method: options?.method ?? "GET",
    ...(options?.headers && { headers: options.headers }),
  });
}

describe("middleware locale seeding", () => {
  it("sets locale=es from Accept-Language when no locale cookie exists", async () => {
    const response = await middleware(
      makeRequest("/contact", {
        headers: { "accept-language": "es-MX,es;q=0.9,en-US;q=0.8" },
      }),
    );

    expect(response.cookies.get(LOCALE_COOKIE_NAME)?.value).toBe("es");
  });

  it("falls back to locale=en when Accept-Language does not include supported locale", async () => {
    const response = await middleware(
      makeRequest("/contact", {
        headers: { "accept-language": "fr-FR,fr;q=0.9" },
      }),
    );

    expect(response.cookies.get(LOCALE_COOKIE_NAME)?.value).toBe("en");
  });

  it("does not override existing valid locale cookie", async () => {
    const response = await middleware(
      makeRequest("/contact", {
        headers: {
          cookie: `${LOCALE_COOKIE_NAME}=en`,
          "accept-language": "es-MX,es;q=0.9,en-US;q=0.8",
        },
      }),
    );

    expect(response.cookies.get(LOCALE_COOKIE_NAME)).toBeUndefined();
  });

  it("does not set locale cookie on API routes", async () => {
    const response = await middleware(
      makeRequest("/api/contact", {
        method: "GET",
        headers: { "accept-language": "es-MX,es;q=0.9,en-US;q=0.8" },
      }),
    );

    expect(response.cookies.get(LOCALE_COOKIE_NAME)).toBeUndefined();
  });
});
