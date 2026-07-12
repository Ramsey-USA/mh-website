/**
 * @jest-environment node
 *
 * Tests for lib/security/turnstile.ts
 *
 * verifyTurnstileToken has 5 distinct paths:
 *   1. No secret + production → fail
 *   2. No secret + non-production → skip (success)
 *   3. Secret set + HTTP error from Cloudflare → fail
 *   4. Secret set + success payload → success
 *   5. Secret set + fetch throws → fail
 */

import { verifyTurnstileToken } from "@/lib/security/turnstile";

jest.mock("@/lib/utils/logger");

const mockFetch = jest.fn();
global.fetch = mockFetch;

const DEFAULT_TURNSTILE_SECRET = "test-secret";

function setNodeEnv(value: string | undefined) {
  Object.defineProperty(process.env, "NODE_ENV", {
    value,
    configurable: true,
  });
}

function setTurnstileSecret(secret = DEFAULT_TURNSTILE_SECRET) {
  process.env["TURNSTILE_SECRET_KEY"] = secret;
}

function clearTurnstileSecret() {
  delete process.env["TURNSTILE_SECRET_KEY"];
}

describe("verifyTurnstileToken()", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    jest.clearAllMocks();
    clearTurnstileSecret();
    setNodeEnv(originalNodeEnv);
  });

  it("returns failure in production when secret is missing", async () => {
    setNodeEnv("production");
    clearTurnstileSecret();

    const result = await verifyTurnstileToken("some-token");
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("missing-input-secret");
  });

  it("skips verification outside production when secret is missing", async () => {
    setNodeEnv("test");
    clearTurnstileSecret();

    const result = await verifyTurnstileToken("some-token");
    expect(result.success).toBe(true);
    expect(result.skipped).toBe(true);
  });

  it("returns success when Cloudflare responds with success: true", async () => {
    setTurnstileSecret();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, "error-codes": [] }),
    });

    const result = await verifyTurnstileToken("valid-token");
    expect(result.success).toBe(true);
    expect(result.errorCodes).toEqual([]);
  });

  it("returns failure when Cloudflare responds with success: false", async () => {
    setTurnstileSecret();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    });

    const result = await verifyTurnstileToken("bad-token");
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("invalid-input-response");
  });

  it("returns failure when Cloudflare API returns a non-OK HTTP status", async () => {
    setTurnstileSecret();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
    });

    const result = await verifyTurnstileToken("some-token");
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("verification-request-failed");
  });

  it("returns failure when fetch throws an error", async () => {
    setTurnstileSecret();
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    const result = await verifyTurnstileToken("some-token");
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain("verification-exception");
  });

  it("includes remoteip in the request body when provided", async () => {
    setTurnstileSecret();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await verifyTurnstileToken("token", "1.2.3.4");

    const callBody = mockFetch.mock.calls[0][1].body as string;
    expect(callBody).toContain("remoteip");
    expect(callBody).toContain("1.2.3.4");
  });
});
