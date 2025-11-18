/**
 * Consolidated Form Submission Handler
 * Handles validation, database storage, and email notifications for all form types
 */

import { NextResponse, type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type D1Database } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import {
  getR2Bucket,
  R2StorageService,
  isSmallEnoughForEmail,
  fileToBase64,
} from "@/lib/cloudflare/r2";
import {
  generateJobApplicationAcknowledgment,
  generateConsultationAcknowledgment,
  generateContactAcknowledgment,
} from "@/lib/email/templates";

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

    // Convert data to Record format for email processing
    const formData = data as unknown as Record<string, unknown>;

    // Send email notification
    let emailSent = false;
    try {
      const emailSubject = config.emailSubject(data as T);
      const emailMessage = config.emailMessage(data as T);

      const name =
        typeof formData["name"] === "string"
          ? (formData["name"] as string)
          : `${typeof formData["firstName"] === "string" ? (formData["firstName"] as string) : ""} ${typeof formData["lastName"] === "string" ? (formData["lastName"] as string) : ""}`.trim();

      const emailPayload: Record<string, unknown> = {
        subject: emailSubject,
        message: emailMessage,
        type: config.submissionType.toLowerCase().replace(/\s+/g, "-"),
        recipientEmail: "office@mhc-gc.com", // This will be expanded to include matt@ and arnold@ (for job apps) in the contact API
        metadata: {
          submissionId,
          submissionType: config.submissionType,
        },
        ...(name ? { name } : {}),
        ...(typeof formData["email"] === "string"
          ? { email: formData["email"] }
          : {}),
        ...(typeof formData["phone"] === "string"
          ? { phone: formData["phone"] }
          : {}),
      };

      // Check if this is a job application with a resume that's small enough to attach
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
            emailPayload["attachments"] = [
              {
                content: base64Content,
                filename:
                  (formData["resumeFileName"] as string) || "resume.pdf",
                contentType: resumeResult.contentType || "application/pdf",
              },
            ];
            logger.info("Resume attached to email (file size within limit)", {
              size: formData["resumeFileSize"],
            });
          }
        } catch (attachErr: unknown) {
          const error =
            attachErr instanceof Error
              ? attachErr
              : new Error(String(attachErr));
          logger.error("Failed to attach resume to email:", error);
          // Continue without attachment - download link will still be in email
        }
      }

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

    // Send acknowledgment email to the applicant/client
    try {
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
          const ackResponse = await fetch(
            `${request.nextUrl.origin}/api/contact`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name:
                  (formData["name"] as string) ||
                  `${formData["firstName"]} ${formData["lastName"]}`,
                email: "noreply@mhc-gc.com",
                subject: acknowledgment.subject,
                message: acknowledgment.text,
                type: "acknowledgment",
                recipientEmail: applicantEmail,
                metadata: {
                  isAcknowledgment: true,
                  submissionType: config.submissionType,
                },
                customHtml: acknowledgment.html,
              }),
            },
          );

          if (ackResponse.ok) {
            logger.info(`Acknowledgment email sent to ${applicantEmail}`);
          } else {
            logger.error(
              `Failed to send acknowledgment email to ${applicantEmail}`,
            );
          }
        }
      }
    } catch (ackErr: unknown) {
      const error =
        ackErr instanceof Error ? ackErr : new Error(String(ackErr));
      logger.error("Error sending acknowledgment email:", error);
      // Don't fail the request if acknowledgment fails
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
    const normalizedError =
      _error instanceof Error ? _error : new Error(String(_error));
    logger.error(`Error fetching from ${tableName}:`, normalizedError);
    return NextResponse.json(
      { error: `Failed to fetch submissions` },
      { status: 500 },
    );
  }
}
