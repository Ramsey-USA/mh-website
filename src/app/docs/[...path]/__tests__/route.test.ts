/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { GET } from "@/app/docs/[...path]/route";
import { getR2Bucket } from "@/lib/cloudflare/r2";
import { logger } from "@/lib/utils/logger";

jest.mock("@/lib/cloudflare/r2", () => ({
  getR2Bucket: jest.fn(),
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

    const req = new NextRequest("http://localhost/docs/guide.pdf");
    const res = await GET(req, makeContext(["guide.pdf"]));

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

    const req = new NextRequest("http://localhost/docs/missing.pdf");
    const res = await GET(req, makeContext(["missing.pdf"]));

    expect(bucket.get).toHaveBeenCalledWith("docs/missing.pdf");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not found" });
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

    const req = new NextRequest("http://localhost/docs/employee-handbook.pdf");
    const res = await GET(req, makeContext(["employee-handbook.pdf"]));

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toBe(
      'inline; filename="employee-handbook.pdf"',
    );
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(await res.text()).toBe("file-content");
  });

  it("falls back to octet-stream for unknown extensions", async () => {
    const bucket: BucketMock = {
      get: jest.fn().mockResolvedValue({
        body: new ReadableStream({ start: (c) => c.close() }),
      }),
    };
    (getR2Bucket as jest.Mock).mockReturnValue(bucket);

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

    const req = new NextRequest("http://localhost/docs/guide.docx");
    const res = await GET(req, makeContext(["guide.docx"]));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Internal server error" });
    expect(logger.error).toHaveBeenCalled();
  });
});
