/**
 * SmartDefaults - Suggest defaults and compute synchronous estimate previews
 */

import { ENHANCED_FEATURES } from "./constants";
import type { ProjectData, EstimateData } from "./types";

export function suggestDefaults(projectData: Partial<ProjectData>) {
  const suggestions: Record<string, unknown> = {};

  // Suggest materials based on project type and budget
  if (
    projectData.budget &&
    projectData.projectType === "Kitchen Remodel" &&
    projectData.budget.includes("50")
  ) {
    suggestions["materials"] = {
      suggested: "High-Quality Standard",
      reasoning: "Most popular for kitchens in this budget range",
    };
  }

  // Suggest timeline based on season
  const month = new Date().getMonth();
  const season =
    month >= 5 && month <= 8
      ? "summer"
      : month >= 11 || month <= 1
        ? "winter"
        : "spring";
  if (season === "winter") {
    suggestions["timeline"] = {
      suggested: "3-6-months",
      reasoning:
        "Starting in spring provides better weather and material availability",
    };
  }

  // Suggest complexity based on features
  if (projectData.features && projectData.features.length > 5) {
    suggestions["complexity"] = {
      suggested: "Complex",
      reasoning: "Multiple custom features indicate higher coordination needs",
    };
  }

  // Default material if none chosen
  if (!projectData.materials || projectData.materials.length === 0) {
    suggestions["materials"] = (suggestions["materials"] as unknown) || {
      suggested: "Standard Grade",
      reasoning: "Good balance of cost and quality for most projects",
    };
  }

  return suggestions;
}

export function computeEstimatePreview(
  projectData: ProjectData,
): Partial<EstimateData> {
  // Lightweight synchronous estimate calculation mirroring calculateEstimate
  const baseRates: Record<string, number> = {
    "Custom Home": 180,
    "Home Addition": 160,
    "Kitchen Remodel": 200,
    "Bathroom Remodel": 220,
    "Deck/Patio": 80,
    "Commercial Building": 140,
    Renovation: 120,
    Other: 150,
  };

  const baseCostPerSqFt =
    baseRates[projectData.projectType as keyof typeof baseRates] || 150;
  const size = parseInt(projectData.size) || 1000;

  const materialKey =
    (projectData.materials && projectData.materials[0]) || "Standard Grade";
  const materialData =
    ENHANCED_FEATURES.materialDatabase[
      materialKey as keyof typeof ENHANCED_FEATURES.materialDatabase
    ];
  const materialMultiplier = materialData?.multiplier || 1.0;

  const locationMultiplier =
    ENHANCED_FEATURES.locationMultipliers[
      projectData.location as keyof typeof ENHANCED_FEATURES.locationMultipliers
    ] || 1.0;

  const seasonKey = (() => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) return "winter" as const;
    if (month >= 2 && month <= 4) return "spring" as const;
    if (month >= 5 && month <= 7) return "summer" as const;
    return "fall" as const;
  })();

  const seasonalMultiplier =
    ENHANCED_FEATURES.seasonalFactors[
      seasonKey as keyof typeof ENHANCED_FEATURES.seasonalFactors
    ];

  const featureMultiplier = 1 + (projectData.features?.length || 0) * 0.05;

  const baseCost =
    baseCostPerSqFt *
    size *
    materialMultiplier *
    locationMultiplier *
    seasonalMultiplier *
    featureMultiplier;

  const materialsPercent = 0.45;
  const laborPercent = 0.35;
  const permitsPercent = 0.05;
  const overheadPercent = 0.1;
  const contingencyPercent = 0.05;

  const breakdown = {
    materials: Math.round(baseCost * materialsPercent),
    labor: Math.round(baseCost * laborPercent),
    permits: Math.round(baseCost * permitsPercent),
    overhead: Math.round(baseCost * overheadPercent),
    contingency: Math.round(baseCost * contingencyPercent),
  };

  let totalCost = Object.values(breakdown).reduce((s, v) => s + v, 0);
  let veteranDiscount = 0;
  if (projectData.isVeteran) {
    veteranDiscount = Math.round(totalCost * 0.1);
    totalCost -= veteranDiscount;
  }

  const costPerSqFt = Math.round(totalCost / (size || 1));

  const estimateRange = {
    low: Math.round(totalCost * 0.85),
    expected: totalCost,
    high: Math.round(totalCost * 1.15),
  };

  return {
    totalCost,
    breakdown,
    costPerSqFt,
    estimateRange,
    veteranDiscount,
  } as Partial<EstimateData>;
}
