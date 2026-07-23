import { type NextRequest, NextResponse } from "next/server";

import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";
import { isValidEmail } from "@/lib/utils/validation";
import { withSecurity } from "@/middleware/security";

const EVENT_SLUG = "operation-cast-recover-2026";
const VETERAN_CAPACITY = 50;

type RegistrationRequest = {
  registrationType?: "veteran" | "captain";
  fullName?: string;
  branchOfService?: string;
  phone?: string;
  email?: string;
  emergencyContact?: string;
  tshirtSize?: string;
  vesselTypeLength?: string;
  passengerCapacity?: number;
  gearNotes?: string;
  website?: string;
};

const clean = (value: string | undefined, maxLength: number) =>
  value?.trim().slice(0, maxLength) ?? "";

async function handleGET() {
  const DB = getD1Database();
  if (!DB) {
    return NextResponse.json({
      confirmedVeterans: 0,
      capacity: VETERAN_CAPACITY,
    });
  }

  try {
    const db = createDbClient({ DB });
    const result = await db.queryOne<{ count: number }>(
      `SELECT COUNT(*) AS count
       FROM cast_recover_registrations
       WHERE event_slug = ? AND registration_type = 'veteran' AND roster_status = 'confirmed'`,
      EVENT_SLUG,
    );

    return NextResponse.json({
      confirmedVeterans: result?.count ?? 0,
      capacity: VETERAN_CAPACITY,
    });
  } catch (error) {
    logger.error("Cast & Recover availability lookup failed", error);
    return NextResponse.json({
      confirmedVeterans: 0,
      capacity: VETERAN_CAPACITY,
    });
  }
}

async function handlePOST(request: NextRequest) {
  try {
    const data = (await request.json()) as RegistrationRequest;

    if (data.website) {
      return NextResponse.json({ success: true, rosterStatus: "received" });
    }

    const registrationType = data.registrationType;
    const fullName = clean(data.fullName, 120);
    const phone = clean(data.phone, 30);
    const email = clean(data.email, 160).toLowerCase();

    if (
      !registrationType ||
      !["veteran", "captain"].includes(registrationType) ||
      !fullName ||
      !phone ||
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        { error: "Please complete all required contact fields." },
        { status: 400 },
      );
    }

    const branchOfService = clean(data.branchOfService, 80);
    const emergencyContact = clean(data.emergencyContact, 160);
    const tshirtSize = clean(data.tshirtSize, 10);
    const vesselTypeLength = clean(data.vesselTypeLength, 160);
    const passengerCapacity = Number(data.passengerCapacity);
    const gearNotes = clean(data.gearNotes, 1000);

    if (
      registrationType === "veteran" &&
      (!branchOfService || !emergencyContact || !tshirtSize)
    ) {
      return NextResponse.json(
        { error: "Branch, emergency contact, and T-shirt size are required." },
        { status: 400 },
      );
    }

    if (
      registrationType === "captain" &&
      (!vesselTypeLength ||
        !Number.isInteger(passengerCapacity) ||
        passengerCapacity < 3 ||
        passengerCapacity > 6)
    ) {
      return NextResponse.json(
        {
          error:
            "Vessel details and a passenger capacity from 3 to 6 are required.",
        },
        { status: 400 },
      );
    }

    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Registration service is temporarily unavailable." },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const id = crypto.randomUUID();

    await db.execute(
      `INSERT INTO cast_recover_registrations (
        id, event_slug, registration_type, full_name, branch_of_service,
        phone, email, emergency_contact, tshirt_size, vessel_type_length,
        passenger_capacity, gear_notes, roster_status
      )
      SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        CASE
          WHEN ? = 'captain' THEN 'received'
          WHEN (
            SELECT COUNT(*) FROM cast_recover_registrations
            WHERE event_slug = ? AND registration_type = 'veteran' AND roster_status = 'confirmed'
          ) < ? THEN 'confirmed'
          ELSE 'alternate'
        END`,
      id,
      EVENT_SLUG,
      registrationType,
      fullName,
      branchOfService || null,
      phone,
      email,
      emergencyContact || null,
      tshirtSize || null,
      vesselTypeLength || null,
      registrationType === "captain" ? passengerCapacity : null,
      gearNotes || null,
      registrationType,
      EVENT_SLUG,
      VETERAN_CAPACITY,
    );

    const saved = await db.queryOne<{ roster_status: string }>(
      "SELECT roster_status FROM cast_recover_registrations WHERE id = ?",
      id,
    );

    return NextResponse.json({
      success: true,
      rosterStatus: saved?.roster_status ?? "received",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNIQUE")) {
      return NextResponse.json(
        { error: "This email is already registered for this portal." },
        { status: 409 },
      );
    }

    logger.error("Cast & Recover registration failed", error);
    return NextResponse.json(
      { error: "We could not complete registration. Please try again." },
      { status: 500 },
    );
  }
}

export const GET = withSecurity(handleGET);
export const POST = rateLimit(rateLimitPresets.public)(
  withSecurity(handlePOST),
);
