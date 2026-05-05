/**
 * @jest-environment node
 *
 * Tests for lib/services/health-check.ts
 *
 * Covers all exported functions:
 *   - checkResendStatus()      — sync, env-based
 *   - checkTwilioStatus()      — sync, env-based
 *   - getQuickHealthStatus()   — sync, env-based
 *   - checkD1Status()          — async, mocks @opennextjs/cloudflare
 *   - checkKVStatus()          — async
 *   - checkR2Status()          — async
 *   - checkAIStatus()          — async
 *   - checkAllServices()       — orchestrator
 */

import {
  checkResendStatus,
  checkTwilioStatus,
  getQuickHealthStatus,
  checkD1Status,
  checkKVStatus,
  checkR2Status,
  checkAIStatus,
  checkAllServices,
} from "@/lib/services/health-check";

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn(), info: jest.fn(), warn: jest.fn() },
}));

// ── Dynamic mock for @opennextjs/cloudflare ──────────────────────────────────

const mockGetCloudflareContext = jest.fn();

jest.mock(
  "@opennextjs/cloudflare",
  () => ({
    getCloudflareContext: (...args: unknown[]) =>
      mockGetCloudflareContext(...args),
  }),
  { virtual: true },
);

// ─────────────────────────────────────────────────────────────────────────────

describe("checkResendStatus()", () => {
  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  });

  it("returns healthy when both env vars are set", () => {
    process.env["RESEND_API_KEY"] = "re_xxx";
    process.env["EMAIL_FROM"] = "no-reply@mhc-gc.com";
    const s = checkResendStatus();
    expect(s.status).toBe("healthy");
    expect(s.name).toBe("resend");
  });

  it("returns unconfigured when env vars are missing", () => {
    const s = checkResendStatus();
    expect(s.status).toBe("unconfigured");
    expect(s.error).toMatch(/RESEND_API_KEY|EMAIL_FROM/i);
  });
});

describe("checkTwilioStatus()", () => {
  afterEach(() => {
    delete process.env["TWILIO_ACCOUNT_SID"];
    delete process.env["TWILIO_AUTH_TOKEN"];
    delete process.env["TWILIO_FROM_NUMBER"];
  });

  it("returns healthy when all Twilio vars are set", () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "auth123";
    process.env["TWILIO_FROM_NUMBER"] = "+15555555555";
    expect(checkTwilioStatus().status).toBe("healthy");
  });

  it("returns unconfigured when vars are missing", () => {
    expect(checkTwilioStatus().status).toBe("unconfigured");
  });
});

describe("getQuickHealthStatus()", () => {
  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
    delete process.env["TWILIO_ACCOUNT_SID"];
    delete process.env["TWILIO_AUTH_TOKEN"];
    delete process.env["TWILIO_FROM_NUMBER"];
  });

  it("returns email=false and sms=false when env vars are missing", () => {
    const s = getQuickHealthStatus();
    expect(s.email).toBe(false);
    expect(s.sms).toBe(false);
  });

  it("returns email=true when Resend vars are set", () => {
    process.env["RESEND_API_KEY"] = "key";
    process.env["EMAIL_FROM"] = "from@test.com";
    expect(getQuickHealthStatus().email).toBe(true);
  });

  it("returns sms=true when Twilio vars are set", () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+1";
    expect(getQuickHealthStatus().sms).toBe(true);
  });
});

// ── Async cloud checks ────────────────────────────────────────────────────────

describe("checkD1Status()", () => {
  it("returns unconfigured when DB binding is absent", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({ env: {} });
    const s = await checkD1Status();
    expect(s.status).toBe("unconfigured");
    expect(s.name).toBe("cloudflare-d1");
  });

  it("returns healthy when DB.prepare().first() resolves", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({
      env: {
        DB: { prepare: () => ({ first: jest.fn().mockResolvedValue({}) }) },
      },
    });
    const s = await checkD1Status();
    expect(s.status).toBe("healthy");
    expect(typeof s.latency).toBe("number");
  });

  it("returns unavailable when DB query throws", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({
      env: {
        DB: {
          prepare: () => ({
            first: jest.fn().mockRejectedValue(new Error("D1 down")),
          }),
        },
      },
    });
    const s = await checkD1Status();
    expect(s.status).toBe("unavailable");
    expect(s.error).toContain("D1 down");
  });

  it("returns unavailable when getCloudflareContext throws", async () => {
    mockGetCloudflareContext.mockImplementationOnce(() => {
      throw new Error("Context unavailable");
    });
    const s = await checkD1Status();
    expect(s.status).toBe("unavailable");
  });
});

describe("checkKVStatus()", () => {
  it("returns unconfigured when CACHE binding is absent", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({ env: {} });
    const s = await checkKVStatus();
    expect(s.status).toBe("unconfigured");
  });

  it("returns healthy when CACHE.get resolves", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({
      env: { CACHE: { get: jest.fn().mockResolvedValue(null) } },
    });
    const s = await checkKVStatus();
    expect(s.status).toBe("healthy");
  });

  it("returns unavailable when CACHE.get throws", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({
      env: {
        CACHE: { get: jest.fn().mockRejectedValue(new Error("KV fail")) },
      },
    });
    const s = await checkKVStatus();
    expect(s.status).toBe("unavailable");
  });
});

describe("checkR2Status()", () => {
  it("returns unconfigured when no R2 bucket bindings are present", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({ env: {} });
    const s = await checkR2Status();
    expect(s.status).toBe("unconfigured");
  });

  it("returns healthy when at least one R2 bucket binding exists", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({
      env: { FILE_ASSETS: {} },
    });
    const s = await checkR2Status();
    expect(s.status).toBe("healthy");
  });

  it("returns unavailable when getCloudflareContext throws", async () => {
    mockGetCloudflareContext.mockImplementationOnce(() => {
      throw new Error("R2 error");
    });
    const s = await checkR2Status();
    expect(s.status).toBe("unavailable");
  });
});

describe("checkAIStatus()", () => {
  it("returns unconfigured when AI binding is absent", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({ env: {} });
    const s = await checkAIStatus();
    expect(s.status).toBe("unconfigured");
  });

  it("returns healthy when AI binding is present", async () => {
    mockGetCloudflareContext.mockReturnValueOnce({ env: { AI: {} } });
    const s = await checkAIStatus();
    expect(s.status).toBe("healthy");
  });

  it("returns unavailable when getCloudflareContext throws", async () => {
    mockGetCloudflareContext.mockImplementationOnce(() => {
      throw new Error("AI exploded");
    });
    const s = await checkAIStatus();
    expect(s.status).toBe("unavailable");
  });
});

// ── checkAllServices() ────────────────────────────────────────────────────────

describe("checkAllServices()", () => {
  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  });

  it("returns a report with overall, services, and timestamp fields", async () => {
    // All async checks → unconfigured (no cloudflare context)
    mockGetCloudflareContext.mockReturnValue({ env: {} });
    const report = await checkAllServices();
    expect(["healthy", "degraded", "unhealthy"]).toContain(report.overall);
    expect(Array.isArray(report.services)).toBe(true);
    expect(typeof report.timestamp).toBe("string");
  });

  it("returns unhealthy when a service is unavailable", async () => {
    mockGetCloudflareContext.mockImplementation(() => {
      throw new Error("infra down");
    });
    const report = await checkAllServices();
    expect(report.overall).toBe("unhealthy");
  });

  it("returns healthy when all services are healthy or only Twilio is unconfigured", async () => {
    process.env["RESEND_API_KEY"] = "key";
    process.env["EMAIL_FROM"] = "from@test.com";
    // Cloudflare services return healthy
    mockGetCloudflareContext.mockReturnValue({
      env: {
        DB: { prepare: () => ({ first: jest.fn().mockResolvedValue({}) }) },
        CACHE: { get: jest.fn().mockResolvedValue(null) },
        FILE_ASSETS: {},
        AI: {},
      },
    });
    const report = await checkAllServices();
    expect(report.overall).toBe("healthy");
  });
});
