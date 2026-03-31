/**
 * @jest-environment node
 *
 * Unit tests for lib/cloudflare/r2.ts
 * Covers R2StorageService (all branches), getR2Bucket, generateFileKey,
 * isSmallEnoughForEmail, and fileToBase64.
 */

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import {
  R2StorageService,
  getR2Bucket,
  generateFileKey,
  isSmallEnoughForEmail,
  fileToBase64,
  type R2Bucket,
} from "../r2";

// ─── Mock bucket factory ──────────────────────────────────────────────────────

function makeBucket(overrides: Partial<R2Bucket> = {}): R2Bucket {
  return {
    put: jest.fn().mockResolvedValue(undefined),
    head: jest.fn().mockResolvedValue({ key: "k", size: 10 }),
    get: jest.fn().mockResolvedValue({
      body: new ReadableStream({
        start(c) {
          c.enqueue(new Uint8Array([1, 2, 3]));
          c.close();
        },
      }),
      httpMetadata: { contentType: "image/png" },
    }),
    delete: jest.fn().mockResolvedValue(undefined),
    list: jest.fn().mockResolvedValue({
      objects: [{ key: "file.png", size: 100, uploaded: new Date() }],
    }),
    ...overrides,
  };
}

// ─── R2StorageService.uploadFile ─────────────────────────────────────────────

describe("R2StorageService.uploadFile", () => {
  it("returns error when bucket is null", async () => {
    const svc = new R2StorageService(null, "test-bucket");
    const result = await svc.uploadFile(new ArrayBuffer(4), "key.bin");
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
  });

  it("uploads a File instance and uses its type as contentType", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "test-bucket");
    const file = new File(["hello"], "test.txt", { type: "text/plain" });
    const result = await svc.uploadFile(file, "uploads/test.txt");
    expect(result.success).toBe(true);
    expect(result.key).toBe("uploads/test.txt");
    expect(result.url).toContain("test.txt");
    expect(bucket.put).toHaveBeenCalled();
  });

  it("uses explicit contentType over File.type", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "test-bucket");
    const file = new File(["data"], "pic.jpg", { type: "image/jpeg" });
    await svc.uploadFile(file, "k.jpg", "image/webp");
    const callArg = (bucket.put as jest.Mock).mock.calls[0];
    expect(callArg[2].httpMetadata.contentType).toBe("image/webp");
  });

  it("uploads an ArrayBuffer directly", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "test-bucket");
    const buf = new ArrayBuffer(8);
    const result = await svc.uploadFile(
      buf,
      "data.bin",
      "application/octet-stream",
    );
    expect(result.success).toBe(true);
    expect(result.size).toBe(8);
  });

  it("uploads a Uint8Array by slicing its buffer", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "test-bucket");
    const u8 = new Uint8Array([10, 20, 30]);
    const result = await svc.uploadFile(
      u8 as unknown as ArrayBuffer,
      "data.bin",
    );
    expect(result.success).toBe(true);
    expect(result.size).toBe(3);
  });

  it("includes customMetadata when provided", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "my-bucket");
    await svc.uploadFile(new ArrayBuffer(4), "key", undefined, {
      userId: "u1",
    });
    const callArg = (bucket.put as jest.Mock).mock.calls[0];
    expect(callArg[2].customMetadata).toEqual({ userId: "u1" });
  });

  it("omits customMetadata when not provided", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "my-bucket");
    await svc.uploadFile(new ArrayBuffer(4), "key");
    const callArg = (bucket.put as jest.Mock).mock.calls[0];
    expect(callArg[2].customMetadata).toBeUndefined();
  });

  it("falls back to application/octet-stream when no contentType", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "my-bucket");
    // File with empty type string
    const file = new File(["x"], "file.bin", { type: "" });
    await svc.uploadFile(file, "file.bin");
    const callArg = (bucket.put as jest.Mock).mock.calls[0];
    expect(callArg[2].httpMetadata.contentType).toBe(
      "application/octet-stream",
    );
  });

  it("returns error on bucket.put rejection", async () => {
    const bucket = makeBucket({
      put: jest.fn().mockRejectedValue(new Error("R2 write failed")),
    });
    const svc = new R2StorageService(bucket, "my-bucket");
    const result = await svc.uploadFile(new ArrayBuffer(4), "key");
    expect(result.success).toBe(false);
    expect(result.error).toBe("R2 write failed");
  });

  it("returns generic error string for non-Error rejections", async () => {
    const bucket = makeBucket({
      put: jest.fn().mockRejectedValue("string error"),
    });
    const svc = new R2StorageService(bucket, "my-bucket");
    const result = await svc.uploadFile(new ArrayBuffer(4), "key");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Upload failed");
  });
});

// ─── R2StorageService.fileExists ─────────────────────────────────────────────

describe("R2StorageService.fileExists", () => {
  it("returns false when bucket is null", async () => {
    const svc = new R2StorageService(null, "b");
    expect(await svc.fileExists("key")).toBe(false);
  });

  it("returns true when head returns non-null", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "b");
    expect(await svc.fileExists("key")).toBe(true);
  });

  it("returns false when head returns null", async () => {
    const bucket = makeBucket({ head: jest.fn().mockResolvedValue(null) });
    const svc = new R2StorageService(bucket, "b");
    expect(await svc.fileExists("missing")).toBe(false);
  });

  it("returns false when head throws", async () => {
    const bucket = makeBucket({
      head: jest.fn().mockRejectedValue(new Error("network error")),
    });
    const svc = new R2StorageService(bucket, "b");
    expect(await svc.fileExists("key")).toBe(false);
  });
});

// ─── R2StorageService.getFile ─────────────────────────────────────────────────

describe("R2StorageService.getFile", () => {
  it("returns error when bucket is null", async () => {
    const svc = new R2StorageService(null, "b");
    const result = await svc.getFile("key");
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
  });

  it("returns error when object is not found", async () => {
    const bucket = makeBucket({ get: jest.fn().mockResolvedValue(null) });
    const svc = new R2StorageService(bucket, "b");
    const result = await svc.getFile("missing");
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not found/i);
  });

  it("returns data with contentType when httpMetadata has it", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "b");
    const result = await svc.getFile("key");
    expect(result.success).toBe(true);
    expect(result.contentType).toBe("image/png");
    expect(result.data).toBeDefined();
  });

  it("returns data without contentType when httpMetadata lacks it", async () => {
    const bucket = makeBucket({
      get: jest.fn().mockResolvedValue({
        body: new ReadableStream({
          start(c) {
            c.enqueue(new Uint8Array([1]));
            c.close();
          },
        }),
        httpMetadata: {},
      }),
    });
    const svc = new R2StorageService(bucket, "b");
    const result = await svc.getFile("key");
    expect(result.success).toBe(true);
    expect(result.contentType).toBeUndefined();
  });

  it("returns error when get throws", async () => {
    const bucket = makeBucket({
      get: jest.fn().mockRejectedValue(new Error("S3 error")),
    });
    const svc = new R2StorageService(bucket, "b");
    const result = await svc.getFile("key");
    expect(result.success).toBe(false);
    expect(result.error).toBe("S3 error");
  });

  it("returns generic error string for non-Error get failures", async () => {
    const bucket = makeBucket({
      get: jest.fn().mockRejectedValue("network timeout"),
    });
    const svc = new R2StorageService(bucket, "b");
    const result = await svc.getFile("key");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Get failed");
  });
});

// ─── R2StorageService.deleteFile ─────────────────────────────────────────────

describe("R2StorageService.deleteFile", () => {
  it("returns false when bucket is null", async () => {
    const svc = new R2StorageService(null, "b");
    expect(await svc.deleteFile("key")).toBe(false);
  });

  it("returns true on successful delete", async () => {
    const svc = new R2StorageService(makeBucket(), "b");
    expect(await svc.deleteFile("key")).toBe(true);
  });

  it("returns false when delete throws", async () => {
    const bucket = makeBucket({
      delete: jest.fn().mockRejectedValue(new Error("delete failed")),
    });
    const svc = new R2StorageService(bucket, "b");
    expect(await svc.deleteFile("key")).toBe(false);
  });
});

// ─── R2StorageService.listFiles ──────────────────────────────────────────────

describe("R2StorageService.listFiles", () => {
  it("returns [] when bucket is null", async () => {
    const svc = new R2StorageService(null, "b");
    expect(await svc.listFiles()).toEqual([]);
  });

  it("returns objects without prefix", async () => {
    const svc = new R2StorageService(makeBucket(), "b");
    const result = await svc.listFiles();
    expect(result).toHaveLength(1);
    expect(result[0]!.key).toBe("file.png");
  });

  it("calls list with prefix when provided", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "b");
    await svc.listFiles("images/", 50);
    expect(bucket.list).toHaveBeenCalledWith({ prefix: "images/", limit: 50 });
  });

  it("calls list without prefix when not provided", async () => {
    const bucket = makeBucket();
    const svc = new R2StorageService(bucket, "b");
    await svc.listFiles(undefined, 20);
    const callArg = (bucket.list as jest.Mock).mock.calls[0][0];
    expect(callArg.prefix).toBeUndefined();
    expect(callArg.limit).toBe(20);
  });

  it("returns [] when list throws", async () => {
    const bucket = makeBucket({
      list: jest.fn().mockRejectedValue(new Error("list failed")),
    });
    const svc = new R2StorageService(bucket, "b");
    expect(await svc.listFiles()).toEqual([]);
  });
});

// ─── getR2Bucket ─────────────────────────────────────────────────────────────

describe("getR2Bucket", () => {
  const { getCloudflareContext } = jest.requireMock(
    "@opennextjs/cloudflare",
  ) as { getCloudflareContext: jest.Mock };

  it("returns the bucket from CF env when available", () => {
    const fakeBucket = makeBucket();
    getCloudflareContext.mockReturnValue({
      env: { RESUMES: fakeBucket },
    });
    const result = getR2Bucket("RESUMES");
    expect(result).toBe(fakeBucket);
  });

  it("returns null when bucket is not in env", () => {
    getCloudflareContext.mockReturnValue({ env: {} });
    const result = getR2Bucket("FILE_ASSETS");
    expect(result).toBeNull();
  });

  it("returns null when getCloudflareContext throws (non-CF context)", () => {
    getCloudflareContext.mockImplementation(() => {
      throw new Error("not in CF context");
    });
    const result = getR2Bucket("RESUMES");
    expect(result).toBeNull();
  });
});

// ─── generateFileKey ─────────────────────────────────────────────────────────

describe("generateFileKey", () => {
  it("generates a key with userId prefix", () => {
    const key = generateFileKey("resumes", "cv.pdf", "user123");
    expect(key).toMatch(/^resumes\/user123\/\d+-cv\.pdf$/);
  });

  it("generates a key without userId", () => {
    const key = generateFileKey("assets", "photo.jpg");
    expect(key).toMatch(/^assets\/\d+-photo\.jpg$/);
  });

  it("sanitizes filename special characters", () => {
    const key = generateFileKey("uploads", "my file (1).pdf");
    expect(key).not.toContain(" ");
    expect(key).not.toContain("(");
  });
});

// ─── isSmallEnoughForEmail ────────────────────────────────────────────────────

describe("isSmallEnoughForEmail", () => {
  const MB2 = 2 * 1024 * 1024;

  it("returns true for files under 2MB", () => {
    expect(isSmallEnoughForEmail(MB2 - 1)).toBe(true);
  });

  it("returns true for exactly 2MB", () => {
    expect(isSmallEnoughForEmail(MB2)).toBe(true);
  });

  it("returns false for files over 2MB", () => {
    expect(isSmallEnoughForEmail(MB2 + 1)).toBe(false);
  });
});

// ─── fileToBase64 ─────────────────────────────────────────────────────────────

describe("fileToBase64", () => {
  it("converts a File to base64", async () => {
    const file = new File(["hello"], "test.txt", { type: "text/plain" });
    const result = await fileToBase64(file);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
    // Decode and verify
    expect(atob(result)).toBe("hello");
  });

  it("converts an ArrayBuffer to base64", async () => {
    const enc = new TextEncoder();
    const buf = enc.encode("world").buffer;
    const result = await fileToBase64(buf);
    expect(atob(result)).toBe("world");
  });

  it("handles empty buffer", async () => {
    const result = await fileToBase64(new ArrayBuffer(0));
    expect(result).toBe("");
  });
});
