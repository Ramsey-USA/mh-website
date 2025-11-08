"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

interface CostEstimate {
  low: number;
  high: number;
  average: number;
}

export function QuickCostCalculator() {
  const [projectType, setProjectType] = useState("residential");
  const [size, setSize] = useState(1000);
  const [quality, setQuality] = useState("standard");
  const [timeline, setTimeline] = useState("3-6");
  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  const [isVeteran, setIsVeteran] = useState(false);

  const projectTypes = [
    { value: "residential", label: "Residential", baseRate: 150 },
    { value: "commercial", label: "Commercial", baseRate: 200 },
    { value: "renovation", label: "Renovation", baseRate: 120 },
    { value: "addition", label: "Addition", baseRate: 180 },
  ];

  const qualityLevels = [
    { value: "standard", label: "Standard", multiplier: 1.0 },
    { value: "premium", label: "Premium", multiplier: 1.3 },
    { value: "luxury", label: "Luxury", multiplier: 1.6 },
  ];

  const timelineOptions = [
    { value: "rush", label: "< 3 months", multiplier: 1.2 },
    { value: "3-6", label: "3-6 months", multiplier: 1.0 },
    { value: "6-12", label: "6-12 months", multiplier: 0.95 },
    { value: "flexible", label: "Flexible", multiplier: 0.9 },
  ];

  useEffect(() => {
    calculateEstimate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectType, size, quality, timeline, isVeteran]);

  const calculateEstimate = () => {
    // Find multipliers
    const project = projectTypes.find((p) => p.value === projectType);
    const qualityLevel = qualityLevels.find((q) => q.value === quality);
    const timelineOption = timelineOptions.find((t) => t.value === timeline);

    if (!project || !qualityLevel || !timelineOption) return;

    // Base calculation: size * base rate * quality * timeline
    const baseEstimate =
      size *
      project.baseRate *
      qualityLevel.multiplier *
      timelineOption.multiplier;

    // Pacific Northwest adjustment (15%)
    const locationAdjusted = baseEstimate * 1.15;

    // Veteran discount (12%)
    const veteranDiscount = isVeteran ? 0.88 : 1.0;
    const finalEstimate = locationAdjusted * veteranDiscount;

    // Create range (±15%)
    const low = Math.floor(finalEstimate * 0.85);
    const high = Math.ceil(finalEstimate * 1.15);
    const average = Math.floor(finalEstimate);

    setEstimate({ low, high, average });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <FadeInWhenVisible>
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-4 rounded-full w-16 h-16">
            <MaterialIcon icon="calculate" size="xl" className="text-white" />
          </div>
          <h3 className="mb-2 font-bold text-2xl text-gray-900 dark:text-white md:text-3xl">
            Quick Cost Calculator
          </h3>
          <p className="text-gray-600 text-sm dark:text-gray-300 md:text-base">
            Get an instant project estimate in seconds
          </p>
        </div>

        {/* Calculator Form */}
        <div className="space-y-6">
          {/* Project Type */}
          <div>
            <label className="block mb-3 font-semibold text-gray-700 text-sm dark:text-gray-200">
              <MaterialIcon
                icon="construction"
                size="sm"
                className="inline mr-2"
              />
              Project Type
            </label>
            <div className="gap-2 grid grid-cols-2">
              {projectTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setProjectType(type.value)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    projectType === type.value
                      ? "bg-primary-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Input */}
          <div>
            <label className="block mb-3 font-semibold text-gray-700 text-sm dark:text-gray-200">
              <MaterialIcon
                icon="square_foot"
                size="sm"
                className="inline mr-2"
              />
              Project Size: {size.toLocaleString()} sq ft
            </label>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
            />
            <div className="flex justify-between mt-1 text-gray-500 text-xs dark:text-gray-400">
              <span>500 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          {/* Quality Level */}
          <div>
            <label className="block mb-3 font-semibold text-gray-700 text-sm dark:text-gray-200">
              <MaterialIcon icon="diamond" size="sm" className="inline mr-2" />
              Quality Level
            </label>
            <div className="gap-2 grid grid-cols-3">
              {qualityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setQuality(level.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    quality === level.value
                      ? "bg-secondary-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block mb-3 font-semibold text-gray-700 text-sm dark:text-gray-200">
              <MaterialIcon icon="schedule" size="sm" className="inline mr-2" />
              Project Timeline
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 w-full text-sm focus:outline-none"
            >
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Veteran Status */}
          <div className="flex items-center gap-3 bg-accent-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <input
              type="checkbox"
              id="veteran-status"
              checked={isVeteran}
              onChange={(e) => setIsVeteran(e.target.checked)}
              className="rounded w-5 h-5 text-primary-500 focus:ring-2 focus:ring-primary-500 cursor-pointer"
            />
            <label
              htmlFor="veteran-status"
              className="flex items-center gap-2 font-medium text-gray-700 text-sm dark:text-gray-200 cursor-pointer"
            >
              <MaterialIcon icon="military_tech" size="sm" />
              I'm a veteran (12% discount)
            </label>
          </div>
        </div>

        {/* Estimate Display */}
        {estimate && (
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-600 mt-8 p-6 rounded-xl border-2 border-primary-200 dark:border-primary-700">
            <div className="mb-4 text-center">
              <p className="mb-2 font-medium text-gray-700 text-sm dark:text-gray-200">
                Estimated Project Cost
              </p>
              <div className="font-black text-4xl text-primary-600 dark:text-primary-400 md:text-5xl">
                {formatCurrency(estimate.average)}
              </div>
              <p className="mt-2 text-gray-600 text-sm dark:text-gray-300">
                Range: {formatCurrency(estimate.low)} -{" "}
                {formatCurrency(estimate.high)}
              </p>
              {isVeteran && (
                <div className="flex justify-center items-center gap-2 bg-accent-100 dark:bg-accent-900/30 mt-3 px-4 py-2 rounded-lg">
                  <MaterialIcon
                    icon="shield"
                    size="sm"
                    className="text-accent-600 dark:text-accent-400"
                  />
                  <p className="font-medium text-accent-700 text-xs dark:text-accent-300">
                    12% Veteran Discount Applied
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
              <Link href="/estimator">
                <Button variant="primary" size="lg" className="w-full">
                  <MaterialIcon icon="description" size="sm" className="mr-2" />
                  Get Detailed Quote
                </Button>
              </Link>
              <Link href="/booking">
                <Button variant="secondary" size="lg" className="w-full">
                  <MaterialIcon icon="event" size="sm" className="mr-2" />
                  Book Consultation
                </Button>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-center text-gray-500 text-xs dark:text-gray-400">
              * Preliminary estimate. Final costs determined after site
              assessment.
            </p>
          </div>
        )}
      </div>
    </FadeInWhenVisible>
  );
}
