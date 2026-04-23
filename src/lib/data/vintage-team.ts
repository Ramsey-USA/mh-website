// Enhanced team member data for modern professional profiles
// Includes professional statistics, career highlights, skills, and comprehensive details
//
// To update a team member: edit their individual file in ./team/<slug>.json
// To add a new team member: create ./team/<slug>.json and add an import below

import jeremyThamert from "./team/jeremy-thamert.json";
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

// Assembled team roster — order determines display sequence on the team page.
// To reorder members, rearrange the entries in this array.
export const vintageTeamMembers: VintageTeamMember[] = [
  jeremyThamert,
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
