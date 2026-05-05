/**
 * @jest-environment node
 *
 * Driver check-alerts cron endpoint — alert email path tests
 *
 * The main drivers.test.ts covers the "no alerts" path and auth checks.
 * This file covers the paths that actually send emails:
 *   - Expiring licences → individual urgent alerts + summary
 *   - Overdue MVR checks → individual MVR alerts + summary
 *   - Mixed alerts → summary only when nothing is within 7 days
 *   - Error thrown inside handler → 500
 */

import { NextRequest } from "next/server";

// ── Shared driver fixture ─────────────────────────────────────────────────────

const makeDriver = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: "driver-1",
  employee_name: "Jane Smith",
  email: "jane@example.com",
  license_number: "WA12345",
  license_state: "WA",
  license_class: "A",
  license_expiration_date: "2099-12-31", // far future by default
  next_mvr_check_date: null,
  authorization_status: "authorized",
  consent_on_file: 1,
  ...overrides,
});

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue({}),
}));

const mockQuery = jest.fn();
const mockCount = jest.fn().mockResolvedValue(0);

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    query: mockQuery,
    count: mockCount,
  })),
}));

const mockSendEmail = jest.fn().mockResolvedValue({ success: true });

jest.mock("@/lib/email/email-service", () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendEmail: mockSendEmail,
  })),
}));

jest.mock("@/lib/email/templates", () => ({
  generateLicenseExpiringAlert: jest.fn().mockReturnValue({
    subject: "License Expiring",
    html: "<p>exp</p>",
    text: "exp",
  }),
  generateMvrReviewDueAlert: jest
    .fn()
    .mockReturnValue({ subject: "MVR Due", html: "<p>mvr</p>", text: "mvr" }),
  generateDriverAlertSummary: jest
    .fn()
    .mockReturnValue({ subject: "Summary", html: "<p>sum</p>", text: "sum" }),
}));

jest.mock("@/lib/constants/company", () => ({
  EMAIL_RECIPIENTS: { general: "admin@test.com" },
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// ── Module under test ─────────────────────────────────────────────────────────

let GET: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ GET } = await import("@/app/api/drivers/check-alerts/route"));
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("GET /api/drivers/check-alerts — alert email paths", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env["CRON_SECRET"];
    const { getD1Database } = jest.requireMock("@/lib/db/env") as {
      getD1Database: jest.Mock;
    };
    getD1Database.mockReturnValue({});
    mockCount.mockResolvedValue(0);
  });

  it("sends urgent individual email for a licence expiring within 7 days", async () => {
    // Build an expiration date exactly 3 days from today
    const soon = new Date();
    soon.setDate(soon.getDate() + 3);
    const soonStr = soon.toISOString().split("T")[0]!;

    const urgentDriver = makeDriver({ license_expiration_date: soonStr });

    mockQuery
      .mockResolvedValueOnce([urgentDriver]) // expiring drivers
      .mockResolvedValueOnce([]) // overdue MVR
      .mockResolvedValueOnce([]); // missing consent

    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.details.urgent_expiring).toBe(1);
    // licence alert + summary = 2 email calls
    expect(mockSendEmail).toHaveBeenCalledTimes(2);
  });

  it("sends summary email but no urgent individual alerts when expiry is beyond 7 days", async () => {
    // Expiring in 30 days — shows in summary but not in urgent individual alerts
    const soon = new Date();
    soon.setDate(soon.getDate() + 30);
    const soonStr = soon.toISOString().split("T")[0]!;

    const expiringDriver = makeDriver({ license_expiration_date: soonStr });

    mockQuery
      .mockResolvedValueOnce([expiringDriver]) // expiring drivers
      .mockResolvedValueOnce([]) // overdue MVR
      .mockResolvedValueOnce([]); // missing consent

    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.details.urgent_expiring).toBe(0);
    expect(body.details.expiring_licenses).toBe(1);
    // Only summary email — no individual urgent alert
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it("sends individual MVR alert and summary for an overdue MVR", async () => {
    const overdueMvrDriver = makeDriver({
      next_mvr_check_date: "2020-01-01", // well in the past
    });

    mockQuery
      .mockResolvedValueOnce([]) // no expiring licences
      .mockResolvedValueOnce([overdueMvrDriver]) // overdue MVR
      .mockResolvedValueOnce([]); // missing consent

    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.details.overdue_mvr).toBe(1);
    // MVR individual alert + summary = 2 calls
    expect(mockSendEmail).toHaveBeenCalledTimes(2);
  });

  it("reflects pending_authorization count in summary details", async () => {
    mockCount.mockResolvedValue(5); // 5 pending drivers

    mockQuery
      .mockResolvedValueOnce([]) // no expiring
      .mockResolvedValueOnce([]) // no overdue MVR
      .mockResolvedValueOnce([]); // no missing consent

    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.details.pending_authorization).toBe(5);
    // Summary email only
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it("reflects missing_consent count in summary details", async () => {
    const noConsentDriver = makeDriver({ consent_on_file: 0 });

    mockQuery
      .mockResolvedValueOnce([]) // no expiring
      .mockResolvedValueOnce([]) // no overdue MVR
      .mockResolvedValueOnce([noConsentDriver]); // missing consent

    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts"),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.details.missing_consent).toBe(1);
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when an unexpected error occurs", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB crash"));

    const res = await GET(
      new NextRequest("http://localhost/api/drivers/check-alerts"),
    );

    expect(res.status).toBe(500);
  });
});
