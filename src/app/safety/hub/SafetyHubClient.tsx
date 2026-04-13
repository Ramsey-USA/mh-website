"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionBrowser } from "@/components/safety/SectionBrowser";
import { ToolboxTalkForm } from "@/components/safety/forms/ToolboxTalkForm";
import { JHAForm } from "@/components/safety/forms/JHAForm";
import { SiteInspectionForm } from "@/components/safety/forms/SiteInspectionForm";
import { IncidentReportForm } from "@/components/safety/forms/IncidentReportForm";
import type { DocumentSection } from "@/lib/data/documents";
import { DiagonalStripePattern } from "@/components/ui/backgrounds/DiagonalStripePattern";
import { BrandColorBlobs } from "@/components/ui/backgrounds/BrandColorBlobs";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

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

// ─── Passcode Gate ────────────────────────────────────────────────────────────

interface LoginFormProps {
  onLogin: (token: string, user: { name: string; role: string }) => void;
}

function PasscodeGate({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!passcode) {
      setError("Please enter the site passcode.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/field-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), passcode }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error((json as { error?: string }).error ?? "Login failed.");
      }
      const { accessToken, user } = json as {
        accessToken: string;
        user: { name: string; role: string };
      };
      localStorage.setItem("field_auth_token", accessToken);
      localStorage.setItem("field_user", JSON.stringify(user));
      onLogin(accessToken, user);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Check your passcode and try again.",
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
        <div className="relative z-10 w-full max-w-sm">
          {/* MH Logo */}
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
              {/* Dual Naming Format - Required per branding standards */}
              <span className="block text-xs text-brand-secondary font-medium uppercase tracking-wider mb-1">
                Field Ops → Safety Hub
              </span>
              <h1 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                Field Safety Hub
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                MH Construction — Field Operations Access
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="hub-name"
                  className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1"
                >
                  Your Name
                </label>
                <input
                  id="hub-name"
                  type="text"
                  autoComplete="name"
                  placeholder="First &amp; Last Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
                />
              </div>

              <div>
                <label
                  htmlFor="hub-passcode"
                  className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1"
                >
                  Site Passcode
                </label>
                <div className="relative">
                  <input
                    id="hub-passcode"
                    type={showPasscode ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label={
                      showPasscode ? "Hide passcode" : "Show passcode"
                    }
                  >
                    <MaterialIcon
                      icon={showPasscode ? "visibility_off" : "visibility"}
                      size="sm"
                    />
                  </button>
                </div>
              </div>

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
                    Signing In…
                  </>
                ) : (
                  <>
                    <MaterialIcon icon="lock_open" size="sm" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
              Contact Jeremy at{" "}
              <a
                href="tel:+15093086489"
                className="text-brand-primary hover:underline font-semibold"
              >
                (509) 308-6489
              </a>{" "}
              for access.
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
}: {
  submissionId: string;
  formLabel: string;
  onReset: () => void;
}) {
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
          {formLabel} Submitted
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Your form has been saved and the safety officer has been notified.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`/safety/print/${submissionId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <MaterialIcon icon="print" size="sm" />
            Print / Export PDF
          </a>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <MaterialIcon icon="add_circle_outline" size="sm" />
            Submit Another
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
}: {
  label: string;
  value: number | string;
  icon: string;
  accent?: "amber" | "green" | "brand";
}) {
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

interface HubProps {
  sections: DocumentSection[];
  token: string;
  user: { name: string; role: string };
  onLogout: () => void;
}

function SafetyHub({ sections, token, user, onLogout }: HubProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [jobsLoading, setJobsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<HubSection>("downloads");
  const [activeFormType, setActiveFormType] =
    useState<FormType>("toolbox-talk");
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // My History state
  const [myHistory, setMyHistory] = useState<MySubmission[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  // True once the first history fetch completes — gates stat cards & outstanding banner
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyFormType, setHistoryFormType] = useState<string>("");

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
  }, [token, user.name, historyFormType]);

  // Fetch both jobs and history on mount so stat cards are immediately accurate
  useEffect(() => {
    void fetchJobs();
    void fetchMyHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch history when the user navigates to the History tab or changes filter
  useEffect(() => {
    if (activeSection === "history") {
      void fetchMyHistory();
    }
  }, [activeSection, fetchMyHistory]);

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
          job_id: selectedJobId || undefined,
        }),
      });
    },
    [token, selectedJobId],
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
  const activeFormTab = FORM_TABS.find((t) => t.id === activeFormType)!;

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
                { id: "downloads", label: "Downloads", icon: "download" },
                { id: "forms", label: "Forms", icon: "edit_note" },
                { id: "history", label: "My History", icon: "history" },
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
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Job selector strip */}
        <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-3">
            <MaterialIcon
              icon="work_outline"
              size="sm"
              className="text-gray-400 shrink-0"
            />
            {jobsLoading ? (
              <span className="text-xs text-gray-400 animate-pulse">
                Loading jobs…
              </span>
            ) : jobs.length === 0 ? (
              <span className="text-xs text-gray-400 italic">
                No active jobs. Contact your PM to add a job.
              </span>
            ) : (
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="flex-1 max-w-sm bg-transparent border-0 text-sm font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0 cursor-pointer"
                aria-label="Select active job"
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
      </header>

      {/* ── Summary stat cards ── */}
      {historyLoaded ? (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-3 gap-3">
            <StatCard
              label="This Week"
              value={weekSubmissions.length}
              icon="assignment_turned_in"
              accent="green"
            />
            <StatCard
              label="Active Jobs"
              value={jobs.length}
              icon="work_outline"
              accent="brand"
            />
            <StatCard
              label="Outstanding"
              value={outstandingJobs.length}
              icon="warning_amber"
              accent={outstandingJobs.length > 0 ? "amber" : "green"}
            />
          </div>
        </div>
      ) : null}

      {/* ── Outstanding items banner ── */}
      {historyLoaded && outstandingJobs.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-start gap-2">
            <MaterialIcon
              icon="warning_amber"
              size="sm"
              className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
            />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              <span className="font-bold">Missing weekly toolbox talk</span> on{" "}
              {outstandingJobs.map((j) => j.job_number).join(", ")}. Submit one
              under{" "}
              <button
                className="underline font-semibold"
                onClick={() => {
                  setActiveSection("forms");
                  setActiveFormType("toolbox-talk");
                }}
              >
                Forms
              </button>
              .
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
                  Safety Documents
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Browse and download sections from the{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    MISH — MH Construction Industrial Safety &amp; Health
                    Program
                  </span>
                  . Built on the AGC Accident Prevention Program (APP) framework
                  — OSHA 29 CFR 1926, WISHA (WA), OAR (OR), and IDAPA (ID)
                  compliant.
                </p>
              </div>

              {/* Quick-download blank forms */}
              <div className="mb-8 grid sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/docs/safety/forms/toolbox-talk.pdf",
                    icon: "record_voice_over",
                    label: "Toolbox Talk (Blank)",
                    desc: "Printable blank form",
                    key: "toolbox-talk",
                  },
                  {
                    href: "/docs/safety/forms/jha.pdf",
                    icon: "fact_check",
                    label: "JHA — Job Hazard Analysis",
                    desc: "MISH Section 05 pre-task form",
                    key: "jha",
                  },
                  {
                    href: "/docs/safety/forms/incident-report.pdf",
                    icon: "report",
                    label: "Incident Report (Blank)",
                    desc: "MISH Section 08 — near miss / incident",
                    key: "incident-report",
                  },
                  {
                    href: "/docs/safety/forms/equipment-checklist.pdf",
                    icon: "checklist",
                    label: "Equipment Inspection",
                    desc: "MISH Sections 19 / 20 / 42 — pre-use",
                    key: "equipment-checklist",
                  },
                  {
                    href: "/docs/safety/forms/signin-log.pdf",
                    icon: "assignment_ind",
                    label: "Sign-In / Visitor Log",
                    desc: "MISH Sections 04 & 07 — site access",
                    key: "signin-log",
                  },
                  {
                    href: "/docs/safety/forms/sub-prequal.pdf",
                    icon: "verified",
                    label: "Subcontractor Pre-Qual",
                    desc: "MISH Section 39 — vetting form",
                    key: "sub-prequal",
                  },
                ].map((f) => (
                  <a
                    key={f.href}
                    href={f.href}
                    download
                    onClick={() => logDownload(f.key, f.label, "form")}
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-secondary rounded-xl px-4 py-3 transition-all group"
                  >
                    <div className="w-9 h-9 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                      <MaterialIcon
                        icon={f.icon}
                        size="sm"
                        className="text-brand-primary group-hover:text-white transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-primary transition-colors">
                        {f.label}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {f.desc}
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
                  Full Safety Manual — All Sections
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
                    Download Complete MISH Manual
                  </p>
                  <p className="text-xs text-white/70">
                    Cover + tab dividers + all 44 sections · Rev 2 — 04/07/2026
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
                  Fill a Safety Form
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Complete and submit forms digitally. Submissions are tracked
                  and can be printed for your records.
                </p>
              </div>

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
                  Select an active job in the bar above before submitting a
                  form.
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
                          onSubmitSuccess={setSubmissionId}
                        />
                      )}
                      {activeFormType === "jha" && (
                        <JHAForm
                          superintendentName={user.name}
                          jobId={selectedJobId}
                          jobLabel={jobLabel}
                          token={token}
                          onSubmitSuccess={setSubmissionId}
                        />
                      )}
                      {activeFormType === "site-safety-inspection" && (
                        <SiteInspectionForm
                          superintendentName={user.name}
                          jobId={selectedJobId}
                          jobLabel={jobLabel}
                          token={token}
                          onSubmitSuccess={setSubmissionId}
                        />
                      )}
                      {activeFormType === "incident-report" && (
                        <IncidentReportForm
                          superintendentName={user.name}
                          jobId={selectedJobId}
                          jobLabel={jobLabel}
                          token={token}
                          onSubmitSuccess={setSubmissionId}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        )}

        {/* My History */}
        {activeSection === "history" && (
          <FadeInWhenVisible key="history">
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                    My Submissions
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your submission history across all jobs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={historyFormType}
                    onChange={(e) => setHistoryFormType(e.target.value)}
                    className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  >
                    <option value="">All Types</option>
                    {Object.entries(FORM_TYPE_LABELS).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => void fetchMyHistory()}
                    className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-brand-primary transition-colors"
                    aria-label="Refresh history"
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
                  <p className="text-sm">Loading your history…</p>
                </div>
              ) : myHistory.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <MaterialIcon
                    icon="assignment_late"
                    size="xl"
                    className="mb-2"
                  />
                  <p className="text-sm font-semibold mb-1">
                    No submissions yet
                  </p>
                  <p className="text-xs">
                    Submit a form from the{" "}
                    <button
                      className="underline text-brand-primary"
                      onClick={() => setActiveSection("forms")}
                    >
                      Forms
                    </button>{" "}
                    tab to see your history here.
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
                          {[
                            "Date",
                            "Job",
                            "Form Type",
                            "Status",
                            "Actions",
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
                                    Print
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
                    {myHistory.length} submission
                    {myHistory.length !== 1 ? "s" : ""} —{" "}
                    {weekSubmissions.length} this week
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

export function SafetyHubClient({ sections }: SafetyHubClientProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("field_auth_token");
    const storedUser = localStorage.getItem("field_user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as { name: string; role: string });
      } catch {
        localStorage.removeItem("field_auth_token");
        localStorage.removeItem("field_user");
      }
    }
  }, []);

  const handleLogin = (
    accessToken: string,
    userData: { name: string; role: string },
  ) => {
    setToken(accessToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("field_auth_token");
    localStorage.removeItem("field_user");
    setToken(null);
    setUser(null);
  };

  if (!token || !user) {
    return <PasscodeGate onLogin={handleLogin} />;
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
