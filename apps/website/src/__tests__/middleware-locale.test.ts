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
const { config, middleware } =
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

  it("keeps canonical english route /services unprefixed", async () => {
    const response = await middleware(makeRequest("/services"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("keeps /qr-codes as a direct route without redirect hops", async () => {
    const response = await middleware(makeRequest("/qr-codes"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("rewrites locale-prefixed routes and seeds locale cookie from path", async () => {
    const response = await middleware(makeRequest("/es/contact"));

    expect(response.headers.get("x-middleware-rewrite")).toContain("/contact");
    expect(response.cookies.get(LOCALE_COOKIE_NAME)?.value).toBe("es");
  });

  it("rewrites /es/services to shared /services route", async () => {
    const response = await middleware(makeRequest("/es/services"));

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-rewrite")).toContain("/services");
    expect(response.cookies.get(LOCALE_COOKIE_NAME)?.value).toBe("es");
  });

  it("redirects /en root to canonical unprefixed root", async () => {
    const response = await middleware(makeRequest("/en"));

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("redirects /en/services to /services with permanent status", async () => {
    const response = await middleware(makeRequest("/en/services"));

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/services",
    );
  });

  it("preserves query string when redirecting /en-prefixed routes", async () => {
    const response = await middleware(
      makeRequest("/en/services?source=legacy-nav"),
    );

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/services?source=legacy-nav",
    );
  });

  it("passes unknown locale prefixes to routing layer unchanged", async () => {
    const response = await middleware(makeRequest("/fr/services"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("passes unknown slugs to framework routing (real 404 decided downstream)", async () => {
    const response = await middleware(makeRequest("/route-does-not-exist"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("excludes extension paths from locale middleware matcher", () => {
    const matcher = config.matcher[0];
    expect(matcher).toContain(".*\\..*");
    expect(matcher).toContain("_next");
    expect(matcher).toContain("sitemap\\.xml");
  });
});
