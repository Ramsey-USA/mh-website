/**
 * @jest-environment node
 *
 * Extended branch coverage for /api/security/status:
 * POST quickScan, POST fullScan, methodNotAllowed, error path,
 * and all helper function branches (calculateSecurityScore, getSystemStatus,
 * getLastScanTime, calculateTrend, calculateVulnerabilityTrend).
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

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

const mockGetStatistics = jest.fn();
jest.mock("@/lib/security/audit-logger", () => ({
  auditLogger: { getStatistics: mockGetStatistics },
}));

const mockGetVulnerabilities = jest.fn().mockReturnValue([]);
const mockQuickScan = jest.fn();
const mockRunScan = jest.fn();

jest.mock("@/lib/security/vulnerability-scanner", () => ({
  VulnerabilityScanner: jest.fn().mockImplementation(() => ({
    getVulnerabilities: mockGetVulnerabilities,
    quickScan: mockQuickScan,
    runScan: mockRunScan,
  })),
  VulnerabilityType: {
    XSS: "xss",
    SQL_INJECTION: "sql_injection",
    CSRF: "csrf",
  },
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

const authHeader = { Authorization: "Bearer token" };

function makeRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  withAuth = true,
  body?: object,
): NextRequest {
  return new NextRequest(url, {
    method,
    headers: {
      ...(withAuth ? authHeader : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

function makeStats(overrides: Record<string, unknown> = {}) {
  return {
    totalEvents: 0,
    eventsByType: {},
    eventsByRisk: {},
    successRate: 1,
    anomalies: [],
    topUsers: [],
    topIPs: [],
    timelineData: [],
    ...overrides,
  };
}

function makeVuln(severity: string, daysAgo = 0) {
  return {
    id: `v-${Math.random()}`,
    type: "xss",
    severity,
    title: `${severity} vuln`,
    description: "desc",
    location: "/",
    impact: "impact",
    recommendation: "fix it",
    status: "open",
    discoveredAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("/api/security/status extended branch coverage", () => {
  let GET: typeof import("@/app/api/security/status/route").GET;
  let POST: typeof import("@/app/api/security/status/route").POST;

  beforeAll(async () => {
    ({ GET, POST } = await import("@/app/api/security/status/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  // ── GET: security score branch (secure/warning/critical) ──────────────────

  it("GET securityScore >= 80 → status=secure", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockGetVulnerabilities.mockReturnValue([]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.status).toBe("secure");
    expect(body.data.securityScore).toBeGreaterThanOrEqual(80);
  });

  it("GET with high vulnerabilities → status=warning (60-79)", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    // 4 high vulns × 10 = 40 points deducted → score = 60 → warning
    mockGetVulnerabilities.mockReturnValue([
      makeVuln("high"),
      makeVuln("high"),
      makeVuln("high"),
      makeVuln("high"),
    ]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.status).toBe("warning");
  });

  it("GET with critical vulnerabilities → status=critical (<60)", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    // 3 critical × 20 = 60 deducted → score = 40 → critical
    mockGetVulnerabilities.mockReturnValue([
      makeVuln("critical"),
      makeVuln("critical"),
      makeVuln("critical"),
    ]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.status).toBe("critical");
  });

  it("GET deducts points for anomalies and high event volume", async () => {
    mockGetStatistics.mockResolvedValue(
      makeStats({
        totalEvents: 1500, // > 1000 → -5
        anomalies: [
          {
            type: "a",
            severity: "high",
            description: "d",
            timestamp: new Date(),
          },
          {
            type: "b",
            severity: "medium",
            description: "d",
            timestamp: new Date(),
          },
        ], // 2 × 5 = -10
      }),
    );
    mockGetVulnerabilities.mockReturnValue([
      makeVuln("medium"),
      makeVuln("low"),
    ]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    // 100 - 5 (medium) - 2 (low) - 10 (anomalies) - 5 (events) = 78 → warning
    expect(body.data.securityScore).toBeLessThan(80);
  });

  it("GET score does not go below 0", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    // 10 critical × 20 = 200 → clamped to 0
    mockGetVulnerabilities.mockReturnValue(
      Array.from({ length: 10 }, () => makeVuln("critical")),
    );
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.securityScore).toBe(0);
    expect(body.data.status).toBe("critical");
  });

  // ── GET: getLastScanTime branches ─────────────────────────────────────────

  it("GET lastScanTime is null when no vulnerabilities", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockGetVulnerabilities.mockReturnValue([]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.metrics.lastScanTime).toBeNull();
  });

  it("GET lastScanTime is ISO string when vulnerabilities exist", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockGetVulnerabilities.mockReturnValue([
      makeVuln("low", 2),
      makeVuln("high", 1),
    ]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.metrics.lastScanTime).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  // ── GET: calculateTrend branches ──────────────────────────────────────────

  it("GET trend is 0 when timelineData has < 2 entries", async () => {
    mockGetStatistics.mockResolvedValue(
      makeStats({ timelineData: [{ events: 10, riskScore: 5 }] }),
    );
    mockGetVulnerabilities.mockReturnValue([]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.trends.events).toBe(0);
  });

  it("GET trend is delta when timelineData has 2+ entries", async () => {
    mockGetStatistics.mockResolvedValue(
      makeStats({
        timelineData: [
          { events: 10, riskScore: 5 },
          { events: 15, riskScore: 8 },
        ],
      }),
    );
    mockGetVulnerabilities.mockReturnValue([]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.trends.events).toBe(5);
    expect(body.data.trends.riskScore).toBe(3);
  });

  // ── GET: vulnerability trend ──────────────────────────────────────────────

  it("GET vulnerabilityTrend counts recent vulns (discovered < 24h ago)", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockGetVulnerabilities.mockReturnValue([
      makeVuln("low", 0), // recent
      makeVuln("medium", 0), // recent
      makeVuln("high", 2), // 2 days ago — not recent
    ]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    expect(body.data.trends.vulnerabilities).toBe(2);
  });

  // ── GET: error path ───────────────────────────────────────────────────────

  it("GET returns 500 when getStatistics throws", async () => {
    mockGetStatistics.mockRejectedValue(new Error("DB error"));
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    expect(res.status).toBe(500);
  });

  // ── POST quickScan ────────────────────────────────────────────────────────

  it("POST scanType=quick returns scan results", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockQuickScan.mockResolvedValue([makeVuln("medium")]);

    const req = new NextRequest("http://localhost/api/security/status", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({
        scanType: "quick",
        targets: { url: "https://example.com" },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.type).toBe("quick");
    expect(Array.isArray(body.data.vulnerabilities)).toBe(true);
    expect(mockQuickScan).toHaveBeenCalledWith("https://example.com");
  });

  it("POST quickScan uses default url when targets not provided", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockQuickScan.mockResolvedValue([]);

    const req = new NextRequest("http://localhost/api/security/status", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ scanType: "quick" }),
    });

    await POST(req);
    expect(mockQuickScan).toHaveBeenCalledWith("https://localhost:3000");
  });

  it("POST scanType=full runs the full vulnerability scan", async () => {
    mockRunScan.mockResolvedValue({
      id: "scan-1",
      startTime: new Date(),
      duration: 1000,
      summary: { critical: 0, high: 0, medium: 0, low: 0 },
      vulnerabilities: [makeVuln("low")],
    });

    const req = new NextRequest("http://localhost/api/security/status", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ scanType: "full" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.scanId).toBe("scan-1");
    expect(mockRunScan).toHaveBeenCalled();
  });

  it("POST full scan uses provided targets", async () => {
    mockRunScan.mockResolvedValue({
      id: "scan-2",
      startTime: new Date(),
      duration: 2000,
      summary: {},
      vulnerabilities: [],
    });

    const req = new NextRequest("http://localhost/api/security/status", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({
        scanType: "full",
        targets: { urls: ["https://mhc-gc.com"] },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const callArg = mockRunScan.mock.calls[0][0] as { targets: unknown };
    expect(callArg.targets).toEqual({ urls: ["https://mhc-gc.com"] });
  });

  // ── methodNotAllowed ──────────────────────────────────────────────────────

  it("DELETE method returns 405", async () => {
    const req = new NextRequest("http://localhost/api/security/status", {
      method: "DELETE",
      headers: authHeader,
    });
    const res = await GET(req);
    expect(res.status).toBe(405);
  });

  // ── GET: vulnerability bySeverity/byStatus aggregation ───────────────────

  it("GET summary includes bySeverity and byStatus counts", async () => {
    mockGetStatistics.mockResolvedValue(makeStats());
    mockGetVulnerabilities.mockReturnValue([
      makeVuln("high"),
      makeVuln("high"),
      makeVuln("medium"),
      { ...makeVuln("low"), status: "resolved" },
    ]);
    const res = await GET(makeRequest("http://localhost/api/security/status"));
    const body = await res.json();
    const bySev = body.data.summary.vulnerabilities.bySeverity;
    expect(bySev.high).toBe(2);
    expect(bySev.medium).toBe(1);
    expect(bySev.low).toBe(1);
    expect(body.data.summary.vulnerabilities.byStatus.resolved).toBe(1);
  });
});
