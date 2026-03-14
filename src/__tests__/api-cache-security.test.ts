/**
 * @jest-environment node
 *
 * API Cache Security Guard
 *
 * Asserts that all non-GET API routes processed by the middleware return
 * Cache-Control: no-store, preventing contact submissions, auth tokens, and
 * form data from being stored in browser caches or Cloudflare edge caches.
 *
 * MHC Core Value: Integrity — mutation responses must never be cached.
 *
 * Coverage:
 *   - POST, PUT, DELETE, PATCH to /api/* must produce no-store
 *   - GET /api/* must not produce a publicly-cacheable header
 *   - All known mutation endpoints are enumerated explicitly
 */

import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Mock securityMiddleware so cache-header logic can be tested in isolation.
// The security middleware is an internal concern; what this test cares about
// is the cache header that the outer middleware applies to the response.
// ---------------------------------------------------------------------------
jest.mock("../../src/middleware/security", () => ({
  securityMiddleware: jest.fn(async () => {
    // Return a bare pass-through response – identical to what the real
    // middleware returns when a request has no security violations.
    const { NextResponse } =
      require("next/server") as typeof import("next/server");
    return NextResponse.next();
  }),
}));

// Import middleware AFTER mocks are registered so jest.mock hoisting takes effect.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { middleware } =
  require("../../middleware") as typeof import("../../middleware");

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/** Every HTTP method that can mutate server state. */
const MUTATION_METHODS = ["POST", "PUT", "DELETE", "PATCH"] as const;

/**
 * Every API route that accepts state-mutating requests.
 * Keep this list in sync with route.ts exports under src/app/api/.
 */
const MUTATION_ROUTES = [
  "/api/contact",
  "/api/consultations",
  "/api/consultations/test-id",
  "/api/job-applications",
  "/api/newsletter",
  "/api/upload/resume",
  "/api/auth/login",
  "/api/auth/admin-login",
  "/api/auth/refresh",
  "/api/track-phone-call",
  "/api/functions/send-email",
  "/api/security/cloudflare",
  "/api/security/events",
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(path: string, method: string): NextRequest {
  return new NextRequest(`http://localhost:3000${path}`, { method });
}

// ---------------------------------------------------------------------------
// Assertions
// ---------------------------------------------------------------------------

describe("Cache-Control: no-store on state-mutating API requests", () => {
  /**
   * Core property: any non-GET verb to any /api/ path must be no-store.
   * Tested directly against the middleware so the guarantee is framework-level.
   */
  test.each(MUTATION_METHODS)(
    "%s /api/contact → Cache-Control: no-store",
    async (method) => {
      const response = await middleware(makeRequest("/api/contact", method));
      expect(response.headers.get("Cache-Control")).toBe("no-store");
    },
  );

  /**
   * Explicit coverage of every registered mutation endpoint with POST.
   * Verifies no endpoint accidentally receives a cacheable header via the middleware.
   */
  test.each(MUTATION_ROUTES)(
    "POST %s → Cache-Control: no-store",
    async (path) => {
      const response = await middleware(makeRequest(path, "POST"));
      expect(response.headers.get("Cache-Control")).toBe("no-store");
    },
  );

  /**
   * Explicit coverage of endpoints that accept PUT / DELETE (e.g. consultations/:id).
   */
  it("PUT /api/consultations/:id → Cache-Control: no-store", async () => {
    const response = await middleware(
      makeRequest("/api/consultations/abc-123", "PUT"),
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("DELETE /api/consultations/:id → Cache-Control: no-store", async () => {
    const response = await middleware(
      makeRequest("/api/consultations/abc-123", "DELETE"),
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  /**
   * Safety net: GET /api/* must NOT produce a public cache directive.
   * We don't mandate a specific value for GETs, only that responses cannot
   * be stored and replayed publicly (which would serve stale analytics/auth
   * status to arbitrary visitors).
   */
  it("GET /api/security/status → Cache-Control must not be public", async () => {
    const response = await middleware(
      makeRequest("/api/security/status", "GET"),
    );
    const header = response.headers.get("Cache-Control") ?? "";
    expect(header).not.toContain("public");
  });

  it("GET /api/analytics/dashboard → Cache-Control must not be public", async () => {
    const response = await middleware(
      makeRequest("/api/analytics/dashboard", "GET"),
    );
    const header = response.headers.get("Cache-Control") ?? "";
    expect(header).not.toContain("public");
  });
});
