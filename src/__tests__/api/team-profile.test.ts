/**
 * @jest-environment node
 *
 * Team Profile API — unit tests
 *
 * Covers:
 *   GET /api/team-profile — load the caller's merged profile
 *   PUT /api/team-profile — upsert profile overrides
 */

import { NextRequest, NextResponse } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockDbRow = {
  slug: "matt-ramsey",
  bio: "Updated bio from DB.",
  fun_fact: "Updated fun fact.",
  certifications: "OSHA 30, CPR",
  hobbies: "Camping",
  special_interests: "Digital Asset Management",
  career_highlights: JSON.stringify(["Led digital transformation."]),
  specialties: JSON.stringify(["Digital Strategy"]),
  skills: JSON.stringify({
    leadership: 80,
    technical: 90,
    communication: 95,
    safety: 90,
    problemSolving: 85,
    teamwork: 80,
    organization: 95,
    innovation: 90,
    passion: 90,
    continuingEducation: 90,
  }),
  current_year_stats: JSON.stringify({
    projectsCompleted: 40,
    clientSatisfaction: 99,
    safetyRecord: "EXCELLENT",
    teamCollaborations: 45,
  }),
  career_stats: JSON.stringify({
    totalProjects: 200,
    yearsExperience: 10,
    specialtyAreas: 7,
    mentorships: 20,
  }),
  years_with_company: 2,
  hometown: "Richland, WA",
  education: "BAS Operations Management",
  nickname: "Digital Lead",
  updated_at: "2026-04-24T00:00:00.000Z",
  updated_by: "admin-matt",
};

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockGetD1 = jest.fn().mockReturnValue({});

jest.mock("@/lib/db/env", () => ({
  getD1Database: (...args: unknown[]) => mockGetD1(...args),
}));

const mockQueryOne = jest.fn().mockResolvedValue(null);
const mockExecute = jest
  .fn()
  .mockResolvedValue({ success: true, rowsAffected: 1 });

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn().mockImplementation(() => ({
    queryOne: mockQueryOne,
    execute: mockExecute,
  })),
}));

// requireRole mock: uses X-Test-Email header so each test can control which
// team member is identified. Default maps to "matt@mhc-gc.com" → "matt-ramsey".
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

import { GET, PUT } from "@/app/api/team-profile/route";

// ── Helpers ───────────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost/api/team-profile";

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

describe("GET /api/team-profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockQueryOne.mockResolvedValue(null);
  });

  it("returns 401 when no auth header is provided", async () => {
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

  it("returns 404 when admin email has no team profile mapping", async () => {
    const req = makeAuthedRequest("GET", undefined, {
      "X-Test-Email": "nobody@mhc-gc.com",
    });
    const res = await GET(req);
    expect(res.status).toBe(404);
  });

  it("returns static profile when no DB override exists", async () => {
    const req = makeAuthedRequest("GET");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.profile.slug).toBe("matt-ramsey");
    expect(body.data.hasOverride).toBe(false);
    expect(body.data.lastUpdated).toBeNull();
  });

  it("returns merged profile when DB override exists", async () => {
    mockQueryOne.mockResolvedValue(mockDbRow);
    const req = makeAuthedRequest("GET");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.profile.bio).toBe("Updated bio from DB.");
    expect(body.data.profile.slug).toBe("matt-ramsey");
    expect(body.data.hasOverride).toBe(true);
    expect(body.data.lastUpdated).toBe("2026-04-24T00:00:00.000Z");
  });

  it("falls back to static data when DB is unavailable", async () => {
    mockGetD1.mockReturnValue(null);
    const req = makeAuthedRequest("GET");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.hasOverride).toBe(false);
  });
});

// ── PUT Tests ─────────────────────────────────────────────────────────────────

describe("PUT /api/team-profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockExecute.mockResolvedValue({ success: true, rowsAffected: 1 });
  });

  it("returns 401 when no auth header is provided", async () => {
    const req = makeRequest(BASE_URL, { method: "PUT", body: { bio: "Hello" } });
    const res = await PUT(req);
    expect(res.status).toBe(401);
  });

  it("returns 404 when admin email has no team profile mapping", async () => {
    const req = makeAuthedRequest("PUT", { bio: "Hello" }, {
      "X-Test-Email": "nobody@mhc-gc.com",
    });
    const res = await PUT(req);
    expect(res.status).toBe(404);
  });

  it("returns 400 for invalid JSON body", async () => {
    const req = new NextRequest(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer valid",
      },
      body: "not-json",
    });
    const res = await PUT(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when body has no updatable fields", async () => {
    const req = makeAuthedRequest("PUT", {});
    const res = await PUT(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when bio exceeds max length", async () => {
    const req = makeAuthedRequest("PUT", { bio: "a".repeat(1201) });
    const res = await PUT(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/bio/i);
  });

  it("returns 400 when yearsWithCompany is out of range", async () => {
    const req = makeAuthedRequest("PUT", { yearsWithCompany: 999 });
    const res = await PUT(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when a skill value is out of range", async () => {
    const req = makeAuthedRequest("PUT", { skills: { leadership: 150 } });
    const res = await PUT(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when a careerHighlights item exceeds max length", async () => {
    const req = makeAuthedRequest("PUT", {
      careerHighlights: ["a".repeat(201)],
    });
    const res = await PUT(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/careerHighlights/i);
  });

  it("saves valid profile update and returns 200", async () => {
    const req = makeAuthedRequest("PUT", {
      bio: "New bio text.",
      funFact: "I brew my own coffee.",
      yearsWithCompany: 2,
      careerHighlights: ["Led digital strategy"],
      specialties: ["Digital Marketing"],
    });
    const res = await PUT(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.slug).toBe("matt-ramsey");
    expect(mockExecute).toHaveBeenCalledTimes(1);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1.mockReturnValue(null);
    const req = makeAuthedRequest("PUT", { bio: "Updated bio." });
    const res = await PUT(req);
    expect(res.status).toBe(503);
  });

  it("saves skills and SQL includes skills column", async () => {
    const req = makeAuthedRequest("PUT", {
      skills: {
        leadership: 85,
        technical: 90,
        communication: 92,
        safety: 88,
        problemSolving: 82,
        teamwork: 78,
        organization: 94,
        innovation: 89,
        passion: 88,
        continuingEducation: 88,
      },
    });
    const res = await PUT(req);
    expect(res.status).toBe(200);
    expect(mockExecute).toHaveBeenCalledTimes(1);
    const sqlArg = (mockExecute.mock.calls[0] as unknown[])[0] as string;
    expect(sqlArg).toContain("skills");
  });
});
