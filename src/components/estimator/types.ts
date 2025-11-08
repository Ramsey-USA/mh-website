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
  veteranDiscount?: number;
}

export interface ValidationStatus {
  isValid: boolean;
  issues: string[];
  canProceed: boolean;
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
