import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type Consultation } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireAuth } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import {
  notFound,
  createSuccessResponse,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

async function handleGET(
  _request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;

    // Retrieve consultation from D1 database
    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const consultation = await db.queryOne<Consultation>(
      `SELECT * FROM consultations WHERE id = ?`,
      id,
    );

    if (!consultation) {
      return notFound("Consultation not found");
    }

    return createSuccessResponse(consultation);
  } catch (error) {
    logger.error("Error fetching consultation:", error);
    return internalServerError("Failed to fetch consultation");
  }
}

async function handlePUT(
  request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;
    const updates = await request.json();

    // Update consultation in D1 database
    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const updated = await db.update("consultations", id, updates);

    if (!updated) {
      return notFound("Consultation not found");
    }

    // Fetch updated record
    const consultation = await db.queryOne<Consultation>(
      `SELECT * FROM consultations WHERE id = ?`,
      id,
    );

    return createSuccessResponse(consultation, "Consultation updated");
  } catch (error) {
    logger.error("Error updating consultation:", error);
    return internalServerError("Failed to update consultation");
  }
}

async function handleDELETE(
  _request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;

    // Delete consultation from D1 database
    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const deleted = await db.delete("consultations", id);

    if (!deleted) {
      return notFound("Consultation not found");
    }

    return createSuccessResponse({ id }, "Consultation deleted");
  } catch (error) {
    logger.error("Error deleting consultation:", error);
    return internalServerError("Failed to delete consultation");
  }
}

// Apply authentication protection to all routes
export const GET = requireAuth(handleGET);
export const PUT = requireAuth(handlePUT);
export const DELETE = requireAuth(handleDELETE);
