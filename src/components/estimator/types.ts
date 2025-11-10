/**
 * Estimator Form Types and Interfaces
 * Shared types for the modular estimator form components
 */

export interface ProjectData {
  projectType: string;
  location: string;
  size: string;
  timeline: string;
  budget: string;
  complexity: string;
  materials: string[];
  features: string[];
  isVeteran: boolean;
}

export interface EstimateData {
  totalCost: number;
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    overhead: number;
    contingency: number;
  };
  timeline: string;
  accuracy: number;
  confidenceScore: number; // 0-100, based on data completeness
  confidenceLevel: "low" | "medium" | "high" | "very-high";
  dataQualityFactors: {
    hasSize: boolean;
    hasMaterials: boolean;
    hasFeatures: boolean;
    hasComplexity: boolean;
    hasTimeline: boolean;
    completenessPercentage: number;
  };
  costPerSqFt: number;
  estimateRange: {
    low: number;
    expected: number;
    high: number;
  };
  veteranDiscount?: number;
}

export interface ValidationStatus {
  isValid: boolean;
  issues: string[];
  warnings: string[]; // Non-blocking suggestions
  canProceed: boolean;
  dataQuality: number; // 0-100 percentage
}

export interface EstimatorFormProps {
  projectData: ProjectData;
  onDataChange: (field: keyof ProjectData, value: unknown) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  validationStatus: ValidationStatus;
}

export interface EnhancedFeatures {
  materialDatabase: {
    [key: string]: {
      multiplier: number;
      description: string;
      examples: string;
    };
  };
  locationMultipliers: {
    [key: string]: number;
  };
  seasonalFactors: {
    [key: string]: number;
  };
  complexityMultipliers: {
    [key: string]: number;
  };
}
