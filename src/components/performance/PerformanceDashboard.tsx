"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { Metric } from "web-vitals";

/**
 * Performance Dashboard Component
 *
 * Displays real-time Core Web Vitals metrics for monitoring and debugging.
 * Only visible in development mode or for admin users.
 */

interface MetricData {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  unit: string;
  description: string;
  icon: string;
}

const METRIC_INFO = {
  LCP: {
    name: "Largest Contentful Paint",
    description: "Loading performance - time until largest content is visible",
    icon: "schedule",
    unit: "ms",
    goodThreshold: 2500,
    poorThreshold: 4000,
  },
  INP: {
    name: "Interaction to Next Paint",
    description: "Interactivity - time from interaction to visual response",
    icon: "touch_app",
    unit: "ms",
    goodThreshold: 200,
    poorThreshold: 500,
  },
  CLS: {
    name: "Cumulative Layout Shift",
    description: "Visual stability - unexpected layout shift amount",
    icon: "view_compact",
    unit: "",
    goodThreshold: 0.1,
    poorThreshold: 0.25,
  },
  FCP: {
    name: "First Contentful Paint",
    description: "Perceived load speed - time until first content renders",
    icon: "visibility",
    unit: "ms",
    goodThreshold: 1800,
    poorThreshold: 3000,
  },
  TTFB: {
    name: "Time to First Byte",
    description: "Server responsiveness - time until first byte received",
    icon: "cloud_download",
    unit: "ms",
    goodThreshold: 800,
    poorThreshold: 1800,
  },
};

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<Record<string, MetricData>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if performance param is in URL
    const isDev = process.env.NODE_ENV === "development";
    const showPerf =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("perf");

    if (isDev || showPerf) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const updateMetric = (metric: Metric) => {
        const info = METRIC_INFO[metric.name as keyof typeof METRIC_INFO];
        if (!info) return;

        const value =
          metric.name === "CLS" ? metric.value : Math.round(metric.value);
        let rating: "good" | "needs-improvement" | "poor" = "good";

        if (metric.value > info.poorThreshold) {
          rating = "poor";
        } else if (metric.value > info.goodThreshold) {
          rating = "needs-improvement";
        }

        setMetrics((prev) => ({
          ...prev,
          [metric.name]: {
            name: info.name,
            value,
            rating,
            unit: info.unit,
            description: info.description,
            icon: info.icon,
          },
        }));
      };

      onCLS(updateMetric);
      onINP(updateMetric);
      onFCP(updateMetric);
      onLCP(updateMetric);
      onTTFB(updateMetric);
    });
  }, [isVisible]);

  if (!isVisible) return null;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "poor":
        return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="z-50 right-4 bottom-4 fixed w-80 max-h-[600px] overflow-y-auto">
      <Card className="shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border-2 border-blue-500">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MaterialIcon icon="speed" className="text-blue-600" />
              <CardTitle className="text-sm font-semibold">
                Performance Metrics
              </CardTitle>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full transition-colors"
              aria-label="Close performance dashboard"
            >
              <MaterialIcon icon="close" size="sm" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.keys(metrics).length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-4">
              Collecting metrics...
            </p>
          ) : (
            Object.entries(metrics).map(([key, metric]) => (
              <div
                key={key}
                className="border-gray-200 dark:border-gray-700 hover:shadow-md p-3 border rounded-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MaterialIcon
                      icon={metric.icon}
                      size="sm"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100 text-xs">
                        {key}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-[10px]">
                        {metric.name}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(
                      metric.rating,
                    )}`}
                  >
                    {metric.rating === "needs-improvement"
                      ? "Okay"
                      : metric.rating}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-2xl text-gray-900 dark:text-gray-100">
                    {metric.value}
                    <span className="ml-1 font-normal text-gray-500 text-sm">
                      {metric.unit}
                    </span>
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-[10px]">
                  {metric.description}
                </p>
              </div>
            ))
          )}
          <div className="pt-2 border-gray-200 dark:border-gray-700 border-t text-[10px] text-center text-gray-500">
            Add <code>?perf</code> to URL to show in production
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
