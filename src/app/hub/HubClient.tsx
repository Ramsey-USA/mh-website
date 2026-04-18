"use client";

import { useState, useEffect, useCallback } from "react";
import type { DocumentEntry } from "@/lib/data/documents";
import type { TravelersVideo } from "@/lib/data/travelers-training";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  RoleGate,
  SafetyHub,
  type HubUser,
  type HubRole,
} from "@/app/safety/hub/SafetyHubClient";

// ─── Types ────────────────────────────────────────────────────────────────────

type TopTab = "safety" | "employee-manual" | "joining-program" | "history";

interface HubClientProps {
  allHubDocuments: DocumentEntry[];
  travelersVideos: TravelersVideo[];
}

// ─── Tab config ───────────────────────────────────────────────────────────────

interface TabConfig {
  id: TopTab;
  label: string;
  icon: string;
  minRole: HubRole[];
}

const ALL_TABS: TabConfig[] = [
  {
    id: "safety",
    label: "Safety",
    icon: "health_and_safety",
    minRole: ["admin", "superintendent", "worker", "traveler"],
  },
  {
    id: "employee-manual",
    label: "Employee Manual",
    icon: "menu_book",
    minRole: ["admin", "superintendent", "worker"],
  },
  {
    id: "joining-program",
    label: "Joining Program",
    icon: "person_add",
    minRole: ["admin", "superintendent", "worker"],
  },
  {
    id: "history",
    label: "History",
    icon: "history",
    minRole: ["admin", "superintendent"],
  },
];

function visibleTabs(role: HubRole): TabConfig[] {
  return ALL_TABS.filter((t) => t.minRole.includes(role));
}

// ─── Joining Program panel ────────────────────────────────────────────────────

function JoiningProgramPanel({
  travelersVideos: videos,
}: Readonly<{
  travelersVideos: TravelersVideo[];
}>) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-8">
      <section>
        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MaterialIcon
            icon="play_circle"
            size="sm"
            className="text-brand-primary"
          />
          Travelers Training Videos
        </h2>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-joining-program-seed={videos.length > 0 ? "true" : "false"}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3"
            >
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-secondary px-2 py-0.5 rounded-full bg-brand-secondary/10 self-start">
                {video.category}
              </span>
              <div className="grow">
                <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
                  {video.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {video.description}
                </p>
              </div>
              {video.duration && (
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                  {video.duration}
                </span>
              )}
              <a
                href={video.url === "#" ? undefined : video.url}
                target={video.url === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-disabled={video.url === "#"}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors ${
                  video.url === "#"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-brand-primary hover:bg-brand-primary-dark text-white"
                }`}
              >
                <MaterialIcon icon="play_arrow" size="sm" />
                Watch Video
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Placeholder panel ────────────────────────────────────────────────────────

function PlaceholderPanel({
  label,
  icon,
}: Readonly<{ label: string; icon: string }>) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-8">
      <div className="text-center max-w-sm space-y-4">
        <div className="w-14 h-14 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto">
          <MaterialIcon icon={icon} size="lg" className="text-brand-primary" />
        </div>
        <h3 className="text-lg font-black text-gray-900 dark:text-white">
          {label}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This section is coming soon. Content will be added once the source
          materials are delivered.
        </p>
      </div>
    </div>
  );
}

// ─── Main HubClient ───────────────────────────────────────────────────────────

export function HubClient({
  allHubDocuments,
  travelersVideos,
}: Readonly<HubClientProps>) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<HubUser | null>(null);
  const [activeTab, setActiveTab] = useState<TopTab>("safety");

  // ── Auth bootstrap (same pattern as SafetyHubClient) ─────────────────────

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) return;

        const data = (await res.json()) as {
          accessToken?: string;
          user?: { name?: string; role?: string };
        };

        if (!data.accessToken || !data.user?.role) return;

        const role = data.user.role as HubRole;
        const validRoles: HubRole[] = [
          "admin",
          "superintendent",
          "worker",
          "traveler",
        ];
        if (!validRoles.includes(role)) return;

        let fallbackName = "Superintendent";
        if (role === "worker") fallbackName = "Field Worker";
        else if (role === "traveler") fallbackName = "Travelers Insurance";
        else if (role === "admin") fallbackName = "Admin";
        const name = data.user.name ?? fallbackName;

        setToken(data.accessToken);
        setUser({ name, role });
      } catch {
        // unauthenticated — show gate
      }
    };
    void bootstrap();
  }, []);

  const handleLogin = useCallback((accessToken: string, userData: HubUser) => {
    setToken(accessToken);
    setUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    void fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    localStorage.removeItem("field_auth_token");
    localStorage.removeItem("field_user");
    setToken(null);
    setUser(null);
  }, []);

  // ── Unauthenticated ───────────────────────────────────────────────────────

  if (!token || !user) {
    return <RoleGate onLogin={handleLogin} />;
  }

  // ── Tab shell ─────────────────────────────────────────────────────────────

  const tabs = visibleTabs(user.role);

  // Clamp activeTab to visible set after potential role change
  const safeTab = tabs.some((t) => t.id === activeTab) ? activeTab : "safety";
  if (safeTab !== activeTab) setActiveTab(safeTab);

  const safetySections =
    allHubDocuments.find((e) => e.id === "safety-manual")?.sections ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top-level tab bar */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-1">
          {tabs.map((tab) => {
            const active = tab.id === safeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  active
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <MaterialIcon
                  icon={tab.icon}
                  size="sm"
                  style={{ fontSize: "14px" }}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tab panels */}
      {safeTab === "safety" && (
        <SafetyHub
          sections={safetySections}
          token={token}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {safeTab === "employee-manual" && (
        <PlaceholderPanel label="Employee Manual" icon="menu_book" />
      )}

      {safeTab === "joining-program" && (
        <JoiningProgramPanel travelersVideos={travelersVideos} />
      )}

      {safeTab === "history" && (
        <PlaceholderPanel label="Activity History" icon="history" />
      )}
    </div>
  );
}
