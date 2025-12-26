"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { AnalyticsDashboardData } from "@/lib/analytics/types";

/**
 * Analytics Dashboard
 * Admin-only access for Matt and Jeremy
 * Displays comprehensive analytics data
 *
 * SEO: This page is excluded from search engines via robots.txt
 * Access: Hidden authentication via triple-click footer
 */
export default function AnalyticsDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_user");

    if (!token || !user) {
      router.push("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setIsAuthenticated(true);

      // Fetch analytics data
      fetchAnalyticsData(token);
    } catch (err) {
      console.error("Auth error:", err);
      router.push("/");
    }
  }, [router]);

  const fetchAnalyticsData = async (token: string) => {
    try {
      const response = await fetch("/api/analytics/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError("Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-3 rounded-xl">
                <MaterialIcon
                  icon="analytics"
                  size="lg"
                  className="text-white"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back, {userData?.name}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-semibold transition-all"
            >
              <MaterialIcon icon="logout" size="sm" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <MaterialIcon
                icon="hourglass_empty"
                size="4xl"
                className="text-brand-primary animate-spin mx-auto mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400">
                Loading analytics data...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <MaterialIcon
                icon="error"
                size="lg"
                className="text-red-600 dark:text-red-400"
              />
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-200 mb-1">
                  Error Loading Data
                </h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon="visibility"
                label="Total Page Views"
                value={
                  analyticsData?.overview?.pageViews?.toLocaleString() || "0"
                }
                trend="+12%"
                trendUp
              />
              <StatCard
                icon="people"
                label="Unique Visitors"
                value={
                  analyticsData?.overview?.totalUsers?.toLocaleString() || "0"
                }
                trend="+8%"
                trendUp
              />
              <StatCard
                icon="schedule"
                label="Avg. Session Duration"
                value={formatDuration(
                  analyticsData?.overview?.averageSessionDuration || 0,
                )}
                trend="+5%"
                trendUp
              />
              <StatCard
                icon="touch_app"
                label="Conversion Rate"
                value={`${((analyticsData?.overview?.conversionRate || 0) * 100).toFixed(1)}%`}
                trend="-2%"
                trendUp={false}
              />
            </div>

            {/* Performance Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-primary/10 p-2 rounded-lg">
                  <MaterialIcon
                    icon="speed"
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Performance Metrics
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricItem
                  label="Page Load Time"
                  value={`${analyticsData?.performance?.coreWebVitals?.lcp || 0}ms`}
                  icon="timer"
                />
                <MetricItem
                  label="First Contentful Paint"
                  value={`${analyticsData?.performance?.coreWebVitals?.fcp || 0}ms`}
                  icon="palette"
                />
                <MetricItem
                  label="Cumulative Layout Shift"
                  value={`${analyticsData?.performance?.coreWebVitals?.cls?.toFixed(3) || 0}`}
                  icon="touch_app"
                />
              </div>
            </div>

            {/* User Behavior */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-secondary/10 p-2 rounded-lg">
                  <MaterialIcon
                    icon="bar_chart"
                    size="md"
                    className="text-brand-secondary"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  User Behavior
                </h2>
              </div>
              <div className="space-y-4">
                <BehaviorItem
                  label="Top Pages"
                  items={analyticsData?.overview?.topPages || []}
                />
                <BehaviorItem
                  label="Bounce Rate"
                  value={`${((analyticsData?.overview?.bounceRate || 0) * 100).toFixed(1)}%`}
                />
              </div>
            </div>

            {/* Conversions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <MaterialIcon
                    icon="trending_up"
                    size="md"
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Conversions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricItem
                  label="Contact Form Submissions"
                  value={
                    analyticsData?.conversions?.estimatorToContact?.toString() ||
                    "0"
                  }
                  icon="mail"
                />
                <MetricItem
                  label="Consultation Requests"
                  value={
                    analyticsData?.conversions?.recommendationToInquiry?.toString() ||
                    "0"
                  }
                  icon="event"
                />
              </div>
            </div>

            {/* Veteran Insights */}
            <div className="bg-gradient-to-br from-bronze-50 to-bronze-100 dark:from-bronze-900/20 dark:to-bronze-800/20 rounded-xl shadow-lg border border-bronze-200 dark:border-bronze-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-bronze-200 dark:bg-bronze-800 p-2 rounded-lg">
                  <MaterialIcon
                    icon="military_tech"
                    size="md"
                    className="text-bronze-700 dark:text-bronze-300"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Veteran Engagement
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricItem
                  label="Veteran Users"
                  value={
                    analyticsData?.veteranInsights?.veteranUsers?.toString() ||
                    "0"
                  }
                  icon="visibility"
                />
                <MetricItem
                  label="Veteran Percentage"
                  value={`${((analyticsData?.overview?.veteranUserPercentage || 0) * 100).toFixed(1)}%`}
                  icon="favorite"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper Components
function StatCard({
  icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-brand-primary/10 p-3 rounded-lg">
          <MaterialIcon icon={icon} size="lg" className="text-brand-primary" />
        </div>
        <span
          className={`text-sm font-semibold ${trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {trend}
        </span>
      </div>
      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

function MetricItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <MaterialIcon
        icon={icon}
        size="md"
        className="text-gray-600 dark:text-gray-400"
      />
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

function BehaviorItem({
  label,
  items,
  value,
}: {
  label: string;
  items?: Array<{ page: string; views: number }>;
  value?: string;
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="font-semibold text-gray-900 dark:text-white mb-2">
        {label}
      </div>
      {value ? (
        <div className="text-2xl font-bold text-brand-primary">{value}</div>
      ) : (
        <ul className="space-y-2">
          {items?.slice(0, 5).map((item, index) => (
            <li
              key={index}
              className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
            >
              <span>{item.page}</span>
              <span className="font-semibold">{item.views}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Helper Functions
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}
