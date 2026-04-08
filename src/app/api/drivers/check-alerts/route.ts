/**
 * Driver Alert Check – Cron Endpoint
 * GET /api/drivers/check-alerts
 *
 * Designed to be called daily by a Cloudflare Cron Trigger.
 * Checks for expiring licenses, overdue MVR checks, and pending items,
 * then sends a summary email to admins.
 *
 * Protected by CRON_SECRET header to prevent unauthorized access.
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type AuthorizedDriver } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { EmailService } from "@/lib/email/email-service";
import {
  generateLicenseExpiringAlert,
  generateMvrReviewDueAlert,
  generateDriverAlertSummary,
  type DriverAlertEmailData,
} from "@/lib/email/templates";
import { EMAIL_RECIPIENTS } from "@/lib/constants/company";

export const dynamic = "force-dynamic";

function daysUntil(dateStr: string): number {
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const cronSecret = process.env["CRON_SECRET"];
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const emailService = new EmailService();
    const today = new Date().toISOString().split("T")[0];

    // 1. Find licenses expiring within 90 days
    const ninetyDaysOut = new Date();
    ninetyDaysOut.setDate(ninetyDaysOut.getDate() + 90);
    const expiringCutoff = ninetyDaysOut.toISOString().split("T")[0];

    const expiringDrivers = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE license_expiration_date <= ?
         AND authorization_status != 'revoked'
       ORDER BY license_expiration_date ASC`,
      expiringCutoff,
    );

    // 2. Find overdue MVR checks
    const overdueMvr = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE next_mvr_check_date IS NOT NULL
         AND next_mvr_check_date <= ?
         AND authorization_status != 'revoked'
       ORDER BY next_mvr_check_date ASC`,
      today,
    );

    // 3. Count pending & missing consent
    const pendingCount = await db.count("authorized_drivers", {
      column: "authorization_status",
      value: "pending",
    });

    const missingConsentActive = await db.query<AuthorizedDriver>(
      `SELECT * FROM authorized_drivers
       WHERE consent_on_file = 0
         AND authorization_status != 'revoked'`,
    );

    const totalAlerts =
      expiringDrivers.length +
      overdueMvr.length +
      pendingCount +
      missingConsentActive.length;

    if (totalAlerts === 0) {
      logger.info("Driver alert check: no issues found");
      return NextResponse.json({
        success: true,
        message: "No driver alerts to send",
        checked_at: new Date().toISOString(),
      });
    }

    // 4. Send individual urgent alerts for licenses expiring within 7 days
    const urgentDrivers = expiringDrivers.filter(
      (d) => daysUntil(d.license_expiration_date) <= 7,
    );

    for (const driver of urgentDrivers) {
      const days = daysUntil(driver.license_expiration_date);
      const alertData: DriverAlertEmailData = {
        employee_name: driver.employee_name,
        license_number: driver.license_number,
        license_state: driver.license_state,
        ...(driver.license_class
          ? { license_class: driver.license_class }
          : {}),
        license_expiration_date: driver.license_expiration_date,
      };
      const email = generateLicenseExpiringAlert(alertData, days);
      await emailService.sendEmail({
        to: EMAIL_RECIPIENTS.general,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
    }

    // 5. Send individual alerts for overdue MVR checks
    for (const driver of overdueMvr) {
      const alertData: DriverAlertEmailData & { next_mvr_check_date: string } =
        {
          employee_name: driver.employee_name,
          license_number: driver.license_number,
          license_state: driver.license_state,
          ...(driver.license_class
            ? { license_class: driver.license_class }
            : {}),
          license_expiration_date: driver.license_expiration_date,
          next_mvr_check_date: driver.next_mvr_check_date!,
        };
      const email = generateMvrReviewDueAlert(alertData);
      await emailService.sendEmail({
        to: EMAIL_RECIPIENTS.general,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
    }

    // 6. Send daily summary
    const summaryData = {
      expiringLicenses: expiringDrivers.map((d) => ({
        employee_name: d.employee_name,
        license_number: d.license_number,
        license_state: d.license_state,
        ...(d.license_class ? { license_class: d.license_class } : {}),
        license_expiration_date: d.license_expiration_date,
        days_until: daysUntil(d.license_expiration_date),
      })),
      overdueMvr: overdueMvr.map((d) => ({
        employee_name: d.employee_name,
        license_number: d.license_number,
        license_state: d.license_state,
        ...(d.license_class ? { license_class: d.license_class } : {}),
        license_expiration_date: d.license_expiration_date,
        next_mvr_check_date: d.next_mvr_check_date!,
      })),
      pendingCount,
      missingConsentCount: missingConsentActive.length,
    };

    const summaryEmail = generateDriverAlertSummary(summaryData);
    await emailService.sendEmail({
      to: EMAIL_RECIPIENTS.general,
      subject: summaryEmail.subject,
      html: summaryEmail.html,
      text: summaryEmail.text,
    });

    logger.info(
      `Driver alert check complete: ${totalAlerts} issues found, emails sent`,
    );

    return NextResponse.json({
      success: true,
      message: `Processed ${totalAlerts} driver alerts`,
      details: {
        expiring_licenses: expiringDrivers.length,
        urgent_expiring: urgentDrivers.length,
        overdue_mvr: overdueMvr.length,
        pending_authorization: pendingCount,
        missing_consent: missingConsentActive.length,
      },
      checked_at: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("Driver alert check failed:", error);
    return NextResponse.json({ error: "Alert check failed" }, { status: 500 });
  }
}
