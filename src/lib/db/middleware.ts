/**
 * Database middleware for Next.js API routes
 * Provides standardized database availability checks and client creation
 */

import { NextResponse, type NextRequest } from "next/server";
import { getD1Database } from "@/lib/db/env";
import { createDbClient, type DbClient } from "@/lib/db/client";

/**
 * Response returned when database is not available
 */
export function databaseUnavailableResponse() {
  return NextResponse.json(
    { error: "Database not available" },
    { status: 503 },
  );
}

/**
 * Higher-order function that wraps an API route handler with database availability check.
 * Automatically creates the database client and passes it to the handler.
 *
 * @example
 * ```ts
 * async function handleGET(request: NextRequest, db: DbClient): Promise<NextResponse> {
 *   const users = await db.query("SELECT * FROM users");
 *   return NextResponse.json({ success: true, data: users });
 * }
 *
 * export const GET = withDatabase(handleGET);
 * ```
 */
export function withDatabase<TArgs extends unknown[]>(
  handler: (
    request: NextRequest,
    db: DbClient,
    ...args: TArgs
  ) => Response | Promise<Response>,
) {
  return async (request: NextRequest, ...args: TArgs): Promise<Response> => {
    const DB = getD1Database();
    if (!DB) {
      return databaseUnavailableResponse();
    }

    const db = createDbClient({ DB });
    const result = await handler(request, db, ...args);
    return result;
  };
}

/**
 * Variant for route handlers that also receive a JWTUser parameter (from requireRole middleware).
 * The database client is injected after the user parameter.
 *
 * @example
 * ```ts
 * async function handleGET(request: NextRequest, user: JWTUser, db: DbClient): Promise<NextResponse> {
 *   const data = await db.query("SELECT * FROM items WHERE owner = ?", user.id);
 *   return NextResponse.json({ success: true, data });
 * }
 *
 * export const GET = requireRole(["admin"], withDatabaseAuth(handleGET));
 * ```
 */
export function withDatabaseAuth<TUser, TArgs extends unknown[]>(
  handler: (
    request: NextRequest,
    user: TUser,
    db: DbClient,
    ...args: TArgs
  ) => Response | Promise<Response>,
) {
  return async (
    request: NextRequest,
    user: TUser,
    ...args: TArgs
  ): Promise<Response> => {
    const DB = getD1Database();
    if (!DB) {
      return databaseUnavailableResponse();
    }

    const db = createDbClient({ DB });
    const result = await handler(request, user, db, ...args);
    return result;
  };
}
