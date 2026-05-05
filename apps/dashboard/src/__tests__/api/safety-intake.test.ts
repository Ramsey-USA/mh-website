/**
 * @jest-environment node
 *
 * Safety Intake API — unit tests
 *
 * Covers:
 *   POST /api/safety/intake  — file upload + validation
 *   GET  /api/safety/intake  — admin list with optional filters
 *   GET  /api/safety/intake/[id]  — single submission
 *   PATCH /api/safety/intake/[id] — status / review_notes update
 *   GET  /api/safety/intake/[id]/file  — file proxy
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Shared mock primitives ────────────────────────────────────────────────────

const mockGetD1 = jest.fn().mockReturnValue({});

jest.mock("@/lib/db/env", () => ({
  getD1Database: (...args: unknown[]) => mockGetD1(...args),
}));

const mockQuery = jest.fn();
const mockQueryOne = jest.fn();
const mockInsert = jest.fn().mockResolvedValue("intake-123");
const mockUpdate = jest.fn().mockResolvedValue(true);

jest.mock("@/lib/db/client", () => ({
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

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {}, strict: {} },
}));

const uploadFileMock = jest.fn();
const getFileMock = jest.fn();

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: jest.fn().mockReturnValue({}),
  R2StorageService: jest.fn().mockImplementation(() => ({
    uploadFile: uploadFileMock,
    getFile: getFileMock,
  })),
  generateFileKey: jest
    .fn()
    .mockReturnValue("safety-intake/2024/test-file.pdf"),
}));

const mockVerifyTurnstile = jest.fn();
jest.mock("@/lib/security/turnstile", () => ({
  verifyTurnstileToken: (...args: unknown[]) => mockVerifyTurnstile(...args),
}));

jest.mock("@/lib/notifications/n8n-webhook", () => ({
  sendToN8nAsync: jest.fn(),
}));

jest.mock("@/lib/constants/limits", () => ({
  LIMITS: {
    FILE: {
      MAX_SAFETY_INTAKE_SIZE: 25 * 1024 * 1024,
    },
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

// ── Intake submission fixture ─────────────────────────────────────────────────

const sampleRow = {
  id: "intake-123",
  submitter_name: "Field Worker",
  submitter_email: "worker@example.com",
  company_name: "ACME Co",
  category: "field-form",
  notes: "Submitted for review",
  original_filename: "form.pdf",
  file_key: "safety-intake/2024/form.pdf",
  content_type: "application/pdf",
  file_size: 12000,
  status: "pending_review",
  review_notes: null,
  source_ip: "10.0.0.1",
  turnstile_verified: 1,
  created_at: "2024-06-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeFile(
  name = "form.pdf",
  type = "application/pdf",
  sizeBytes = 1000,
): File {
  return new File([new Uint8Array(sizeBytes)], name, { type });
}

function makeIntakeRequest(
  fields: Record<string, string | File | null>,
): NextRequest {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== null) form.append(k, v);
  }
  return new NextRequest("http://localhost/api/safety/intake", {
    method: "POST",
    body: form,
  });
}

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

// ── Module imports ────────────────────────────────────────────────────────────

let POST_intake: (req: NextRequest) => Promise<Response>;
let GET_intake: (req: NextRequest) => Promise<Response>;
let GET_single: (req: NextRequest, ctx: unknown) => Promise<Response>;
let PATCH_single: (req: NextRequest, ctx: unknown) => Promise<Response>;
let GET_file: (req: NextRequest, ctx: unknown) => Promise<Response>;

beforeAll(async () => {
  ({ POST: POST_intake, GET: GET_intake } =
    await import("@/app/api/safety/intake/route"));
  ({ GET: GET_single, PATCH: PATCH_single } =
    await import("@/app/api/safety/intake/[id]/route"));
  ({ GET: GET_file } = await import("@/app/api/safety/intake/[id]/file/route"));
});

// =============================================================================
// POST /api/safety/intake
// =============================================================================

describe("POST /api/safety/intake", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockVerifyTurnstile.mockResolvedValue({ success: true });
    uploadFileMock.mockResolvedValue({
      success: true,
      key: "safety-intake/2024/form.pdf",
    });
    mockInsert.mockResolvedValue("intake-123");
  });

  it("returns 400 when no file is provided", async () => {
    const req = makeIntakeRequest({
      name: "Worker",
      email: "worker@example.com",
      category: "field-form",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when name is missing", async () => {
    const req = makeIntakeRequest({
      file: makeFile(),
      email: "worker@example.com",
      category: "field-form",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/name/i);
  });

  it("returns 400 when email is invalid", async () => {
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "not-an-email",
      category: "field-form",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/email/i);
  });

  it("returns 400 for an invalid category", async () => {
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "worker@example.com",
      category: "unknown-type",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/category/i);
  });

  it("returns 400 when turnstile token is missing", async () => {
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "worker@example.com",
      category: "field-form",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/turnstile/i);
  });

  it("returns 400 for a disallowed MIME type", async () => {
    const req = makeIntakeRequest({
      file: makeFile("photo.gif", "image/gif"),
      name: "Worker",
      email: "worker@example.com",
      category: "field-form",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/invalid file type/i);
  });

  it("returns 400 when file exceeds 25MB limit", async () => {
    const req = makeIntakeRequest({
      file: makeFile("big.pdf", "application/pdf", 26 * 1024 * 1024),
      name: "Worker",
      email: "worker@example.com",
      category: "field-form",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/25mb/i);
  });

  it("returns 400 when turnstile verification fails", async () => {
    mockVerifyTurnstile.mockResolvedValueOnce({
      success: false,
      errorCodes: ["invalid-input-response"],
    });
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "worker@example.com",
      category: "field-form",
      turnstileToken: "bad-tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/turnstile/i);
  });

  it("returns 503 when database is unavailable", async () => {
    mockGetD1.mockReturnValueOnce(null);
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "worker@example.com",
      category: "certificate",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(503);
  });

  it("returns 500 when R2 upload fails", async () => {
    uploadFileMock.mockResolvedValueOnce({
      success: false,
      error: "S3 error",
    });
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "worker@example.com",
      category: "program-update",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(500);
  });

  it("returns 201 on a successful submission", async () => {
    const req = makeIntakeRequest({
      file: makeFile(),
      name: "Worker",
      email: "worker@example.com",
      company: "ACME Co",
      category: "bonding-document",
      notes: "Please review",
      turnstileToken: "tok",
    });
    const res = await POST_intake(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.data.status).toBe("pending_review");
    expect(body.data.category).toBe("bonding-document");
  });
});

// =============================================================================
// GET /api/safety/intake (admin list)
// =============================================================================

describe("GET /api/safety/intake", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockQuery.mockResolvedValue([sampleRow]);
  });

  it("returns 401 without auth header", async () => {
    const req = makeRequest("http://localhost/api/safety/intake");
    const res = await GET_intake(req);
    expect(res.status).toBe(401);
  });

  it("returns 503 when database is unavailable", async () => {
    mockGetD1.mockReturnValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/intake", {
      headers: authedHeaders,
    });
    const res = await GET_intake(req);
    expect(res.status).toBe(503);
  });

  it("returns all submissions for admin", async () => {
    const req = makeRequest("http://localhost/api/safety/intake", {
      headers: authedHeaders,
    });
    const res = await GET_intake(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(1);
  });

  it("passes status filter through to query", async () => {
    const req = makeRequest(
      "http://localhost/api/safety/intake?status=pending_review",
      { headers: authedHeaders },
    );
    const res = await GET_intake(req);
    expect(res.status).toBe(200);
    expect(mockQuery).toHaveBeenCalled();
  });

  it("passes category filter through to query when valid", async () => {
    const req = makeRequest(
      "http://localhost/api/safety/intake?category=field-form",
      { headers: authedHeaders },
    );
    const res = await GET_intake(req);
    expect(res.status).toBe(200);
  });

  it("returns 500 when query throws", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB failure"));
    const req = makeRequest("http://localhost/api/safety/intake", {
      headers: authedHeaders,
    });
    const res = await GET_intake(req);
    expect(res.status).toBe(500);
  });
});

// =============================================================================
// GET /api/safety/intake/[id]
// =============================================================================

describe("GET /api/safety/intake/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockQueryOne.mockResolvedValue(sampleRow);
  });

  it("returns 401 without auth header", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123");
    const res = await GET_single(req, makeContext("intake-123"));
    expect(res.status).toBe(401);
  });

  it("returns 503 when database is unavailable", async () => {
    mockGetD1.mockReturnValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      headers: authedHeaders,
    });
    const res = await GET_single(req, makeContext("intake-123"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when submission is not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/intake/unknown", {
      headers: authedHeaders,
    });
    const res = await GET_single(req, makeContext("unknown"));
    expect(res.status).toBe(404);
  });

  it("returns 200 with submission data when found", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      headers: authedHeaders,
    });
    const res = await GET_single(req, makeContext("intake-123"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe("intake-123");
  });

  it("returns 500 on query exception", async () => {
    mockQueryOne.mockRejectedValueOnce(new Error("DB boom"));
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      headers: authedHeaders,
    });
    const res = await GET_single(req, makeContext("intake-123"));
    expect(res.status).toBe(500);
  });
});

// =============================================================================
// PATCH /api/safety/intake/[id]
// =============================================================================

describe("PATCH /api/safety/intake/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockUpdate.mockResolvedValue(true);
    mockQueryOne.mockResolvedValue({ ...sampleRow, status: "reviewed" });
  });

  it("returns 401 without auth header", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      body: { status: "reviewed" },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid JSON body", async () => {
    const req = new NextRequest(
      "http://localhost/api/safety/intake/intake-123",
      {
        method: "PATCH",
        headers: {
          ...authedHeaders,
          "Content-Type": "application/json",
        },
        body: "this is not json",
      },
    );
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/json/i);
  });

  it("returns 400 for an invalid status value", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "invalid-status" },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/status/i);
  });

  it("returns 400 when no updatable fields are provided", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      headers: authedHeaders,
      body: { unrelated_field: "value" },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(400);
  });

  it("returns 400 when review_notes is not a string", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      headers: authedHeaders,
      body: { review_notes: 42 },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(400);
  });

  it("returns 503 when database is unavailable", async () => {
    mockGetD1.mockReturnValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "reviewed" },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when submission is not found for update", async () => {
    mockUpdate.mockResolvedValueOnce(false);
    const req = makeRequest("http://localhost/api/safety/intake/unknown", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "approved" },
    });
    const res = await PATCH_single(req, makeContext("unknown"));
    expect(res.status).toBe(404);
  });

  it("successfully updates status", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      headers: authedHeaders,
      body: { status: "approved" },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledWith(
      "safety_intake_submissions",
      "intake-123",
      expect.objectContaining({ status: "approved" }),
    );
  });

  it("successfully updates review_notes to null", async () => {
    const req = makeRequest("http://localhost/api/safety/intake/intake-123", {
      method: "PATCH",
      headers: authedHeaders,
      body: { review_notes: null },
    });
    const res = await PATCH_single(req, makeContext("intake-123"));
    expect(res.status).toBe(200);
  });
});

// =============================================================================
// GET /api/safety/intake/[id]/file
// =============================================================================

describe("GET /api/safety/intake/[id]/file", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetD1.mockReturnValue({});
    mockQueryOne.mockResolvedValue({
      file_key: "safety-intake/2024/form.pdf",
      content_type: "application/pdf",
      original_filename: "form.pdf",
    });
    getFileMock.mockResolvedValue({
      success: true,
      data: new Uint8Array([1, 2, 3]),
      contentType: "application/pdf",
    });
  });

  it("returns 401 without auth header", async () => {
    const req = makeRequest(
      "http://localhost/api/safety/intake/intake-123/file",
    );
    const res = await GET_file(req, makeContext("intake-123"));
    expect(res.status).toBe(401);
  });

  it("returns 503 when database is unavailable", async () => {
    mockGetD1.mockReturnValueOnce(null);
    const req = makeRequest(
      "http://localhost/api/safety/intake/intake-123/file",
      { headers: authedHeaders },
    );
    const res = await GET_file(req, makeContext("intake-123"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when submission record not found", async () => {
    mockQueryOne.mockResolvedValueOnce(null);
    const req = makeRequest("http://localhost/api/safety/intake/unknown/file", {
      headers: authedHeaders,
    });
    const res = await GET_file(req, makeContext("unknown"));
    expect(res.status).toBe(404);
  });

  it("returns 503 when R2 bucket is not configured", async () => {
    const { getR2Bucket } = jest.requireMock("@/lib/cloudflare/r2") as {
      getR2Bucket: jest.Mock;
    };
    getR2Bucket.mockReturnValueOnce(null);
    const req = makeRequest(
      "http://localhost/api/safety/intake/intake-123/file",
      { headers: authedHeaders },
    );
    const res = await GET_file(req, makeContext("intake-123"));
    expect(res.status).toBe(503);
  });

  it("returns 404 when file is not found in R2", async () => {
    getFileMock.mockResolvedValueOnce({ success: false });
    const req = makeRequest(
      "http://localhost/api/safety/intake/intake-123/file",
      { headers: authedHeaders },
    );
    const res = await GET_file(req, makeContext("intake-123"));
    expect(res.status).toBe(404);
  });

  it("returns 200 with file stream and appropriate headers", async () => {
    const req = makeRequest(
      "http://localhost/api/safety/intake/intake-123/file",
      { headers: authedHeaders },
    );
    const res = await GET_file(req, makeContext("intake-123"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toMatch(
      /attachment; filename=/i,
    );
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });

  it("returns 500 when an unexpected error occurs", async () => {
    mockQueryOne.mockRejectedValueOnce(new Error("DB exploded"));
    const req = makeRequest(
      "http://localhost/api/safety/intake/intake-123/file",
      { headers: authedHeaders },
    );
    const res = await GET_file(req, makeContext("intake-123"));
    expect(res.status).toBe(500);
  });
});
