import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { captureServerException } from "@/lib/monitoring/sentry-server";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { CDN_VALID_TEAM_IDS } from "@/lib/events/cool-desert-nights";
import {
  badRequest,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";
import { isValidEmail } from "@/lib/utils/validation";

export const dynamic = "force-dynamic";

/** Strict 10-digit US phone (digits only, no separators) */
const PHONE_RE = /^\d{10}$/;
const EVENT_SOURCE = "event_booth";
const EVENT_LABEL = "Cool Desert Nights 2026 Booth Entry";

interface BoothEntryRequest {
  fullName: string;
  phone: string;
  email: string;
  hiltiguess: number;
  bbqVote: string;
  hiltiContactOptIn?: boolean;
  mhcProjectInquiryOptIn?: boolean;
  cachedLocally?: boolean;
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

function captureServerExceptionSafe(
  error: unknown,
  context: { route: string; extra?: Record<string, unknown> },
) {
  try {
    captureServerException(error, context);
  } catch (captureError) {
    logger.warn("BoothEntry: failed to capture exception telemetry", {
      error:
        captureError instanceof Error
          ? captureError.message
          : String(captureError),
      route: context.route,
    });
  }
}

async function handlePOST(request: NextRequest) {
  try {
    const data: BoothEntryRequest = await request.json();

    // ── Required field presence ──────────────────────────────────────────────
    if (!data.fullName || !data.phone || !data.email) {
      return badRequest("Missing required fields: fullName, phone, email");
    }
    if (data.hiltiguess === undefined || data.hiltiguess === null) {
      return badRequest("Missing required field: hiltiguess");
    }
    if (!data.bbqVote) {
      return badRequest("Missing required field: bbqVote");
    }

    // ── Length guards ────────────────────────────────────────────────────────
    if (data.fullName.length > 200) return badRequest("Name is too long");
    if (data.email.length > 254) return badRequest("Email is too long");
    if (data.phone.length > 15) return badRequest("Phone is too long");

    // ── Format validation ────────────────────────────────────────────────────
    if (!PHONE_RE.test(data.phone)) {
      return badRequest("Phone must be exactly 10 digits with no separators");
    }
    if (!isValidEmail(data.email)) {
      return badRequest("Invalid email address");
    }
    if (
      !Number.isInteger(data.hiltiguess) ||
      data.hiltiguess < 1 ||
      data.hiltiguess > 9999
    ) {
      return badRequest(
        "Hilti guess must be a whole number between 1 and 9999",
      );
    }
    if (!CDN_VALID_TEAM_IDS.has(data.bbqVote)) {
      return badRequest("Invalid BBQ vote selection");
    }

    // ── Persist to D1 ────────────────────────────────────────────────────────
    const db = getD1Database();
    if (!db) {
      logger.warn(
        "BoothEntry: D1 not available; entry will rely on localStorage cache",
      );
      captureServerExceptionSafe(
        new Error("D1 database binding not available for booth entry"),
        { route: "/api/event/booth-entry POST" },
      );
      // Degrade gracefully — the client already cached to localStorage
      return createSuccessResponse(
        { stored: false, cached: data.cachedLocally ?? false },
        "Entry recorded (offline mode — data cached locally)",
      );
    }

    const client = createDbClient({ DB: db });
    const hiltiContactOptIn = data.hiltiContactOptIn === true;
    const mhcProjectInquiryOptIn = data.mhcProjectInquiryOptIn === true;

    let boothEntryId: string | null = null;
    let boothEntryStored = false;
    try {
      boothEntryId = await client.insert("booth_entries", {
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        hilti_guess: data.hiltiguess,
        bbq_vote: data.bbqVote,
        hilti_contact_opt_in: hiltiContactOptIn ? 1 : 0,
        mhc_project_inquiry_opt_in: mhcProjectInquiryOptIn ? 1 : 0,
        cached_locally: data.cachedLocally ? 1 : 0,
      });
      boothEntryStored = true;
    } catch (entryError) {
      if (isMissingTableError(entryError)) {
        logger.warn(
          "BoothEntry: booth_entries table missing; will store lead mirror only",
        );
      } else if (!isMissingColumnError(entryError)) {
        throw entryError;
      } else {
        // Backward-compatible path for environments where migration 0019
        // has not been applied yet.
        logger.warn(
          "BoothEntry: opt-in columns missing in booth_entries; storing without opt-in columns",
        );
        boothEntryId = await client.insert("booth_entries", {
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          hilti_guess: data.hiltiguess,
          bbq_vote: data.bbqVote,
          cached_locally: data.cachedLocally ? 1 : 0,
        });
        boothEntryStored = true;
      }
    }

    const projectDescription = `Hilti guess: ${data.hiltiguess}; BBQ vote: ${data.bbqVote}; Hilti contact opt-in: ${hiltiContactOptIn}; MHC project inquiry opt-in: ${mhcProjectInquiryOptIn}; entry secured for ${EVENT_LABEL}`;
    const leadMetadata = {
      event: EVENT_LABEL,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      hilti_guess: data.hiltiguess,
      bbq_vote: data.bbqVote,
      hilti_contact_opt_in: hiltiContactOptIn,
      mhc_project_inquiry_opt_in: mhcProjectInquiryOptIn,
      cached_locally: data.cachedLocally ?? false,
    };

    let leadStored = false;
    try {
      await client.insert("leads", {
        source: EVENT_SOURCE,
        source_id: boothEntryId,
        contact_name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: null,
        project_type: EVENT_LABEL,
        project_location: "Cool Desert Nights 2026",
        project_description: projectDescription,
        status: "new",
        estimated_value: null,
        probability: 50,
        priority: "medium",
        assigned_to: "unassigned",
        follow_up_date: null,
        last_contact_date: null,
        notes: JSON.stringify([]),
        lost_reason: null,
        metadata: JSON.stringify(leadMetadata),
      });
      leadStored = true;
    } catch (leadError) {
      logger.warn(
        "BoothEntry: stored event row but failed to mirror into leads",
        {
          error:
            leadError instanceof Error ? leadError.message : String(leadError),
          boothEntryId,
        },
      );
      captureServerExceptionSafe(leadError, {
        route: "/api/event/booth-entry POST",
        extra: { context: "lead_mirror_insert_failed", boothEntryId },
      });
    }

    if (!boothEntryStored && !leadStored) {
      return createSuccessResponse(
        { stored: false, cached: data.cachedLocally ?? false },
        "Entry recorded (offline mode — data cached locally)",
      );
    }

    logger.info("BoothEntry: entry stored", {
      phone: `***${data.phone.slice(-4)}`,
      bbqVote: data.bbqVote,
      boothEntryId,
    });

    return createSuccessResponse(
      { stored: true, cached: data.cachedLocally ?? false },
      "Entry secured!",
    );
  } catch (error) {
    logger.error("BoothEntry POST error:", error);
    captureServerExceptionSafe(error, { route: "/api/event/booth-entry POST" });
    return internalServerError("Failed to record entry. Please try again.");
  }
}

export const POST = rateLimit(rateLimitPresets.public)(handlePOST);
