/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { GET } from "@/app/docs/[...path]/route";
import { getR2Bucket } from "@/lib/cloudflare/r2";
import {
  verifyRefreshToken,
  verifyToken,
  extractTokenFromHeader,
} from "@/lib/auth/jwt";
import { logger } from "@/lib/utils/logger";

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: jest.fn(),
}));

jest.mock("@/lib/auth/jwt", () => ({
  verifyToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
  extractTokenFromHeader: jest.fn(),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

type BucketMock = {
  get: jest.Mock;
};

const makeContext = (path: string[]) => ({
  params: Promise.resolve({ path }),
});

describe("docs catch-all route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (extractTokenFromHeader as jest.Mock).mockReturnValue(null);
    (verifyToken as jest.Mock).mockResolvedValue(null);
    (verifyRefreshToken as jest.Mock).mockResolvedValue(null);
  });

  it("returns 400 for invalid path segments", async () => {
    const req = new NextRequest("http://localhost/docs/test.pdf");

    const emptyPathRes = await GET(req, makeContext([]));
    expect(emptyPathRes.status).toBe(400);

    const invalidSegmentRes = await GET(req, makeContext(["bad segment.pdf"]));
    expect(invalidSegmentRes.status).toBe(400);
  });

  it("returns 503 when FILE_ASSETS bucket is unavailable", async () => {
    (getR2Bucket as jest.Mock).mockImplementation(() => {
      throw new Error("missing env");
    });

    const req = new NextRequest(
      "http://localhost/docs/safety/safety-manual-contents.pdf",
    );
    const res = await GET(
      req,
      makeContext(["safety", "safety-manual-contents.pdf"]),
    );

    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: "Storage unavailable" });
    expect(logger.warn).toHaveBeenCalledWith(
      "FILE_ASSETS R2 bucket not available",
    );
  });

  it("returns 404 when file does not exist", async () => {
    const bucket: BucketMock = {
      get: jest.fn().mockResolvedValue(null),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);

    const req = new NextRequest(
      "http://localhost/docs/safety/forms/missing.pdf",
    );
    const res = await GET(req, makeContext(["safety", "forms", "missing.pdf"]));

    expect(bucket.get).toHaveBeenCalledWith("docs/safety/forms/missing.pdf");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not found" });
  });

  it("returns 401 for restricted docs when unauthenticated", async () => {
    const req = new NextRequest(
      "http://localhost/docs/safety/safety-manual-complete.pdf",
    );
    const res = await GET(
      req,
      makeContext(["safety", "safety-manual-complete.pdf"]),
    );

    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({
      error: "Authentication required",
    });
  });

  it("allows restricted docs when bearer token resolves to employee role", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("restricted-file"));
        controller.close();
      },
    });
    const bucket: BucketMock = {
      get: jest.fn().mockResolvedValue({ body: stream }),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);
    (extractTokenFromHeader as jest.Mock).mockReturnValue("valid-token");
    (verifyToken as jest.Mock).mockResolvedValue({
      uid: "worker-123",
      role: "worker",
    });

    const req = new NextRequest(
      "http://localhost/docs/safety/safety-manual-complete.pdf",
      {
        headers: { Authorization: "Bearer valid-token" },
      },
    );

    const res = await GET(
      req,
      makeContext(["safety", "safety-manual-complete.pdf"]),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("restricted-file");
  });

  it("streams file and sets response headers for known content types", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("file-content"));
        controller.close();
      },
    });

    const bucket: BucketMock = {
      get: jest.fn().mockResolvedValue({ body: stream }),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);

    const req = new NextRequest(
      "http://localhost/docs/employee/employee-handbook-toc.pdf",
    );
    const res = await GET(
      req,
      makeContext(["employee", "employee-handbook-toc.pdf"]),
    );

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toBe(
      'inline; filename="employee-handbook-toc.pdf"',
    );
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(await res.text()).toBe("file-content");
  });

  it("keeps public-partial docs accessible without auth", async () => {
    const bucket: BucketMock = {
      get: jest.fn().mockResolvedValue({
        body: new ReadableStream({ start: (c) => c.close() }),
      }),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);

    const req = new NextRequest(
      "http://localhost/docs/safety/safety-manual-contents.pdf",
    );
    const res = await GET(
      req,
      makeContext(["safety", "safety-manual-contents.pdf"]),
    );

    expect(res.status).toBe(200);
  });

  it("falls back to octet-stream for unknown extensions", async () => {
    const bucket: BucketMock = {
      get: jest.fn().mockResolvedValue({
        body: new ReadableStream({ start: (c) => c.close() }),
      }),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);
    (extractTokenFromHeader as jest.Mock).mockReturnValue("valid-token");
    (verifyToken as jest.Mock).mockResolvedValue({
      uid: "worker-123",
      role: "worker",
    });

    const req = new NextRequest("http://localhost/docs/archive.bin");
    const res = await GET(req, makeContext(["archive.bin"]));

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/octet-stream");
  });

  it("returns 500 when storage lookup throws", async () => {
    const bucket: BucketMock = {
      get: jest.fn().mockRejectedValue(new Error("r2 read failed")),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);
    (extractTokenFromHeader as jest.Mock).mockReturnValue("valid-token");
    (verifyToken as jest.Mock).mockResolvedValue({
      uid: "worker-123",
      role: "worker",
    });

    const req = new NextRequest("http://localhost/docs/guide.docx");
    const res = await GET(req, makeContext(["guide.docx"]));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Internal server error" });
    expect(logger.error).toHaveBeenCalled();
  });
});
