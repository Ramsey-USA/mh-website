/**
 * Leads Sync API - Import existing submissions into leads table
 *
 * POST /api/leads/sync - Sync contact_submissions and consultations into leads
 *
 * This is a one-time or periodic sync to convert existing form submissions
 * into the CRM leads table for tracking through the sales pipeline.
 */

import { type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { logger } from "@/lib/utils/logger";
import { getD1Database } from "@/lib/db/env";
import { DbClient } from "@/lib/db/client";
import {
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  project_location: string | null;
  budget: string | null;
  message: string;
  urgency: string;
  created_at: string;
  status: string;
}

interface Consultation {
  id: string;
  client_name: string;
  email: string;
  phone: string | null;
  project_type: string;
  project_description: string | null;
  location: string | null;
  budget: string | null;
  created_at: string;
  status: string;
}

async function handlePOST(_request: NextRequest) {
  const DB = getD1Database();
  if (!DB) {
    return internalServerError("Database not available");
  }

  const db = new DbClient(DB);

  try {
    let importedContacts = 0;
    let importedConsultations = 0;
    let skipped = 0;

    // Get existing lead source_ids to avoid duplicates
    const existingLeads = await db.query<{ source_id: string | null }>(
      "SELECT source_id FROM leads WHERE source_id IS NOT NULL",
    );
    const existingSourceIds = new Set(existingLeads.map((l) => l.source_id));

    // Import contact submissions
    const contacts = await db.query<ContactSubmission>(
      "SELECT * FROM contact_submissions ORDER BY created_at DESC",
    );

    for (const contact of contacts) {
      if (existingSourceIds.has(contact.id)) {
        skipped++;
        continue;
      }

      const lead = {
        id: crypto.randomUUID(),
        source: "contact_form",
        source_id: contact.id,
        contact_name: `${contact.first_name} ${contact.last_name}`.trim(),
        email: contact.email,
        phone: contact.phone,
        company: null,
        project_type: contact.project_type,
        project_location: contact.project_location,
        project_description: contact.message,
        status: contact.status === "new" ? "new" : "contacted",
        estimated_value: parseBudget(contact.budget),
        probability: 50,
        priority: mapUrgency(contact.urgency),
        assigned_to: null,
        follow_up_date: null,
        last_contact_date: null,
        notes: JSON.stringify([]),
        lost_reason: null,
        created_at: contact.created_at,
        metadata: JSON.stringify({
          imported: true,
          original_status: contact.status,
        }),
      };

      await db.insert("leads", lead);
      importedContacts++;
    }

    // Import consultations
    const consultations = await db.query<Consultation>(
      "SELECT * FROM consultations ORDER BY created_at DESC",
    );

    for (const consultation of consultations) {
      if (existingSourceIds.has(consultation.id)) {
        skipped++;
        continue;
      }

      const lead = {
        id: crypto.randomUUID(),
        source: "consultation",
        source_id: consultation.id,
        contact_name: consultation.client_name,
        email: consultation.email,
        phone: consultation.phone,
        company: null,
        project_type: consultation.project_type,
        project_location: consultation.location,
        project_description: consultation.project_description,
        status: consultation.status === "new" ? "new" : "contacted",
        estimated_value: parseBudget(consultation.budget),
        probability: 60, // Consultations are higher intent
        priority: "medium",
        assigned_to: null,
        follow_up_date: null,
        last_contact_date: null,
        notes: JSON.stringify([]),
        lost_reason: null,
        created_at: consultation.created_at,
        metadata: JSON.stringify({
          imported: true,
          original_status: consultation.status,
        }),
      };

      await db.insert("leads", lead);
      importedConsultations++;
    }

    logger.info("Leads sync completed", {
      importedContacts,
      importedConsultations,
      skipped,
    });

    return createSuccessResponse(
      {
        imported: {
          contacts: importedContacts,
          consultations: importedConsultations,
        },
        skipped,
        total: importedContacts + importedConsultations,
      },
      "Leads sync completed successfully",
    );
  } catch (error) {
    logger.error("Leads sync failed:", error);
    return internalServerError("Failed to sync leads");
  }
}

/**
 * Parse budget string into estimated value
 */
function parseBudget(budget: string | null): number | null {
  if (!budget) return null;

  // Handle ranges like "$100k - $500k" or "$1M+"
  const cleaned = budget.toLowerCase().replace(/[^0-9km.+-]/g, "");

  // Try to extract the first number
  const match = cleaned.match(/(\d+(?:\.\d+)?)(k|m)?/);
  if (!match || !match[1]) return null;

  let value = parseFloat(match[1]);
  if (match[2] === "k") value *= 1000;
  if (match[2] === "m") value *= 1000000;

  return Math.round(value);
}

/**
 * Map urgency to priority
 */
function mapUrgency(urgency: string): string {
  switch (urgency?.toLowerCase()) {
    case "high":
    case "urgent":
      return "high";
    case "low":
      return "low";
    default:
      return "medium";
  }
}

export const POST = requireRole(["admin"], withSecurity(handlePOST));
