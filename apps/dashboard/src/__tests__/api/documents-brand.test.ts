/**
 * @jest-environment node
 *
 * Document Branding API — unit tests
 *
 * Covers:
 *   POST /api/documents/brand — validates upload + returns branded PDF/DOCX
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

const mockBrandPdfDocument = jest.fn();
const mockBrandDocxDocument = jest.fn();
const mockGetBrandedFilename = jest.fn((name: string) => `branded-${name}`);

jest.mock("@/lib/dashboard/document-branding", () => ({
  brandPdfDocument: (...args: unknown[]) => mockBrandPdfDocument(...args),
  brandDocxDocument: (...args: unknown[]) => mockBrandDocxDocument(...args),
  getBrandedFilename: (name: string) => mockGetBrandedFilename(name),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

let POST: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/documents/brand/route"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockBrandPdfDocument.mockResolvedValue(new Uint8Array([9, 8, 7]));
  mockBrandDocxDocument.mockResolvedValue(new Uint8Array([7, 8, 9]));
});

async function makeMultipartRequest(
  file?: File,
  extraHeaders?: Record<string, string>,
): Promise<NextRequest> {
  const form = new FormData();
  if (file) {
    form.set("file", file);
  }

  return new NextRequest("http://localhost/api/documents/brand", {
    method: "POST",
    headers: {
      Authorization: "Bearer valid-token",
      ...(extraHeaders ?? {}),
    },
    body: form,
  });
}

describe("POST /api/documents/brand", () => {
  it("returns 401 when unauthenticated", async () => {
    const form = new FormData();
    form.set(
      "file",
      new File([new Uint8Array([1])], "sample.pdf", {
        type: "application/pdf",
      }),
    );

    const req = new NextRequest("http://localhost/api/documents/brand", {
      method: "POST",
      body: form,
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 when file field is missing", async () => {
    const req = await makeMultipartRequest();
    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it("returns 400 for unsupported file type", async () => {
    const req = await makeMultipartRequest(
      new File([new Uint8Array([1, 2, 3])], "notes.txt", {
        type: "text/plain",
      }),
    );

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("brands and returns PDF uploads", async () => {
    const req = await makeMultipartRequest(
      new File([new Uint8Array([1, 2, 3])], "proposal.pdf", {
        type: "application/pdf",
      }),
    );

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toContain(
      'filename="branded-proposal.pdf"',
    );
    expect(mockBrandPdfDocument).toHaveBeenCalledTimes(1);
    expect(mockBrandDocxDocument).not.toHaveBeenCalled();
  });

  it("brands and returns DOCX uploads", async () => {
    const req = await makeMultipartRequest(
      new File([new Uint8Array([4, 5, 6])], "scope.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }),
    );

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    expect(res.headers.get("Content-Disposition")).toContain(
      'filename="branded-scope.docx"',
    );
    expect(mockBrandDocxDocument).toHaveBeenCalledTimes(1);
    expect(mockBrandPdfDocument).not.toHaveBeenCalled();
  });

  it("returns 500 when branding processing throws", async () => {
    mockBrandPdfDocument.mockRejectedValueOnce(new Error("processing failure"));

    const req = await makeMultipartRequest(
      new File([new Uint8Array([1])], "broken.pdf", {
        type: "application/pdf",
      }),
    );

    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
