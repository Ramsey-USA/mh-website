/**
 * @jest-environment node
 */

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

import { logger } from "@/lib/utils/logger";
import { AuditEventType, AuditLogger, RiskLevel } from "../audit-logger";

describe("AuditLogger", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-27T12:00:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
    (process.env as Record<string, string | undefined>)["NODE_ENV"] =
      originalEnv;
  });

  it("does not log low-risk successful events when success logging is disabled", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: false,
      sensitiveDataMasking: true,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.ACCESS_GRANTED, {
      source: "test",
      outcome: "success",
      details: { ok: true },
    });

    expect(audit.queryEvents({})).toHaveLength(0);
  });

  it("always logs high-risk events and masks sensitive fields", async () => {
    (process.env as Record<string, string | undefined>)["NODE_ENV"] =
      "development";
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: false,
      sensitiveDataMasking: true,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.XSS_ATTEMPT, {
      source: "test",
      ipAddress: "10.20.30.40",
      outcome: "success",
      details: { password: "secret", tokenValue: "abc", safe: "ok" },
      tags: ["security"],
    });

    const [event] = audit.queryEvents({});
    expect(event?.riskLevel).toBe(RiskLevel.CRITICAL);
    expect(event?.ipAddress).toBe("10.20.*.***");
    expect(event?.details["password"]).toBe("[REDACTED]");
    expect(event?.details["tokenValue"]).toBe("[REDACTED]");
    expect(event?.details["safe"]).toBe("ok");
    expect(logger.log).toHaveBeenCalled();
  });

  it("supports auth, security violation, and data access helper logging", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logAuthEvent("failure", "u1", "1.2.3.4");
    await audit.logSecurityViolation(
      AuditEventType.CSRF_TOKEN_INVALID,
      "2.2.2.2",
    );
    await audit.logDataAccess("/api/contact", "GET", "u1", "success", {
      rows: 1,
    });

    const events = audit.queryEvents({ sortOrder: "asc" });
    expect(events.map((e) => e.eventType)).toEqual([
      AuditEventType.LOGIN_FAILURE,
      AuditEventType.CSRF_TOKEN_INVALID,
      AuditEventType.DATA_ACCESS,
    ]);
  });

  it("filters and sorts query results", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.ACCESS_DENIED, {
      source: "test",
      userId: "u1",
      ipAddress: "1.1.1.1",
      outcome: "failure",
      tags: ["auth"],
      details: {},
    });
    jest.setSystemTime(new Date("2026-03-27T12:10:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      userId: "u2",
      ipAddress: "2.2.2.2",
      outcome: "success",
      tags: ["data"],
      details: {},
    });

    expect(
      audit.queryEvents({ userId: "u1", outcome: "failure", tags: ["auth"] }),
    ).toHaveLength(1);
    expect(
      audit.queryEvents({ sortBy: "riskLevel", sortOrder: "desc" })[0]
        ?.eventType,
    ).toBe(AuditEventType.ACCESS_DENIED);
  });

  it("generates statistics, timeline data, and anomalies", () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });
    const events = [] as unknown[];

    for (let i = 0; i < 11; i++) {
      events.push({
        id: `e${i}`,
        timestamp: new Date(Date.now() - 1_000),
        eventType: AuditEventType.LOGIN_FAILURE,
        riskLevel: RiskLevel.HIGH,
        source: "test",
        ipAddress: "9.9.9.9",
        outcome: "failure",
        details: {},
        metadata: {},
        tags: [],
      });
    }
    for (let i = 0; i < 101; i++) {
      events.push({
        id: `ip${i}`,
        timestamp: new Date(Date.now() - 1_000),
        eventType: AuditEventType.DATA_ACCESS,
        riskLevel: RiskLevel.LOW,
        source: "test",
        ipAddress: "8.8.8.8",
        userId: "u1",
        outcome: "success",
        details: {},
        metadata: {},
        tags: [],
      });
    }

    (audit as unknown as { events: unknown[] }).events = events;

    const stats = audit.getStatistics();
    expect(stats.totalEvents).toBe(112);
    expect(stats.eventsByType[AuditEventType.LOGIN_FAILURE]).toBe(11);
    expect(stats.eventsByRiskLevel[RiskLevel.HIGH]).toBe(11);
    expect(stats.topIPAddresses[0]).toEqual({ ip: "8.8.8.8", count: 101 });
    expect(stats.topUsers[0]).toEqual({ userId: "u1", count: 101 });
    expect(stats.timelineData.length).toBeGreaterThan(0);
    expect(stats.anomalies.map((a) => a.type)).toEqual(
      expect.arrayContaining(["brute_force", "suspicious_ip"]),
    );
  });

  it("exports logs as JSON and CSV", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      outcome: "success",
      details: { rows: 1 },
    });

    const json = await audit.exportLogs({}, "json");
    const csv = await audit.exportLogs({}, "csv");

    expect(json).toContain(AuditEventType.DATA_ACCESS);
    expect(csv.split("\n")[0]).toContain("ID");
    expect(csv).toContain(AuditEventType.DATA_ACCESS);
  });

  it("enforces the max-events limit during logging", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });
    (audit as unknown as { maxEvents: number }).maxEvents = 2;

    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      outcome: "success",
      details: { n: 1 },
    });

    jest.setSystemTime(new Date("2026-03-27T12:00:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      outcome: "success",
      details: { n: 2 },
    });
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      outcome: "success",
      details: { n: 3 },
    });

    const events = audit.queryEvents({ sortOrder: "asc" });
    expect(events).toHaveLength(2);
    expect(events.map((e) => e.details["n"] as number)).toEqual([2, 3]);
  });

  it("drops events outside the retention window", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 1,
    });

    jest.setSystemTime(new Date("2026-03-25T12:00:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      outcome: "success",
      details: { n: 1 },
    });

    jest.setSystemTime(new Date("2026-03-27T12:00:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      outcome: "success",
      details: { n: 2 },
    });

    const events = audit.queryEvents({ sortOrder: "asc" });
    expect(events).toHaveLength(1);
    expect(events[0]?.details["n"]).toBe(2);
  });

  // ── queryEvents filter branches ──────────────────────────────────────────

  it("queryEvents filters by eventTypes (lines 222-226)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      outcome: "success",
      details: {},
    });
    await audit.logEvent(AuditEventType.ACCESS_DENIED, {
      source: "t",
      outcome: "failure",
      details: {},
    });

    const result = audit.queryEvents({
      eventTypes: [AuditEventType.DATA_ACCESS],
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.eventType).toBe(AuditEventType.DATA_ACCESS);
  });

  it("queryEvents filters by riskLevels (lines 229-233)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      outcome: "success",
      details: {},
    });
    await audit.logEvent(AuditEventType.XSS_ATTEMPT, {
      source: "t",
      outcome: "failure",
      details: {},
    });

    const result = audit.queryEvents({ riskLevels: [RiskLevel.CRITICAL] });
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.every((e) => e.riskLevel === RiskLevel.CRITICAL)).toBe(true);
  });

  it("queryEvents filters by dateRange (lines 236-242)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    jest.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      outcome: "success",
      details: { label: "old" },
    });

    jest.setSystemTime(new Date("2026-06-01T00:00:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      outcome: "success",
      details: { label: "new" },
    });

    const result = audit.queryEvents({
      dateRange: {
        start: new Date("2026-05-01T00:00:00.000Z"),
        end: new Date("2026-07-01T00:00:00.000Z"),
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.details["label"]).toBe("new");
  });

  it("queryEvents filters by ipAddress (lines 252-256)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      ipAddress: "11.22.33.44",
      outcome: "success",
      details: {},
    });
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      ipAddress: "55.66.77.88",
      outcome: "success",
      details: {},
    });

    const result = audit.queryEvents({ ipAddress: "11.22.33.44" });
    expect(result).toHaveLength(1);
    expect(result[0]?.ipAddress).toBe("11.22.33.44");
  });

  it("getStatistics with dateRange filters events (lines 302-308)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    jest.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      outcome: "success",
      details: {},
    });

    jest.setSystemTime(new Date("2026-09-01T00:00:00.000Z"));
    await audit.logEvent(AuditEventType.ACCESS_DENIED, {
      source: "t",
      outcome: "failure",
      details: {},
    });

    const stats = audit.getStatistics({
      start: new Date("2026-08-01T00:00:00.000Z"),
      end: new Date("2026-10-01T00:00:00.000Z"),
    });
    expect(stats.totalEvents).toBe(1);
    expect(stats.eventsByType[AuditEventType.ACCESS_DENIED]).toBe(1);
  });

  it("maskSensitiveData returns non-IP string unchanged (lines 547-548)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: true,
      retentionDays: 90,
    });

    // Log an event with a userId that looks like a plain string (not an IP)
    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "t",
      ipAddress: "not-an-ip-address",
      outcome: "success",
      details: {},
    });

    const [event] = audit.queryEvents({});
    // "not-an-ip-address" doesn't match /^\d+\.\d+\.\d+\.\d+$/ → returned as-is
    expect(event?.ipAddress).toBe("not-an-ip-address");
  });

  // ── logEvent optional field branches (lines 173, 176, 179) ──────────────

  it("includes userAgent, sessionId, resource, action when provided (covers && branches)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logEvent(AuditEventType.DATA_ACCESS, {
      source: "test",
      userAgent: "Mozilla/5.0",
      sessionId: "sess-abc",
      resource: "/api/data",
      action: "read",
      outcome: "success",
      details: {},
    });

    const [event] = audit.queryEvents({});
    expect(event?.userAgent).toBe("Mozilla/5.0");
    expect(event?.sessionId).toBe("sess-abc");
    expect(event?.resource).toBe("/api/data");
    expect(event?.action).toBe("read");
  });

  it("uses 'success' as default outcome when outcome is not provided (covers || branch)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    // Use XSS_ATTEMPT (high-risk) so shouldLog returns true even with undefined outcome
    await audit.logEvent(AuditEventType.XSS_ATTEMPT, {
      source: "test",
      // no outcome → defaults to "success"
      details: {},
    });

    const [event] = audit.queryEvents({});
    expect(event?.outcome).toBe("success");
  });

  // ── logAuthEvent optional args (lines 399-407) ──────────────────────────

  it("logAuthEvent success with all optional args (covers all && spread branches)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logAuthEvent("success", "user-1", "1.2.3.4", "Mozilla/5.0", {
      extra: "data",
    });

    const [event] = audit.queryEvents({});
    expect(event?.eventType).toBe(AuditEventType.LOGIN_SUCCESS);
    expect(event?.userId).toBe("user-1");
    expect(event?.ipAddress).toBe("1.2.3.4");
    expect(event?.userAgent).toBe("Mozilla/5.0");
    expect(event?.details["extra"]).toBe("data");
  });

  it("logAuthEvent failure with no optional args (covers absence branches)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logAuthEvent("failure");

    const [event] = audit.queryEvents({});
    expect(event?.eventType).toBe(AuditEventType.LOGIN_FAILURE);
    expect(event?.outcome).toBe("failure");
    expect(event).not.toHaveProperty("userId");
    expect(event).not.toHaveProperty("ipAddress");
  });

  // ── logSecurityViolation optional args (lines 424-426) ──────────────────

  it("logSecurityViolation with userAgent and details (covers && branches)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logSecurityViolation(
      AuditEventType.CSRF_TOKEN_INVALID,
      "9.8.7.6",
      "curl/7.0",
      { reason: "token_mismatch" },
    );

    const [event] = audit.queryEvents({});
    expect(event?.userAgent).toBe("curl/7.0");
    expect(event?.details["reason"]).toBe("token_mismatch");
  });

  it("logSecurityViolation with no optional args (covers absence branches)", async () => {
    const audit = new AuditLogger({
      logFailedAttempts: true,
      logSuccessfulRequests: true,
      sensitiveDataMasking: false,
      retentionDays: 90,
    });

    await audit.logSecurityViolation(AuditEventType.RATE_LIMIT_EXCEEDED);

    const [event] = audit.queryEvents({});
    expect(event?.outcome).toBe("failure");
    expect(event).not.toHaveProperty("ipAddress");
    expect(event).not.toHaveProperty("userAgent");
  });
});
