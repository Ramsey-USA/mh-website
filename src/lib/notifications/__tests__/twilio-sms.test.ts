import { logger } from "@/lib/utils/logger";
import {
  alertMatt,
  notifyUrgentSubmission,
  sendSms,
  sendSmsAsync,
} from "../twilio-sms";

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("twilio sms notifications", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.clearAllMocks();
    delete process.env["TWILIO_ACCOUNT_SID"];
    delete process.env["TWILIO_AUTH_TOKEN"];
    delete process.env["TWILIO_FROM_NUMBER"];
  });

  it("returns unconfigured when Twilio credentials are missing", async () => {
    const result = await sendSms({
      to: "+15095551234",
      message: "test",
    });

    expect(result).toEqual({
      success: false,
      error: "Twilio not configured",
    });
    expect(logger.warn).toHaveBeenCalledWith(
      "Twilio credentials not configured, skipping SMS",
    );
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("rejects invalid phone numbers", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";

    const result = await sendSms({
      to: "555-123-4567",
      message: "test",
    });

    expect(result).toEqual({
      success: false,
      error: "Invalid phone number format (must be +1XXXXXXXXXX)",
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("sends sms successfully and truncates long messages", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sid: "SM123" }),
    });

    const result = await sendSms({
      to: "+1 (509) 555-1234",
      message: "x".repeat(1700),
    });

    expect(result).toEqual({
      success: true,
      messageId: "SM123",
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0]?.[0]).toBe(
      "https://api.twilio.com/2010-04-01/Accounts/AC123/Messages.json",
    );

    const [, requestInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    const params = new URLSearchParams(String(requestInit.body));
    expect(params.get("To")).toBe("+15095551234");
    expect(params.get("From")).toBe("+15095550000");
    expect(params.get("Body")?.length).toBe(1600);
    expect(logger.info).toHaveBeenCalledWith("SMS sent successfully", {
      messageId: "SM123",
      to: "+15095551234",
    });
  });

  it("returns API error message when Twilio response is non-OK", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: "Bad number" }),
    });

    const result = await sendSms({
      to: "+15095551234",
      message: "test",
    });

    expect(result).toEqual({
      success: false,
      error: "Bad number",
    });
    expect(logger.error).toHaveBeenCalledWith("Twilio API error", {
      status: 400,
      error: { message: "Bad number" },
    });
  });

  it("falls back to default API error when message is absent", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ code: 12345 }),
    });

    const result = await sendSms({
      to: "+15095551234",
      message: "test",
    });

    expect(result).toEqual({
      success: false,
      error: "Failed to send SMS",
    });
  });

  it("returns thrown error message when fetch throws Error", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockRejectedValueOnce(new Error("network down"));

    const result = await sendSms({
      to: "+15095551234",
      message: "test",
    });

    expect(result).toEqual({
      success: false,
      error: "network down",
    });
  });

  it("returns Unknown error when fetch throws non-Error", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockRejectedValueOnce("raw error");

    const result = await sendSms({
      to: "+15095551234",
      message: "test",
    });

    expect(result).toEqual({
      success: false,
      error: "Unknown error",
    });
  });

  it("invokes async send flow without blocking caller", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sid: "SMASYNC" }),
    });
    sendSmsAsync({
      to: "+15095551234",
      message: "test",
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith("SMS sent successfully", {
      messageId: "SMASYNC",
      to: "+15095551234",
    });
  });

  it("sends urgent submission notifications and logs failed recipients", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "downstream failed" }),
    });

    await notifyUrgentSubmission("lead", "High-value lead submitted");

    const [, requestInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    const params = new URLSearchParams(String(requestInit.body));
    expect(params.get("To")).toBe("+15094912494");
    expect(params.get("Body")).toBe(
      "🚨 MHC Alert: New lead\n\nHigh-value lead submitted\n\nCheck dashboard for details.",
    );
    expect(logger.warn).toHaveBeenCalledWith("Failed to notify matt", {
      error: "downstream failed",
    });
  });

  it("routes alertMatt through async sms path with MHC prefix", async () => {
    process.env["TWILIO_ACCOUNT_SID"] = "AC123";
    process.env["TWILIO_AUTH_TOKEN"] = "token";
    process.env["TWILIO_FROM_NUMBER"] = "+15095550000";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sid: "SMMATT" }),
    });

    alertMatt("System test");
    await Promise.resolve();
    await Promise.resolve();

    const [, requestInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    const params = new URLSearchParams(String(requestInit.body));
    expect(params.get("To")).toBe("+15094912494");
    expect(params.get("Body")).toBe("MHC: System test");
  });
});
