/**
 * @jest-environment node
 *
 * rate-limiter.ts — KV-backed path tests (lines 84-99)
 *
 * This file lives separately from rate-limiter.test.ts so it can have its own
 * top-level jest.mock that returns a real KV namespace, rather than one that
 * throws (which is used in the other file to exercise the local-store fallback).
 */

import { NextRequest, NextResponse } from "next/server";

const mockKV = {
  get: jest.fn<Promise<string | null>, [string]>(),
  put: jest.fn<Promise<void>, [string, string, { expirationTtl?: number }]>(),
};

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: () => ({ env: { CACHE: mockKV } }),
}));

import { rateLimit } from "@/lib/security/rate-limiter";

function makeRequest(ip = "10.0.0.1", path = "/api/test"): NextRequest {
  return new NextRequest(`http://localhost${path}`, {
    headers: { "x-forwarded-for": ip },
  });
}

const makeHandler = () =>
  jest.fn(async (_req: NextRequest) => NextResponse.json({ ok: true }));

describe("rateLimit middleware — KV backend", () => {
  beforeEach(() => {
    mockKV.get.mockReset();
    mockKV.put.mockReset();
    mockKV.put.mockResolvedValue(undefined);
  });

  it("reads and writes the counter via the KV namespace on first request", async () => {
    // No prior entry in KV
    mockKV.get.mockResolvedValue(null);

    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      makeHandler(),
    );
    const res = await limited(makeRequest("9.9.9.1", "/api/kv-first"));

    expect(mockKV.get).toHaveBeenCalledWith(expect.stringContaining("rl:"));
    expect(mockKV.put).toHaveBeenCalledWith(
      expect.stringContaining("rl:"),
      expect.stringContaining('"count":1'),
      expect.objectContaining({ expirationTtl: expect.any(Number) }),
    );
    expect(res.status).toBe(200);
  });

  it("increments an existing non-expired KV counter", async () => {
    const existing = JSON.stringify({
      count: 3,
      resetTime: Date.now() + 60_000,
    });
    mockKV.get.mockResolvedValue(existing);

    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      makeHandler(),
    );
    const res = await limited(makeRequest("9.9.9.2", "/api/kv-increment"));

    expect(res.status).toBe(200);
    const putArg = mockKV.put.mock.calls[0]![1];
    const written = JSON.parse(putArg) as { count: number };
    expect(written.count).toBe(4); // 3 + 1
  });

  it("resets the counter when the stored KV entry has expired", async () => {
    const expired = JSON.stringify({
      count: 99,
      resetTime: Date.now() - 1000, // expired
    });
    mockKV.get.mockResolvedValue(expired);

    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      makeHandler(),
    );
    const res = await limited(makeRequest("9.9.9.3", "/api/kv-expired"));

    expect(res.status).toBe(200); // count reset to 1, under limit of 5
    const putArg = mockKV.put.mock.calls[0]![1];
    const written = JSON.parse(putArg) as { count: number };
    expect(written.count).toBe(1);
  });

  it("returns 429 when the KV counter exceeds maxRequests", async () => {
    // Simulate KV already at limit
    const atLimit = JSON.stringify({
      count: 5,
      resetTime: Date.now() + 60_000,
    });
    mockKV.get.mockResolvedValue(atLimit);

    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
      makeHandler(),
    );
    const res = await limited(makeRequest("9.9.9.4", "/api/kv-limited"));

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });
});
