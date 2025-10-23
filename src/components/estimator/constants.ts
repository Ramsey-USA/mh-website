/**
 * Estimator Form Constants
 * Shared constants and data arrays for the estimator form
 */

export const PROJECT_TYPES = [
  "Custom Home",
  "Home Addition",
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Deck/Patio",
  "Commercial Building",
  "Renovation",
  "Other",
];

export const LOCATIONS = [
  "Pasco, WA",
  "Kennewick, WA",
  "Richland, WA",
  "Walla Walla, WA",
  "Yakima, WA",
  "Spokane, WA",
  "Other Washington",
  "Other",
];

export const MATERIAL_OPTIONS = [
  "Premium/Luxury",
  "High-Quality Standard",
  "Standard Grade",
  "Budget-Friendly",
];

export const FEATURE_OPTIONS = [
  "Smart Home Technology",
  "Energy Efficient Systems",
  "Custom Cabinetry",
  "High-End Appliances",
  "Hardwood Flooring",
  "Stone/Tile Work",
  "Custom Lighting",
  "Landscaping",
  "Pool/Spa",
  "Security System",
];

export const COMPLEXITY_OPTIONS = [
  "Simple",
  "Standard",
  "Complex",
  "Very Complex",
];

export const ENHANCED_FEATURES = {
  // Enhanced material database with descriptions and multipliers
  materialDatabase: {
    "Premium/Luxury": {
      multiplier: 1.4,
      description: "High-end finishes, custom materials, luxury fixtures",
      examples: "Hardwood, natural stone, custom cabinetry",
    },
    "High-Quality Standard": {
      multiplier: 1.2,
      description: "Quality materials, good finishes, standard upgrades",
      examples: "Engineered wood, quality tile, standard appliances",
    },
    "Standard Grade": {
      multiplier: 1.0,
      description: "Standard construction materials, basic finishes",
      examples: "Vinyl, standard tile, basic fixtures",
    },
    "Budget-Friendly": {
      multiplier: 0.8,
      description: "Cost-effective options, basic materials",
      examples: "Laminate, basic tile, economy fixtures",
    },
  },

  // Location-based cost adjustments (Pacific Northwest specific)
  locationMultipliers: {
    "Pasco, WA": 1.0,
    "Kennewick, WA": 1.05,
    "Richland, WA": 1.08,
    "Walla Walla, WA": 1.03,
    "Yakima, WA": 1.02,
    "Spokane, WA": 1.15,
    "Other Washington": 1.1,
    Other: 1.2,
  },

  // Seasonal cost factors
  seasonalFactors: {
    winter: 1.1, // Higher costs in winter (Dec-Feb)
    spring: 1.0, // Standard rates (Mar-May)
    summer: 0.95, // Slightly lower in peak season (Jun-Aug)
    fall: 1.0, // Standard rates (Sep-Nov)
  },

  // Project complexity adjustments
  complexityMultipliers: {
    Simple: 0.9,
    Standard: 1.0,
    Complex: 1.3,
    "Very Complex": 1.6,
  },
};
