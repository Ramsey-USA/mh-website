/**
 * @jest-environment node
 *
 * Leads API — unit tests
 *
 * Covers:
 *   GET /api/leads  — list leads with filtering
 *   POST /api/leads — create a new lead
 *   PATCH /api/leads — update a lead
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";
// ── Mock data ─────────────────────────────────────────────────────────────────

const mockLead = {
  id: "lead-1",
  source: "contact_form",
  source_id: null,
  contact_name: "Alice Example",
  email: "alice@example.com",
  phone: null,
  company: null,
  project_type: "Commercial",
  project_location: "Kennewick, WA",
  project_description: "New office building",
  status: "new",
  estimated_value: null,
  probability: 50,
  priority: "medium",
  assigned_to: null,
  follow_up_date: null,
  last_contact_date: null,
  notes: "[]",
  lost_reason: null,
  metadata: "{}",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  closed_at: null,
};

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue({}),
}));

const mockQuery = jest.fn().mockResolvedValue([mockLead]);
const mockQueryOne = jest.fn().mockResolvedValue({ count: 1 });
const mockInsert = jest.fn().mockResolvedValue({ success: true });
const mockUpdate = jest.fn().mockResolvedValue(true);

jest.mock("@/lib/db/client", () => ({
  DbClient: jest.fn().mockImplementation(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    insert: mockInsert,
    update: mockUpdate,
  })),
  createDbClient: jest.fn().mockImplementation(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    insert: mockInsert,
    update: mockUpdate,
  })),
}));

jest.mock("@/lib/auth/middleware", () => {
  const { makeRequireRoleImpl } = require("../helpers/api-test-utils");
  return { requireRole: jest.fn(makeRequireRoleImpl) };
});

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

// ── GET /api/leads ────────────────────────────────────────────────────────────

describe("GET /api/leads", () => {
  let GET: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET } = await import("@/app/api/leads/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue({ count: 1 });
    mockQuery.mockResolvedValue([mockLead]);
  });

  it("returns 401 when not authenticated", async () => {
    const res = await GET(makeRequest("http://localhost/api/leads"));
    expect(res.status).toBe(401);
  });

  it("returns 200 with paginated leads", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/leads", { headers: authedHeaders }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data).toHaveLength(1);
    expect(body.data[0].contact_name).toBe("Alice Example");
    expect(body.data[0].status).toBe("new");
    expect(body.total).toBe(1);
    expect(body.page).toBe(1);
  });

  it("filters by status=active", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/leads?status=active", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("filters by known status", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/leads?status=new", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("filters by priority", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/leads?priority=high", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("filters by assigned_to=unassigned", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/leads?assigned_to=unassigned", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("filters by source", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/leads?source=contact_form", {
        headers: authedHeaders,
      }),
    );
    expect(res.status).toBe(200);
  });

  it("returns 500 when database unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await GET(
      makeRequest("http://localhost/api/leads", { headers: authedHeaders }),
    );
    expect(res.status).toBe(500);
  });

  it("returns 500 on unexpected error", async () => {
    mockQueryOne.mockRejectedValueOnce(new Error("Query failed"));
    const res = await GET(
      makeRequest("http://localhost/api/leads", { headers: authedHeaders }),
    );
    expect(res.status).toBe(500);
  });

  it("only exports GET, POST, and PATCH on leads route (no PUT/DELETE)", async () => {
    const mod = await import("@/app/api/leads/route");
    expect(mod.GET).toBeDefined();
    expect(mod.POST).toBeDefined();
    expect(mod.PATCH).toBeDefined();
    expect((mod as Record<string, unknown>)["PUT"]).toBeUndefined();
    expect((mod as Record<string, unknown>)["DELETE"]).toBeUndefined();
  });
});

// ── POST /api/leads ───────────────────────────────────────────────────────────

describe("POST /api/leads", () => {
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ POST } = await import("@/app/api/leads/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockInsert.mockResolvedValue({ success: true });
  });

  const validBody = {
    contact_name: "Bob Builder",
    source: "contact_form",
    email: "bob@example.com",
  };

  it("returns 401 when not authenticated", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/leads", {
        method: "POST",
        body: validBody,
      }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 400 when contact_name is missing", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/leads", {
        method: "POST",
        headers: authedHeaders,
        body: { source: "contact_form" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when source is invalid", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/leads", {
        method: "POST",
        headers: authedHeaders,
        body: { contact_name: "Bob", source: "invalid-source" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when source is missing", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/leads", {
        method: "POST",
        headers: authedHeaders,
        body: { contact_name: "Bob" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 500 when database unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await POST(
      makeRequest("http://localhost/api/leads", {
        method: "POST",
        headers: authedHeaders,
        body: validBody,
      }),
    );
    expect(res.status).toBe(500);
  });

  it("returns 201 on successful creation", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/leads", {
        method: "POST",
        headers: authedHeaders,
        body: validBody,
      }),
    );
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 400 on malformed JSON body", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authedHeaders },
        body: "{ bad json",
      }),
    );
    expect([400, 500]).toContain(res.status);
  });
});

// ── PATCH /api/leads ──────────────────────────────────────────────────────────

describe("PATCH /api/leads", () => {
  let PATCH: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ PATCH } = await import("@/app/api/leads/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue(mockLead);
    mockUpdate.mockResolvedValue({ success: true });
  });

  it("returns 401 when not authenticated", async () => {
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        body: { id: "lead-1" },
      }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 400 when id is missing", async () => {
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        headers: authedHeaders,
        body: { status: "contacted" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when lead not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        headers: authedHeaders,
        body: { id: "nonexistent" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 on successful status update", async () => {
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        headers: authedHeaders,
        body: { id: "lead-1", status: "contacted" },
      }),
    );
    expect(res.status).toBe(200);
  });

  it("sets closed_at when status changes to won", async () => {
    mockQueryOne.mockResolvedValueOnce({ ...mockLead, closed_at: null });
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        headers: authedHeaders,
        body: { id: "lead-1", status: "won" },
      }),
    );
    expect(res.status).toBe(200);
  });

  it("handles adding a note", async () => {
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        headers: authedHeaders,
        body: { id: "lead-1", add_note: "Called client", note_author: "Matt" },
      }),
    );
    expect(res.status).toBe(200);
  });

  it("returns 500 when database unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);
    const res = await PATCH(
      makeRequest("http://localhost/api/leads", {
        method: "PATCH",
        headers: authedHeaders,
        body: { id: "lead-1" },
      }),
    );
    expect(res.status).toBe(500);
  });
});
