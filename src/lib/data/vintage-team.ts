// Enhanced team member data for modern professional profiles
// Includes professional statistics, career highlights, skills, and comprehensive details

// Import team data from JSON file
import teamDataJson from "./team-data.json";

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

// Export team members from JSON data
export const vintageTeamMembers: VintageTeamMember[] =
  teamDataJson as VintageTeamMember[];
