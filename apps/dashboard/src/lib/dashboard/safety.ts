/**
 * Pure helpers, types, and constants for the Safety dashboard tab.
 * Extracted so they can be unit-tested without React.
 */

export type JobStatus = "active" | "closed" | "archived";
export type SubmissionStatus = "submitted" | "reviewed" | "archived";

export interface Job {
  readonly id: string;
  readonly job_number: string;
  readonly job_name: string;
  readonly location: string | null;
  readonly pm_name: string | null;
  readonly super_name: string | null;
  readonly status: JobStatus;
  readonly created_at: string;
}

export interface Submission {
  readonly id: string;
  readonly job_id: string;
  readonly job_number: string;
  readonly job_name: string;
  readonly form_type: string;
  readonly submitted_by: string;
  readonly status: SubmissionStatus;
  readonly print_count: number;
  readonly created_at: string;
}

export interface DownloadLogEntry {
  readonly id: string;
  readonly section_key: string;
  readonly section_title: string;
  readonly download_type: string;
  readonly downloaded_by: string;
  readonly job_id: string | null;
  readonly downloaded_at: string;
}

export interface JobsResponse {
  readonly data: ReadonlyArray<Job>;
}
export interface SubmissionsResponse {
  readonly data: ReadonlyArray<Submission>;
}
export interface DownloadLogResponse {
  readonly data: ReadonlyArray<DownloadLogEntry>;
}

export const FORM_TYPE_LABELS: Readonly<Record<string, string>> = {
  "toolbox-talk": "Toolbox Talk",
  jha: "JHA",
  "site-safety-inspection": "Site Inspection",
  "incident-report": "Incident Report",
};

export const STATUS_COLORS: Readonly<Record<SubmissionStatus, string>> = {
  submitted: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  reviewed: "bg-green-900/50 text-green-300 border-green-600",
  archived:
    "bg-brand-primary-darker/60 text-brand-secondary-light/80 border-brand-primary/45",
};

export const JOB_STATUS_COLORS: Readonly<Record<JobStatus, string>> = {
  active: "bg-green-900/50 text-green-300 border-green-600",
  closed:
    "bg-brand-primary-darker/60 text-brand-secondary-light/80 border-brand-primary/45",
  archived: "bg-red-900/50 text-red-400 border-red-700",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "2-digit",
});

export function formatSafetyDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

export function formatFormType(formType: string): string {
  return FORM_TYPE_LABELS[formType] ?? formType;
}

export interface SubmissionFilters {
  readonly job_id?: string;
  readonly form_type?: string;
  readonly status?: string;
}

export function buildSubmissionsQuery(filters: SubmissionFilters = {}): string {
  const params = new URLSearchParams();
  if (filters.job_id) params.set("job_id", filters.job_id);
  if (filters.form_type) params.set("form_type", filters.form_type);
  if (filters.status) params.set("status", filters.status);
  const qs = params.toString();
  return qs ? `/api/safety/forms?${qs}` : "/api/safety/forms";
}

export interface PipelineCounts {
  readonly submitted: number;
  readonly reviewed: number;
  readonly archived: number;
}

export function computePipelineCounts(
  submissions: ReadonlyArray<Submission>,
): PipelineCounts {
  let submitted = 0;
  let reviewed = 0;
  let archived = 0;
  for (const s of submissions) {
    if (s.status === "submitted") submitted += 1;
    else if (s.status === "reviewed") reviewed += 1;
    else if (s.status === "archived") archived += 1;
  }
  return { submitted, reviewed, archived };
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function recentToolboxJobIds(
  submissions: ReadonlyArray<Submission>,
  now: Date = new Date(),
): ReadonlySet<string> {
  const cutoff = now.getTime() - SEVEN_DAYS_MS;
  const ids = new Set<string>();
  for (const s of submissions) {
    if (
      s.form_type === "toolbox-talk" &&
      new Date(s.created_at).getTime() >= cutoff
    ) {
      ids.add(s.job_id);
    }
  }
  return ids;
}

export function outstandingJobs(
  jobs: ReadonlyArray<Job>,
  submissions: ReadonlyArray<Submission>,
  now: Date = new Date(),
): ReadonlyArray<Job> {
  const recent = recentToolboxJobIds(submissions, now);
  return jobs.filter((j) => j.status === "active" && !recent.has(j.id));
}

export interface ChartDatum {
  readonly name: string;
  readonly count: number;
}

export function submissionsByFormType(
  submissions: ReadonlyArray<Submission>,
): ReadonlyArray<ChartDatum> {
  return Object.entries(FORM_TYPE_LABELS).map(([id, name]) => ({
    name,
    count: submissions.filter((s) => s.form_type === id).length,
  }));
}

export const SAFETY_SUBMISSIONS_CSV_HEADERS = [
  "Date",
  "Job #",
  "Job Name",
  "Form Type",
  "Submitted By",
  "Print Count",
  "Status",
] as const;

export function safetySubmissionsCsvRows(
  submissions: ReadonlyArray<Submission>,
): ReadonlyArray<ReadonlyArray<string | number>> {
  return submissions.map((s) => [
    s.created_at,
    s.job_number,
    s.job_name,
    formatFormType(s.form_type),
    s.submitted_by,
    s.print_count,
    s.status,
  ]);
}

export const SAFETY_DOWNLOADS_CSV_HEADERS = [
  "Date",
  "Section Key",
  "Section Title",
  "Download Type",
  "Downloaded By",
  "Job ID",
] as const;

export function safetyDownloadsCsvRows(
  entries: ReadonlyArray<DownloadLogEntry>,
): ReadonlyArray<ReadonlyArray<string | number>> {
  return entries.map((e) => [
    e.downloaded_at,
    e.section_key,
    e.section_title,
    e.download_type,
    e.downloaded_by,
    e.job_id ?? "",
  ]);
}

// ─── SSSP types and helpers ───────────────────────────────────────────────────

export type SsspStatus = "draft" | "generating" | "ready" | "approved";

export interface SsspRecord {
  readonly id: string;
  readonly job_id: string;
  readonly status: SsspStatus;
  readonly content: string | null;
  readonly r2_key: string | null;
  readonly generated_at: string | null;
  readonly approved_by: string | null;
  readonly approved_at: string | null;
  readonly notes: string | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface SsspSourceFile {
  readonly id: string;
  readonly job_id: string;
  readonly sssp_id: string | null;
  readonly original_filename: string;
  readonly file_key: string;
  readonly content_type: string;
  readonly file_size: number;
  readonly uploaded_by: string;
  readonly uploaded_at: string;
}

export const SSSP_STATUS_LABELS: Readonly<Record<SsspStatus, string>> = {
  draft: "Draft",
  generating: "Generating…",
  ready: "Ready for Review",
  approved: "Approved",
};

export const SSSP_STATUS_COLORS: Readonly<Record<SsspStatus, string>> = {
  draft:
    "bg-brand-primary-darker/60 text-brand-secondary-light/80 border-brand-primary/45",
  generating:
    "bg-brand-primary-dark/65 text-brand-secondary-light border-brand-secondary/45",
  ready: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  approved: "bg-green-900/50 text-green-300 border-green-600",
};

export function formatSsspStatus(status: SsspStatus): string {
  return SSSP_STATUS_LABELS[status] ?? status;
}

export const SSSP_CSV_HEADERS = [
  "Job ID",
  "Status",
  "Generated At",
  "Approved By",
  "Approved At",
  "Notes",
] as const;

export function ssspCsvRows(
  records: ReadonlyArray<SsspRecord>,
): ReadonlyArray<ReadonlyArray<string>> {
  return records.map((r) => [
    r.job_id,
    formatSsspStatus(r.status),
    r.generated_at ?? "",
    r.approved_by ?? "",
    r.approved_at ?? "",
    r.notes ?? "",
  ]);
}
