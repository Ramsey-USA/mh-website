/**
 * @jest-environment node
 *
 * Safety API authorization + object-level scoping tests
 */

import { NextRequest } from "next/server";

const mockQueryOne = jest.fn();
const mockDbInstance = {
  queryOne: mockQueryOne,
  update: jest.fn(),
  execute: jest.fn(),
};

const mockGetD1Database = jest.fn();
let mockRole = "admin";
let mockName = "Admin User";
let mockUid = "admin-1";

jest.mock("@/lib/db/env", () => ({
  getD1Database: (...args: unknown[]) => mockGetD1Database(...args),
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => mockDbInstance),
}));

jest.mock("@/middleware/security", () => ({
  withSecurity:
    (handler: (...args: unknown[]) => unknown) =>
    async (...args: unknown[]) =>
      handler(...args),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit:
    () =>
    (handler: (...args: unknown[]) => unknown) =>
    async (...args: unknown[]) =>
      handler(...args),
  rateLimitPresets: {
    api: { maxRequests: 60, windowMs: 60_000 },
  },
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireRole:
    (allowedRoles: string[], handler: (...args: unknown[]) => unknown) =>
    async (request: NextRequest, context?: unknown) => {
      const { NextResponse } =
        require("next/server") as typeof import("next/server");

      if (!request.headers.get("Authorization")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      if (!allowedRoles.includes(mockRole)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      return handler(
        request,
        { uid: mockUid, role: mockRole, name: mockName },
        context,
      );
    },
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

let formsGet: typeof import("@/app/api/safety/forms/[id]/route").GET;
let jobsGet: typeof import("@/app/api/safety/jobs/[id]/route").GET;

beforeAll(async () => {
  ({ GET: formsGet } = await import("@/app/api/safety/forms/[id]/route"));
  ({ GET: jobsGet } = await import("@/app/api/safety/jobs/[id]/route"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetD1Database.mockReturnValue({});
  mockRole = "admin";
  mockName = "Admin User";
  mockUid = "admin-1";
});

const makeRequest = (path: string, withAuth = true) =>
  new NextRequest(`http://localhost${path}`, {
    method: "GET",
    headers: withAuth ? { Authorization: "Bearer token" } : {},
  });

const makeContext = (id: string) => ({ params: Promise.resolve({ id }) });

describe("GET /api/safety/forms/[id] authorization", () => {
  it("returns 401 when authorization header is missing", async () => {
    const res = await formsGet(
      makeRequest("/api/safety/forms/abc", false),
      makeContext("abc"),
    );

    expect(res.status).toBe(401);
  });

  it("superintendent query is scoped to submitted_by", async () => {
    mockRole = "superintendent";
    mockName = "Super One";
    mockUid = "super-1";
    mockQueryOne.mockResolvedValue({ id: "abc" });

    const res = await formsGet(
      makeRequest("/api/safety/forms/abc"),
      makeContext("abc"),
    );

    expect(res.status).toBe(200);
    const [sql, ...args] = mockQueryOne.mock.calls[0] as [string, ...string[]];
    expect(sql).toContain("sfs.submitted_by = ?");
    expect(args).toEqual(["abc", "Super One"]);
  });

  it("admin query is not scoped by submitted_by", async () => {
    mockRole = "admin";
    mockQueryOne.mockResolvedValue({ id: "abc" });

    const res = await formsGet(
      makeRequest("/api/safety/forms/abc"),
      makeContext("abc"),
    );

    expect(res.status).toBe(200);
    const [sql, ...args] = mockQueryOne.mock.calls[0] as [string, ...string[]];
    expect(sql).not.toContain("sfs.submitted_by = ?");
    expect(args).toEqual(["abc"]);
  });

  it("returns 404 when scoped superintendent record is not found", async () => {
    mockRole = "superintendent";
    mockName = "Super One";
    mockUid = "super-1";
    mockQueryOne.mockResolvedValue(null);

    const res = await formsGet(
      makeRequest("/api/safety/forms/missing"),
      makeContext("missing"),
    );

    expect(res.status).toBe(404);
  });
});

describe("GET /api/safety/jobs/[id] authorization", () => {
  it("superintendent query is scoped to active jobs", async () => {
    mockRole = "superintendent";
    mockQueryOne.mockResolvedValue({ id: "job-1", status: "active" });

    const res = await jobsGet(
      makeRequest("/api/safety/jobs/job-1"),
      makeContext("job-1"),
    );

    expect(res.status).toBe(200);
    const [sql, ...args] = mockQueryOne.mock.calls[0] as [string, ...string[]];
    expect(sql).toContain("status = 'active'");
    expect(args).toEqual(["job-1"]);
  });

  it("admin query is not scoped by active status", async () => {
    mockRole = "admin";
    mockQueryOne.mockResolvedValue({ id: "job-1", status: "archived" });

    const res = await jobsGet(
      makeRequest("/api/safety/jobs/job-1"),
      makeContext("job-1"),
    );

    expect(res.status).toBe(200);
    const [sql, ...args] = mockQueryOne.mock.calls[0] as [string, ...string[]];
    expect(sql).not.toContain("status = 'active'");
    expect(args).toEqual(["job-1"]);
  });

  it("returns 403 when role is not allowed", async () => {
    mockRole = "user";

    const res = await jobsGet(
      makeRequest("/api/safety/jobs/job-1"),
      makeContext("job-1"),
    );

    expect(res.status).toBe(403);
  });
});
