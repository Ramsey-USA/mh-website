import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { captureServerException } from "@/lib/monitoring/sentry-server";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { ALERT_RECIPIENTS, sendSms } from "@/lib/notifications/twilio-sms";
import {
  CDN_TEAM_LABELS,
  CDN_TEAM_OPTIONS,
  normalizeCdnVoteId,
} from "@/lib/events/cool-desert-nights";
import { badRequest, createSuccessResponse } from "@/lib/api/responses";

export const dynamic = "force-dynamic";

interface BoothRow {
  id: number | string;
  full_name: string;
  phone: string;
  email: string;
  hilti_guess: number;
  bbq_vote: string;
  submitted_at: string;
}

interface EventLeadRow {
  id: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  metadata: string | null;
  created_at: string;
}

interface WinnersRequest {
  actualHiltiCount?: number;
}

interface TeamVoteCount {
  teamId: string;
  label: string;
  votes: number;
}

function isMissingTableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("no such table");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function extractBearerToken(request: NextRequest): string | null {
  const auth = request.headers.get("authorization") ?? "";
  const [scheme, token] = auth.split(" ");
  if (scheme?.toLowerCase() === "bearer" && token) return token;
  return null;
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

async function loadDedupedEntries(): Promise<BoothRow[]> {
  const db = getD1Database();
  if (!db) {
    return [];
  }

  const client = createDbClient({ DB: db });

  try {
    return await client.query<BoothRow>(
      `SELECT b.id, b.full_name, b.phone, b.email,
              b.hilti_guess, b.bbq_vote, b.submitted_at
       FROM booth_entries b
       INNER JOIN (
         SELECT phone, MIN(id) AS min_id
         FROM booth_entries
         GROUP BY phone
       ) dedup ON b.id = dedup.min_id
       ORDER BY b.submitted_at ASC`,
    );
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    logger.warn(
      "WinnersText: booth_entries missing; falling back to leads metadata",
    );

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
          id: lead.id,
          full_name: String(
            meta["full_name"] ?? lead.contact_name ?? "",
          ).trim(),
          phone: String(meta["phone"] ?? lead.phone ?? "").trim(),
          email: String(meta["email"] ?? lead.email ?? "").trim(),
          hilti_guess: Number(meta["hilti_guess"] ?? 0),
          bbq_vote: String(meta["bbq_vote"] ?? ""),
          submitted_at: lead.created_at,
        } satisfies BoothRow;
      })
      .filter((row) => {
        if (!row.phone || seenPhone.has(row.phone)) return false;
        seenPhone.add(row.phone);
        return true;
      });
  }
}

function pickHiltiWinner(
  entries: BoothRow[],
  actualHiltiCount: number,
): { winner: BoothRow; difference: number } {
  let winner = entries[0]!;
  let bestDiff = Math.abs(winner.hilti_guess - actualHiltiCount);

  for (const entry of entries.slice(1)) {
    const diff = Math.abs(entry.hilti_guess - actualHiltiCount);
    if (diff < bestDiff) {
      winner = entry;
      bestDiff = diff;
      continue;
    }

    if (diff === bestDiff) {
      const winnerTime = new Date(winner.submitted_at).getTime();
      const entryTime = new Date(entry.submitted_at).getTime();
      if (entryTime < winnerTime) {
        winner = entry;
        bestDiff = diff;
      }
    }
  }

  return { winner, difference: bestDiff };
}

function pickBbqWinner(entries: BoothRow[]): {
  winnerId: string;
  winnerLabel: string;
  voteCount: number;
  isTie: boolean;
  tiedLabels: string[];
  breakdown: TeamVoteCount[];
} {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    const voteId = normalizeCdnVoteId(entry.bbq_vote);
    if (!voteId) continue;
    const next = (counts.get(voteId) ?? 0) + 1;
    counts.set(voteId, next);
  }

  let topId = "";
  let topVotes = 0;
  for (const [id, count] of counts) {
    if (count > topVotes) {
      topId = id;
      topVotes = count;
    }
  }

  const tied = [...counts.entries()]
    .filter(([, count]) => count === topVotes)
    .map(([id]) => CDN_TEAM_LABELS[id] ?? id);

  const breakdown = CDN_TEAM_OPTIONS.map((team) => ({
    teamId: team.id,
    label: team.label,
    votes: counts.get(team.id) ?? 0,
  })).sort((a, b) => b.votes - a.votes || a.label.localeCompare(b.label));

  return {
    winnerId: topId,
    winnerLabel: CDN_TEAM_LABELS[topId] ?? topId,
    voteCount: topVotes,
    isTie: tied.length > 1,
    tiedLabels: tied,
    breakdown,
  };
}

function resolveActualHiltiCount(
  requestedCount: number | undefined,
): number | null {
  if (Number.isInteger(requestedCount)) {
    return requestedCount as number;
  }

  const envValue = process.env["CDN26_HILTI_ACTUAL_COUNT"];
  if (!envValue) {
    return null;
  }

  const parsed = Number.parseInt(envValue, 10);
  if (!Number.isInteger(parsed)) {
    return null;
  }

  return parsed;
}

export async function POST(request: NextRequest) {
  const configuredToken = process.env["ADMIN_EXPORT_TOKEN"];
  if (!configuredToken) {
    return NextResponse.json(
      { error: "Admin export token not configured" },
      { status: 503 },
    );
  }

  const providedToken = extractBearerToken(request);
  if (!providedToken || !timingSafeEqual(providedToken, configuredToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as WinnersRequest;
    const actualHiltiCount = resolveActualHiltiCount(payload.actualHiltiCount);
    if (
      !Number.isInteger(actualHiltiCount) ||
      (actualHiltiCount as number) < 1 ||
      (actualHiltiCount as number) > 9999
    ) {
      return badRequest(
        "actualHiltiCount must be an integer between 1 and 9999 (or set CDN26_HILTI_ACTUAL_COUNT)",
      );
    }

    const entries = await loadDedupedEntries();
    if (entries.length === 0) {
      return badRequest("No event entries available to compute winners");
    }

    const hilti = pickHiltiWinner(entries, actualHiltiCount as number);
    const bbq = pickBbqWinner(entries);

    const nowPt = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      dateStyle: "short",
      timeStyle: "short",
    });

    const bbqLine = bbq.isTie
      ? `BBQ WINNER TIE (${bbq.voteCount} votes): ${bbq.tiedLabels.join(" / ")}`
      : `BBQ WINNER (${bbq.voteCount} votes): ${bbq.winnerLabel}`;

    const sms = [
      `CDN 2026 RESULTS @ ${nowPt} PT`,
      `Hilti actual: ${actualHiltiCount as number}`,
      `HILTI WINNER: ${hilti.winner.full_name} (${hilti.winner.phone}) guess ${hilti.winner.hilti_guess}, off by ${hilti.difference}`,
      bbqLine,
      `BBQ COUNT: ${bbq.breakdown.map((team) => `${team.label}=${team.votes}`).join(", ")}`,
      `Total deduped entries: ${entries.length}`,
    ].join("\n");

    const smsResult = await sendSms({
      to: ALERT_RECIPIENTS.matt,
      message: `MHC: ${sms}`,
    });

    if (!smsResult.success) {
      logger.warn("WinnersText: SMS send failed", { error: smsResult.error });
      return NextResponse.json(
        {
          error: "Winners were computed, but SMS delivery failed",
          details: smsResult.error ?? "Unknown SMS error",
        },
        { status: 502 },
      );
    }

    return createSuccessResponse(
      {
        hiltiWinner: {
          name: hilti.winner.full_name,
          phone: hilti.winner.phone,
          guess: hilti.winner.hilti_guess,
          difference: hilti.difference,
        },
        bbqWinner: {
          label: bbq.winnerLabel,
          votes: bbq.voteCount,
          tie: bbq.isTie,
          tiedLabels: bbq.tiedLabels,
        },
        bbqBreakdown: bbq.breakdown,
        actualHiltiCount,
        totalEntries: entries.length,
        textedTo: ALERT_RECIPIENTS.matt,
        messageId: smsResult.messageId,
      },
      "Winners calculated and text dispatch requested",
    );
  } catch (error) {
    logger.error("WinnersText POST error:", error);
    captureServerException(error, { route: "/api/event/winners-text POST" });
    return NextResponse.json(
      { error: "Failed to compute or text winners" },
      { status: 500 },
    );
  }
}
