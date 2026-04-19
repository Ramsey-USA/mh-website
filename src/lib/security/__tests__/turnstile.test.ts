/**
 * @jest-environment node
 */

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

import { logger } from "@/lib/utils/logger";
import { verifyTurnstileToken } from "../turnstile";

describe("verifyTurnstileToken", () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env["TURNSTILE_SECRET_KEY"];
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "test",
      configurable: true,
    });
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it("skips verification outside production when secret is missing", async () => {
    const result = await verifyTurnstileToken("token");

    expect(result).toEqual({ success: true, skipped: true });
    expect(logger.warn).toHaveBeenCalledWith(
      "TURNSTILE_SECRET_KEY not configured; skipping Turnstile verification outside production",
    );
  });

  it("returns failure in production when secret is missing", async () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    });

    const result = await verifyTurnstileToken("token");

    expect(result).toEqual({
      success: false,
      errorCodes: ["missing-input-secret"],
    });
    expect(logger.error).toHaveBeenCalledWith(
      "TURNSTILE_SECRET_KEY is required in production",
    );
  });

  it("returns success and forwards token/remote IP on successful verification", async () => {
    process.env["TURNSTILE_SECRET_KEY"] = "secret";
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, "error-codes": [] }),
    });

    const result = await verifyTurnstileToken("abc", "203.0.113.9");

    expect(result).toEqual({ success: true, errorCodes: [] });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }),
    );

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0] as [
      string,
      { body: string },
    ];
    const body = new URLSearchParams(fetchCall[1].body);
    expect(body.get("secret")).toBe("secret");
    expect(body.get("response")).toBe("abc");
    expect(body.get("remoteip")).toBe("203.0.113.9");
  });

  it("returns failure and error codes from a valid non-success response", async () => {
    process.env["TURNSTILE_SECRET_KEY"] = "secret";
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    });

    const result = await verifyTurnstileToken("bad-token");

    expect(result).toEqual({
      success: false,
      errorCodes: ["invalid-input-response"],
    });
  });

  it("returns request-failed when Cloudflare responds with non-OK HTTP status", async () => {
    process.env["TURNSTILE_SECRET_KEY"] = "secret";
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 503 });

    const result = await verifyTurnstileToken("token");

    expect(result).toEqual({
      success: false,
      errorCodes: ["verification-request-failed"],
    });
    expect(logger.error).toHaveBeenCalledWith(
      "Turnstile verification HTTP failure",
      { status: 503 },
    );
  });

  it("returns exception code when verification request throws", async () => {
    process.env["TURNSTILE_SECRET_KEY"] = "secret";
    const error = new Error("network down");
    (global.fetch as jest.Mock).mockRejectedValue(error);

    const result = await verifyTurnstileToken("token");

    expect(result).toEqual({
      success: false,
      errorCodes: ["verification-exception"],
    });
    expect(logger.error).toHaveBeenCalledWith(
      "Turnstile verification error",
      error,
    );
  });
});
