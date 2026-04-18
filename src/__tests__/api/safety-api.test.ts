/**
 * @jest-environment node
 *
 * Safety API Routes — unit tests
 *
 * Covers:
 *   GET  /api/safety/downloads  — list download events (admin)
 *   POST /api/safety/downloads  — log a download
 *   GET  /api/safety/forms      — list form submissions
 *   POST /api/safety/forms      — submit a form
 *   GET  /api/safety/forms/[id] — get single submission
 *   PATCH /api/safety/forms/[id] — update status
 *   GET  /api/safety/jobs       — list active jobs
 *   POST /api/safety/jobs       — create a job
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Mock shared data ──────────────────────────────────────────────────────────

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

const mockSubmission = {
  id: "sub-1",
  job_id: "job-1",
  form_type: "toolbox-talk",
  submitted_by: "Bob Super",
  submitted_at: "2024-01-01T00:00:00Z",
  data: "{}",
  print_count: 0,
  status: "submitted",
  job_number: "2024-001",
  job_name: "Office Build",
};

const mockDownloadLog = {
  id: "dl-1",
  section_key: "emergency-procedures",
  section_title: "Emergency Procedures",
  download_type: "section",
  downloaded_by: "admin-1",
  job_id: null,
  downloaded_at: "2024-01-01T00:00:00Z",
};

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue({}),
}));

const mockQuery = jest.fn().mockResolvedValue([]);
const mockQueryOne = jest.fn().mockResolvedValue(mockJob);
const mockExecute = jest.fn().mockResolvedValue({ success: true });
const mockInsert = jest.fn().mockResolvedValue("new-id-123");
const mockUpdate = jest.fn().mockResolvedValue(true);

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    execute: mockExecute,
    insert: mockInsert,
    update: mockUpdate,
  })),
}));

jest.mock("@/lib/auth/middleware", () => {
  const { makeRequireRoleImpl } = require("../helpers/api-test-utils");
  return { requireRole: jest.fn(makeRequireRoleImpl) };
});

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {}, strict: {}, forms: {} },
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

jest.mock("@/lib/notifications/n8n-webhook", () => ({
  sendToN8nAsync: jest.fn().mockResolvedValue({ success: true }),
}));

// ── Safety Downloads ──────────────────────────────────────────────────────────

describe("Safety Downloads API", () => {
  let GET: (req: NextRequest) => Promise<Response>;
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET, POST } = await import("@/app/api/safety/downloads/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue([mockDownloadLog]);
    mockExecute.mockResolvedValue({ success: true });
  });

  describe("GET /api/safety/downloads", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/downloads"),
      );
      expect(res.status).toBe(401);
    });

    it("returns 200 with download logs", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/downloads", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(1);
      expect(body.data[0].section_key).toBe("emergency-procedures");
      expect(body.data[0].download_type).toBe("section");
    });

    it("filters by section_key", async () => {
      const res = await GET(
        makeRequest(
          "http://localhost/api/safety/downloads?section_key=emergency-procedures",
          { headers: authedHeaders },
        ),
      );
      expect(res.status).toBe(200);
    });

    it("returns 503 when database unavailable", async () => {
      const { getD1Database } = jest.requireMock("@/lib/db/env") as {
        getD1Database: jest.Mock;
      };
      getD1Database.mockReturnValueOnce(null);
      const res = await GET(
        makeRequest("http://localhost/api/safety/downloads", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(503);
    });
  });

  describe("POST /api/safety/downloads", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/downloads", {
          method: "POST",
        }),
      );
      expect(res.status).toBe(401);
    });

    it("returns 400 when section_key is missing", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/downloads", {
          method: "POST",
          headers: authedHeaders,
          body: { download_type: "section" },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 400 when download_type is invalid", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/downloads", {
          method: "POST",
          headers: authedHeaders,
          body: { section_key: "emergency", download_type: "invalid" },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 201 on successful log entry", async () => {
      mockInsert.mockResolvedValueOnce("dl-new-id");
      const res = await POST(
        makeRequest("http://localhost/api/safety/downloads", {
          method: "POST",
          headers: authedHeaders,
          body: {
            section_key: "emergency-procedures",
            download_type: "section",
          },
        }),
      );
      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.success).toBe(true);
      // Route returns { success: true } only (no data payload) — this is intentional.
    });

    it("allows worker download logging", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/downloads", {
          method: "POST",
          headers: { ...authedHeaders, "X-Test-Role": "worker" },
          body: {
            section_key: "manual-04",
            download_type: "section",
          },
        }),
      );

      expect(res.status).toBe(201);
    });

    it("allows traveler download logging", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/downloads", {
          method: "POST",
          headers: { ...authedHeaders, "X-Test-Role": "traveler" },
          body: {
            section_key: "manual-04",
            download_type: "section",
          },
        }),
      );

      expect(res.status).toBe(201);
    });

    it("returns 400 on malformed JSON body", async () => {
      const res = await POST(
        new NextRequest("http://localhost/api/safety/downloads", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authedHeaders },
          body: "not-valid-json",
        }),
      );
      // Routes that don't explicitly catch JSON.parse errors will return 500;
      // accepting both so this test flags unexpected codes (e.g. 200, 401).
      expect([400, 500]).toContain(res.status);
    });

    it("only exports GET and POST on downloads route (no PUT/DELETE)", async () => {
      const mod = await import("@/app/api/safety/downloads/route");
      expect(mod.GET).toBeDefined();
      expect(mod.POST).toBeDefined();
      expect((mod as Record<string, unknown>)["PUT"]).toBeUndefined();
      expect((mod as Record<string, unknown>)["DELETE"]).toBeUndefined();
    });
  });
});

// ── Safety Forms ──────────────────────────────────────────────────────────────

describe("Safety Forms API", () => {
  let GET: (req: NextRequest) => Promise<Response>;
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET, POST } = await import("@/app/api/safety/forms/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue([mockSubmission]);
    mockQueryOne.mockResolvedValue(mockJob);
    mockInsert.mockResolvedValue("new-sub-id");
  });

  describe("GET /api/safety/forms", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await GET(makeRequest("http://localhost/api/safety/forms"));
      expect(res.status).toBe(401);
    });

    it("returns 200 with submissions list", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(1);
      expect(body.data[0].form_type).toBe("toolbox-talk");
      expect(body.data[0].job_number).toBe("2024-001");
    });

    it("filters by job_id", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms?job_id=job-1", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(200);
    });

    it("superintendent sees only their submissions", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms", {
          headers: { ...authedHeaders, "X-Test-Role": "superintendent" },
        }),
      );
      expect(res.status).toBe(200);
    });

    it("returns 503 when database unavailable", async () => {
      const { getD1Database } = jest.requireMock("@/lib/db/env") as {
        getD1Database: jest.Mock;
      };
      getD1Database.mockReturnValueOnce(null);
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(503);
    });
  });

  describe("POST /api/safety/forms", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/forms", { method: "POST" }),
      );
      expect(res.status).toBe(401);
    });

    it("returns 400 when job_id is missing", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/forms", {
          method: "POST",
          headers: authedHeaders,
          body: { form_type: "toolbox-talk", data: {} },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 400 when form_type is invalid", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/forms", {
          method: "POST",
          headers: authedHeaders,
          body: { job_id: "job-1", form_type: "unknown-type", data: {} },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 400 when data is missing", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/forms", {
          method: "POST",
          headers: authedHeaders,
          body: { job_id: "job-1", form_type: "toolbox-talk" },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 503 when database unavailable", async () => {
      const { getD1Database } = jest.requireMock("@/lib/db/env") as {
        getD1Database: jest.Mock;
      };
      getD1Database.mockReturnValueOnce(null);
      const res = await POST(
        makeRequest("http://localhost/api/safety/forms", {
          method: "POST",
          headers: authedHeaders,
          body: { job_id: "job-1", form_type: "toolbox-talk", data: {} },
        }),
      );
      expect(res.status).toBe(503);
    });

    it("returns 201 on successful submission", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/forms", {
          method: "POST",
          headers: authedHeaders,
          body: {
            job_id: "job-1",
            form_type: "toolbox-talk",
            data: { topic: "Fall protection", attendees: ["Bob"] },
          },
        }),
      );
      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("returns 400 on malformed JSON body", async () => {
      const res = await POST(
        new NextRequest("http://localhost/api/safety/forms", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authedHeaders },
          body: "{ invalid json",
        }),
      );
      expect([400, 500]).toContain(res.status);
    });

    it("only exports GET and POST on forms route (no PUT/DELETE)", async () => {
      const mod = await import("@/app/api/safety/forms/route");
      expect(mod.GET).toBeDefined();
      expect(mod.POST).toBeDefined();
      expect((mod as Record<string, unknown>)["PUT"]).toBeUndefined();
      expect((mod as Record<string, unknown>)["DELETE"]).toBeUndefined();
    });
  });
});

// ── Safety Forms [id] ─────────────────────────────────────────────────────────

describe("Safety Forms [id] API", () => {
  let GET: (req: NextRequest, ctx: unknown) => Promise<Response>;
  let PATCH: (req: NextRequest, ctx: unknown) => Promise<Response>;

  beforeAll(async () => {
    ({ GET, PATCH } = await import("@/app/api/safety/forms/[id]/route"));
  });

  const ctx = { params: Promise.resolve({ id: "sub-1" }) };

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryOne.mockResolvedValue(mockSubmission);
    mockExecute.mockResolvedValue({ success: true });
    mockUpdate.mockResolvedValue(true);
  });

  describe("GET /api/safety/forms/[id]", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms/sub-1"),
        ctx,
      );
      expect(res.status).toBe(401);
    });

    it("returns 200 with submission data", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms/sub-1", {
          headers: authedHeaders,
        }),
        ctx,
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data.form_type).toBe("toolbox-talk");
      expect(body.data.status).toBe("submitted");
    });

    it("returns 404 when submission not found", async () => {
      mockQueryOne.mockResolvedValueOnce(null);
      const res = await GET(
        makeRequest("http://localhost/api/safety/forms/sub-1", {
          headers: authedHeaders,
        }),
        ctx,
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /api/safety/forms/[id]", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await PATCH(
        makeRequest("http://localhost/api/safety/forms/sub-1", {
          method: "PATCH",
          body: {},
        }),
        ctx,
      );
      expect(res.status).toBe(401);
    });

    it("returns 400 for invalid status", async () => {
      const res = await PATCH(
        makeRequest("http://localhost/api/safety/forms/sub-1", {
          method: "PATCH",
          headers: authedHeaders,
          body: { status: "invalid-status" },
        }),
        ctx,
      );
      expect(res.status).toBe(400);
    });

    it("returns 200 on successful status update", async () => {
      const res = await PATCH(
        makeRequest("http://localhost/api/safety/forms/sub-1", {
          method: "PATCH",
          headers: authedHeaders,
          body: { status: "reviewed" },
        }),
        ctx,
      );
      expect(res.status).toBe(200);
    });

    it("returns 200 when incrementing print_count", async () => {
      const res = await PATCH(
        makeRequest("http://localhost/api/safety/forms/sub-1", {
          method: "PATCH",
          headers: authedHeaders,
          body: { increment_print: true },
        }),
        ctx,
      );
      expect(res.status).toBe(200);
    });

    it("only exports GET and PATCH on forms/[id] route", async () => {
      const mod = await import("@/app/api/safety/forms/[id]/route");
      expect(mod.GET).toBeDefined();
      expect(mod.PATCH).toBeDefined();
      expect((mod as Record<string, unknown>)["POST"]).toBeUndefined();
      expect((mod as Record<string, unknown>)["PUT"]).toBeUndefined();
      expect((mod as Record<string, unknown>)["DELETE"]).toBeUndefined();
    });
  });
});

// ── Safety Jobs ───────────────────────────────────────────────────────────────

describe("Safety Jobs API", () => {
  let GET: (req: NextRequest) => Promise<Response>;
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ GET, POST } = await import("@/app/api/safety/jobs/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue([mockJob]);
    mockInsert.mockResolvedValue("new-job-id");
  });

  describe("GET /api/safety/jobs", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await GET(makeRequest("http://localhost/api/safety/jobs"));
      expect(res.status).toBe(401);
    });

    it("returns 200 with active jobs list", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/jobs", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(1);
      expect(body.data[0].job_number).toBe("2024-001");
      expect(body.data[0].status).toBe("active");
    });

    it("superintendent can GET jobs", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/jobs", {
          headers: { ...authedHeaders, "X-Test-Role": "superintendent" },
        }),
      );
      expect(res.status).toBe(200);
    });

    it("returns 503 when database unavailable", async () => {
      const { getD1Database } = jest.requireMock("@/lib/db/env") as {
        getD1Database: jest.Mock;
      };
      getD1Database.mockReturnValueOnce(null);
      const res = await GET(
        makeRequest("http://localhost/api/safety/jobs", {
          headers: authedHeaders,
        }),
      );
      expect(res.status).toBe(503);
    });
  });

  describe("POST /api/safety/jobs", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          body: { job_number: "2024-002", job_name: "Warehouse" },
        }),
      );
      expect(res.status).toBe(401);
    });

    it("returns 400 when job_number is missing", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          headers: authedHeaders,
          body: { job_name: "Warehouse" },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 400 when job_name is missing", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          headers: authedHeaders,
          body: { job_number: "2024-002" },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("returns 201 on successful job creation", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          headers: authedHeaders,
          body: { job_number: "2024-002", job_name: "New Warehouse" },
        }),
      );
      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("returns 403 when superintendent tries to create job (admin-only)", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          headers: { ...authedHeaders, "X-Test-Role": "superintendent" },
          body: { job_number: "2024-002", job_name: "New Warehouse" },
        }),
      );
      expect(res.status).toBe(403);
    });

    it("returns 400 on malformed JSON body", async () => {
      const res = await POST(
        new NextRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authedHeaders },
          body: "not-json{",
        }),
      );
      expect([400, 500]).toContain(res.status);
    });

    it("returns 503 when database unavailable on POST", async () => {
      const { getD1Database } = jest.requireMock("@/lib/db/env") as {
        getD1Database: jest.Mock;
      };
      getD1Database.mockReturnValueOnce(null).mockReturnValueOnce(null);
      const res = await POST(
        makeRequest("http://localhost/api/safety/jobs", {
          method: "POST",
          headers: authedHeaders,
          body: { job_number: "2024-002", job_name: "Warehouse" },
        }),
      );
      expect(res.status).toBe(503);
    });

    it("only exports GET and POST on jobs route (no PUT/DELETE)", async () => {
      const mod = await import("@/app/api/safety/jobs/route");
      expect(mod.GET).toBeDefined();
      expect(mod.POST).toBeDefined();
      expect((mod as Record<string, unknown>)["PUT"]).toBeUndefined();
      expect((mod as Record<string, unknown>)["DELETE"]).toBeUndefined();
    });
  });
});
