import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { captureServerException } from "@/lib/monitoring/sentry-server";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export const dynamic = "force-dynamic";

/**
 * Admin CSV export for Cool Desert Nights 2026 booth entries.
 *
 * Authentication: Bearer token compared in constant time against
 * the ADMIN_EXPORT_TOKEN environment variable.
 *
 * Usage:
 *   GET /api/event/admin-export
 *   Authorization: Bearer <ADMIN_EXPORT_TOKEN>
 *
 * The EventWizard admin panel passes the token via this header.
 * The endpoint deduplicates rows by phone number (first entry wins)
 * then returns a CSV attachment ready to copy-paste or download.
 */

interface BoothRow {
  id: number | string;
  full_name: string;
  phone: string;
  email: string;
  hilti_guess: number;
  bbq_vote: string;
  hilti_contact_opt_in: number;
  mhc_project_inquiry_opt_in: number;
  cached_locally: number;
  submitted_at: string;
}

function isMissingColumnError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("no such column") ||
    message.includes("has no column named")
  );
}

function isMissingTableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("no such table");
}

interface EventLeadRow {
  id: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  metadata: string | null;
  created_at: string;
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

function csvEscape(value: string | number): string {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function buildCsv(rows: BoothRow[]): string {
  const header =
    "id,full_name,phone,email,hilti_guess,bbq_vote,hilti_contact_opt_in,mhc_project_inquiry_opt_in,cached_locally,submitted_at";
  const lines = rows.map((r) =>
    [
      r.id,
      csvEscape(r.full_name),
      csvEscape(r.phone),
      csvEscape(r.email),
      r.hilti_guess,
      csvEscape(r.bbq_vote),
      r.hilti_contact_opt_in,
      r.mhc_project_inquiry_opt_in,
      r.cached_locally,
      csvEscape(r.submitted_at),
    ].join(","),
  );
  return [header, ...lines].join("\r\n");
}

/** Constant-time string comparison to resist timing attacks */
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

export async function GET(request: NextRequest) {
  // ── Authentication ──────────────────────────────────────────────────────
  const configuredToken = process.env["ADMIN_EXPORT_TOKEN"];
  if (!configuredToken) {
    logger.warn("AdminExport: ADMIN_EXPORT_TOKEN env var not set");
    return NextResponse.json(
      { error: "Admin export not configured on this environment" },
      { status: 503 },
    );
  }

  const providedToken = extractBearerToken(request);
  if (!providedToken || !timingSafeEqual(providedToken, configuredToken)) {
    logger.warn("AdminExport: invalid or missing token");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Fetch from D1 ────────────────────────────────────────────────────────
  try {
    const db = getD1Database();
    if (!db) {
      return NextResponse.json(
        { error: "Database not available on this environment" },
        { status: 503 },
      );
    }

    const client = createDbClient({ DB: db });

    // Deduplicate: keep the earliest submission per unique phone number
    let rows: BoothRow[];
    try {
      const result = await client.query<BoothRow>(
        `SELECT b.id, b.full_name, b.phone, b.email,
                b.hilti_guess, b.bbq_vote, b.hilti_contact_opt_in,
                b.mhc_project_inquiry_opt_in, b.cached_locally, b.submitted_at
         FROM booth_entries b
         INNER JOIN (
           SELECT phone, MIN(id) AS min_id
           FROM booth_entries
           GROUP BY phone
         ) dedup ON b.id = dedup.min_id
         ORDER BY b.submitted_at ASC`,
      );
      rows = result;
    } catch (queryError) {
      if (isMissingTableError(queryError)) {
        logger.warn(
          "AdminExport: booth_entries table missing; falling back to event_booth leads export",
        );

        const leads = await client.query<EventLeadRow>(
          `SELECT id, contact_name, email, phone, metadata, created_at
           FROM leads
           WHERE source = 'event_booth'
           ORDER BY created_at ASC`,
        );

        const seenPhone = new Set<string>();
        rows = leads
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
              hilti_contact_opt_in:
                meta["hilti_contact_opt_in"] === true ||
                meta["hilti_contact_opt_in"] === 1
                  ? 1
                  : 0,
              mhc_project_inquiry_opt_in:
                meta["mhc_project_inquiry_opt_in"] === true ||
                meta["mhc_project_inquiry_opt_in"] === 1
                  ? 1
                  : 0,
              cached_locally:
                meta["cached_locally"] === true || meta["cached_locally"] === 1
                  ? 1
                  : 0,
              submitted_at: lead.created_at,
            } as BoothRow;
          })
          .filter((row) => {
            const phone = row.phone;
            if (!phone || seenPhone.has(phone)) return false;
            seenPhone.add(phone);
            return true;
          });
      } else if (!isMissingColumnError(queryError)) {
        throw queryError;
      } else {
        logger.warn(
          "AdminExport: opt-in columns missing in booth_entries; exporting with default opt-in values",
        );
        const fallbackResult = await client.query<
          Omit<BoothRow, "hilti_contact_opt_in" | "mhc_project_inquiry_opt_in">
        >(
          `SELECT b.id, b.full_name, b.phone, b.email,
                  b.hilti_guess, b.bbq_vote, b.cached_locally, b.submitted_at
           FROM booth_entries b
           INNER JOIN (
             SELECT phone, MIN(id) AS min_id
             FROM booth_entries
             GROUP BY phone
           ) dedup ON b.id = dedup.min_id
           ORDER BY b.submitted_at ASC`,
        );

        rows = fallbackResult.map((r) => ({
          ...r,
          hilti_contact_opt_in: 0,
          mhc_project_inquiry_opt_in: 0,
        }));
      }
    }

    const csv = buildCsv(rows);
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    const filename = `cdn-2026-booth-entries-${timestamp}.csv`;

    logger.info("AdminExport: CSV generated", { rowCount: rows.length });

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        // Prevent caching of sensitive data
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        // Not indexed by search engines
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (error) {
    logger.error("AdminExport GET error:", error);
    captureServerException(error, { route: "/api/event/admin-export GET" });
    return NextResponse.json(
      { error: "Failed to generate export" },
      { status: 500 },
    );
  }
}
