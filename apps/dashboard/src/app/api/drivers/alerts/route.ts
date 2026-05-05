/**
 * Driver Alerts API
 * GET /api/drivers/alerts – returns drivers needing attention
 * (expiring licenses, overdue MVR checks, pending authorizations)
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type AuthorizedDriver } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";

export const dynamic = "force-dynamic";

async function handleGET(_request: NextRequest, _user: JWTUser) {
  try {
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const today = new Date().toISOString().split("T")[0];

    // Licenses expiring within 90 days
    const ninetyDaysOut = new Date();
    ninetyDaysOut.setDate(ninetyDaysOut.getDate() + 90);
    const expiringCutoff = ninetyDaysOut.toISOString().split("T")[0];

    const expiringLicenses = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE license_expiration_date <= ?
         AND authorization_status != 'revoked'
       ORDER BY license_expiration_date ASC`,
      expiringCutoff,
    );

    // Overdue MVR checks (next_mvr_check_date <= today)
    const overdueMvr = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE next_mvr_check_date IS NOT NULL
         AND next_mvr_check_date <= ?
         AND authorization_status != 'revoked'
       ORDER BY next_mvr_check_date ASC`,
      today,
    );

    // Pending authorizations
    const pendingAuth = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE authorization_status = 'pending'
       ORDER BY created_at ASC`,
    );

    // Missing consent
    const missingConsent = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE consent_on_file = 0
         AND authorization_status != 'revoked'
       ORDER BY employee_name ASC`,
    );

    return NextResponse.json({
      success: true,
      data: {
        expiring_licenses: expiringLicenses,
        overdue_mvr: overdueMvr,
        pending_authorization: pendingAuth,
        missing_consent: missingConsent,
        summary: {
          expiring_count: expiringLicenses.length,
          overdue_mvr_count: overdueMvr.length,
          pending_count: pendingAuth.length,
          missing_consent_count: missingConsent.length,
        },
      },
    });
  } catch (error) {
    logger.error("Error fetching driver alerts:", error);
    return NextResponse.json(
      { error: "Failed to fetch driver alerts" },
      { status: 500 },
    );
  }
}

export const GET = requireRole(["admin", "manager"], withSecurity(handleGET));
