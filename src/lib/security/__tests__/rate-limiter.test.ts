/**
 * @jest-environment node
 *
 * Tests for src/lib/security/rate-limiter.ts
 */

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn().mockImplementation(() => {
    throw new Error("Not in Cloudflare environment");
  }),
}));

import { NextRequest, NextResponse } from "next/server";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a unique path per test so the in-memory localStore never bleeds */
let _counter = 0;
function uniquePath(): string {
  return `/test-rl-${++_counter}-${Date.now()}`;
}

function makeRequest(
  path: string,
  headers: Record<string, string> = {},
): NextRequest {
  return new NextRequest(`http://localhost${path}`, {
    method: "GET",
    headers,
  });
}

// ---------------------------------------------------------------------------
// rateLimit function
// ---------------------------------------------------------------------------
describe("rateLimit", () => {
  it("falls back to in-memory store when getCloudflareContext throws", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      mockHandler,
    );

    const response = await limited(makeRequest(path));
    expect(response.status).toBe(200);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it("returns a middleware wrapper function", () => {
    const middleware = rateLimit({ maxRequests: 5, windowMs: 60_000 });
    expect(typeof middleware).toBe("function");

    const handler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const wrapped = middleware(handler);
    expect(typeof wrapped).toBe("function");
  });

  it("calls the handler when under the rate limit", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      mockHandler,
    );

    const response = await limited(makeRequest(path));
    expect(response.status).toBe(200);
    expect(mockHandler).toHaveBeenCalled();
  });

  it("returns 429 when over the rate limit", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 1, windowMs: 60_000 })(
      mockHandler,
    );

    // First request — within limit
    await limited(makeRequest(path));
    // Second request — exceeds limit (count > maxRequests → 1 > 1 is false, so need 3rd)
    // Actually: count=1 after 1st (1>1 = false OK), count=2 after 2nd (2>1 = true → 429)
    const response = await limited(makeRequest(path));
    expect(response.status).toBe(429);
  });

  it("429 response includes Retry-After header", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 1, windowMs: 60_000 })(
      mockHandler,
    );

    await limited(makeRequest(path));
    const response = await limited(makeRequest(path));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).not.toBeNull();
  });

  it("429 response includes X-RateLimit-Limit header", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 1, windowMs: 60_000 })(
      mockHandler,
    );

    await limited(makeRequest(path));
    const response = await limited(makeRequest(path));
    expect(response.status).toBe(429);
    expect(response.headers.get("X-RateLimit-Limit")).toBe("1");
  });

  it("successful response gets X-RateLimit-Remaining header", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      mockHandler,
    );

    const response = await limited(makeRequest(path));
    expect(response.status).toBe(200);
    const remaining = response.headers.get("X-RateLimit-Remaining");
    expect(remaining).not.toBeNull();
    expect(Number(remaining)).toBe(4); // 5 - 1
  });

  it("successful response gets X-RateLimit-Limit header", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 10, windowMs: 60_000 })(
      mockHandler,
    );

    const response = await limited(makeRequest(path));
    expect(response.headers.get("X-RateLimit-Limit")).toBe("10");
  });

  it("uses cf-connecting-ip header for IP identification when available", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      mockHandler,
    );

    // Use unique IP to avoid leaking state from other tests
    const ip = `1.2.3.${++_counter}`;
    const req = makeRequest(path, { "cf-connecting-ip": ip });
    const response = await limited(req);
    expect(response.status).toBe(200);
  });

  it("falls back to x-forwarded-for when cf-connecting-ip is missing", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      mockHandler,
    );

    const req = makeRequest(path, { "x-forwarded-for": "10.0.0.1" });
    const response = await limited(req);
    expect(response.status).toBe(200);
    expect(mockHandler).toHaveBeenCalled();
  });

  it("uses 'default' identifier when useIP is false and no identifierHeader", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    const limited = rateLimit({
      maxRequests: 5,
      windowMs: 60_000,
      useIP: false,
    })(mockHandler);

    const response = await limited(makeRequest(path));
    expect(response.status).toBe(200);
  });

  it("rate limits correctly by identifier when useIP is false", async () => {
    const path = uniquePath();
    const mockHandler = jest.fn(
      async () => new NextResponse("OK", { status: 200 }),
    );
    // maxRequests: 1 — second request with same path+identifier → 429
    const limited = rateLimit({
      maxRequests: 1,
      windowMs: 60_000,
      useIP: false,
    })(mockHandler);

    await limited(makeRequest(path)); // count = 1, allowed
    const response = await limited(makeRequest(path)); // count = 2, 429
    expect(response.status).toBe(429);
  });
});

// ---------------------------------------------------------------------------
// rateLimitPresets
// ---------------------------------------------------------------------------
describe("rateLimitPresets", () => {
  it("auth preset has maxRequests: 5 and windowMs: 60_000", () => {
    expect(rateLimitPresets.auth.maxRequests).toBe(5);
    expect(rateLimitPresets.auth.windowMs).toBe(60_000);
  });

  it("api preset has maxRequests: 60 and windowMs: 60_000", () => {
    expect(rateLimitPresets.api.maxRequests).toBe(60);
    expect(rateLimitPresets.api.windowMs).toBe(60_000);
  });

  it("public preset has maxRequests: 100 and windowMs: 60_000", () => {
    expect(rateLimitPresets.public.maxRequests).toBe(100);
    expect(rateLimitPresets.public.windowMs).toBe(60_000);
  });

  it("expensive preset has maxRequests: 3 and windowMs: 300_000", () => {
    expect(rateLimitPresets.expensive.maxRequests).toBe(3);
    expect(rateLimitPresets.expensive.windowMs).toBe(300_000);
  });

  it("strict preset has maxRequests: 3 and windowMs: 300_000", () => {
    expect(rateLimitPresets.strict.maxRequests).toBe(3);
    expect(rateLimitPresets.strict.windowMs).toBe(300_000);
  });

  it("auth preset has a message string", () => {
    expect(typeof rateLimitPresets.auth.message).toBe("string");
    expect(rateLimitPresets.auth.message.length).toBeGreaterThan(0);
  });

  it("all presets have required maxRequests and windowMs", () => {
    for (const [_name, preset] of Object.entries(rateLimitPresets)) {
      expect(typeof preset.maxRequests).toBe("number");
      expect(typeof preset.windowMs).toBe("number");
    }
  });
});
