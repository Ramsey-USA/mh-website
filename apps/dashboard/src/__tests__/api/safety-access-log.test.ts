/**
 * @jest-environment node
 *
 * Safety Access Log API — unit tests
 */

import { NextRequest } from "next/server";
import { makeRequest, authedHeaders } from "../helpers/api-test-utils";

const mockQuery = jest.fn().mockResolvedValue([]);
const mockQueryOne = jest.fn().mockResolvedValue({ total: 0 });
const mockInsert = jest.fn().mockResolvedValue("access-log-id");

jest.mock("@/lib/db/env", () => ({
  getD1Database: jest.fn().mockReturnValue({}),
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: jest.fn(() => ({
    query: mockQuery,
    queryOne: mockQueryOne,
    insert: mockInsert,
  })),
}));

jest.mock("@/lib/auth/middleware", () => {
  const { makeRequireRoleImpl } = require("../helpers/api-test-utils");
  return { requireRole: jest.fn(makeRequireRoleImpl) };
});

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {} },
}));

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

const sendToN8nAsync = jest.fn();
jest.mock("@/lib/notifications/n8n-webhook", () => ({
  sendToN8nAsync: (...args: unknown[]) => sendToN8nAsync(...args),
}));

const alertMatt = jest.fn();
jest.mock("@/lib/notifications/twilio-sms", () => ({
  alertMatt: (...args: unknown[]) => alertMatt(...args),
}));

describe("Safety Access Log API", () => {
  let POST: (req: NextRequest) => Promise<Response>;
  let GET: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    ({ POST, GET } = await import("@/app/api/safety/access-log/route"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue([
      {
        id: "log-1",
        event_type: "login",
        role: "admin",
        user_name: "Admin User",
        resource_key: "login",
        resource_title: "Admin logged in",
        job_id: null,
        ip_address: "203.0.113.10",
        user_agent: "Mozilla/5.0",
        accessed_at: "2026-04-17T00:00:00.000Z",
      },
    ]);
    mockQueryOne.mockResolvedValue({ total: 1 });
    mockInsert.mockResolvedValue("log-new-id");
  });

  describe("POST /api/safety/access-log", () => {
    it("returns 401 when unauthenticated", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/access-log", {
          method: "POST",
          body: { event_type: "login" },
        }),
      );
      expect(res.status).toBe(401);
    });

    it("returns 400 for invalid event_type", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/access-log", {
          method: "POST",
          headers: authedHeaders,
          body: { event_type: "invalid_event" },
        }),
      );
      expect(res.status).toBe(400);
    });

    it("logs event and sends SMS for critical event types", async () => {
      const req = makeRequest("http://localhost/api/safety/access-log", {
        method: "POST",
        headers: {
          ...authedHeaders,
          "X-Test-Role": "worker",
          "X-Forwarded-For": "198.51.100.20, 10.0.0.1",
          "User-Agent": "TestAgent/1.0",
        },
        body: {
          event_type: "form_submit",
          resource_key: "jha",
          resource_title: "Submitted Driver License DL WA-1234567",
          job_id: "job-17",
        },
      });

      const res = await POST(req);
      expect(res.status).toBe(201);
      expect(mockInsert).toHaveBeenCalledTimes(1);
      expect(alertMatt).toHaveBeenCalledTimes(1);

      const insertArgs = mockInsert.mock.calls[0];
      expect(insertArgs[0]).toBe("safety_access_log");
      expect(insertArgs[1].ip_address).toBe("198.51.100.20");
      expect(insertArgs[1].resource_title).toContain(
        "Driver License DL [REDACTED_DL]",
      );
    });

    it("queues digest item for non-critical events", async () => {
      const res = await POST(
        makeRequest("http://localhost/api/safety/access-log", {
          method: "POST",
          headers: {
            ...authedHeaders,
            "X-Test-Role": "traveler",
          },
          body: {
            event_type: "download",
            resource_key: "manual-section-04",
            resource_title: "Section 04 Download",
          },
        }),
      );

      expect(res.status).toBe(201);
      expect(alertMatt).not.toHaveBeenCalled();
      expect(sendToN8nAsync).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /api/safety/access-log", () => {
    it("returns 401 when unauthenticated", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/access-log"),
      );
      expect(res.status).toBe(401);
    });

    it("returns 403 for non-admin users", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/safety/access-log", {
          headers: {
            ...authedHeaders,
            "X-Test-Role": "superintendent",
          },
        }),
      );
      expect(res.status).toBe(403);
    });

    it("returns filtered data and total for admin", async () => {
      const res = await GET(
        makeRequest(
          "http://localhost/api/safety/access-log?event_type=login&limit=50",
          {
            headers: authedHeaders,
          },
        ),
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.total).toBe(1);
      expect(body.data).toHaveLength(1);
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mockQueryOne).toHaveBeenCalledTimes(1);
    });

    it("validates date filters", async () => {
      const res = await GET(
        makeRequest(
          "http://localhost/api/safety/access-log?from_date=not-a-date",
          {
            headers: authedHeaders,
          },
        ),
      );
      expect(res.status).toBe(400);
    });
  });
});
