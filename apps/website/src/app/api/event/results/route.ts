import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import {
  CDN_TEAM_LABELS,
  CDN_TEAM_OPTIONS,
} from "@/lib/events/cool-desert-nights";

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

interface BbqTally {
  id: string;
  label: string;
  count: number;
}

interface HiltiEntry {
  name: string;
  phone: string;
  guess: number;
}

interface EventLeadRow {
  id: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  metadata: string | null;
  created_at: string;
}

interface SqliteTableInfoRow {
  name: string;
}

function parseLeadMetadata(
  metadata: string | null,
): Record<string, string | number | boolean | null> {
  if (!metadata) return {};

  try {
    return JSON.parse(metadata) as Record<
      string,
      string | number | boolean | null
    >;
  } catch {
    return {};
  }
}

function normalizeVoteId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed in CDN_TEAM_LABELS) {
    return trimmed;
  }

  const matched = Object.entries(CDN_TEAM_LABELS).find(
    ([, label]) => label === trimmed,
  );
  return matched?.[0] ?? trimmed;
}

function buildEmptyResults() {
  return {
    totalEntries: 0,
    bbqTallies: CDN_TEAM_OPTIONS.map((team) => ({
      id: team.id,
      label: team.label,
      count: 0,
    })) satisfies BbqTally[],
    hiltiEntries: [] as HiltiEntry[],
  };
}

async function loadFallbackEntries(
  client: ReturnType<typeof createDbClient>,
): Promise<BoothRow[]> {
  try {
    return await loadLeadEntries(client);
  } catch (error) {
    logger.warn("EventResults: leads fallback unavailable", error);
    return [];
  }
}

async function loadLeadEntries(
  client: ReturnType<typeof createDbClient>,
): Promise<BoothRow[]> {
  const leads = await client.query<EventLeadRow>(
    `SELECT id, contact_name, email, phone, metadata, created_at
     FROM leads
     WHERE source = 'event_booth'
     ORDER BY created_at ASC`,
  );

  const seenPhone = new Set<string>();
  return leads
    .map((lead) => {
      const meta = parseLeadMetadata(lead.metadata);
      return {
        full_name: String(meta["full_name"] ?? lead.contact_name ?? "").trim(),
        phone: String(meta["phone"] ?? lead.phone ?? "").trim(),
        hilti_guess: Number(meta["hilti_guess"] ?? 0),
        bbq_vote: normalizeVoteId(String(meta["bbq_vote"] ?? "")),
        submitted_at: lead.created_at,
      } satisfies BoothRow;
    })
    .filter((row) => {
      if (!row.phone || seenPhone.has(row.phone)) return false;
      seenPhone.add(row.phone);
      return true;
    });
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
    let rows: BoothRow[];

    const tableInfo = await client.query<SqliteTableInfoRow>(
      `PRAGMA table_info(booth_entries)`,
    );
    const boothColumns = new Set(tableInfo.map((row) => row.name));

    const hasSmokeVote = boothColumns.has("smoke_n_shine_vote");
    const hasLegacyVote = boothColumns.has("bbq_vote");

    const boothRows =
      hasSmokeVote || hasLegacyVote
        ? await client.query<BoothRow>(
            `SELECT b.full_name, b.phone, b.hilti_guess,
                    b.${hasSmokeVote ? "smoke_n_shine_vote" : "bbq_vote"} AS bbq_vote,
                    b.submitted_at
             FROM booth_entries b
             INNER JOIN (
               SELECT phone, MIN(id) AS min_id
               FROM booth_entries
               GROUP BY phone
             ) dedup ON b.id = dedup.min_id
             ORDER BY b.submitted_at ASC`,
          )
        : [];

    const leadRows = await loadLeadEntries(client);

    if (boothRows.length > 0) {
      const seenPhone = new Set<string>();
      rows = [...boothRows, ...leadRows].filter((row) => {
        if (!row.phone || seenPhone.has(row.phone)) return false;
        seenPhone.add(row.phone);
        return true;
      });
    } else {
      rows = leadRows;
    }

    if (rows.length === 0) {
      rows = await loadFallbackEntries(client);
    }

    // BBQ tallies
    const tallyMap: Record<string, number> = {};
    for (const team of CDN_TEAM_OPTIONS) {
      tallyMap[team.id] = 0;
    }
    for (const row of rows) {
      const voteId = normalizeVoteId(row.bbq_vote);
      if (voteId in tallyMap) {
        tallyMap[voteId] = (tallyMap[voteId] ?? 0) + 1;
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
    return NextResponse.json(buildEmptyResults());
  }
}
