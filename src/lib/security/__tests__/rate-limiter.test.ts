/**
 * @jest-environment node
 *
 * rate-limiter.ts — unit tests
 * Uses the in-memory fallback path (getCloudflareContext not available).
 */

import { NextRequest, NextResponse } from "next/server";

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: () => {
    throw new Error("Not in CF environment");
  },
}));

import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

const makeHandler = () =>
  jest.fn(async (_req: NextRequest) => NextResponse.json({ ok: true }));

function makeRequest(ip = "10.0.0.1", path = "/api/test"): NextRequest {
  return new NextRequest(`http://localhost${path}`, {
    headers: { "x-forwarded-for": ip },
  });
}

describe("rateLimit middleware", () => {
  it("passes the request to the handler when under the limit", async () => {
    const handler = makeHandler();
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(handler);

    const res = await limited(
      makeRequest("1.1.1.1", "/api/test-under"),
      undefined,
    );
    expect(res.status).toBe(200);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("adds X-RateLimit-Limit and X-RateLimit-Remaining headers on success", async () => {
    const limited = rateLimit({ maxRequests: 10, windowMs: 60_000 })(
      makeHandler(),
    );
    const res = await limited(
      makeRequest("2.2.2.2", "/api/test-headers"),
      undefined,
    );
    expect(res.headers.get("X-RateLimit-Limit")).toBe("10");
    expect(res.headers.get("X-RateLimit-Remaining")).toBeTruthy();
  });

  it("returns 429 after exceeding maxRequests", async () => {
    const limited = rateLimit({ maxRequests: 2, windowMs: 60_000 })(
      makeHandler(),
    );
    const ip = "3.3.3.3";
    const path = "/api/test-exceed";

    await limited(makeRequest(ip, path), undefined);
    await limited(makeRequest(ip, path), undefined);

    // Third request should be rate-limited
    const res = await limited(makeRequest(ip, path), undefined);
    expect(res.status).toBe(429);
    const body = (await res.json()) as { error: string; retryAfter: number };
    expect(body.error).toBeTruthy();
    expect(body.retryAfter).toBeGreaterThan(0);
  });

  it("returns 429 with Retry-After header", async () => {
    const limited = rateLimit({ maxRequests: 1, windowMs: 60_000 })(
      makeHandler(),
    );
    const ip = "4.4.4.4";
    const path = "/api/test-retry";

    await limited(makeRequest(ip, path), undefined);
    const res = await limited(makeRequest(ip, path), undefined);

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("uses identifierHeader when useIP is false", async () => {
    const handler = makeHandler();
    const limited = rateLimit({
      maxRequests: 5,
      windowMs: 60_000,
      useIP: false,
      identifierHeader: "X-API-Key",
    })(handler);

    const req = new NextRequest("http://localhost/api/test-apikey", {
      headers: { "X-API-Key": "my-key" },
    });
    const res = await limited(req, undefined);
    expect(res.status).toBe(200);
  });

  it("uses cf-connecting-ip when present (covers line 128 cfIP branch)", async () => {
    const handler = makeHandler();
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(handler);

    const req = new NextRequest("http://localhost/api/test-cfip", {
      headers: { "cf-connecting-ip": "55.66.77.88" },
    });
    const res = await limited(req, undefined);
    expect(res.status).toBe(200);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("falls back to 'unknown' when no IP headers present (covers ?? 'unknown' branch)", async () => {
    const handler = makeHandler();
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(handler);

    // No x-forwarded-for, no cf-connecting-ip => forwarded is null => "unknown"
    const req = new NextRequest("http://localhost/api/test-noip");
    const res = await limited(req, undefined);
    expect(res.status).toBe(200);
  });

  it("falls back to 'unknown' when identifierHeader is configured but header absent", async () => {
    const handler = makeHandler();
    const limited = rateLimit({
      maxRequests: 5,
      windowMs: 60_000,
      useIP: false,
      identifierHeader: "X-Custom-Key",
    })(handler);

    // Header X-Custom-Key is not set => header is null => "unknown"
    const req = new NextRequest("http://localhost/api/test-noheader");
    const res = await limited(req, undefined);
    expect(res.status).toBe(200);
  });

  it("falls back to 'default' identifier when no IP or header is available", async () => {
    const handler = makeHandler();
    const limited = rateLimit({
      maxRequests: 5,
      windowMs: 60_000,
      useIP: false,
    })(handler);

    const req = new NextRequest("http://localhost/api/test-default");
    const res = await limited(req, undefined);
    expect(res.status).toBe(200);
  });
});

describe("rateLimitPresets", () => {
  it("exports auth, api, public, expensive, and strict presets", () => {
    expect(rateLimitPresets.auth.maxRequests).toBe(5);
    expect(rateLimitPresets.api.maxRequests).toBe(60);
    expect(rateLimitPresets.public.maxRequests).toBe(100);
    expect(rateLimitPresets.expensive.maxRequests).toBe(3);
    expect(rateLimitPresets.strict.maxRequests).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// cleanupLocalStore (lines 54-59) — triggered when Math.random() < 0.01
// ---------------------------------------------------------------------------
describe("rateLimit middleware — local store cleanup", () => {
  it("cleanupLocalStore removes expired entries when Math.random() < 0.01", async () => {
    const randomSpy = jest.spyOn(Math, "random");

    // First call: normal (> 0.01) — add an entry with a 1 ms window so it expires fast
    randomSpy.mockReturnValue(0.5);
    const handler = jest.fn(async (_req: NextRequest) =>
      NextResponse.json({ ok: true }),
    );
    const limited = rateLimit({ maxRequests: 100, windowMs: 1 })(handler);
    await limited(makeRequest("cleanup.seed", "/api/cleanup-test"));

    // Wait for the entry's 1 ms window to expire
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Next call: Math.random < 0.01 triggers cleanupLocalStore()
    randomSpy.mockReturnValue(0.005);
    const res = await limited(
      makeRequest("cleanup.trigger", "/api/cleanup-test"),
    );
    expect(res.status).toBe(200);

    randomSpy.mockRestore();
  });
});
