/**
 * Timeline Detector Module
 * Handles deployment history analysis, combat theater detection, and service timeline estimation
 */

import type {
  DeploymentRecord,
  CombatTheater,
  ServiceBranch,
} from "./types/VeteranTypes";

/**
 * Analyzes military service timeline and deployment history
 */
export class TimelineDetector {
  /**
   * Detect if veteran has combat experience
   * @param keywords - Normalized lowercase text to analyze
   * @returns True if combat veteran indicators are found
   */
  detectCombatVeteran(keywords: string): boolean {
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

  /**
   * Analyze deployment history from keywords
   * @param keywords - Normalized lowercase text to analyze
   * @param serviceBranch - The veteran's service branch
   * @param isCombatVet - Whether the veteran has combat experience
   * @returns Array of deployment records
   */
  analyzeDeploymentHistory(
    keywords: string,
    serviceBranch: ServiceBranch,
    isCombatVet: boolean,
  ): DeploymentRecord[] {
    const deployments: DeploymentRecord[] = [];

    // Iraq deployments
    if (keywords.includes("iraq") || keywords.includes("oif")) {
      deployments.push({
        theater: "Iraq (OIF)",
        startDate: new Date("2003-01-01"), // Placeholder - would need actual date parsing
        endDate: new Date("2003-12-31"), // Placeholder - would need actual date parsing
        branch: serviceBranch,
        combatRole: isCombatVet,
      });
    }

    // Afghanistan deployments
    if (keywords.includes("afghanistan") || keywords.includes("oef")) {
      deployments.push({
        theater: "Afghanistan (OEF)",
        startDate: new Date("2001-01-01"), // Placeholder
        endDate: new Date("2001-12-31"), // Placeholder
        branch: serviceBranch,
        combatRole: isCombatVet,
      });
    }

    // Syria deployments
    if (keywords.includes("syria") || keywords.includes("oir")) {
      deployments.push({
        theater: "Syria (OIR)",
        startDate: new Date("2014-01-01"), // Placeholder
        endDate: new Date("2014-12-31"), // Placeholder
        branch: serviceBranch,
        combatRole: isCombatVet,
      });
    }

    // Gulf War deployments
    if (
      keywords.includes("gulf war") ||
      keywords.includes("desert storm") ||
      keywords.includes("desert shield")
    ) {
      deployments.push({
        theater: "Gulf War",
        startDate: new Date("1990-08-01"), // Placeholder
        endDate: new Date("1991-02-28"), // Placeholder
        branch: serviceBranch,
        combatRole: isCombatVet,
      });
    }

    // Vietnam deployments
    if (keywords.includes("vietnam")) {
      deployments.push({
        theater: "Vietnam",
        startDate: new Date("1965-01-01"), // Placeholder
        endDate: new Date("1973-12-31"), // Placeholder
        branch: serviceBranch,
        combatRole: isCombatVet,
      });
    }

    // Korean War deployments
    if (keywords.includes("korea") || keywords.includes("korean war")) {
      deployments.push({
        theater: "Korea",
        startDate: new Date("1950-06-25"), // Placeholder
        endDate: new Date("1953-07-27"), // Placeholder
        branch: serviceBranch,
        combatRole: isCombatVet,
      });
    }

    return deployments;
  }

  /**
   * Detect combat theaters veteran served in
   * @param keywords - Normalized lowercase text to analyze
   * @returns Array of combat theaters
   */
  detectCombatTheaters(keywords: string): CombatTheater[] {
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

    Object.entries(theaterMap).forEach(([theater, keywordsList]) => {
      if (keywordsList.some((keyword) => keywords.includes(keyword))) {
        theaters.push(theater as CombatTheater);
      }
    });

    return theaters;
  }

  /**
   * Detect if veteran had multiple deployments
   * @param keywords - Normalized lowercase text to analyze
   * @returns True if multiple deployment indicators found
   */
  detectMultipleDeployments(keywords: string): boolean {
    const multipleIndicators = [
      "multiple deployments",
      "several tours",
      "three tours",
      "four tours",
      "back to back",
      "consecutive deployments",
      "multiple times",
      "two deployments",
      "twice deployed",
    ];

    return multipleIndicators.some((indicator) => keywords.includes(indicator));
  }

  /**
   * Estimate years of service from keyword patterns
   * @param keywords - Normalized lowercase text to analyze
   * @returns Estimated years or undefined if not found
   */
  estimateYearsOfService(keywords: string): number | undefined {
    const yearPatterns = [
      /(\d+)\s*years?\s*(of\s*)?service/,
      /served\s*(\d+)\s*years?/,
      /(\d+)\s*year\s*(tour|stint|career)/,
      /(\d+)\s*years?\s*active\s*duty/,
      /(\d+)\s*years?\s*in\s*the\s*(army|navy|marines|air\s*force|coast\s*guard)/,
    ];

    for (const pattern of yearPatterns) {
      const match = keywords.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }

    // Check for career indicators
    if (keywords.includes("20 year") || keywords.includes("retired")) {
      return 20; // Typical military retirement
    }

    if (keywords.includes("career military") || keywords.includes("lifer")) {
      return 25; // Estimate for career service members
    }

    return undefined;
  }
}
