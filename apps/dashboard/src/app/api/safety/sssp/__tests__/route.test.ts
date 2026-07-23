/**
 * @jest-environment node
 *
 * SSSP API routes — unit tests
 *
 * Covers: GET /api/safety/sssp/[jobId] (fetch sssp + source files),
 *         PATCH /api/safety/sssp/[jobId] (update status/notes),
 *         POST /api/safety/sssp/[jobId]/result (n8n callback).
 */

import { NextRequest } from "next/server";

// ── Shared mocks ──────────────────────────────────────────────────────────────

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

const mockQueryOne = jest.fn();
const mockQuery = jest.fn();
const mockUpdate = jest.fn();
const mockInsert = jest.fn();

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    queryOne: mockQueryOne,
    query: mockQuery,
    update: mockUpdate,
    insert: mockInsert,
    execute: jest.fn(),
  })),
}));

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn(() => ({ __mock: "db" })),
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireRole: jest.fn(
    (
      _roles: string[],
      handler: (req: NextRequest, user: unknown, ctx?: unknown) => unknown,
    ) =>
      async (req: NextRequest, ctx?: unknown) => {
        const auth = req.headers.get("Authorization");
        if (!auth) {
          const { NextResponse } =
            require("next/server") as typeof import("next/server");
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return handler(
          req,
          { uid: "admin1", name: "Admin", role: "admin", email: "a@b.com" },
          ctx,
        );
      },
  ),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {} },
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: (handler: unknown) => handler,
}));

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: jest.fn(() => null),
  R2StorageService: jest.fn(() => ({
    uploadFile: jest.fn().mockResolvedValue({ success: false }),
    getFile: jest.fn().mockResolvedValue({ success: false }),
  })),
  generateFileKey: jest.fn(
    (_folder: string, name: string) => `sssp-output/${name}`,
  ),
}));

jest.mock("@/lib/notifications/n8n-webhook", () => ({
  sendToN8nAsync: jest.fn(),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

const ADMIN_HEADER = { Authorization: "Bearer token" };

const makeSssp = (overrides = {}) => ({
  id: "sssp1",
  job_id: "job1",
  status: "draft",
  content: null,
  r2_key: null,
  generated_at: null,
  approved_by: null,
  approved_at: null,
  notes: null,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

function makeRequest(
  url: string,
  method: string,
  body?: unknown,
  headers: Record<string, string> = ADMIN_HEADER,
): NextRequest {
  return new NextRequest(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
}

// ── GET /api/safety/sssp/[jobId] ──────────────────────────────────────────────

describe("GET /api/safety/sssp/[jobId]", () => {
  let GET: (req: NextRequest, ctx: unknown) => Promise<Response>;

  beforeAll(async () => {
    ({ GET } = await import("../[jobId]/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  it("returns 401 without authorization header", async () => {
    const req = makeRequest(
      "http://localhost/api/safety/sssp/job1",
      "GET",
      undefined,
      {},
    );
    const res = await GET(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(401);
  });

  it("returns sssp and sourceFiles when record exists", async () => {
    const sssp = makeSssp();
    mockQueryOne.mockResolvedValueOnce(sssp);
    mockQuery.mockResolvedValueOnce([]);

    const req = makeRequest("http://localhost/api/safety/sssp/job1", "GET");
    const res = await GET(req, { params: Promise.resolve({ jobId: "job1" }) });
    const json = (await res.json()) as {
      success: boolean;
      data: { sssp: unknown; sourceFiles: unknown[] };
    };

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.sssp).toEqual(sssp);
    expect(json.data.sourceFiles).toEqual([]);
  });

  it("returns null sssp when no record exists", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    mockQuery.mockResolvedValueOnce([]);

    const req = makeRequest("http://localhost/api/safety/sssp/job1", "GET");
    const res = await GET(req, { params: Promise.resolve({ jobId: "job1" }) });
    const json = (await res.json()) as { data: { sssp: null } };

    expect(res.status).toBe(200);
    expect(json.data.sssp).toBeNull();
  });
});

// ── PATCH /api/safety/sssp/[jobId] ───────────────────────────────────────────

describe("PATCH /api/safety/sssp/[jobId]", () => {
  let PATCH: (req: NextRequest, ctx: unknown) => Promise<Response>;

  beforeAll(async () => {
    ({ PATCH } = await import("../[jobId]/route"));
  });

  beforeEach(() => jest.clearAllMocks());

  it("returns 400 for invalid status", async () => {
    // Handler validates status before querying DB — no mock needed
    const req = makeRequest("http://localhost/api/safety/sssp/job1", "PATCH", {
      status: "invalid",
    });
    const res = await PATCH(req, {
      params: Promise.resolve({ jobId: "job1" }),
    });
    expect(res.status).toBe(400);
  });

  it("returns 400 when no SSSP found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/sssp/job1", "PATCH", {
      status: "approved",
    });
    const res = await PATCH(req, {
      params: Promise.resolve({ jobId: "job1" }),
    });
    expect(res.status).toBe(400);
  });

  it("updates status to approved and sets approved_by", async () => {
    mockQueryOne
      .mockResolvedValueOnce(makeSssp({ status: "ready" }))
      .mockResolvedValueOnce(
        makeSssp({ status: "approved", approved_by: "Admin" }),
      );
    mockUpdate.mockResolvedValueOnce(true);

    const req = makeRequest("http://localhost/api/safety/sssp/job1", "PATCH", {
      status: "approved",
    });
    const res = await PATCH(req, {
      params: Promise.resolve({ jobId: "job1" }),
    });
    const json = (await res.json()) as { success: boolean };

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockUpdate).toHaveBeenCalledWith(
      "sssp",
      "sssp1",
      expect.objectContaining({ status: "approved", approved_by: "Admin" }),
    );
  });

  it("updates notes without touching status", async () => {
    mockQueryOne
      .mockResolvedValueOnce(makeSssp())
      .mockResolvedValueOnce(makeSssp({ notes: "new note" }));
    mockUpdate.mockResolvedValueOnce(true);

    const req = makeRequest("http://localhost/api/safety/sssp/job1", "PATCH", {
      notes: "new note",
    });
    const res = await PATCH(req, {
      params: Promise.resolve({ jobId: "job1" }),
    });
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledWith(
      "sssp",
      "sssp1",
      expect.objectContaining({ notes: "new note" }),
    );
    expect(mockUpdate.mock.calls[0][2]).not.toHaveProperty("status");
  });
});

// ── POST /api/safety/sssp/[jobId]/result ─────────────────────────────────────

describe("POST /api/safety/sssp/[jobId]/result", () => {
  let POST: (req: NextRequest, ctx: unknown) => Promise<Response>;

  const CALLBACK_SECRET = "test-secret";

  beforeAll(async () => {
    process.env["SSSP_CALLBACK_SECRET"] = CALLBACK_SECRET;
    ({ POST } = await import("../[jobId]/result/route"));
  });

  afterAll(() => {
    delete process.env["SSSP_CALLBACK_SECRET"];
  });

  beforeEach(() => jest.clearAllMocks());

  const callbackHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CALLBACK_SECRET}`,
  };

  it("returns 401 with wrong secret", async () => {
    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: { ...callbackHeaders, Authorization: "Bearer wrong-secret" },
        body: JSON.stringify({ ssspId: "sssp1", content: "# SSSP" }),
      },
    );
    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(401);
  });

  it("returns 400 when ssspId missing", async () => {
    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({ content: "# SSSP" }),
      },
    );
    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(400);
  });

  it("returns 400 when content is empty", async () => {
    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({ ssspId: "sssp1", content: "" }),
      },
    );
    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(400);
  });

  it("returns 400 when sssp record not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({ ssspId: "sssp1", content: "# SSSP content" }),
      },
    );
    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(400);
  });

  it("updates sssp to ready with content when record exists", async () => {
    mockQueryOne.mockResolvedValueOnce(makeSssp({ status: "generating" }));
    mockUpdate.mockResolvedValueOnce(true);

    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({
          ssspId: "sssp1",
          content: "# SSSP Plan\n\n## Section 1",
        }),
      },
    );
    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    const json = (await res.json()) as {
      success: boolean;
      data: { status: string };
    };

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.status).toBe("ready");
    expect(mockUpdate).toHaveBeenCalledWith(
      "sssp",
      "sssp1",
      expect.objectContaining({
        status: "ready",
        content: "# SSSP Plan\n\n## Section 1",
      }),
    );
  });

  it("returns 503 when database is unavailable", async () => {
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValueOnce(null);

    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({
          ssspId: "sssp1",
          content: "# SSSP Plan",
        }),
      },
    );

    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(503);
  });

  it("stores r2_key when R2 upload succeeds", async () => {
    const r2 = jest.requireMock("@/lib/cloudflare/r2") as {
      getR2Bucket: jest.Mock;
      R2StorageService: jest.Mock;
      generateFileKey: jest.Mock;
    };

    r2.getR2Bucket.mockReturnValueOnce({ __mock: "r2" });
    r2.generateFileKey.mockReturnValueOnce("sssp-output/sssp1.md");
    r2.R2StorageService.mockImplementationOnce(() => ({
      uploadFile: jest.fn().mockResolvedValue({ success: true }),
      getFile: jest.fn().mockResolvedValue({ success: false }),
    }));

    mockQueryOne.mockResolvedValueOnce(makeSssp({ status: "generating" }));
    mockUpdate.mockResolvedValueOnce(true);

    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({ ssspId: "sssp1", content: "# SSSP" }),
      },
    );

    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledWith(
      "sssp",
      "sssp1",
      expect.objectContaining({
        status: "ready",
        content: "# SSSP",
        r2_key: "sssp-output/sssp1.md",
      }),
    );
  });

  it("keeps inline-only mode when R2 upload fails", async () => {
    const r2 = jest.requireMock("@/lib/cloudflare/r2") as {
      getR2Bucket: jest.Mock;
      R2StorageService: jest.Mock;
      generateFileKey: jest.Mock;
    };

    r2.getR2Bucket.mockReturnValueOnce({ __mock: "r2" });
    r2.generateFileKey.mockReturnValueOnce("sssp-output/sssp1.md");
    r2.R2StorageService.mockImplementationOnce(() => ({
      uploadFile: jest
        .fn()
        .mockResolvedValue({ success: false, error: "timeout" }),
      getFile: jest.fn().mockResolvedValue({ success: false }),
    }));

    mockQueryOne.mockResolvedValueOnce(makeSssp({ status: "generating" }));
    mockUpdate.mockResolvedValueOnce(true);

    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: JSON.stringify({ ssspId: "sssp1", content: "# SSSP" }),
      },
    );

    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledWith(
      "sssp",
      "sssp1",
      expect.objectContaining({ r2_key: null }),
    );
  });

  it("returns 500 when callback payload is malformed JSON", async () => {
    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job1/result",
      {
        method: "POST",
        headers: callbackHeaders,
        body: "{not-json",
      },
    );

    const res = await POST(req, { params: Promise.resolve({ jobId: "job1" }) });
    expect(res.status).toBe(500);
  });
});
