import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { CDN_TEAM_OPTIONS } from "@/lib/events/cool-desert-nights";

export const dynamic = "force-dynamic";

/**
 * POST /api/event/results
 * Body: { password: string }
 *
 * Validates the supplied password against ADMIN_EXPORT_TOKEN, then returns:
 *  - BBQ vote tallies (sorted highest to lowest)
 *  - Hilti entries (sorted ascending by guess, for easy winner lookup)
 *  - Total unique entry count
 */

interface BoothRow {
  full_name: string;
  phone: string;
  hilti_guess: number;
  bbq_vote: string;
  submitted_at: string;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(request: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────
  const configuredToken = process.env["ADMIN_EXPORT_TOKEN"];
  if (!configuredToken) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || !timingSafeEqual(body.password, configuredToken)) {
    logger.warn("EventResults: invalid password attempt");
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  // ── Query D1 ──────────────────────────────────────────────────────────
  const db = getD1Database();
  if (!db) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 },
    );
  }

  try {
    const client = createDbClient({ DB: db });

    // Deduplicate by phone (first entry wins), same logic as admin-export
    const rows = await client.query<BoothRow>(
      `SELECT b.full_name, b.phone, b.hilti_guess, b.bbq_vote, b.submitted_at
       FROM booth_entries b
       INNER JOIN (
         SELECT phone, MIN(id) AS min_id
         FROM booth_entries
         GROUP BY phone
       ) dedup ON b.id = dedup.min_id
       ORDER BY b.submitted_at ASC`,
    );

    // BBQ tallies
    const tallyMap: Record<string, number> = {};
    for (const team of CDN_TEAM_OPTIONS) {
      tallyMap[team.id] = 0;
    }
    for (const row of rows) {
      if (row.bbq_vote in tallyMap) {
        tallyMap[row.bbq_vote]++;
      }
    }
    const bbqTallies = CDN_TEAM_OPTIONS.map((team) => ({
      id: team.id,
      label: team.label,
      count: tallyMap[team.id] ?? 0,
    })).sort((a, b) => b.count - a.count);

    // Hilti entries sorted ascending so Matt can find closest to actual count
    const hiltiEntries = rows
      .map((r) => ({
        name: r.full_name,
        phone: r.phone,
        guess: r.hilti_guess,
      }))
      .sort((a, b) => a.guess - b.guess);

    return NextResponse.json({
      totalEntries: rows.length,
      bbqTallies,
      hiltiEntries,
    });
  } catch (error) {
    logger.error("EventResults: query error", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}
