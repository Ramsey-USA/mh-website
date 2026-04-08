/**
 * @jest-environment node
 *
 * Security API routes — unit tests
 *
 * Covers: /api/security/cloudflare (GET + unsupported method),
 * /api/security/events (GET auth guard + 200 with events),
 * /api/security/status (GET auth guard + 200 with metrics).
 */

import { NextRequest } from "next/server";

// ── Mock @opennextjs/cloudflare before any route imports ──────────────────────
// The module uses ES Module syntax (export *) which Jest's CommonJS transformer
// cannot parse. Mock it at the top level so the cloudflare route can import it.
jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(() => ({ env: {} })),
}));

// ── Shared mock: requireRole ──────────────────────────────────────────────────

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

// ── Mocks: audit logger ───────────────────────────────────────────────────────

const mockQueryEvents = jest.fn();
const mockExportLogs = jest.fn();
const mockGetStatistics = jest.fn();

jest.mock("@/lib/security/audit-logger", () => ({
  auditLogger: {
    queryEvents: mockQueryEvents,
    exportLogs: mockExportLogs,
    getStatistics: mockGetStatistics,
  },
  AuditEventType: {
    AUTH_LOGIN: "auth.login",
    AUTH_LOGOUT: "auth.logout",
  },
}));

// ── Mocks: vulnerability scanner ─────────────────────────────────────────────

const mockGetVulnerabilities = jest.fn().mockReturnValue([]);
const mockScanRequest = jest.fn().mockReturnValue([]);

jest.mock("@/lib/security/vulnerability-scanner", () => ({
  VulnerabilityScanner: jest.fn().mockImplementation(() => ({
    getVulnerabilities: mockGetVulnerabilities,
    scanRequest: mockScanRequest,
  })),
  VulnerabilityType: {},
}));

// ── helpers ───────────────────────────────────────────────────────────────────

const authHeader = { Authorization: "Bearer token" };

const makeRequest = (
  url: string,
  method: "GET" | "POST" | "PUT" = "GET",
  withAuth = true,
) =>
  new NextRequest(url, {
    method,
    headers: withAuth ? authHeader : {},
  });

// ═══════════════════════════════════════════════════════════════════════════════
// /api/security/cloudflare
// ═══════════════════════════════════════════════════════════════════════════════

describe("/api/security/cloudflare", () => {
  let GET: typeof import("@/app/api/security/cloudflare/route").GET;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/security/cloudflare/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  it("GET returns 401 without auth", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/security/cloudflare", "GET", false),
    );
    expect(res.status).toBe(401);
  });

  it("GET returns 200 with Cloudflare status object", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/security/cloudflare"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    // In test env there is no cf-connecting-ip header, so status is "local_dev"
    expect(body.data.status).toBe("local_dev");
    expect(body.data.features).toBeDefined();
    expect(typeof body.data.features.waf).toBe("boolean");
    expect(typeof body.data.features.ddos_protection).toBe("boolean");
    expect(typeof body.data.features.ssl_encryption).toBe("boolean");
    expect(typeof body.data.features.rate_limiting).toBe("boolean");
  });

  it("GET returns 200 with active status when cf-connecting-ip is present", async () => {
    const req = new NextRequest("http://localhost/api/security/cloudflare", {
      method: "GET",
      headers: {
        Authorization: "Bearer token",
        "cf-connecting-ip": "203.0.113.5",
      },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.status).toBe("active");
    expect(body.data.features.waf).toBe(true);
    expect(body.data.features.ddos_protection).toBe(true);
    expect(body.data.features.ssl_encryption).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// /api/security/events
// ═══════════════════════════════════════════════════════════════════════════════

describe("/api/security/events", () => {
  let GET: typeof import("@/app/api/security/events/route").GET;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/security/events/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  it("GET returns 401 without auth", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/security/events", "GET", false),
    );
    expect(res.status).toBe(401);
  });

  it("GET returns 200 with array of events", async () => {
    const events = [
      {
        id: "e1",
        eventType: "auth.login",
        timestamp: new Date(),
        riskLevel: "low",
        source: "api",
        ipAddress: "1.2.3.4",
        userId: "u1",
        outcome: "success",
        details: {},
        tags: [],
      },
    ];
    mockQueryEvents.mockResolvedValue(events);

    const res = await GET(makeRequest("http://localhost/api/security/events"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.events).toHaveLength(1);
    expect(body.data.events[0].id).toBe("e1");
  });

  it("GET returns 200 with empty events array", async () => {
    mockQueryEvents.mockResolvedValue([]);

    const res = await GET(makeRequest("http://localhost/api/security/events"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.events).toHaveLength(0);
  });

  it("GET respects limit query param", async () => {
    mockQueryEvents.mockResolvedValue([]);

    const url = "http://localhost/api/security/events?limit=10";
    const res = await GET(new NextRequest(url, { headers: authHeader }));
    expect(res.status).toBe(200);
    // Verify queryEvents was called with limit=10
    expect(mockQueryEvents).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 10 }),
    );
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// /api/security/status
// ═══════════════════════════════════════════════════════════════════════════════

describe("/api/security/status", () => {
  let GET: typeof import("@/app/api/security/status/route").GET;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/security/status/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  it("GET returns 401 without auth", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/security/status", "GET", false),
    );
    expect(res.status).toBe(401);
  });

  it("GET returns 200 with security metrics", async () => {
    mockGetStatistics.mockResolvedValue({
      totalEvents: 42,
      eventsByType: {},
      eventsByRisk: {},
      successRate: 0.95,
      anomalies: [],
      topUsers: [],
      topIPs: [],
      timelineData: [],
    });
    mockGetVulnerabilities.mockReturnValue([]);

    const res = await GET(makeRequest("http://localhost/api/security/status"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.metrics).toBeDefined();
    expect(body.data.securityScore).toBeDefined();
    expect(typeof body.data.securityScore).toBe("number");
  });
});
