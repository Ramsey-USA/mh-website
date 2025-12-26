/**
 * Data exports
 * Centralized exports for all data modules
 */

// Team data exports
export type { TeamMember, VintageTeamMember } from "./vintage-team";
export { teamMembers, vintageTeamMembers } from "./vintage-team";

// Careers data exports
export type {
  JobPosition,
  CompanyBenefit,
  VeteranBenefit,
  CultureValue,
} from "./careers";
export {
  openPositions,
  companyBenefits,
  veteranBenefits,
  cultureValues,
  getPositionsByDepartment,
  getOpenPositionCount,
  getPositionsByExperience,
  getDepartments,
  hasEntryLevelPositions,
} from "./careers";

// Location data exports
export type { LocationData } from "./locations";
export { locations, getLocationBySlug, getAllLocationSlugs } from "./locations";
