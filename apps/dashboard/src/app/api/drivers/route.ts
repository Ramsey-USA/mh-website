/**
 * Authorized Drivers API – collection endpoint
 * GET  /api/drivers  – list all drivers (admin/manager)
 * POST /api/drivers  – create a new driver record (admin only)
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type AuthorizedDriver } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import {
  VALID_AUTHORIZATION_STATUSES,
  VALID_MVR_STATUSES,
  VALID_LICENSE_CLASSES,
} from "@/lib/constants/drivers";
import {
  createSuccessResponse,
  badRequest,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import { HttpStatus } from "@/lib/types/api";

export const dynamic = "force-dynamic";

async function handleGET(request: NextRequest, _user: JWTUser) {
  try {
    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");

    let sql = "SELECT * FROM authorized_drivers";
    const params: string[] = [];

    if (
      status &&
      (VALID_AUTHORIZATION_STATUSES as readonly string[]).includes(status)
    ) {
      sql += " WHERE authorization_status = ?";
      params.push(status);
    }

    sql += " ORDER BY employee_name ASC";

    const drivers = await db.query<AuthorizedDriver>(sql, ...params);

    return createSuccessResponse(drivers);
  } catch (error) {
    logger.error("Error fetching drivers:", error);
    return internalServerError("Failed to fetch drivers");
  }
}

async function handlePOST(request: NextRequest, _user: JWTUser) {
  try {
    const body = await request.json();
    const {
      employee_name,
      email,
      phone,
      license_number,
      license_state,
      license_class,
      cdl_endorsements,
      license_expiration_date,
      last_mvr_check_date,
      next_mvr_check_date,
      mvr_status,
      authorization_status,
      authorized_by,
      authorization_date,
      consent_on_file,
      notes,
    } = body ?? {};

    // Validate required fields
    if (
      typeof employee_name !== "string" ||
      !employee_name.trim() ||
      typeof license_number !== "string" ||
      !license_number.trim() ||
      typeof license_expiration_date !== "string" ||
      !license_expiration_date.trim()
    ) {
      return badRequest(
        "employee_name, license_number, and license_expiration_date are required",
      );
    }

    // Validate enum fields if provided
    if (mvr_status && !VALID_MVR_STATUSES.includes(mvr_status)) {
      return badRequest(
        `mvr_status must be one of: ${VALID_MVR_STATUSES.join(", ")}`,
      );
    }
    if (
      authorization_status &&
      !VALID_AUTHORIZATION_STATUSES.includes(authorization_status)
    ) {
      return badRequest(
        `authorization_status must be one of: ${VALID_AUTHORIZATION_STATUSES.join(", ")}`,
      );
    }
    if (license_class && !VALID_LICENSE_CLASSES.includes(license_class)) {
      return badRequest(
        `license_class must be one of: ${VALID_LICENSE_CLASSES.join(", ")}`,
      );
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const driverData: Record<string, unknown> = {
      employee_name: employee_name.trim(),
      license_number: license_number.trim(),
      license_expiration_date: license_expiration_date.trim(),
      license_state:
        typeof license_state === "string" ? license_state.trim() || "WA" : "WA",
      mvr_status: mvr_status || "pending",
      authorization_status: authorization_status || "pending",
      consent_on_file: consent_on_file ? 1 : 0,
    };

    // Optional string fields
    if (typeof email === "string" && email.trim()) {
      driverData["email"] = email.trim();
    }
    if (typeof phone === "string" && phone.trim()) {
      driverData["phone"] = phone.trim();
    }
    if (typeof license_class === "string" && license_class.trim()) {
      driverData["license_class"] = license_class.trim();
    }
    if (typeof cdl_endorsements === "string" && cdl_endorsements.trim()) {
      driverData["cdl_endorsements"] = cdl_endorsements.trim();
    }
    if (typeof last_mvr_check_date === "string" && last_mvr_check_date.trim()) {
      driverData["last_mvr_check_date"] = last_mvr_check_date.trim();
    }
    if (typeof next_mvr_check_date === "string" && next_mvr_check_date.trim()) {
      driverData["next_mvr_check_date"] = next_mvr_check_date.trim();
    }
    if (typeof authorized_by === "string" && authorized_by.trim()) {
      driverData["authorized_by"] = authorized_by.trim();
    }
    if (typeof authorization_date === "string" && authorization_date.trim()) {
      driverData["authorization_date"] = authorization_date.trim();
    }
    if (typeof notes === "string" && notes.trim()) {
      driverData["notes"] = notes.trim();
    }

    const id = await db.insert("authorized_drivers", driverData);

    const driver = await db.queryOne<AuthorizedDriver>(
      "SELECT * FROM authorized_drivers WHERE id = ?",
      id,
    );

    logger.info(`Created authorized driver: ${employee_name}`);
    return createSuccessResponse(driver, undefined, HttpStatus.CREATED);
  } catch (error) {
    logger.error("Error creating driver:", error);
    return internalServerError("Failed to create driver");
  }
}

// GET: admin/manager only
export const GET = requireRole(["admin", "manager"], withSecurity(handleGET));
// POST: admin only
export const POST = rateLimit(rateLimitPresets.api)(
  requireRole(["admin"], withSecurity(handlePOST)),
);
