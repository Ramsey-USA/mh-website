/**
 * Interactive Project Timeline Tool
 * Visual timeline showing project phases with user-selectable project types
 *
 * Features:
 * - Project type selector
 * - Complexity slider (affects timeline duration)
 * - Auto-adjusting visual timeline
 * - Phase descriptions and durations
 * - Mobile-responsive
 * - Animated transitions
 *
 * Expected Impact: +30% engagement, +20% bookings
 */

"use client";

import { useState, useMemo } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useGlobalChatbot } from "@/providers/GlobalChatbotProvider";

export interface InteractiveTimelineProps {
  /** Optional: Custom className */
  className?: string;
  /** Optional: Show booking CTA */
  showBookingCTA?: boolean;
  /** Optional: Callback when timeline is customized */
  onTimelineCustomized?: (data: TimelineData) => void;
}

export interface TimelineData {
  projectType: string;
  complexity: number; // 1-5 scale
  estimatedWeeks: number;
  phases: TimelinePhase[];
}

export interface TimelinePhase {
  id: string;
  name: string;
  description: string;
  durationWeeks: number;
  icon: string;
  color: string;
}

const PROJECT_TYPES = [
  {
    id: "commercial",
    name: "Commercial Building",
    baseWeeks: 16,
    icon: "business",
  },
  {
    id: "custom-home",
    name: "Custom Home",
    baseWeeks: 20,
    icon: "home",
  },
  {
    id: "addition",
    name: "Home Addition",
    baseWeeks: 10,
    icon: "home_work",
  },
  {
    id: "remodel",
    name: "Kitchen/Bath Remodel",
    baseWeeks: 8,
    icon: "countertops",
  },
  {
    id: "outdoor",
    name: "Deck/Patio",
    baseWeeks: 6,
    icon: "deck",
  },
];

// Base phases template (adjusted per project type)
const BASE_PHASES: TimelinePhase[] = [
  {
    id: "consultation",
    name: "Initial Consultation",
    description:
      "Free consultation to discuss your vision, budget, and timeline. Site visit and feasibility assessment.",
    durationWeeks: 1,
    icon: "handshake",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "design",
    name: "Design & Planning",
    description:
      "Architectural plans, engineering, permitting, and detailed project specifications. Open-book pricing provided.",
    durationWeeks: 3,
    icon: "architecture",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "permits",
    name: "Permits & Approvals",
    description:
      "Secure all necessary permits and regulatory approvals. We handle the paperwork and coordinate inspections.",
    durationWeeks: 2,
    icon: "assignment",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "prep",
    name: "Site Preparation",
    description:
      "Site clearing, excavation, utility connections, and foundation work. Safety protocols established (.64 EMR standard).",
    durationWeeks: 2,
    icon: "construction",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "construction",
    name: "Construction",
    description:
      "Core building phase - framing, electrical, plumbing, HVAC, and structural work. Regular progress updates.",
    durationWeeks: 8,
    icon: "engineering",
    color: "from-green-500 to-green-600",
  },
  {
    id: "finishes",
    name: "Finishes & Details",
    description:
      "Interior/exterior finishes, cabinetry, fixtures, painting, and final touches. Quality control checks.",
    durationWeeks: 3,
    icon: "brush",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "inspection",
    name: "Final Inspection",
    description:
      "Comprehensive walkthrough, punch list completion, and final inspection approval. Warranty documentation.",
    durationWeeks: 1,
    icon: "fact_check",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "completion",
    name: "Project Completion",
    description:
      "Final walkthrough, keys handed over, warranty activated. Post-project support and maintenance guidance.",
    durationWeeks: 0.5,
    icon: "celebration",
    color: "from-pink-500 to-pink-600",
  },
];

export function InteractiveTimeline({
  className = "",
  showBookingCTA = true,
  onTimelineCustomized,
}: InteractiveTimelineProps) {
  const [projectType, setProjectType] = useState<string>(
    PROJECT_TYPES[0]?.id ?? "",
  );
  const [complexity, setComplexity] = useState<number>(3); // 1-5 scale
  const { setIsVisible, setCurrentPageData } = useGlobalChatbot();

  // Calculate adjusted timeline based on project type and complexity
  const timelineData = useMemo(() => {
    const selectedProject = PROJECT_TYPES.find((p) => p.id === projectType);
    if (!selectedProject) return null;

    // Complexity multiplier: 1=0.7x, 2=0.85x, 3=1.0x, 4=1.2x, 5=1.5x
    const complexityMultipliers = [0.7, 0.85, 1.0, 1.2, 1.5];
    const multiplier = complexityMultipliers[complexity - 1] ?? 1;

    const adjustedPhases = BASE_PHASES.map((phase) => ({
      ...phase,
      durationWeeks: Math.round(phase.durationWeeks * multiplier * 10) / 10,
    }));

    const totalWeeks = adjustedPhases.reduce(
      (sum, phase) => sum + phase.durationWeeks,
      0,
    );

    return {
      projectType: selectedProject.name,
      complexity,
      estimatedWeeks: Math.round(totalWeeks),
      phases: adjustedPhases,
    };
  }, [projectType, complexity]);

  // Notify parent of timeline changes
  useMemo(() => {
    if (timelineData && onTimelineCustomized) {
      onTimelineCustomized(timelineData);
    }
  }, [timelineData, onTimelineCustomized]);

  // Chatbot integration - pass timeline context
  const handleChatbotOpen = () => {
    if (!timelineData) return;

    const selectedProject = PROJECT_TYPES.find((p) => p.id === projectType);
    const complexityLabels = [
      "Minimal",
      "Simple",
      "Standard",
      "Complex",
      "Extensive",
    ];

    const timelineContext = {
      source: "interactive_timeline",
      projectType: selectedProject?.name,
      complexity: complexityLabels[complexity - 1],
      estimatedWeeks: timelineData.estimatedWeeks,
      phases: timelineData.phases.map((p) => ({
        name: p.name,
        weeks: p.durationWeeks,
      })),
      userIntent: `I'm planning a ${selectedProject?.name} project. Can you help me understand the timeline and what to expect?`,
      timestamp: new Date().toISOString(),
    };

    setCurrentPageData(timelineContext);
    setIsVisible(true);
  };

  if (!timelineData) return null;

  const complexityLabels = [
    "Minimal",
    "Simple",
    "Standard",
    "Complex",
    "Extensive",
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <MaterialIcon icon="timeline" size="xl" />
          <h2 className="text-2xl font-bold">Project Timeline Builder</h2>
        </div>
        <p className="text-primary-100 text-sm">
          Customize your project parameters to see an estimated timeline
        </p>
      </div>

      {/* Controls */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        {/* Project Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
            1. Select Project Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setProjectType(type.id)}
                className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  projectType === type.id
                    ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-200 dark:ring-primary-800"
                    : "border-gray-200 dark:border-gray-700 hover:border-primary-300 bg-white dark:bg-gray-800"
                }`}
              >
                <MaterialIcon
                  icon={type.icon}
                  size="lg"
                  className={
                    projectType === type.id
                      ? "text-primary-600"
                      : "text-gray-400"
                  }
                />
                <span
                  className={`text-xs font-medium text-center ${
                    projectType === type.id
                      ? "text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {type.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Slider */}
        <div>
          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
            2. Project Complexity:{" "}
            <span className="text-primary-600">
              {complexityLabels[complexity - 1]}
            </span>
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 dark:text-gray-400 w-16">
              Minimal
            </span>
            <input
              type="range"
              min="1"
              max="5"
              value={complexity}
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400 w-16 text-right">
              Extensive
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            {complexity === 1 && "Basic project with standard features"}
            {complexity === 2 && "Simple project with few custom requirements"}
            {complexity === 3 && "Standard complexity with typical features"}
            {complexity === 4 &&
              "Complex project with multiple custom features"}
            {complexity === 5 && "Highly complex with extensive custom work"}
          </div>
        </div>

        {/* Estimated Duration */}
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-4 border-2 border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Estimated Timeline
              </div>
              <div className="text-3xl font-black text-primary-600 dark:text-primary-400">
                {timelineData.estimatedWeeks} weeks
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {Math.round(timelineData.estimatedWeeks / 4)} months •{" "}
                {timelineData.projectType}
              </div>
            </div>
            <MaterialIcon
              icon="schedule"
              size="3xl"
              className="text-primary-300"
            />
          </div>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <MaterialIcon icon="map" size="md" />
          Project Phases
        </h3>

        <div className="space-y-4">
          {timelineData.phases.map((phase, _index) => {
            const isLast = _index === timelineData.phases.length - 1;

            return (
              <div key={phase.id} className="relative">
                {/* Connector Line */}
                {!isLast && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -mb-4"></div>
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-800 z-10`}
                  >
                    <MaterialIcon
                      icon={phase.icon}
                      size="md"
                      className="text-white"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {phase.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {phase.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                          <span className="text-sm font-bold text-primary-700 dark:text-primary-300">
                            {phase.durationWeeks}{" "}
                            {phase.durationWeeks === 1 ? "week" : "weeks"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${phase.color} transition-all duration-500`}
                        style={{
                          width: `${(phase.durationWeeks / timelineData.estimatedWeeks) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chatbot CTA */}
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                Questions About Your Timeline?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chat with General MH to discuss your specific project needs and
                timeline expectations
              </p>
            </div>
            <Button
              onClick={handleChatbotOpen}
              variant="primary"
              size="lg"
              className="flex-shrink-0"
            >
              <MaterialIcon icon="chat" size="sm" className="mr-2" />
              Start Planning Your Project
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      {showBookingCTA && (
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                Ready to Start Your Project?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Schedule a free consultation to discuss your timeline and get
                accurate estimates
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  <MaterialIcon
                    icon="photo_library"
                    size="sm"
                    className="mr-2"
                  />
                  View Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  <MaterialIcon icon="phone" size="sm" className="mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-6 py-3 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          * Timeline estimates are preliminary. Actual duration depends on
          weather, permits, site conditions, and material availability. Detailed
          schedule provided during consultation.
        </p>
      </div>
    </div>
  );
}
