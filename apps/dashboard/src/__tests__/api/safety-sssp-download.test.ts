/**
 * @jest-environment node
 *
 * SSSP Download API — unit tests
 *
 * Covers:
 *   GET /api/safety/sssp/[jobId]/download
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

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

const mockGetD1Database = jest.fn().mockReturnValue({});
jest.mock("@/lib/db/env", () => ({
  getD1Database: () => mockGetD1Database(),
}));

const mockQueryOne = jest.fn();
jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    queryOne: (...args: unknown[]) => mockQueryOne(...args),
  })),
}));

const mockGetFile = jest.fn();
const mockGetR2Bucket = jest.fn();

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: (...args: unknown[]) => mockGetR2Bucket(...args),
  R2StorageService: jest.fn().mockImplementation(() => ({
    getFile: (...args: unknown[]) => mockGetFile(...args),
  })),
}));

let GET: (req: NextRequest, ctx: unknown) => Promise<Response>;

beforeAll(async () => {
  ({ GET } = await import("@/app/api/safety/sssp/[jobId]/download/route"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetD1Database.mockReturnValue({});
  mockGetR2Bucket.mockReturnValue({});
  mockQueryOne.mockResolvedValue({
    id: "sssp-1",
    job_id: "job-1",
    status: "ready",
    r2_key: "sssp/job-1/output.md",
    content: "# Fallback content",
  });
  mockGetFile.mockResolvedValue({
    success: true,
    data: "# Generated SSSP",
    contentType: "text/markdown",
  });
});

function makeContext(jobId: string) {
  return { params: Promise.resolve({ jobId }) };
}

describe("GET /api/safety/sssp/[jobId]/download", () => {
  it("returns 401 without auth", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/safety/sssp/job-1/download"),
      makeContext("job-1"),
    );

    expect(res.status).toBe(401);
  });

  it("returns 503 when DB is unavailable", async () => {
    mockGetD1Database.mockReturnValueOnce(null);

    const res = await GET(
      makeRequest("http://localhost/api/safety/sssp/job-1/download", {
        headers: authedHeaders,
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(503);
  });

  it("returns 404 when no ready/approved SSSP exists", async () => {
    mockQueryOne.mockResolvedValueOnce(null);

    const res = await GET(
      makeRequest("http://localhost/api/safety/sssp/job-404/download", {
        headers: authedHeaders,
      }),
      makeContext("job-404"),
    );

    expect(res.status).toBe(404);
  });

  it("returns R2 content when available", async () => {
    const res = await GET(
      makeRequest("http://localhost/api/safety/sssp/job-1/download", {
        headers: authedHeaders,
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/markdown");
    expect(res.headers.get("Content-Disposition")).toContain(
      'filename="sssp-job-1.md"',
    );
    expect(await res.text()).toBe("# Generated SSSP");
  });

  it("falls back to DB inline content when R2 fetch fails", async () => {
    mockGetFile.mockResolvedValueOnce({
      success: false,
      data: null,
      contentType: null,
    });

    const res = await GET(
      makeRequest("http://localhost/api/safety/sssp/job-1/download", {
        headers: authedHeaders,
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("# Fallback content");
  });
});
