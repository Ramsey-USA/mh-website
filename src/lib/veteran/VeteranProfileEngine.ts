/**
 * Enhanced Veteran Profiling Engine - Phase 6.4
 * Advanced veteran detection, profiling, and personalization system
 */

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

/**
 * Enhanced Veteran Profiling Engine
 */
export class VeteranProfileEngine {
  private static instance: VeteranProfileEngine;
  private profiles: Map<string, VeteranProfile> = new Map();

  public static getInstance(): VeteranProfileEngine {
    if (!VeteranProfileEngine.instance) {
      VeteranProfileEngine.instance = new VeteranProfileEngine();
    }
    return VeteranProfileEngine.instance;
  }

  /**
   * Advanced veteran detection and profiling
   */
  public analyzeAndCreateProfile(
    input: string,
    formData?: any,
    sessionData?: any,
  ): VeteranProfile {
    const keywords = input.toLowerCase();

    // Basic veteran detection
    const veteranDetection = this.detectVeteranStatus(keywords);

    if (!veteranDetection.isVeteran) {
      return this.createNonVeteranProfile(input, formData, sessionData);
    }

    // Enhanced profiling for confirmed veterans
    const profile: VeteranProfile = {
      id: sessionData?.userId || `veteran-${Date.now()}`,
      isVeteran: true,
      confidence: veteranDetection.confidence,
      lastUpdated: new Date(),

      // Service Information
      serviceBranch: this.detectServiceBranch(keywords),
      secondaryBranches: this.detectSecondaryBranches(keywords),
      serviceEra: this.detectServiceEra(keywords),
      rankCategory: this.detectRankCategory(keywords),
      specificRank: this.detectSpecificRank(keywords),
      yearsOfService: this.estimateYearsOfService(keywords),

      // Combat & Deployment
      combatVeteran: this.detectCombatVeteran(keywords),
      deploymentHistory: this.analyzeDeploymentHistory(keywords),
      combatTheaters: this.detectCombatTheaters(keywords),
      multipleDeployments: this.detectMultipleDeployments(keywords),

      // Disability & Benefits
      disabledVeteran: this.detectDisabledVeteran(keywords),
      disabilityRating: this.estimateDisabilityRating(keywords),
      serviceConnectedConditions:
        this.detectServiceConnectedConditions(keywords),
      adaptiveNeeds: this.analyzeAdaptiveNeeds(keywords, formData),

      // VA Benefits & Programs
      vaBenefits: this.detectVABenefits(keywords),
      eligiblePrograms: this.determineEligiblePrograms(keywords),
      priorityLevel: this.calculatePriorityLevel(keywords),

      // Personal Characteristics
      familyStatus: this.detectFamilyStatus(keywords, formData),
      employmentStatus: this.detectEmploymentStatus(keywords, formData),
      housingStatus: this.detectHousingStatus(keywords, formData),
      incomeLevel: this.estimateIncomeLevel(keywords, formData),

      // Construction Preferences
      constructionPriorities: this.analyzeConstructionPriorities(
        keywords,
        formData,
      ),
      accessibilityRequirements: this.analyzeAccessibilityRequirements(
        keywords,
        formData,
      ),
      preferredTimeline: this.detectPreferredTimeline(keywords, formData),
      budgetRange: this.estimateBudgetRange(keywords, formData),

      // Communication Preferences
      communicationStyle: this.determineCommunicationStyle(keywords),
      preferredContactMethod: this.detectPreferredContactMethod(
        keywords,
        formData,
      ),
      militaryTerminology: this.shouldUseMilitaryTerminology(keywords),
      respectLevel: this.determineRespectLevel(keywords),
    };

    // Store profile for future reference
    this.profiles.set(profile.id, profile);

    return profile;
  }

  /**
   * Enhanced veteran status detection with confidence scoring
   */
  private detectVeteranStatus(keywords: string): {
    isVeteran: boolean;
    confidence: number;
  } {
    let confidence = 0;
    let veteranIndicators = 0;

    // Direct veteran keywords (high confidence)
    const directVeteranKeywords = [
      "veteran",
      "vet",
      "military service",
      "served in",
      "honorably discharged",
      "retired military",
      "dd-214",
      "military id",
      "veterans affairs",
    ];

    directVeteranKeywords.forEach((keyword) => {
      if (keywords.includes(keyword)) {
        confidence += 20;
        veteranIndicators++;
      }
    });

    // Service branch keywords (medium-high confidence)
    const serviceBranches = {
      Army: [
        "army",
        "soldier",
        "hooah",
        "infantry",
        "artillery",
        "airborne",
        "ranger",
        "special forces",
      ],
      Navy: [
        "navy",
        "sailor",
        "shipmate",
        "submarine",
        "destroyer",
        "carrier",
        "seabee",
        "seal",
      ],
      Marines: [
        "marines",
        "marine",
        "semper fi",
        "devil dog",
        "jarhead",
        "oorah",
        "usmc",
      ],
      "Air Force": [
        "air force",
        "airman",
        "pilot",
        "aircrew",
        "squadron",
        "usaf",
        "fighter pilot",
      ],
      "Coast Guard": [
        "coast guard",
        "coastie",
        "semper paratus",
        "uscg",
        "cutter",
      ],
      "Space Force": ["space force", "guardian", "ussf", "space operations"],
    };

    Object.values(serviceBranches)
      .flat()
      .forEach((keyword) => {
        if (keywords.includes(keyword)) {
          confidence += 15;
          veteranIndicators++;
        }
      });

    // Military rank keywords (medium confidence)
    const rankKeywords = [
      "captain",
      "major",
      "colonel",
      "general",
      "lieutenant",
      "commander",
      "sergeant",
      "corporal",
      "specialist",
      "private",
      "petty officer",
      "chief",
      "master sergeant",
      "first sergeant",
    ];

    rankKeywords.forEach((keyword) => {
      if (keywords.includes(keyword)) {
        confidence += 10;
        veteranIndicators++;
      }
    });

    // Combat and deployment keywords (medium confidence)
    const combatKeywords = [
      "deployment",
      "deployed",
      "combat",
      "iraq",
      "afghanistan",
      "oif",
      "oef",
      "gwot",
      "theater",
      "overseas",
      "tour of duty",
      "purple heart",
    ];

    combatKeywords.forEach((keyword) => {
      if (keywords.includes(keyword)) {
        confidence += 12;
        veteranIndicators++;
      }
    });

    // VA and disability keywords (medium confidence)
    const vaKeywords = [
      "va benefits",
      "va loan",
      "va rating",
      "service connected",
      "disability compensation",
      "ptsd",
      "tbi",
      "va hospital",
      "gi bill",
      "voc rehab",
    ];

    vaKeywords.forEach((keyword) => {
      if (keywords.includes(keyword)) {
        confidence += 12;
        veteranIndicators++;
      }
    });

    // Military culture keywords (lower confidence)
    const cultureKeywords = [
      "battle buddy",
      "formation",
      "chow hall",
      "barracks",
      "commissary",
      "px",
      "bx",
      "base",
      "post",
      "installation",
      "cadence",
    ];

    cultureKeywords.forEach((keyword) => {
      if (keywords.includes(keyword)) {
        confidence += 5;
        veteranIndicators++;
      }
    });

    // Cap confidence at 95 to account for uncertainty
    confidence = Math.min(confidence, 95);

    // Require minimum indicators and confidence
    const isVeteran = veteranIndicators >= 1 && confidence >= 15;

    return { isVeteran, confidence };
  }

  /**
   * Detect primary service branch with confidence
   */
  private detectServiceBranch(keywords: string): ServiceBranch {
    const branchScores: Record<ServiceBranch, number> = {
      Army: 0,
      Navy: 0,
      Marines: 0,
      "Air Force": 0,
      "Coast Guard": 0,
      "Space Force": 0,
      Unknown: 0,
    };

    const branchKeywords = {
      Army: [
        "army",
        "soldier",
        "hooah",
        "infantry",
        "artillery",
        "armor",
        "airborne",
        "ranger",
        "special forces",
        "fort",
      ],
      Navy: [
        "navy",
        "sailor",
        "shipmate",
        "submarine",
        "destroyer",
        "carrier",
        "seabee",
        "seal",
        "naval",
        "ship",
      ],
      Marines: [
        "marines",
        "marine",
        "semper fi",
        "devil dog",
        "jarhead",
        "oorah",
        "usmc",
        "corps",
      ],
      "Air Force": [
        "air force",
        "airman",
        "pilot",
        "aircrew",
        "squadron",
        "usaf",
        "fighter pilot",
        "air base",
      ],
      "Coast Guard": [
        "coast guard",
        "coastie",
        "semper paratus",
        "uscg",
        "cutter",
        "maritime",
      ],
      "Space Force": [
        "space force",
        "guardian",
        "ussf",
        "space operations",
        "space command",
      ],
    };

    Object.entries(branchKeywords).forEach(([branch, words]) => {
      words.forEach((word) => {
        if (keywords.includes(word)) {
          branchScores[branch as ServiceBranch] += 1;
        }
      });
    });

    // Find highest scoring branch
    const highestScore = Math.max(...Object.values(branchScores));
    if (highestScore === 0) return "Unknown";

    const topBranch = Object.entries(branchScores).find(
      ([_, score]) => score === highestScore,
    )?.[0];
    return (topBranch as ServiceBranch) || "Unknown";
  }

  /**
   * Detect secondary service branches for multi-service veterans
   */
  private detectSecondaryBranches(keywords: string): ServiceBranch[] {
    const allBranches = [
      "Army",
      "Navy",
      "Marines",
      "Air Force",
      "Coast Guard",
      "Space Force",
    ] as ServiceBranch[];
    const primaryBranch = this.detectServiceBranch(keywords);

    // Look for indicators of multi-service
    const multiServiceKeywords = [
      "transferred",
      "cross trained",
      "joint service",
      "inter service",
      "multiple branches",
      "prior service",
      "switched branches",
    ];

    const hasMultiService = multiServiceKeywords.some((keyword) =>
      keywords.includes(keyword),
    );

    if (!hasMultiService) return [];

    // Return other branches that might be mentioned
    return allBranches.filter(
      (branch) =>
        branch !== primaryBranch &&
        this.detectServiceBranch(
          keywords.replace(primaryBranch.toLowerCase(), ""),
        ) === branch,
    );
  }

  /**
   * Detect service era with multiple era support
   */
  private detectServiceEra(keywords: string): ServiceEra {
    const eraScores: Record<ServiceEra, number> = {
      "GWOT (2001-Present)": 0,
      "Gulf War (1990-1991)": 0,
      "Cold War Era (1945-1991)": 0,
      "Vietnam Era (1964-1975)": 0,
      "Korean War (1950-1953)": 0,
      "WWII (1941-1945)": 0,
      "Post-9/11": 0,
      "Multiple Eras": 0,
      Unknown: 0,
    };

    const eraKeywords = {
      "GWOT (2001-Present)": [
        "iraq",
        "afghanistan",
        "oif",
        "oef",
        "gwot",
        "2000s",
        "2010s",
        "2020s",
      ],
      "Post-9/11": [
        "post 9/11",
        "post-9/11",
        "after september 11",
        "911 gi bill",
      ],
      "Gulf War (1990-1991)": [
        "gulf war",
        "desert storm",
        "desert shield",
        "1990",
        "1991",
        "kuwait",
      ],
      "Cold War Era (1945-1991)": [
        "cold war",
        "berlin wall",
        "nato",
        "1970s",
        "1980s",
      ],
      "Vietnam Era (1964-1975)": [
        "vietnam",
        "southeast asia",
        "1960s",
        "tet offensive",
      ],
      "Korean War (1950-1953)": ["korea", "korean war", "inchon", "1950s"],
      "WWII (1941-1945)": [
        "world war",
        "wwii",
        "ww2",
        "normandy",
        "pacific theater",
        "1940s",
      ],
    };

    Object.entries(eraKeywords).forEach(([era, words]) => {
      words.forEach((word) => {
        if (keywords.includes(word)) {
          eraScores[era as ServiceEra] += 1;
        }
      });
    });

    // Check for multiple eras
    const erosWithScores = Object.entries(eraScores).filter(
      ([_, score]) => score > 0,
    );
    if (erosWithScores.length > 1) {
      return "Multiple Eras";
    }

    const highestScore = Math.max(...Object.values(eraScores));
    if (highestScore === 0) return "Unknown";

    const topEra = Object.entries(eraScores).find(
      ([_, score]) => score === highestScore,
    )?.[0];
    return (topEra as ServiceEra) || "Unknown";
  }

  /**
   * Detect rank category with enhanced classification
   */
  private detectRankCategory(keywords: string): RankCategory {
    const rankCategories = {
      Officer: [
        "officer",
        "lieutenant",
        "captain",
        "major",
        "colonel",
        "general",
        "commander",
        "admiral",
        "ensign",
        "brigadier",
        "commissioned",
      ],
      "Warrant Officer": [
        "warrant officer",
        "wo1",
        "wo2",
        "wo3",
        "wo4",
        "wo5",
        "chief warrant",
      ],
      "Senior NCO": [
        "sergeant major",
        "command sergeant major",
        "master sergeant",
        "first sergeant",
        "senior master sergeant",
        "chief master sergeant",
        "master chief",
        "senior chief",
        "command master chief",
      ],
      NCO: [
        "sergeant",
        "staff sergeant",
        "technical sergeant",
        "corporal",
        "petty officer",
        "nco",
        "non commissioned officer",
      ],
      Enlisted: [
        "private",
        "specialist",
        "seaman",
        "airman",
        "lance corporal",
        "enlisted",
        "basic",
        "recruit",
      ],
    };

    for (const [category, ranks] of Object.entries(rankCategories)) {
      if (ranks.some((rank) => keywords.includes(rank))) {
        return category as RankCategory;
      }
    }

    return "Unknown";
  }

  /**
   * Detect specific rank mentioned
   */
  private detectSpecificRank(keywords: string): string | undefined {
    const specificRanks = [
      // Army/Marines
      "private",
      "private first class",
      "specialist",
      "corporal",
      "sergeant",
      "staff sergeant",
      "sergeant first class",
      "master sergeant",
      "first sergeant",
      "sergeant major",
      "command sergeant major",

      // Navy/Coast Guard
      "seaman recruit",
      "seaman apprentice",
      "seaman",
      "petty officer third class",
      "petty officer second class",
      "petty officer first class",
      "chief petty officer",
      "senior chief petty officer",
      "master chief petty officer",

      // Air Force
      "airman basic",
      "airman",
      "airman first class",
      "senior airman",
      "technical sergeant",
      "master sergeant",
      "senior master sergeant",
      "chief master sergeant",

      // Officers
      "second lieutenant",
      "first lieutenant",
      "captain",
      "major",
      "lieutenant colonel",
      "colonel",
      "brigadier general",
      "major general",
      "lieutenant general",
      "general",
    ];

    for (const rank of specificRanks) {
      if (keywords.includes(rank)) {
        return rank;
      }
    }

    return undefined;
  }

  // Additional helper methods for comprehensive profiling...

  private estimateYearsOfService(keywords: string): number | undefined {
    const yearPatterns = [
      /(\d+)\s*years?\s*(of\s*)?service/,
      /served\s*(\d+)\s*years?/,
      /(\d+)\s*year\s*(tour|stint|career)/,
    ];

    for (const pattern of yearPatterns) {
      const match = keywords.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }

    return undefined;
  }

  private detectCombatVeteran(keywords: string): boolean {
    const combatKeywords = [
      "combat",
      "deployed",
      "deployment",
      "theater",
      "overseas",
      "iraq",
      "afghanistan",
      "syria",
      "oif",
      "oef",
      "oir",
      "purple heart",
      "combat action",
      "bronze star",
      "silver star",
      "combat infantryman",
      "combat medical",
      "combat engineer",
    ];

    return combatKeywords.some((keyword) => keywords.includes(keyword));
  }

  private analyzeDeploymentHistory(keywords: string): DeploymentRecord[] {
    const deployments: DeploymentRecord[] = [];

    // This would be enhanced with actual parsing logic
    // For now, return basic structure based on keywords

    if (keywords.includes("iraq") || keywords.includes("oif")) {
      deployments.push({
        theater: "Iraq (OIF)",
        startDate: new Date("2003-01-01"), // Placeholder
        endDate: new Date("2003-12-31"), // Placeholder
        branch: this.detectServiceBranch(keywords),
        combatRole: this.detectCombatVeteran(keywords),
      });
    }

    if (keywords.includes("afghanistan") || keywords.includes("oef")) {
      deployments.push({
        theater: "Afghanistan (OEF)",
        startDate: new Date("2001-01-01"), // Placeholder
        endDate: new Date("2001-12-31"), // Placeholder
        branch: this.detectServiceBranch(keywords),
        combatRole: this.detectCombatVeteran(keywords),
      });
    }

    return deployments;
  }

  private detectCombatTheaters(keywords: string): CombatTheater[] {
    const theaters: CombatTheater[] = [];

    const theaterMap = {
      "Iraq (OIF)": ["iraq", "oif", "operation iraqi freedom"],
      "Afghanistan (OEF)": ["afghanistan", "oef", "operation enduring freedom"],
      "Syria (OIR)": ["syria", "oir", "operation inherent resolve"],
      "Gulf War": ["gulf war", "desert storm", "desert shield", "kuwait"],
      Vietnam: ["vietnam", "southeast asia"],
      Korea: ["korea", "korean war"],
      "WWII Europe": ["normandy", "europe", "germany", "battle of the bulge"],
      "WWII Pacific": ["pacific", "iwo jima", "okinawa", "pearl harbor"],
    };

    Object.entries(theaterMap).forEach(([theater, keywords_list]) => {
      if (keywords_list.some((keyword) => keywords.includes(keyword))) {
        theaters.push(theater as CombatTheater);
      }
    });

    return theaters;
  }

  private detectMultipleDeployments(keywords: string): boolean {
    const multipleIndicators = [
      "multiple deployments",
      "several tours",
      "three tours",
      "four tours",
      "back to back",
      "consecutive deployments",
      "multiple times",
    ];

    return multipleIndicators.some((indicator) => keywords.includes(indicator));
  }

  private detectDisabledVeteran(keywords: string): boolean {
    const disabilityKeywords = [
      "disabled veteran",
      "disability rating",
      "va rating",
      "service connected",
      "ptsd",
      "tbi",
      "traumatic brain injury",
      "wounded warrior",
      "disabled",
      "disability compensation",
      "100% disabled",
      "permanent disability",
    ];

    return disabilityKeywords.some((keyword) => keywords.includes(keyword));
  }

  private estimateDisabilityRating(keywords: string): number | undefined {
    const ratingPatterns = [
      /(\d+)%\s*disabled/,
      /(\d+)%\s*rating/,
      /va\s*rating\s*(\d+)/,
      /disability\s*(\d+)%/,
    ];

    for (const pattern of ratingPatterns) {
      const match = keywords.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }

    return undefined;
  }

  private detectServiceConnectedConditions(keywords: string): string[] {
    const conditions: string[] = [];

    const conditionMap = {
      PTSD: ["ptsd", "post traumatic stress", "combat stress"],
      TBI: ["tbi", "traumatic brain injury", "head injury"],
      "Hearing Loss": ["hearing loss", "tinnitus", "deaf"],
      "Vision Loss": ["vision loss", "blind", "eye injury"],
      "Mobility Issues": ["mobility", "wheelchair", "amputee", "prosthetic"],
      "Back Injury": ["back injury", "spine", "herniated disc"],
      "Joint Issues": ["knee", "shoulder", "hip", "joint pain"],
      Respiratory: ["lung", "asthma", "breathing", "respiratory"],
    };

    Object.entries(conditionMap).forEach(([condition, indicators]) => {
      if (indicators.some((indicator) => keywords.includes(indicator))) {
        conditions.push(condition);
      }
    });

    return conditions;
  }

  private analyzeAdaptiveNeeds(
    keywords: string,
    formData?: any,
  ): AdaptiveNeed[] {
    const needs: AdaptiveNeed[] = [];

    if (keywords.includes("wheelchair") || keywords.includes("mobility")) {
      needs.push({
        type: "mobility",
        severity: "moderate",
        accommodations: ["wheelchair access", "ramps", "wider doorways"],
      });
    }

    if (keywords.includes("blind") || keywords.includes("vision")) {
      needs.push({
        type: "visual",
        severity: "moderate",
        accommodations: ["braille", "audio systems", "tactile indicators"],
      });
    }

    if (keywords.includes("deaf") || keywords.includes("hearing")) {
      needs.push({
        type: "hearing",
        severity: "moderate",
        accommodations: ["visual alerts", "vibrating notifications"],
      });
    }

    return needs;
  }

  private detectVABenefits(keywords: string): VABenefit[] {
    const benefits: VABenefit[] = [];

    if (keywords.includes("va loan") || keywords.includes("va home loan")) {
      benefits.push({
        type: "housing",
        status: "eligible",
        details: "VA Home Loan Program",
      });
    }

    if (keywords.includes("gi bill") || keywords.includes("education")) {
      benefits.push({
        type: "education",
        status: "eligible",
        details: "GI Bill Education Benefits",
      });
    }

    if (
      keywords.includes("va healthcare") ||
      keywords.includes("va hospital")
    ) {
      benefits.push({
        type: "healthcare",
        status: "active",
        details: "VA Healthcare System",
      });
    }

    return benefits;
  }

  private determineEligiblePrograms(keywords: string): VeteranProgram[] {
    const programs: VeteranProgram[] = [];

    if (this.detectDisabledVeteran(keywords)) {
      programs.push("Disabled Veteran Business", "Vocational Rehabilitation");
    }

    if (keywords.includes("education") || keywords.includes("gi bill")) {
      programs.push("Education Benefits");
    }

    if (keywords.includes("home") || keywords.includes("house")) {
      programs.push("VA Home Loan");
    }

    return programs;
  }

  private calculatePriorityLevel(keywords: string): VeteranPriority {
    if (
      this.detectDisabledVeteran(keywords) ||
      this.detectCombatVeteran(keywords)
    ) {
      return "IMMEDIATE";
    }

    if (keywords.includes("veteran") || keywords.includes("military")) {
      return "HIGH";
    }

    if (
      keywords.includes("military family") ||
      keywords.includes("veteran spouse")
    ) {
      return "FAMILY";
    }

    return "STANDARD";
  }

  // Continue with remaining methods for family status, employment, housing, etc.
  private detectFamilyStatus(keywords: string, formData?: any): FamilyStatus {
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
    formData?: any,
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

  private detectHousingStatus(keywords: string, formData?: any): HousingStatus {
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
    formData?: any,
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

    // Could be enhanced with budget analysis
    return undefined;
  }

  private analyzeConstructionPriorities(
    keywords: string,
    formData?: any,
  ): ConstructionPriority[] {
    const priorities: ConstructionPriority[] = [];

    if (
      this.detectDisabledVeteran(keywords) ||
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
    formData?: any,
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

  private detectPreferredTimeline(keywords: string, formData?: any): Timeline {
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
    formData?: any,
  ): BudgetRange | undefined {
    const budgetPatterns = [
      { pattern: /\$?(\d+)k/, multiplier: 1000 },
      { pattern: /\$?(\d+),?(\d{3})/, multiplier: 1 },
      { pattern: /under\s*\$?(\d+)/, type: "under" },
      { pattern: /over\s*\$?(\d+)/, type: "over" },
    ];

    for (const { pattern, multiplier, type } of budgetPatterns) {
      const match = keywords.match(pattern);
      if (match) {
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

  private determineCommunicationStyle(keywords: string): CommunicationStyle {
    if (
      keywords.includes("formal") ||
      this.detectRankCategory(keywords) === "Officer"
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
    formData?: any,
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

  private determineRespectLevel(keywords: string): RespectLevel {
    if (
      keywords.includes("medal of honor") ||
      keywords.includes("distinguished service")
    ) {
      return "High Honors";
    }

    if (
      this.detectCombatVeteran(keywords) ||
      keywords.includes("purple heart")
    ) {
      return "Combat Valor";
    }

    if (keywords.includes("family") || keywords.includes("spouse")) {
      return "Family Respect";
    }

    return "Service Honor";
  }

  /**
   * Create profile for non-veterans (family members, etc.)
   */
  private createNonVeteranProfile(
    input: string,
    formData?: any,
    sessionData?: any,
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

    return {
      id: sessionData?.userId || `user-${Date.now()}`,
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
        formData,
      ),
      accessibilityRequirements: [],
      preferredTimeline: this.detectPreferredTimeline(keywords, formData),
      budgetRange: this.estimateBudgetRange(keywords, formData),

      communicationStyle: "Casual Friendly",
      preferredContactMethod: "Phone Call",
      militaryTerminology: false,
      respectLevel: isVeteranFamily ? "Family Respect" : "Service Honor",
    };
  }

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
