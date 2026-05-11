/**
 * @jest-environment node
 *
 * Split analytics route smoke tests.
 * Verifies auth guard, handler wiring, and cache headers for each endpoint.
 */

import { NextRequest } from "next/server";

const mockGetAnalyticsOverview = jest.fn();
const mockGetLeadsAnalytics = jest.fn();
const mockGetSafetyAnalytics = jest.fn();
const mockGetDriversAnalytics = jest.fn();
const mockGetAccessLogAnalytics = jest.fn();

jest.mock("@/lib/dashboard/read-model", () => ({
  getAnalyticsOverview: mockGetAnalyticsOverview,
  getLeadsAnalytics: mockGetLeadsAnalytics,
  getSafetyAnalytics: mockGetSafetyAnalytics,
  getDriversAnalytics: mockGetDriversAnalytics,
  getAccessLogAnalytics: mockGetAccessLogAnalytics,
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

type RouteGetHandler = (req: NextRequest) => Promise<Response>;

let getOverview: RouteGetHandler;
let getLeads: RouteGetHandler;
let getSafety: RouteGetHandler;
let getDrivers: RouteGetHandler;
let getAccessLog: RouteGetHandler;

beforeAll(async () => {
  ({ GET: getOverview } =
    await import("../../app/api/analytics/overview/route"));
  ({ GET: getLeads } = await import("../../app/api/analytics/leads/route"));
  ({ GET: getSafety } = await import("../../app/api/analytics/safety/route"));
  ({ GET: getDrivers } = await import("../../app/api/analytics/drivers/route"));
  ({ GET: getAccessLog } =
    await import("../../app/api/analytics/access-log/route"));
});

const makeRequest = (path: string, withAuth = true) =>
  new NextRequest(`http://localhost${path}`, {
    method: "GET",
    headers: withAuth ? { Authorization: "Bearer test" } : {},
  });

describe("Split analytics routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 on overview without auth", async () => {
    const res = await getOverview(
      makeRequest("/api/analytics/overview", false),
    );
    expect(res.status).toBe(401);
  });

  it("returns overview payload and short cache header", async () => {
    const payload = { kvStatus: "connected", pageviews: { total: 10 } };
    mockGetAnalyticsOverview.mockResolvedValue(payload);

    const res = await getOverview(makeRequest("/api/analytics/overview"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe(
      "private, max-age=15, s-maxage=15",
    );
    expect(await res.json()).toEqual(payload);
    expect(mockGetAnalyticsOverview).toHaveBeenCalledTimes(1);
  });

  it("returns leads payload with no-store cache", async () => {
    const payload = {
      totals: { all: 3, active: 2, won: 1, lost: 0, urgent: 1 },
    };
    mockGetLeadsAnalytics.mockResolvedValue(payload);

    const res = await getLeads(makeRequest("/api/analytics/leads"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await res.json()).toEqual(payload);
    expect(mockGetLeadsAnalytics).toHaveBeenCalledTimes(1);
  });

  it("returns safety payload with no-store cache", async () => {
    const payload = {
      totals: { activeJobs: 1, formSubmissions: 4, pendingIntake: 2 },
    };
    mockGetSafetyAnalytics.mockResolvedValue(payload);

    const res = await getSafety(makeRequest("/api/analytics/safety"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await res.json()).toEqual(payload);
    expect(mockGetSafetyAnalytics).toHaveBeenCalledTimes(1);
  });

  it("returns drivers payload with no-store cache", async () => {
    const payload = { totals: { allDrivers: 8, approved: 7, expiringSoon: 1 } };
    mockGetDriversAnalytics.mockResolvedValue(payload);

    const res = await getDrivers(makeRequest("/api/analytics/drivers"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await res.json()).toEqual(payload);
    expect(mockGetDriversAnalytics).toHaveBeenCalledTimes(1);
  });

  it("returns access log payload with no-store cache", async () => {
    const payload = { totals: { events: 22, warnings: 3, downloads: 7 } };
    mockGetAccessLogAnalytics.mockResolvedValue(payload);

    const res = await getAccessLog(makeRequest("/api/analytics/access-log"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await res.json()).toEqual(payload);
    expect(mockGetAccessLogAnalytics).toHaveBeenCalledTimes(1);
  });
});
