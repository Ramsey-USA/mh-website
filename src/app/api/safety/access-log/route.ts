/**
 * Safety Access Log API
 * POST /api/safety/access-log — log hub access activity (admin/superintendent/worker/traveler)
 * GET  /api/safety/access-log — list activity events with filters (admin only)
 */

import { type NextRequest, NextResponse } from "next/server";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";
import {
  type AccessEventType,
  logAccessEvent,
  normalizeNullableText,
  VALID_ACCESS_EVENT_TYPES,
} from "@/lib/safety/log-access-event";

export const dynamic = "force-dynamic";

interface AccessLogRow {
  id: string;
  event_type: AccessEventType;
  role: string;
  user_name: string;
  resource_key: string | null;
  resource_title: string | null;
  job_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  accessed_at: string;
}

function parseLimit(rawLimit: string | null): number {
  if (!rawLimit) {
    return 500;
  }

  const parsed = Number.parseInt(rawLimit, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return 500;
  }

  return Math.min(parsed, 1000);
}

function isIsoDate(value: string | null): value is string {
  if (!value) {
    return false;
  }

  return !Number.isNaN(Date.parse(value));
}

async function handlePOST(request: NextRequest, user: JWTUser) {
  try {
    const body = (await request.json()) as {
      event_type?: string;
      resource_key?: unknown;
      resource_title?: unknown;
      job_id?: unknown;
    };

    const eventType = body?.event_type;
    if (
      !eventType ||
      !VALID_ACCESS_EVENT_TYPES.has(eventType as AccessEventType)
    ) {
      return NextResponse.json(
        {
          error:
            "event_type must be one of: login, logout, download, form_view, form_submit, manual_view, joining_view, compliance_warning",
        },
        { status: 400 },
      );
    }

    const payload: {
      event_type: AccessEventType;
      role: string;
      user_name: string;
      resource_key?: string;
      resource_title?: string;
      job_id?: string;
    } = {
      event_type: eventType as AccessEventType,
      role: user.role ?? "unknown",
      user_name: user.name ?? user.uid,
    };
    if (typeof body.resource_key === "string") {
      payload.resource_key = body.resource_key;
    }
    if (typeof body.resource_title === "string") {
      payload.resource_title = body.resource_title;
    }
    if (typeof body.job_id === "string") payload.job_id = body.job_id;

    await logAccessEvent(request, payload);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    logger.error("Error logging safety access event:", error);
    return NextResponse.json(
      { error: "Failed to log access event" },
      { status: 500 },
    );
  }
}

async function handleGET(request: NextRequest, _user: JWTUser) {
  try {
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const { searchParams } = new URL(request.url);

    const role = normalizeNullableText(searchParams.get("role"), 32);
    const eventType = normalizeNullableText(searchParams.get("event_type"), 32);
    const fromDate = searchParams.get("from_date");
    const toDate = searchParams.get("to_date");
    const limit = parseLimit(searchParams.get("limit"));

    if (
      eventType &&
      !VALID_ACCESS_EVENT_TYPES.has(eventType as AccessEventType)
    ) {
      return NextResponse.json(
        { error: "event_type filter is invalid" },
        { status: 400 },
      );
    }

    if (fromDate && !isIsoDate(fromDate)) {
      return NextResponse.json(
        { error: "from_date must be a valid ISO date" },
        { status: 400 },
      );
    }

    if (toDate && !isIsoDate(toDate)) {
      return NextResponse.json(
        { error: "to_date must be a valid ISO date" },
        { status: 400 },
      );
    }

    const db = createDbClient({ DB });

    const conditions: string[] = [];
    const params: string[] = [];

    if (role) {
      conditions.push("role = ?");
      params.push(role);
    }

    if (eventType) {
      conditions.push("event_type = ?");
      params.push(eventType);
    }

    if (fromDate) {
      conditions.push("accessed_at >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      conditions.push("accessed_at <= ?");
      params.push(toDate);
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const data = await db.query<AccessLogRow>(
      `SELECT * FROM safety_access_log ${where} ORDER BY accessed_at DESC LIMIT ?`,
      ...params,
      limit,
    );

    const totalRow = await db.queryOne<{ total: number | string }>(
      `SELECT COUNT(*) as total FROM safety_access_log ${where}`,
      ...params,
    );

    return NextResponse.json({
      success: true,
      data,
      total: Number(totalRow?.total ?? 0),
    });
  } catch (error) {
    logger.error("Error fetching safety access logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch access log" },
      { status: 500 },
    );
  }
}

export const POST = rateLimit(rateLimitPresets.api)(
  requireRole(
    ["admin", "superintendent", "worker", "traveler"],
    withSecurity(handlePOST),
  ),
);

export const GET = rateLimit(rateLimitPresets.api)(
  requireRole(["admin"], withSecurity(handleGET)),
);
