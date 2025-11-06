/**
 * Profile Analyzer Module
 * Handles veteran status detection, service branch identification, era detection, and rank classification
 */

import type {
  ServiceBranch,
  ServiceEra,
  RankCategory,
} from "./types/VeteranTypes";

/**
 * Analyzes veteran profile information from keyword inputs
 */
export class ProfileAnalyzer {
  /**
   * Enhanced veteran status detection with confidence scoring
   * @param keywords - Normalized lowercase text to analyze
   * @returns Object with veteran status and confidence score (0-100)
   */
  detectVeteranStatus(keywords: string): {
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
   * @param keywords - Normalized lowercase text to analyze
   * @returns The detected service branch or "Unknown"
   */
  detectServiceBranch(keywords: string): ServiceBranch {
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
   * @param keywords - Normalized lowercase text to analyze
   * @returns Array of additional service branches
   */
  detectSecondaryBranches(keywords: string): ServiceBranch[] {
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
   * @param keywords - Normalized lowercase text to analyze
   * @returns The detected service era or "Unknown"
   */
  detectServiceEra(keywords: string): ServiceEra {
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
    const erasWithScores = Object.entries(eraScores).filter(
      ([_, score]) => score > 0,
    );
    if (erasWithScores.length > 1) {
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
   * @param keywords - Normalized lowercase text to analyze
   * @returns The detected rank category or "Unknown"
   */
  detectRankCategory(keywords: string): RankCategory {
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
   * @param keywords - Normalized lowercase text to analyze
   * @returns The specific rank or undefined
   */
  detectSpecificRank(keywords: string): string | undefined {
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

  /**
   * Estimate years of service from keywords
   * @param keywords - Normalized lowercase text to analyze
   * @returns Estimated years or undefined
   */
  estimateYearsOfService(keywords: string): number | undefined {
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
}
