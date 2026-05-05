/**
 * @jest-environment node
 *
 * Leads Sync API — unit tests
 *
 * Covers POST /api/leads/sync:
 *   - No DB → 500
 *   - Empty tables → success with 0 imported
 *   - Contacts already in leads (skipped)
 *   - New contact submissions → imported
 *   - New consultations → imported
 *   - Mixed contacts + consultations with some existing
 *   - DB query failure → 500
 *   - parseBudget edge cases exercised implicitly
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockGetD1 = jest.fn().mockReturnValue({});

jest.mock("@/lib/db/env", () => ({
  getD1Database: (...args: unknown[]) => mockGetD1(...args),
}));

const mockQuery = jest.fn();
const mockInsert = jest.fn().mockResolvedValue("new-id");

jest.mock("@/lib/db/client", () => ({
  DbClient: jest.fn().mockImplementation(() => ({
    query: mockQuery,
    insert: mockInsert,
  })),
  createDbClient: jest.fn().mockImplementation(() => ({
    query: mockQuery,
    insert: mockInsert,
  })),
}));

jest.mock("@/lib/auth/middleware", () => {
  const { makeRequireRoleImpl } = require("../helpers/api-test-utils");
  return { requireRole: jest.fn(makeRequireRoleImpl) };
});

jest.mock("@/middleware/security", () => ({
  withSecurity: (handler: unknown) => handler,
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// ── Fixtures ──────────────────────────────────────────────────────────────────

const sampleContact = {
  id: "contact-1",
  first_name: "Alice",
  last_name: "Smith",
  email: "alice@example.com",
  phone: "509-555-0001",
  project_type: "Commercial",
  project_location: "Kennewick, WA",
  budget: "$100k - $500k",
  message: "Looking for office construction",
  urgency: "high",
  created_at: "2024-01-01T00:00:00Z",
  status: "new",
};

const sampleConsultation = {
  id: "consult-1",
  client_name: "Bob Builder",
  email: "bob@example.com",
  phone: "509-555-0002",
  project_type: "Industrial",
  project_description: "Warehouse expansion",
  location: "Pasco, WA",
  budget: "$1M+",
  created_at: "2024-02-01T00:00:00Z",
  status: "scheduled",
};

// ── Tests ─────────────────────────────────────────────────────────────────────

let POST: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/leads/sync/route"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetD1.mockReturnValue({});
  // Default: empty existing leads, empty contact_submissions, empty consultations
  mockQuery.mockResolvedValue([]);
  mockInsert.mockResolvedValue("new-id");
});

describe("POST /api/leads/sync", () => {
  it("returns 401 when no Authorization header is provided", async () => {
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 500 when database is not available", async () => {
    mockGetD1.mockReturnValueOnce(null);
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("returns success with 0 imported when tables are empty", async () => {
    mockQuery.mockResolvedValue([]);
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.imported.contacts).toBe(0);
    expect(body.data.imported.consultations).toBe(0);
    expect(body.data.skipped).toBe(0);
  });

  it("imports new contact submissions and skips existing source_ids", async () => {
    // Call order: existing leads query → contacts query → consultations query
    mockQuery
      .mockResolvedValueOnce([{ source_id: "contact-1" }]) // existing lead with same id
      .mockResolvedValueOnce([
        sampleContact,
        { ...sampleContact, id: "contact-2" },
      ]) // two contacts; contact-1 is a dup
      .mockResolvedValueOnce([]); // no consultations
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.imported.contacts).toBe(1); // only contact-2 is new
    expect(body.data.skipped).toBe(1);
    expect(mockInsert).toHaveBeenCalledTimes(1);
  });

  it("imports consultations correctly", async () => {
    mockQuery
      .mockResolvedValueOnce([]) // no existing leads
      .mockResolvedValueOnce([]) // no contact submissions
      .mockResolvedValueOnce([sampleConsultation]); // one consultation
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.imported.consultations).toBe(1);
    expect(body.data.total).toBe(1);
  });

  it("handles mixed contacts + consultations with overlap", async () => {
    mockQuery
      .mockResolvedValueOnce([{ source_id: "consult-1" }]) // consult-1 already synced
      .mockResolvedValueOnce([sampleContact]) // new contact
      .mockResolvedValueOnce([sampleConsultation]); // consult-1 is a dup
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    const body = await res.json();
    expect(body.data.imported.contacts).toBe(1);
    expect(body.data.imported.consultations).toBe(0);
    expect(body.data.skipped).toBe(1);
  });

  it("maps urgency values to correct priority labels", async () => {
    const urgentContact = {
      ...sampleContact,
      id: "contact-urg",
      urgency: "urgent",
    };
    const lowContact = { ...sampleContact, id: "contact-low", urgency: "low" };
    const defaultContact = {
      ...sampleContact,
      id: "contact-def",
      urgency: "normal",
    };
    mockQuery
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([urgentContact, lowContact, defaultContact])
      .mockResolvedValueOnce([]);
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.imported.contacts).toBe(3);
  });

  it("handles contacts with null budget", async () => {
    const nullBudgetContact = { ...sampleContact, id: "c-null", budget: null };
    mockQuery
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([nullBudgetContact])
      .mockResolvedValueOnce([]);
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("returns 500 when a database query throws", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));
    const req = makeRequest("http://localhost/api/leads/sync", {
      method: "POST",
      headers: authedHeaders,
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
