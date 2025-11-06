/**
 * Benefit Calculator Module
 * Handles VA benefits, eligibility, priority level calculation
 */

import type {
  VABenefit,
  VeteranProgram,
  VeteranPriority,
} from "./types/VeteranTypes";

/**
 * Calculates veteran benefits, program eligibility, and priority levels
 */
export class BenefitCalculator {
  /**
   * Detect VA benefits from keywords
   * @param keywords - Normalized lowercase text to analyze
   * @returns Array of detected VA benefits with status
   */
  detectVABenefits(keywords: string): VABenefit[] {
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

    if (
      keywords.includes("disability compensation") ||
      keywords.includes("va disability")
    ) {
      benefits.push({
        type: "disability",
        status: "active",
        details: "VA Disability Compensation",
      });
    }

    if (keywords.includes("vocational rehab") || keywords.includes("vr&e")) {
      benefits.push({
        type: "employment",
        status: "eligible",
        details: "Vocational Rehabilitation & Employment",
      });
    }

    return benefits;
  }

  /**
   * Determine eligible VA programs
   * @param keywords - Normalized lowercase text to analyze
   * @param isDisabled - Whether veteran has disability status
   * @returns Array of eligible program names
   */
  determineEligiblePrograms(
    keywords: string,
    isDisabled: boolean,
  ): VeteranProgram[] {
    const programs: VeteranProgram[] = [];

    if (isDisabled) {
      programs.push("Disabled Veteran Business", "Vocational Rehabilitation");
    }

    if (keywords.includes("education") || keywords.includes("gi bill")) {
      programs.push("Education Benefits");
    }

    if (keywords.includes("home") || keywords.includes("house")) {
      programs.push("VA Home Loan");
    }

    if (keywords.includes("business") || keywords.includes("entrepreneur")) {
      programs.push("Disabled Veteran Business");
    }

    if (keywords.includes("job") || keywords.includes("employment")) {
      programs.push("VR&E Program");
    }

    if (keywords.includes("healthcare") || keywords.includes("medical")) {
      programs.push("VA Healthcare");
    }

    return programs;
  }

  /**
   * Calculate priority level for veteran
   * @param keywords - Normalized lowercase text to analyze
   * @param isCombat - Whether veteran served in combat
   * @param isDisabled - Whether veteran has disability status
   * @returns Priority level for service
   */
  calculatePriorityLevel(
    keywords: string,
    isCombat: boolean,
    isDisabled: boolean,
  ): VeteranPriority {
    // Immediate priority for disabled or combat veterans
    if (isDisabled || isCombat) {
      return "IMMEDIATE";
    }

    // High priority for general veterans
    if (keywords.includes("veteran") || keywords.includes("military")) {
      return "HIGH";
    }

    // Family priority for veteran family members
    if (
      keywords.includes("military family") ||
      keywords.includes("veteran spouse") ||
      keywords.includes("gold star")
    ) {
      return "FAMILY";
    }

    return "STANDARD";
  }

  /**
   * Analyze benefit eligibility based on service history
   * @param serviceBranch - Branch of service
   * @param serviceEra - Era of service
   * @param yearsOfService - Years of service
   * @param isCombat - Combat veteran status
   * @returns Object describing eligibility for various benefits
   */
  analyzeBenefitEligibility(
    serviceBranch: string,
    serviceEra: string,
    yearsOfService: number | undefined,
    isCombat: boolean,
  ): {
    vaLoanEligible: boolean;
    giBillEligible: boolean;
    healthcareEligible: boolean;
    priorityGroup: number;
  } {
    const eligibility = {
      vaLoanEligible: false,
      giBillEligible: false,
      healthcareEligible: false,
      priorityGroup: 8, // Default: lowest priority
    };

    // VA Loan eligibility: 24 months active duty or 90 days during wartime
    if (yearsOfService && yearsOfService >= 2) {
      eligibility.vaLoanEligible = true;
    }

    // Combat service often qualifies for VA loan
    if (isCombat) {
      eligibility.vaLoanEligible = true;
    }

    // GI Bill eligibility: 36 months active duty for full benefits
    if (yearsOfService && yearsOfService >= 3) {
      eligibility.giBillEligible = true;
    }

    // Healthcare eligibility: Any military service
    if (serviceBranch !== "Unknown") {
      eligibility.healthcareEligible = true;
    }

    // Priority groups for VA healthcare (1 = highest, 8 = lowest)
    if (isCombat) {
      eligibility.priorityGroup = 6; // Combat veterans get at least group 6
    }

    return eligibility;
  }

  /**
   * Estimate potential benefit value
   * @param disabilityRating - Disability rating percentage
   * @param hasFamily - Whether veteran has dependents
   * @returns Estimated monthly benefit amount
   */
  estimateBenefitValue(
    disabilityRating: number | undefined,
    hasFamily: boolean,
  ): number | undefined {
    if (!disabilityRating) return undefined;

    // 2024 VA disability compensation rates (approximate)
    const baseRates: Record<number, number> = {
      10: 165,
      20: 327,
      30: 508,
      40: 731,
      50: 1041,
      60: 1319,
      70: 1663,
      80: 1933,
      90: 2172,
      100: 3737,
    };

    let monthlyAmount = baseRates[disabilityRating] || 0;

    // Add dependent allowance (simplified)
    if (hasFamily && disabilityRating >= 30) {
      monthlyAmount += 150; // Approximate dependent increase
    }

    return monthlyAmount;
  }
}
