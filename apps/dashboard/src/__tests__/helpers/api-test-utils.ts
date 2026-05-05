/**
 * Shared utilities for API route unit tests.
 *
 * Import makeRequest and authedHeaders instead of duplicating them in every
 * API test file. The requireRole mock still lives in each test file (jest.mock
 * is statically hoisted and cannot be extracted), but the role-enforcement
 * logic can reference makeRequireRoleImpl exported here.
 */

import { NextRequest, NextResponse } from "next/server";

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

export const mockWorkerUser = {
  uid: "worker-1",
  role: "worker",
  name: "Field Worker",
  email: "worker@test.com",
};

export const mockTravelerUser = {
  uid: "traveler-1",
  role: "traveler",
  name: "Travelers Insurance",
  email: "traveler@test.com",
};

// ── Request factory ───────────────────────────────────────────────────────────

export function makeRequest(
  url: string,
  options:
    | {
        method?: string;
        body?: unknown;
        headers?: Record<string, string>;
      }
    | undefined = undefined,
): NextRequest {
  const resolvedOptions = options ?? {};

  return new NextRequest(url, {
    method: resolvedOptions.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(resolvedOptions.headers ?? {}),
    },
    ...(resolvedOptions.body !== undefined && {
      body: JSON.stringify(resolvedOptions.body),
    }),
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
  return (req: NextRequest, ctx?: unknown) => {
    const auth = req.headers.get("Authorization");
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const role = req.headers.get("X-Test-Role") ?? "admin";
    if (!roles.includes(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    let user: {
      uid: string;
      role: string;
      name: string;
      email: string;
    };

    if (role === "superintendent") {
      user = {
        uid: "super-1",
        role: "superintendent",
        name: "Bob Super",
        email: "super@test.com",
      };
    } else if (role === "worker") {
      user = {
        uid: "worker-1",
        role: "worker",
        name: "Field Worker",
        email: "worker@test.com",
      };
    } else if (role === "traveler") {
      user = {
        uid: "traveler-1",
        role: "traveler",
        name: "Travelers Insurance",
        email: "traveler@test.com",
      };
    } else if (role === "manager") {
      user = {
        uid: "mgr-1",
        role: "manager",
        name: "Manager",
        email: "mgr@test.com",
      };
    } else {
      user = {
        uid: "admin-1",
        role: "admin",
        name: "Admin User",
        email: "admin@test.com",
      };
    }

    return handler(req, user, ctx);
  };
}
