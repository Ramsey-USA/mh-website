import type { VeteranProfile } from "@/lib/veteran/types/veteran-types";
import type { AutomatedDiscount } from "./types";

export class DiscountCalculator {
  public calculateDiscounts(profile: VeteranProfile): AutomatedDiscount[] {
    if (!profile.isVeteran) {
      return [];
    }

    const discounts: AutomatedDiscount[] = [
      {
        id: "veteran-base",
        type: "branch",
        name: "Veteran Appreciation Discount",
        percentage: 8,
        description: "Base discount applied to verified veterans",
        autoApplied: true,
        requirements: ["Veteran verification"],
        verification: {
          required: true,
          documents: ["DD-214 or military ID"],
          verificationMethod: "manual",
          status: "pending",
        },
        stackable: true,
      },
    ];

    if (profile.combatVeteran) {
      discounts.push({
        id: "veteran-combat",
        type: "combat",
        name: "Combat Veteran Bonus",
        percentage: 4,
        description: "Additional support discount for combat veterans",
        autoApplied: true,
        requirements: ["Combat service confirmation"],
        verification: {
          required: true,
          documents: ["DD-214"],
          verificationMethod: "manual",
          status: "pending",
        },
        stackable: true,
      });
    }

    if (profile.disabledVeteran) {
      discounts.push({
        id: "veteran-disabled",
        type: "disabled",
        name: "Disabled Veteran Support Discount",
        percentage: 3,
        description: "Additional support for service-connected disabilities",
        autoApplied: true,
        requirements: ["Service-connected disability verification"],
        verification: {
          required: true,
          documents: ["VA disability letter"],
          verificationMethod: "manual",
          status: "pending",
        },
        stackable: true,
      });
    }

    return discounts;
  }

  public applyDiscounts(totalAmount: number, discounts: AutomatedDiscount[]) {
    const totalPercentage = discounts.reduce((sum, d) => sum + d.percentage, 0);
    const cappedPercentage = Math.min(totalPercentage, 15);
    const totalSavings = (totalAmount * cappedPercentage) / 100;

    return {
      originalAmount: totalAmount,
      discountedAmount: Math.max(totalAmount - totalSavings, 0),
      totalSavings,
      appliedDiscounts: discounts,
    };
  }
}
