/**
 * Performance Dashboard Component
 * Phase 5: Real-time performance monitoring and optimization insights
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Button,
} from "../ui";
import { Badge } from "../ui";
import { MaterialIcon } from "../icons/MaterialIcon";
import {
  performanceMonitor,
  getPerformanceSummary,
  type PerformanceMetrics,
} from "@/lib/performance/PerformanceMonitor";
import { aiCache } from "@/lib/cache/AIResponseCache";
import {
  usePerformanceMetrics,
  useBundleAnalysis,
} from "@/hooks/usePerformance";

// Mock performance manager
const performanceManager = {
  getConfig: () => ({
    thresholds: {
      firstContentfulPaint: 1800,
      largestContentfulPaint: 2500,
      firstInputDelay: 100,
      cumulativeLayoutShift: 0.1,
    },
  }),
};

interface PerformanceDashboardProps {
  showDetails?: boolean;
}

function SimpleDashboard({ showDetails = false }: PerformanceDashboardProps) {
  const [summary, setSummary] = useState<any>(null);
  const [cacheStats, setCacheStats] = useState<any>(null);

  useEffect(() => {
    const updateStats = () => {
      setSummary(getPerformanceSummary());
      setCacheStats(aiCache.getStats());
    };

    // Initial update
    updateStats();

    // Update every 10 seconds
    const interval = setInterval(updateStats, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MaterialIcon icon="speed" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">Loading performance data...</div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (
    score: number,
    type: "lcp" | "fid" | "cls",
  ): string => {
    switch (type) {
      case "lcp":
        return score <= 2500
          ? "text-green-600"
          : score <= 4000
            ? "text-yellow-600"
            : "text-red-600";
      case "fid":
        return score <= 100
          ? "text-green-600"
          : score <= 300
            ? "text-yellow-600"
            : "text-red-600";
      case "cls":
        return score <= 0.1
          ? "text-green-600"
          : score <= 0.25
            ? "text-yellow-600"
            : "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MaterialIcon icon="speed" />
            Core Web Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {/* LCP - Largest Contentful Paint */}
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="mb-1 font-bold text-2xl">
                <MaterialIcon icon="timer" className="mb-1" />
              </div>
              <div
                className={`text-2xl font-bold ${getScoreColor(summary.metrics?.avgLCP || 0, "lcp")}`}
              >
                {summary.metrics?.avgLCP
                  ? formatTime(summary.metrics.avgLCP)
                  : "N/A"}
              </div>
              <div className="text-gray-600 text-sm">LCP</div>
              <div className="text-gray-500 text-xs">
                Largest Contentful Paint
              </div>
            </div>

            {/* FID - First Input Delay */}
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="mb-1 font-bold text-2xl">
                <MaterialIcon icon="touch_app" className="mb-1" />
              </div>
              <div
                className={`text-2xl font-bold ${getScoreColor(summary.metrics?.avgFID || 0, "fid")}`}
              >
                {summary.metrics?.avgFID
                  ? formatTime(summary.metrics.avgFID)
                  : "N/A"}
              </div>
              <div className="text-gray-600 text-sm">FID</div>
              <div className="text-gray-500 text-xs">First Input Delay</div>
            </div>

            {/* CLS - Cumulative Layout Shift */}
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="mb-1 font-bold text-2xl">
                <MaterialIcon icon="view_compact" className="mb-1" />
              </div>
              <div
                className={`text-2xl font-bold ${getScoreColor(summary.metrics?.avgCLS || 0, "cls")}`}
              >
                {summary.metrics?.avgCLS
                  ? summary.metrics.avgCLS.toFixed(3)
                  : "N/A"}
              </div>
              <div className="text-gray-600 text-sm">CLS</div>
              <div className="text-gray-500 text-xs">
                Cumulative Layout Shift
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MaterialIcon icon="psychology" />
            AI Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="font-bold text-blue-600 text-2xl">
                {summary.metrics?.avgAIResponseTime
                  ? formatTime(summary.metrics.avgAIResponseTime)
                  : "N/A"}
              </div>
              <div className="text-gray-600 text-sm">Avg Response Time</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="font-bold text-green-600 text-2xl">
                {cacheStats?.aiCacheSize || 0}
              </div>
              <div className="text-gray-600 text-sm">Cached Responses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MaterialIcon icon="lightbulb" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {summary.metrics?.avgLCP > 2500 && (
              <div className="bg-red-50 p-2 rounded text-red-700">
                ⚠️ LCP is slower than optimal. Consider image optimization and
                code splitting.
              </div>
            )}
            {summary.metrics?.avgFID > 100 && (
              <div className="bg-yellow-50 p-2 rounded text-yellow-700">
                ⚠️ FID could be improved. Consider reducing JavaScript execution
                time.
              </div>
            )}
            {summary.metrics?.avgCLS > 0.1 && (
              <div className="bg-orange-50 p-2 rounded text-orange-700">
                ⚠️ CLS indicates layout shifts. Ensure images have proper
                dimensions.
              </div>
            )}
            {summary.errors?.errorRate > 5 && (
              <div className="bg-red-50 p-2 rounded text-red-700">
                🚨 High error rate detected. Check console for JavaScript
                errors.
              </div>
            )}
            {summary.errors?.count === 0 &&
              summary.metrics?.avgLCP <= 2500 &&
              summary.metrics?.avgFID <= 100 &&
              summary.metrics?.avgCLS <= 0.1 && (
                <div className="bg-green-50 p-2 rounded text-green-700">
                  ✅ Excellent performance! All Core Web Vitals are in good
                  ranges.
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MaterialIcon icon="settings" />
            Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                performanceMonitor.clear();
                aiCache.clear();
                setSummary(null);
                setCacheStats(null);
              }}
            >
              Clear Data
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const data = performanceMonitor.getAllMetrics();
                const blob = new Blob([JSON.stringify(data, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `performance-data-${Date.now()}.json`;
                a.click();
              }}
            >
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  status: "good" | "warning" | "error";
}

function MetricCard({ title, value, description, status }: MetricCardProps) {
  const statusColors = {
    good: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{value}</div>
        <p className="text-gray-500 text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}

interface PerformanceChartProps {
  metrics: Array<{ name: string; value: number; timestamp: number }>;
  title: string;
}

function PerformanceChart({ metrics, title }: PerformanceChartProps) {
  if (!metrics || metrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Performance metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-gray-500 text-center">
            No data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxValue = Math.max(...metrics.map((m) => m.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Performance metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {metrics.slice(-10).map((metric, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-20 text-gray-500 text-sm">
                {new Date(metric.timestamp).toLocaleTimeString()}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(metric.value / maxValue) * 100}%` }}
                />
              </div>
              <div className="w-16 text-sm text-right">
                {metric.value.toFixed(1)}ms
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface RecommendationListProps {
  recommendations: string[];
  title: string;
}

function RecommendationList({
  recommendations,
  title,
}: RecommendationListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Optimization suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Badge variant="outline" className="mt-0.5">
                  {index + 1}
                </Badge>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No recommendations at this time. Performance looks good!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface CacheStatsProps {
  stats: {
    hits: number;
    misses: number;
    size: number;
  };
}

function CacheStats({ stats }: CacheStatsProps) {
  const hitRate =
    stats.hits + stats.misses > 0
      ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(1)
      : "0";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cache Performance</CardTitle>
        <CardDescription>Caching efficiency metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="gap-4 grid grid-cols-3">
          <div className="text-center">
            <div className="font-bold text-green-600 text-2xl">
              {stats.hits}
            </div>
            <div className="text-gray-500 text-sm">Hits</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600 text-2xl">
              {stats.misses}
            </div>
            <div className="text-gray-500 text-sm">Misses</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600 text-2xl">{stats.size}</div>
            <div className="text-gray-500 text-sm">Cached Items</div>
          </div>
        </div>
        <div className="text-center">
          <div className="font-bold text-3xl">{hitRate}%</div>
          <div className="text-gray-500 text-sm">Hit Rate</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformanceDashboard() {
  const { metrics, report, clearMetrics } = usePerformanceMetrics(2000);
  const { analysis, loading: bundleLoading, reanalyze } = useBundleAnalysis();
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "metrics" | "bundle" | "cache"
  >("overview");

  // Calculate key performance indicators
  const webVitals = {
    fcp:
      metrics
        .filter((m: any) => m.name === "first_contentful_paint")
        .slice(-1)[0]?.value || 0,
    lcp:
      metrics
        .filter((m: any) => m.name === "largest_contentful_paint")
        .slice(-1)[0]?.value || 0,
    cls:
      metrics
        .filter((m: any) => m.name === "cumulative_layout_shift")
        .slice(-1)[0]?.value || 0,
    fid:
      metrics.filter((m: any) => m.name === "first_input_delay").slice(-1)[0]
        ?.value || 0,
  };

  const getVitalStatus = (name: keyof typeof webVitals) => {
    const value = webVitals[name];
    const thresholds = performanceManager.getConfig().thresholds;

    switch (name) {
      case "fcp":
        return value <= thresholds.firstContentfulPaint
          ? "good"
          : value <= thresholds.firstContentfulPaint * 1.5
            ? "warning"
            : "error";
      case "lcp":
        return value <= thresholds.largestContentfulPaint
          ? "good"
          : value <= thresholds.largestContentfulPaint * 1.5
            ? "warning"
            : "error";
      case "cls":
        return value <= thresholds.cumulativeLayoutShift
          ? "good"
          : value <= thresholds.cumulativeLayoutShift * 2
            ? "warning"
            : "error";
      case "fid":
        return value <= thresholds.firstInputDelay
          ? "good"
          : value <= thresholds.firstInputDelay * 2
            ? "warning"
            : "error";
      default:
        return "good";
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "metrics", label: "Metrics" },
    { id: "bundle", label: "Bundle Analysis" },
    { id: "cache", label: "Cache Stats" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-3xl tracking-tight">
            Performance Dashboard
          </h2>
          <p className="text-gray-600">
            Monitor and optimize your application performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={reanalyze}
            variant="outline"
            disabled={bundleLoading}
          >
            {bundleLoading ? "Analyzing..." : "Reanalyze Bundle"}
          </Button>
          <Button onClick={clearMetrics} variant="outline">
            Clear Metrics
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && (
        <div className="space-y-6">
          {/* Web Vitals */}
          <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="First Contentful Paint"
              value={`${webVitals.fcp.toFixed(0)}ms`}
              description="Time to first content render"
              status={getVitalStatus("fcp")}
            />
            <MetricCard
              title="Largest Contentful Paint"
              value={`${webVitals.lcp.toFixed(0)}ms`}
              description="Time to main content render"
              status={getVitalStatus("lcp")}
            />
            <MetricCard
              title="Cumulative Layout Shift"
              value={webVitals.cls.toFixed(3)}
              description="Visual stability score"
              status={getVitalStatus("cls")}
            />
            <MetricCard
              title="First Input Delay"
              value={`${webVitals.fid.toFixed(0)}ms`}
              description="Time to interactive"
              status={getVitalStatus("fid")}
            />
          </div>

          {/* Recommendations */}
          <div className="gap-6 grid md:grid-cols-2">
            <RecommendationList
              title="Performance Recommendations"
              recommendations={report?.recommendations || []}
            />
            <RecommendationList
              title="Bundle Recommendations"
              recommendations={analysis?.recommendations || []}
            />
          </div>
        </div>
      )}

      {selectedTab === "metrics" && (
        <div className="space-y-6">
          <div className="gap-6 grid md:grid-cols-2">
            <PerformanceChart
              title="Render Times"
              metrics={metrics.filter((m: any) => m.type === "rendering")}
            />
            <PerformanceChart
              title="Network Times"
              metrics={metrics.filter((m: any) => m.type === "network")}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Metrics</CardTitle>
              <CardDescription>Latest performance measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {metrics
                  .slice(-20)
                  .reverse()
                  .map((metric: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{metric.type}</Badge>
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 text-sm">
                          {new Date(metric.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="font-mono">
                          {metric.value.toFixed(2)}
                          {metric.type === "memory" ? " bytes" : "ms"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === "bundle" && (
        <div className="space-y-6">
          {analysis && (
            <>
              <div className="gap-4 grid md:grid-cols-3">
                <MetricCard
                  title="Total Bundle Size"
                  value={formatBytes(analysis.totalSize)}
                  description="Total size of all chunks"
                  status={analysis.totalSize > 1024 * 1024 ? "warning" : "good"}
                />
                <MetricCard
                  title="Number of Chunks"
                  value={analysis.chunks.length}
                  description="Total JavaScript chunks"
                  status="good"
                />
                <MetricCard
                  title="Largest Chunk"
                  value={formatBytes(
                    Math.max(...analysis.chunks.map((c: any) => c.size)),
                  )}
                  description="Size of largest chunk"
                  status={
                    Math.max(...analysis.chunks.map((c: any) => c.size)) >
                    500 * 1024
                      ? "warning"
                      : "good"
                  }
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Bundle Breakdown</CardTitle>
                  <CardDescription>Individual chunk sizes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.chunks
                      .sort((a: any, b: any) => b.size - a.size)
                      .map((chunk: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <span className="font-medium">{chunk.name}</span>
                          <span className="text-sm">
                            {formatBytes(chunk.size)}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      {selectedTab === "cache" && report && (
        <div className="space-y-6">
          <CacheStats stats={report.cacheStats} />

          <Card>
            <CardHeader>
              <CardTitle>Cache Performance Summary</CardTitle>
              <CardDescription>Overall caching statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(report.summary).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <span className="font-medium">
                      {key.replace(/_/g, " ").toUpperCase()}
                    </span>
                    <span className="font-mono">
                      {typeof value === "number"
                        ? value.toFixed(2)
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
