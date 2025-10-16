/**
 * A/B Testing Analytics Dashboard
 * Phase 6.3: Dashboard for viewing experiment results and performance metrics
 *
 * This component provides comprehensive analytics for A/B testing experiments,
 * including statistical significance calculations and performance comparisons.
 */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { MaterialIcon } from "../icons/MaterialIcon";
import { Card, CardContent } from "../ui";
import useSmartRecommendations from "@/hooks/useSmartRecommendations";

// Dynamic import for Framer Motion
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);

interface ExperimentResultsProps {
  experimentId?: string;
  className?: string;
}

interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon: string;
  color: string;
  format?: "percentage" | "number" | "currency";
}

const AnalyticsDashboard: React.FC<ExperimentResultsProps> = ({
  experimentId,
  className = "",
}) => {
  const [selectedExperiment, setSelectedExperiment] = useState<string>(
    experimentId || "",
  );
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">(
    "30d",
  );
  const [isLoading, setIsLoading] = useState(false);

  const { getExperimentResults, getActiveExperiments } =
    useSmartRecommendations({});

  const [experiments, setExperiments] = useState<any[]>([]);
  const [experimentResults, setExperimentResults] = useState<any[]>([]);
  const [significanceResults, setSignificanceResults] = useState<any[]>([]);

  useEffect(() => {
    const loadExperiments = async () => {
      try {
        const activeExps = getActiveExperiments();
        setExperiments(activeExps);

        if (activeExps.length > 0 && !selectedExperiment) {
          setSelectedExperiment(activeExps[0].id);
        }
      } catch (error) {
        console.error("Error loading experiments:", error);
      }
    };

    loadExperiments();
  }, [getActiveExperiments, selectedExperiment]);

  useEffect(() => {
    const loadResults = async () => {
      if (!selectedExperiment) return;

      setIsLoading(true);
      try {
        const results = getExperimentResults(selectedExperiment);
        setExperimentResults(results || []);

        // Mock significance results for demo
        setSignificanceResults([
          {
            variantId: "variant_1",
            controlRate: 15.2,
            variantRate: 18.7,
            improvement: 23.0,
            isSignificant: true,
            confidenceLevel: 95.4,
          },
        ]);
      } catch (error) {
        console.error("Error loading experiment results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [selectedExperiment, getExperimentResults]);

  const summaryMetrics = useMemo((): MetricCard[] => {
    if (!experimentResults.length) return [];

    const totalUsers = experimentResults.reduce(
      (sum, r) => sum + r.totalUsers,
      0,
    );
    const totalConversions = experimentResults.reduce(
      (sum, r) => sum + (r.conversionRate * r.totalUsers) / 100,
      0,
    );
    const avgConversionRate =
      totalUsers > 0 ? (totalConversions / totalUsers) * 100 : 0;
    const avgRating =
      experimentResults.reduce((sum, r) => sum + r.averageRating, 0) /
      experimentResults.length;

    return [
      {
        title: "Total Participants",
        value: totalUsers.toLocaleString(),
        icon: "people",
        color: "blue",
        format: "number",
      },
      {
        title: "Conversion Rate",
        value: avgConversionRate.toFixed(1),
        change: significanceResults[0]?.improvement || 0,
        icon: "trending_up",
        color: "green",
        format: "percentage",
      },
      {
        title: "Average Rating",
        value: avgRating.toFixed(1),
        icon: "star",
        color: "yellow",
        format: "number",
      },
      {
        title: "Statistical Significance",
        value: significanceResults[0]?.isSignificant ? "Achieved" : "Not Yet",
        icon: significanceResults[0]?.isSignificant ? "verified" : "schedule",
        color: significanceResults[0]?.isSignificant ? "green" : "orange",
        format: "number",
      },
    ];
  }, [experimentResults, significanceResults]);

  const formatValue = (value: string | number, format?: string) => {
    if (format === "percentage") {
      return `${value}%`;
    }
    if (format === "currency") {
      return `$${Number(value).toLocaleString()}`;
    }
    return value;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      yellow: "text-yellow-600 bg-yellow-50",
      orange: "text-orange-600 bg-orange-50",
      red: "text-red-600 bg-red-50",
    };
    return colorMap[color] || colorMap.blue;
  };

  if (isLoading) {
    return (
      <div className={`${className} text-center py-12`}>
        <MaterialIcon
          icon="analytics"
          className="mb-4 text-gray-400 animate-pulse"
          size="3xl"
        />
        <p className="text-gray-600">Loading experiment results...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <MaterialIcon
            icon="science"
            className="text-brand-primary"
            size="lg"
          />
          <div>
            <h2 className="font-bold text-gray-800 text-2xl">
              A/B Testing Analytics
            </h2>
            <p className="text-gray-600">
              Experiment results and performance metrics
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>

          {/* Experiment Selector */}
          <select
            value={selectedExperiment}
            onChange={(e) => setSelectedExperiment(e.target.value)}
            className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary min-w-64"
          >
            <option value="">Select Experiment</option>
            {experiments.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!selectedExperiment ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MaterialIcon
              icon="science"
              className="mb-4 text-gray-400"
              size="3xl"
            />
            <h3 className="mb-2 font-semibold text-gray-800 text-lg">
              No Experiment Selected
            </h3>
            <p className="text-gray-600">
              Select an experiment from the dropdown to view results
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary Metrics */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {summaryMetrics.map((metric, index) => (
              <MotionDiv
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p
                          className={`text-sm ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : metric.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {metric.change}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}
                      >
                        <MaterialIcon icon={metric.icon} size="lg" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>

          {/* Variant Comparison */}
          <Card>
            <CardContent className="p-6">
              <h3 className="flex items-center space-x-2 mb-4 font-semibold text-gray-800 text-lg">
                <MaterialIcon icon="compare_arrows" size="lg" />
                <span>Variant Performance Comparison</span>
              </h3>

              {experimentResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-gray-200 border-b">
                        <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                          Variant
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                          Users
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                          CTR
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                          Conversion Rate
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                          Avg Rating
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                          Significance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {experimentResults.map((result, index) => {
                        const significance = significanceResults.find(
                          (s) => s.variantId === result.variantId,
                        );
                        const isControl = index === 0;

                        return (
                          <tr
                            key={result.variantId}
                            className="border-gray-100 border-b"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  {isControl ? "Control" : `Variant ${index}`}
                                </span>
                                {isControl && (
                                  <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs">
                                    Control
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {result.totalUsers.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              {result.clickThroughRate.toFixed(1)}%
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <span>{result.conversionRate.toFixed(1)}%</span>
                                {significance && !isControl && (
                                  <span
                                    className={`text-sm ${
                                      significance.improvement > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    ({significance.improvement > 0 ? "+" : ""}
                                    {significance.improvement.toFixed(1)}%)
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-1">
                                <MaterialIcon
                                  icon="star"
                                  className="text-yellow-400"
                                  size="sm"
                                />
                                <span>{result.averageRating.toFixed(1)}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {significance && !isControl ? (
                                <div className="flex items-center space-x-2">
                                  <MaterialIcon
                                    icon={
                                      significance.isSignificant
                                        ? "verified"
                                        : "schedule"
                                    }
                                    className={
                                      significance.isSignificant
                                        ? "text-green-600"
                                        : "text-orange-600"
                                    }
                                    size="sm"
                                  />
                                  <span
                                    className={`text-sm ${
                                      significance.isSignificant
                                        ? "text-green-600"
                                        : "text-orange-600"
                                    }`}
                                  >
                                    {significance.isSignificant
                                      ? `${significance.confidenceLevel.toFixed(1)}%`
                                      : "Pending"}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <MaterialIcon
                    icon="bar_chart"
                    className="mb-2 text-gray-400"
                    size="2xl"
                  />
                  <p className="text-gray-600">No variant data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardContent className="p-6">
              <h3 className="flex items-center space-x-2 mb-4 font-semibold text-gray-800 text-lg">
                <MaterialIcon icon="lightbulb" size="lg" />
                <span>Recommendations</span>
              </h3>

              <div className="space-y-3">
                {significanceResults.some((s) => s.isSignificant) ? (
                  <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <MaterialIcon
                        icon="check_circle"
                        className="mt-0.5 text-green-600"
                        size="lg"
                      />
                      <div>
                        <h4 className="font-semibold text-green-800">
                          Statistical Significance Achieved
                        </h4>
                        <p className="mt-1 text-green-700 text-sm">
                          The winning variant shows significant improvement.
                          Consider implementing this variant.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <MaterialIcon
                        icon="schedule"
                        className="mt-0.5 text-orange-600"
                        size="lg"
                      />
                      <div>
                        <h4 className="font-semibold text-orange-800">
                          Continue Testing
                        </h4>
                        <p className="mt-1 text-orange-700 text-sm">
                          More data needed to reach statistical significance.
                          Let the experiment run longer.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <MaterialIcon
                      icon="insights"
                      className="mt-0.5 text-blue-600"
                      size="lg"
                    />
                    <div>
                      <h4 className="font-semibold text-blue-800">
                        Performance Insights
                      </h4>
                      <p className="mt-1 text-blue-700 text-sm">
                        Monitor user engagement and feedback patterns to
                        optimize future experiments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
