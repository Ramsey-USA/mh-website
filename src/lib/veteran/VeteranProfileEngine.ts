/**
 * Veteran Profile Engine - Refactored Version
 * Main orchestration layer for veteran profiling system
 */

import type {
  VeteranProfile,
  FamilyStatus,
  EmploymentStatus,
  HousingStatus,
  IncomeLevel,
  ConstructionPriority,
  AccessibilityRequirement,
  Timeline,
  BudgetRange,
  CommunicationStyle,
  ContactMethod,
  RespectLevel,
} from "./types/VeteranTypes";

import { ProfileAnalyzer } from "./ProfileAnalyzer";
import { TimelineDetector } from "./TimelineDetector";
import { DisabilityAnalyzer } from "./DisabilityAnalyzer";
import { BenefitCalculator } from "./BenefitCalculator";

// Re-export all types for backward compatibility
export type {
  VeteranProfile,
  ServiceBranch,
  ServiceEra,
  RankCategory,
  CombatTheater,
  VeteranPriority,
  VeteranProgram,
  FamilyStatus,
  EmploymentStatus,
  HousingStatus,
  IncomeLevel,
  ConstructionPriority,
  AccessibilityRequirement,
  Timeline,
  BudgetRange,
  CommunicationStyle,
  ContactMethod,
  RespectLevel,
  DeploymentRecord,
  AdaptiveNeed,
  VABenefit,
} from "./types/VeteranTypes";

/**
 * Main veteran profiling engine
 * Coordinates analysis modules to build comprehensive veteran profiles
 */
export class VeteranProfileEngine {
  private static instance: VeteranProfileEngine;
  private profiles: Map<string, VeteranProfile> = new Map();

  // Analyzer modules
  private profileAnalyzer: ProfileAnalyzer;
  private timelineDetector: TimelineDetector;
  private disabilityAnalyzer: DisabilityAnalyzer;
  private benefitCalculator: BenefitCalculator;

  private constructor() {
    this.profileAnalyzer = new ProfileAnalyzer();
    this.timelineDetector = new TimelineDetector();
    this.disabilityAnalyzer = new DisabilityAnalyzer();
    this.benefitCalculator = new BenefitCalculator();
  }

  public static getInstance(): VeteranProfileEngine {
    if (!VeteranProfileEngine.instance) {
      VeteranProfileEngine.instance = new VeteranProfileEngine();
    }
    return VeteranProfileEngine.instance;
  }

  /**
   * Advanced veteran detection and profiling
   * Main entry point for creating veteran profiles
   */
  public analyzeAndCreateProfile(
    input: string,
    _formData?: unknown,
    sessionData?: unknown,
  ): VeteranProfile {
    const keywords = input.toLowerCase();

    // Basic veteran detection
    const veteranDetection = this.profileAnalyzer.detectVeteranStatus(keywords);

    if (!veteranDetection.isVeteran) {
      return this.createNonVeteranProfile(input, _formData, sessionData);
    }

    // Detect service information
    const serviceBranch = this.profileAnalyzer.detectServiceBranch(keywords);
    const serviceEra = this.profileAnalyzer.detectServiceEra(keywords);
    const yearsOfService =
      this.profileAnalyzer.estimateYearsOfService(keywords);

    // Detect disability status
    const disabledVeteran =
      this.disabilityAnalyzer.detectDisabledVeteran(keywords);
    const combatVeteran = this.timelineDetector.detectCombatVeteran(keywords);

    // Enhanced profiling for confirmed veterans
    const sessionUserId =
      sessionData && typeof sessionData === "object" && "userId" in sessionData
        ? (sessionData as { userId?: string }).userId
        : undefined;

    const profile: VeteranProfile = {
      id: sessionUserId || `veteran-${Date.now()}`,
      isVeteran: true,
      confidence: veteranDetection.confidence,
      lastUpdated: new Date(),

      // Service Information
      serviceBranch,
      secondaryBranches: this.profileAnalyzer.detectSecondaryBranches(keywords),
      serviceEra,
      rankCategory: this.profileAnalyzer.detectRankCategory(keywords),
      specificRank: this.profileAnalyzer.detectSpecificRank(keywords) || "",
      yearsOfService: yearsOfService || 0,

      // Combat & Deployment
      combatVeteran,
      deploymentHistory: this.timelineDetector.analyzeDeploymentHistory(
        keywords,
        serviceBranch,
        combatVeteran,
      ),
      combatTheaters: this.timelineDetector.detectCombatTheaters(keywords),
      multipleDeployments:
        this.timelineDetector.detectMultipleDeployments(keywords),

      // Disability & Benefits
      disabledVeteran,
      disabilityRating:
        this.disabilityAnalyzer.estimateDisabilityRating(keywords) || 0,
      serviceConnectedConditions:
        this.disabilityAnalyzer.detectServiceConnectedConditions(keywords),
      adaptiveNeeds: this.disabilityAnalyzer.analyzeAdaptiveNeeds(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),

      // VA Benefits & Programs
      vaBenefits: this.benefitCalculator.detectVABenefits(keywords),
      eligiblePrograms: this.benefitCalculator.determineEligiblePrograms(
        keywords,
        disabledVeteran,
      ),
      priorityLevel: this.benefitCalculator.calculatePriorityLevel(
        keywords,
        combatVeteran,
        disabledVeteran,
      ),

      // Personal Characteristics
      familyStatus: this.detectFamilyStatus(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      employmentStatus: this.detectEmploymentStatus(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      housingStatus: this.detectHousingStatus(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      incomeLevel:
        this.estimateIncomeLevel(
          keywords,
          _formData as Record<string, unknown> | undefined,
        ) || "Middle Income",

      // Construction Preferences
      constructionPriorities: this.analyzeConstructionPriorities(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      accessibilityRequirements: this.analyzeAccessibilityRequirements(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      preferredTimeline: this.detectPreferredTimeline(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      budgetRange:
        this.estimateBudgetRange(
          keywords,
          _formData as Record<string, unknown> | undefined,
        ) || "$25k - $50k",

      // Communication Preferences
      communicationStyle: this.determineCommunicationStyle(keywords),
      preferredContactMethod: this.detectPreferredContactMethod(
        keywords,
        _formData as Record<string, unknown> | undefined,
      ),
      militaryTerminology: this.shouldUseMilitaryTerminology(keywords),
      respectLevel: this.determineRespectLevel(keywords, combatVeteran),
    };

    // Store profile for future reference
    this.profiles.set(profile.id, profile);

    return profile;
  }

  // ============================================================================
  // Personal Status Detection
  // ============================================================================

  private detectFamilyStatus(
    keywords: string,
    _formData?: unknown,
  ): FamilyStatus {
    if (keywords.includes("gold star") || keywords.includes("fallen")) {
      return "Gold Star Family";
    }

    if (keywords.includes("military family") || keywords.includes("spouse")) {
      return "Military Family";
    }

    if (
      keywords.includes("married") ||
      keywords.includes("wife") ||
      keywords.includes("husband")
    ) {
      return "Married";
    }

    return "Single Veteran";
  }

  private detectEmploymentStatus(
    keywords: string,
    _formData?: unknown,
  ): EmploymentStatus {
    if (
      keywords.includes("retired military") ||
      keywords.includes("military retirement")
    ) {
      return "Retired Military";
    }

    if (
      keywords.includes("disabled retired") ||
      keywords.includes("medical retirement")
    ) {
      return "Disabled Retired";
    }

    if (keywords.includes("gi bill") || keywords.includes("student")) {
      return "Student (GI Bill)";
    }

    return "Employed Full-Time"; // Default assumption
  }

  private detectHousingStatus(
    keywords: string,
    _formData?: unknown,
  ): HousingStatus {
    if (keywords.includes("va loan") || keywords.includes("va home loan")) {
      return "VA Home Loan";
    }

    if (
      keywords.includes("base housing") ||
      keywords.includes("military housing")
    ) {
      return "Military Housing";
    }

    if (keywords.includes("homeless") || keywords.includes("transitional")) {
      return "Homeless Veteran";
    }

    return "Homeowner"; // Default assumption for construction inquiries
  }

  private estimateIncomeLevel(
    keywords: string,
    _formData?: unknown,
  ): IncomeLevel | undefined {
    if (
      keywords.includes("va compensation only") ||
      keywords.includes("disability only")
    ) {
      return "VA Compensation Only";
    }

    if (
      keywords.includes("low income") ||
      keywords.includes("financial hardship")
    ) {
      return "Low Income";
    }

    return undefined;
  }

  // ============================================================================
  // Construction Preferences
  // ============================================================================

  private analyzeConstructionPriorities(
    keywords: string,
    _formData?: unknown,
  ): ConstructionPriority[] {
    const priorities: ConstructionPriority[] = [];

    if (
      this.disabilityAnalyzer.detectDisabledVeteran(keywords) ||
      keywords.includes("accessibility")
    ) {
      priorities.push("Accessibility Compliance");
    }

    if (keywords.includes("security") || keywords.includes("safe")) {
      priorities.push("Security Features");
    }

    if (keywords.includes("energy") || keywords.includes("efficient")) {
      priorities.push("Energy Efficiency");
    }

    if (keywords.includes("smart home") || keywords.includes("technology")) {
      priorities.push("Smart Home Technology");
    }

    if (keywords.includes("budget") || keywords.includes("cost")) {
      priorities.push("Cost Effectiveness");
    }

    return priorities;
  }

  private analyzeAccessibilityRequirements(
    keywords: string,
    _formData?: unknown,
  ): AccessibilityRequirement[] {
    const requirements: AccessibilityRequirement[] = [];

    if (keywords.includes("wheelchair")) {
      requirements.push("Wheelchair Access", "Wider Doorways", "Ramps");
    }

    if (keywords.includes("mobility") || keywords.includes("walking")) {
      requirements.push("Grab Bars", "Ramps");
    }

    if (keywords.includes("vision") || keywords.includes("blind")) {
      requirements.push("Visual Aids");
    }

    if (keywords.includes("hearing") || keywords.includes("deaf")) {
      requirements.push("Hearing Assistance");
    }

    return requirements;
  }

  private detectPreferredTimeline(
    keywords: string,
    _formData?: unknown,
  ): Timeline {
    if (keywords.includes("emergency") || keywords.includes("urgent")) {
      return "Immediate (Emergency)";
    }

    if (keywords.includes("soon") || keywords.includes("quickly")) {
      return "Urgent (1-3 months)";
    }

    if (keywords.includes("planned") || keywords.includes("future")) {
      return "Planned (6-12 months)";
    }

    return "Standard (3-6 months)";
  }

  private estimateBudgetRange(
    keywords: string,
    _formData?: unknown,
  ): BudgetRange | undefined {
    const budgetPatterns = [
      { pattern: /\$?(\d+)k/, multiplier: 1000 },
      { pattern: /\$?(\d+),?(\d{3})/, multiplier: 1 },
      { pattern: /under\s*\$?(\d+)/, type: "under" },
      { pattern: /over\s*\$?(\d+)/, type: "over" },
    ];

    for (const { pattern, multiplier } of budgetPatterns) {
      const match = keywords.match(pattern);
      if (match && match[1]) {
        let amount = parseInt(match[1]);
        if (multiplier) amount *= multiplier;

        if (amount < 10000) return "Under $10k";
        if (amount < 25000) return "$10k - $25k";
        if (amount < 50000) return "$25k - $50k";
        if (amount < 100000) return "$50k - $100k";
        if (amount < 250000) return "$100k - $250k";
        return "$250k+";
      }
    }

    return undefined;
  }

  // ============================================================================
  // Communication Preferences
  // ============================================================================

  private determineCommunicationStyle(keywords: string): CommunicationStyle {
    if (
      keywords.includes("formal") ||
      this.profileAnalyzer.detectRankCategory(keywords) === "Officer"
    ) {
      return "Professional Formal";
    }

    if (keywords.includes("direct") || keywords.includes("straight")) {
      return "Military Direct";
    }

    if (keywords.includes("detailed") || keywords.includes("thorough")) {
      return "Respectful Detailed";
    }

    return "Casual Friendly";
  }

  private detectPreferredContactMethod(
    keywords: string,
    _formData?: unknown,
  ): ContactMethod {
    if (keywords.includes("call") || keywords.includes("phone")) {
      return "Phone Call";
    }

    if (keywords.includes("email")) {
      return "Email";
    }

    if (keywords.includes("text") || keywords.includes("message")) {
      return "Text Message";
    }

    return "Phone Call"; // Default for veterans
  }

  private shouldUseMilitaryTerminology(keywords: string): boolean {
    const militaryTerms = [
      "mission",
      "objective",
      "tactical",
      "strategic",
      "operation",
      "deployment",
      "orders",
      "commander",
      "sir",
      "ma'am",
    ];

    return militaryTerms.some((term) => keywords.includes(term));
  }

  private determineRespectLevel(
    keywords: string,
    combatVeteran: boolean,
  ): RespectLevel {
    if (
      keywords.includes("medal of honor") ||
      keywords.includes("distinguished service")
    ) {
      return "High Honors";
    }

    if (combatVeteran || keywords.includes("purple heart")) {
      return "Combat Valor";
    }

    if (keywords.includes("family") || keywords.includes("spouse")) {
      return "Family Respect";
    }

    return "Service Honor";
  }

  // ============================================================================
  // Non-Veteran Profile Creation
  // ============================================================================

  /**
   * Create profile for non-veterans (family members, etc.)
   */
  private createNonVeteranProfile(
    input: string,
    _formData?: unknown,
    sessionData?: unknown,
  ): VeteranProfile {
    const keywords = input.toLowerCase();

    // Check for veteran family members
    const familyKeywords = [
      "military family",
      "veteran spouse",
      "military spouse",
      "veteran wife",
      "veteran husband",
    ];
    const isVeteranFamily = familyKeywords.some((keyword) =>
      keywords.includes(keyword),
    );

    const sessionUserId =
      sessionData && typeof sessionData === "object" && "userId" in sessionData
        ? (sessionData as { userId?: string }).userId
        : undefined;

    return {
      id: sessionUserId || `user-${Date.now()}`,
      isVeteran: false,
      confidence: 0,
      lastUpdated: new Date(),

      serviceBranch: "Unknown",
      serviceEra: "Unknown",
      rankCategory: "Unknown",

      combatVeteran: false,
      deploymentHistory: [],
      combatTheaters: [],
      multipleDeployments: false,

      disabledVeteran: false,
      serviceConnectedConditions: [],
      adaptiveNeeds: [],

      vaBenefits: [],
      eligiblePrograms: [],
      priorityLevel: isVeteranFamily ? "FAMILY" : "STANDARD",

      familyStatus: isVeteranFamily ? "Military Family" : "Single Veteran",
      employmentStatus: "Employed Full-Time",
      housingStatus: "Homeowner",

      constructionPriorities: this.analyzeConstructionPriorities(
        keywords,
        undefined,
      ),
      accessibilityRequirements: [],
      preferredTimeline: this.detectPreferredTimeline(keywords, undefined),
      budgetRange:
        this.estimateBudgetRange(keywords, undefined) || "$25k - $50k",

      communicationStyle: "Casual Friendly",
      preferredContactMethod: "Phone Call",
      militaryTerminology: false,
      respectLevel: isVeteranFamily ? "Family Respect" : "Service Honor",
    };
  }

  // ============================================================================
  // Profile Management
  // ============================================================================

  /**
   * Get existing profile by ID
   */
  public getProfile(id: string): VeteranProfile | undefined {
    return this.profiles.get(id);
  }

  /**
   * Update existing profile
   */
  public updateProfile(
    id: string,
    updates: Partial<VeteranProfile>,
  ): VeteranProfile | undefined {
    const existing = this.profiles.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates, lastUpdated: new Date() };
    this.profiles.set(id, updated);
    return updated;
  }

  /**
   * Get all profiles (for analytics)
   */
  public getAllProfiles(): VeteranProfile[] {
    return Array.from(this.profiles.values());
  }
}
