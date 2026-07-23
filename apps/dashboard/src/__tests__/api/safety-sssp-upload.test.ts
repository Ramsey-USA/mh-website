/**
 * @jest-environment node
 *
 * SSSP Upload API — unit tests
 *
 * Covers:
 *   POST /api/safety/sssp/[jobId]/upload
 */

import { NextRequest } from "next/server";

jest.mock("@/lib/auth/middleware", () => {
  const { makeRequireRoleImpl } = require("../helpers/api-test-utils");
  return { requireRole: jest.fn(makeRequireRoleImpl) };
});

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
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

const mockGetD1Database = jest.fn().mockReturnValue({});
jest.mock("@/lib/db/env", () => ({
  getD1Database: () => mockGetD1Database(),
}));

const mockQueryOne = jest.fn();
const mockInsert = jest.fn();

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    queryOne: (...args: unknown[]) => mockQueryOne(...args),
    insert: (...args: unknown[]) => mockInsert(...args),
  })),
}));

const mockGenerateFileKey = jest.fn();
const mockGetR2Bucket = jest.fn();
const mockUploadFile = jest.fn();

jest.mock("@/lib/cloudflare/r2", () => ({
  generateFileKey: (...args: unknown[]) => mockGenerateFileKey(...args),
  getR2Bucket: (...args: unknown[]) => mockGetR2Bucket(...args),
  R2StorageService: jest.fn().mockImplementation(() => ({
    uploadFile: (...args: unknown[]) => mockUploadFile(...args),
  })),
}));

let POST: (req: NextRequest, ctx: unknown) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/safety/sssp/[jobId]/upload/route"));
});

beforeEach(() => {
  jest.clearAllMocks();

  mockGetD1Database.mockReturnValue({});
  mockQueryOne.mockResolvedValue({ id: "job-1" });
  mockInsert.mockResolvedValue("file-1");
  mockGetR2Bucket.mockReturnValue({});
  mockGenerateFileKey.mockReturnValue("sssp-plans/job-1/plan.pdf");
  mockUploadFile.mockResolvedValue({ success: true });
});

function makeContext(jobId: string) {
  return { params: Promise.resolve({ jobId }) };
}

function makeFormRequest(file?: File, extraHeaders?: Record<string, string>) {
  const form = new FormData();
  if (file) {
    form.set("file", file);
  }

  return new NextRequest("http://localhost/api/safety/sssp/job-1/upload", {
    method: "POST",
    headers: {
      Authorization: "Bearer valid-token",
      ...(extraHeaders ?? {}),
    },
    body: form,
  });
}

describe("POST /api/safety/sssp/[jobId]/upload", () => {
  it("returns 401 when unauthenticated", async () => {
    const form = new FormData();
    form.set(
      "file",
      new File([new Uint8Array([1])], "plan.pdf", {
        type: "application/pdf",
      }),
    );

    const req = new NextRequest(
      "http://localhost/api/safety/sssp/job-1/upload",
      {
        method: "POST",
        body: form,
      },
    );

    const res = await POST(req, makeContext("job-1"));
    expect(res.status).toBe(401);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1Database.mockReturnValueOnce(null);

    const res = await POST(
      makeFormRequest(
        new File([new Uint8Array([1])], "plan.pdf", {
          type: "application/pdf",
        }),
      ),
      makeContext("job-1"),
    );

    expect(res.status).toBe(503);
  });

  it("returns 400 when job does not exist", async () => {
    mockQueryOne.mockResolvedValueOnce(null);

    const res = await POST(
      makeFormRequest(
        new File([new Uint8Array([1])], "plan.pdf", {
          type: "application/pdf",
        }),
      ),
      makeContext("job-missing"),
    );

    expect(res.status).toBe(400);
  });

  it("returns 400 when file is missing", async () => {
    const req = makeFormRequest();
    const res = await POST(req, makeContext("job-1"));

    expect(res.status).toBe(400);
  });

  it("returns 400 for unsupported file type", async () => {
    const req = makeFormRequest(
      new File([new Uint8Array([1])], "notes.txt", {
        type: "text/plain",
      }),
    );

    const res = await POST(req, makeContext("job-1"));
    expect(res.status).toBe(400);
  });

  it("returns 503 when R2 bucket is not configured", async () => {
    mockGetR2Bucket.mockReturnValueOnce(null);

    const req = makeFormRequest(
      new File([new Uint8Array([1])], "plan.pdf", {
        type: "application/pdf",
      }),
    );

    const res = await POST(req, makeContext("job-1"));
    expect(res.status).toBe(503);
  });

  it("returns 500 when R2 upload fails", async () => {
    mockUploadFile.mockResolvedValueOnce({
      success: false,
      error: "upload failed",
    });

    const req = makeFormRequest(
      new File([new Uint8Array([1, 2])], "plan.pdf", {
        type: "application/pdf",
      }),
    );

    const res = await POST(req, makeContext("job-1"));
    expect(res.status).toBe(500);
  });

  it("uploads successfully and records metadata", async () => {
    const req = makeFormRequest(
      new File([new Uint8Array([1, 2, 3])], "unsafe/../plan?.pdf", {
        type: "application/pdf",
      }),
    );

    const res = await POST(req, makeContext("job-1"));

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.id).toBe("file-1");
    expect(body.data.job_id).toBe("job-1");
    expect(body.data.file_key).toBe("sssp-plans/job-1/plan.pdf");

    expect(mockGenerateFileKey).toHaveBeenCalledWith(
      "sssp-plans",
      expect.any(String),
      "job-1",
    );
    expect(mockUploadFile).toHaveBeenCalledTimes(1);
    expect(mockInsert).toHaveBeenCalledWith(
      "sssp_source_files",
      expect.objectContaining({
        job_id: "job-1",
        sssp_id: null,
        file_key: "sssp-plans/job-1/plan.pdf",
      }),
    );
  });
});
