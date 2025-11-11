/**
 * Modular Estimator Form
 * Main orchestrator component that combines all form steps
 */

"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent } from "../ui";
import { EstimateResults } from "./EstimateResults";
import { FormProgress } from "../forms";

// Import step components
import { ProjectBasicsStep } from "./steps/ProjectBasicsStep";
import { ProjectDetailsStep } from "./steps/ProjectDetailsStep";
import { ReviewStep } from "./steps/ReviewStep";

// Import types and constants
import {
  type ProjectData,
  type EstimateData,
  type ValidationStatus,
} from "./types";
import { ENHANCED_FEATURES } from "./constants";
import { computeEstimatePreview, suggestDefaults } from "./SmartDefaults";

export function EstimatorForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectType: "",
    location: "",
    size: "",
    timeline: "",
    budget: "",
    complexity: "",
    materials: [],
    features: [],
    isVeteran: false,
  });
  const [estimate, setEstimate] = useState<EstimateData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [preview, setPreview] = useState<Partial<EstimateData> | null>(null);
  const [suggestions, setSuggestions] = useState<Record<string, unknown>>({});

  // Load saved progress on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("estimator_form_data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          const savedAt = new Date(parsed.savedAt);
          const hoursSinceSave =
            (Date.now() - savedAt.getTime()) / (1000 * 60 * 60);

          // Only restore if saved within last 7 days
          if (hoursSinceSave < 168) {
            // Auto-restore recent estimates (within 7 days)
            // TODO: Add user confirmation dialog UI
            const shouldRestore = true; // Automatically restore for now
            if (shouldRestore) {
              setCurrentStep(parsed.currentStep);
              setProjectData(parsed.projectData);
            } else {
              localStorage.removeItem("estimator_form_data");
            }
          } else {
            localStorage.removeItem("estimator_form_data");
          }
        } catch (_error) {
          console.error("Error loading saved estimator data:", _error);
        }
      }
    }
  }, []);

  // Get current season for pricing
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) return "winter";
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    return "fall";
  };

  // Enhanced form validation with helpful messages
  const getValidationStatus = (): ValidationStatus => {
    const issues = [];
    const warnings = [];

    if (currentStep >= 1) {
      if (!projectData.projectType) issues.push("Please select a project type");
      if (!projectData.location) issues.push("Please select your location");
      if (!projectData.size) {
        issues.push("Please enter the project size");
      } else if (parseInt(projectData.size) < 100) {
        issues.push("Project size seems too small (minimum 100 sq ft)");
      } else if (parseInt(projectData.size) > 50000) {
        issues.push("Project size seems too large (maximum 50,000 sq ft)");
      }

      // Add warnings for better accuracy
      if (!projectData.timeline) {
        warnings.push("Adding a timeline helps improve estimate accuracy");
      }
      if (!projectData.budget) {
        warnings.push("Budget range helps us provide more targeted estimates");
      }
    }

    if (currentStep >= 2) {
      if (projectData.materials.length === 0) {
        issues.push("Please select a material quality level");
      }
      if (projectData.features.length === 0) {
        warnings.push("Adding features helps create a more detailed estimate");
      }
      if (!projectData.complexity) {
        warnings.push("Project complexity affects timeline and coordination");
      }
    }

    // Calculate data quality score
    const totalPossibleFields = 9; // All fields in ProjectData
    const filledFields = [
      projectData.projectType,
      projectData.location,
      projectData.size,
      projectData.timeline,
      projectData.budget,
      projectData.complexity,
      projectData.materials.length > 0,
      projectData.features.length > 0,
      projectData.isVeteran !== undefined,
    ].filter(Boolean).length;

    const dataQuality = Math.round((filledFields / totalPossibleFields) * 100);

    return {
      isValid: issues.length === 0,
      issues,
      warnings,
      dataQuality,
      canProceed:
        currentStep === 1
          ? Boolean(
              projectData.projectType &&
                projectData.location &&
                projectData.size &&
                parseInt(projectData.size) >= 100 &&
                parseInt(projectData.size) <= 50000,
            )
          : currentStep === 2
            ? projectData.materials.length > 0
            : true,
    };
  };

  const handleInputChange = (
    field: keyof ProjectData,
    value: string | string[] | number | boolean,
  ) => {
    setProjectData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof ProjectData, value: string) => {
    setProjectData((prev) => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const calculateEstimate = async () => {
    setIsCalculating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const baseRates = {
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
    const sizeMultiplier = parseInt(projectData.size) || 1000;

    // Apply material multiplier
    const materialData =
      ENHANCED_FEATURES.materialDatabase[
        projectData
          .materials[0] as keyof typeof ENHANCED_FEATURES.materialDatabase
      ];
    const materialMultiplier = materialData?.multiplier || 1.0;

    // Apply location multiplier
    const locationMultiplier =
      ENHANCED_FEATURES.locationMultipliers[
        projectData.location as keyof typeof ENHANCED_FEATURES.locationMultipliers
      ] || 1.0;

    // Apply seasonal multiplier
    const seasonalMultiplier =
      ENHANCED_FEATURES.seasonalFactors[
        getCurrentSeason() as keyof typeof ENHANCED_FEATURES.seasonalFactors
      ];

    // Feature multiplier (each feature adds ~5%)
    const featureMultiplier = 1 + projectData.features.length * 0.05;

    // Calculate base cost
    const baseCost =
      baseCostPerSqFt *
      sizeMultiplier *
      materialMultiplier *
      locationMultiplier *
      seasonalMultiplier *
      featureMultiplier;

    // Breakdown
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

    let totalCost = Object.values(breakdown).reduce(
      (sum, cost) => sum + cost,
      0,
    );
    let veteranDiscount = 0;

    // Apply veteran discount
    if (projectData.isVeteran) {
      veteranDiscount = Math.round(totalCost * 0.1);
      totalCost -= veteranDiscount;
    }

    // Calculate confidence score based on data completeness
    const dataQualityFactors = {
      hasSize: Boolean(projectData.size),
      hasMaterials: projectData.materials.length > 0,
      hasFeatures: projectData.features.length > 0,
      hasComplexity: Boolean(projectData.complexity),
      hasTimeline: Boolean(projectData.timeline),
      completenessPercentage: 0,
    };

    // Calculate completeness
    const factors = Object.values(dataQualityFactors).filter(
      (v) => typeof v === "boolean",
    );
    dataQualityFactors.completenessPercentage = Math.round(
      (factors.filter(Boolean).length / factors.length) * 100,
    );

    // Confidence score: base 60% + up to 40% from data quality
    const confidenceScore = Math.min(
      60 + Math.round(dataQualityFactors.completenessPercentage * 0.4),
      95,
    );

    // Confidence level
    let confidenceLevel: "low" | "medium" | "high" | "very-high";
    if (confidenceScore >= 85) confidenceLevel = "very-high";
    else if (confidenceScore >= 75) confidenceLevel = "high";
    else if (confidenceScore >= 65) confidenceLevel = "medium";
    else confidenceLevel = "low";

    // Calculate cost per square foot
    const costPerSqFt = Math.round(totalCost / parseInt(projectData.size));

    // Calculate estimate range (±15% with confidence adjustments)
    const rangeMultiplier = confidenceScore >= 80 ? 0.12 : 0.15;
    const estimateRange = {
      low: Math.round(totalCost * (1 - rangeMultiplier)),
      expected: totalCost,
      high: Math.round(totalCost * (1 + rangeMultiplier)),
    };

    const estimate: EstimateData = {
      totalCost,
      breakdown,
      timeline: "4-8 weeks",
      accuracy: 85,
      confidenceScore,
      confidenceLevel,
      dataQualityFactors,
      costPerSqFt,
      estimateRange,
      veteranDiscount: projectData.isVeteran ? veteranDiscount : 0,
    };

    setEstimate(estimate);
    setIsCalculating(false);
  };

  const validationStatus = getValidationStatus();

  // Compute a lightweight preview and suggestions on projectData changes (debounced)
  useEffect(() => {
    const tid = setTimeout(() => {
      try {
        const p = computeEstimatePreview(projectData);
        setPreview(p);
        setSuggestions(suggestDefaults(projectData));
      } catch {
        setPreview(null);
        setSuggestions({});
      }
    }, 200);

    return () => clearTimeout(tid);
  }, [projectData]);

  // Step titles
  const stepTitles = [
    "Tell Us About Your Project",
    "Project Details & Features",
    "Review Your Information",
  ];

  if (estimate) {
    return (
      <EstimateResults
        estimate={estimate}
        projectData={projectData}
        onStartOver={() => {
          setEstimate(null);
          setCurrentStep(1);
          setProjectData({
            projectType: "",
            location: "",
            size: "",
            timeline: "",
            budget: "",
            complexity: "",
            materials: [],
            features: [],
            isVeteran: false,
          });
          // Clear saved data
          if (typeof window !== "undefined") {
            localStorage.removeItem("estimator_form_data");
          }
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl estimator-form">
      {/** onDataChange is adapted inline to coerce unknown to allowed union */}
      {/* Progress Indicator */}
      <FormProgress
        currentStep={currentStep}
        steps={[
          {
            number: 1,
            label: "Project Basics",
            icon: "info",
            description: "Project type, location, and size",
          },
          {
            number: 2,
            label: "Details & Features",
            icon: "tune",
            description: "Materials, features, and timeline",
          },
          {
            number: 3,
            label: "Review & Calculate",
            icon: "calculate",
            description: "Review and get your estimate",
          },
        ]}
        showPercentage={true}
        enableSaveResume={true}
        onSave={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "estimator_form_data",
              JSON.stringify({
                currentStep,
                projectData,
                savedAt: new Date().toISOString(),
              }),
            );
          }
        }}
        variant="default"
        className="mb-8"
      />

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {stepTitles[currentStep - 1]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Render Current Step */}
          {currentStep === 1 && (
            <ProjectBasicsStep
              projectData={projectData}
              onDataChange={(field, value) =>
                handleInputChange(
                  field,
                  value as string | string[] | number | boolean,
                )
              }
              validationStatus={validationStatus}
            />
          )}

          {currentStep === 2 && (
            <ProjectDetailsStep
              projectData={projectData}
              onDataChange={(field, value) =>
                handleInputChange(
                  field,
                  value as string | string[] | number | boolean,
                )
              }
              onArrayToggle={handleArrayToggle}
              validationStatus={validationStatus}
            />
          )}

          {currentStep === 3 && (
            <ReviewStep
              projectData={projectData}
              isCalculating={isCalculating}
              onCalculateEstimate={calculateEstimate}
              validationStatus={validationStatus}
            />
          )}

          {/* Real-time preview and smart defaults (Phase 1.3) */}
          {preview && (
            <div className="mt-6 p-4 rounded-md border bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Live preview</div>
                  <div className="text-2xl font-semibold">
                    {preview.estimateRange
                      ? `$${preview.estimateRange.expected.toLocaleString()}`
                      : preview.totalCost
                        ? `$${preview.totalCost.toLocaleString()}`
                        : "—"}
                  </div>
                  {preview.costPerSqFt ? (
                    <div className="text-sm text-gray-600">
                      {`~ $${preview.costPerSqFt.toLocaleString()} / sq ft`}
                    </div>
                  ) : null}
                </div>

                {preview.estimateRange ? (
                  <div className="text-right text-sm text-gray-600">
                    <div className="text-xs">Range</div>
                    <div>
                      ${preview.estimateRange.low.toLocaleString()} — $
                      {preview.estimateRange.high.toLocaleString()}
                    </div>
                  </div>
                ) : null}
              </div>

              {Object.keys(suggestions).length > 0 && (
                <div className="mt-3 grid gap-2">
                  {Object.entries(suggestions).map(([k, v]) => {
                    const s = v as { suggested?: string; reasoning?: string };
                    return (
                      <div key={k} className="p-2 bg-white rounded border">
                        <div className="text-sm font-medium">{k}</div>
                        <div className="text-sm text-gray-700">
                          {s.suggested}
                        </div>
                        {s.reasoning ? (
                          <div className="text-xs text-gray-500">
                            {s.reasoning}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              ← Previous
            </Button>

            {currentStep < 3 && (
              <Button
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                disabled={!validationStatus.canProceed}
              >
                {currentStep === 2 ? "Review & Calculate" : "Next"} →
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
