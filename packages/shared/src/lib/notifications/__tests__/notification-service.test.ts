import {
  sendNotification,
  sendBulkNotifications,
  sendNotificationWithRetry,
} from "../notification-service";

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
  delete process.env["RESEND_API_KEY"];
  delete process.env["TWILIO_ACCOUNT_SID"];
  delete process.env["TWILIO_AUTH_TOKEN"];
  delete process.env["TWILIO_FROM_NUMBER"];
});

// ─── Email ────────────────────────────────────────────────────────────────────

describe("sendNotification — email", () => {
  it("returns error when RESEND_API_KEY is not set", async () => {
    const result = await sendNotification({
      type: "email",
      recipient: "test@example.com",
      message: "Hello",
    });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
  });

  it("sends email successfully and returns messageId", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "msg_123" }),
    });

    const result = await sendNotification({
      type: "email",
      recipient: "test@example.com",
      message: "Welcome!",
      subject: "Welcome to MH Construction",
    });

    expect(result.success).toBe(true);
    expect(result.messageId).toBe("msg_123");
  });

  it("returns error on non-OK response from Resend", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "Bad request",
    });

    const result = await sendNotification({
      type: "email",
      recipient: "test@example.com",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Failed to send email/i);
  });

  it("handles fetch throw (network error)", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    const result = await sendNotification({
      type: "email",
      recipient: "test@example.com",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network failure");
  });

  it("handles fetch throw non-Error object", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch.mockRejectedValueOnce("string error");

    const result = await sendNotification({
      type: "email",
      recipient: "test@example.com",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Unknown error");
  });

  it("uses default subject when none provided", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "msg_default" }),
    });

    await sendNotification({
      type: "email",
      recipient: "test@example.com",
      message: "Hello",
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.subject).toBe("Notification from MH Construction");
  });
});

// ─── Push ─────────────────────────────────────────────────────────────────────

describe("sendNotification — push", () => {
  it("returns not-configured error (push not implemented)", async () => {
    const result = await sendNotification({
      type: "push",
      recipient: "device_token_abc",
      message: "Update available",
    });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
  });
});

// ─── SMS ──────────────────────────────────────────────────────────────────────

describe("sendNotification — sms", () => {
  it("returns error when Twilio credentials are absent", async () => {
    const result = await sendNotification({
      type: "sms",
      recipient: "+15095551234",
      message: "Your appointment is confirmed.",
    });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
  });

  it("sends SMS successfully and returns messageId", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "auth_token";
    process.env["TWILIO_FROM_NUMBER"] = "+15551234567";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sid: "SM_abc123" }),
    });

    const result = await sendNotification({
      type: "sms",
      recipient: "+15095551234",
      message: "Your project update.",
    });

    expect(result.success).toBe(true);
    expect(result.messageId).toBe("SM_abc123");
  });

  it("returns error on non-OK Twilio response", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "auth_token";
    process.env["TWILIO_FROM_NUMBER"] = "+15551234567";

    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "Invalid number",
    });

    const result = await sendNotification({
      type: "sms",
      recipient: "+15095551234",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Failed to send SMS/i);
  });

  it("handles Twilio fetch throw", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "auth_token";
    process.env["TWILIO_FROM_NUMBER"] = "+15551234567";

    mockFetch.mockRejectedValueOnce(new Error("Twilio timeout"));

    const result = await sendNotification({
      type: "sms",
      recipient: "+15095551234",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Twilio timeout");
  });
});

// ─── Unknown type ─────────────────────────────────────────────────────────────

describe("sendNotification — unknown type", () => {
  it("returns error for unknown notification type", async () => {
    const result = await sendNotification({
      // Cast to bypass TypeScript type check in tests
      type: "fax" as "email",
      recipient: "test@example.com",
      message: "Hello",
    });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/unknown notification type/i);
  });
});

// ─── sendBulkNotifications ───────────────────────────────────────────────────

describe("sendBulkNotifications", () => {
  it("sends all notifications and returns results array", async () => {
    const results = await sendBulkNotifications([
      { type: "push", recipient: "device_1", message: "msg1" },
      { type: "push", recipient: "device_2", message: "msg2" },
    ]);

    expect(results).toHaveLength(2);
    expect(results[0]?.success).toBe(false); // push not configured
    expect(results[1]?.success).toBe(false);
  });

  it("returns empty array for empty input", async () => {
    const results = await sendBulkNotifications([]);
    expect(results).toEqual([]);
  });
});

// ─── sendNotificationWithRetry ────────────────────────────────────────────────

describe("sendNotificationWithRetry", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns success on first attempt", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "msg_retry_ok" }),
    });

    const result = await sendNotificationWithRetry(
      { type: "email", recipient: "r@example.com", message: "Hi" },
      3,
    );
    expect(result.success).toBe(true);
    expect(result.messageId).toBe("msg_retry_ok");
  });

  it("retries and succeeds on second attempt", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    mockFetch
      .mockResolvedValueOnce({ ok: false, text: async () => "server error" })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "msg_retry_2" }),
      });

    const promise = sendNotificationWithRetry(
      { type: "email", recipient: "r@example.com", message: "Hi" },
      3,
    );

    // Run all pending timers and microtasks until promise resolves
    await jest.runAllTimersAsync();

    const result = await promise;
    expect(result.success).toBe(true);
    expect(result.messageId).toBe("msg_retry_2");
  }, 15000);

  it("returns failure after exhausting all retries", async () => {
    // push is always a sync failure
    const promise = sendNotificationWithRetry(
      { type: "push", recipient: "device_x", message: "msg" },
      2,
    );

    await jest.runAllTimersAsync();

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Failed after 2 attempts/i);
  }, 15000);
});
