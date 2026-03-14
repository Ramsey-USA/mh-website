/**
 * Veteran Type Definitions
 * Comprehensive type definitions for veteran profiling and personalization
 */

// ============================================================================
// Core Profile Interface
// ============================================================================

export interface VeteranProfile {
  // Core Identification
  id: string;
  isVeteran: boolean;
  confidence: number; // 0-100 confidence score
  lastUpdated: Date;

  // Service Information
  serviceBranch: ServiceBranch;
  secondaryBranches?: ServiceBranch[]; // For multi-service veterans
  serviceEra: ServiceEra;
  rankCategory: RankCategory;
  specificRank?: string;
  yearsOfService?: number;

  // Combat & Deployment
  combatVeteran: boolean;
  deploymentHistory: DeploymentRecord[];
  combatTheaters: CombatTheater[];
  multipleDeployments: boolean;

  // Disability & Benefits
  disabledVeteran: boolean;
  disabilityRating?: number;
  serviceConnectedConditions: string[];
  adaptiveNeeds: AdaptiveNeed[];

  // VA Benefits & Programs
  vaBenefits: VABenefit[];
  eligiblePrograms: VeteranProgram[];
  priorityLevel: VeteranPriority;

  // Personal Characteristics
  familyStatus: FamilyStatus;
  employmentStatus: EmploymentStatus;
  housingStatus: HousingStatus;
  incomeLevel?: IncomeLevel;

  // Construction Preferences
  constructionPriorities: ConstructionPriority[];
  accessibilityRequirements: AccessibilityRequirement[];
  preferredTimeline: Timeline;
  budgetRange?: BudgetRange;

  // Communication Preferences
  communicationStyle: CommunicationStyle;
  preferredContactMethod: ContactMethod;
  militaryTerminology: boolean;
  respectLevel: RespectLevel;
}

// ============================================================================
// Supporting Interfaces
// ============================================================================

export interface DeploymentRecord {
  theater: CombatTheater;
  startDate: Date;
  endDate: Date;
  branch: ServiceBranch;
  unit?: string;
  combatRole: boolean;
}

export interface AdaptiveNeed {
  type: "mobility" | "visual" | "hearing" | "cognitive" | "medical";
  severity: "mild" | "moderate" | "severe";
  accommodations: string[];
}

export interface VABenefit {
  type: "disability" | "education" | "housing" | "healthcare" | "employment";
  status: "active" | "eligible" | "applied" | "denied";
  details: string;
}

// ============================================================================
// Service Information Types
// ============================================================================

export type ServiceBranch =
  | "Army"
  | "Navy"
  | "Marines"
  | "Air Force"
  | "Coast Guard"
  | "Space Force"
  | "Unknown";

export type ServiceEra =
  | "GWOT (2001-Present)"
  | "Gulf War (1990-1991)"
  | "Cold War Era (1945-1991)"
  | "Vietnam Era (1964-1975)"
  | "Korean War (1950-1953)"
  | "WWII (1941-1945)"
  | "Post-9/11"
  | "Multiple Eras"
  | "Unknown";

export type RankCategory =
  | "Officer"
  | "Warrant Officer"
  | "Senior NCO"
  | "NCO"
  | "Enlisted"
  | "Unknown";

export type CombatTheater =
  | "Iraq (OIF)"
  | "Afghanistan (OEF)"
  | "Syria (OIR)"
  | "Gulf War"
  | "Vietnam"
  | "Korea"
  | "WWII Europe"
  | "WWII Pacific"
  | "Other";

// ============================================================================
// Priority & Program Types
// ============================================================================

export type VeteranPriority =
  | "IMMEDIATE" // Disabled, Combat Veterans
  | "HIGH" // All Veterans with Benefits
  | "STANDARD" // Veteran Recognition
  | "FAMILY"; // Veteran Family Members

export type VeteranProgram =
  | "VA Home Loan"
  | "Disabled Veteran Business"
  | "VR&E Program"
  | "VA Healthcare"
  | "Education Benefits"
  | "Vocational Rehabilitation";

// ============================================================================
// Personal Status Types
// ============================================================================

export type FamilyStatus =
  | "Single Veteran"
  | "Married"
  | "Veteran Spouse"
  | "Military Family"
  | "Gold Star Family";

export type EmploymentStatus =
  | "Employed Full-Time"
  | "Employed Part-Time"
  | "Self-Employed"
  | "Retired Military"
  | "Disabled Retired"
  | "Unemployed"
  | "Student (GI Bill)";

export type HousingStatus =
  | "Homeowner"
  | "Renter"
  | "VA Home Loan"
  | "Military Housing"
  | "Homeless Veteran"
  | "Transitional Housing";

export type IncomeLevel =
  | "Low Income"
  | "Moderate Income"
  | "Middle Income"
  | "High Income"
  | "VA Compensation Only";

// ============================================================================
// Construction & Accessibility Types
// ============================================================================

export type ConstructionPriority =
  | "Accessibility Compliance"
  | "Energy Efficiency"
  | "Security Features"
  | "Smart Home Technology"
  | "Low Maintenance"
  | "Cost Effectiveness"
  | "Quick Timeline";

export type AccessibilityRequirement =
  | "Wheelchair Access"
  | "Grab Bars"
  | "Ramps"
  | "Wider Doorways"
  | "Accessible Bathroom"
  | "Lower Counters"
  | "Visual Aids"
  | "Hearing Assistance"
  | "Cognitive Aids";

export type Timeline =
  | "Immediate (Emergency)"
  | "Urgent (1-3 months)"
  | "Standard (3-6 months)"
  | "Planned (6-12 months)"
  | "Future (12+ months)";

export type BudgetRange =
  | "Under $10k"
  | "$10k - $25k"
  | "$25k - $50k"
  | "$50k - $100k"
  | "$100k - $250k"
  | "$250k+";

// ============================================================================
// Communication Types
// ============================================================================

export type CommunicationStyle =
  | "Military Direct"
  | "Professional Formal"
  | "Casual Friendly"
  | "Respectful Detailed";

export type ContactMethod =
  | "Phone Call"
  | "Email"
  | "Text Message"
  | "In-Person"
  | "Video Call";

export type RespectLevel =
  | "High Honors" // Medal of Honor, Distinguished Service
  | "Combat Valor" // Combat medals and decorations
  | "Service Honor" // Standard military respect
  | "Family Respect"; // Veteran family members
