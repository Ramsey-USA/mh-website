"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/utils/logger";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { AnalyticsDashboardData } from "@/lib/analytics/types";
import { dataCollector } from "@/lib/analytics/data-collector";

/**
 * Mission Control - Analytics Dashboard
 * Command Center for Matt and Jeremy
 * OPERATIONAL INTELLIGENCE: Real-time tactical analytics
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
  const [localData, setLocalData] = useState<any>(null);
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
      logger.error("Auth error:", err);
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

      // Get local storage data for geographic/CTA tracking
      const local = dataCollector.getAllData();
      setLocalData(local);
    } catch (err) {
      logger.error("Analytics fetch error:", err);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Command Center Header */}
      <header className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary border-b-4 border-brand-secondary shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border-2 border-brand-secondary">
                <MaterialIcon
                  icon="military_tech"
                  size="lg"
                  className="text-brand-secondary"
                />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  🎯 MISSION CONTROL
                </h1>
                <p className="text-sm text-brand-secondary font-bold uppercase tracking-wider">
                  SITREP: Welcome back, {userData?.name} • Status: OPERATIONAL
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-black/60 hover:bg-black/80 border-2 border-brand-secondary rounded-lg text-white font-black uppercase text-sm transition-all hover:scale-105"
            >
              <MaterialIcon icon="power_settings_new" size="sm" />
              Disengage
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
                icon="radar"
                size="4xl"
                className="text-brand-secondary animate-pulse mx-auto mb-4"
              />
              <p className="text-brand-secondary font-bold uppercase tracking-wider">
                SCANNING TACTICAL DATA...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/40 backdrop-blur-sm border-2 border-red-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <MaterialIcon icon="warning" size="lg" className="text-red-400" />
              <div>
                <h3 className="font-black text-red-300 mb-1 uppercase tracking-wide">
                  ⚠️ MISSION CRITICAL ERROR
                </h3>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tactical Overview - Main Stats */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                <MaterialIcon
                  icon="dashboard"
                  size="lg"
                  className="text-brand-secondary"
                />
                📊 TACTICAL OVERVIEW - ENGAGEMENT METRICS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MilitaryStatCard
                  icon="visibility"
                  label="RECON OPERATIONS"
                  sublabel="Page Views"
                  value={localData?.pageviews?.total?.toLocaleString() || "0"}
                  trend="+12%"
                  trendUp
                />
                <MilitaryStatCard
                  icon="people"
                  label="ALLIED FORCES"
                  sublabel="Unique Visitors"
                  value={
                    analyticsData?.overview?.totalUsers?.toLocaleString() || "0"
                  }
                  trend="+8%"
                  trendUp
                />
                <MilitaryStatCard
                  icon="schedule"
                  label="ENGAGEMENT TIME"
                  sublabel="Avg. Session Duration"
                  value={formatDuration(
                    analyticsData?.overview?.averageSessionDuration || 0,
                  )}
                  trend="+5%"
                  trendUp
                />
                <MilitaryStatCard
                  icon="flag"
                  label="MISSION SUCCESS"
                  sublabel="Conversion Rate"
                  value={`${((analyticsData?.overview?.conversionRate || 0) * 100).toFixed(1)}%`}
                  trend="+3%"
                  trendUp
                />
              </div>
            </div>

            {/* Geographic Intelligence - NEW */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                <MaterialIcon
                  icon="map"
                  size="lg"
                  className="text-brand-secondary"
                />
                🗺️ GEOGRAPHIC INTELLIGENCE - AO COVERAGE
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GeographicHeatMap clicks={localData?.clicks || []} />
                <TopLocations clicks={localData?.clicks || []} />
              </div>
            </div>

            {/* CTA Performance - NEW */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                <MaterialIcon
                  icon="touch_app"
                  size="lg"
                  className="text-brand-secondary"
                />
                🎯 CTA ENGAGEMENT - TACTICAL RESPONSE
              </h2>
              <CTAPerformanceGrid clicks={localData?.clicks || []} />
            </div>

            {/* Conversion Intelligence */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                <MaterialIcon
                  icon="trending_up"
                  size="lg"
                  className="text-brand-secondary"
                />
                ✅ MISSION OBJECTIVES - CONVERSIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MilitaryMetricCard
                  icon="mail"
                  label="CONTACT SECURED"
                  sublabel="Form Submissions"
                  value={localData?.conversions?.contacts?.toString() || "0"}
                  color="green"
                />
                <MilitaryMetricCard
                  icon="event"
                  label="CONSULTATIONS"
                  sublabel="Scheduled Meetings"
                  value={
                    localData?.conversions?.consultations?.toString() || "0"
                  }
                  color="blue"
                />
                <MilitaryMetricCard
                  icon="assessment"
                  label="TOTAL OBJECTIVES"
                  sublabel="All Conversions"
                  value={localData?.conversions?.total?.toString() || "0"}
                  color="purple"
                />
              </div>
            </div>

            {/* Veteran Operations */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                <MaterialIcon
                  icon="military_tech"
                  size="lg"
                  className="text-bronze-400"
                />
                🎖️ VETERAN OPERATIONS - BROTHERHOOD ENGAGEMENT
              </h2>
              <div className="bg-gradient-to-br from-bronze-900/60 to-bronze-800/40 backdrop-blur-sm rounded-xl border-2 border-bronze-500 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <MaterialIcon
                      icon="visibility"
                      size="2xl"
                      className="text-bronze-300 mx-auto mb-3"
                    />
                    <div className="text-4xl font-black text-white mb-2">
                      {analyticsData?.veteranInsights?.veteranUsers?.toString() ||
                        "0"}
                    </div>
                    <div className="text-bronze-300 font-bold uppercase tracking-wide text-sm">
                      Veteran Visitors
                    </div>
                  </div>
                  <div className="text-center">
                    <MaterialIcon
                      icon="favorite"
                      size="2xl"
                      className="text-bronze-300 mx-auto mb-3"
                    />
                    <div className="text-4xl font-black text-white mb-2">
                      {`${((analyticsData?.overview?.veteranUserPercentage || 0) * 100).toFixed(1)}%`}
                    </div>
                    <div className="text-bronze-300 font-bold uppercase tracking-wide text-sm">
                      Veteran Percentage
                    </div>
                  </div>
                  <div className="text-center">
                    <MaterialIcon
                      icon="stars"
                      size="2xl"
                      className="text-bronze-300 mx-auto mb-3"
                    />
                    <div className="text-4xl font-black text-white mb-2">
                      100%
                    </div>
                    <div className="text-bronze-300 font-bold uppercase tracking-wide text-sm">
                      Veteran Commitment
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Readiness */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
                <MaterialIcon
                  icon="speed"
                  size="lg"
                  className="text-brand-secondary"
                />
                ⚡ PERFORMANCE READINESS - SYSTEM STATUS
              </h2>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <MaterialIcon
                      icon="timer"
                      size="2xl"
                      className="text-brand-secondary mx-auto mb-3"
                    />
                    <div className="text-3xl font-black text-white mb-2">
                      {analyticsData?.performance?.coreWebVitals?.lcp || 0}ms
                    </div>
                    <div className="text-brand-secondary font-bold uppercase tracking-wide text-sm">
                      Load Time
                    </div>
                  </div>
                  <div className="text-center">
                    <MaterialIcon
                      icon="palette"
                      size="2xl"
                      className="text-brand-secondary mx-auto mb-3"
                    />
                    <div className="text-3xl font-black text-white mb-2">
                      {analyticsData?.performance?.coreWebVitals?.fcp || 0}ms
                    </div>
                    <div className="text-brand-secondary font-bold uppercase tracking-wide text-sm">
                      First Paint
                    </div>
                  </div>
                  <div className="text-center">
                    <MaterialIcon
                      icon="touch_app"
                      size="2xl"
                      className="text-brand-secondary mx-auto mb-3"
                    />
                    <div className="text-3xl font-black text-white mb-2">
                      {analyticsData?.performance?.coreWebVitals?.cls?.toFixed(
                        3,
                      ) || 0}
                    </div>
                    <div className="text-brand-secondary font-bold uppercase tracking-wide text-sm">
                      Layout Stability
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper Functions
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

// NEW MILITARY-THEMED COMPONENTS

function MilitaryStatCard({
  icon,
  label,
  sublabel,
  value,
  trend,
  trendUp,
}: {
  icon: string;
  label: string;
  sublabel: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-brand-primary shadow-2xl p-6 hover:scale-105 transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-brand-secondary/20 p-3 rounded-lg border border-brand-secondary">
          <MaterialIcon
            icon={icon}
            size="lg"
            className="text-brand-secondary"
          />
        </div>
        <span
          className={`text-sm font-black uppercase tracking-wider px-2 py-1 rounded ${trendUp ? "bg-green-900/60 text-green-300" : "bg-red-900/60 text-red-300"}`}
        >
          {trend}
        </span>
      </div>
      <div className="text-4xl font-black text-white mb-2">{value}</div>
      <div className="text-brand-secondary font-bold uppercase tracking-wide text-xs mb-1">
        {label}
      </div>
      <div className="text-gray-400 text-xs">{sublabel}</div>
    </div>
  );
}

function MilitaryMetricCard({
  icon,
  label,
  sublabel,
  value,
  color,
}: {
  icon: string;
  label: string;
  sublabel: string;
  value: string;
  color: "green" | "blue" | "purple";
}) {
  const colorClasses = {
    green: {
      bg: "from-green-900/60 to-green-800/40",
      border: "border-green-500",
      text: "text-green-300",
    },
    blue: {
      bg: "from-blue-900/60 to-blue-800/40",
      border: "border-blue-500",
      text: "text-blue-300",
    },
    purple: {
      bg: "from-purple-900/60 to-purple-800/40",
      border: "border-purple-500",
      text: "text-purple-300",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-xl border-2 ${colors.border} p-6 hover:scale-105 transition-transform`}
    >
      <div className="flex items-center justify-between mb-4">
        <MaterialIcon icon={icon} size="2xl" className={colors.text} />
      </div>
      <div className="text-5xl font-black text-white mb-2">{value}</div>
      <div
        className={`${colors.text} font-bold uppercase tracking-wide text-sm mb-1`}
      >
        {label}
      </div>
      <div className="text-gray-400 text-xs">{sublabel}</div>
    </div>
  );
}

function GeographicHeatMap({ clicks }: { clicks: any[] }) {
  // Aggregate clicks by city/state
  const locationCounts: Record<
    string,
    { count: number; state?: string; city?: string }
  > = {};

  clicks.forEach((click) => {
    if (click.city && click.state) {
      const key = `${click.city}, ${click.state}`;
      if (!locationCounts[key]) {
        locationCounts[key] = {
          count: 0,
          city: click.city,
          state: click.state,
        };
      }
      locationCounts[key].count++;
    } else if (click.state) {
      const key = click.state;
      if (!locationCounts[key]) {
        locationCounts[key] = { count: 0, state: click.state };
      }
      locationCounts[key].count++;
    }
  });

  const sortedLocations = Object.entries(locationCounts)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 10);

  const maxCount = sortedLocations[0]?.[1].count || 1;

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-brand-primary p-6">
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-2">
        <MaterialIcon
          icon="location_on"
          size="md"
          className="text-brand-secondary"
        />
        OPERATIONAL ZONES
      </h3>
      <div className="space-y-3">
        {sortedLocations.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            <MaterialIcon
              icon="explore_off"
              size="2xl"
              className="mx-auto mb-2"
            />
            <p>No geographic data available yet</p>
            <p className="text-xs mt-1">CTA clicks will populate this map</p>
          </div>
        ) : (
          sortedLocations.map(([location, data], index) => {
            const percentage = (data.count / maxCount) * 100;
            return (
              <div key={location} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-bold flex items-center gap-2">
                    <span className="text-brand-secondary font-black">
                      #{index + 1}
                    </span>
                    {location}
                  </span>
                  <span className="text-brand-secondary font-black">
                    {data.count} ops
                  </span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function TopLocations({ clicks }: { clicks: any[] }) {
  // Count by state for target market analysis
  const stateCounts: Record<string, number> = {};
  clicks.forEach((click) => {
    if (click.state) {
      stateCounts[click.state] = (stateCounts[click.state] || 0) + 1;
    }
  });

  const targetMarket = ["Washington", "WA", "Oregon", "OR", "Idaho", "ID"];
  const targetCount = Object.entries(stateCounts).reduce(
    (sum, [state, count]) => {
      return targetMarket.includes(state) ? sum + count : sum;
    },
    0,
  );

  const totalCount = clicks.length;
  const targetPercentage =
    totalCount > 0 ? (targetCount / totalCount) * 100 : 0;

  const topStates = Object.entries(stateCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-brand-primary p-6">
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-2">
        <MaterialIcon icon="flag" size="md" className="text-brand-secondary" />
        TARGET AO STATUS
      </h3>

      {/* Target Market Indicator */}
      <div className="bg-brand-primary/20 border-2 border-brand-secondary rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-5xl font-black text-white mb-2">
            {targetPercentage.toFixed(0)}%
          </div>
          <div className="text-brand-secondary font-bold uppercase tracking-wide text-sm">
            🎯 Target Market Coverage
          </div>
          <div className="text-gray-400 text-xs mt-1">
            WA, OR, ID Operations
          </div>
        </div>
      </div>

      {/* Top States */}
      <div className="space-y-2">
        {topStates.map(([state, count]) => {
          const isTarget = targetMarket.includes(state);
          return (
            <div
              key={state}
              className={`flex items-center justify-between p-3 rounded-lg ${isTarget ? "bg-brand-secondary/20 border border-brand-secondary" : "bg-gray-700/50"}`}
            >
              <span className="text-white font-bold flex items-center gap-2">
                {isTarget && "🎯"} {state}
              </span>
              <span className="text-brand-secondary font-black">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CTAPerformanceGrid({ clicks }: { clicks: any[] }) {
  // Aggregate clicks by element ID
  const ctaCounts: Record<string, number> = {};
  clicks.forEach((click) => {
    if (click.element) {
      ctaCounts[click.element] = (ctaCounts[click.element] || 0) + 1;
    }
  });

  const sortedCTAs = Object.entries(ctaCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12);

  // Categorize CTAs
  const phoneCTAs = sortedCTAs.filter(([id]) => id.includes("phone"));
  const emailCTAs = sortedCTAs.filter(([id]) => id.includes("email"));
  const addressCTAs = sortedCTAs.filter(([id]) => id.includes("address"));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Phone CTAs */}
      <div className="bg-gradient-to-br from-green-900/60 to-green-800/40 backdrop-blur-sm rounded-xl border-2 border-green-500 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MaterialIcon icon="phone" size="lg" className="text-green-300" />
          <h3 className="text-lg font-black text-white uppercase tracking-wide">
            📞 DIRECT COMMS
          </h3>
        </div>
        <div className="space-y-2">
          {phoneCTAs.length === 0 ? (
            <p className="text-gray-400 text-sm">No phone clicks yet</p>
          ) : (
            phoneCTAs.map(([id, count]) => (
              <div
                key={id}
                className="flex items-center justify-between bg-black/30 rounded-lg p-2"
              >
                <span className="text-green-300 text-xs truncate">{id}</span>
                <span className="text-white font-black text-lg">{count}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Email CTAs */}
      <div className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 backdrop-blur-sm rounded-xl border-2 border-blue-500 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MaterialIcon icon="mail" size="lg" className="text-blue-300" />
          <h3 className="text-lg font-black text-white uppercase tracking-wide">
            📧 SECURE MSGS
          </h3>
        </div>
        <div className="space-y-2">
          {emailCTAs.length === 0 ? (
            <p className="text-gray-400 text-sm">No email clicks yet</p>
          ) : (
            emailCTAs.map(([id, count]) => (
              <div
                key={id}
                className="flex items-center justify-between bg-black/30 rounded-lg p-2"
              >
                <span className="text-blue-300 text-xs truncate">{id}</span>
                <span className="text-white font-black text-lg">{count}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Address CTAs */}
      <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 backdrop-blur-sm rounded-xl border-2 border-purple-500 p-6">
        <div className="flex items-center gap-3 mb-4">
          <MaterialIcon icon="place" size="lg" className="text-purple-300" />
          <h3 className="text-lg font-black text-white uppercase tracking-wide">
            📍 COORDINATES
          </h3>
        </div>
        <div className="space-y-2">
          {addressCTAs.length === 0 ? (
            <p className="text-gray-400 text-sm">No address clicks yet</p>
          ) : (
            addressCTAs.map(([id, count]) => (
              <div
                key={id}
                className="flex items-center justify-between bg-black/30 rounded-lg p-2"
              >
                <span className="text-purple-300 text-xs truncate">{id}</span>
                <span className="text-white font-black text-lg">{count}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
