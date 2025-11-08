/**
 * AI System Type Definitions
 * Centralized types for the MH Construction AI system
 */

export interface ConstructionIntel {
  projectTypes: Record<string, string>;
  materialSpecs: Record<string, string>;
  locationIntel: Record<string, string>;
  veteranProtocols: Record<string, string>;
  timelineStrategies: Record<string, string>;
}

export interface AIResponse {
  response: string;
  confidence?: number;
  context?: unknown;
  sessionId?: string;
}

export interface EnhancedFormResult {
  response: unknown;
  veteranHandling?: unknown;
  discounts?: unknown;
  nextSteps: string[];
}

export interface EstimateInput {
  projectType: string;
  budget?: string;
  timeline?: string;
  location?: string;
  description?: string;
}

export interface LeadIntelligence {
  projectType: string;
  budgetRange: string;
  timeline: string;
  priority: string;
  classification: string;
  location?: string;
  veteranStatus?: boolean;
}

export interface AIConfig {
  cacheEnabled: boolean;
  veteranSystemEnabled: boolean;
  debugMode: boolean;
}

// Form types
export type FormType = "contact" | "estimate" | "booking";

// Project categories
export type ProjectCategory =
  | "residential"
  | "commercial"
  | "renovation"
  | "addition"
  | "deck"
  | "kitchen"
  | "bathroom";

// Priority levels
export type PriorityLevel = "low" | "medium" | "high" | "critical";

// Budget ranges
export type BudgetRange =
  | "under_10k"
  | "10k_25k"
  | "25k_50k"
  | "50k_100k"
  | "100k_plus";

// Timeline categories
export type TimelineCategory =
  | "immediate"
  | "urgent"
  | "standard"
  | "extended"
  | "complex";
