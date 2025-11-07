/**
 * Consolidated Form Submission Handler
 * Handles validation, database storage, and email notifications for all form types
 */

import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export interface FormSubmissionConfig<T = any> {
  tableName: string;
  emailSubject: (data: T) => string;
  emailMessage: (data: T) => string;
  validateFields: (data: T) => { valid: boolean; error?: string };
  transformData: (data: T) => any;
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
export async function handleFormSubmission<T = any>(
  request: NextRequest,
  config: FormSubmissionConfig<T>,
): Promise<NextResponse> {
  try {
    const data: T = await request.json();

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
    const dbRecord = {
      id: submissionId,
      ...config.transformData(data),
      status: "new",
    };

    // Store in D1 database
    let dbStored = false;
    try {
      const DB = getD1Database();
      if (DB) {
        const db = createDbClient({ DB });
        await db.insert(config.tableName, dbRecord);
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
    } catch (dbError) {
      logger.error(
        `Failed to store ${config.submissionType} in database:`,
        dbError,
      );
      // Continue to send email even if DB fails
    }

    // Send email notification
    let emailSent = false;
    try {
      const emailSubject = config.emailSubject(data);
      const emailMessage = config.emailMessage(data);

      const emailResponse = await fetch(
        `${request.nextUrl.origin}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:
              (data as any).name ||
              `${(data as any).firstName || ""} ${(data as any).lastName || ""}`.trim(),
            email: (data as any).email,
            phone: (data as any).phone,
            subject: emailSubject,
            message: emailMessage,
            type: config.submissionType.toLowerCase().replace(/\s+/g, "-"),
            recipientEmail: "office@mhc-gc.com",
            metadata: {
              submissionId,
              submissionType: config.submissionType,
            },
          }),
        },
      );

      if (emailResponse.ok) {
        emailSent = true;
        logger.info(`${config.submissionType} email sent successfully`);
      } else {
        logger.error(`Failed to send ${config.submissionType} email`);
      }
    } catch (emailError) {
      logger.error(`Error sending ${config.submissionType} email:`, emailError);
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
  } catch (error) {
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
      const db = createDbClient({ DB });
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
  } catch (error) {
    logger.error(`Error fetching from ${tableName}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch submissions` },
      { status: 500 },
    );
  }
}
