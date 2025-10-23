/**
 * Modular Estimator Form
 * Main orchestrator component that combines all form steps
 */

"use client";

import React, { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent } from "../ui";
import { EstimateResults } from "./EstimateResults";

// Import step components
import { ProjectBasicsStep } from "./steps/ProjectBasicsStep";
import { ProjectDetailsStep } from "./steps/ProjectDetailsStep";
import { ReviewStep } from "./steps/ReviewStep";

// Import types and constants
import { ProjectData, EstimateData, ValidationStatus } from "./types";
import { ENHANCED_FEATURES } from "./constants";

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

    if (currentStep >= 1) {
      if (!projectData.projectType) issues.push("Please select a project type");
      if (!projectData.location) issues.push("Please select your location");
      if (!projectData.size) issues.push("Please enter the project size");
      else if (parseInt(projectData.size) < 100)
        issues.push("Project size seems too small (minimum 100 sq ft)");
      else if (parseInt(projectData.size) > 50000)
        issues.push("Project size seems too large (maximum 50,000 sq ft)");
    }

    if (currentStep >= 2) {
      if (projectData.materials.length === 0)
        issues.push("Please select a material quality level");
    }

    return {
      isValid: issues.length === 0,
      issues,
      canProceed:
        currentStep === 1
          ? !!(
              projectData.projectType &&
              projectData.location &&
              projectData.size &&
              parseInt(projectData.size) >= 100 &&
              parseInt(projectData.size) <= 50000
            )
          : currentStep === 2
            ? projectData.materials.length > 0
            : true,
    };
  };

  const handleInputChange = (
    field: keyof ProjectData,
    value: string | string[] | number | boolean
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
      0
    );
    let veteranDiscount = 0;

    // Apply veteran discount
    if (projectData.isVeteran) {
      veteranDiscount = Math.round(totalCost * 0.1);
      totalCost -= veteranDiscount;
    }

    const estimate: EstimateData = {
      totalCost,
      breakdown,
      timeline: "4-8 weeks",
      accuracy: 85,
      veteranDiscount: projectData.isVeteran ? veteranDiscount : undefined,
    };

    setEstimate(estimate);
    setIsCalculating(false);
  };

  const validationStatus = getValidationStatus();

  // Step titles
  const stepTitles = [
    "Tell Us About Your Project",
    "Project Details & Features",
    "Review Your Information",
  ];

  const steps = [
    { number: 1, label: "Project Basics", completed: currentStep > 1 },
    { number: 2, label: "Details & Features", completed: currentStep > 2 },
    { number: 3, label: "Review & Calculate", completed: false },
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
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Steps */}
      <div className="flex justify-center items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-medium text-sm ${
                step.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : currentStep === step.number
                    ? "border-brand-primary text-brand-primary bg-white"
                    : "border-gray-300 text-gray-400 bg-white"
              }`}
            >
              {step.completed ? "✓" : step.number}
            </div>

            {/* Step Info */}
            <div className="ml-2 mr-6">
              <div
                className={`text-sm font-medium ${
                  step.completed || currentStep === step.number
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 ${
                  step.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

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
              onDataChange={handleInputChange}
              validationStatus={validationStatus}
            />
          )}

          {currentStep === 2 && (
            <ProjectDetailsStep
              projectData={projectData}
              onDataChange={handleInputChange}
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
