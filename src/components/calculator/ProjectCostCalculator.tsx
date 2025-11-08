/**
 * Project Cost Calculator Widget
 * Interactive cost estimation tool for quick budget planning
 *
 * Features:
 * - Project type selector with descriptions
 * - Size/scope slider
 * - Quality level selector
 * - Timeline options
 * - Real-time cost updates
 * - Veteran discount toggle
 * - CTA to full estimator or booking
 *
 * Expected Impact: +40% engagement, +25% qualified leads
 */

"use client";

import { useState, useMemo } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useGlobalChatbot } from "@/providers/GlobalChatbotProvider";

export interface ProjectCostCalculatorProps {
  /** Optional: Custom className for wrapper */
  className?: string;
  /** Optional: Variant style */
  variant?: "default" | "compact" | "featured";
  /** Optional: Show veteran discount option */
  showVeteranDiscount?: boolean;
  /** Optional: Initial project type */
  initialProjectType?: string;
  /** Optional: Enable chatbot handoff button */
  enableChatbotHandoff?: boolean;
  /** Optional: Callback when user clicks "Get Detailed Estimate" */
  onGetDetailedEstimate?: (data: CalculatorData) => void;
}

export interface CalculatorData {
  projectType: string;
  scope: number; // 1-5 scale
  quality: string;
  timeline: string;
  isVeteran: boolean;
  estimatedCost: {
    min: number;
    max: number;
    display: string;
  };
}

interface ProjectType {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseMin: number;
  baseMax: number;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "commercial",
    name: "Commercial Building",
    description: "Office buildings, retail spaces, warehouses",
    icon: "business",
    baseMin: 140,
    baseMax: 220,
  },
  {
    id: "custom-home",
    name: "Custom Home",
    description: "New residential construction",
    icon: "home",
    baseMin: 180,
    baseMax: 280,
  },
  {
    id: "addition",
    name: "Home Addition",
    description: "Room additions, garage conversions",
    icon: "home_work",
    baseMin: 160,
    baseMax: 240,
  },
  {
    id: "kitchen",
    name: "Kitchen Remodel",
    description: "Complete kitchen renovation",
    icon: "countertops",
    baseMin: 200,
    baseMax: 350,
  },
  {
    id: "bathroom",
    name: "Bathroom Remodel",
    description: "Full bathroom renovation",
    icon: "bathtub",
    baseMin: 220,
    baseMax: 380,
  },
  {
    id: "outdoor",
    name: "Deck/Patio",
    description: "Outdoor living spaces",
    icon: "deck",
    baseMin: 80,
    baseMax: 160,
  },
];

const QUALITY_LEVELS = [
  {
    id: "standard",
    name: "Standard",
    multiplier: 1.0,
    description: "Quality materials, professional finish",
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 1.3,
    description: "High-end materials, custom finishes",
  },
  {
    id: "luxury",
    name: "Luxury",
    multiplier: 1.6,
    description: "Top-tier materials, architectural details",
  },
];

const TIMELINE_OPTIONS = [
  { id: "standard", name: "Standard (8-12 weeks)", multiplier: 1.0 },
  { id: "fast", name: "Fast-Track (4-6 weeks)", multiplier: 1.15 },
  { id: "flexible", name: "Flexible Schedule", multiplier: 0.95 },
];

export function ProjectCostCalculator({
  className = "",
  variant = "default",
  showVeteranDiscount = true,
  initialProjectType,
  enableChatbotHandoff = false,
  onGetDetailedEstimate: _onGetDetailedEstimate,
}: ProjectCostCalculatorProps) {
  const [projectType, setProjectType] = useState<string>(
    initialProjectType || PROJECT_TYPES[0].id,
  );
  const [scope, setScope] = useState<number>(3); // 1-5 scale
  const [quality, setQuality] = useState<string>("standard");
  const [timeline, setTimeline] = useState<string>("standard");
  const [isVeteran, setIsVeteran] = useState<boolean>(false);

  // Get chatbot context for handoff
  const { setIsVisible, setCurrentPageData } = useGlobalChatbot();

  // Calculate estimated cost
  const calculatedCost = useMemo(() => {
    const selectedProject = PROJECT_TYPES.find((p) => p.id === projectType);
    if (!selectedProject) {
      return { min: 0, max: 0, display: "$0" };
    }

    const qualityLevel = QUALITY_LEVELS.find((q) => q.id === quality);
    const timelineOption = TIMELINE_OPTIONS.find((t) => t.id === timeline);

    const scopeMultiplier = 0.5 + scope * 0.3; // 0.8x to 2.0x based on scope
    const qualityMultiplier = qualityLevel?.multiplier || 1.0;
    const timelineMultiplier = timelineOption?.multiplier || 1.0;

    let minCost =
      selectedProject.baseMin *
      scopeMultiplier *
      qualityMultiplier *
      timelineMultiplier *
      1000;
    let maxCost =
      selectedProject.baseMax *
      scopeMultiplier *
      qualityMultiplier *
      timelineMultiplier *
      1000;

    // Apply veteran discount (10%)
    if (isVeteran) {
      minCost *= 0.9;
      maxCost *= 0.9;
    }

    return {
      min: Math.round(minCost),
      max: Math.round(maxCost),
      display: `$${Math.round(minCost / 1000)}K - $${Math.round(maxCost / 1000)}K`,
    };
  }, [projectType, scope, quality, timeline, isVeteran]);

  const handleChatbotHandoff = () => {
    const selectedProject = PROJECT_TYPES.find((p) => p.id === projectType);
    const qualityLevel = QUALITY_LEVELS.find((q) => q.id === quality);
    const complexityLabels = [
      "Minimal",
      "Small",
      "Medium",
      "Large",
      "Extensive",
    ];

    // Prepare calculator data for chatbot context
    const calculatorContext = {
      projectType: selectedProject?.name,
      scope: complexityLabels[scope - 1],
      quality: qualityLevel?.name,
      timeline,
      isVeteran,
      estimatedCost: calculatedCost,
      timestamp: new Date().toISOString(),
    };

    // Set chatbot data context
    setCurrentPageData(calculatorContext);

    // Open chatbot with pre-filled message
    setIsVisible(true);

    // Optional: Scroll to chatbot if it's off-screen
    setTimeout(() => {
      const chatbotElement = document.querySelector("[data-chatbot-container]");
      if (chatbotElement) {
        chatbotElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  // Compact variant
  if (variant === "compact") {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MaterialIcon icon="calculate" size="md" />
          Quick Cost Estimate
        </h3>

        {/* Project Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Scope Slider */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Scope:{" "}
            {["Minimal", "Small", "Medium", "Large", "Extensive"][scope - 1]}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={scope}
            onChange={(e) => setScope(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Estimated Cost */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Estimated Range
          </div>
          <div className="text-3xl font-black text-primary-600 dark:text-primary-400">
            {calculatedCost.display}
          </div>
        </div>

        <Link href="/estimator">
          <Button variant="primary" size="default" className="w-full">
            Get Detailed Estimate
          </Button>
        </Link>
      </div>
    );
  }

  // Featured variant
  if (variant === "featured") {
    const selectedProject = PROJECT_TYPES.find((p) => p.id === projectType);

    return (
      <div
        className={`bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <MaterialIcon icon="calculate" size="xl" />
            <h2 className="text-3xl font-black">Project Cost Calculator</h2>
          </div>
          <p className="text-primary-100">
            Get an instant preliminary budget estimate for your construction
            project
          </p>
        </div>

        <div className="p-8">
          {/* Project Type Selection */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
              1. Select Project Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    projectType === type.id
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-200 dark:ring-primary-800"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary-300 bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <MaterialIcon
                      icon={type.icon}
                      size="lg"
                      className={
                        projectType === type.id
                          ? "text-primary-600"
                          : "text-gray-400"
                      }
                    />
                    <div className="font-bold text-gray-900 dark:text-white">
                      {type.name}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Scope Slider */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
              2. Project Scope:{" "}
              <span className="text-primary-600">
                {
                  ["Minimal", "Small", "Medium", "Large", "Extensive"][
                    scope - 1
                  ]
                }
              </span>
            </label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Minimal
              </span>
              <input
                type="range"
                min="1"
                max="5"
                value={scope}
                onChange={(e) => setScope(parseInt(e.target.value))}
                className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Extensive
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {scope === 1 && "Basic renovations, minimal changes"}
              {scope === 2 && "Small-scale project, standard features"}
              {scope === 3 && "Medium complexity, typical requirements"}
              {scope === 4 && "Large-scale project, multiple features"}
              {scope === 5 && "Extensive work, complex requirements"}
            </div>
          </div>

          {/* Quality Level */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
              3. Material Quality
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {QUALITY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setQuality(level.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    quality === level.id
                      ? "border-secondary-600 bg-secondary-50 dark:bg-secondary-900/20 ring-2 ring-secondary-200 dark:ring-secondary-800"
                      : "border-gray-200 dark:border-gray-700 hover:border-secondary-300 bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white mb-1">
                    {level.name}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {level.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
              4. Project Timeline
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TIMELINE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTimeline(option.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    timeline === option.id
                      ? "border-accent-600 bg-accent-50 dark:bg-accent-900/20 ring-2 ring-accent-200 dark:ring-accent-800"
                      : "border-gray-200 dark:border-gray-700 hover:border-accent-300 bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white">
                    {option.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Veteran Discount */}
          {showVeteranDiscount && (
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
                <input
                  type="checkbox"
                  checked={isVeteran}
                  onChange={(e) => setIsVeteran(e.target.checked)}
                  className="w-5 h-5"
                />
                <div className="flex items-center gap-2 flex-1">
                  <MaterialIcon
                    icon="military_tech"
                    size="md"
                    className="text-green-600"
                  />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Military Veteran (10% Discount)
                  </span>
                </div>
                {isVeteran && (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Applied ✓
                  </span>
                )}
              </label>
            </div>
          )}

          {/* Cost Display */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-8 mb-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-primary-100 mb-2">
                  Estimated Project Cost
                </div>
                <div className="text-5xl font-black mb-2">
                  {calculatedCost.display}
                </div>
                <div className="text-sm text-primary-100">
                  {selectedProject?.name} •{" "}
                  {QUALITY_LEVELS.find((q) => q.id === quality)?.name} Quality
                </div>
              </div>
              <MaterialIcon
                icon="savings"
                size="3xl"
                className="text-primary-300"
              />
            </div>

            {isVeteran && (
              <div className="bg-green-600/30 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                <MaterialIcon icon="verified" size="sm" />
                <span className="text-sm font-medium">
                  10% Veteran Discount Applied
                </span>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div
            className={`grid grid-cols-1 ${enableChatbotHandoff ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}
          >
            {enableChatbotHandoff && (
              <Button
                onClick={handleChatbotHandoff}
                variant="outline"
                size="lg"
                className="w-full border-2 border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                <MaterialIcon icon="chat" size="md" className="mr-2" />
                Ask General MH
              </Button>
            )}
            <Link href="/estimator">
              <Button variant="primary" size="lg" className="w-full">
                <MaterialIcon icon="analytics" size="md" className="mr-2" />
                Get Detailed AI Estimate
              </Button>
            </Link>
            <Link href="/booking">
              <Button variant="secondary" size="lg" className="w-full">
                <MaterialIcon icon="event" size="md" className="mr-2" />
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {enableChatbotHandoff && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <MaterialIcon
                  icon="info"
                  size="md"
                  className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Have questions about this estimate?
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Chat with General MH for instant answers about materials,
                    timeline, financing options, or to discuss your specific
                    project requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            * Preliminary estimate for budget planning. Actual costs may vary
            based on specific requirements, site conditions, and market factors.
            For accurate pricing, schedule a free consultation.
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  const selectedProject = PROJECT_TYPES.find((p) => p.id === projectType);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MaterialIcon icon="calculate" size="lg" />
        Quick Cost Calculator
      </h3>

      {/* Project Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Project Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setProjectType(type.id)}
              className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                projectType === type.id
                  ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-primary-300"
              }`}
            >
              <MaterialIcon
                icon={type.icon}
                size="sm"
                className={
                  projectType === type.id ? "text-primary-600" : "text-gray-400"
                }
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scope */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Scope:{" "}
          {["Minimal", "Small", "Medium", "Large", "Extensive"][scope - 1]}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={scope}
          onChange={(e) => setScope(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Quality & Timeline */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quality
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            {QUALITY_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timeline
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name.split(" (")[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Veteran Discount */}
      {showVeteranDiscount && (
        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={isVeteran}
            onChange={(e) => setIsVeteran(e.target.checked)}
            className="w-4 h-4"
          />
          <MaterialIcon
            icon="military_tech"
            size="sm"
            className="text-green-600"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Veteran (10% discount)
          </span>
        </label>
      )}

      {/* Cost Display */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Estimated Cost Range
        </div>
        <div className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">
          {calculatedCost.display}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Based on {selectedProject?.name} •{" "}
          {QUALITY_LEVELS.find((q) => q.id === quality)?.name}
        </div>
      </div>

      {/* CTA */}
      <Link href="/estimator">
        <Button variant="primary" size="lg" className="w-full">
          <MaterialIcon icon="trending_up" size="md" className="mr-2" />
          Get Detailed Estimate
        </Button>
      </Link>
    </div>
  );
}
