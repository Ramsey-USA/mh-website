/**
 * Leads API - CRM for tracking form submissions through sales pipeline
 *
 * GET /api/leads - List all leads with filtering
 * POST /api/leads - Create a new lead
 * PATCH /api/leads - Update lead status/fields
 *
 * Protected route: Requires admin role
 */

import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { logger } from "@/lib/utils/logger";
import { getD1Database } from "@/lib/db/env";
import { DbClient } from "@/lib/db/client";
import {
  createSuccessResponse,
  createPaginatedResponse,
  badRequest,
  internalServerError,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

// Lead statuses in order of progression
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "estimate_sent",
  "negotiating",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

// Valid lead sources
export const LEAD_SOURCES = [
  "contact_form",
  "consultation",
  "phone_call",
  "referral",
  "walk_in",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

// Lead priorities
export const LEAD_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

// Lost reasons
export const LOST_REASONS = [
  "price",
  "timing",
  "competitor",
  "scope_change",
  "unresponsive",
  "other",
] as const;

export type LostReason = (typeof LOST_REASONS)[number];

export interface Lead {
  id: string;
  source: LeadSource;
  source_id: string | null;
  contact_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  project_location: string | null;
  project_description: string | null;
  status: LeadStatus;
  estimated_value: number | null;
  probability: number;
  priority: LeadPriority;
  assigned_to: string | null;
  follow_up_date: string | null;
  last_contact_date: string | null;
  notes: string;
  lost_reason: LostReason | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  metadata: string;
}

interface LeadNote {
  timestamp: string;
  author: string;
  content: string;
}

/**
 * GET /api/leads - List leads with filtering and pagination
 */
async function handleGET(request: NextRequest) {
  const DB = getD1Database();
  if (!DB) {
    return internalServerError("Database not available");
  }

  const db = new DbClient(DB);
  const url = new URL(request.url);

  // Query parameters
  const status = url.searchParams.get("status");
  const assignedTo = url.searchParams.get("assigned_to");
  const priority = url.searchParams.get("priority");
  const source = url.searchParams.get("source");
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(url.searchParams.get("page_size") || "50", 10),
    100,
  );
  const sortBy = url.searchParams.get("sort_by") || "created_at";
  const sortOrder =
    url.searchParams.get("sort_order") === "asc" ? "ASC" : "DESC";

  // Build WHERE clause
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) {
    if (status === "active") {
      // Active = not won or lost
      conditions.push("status NOT IN ('won', 'lost')");
    } else if (LEAD_STATUSES.includes(status as LeadStatus)) {
      conditions.push("status = ?");
      params.push(status);
    }
  }

  if (assignedTo) {
    if (assignedTo === "unassigned") {
      conditions.push("(assigned_to IS NULL OR assigned_to = 'unassigned')");
    } else {
      conditions.push("assigned_to = ?");
      params.push(assignedTo);
    }
  }

  if (priority && LEAD_PRIORITIES.includes(priority as LeadPriority)) {
    conditions.push("priority = ?");
    params.push(priority);
  }

  if (source && LEAD_SOURCES.includes(source as LeadSource)) {
    conditions.push("source = ?");
    params.push(source);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // Validate sort column (prevent SQL injection)
  const allowedSortColumns = [
    "created_at",
    "updated_at",
    "estimated_value",
    "follow_up_date",
    "priority",
    "status",
  ];
  const safeSortBy = allowedSortColumns.includes(sortBy)
    ? sortBy
    : "created_at";

  try {
    // Get total count
    const countResult = await db.queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM leads ${whereClause}`,
      ...params,
    );
    const total = countResult?.count || 0;

    // Get paginated results
    const offset = (page - 1) * pageSize;
    const leads = await db.query<Lead>(
      `SELECT * FROM leads ${whereClause} ORDER BY ${safeSortBy} ${sortOrder} LIMIT ? OFFSET ?`,
      ...params,
      pageSize,
      offset,
    );

    // Parse JSON fields
    const parsedLeads = leads.map((lead) => ({
      ...lead,
      notes: JSON.parse(lead.notes || "[]") as LeadNote[],
      metadata: JSON.parse(lead.metadata || "{}") as Record<string, unknown>,
    }));

    return createPaginatedResponse(parsedLeads, parsedLeads.length, undefined, {
      page,
      pageSize,
      total,
    });
  } catch (error) {
    logger.error("Failed to fetch leads:", error);
    return internalServerError("Failed to fetch leads");
  }
}

/**
 * POST /api/leads - Create a new lead
 */
async function handlePOST(request: NextRequest) {
  const DB = getD1Database();
  if (!DB) {
    return internalServerError("Database not available");
  }

  const db = new DbClient(DB);

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.contact_name) {
      return badRequest("Contact name is required");
    }

    if (!data.source || !LEAD_SOURCES.includes(data.source)) {
      return badRequest("Valid source is required");
    }

    // Build lead object with defaults
    const lead: Partial<Lead> = {
      id: crypto.randomUUID(),
      source: data.source,
      source_id: data.source_id || null,
      contact_name: data.contact_name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      project_type: data.project_type || null,
      project_location: data.project_location || null,
      project_description: data.project_description || null,
      status: data.status || "new",
      estimated_value: data.estimated_value || null,
      probability: data.probability ?? 50,
      priority: data.priority || "medium",
      assigned_to: data.assigned_to || null,
      follow_up_date: data.follow_up_date || null,
      last_contact_date: null,
      notes: JSON.stringify(data.notes || []),
      lost_reason: null,
      metadata: JSON.stringify(data.metadata || {}),
    };

    await db.insert("leads", lead);

    logger.info("Lead created", { id: lead.id, source: lead.source });

    return createSuccessResponse(
      { id: lead.id },
      "Lead created successfully",
      201,
    );
  } catch (error) {
    logger.error("Failed to create lead:", error);
    return internalServerError("Failed to create lead");
  }
}

/**
 * PATCH /api/leads - Update a lead
 */
async function handlePATCH(request: NextRequest) {
  const DB = getD1Database();
  if (!DB) {
    return internalServerError("Database not available");
  }

  const db = new DbClient(DB);

  try {
    const data = await request.json();

    if (!data.id) {
      return badRequest("Lead ID is required");
    }

    // Get existing lead
    const existing = await db.queryOne<Lead>(
      "SELECT * FROM leads WHERE id = ?",
      data.id,
    );

    if (!existing) {
      return badRequest("Lead not found");
    }

    // Build update object
    const updates: Record<string, unknown> = {};

    // Allowed updatable fields
    const allowedFields = [
      "contact_name",
      "email",
      "phone",
      "company",
      "project_type",
      "project_location",
      "project_description",
      "status",
      "estimated_value",
      "probability",
      "priority",
      "assigned_to",
      "follow_up_date",
      "last_contact_date",
      "lost_reason",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates[field] = data[field];
      }
    }

    // Handle status change to won/lost
    if (data.status === "won" || data.status === "lost") {
      if (!existing.closed_at) {
        updates["closed_at"] = new Date().toISOString();
      }
    } else if (
      existing.closed_at &&
      data.status &&
      data.status !== existing.status
    ) {
      // Reopening a closed lead
      updates["closed_at"] = null;
    }

    // Handle adding a note
    if (data.add_note) {
      const existingNotes: LeadNote[] = JSON.parse(existing.notes || "[]");
      existingNotes.push({
        timestamp: new Date().toISOString(),
        author: data.note_author || "System",
        content: data.add_note,
      });
      updates["notes"] = JSON.stringify(existingNotes);
    }

    // Handle metadata update
    if (data.metadata) {
      const existingMeta = JSON.parse(existing.metadata || "{}");
      updates["metadata"] = JSON.stringify({
        ...existingMeta,
        ...data.metadata,
      });
    }

    if (Object.keys(updates).length === 0) {
      return badRequest("No valid fields to update");
    }

    await db.update("leads", data.id, updates);

    logger.info("Lead updated", { id: data.id, fields: Object.keys(updates) });

    return createSuccessResponse({ id: data.id }, "Lead updated successfully");
  } catch (error) {
    logger.error("Failed to update lead:", error);
    return internalServerError("Failed to update lead");
  }
}

// Export handlers with authentication
export const GET = requireRole(["admin"], withSecurity(handleGET));
export const POST = requireRole(["admin"], withSecurity(handlePOST));
export const PATCH = requireRole(["admin"], withSecurity(handlePATCH));
