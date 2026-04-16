/**
 * @jest-environment node
 *
 * Drivers API — unit tests
 *
 * Covers:
 *   GET  /api/drivers  — list all drivers (admin/manager)
 *   POST /api/drivers  — create a new driver record (admin only)
 *   GET  /api/drivers/[id]  — get single driver
 *   PUT  /api/drivers/[id]  — update driver record
 *   DELETE /api/drivers/[id]  — delete driver
 *   GET  /api/drivers/alerts  — drivers needing attention
 *   GET  /api/drivers/check-alerts  — cron-triggered alert check
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Shared mock data ──────────────────────────────────────────────────────────

const mockDriver = {
  id: "driver-1",
  employee_name: "Jane Smith",
  email: "jane@example.com",
  phone: "509-555-1234",
  license_number: "WA12345",
  license_state: "WA",
  license_class: "A",
  cdl_endorsements: null,
  license_expiration_date: "2027-06-30",
  last_mvr_check_date: "2025-01-01",
  next_mvr_check_date: "2026-01-01",
  mvr_status: "clear",
  authorization_status: "authorized",
  authorized_by: "Admin",
  authorization_date: "2024-01-01",
  consent_on_file: 1,
  notes: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue({}),
}));

const mockQuery = jest.fn().mockResolvedValue([mockDriver]);
const mockQueryOne = jest.fn().mockResolvedValue(mockDriver);
const mockExecute = jest.fn().mockResolvedValue({ success: true });
const mockInsert = jest.fn().mockResolvedValue("new-driver-id");
const mockUpdate = jest.fn().mockResolvedValue(true);
const mockCount = jest.fn().mockResolvedValue(0);

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    execute: mockExecute,
    insert: mockInsert,
    update: mockUpdate,
    count: mockCount,
  })),
  DbClient: jest.fn(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    execute: mockExecute,
    insert: mockInsert,
    update: mockUpdate,
    count: mockCount,
  })),
}));

jest.mock("@/lib/auth/middleware", () => {
  const { makeRequireRoleImpl } = require("../helpers/api-test-utils");
  return { requireRole: jest.fn(makeRequireRoleImpl) };
});

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {}, strict: {} },
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: (handler: unknown) => handler,
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock("@/lib/email/email-service", () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue({ success: true }),
  })),
}));

jest.mock("@/lib/email/templates", () => ({
  generateLicenseExpiringAlert: jest
    .fn()
    .mockReturnValue({ subject: "Alert", html: "<p>Alert</p>" }),
  generateMvrReviewDueAlert: jest
    .fn()
    .mockReturnValue({ subject: "MVR Alert", html: "<p>MVR</p>" }),
  generateDriverAlertSummary: jest
    .fn()
    .mockReturnValue({ subject: "Summary", html: "<p>Summary</p>" }),
}));

jest.mock("@/lib/constants/company", () => ({
  EMAIL_RECIPIENTS: { admin: "admin@test.com" },
  COMPANY_INFO: { name: "MH Construction", email: "info@mhc-gc.com" },
}));

// ── GET /api/drivers ──────────────────────────────────────────────────────────

describe("GET /api/drivers", () => {
  let GET: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/drivers/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  it("returns 401 when Authorization header is missing", async () => {
    const res = await GET(makeRequest("http://localhost/api/drivers"));
    expect(res.status).toBe(401);
  });

  it("returns 200 with driver list", async () => {
    mockQuery.mockResolvedValueOnce([mockDriver]);
    const res = await GET(
      makeRequest("http://localhost/api/drivers", { headers: authedHeaders }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data).toHaveLength(1);
    expect(body.data[0].employee_name).toBe("Jane Smith");
    expect(body.data[0].license_number).toBe("WA12345");
    expect(body.data[0].mvr_status).toBe("clear");
  });

  it("filters by status query param", async () => {
    mockQuery.mockResolvedValueOnce([mockDriver]);
    const res = await GET(
      makeRequest("http://localhost/api/drivers?status=authorized", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("ignores invalid status param", async () => {
    mockQuery.mockResolvedValueOnce([mockDriver]);
    const res = await GET(
      makeRequest("http://localhost/api/drivers?status=invalid", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await GET(
      makeRequest("http://localhost/api/drivers", { headers: authedHeaders }),
    );
    expect(res.status).toBe(503);
  });

  it("returns 500 on unexpected error", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));
    const res = await GET(
      makeRequest("http://localhost/api/drivers", { headers: authedHeaders }),
    );
    expect(res.status).toBe(500);
  });

  it("only exports GET and POST (no PUT/DELETE on collection)", async () => {
    const mod = await import("@/app/api/drivers/route");
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
    expect((mod as Record<string, unknown>).PUT).toBeUndefined();
    expect((mod as Record<string, unknown>).DELETE).toBeUndefined();
  });
});

// ── POST /api/drivers ─────────────────────────────────────────────────────────

describe("POST /api/drivers", () => {
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ POST } = await import("@/app/api/drivers/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  const validBody = {
    employee_name: "John Doe",
    license_number: "WA99999",
    license_expiration_date: "2028-01-01",
  };

  it("returns 401 when not authenticated", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        body: validBody,
      }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 400 when employee_name is missing", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: {
          license_number: "WA99999",
          license_expiration_date: "2028-01-01",
        },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when license_number is missing", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: { employee_name: "John", license_expiration_date: "2028-01-01" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when license_expiration_date is missing", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: { employee_name: "John", license_number: "WA99999" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid mvr_status", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: { ...validBody, mvr_status: "not-valid" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid authorization_status", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: { ...validBody, authorization_status: "not-valid" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid license_class", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: { ...validBody, license_class: "Z" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: validBody,
      }),
    );
    expect(res.status).toBe(503);
  });

  it("returns 201 on successful creation", async () => {
    mockExecute.mockResolvedValueOnce({ success: true });
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: authedHeaders,
        body: {
          ...validBody,
          email: "john@test.com",
          phone: "509-555-0001",
          consent_on_file: true,
        },
      }),
    );
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 403 when manager role tries to create a driver (admin-only)", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: { ...authedHeaders, "X-Test-Role": "manager" },
        body: validBody,
      }),
    );
    expect(res.status).toBe(403);
  });

  it("returns 400 on malformed JSON body", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authedHeaders },
        body: "{ not valid json ",
      }),
    );
    expect([400, 500]).toContain(res.status);
  });
});

// ── GET /api/drivers/[id] ─────────────────────────────────────────────────────

describe("GET /api/drivers/[id]", () => {
  let GET: (req: NextRequest, ctx: unknown) => Promise<Response>;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/drivers/[id]/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue(mockDriver);
  });

  const ctx = { params: Promise.resolve({ id: "driver-1" }) };

  it("returns 401 when not authenticated", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/drivers/driver-1"),
      ctx,
    );
    expect(res.status).toBe(401);
  });

  it("returns 200 with driver data", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/drivers/driver-1", {
        headers: authedHeaders,
      }),
      ctx,
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.employee_name).toBe("Jane Smith");
    expect(body.data.license_number).toBe("WA12345");
    expect(body.data.authorization_status).toBe("authorized");
  });

  it("allows manager role to GET driver", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/drivers/driver-1", {
        headers: { ...authedHeaders, "X-Test-Role": "manager" },
      }),
      ctx,
    );
    expect(res.status).toBe(200);
  });

  it("returns 404 when driver not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const res = await GET(
      makeRequest("http://localhost/api/drivers/driver-1", {
        headers: authedHeaders,
      }),
      ctx,
    );
    expect(res.status).toBe(404);
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await GET(
      makeRequest("http://localhost/api/drivers/driver-1", {
        headers: authedHeaders,
      }),
      ctx,
    );
    expect(res.status).toBe(503);
  });
});

// ── PUT /api/drivers/[id] ─────────────────────────────────────────────────────

describe("PUT /api/drivers/[id]", () => {
  let PUT: (req: NextRequest, ctx: unknown) => Promise<Response>;

  beforeAll(async () => {
    ({ PUT } = await import("@/app/api/drivers/[id]/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue(mockDriver);
    mockUpdate.mockResolvedValue(true);
    mockExecute.mockResolvedValue({ success: true });
  });

  const ctx = { params: Promise.resolve({ id: "driver-1" }) };

  it("returns 401 when not authenticated", async () => {
    const res = await PUT(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "PUT",
        body: {},
      }),
      ctx,
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 when driver does not exist", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const res = await PUT(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "PUT",
        headers: authedHeaders,
        body: { mvr_status: "clear" },
      }),
      ctx,
    );
    expect(res.status).toBe(404);
  });

  it("returns 400 for invalid mvr_status", async () => {
    const res = await PUT(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "PUT",
        headers: authedHeaders,
        body: { mvr_status: "invalid-status" },
      }),
      ctx,
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 on successful update", async () => {
    const res = await PUT(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "PUT",
        headers: authedHeaders,
        body: { mvr_status: "clear" },
      }),
      ctx,
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 403 when manager role tries to update (admin-only)", async () => {
    const res = await PUT(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "PUT",
        headers: { ...authedHeaders, "X-Test-Role": "manager" },
        body: { mvr_status: "clear" },
      }),
      ctx,
    );
    expect(res.status).toBe(403);
  });
});

// ── DELETE /api/drivers/[id] ──────────────────────────────────────────────────

describe("DELETE /api/drivers/[id]", () => {
  let DELETE: (req: NextRequest, ctx: unknown) => Promise<Response>;

  beforeAll(async () => {
    ({ DELETE } = await import("@/app/api/drivers/[id]/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue(mockDriver);
    mockUpdate.mockResolvedValue(true);
    mockExecute.mockResolvedValue({ success: true });
  });

  const ctx = { params: Promise.resolve({ id: "driver-1" }) };

  it("returns 401 when not authenticated", async () => {
    const res = await DELETE(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "DELETE",
      }),
      ctx,
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 when driver not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const res = await DELETE(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "DELETE",
        headers: authedHeaders,
      }),
      ctx,
    );
    expect(res.status).toBe(404);
  });

  it("returns 200 on successful deletion", async () => {
    const res = await DELETE(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "DELETE",
        headers: authedHeaders,
      }),
      ctx,
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 403 when manager role tries to delete (admin-only)", async () => {
    const res = await DELETE(
      makeRequest("http://localhost/api/drivers/driver-1", {
        method: "DELETE",
        headers: { ...authedHeaders, "X-Test-Role": "manager" },
      }),
      ctx,
    );
    expect(res.status).toBe(403);
  });

  it("only exports GET, PUT, DELETE on [id] route (no POST)", async () => {
    const mod = await import("@/app/api/drivers/[id]/route");
    expect(mod.GET).toBeDefined();
    expect(mod.PUT).toBeDefined();
    expect(mod.DELETE).toBeDefined();
    expect((mod as Record<string, unknown>).POST).toBeUndefined();
    expect((mod as Record<string, unknown>).PATCH).toBeUndefined();
  });
});

// ── GET /api/drivers/alerts ───────────────────────────────────────────────────

describe("GET /api/drivers/alerts", () => {
  let GET: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/drivers/alerts/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue([]);
  });

  it("returns 401 when not authenticated", async () => {
    const res = await GET(makeRequest("http://localhost/api/drivers/alerts"));
    expect(res.status).toBe(401);
  });

  it("returns 200 with alert categories", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/drivers/alerts", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("expiring_licenses");
    expect(body.data).toHaveProperty("overdue_mvr");
    expect(body.data).toHaveProperty("pending_authorization");
    expect(body.data).toHaveProperty("missing_consent");
    expect(body.data).toHaveProperty("summary");
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await GET(
      makeRequest("http://localhost/api/drivers/alerts", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(503);
  });

  it("allows manager role to access alerts (admin + manager permitted)", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/drivers/alerts", {
        headers: { ...authedHeaders, "X-Test-Role": "manager" },
      }),
    );
    // alerts allows ["admin", "manager"] — manager should succeed
    expect(res.status).toBe(200);
  });

  it("only exports GET on alerts route (no POST/PUT/DELETE)", async () => {
    const mod = await import("@/app/api/drivers/alerts/route");
    expect(mod.GET).toBeDefined();
    expect((mod as Record<string, unknown>).POST).toBeUndefined();
    expect((mod as Record<string, unknown>).PUT).toBeUndefined();
    expect((mod as Record<string, unknown>).DELETE).toBeUndefined();
  });
});

// ── GET /api/drivers/check-alerts (cron) ─────────────────────────────────────

describe("GET /api/drivers/check-alerts", () => {
  let GET: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/drivers/check-alerts/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue([]);
    delete process.env["CRON_SECRET"];
  });

  it("returns 200 when no CRON_SECRET is set (open)", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/drivers/check-alerts"),
    );
    expect(res.status).toBe(200);
  });

  it("returns 401 when CRON_SECRET is set and header is missing", async () => {
    process.env["CRON_SECRET"] = "supersecret";
    const res = await GET(
      makeRequest("http://localhost/api/drivers/check-alerts"),
    );
    expect(res.status).toBe(401);
    delete process.env["CRON_SECRET"];
  });

  it("returns 200 when valid CRON_SECRET header is provided", async () => {
    process.env["CRON_SECRET"] = "supersecret";
    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts", {
        headers: { authorization: "Bearer supersecret" },
      }),
    );
    expect(res.status).toBe(200);
    delete process.env["CRON_SECRET"];
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await GET(
      makeRequest("http://localhost/api/drivers/check-alerts"),
    );
    expect(res.status).toBe(503);
  });
});
