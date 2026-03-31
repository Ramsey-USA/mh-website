/**
 * @jest-environment node
 *
 * Analytics Dashboard API — unit tests
 *
 * Covers: admin auth guard, KV snapshot present, KV unavailable (null),
 * KV fetch error, topPages sorting + cap.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockGetDashboardSnapshot = jest.fn();

jest.mock("@/lib/analytics/kv-store", () => ({
  getDashboardSnapshot: mockGetDashboardSnapshot,
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireRole: jest.fn(
    (_roles: string[], handler: (req: NextRequest) => unknown) =>
      async (req: NextRequest) => {
        const { NextResponse } =
          require("next/server") as typeof import("next/server");
        if (!req.headers.get("Authorization")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return handler(req);
      },
  ),
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: jest.fn((handler: unknown) => handler),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// ── Fixtures ─────────────────────────────────────────────────────────────────

const mockSnapshot = {
  pageviews: {
    pages: { "/": 100, "/about": 50 },
    total: 150,
    lastUpdated: "2026-01-01",
  },
  conversions: {
    contacts: 5,
    consultations: 3,
    total: 8,
    lastUpdated: "2026-01-01",
  },
  clicks: [{ element: "phone", count: 10 }],
  sessions: { count: 20, totalDuration: 1200, lastUpdated: "2026-01-01" },
  dailyPageviews: { total: 30 },
  dailySessions: { count: 5 },
};

// ── Setup ─────────────────────────────────────────────────────────────────────

let GET: typeof import("@/app/api/analytics/dashboard/route").GET;

beforeAll(async () => {
  ({ GET } = await import("@/app/api/analytics/dashboard/route"));
});

const makeRequest = (withAuth = true) =>
  new NextRequest("http://localhost/api/analytics/dashboard", {
    method: "GET",
    headers: withAuth ? { Authorization: "Bearer token" } : {},
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("GET /api/analytics/dashboard", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 without Authorization header", async () => {
    const res = await GET(makeRequest(false));
    expect(res.status).toBe(401);
  });

  it("returns 200 with dashboard data when KV snapshot exists", async () => {
    mockGetDashboardSnapshot.mockResolvedValue(mockSnapshot);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.kvStatus).toBe("connected");
    expect(body.pageviews.total).toBe(150);
    expect(body.topPages).toHaveLength(2);
    expect(body.sessions.averageDuration).toBe(60); // 1200 / 20
    expect(body.today.pageviews).toBe(30);
    expect(body.today.sessions).toBe(5);
  });

  it("averageDuration is 0 when session count is 0", async () => {
    mockGetDashboardSnapshot.mockResolvedValue({
      ...mockSnapshot,
      sessions: { count: 0, totalDuration: 0, lastUpdated: "" },
    });

    const res = await GET(makeRequest());
    const body = await res.json();
    expect(body.sessions.averageDuration).toBe(0);
  });

  it("returns 200 with kvStatus:unavailable when snapshot is null", async () => {
    mockGetDashboardSnapshot.mockResolvedValue(null);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.kvStatus).toBe("unavailable");
    expect(body.pageviews.total).toBe(0);
    expect(body.topPages).toHaveLength(0);
  });

  it("returns 500 when getDashboardSnapshot throws", async () => {
    mockGetDashboardSnapshot.mockRejectedValue(new Error("KV read error"));

    const res = await GET(makeRequest());
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("topPages are sorted descending and capped at 10", async () => {
    const manyPages: Record<string, number> = {};
    for (let i = 1; i <= 15; i++) manyPages[`/page${i}`] = i * 10;

    mockGetDashboardSnapshot.mockResolvedValue({
      ...mockSnapshot,
      pageviews: { pages: manyPages, total: 1200, lastUpdated: "" },
    });

    const res = await GET(makeRequest());
    const body = await res.json();
    expect(body.topPages).toHaveLength(10);
    expect(body.topPages[0].views).toBe(150); // page15 = 15*10
    expect(body.topPages[0].views).toBeGreaterThanOrEqual(
      body.topPages[1].views,
    );
  });

  it("defaults today stats to 0 when dailyPageviews/dailySessions are missing", async () => {
    const { dailyPageviews, dailySessions, ...rest } = mockSnapshot;
    mockGetDashboardSnapshot.mockResolvedValue(rest);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.today.pageviews).toBe(0);
    expect(body.today.sessions).toBe(0);
  });
});
