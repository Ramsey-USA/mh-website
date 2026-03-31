/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from "next/server";
import { SecurityManager, type SecurityConfig } from "../security-manager";

function makeConfig(overrides?: {
  [K in keyof SecurityConfig]?: Partial<SecurityConfig[K]>;
}): SecurityConfig {
  return {
    cors: {
      origin: ["https://www.mhc-gc.com"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
      credentials: true,
      maxAge: 86400,
      ...overrides?.cors,
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'"],
          "script-src": ["'self'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      xssFilter: true,
      noSniff: true,
      frameguard: { action: "deny" },
      referrerPolicy: "strict-origin-when-cross-origin",
      ...overrides?.helmet,
    },
    csrf: {
      tokenName: "csrfToken",
      cookieName: "_csrf",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 3600,
      ...overrides?.csrf,
    },
    validation: {
      maxFieldLength: 10,
      maxFileSize: 1024,
      allowedMimeTypes: ["text/plain", "application/pdf"],
      sanitizeHtml: true,
      validateEmails: true,
      ...overrides?.validation,
    },
    audit: {
      logFailedAttempts: true,
      logSuccessfulRequests: false,
      sensitiveDataMasking: true,
      retentionDays: 90,
      ...overrides?.audit,
    },
  };
}

function makeRequest(
  path: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
  },
) {
  const init: Record<string, unknown> = { method: options?.method ?? "GET" };
  if (options?.headers) init["headers"] = options.headers;
  return new NextRequest(`http://localhost${path}`, init);
}

describe("SecurityManager", () => {
  const originalEnv = process.env.NODE_ENV;
  const originalSiteUrl = process.env["NEXT_PUBLIC_SITE_URL"];

  afterEach(() => {
    (process.env as Record<string, string | undefined>)["NODE_ENV"] =
      originalEnv;
    process.env["NEXT_PUBLIC_SITE_URL"] = originalSiteUrl;
  });

  it("allows GET requests and returns a generated csrf token", async () => {
    const manager = new SecurityManager(makeConfig());

    const result = await manager.processRequest(makeRequest("/contact"));

    expect(result.allowed).toBe(true);
    expect(result.csrfToken).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects state-changing requests without a matching csrf token", async () => {
    const manager = new SecurityManager(makeConfig());

    const result = await manager.processRequest(
      makeRequest("/api/contact", { method: "POST" }),
    );

    expect(result.allowed).toBe(false);
    expect(result.response?.status).toBe(403);
  });

  it("allows state-changing requests with matching csrf cookie and header", async () => {
    const manager = new SecurityManager(makeConfig());
    const token = "csrf-token-123";

    const result = await manager.processRequest(
      makeRequest("/api/contact", {
        method: "POST",
        headers: {
          "x-forwarded-for": "10.0.0.2",
          Cookie: `_csrf=${token}`,
          "X-CSRF-Token": token,
        },
      }),
    );

    expect(result.allowed).toBe(true);
  });

  it("validates csrf token supplied via the lowercase 'csrf-token' header", () => {
    const manager = new SecurityManager(makeConfig());
    const token = "csrf-token-abc";

    // processRequest always reads X-CSRF-Token first, so to exercise the
    // x-csrf-token / csrf-token fallbacks in extractTokenFromHeader (lines
    // 377-378) we call validateToken on the internal csrfProtection directly.
    const csrfProtection = (manager as any).csrfProtection;

    const request = makeRequest("/api/contact", {
      method: "POST",
      headers: {
        "x-forwarded-for": "10.0.0.3",
        Cookie: `_csrf=${token}`,
        "csrf-token": token, // no X-CSRF-Token → forces evaluation of lines 377-378
      },
    });

    const result = csrfProtection.validateToken(request, token);
    expect(result).toBe(true);
  });

  it("sanitizes text and email fields during input validation", () => {
    const manager = new SecurityManager(
      makeConfig({ validation: { maxFieldLength: 200 } }),
    );

    const result = manager.validateInput({
      email: "TEST@EXAMPLE.COM",
      message: "<script>SELECT * FROM users</script>",
      count: 2,
    });

    expect(result.isValid).toBe(true);
    expect(result.sanitizedData["email"]).toBe("test@example.com");
    expect(String(result.sanitizedData["message"])).toContain("&lt;");
    expect(String(result.sanitizedData["message"])).not.toContain("SELECT");
    expect(result.sanitizedData["count"]).toBe(2);
  });

  it("reports validation errors for long fields and invalid emails", () => {
    const manager = new SecurityManager(makeConfig());

    const result = manager.validateInput({
      email: "not-an-email",
      message: "x".repeat(20),
    });

    expect(result.isValid).toBe(false);
    expect(result.errors["email"]).toContain("Invalid email format");
    expect(result.errors["message"]?.[0]).toMatch(/exceeds maximum length/i);
  });

  it("applies security headers, csrf cookie, and production HSTS", () => {
    (process.env as Record<string, string | undefined>)["NODE_ENV"] =
      "production";
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://www.mhc-gc.com";

    const manager = new SecurityManager(makeConfig());
    const response = manager.applyResponseSecurity(
      NextResponse.json({ ok: true }),
      "csrf-cookie-token",
    );

    expect(response.headers.get("Content-Security-Policy")).toContain(
      "default-src 'self'",
    );
    expect(response.headers.get("Strict-Transport-Security")).toContain(
      "max-age=31536000",
    );
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("Set-Cookie")).toContain(
      "_csrf=csrf-cookie-token",
    );
  });

  it("returns the provided config from getConfig", () => {
    const config = makeConfig({ validation: { maxFieldLength: 25 } });
    const manager = new SecurityManager(config);

    expect(manager.getConfig().validation.maxFieldLength).toBe(25);
  });

  it("skips email format validation when validateEmails is false", () => {
    const manager = new SecurityManager(
      makeConfig({
        validation: { validateEmails: false, maxFieldLength: 200 },
      }),
    );

    const result = manager.validateInput({ email: "clearly-not-an-email" });

    expect(result.isValid).toBe(true);
    expect(result.sanitizedData["email"]).toBe("clearly-not-an-email");
    expect(result.errors).not.toHaveProperty("email");
  });

  it("validates a file via the internal InputValidator (valid file)", () => {
    const manager = new SecurityManager(
      makeConfig({
        validation: {
          maxFileSize: 1024 * 1024,
          allowedMimeTypes: ["application/pdf", "text/plain"],
        },
      }),
    );
    const file = new File(["pdf content"], "document.pdf", {
      type: "application/pdf",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (manager as any).inputValidator.validateFile(file) as {
      isValid: boolean;
      errors: string[];
    };
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects a file that exceeds maxFileSize", () => {
    const manager = new SecurityManager(
      makeConfig({
        validation: { maxFileSize: 10, allowedMimeTypes: ["text/plain"] },
      }),
    );
    const file = new File(["x".repeat(100)], "big.txt", { type: "text/plain" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (manager as any).inputValidator.validateFile(file) as {
      isValid: boolean;
      errors: string[];
    };
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(/File size exceeds/);
  });

  it("rejects a file with a disallowed MIME type", () => {
    const manager = new SecurityManager(
      makeConfig({
        validation: {
          maxFileSize: 1024 * 1024,
          allowedMimeTypes: ["application/pdf"],
        },
      }),
    );
    const file = new File(["content"], "script.exe", {
      type: "application/octet-stream",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (manager as any).inputValidator.validateFile(file) as {
      isValid: boolean;
      errors: string[];
    };
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(/not allowed/);
  });
});
