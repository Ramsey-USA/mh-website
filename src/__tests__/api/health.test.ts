/**
 * @jest-environment node
 *
 * Health Check API — unit tests
 *
 * Covers:
 *   GET /api/health         — quick sync check
 *   GET /api/health?full=true — full async check
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/services/health-check", () => ({
  checkAllServices: jest.fn().mockResolvedValue({
    overall: "healthy",
    timestamp: "2026-04-16T00:00:00.000Z",
    services: [
      { name: "cloudflare-d1", status: "healthy", latency: 12 },
      { name: "resend", status: "healthy" },
      { name: "twilio", status: "unconfigured" },
    ],
  }),
  getQuickHealthStatus: jest.fn().mockReturnValue({
    email: true,
    sms: false,
  }),
}));

// ── Setup ─────────────────────────────────────────────────────────────────────

let GET: (req: Request) => Promise<Response>;

beforeAll(async () => {
  ({ GET } = await import("@/app/api/health/route"));
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("GET /api/health", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 200 with quick health status (no ?full param)", async () => {
    const req = new Request("http://localhost/api/health");
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.status).toBe("healthy");
    expect(body.timestamp).toBeDefined();
    expect(body.services.email).toBe("configured");
    expect(body.services.sms).toMatch(/unconfigured/i);
  });

  it("sets Cache-Control: no-store on quick check", async () => {
    const req = new Request("http://localhost/api/health");
    const res = await GET(req);
    expect(res.headers.get("Cache-Control")).toMatch(/no-store/i);
  });

  it("returns 200 with full health report when ?full=true", async () => {
    const req = new Request("http://localhost/api/health?full=true");
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.status).toBe("healthy");
    expect(body.services).toHaveProperty("cloudflare-d1");
    expect(body.services["cloudflare-d1"].status).toBe("healthy");
    expect(body.services["cloudflare-d1"].latency_ms).toBe(12);
  });

  it("returns 503 when full check reports unhealthy overall status", async () => {
    const { checkAllServices } = jest.requireMock(
      "@/lib/services/health-check",
    ) as { checkAllServices: jest.Mock };
    checkAllServices.mockResolvedValueOnce({
      overall: "unhealthy",
      timestamp: "2026-04-16T00:00:00.000Z",
      services: [{ name: "cloudflare-d1", status: "unavailable" }],
    });

    const req = new Request("http://localhost/api/health?full=true");
    const res = await GET(req);
    expect(res.status).toBe(503);
  });

  it("returns email unconfigured when email env vars are missing", async () => {
    const { getQuickHealthStatus } = jest.requireMock(
      "@/lib/services/health-check",
    ) as { getQuickHealthStatus: jest.Mock };
    getQuickHealthStatus.mockReturnValueOnce({ email: false, sms: false });

    const req = new Request("http://localhost/api/health");
    const res = await GET(req);
    const body = await res.json();
    expect(body.services.email).toBe("unconfigured");
  });

  it("only exports GET on health route (no POST/PUT/DELETE)", async () => {
    const mod = await import("@/app/api/health/route");
    expect(mod.GET).toBeDefined();
    expect((mod as Record<string, unknown>).POST).toBeUndefined();
    expect((mod as Record<string, unknown>).PUT).toBeUndefined();
    expect((mod as Record<string, unknown>).DELETE).toBeUndefined();
  });
});
