import { logger } from "@/lib/utils/logger";
import { sendToN8n, sendToN8nAsync } from "../n8n-webhook";
import * as n8nWebhook from "../n8n-webhook";

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("n8n webhook notifications", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.clearAllMocks();
    delete process.env["N8N_WEBHOOK_URL"];
  });

  it("returns unconfigured when webhook URL is missing", async () => {
    const result = await sendToN8n({
      type: "contact",
      data: { name: "Matt" },
    });

    expect(result).toEqual({
      success: false,
      error: "n8n webhook not configured",
    });
    expect(mockFetch).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      "N8N_WEBHOOK_URL not configured, skipping n8n notification",
    );
  });

  it("sends payload successfully with generated submittedAt", async () => {
    process.env["N8N_WEBHOOK_URL"] = "https://n8n.example/webhook";
    mockFetch.mockResolvedValueOnce({ ok: true });

    const result = await sendToN8n({
      type: "consultation",
      data: { projectType: "roofing" },
    });

    expect(result).toEqual({ success: true });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://n8n.example/webhook",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );

    const [, requestInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    const parsed = JSON.parse(String(requestInit.body));
    expect(parsed.type).toBe("consultation");
    expect(parsed.data.projectType).toBe("roofing");
    expect(parsed.data.submittedAt).toEqual(expect.any(String));
    expect(new Date(parsed.data.submittedAt).toString()).not.toBe(
      "Invalid Date",
    );
    expect(logger.info).toHaveBeenCalledWith("n8n webhook sent successfully", {
      type: "consultation",
    });
  });

  it("uses provided submittedAt value when supplied", async () => {
    process.env["N8N_WEBHOOK_URL"] = "https://n8n.example/webhook";
    mockFetch.mockResolvedValueOnce({ ok: true });

    const submittedAt = "2026-04-19T20:20:42.752Z";
    await sendToN8n({
      type: "newsletter",
      submittedAt,
      data: { email: "matt@example.com" },
    });

    const [, requestInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    const parsed = JSON.parse(String(requestInit.body));
    expect(parsed.data.submittedAt).toBe(submittedAt);
  });

  it("returns failure when webhook responds with non-OK status", async () => {
    process.env["N8N_WEBHOOK_URL"] = "https://n8n.example/webhook";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "internal error",
    });

    const result = await sendToN8n({
      type: "safety-form",
      data: { id: "abc" },
    });

    expect(result).toEqual({
      success: false,
      error: "n8n webhook failed: 500",
    });
    expect(logger.error).toHaveBeenCalledWith("n8n webhook failed", {
      status: 500,
      error: "internal error",
      type: "safety-form",
    });
  });

  it("returns thrown error message when fetch rejects with Error", async () => {
    process.env["N8N_WEBHOOK_URL"] = "https://n8n.example/webhook";
    mockFetch.mockRejectedValueOnce(new Error("network timeout"));

    const result = await sendToN8n({
      type: "testimonial-publish",
      data: { testimonialId: "t1" },
    });

    expect(result).toEqual({
      success: false,
      error: "network timeout",
    });
  });

  it("returns Unknown error when fetch rejects with non-Error", async () => {
    process.env["N8N_WEBHOOK_URL"] = "https://n8n.example/webhook";
    mockFetch.mockRejectedValueOnce("boom");

    const result = await sendToN8n({
      type: "job-application",
      data: { name: "Jeremy" },
    });

    expect(result).toEqual({
      success: false,
      error: "Unknown error",
    });
  });

  it("logs async send failures in sendToN8nAsync", async () => {
    const spy = jest
      .spyOn(n8nWebhook, "sendToN8n")
      .mockRejectedValueOnce(new Error("async failure"));

    sendToN8nAsync({
      type: "contact",
      data: { name: "Matt" },
    });
    await Promise.resolve();

    expect(spy).toHaveBeenCalledWith({
      type: "contact",
      data: { name: "Matt" },
    });
    expect(logger.error).toHaveBeenCalledWith(
      "n8n async notification failed",
      expect.objectContaining({
        error: expect.any(Error),
        type: "contact",
      }),
    );
  });
});
