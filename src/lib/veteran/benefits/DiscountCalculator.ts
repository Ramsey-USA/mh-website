/**
 * Discount Calculator
 * Automated discount calculation and verification for veterans
 */

import type { VeteranProfile } from "../VeteranProfileEngine";
import type { AutomatedDiscount } from "./types";

export class DiscountCalculator {
  /**
   * Generate automated discounts with verification
   */
  public calculateDiscounts(profile: VeteranProfile): AutomatedDiscount[] {
    const discounts: AutomatedDiscount[] = [];

    if (!profile.isVeteran) {
      // Military family discount
      if (profile.familyStatus === "Military Family") {
        discounts.push(this.createMilitaryFamilyDiscount());
      }
      return discounts;
    }

    // Base veteran discount
    discounts.push(this.createBaseVeteranDiscount(profile));

    // Combat veteran additional discount
    if (profile.combatVeteran) {
      discounts.push(this.createCombatVeteranDiscount());
    }

    // Disabled veteran discount
    if (profile.disabledVeteran) {
      discounts.push(this.createDisabledVeteranDiscount(profile));
    }

    // Era-specific discounts
    if (
      profile.serviceEra === "GWOT (2001-Present)" ||
      profile.serviceEra === "Post-9/11"
    ) {
      discounts.push(this.createPost911Discount());
    }

    // Emergency/immediate need discount
    if (
      profile.priorityLevel === "IMMEDIATE" &&
      (profile.adaptiveNeeds.length > 0 ||
        profile.accessibilityRequirements.length > 0)
    ) {
      discounts.push(this.createEmergencyAccessibilityDiscount());
    }

    return discounts;
  }

  /**
   * Apply discounts to a total amount
   */
  public applyDiscounts(
    totalAmount: number,
    discounts: AutomatedDiscount[],
  ): {
    originalAmount: number;
    discountedAmount: number;
    totalSavings: number;
    appliedDiscounts: AutomatedDiscount[];
  } {
    let discountedAmount = totalAmount;
    const appliedDiscounts: AutomatedDiscount[] = [];

    // Separate stackable and non-stackable discounts
    const stackableDiscounts = discounts.filter((d) => d.stackable);
    const nonStackableDiscounts = discounts.filter((d) => !d.stackable);

    // Apply the best non-stackable discount first
    if (nonStackableDiscounts.length > 0) {
      const bestDiscount = nonStackableDiscounts.reduce((best, current) =>
        current.percentage > best.percentage ? current : best,
      );

      const savings = totalAmount * (bestDiscount.percentage / 100);
      const actualSavings = bestDiscount.maxSavings
        ? Math.min(savings, bestDiscount.maxSavings)
        : savings;

      discountedAmount -= actualSavings;
      appliedDiscounts.push(bestDiscount);
    } else {
      // Apply all stackable discounts
      for (const discount of stackableDiscounts) {
        const savings = totalAmount * (discount.percentage / 100);
        const actualSavings = discount.maxSavings
          ? Math.min(savings, discount.maxSavings)
          : savings;

        discountedAmount -= actualSavings;
        appliedDiscounts.push(discount);
      }
    }

    return {
      originalAmount: totalAmount,
      discountedAmount: Math.max(0, discountedAmount),
      totalSavings: totalAmount - discountedAmount,
      appliedDiscounts,
    };
  }

  /**
   * Create military family discount
   */
  private createMilitaryFamilyDiscount(): AutomatedDiscount {
    return {
      id: "military_family",
      type: "family",
      name: "Military Family Appreciation",
      percentage: 5,
      description: "Supporting military families with dedicated pricing",
      autoApplied: true,
      requirements: ["Military family member verification"],
      verification: {
        required: true,
        documents: ["Military spouse ID", "Dependent ID"],
        verificationMethod: "military_id",
        status: "pending",
      },
      stackable: false,
    };
  }

  /**
   * Create base veteran discount
   */
  private createBaseVeteranDiscount(
    profile: VeteranProfile,
  ): AutomatedDiscount {
    return {
      id: "veteran_base",
      type: "branch",
      name: `${profile.serviceBranch} Veteran Discount`,
      percentage: 8,
      description: `Honoring ${profile.serviceBranch} veterans with dedicated pricing`,
      autoApplied: true,
      requirements: ["Veteran status verification"],
      verification: {
        required: true,
        documents: ["DD-214", "Military ID", "Veteran ID card"],
        verificationMethod: "dd214",
        status: "pending",
      },
      stackable: true,
    };
  }

  /**
   * Create combat veteran discount
   */
  private createCombatVeteranDiscount(): AutomatedDiscount {
    return {
      id: "combat_veteran",
      type: "combat",
      name: "Combat Veteran Honor Discount",
      percentage: 4,
      description: "Additional savings for veterans who served in combat zones",
      autoApplied: true,
      requirements: ["Combat deployment verification"],
      verification: {
        required: true,
        documents: ["DD-214 with combat designations", "Combat medals"],
        verificationMethod: "dd214",
        status: "pending",
      },
      stackable: true,
    };
  }

  /**
   * Create disabled veteran discount
   */
  private createDisabledVeteranDiscount(
    profile: VeteranProfile,
  ): AutomatedDiscount {
    const disabilityPercentage = profile.disabilityRating || 30;
    let discountPercentage = 3;

    if (disabilityPercentage >= 70) {
      discountPercentage = 5;
    } else if (disabilityPercentage >= 50) {
      discountPercentage = 4;
    }

    return {
      id: "disabled_veteran",
      type: "disabled",
      name: "Disabled Veteran Service Discount",
      percentage: discountPercentage,
      description: `Additional ${discountPercentage}% for veterans with service-connected disabilities`,
      autoApplied: true,
      requirements: ["VA disability rating verification"],
      verification: {
        required: true,
        documents: ["VA disability letter", "VA ID card"],
        verificationMethod: "va_api",
        status: "pending",
      },
      stackable: true,
    };
  }

  /**
   * Create Post-9/11 veteran discount
   */
  private createPost911Discount(): AutomatedDiscount {
    return {
      id: "post_911",
      type: "era",
      name: "Post-9/11 Veteran Recognition",
      percentage: 2,
      description: "Recognizing Post-9/11 veterans with additional savings",
      autoApplied: true,
      requirements: ["Post-9/11 service verification"],
      verification: {
        required: false,
        documents: ["DD-214 with service dates"],
        verificationMethod: "dd214",
        status: "verified",
      },
      stackable: true,
    };
  }

  /**
   * Create emergency accessibility discount
   */
  private createEmergencyAccessibilityDiscount(): AutomatedDiscount {
    return {
      id: "emergency_accessibility",
      type: "emergency",
      name: "Emergency Accessibility Discount",
      percentage: 10,
      description: "Emergency accessibility modifications for immediate needs",
      autoApplied: true,
      requirements: ["Medical necessity documentation"],
      verification: {
        required: true,
        documents: ["VA medical recommendation", "Doctor prescription"],
        verificationMethod: "manual",
        status: "pending",
      },
      maxSavings: 5000,
      stackable: false,
    };
  }
}
