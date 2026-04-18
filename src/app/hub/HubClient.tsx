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
import { useLocale } from "@/hooks/useLocale";
import { usePWA } from "@/hooks/usePWA";

// ─── Types ────────────────────────────────────────────────────────────────────

type TopTab =
  | "safety"
  | "employee-manual"
  | "joining-program"
  | "history"
  | "app";

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
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-8">
      <section>
        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MaterialIcon
            icon="play_circle"
            size="sm"
            className="text-brand-primary"
          />
          {isEs
            ? "Videos de capacitación de Travelers"
            : "Travelers Training Videos"}
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
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-secondary-text dark:text-brand-secondary-light px-2 py-0.5 rounded-full bg-brand-secondary/10 self-start">
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
                {isEs ? "Ver video" : "Watch Video"}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── App panel (PWA-only) ─────────────────────────────────────────────────────

function AppPanel() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [notifPermission, setNotifPermission] =
    useState<NotificationPermission>("default");
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateChecked, setUpdateChecked] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const requestNotifications = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setNotifPermission(result);
  };

  const checkForUpdate = async () => {
    setCheckingUpdate(true);
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.update()));
      }
    } finally {
      setCheckingUpdate(false);
      setUpdateChecked(true);
    }
  };

  const notifLabel = () => {
    if (notifPermission === "granted") {
      return isEs ? "Notificaciones activadas" : "Notifications enabled";
    }
    if (notifPermission === "denied") {
      return isEs
        ? "Bloqueado por el navegador"
        : "Blocked by browser — enable in Settings";
    }
    return isEs ? "Activar notificaciones" : "Enable notifications";
  };

  const quickLinks = [
    {
      href: "/hub",
      icon: "health_and_safety",
      label: isEs ? "Seguridad" : "Safety Hub",
    },
    {
      href: "/resources/safety-manual",
      icon: "menu_book",
      label: isEs ? "Manual de seguridad" : "Safety Manual",
    },
    {
      href: "/contact",
      icon: "alternate_email",
      label: isEs ? "Contacto" : "Contact",
    },
    {
      href: "/careers",
      icon: "work",
      label: isEs ? "Empleos" : "Careers",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 space-y-8">
      {/* Quick contact ──────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MaterialIcon
            icon="phone_in_talk"
            size="sm"
            className="text-brand-primary"
          />
          {isEs ? "Contacto rápido" : "Quick Contact"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="tel:+15093086489"
            className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-colors"
          >
            <span className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <MaterialIcon
                icon="phone"
                size="sm"
                className="text-brand-primary"
              />
            </span>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {isEs ? "Llamar a la oficina" : "Call Office"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                (509) 308-6489
              </p>
            </div>
          </a>
          <a
            href="mailto:office@mhc-gc.com"
            className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-colors"
          >
            <span className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <MaterialIcon
                icon="mail"
                size="sm"
                className="text-brand-primary"
              />
            </span>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {isEs ? "Correo a la oficina" : "Email Office"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                office@mhc-gc.com
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Push notifications ─────────────────────────────────────────────── */}
      {"Notification" in (typeof window !== "undefined" ? window : {}) && (
        <section>
          <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MaterialIcon
              icon="notifications"
              size="sm"
              className="text-brand-primary"
            />
            {isEs ? "Notificaciones" : "Notifications"}
          </h2>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4">
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {isEs ? "Alertas push" : "Push alerts"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {notifLabel()}
              </p>
            </div>
            {notifPermission === "default" && (
              <button
                onClick={() => void requestNotifications()}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors"
              >
                {isEs ? "Activar" : "Enable"}
              </button>
            )}
            {notifPermission === "granted" && (
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-green-600"
              />
            )}
            {notifPermission === "denied" && (
              <MaterialIcon icon="block" size="sm" className="text-red-500" />
            )}
          </div>
        </section>
      )}

      {/* Quick navigation ───────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MaterialIcon
            icon="grid_view"
            size="sm"
            className="text-brand-primary"
          />
          {isEs ? "Accesos rápidos" : "Quick Links"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-colors text-center"
            >
              <span className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                <MaterialIcon
                  icon={link.icon}
                  size="sm"
                  className="text-brand-primary"
                />
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-tight">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* App maintenance ────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MaterialIcon
            icon="system_update"
            size="sm"
            className="text-brand-primary"
          />
          {isEs ? "Mantenimiento de la app" : "App Maintenance"}
        </h2>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
          {/* Check for updates */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {isEs ? "Buscar actualización" : "Check for update"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {updateChecked
                  ? isEs
                    ? "Comprobado — reinicia si se encontró una actualización"
                    : "Checked — reload if an update was found"
                  : isEs
                    ? "Actualiza el service worker ahora"
                    : "Polls service worker immediately"}
              </p>
            </div>
            <button
              onClick={() => void checkForUpdate()}
              disabled={checkingUpdate}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <MaterialIcon
                icon="refresh"
                size="sm"
                className={checkingUpdate ? "animate-spin" : ""}
              />
              {checkingUpdate
                ? isEs
                  ? "Buscando…"
                  : "Checking…"
                : isEs
                  ? "Verificar"
                  : "Check"}
            </button>
          </div>

          {/* Reload app */}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {isEs ? "Recargar la app" : "Reload app"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {isEs
                  ? "Fuerza una recarga completa"
                  : "Force a full page reload"}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isEs ? "Recargar" : "Reload"}
            </button>
          </div>
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
  const locale = useLocale();
  const isEs = locale === "es";

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
          {isEs
            ? "Esta sección estará disponible pronto. El contenido se agregará cuando se entregue el material fuente."
            : "This section is coming soon. Content will be added once the source materials are delivered."}
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
  const locale = useLocale();
  const isEs = locale === "es";
  const { isStandalone } = usePWA();
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

  const tabs = [
    ...visibleTabs(user.role),
    ...(isStandalone
      ? [
          {
            id: "app" as TopTab,
            label: "App",
            icon: "smartphone",
            minRole: [
              "admin",
              "superintendent",
              "worker",
              "traveler",
            ] as HubRole[],
          },
        ]
      : []),
  ];

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
                {tab.id === "safety"
                  ? isEs
                    ? "Seguridad"
                    : "Safety"
                  : tab.id === "employee-manual"
                    ? isEs
                      ? "Manual del empleado"
                      : "Employee Manual"
                    : tab.id === "joining-program"
                      ? isEs
                        ? "Programa de incorporación"
                        : "Joining Program"
                      : tab.id === "app"
                        ? isEs
                          ? "App"
                          : "App"
                        : isEs
                          ? "Historial"
                          : "History"}
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
        <PlaceholderPanel
          label={isEs ? "Manual del empleado" : "Employee Manual"}
          icon="menu_book"
        />
      )}

      {safeTab === "joining-program" && (
        <JoiningProgramPanel travelersVideos={travelersVideos} />
      )}

      {safeTab === "history" && (
        <PlaceholderPanel
          label={isEs ? "Historial de actividad" : "Activity History"}
          icon="history"
        />
      )}

      {safeTab === "app" && <AppPanel />}
    </div>
  );
}
