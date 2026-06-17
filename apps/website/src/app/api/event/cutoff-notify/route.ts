import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { captureServerException } from "@/lib/monitoring/sentry-server";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { ALERT_RECIPIENTS, sendSms } from "@/lib/notifications/twilio-sms";
import { sendEmail, type EmailAttachment } from "@/lib/email/email-service";
import {
  CDN_TEAM_LABELS,
  CDN_TEAM_OPTIONS,
} from "@/lib/events/cool-desert-nights";

export const dynamic = "force-dynamic";

const CUTOFF_RECIPIENT_EMAIL = "matt@mhc-gc.com";
const DEFAULT_EVENT_DATE_PT = "2026-06-27";

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

interface TeamVoteCount {
  teamId: string;
  label: string;
  votes: number;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function isMissingTableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("no such table");
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
      "CutoffNotify: booth_entries missing; falling back to leads metadata",
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

function getPtDateTimeParts(date: Date): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return {
    date: `${map["year"]}-${map["month"]}-${map["day"]}`,
    time: `${map["hour"]}:${map["minute"]}`,
  };
}

function shouldRunForToday(now = new Date()): { ok: boolean; reason?: string } {
  const configuredEventDate =
    process.env["CDN26_EVENT_DATE_PT"] ?? DEFAULT_EVENT_DATE_PT;
  const { date, time } = getPtDateTimeParts(now);

  if (date !== configuredEventDate) {
    return {
      ok: false,
      reason: `Skipping: PT date ${date} does not match event date ${configuredEventDate}`,
    };
  }

  if (time < "13:30") {
    return {
      ok: false,
      reason: `Skipping: PT time ${time} is before 13:30 cutoff`,
    };
  }

  return { ok: true };
}

function computePeopleChoice(entries: BoothRow[]): {
  winnerLabel: string;
  voteCount: number;
  isTie: boolean;
  tiedLabels: string[];
  breakdown: TeamVoteCount[];
} {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    const next = (counts.get(entry.bbq_vote) ?? 0) + 1;
    counts.set(entry.bbq_vote, next);
  }

  const breakdown = CDN_TEAM_OPTIONS.map((team) => ({
    teamId: team.id,
    label: team.label,
    votes: counts.get(team.id) ?? 0,
  })).sort((a, b) => b.votes - a.votes || a.label.localeCompare(b.label));

  const topVotes = breakdown[0]?.votes ?? 0;
  const tiedLabels = breakdown
    .filter((team) => team.votes === topVotes && topVotes > 0)
    .map((team) => team.label);

  return {
    winnerLabel: tiedLabels[0] ?? "No qualifying votes",
    voteCount: topVotes,
    isTie: tiedLabels.length > 1,
    tiedLabels,
    breakdown,
  };
}

function csvEscape(value: string | number): string {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function buildSortedGuessCsv(entries: BoothRow[]): string {
  const rows = [...entries].sort((a, b) => {
    const guessDiff = a.hilti_guess - b.hilti_guess;
    if (guessDiff !== 0) return guessDiff;
    return (
      new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
    );
  });

  const header =
    "rank_by_guess,hilti_guess,full_name,phone,email,bbq_vote,bbq_vote_label,submitted_at";
  const lines = rows.map((row, index) =>
    [
      index + 1,
      row.hilti_guess,
      csvEscape(row.full_name),
      csvEscape(row.phone),
      csvEscape(row.email),
      csvEscape(row.bbq_vote),
      csvEscape(CDN_TEAM_LABELS[row.bbq_vote] ?? row.bbq_vote),
      csvEscape(row.submitted_at),
    ].join(","),
  );

  return [header, ...lines].join("\r\n");
}

async function sendCutoffNotifications() {
  const entries = await loadDedupedEntries();
  if (entries.length === 0) {
    return {
      success: false,
      status: 400,
      error: "No event entries available at cutoff",
    };
  }

  const peopleChoice = computePeopleChoice(entries);
  const nowPt = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "short",
    timeStyle: "short",
  });

  const smsLine = peopleChoice.isTie
    ? `PEOPLE'S CHOICE TIE (${peopleChoice.voteCount} votes): ${peopleChoice.tiedLabels.join(" / ")}`
    : `PEOPLE'S CHOICE WINNER (${peopleChoice.voteCount} votes): ${peopleChoice.winnerLabel}`;

  const sms = [
    `CDN 2026 CUTOFF @ ${nowPt} PT`,
    smsLine,
    "Share with Announcing Judge Jeremy.",
    `Deduped entries: ${entries.length}`,
  ].join("\n");

  const smsResult = await sendSms({
    to: ALERT_RECIPIENTS.matt,
    message: `MHC: ${sms}`,
  });

  if (!smsResult.success) {
    return {
      success: false,
      status: 502,
      error: `SMS failed: ${smsResult.error ?? "unknown error"}`,
    };
  }

  const csv = buildSortedGuessCsv(entries);
  const csvAttachment: EmailAttachment = {
    filename: `cdn-2026-fastener-guesses-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}.csv`,
    content: Buffer.from(csv, "utf-8").toString("base64"),
    contentType: "text/csv",
  };

  const emailResult = await sendEmail({
    to: CUTOFF_RECIPIENT_EMAIL,
    subject:
      "CDN 2026 cutoff report — People's Choice + sorted fastener guesses",
    html: `<p>Matt,</p>
<p>Cutoff report generated at ${nowPt} PT.</p>
<p><strong>${smsLine}</strong></p>
<p>Attached CSV is sorted in numerical order by fastener guess for transparent on-stage counting.</p>
<p>Please provide the People's Choice result to Announcing Judge Jeremy.</p>`,
    text:
      `Matt,\n\n` +
      `Cutoff report generated at ${nowPt} PT.\n` +
      `${smsLine}\n\n` +
      "Attached CSV is sorted in numerical order by fastener guess for transparent on-stage counting.\n" +
      "Please provide the People's Choice result to Announcing Judge Jeremy.",
    attachments: [csvAttachment],
  });

  if (!emailResult.success) {
    return {
      success: false,
      status: 502,
      error: `Email failed: ${emailResult.error ?? "unknown error"}`,
    };
  }

  return {
    success: true,
    status: 200,
    data: {
      peopleChoiceWinner: {
        label: peopleChoice.winnerLabel,
        votes: peopleChoice.voteCount,
        tie: peopleChoice.isTie,
        tiedLabels: peopleChoice.tiedLabels,
      },
      voteBreakdown: peopleChoice.breakdown,
      totalEntries: entries.length,
      textedTo: ALERT_RECIPIENTS.matt,
      emailedTo: CUTOFF_RECIPIENT_EMAIL,
      smsMessageId: smsResult.messageId,
      emailMessageId: emailResult.messageId,
    },
  };
}

function isAuthorizedByCronSecret(request: NextRequest): boolean {
  const cronSecret = process.env["CRON_SECRET"];
  if (!cronSecret) return true;

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return token.length > 0 && timingSafeEqual(token, cronSecret);
}

function isAuthorizedByAdminToken(request: NextRequest): boolean {
  const adminToken = process.env["ADMIN_EXPORT_TOKEN"];
  if (!adminToken) return false;

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return token.length > 0 && timingSafeEqual(token, adminToken);
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedByCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gate = shouldRunForToday();
  if (!gate.ok) {
    logger.info("CutoffNotify: skipped by date/time gate", {
      reason: gate.reason,
    });
    return NextResponse.json({
      success: true,
      skipped: true,
      reason: gate.reason,
    });
  }

  try {
    const result = await sendCutoffNotifications();
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ success: true, ...result.data });
  } catch (error) {
    logger.error("CutoffNotify GET error:", error);
    captureServerException(error, { route: "/api/event/cutoff-notify GET" });
    return NextResponse.json(
      { error: "Failed cutoff notification" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedByAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await sendCutoffNotifications();
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ success: true, ...result.data });
  } catch (error) {
    logger.error("CutoffNotify POST error:", error);
    captureServerException(error, { route: "/api/event/cutoff-notify POST" });
    return NextResponse.json(
      { error: "Failed cutoff notification" },
      { status: 500 },
    );
  }
}
