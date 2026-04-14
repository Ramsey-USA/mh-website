/**
 * Consolidated Form Submission Handler
 * Handles validation, database storage, and email notifications for all form types
 */

import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import {
  getR2Bucket,
  R2StorageService,
  isSmallEnoughForEmail,
  fileToBase64,
  generateFileKey,
} from "@/lib/cloudflare/r2";
import {
  generateJobApplicationAcknowledgment,
  generateConsultationAcknowledgment,
  generateContactAcknowledgment,
} from "@/lib/email/templates";
import {
  sendToOffice,
  sendToCareers,
  sendAcknowledgment,
  type EmailAttachment,
} from "@/lib/email/email-service";
import { sendToN8nAsync, type FormType } from "@/lib/notifications/n8n-webhook";
import {
  createFormSubmissionResponse,
  createPaginatedResponse,
  internalServerError,
} from "@/lib/api/responses";
import { escapeHtml } from "@/lib/utils/escape-html";

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
        // Database client is now properly typed
        const db = createDbClient({ DB });
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
    } catch (error: unknown) {
      const normalizedError =
        error instanceof Error ? error : new Error(String(error));
      logger.error(
        `Failed to store ${config.submissionType} in database:`,
        normalizedError,
      );
      // Continue to send email even if DB fails (best-effort pattern)
    }

    // Store JSON backup in R2 for job applications (redundant backup)
    let r2BackupStored = false;
    if (config.submissionType === "Job Application") {
      try {
        const bucket = getR2Bucket("FILE_ASSETS");
        if (bucket) {
          const r2Service = new R2StorageService(
            bucket,
            "mh-construction-assets",
          );
          const backupKey = generateFileKey(
            "job-applications",
            `${submissionId}.json`,
          );
          const backupData = JSON.stringify(
            {
              ...dbRecord,
              originalData: data,
              backupCreatedAt: new Date().toISOString(),
            },
            null,
            2,
          );

          const encoded = new TextEncoder().encode(backupData);
          const backupResult = await r2Service.uploadFile(
            encoded.buffer.slice(
              encoded.byteOffset,
              encoded.byteOffset + encoded.byteLength,
            ) as ArrayBuffer,
            backupKey,
            "application/json",
            {
              submissionId,
              type: "job-application-backup",
            },
          );

          if (backupResult.success) {
            r2BackupStored = true;
            logger.info("Job application backed up to R2", {
              id: submissionId,
              key: backupKey,
            });
          }
        }
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error ? error : new Error(String(error));
        logger.error(
          "Failed to backup job application to R2:",
          normalizedError,
        );
        // Continue - this is a supplementary backup (best-effort pattern)
      }
    }

    // Convert data to Record format for email processing
    const formData = data as unknown as Record<string, unknown>;

    // Prepare email content
    const emailSubject = config.emailSubject(data as T);
    const emailMessage = config.emailMessage(data as T);

    // The emailMessage callback returns plain text. When used as the HTML
    // body, escape it to prevent injection and wrap in <pre> for formatting.
    const safeHtml = `<pre style="font-family:sans-serif;white-space:pre-wrap;">${escapeHtml(emailMessage)}</pre>`;

    // Check if this is a job application with a resume that's small enough to attach
    let attachments: EmailAttachment[] | undefined;
    if (
      config.submissionType === "Job Application" &&
      typeof formData["resumeKey"] === "string" &&
      typeof formData["resumeFileSize"] === "number" &&
      isSmallEnoughForEmail(formData["resumeFileSize"] as number)
    ) {
      try {
        const r2Bucket = getR2Bucket("RESUMES");
        const r2Service = new R2StorageService(
          r2Bucket,
          "mh-construction-resumes",
        );

        const resumeResult = await r2Service.getFile(
          formData["resumeKey"] as string,
        );

        if (resumeResult.success && resumeResult.data) {
          const base64Content = await fileToBase64(resumeResult.data);
          attachments = [
            {
              content: base64Content,
              filename: (formData["resumeFileName"] as string) || "resume.pdf",
              contentType: resumeResult.contentType || "application/pdf",
            },
          ];
          logger.info("Resume attached to email (file size within limit)", {
            size: formData["resumeFileSize"],
          });
        }
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error ? error : new Error(String(error));
        logger.error("Failed to attach resume to email:", normalizedError);
        // Continue without attachment - download link will still be in email (best-effort pattern)
      }
    }

    // Send email to appropriate team based on submission type
    // Job applications go to careers team (office, matt, arnold, brittney)
    // Other submissions go to general office team
    const isJobApplication = config.submissionType === "Job Application";
    const emailResult = isJobApplication
      ? await sendToCareers(
          emailSubject,
          { html: safeHtml, text: emailMessage },
          attachments,
        )
      : await sendToOffice(
          emailSubject,
          { html: safeHtml, text: emailMessage },
          false,
          attachments,
        );

    const emailSent = emailResult.success;

    if (!emailSent) {
      logger.error(
        `Failed to send ${config.submissionType} email:`,
        emailResult.error,
      );
      // Continue even if email fails (best-effort pattern)
    }

    // Send acknowledgment email to the applicant/client
    const applicantEmail =
      typeof formData["email"] === "string"
        ? (formData["email"] as string)
        : null;

    if (applicantEmail) {
      let acknowledgment: {
        subject: string;
        html: string;
        text: string;
      } | null = null;

      // Generate appropriate acknowledgment based on submission type
      if (config.submissionType === "Job Application") {
        acknowledgment = generateJobApplicationAcknowledgment({
          firstName:
            (formData["firstName"] as string) ||
            (formData["name"] as string)?.split(" ")[0] ||
            "Applicant",
          lastName:
            (formData["lastName"] as string) ||
            (formData["name"] as string)?.split(" ").slice(1).join(" ") ||
            "",
          position: (formData["position"] as string) || "Position",
          email: applicantEmail,
        });
      } else if (config.submissionType === "Consultation") {
        const consultationData: {
          name: string;
          projectType: string;
          email: string;
          selectedDate?: string;
          selectedTime?: string;
        } = {
          name: (formData["name"] as string) || "Client",
          projectType: (formData["projectType"] as string) || "your project",
          email: applicantEmail,
        };

        // Only add optional properties if they have values
        if (
          formData["selectedDate"] &&
          typeof formData["selectedDate"] === "string"
        ) {
          consultationData.selectedDate = formData["selectedDate"] as string;
        }
        if (
          formData["selectedTime"] &&
          typeof formData["selectedTime"] === "string"
        ) {
          consultationData.selectedTime = formData["selectedTime"] as string;
        }

        acknowledgment = generateConsultationAcknowledgment(consultationData);
      } else {
        // General contact form
        acknowledgment = generateContactAcknowledgment({
          name: (formData["name"] as string) || "there",
          email: applicantEmail,
          type: config.submissionType,
        });
      }

      if (acknowledgment) {
        const ackResult = await sendAcknowledgment(
          applicantEmail,
          acknowledgment.subject,
          { html: acknowledgment.html, text: acknowledgment.text },
        );

        if (ackResult.success) {
          logger.info(`Acknowledgment email sent to ${applicantEmail}`);
        } else {
          logger.error(
            `Failed to send acknowledgment email to ${applicantEmail}:`,
            ackResult.error,
          );
        }
        // Don't fail the request if acknowledgment fails (best-effort pattern)
      }
    }

    // Log storage status summary for job applications
    if (config.submissionType === "Job Application") {
      logger.info("Job application storage summary", {
        id: submissionId,
        d1Stored: dbStored,
        r2Backup: r2BackupStored,
        emailSent,
      });
    }

    // Send to n8n for backup notification (fire-and-forget)
    const n8nFormType: FormType =
      config.submissionType === "Job Application"
        ? "job-application"
        : config.submissionType === "Consultation"
          ? "consultation"
          : "contact";

    sendToN8nAsync({
      type: n8nFormType,
      data: {
        id: submissionId,
        ...formData,
      },
    });

    return createFormSubmissionResponse(
      submissionId,
      emailSent,
      `${config.submissionType} received successfully`,
      dbStored,
    );
  } catch (error: unknown) {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));
    logger.error(`Error processing ${config.submissionType}:`, normalizedError);
    return internalServerError(`Failed to process ${config.submissionType}`);
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
  // Allowlist table names and order columns to prevent SQL injection
  const ALLOWED_TABLES = new Set([
    "consultations",
    "job_applications",
    "contact_submissions",
    "newsletter_subscribers",
  ]);
  const ALLOWED_ORDER_COLS = new Set(["created_at", "updated_at", "id"]);

  if (!ALLOWED_TABLES.has(tableName)) {
    logger.error("handleFormRetrieval: rejected disallowed table", {
      tableName,
    });
    return internalServerError("Invalid table name");
  }
  if (!ALLOWED_ORDER_COLS.has(orderBy)) {
    logger.error("handleFormRetrieval: rejected disallowed order column", {
      orderBy,
    });
    return internalServerError("Invalid order column");
  }

  try {
    const DB = getD1Database();
    if (DB) {
      // Database client is now properly typed
      const db = createDbClient({ DB });
      const submissions = await db.query(
        `SELECT * FROM ${tableName} ORDER BY ${orderBy} DESC LIMIT ${limit}`,
      );

      return createPaginatedResponse(submissions, submissions.length);
    }

    // Fallback for local development (best-effort pattern)
    return createPaginatedResponse(
      [],
      0,
      "D1 database not available in this environment",
    );
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));
    logger.error(`Error fetching from ${tableName}:`, normalizedError);
    // Return error response using helper (best-effort pattern)
    return internalServerError("Failed to fetch submissions");
  }
}
