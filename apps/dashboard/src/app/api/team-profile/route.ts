/**
 * Team Profile API
 *
 * GET  /api/team-profile  – Return the caller's current team profile
 *                           (static JSON merged with any approved DB override)
 *                           plus the submission status of any pending row.
 * PUT  /api/team-profile  – Upsert the caller's profile override to D1.
 *                           Saved as 'pending_approval'; Matt's own submissions
 *                           are auto-approved.
 *
 * Protected: admin role only.
 * The admin's email is resolved to a team-member slug via ADMIN_EMAIL_TO_SLUG.
 */

import { type NextRequest, type NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { getD1Database } from "@/lib/db/env";
import { createDbClient } from "@/lib/db/client";
import { logger } from "@/lib/utils/logger";
import {
  createSuccessResponse,
  badRequest,
  notFound,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import type { JWTUser } from "@/lib/auth/jwt";
import {
  vintageTeamMembers,
  ADMIN_EMAIL_TO_SLUG,
  APPROVER_EMAIL,
  applyProfileOverride,
  type TeamProfileOverride,
  type VintageTeamMember,
} from "@/lib/data/vintage-team";

export const dynamic = "force-dynamic";

// ─── DB row type ──────────────────────────────────────────────────────────────

interface TeamProfileRow {
  slug: string;
  full_name: string | null;
  role_title: string | null;
  department: string | null;
  position_title: string | null;
  employee_email: string | null;
  active: number | null;
  bio: string | null;
  fun_fact: string | null;
  certifications: string | null;
  hobbies: string | null;
  special_interests: string | null;
  career_highlights: string | null; // JSON array
  specialties: string | null; // JSON array
  skills: string | null; // JSON object
  current_year_stats: string | null; // JSON object
  career_stats: string | null; // JSON object
  years_with_company: number | null;
  hometown: string | null;
  education: string | null;
  nickname: string | null;
  updated_at: string | null;
  updated_by: string | null;
  // Approval workflow columns (added in migration 0016)
  status: "pending_approval" | "approved" | "rejected" | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  rejection_reason: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rowToOverride(row: TeamProfileRow): TeamProfileOverride {
  const override: TeamProfileOverride = { slug: row.slug };

  if (row.bio != null) override.bio = row.bio;
  if (row.fun_fact != null) override.funFact = row.fun_fact;
  if (row.certifications != null) override.certifications = row.certifications;
  if (row.hobbies != null) override.hobbies = row.hobbies;
  if (row.special_interests != null) {
    override.specialInterests = row.special_interests;
  }
  if (row.career_highlights != null) {
    const parsed = safeParseJson<string[]>(row.career_highlights);
    if (parsed !== undefined) override.careerHighlights = parsed;
  }
  if (row.specialties != null) {
    const parsed = safeParseJson<string[]>(row.specialties);
    if (parsed !== undefined) override.specialties = parsed;
  }
  if (row.skills != null) {
    const parsed = safeParseJson<VintageTeamMember["skills"]>(row.skills);
    if (parsed !== undefined) override.skills = parsed;
  }
  if (row.current_year_stats != null) {
    const parsed = safeParseJson<VintageTeamMember["currentYearStats"]>(
      row.current_year_stats,
    );
    if (parsed !== undefined) override.currentYearStats = parsed;
  }
  if (row.career_stats != null) {
    const parsed = safeParseJson<VintageTeamMember["careerStats"]>(
      row.career_stats,
    );
    if (parsed !== undefined) override.careerStats = parsed;
  }
  if (row.years_with_company != null) {
    override.yearsWithCompany = row.years_with_company;
  }
  if (row.hometown != null) override.hometown = row.hometown;
  if (row.education != null) override.education = row.education;
  if (row.nickname != null) override.nickname = row.nickname;
  if (row.updated_at != null) override.updatedAt = row.updated_at;
  if (row.updated_by != null) override.updatedBy = row.updated_by;
  if (row.status != null) override.status = row.status;
  if (row.submitted_at != null) override.submittedAt = row.submitted_at;
  if (row.reviewed_at != null) override.reviewedAt = row.reviewed_at;
  if (row.reviewed_by != null) override.reviewedBy = row.reviewed_by;
  if (row.rejection_reason != null) {
    override.rejectionReason = row.rejection_reason;
  }

  return override;
}

function safeParseJson<T = unknown>(value: string): T | undefined {
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function resolveSlug(user: JWTUser): string | null {
  const email = user.email?.toLowerCase();
  if (!email) return null;
  return ADMIN_EMAIL_TO_SLUG[email] ?? null;
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function createBlankProfile(
  slug: string,
  seed: {
    fullName?: string;
    roleTitle?: string;
    department?: string;
    employeeEmail?: string;
  },
): VintageTeamMember {
  const name = seed.fullName?.trim() || slug.replaceAll("-", " ");
  const role = seed.roleTitle?.trim() || "Team Member";
  const department = seed.department?.trim() || "Mission Commanders";

  return {
    slug,
    name,
    role,
    position: role,
    department,
    cardNumber: 999,
    yearsWithCompany: 0,
    skills: {
      leadership: 0,
      technical: 0,
      communication: 0,
      safety: 0,
      problemSolving: 0,
      teamwork: 0,
      organization: 0,
      innovation: 0,
      passion: 0,
      continuingEducation: 0,
    },
    currentYearStats: {
      projectsCompleted: 0,
      clientSatisfaction: 0,
      safetyRecord: "",
      teamCollaborations: 0,
    },
    careerStats: {
      totalProjects: 0,
      yearsExperience: 0,
      specialtyAreas: 0,
      mentorships: 0,
    },
    bio: "",
    careerHighlights: [],
    specialties: [],
    active: true,
    email: seed.employeeEmail?.trim() || undefined,
    funFact: "",
    certifications: "",
    hobbies: "",
    specialInterests: "",
    hometown: "",
    education: "",
    nickname: "",
  };
}

function hydrateDynamicMemberFromRow(row: TeamProfileRow): VintageTeamMember {
  return createBlankProfile(row.slug, {
    fullName: row.full_name ?? undefined,
    roleTitle: row.role_title ?? undefined,
    department: row.department ?? undefined,
    employeeEmail: row.employee_email ?? undefined,
  });
}

// ─── GET ──────────────────────────────────────────────────────────────────────

async function handleGet(
  request: NextRequest,
  user: JWTUser,
): Promise<NextResponse> {
  const requestedSlug =
    request.nextUrl.searchParams.get("slug")?.trim() || null;
  const slug = requestedSlug || resolveSlug(user);
  if (!slug) {
    return notFound("No team profile associated with this account");
  }

  if (!isValidSlug(slug)) {
    return badRequest("Invalid slug format");
  }

  const staticMember = vintageTeamMembers.find((m) => m.slug === slug);

  // Fetch DB row (non-fatal if DB unavailable)
  let row: TeamProfileRow | null = null;
  const DB = getD1Database();
  if (DB) {
    try {
      const db = createDbClient({ DB });
      row = await db.queryOne<TeamProfileRow>(
        "SELECT * FROM team_profiles WHERE slug = ?",
        slug,
      );
    } catch (_err) {
      logger.warn("team-profile GET: DB query failed, using static data", {
        _err,
        slug,
      });
    }
  }

  const baseMember = staticMember
    ? staticMember
    : row
      ? hydrateDynamicMemberFromRow(row)
      : createBlankProfile(slug, {
          fullName: request.nextUrl.searchParams.get("fullName") ?? undefined,
          roleTitle: request.nextUrl.searchParams.get("roleTitle") ?? undefined,
          department:
            request.nextUrl.searchParams.get("department") ?? undefined,
          employeeEmail:
            request.nextUrl.searchParams.get("employeeEmail") ?? undefined,
        });

  // For editor UX, merge the latest saved row regardless of status.
  const merged = applyProfileOverride(
    baseMember,
    row ? rowToOverride(row) : null,
  );

  return createSuccessResponse({
    profile: merged,
    hasOverride: row?.status === "approved",
    lastUpdated: row?.status === "approved" ? row.updated_at : null,
    // Submission status — lets the form show pending/rejected banners
    submissionStatus: row?.status ?? null,
    submittedAt: row?.submitted_at ?? null,
    rejectionReason: row?.rejection_reason ?? null,
  });
}

// ─── PUT ──────────────────────────────────────────────────────────────────────

// Maximum lengths for free-text fields to guard against oversized payloads
const MAX_BIO = 1200;
const MAX_SHORT = 300;
const MAX_ARRAY_ITEMS = 8;
const MAX_ITEM_LEN = 200;
const PROFANITY_PATTERNS: readonly RegExp[] = [
  /\bfuck(?:ing|er|ed|s)?\b/i,
  /\bshit(?:ty|s)?\b/i,
  /\bbitch(?:es|y)?\b/i,
  /\basshole(?:s)?\b/i,
  /\bbastard(?:s)?\b/i,
  /\bcrap(?:py)?\b/i,
];

function hasProfanity(value: string): boolean {
  return PROFANITY_PATTERNS.some((pattern) => pattern.test(value));
}

function validateNoProfanity(
  value: string,
  fieldLabel: string,
  errors: string[],
): void {
  if (hasProfanity(value)) {
    errors.push(
      `${fieldLabel} contains language not permitted by MH branding guidelines`,
    );
  }
}

function validateAndSanitize(
  body: unknown,
): { data: Record<string, unknown> } | { errors: string[] } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { errors: ["Request body must be a JSON object"] };
  }

  const errors: string[] = [];
  const src = body as Record<string, unknown>;
  const data: Record<string, unknown> = {};

  // Identity fields for new employee onboarding
  const identityFields: [string, string, number][] = [
    ["fullName", "full_name", 120],
    ["roleTitle", "role_title", 120],
    ["department", "department", 120],
    ["positionTitle", "position_title", 120],
    ["employeeEmail", "employee_email", 160],
  ];

  for (const [srcKey, dbCol, maxLen] of identityFields) {
    if (srcKey in src) {
      const val = src[srcKey];
      if (val === null || val === undefined || val === "") {
        data[dbCol] = null;
      } else if (typeof val !== "string") {
        errors.push(`${srcKey} must be a string`);
      } else if (val.length > maxLen) {
        errors.push(`${srcKey} must be ${maxLen} characters or fewer`);
      } else {
        const trimmed = val.trim();
        validateNoProfanity(trimmed, srcKey, errors);
        data[dbCol] = trimmed;
      }
    }
  }

  if ("active" in src) {
    if (typeof src["active"] !== "boolean") {
      errors.push("active must be a boolean");
    } else {
      data["active"] = src["active"] ? 1 : 0;
    }
  }

  // String fields
  const strFields: [string, string, number][] = [
    ["bio", "bio", MAX_BIO],
    ["funFact", "fun_fact", MAX_SHORT],
    ["certifications", "certifications", MAX_SHORT],
    ["hobbies", "hobbies", MAX_SHORT],
    ["specialInterests", "special_interests", MAX_SHORT],
    ["hometown", "hometown", MAX_SHORT],
    ["education", "education", MAX_SHORT],
    ["nickname", "nickname", MAX_SHORT],
  ];

  for (const [srcKey, dbCol, maxLen] of strFields) {
    if (srcKey in src) {
      const val = src[srcKey];
      if (val === null || val === undefined || val === "") {
        data[dbCol] = null;
      } else if (typeof val !== "string") {
        errors.push(`${srcKey} must be a string`);
      } else if (val.length > maxLen) {
        errors.push(`${srcKey} must be ${maxLen} characters or fewer`);
      } else {
        const trimmed = val.trim();
        validateNoProfanity(trimmed, srcKey, errors);
        data[dbCol] = trimmed;
      }
    }
  }

  // Array fields
  const arrayFields: [string, string][] = [
    ["careerHighlights", "career_highlights"],
    ["specialties", "specialties"],
  ];

  for (const [srcKey, dbCol] of arrayFields) {
    if (srcKey in src) {
      const val = src[srcKey];
      if (val === null || val === undefined) {
        data[dbCol] = null;
      } else if (!Array.isArray(val)) {
        errors.push(`${srcKey} must be an array`);
      } else if (val.length > MAX_ARRAY_ITEMS) {
        errors.push(`${srcKey} must have at most ${MAX_ARRAY_ITEMS} items`);
      } else {
        const items = val.map((item) => String(item).trim()).filter(Boolean);
        const oversized = items.find((i) => i.length > MAX_ITEM_LEN);
        if (oversized) {
          errors.push(
            `Each ${srcKey} item must be ${MAX_ITEM_LEN} characters or fewer`,
          );
        } else {
          for (const item of items) {
            validateNoProfanity(item, `${srcKey} item`, errors);
          }
          data[dbCol] = JSON.stringify(items);
        }
      }
    }
  }

  // yearsWithCompany
  if ("yearsWithCompany" in src) {
    const val = src["yearsWithCompany"];
    if (val === null || val === undefined) {
      data["years_with_company"] = null;
    } else {
      const n = Number(val);
      if (!Number.isInteger(n) || n < 0 || n > 60) {
        errors.push("yearsWithCompany must be an integer between 0 and 60");
      } else {
        data["years_with_company"] = n;
      }
    }
  }

  // skills
  if ("skills" in src) {
    const val = src["skills"];
    if (val === null || val === undefined) {
      data["skills"] = null;
    } else if (typeof val !== "object" || Array.isArray(val)) {
      errors.push("skills must be an object");
    } else {
      const skillKeys = [
        "leadership",
        "technical",
        "communication",
        "safety",
        "problemSolving",
        "teamwork",
        "organization",
        "innovation",
        "passion",
        "continuingEducation",
      ];
      const skillObj = val as Record<string, unknown>;
      const sanitized: Record<string, number> = {};
      for (const key of skillKeys) {
        if (key in skillObj) {
          const n = Number(skillObj[key]);
          if (!Number.isInteger(n) || n < 0 || n > 100) {
            errors.push(`skills.${key} must be an integer between 0 and 100`);
          } else {
            sanitized[key] = n;
          }
        }
      }
      if (errors.length === 0) {
        data["skills"] = JSON.stringify(sanitized);
      }
    }
  }

  // currentYearStats
  if ("currentYearStats" in src) {
    const val = src["currentYearStats"];
    if (val === null || val === undefined) {
      data["current_year_stats"] = null;
    } else if (typeof val !== "object" || Array.isArray(val)) {
      errors.push("currentYearStats must be an object");
    } else {
      const s = val as Record<string, unknown>;
      const sanitized: Record<string, unknown> = {};
      const intFields = [
        "projectsCompleted",
        "clientSatisfaction",
        "teamCollaborations",
      ];
      for (const f of intFields) {
        if (f in s) {
          const n = Number(s[f]);
          if (!Number.isInteger(n) || n < 0) {
            errors.push(`currentYearStats.${f} must be a non-negative integer`);
          } else {
            sanitized[f] = n;
          }
        }
      }
      if ("safetyRecord" in s) {
        const sr = s["safetyRecord"];
        if (typeof sr !== "string" || sr.length > 50) {
          errors.push(
            "currentYearStats.safetyRecord must be a string of 50 chars or fewer",
          );
        } else {
          const trimmed = sr.trim();
          validateNoProfanity(trimmed, "currentYearStats.safetyRecord", errors);
          sanitized["safetyRecord"] = trimmed;
        }
      }
      if (errors.length === 0) {
        data["current_year_stats"] = JSON.stringify(sanitized);
      }
    }
  }

  // careerStats
  if ("careerStats" in src) {
    const val = src["careerStats"];
    if (val === null || val === undefined) {
      data["career_stats"] = null;
    } else if (typeof val !== "object" || Array.isArray(val)) {
      errors.push("careerStats must be an object");
    } else {
      const s = val as Record<string, unknown>;
      const sanitized: Record<string, number> = {};
      const intKeys = [
        "totalProjects",
        "yearsExperience",
        "specialtyAreas",
        "mentorships",
      ];
      for (const k of intKeys) {
        if (k in s) {
          const n = Number(s[k]);
          if (!Number.isInteger(n) || n < 0) {
            errors.push(`careerStats.${k} must be a non-negative integer`);
          } else {
            sanitized[k] = n;
          }
        }
      }
      if (errors.length === 0) {
        data["career_stats"] = JSON.stringify(sanitized);
      }
    }
  }

  if (errors.length > 0) return { errors };
  return { data };
}

async function handlePut(
  request: NextRequest,
  user: JWTUser,
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const bodyObj =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : null;

  const requestedSlug =
    bodyObj && typeof bodyObj["slug"] === "string"
      ? bodyObj["slug"].trim()
      : null;

  const slug = requestedSlug || resolveSlug(user);
  if (!slug) {
    return notFound("No team profile associated with this account");
  }

  if (!isValidSlug(slug)) {
    return badRequest("Invalid slug format");
  }

  const staticMember = vintageTeamMembers.find((m) => m.slug === slug);

  const result = validateAndSanitize(body);
  if ("errors" in result) {
    return badRequest(result.errors.join("; "));
  }

  if (!staticMember) {
    const hasIdentity =
      typeof result.data["full_name"] === "string" &&
      typeof result.data["role_title"] === "string" &&
      typeof result.data["department"] === "string";
    if (!hasIdentity) {
      return badRequest(
        "New employee submissions require fullName, roleTitle, and department",
      );
    }
  }

  if (Object.keys(result.data).length === 0) {
    return badRequest("No updatable fields provided");
  }

  const DB = getD1Database();
  if (!DB) {
    return serviceUnavailable("Database not available");
  }

  try {
    const db = createDbClient({ DB });
    const now = new Date().toISOString();

    // Matt auto-approves his own submissions; all others are pending review.
    const isMatt = user.email?.toLowerCase() === APPROVER_EMAIL.toLowerCase();
    const status = isMatt ? "approved" : "pending_approval";

    const cols = [
      "slug",
      ...Object.keys(result.data),
      "status",
      "submitted_at",
      "updated_by",
      "updated_at",
    ];
    const vals: unknown[] = [
      slug,
      ...Object.values(result.data),
      status,
      now,
      user.uid,
      now,
    ];
    const placeholders = cols.map(() => "?").join(", ");
    const updateClauses = [
      ...Object.keys(result.data).map((c) => `${c} = excluded.${c}`),
      "status = excluded.status",
      "submitted_at = excluded.submitted_at",
      "updated_by = excluded.updated_by",
      "updated_at = excluded.updated_at",
    ].join(", ");

    const sql = `
      INSERT INTO team_profiles (${cols.join(", ")})
      VALUES (${placeholders})
      ON CONFLICT(slug) DO UPDATE SET
        ${updateClauses}
    `;

    await db.execute(sql, ...vals);

    logger.info("Team profile submitted", { slug, uid: user.uid, status });

    const message = isMatt
      ? "Profile saved and published."
      : "Profile submitted for review. It will appear on the team page once approved.";

    return createSuccessResponse({ slug, status }, message);
  } catch (_err) {
    logger.error("team-profile PUT: DB upsert failed", { _err, slug });
    return internalServerError("Failed to save profile");
  }
}

// ─── Route exports ────────────────────────────────────────────────────────────

export const GET = requireRole(["admin"], withSecurity(handleGet));
export const PUT = requireRole(["admin"], withSecurity(handlePut));
