import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type Consultation } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;

    // Retrieve consultation from D1 database
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const consultation = await db.queryOne<Consultation>(
      `SELECT * FROM consultations WHERE id = ?`,
      id,
    );

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    logger.error("Error fetching consultation:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const updates = await request.json();

    // Update consultation in D1 database
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const updated = await db.update("consultations", id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 },
      );
    }

    // Fetch updated record
    const consultation = await db.queryOne<Consultation>(
      `SELECT * FROM consultations WHERE id = ?`,
      id,
    );

    return NextResponse.json({
      success: true,
      message: "Consultation updated",
      data: consultation,
    });
  } catch (error) {
    logger.error("Error updating consultation:", error);
    return NextResponse.json(
      { error: "Failed to update consultation" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;

    // Delete consultation from D1 database
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const deleted = await db.delete("consultations", id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Consultation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consultation deleted",
    });
  } catch (error) {
    logger.error("Error deleting consultation:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation" },
      { status: 500 },
    );
  }
}
