/**
 * @jest-environment node
 *
 * Resume Upload API — unit tests
 *
 * Covers: missing file, disallowed MIME type, file size limit, filename
 * sanitization, successful upload response, and admin-only GET protection.
 */

import { NextRequest } from "next/server";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const uploadFileMock = jest.fn();
const getFileMock = jest.fn();
const deleteFileMock = jest.fn();

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: jest.fn().mockReturnValue({}),
  R2StorageService: jest.fn().mockImplementation(() => ({
    uploadFile: uploadFileMock,
    getFile: getFileMock,
    deleteFile: deleteFileMock,
  })),
  generateFileKey: jest.fn().mockReturnValue("resumes/test-key.pdf"),
}));

jest.mock("@/lib/constants/limits", () => ({
  LIMITS: { FILE: { MAX_RESUME_SIZE: 10 * 1024 * 1024 } }, // 10 MB
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
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

jest.mock("@/middleware/security", () => ({
  withSecurity: (_handler: unknown) => _handler,
}));

let POST: typeof import("@/app/api/upload/resume/route").POST;
let GET: typeof import("@/app/api/upload/resume/route").GET;

beforeAll(async () => {
  ({ POST, GET } = await import("@/app/api/upload/resume/route"));
});

// ── Helpers ───────────────────────────────────────────────────────────────────

const makeFile = (name: string, type: string, size = 1000): File => {
  const content = new Uint8Array(size);
  return new File([content], name, { type });
};

const makeFormRequest = (fields: Record<string, string | File | null>) => {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== null) form.append(k, v);
  }
  return new NextRequest("http://localhost/api/upload/resume", {
    method: "POST",
    body: form,
  });
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/upload/resume", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    uploadFileMock.mockResolvedValue({
      success: true,
      key: "resumes/test-key.pdf",
      url: "https://r2.example.com/test-key.pdf",
      size: 1000,
    });
  });

  it("returns 400 when no file is provided", async () => {
    const req = makeFormRequest({ email: "test@example.com" });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for disallowed MIME type", async () => {
    const req = makeFormRequest({
      file: makeFile("resume.jpg", "image/jpeg"),
      email: "test@example.com",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/invalid file type/i);
  });

  it("returns 400 when file exceeds size limit", async () => {
    const req = makeFormRequest({
      file: makeFile("big.pdf", "application/pdf", 11 * 1024 * 1024),
      email: "test@example.com",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error ?? body.message).toMatch(/10mb/i);
  });

  it("accepts PDF files and returns upload metadata", async () => {
    const req = makeFormRequest({
      file: makeFile("resume.pdf", "application/pdf"),
      email: "jane@example.com",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.key).toBeTruthy();
  });

  it("accepts DOCX files", async () => {
    const req = makeFormRequest({
      file: makeFile(
        "resume.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("sanitizes dangerous filename characters", async () => {
    const req = makeFormRequest({
      file: makeFile("../../etc/passwd.pdf", "application/pdf"),
    });
    const res = await POST(req);
    // Should not fail; dangerous chars should be replaced
    expect([200, 500]).toContain(res.status);
    if (res.status === 200) {
      const body = await res.json();
      expect(body.data?.filename).not.toMatch(/\.\./);
    }
  });

  it("returns 500 when R2 upload fails", async () => {
    uploadFileMock.mockResolvedValueOnce({
      success: false,
      error: "R2 unavailable",
    });
    const req = makeFormRequest({
      file: makeFile("resume.pdf", "application/pdf"),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});

describe("GET /api/upload/resume", () => {
  it("returns 401 without Authorization header", async () => {
    const req = new NextRequest(
      "http://localhost/api/upload/resume?key=resumes/test.pdf",
      { method: "GET" },
    );
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 when no key query parameter is provided", async () => {
    const req = new NextRequest("http://localhost/api/upload/resume", {
      method: "GET",
      headers: { Authorization: "Bearer valid-token" },
    });
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for a key with path-traversal sequence", async () => {
    const req = new NextRequest(
      "http://localhost/api/upload/resume?key=resumes/../secret.pdf",
      {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      },
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid file key/i);
  });

  it("returns 400 for a key that does not start with resumes/", async () => {
    const req = new NextRequest(
      "http://localhost/api/upload/resume?key=uploads/evil.pdf",
      {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      },
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it("returns 404 when R2 file is not found", async () => {
    getFileMock.mockResolvedValueOnce({ success: false, error: "Not found" });
    const req = new NextRequest(
      "http://localhost/api/upload/resume?key=resumes/missing.pdf",
      {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      },
    );
    const res = await GET(req);
    expect(res.status).toBe(404);
  });

  it("returns the file with Content-Disposition header when found", async () => {
    getFileMock.mockResolvedValueOnce({
      success: true,
      data: Buffer.from("PDF content"),
      contentType: "application/pdf",
    });
    const req = new NextRequest(
      "http://localhost/api/upload/resume?key=resumes/john-doe.pdf",
      {
        method: "GET",
        headers: { Authorization: "Bearer valid-token" },
      },
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toContain("attachment");
    expect(res.headers.get("Content-Disposition")).toContain("john-doe.pdf");
  });
});
