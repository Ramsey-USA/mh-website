"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionBrowser } from "@/components/safety/SectionBrowser";
import { ToolboxTalkForm } from "@/components/safety/forms/ToolboxTalkForm";
import { JHAForm } from "@/components/safety/forms/JHAForm";
import { SiteInspectionForm } from "@/components/safety/forms/SiteInspectionForm";
import { IncidentReportForm } from "@/components/safety/forms/IncidentReportForm";
import { forms, type DocumentSection } from "@/lib/data/documents";
import { DiagonalStripePattern } from "@/components/ui/backgrounds/DiagonalStripePattern";
import { BrandColorBlobs } from "@/components/ui/backgrounds/BrandColorBlobs";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { useLocale } from "@/hooks/useLocale";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string;
  job_number: string;
  job_name: string;
  location: string | null;
  super_name: string | null;
}

interface MySubmission {
  id: string;
  job_id: string;
  job_number: string;
  job_name: string;
  form_type: string;
  submitted_by: string;
  status: "submitted" | "reviewed" | "archived";
  print_count: number;
  submitted_at: string;
  created_at: string;
}

type FormType =
  | "toolbox-talk"
  | "jha"
  | "site-safety-inspection"
  | "incident-report";
type HubSection = "downloads" | "forms" | "history";

const FORM_TABS: {
  id: FormType;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "toolbox-talk",
    label: "Toolbox Talk",
    icon: "record_voice_over",
    description: "Pre-shift safety meeting record",
  },
  {
    id: "jha",
    label: "Job Hazard Analysis",
    icon: "playlist_add_check",
    description: "Task-level hazard identification",
  },
  {
    id: "site-safety-inspection",
    label: "Site Inspection",
    icon: "search",
    description: "Structured site walk checklist",
  },
  {
    id: "incident-report",
    label: "Incident Report",
    icon: "report",
    description: "Near miss or incident documentation",
  },
];

const FORM_TYPE_LABELS: Record<string, string> = {
  "toolbox-talk": "Toolbox Talk",
  jha: "JHA",
  "site-safety-inspection": "Site Inspection",
  "incident-report": "Incident Report",
};

const STATUS_STYLES: Record<string, string> = {
  submitted:
    "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700",
  reviewed:
    "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700",
  archived:
    "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
};

function hasPdfPath(
  form: (typeof forms)[number],
): form is (typeof forms)[number] & { pdfPath: string } {
  return typeof form.pdfPath === "string" && form.pdfPath.length > 0;
}

// ─── Role Gate ────────────────────────────────────────────────────────────────

export type HubRole = "admin" | "superintendent" | "worker" | "traveler";

export interface HubUser {
  name: string;
  role: HubRole;
  email?: string;
}

interface LoginFormProps {
  onLogin: (token: string, user: HubUser) => void;
}

const ROLE_CARDS: {
  role: HubRole;
  icon: string;
  label: string;
  subLabel: string;
}[] = [
  {
    role: "admin",
    icon: "admin_panel_settings",
    label: "Admin / Office Staff",
    subLabel: "Matt · Jeremy · Arnold · Brittney",
  },
  {
    role: "superintendent",
    icon: "engineering",
    label: "Field Superintendent",
    subLabel: "Site access - Toolbox Talks, JHA, Inspections",
  },
  {
    role: "worker",
    icon: "construction",
    label: "Employee / Field Worker",
    subLabel: "Submit forms · Read safety manual",
  },
  {
    role: "traveler",
    icon: "verified_user",
    label: "Travelers Insurance",
    subLabel: "Auditor access",
  },
];

function getLoginFallbackErrorMessage(isEs: boolean): string {
  if (isEs) {
    return "Error de inicio de sesión. Revise sus credenciales e intente de nuevo.";
  }

  return "Login failed. Check credentials and try again.";
}

function getSecretAriaLabel(
  isEs: boolean,
  showSecret: boolean,
  mode: "password" | "passcode",
): string {
  if (isEs) {
    if (mode === "password") {
      return showSecret ? "Ocultar contraseña" : "Mostrar contraseña";
    }
    return showSecret ? "Ocultar código" : "Mostrar código";
  }

  if (mode === "password") {
    return showSecret ? "Hide password" : "Show password";
  }
  return showSecret ? "Hide passcode" : "Show passcode";
}

function getDefaultUserName(role: HubRole, providedName?: string): string {
  if (providedName) {
    return providedName;
  }

  if (role === "worker") {
    return "Field Worker";
  }

  if (role === "traveler") {
    return "Travelers Insurance";
  }

  if (role === "admin") {
    return "Admin";
  }

  return "Superintendent";
}

export function RoleGate({ onLogin }: Readonly<LoginFormProps>) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [selectedRole, setSelectedRole] = useState<HubRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetRoleForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasscode("");
    setShowSecret(false);
    setError(null);
  };

  const handleBack = () => {
    resetRoleForm();
    setSelectedRole(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!selectedRole) {
      setError(
        isEs
          ? "Seleccione un rol para continuar."
          : "Select a role to continue.",
      );
      return;
    }

    if (selectedRole === "admin") {
      if (!email.trim() || !password) {
        setError(
          isEs
            ? "Ingrese su correo electrónico y contraseña."
            : "Please enter your email and password.",
        );
        return;
      }
    } else if (selectedRole === "superintendent") {
      if (!name.trim()) {
        setError(isEs ? "Ingrese su nombre." : "Please enter your name.");
        return;
      }
      if (!passcode) {
        setError(
          isEs
            ? "Ingrese el código de acceso de la obra."
            : "Please enter the site passcode.",
        );
        return;
      }
    } else if (!passcode) {
      setError(
        isEs
          ? "Ingrese el código de acceso del rol."
          : "Please enter the role passcode.",
      );
      return;
    }

    setLoading(true);

    try {
      let endpoint = "/api/auth/hub-login";
      let payload: Record<string, string> = {};

      if (selectedRole === "admin") {
        endpoint = "/api/auth/admin-login";
        payload = { email: email.trim(), password };
      } else if (selectedRole === "superintendent") {
        endpoint = "/api/auth/field-login";
        payload = { name: name.trim(), passcode };
      } else {
        payload = { role: selectedRole, passcode };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as {
        error?: string;
        accessToken?: string;
        user?: HubUser;
        admin_token?: string;
        admin_user?: HubUser;
      };

      if (!res.ok) {
        throw new Error(
          json.error ?? (isEs ? "Error de inicio de sesión." : "Login failed."),
        );
      }

      const accessToken = json.accessToken ?? json.admin_token;
      const user = json.user ?? json.admin_user;

      if (!accessToken || !user?.role) {
        throw new Error(
          isEs
            ? "La respuesta de inicio de sesión está incompleta."
            : "Login response was incomplete.",
        );
      }

      if (user.role === "admin") {
        localStorage.setItem("admin_token", accessToken);
        localStorage.setItem("admin_user", JSON.stringify(user));
        globalThis.location.href = "/dashboard";
        return;
      }

      localStorage.setItem("field_auth_token", accessToken);
      localStorage.setItem("field_user", JSON.stringify(user));
      onLogin(accessToken, user);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : getLoginFallbackErrorMessage(isEs),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 overflow-hidden">
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <FadeInWhenVisible>
        <div className="relative z-10 w-full max-w-lg">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Image
                src="/icons/icon-96x96.png"
                alt="MH Construction"
                width={48}
                height={48}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 px-8 py-8">
            <div className="text-center mb-6">
              <span className="block text-xs text-brand-secondary-text dark:text-brand-secondary-light font-medium uppercase tracking-wider mb-1">
                {isEs
                  ? "Operaciones de campo → Centro de seguridad"
                  : "Field Ops → Safety Hub"}
              </span>
              <h1 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                {isEs ? "Centro de seguridad de campo" : "Field Safety Hub"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isEs
                  ? "MH Construction - Acceso por rol"
                  : "MH Construction - Role-Based Access"}
              </p>
            </div>

            {selectedRole ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-brand-primary"
                >
                  <MaterialIcon icon="arrow_back" size="sm" />
                  {isEs
                    ? "Volver a selección de rol"
                    : "Back to role selection"}
                </button>

                {selectedRole === "admin" && (
                  <>
                    <div>
                      <label
                        htmlFor="hub-email"
                        className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1"
                      >
                        {isEs ? "Correo electrónico" : "Email"}
                      </label>
                      <input
                        id="hub-email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@mhc-gc.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="hub-password"
                        className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1"
                      >
                        {isEs ? "Contraseña" : "Password"}
                      </label>
                      <div className="relative">
                        <input
                          id="hub-password"
                          type={showSecret ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2.5 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecret((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          aria-label={getSecretAriaLabel(
                            isEs,
                            showSecret,
                            "password",
                          )}
                        >
                          <MaterialIcon
                            icon={showSecret ? "visibility_off" : "visibility"}
                            size="sm"
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === "superintendent" && (
                  <div>
                    <label
                      htmlFor="hub-name"
                      className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1"
                    >
                      {isEs ? "Su nombre" : "Your Name"}
                    </label>
                    <input
                      id="hub-name"
                      type="text"
                      autoComplete="name"
                      placeholder="First and Last Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
                    />
                  </div>
                )}

                {selectedRole !== "admin" && (
                  <div>
                    <label
                      htmlFor="hub-passcode"
                      className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1"
                    >
                      {isEs ? "Código de acceso" : "Passcode"}
                    </label>
                    <div className="relative">
                      <input
                        id="hub-passcode"
                        type={showSecret ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="********"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full px-4 py-2.5 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecret((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        aria-label={getSecretAriaLabel(
                          isEs,
                          showSecret,
                          "passcode",
                        )}
                      >
                        <MaterialIcon
                          icon={showSecret ? "visibility_off" : "visibility"}
                          size="sm"
                        />
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
                    <MaterialIcon icon="error_outline" size="sm" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-md"
                >
                  {loading ? (
                    <>
                      <MaterialIcon icon="hourglass_empty" size="sm" />
                      {isEs ? "Iniciando sesión..." : "Signing In..."}
                    </>
                  ) : (
                    <>
                      <MaterialIcon icon="lock_open" size="sm" />
                      {isEs ? "Iniciar sesión" : "Sign In"}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {ROLE_CARDS.map((card) => (
                  <button
                    key={card.role}
                    onClick={() => {
                      setSelectedRole(card.role);
                      resetRoleForm();
                    }}
                    className="text-left bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-secondary rounded-xl px-4 py-3 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 shrink-0 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                        <MaterialIcon
                          icon={card.icon}
                          size="sm"
                          className="text-brand-primary"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {card.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {card.subLabel}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
              {isEs ? "Contacte a Jeremy al" : "Contact Jeremy at"}{" "}
              <a
                href="tel:+15093086489"
                className="text-brand-primary hover:underline font-semibold"
              >
                (509) 308-6489
              </a>{" "}
              {isEs ? "para acceso." : "for access."}
            </p>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  );
}

// ─── Submission success card ──────────────────────────────────────────────────

function SubmissionSuccess({
  submissionId,
  formLabel,
  onReset,
}: Readonly<{
  submissionId: string;
  formLabel: string;
  onReset: () => void;
}>) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <FadeInWhenVisible>
      <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-6 py-8 text-center">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MaterialIcon
            icon="check_circle"
            size="lg"
            className="text-green-600 dark:text-green-400"
          />
        </div>
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
          {isEs ? `${formLabel} enviado` : `${formLabel} Submitted`}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {isEs
            ? "Su formulario ha sido guardado y el oficial de seguridad ha sido notificado."
            : "Your form has been saved and the safety officer has been notified."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`/safety/print/${submissionId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <MaterialIcon icon="print" size="sm" />
            {isEs ? "Imprimir / Exportar PDF" : "Print / Export PDF"}
          </a>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <MaterialIcon icon="add_circle_outline" size="sm" />
            {isEs ? "Enviar otro" : "Submit Another"}
          </button>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}

// ─── Summary stat card ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  accent,
}: Readonly<{
  label: string;
  value: number | string;
  icon: string;
  accent?: "amber" | "green" | "brand";
}>) {
  const colorMap = {
    amber: "text-amber-600 dark:text-amber-400",
    green: "text-green-600 dark:text-green-400",
    brand: "text-brand-primary dark:text-brand-secondary",
  };
  const accentClass = colorMap[accent ?? "brand"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
      <MaterialIcon
        icon={icon}
        size="md"
        className={`shrink-0 ${accentClass}`}
      />
      <div className="min-w-0">
        <p className={`text-xl font-black leading-none ${accentClass}`}>
          {value}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {label}
        </p>
      </div>
    </div>
  );
}

// ─── Main authenticated hub ───────────────────────────────────────────────────

export interface SafetyHubProps {
  sections: DocumentSection[];
  token: string;
  user: HubUser;
  onLogout: () => void;
}

export function SafetyHub({
  sections,
  token,
  user,
  onLogout,
}: Readonly<SafetyHubProps>) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [jobsLoading, setJobsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<HubSection>("downloads");
  const [activeFormType, setActiveFormType] =
    useState<FormType>("toolbox-talk");
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // Derived early so callbacks and effects can reference it before render

  const activeFormTab =
    FORM_TABS.find((t) => t.id === activeFormType) ?? FORM_TABS[0]!;

  // My History state
  const [myHistory, setMyHistory] = useState<MySubmission[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  // True once the first history fetch completes — gates stat cards & outstanding banner
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyFormType, setHistoryFormType] = useState<string>("");

  const isAdminOrSuper =
    user.role === "admin" || user.role === "superintendent";
  const canSubmitForms = user.role !== "traveler";
  const showJobSelector = user.role !== "traveler";
  const sectionCount = sections.length;

  const logAccess = useCallback(
    (payload: {
      event_type: string;
      resource_key?: string;
      resource_title?: string;
      job_id?: string;
    }) => {
      fetch("/api/safety/access-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }).catch(() => {
        // no-op: activity logging must never block hub interaction
      });
    },
    [token],
  );

  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const res = await fetch("/api/safety/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        const list = (json as { data: Job[] }).data;
        setJobs(list);
        // Functional update avoids taking selectedJobId as a dep
        setSelectedJobId((prev) => prev || list[0]?.id || "");
      }
    } finally {
      setJobsLoading(false);
    }
  }, [token]);

  const fetchMyHistory = useCallback(async () => {
    if (!isAdminOrSuper) {
      return;
    }

    setHistoryLoading(true);
    try {
      const params = new URLSearchParams({ submitted_by: user.name });
      if (historyFormType) params.set("form_type", historyFormType);
      const res = await fetch(`/api/safety/forms?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setMyHistory((json as { data: MySubmission[] }).data);
      }
    } finally {
      setHistoryLoading(false);
      setHistoryLoaded(true);
    }
  }, [token, user.name, historyFormType, isAdminOrSuper]);

  // Fetch jobs and history on mount for roles that can access those resources.
  useEffect(() => {
    if (showJobSelector) {
      void fetchJobs();
    } else {
      setJobsLoading(false);
    }

    if (isAdminOrSuper) {
      void fetchMyHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch history when the user navigates to the History tab or changes filter
  useEffect(() => {
    if (isAdminOrSuper && activeSection === "history") {
      void fetchMyHistory();
    }
  }, [activeSection, fetchMyHistory, isAdminOrSuper]);

  useEffect(() => {
    if (!isAdminOrSuper && activeSection === "history") {
      setActiveSection("downloads");
    }
  }, [activeSection, isAdminOrSuper]);

  useEffect(() => {
    if (activeSection === "downloads") {
      logAccess({
        event_type: "download",
        resource_key: "downloads-tab",
        resource_title: isEs
          ? "Pestaña de documentos de seguridad"
          : "Safety Documents tab",
      });
      return;
    }

    if (activeSection === "forms") {
      logAccess({
        event_type: "form_view",
        resource_key: activeFormType,
        resource_title: activeFormTab.label,
        ...(selectedJobId ? { job_id: selectedJobId } : {}),
      });
    }
  }, [
    activeFormTab.label,
    activeFormType,
    activeSection,
    isEs,
    logAccess,
    selectedJobId,
  ]);

  // ── Summary calculations ───────────────────────────────────────────────────

  const weekAgo = useMemo(
    () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    [],
  );

  const weekSubmissions = useMemo(
    () =>
      myHistory.filter(
        (s) => new Date(s.submitted_at || s.created_at) >= weekAgo,
      ),
    [myHistory, weekAgo],
  );

  const recentToolboxJobIds = useMemo(
    () =>
      new Set(
        myHistory
          .filter(
            (s) =>
              s.form_type === "toolbox-talk" &&
              new Date(s.submitted_at || s.created_at) >= weekAgo,
          )
          .map((s) => s.job_id),
      ),
    [myHistory, weekAgo],
  );

  const outstandingJobs = useMemo(
    () => jobs.filter((j) => !recentToolboxJobIds.has(j.id)),
    [jobs, recentToolboxJobIds],
  );

  // ── Download tracking ──────────────────────────────────────────────────────

  const logDownload = useCallback(
    (
      sectionKey: string,
      sectionTitle: string,
      downloadType: "section" | "form",
    ) => {
      logAccess({
        event_type: "download",
        resource_key: sectionKey,
        resource_title: sectionTitle,
        ...(selectedJobId ? { job_id: selectedJobId } : {}),
      });

      void fetch("/api/safety/downloads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section_key: sectionKey,
          section_title: sectionTitle,
          download_type: downloadType,
          ...(selectedJobId ? { job_id: selectedJobId } : {}),
        }),
      });
    },
    [logAccess, token, selectedJobId],
  );

  const handleSubmitSuccess = useCallback(
    (newSubmissionId: string) => {
      setSubmissionId(newSubmissionId);
      logAccess({
        event_type: "form_submit",
        resource_key: activeFormType,
        resource_title: activeFormTab.label,
        ...(selectedJobId ? { job_id: selectedJobId } : {}),
      });
    },
    [activeFormTab.label, activeFormType, logAccess, selectedJobId],
  );

  const handleSectionDownload = useCallback(
    (section: DocumentSection) => {
      logDownload(`SAFETY_PROGRAM_${section.number}`, section.title, "section");
    },
    [logDownload],
  );

  const selectedJob = jobs.find((j) => j.id === selectedJobId);
  const jobLabel = selectedJob
    ? `${selectedJob.job_number} — ${selectedJob.job_name}`
    : "";
  const submissionsPluralSuffix = myHistory.length === 1 ? "" : "s";
  const jobsEmptyMessage = isEs
    ? "No hay obras activas. Contacte a su PM para agregar una."
    : "No active jobs. Contact your PM to add a job.";

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand + user */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shrink-0">
              <MaterialIcon
                icon="safety_check"
                size="sm"
                className="text-white"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                MISH Field Safety Hub
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
            </div>
          </div>

          {/* Section nav */}
          <nav
            className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
            aria-label="Hub sections"
          >
            {(
              [
                {
                  id: "downloads",
                  label: isEs ? "Descargas" : "Downloads",
                  icon: "download",
                },
                {
                  id: "forms",
                  label: isEs ? "Formularios" : "Forms",
                  icon: "edit_note",
                },
                ...(isAdminOrSuper
                  ? [
                      {
                        id: "history" as HubSection,
                        label: isEs ? "Mi historial" : "My History",
                        icon: "history",
                      },
                    ]
                  : []),
              ] as { id: HubSection; label: string; icon: string }[]
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  setSubmissionId(null);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeSection === s.id
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <MaterialIcon
                  icon={s.icon}
                  size="sm"
                  className="hidden sm:block"
                />
                {s.label}
              </button>
            ))}
          </nav>

          <button
            onClick={onLogout}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <MaterialIcon icon="logout" size="sm" />
            <span className="hidden sm:inline">
              {isEs ? "Cerrar sesión" : "Sign Out"}
            </span>
          </button>
        </div>

        {/* Job selector strip */}
        {showJobSelector && (
          <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-3">
              <MaterialIcon
                icon="work_outline"
                size="sm"
                className="text-gray-400 shrink-0"
              />
              {jobsLoading ? (
                <span className="text-xs text-gray-400 animate-pulse">
                  {isEs ? "Cargando obras..." : "Loading jobs..."}
                </span>
              ) : jobs.length === 0 ? (
                <span className="text-xs text-gray-400 italic">
                  {jobsEmptyMessage}
                </span>
              ) : (
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="flex-1 max-w-sm bg-transparent border-0 text-sm font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 cursor-pointer"
                  aria-label={
                    isEs ? "Seleccionar obra activa" : "Select active job"
                  }
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.job_number} — {j.job_name}
                      {j.location ? ` (${j.location})` : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Summary stat cards ── */}
      {isAdminOrSuper && historyLoaded ? (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-3 gap-3">
            <StatCard
              label={isEs ? "Esta semana" : "This Week"}
              value={weekSubmissions.length}
              icon="assignment_turned_in"
              accent="green"
            />
            <StatCard
              label={isEs ? "Obras activas" : "Active Jobs"}
              value={jobs.length}
              icon="work_outline"
              accent="brand"
            />
            <StatCard
              label={isEs ? "Pendientes" : "Outstanding"}
              value={outstandingJobs.length}
              icon="warning_amber"
              accent={outstandingJobs.length > 0 ? "amber" : "green"}
            />
          </div>
        </div>
      ) : null}

      {/* ── Outstanding items banner ── */}
      {isAdminOrSuper && historyLoaded && outstandingJobs.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-start gap-2">
            <MaterialIcon
              icon="warning_amber"
              size="sm"
              className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
            />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              <span className="font-bold">
                {isEs
                  ? "Falta charla de seguridad semanal"
                  : "Missing weekly toolbox talk"}
              </span>{" "}
              {isEs ? "en" : "on"}{" "}
              {outstandingJobs.map((j) => j.job_number).join(", ")}
              {isEs ? ". Envíe una en" : ". Submit one under"}{" "}
              <button
                className="underline font-semibold"
                onClick={() => {
                  setActiveSection("forms");
                  setActiveFormType("toolbox-talk");
                }}
              >
                {isEs ? "Formularios" : "Forms"}
              </button>
              {"."}
            </p>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Downloads */}
        {activeSection === "downloads" && (
          <FadeInWhenVisible key="downloads">
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  {isEs ? "Documentos de seguridad" : "Safety Documents"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isEs
                    ? "Explore y descargue secciones del"
                    : "Browse and download sections from the"}{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    MISH — MH Construction Industrial Safety &amp; Health
                    Program
                  </span>
                  .{" "}
                  {isEs
                    ? "Alineado con OSHA 29 CFR 1926, expectativas AGC CSEA y requisitos aplicables de WISHA (WA), OAR (OR) e IDAPA (ID)."
                    : "Aligned with OSHA 29 CFR 1926, AGC CSEA expectations, and applicable WISHA (WA), OAR (OR), and IDAPA (ID) requirements."}
                </p>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                {isEs
                  ? "Biblioteca ampliada de formularios de seguridad"
                  : "Expanded safety form library"}
              </p>

              {/* Quick-download blank forms */}
              <div className="mb-8 grid sm:grid-cols-2 gap-3">
                {forms.filter(hasPdfPath).map((form) => (
                  <a
                    key={form.id}
                    href={form.pdfPath}
                    download
                    onClick={() => logDownload(form.id, form.title, "form")}
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-secondary rounded-xl px-4 py-3 transition-all group"
                  >
                    <div className="w-9 h-9 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                      <MaterialIcon
                        icon={form.icon}
                        size="sm"
                        className="text-brand-primary group-hover:text-white transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-primary transition-colors">
                        {form.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {form.subtitle ?? form.description}
                      </p>
                    </div>
                    <MaterialIcon
                      icon="download"
                      size="sm"
                      className="text-gray-400 group-hover:text-brand-primary transition-colors shrink-0"
                    />
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {isEs
                    ? "Manual de seguridad completo — todas las secciones"
                    : "Full Safety Manual — All Sections"}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Download complete manual */}
              <a
                href="/docs/safety/safety-manual-complete.pdf"
                download
                onClick={() =>
                  logDownload(
                    "complete-manual",
                    "MISH — Safety & Health Program (Complete Manual)",
                    "section",
                  )
                }
                className="flex items-center gap-4 bg-gradient-to-r from-brand-primary-dark to-brand-primary hover:from-brand-primary hover:to-brand-primary-light text-white rounded-xl px-5 py-4 mb-6 transition-all group shadow-md"
              >
                <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors shrink-0">
                  <MaterialIcon
                    icon="menu_book"
                    size="md"
                    className="text-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold">
                    {isEs
                      ? "Descargar manual MISH completo"
                      : "Download Complete MISH Manual"}
                  </p>
                  <p className="text-xs text-white/70">
                    {`Cover + tab dividers + all ${sectionCount} sections`}
                  </p>
                </div>
                <MaterialIcon
                  icon="download"
                  size="md"
                  className="text-white/60 group-hover:text-white transition-colors shrink-0"
                />
              </a>

              <SectionBrowser
                sections={sections}
                mode="hub"
                onSectionDownload={handleSectionDownload}
              />
            </div>
          </FadeInWhenVisible>
        )}

        {/* Forms */}
        {activeSection === "forms" && (
          <FadeInWhenVisible key="forms">
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  {isEs
                    ? "Completar un formulario de seguridad"
                    : "Fill a Safety Form"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isEs
                    ? "Complete y envíe formularios digitalmente. Los envíos se registran y se pueden imprimir para sus registros."
                    : "Complete and submit forms digitally. Submissions are tracked and can be printed for your records."}
                </p>
              </div>

              {canSubmitForms ? (
                <>
                  {/* Form type tabs */}
                  <div className="flex gap-2 flex-wrap mb-6">
                    {FORM_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveFormType(tab.id);
                          setSubmissionId(null);
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                          activeFormType === tab.id
                            ? "bg-brand-primary text-white border-brand-primary shadow-md"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-primary hover:text-brand-primary"
                        }`}
                      >
                        <MaterialIcon icon={tab.icon} size="sm" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {!selectedJobId && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
                      <MaterialIcon icon="work_outline" size="sm" />
                      {isEs
                        ? "Seleccione una obra activa en la barra superior antes de enviar un formulario."
                        : "Select an active job in the bar above before submitting a form."}
                    </div>
                  )}

                  {/* Form card */}
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 px-6 py-4">
                      <div className="w-9 h-9 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center">
                        <MaterialIcon
                          icon={activeFormTab.icon}
                          size="sm"
                          className="text-brand-primary"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                          {activeFormTab.label}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activeFormTab.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-6">
                      {submissionId ? (
                        <SubmissionSuccess
                          submissionId={submissionId}
                          formLabel={activeFormTab.label}
                          onReset={() => setSubmissionId(null)}
                        />
                      ) : (
                        <>
                          {activeFormType === "toolbox-talk" && (
                            <ToolboxTalkForm
                              superintendentName={user.name}
                              jobId={selectedJobId}
                              jobLabel={jobLabel}
                              token={token}
                              onSubmitSuccess={handleSubmitSuccess}
                            />
                          )}
                          {activeFormType === "jha" && (
                            <JHAForm
                              superintendentName={user.name}
                              jobId={selectedJobId}
                              jobLabel={jobLabel}
                              token={token}
                              onSubmitSuccess={handleSubmitSuccess}
                            />
                          )}
                          {activeFormType === "site-safety-inspection" && (
                            <SiteInspectionForm
                              superintendentName={user.name}
                              jobId={selectedJobId}
                              jobLabel={jobLabel}
                              token={token}
                              onSubmitSuccess={handleSubmitSuccess}
                            />
                          )}
                          {activeFormType === "incident-report" && (
                            <IncidentReportForm
                              superintendentName={user.name}
                              jobId={selectedJobId}
                              jobLabel={jobLabel}
                              token={token}
                              onSubmitSuccess={handleSubmitSuccess}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm px-6 py-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                      <MaterialIcon
                        icon="visibility"
                        size="sm"
                        className="text-amber-700 dark:text-amber-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                        {isEs
                          ? "Travelers Insurance - Vista de auditor"
                          : "Travelers Insurance - Auditor View"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isEs
                          ? "Los formularios son enviados por el personal de campo. Contacte a Jeremy al (509) 308-6489 para registros de envíos."
                          : "Forms are submitted by field staff. Contact Jeremy at (509) 308-6489 for submission records."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FadeInWhenVisible>
        )}

        {/* My History */}
        {isAdminOrSuper && activeSection === "history" && (
          <FadeInWhenVisible key="history">
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                    {isEs ? "Mis envíos" : "My Submissions"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isEs
                      ? "Su historial de envíos en todas las obras."
                      : "Your submission history across all jobs."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={historyFormType}
                    onChange={(e) => setHistoryFormType(e.target.value)}
                    className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  >
                    <option value="">
                      {isEs ? "Todos los tipos" : "All Types"}
                    </option>
                    {Object.entries(FORM_TYPE_LABELS).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => void fetchMyHistory()}
                    className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-brand-primary transition-colors"
                    aria-label={
                      isEs ? "Actualizar historial" : "Refresh history"
                    }
                  >
                    <MaterialIcon icon="refresh" size="sm" />
                  </button>
                </div>
              </div>

              {historyLoading ? (
                <div className="py-16 text-center text-gray-400">
                  <MaterialIcon
                    icon="hourglass_empty"
                    size="xl"
                    className="animate-pulse mb-2"
                  />
                  <p className="text-sm">
                    {isEs ? "Cargando su historial…" : "Loading your history…"}
                  </p>
                </div>
              ) : myHistory.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <MaterialIcon
                    icon="assignment_late"
                    size="xl"
                    className="mb-2"
                  />
                  <p className="text-sm font-semibold mb-1">
                    {isEs ? "Aún no hay envíos" : "No submissions yet"}
                  </p>
                  <p className="text-xs">
                    {isEs
                      ? "Envíe un formulario desde la pestaña"
                      : "Submit a form from the"}{" "}
                    <button
                      className="underline text-brand-primary"
                      onClick={() => setActiveSection("forms")}
                    >
                      {isEs ? "Formularios" : "Forms"}
                    </button>{" "}
                    {isEs
                      ? "para ver su historial aquí."
                      : "tab to see your history here."}
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
                          {[
                            isEs ? "Fecha" : "Date",
                            isEs ? "Obra" : "Job",
                            isEs ? "Tipo de formulario" : "Form Type",
                            isEs ? "Estado" : "Status",
                            isEs ? "Acciones" : "Actions",
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {myHistory.map((sub) => {
                          const date = new Date(
                            sub.submitted_at || sub.created_at,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                          return (
                            <tr
                              key={sub.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                {date}
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-mono text-xs text-brand-secondary-text dark:text-brand-secondary font-bold">
                                  {sub.job_number}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 hidden sm:inline">
                                  {sub.job_name}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                {FORM_TYPE_LABELS[sub.form_type] ??
                                  sub.form_type}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[sub.status] ?? ""}`}
                                >
                                  {sub.status.charAt(0).toUpperCase() +
                                    sub.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <a
                                  href={`/safety/print/${sub.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                                >
                                  <MaterialIcon icon="print" size="sm" />
                                  <span className="hidden sm:inline">
                                    {isEs ? "Imprimir" : "Print"}
                                  </span>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
                    {myHistory.length} {isEs ? "envío" : "submission"}
                    {submissionsPluralSuffix} — {weekSubmissions.length}{" "}
                    {isEs ? "esta semana" : "this week"}
                  </div>
                </div>
              )}
            </div>
          </FadeInWhenVisible>
        )}
      </main>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

interface SafetyHubClientProps {
  sections: DocumentSection[];
}

export function SafetyHubClient({ sections }: Readonly<SafetyHubClientProps>) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<HubUser | null>(null);

  useEffect(() => {
    const bootstrapSession = async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          accessToken?: string;
          user?: { name?: string; role?: string };
        };

        if (!data.accessToken || !data.user?.role) {
          return;
        }

        const role = data.user.role;
        if (
          role !== "admin" &&
          role !== "superintendent" &&
          role !== "worker" &&
          role !== "traveler"
        ) {
          return;
        }

        setToken(data.accessToken);
        setUser({
          name: getDefaultUserName(role, data.user.name),
          role,
        });
      } catch {
        // no-op: unauthenticated users should see the gate
      }
    };

    void bootstrapSession();
  }, []);

  const handleLogin = (accessToken: string, userData: HubUser) => {
    setToken(accessToken);
    setUser(userData);
  };

  const handleLogout = () => {
    void fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("field_auth_token");
    localStorage.removeItem("field_user");
    setToken(null);
    setUser(null);
  };

  if (!token || !user) {
    return <RoleGate onLogin={handleLogin} />;
  }

  return (
    <SafetyHub
      sections={sections}
      token={token}
      user={user}
      onLogout={handleLogout}
    />
  );
}
