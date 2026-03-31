/**
 * @jest-environment node
 *
 * Tests for src/lib/security/security-manager.ts
 */

import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_SECURITY_CONFIG,
  CSRFProtection,
  InputValidator,
  SecurityHeaders,
  SecurityManager,
  securityManager,
} from "@/lib/security/security-manager";

// ---------------------------------------------------------------------------
// SecurityConfig / DEFAULT_SECURITY_CONFIG
// ---------------------------------------------------------------------------
describe("DEFAULT_SECURITY_CONFIG", () => {
  it("has a cors section", () => {
    expect(DEFAULT_SECURITY_CONFIG.cors).toBeDefined();
  });

  it("has a helmet section", () => {
    expect(DEFAULT_SECURITY_CONFIG.helmet).toBeDefined();
  });

  it("has a csrf section", () => {
    expect(DEFAULT_SECURITY_CONFIG.csrf).toBeDefined();
  });

  it("has a validation section", () => {
    expect(DEFAULT_SECURITY_CONFIG.validation).toBeDefined();
  });

  it("has an audit section", () => {
    expect(DEFAULT_SECURITY_CONFIG.audit).toBeDefined();
  });

  it("script-src does NOT contain 'unsafe-eval'", () => {
    const scriptSrc =
      DEFAULT_SECURITY_CONFIG.helmet.contentSecurityPolicy.directives[
        "script-src"
      ];
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  it("script-src contains 'self'", () => {
    const scriptSrc =
      DEFAULT_SECURITY_CONFIG.helmet.contentSecurityPolicy.directives[
        "script-src"
      ];
    expect(scriptSrc).toContain("'self'");
  });

  it("CSP contains frame-ancestors: ['none']", () => {
    const frameAncestors =
      DEFAULT_SECURITY_CONFIG.helmet.contentSecurityPolicy.directives[
        "frame-ancestors"
      ];
    expect(frameAncestors).toContain("'none'");
  });

  it("HSTS maxAge is 31536000 (1 year)", () => {
    expect(DEFAULT_SECURITY_CONFIG.helmet.hsts.maxAge).toBe(31536000);
  });
});

// ---------------------------------------------------------------------------
// CSRFProtection
// ---------------------------------------------------------------------------
describe("CSRFProtection", () => {
  let csrf: CSRFProtection;

  beforeEach(() => {
    csrf = new CSRFProtection();
  });

  it("generateToken() returns a 64-char hex string", () => {
    const token = csrf.generateToken();
    expect(token).toHaveLength(64);
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("generateToken() returns different values each call", () => {
    const t1 = csrf.generateToken();
    const t2 = csrf.generateToken();
    expect(t1).not.toBe(t2);
  });

  it("validateToken() returns true when X-CSRF-Token header matches", () => {
    const token = "test-csrf-token-abc123";
    const req = new NextRequest("http://localhost/test", {
      method: "POST",
      headers: { "X-CSRF-Token": token },
    });
    expect(csrf.validateToken(req, token)).toBe(true);
  });

  it("validateToken() returns false when token doesn't match header", () => {
    const req = new NextRequest("http://localhost/test", {
      method: "POST",
      headers: { "X-CSRF-Token": "some-token" },
    });
    expect(csrf.validateToken(req, "wrong-token")).toBe(false);
  });

  it("validateToken() returns false when no token header present", () => {
    const req = new NextRequest("http://localhost/test", {
      method: "POST",
      headers: {},
    });
    expect(csrf.validateToken(req, "some-token")).toBe(false);
  });

  it("setTokenCookie() adds Set-Cookie header to response", () => {
    const response = new NextResponse("OK", { status: 200 });
    const token = "my-csrf-token";
    const updatedResponse = csrf.setTokenCookie(response, token);
    const setCookie = updatedResponse.headers.get("Set-Cookie");
    expect(setCookie).not.toBeNull();
    expect(setCookie).toContain(token);
  });

  it("setTokenCookie() includes _csrf cookie name", () => {
    const response = new NextResponse("OK", { status: 200 });
    const token = "cookietoken";
    csrf.setTokenCookie(response, token);
    const setCookie = response.headers.get("Set-Cookie");
    expect(setCookie).toContain("_csrf=");
  });
});

// ---------------------------------------------------------------------------
// InputValidator
// ---------------------------------------------------------------------------
describe("InputValidator", () => {
  let validator: InputValidator;

  beforeEach(() => {
    validator = new InputValidator();
  });

  describe("validateText", () => {
    it("with short input returns isValid: true", () => {
      const result = validator.validateText("hello world", "message");
      expect(result.isValid).toBe(true);
    });

    it("with short input returns sanitized value", () => {
      const result = validator.validateText("hello world", "message");
      expect(result.sanitizedValue).toBe("hello world");
    });

    it("with overlong input returns isValid: false", () => {
      const longInput = "a".repeat(1001);
      const result = validator.validateText(longInput, "field");
      expect(result.isValid).toBe(false);
    });

    it("with overlong input returns an error message", () => {
      const longInput = "a".repeat(1001);
      const result = validator.validateText(longInput, "field");
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain("field");
    });

    it("sanitizes HTML entities (< becomes &lt after sanitizeSQL strips semicolons)", () => {
      // escapeHTML converts < → &lt; then sanitizeSQL strips the ; → &lt
      const result = validator.validateText("<div>hello</div>", "field");
      expect(result.sanitizedValue).toContain("&lt");
      expect(result.sanitizedValue).not.toContain("<div>");
    });
  });

  describe("validateEmail", () => {
    it("with valid email returns isValid: true", () => {
      const result = validator.validateEmail("user@example.com");
      expect(result.isValid).toBe(true);
    });

    it("with valid email returns sanitized value (lowercased)", () => {
      const result = validator.validateEmail("User@Example.COM");
      expect(result.sanitizedValue).toBe("user@example.com");
    });

    it("with invalid email returns isValid: false", () => {
      const result = validator.validateEmail("notanemail");
      expect(result.isValid).toBe(false);
    });

    it("with invalid email includes error message", () => {
      const result = validator.validateEmail("bad@@email");
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("when validateEmails is false always returns isValid: true", () => {
      const lenientValidator = new InputValidator({
        ...DEFAULT_SECURITY_CONFIG.validation,
        validateEmails: false,
      });
      const result = lenientValidator.validateEmail("notanemail");
      expect(result.isValid).toBe(true);
    });
  });

  describe("validateFile", () => {
    it("with oversized file returns isValid: false", () => {
      const bigFile = {
        size: 20 * 1024 * 1024, // 20 MB — over 10 MB limit
        type: "image/jpeg",
        name: "large.jpg",
      } as unknown as File;
      const result = validator.validateFile(bigFile);
      expect(result.isValid).toBe(false);
    });

    it("with oversized file includes error message", () => {
      const bigFile = {
        size: 20 * 1024 * 1024,
        type: "image/jpeg",
        name: "large.jpg",
      } as unknown as File;
      const result = validator.validateFile(bigFile);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("with disallowed mime type returns isValid: false", () => {
      const badFile = {
        size: 1024,
        type: "application/x-executable",
        name: "malware.exe",
      } as unknown as File;
      const result = validator.validateFile(badFile);
      expect(result.isValid).toBe(false);
    });

    it("with disallowed mime type includes error", () => {
      const badFile = {
        size: 1024,
        type: "application/x-executable",
        name: "bad.exe",
      } as unknown as File;
      const result = validator.validateFile(badFile);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("with valid file returns isValid: true", () => {
      const goodFile = {
        size: 512 * 1024, // 512 KB
        type: "image/jpeg",
        name: "photo.jpg",
      } as unknown as File;
      const result = validator.validateFile(goodFile);
      expect(result.isValid).toBe(true);
    });

    it("with valid PDF returns isValid: true", () => {
      const pdf = {
        size: 1024 * 1024,
        type: "application/pdf",
        name: "doc.pdf",
      } as unknown as File;
      const result = validator.validateFile(pdf);
      expect(result.isValid).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// SecurityHeaders
// ---------------------------------------------------------------------------
describe("SecurityHeaders", () => {
  let securityHeaders: SecurityHeaders;
  let response: NextResponse;

  beforeEach(() => {
    securityHeaders = new SecurityHeaders();
    response = new NextResponse("OK", { status: 200 });
    securityHeaders.applyHeaders(response);
  });

  it("sets X-Frame-Options: DENY", () => {
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("sets X-Content-Type-Options: nosniff", () => {
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("sets X-XSS-Protection: 1; mode=block", () => {
    expect(response.headers.get("X-XSS-Protection")).toBe("1; mode=block");
  });

  it("sets Referrer-Policy", () => {
    const value = response.headers.get("Referrer-Policy");
    expect(value).not.toBeNull();
    expect(value!.length).toBeGreaterThan(0);
  });

  it("sets Content-Security-Policy", () => {
    const csp = response.headers.get("Content-Security-Policy");
    expect(csp).not.toBeNull();
    expect(csp!.length).toBeGreaterThan(0);
  });

  it("CSP does NOT contain unsafe-eval", () => {
    const csp = response.headers.get("Content-Security-Policy")!;
    expect(csp).not.toContain("unsafe-eval");
  });

  it("sets Permissions-Policy", () => {
    const value = response.headers.get("Permissions-Policy");
    expect(value).not.toBeNull();
  });

  it("sets Cross-Origin-Opener-Policy", () => {
    const value = response.headers.get("Cross-Origin-Opener-Policy");
    expect(value).not.toBeNull();
  });

  it("does NOT set HSTS in non-production environment", () => {
    // NODE_ENV is 'test' during Jest runs — HSTS should not be set
    expect(response.headers.get("Strict-Transport-Security")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// SecurityManager
// ---------------------------------------------------------------------------
describe("SecurityManager", () => {
  let manager: SecurityManager;

  beforeEach(() => {
    manager = new SecurityManager();
  });

  describe("processRequest", () => {
    it("GET returns { allowed: true, csrfToken: string }", async () => {
      const req = new NextRequest("http://localhost/test", { method: "GET" });
      const result = await manager.processRequest(req);
      expect(result.allowed).toBe(true);
      expect(typeof result.csrfToken).toBe("string");
      expect(result.csrfToken!.length).toBeGreaterThan(0);
    });

    it("POST with valid CSRF token in X-CSRF-Token header returns { allowed: true }", async () => {
      const token = "valid-csrf-token-123";
      const req = new NextRequest("http://localhost/test", {
        method: "POST",
        headers: { "X-CSRF-Token": token },
      });
      const result = await manager.processRequest(req);
      expect(result.allowed).toBe(true);
    });

    it("POST without CSRF token returns { allowed: false, response } with status 403", async () => {
      const req = new NextRequest("http://localhost/test", {
        method: "POST",
        headers: {},
      });
      const result = await manager.processRequest(req);
      expect(result.allowed).toBe(false);
      expect(result.response).toBeDefined();
      expect(result.response!.status).toBe(403);
    });

    it("PUT without CSRF token returns { allowed: false }", async () => {
      const req = new NextRequest("http://localhost/test", {
        method: "PUT",
        headers: {},
      });
      const result = await manager.processRequest(req);
      expect(result.allowed).toBe(false);
    });

    it("DELETE without CSRF token returns { allowed: false }", async () => {
      const req = new NextRequest("http://localhost/test", {
        method: "DELETE",
        headers: {},
      });
      const result = await manager.processRequest(req);
      expect(result.allowed).toBe(false);
    });
  });

  describe("applyResponseSecurity", () => {
    it("applies security headers to response", () => {
      const response = new NextResponse("OK", { status: 200 });
      manager.applyResponseSecurity(response);
      expect(response.headers.get("Content-Security-Policy")).not.toBeNull();
      expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    });

    it("sets CSRF cookie when csrfToken is provided", () => {
      const response = new NextResponse("OK", { status: 200 });
      manager.applyResponseSecurity(response, "my-csrf-token");
      const setCookie = response.headers.get("Set-Cookie");
      expect(setCookie).not.toBeNull();
      expect(setCookie).toContain("my-csrf-token");
    });

    it("does NOT set CSRF cookie when csrfToken is not provided", () => {
      const response = new NextResponse("OK", { status: 200 });
      manager.applyResponseSecurity(response);
      // Set-Cookie might not be set, or if set it shouldn't have csrf token
      const setCookie = response.headers.get("Set-Cookie");
      expect(setCookie).toBeNull();
    });
  });

  describe("validateInput", () => {
    it("sanitizes string fields (escapes HTML entities, semicolons stripped by sanitizeSQL)", () => {
      // escapeHTML produces &lt;script&gt; then sanitizeSQL strips ; → &ltscript&gt
      const result = manager.validateInput({
        message: "<script>evil</script>",
      });
      expect(result.sanitizedData["message"] as string).toContain("&lt");
      expect(result.sanitizedData["message"] as string).not.toContain(
        "<script>",
      );
    });

    it("validates email fields and reports invalid emails", () => {
      const result = manager.validateInput({ userEmail: "notvalid" });
      expect(result.isValid).toBe(false);
      expect(result.errors["userEmail"]).toBeDefined();
    });

    it("validates email fields and accepts valid emails", () => {
      const result = manager.validateInput({ userEmail: "hello@example.com" });
      expect(result.isValid).toBe(true);
    });

    it("passes non-string values through unchanged", () => {
      const result = manager.validateInput({ count: 42, flag: true });
      expect(result.sanitizedData["count"]).toBe(42);
      expect(result.sanitizedData["flag"]).toBe(true);
    });

    it("returns isValid: true for clean input", () => {
      const result = manager.validateInput({ name: "John Doe" });
      expect(result.isValid).toBe(true);
    });
  });

  describe("getConfig", () => {
    it("returns the SecurityConfig", () => {
      const config = manager.getConfig();
      expect(config).toBeDefined();
      expect(config.cors).toBeDefined();
      expect(config.helmet).toBeDefined();
      expect(config.csrf).toBeDefined();
    });
  });
});

// ---------------------------------------------------------------------------
// securityManager singleton
// ---------------------------------------------------------------------------
describe("securityManager singleton", () => {
  it("is an instance of SecurityManager", () => {
    expect(securityManager).toBeInstanceOf(SecurityManager);
  });

  it("has a working getConfig()", () => {
    const config = securityManager.getConfig();
    expect(config.helmet.hsts.maxAge).toBe(31536000);
  });
});
