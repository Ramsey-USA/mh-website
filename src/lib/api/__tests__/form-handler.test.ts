/**
 * Tests for lib/api/form-handler.ts
 *
 * @jest-environment node
 */

// --- Mocks (must be before imports) ---

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    })),
  },
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { info: jest.fn(), error: jest.fn() },
}));

jest.mock("@/lib/utils/escape-html", () => ({
  escapeHtml: jest.fn((s: string) => s),
}));

const mockInsert = jest.fn();
const mockQuery = jest.fn();
const mockCreateDbClient = jest.fn(() => ({
  insert: mockInsert,
  query: mockQuery,
}));
jest.mock("@/lib/db/client", () => ({
  get createDbClient() {
    return mockCreateDbClient;
  },
}));

const mockGetD1Database = jest.fn();
jest.mock("@/lib/db/env", () => ({
  getD1Database: () => mockGetD1Database(),
}));

const mockGetFile = jest.fn();
const mockR2ServiceConstructor = jest.fn(() => ({ getFile: mockGetFile }));
const mockGetR2Bucket = jest.fn(() => ({ bucket: "mock-bucket" }));
const mockIsSmallEnoughForEmail = jest.fn(() => false);
const mockFileToBase64 = jest.fn(() => Promise.resolve("base64=="));
jest.mock("@/lib/cloudflare/r2", () => ({
  get getR2Bucket() {
    return mockGetR2Bucket;
  },
  get R2StorageService() {
    return mockR2ServiceConstructor;
  },
  get isSmallEnoughForEmail() {
    return mockIsSmallEnoughForEmail;
  },
  get fileToBase64() {
    return mockFileToBase64;
  },
}));

const mockGenerateJobAck = jest.fn(() => ({
  subject: "Job ack subject",
  html: "<p>job ack</p>",
  text: "job ack",
}));
const mockGenerateConsultationAck = jest.fn(() => ({
  subject: "Consult ack subject",
  html: "<p>consult ack</p>",
  text: "consult ack",
}));
const mockGenerateContactAck = jest.fn(() => ({
  subject: "Contact ack subject",
  html: "<p>contact ack</p>",
  text: "contact ack",
}));
jest.mock("@/lib/email/templates", () => ({
  get generateJobApplicationAcknowledgment() {
    return mockGenerateJobAck;
  },
  get generateConsultationAcknowledgment() {
    return mockGenerateConsultationAck;
  },
  get generateContactAcknowledgment() {
    return mockGenerateContactAck;
  },
}));

const mockSendToOffice = jest.fn(() =>
  Promise.resolve({ success: true, messageId: "msg-1" }),
);
const mockSendAcknowledgment = jest.fn(() =>
  Promise.resolve({ success: true }),
);
jest.mock("@/lib/email/email-service", () => ({
  get sendToOffice() {
    return mockSendToOffice;
  },
  get sendAcknowledgment() {
    return mockSendAcknowledgment;
  },
}));

jest.mock("@/lib/api/responses", () => ({
  createFormSubmissionResponse: jest.fn((id, emailSent, message, dbStored) => ({
    body: { id, emailSent, message, dbStored },
    status: 200,
  })),
  createPaginatedResponse: jest.fn((data, count, message) => ({
    body: { data, count, message },
    status: 200,
  })),
  internalServerError: jest.fn((msg) => ({
    body: { error: msg },
    status: 500,
  })),
}));

// --- Imports ---

import { handleFormSubmission, handleFormRetrieval } from "../form-handler";
import type { FormSubmissionConfig } from "../form-handler";

// --- Helpers ---

function makeRequest(body: unknown): import("next/server").NextRequest {
  return {
    json: jest.fn().mockResolvedValue(body),
  } as unknown as import("next/server").NextRequest;
}

function makeConfig(
  overrides: Partial<FormSubmissionConfig> = {},
): FormSubmissionConfig {
  return {
    tableName: "contact_submissions",
    emailSubject: () => "Test Subject",
    emailMessage: () => "Test message",
    validateFields: () => ({ valid: true }),
    transformData: (d) => d,
    submissionType: "Contact",
    ...overrides,
  };
}

// Mock for createFormSubmissionResponse / internalServerError
function getResponses() {
  return jest.requireMock("@/lib/api/responses") as {
    createFormSubmissionResponse: jest.Mock;
    createPaginatedResponse: jest.Mock;
    internalServerError: jest.Mock;
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  // Default: no DB
  mockGetD1Database.mockReturnValue(null);
  mockInsert.mockResolvedValue(undefined);
  mockQuery.mockResolvedValue([]);
  mockSendToOffice.mockResolvedValue({ success: true, messageId: "msg-1" });
  mockSendAcknowledgment.mockResolvedValue({ success: true });
  mockIsSmallEnoughForEmail.mockReturnValue(false);
});

// =============================================
// handleFormSubmission
// =============================================

describe("handleFormSubmission()", () => {
  it("returns 400 when validation fails with error message", async () => {
    const config = makeConfig({
      validateFields: () => ({ valid: false, error: "Name is required" }),
    });
    const req = makeRequest({ name: "" });

    await handleFormSubmission(req, config);

    const ncJson = jest.requireMock("next/server").NextResponse
      .json as jest.Mock;
    const [body, init] = ncJson.mock.calls[ncJson.mock.calls.length - 1];
    expect(body.error).toBe("Name is required");
    expect(init?.status).toBe(400);
  });

  it("returns 400 with fallback message when validation returns no error string", async () => {
    const config = makeConfig({
      validateFields: () => ({ valid: false }),
    });
    const req = makeRequest({});

    await handleFormSubmission(req, config);

    const ncJson = jest.requireMock("next/server").NextResponse
      .json as jest.Mock;
    const [body, init] = ncJson.mock.calls[ncJson.mock.calls.length - 1];
    expect(body.error).toBe("Invalid form data");
    expect(init?.status).toBe(400);
  });

  it("stores in DB when D1 is available and dbStored becomes true", async () => {
    const mockDB = { database: "mock-d1" };
    mockGetD1Database.mockReturnValue(mockDB);
    mockInsert.mockResolvedValue(undefined);

    const req = makeRequest({ name: "Alice", email: "alice@example.com" });
    const config = makeConfig();

    await handleFormSubmission(req, config);

    expect(mockInsert).toHaveBeenCalledWith(
      "contact_submissions",
      expect.objectContaining({ status: "new" }),
    );
    expect(getResponses().createFormSubmissionResponse).toHaveBeenCalledWith(
      expect.any(String),
      true,
      "Contact received successfully",
      true, // dbStored = true
    );
  });

  it("continues when D1 is not available (dbStored=false)", async () => {
    mockGetD1Database.mockReturnValue(null);

    const req = makeRequest({ email: "bob@example.com" });
    const config = makeConfig();

    await handleFormSubmission(req, config);

    expect(mockInsert).not.toHaveBeenCalled();
    expect(getResponses().createFormSubmissionResponse).toHaveBeenCalledWith(
      expect.any(String),
      true,
      "Contact received successfully",
      false, // dbStored = false
    );
  });

  it("continues when DB insert throws (best-effort)", async () => {
    const mockDB = { database: "mock-d1" };
    mockGetD1Database.mockReturnValue(mockDB);
    mockInsert.mockRejectedValue(new Error("DB write failed"));

    const req = makeRequest({ email: "c@example.com" });
    const config = makeConfig();

    const result = await handleFormSubmission(req, config);

    // Should have succeeded despite the DB error
    expect(result).toBeDefined();
    expect(getResponses().createFormSubmissionResponse).toHaveBeenCalled();
  });

  it("logs error when sendToOffice fails and continues (emailSent=false)", async () => {
    mockSendToOffice.mockResolvedValue({
      success: false,
      error: "SMTP down",
    } as never);

    const req = makeRequest({ email: "d@example.com" });
    const config = makeConfig();

    await handleFormSubmission(req, config);

    expect(getResponses().createFormSubmissionResponse).toHaveBeenCalledWith(
      expect.any(String),
      false, // emailSent = false
      "Contact received successfully",
      false,
    );
  });

  it("does not send acknowledgment when email field is missing", async () => {
    const req = makeRequest({ name: "No Email User" });
    const config = makeConfig();

    await handleFormSubmission(req, config);

    expect(mockSendAcknowledgment).not.toHaveBeenCalled();
  });

  it("sends Contact acknowledgment for generic submission type", async () => {
    const req = makeRequest({ name: "Alice", email: "alice@example.com" });
    const config = makeConfig({ submissionType: "Contact" });

    await handleFormSubmission(req, config);

    expect(mockGenerateContactAck).toHaveBeenCalledWith(
      expect.objectContaining({ email: "alice@example.com" }),
    );
    expect(mockSendAcknowledgment).toHaveBeenCalled();
  });

  it("sends Job Application acknowledgment with firstName/lastName from fields", async () => {
    const req = makeRequest({
      firstName: "John",
      lastName: "Doe",
      position: "Engineer",
      email: "john@example.com",
    });
    const config = makeConfig({ submissionType: "Job Application" });

    await handleFormSubmission(req, config);

    expect(mockGenerateJobAck).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        position: "Engineer",
        email: "john@example.com",
      }),
    );
  });

  it("extracts firstName/lastName from name field when individual fields absent", async () => {
    const req = makeRequest({ name: "Jane Smith", email: "jane@example.com" });
    const config = makeConfig({ submissionType: "Job Application" });

    await handleFormSubmission(req, config);

    expect(mockGenerateJobAck).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Jane",
        lastName: "Smith",
      }),
    );
  });

  it("uses fallback 'Applicant' and 'Position' when no name/position provided", async () => {
    const req = makeRequest({ email: "anon@example.com" });
    const config = makeConfig({ submissionType: "Job Application" });

    await handleFormSubmission(req, config);

    expect(mockGenerateJobAck).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Applicant",
        lastName: "",
        position: "Position",
      }),
    );
  });

  it("sends Consultation acknowledgment with selectedDate and selectedTime", async () => {
    const req = makeRequest({
      name: "Bob",
      email: "bob@example.com",
      projectType: "Renovation",
      selectedDate: "2025-01-15",
      selectedTime: "10:00",
    });
    const config = makeConfig({ submissionType: "Consultation" });

    await handleFormSubmission(req, config);

    expect(mockGenerateConsultationAck).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Bob",
        projectType: "Renovation",
        selectedDate: "2025-01-15",
        selectedTime: "10:00",
      }),
    );
  });

  it("sends Consultation acknowledgment without optional date/time when absent", async () => {
    const req = makeRequest({
      name: "Carol",
      email: "carol@example.com",
      projectType: "New Build",
    });
    const config = makeConfig({ submissionType: "Consultation" });

    await handleFormSubmission(req, config);

    const callArg = (
      mockGenerateConsultationAck.mock.calls as unknown[][]
    )[0]?.[0] as Record<string, unknown>;
    expect(callArg).not.toHaveProperty("selectedDate");
    expect(callArg).not.toHaveProperty("selectedTime");
  });

  it("uses fallback 'Client' and 'your project' for consultation when fields absent", async () => {
    const req = makeRequest({ email: "c@example.com" });
    const config = makeConfig({ submissionType: "Consultation" });

    await handleFormSubmission(req, config);

    expect(mockGenerateConsultationAck).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Client",
        projectType: "your project",
      }),
    );
  });

  it("logs error when acknowledgment send fails", async () => {
    mockSendAcknowledgment.mockResolvedValue({
      success: false,
      error: "SMTP",
    } as never);
    const { logger } = jest.requireMock("@/lib/utils/logger") as {
      logger: { error: jest.Mock };
    };

    const req = makeRequest({ email: "fail@example.com" });
    const config = makeConfig();

    await handleFormSubmission(req, config);

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Failed to send acknowledgment email"),
      expect.anything(),
    );
    // Should still return success (best-effort)
    expect(getResponses().createFormSubmissionResponse).toHaveBeenCalled();
  });

  it("attaches resume when Job Application has small resumeKey", async () => {
    mockIsSmallEnoughForEmail.mockReturnValue(true);
    mockGetFile.mockResolvedValue({
      success: true,
      data: new Blob(["pdf-bytes"]),
      contentType: "application/pdf",
    });
    mockFileToBase64.mockResolvedValue("base64pdf==");

    const req = makeRequest({
      email: "applicant@example.com",
      resumeKey: "resumes/abc.pdf",
      resumeFileSize: 500_000,
      resumeFileName: "my-resume.pdf",
    });
    const config = makeConfig({ submissionType: "Job Application" });

    await handleFormSubmission(req, config);

    expect(mockGetFile).toHaveBeenCalledWith("resumes/abc.pdf");
    expect(mockSendToOffice).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      true, // includeArnold
      expect.arrayContaining([
        expect.objectContaining({
          content: "base64pdf==",
          filename: "my-resume.pdf",
        }),
      ]),
    );
  });

  it("uses 'resume.pdf' filename fallback when resumeFileName absent", async () => {
    mockIsSmallEnoughForEmail.mockReturnValue(true);
    mockGetFile.mockResolvedValue({
      success: true,
      data: new Blob(["bytes"]),
      contentType: undefined, // triggers 'application/pdf' fallback
    });
    mockFileToBase64.mockResolvedValue("base64==");

    const req = makeRequest({
      email: "x@example.com",
      resumeKey: "resumes/xyz.pdf",
      resumeFileSize: 200_000,
      // no resumeFileName
    });
    const config = makeConfig({ submissionType: "Job Application" });

    await handleFormSubmission(req, config);

    expect(mockSendToOffice).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      true,
      expect.arrayContaining([
        expect.objectContaining({
          filename: "resume.pdf",
          contentType: "application/pdf",
        }),
      ]),
    );
  });

  it("continues without attachment when R2 getFile returns success=false", async () => {
    mockIsSmallEnoughForEmail.mockReturnValue(true);
    mockGetFile.mockResolvedValue({ success: false, data: null });

    const req = makeRequest({
      email: "x@example.com",
      resumeKey: "resumes/xyz.pdf",
      resumeFileSize: 200_000,
    });
    const config = makeConfig({ submissionType: "Job Application" });

    await handleFormSubmission(req, config);

    // attachments is undefined → sendToOffice called with undefined
    expect(mockSendToOffice).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      true,
      undefined,
    );
  });

  it("continues when R2 getFile throws (best-effort)", async () => {
    mockIsSmallEnoughForEmail.mockReturnValue(true);
    mockGetFile.mockRejectedValue(new Error("R2 timeout"));

    const req = makeRequest({
      email: "x@example.com",
      resumeKey: "resumes/xyz.pdf",
      resumeFileSize: 200_000,
    });
    const config = makeConfig({ submissionType: "Job Application" });

    const result = await handleFormSubmission(req, config);

    expect(result).toBeDefined();
    expect(getResponses().createFormSubmissionResponse).toHaveBeenCalled();
  });

  it("returns internalServerError when request.json() throws", async () => {
    const req = {
      json: jest.fn().mockRejectedValue(new Error("Parse error")),
    } as unknown as import("next/server").NextRequest;
    const config = makeConfig();

    await handleFormSubmission(req, config);

    expect(getResponses().internalServerError).toHaveBeenCalledWith(
      "Failed to process Contact",
    );
  });

  it("passes transformData result as null → uses empty object for DB record", async () => {
    const mockDB = { database: "mock-d1" };
    mockGetD1Database.mockReturnValue(mockDB);

    const req = makeRequest({ name: "Test" });
    const config = makeConfig({ transformData: () => null });

    await handleFormSubmission(req, config);

    expect(mockInsert).toHaveBeenCalledWith(
      "contact_submissions",
      expect.objectContaining({ status: "new" }),
    );
  });

  it("sets includeArnold=false for non-Job Application submissions", async () => {
    const req = makeRequest({ name: "Carol" });
    const config = makeConfig({ submissionType: "Contact" });

    await handleFormSubmission(req, config);

    expect(mockSendToOffice).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      false, // includeArnold = false
      undefined,
    );
  });
});

// =============================================
// handleFormRetrieval
// =============================================

describe("handleFormRetrieval()", () => {
  it("returns 500 for disallowed table name", async () => {
    await handleFormRetrieval("users");

    expect(getResponses().internalServerError).toHaveBeenCalledWith(
      "Invalid table name",
    );
  });

  it("returns 500 for disallowed order column", async () => {
    await handleFormRetrieval("consultations", "name; DROP TABLE--");

    expect(getResponses().internalServerError).toHaveBeenCalledWith(
      "Invalid order column",
    );
  });

  it("returns rows from DB when D1 is available", async () => {
    const fakeRows = [{ id: "1", status: "new" }];
    const mockDB = { database: "mock-d1" };
    mockGetD1Database.mockReturnValue(mockDB);
    mockQuery.mockResolvedValue(fakeRows);

    await handleFormRetrieval("consultations");

    expect(getResponses().createPaginatedResponse).toHaveBeenCalledWith(
      fakeRows,
      1,
    );
  });

  it("returns empty paginated response when D1 not available", async () => {
    mockGetD1Database.mockReturnValue(null);

    await handleFormRetrieval("job_applications");

    expect(getResponses().createPaginatedResponse).toHaveBeenCalledWith(
      [],
      0,
      "D1 database not available in this environment",
    );
  });

  it("returns 500 when DB query throws", async () => {
    const mockDB = { database: "mock-d1" };
    mockGetD1Database.mockReturnValue(mockDB);
    mockQuery.mockRejectedValue(new Error("Query failed"));

    await handleFormRetrieval("contact_submissions");

    expect(getResponses().internalServerError).toHaveBeenCalledWith(
      "Failed to fetch submissions",
    );
  });

  it("accepts valid orderBy values (updated_at)", async () => {
    const mockDB = { database: "mock-d1" };
    mockGetD1Database.mockReturnValue(mockDB);
    mockQuery.mockResolvedValue([]);

    await handleFormRetrieval("newsletter_subscribers", "updated_at");

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("updated_at"),
    );
  });
});
