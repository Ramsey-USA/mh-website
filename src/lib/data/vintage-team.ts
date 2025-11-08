// Enhanced team data for vintage baseball cards
// Includes professional statistics, career highlights, and vintage-specific fields

// Import team data from JSON file
import teamDataJson from "./team-data.json";

export interface VintageTeamMember {
  // Core identification
  name: string;
  role: string;
  department: string;
  cardNumber: number;
  position: string; // Simplified role for card display
  nickname?: string; // Baseball-style nickname

  // Personal details
  yearsWithCompany: number;
  height?: string;
  hometown?: string;
  education?: string;

  // Current year performance (2025)
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
  veteranStatus?: string;
  active: boolean;
  slug: string;
}

// Export team members from JSON data
export const vintageTeamMembers: VintageTeamMember[] =
  teamDataJson as VintageTeamMember[];

// Legacy team members interface for backward compatibility
export interface TeamMember {
  name: string;
  role: string;
  department: string;
  experienceYears: number | string;
  veteranStatus?: string;
  specialties?: string[];
  bio?: string;
  slug: string;
  active?: boolean;
  avatar?: string;
}

// Convert vintage team members to legacy format for existing components
export const teamMembers: TeamMember[] = vintageTeamMembers.map((member) => ({
  name: member.name,
  role: member.role,
  department: member.department,
  experienceYears: member.careerStats.yearsExperience,
  ...(member.veteranStatus && { veteranStatus: member.veteranStatus }),
  specialties: member.specialties,
  bio: member.bio,
  slug: member.slug,
  ...(member.active !== undefined && { active: member.active }),
  ...(member.avatar && { avatar: member.avatar }),
}));
