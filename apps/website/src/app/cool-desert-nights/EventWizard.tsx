"use client";

/**
 * EventWizard — Cool Desert Nights 2026 Booth Entry
 *
 * Three-step gated form:
 *   Step 1 → Community Review Sign-In (lead capture)
 *   Step 2 → Hilti Fastener Jar Challenge (numeric guess)
 *   Step 3 → People's Choice BBQ Tasting Poll (radio card vote)
 *
 * Performance targets:
 *   - Zero external UI library dependencies
 *   - Vanilla JS state via React useState / useEffect
 *   - Tailwind utility classes only
 *   - localStorage backup before network POST (fail-safe)
 *
 * Admin panel:
 *   Activate by visiting the page with ?dev_admin=export_results in the URL.
 *   The panel provides:
 *     - One-click CSV download from the API (requires ADMIN_EXPORT_TOKEN)
 *     - One-click local-cache CSV export (aggregates all localStorage entries)
 */

import { useState, useEffect, useCallback } from "react";
import {
  CDN_TEAM_OPTIONS,
  type CdnTeamId,
} from "@/lib/events/cool-desert-nights";

// ── Constants ──────────────────────────────────────────────────────────────

const LS_ENTRY_PREFIX = "cdn26_entry_";
const LS_CACHE_FLAG = "cdn26_cached";
const API_ENDPOINT = "/api/event/booth-entry";
const ADMIN_EXPORT_ENDPOINT = "/api/event/admin-export";
const WINNERS_TEXT_ENDPOINT = "/api/event/winners-text";
const SUBMIT_TIMEOUT_MS = 8_000;

const TEAM_EMOJIS: Record<CdnTeamId, string> = {
  alpha: "🅰️",
  bravo: "🅱️",
  charlie: "🌵",
  delta: "🏜️",
  echo: "🌊",
  foxtrot: "🛠️",
  golf: "🏁",
};

const BBQ_CONTESTANTS = CDN_TEAM_OPTIONS.map((team) => ({
  ...team,
  emoji: TEAM_EMOJIS[team.id],
}));

// ── Validation helpers ──────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validatePhone(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (digits.length === 0) return "Phone number is required.";
  if (digits.length !== 10) {
    return "Enter exactly 10 digits (no spaces or dashes).";
  }
  return "";
}

function validateEmail(v: string): string {
  if (!v.trim()) return "Email address is required.";
  if (!EMAIL_RE.test(v.trim())) return "Enter a valid email address.";
  return "";
}

function validateName(v: string): string {
  if (!v.trim()) return "Full name is required.";
  if (v.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
}

// ── Types ──────────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  hiltiguess: string;
  bbqVote: CdnTeamId | "";
  hiltiContactOptIn: boolean;
  mhcProjectInquiryOptIn: boolean;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Review Sign-In" },
    { n: 2, label: "Hilti Guess" },
    { n: 3, label: "BBQ Vote" },
  ] as const;

  return (
    <div className="mb-8 flex items-center justify-center gap-0">
      {steps.map(({ n, label }, i) => (
        <div key={n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                n < current
                  ? "bg-brand-primary text-white"
                  : n === current
                    ? "bg-brand-secondary text-white ring-4 ring-brand-secondary/30"
                    : "bg-gray-200 text-gray-500 dark:bg-white/15 dark:text-white/40",
              ].join(" ")}
              aria-current={n === current ? "step" : undefined}
            >
              {n < current ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                n
              )}
            </div>
            <span
              className={[
                "mt-1 hidden text-xs font-medium sm:block",
                n === current
                  ? "text-brand-secondary"
                  : "text-gray-400 dark:text-white/35",
              ].join(" ")}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={[
                "mx-2 mt-[-1.25rem] h-0.5 w-12 sm:w-16 transition-colors",
                n < current
                  ? "bg-brand-primary"
                  : "bg-gray-200 dark:bg-white/15",
              ].join(" ")}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  error?: string | undefined;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, id, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-900 dark:text-white"
      >
        {label}{" "}
        <span className="text-red-500" aria-hidden="true">
          *
        </span>
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-white/45">{hint}</p>
      )}
      {error && (
        <p
          className="text-xs font-medium text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full min-h-[3rem] rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base " +
  "text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-secondary focus:outline-none " +
  "dark:border-white/25 dark:bg-white/8 dark:text-white dark:placeholder-white/35 " +
  "dark:focus:border-brand-secondary";

const inputErrorClass =
  "w-full min-h-[3rem] rounded-xl border-2 border-red-400 bg-white px-4 py-3 text-base " +
  "text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none " +
  "dark:border-red-500/70 dark:bg-white/8 dark:text-white dark:placeholder-white/35";

// ── Admin Panel ─────────────────────────────────────────────────────────────

function AdminPanel() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actualHiltiCount, setActualHiltiCount] = useState("");

  async function handleWinnersText() {
    if (!token.trim()) {
      setStatus("Enter the admin export token first.");
      return;
    }

    const hasCountInput = actualHiltiCount.trim().length > 0;
    const count = Number.parseInt(actualHiltiCount, 10);
    if (
      hasCountInput &&
      (!Number.isInteger(count) || count < 1 || count > 9999)
    ) {
      setStatus(
        "Enter the actual Hilti count as a whole number (1-9999), or leave blank to use the server preset.",
      );
      return;
    }

    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch(WINNERS_TEXT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(hasCountInput ? { actualHiltiCount: count } : {}),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        setStatus(
          `Winner text error ${res.status}: ${(err as { error?: string; details?: string }).error ?? res.statusText}${(err as { details?: string }).details ? ` (${(err as { details?: string }).details})` : ""}`,
        );
        return;
      }

      const payload = (await res.json()) as {
        data?: {
          hiltiWinner?: { name?: string; phone?: string; difference?: number };
          bbqWinner?: { label?: string; tie?: boolean; tiedLabels?: string[] };
          textedTo?: string;
        };
      };

      const hiltiWinner = payload.data?.hiltiWinner;
      const bbqWinner = payload.data?.bbqWinner;
      const bbqSummary = bbqWinner?.tie
        ? `Tie: ${(bbqWinner.tiedLabels ?? []).join(" / ")}`
        : (bbqWinner?.label ?? "N/A");

      setStatus(
        `Text sent to ${payload.data?.textedTo ?? "Matt"}. Hilti: ${hiltiWinner?.name ?? "N/A"} (${hiltiWinner?.phone ?? "N/A"}, off by ${hiltiWinner?.difference ?? "?"}). BBQ: ${bbqSummary}.`,
      );
    } catch (e) {
      setStatus(`Network error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
    }
  }

  /** Download CSV from API */
  async function handleApiExport() {
    if (!token.trim()) {
      setStatus("Enter the admin export token first.");
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch(ADMIN_EXPORT_ENDPOINT, {
        headers: { Authorization: `Bearer ${token.trim()}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        setStatus(
          `API error ${res.status}: ${(err as { error?: string }).error ?? res.statusText}`,
        );
        return;
      }
      const csv = await res.text();
      triggerDownload(csv, buildFilename());
      setStatus(
        `Downloaded ${csv.split("\r\n").length - 1} deduplicated entries.`,
      );
    } catch (e) {
      setStatus(`Network error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
    }
  }

  /** Aggregate all localStorage entries and produce a CSV */
  function handleLocalExport() {
    const entries: Record<string, unknown>[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(LS_ENTRY_PREFIX)) {
        try {
          const parsed = JSON.parse(localStorage.getItem(key) ?? "null");
          if (parsed) entries.push(parsed as Record<string, unknown>);
        } catch {
          /* skip malformed */
        }
      }
    }

    if (entries.length === 0) {
      setStatus("No cached entries found in localStorage.");
      return;
    }

    // Deduplicate by phone (keep first occurrence)
    const seen = new Set<string>();
    const deduped = entries.filter((e) => {
      const phone = String((e as { phone?: unknown }).phone ?? "");
      if (seen.has(phone)) return false;
      seen.add(phone);
      return true;
    });

    const header =
      "full_name,phone,email,hilti_guess,bbq_vote,hilti_contact_opt_in,mhc_project_inquiry_opt_in,cached_at";
    const lines = deduped.map((e) =>
      [
        csvEscape(String((e as { fullName?: unknown }).fullName ?? "")),
        csvEscape(String((e as { phone?: unknown }).phone ?? "")),
        csvEscape(String((e as { email?: unknown }).email ?? "")),
        String((e as { hiltiguess?: unknown }).hiltiguess ?? ""),
        csvEscape(String((e as { bbqVote?: unknown }).bbqVote ?? "")),
        String(
          (e as { hiltiContactOptIn?: unknown }).hiltiContactOptIn ?? false,
        ),
        String(
          (e as { mhcProjectInquiryOptIn?: unknown }).mhcProjectInquiryOptIn ??
            false,
        ),
        csvEscape(String((e as { cachedAt?: unknown }).cachedAt ?? "")),
      ].join(","),
    );

    const csv = [header, ...lines].join("\r\n");
    triggerDownload(csv, buildFilename("local-cache"));
    setStatus(
      `Exported ${deduped.length} entries from localStorage (${entries.length - deduped.length} duplicates removed).`,
    );
  }

  function triggerDownload(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function buildFilename(suffix = "api") {
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16);
    return `cdn-2026-booth-${suffix}-${ts}.csv`;
  }

  function csvEscape(s: string) {
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }

  return (
    <section
      className="mt-8 rounded-2xl border-2 border-dashed border-amber-400/60 bg-amber-50/80 p-6 dark:bg-amber-900/15"
      aria-label="Admin export panel"
    >
      <p className="mb-1 text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
        ⚙ Admin — Data Export Module
      </p>
      <p className="mb-4 text-sm text-amber-800 dark:text-amber-300">
        Final People's Choice results are delivered after voting closes while
        fastener counting is performed live for crowd transparency.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="admin-token"
            className="mb-1 block text-xs font-semibold text-amber-800 dark:text-amber-300"
          >
            Admin Export Token
          </label>
          <input
            id="admin-token"
            type="password"
            autoComplete="off"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste token here…"
            className={
              "w-full min-h-12 rounded-xl border-2 border-amber-300 bg-white px-4 py-3 text-base " +
              "text-gray-900 focus:border-amber-500 focus:outline-none dark:bg-white/8 dark:text-white"
            }
          />
        </div>
        <button
          type="button"
          onClick={handleApiExport}
          disabled={isLoading}
          className={
            "min-h-12 rounded-xl bg-amber-600 px-6 py-3 text-sm font-bold text-white " +
            "transition hover:bg-amber-700 active:scale-95 disabled:opacity-50 touch-manipulation"
          }
        >
          {isLoading ? "Fetching…" : "⬇ Export from API (D1)"}
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-amber-300 bg-white/75 p-4 dark:border-amber-500/40 dark:bg-white/6">
        <p className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-300">
          Winner Finalization + SMS
        </p>
        <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">
          At 1:45 PM PT on June 27, 2026, enter the confirmed Hilti fastener
          count and send both winners to Matt by text.
        </p>
        <p className="mt-1 text-[11px] text-amber-700/90 dark:text-amber-300/90">
          Optional: leave actual count blank to use server preset env var
          CDN26_HILTI_ACTUAL_COUNT.
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:max-w-55 sm:flex-none">
            <label
              htmlFor="actual-hilti-count"
              className="mb-1 block text-xs font-semibold text-amber-800 dark:text-amber-300"
            >
              Actual Hilti Count
            </label>
            <input
              id="actual-hilti-count"
              type="number"
              min={1}
              max={9999}
              step={1}
              value={actualHiltiCount}
              onChange={(e) => setActualHiltiCount(e.target.value)}
              placeholder="e.g. 412"
              className={
                "w-full min-h-12 rounded-xl border-2 border-amber-300 bg-white px-4 py-3 text-base " +
                "text-gray-900 focus:border-amber-500 focus:outline-none dark:bg-white/8 dark:text-white"
              }
            />
          </div>
          <button
            type="button"
            onClick={handleWinnersText}
            disabled={isLoading}
            className={
              "min-h-12 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white " +
              "transition hover:bg-emerald-800 active:scale-95 disabled:opacity-50 touch-manipulation"
            }
          >
            {isLoading ? "Sending…" : "📱 Finalize Winners + Text Matt"}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLocalExport}
        className={
          "mt-3 min-h-12 w-full rounded-xl border-2 border-amber-400 bg-white px-6 py-3 " +
          "text-sm font-bold text-amber-700 transition hover:bg-amber-50 active:scale-95 " +
          "touch-manipulation dark:bg-white/8 dark:text-amber-300"
        }
      >
        ⬇ Export from Browser Cache (localStorage)
      </button>

      {status && (
        <p
          className="mt-3 rounded-lg bg-amber-100 px-4 py-2 text-sm text-amber-800 dark:bg-amber-800/30 dark:text-amber-200"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      )}
    </section>
  );
}

// ── Main Wizard ─────────────────────────────────────────────────────────────

export function EventWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const googleReviewUrl =
    "https://search.google.com/local/writereview?placeid=234677025037995169";

  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    hiltiguess: "",
    bbqVote: "",
    hiltiContactOptIn: false,
    mhcProjectInquiryOptIn: false,
  });

  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    fullName: false,
    phone: false,
    email: false,
    hiltiguess: false,
    bbqVote: false,
    hiltiContactOptIn: false,
    mhcProjectInquiryOptIn: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "offline"
  >("idle");

  // Detect admin mode from URL param (client-side only, no SSR needed)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev_admin") === "export_results") {
      setIsAdminMode(true);
    }
  }, []);

  useEffect(() => {
    if (!submitted || submitStatus !== "success") {
      return;
    }

    window.location.assign(googleReviewUrl);
  }, [googleReviewUrl, submitted, submitStatus]);

  // ── Derived validation ────────────────────────────────────────────────────

  const errors = {
    fullName: validateName(form.fullName),
    phone: validatePhone(form.phone),
    email: validateEmail(form.email),
    hiltiguess:
      !form.hiltiguess.trim() ||
      isNaN(Number(form.hiltiguess)) ||
      Number(form.hiltiguess) < 1
        ? "Enter a number between 1 and 9999."
        : "",
    bbqVote: form.bbqVote === "" ? "Please select a contestant." : "",
  };

  const step1Valid = !errors.fullName && !errors.phone && !errors.email;
  const step2Valid = !errors.hiltiguess;
  const step3Valid = !errors.bbqVote;

  // ── Field helpers ──────────────────────────────────────────────────────────

  function handleChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormData) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  // ── Phone formatter: strip non-digits, cap at 10 chars ────────────────────

  function handlePhoneChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    handleChange("phone", digits);
  }

  // ── Cache to localStorage ─────────────────────────────────────────────────

  const cacheLocally = useCallback(() => {
    try {
      const payload = {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        hiltiguess: Number(form.hiltiguess),
        bbqVote: form.bbqVote,
        hiltiContactOptIn: form.hiltiContactOptIn,
        mhcProjectInquiryOptIn: form.mhcProjectInquiryOptIn,
        cachedAt: new Date().toISOString(),
      };
      const key = `${LS_ENTRY_PREFIX}${form.phone}_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify(payload));
      localStorage.setItem(LS_CACHE_FLAG, "1");
      return payload;
    } catch {
      // localStorage may be unavailable in private browsing
      return null;
    }
  }, [form]);

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit() {
    if (isSubmitting || !step3Valid) return;
    setIsSubmitting(true);

    // Always cache locally first — before the network call
    const payload = cacheLocally();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          hiltiguess: Number(form.hiltiguess),
          bbqVote: form.bbqVote,
          hiltiContactOptIn: form.hiltiContactOptIn,
          mhcProjectInquiryOptIn: form.mhcProjectInquiryOptIn,
          cachedLocally: payload !== null,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        setSubmitStatus("success");
      } else {
        // Server-side error — data already in localStorage
        setSubmitStatus("offline");
      }
    } catch {
      // Network error / timeout — data already in localStorage
      setSubmitStatus("offline");
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  }

  // ── Phone display helper ───────────────────────────────────────────────────

  function formatPhoneDisplay(digits: string): string {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // ── Render: confirmation ──────────────────────────────────────────────────

  if (submitted) {
    const contestant = BBQ_CONTESTANTS.find((c) => c.id === form.bbqVote);
    return (
      <div className="flex flex-col items-center gap-6 px-4 py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary text-white shadow-xl">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Vote Submitted!
          </h2>
          <p className="mt-2 text-base text-gray-700 dark:text-white/80">
            Please, Support our Mission to Sponsor more Local Events with a
            Google Review!
          </p>
        </div>
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white/92 p-5 shadow-lg dark:border-white/20 dark:bg-white/8">
          <dl className="space-y-2 text-sm text-left">
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-gray-600 dark:text-white/60">
                Name
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white truncate">
                {form.fullName}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-gray-600 dark:text-white/60">
                Hilti Guess
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {form.hiltiguess} fasteners
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-gray-600 dark:text-white/60">
                BBQ Vote
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {contestant?.emoji} {contestant?.label}
              </dd>
            </div>
          </dl>
        </div>
        {submitStatus === "offline" && (
          <p className="text-xs text-gray-500 dark:text-white/40">
            (Saved locally — will sync when connectivity improves)
          </p>
        )}
        {isAdminMode && <AdminPanel />}
      </div>
    );
  }

  // ── Render: wizard steps ───────────────────────────────────────────────────

  return (
    <div className="w-full">
      <StepIndicator current={step} />

      {/* ── Step 1: Lead Capture ── */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          <div className="mb-1">
            <p className="text-xs font-black uppercase tracking-widest text-brand-secondary">
              Step 1 of 3
            </p>
            <h3 className="mt-1 text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
              Hilti Prize Entry
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white/65">
              Enter your contact info to qualify for the Hilti Prize and help
              power a true community campaign. We’d appreciate a Google review
              to grow our digital footprint and help us sponsor more local
              events.
            </p>
          </div>

          <Field
            label="Full Name"
            id="wizard-name"
            error={touched.fullName ? errors.fullName : undefined}
          >
            <input
              id="wizard-name"
              type="text"
              autoComplete="name"
              inputMode="text"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              placeholder="First Last"
              className={
                touched.fullName && errors.fullName
                  ? inputErrorClass
                  : inputClass
              }
              aria-required="true"
              aria-invalid={touched.fullName && Boolean(errors.fullName)}
              aria-describedby={
                touched.fullName && errors.fullName
                  ? "wizard-name-err"
                  : undefined
              }
            />
          </Field>

          <Field
            label="Phone Number"
            id="wizard-phone"
            hint="10 digits, no dashes (e.g. 5095551234)"
            error={touched.phone ? errors.phone : undefined}
          >
            <input
              id="wizard-phone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              value={formatPhoneDisplay(form.phone)}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="(509) 555-1234"
              className={
                touched.phone && errors.phone ? inputErrorClass : inputClass
              }
              aria-required="true"
              aria-invalid={touched.phone && Boolean(errors.phone)}
            />
          </Field>

          <Field
            label="Email Address"
            id="wizard-email"
            error={touched.email ? errors.email : undefined}
          >
            <input
              id="wizard-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="you@example.com"
              className={
                touched.email && errors.email ? inputErrorClass : inputClass
              }
              aria-required="true"
              aria-invalid={touched.email && Boolean(errors.email)}
            />
          </Field>

          <button
            type="button"
            disabled={!step1Valid}
            onClick={() => {
              setTouched({
                fullName: true,
                phone: true,
                email: true,
                hiltiguess: false,
                bbqVote: false,
                hiltiContactOptIn: false,
                mhcProjectInquiryOptIn: false,
              });
              if (step1Valid) setStep(2);
            }}
            className={[
              "mt-2 min-h-[3.25rem] w-full rounded-xl text-base font-bold transition-all touch-manipulation",
              step1Valid
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:bg-brand-primary-dark active:scale-[0.98]"
                : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/30",
            ].join(" ")}
            aria-disabled={!step1Valid}
          >
            Next — Hilti Guess →
          </button>
        </div>
      )}

      {/* ── Step 2: Hilti Guess ── */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div className="mb-1">
            <p className="text-xs font-black uppercase tracking-widest text-brand-secondary">
              Step 2 of 3
            </p>
            <h3 className="mt-1 text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
              Hilti Fastener Jar Challenge
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white/65">
              How many fasteners are in the jar? Closest guess wins the Hilti
              prize pack.
            </p>
          </div>

          <Field
            label="My Guess (whole number)"
            id="wizard-hilti"
            hint="Enter a whole number between 1 and 9999"
            error={touched.hiltiguess ? errors.hiltiguess : undefined}
          >
            <input
              id="wizard-hilti"
              type="number"
              inputMode="numeric"
              min={1}
              max={9999}
              step={1}
              value={form.hiltiguess}
              onChange={(e) => handleChange("hiltiguess", e.target.value)}
              onBlur={() => handleBlur("hiltiguess")}
              placeholder="e.g. 247"
              className={
                touched.hiltiguess && errors.hiltiguess
                  ? inputErrorClass
                  : inputClass
              }
              aria-required="true"
              aria-invalid={touched.hiltiguess && Boolean(errors.hiltiguess)}
            />
          </Field>

          <div className="rounded-xl border border-brand-secondary/35 bg-brand-secondary/8 p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Optional communication preferences
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-white/65">
              Your contact info is used internally only for event follow-up and
              prize coordination. If you leave a Google review, you help grow
              our digital footprint and make it easier to sponsor more community
              events. NO third parties.
            </p>
            <div className="mt-3 grid gap-3">
              <button
                type="button"
                onClick={() =>
                  handleChange("hiltiContactOptIn", !form.hiltiContactOptIn)
                }
                aria-pressed={form.hiltiContactOptIn}
                className={[
                  "min-h-13 w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition touch-manipulation",
                  form.hiltiContactOptIn
                    ? "border-brand-primary bg-brand-primary/12 text-brand-primary dark:text-brand-secondary"
                    : "border-gray-300 bg-white text-gray-700 hover:border-brand-primary/50 dark:border-white/25 dark:bg-white/8 dark:text-white",
                ].join(" ")}
              >
                {form.hiltiContactOptIn ? "✓ " : ""}Contact me directly about
                Hilti products
              </button>

              <button
                type="button"
                onClick={() =>
                  handleChange(
                    "mhcProjectInquiryOptIn",
                    !form.mhcProjectInquiryOptIn,
                  )
                }
                aria-pressed={form.mhcProjectInquiryOptIn}
                className={[
                  "min-h-13 w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition touch-manipulation",
                  form.mhcProjectInquiryOptIn
                    ? "border-brand-primary bg-brand-primary/12 text-brand-primary dark:text-brand-secondary"
                    : "border-gray-300 bg-white text-gray-700 hover:border-brand-primary/50 dark:border-white/25 dark:bg-white/8 dark:text-white",
                ].join(" ")}
              >
                {form.mhcProjectInquiryOptIn ? "✓ " : ""}Serious inquiries:
                contact me about future projects with MHC
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-h-[3.25rem] flex-none rounded-xl border-2 border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95 touch-manipulation dark:border-white/25 dark:bg-white/8 dark:text-white"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!step2Valid}
              onClick={() => {
                setTouched((prev) => ({ ...prev, hiltiguess: true }));
                if (step2Valid) setStep(3);
              }}
              className={[
                "min-h-[3.25rem] flex-1 rounded-xl text-base font-bold transition-all touch-manipulation",
                step2Valid
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:bg-brand-primary-dark active:scale-[0.98]"
                  : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/30",
              ].join(" ")}
              aria-disabled={!step2Valid}
            >
              Next — BBQ Vote →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: BBQ Tasting Vote ── */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div className="mb-1">
            <p className="text-xs font-black uppercase tracking-widest text-brand-secondary">
              Step 3 of 3
            </p>
            <h3 className="mt-1 text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
              People's Choice Tasting Poll
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white/65">
              Cast your vote for the best BBQ at Cool Desert Nights 2026.
            </p>
          </div>

          <fieldset>
            <legend className="sr-only">Select your BBQ vote</legend>
            <div
              className="flex flex-col gap-3"
              role="radiogroup"
              aria-required="true"
            >
              {BBQ_CONTESTANTS.map(({ id, label, emoji }) => {
                const selected = form.bbqVote === id;
                return (
                  <label
                    key={id}
                    htmlFor={`vote-${id}`}
                    className={[
                      "flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all touch-manipulation",
                      selected
                        ? "border-brand-secondary bg-brand-secondary/10 shadow-md dark:bg-brand-secondary/20"
                        : "border-gray-200 bg-white hover:border-brand-secondary/50 hover:bg-gray-50 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10",
                    ].join(" ")}
                  >
                    <input
                      id={`vote-${id}`}
                      type="radio"
                      name="bbqVote"
                      value={id}
                      checked={selected}
                      onChange={() => handleChange("bbqVote", id)}
                      className="sr-only"
                      aria-checked={selected}
                    />
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-current text-2xl"
                      aria-hidden="true"
                    >
                      {emoji}
                    </span>
                    <span
                      className={[
                        "flex-1 text-base font-semibold",
                        selected
                          ? "text-brand-secondary dark:text-brand-secondary"
                          : "text-gray-800 dark:text-white",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                    {selected && (
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-brand-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="min-h-[3.25rem] flex-none rounded-xl border-2 border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95 touch-manipulation dark:border-white/25 dark:bg-white/8 dark:text-white"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!step3Valid || isSubmitting}
              onClick={handleSubmit}
              className={[
                "min-h-[3.25rem] flex-1 rounded-xl text-base font-bold transition-all touch-manipulation",
                step3Valid && !isSubmitting
                  ? "bg-brand-secondary text-white shadow-lg shadow-brand-secondary/30 hover:opacity-90 active:scale-[0.98]"
                  : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/30",
              ].join(" ")}
              aria-disabled={!step3Valid || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting…
                </span>
              ) : (
                "🎉 Submit Entry"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Admin panel shown on all steps when admin mode is active */}
      {isAdminMode && !submitted && <AdminPanel />}
    </div>
  );
}

export default EventWizard;
