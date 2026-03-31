/**
 * @jest-environment node
 *
 * Job Applications API — unit tests
 *
 * Covers: JSON parse error, resumeKey validation (missing R2 file),
 * successful submission delegation.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/api/form-handler", () => ({
  handleFormSubmission: jest.fn().mockImplementation(() => {
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.json({ success: true });
  }),
  handleFormRetrieval: jest.fn().mockImplementation(() => {
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.json({ success: true, data: [] });
  }),
}));

const fileExistsMock = jest.fn();

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: jest.fn().mockReturnValue(null),
  R2StorageService: jest.fn().mockImplementation(() => ({
    fileExists: fileExistsMock,
  })),
}));

jest.mock("@/lib/auth/middleware", () => ({
  requireRole: jest.fn(
    (_roles: string[], handler: (req: NextRequest) => unknown) =>
      async (req: NextRequest) => {
        const { NextResponse } =
          require("next/server") as typeof import("next/server");
        if (!req.headers.get("Authorization"))
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        return handler(req);
      },
  ),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {} },
}));

let POST: typeof import("@/app/api/job-applications/route").POST;
let GET: typeof import("@/app/api/job-applications/route").GET;

beforeAll(async () => {
  ({ POST, GET } = await import("@/app/api/job-applications/route"));
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const validBody = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  phone: "509-308-6489",
  position: "Project Manager",
  experience: "5 years",
};

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/job-applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/job-applications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fileExistsMock.mockResolvedValue(true);
  });

  it("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost/api/job-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when resumeKey is provided but file does not exist in R2", async () => {
    fileExistsMock.mockResolvedValueOnce(false);
    const res = await POST(
      makeRequest({ ...validBody, resumeKey: "resumes/missing.pdf" }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/resume file not found/i);
  });

  it("delegates to handleFormSubmission when no resumeKey is provided", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("delegates to handleFormSubmission when resumeKey exists in R2", async () => {
    fileExistsMock.mockResolvedValueOnce(true);
    const res = await POST(
      makeRequest({ ...validBody, resumeKey: "resumes/valid.pdf" }),
    );
    expect(res.status).toBe(200);
  });
});

describe("GET /api/job-applications", () => {
  it("returns 401 without Authorization header", async () => {
    const req = new NextRequest("http://localhost/api/job-applications", {
      method: "GET",
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 200 with valid Authorization header", async () => {
    const req = new NextRequest("http://localhost/api/job-applications", {
      method: "GET",
      headers: { Authorization: "Bearer admin-token" },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
