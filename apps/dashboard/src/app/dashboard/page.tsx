"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { logger } from "@/lib/utils/logger";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { usePageTracking } from "@/lib/analytics/hooks";
import { PrintButton } from "@/components/dashboard/PrintButton";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  formatDuration,
  formatNumber,
  formatTimestamp,
} from "@/lib/dashboard/formatters";
import {
  aggregateCtas,
  aggregateLocations,
  aggregateStateCounts,
  calculateTargetMarketCoverage,
  TARGET_MARKET_STATES,
  topStates,
  veteranPageViewTotal,
  type CtaAggregate,
  type LocationAggregate,
} from "@/lib/dashboard/aggregations";
import type { DashboardData } from "@/lib/dashboard/types";
import "@/styles/dashboard-print.css";

const TAB_PLACEHOLDER = (
  <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 animate-pulse h-64" />
);

const SafetyTab = dynamic(
  () => import("./SafetyTab").then((m) => ({ default: m.SafetyTab })),
  { ssr: false, loading: () => TAB_PLACEHOLDER },
);
const DriversTab = dynamic(
  () => import("./DriversTab").then((m) => ({ default: m.DriversTab })),
  { ssr: false, loading: () => TAB_PLACEHOLDER },
);
const AccessLogTab = dynamic(
  () => import("./AccessLogTab").then((m) => ({ default: m.AccessLogTab })),
  { ssr: false, loading: () => TAB_PLACEHOLDER },
);
const LeadsTab = dynamic(
  () => import("./LeadsTab").then((m) => ({ default: m.LeadsTab })),
  { ssr: false, loading: () => TAB_PLACEHOLDER },
);
const RfqTab = dynamic(
  () => import("./RfqTab").then((m) => ({ default: m.RfqTab })),
  { ssr: false, loading: () => TAB_PLACEHOLDER },
);

type DashboardTab =
  | "analytics"
  | "leads"
  | "safety"
  | "drivers"
  | "access-log"
  | "rfq";

const DASHBOARD_TABS: ReadonlyArray<DashboardTab> = [
  "analytics",
  "leads",
  "safety",
  "drivers",
  "access-log",
  "rfq",
];

const TAB_CONFIG: Readonly<
  Record<DashboardTab, { icon: string; label: string }>
> = {
  analytics: { icon: "dashboard", label: "Analytics" },
  leads: { icon: "person_search", label: "Leads CRM" },
  safety: { icon: "safety_check", label: "Safety" },
  drivers: { icon: "directions_car", label: "Drivers" },
  "access-log": { icon: "verified_user", label: "Access Log" },
  rfq: { icon: "description", label: "RFQ Builder" },
};

export default function AnalyticsDashboardPage() {
  usePageTracking("Analytics Dashboard");

  const router = useRouter();
  const auth = useAdminAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>("analytics");

  const adminToken = auth.status === "authenticated" ? auth.token : null;

  const fetchAnalyticsData = useCallback(async (token: string) => {
    try {
      setIsRefreshing(true);
      const response = await fetch("/api/analytics/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch analytics");
      const data = (await response.json()) as DashboardData;
      setDashboardData(data);
      setError(null);
    } catch (err) {
      logger.error("Analytics fetch error:", err);
      setError("Failed to load analytics data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!adminToken) return;
    void fetchAnalyticsData(adminToken);
  }, [adminToken, fetchAnalyticsData]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      logger.error("Logout error:", err);
    }
    router.push("/");
  };

  const handleRefresh = useCallback(() => {
    if (!adminToken) return;
    void fetchAnalyticsData(adminToken);
  }, [adminToken, fetchAnalyticsData]);

  if (auth.status !== "authenticated") {
    return null;
  }

  const userName = auth.userName || "Admin";
  const userData = { name: userName, email: auth.userEmail };

  return (
    <div
      data-print-scope="dashboard"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <header
        data-print-hide="true"
        className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary border-b-4 border-brand-secondary shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border-2 border-brand-secondary">
                <MaterialIcon
                  icon="dashboard"
                  size="lg"
                  className="text-brand-secondary"
                />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  ANALYTICS DASHBOARD
                </h1>
                <p className="text-sm text-brand-secondary font-bold uppercase tracking-wider">
                  Welcome back, {userName} • Status: READY
                </p>
                <p className="text-xs text-white/80 font-semibold tracking-wide">
                  Veteran-Owned Since January 2025 • Founded 2010
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing || !adminToken}
                className="flex items-center gap-2 px-4 py-3 bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-brand-secondary rounded-lg text-white font-black uppercase text-xs transition-colors"
              >
                {isRefreshing ? (
                  <MaterialIcon
                    icon="refresh"
                    size="sm"
                    className="animate-spin"
                  />
                ) : (
                  <MaterialIcon icon="refresh" size="sm" />
                )}
                {isRefreshing ? "Syncing" : "Refresh"}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-black/60 hover:bg-black/80 border-2 border-brand-secondary rounded-lg text-white font-black uppercase text-sm transition-all hover:scale-105"
              >
                <MaterialIcon icon="power_settings_new" size="sm" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div
        data-print-hide="true"
        className="bg-gray-900/80 border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {DASHBOARD_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? "bg-brand-primary text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <MaterialIcon icon={TAB_CONFIG[tab].icon} size="sm" />
                  {TAB_CONFIG[tab].label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Print-only report header */}
      <PrintHeader user={userData} data={dashboardData} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "leads" ? (
          <LeadsTab token={adminToken ?? ""} />
        ) : activeTab === "safety" ? (
          <SafetyTab token={adminToken ?? ""} />
        ) : activeTab === "drivers" ? (
          <DriversTab token={adminToken ?? ""} />
        ) : activeTab === "access-log" ? (
          <AccessLogTab token={adminToken ?? ""} />
        ) : activeTab === "rfq" ? (
          <RfqTab token={adminToken ?? ""} />
        ) : (
          <AnalyticsOverview
            data={dashboardData}
            isLoading={isLoading}
            error={error}
          />
        )}
      </main>
    </div>
  );
}

function PrintHeader({
  user,
  data,
}: Readonly<{
  user: { name: string; email: string } | null;
  data: DashboardData | null;
}>) {
  return (
    <div
      data-print-only="true"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
    >
      <h1 className="text-2xl font-bold text-black">
        MH Construction — Analytics Report
      </h1>
      <p className="text-sm text-gray-700">
        Generated for {user?.name ?? "Admin"} on {new Date().toLocaleString()}
        {data?.pageviews?.lastUpdated
          ? ` · Data as of ${formatTimestamp(data.pageviews.lastUpdated)}`
          : null}
      </p>
    </div>
  );
}

function AnalyticsOverview({
  data,
  isLoading,
  error,
}: Readonly<{
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}>) {
  // Memoize all derived aggregations so they only recompute when clicks change.
  const clicks = data?.clicks ?? [];
  const locations = useMemo(() => aggregateLocations(clicks), [clicks]);
  const stateCounts = useMemo(() => aggregateStateCounts(clicks), [clicks]);
  const topStateList = useMemo(() => topStates(stateCounts), [stateCounts]);
  const targetCoverage = useMemo(
    () => calculateTargetMarketCoverage(clicks),
    [clicks],
  );
  const ctas = useMemo(() => aggregateCtas(clicks), [clicks]);
  const veteranViews = useMemo(
    () => veteranPageViewTotal(data?.pageviews?.pages),
    [data?.pageviews?.pages],
  );

  const exportRows = useMemo(
    () =>
      clicks.map((c) => [
        c.timestamp ?? "",
        c.element ?? "",
        c.page ?? "",
        c.city ?? "",
        c.state ?? "",
      ]),
    [clicks],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <MaterialIcon
            icon="radar"
            size="4xl"
            className="text-brand-secondary animate-pulse mx-auto mb-4"
          />
          <p className="text-brand-secondary font-bold uppercase tracking-wider">
            Loading analytics data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/40 backdrop-blur-sm border-2 border-red-500 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <MaterialIcon icon="warning" size="lg" className="text-red-400" />
          <div>
            <h3 className="font-black text-red-300 mb-1 uppercase tracking-wide">
              Analytics Error
            </h3>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data?.kvStatus === "unavailable" && (
        <div
          data-print-hide="true"
          className="bg-yellow-900/40 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <MaterialIcon
              icon="cloud_off"
              size="lg"
              className="text-yellow-400"
            />
            <div>
              <h3 className="font-black text-yellow-300 mb-1 uppercase tracking-wide text-sm">
                KV NOT CONNECTED
              </h3>
              <p className="text-yellow-200 text-sm">
                ANALYTICS KV namespace not provisioned. Run{" "}
                <code className="bg-black/40 px-1 rounded">
                  wrangler kv namespace create ANALYTICS
                </code>{" "}
                and update wrangler.toml to see cross-visitor data.
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        data-print-hide="true"
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <p className="text-xs text-brand-secondary-text font-bold uppercase tracking-wider">
          Last sync: {formatTimestamp(data?.pageviews?.lastUpdated)}
        </p>
        <div className="flex items-center gap-2">
          <ExportCsvButton
            filename={`mh-analytics-clicks-${new Date().toISOString().slice(0, 10)}.csv`}
            headers={["Timestamp", "Element", "Page", "City", "State"]}
            rows={exportRows}
          />
          <PrintButton />
        </div>
      </div>

      <section data-print-section="true">
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon
            icon="dashboard"
            size="lg"
            className="text-brand-secondary"
          />
          Engagement Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="visibility"
            label="Page Views"
            sublabel="Page Views"
            value={formatNumber(data?.pageviews?.total)}
            trend={`${data?.today?.pageviews ?? 0} today`}
            trendUp
          />
          <StatCard
            icon="people"
            label="Total Sessions"
            sublabel="All Visitors"
            value={formatNumber(data?.sessions?.count)}
            trend={`${data?.today?.sessions ?? 0} today`}
            trendUp
          />
          <StatCard
            icon="schedule"
            label="Engagement Time"
            sublabel="Avg. Session Duration"
            value={formatDuration(data?.sessions?.averageDuration ?? 0)}
            trend={`${data?.sessions?.count ?? 0} sessions`}
            trendUp
          />
          <StatCard
            icon="flag"
            label="Total Conversions"
            sublabel="Total Conversions"
            value={formatNumber(data?.conversions?.total)}
            trend={`${data?.conversions?.contacts ?? 0} contacts`}
            trendUp
          />
        </div>
      </section>

      <section data-print-section="true">
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon icon="map" size="lg" className="text-brand-secondary" />
          Geographic Coverage
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeographicHeatMap locations={locations} />
          <TopLocations
            topStates={topStateList}
            coverage={targetCoverage.percentage}
          />
        </div>
      </section>

      <section data-print-section="true">
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon
            icon="touch_app"
            size="lg"
            className="text-brand-secondary"
          />
          CTA Engagement
        </h2>
        <CTAPerformanceGrid ctas={ctas} />
      </section>

      <section data-print-section="true">
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon
            icon="trending_up"
            size="lg"
            className="text-brand-secondary"
          />
          Conversion Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            icon="mail"
            label="Contact Forms"
            sublabel="Form Submissions"
            value={formatNumber(data?.conversions?.contacts)}
            color="green"
          />
          <MetricCard
            icon="event"
            label="CONSULTATIONS"
            sublabel="Scheduled Meetings"
            value={formatNumber(data?.conversions?.consultations)}
            color="blue"
          />
          <MetricCard
            icon="assessment"
            label="Total Conversions"
            sublabel="All Conversions"
            value={formatNumber(data?.conversions?.total)}
            color="purple"
          />
        </div>
      </section>

      <section data-print-section="true">
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon icon="groups" size="lg" className="text-bronze-400" />
          Veteran Engagement
        </h2>
        <div className="bg-gradient-to-br from-bronze-900/60 to-bronze-800/40 backdrop-blur-sm rounded-xl border-2 border-bronze-500 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VeteranStat
              icon="visibility"
              value={formatNumber(veteranViews)}
              label="Veteran Page Views"
            />
            <VeteranStat
              icon="favorite"
              value={formatNumber(data?.topPages?.length ?? 0)}
              label="Active Pages"
            />
            <VeteranStat icon="stars" value="100%" label="Veteran Commitment" />
          </div>
        </div>
      </section>

      <section data-print-section="true">
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon
            icon="speed"
            size="lg"
            className="text-brand-secondary"
          />
          System Performance Status
        </h2>
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SystemStat
              icon="bar_chart"
              value={formatNumber(data?.pageviews?.total)}
              label="Total Page Views"
            />
            <SystemStat
              icon="groups"
              value={formatNumber(data?.sessions?.count)}
              label="Total Sessions"
            />
            <SystemStat
              icon="touch_app"
              value={formatNumber(data?.clicks?.length ?? 0)}
              label="CTA Clicks Tracked"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const StatCard = function StatCard({
  icon,
  label,
  sublabel,
  value,
  trend,
  trendUp,
}: Readonly<{
  icon: string;
  label: string;
  sublabel: string;
  value: string;
  trend: string;
  trendUp: boolean;
}>) {
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
          className={`text-sm font-black uppercase tracking-wider px-2 py-1 rounded ${
            trendUp
              ? "bg-green-900/60 text-green-300"
              : "bg-red-900/60 text-red-300"
          }`}
        >
          {trend}
        </span>
      </div>
      <div className="text-4xl font-black text-white mb-2">{value}</div>
      <div className="text-brand-secondary-text font-bold uppercase tracking-wide text-xs mb-1">
        {label}
      </div>
      <div className="text-gray-600 text-xs">{sublabel}</div>
    </div>
  );
};

const METRIC_COLOR_CLASSES: Readonly<
  Record<
    "green" | "blue" | "purple",
    { bg: string; border: string; text: string }
  >
> = {
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

function MetricCard({
  icon,
  label,
  sublabel,
  value,
  color,
}: Readonly<{
  icon: string;
  label: string;
  sublabel: string;
  value: string;
  color: "green" | "blue" | "purple";
}>) {
  const colors = METRIC_COLOR_CLASSES[color];
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
      <div className="text-gray-600 text-xs">{sublabel}</div>
    </div>
  );
}

function VeteranStat({
  icon,
  value,
  label,
}: Readonly<{ icon: string; value: string; label: string }>) {
  return (
    <div className="text-center">
      <MaterialIcon
        icon={icon}
        size="2xl"
        className="text-bronze-300 mx-auto mb-3"
      />
      <div className="text-4xl font-black text-white mb-2">{value}</div>
      <div className="text-bronze-300 font-bold uppercase tracking-wide text-sm">
        {label}
      </div>
    </div>
  );
}

function SystemStat({
  icon,
  value,
  label,
}: Readonly<{ icon: string; value: string; label: string }>) {
  return (
    <div className="text-center">
      <MaterialIcon
        icon={icon}
        size="2xl"
        className="text-brand-secondary mx-auto mb-3"
      />
      <div className="text-3xl font-black text-white mb-2">{value}</div>
      <div className="text-brand-secondary-text font-bold uppercase tracking-wide text-sm">
        {label}
      </div>
    </div>
  );
}

function GeographicHeatMap({
  locations,
}: Readonly<{ locations: ReadonlyArray<LocationAggregate> }>) {
  const maxCount = locations[0]?.count ?? 1;
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-brand-primary p-6">
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-2">
        <MaterialIcon
          icon="location_on"
          size="md"
          className="text-brand-secondary"
        />
        Service Regions
      </h3>
      <div className="space-y-3">
        {locations.length === 0 ? (
          <div className="text-gray-600 text-center py-8">
            <MaterialIcon
              icon="explore_off"
              size="2xl"
              className="mx-auto mb-2"
            />
            <p>No geographic data available yet</p>
            <p className="text-xs mt-1">CTA clicks will populate this map</p>
          </div>
        ) : (
          locations.map((loc, index) => {
            const percentage = (loc.count / maxCount) * 100;
            return (
              <div key={loc.key} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-bold flex items-center gap-2">
                    <span className="text-brand-secondary font-black">
                      #{index + 1}
                    </span>
                    {loc.key}
                  </span>
                  <span className="text-brand-secondary font-black">
                    {loc.count} clicks
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

function TopLocations({
  topStates: states,
  coverage,
}: Readonly<{
  topStates: ReadonlyArray<readonly [string, number]>;
  coverage: number;
}>) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-brand-primary p-6">
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-2">
        <MaterialIcon icon="flag" size="md" className="text-brand-secondary" />
        Target Market Status
      </h3>

      <div className="bg-brand-primary/20 border-2 border-brand-secondary rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-5xl font-black text-white mb-2">
            {coverage.toFixed(0)}%
          </div>
          <div className="text-brand-secondary-text font-bold uppercase tracking-wide text-sm">
            TARGET MARKET COVERAGE
          </div>
          <div className="text-gray-600 text-xs mt-1">WA, OR, ID Coverage</div>
        </div>
      </div>

      <div className="space-y-2">
        {states.map(([state, count]) => {
          const isTarget = TARGET_MARKET_STATES.has(state);
          return (
            <div
              key={state}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isTarget
                  ? "bg-brand-secondary/20 border border-brand-secondary"
                  : "bg-gray-700/50"
              }`}
            >
              <span className="text-white font-bold flex items-center gap-2">
                {isTarget && (
                  <MaterialIcon
                    icon="gps_fixed"
                    size="sm"
                    className="text-brand-secondary"
                  />
                )}
                {state}
              </span>
              <span className="text-brand-secondary font-black">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CTA_BUCKETS: ReadonlyArray<{
  match: (id: string) => boolean;
  title: string;
  icon: string;
  bg: string;
  border: string;
  text: string;
  emptyText: string;
}> = [
  {
    match: (id) => id.includes("phone"),
    title: "Phone Contacts",
    icon: "phone",
    bg: "from-green-900/60 to-green-800/40",
    border: "border-green-500",
    text: "text-green-300",
    emptyText: "No phone clicks yet",
  },
  {
    match: (id) => id.includes("email"),
    title: "Email Inquiries",
    icon: "mail",
    bg: "from-blue-900/60 to-blue-800/40",
    border: "border-blue-500",
    text: "text-blue-300",
    emptyText: "No email clicks yet",
  },
  {
    match: (id) => id.includes("address"),
    title: "Address Requests",
    icon: "place",
    bg: "from-purple-900/60 to-purple-800/40",
    border: "border-purple-500",
    text: "text-purple-300",
    emptyText: "No address clicks yet",
  },
];

function CTAPerformanceGrid({
  ctas,
}: Readonly<{ ctas: ReadonlyArray<CtaAggregate> }>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CTA_BUCKETS.map((bucket) => {
        const matched = ctas.filter((c) => bucket.match(c.id));
        return (
          <div
            key={bucket.title}
            className={`bg-gradient-to-br ${bucket.bg} backdrop-blur-sm rounded-xl border-2 ${bucket.border} p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <MaterialIcon
                icon={bucket.icon}
                size="lg"
                className={bucket.text}
              />
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                {bucket.title}
              </h3>
            </div>
            <div className="space-y-2">
              {matched.length === 0 ? (
                <p className="text-gray-600 text-sm">{bucket.emptyText}</p>
              ) : (
                matched.map((cta) => (
                  <div
                    key={cta.id}
                    className="flex items-center justify-between bg-black/30 rounded-lg p-2"
                  >
                    <span className={`${bucket.text} text-xs truncate`}>
                      {cta.id}
                    </span>
                    <span className="text-white font-black text-lg">
                      {cta.count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
