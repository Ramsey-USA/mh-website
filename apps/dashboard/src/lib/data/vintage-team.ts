// Enhanced team member data for modern professional profiles
// Includes professional statistics, career highlights, skills, and comprehensive details
//
// To update a team member: edit their individual file in ./team/<slug>.json
// To add a new team member: create ./team/<slug>.json and add an import below

import jeremyThamert from "./team/jeremy-thamert.json";
import gator from "./team/gator.json";
import kimThamert from "./team/kim-thamert.json";
import mikeHolstein from "./team/mike-holstein.json";
import arnoldGarcia from "./team/arnold-garcia.json";
import benWoodall from "./team/ben-woodall.json";
import toddSchoeff from "./team/todd-schoeff.json";
import steveMcclary from "./team/steve-mcclary.json";
import reaganMassey from "./team/reagan-massey.json";
import porterCline from "./team/porter-cline.json";
import brooksMorris from "./team/brooks-morris.json";
import brittneyHolstein from "./team/brittney-holstein.json";
import mattRamsey from "./team/matt-ramsey.json";
import jenniferTene from "./team/jennifer-tene.json";
import derekParks from "./team/derek-parks.json";
import lisaKandle from "./team/lisa-kandle.json";

export interface VintageTeamMember {
  // Core identification
  name: string;
  role: string;
  department: string;
  cardNumber: number;
  position: string; // Simplified role for profile display
  nickname?: string; // Professional nickname or informal name

  // Personal details
  yearsWithCompany: number;
  height?: string;
  hometown?: string;
  education?: string;

  // Skills for radar chart (0-100 scale)
  skills: {
    leadership: number;
    technical: number;
    communication: number;
    safety: number;
    problemSolving: number;
    teamwork: number;
    organization: number;
    innovation: number;
    passion: number;
    continuingEducation: number;
  };

  // Current year performance (2026)
  currentYearStats: {
    projectsCompleted: number;
    clientSatisfaction: number;
    safetyRecord: string;
    teamCollaborations: number;
  };

  // Career totals
  careerStats: {
    totalProjects: number;
    yearsExperience: number;
    specialtyAreas: number;
    mentorships: number;
  };

  // Military/Professional awards
  awards?: string;

  // Content
  bio: string;
  careerHighlights: string[];
  funFact?: string;
  certifications?: string;
  hobbies?: string;
  specialInterests?: string;

  // Existing fields
  specialties: string[];
  avatar?: string;
  qrCode?: string; // QR code image path for business cards
  veteranStatus?: string;
  active: boolean;
  slug: string;
  email?: string; // Individual team member email (firstname@mhc-gc.com)
}

/**
 * Maps each admin email to the corresponding team member slug so the PWA
 * questionnaire knows which profile to update when a specific admin is logged in.
 */
export const ADMIN_EMAIL_TO_SLUG: Readonly<Record<string, string>> = {
  "matt@mhc-gc.com": "matt-ramsey",
  "jeremy@mhc-gc.com": "jeremy-thamert",
  "arnold@mhc-gc.com": "arnold-garcia",
  "brittney@mhc-gc.com": "brittney-holstein",
};

/**
 * The email address of the person responsible for approving team profile
 * submissions before they go live on the public team page.
 * Matt's own submissions are auto-approved.
 */
export const APPROVER_EMAIL = "matt@mhc-gc.com";

/**
 * Fields that a team member can update via the PWA questionnaire.
 * All fields are optional — only provided fields overwrite the static JSON.
 */
export interface TeamProfileOverride {
  slug: string;
  bio?: string;
  funFact?: string;
  certifications?: string;
  hobbies?: string;
  specialInterests?: string;
  careerHighlights?: string[];
  specialties?: string[];
  skills?: VintageTeamMember["skills"];
  currentYearStats?: VintageTeamMember["currentYearStats"];
  careerStats?: VintageTeamMember["careerStats"];
  yearsWithCompany?: number;
  hometown?: string;
  education?: string;
  nickname?: string;
  updatedAt?: string;
  updatedBy?: string;
  /** Approval workflow status */
  status?: "pending_approval" | "approved" | "rejected";
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

/**
 * Merge a DB override record onto a static team member object.
 * Static values are used as defaults; override values win when present.
 */
export function applyProfileOverride(
  member: VintageTeamMember,
  override: TeamProfileOverride | null | undefined,
): VintageTeamMember {
  if (!override) return member;

  return {
    ...member,
    ...(override.bio !== undefined && { bio: override.bio }),
    ...(override.funFact !== undefined && { funFact: override.funFact }),
    ...(override.certifications !== undefined && {
      certifications: override.certifications,
    }),
    ...(override.hobbies !== undefined && { hobbies: override.hobbies }),
    ...(override.specialInterests !== undefined && {
      specialInterests: override.specialInterests,
    }),
    ...(override.careerHighlights !== undefined && {
      careerHighlights: override.careerHighlights,
    }),
    ...(override.specialties !== undefined && {
      specialties: override.specialties,
    }),
    ...(override.skills !== undefined && { skills: override.skills }),
    ...(override.currentYearStats !== undefined && {
      currentYearStats: override.currentYearStats,
    }),
    ...(override.careerStats !== undefined && {
      careerStats: override.careerStats,
    }),
    ...(override.yearsWithCompany !== undefined && {
      yearsWithCompany: override.yearsWithCompany,
    }),
    ...(override.hometown !== undefined && { hometown: override.hometown }),
    ...(override.education !== undefined && { education: override.education }),
    ...(override.nickname !== undefined && { nickname: override.nickname }),
  };
}

// Assembled team roster — order determines display sequence on the team page.
// To reorder members, rearrange the entries in this array.
export const vintageTeamMembers: VintageTeamMember[] = [
  jeremyThamert,
  gator,
  kimThamert,
  mikeHolstein,
  arnoldGarcia,
  benWoodall,
  toddSchoeff,
  steveMcclary,
  reaganMassey,
  porterCline,
  brooksMorris,
  brittneyHolstein,
  mattRamsey,
  jenniferTene,
  derekParks,
  lisaKandle,
] as VintageTeamMember[];
