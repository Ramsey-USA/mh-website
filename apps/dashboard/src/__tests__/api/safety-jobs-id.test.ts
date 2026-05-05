/**
 * @jest-environment node
 *
 * Safety Jobs single-item endpoint — unit tests
 *
 * Covers the previously uncovered paths in:
 *   GET   /api/safety/jobs/[id]  — single job lookup (admin vs superintendent view)
 *   PATCH /api/safety/jobs/[id]  — job status update
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue({}),
}));

const mockQueryOne = jest.fn();
const mockUpdate = jest.fn().mockResolvedValue(true);

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    queryOne: mockQueryOne,
    update: mockUpdate,
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

// ── Fixture ───────────────────────────────────────────────────────────────────

const mockJob = {
  id: "job-1",
  job_number: "2024-001",
  job_name: "Office Build",
  location: "Kennewick, WA",
  pm_name: "Matt",
  super_name: "Bob",
  status: "active",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

// ── Module under test ─────────────────────────────────────────────────────────

let GET: (req: NextRequest, ctx: unknown) => Promise<Response>;
let PATCH: (req: NextRequest, ctx: unknown) => Promise<Response>;

beforeAll(async () => {
  ({ GET, PATCH } = await import("@/app/api/safety/jobs/[id]/route"));
});

// =============================================================================
// GET /api/safety/jobs/[id]
// =============================================================================

describe("GET /api/safety/jobs/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue(mockJob);
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValue({});
  });

  it("returns 401 without auth header", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1");
    const res = await GET(req, makeContext("job-1"));
    expect(res.status).toBe(401);
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      headers: authedHeaders,
    });
    const res = await GET(req, makeContext("job-1"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when job is not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/jobs/unknown", {
      headers: authedHeaders,
    });
    const res = await GET(req, makeContext("unknown"));
    expect(res.status).toBe(404);
  });

  it("returns 200 with job data for admin", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      headers: authedHeaders,
    });
    const res = await GET(req, makeContext("job-1"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe("job-1");
  });

  it("returns 200 for superintendent (active jobs only query)", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      headers: { ...authedHeaders, "X-Test-Role": "superintendent" },
    });
    const res = await GET(req, makeContext("job-1"));
    expect(res.status).toBe(200);
  });

  it("returns 500 on query exception", async () => {
    mockQueryOne.mockRejectedValueOnce(new Error("DB error"));
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      headers: authedHeaders,
    });
    const res = await GET(req, makeContext("job-1"));
    expect(res.status).toBe(500);
  });
});

// =============================================================================
// PATCH /api/safety/jobs/[id]
// =============================================================================

describe("PATCH /api/safety/jobs/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdate.mockResolvedValue(true);
    mockQueryOne.mockResolvedValue({ ...mockJob, status: "closed" });
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValue({});
  });

  it("returns 401 without auth header", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      body: { status: "closed" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(401);
  });

  it("returns 403 when superintendent attempts PATCH (admin-only)", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      headers: { ...authedHeaders, "X-Test-Role": "superintendent" },
      body: { status: "closed" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(403);
  });

  it("returns 400 for an invalid status value", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "deleted" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/active|closed|archived/i);
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "closed" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when job does not exist", async () => {
    mockUpdate.mockResolvedValueOnce(false);
    const req = makeRequest("http://localhost/api/safety/jobs/unknown", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "archived" },
    });
    const res = await PATCH(req, makeContext("unknown"));
    expect(res.status).toBe(404);
  });

  it("successfully updates status to closed", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "closed" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledWith(
      "jobs",
      "job-1",
      expect.objectContaining({ status: "closed" }),
    );
  });

  it("successfully updates status to archived", async () => {
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "archived" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(200);
  });

  it("returns 500 on unexpected exception", async () => {
    mockUpdate.mockRejectedValueOnce(new Error("DB crash"));
    const req = makeRequest("http://localhost/api/safety/jobs/job-1", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "active" },
    });
    const res = await PATCH(req, makeContext("job-1"));
    expect(res.status).toBe(500);
  });
});
