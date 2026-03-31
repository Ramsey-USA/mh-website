/**
 * @jest-environment node
 *
 * Consultations [id] API — unit tests
 *
 * Covers: auth guard (GET/PUT/DELETE), DB unavailable → 503,
 * consultation not found → 404, found → 200, PUT with valid fields,
 * PUT with no valid fields → 404.
 */

import { NextRequest } from "next/server";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockQueryOne = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockDbInstance = {
  queryOne: mockQueryOne,
  update: mockUpdate,
  delete: mockDelete,
};

const mockGetD1Database = jest.fn();

jest.mock("@/lib/db/env", () => ({
  getD1Database: mockGetD1Database,
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => mockDbInstance),
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireAuth: jest.fn(
    (
      handler: (
        req: NextRequest,
        user: { uid: string; email: string; role: string },
        context?: unknown,
      ) => unknown,
    ) =>
      async (req: NextRequest, context?: unknown) => {
        const { NextResponse } =
          require("next/server") as typeof import("next/server");
        if (!req.headers.get("Authorization")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const mockUser = {
          uid: "admin-matt",
          email: "matt@mhc-gc.com",
          role: "admin",
        };
        return handler(req, mockUser, context);
      },
  ),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// ── Setup ─────────────────────────────────────────────────────────────────────

let GET: typeof import("@/app/api/consultations/[id]/route").GET;
let PUT: typeof import("@/app/api/consultations/[id]/route").PUT;
let DELETE: typeof import("@/app/api/consultations/[id]/route").DELETE;

beforeAll(async () => {
  ({ GET, PUT, DELETE } = await import("@/app/api/consultations/[id]/route"));
});

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

const makeRequest = (
  method: "GET" | "PUT" | "DELETE",
  body?: unknown,
  withAuth = true,
) =>
  new NextRequest(`http://localhost/api/consultations/123`, {
    method,
    headers: {
      ...(withAuth ? { Authorization: "Bearer token" } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("GET /api/consultations/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 without Authorization header", async () => {
    const res = await GET(
      makeRequest("GET", undefined, false),
      makeContext("123"),
    );
    expect(res.status).toBe(401);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1Database.mockReturnValue(null);
    const res = await GET(makeRequest("GET"), makeContext("123"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when consultation is not found", async () => {
    mockGetD1Database.mockReturnValue({});
    mockQueryOne.mockResolvedValue(null);
    const res = await GET(makeRequest("GET"), makeContext("999"));
    expect(res.status).toBe(404);
  });

  it("returns 200 with consultation data when found", async () => {
    mockGetD1Database.mockReturnValue({});
    const consultation = {
      id: "123",
      client_name: "John Doe",
      status: "pending",
    };
    mockQueryOne.mockResolvedValue(consultation);

    const res = await GET(makeRequest("GET"), makeContext("123"));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data.id).toBe("123");
    expect(body.data.client_name).toBe("John Doe");
  });

  it("returns 500 when an error is thrown during GET", async () => {
    mockGetD1Database.mockReturnValue({});
    mockQueryOne.mockRejectedValue(new Error("DB read error"));
    const res = await GET(makeRequest("GET"), makeContext("123"));
    expect(res.status).toBe(500);
  });
});

describe("PUT /api/consultations/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 without Authorization header", async () => {
    const res = await PUT(
      makeRequest("PUT", { status: "confirmed" }, false),
      makeContext("123"),
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 when no valid updatable fields are present", async () => {
    mockGetD1Database.mockReturnValue({});
    const res = await PUT(
      makeRequest("PUT", { unknown_field: "value" }),
      makeContext("123"),
    );
    expect(res.status).toBe(404);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1Database.mockReturnValue(null);
    const res = await PUT(
      makeRequest("PUT", { status: "confirmed" }),
      makeContext("123"),
    );
    expect(res.status).toBe(503);
  });

  it("returns 404 when consultation is not found for update", async () => {
    mockGetD1Database.mockReturnValue({});
    mockUpdate.mockResolvedValue(false);
    const res = await PUT(
      makeRequest("PUT", { status: "confirmed" }),
      makeContext("123"),
    );
    expect(res.status).toBe(404);
  });

  it("returns 200 with updated data on successful update", async () => {
    mockGetD1Database.mockReturnValue({});
    mockUpdate.mockResolvedValue(true);
    const updated = { id: "123", status: "confirmed", client_name: "John" };
    mockQueryOne.mockResolvedValue(updated);

    const res = await PUT(
      makeRequest("PUT", { status: "confirmed" }),
      makeContext("123"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.status).toBe("confirmed");
  });

  it("returns 500 when an error is thrown during update", async () => {
    mockGetD1Database.mockReturnValue({});
    mockUpdate.mockRejectedValue(new Error("DB write error"));

    const res = await PUT(
      makeRequest("PUT", { status: "confirmed" }),
      makeContext("123"),
    );
    expect(res.status).toBe(500);
  });
});

describe("DELETE /api/consultations/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 without Authorization header", async () => {
    const res = await DELETE(
      makeRequest("DELETE", undefined, false),
      makeContext("123"),
    );
    expect(res.status).toBe(401);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1Database.mockReturnValue(null);
    const res = await DELETE(makeRequest("DELETE"), makeContext("123"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when consultation is not found", async () => {
    mockGetD1Database.mockReturnValue({});
    mockDelete.mockResolvedValue(false);
    const res = await DELETE(makeRequest("DELETE"), makeContext("999"));
    expect(res.status).toBe(404);
  });

  it("returns 200 on successful deletion", async () => {
    mockGetD1Database.mockReturnValue({});
    mockDelete.mockResolvedValue(true);
    const res = await DELETE(makeRequest("DELETE"), makeContext("123"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe("123");
  });

  it("returns 500 when an error is thrown during DELETE", async () => {
    mockGetD1Database.mockReturnValue({});
    mockDelete.mockRejectedValue(new Error("DB delete error"));
    const res = await DELETE(makeRequest("DELETE"), makeContext("123"));
    expect(res.status).toBe(500);
  });
});
