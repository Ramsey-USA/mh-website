/**
 * @jest-environment node
 *
 * file-handler and protocol-handler route tests — full branch coverage.
 */

import { NextRequest } from "next/server";

jest.mock("@/lib/utils/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeFormData(files: File[]): FormData {
  const fd = new FormData();
  files.forEach((f) => fd.append("files", f));
  return fd;
}

function postRequest(url: string, body: FormData | null = null): NextRequest {
  return new NextRequest(url, {
    method: "POST",
    body,
  });
}

function getRequest(url: string): NextRequest {
  return new NextRequest(url, { method: "GET" });
}

// ─── /app/file-handler ────────────────────────────────────────────────────────

describe("file-handler route", () => {
  let POST: typeof import("@/app/file-handler/route").POST;
  let GET: typeof import("@/app/file-handler/route").GET;

  beforeAll(async () => {
    ({ POST, GET } = await import("@/app/file-handler/route"));
  });

  it("GET redirects to /contact (302)", async () => {
    const res = await GET(getRequest("http://localhost/file-handler"));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("/contact");
  });

  it("POST with no files returns 400", async () => {
    const fd = new FormData(); // no files appended
    const res = await POST(postRequest("http://localhost/file-handler", fd));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/no files/i);
  });

  it("POST with image file redirects to /contact?action=share-photos (303)", async () => {
    const imageFile = new File(["data"], "photo.png", { type: "image/png" });
    const fd = makeFormData([imageFile]);
    const res = await POST(postRequest("http://localhost/file-handler", fd));
    expect(res.status).toBe(303);
    expect(res.headers.get("Location")).toContain("action=share-photos");
  });

  it("POST with PDF file redirects to /contact?action=share-documents (303)", async () => {
    const pdfFile = new File(["data"], "doc.pdf", { type: "application/pdf" });
    const fd = makeFormData([pdfFile]);
    const res = await POST(postRequest("http://localhost/file-handler", fd));
    expect(res.status).toBe(303);
    expect(res.headers.get("Location")).toContain("action=share-documents");
  });

  it("POST with unknown file type redirects to /contact (303)", async () => {
    const miscFile = new File(["data"], "data.csv", { type: "text/csv" });
    const fd = makeFormData([miscFile]);
    const res = await POST(postRequest("http://localhost/file-handler", fd));
    expect(res.status).toBe(303);
    const loc = res.headers.get("Location") ?? "";
    expect(loc).toContain("/contact");
    expect(loc).not.toContain("action=");
  });

  it("POST handles mixed image + pdf (first match wins = image)", async () => {
    const imageFile = new File(["data"], "photo.jpg", { type: "image/jpeg" });
    const pdfFile = new File(["data"], "doc.pdf", { type: "application/pdf" });
    const fd = makeFormData([imageFile, pdfFile]);
    const res = await POST(postRequest("http://localhost/file-handler", fd));
    expect(res.status).toBe(303);
    expect(res.headers.get("Location")).toContain("share-photos");
  });

  it("POST returns 500 on processing error", async () => {
    // Pass a malformed request that will throw when formData() is called
    const badReq = {
      formData: () => {
        throw new Error("boom");
      },
      url: "http://localhost/file-handler",
    } as unknown as NextRequest;

    const res = await POST(badReq);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/failed to process/i);
  });

  it("POST with non-File formData entries (strings) are filtered out", async () => {
    const fd = new FormData();
    fd.append("files", "not-a-file");
    const res = await POST(postRequest("http://localhost/file-handler", fd));
    // string entry → neither image nor PDF → redirect to /contact
    expect(res.status).toBe(303);
    const loc = res.headers.get("Location") ?? "";
    expect(loc).toContain("/contact");
  });
});

// ─── /app/protocol-handler ────────────────────────────────────────────────────

describe("protocol-handler route", () => {
  let GET: typeof import("@/app/protocol-handler/route").GET;

  beforeAll(async () => {
    ({ GET } = await import("@/app/protocol-handler/route"));
  });

  it("returns 400 when url param is missing", async () => {
    const res = await GET(getRequest("http://localhost/protocol-handler"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/missing url/i);
  });

  it("contact action redirects to /contact", async () => {
    const url =
      "http://localhost/protocol-handler?url=web%2Bmhconstruction://contact";
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("/contact");
  });

  it("project action with id redirects to /projects/:id", async () => {
    const encoded = encodeURIComponent(
      "web+mhconstruction://project?id=abc123",
    );
    const url = `http://localhost/protocol-handler?url=${encoded}`;
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("/projects/abc123");
  });

  it("project action without id redirects to /projects", async () => {
    const encoded = encodeURIComponent("web+mhconstruction://project");
    const url = `http://localhost/protocol-handler?url=${encoded}`;
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("/projects");
    expect(res.headers.get("Location")).not.toContain("/projects/");
  });

  it("estimate action redirects to /contact?type=estimate", async () => {
    const encoded = encodeURIComponent("web+mhconstruction://estimate");
    const url = `http://localhost/protocol-handler?url=${encoded}`;
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("type=estimate");
  });

  it("booking action redirects to /contact?type=consultation", async () => {
    const encoded = encodeURIComponent("web+mhconstruction://booking");
    const url = `http://localhost/protocol-handler?url=${encoded}`;
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("type=consultation");
  });

  it("unknown action redirects to /", async () => {
    const encoded = encodeURIComponent("web+mhconstruction://unknown-action");
    const url = `http://localhost/protocol-handler?url=${encoded}`;
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    // Redirects to root
    const loc = res.headers.get("Location") ?? "";
    expect(loc).toMatch(/\/$/);
  });

  it("invalid URL param redirects to / with 302 (parse error path)", async () => {
    // Pass a URL that is not a valid URL (will throw in new URL())
    const url = `http://localhost/protocol-handler?url=not-a-valid-url:::`;
    const res = await GET(getRequest(url));
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toContain("/");
  });
});
