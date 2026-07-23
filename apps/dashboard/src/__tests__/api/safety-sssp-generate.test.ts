/**
 * @jest-environment node
 *
 * SSSP Generate API — unit tests
 *
 * Covers:
 *   POST /api/safety/sssp/[jobId]/generate
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

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
const mockQuery = jest.fn();
const mockUpdate = jest.fn();
const mockInsert = jest.fn();

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    queryOne: (...args: unknown[]) => mockQueryOne(...args),
    query: (...args: unknown[]) => mockQuery(...args),
    update: (...args: unknown[]) => mockUpdate(...args),
    insert: (...args: unknown[]) => mockInsert(...args),
  })),
}));

const mockSendToN8nAsync = jest.fn();
jest.mock("@/lib/notifications/n8n-webhook", () => ({
  sendToN8nAsync: (...args: unknown[]) => mockSendToN8nAsync(...args),
}));

let POST: (req: NextRequest, ctx: unknown) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/safety/sssp/[jobId]/generate/route"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetD1Database.mockReturnValue({});

  mockQueryOne.mockImplementation((sql: string, jobId: string) => {
    if (sql.includes("FROM jobs")) {
      return Promise.resolve({
        id: jobId,
        job_number: "2026-100",
        job_name: "School Expansion",
        location: "Kennewick, WA",
        pm_name: "Pat PM",
        super_name: "Sam Super",
      });
    }

    if (sql.includes("FROM sssp")) {
      return Promise.resolve({
        id: "sssp-1",
        job_id: jobId,
        status: "draft",
      });
    }

    return Promise.resolve(null);
  });

  mockQuery.mockResolvedValue([
    {
      id: "file-1",
      sssp_id: null,
      file_key: "sssp/job-1/plan-a.pdf",
      original_filename: "plan-a.pdf",
      content_type: "application/pdf",
    },
  ]);

  mockUpdate.mockResolvedValue(true);
  mockInsert.mockResolvedValue("sssp-new");
  mockSendToN8nAsync.mockResolvedValue({ success: true });
});

function makeContext(jobId: string) {
  return { params: Promise.resolve({ jobId }) };
}

describe("POST /api/safety/sssp/[jobId]/generate", () => {
  it("returns 401 without auth", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/safety/sssp/job-1/generate", {
        method: "POST",
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(401);
  });

  it("returns 503 when DB binding is unavailable", async () => {
    mockGetD1Database.mockReturnValueOnce(null);

    const res = await POST(
      makeRequest("http://localhost/api/safety/sssp/job-1/generate", {
        method: "POST",
        headers: authedHeaders,
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(503);
  });

  it("returns 400 when job does not exist", async () => {
    mockQueryOne.mockImplementation((sql: string) => {
      if (sql.includes("FROM jobs")) {
        return Promise.resolve(null);
      }
      return Promise.resolve(null);
    });

    const res = await POST(
      makeRequest("http://localhost/api/safety/sssp/job-404/generate", {
        method: "POST",
        headers: authedHeaders,
      }),
      makeContext("job-404"),
    );

    expect(res.status).toBe(400);
  });

  it("returns 400 when no source files are uploaded", async () => {
    mockQuery.mockResolvedValueOnce([]);

    const res = await POST(
      makeRequest("http://localhost/api/safety/sssp/job-1/generate", {
        method: "POST",
        headers: authedHeaders,
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(400);
  });

  it("resets existing SSSP to generating and triggers n8n", async () => {
    const res = await POST(
      makeRequest("http://localhost/api/safety/sssp/job-1/generate", {
        method: "POST",
        headers: authedHeaders,
      }),
      makeContext("job-1"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.ssspId).toBe("sssp-1");
    expect(body.data.status).toBe("generating");

    expect(mockUpdate).toHaveBeenCalledWith("sssp", "sssp-1", {
      status: "generating",
      content: null,
      r2_key: null,
      generated_at: null,
      approved_by: null,
      approved_at: null,
    });
    expect(mockSendToN8nAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "sssp-generate",
        data: expect.objectContaining({
          ssspId: "sssp-1",
          jobId: "job-1",
          callbackUrl: "/api/safety/sssp/job-1/result",
        }),
      }),
    );
  });

  it("creates a new SSSP when none exists", async () => {
    mockQueryOne.mockImplementation((sql: string, jobId: string) => {
      if (sql.includes("FROM jobs")) {
        return Promise.resolve({
          id: jobId,
          job_number: "2026-222",
          job_name: "Bridge Rehab",
          location: "Pasco, WA",
          pm_name: "Morgan PM",
          super_name: "Casey Super",
        });
      }
      if (sql.includes("FROM sssp")) {
        return Promise.resolve(null);
      }
      return Promise.resolve(null);
    });
    mockInsert.mockResolvedValueOnce("sssp-created");

    const res = await POST(
      makeRequest("http://localhost/api/safety/sssp/job-2/generate", {
        method: "POST",
        headers: authedHeaders,
      }),
      makeContext("job-2"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.ssspId).toBe("sssp-created");
    expect(mockInsert).toHaveBeenCalledWith("sssp", {
      job_id: "job-2",
      status: "generating",
    });
  });
});
