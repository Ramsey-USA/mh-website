/**
 * Authorized Drivers API – individual record endpoint
 * GET    /api/drivers/[id]  – get single driver (admin/manager)
 * PUT    /api/drivers/[id]  – update driver record (admin only)
 * DELETE /api/drivers/[id]  – revoke driver authorization (admin only)
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type AuthorizedDriver } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import {
  VALID_AUTHORIZATION_STATUSES,
  VALID_MVR_STATUSES,
  VALID_LICENSE_CLASSES,
} from "@/lib/constants/drivers";
import {
  createSuccessResponse,
  badRequest,
  notFound,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

async function handleGET(
  _request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteContext).params;

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const driver = await db.queryOne<AuthorizedDriver>(
      "SELECT * FROM authorized_drivers WHERE id = ?",
      id,
    );

    if (!driver) {
      return notFound("Driver not found");
    }

    return createSuccessResponse(driver);
  } catch (error) {
    logger.error("Error fetching driver:", error);
    return internalServerError("Failed to fetch driver");
  }
}

async function handlePUT(
  request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteContext).params;
    const body = await request.json();

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    // Verify driver exists
    const existing = await db.queryOne<AuthorizedDriver>(
      "SELECT * FROM authorized_drivers WHERE id = ?",
      id,
    );
    if (!existing) {
      return notFound("Driver not found");
    }

    // Validate enum fields if provided
    if (body.mvr_status && !VALID_MVR_STATUSES.includes(body.mvr_status)) {
      return badRequest(
        `mvr_status must be one of: ${VALID_MVR_STATUSES.join(", ")}`,
      );
    }
    if (
      body.authorization_status &&
      !VALID_AUTHORIZATION_STATUSES.includes(body.authorization_status)
    ) {
      return badRequest(
        `authorization_status must be one of: ${VALID_AUTHORIZATION_STATUSES.join(", ")}`,
      );
    }
    if (
      body.license_class &&
      !VALID_LICENSE_CLASSES.includes(body.license_class)
    ) {
      return badRequest(
        `license_class must be one of: ${VALID_LICENSE_CLASSES.join(", ")}`,
      );
    }

    // Build update data from allowed fields only
    const updateData: Record<string, unknown> = {};
    const allowedFields = [
      "employee_name",
      "email",
      "phone",
      "license_number",
      "license_state",
      "license_class",
      "cdl_endorsements",
      "license_expiration_date",
      "last_mvr_check_date",
      "next_mvr_check_date",
      "mvr_status",
      "authorization_status",
      "authorized_by",
      "authorization_date",
      "consent_on_file",
      "notes",
    ];

    for (const field of allowedFields) {
      if (field in body) {
        if (field === "consent_on_file") {
          updateData[field] = body[field] ? 1 : 0;
        } else if (typeof body[field] === "string") {
          updateData[field] = body[field].trim() || null;
        } else {
          updateData[field] = body[field];
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return badRequest("No valid fields to update");
    }

    await db.update("authorized_drivers", id, updateData);

    const updated = await db.queryOne<AuthorizedDriver>(
      "SELECT * FROM authorized_drivers WHERE id = ?",
      id,
    );

    logger.info(`Updated authorized driver: ${id}`);
    return createSuccessResponse(updated);
  } catch (error) {
    logger.error("Error updating driver:", error);
    return internalServerError("Failed to update driver");
  }
}

async function handleDELETE(
  _request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteContext).params;

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    // Verify driver exists
    const existing = await db.queryOne<AuthorizedDriver>(
      "SELECT * FROM authorized_drivers WHERE id = ?",
      id,
    );
    if (!existing) {
      return notFound("Driver not found");
    }

    // Soft delete: set authorization_status to 'revoked'
    await db.update("authorized_drivers", id, {
      authorization_status: "revoked",
    });

    logger.info(
      `Revoked driver authorization: ${id} (${existing.employee_name})`,
    );
    return createSuccessResponse(
      undefined,
      `Authorization revoked for ${existing.employee_name}`,
    );
  } catch (error) {
    logger.error("Error revoking driver:", error);
    return internalServerError("Failed to revoke driver authorization");
  }
}

// GET: admin/manager
export const GET = requireRole(["admin", "manager"], withSecurity(handleGET));
// PUT: admin only
export const PUT = requireRole(["admin"], withSecurity(handlePUT));
// DELETE: admin only (soft delete — sets status to revoked)
export const DELETE = requireRole(["admin"], withSecurity(handleDELETE));
