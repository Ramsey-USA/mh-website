/**
 * @jest-environment node
 *
 * Extended branch coverage for /api/security/events:
 * POST, CSV format, filter params, getEventDescription switch cases, error path.
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

const mockQueryEvents = jest.fn();
const mockExportLogs = jest.fn();
const mockLogEvent = jest.fn();

jest.mock("@/lib/security/audit-logger", () => ({
  auditLogger: {
    queryEvents: mockQueryEvents,
    exportLogs: mockExportLogs,
    logEvent: mockLogEvent,
  },
  AuditEventType: {
    LOGIN_SUCCESS: "login_success",
    LOGIN_FAILURE: "login_failure",
    RATE_LIMIT_EXCEEDED: "rate_limit_exceeded",
    CSRF_TOKEN_INVALID: "csrf_token_invalid",
    XSS_ATTEMPT: "xss_attempt",
    SQL_INJECTION_ATTEMPT: "sql_injection_attempt",
    FILE_UPLOAD_BLOCKED: "file_upload_blocked",
    ACCESS_DENIED: "access_denied",
    VULNERABILITY_DETECTED: "vulnerability_detected",
    SECURITY_SCAN_STARTED: "security_scan_started",
    SECURITY_SCAN_COMPLETED: "security_scan_completed",
    DATA_ACCESS: "data_access",
    DATA_MODIFICATION: "data_modification",
    SUSPICIOUS_TRAFFIC: "suspicious_traffic",
    ERROR_OCCURRED: "error_occurred",
  },
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

const authHeader = { Authorization: "Bearer test-token" };

function makeRequest(url: string, method = "GET", auth = true): NextRequest {
  return new NextRequest(url, {
    method,
    headers: auth ? authHeader : {},
  });
}

function makeEvent(eventType: string, details: Record<string, unknown> = {}) {
  return {
    id: "evt-1",
    eventType,
    timestamp: new Date("2025-01-01T00:00:00Z"),
    riskLevel: "low",
    source: "api",
    ipAddress: "1.2.3.4",
    userId: "u1",
    outcome: "success",
    details,
    tags: [],
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("/api/security/events extended branch coverage", () => {
  let GET: typeof import("@/app/api/security/events/route").GET;
  let POST: typeof import("@/app/api/security/events/route").POST;

  beforeAll(async () => {
    ({ GET, POST } = await import("@/app/api/security/events/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  // ── CSV format ─────────────────────────────────────────────────────────────

  it("GET ?format=csv returns CSV response", async () => {
    mockQueryEvents.mockResolvedValue([]);
    mockExportLogs.mockResolvedValue("id,type\nevt-1,login_success\n");

    const res = await GET(
      makeRequest("http://localhost/api/security/events?format=csv"),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/csv");
    expect(res.headers.get("Content-Disposition")).toContain(
      "security-events.csv",
    );
  });

  // ── Filter query params ────────────────────────────────────────────────────

  it("GET passes types, risk, start/end, user, ip, outcome filters to queryEvents", async () => {
    mockQueryEvents.mockResolvedValue([]);

    const url =
      "http://localhost/api/security/events" +
      "?types=login_success,login_failure" +
      "&risk=high,critical" +
      "&start=2025-01-01" +
      "&end=2025-12-31" +
      "&user=user123" +
      "&ip=1.2.3.4" +
      "&outcome=failure";

    await GET(makeRequest(url));

    expect(mockQueryEvents).toHaveBeenCalledWith(
      expect.objectContaining({
        eventTypes: ["login_success", "login_failure"],
        riskLevels: ["high", "critical"],
        dateRange: expect.objectContaining({
          start: expect.any(Date),
          end: expect.any(Date),
        }),
        userId: "user123",
        ipAddress: "1.2.3.4",
        outcome: "failure",
      }),
    );
  });

  it("GET caps limit at 1000 and uses offset", async () => {
    mockQueryEvents.mockResolvedValue([]);

    const url = "http://localhost/api/security/events?limit=5000&offset=50";
    await GET(makeRequest(url));

    expect(mockQueryEvents).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 1000, offset: 50 }),
    );
  });

  it("GET handles invalid limit/offset by falling back to defaults", async () => {
    mockQueryEvents.mockResolvedValue([]);

    const url = "http://localhost/api/security/events?limit=abc&offset=-5";
    await GET(makeRequest(url));

    // parseInt("abc") = NaN → fallback to 50; Math.max(0, -5) = 0
    expect(mockQueryEvents).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 50, offset: 0 }),
    );
  });

  it("GET pagination hasMore=true when events.length === limit", async () => {
    const events = Array.from({ length: 10 }, (_, i) =>
      makeEvent("login_success", { i }),
    );
    mockQueryEvents.mockResolvedValue(events);

    const res = await GET(
      makeRequest("http://localhost/api/security/events?limit=10"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.pagination.hasMore).toBe(true);
  });

  it("GET returns 500 on queryEvents error", async () => {
    mockQueryEvents.mockRejectedValue(new Error("DB down"));

    const res = await GET(makeRequest("http://localhost/api/security/events"));
    expect(res.status).toBe(500);
  });

  // ── POST ──────────────────────────────────────────────────────────────────

  it("POST logs a valid event and returns 200", async () => {
    mockLogEvent.mockResolvedValue(undefined);

    const req = new NextRequest("http://localhost/api/security/events", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "login_success",
        details: { ip: "1.2.3.4" },
        source: "test",
        userId: "u1",
        outcome: "success",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockLogEvent).toHaveBeenCalledWith(
      "login_success",
      expect.objectContaining({ source: "test", userId: "u1" }),
    );
  });

  it("POST returns 400 for invalid eventType", async () => {
    const req = new NextRequest("http://localhost/api/security/events", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "not_a_real_event" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid event type/i);
  });

  it("POST returns 400 when eventType is missing", async () => {
    const req = new NextRequest("http://localhost/api/security/events", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ details: {} }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("POST uses default outcome=success when not provided", async () => {
    mockLogEvent.mockResolvedValue(undefined);

    const req = new NextRequest("http://localhost/api/security/events", {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "login_failure" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockLogEvent).toHaveBeenCalledWith(
      "login_failure",
      expect.objectContaining({ outcome: "success" }),
    );
  });

  // ── getEventDescription switch ─────────────────────────────────────────────

  const descriptionCases: Array<[string, Record<string, unknown>, string]> = [
    ["login_success", {}, "logged in"],
    ["login_failure", {}, "Failed login"],
    ["rate_limit_exceeded", { path: "/api/test" }, "/api/test"],
    ["rate_limit_exceeded", {}, "unknown endpoint"],
    ["csrf_token_invalid", {}, "CSRF"],
    ["xss_attempt", {}, "scripting"],
    ["sql_injection_attempt", {}, "SQL injection"],
    ["file_upload_blocked", { fileName: "malware.exe" }, "malware.exe"],
    ["file_upload_blocked", {}, "unknown file"],
    ["access_denied", {}, "Access denied"],
    ["vulnerability_detected", { type: "CVE-2024-001" }, "CVE-2024-001"],
    ["vulnerability_detected", {}, "unknown"],
    ["security_scan_started", {}, "Security scan initiated"],
    ["security_scan_completed", { vulnerabilitiesFound: 3 }, "3"],
    ["security_scan_completed", {}, "0"],
    ["data_access", { resource: "users_table" }, "users_table"],
    ["data_access", {}, "unknown resource"],
    ["data_modification", { resource: "projects" }, "projects"],
    ["data_modification", {}, "unknown resource"],
    ["suspicious_traffic", {}, "Suspicious"],
    [
      "error_occurred",
      { error: "NullPointerException" },
      "NullPointerException",
    ],
    ["error_occurred", {}, "unknown error"],
    ["unknown_type", {}, "Security event occurred"], // default case
  ];

  it.each(descriptionCases)(
    "getEventDescription for %s (details=%j) includes '%s'",
    async (eventType, details, expected) => {
      mockQueryEvents.mockResolvedValue([makeEvent(eventType, details)]);

      const res = await GET(
        makeRequest("http://localhost/api/security/events"),
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      const desc: string = body.data.events[0].description;
      expect(desc).toMatch(
        new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
    },
  );

  // ── Unsupported method ────────────────────────────────────────────────────

  it("methodNotAllowed — no GET/POST handler is invoked (405 guard)", async () => {
    // GET and POST are wired; we verify the inner handler returns 405 for other methods.
    // Since requireRole is mocked to pass-through with auth, call GET with a DELETE-like body.
    // The inner handler checks request.method directly.
    new NextRequest("http://localhost/api/security/events", {
      method: "DELETE",
      headers: authHeader,
    });
    // GET is actually exported as the handler, but inner `handler` checks request.method.
    // Use GET export to route through, but override method:
    const fakeDeleteReq = new NextRequest(
      "http://localhost/api/security/events",
      {
        method: "DELETE",
        headers: authHeader,
      },
    );
    // We manually invoke through the bound GET handler which will call inner handler
    // and hit the methodNotAllowed branch.
    const res = await GET(fakeDeleteReq);
    expect(res.status).toBe(405);
  });
});
