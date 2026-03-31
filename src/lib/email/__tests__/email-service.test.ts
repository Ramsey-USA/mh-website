/**
 * @jest-environment node
 */

// ── Resend mock ───────────────────────────────────────────────────────────────

const mockSend = jest.fn();

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
  },
}));

jest.mock("@/lib/constants/company", () => ({
  EMAIL_RECIPIENTS: {
    general: ["office@mhc-gc.com", "admin@mhc-gc.com"],
    contact: ["office@mhc-gc.com"],
    careers: ["office@mhc-gc.com"],
  },
}));

import {
  EmailService,
  sendEmail,
  sendToOffice,
  sendAcknowledgment,
} from "../email-service";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeService(withKey = true) {
  if (withKey) {
    process.env["RESEND_API_KEY"] = "re_test_key";
    process.env["EMAIL_FROM"] = "noreply@mhc-gc.com";
  } else {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  }
  return new EmailService();
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("EmailService.sendEmail()", () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  });

  it("returns success with messageId on a valid send", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_123" }, error: null });

    const svc = makeService();
    const result = await svc.sendEmail({
      to: "client@example.com",
      subject: "Test",
      html: "<p>Hello</p>",
    });

    expect(result.success).toBe(true);
    expect(result.messageId).toBe("msg_123");
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("includes text body when provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_txt" }, error: null });

    const svc = makeService();
    await svc.sendEmail({
      to: "a@b.com",
      subject: "Txt",
      text: "Plain text",
    });

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect(payload["text"]).toBe("Plain text");
    expect(payload["html"]).toBeUndefined();
  });

  it("includes attachments when provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_att" }, error: null });

    const svc = makeService();
    await svc.sendEmail({
      to: "a@b.com",
      subject: "With attachment",
      html: "<p>see attached</p>",
      attachments: [{ content: "base64data", filename: "resume.pdf" }],
    });

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect((payload["attachments"] as unknown[]).length).toBe(1);
  });

  it("passes replyTo header when provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_rt" }, error: null });

    const svc = makeService();
    await svc.sendEmail({
      to: "a@b.com",
      subject: "Reply",
      html: "<p>x</p>",
      replyTo: "reply@example.com",
    });

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect(payload["replyTo"]).toBe("reply@example.com");
  });

  it("uses custom 'from' address when provided", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_fr" }, error: null });

    const svc = makeService();
    await svc.sendEmail({
      to: "a@b.com",
      subject: "Custom from",
      html: "<p>hi</p>",
      from: "custom@mhc-gc.com",
    });

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect(payload["from"]).toBe("custom@mhc-gc.com");
  });

  it("accepts array of recipients", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_arr" }, error: null });

    const svc = makeService();
    await svc.sendEmail({
      to: ["a@b.com", "c@d.com"],
      subject: "Multi",
      html: "<p>hi</p>",
    });

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect((payload["to"] as string[]).length).toBe(2);
  });

  it("returns failure when Resend API returns an error object", async () => {
    // email-service does String(error); passing an Error instance ensures
    // the stringified form contains the message ("Error: Invalid API key")
    mockSend.mockResolvedValue({
      data: null,
      error: new Error("Invalid API key"),
    });

    const svc = makeService();
    const result = await svc.sendEmail({
      to: "a@b.com",
      subject: "Fail",
      html: "<p>x</p>",
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid API key");
  });

  it("returns failure when Resend throws an exception", async () => {
    mockSend.mockRejectedValue(new Error("Network timeout"));

    const svc = makeService();
    const result = await svc.sendEmail({
      to: "a@b.com",
      subject: "Throw",
      html: "<p>x</p>",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network timeout");
  });

  it("returns failure when 'to' is missing", async () => {
    const svc = makeService();
    const result = await svc.sendEmail({
      to: "",
      subject: "No recipient",
      html: "<p>x</p>",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/missing required fields/i);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns failure when both html and text are absent", async () => {
    const svc = makeService();
    const result = await svc.sendEmail({ to: "a@b.com", subject: "No body" });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/content is required/i);
  });

  it("returns failure without sending when RESEND_API_KEY is not set", async () => {
    const svc = makeService(false);
    const result = await svc.sendEmail({
      to: "a@b.com",
      subject: "No key",
      html: "<p>hi</p>",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
    expect(mockSend).not.toHaveBeenCalled();
  });
});

describe("EmailService.sendToOffice()", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env["RESEND_API_KEY"] = "re_test_key";
    process.env["EMAIL_FROM"] = "noreply@mhc-gc.com";
  });

  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  });

  it("sends to general recipients only by default", async () => {
    mockSend.mockResolvedValue({ data: { id: "x" }, error: null });

    const svc = new EmailService();
    await svc.sendToOffice("Subject", { html: "<p>hi</p>", text: "hi" });

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    const to = payload["to"] as string[];
    expect(to).toContain("office@mhc-gc.com");
    expect(to).not.toContain("arnold@mhc-gc.com");
  });

  it("adds arnold@mhc-gc.com when includeArnold=true", async () => {
    mockSend.mockResolvedValue({ data: { id: "x" }, error: null });

    const svc = new EmailService();
    await svc.sendToOffice("Job App", { html: "<p>hi</p>", text: "hi" }, true);

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect((payload["to"] as string[]).includes("arnold@mhc-gc.com")).toBe(
      true,
    );
  });

  it("passes attachments through to sendEmail", async () => {
    mockSend.mockResolvedValue({ data: { id: "x" }, error: null });

    const svc = new EmailService();
    await svc.sendToOffice("Resume", { html: "<p>hi</p>", text: "hi" }, false, [
      { content: "abc", filename: "resume.pdf" },
    ]);

    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect((payload["attachments"] as unknown[]).length).toBe(1);
  });
});

describe("EmailService.sendAcknowledgment()", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env["RESEND_API_KEY"] = "re_test_key";
    process.env["EMAIL_FROM"] = "noreply@mhc-gc.com";
  });

  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  });

  it("sends a success acknowledgment to the user's address", async () => {
    mockSend.mockResolvedValue({ data: { id: "ack_1" }, error: null });

    const svc = new EmailService();
    const result = await svc.sendAcknowledgment(
      "user@example.com",
      "Thank you",
      { html: "<p>Thanks</p>", text: "Thanks" },
    );

    expect(result.success).toBe(true);
    const payload = mockSend.mock.calls[0]![0] as Record<string, unknown>;
    expect(payload["to"]).toContain("user@example.com");
  });
});

describe("EmailService.isReady()", () => {
  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
  });

  it("returns true when RESEND_API_KEY is set", () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    const svc = new EmailService();
    expect(svc.isReady()).toBe(true);
  });

  it("returns false when RESEND_API_KEY is not set", () => {
    delete process.env["RESEND_API_KEY"];
    const svc = new EmailService();
    expect(svc.isReady()).toBe(false);
  });
});

describe("Convenience re-exports", () => {
  beforeEach(() => {
    mockSend.mockReset();
    process.env["RESEND_API_KEY"] = "re_test_key";
    process.env["EMAIL_FROM"] = "noreply@mhc-gc.com";
  });

  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["EMAIL_FROM"];
  });

  it("sendEmail() delegates to the singleton service", async () => {
    mockSend.mockResolvedValue({ data: { id: "se_1" }, error: null });
    const result = await sendEmail({
      to: "a@b.com",
      subject: "Direct",
      html: "<p>x</p>",
    });
    expect(result.success).toBe(true);
  });

  it("sendToOffice() delegates to the singleton service", async () => {
    mockSend.mockResolvedValue({ data: { id: "sto_1" }, error: null });
    const result = await sendToOffice("Subj", { html: "<p>x</p>", text: "x" });
    expect(result.success).toBe(true);
  });

  it("sendAcknowledgment() delegates to the singleton service", async () => {
    mockSend.mockResolvedValue({ data: { id: "sa_1" }, error: null });
    const result = await sendAcknowledgment("u@u.com", "Thanks", {
      html: "<p>x</p>",
      text: "x",
    });
    expect(result.success).toBe(true);
  });
});
