/**
 * Consolidated Form Submission Handler
 * Handles validation, database storage, and email notifications for all form types
 */

import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type D1Database } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export interface FormSubmissionConfig<T = unknown> {
  tableName: string;
  emailSubject: (data: T) => string;
  emailMessage: (data: T) => string;
  validateFields: (data: T) => { valid: boolean; error?: string };
  transformData: (data: T) => unknown;
  submissionType: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: {
    id: string;
    emailSent: boolean;
  };
  error?: string;
}

/**
 * Generic form submission handler that consolidates:
 * - Field validation
 * - Database storage
 * - Email notifications
 * - Error handling
 */
export async function handleFormSubmission<T = unknown>(
  request: NextRequest,
  config: FormSubmissionConfig<T>,
): Promise<NextResponse> {
  try {
    const data = (await request.json()) as T;

    // Validate required fields
    const validation = config.validateFields(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Invalid form data" },
        { status: 400 },
      );
    }

    // Generate unique ID
    const submissionId = crypto.randomUUID();

    // Transform and prepare data for database
    const transformed = (config.transformData(data) ?? {}) as Record<
      string,
      unknown
    >;
    const dbRecord = {
      id: submissionId,
      ...transformed,
      status: "new",
    };

    // Store in D1 database (best-effort)
    let dbStored = false;
    try {
      const DB = getD1Database();
      if (DB) {
        // Cast unknown to D1Database - getD1Database returns unknown for flexibility
        const db = createDbClient({ DB: DB as D1Database });
        await db.insert(config.tableName, dbRecord as Record<string, unknown>);
        logger.info(`${config.submissionType} stored in database`, {
          id: submissionId,
          table: config.tableName,
        });
        dbStored = true;
      } else {
        logger.info(
          `D1 database not available, ${config.submissionType} not persisted`,
          { id: submissionId },
        );
      }
    } catch (dbErr: unknown) {
      const error = dbErr instanceof Error ? dbErr : new Error(String(dbErr));
      logger.error(
        `Failed to store ${config.submissionType} in database:`,
        error,
      );
      // Continue to send email even if DB fails
    }

    // Send email notification
    let emailSent = false;
    try {
      const emailSubject = config.emailSubject(data as T);
      const emailMessage = config.emailMessage(data as T);

      const formData = data as unknown as Record<string, unknown>;
      const name =
        typeof formData["name"] === "string"
          ? (formData["name"] as string)
          : `${typeof formData["firstName"] === "string" ? (formData["firstName"] as string) : ""} ${typeof formData["lastName"] === "string" ? (formData["lastName"] as string) : ""}`.trim();

      const emailPayload = {
        name: name || undefined,
        email:
          typeof formData["email"] === "string"
            ? (formData["email"] as string)
            : undefined,
        phone:
          typeof formData["phone"] === "string"
            ? (formData["phone"] as string)
            : undefined,
        subject: emailSubject,
        message: emailMessage,
        type: config.submissionType.toLowerCase().replace(/\s+/g, "-"),
        recipientEmail: "office@mhc-gc.com",
        metadata: {
          submissionId,
          submissionType: config.submissionType,
        },
      } as Record<string, unknown>;

      const emailResponse = await fetch(
        `${request.nextUrl.origin}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        },
      );

      if (emailResponse.ok) {
        emailSent = true;
        logger.info(`${config.submissionType} email sent successfully`);
      } else {
        logger.error(`Failed to send ${config.submissionType} email`);
      }
    } catch (emailErr: unknown) {
      const error =
        emailErr instanceof Error ? emailErr : new Error(String(emailErr));
      logger.error(`Error sending ${config.submissionType} email:`, error);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: `${config.submissionType} received successfully`,
      data: {
        id: submissionId,
        emailSent,
        dbStored,
      },
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error(`Error processing ${config.submissionType}:`, error);
    return NextResponse.json(
      { error: `Failed to process ${config.submissionType}` },
      { status: 500 },
    );
  }
}

/**
 * Generic GET handler for retrieving submissions
 */
export async function handleFormRetrieval(
  tableName: string,
  orderBy = "created_at",
  limit = 100,
): Promise<NextResponse> {
  try {
    const DB = getD1Database();
    if (DB) {
      // Cast unknown to D1Database - getD1Database returns unknown for flexibility
      const db = createDbClient({ DB: DB as D1Database });
      const submissions = await db.query(
        `SELECT * FROM ${tableName} ORDER BY ${orderBy} DESC LIMIT ${limit}`,
      );

      return NextResponse.json({
        success: true,
        data: submissions,
        count: submissions.length,
      });
    }

    // Fallback for local development
    return NextResponse.json({
      success: true,
      data: [],
      count: 0,
      message: "D1 database not available in this environment",
    });
  } catch (_error) {
    const err = _error as unknown;
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error(`Error fetching from ${tableName}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch submissions` },
      { status: 500 },
    );
  }
}
