/**
 * Safety Downloads Log API
 * POST /api/safety/downloads — log a PDF download event (any authenticated user)
 * GET  /api/safety/downloads — list download events with filters (admin only)
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

interface DownloadLogEntry {
  id: string;
  section_key: string;
  section_title: string | null;
  download_type: "section" | "form";
  downloaded_by: string;
  job_id: string | null;
  downloaded_at: string;
}

async function handleGET(request: NextRequest, _user: JWTUser) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionKey = searchParams.get("section_key");
    const downloadedBy = searchParams.get("downloaded_by");
    const downloadType = searchParams.get("download_type");

    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const conditions: string[] = [];
    const params: string[] = [];

    if (sectionKey) {
      conditions.push("section_key = ?");
      params.push(sectionKey);
    }
    if (downloadedBy) {
      conditions.push("downloaded_by = ?");
      params.push(downloadedBy);
    }
    if (downloadType) {
      conditions.push("download_type = ?");
      params.push(downloadType);
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const sql = `
      SELECT * FROM safety_download_log
      ${where}
      ORDER BY downloaded_at DESC
      LIMIT 500
    `;

    const logs = await db.query<DownloadLogEntry>(sql, ...params);
    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    logger.error("Error fetching download log:", error);
    return NextResponse.json(
      { error: "Failed to fetch download log" },
      { status: 500 },
    );
  }
}

async function handlePOST(request: NextRequest, user: JWTUser) {
  try {
    const body = await request.json();
    const { section_key, section_title, download_type, job_id } = body ?? {};

    if (typeof section_key !== "string" || !section_key) {
      return NextResponse.json(
        { error: "section_key is required" },
        { status: 400 },
      );
    }
    if (download_type !== "section" && download_type !== "form") {
      return NextResponse.json(
        { error: "download_type must be 'section' or 'form'" },
        { status: 400 },
      );
    }

    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    await db.insert("safety_download_log", {
      id: crypto.randomUUID(),
      section_key,
      section_title: typeof section_title === "string" ? section_title : null,
      download_type,
      downloaded_by: user.name ?? user.uid,
      job_id: typeof job_id === "string" && job_id ? job_id : null,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    logger.error("Error logging download:", error);
    return NextResponse.json(
      { error: "Failed to log download" },
      { status: 500 },
    );
  }
}

// GET: admin only — review download activity
export const GET = requireRole(["admin"], withSecurity(handleGET));
// POST: admin/superintendent only — superintendent logs their own download
export const POST = rateLimit(rateLimitPresets.api)(
  requireRole(["admin", "superintendent"], withSecurity(handlePOST)),
);
