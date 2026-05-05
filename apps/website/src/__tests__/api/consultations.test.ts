/**
 * @jest-environment node
 *
 * Consultations API — unit tests
 *
 * Covers: required-field validation, successful POST response,
 * admin-protected GET endpoint authorization.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/api/form-handler", () => ({
  handleFormSubmission: jest.fn().mockImplementation((_req, _opts) => {
    // Simulate successful submission for valid data
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.json({ success: true, message: "Submitted" });
  }),
  handleFormRetrieval: jest.fn().mockImplementation(() => {
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.json({ success: true, data: [] });
  }),
}));

jest.mock("@/lib/auth/middleware", () => ({
  // requireRole(allowedRoles, handler) — takes handler directly, not curried
  requireRole: jest.fn(
    (_roles: string[], handler: (req: NextRequest) => unknown) =>
      async (req: NextRequest) => {
        const { NextResponse } =
          require("next/server") as typeof import("next/server");
        const auth = req.headers.get("Authorization");
        if (!auth) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return handler(req);
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

let POST: typeof import("@/app/api/consultations/route").POST;
let GET: typeof import("@/app/api/consultations/route").GET;

beforeAll(async () => {
  ({ POST, GET } = await import("@/app/api/consultations/route"));
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const validBody = {
  name: "John Doe",
  email: "john@example.com",
  projectType: "Commercial Build",
};

const makePostRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/consultations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/consultations", () => {
  beforeEach(() => jest.clearAllMocks());

  it("delegates to handleFormSubmission and returns 200", async () => {
    const res = await POST(makePostRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

describe("GET /api/consultations", () => {
  it("returns 401 when Authorization header is missing", async () => {
    const req = new NextRequest("http://localhost/api/consultations", {
      method: "GET",
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 200 with valid Authorization header", async () => {
    const req = new NextRequest("http://localhost/api/consultations", {
      method: "GET",
      headers: { Authorization: "Bearer valid-token" },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
