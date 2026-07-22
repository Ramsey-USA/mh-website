// Enhanced team member data for modern professional profiles
// Includes professional statistics, career highlights, skills, and comprehensive details
//
// To update a team member: edit their individual file in ./team/<slug>.json
// To add a new team member: create ./team/<slug>.json and add an import below

import jeremyThamert from "./team/jeremy-thamert.json";
import gator from "@/lib/shared-data/team/gator.json";
import kimThamert from "./team/kim-thamert.json";
import mikeHolstein from "@/lib/shared-data/team/mike-holstein.json";
import arnoldGarcia from "./team/arnold-garcia.json";
import benWoodall from "./team/ben-woodall.json";
import toddSchoeff from "./team/todd-schoeff.json";
import reaganMassey from "./team/reagan-massey.json";
import porterCline from "./team/porter-cline.json";
import beth from "./team/beth.json";
import mattRamsey from "./team/matt-ramsey.json";
import jenniferTene from "./team/jennifer-tene.json";
import derekParks from "./team/derek-parks.json";
import lisaKandle from "./team/lisa-kandle.json";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  type ContentGovernanceRecord,
  isPubliclyVisibleContent,
} from "@/lib/content/content-governance";

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
  email?: string; // Public team contact email; routed through the office inbox
  linkedinUrl?: string; // Public LinkedIn profile URL for direct professional connection
  governance?: ContentGovernanceRecord;
}

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

export function getJeremyThamertLeadershipSources() {
  return {
    credentialUrl: jeremyThamert.credentialLinks?.[0]?.url ?? null,
    storyUrl: jeremyThamert.storyLinks?.[0]?.url ?? null,
  };
}

function getTeamMemberGovernance(
  member: Pick<VintageTeamMember, "slug" | "active">,
): ContentGovernanceRecord {
  const isPublic = member.active;

  return {
    stableId: `team-profile:${member.slug}`,
    ownerRole: "people-operations",
    lifecycle: isPublic ? "published" : "withdrawn",
    approvalState: isPublic ? "approved" : "pending",
    publishState: isPublic ? "public" : "internal",
    ...(isPublic
      ? { approvalReference: "Active roster profile approved" }
      : {}),
    nextReviewAt: "2027-06-30",
    ...(!isPublic
      ? {
          withdrawalReason: "Profile is no longer active on the public roster.",
        }
      : {}),
    sourceReferences: [
      {
        sourceType: "internal-record",
        reference: `team/${member.slug}.json`,
      },
    ],
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
  reaganMassey,
  porterCline,
  beth,
  mattRamsey,
  jenniferTene,
  derekParks,
  lisaKandle,
].map((member) => ({
  ...member,
  email: COMPANY_INFO.email.main,
  governance: getTeamMemberGovernance(member),
})) as VintageTeamMember[];

export function getPublicVintageTeamMembers(): VintageTeamMember[] {
  return vintageTeamMembers.filter(
    (member) =>
      member.active &&
      (member.governance ? isPubliclyVisibleContent(member.governance) : true),
  );
}
