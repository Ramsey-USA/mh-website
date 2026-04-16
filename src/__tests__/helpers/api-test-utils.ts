/**
 * Shared utilities for API route unit tests.
 *
 * Import makeRequest and authedHeaders instead of duplicating them in every
 * API test file. The requireRole mock still lives in each test file (jest.mock
 * is statically hoisted and cannot be extracted), but the role-enforcement
 * logic can reference makeRequireRoleImpl exported here.
 */

import { NextRequest } from "next/server";

// ── Auth helpers ──────────────────────────────────────────────────────────────

export const authedHeaders = { Authorization: "Bearer valid-token" };

export const mockAdminUser = {
  uid: "admin-1",
  role: "admin",
  name: "Admin User",
  email: "admin@test.com",
};

export const mockManagerUser = {
  uid: "mgr-1",
  role: "manager",
  name: "Manager User",
  email: "manager@test.com",
};

export const mockSuperUser = {
  uid: "super-1",
  role: "superintendent",
  name: "Bob Super",
  email: "super@test.com",
};

// ── Request factory ───────────────────────────────────────────────────────────

export function makeRequest(
  url: string,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {},
): NextRequest {
  return new NextRequest(url, {
    method: options.method ?? "GET",
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    ...(options.body !== undefined && { body: JSON.stringify(options.body) }),
  });
}

// ── requireRole mock implementation ──────────────────────────────────────────
//
// Usage inside jest.mock factory (cannot be imported directly because jest.mock
// is hoisted, so use require()):
//
//   jest.mock("@/lib/auth/middleware", () => {
//     const { makeRequireRoleImpl } = require("../../helpers/api-test-utils");
//     return { requireRole: jest.fn(makeRequireRoleImpl) };
//   });
//
// The implementation enforces the `roles` array and reads `X-Test-Role` header
// so individual tests can probe role-boundary behaviour without extra mocking.

export function makeRequireRoleImpl(
  roles: string[],
  handler: (req: NextRequest, user: unknown, ctx?: unknown) => unknown,
) {
  return async (req: NextRequest, ctx?: unknown) => {
    const auth = req.headers.get("Authorization");
    if (!auth) {
      // NextResponse imported inline to avoid hoisting issues
      const { NextResponse } =
        require("next/server") as typeof import("next/server");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const role = req.headers.get("X-Test-Role") ?? "admin";
    if (!roles.includes(role)) {
      const { NextResponse } =
        require("next/server") as typeof import("next/server");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const user =
      role === "superintendent"
        ? {
            uid: "super-1",
            role: "superintendent",
            name: "Bob Super",
            email: "super@test.com",
          }
        : role === "manager"
          ? {
              uid: "mgr-1",
              role: "manager",
              name: "Manager",
              email: "mgr@test.com",
            }
          : {
              uid: "admin-1",
              role: "admin",
              name: "Admin User",
              email: "admin@test.com",
            };
    return handler(req, user, ctx);
  };
}
