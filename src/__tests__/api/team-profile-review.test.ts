/**
 * @jest-environment node
 *
 * Team Profile Review API — unit tests
 *
 * Covers:
 *   GET  /api/team-profile/review — list pending submissions (Matt-only)
 *   POST /api/team-profile/review — approve or reject a submission (Matt-only)
 */

import { NextRequest, NextResponse } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockPendingRow = {
  slug: "jeremy-thamert",
  bio: "Jeremy's updated bio.",
  fun_fact: "Served in the Army.",
  certifications: "OSHA 30",
  hobbies: "Fishing",
  special_interests: "Leadership Development",
  career_highlights: JSON.stringify(["Founded MH Construction."]),
  specialties: JSON.stringify(["Commercial Construction"]),
  skills: JSON.stringify({ leadership: 95 }),
  current_year_stats: null,
  career_stats: null,
  years_with_company: 10,
  hometown: "Kennewick, WA",
  education: "Army Leadership",
  nickname: "Owner",
  status: "pending_approval",
  submitted_at: "2026-04-24T00:00:00.000Z",
  updated_at: "2026-04-24T00:00:00.000Z",
  updated_by: "admin-jeremy",
  reviewed_at: null,
  reviewed_by: null,
  rejection_reason: null,
};

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockGetD1 = jest.fn().mockReturnValue({});

jest.mock("@/lib/db/env", () => ({
  getD1Database: (...args: unknown[]) => mockGetD1(...args),
}));

const mockQuery = jest.fn().mockResolvedValue([]);
const mockQueryOne = jest.fn().mockResolvedValue(null);
const mockExecute = jest
  .fn()
  .mockResolvedValue({ success: true, rowsAffected: 1 });

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn().mockImplementation(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    execute: mockExecute,
  })),
}));

// requireRole mock: uses X-Test-Email header. Default is matt@mhc-gc.com.
jest.mock("@/lib/auth/middleware", () => ({
  requireRole: jest.fn(
    (
      roles: string[],
      handler: (req: NextRequest, user: unknown, ctx?: unknown) => unknown,
    ) => {
      return (req: NextRequest, ctx?: unknown) => {
        const auth = req.headers.get("Authorization");
        if (!auth) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const role = req.headers.get("X-Test-Role") ?? "admin";
        if (!roles.includes(role)) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const email =
          req.headers.get("X-Test-Email") ?? "matt@mhc-gc.com";
        const user = { uid: "admin-matt", role, name: "Matt", email };
        return handler(req, user, ctx);
      };
    },
  ),
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

// ── Import route after mocks ───────────────────────────────────────────────────

import {
  GET,
  POST,
} from "@/app/api/team-profile/review/route";

// ── Helpers ───────────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost/api/team-profile/review";

function makeAuthedRequest(
  method: string,
  body?: unknown,
  extraHeaders?: Record<string, string>,
) {
  return makeRequest(BASE_URL, {
    method,
    headers: { ...authedHeaders, ...(extraHeaders ?? {}) },
    body,
  });
}

// ── GET Tests ─────────────────────────────────────────────────────────────────

describe("GET /api/team-profile/review", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockQuery.mockResolvedValue([]);
  });

  it("returns 401 when no auth header", async () => {
    const req = makeRequest(BASE_URL);
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 403 when role is not admin", async () => {
    const req = makeRequest(BASE_URL, {
      headers: { ...authedHeaders, "X-Test-Role": "worker" },
    });
    const res = await GET(req);
    expect(res.status).toBe(403);
  });

  it("returns 403 when admin email is not the approver", async () => {
    const req = makeAuthedRequest("GET", undefined, {
      "X-Test-Email": "jeremy@mhc-gc.com",
    });
    const res = await GET(req);
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toMatch(/approver/i);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1.mockReturnValue(null);
    const req = makeAuthedRequest("GET");
    const res = await GET(req);
    expect(res.status).toBe(503);
  });

  it("returns empty list when no pending submissions", async () => {
    const req = makeAuthedRequest("GET");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.submissions).toHaveLength(0);
    expect(body.data.count).toBe(0);
  });

  it("returns pending submissions enriched with display name", async () => {
    mockQuery.mockResolvedValue([mockPendingRow]);
    const req = makeAuthedRequest("GET");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.submissions).toHaveLength(1);
    const sub = body.data.submissions[0];
    expect(sub.slug).toBe("jeremy-thamert");
    // name resolved from vintageTeamMembers static data
    expect(typeof sub.name).toBe("string");
    expect(sub.name).not.toBe("jeremy-thamert"); // resolved, not raw slug
    expect(sub.bio).toBe("Jeremy's updated bio.");
    expect(sub.submittedAt).toBe("2026-04-24T00:00:00.000Z");
  });
});

// ── POST Tests ────────────────────────────────────────────────────────────────

describe("POST /api/team-profile/review", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockQueryOne.mockResolvedValue({ status: "pending_approval" });
    mockExecute.mockResolvedValue({ success: true, rowsAffected: 1 });
  });

  it("returns 401 when no auth header", async () => {
    const req = makeRequest(BASE_URL, { method: "POST", body: {} });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 403 when admin email is not the approver", async () => {
    const req = makeAuthedRequest(
      "POST",
      { slug: "jeremy-thamert", action: "approve" },
      { "X-Test-Email": "arnold@mhc-gc.com" },
    );
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it("returns 400 when slug is missing", async () => {
    const req = makeAuthedRequest("POST", { action: "approve" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/slug/i);
  });

  it("returns 400 when action is invalid", async () => {
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "maybe",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/action/i);
  });

  it("returns 400 when rejecting without a reason", async () => {
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "reject",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/rejectionReason/i);
  });

  it("returns 404 when slug is not a known team member", async () => {
    const req = makeAuthedRequest("POST", {
      slug: "unknown-person",
      action: "approve",
    });
    const res = await POST(req);
    expect(res.status).toBe(404);
  });

  it("returns 404 when no DB row exists for the slug", async () => {
    mockQueryOne.mockResolvedValue(null);
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "approve",
    });
    const res = await POST(req);
    expect(res.status).toBe(404);
  });

  it("returns 400 when submission is already approved", async () => {
    mockQueryOne.mockResolvedValue({ status: "approved" });
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "approve",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/already/i);
  });

  it("approves a pending submission and returns 200", async () => {
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "approve",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.status).toBe("approved");
    expect(mockExecute).toHaveBeenCalledTimes(1);
    const sqlArg = (mockExecute.mock.calls[0] as unknown[])[0] as string;
    expect(sqlArg).toContain("reviewed_at");
  });

  it("rejects a pending submission with reason and returns 200", async () => {
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "reject",
      rejectionReason: "Please update your bio to be more professional.",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.status).toBe("rejected");
    expect(mockExecute).toHaveBeenCalledTimes(1);
    // Verify rejection_reason is passed as a parameter
    const params = mockExecute.mock.calls[0] as unknown[];
    expect(params).toContain("rejected");
    expect(params).toContain("Please update your bio to be more professional.");
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1.mockReturnValue(null);
    const req = makeAuthedRequest("POST", {
      slug: "jeremy-thamert",
      action: "approve",
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
  });
});
