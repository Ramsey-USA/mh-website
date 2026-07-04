"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { DashboardFormField } from "@/components/ui/forms/DashboardFormField";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { useAdminTabData } from "@/hooks/useAdminTabData";
import { adminFetch } from "@/lib/admin-auth/api";
import {
  buildSubmissionsQuery,
  computePipelineCounts,
  FORM_TYPE_LABELS,
  formatFormType,
  formatSafetyDate,
  JOB_STATUS_COLORS,
  outstandingJobs,
  SAFETY_DOWNLOADS_CSV_HEADERS,
  SAFETY_SUBMISSIONS_CSV_HEADERS,
  SSSP_CSV_HEADERS,
  safetyDownloadsCsvRows,
  safetySubmissionsCsvRows,
  ssspCsvRows,
  STATUS_COLORS,
  submissionsByFormType,
  type DownloadLogResponse,
  type Job,
  type JobsResponse,
  type JobStatus,
  type SsspRecord,
  type SubmissionsResponse,
  type Submission,
} from "@/lib/dashboard/safety";
import { SsspPanel } from "./SsspPanel";

const SafetyBarChart = dynamic(
  () => import("./SafetyBarChart").then((m) => ({ default: m.SafetyBarChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded-lg border border-brand-primary/35 bg-brand-primary-darker/55 animate-pulse" />
    ),
  },
);

// ─── New Job Form ─────────────────────────────────────────────────────────────

interface NewJobFormProps {
  readonly token: string;
  readonly onCreated: () => void;
  readonly onCancel: () => void;
}

function NewJobForm({ token, onCreated, onCancel }: NewJobFormProps) {
  const [fields, setFields] = useState({
    job_number: "",
    job_name: "",
    location: "",
    pm_name: "",
    super_name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!fields.job_number.trim() || !fields.job_name.trim()) {
      setError("Job number and job name are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/safety/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create job");
      onCreated();
    } catch (_err) {
      setError(_err instanceof Error ? _err.message : "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-primary-darker/60 border border-brand-secondary/50 rounded-xl p-4 mb-4"
    >
      <h4 className="text-sm font-black text-brand-secondary uppercase tracking-wider mb-3">
        New Job
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
        <DashboardFormField
          label="Job #"
          isRequired
          type="text"
          required
          placeholder="e.g. 2025-001"
          value={fields.job_number}
          onChange={(e) =>
            setFields((f) => ({ ...f, job_number: e.target.value }))
          }
        />
        <div className="col-span-2 sm:col-span-1">
          <DashboardFormField
            label="Job Name"
            isRequired
            type="text"
            required
            placeholder="Project name"
            value={fields.job_name}
            onChange={(e) =>
              setFields((f) => ({ ...f, job_name: e.target.value }))
            }
          />
        </div>
        <DashboardFormField
          label="Location"
          type="text"
          placeholder="City, ST"
          value={fields.location}
          onChange={(e) =>
            setFields((f) => ({ ...f, location: e.target.value }))
          }
        />
        <DashboardFormField
          label="PM Name"
          type="text"
          placeholder="Project manager"
          value={fields.pm_name}
          onChange={(e) =>
            setFields((f) => ({ ...f, pm_name: e.target.value }))
          }
        />
        <DashboardFormField
          label="Super Name"
          type="text"
          placeholder="Superintendent"
          value={fields.super_name}
          onChange={(e) =>
            setFields((f) => ({ ...f, super_name: e.target.value }))
          }
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 mb-3 flex items-center gap-1">
          <MaterialIcon icon="error_outline" size="sm" />
          {error}
        </p>
      )}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold text-brand-secondary-light/80 hover:text-white border border-brand-primary/45 hover:border-brand-secondary rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm font-black text-white bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          {submitting ? (
            <>
              <MaterialIcon icon="hourglass_empty" size="sm" />
              Creating…
            </>
          ) : (
            <>
              <MaterialIcon icon="add_circle" size="sm" />
              Create Job
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Main Safety Tab ──────────────────────────────────────────────────────────

interface SafetyTabProps {
  readonly token: string;
}

const JOB_TABLE_HEADERS = [
  "Job #",
  "Name",
  "Location",
  "PM",
  "Super",
  "Status",
  "Actions",
] as const;

const SUBMISSION_TABLE_HEADERS = [
  "Date",
  "Job",
  "Form Type",
  "Submitted By",
  "Prints",
  "Status",
  "Actions",
] as const;

const DOWNLOAD_TABLE_HEADERS = [
  "Date",
  "Section",
  "Type",
  "Downloaded By",
  "Job",
] as const;

const PIPELINE_BADGES = [
  {
    key: "submitted",
    label: "Awaiting Review",
    color: "text-yellow-400 border-yellow-600 bg-yellow-900/30",
  },
  {
    key: "reviewed",
    label: "Reviewed",
    color: "text-green-400 border-green-600 bg-green-900/30",
  },
  {
    key: "archived",
    label: "Archived",
    color:
      "text-brand-secondary-light/80 border-brand-primary/45 bg-brand-primary-darker/55",
  },
] as const;

interface JobsTableContentProps {
  readonly jobsLoading: boolean;
  readonly jobs: ReadonlyArray<Job>;
  readonly token: string;
  readonly updatingId: string | null;
  readonly expandedSsspJobId: string | null;
  readonly onPatchStatus: (
    jobId: string,
    status: JobStatus,
  ) => void | Promise<void>;
  readonly onToggleSssp: (jobId: string) => void;
  readonly onSsspLoaded: (jobId: string, record: SsspRecord | null) => void;
}

function JobsTableContent({
  jobsLoading,
  jobs,
  token,
  updatingId,
  expandedSsspJobId,
  onPatchStatus,
  onToggleSssp,
  onSsspLoaded,
}: JobsTableContentProps) {
  if (jobsLoading && jobs.length === 0) {
    return (
      <div className="py-12 text-center text-brand-secondary-light/70">
        <MaterialIcon
          icon="hourglass_empty"
          size="xl"
          className="animate-pulse mx-auto mb-2"
        />
        <p className="text-sm">Loading jobs…</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-12 text-center text-brand-secondary-light/70">
        <MaterialIcon icon="work_off" size="xl" className="mx-auto mb-2" />
        <p className="text-sm">No jobs yet. Create the first job above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-245 text-sm">
        <thead>
          <tr className="border-b border-brand-primary/35 bg-brand-primary-darker/65">
            {JOB_TABLE_HEADERS.map((h) => (
              <th
                key={h}
                scope="col"
                className="text-left px-4 py-3 text-xs font-black text-brand-secondary-light/85 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-primary/35">
          {jobs.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              token={token}
              updating={updatingId === job.id}
              onPatchStatus={onPatchStatus}
              ssspExpanded={expandedSsspJobId === job.id}
              onToggleSssp={() => onToggleSssp(job.id)}
              onSsspLoaded={onSsspLoaded}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SubmissionsTableContentProps {
  readonly subsLoading: boolean;
  readonly submissions: ReadonlyArray<Submission>;
  readonly updatingId: string | null;
  readonly onPatchStatus: (
    subId: string,
    status: "reviewed" | "archived",
  ) => void | Promise<void>;
}

function SubmissionsTableContent({
  subsLoading,
  submissions,
  updatingId,
  onPatchStatus,
}: SubmissionsTableContentProps) {
  if (subsLoading && submissions.length === 0) {
    return (
      <div className="py-12 text-center text-brand-secondary-light/70">
        <MaterialIcon
          icon="hourglass_empty"
          size="xl"
          className="animate-pulse mx-auto mb-2"
        />
        <p className="text-sm">Loading submissions…</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="py-12 text-center text-brand-secondary-light/70">
        <MaterialIcon
          icon="assignment_late"
          size="xl"
          className="mx-auto mb-2"
        />
        <p className="text-sm">No submissions match your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-245 text-sm">
        <thead>
          <tr className="border-b border-brand-primary/35 bg-brand-primary-darker/65">
            {SUBMISSION_TABLE_HEADERS.map((h) => (
              <th
                key={h}
                scope="col"
                className="text-left px-4 py-3 text-xs font-black text-brand-secondary-light/85 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-primary/35">
          {submissions.map((sub) => (
            <SubmissionRow
              key={sub.id}
              submission={sub}
              updating={updatingId === sub.id}
              onPatchStatus={onPatchStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type DownloadLogEntry = DownloadLogResponse["data"][number];

interface DownloadLogTableContentProps {
  readonly downloadLogLoading: boolean;
  readonly downloadLog: ReadonlyArray<DownloadLogEntry>;
}

function DownloadLogTableContent({
  downloadLogLoading,
  downloadLog,
}: DownloadLogTableContentProps) {
  if (downloadLogLoading && downloadLog.length === 0) {
    return (
      <div className="py-12 text-center text-brand-secondary-light/70">
        <MaterialIcon
          icon="hourglass_empty"
          size="xl"
          className="animate-pulse mx-auto mb-2"
        />
        <p className="text-sm">Loading download log…</p>
      </div>
    );
  }

  if (downloadLog.length === 0) {
    return (
      <div className="py-12 text-center text-brand-secondary-light/70">
        <MaterialIcon icon="info_outline" size="xl" className="mx-auto mb-2" />
        <p className="text-sm">No downloads recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-245 text-sm">
        <thead>
          <tr className="border-b border-brand-primary/35 bg-brand-primary-darker/65">
            {DOWNLOAD_TABLE_HEADERS.map((h) => (
              <th
                key={h}
                scope="col"
                className="text-left px-4 py-3 text-xs font-black text-brand-secondary-light/85 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-primary/35">
          {downloadLog.map((entry) => (
            <tr
              key={entry.id}
              className="hover:bg-brand-primary-dark/50 transition-colors"
            >
              <td className="px-4 py-3 text-brand-secondary-light/85 whitespace-nowrap">
                {formatSafetyDate(entry.downloaded_at)}
              </td>
              <td className="px-4 py-3">
                <p className="text-white font-semibold text-xs">
                  {entry.section_title}
                </p>
                <p className="text-brand-secondary-light/65 text-xs font-mono">
                  {entry.section_key}
                </p>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 bg-brand-primary-darker/70 text-brand-secondary-light/80 rounded text-xs font-mono">
                  {entry.download_type}
                </span>
              </td>
              <td className="px-4 py-3 text-brand-secondary-light/85">
                {entry.downloaded_by}
              </td>
              <td className="px-4 py-3 text-brand-secondary-light/65 font-mono text-xs">
                {entry.job_id ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 border-t border-brand-primary/35 text-xs text-brand-secondary-light/70">
        {downloadLog.length} download
        {downloadLog.length === 1 ? "" : "s"} recorded
      </div>
    </div>
  );
}

export function SafetyTab({ token }: SafetyTabProps) {
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [filterJobId, setFilterJobId] = useState("");
  const [filterFormType, setFilterFormType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedSsspJobId, setExpandedSsspJobId] = useState<string | null>(
    null,
  );

  const jobsQuery = useAdminTabData<JobsResponse>(
    token,
    "/api/safety/jobs?all=1",
  );

  const submissionsUrl = useMemo(
    () =>
      buildSubmissionsQuery({
        job_id: filterJobId,
        form_type: filterFormType,
        status: filterStatus,
      }),
    [filterJobId, filterFormType, filterStatus],
  );

  const submissionsQuery = useAdminTabData<SubmissionsResponse>(
    token,
    submissionsUrl,
  );

  const downloadLogQuery = useAdminTabData<DownloadLogResponse>(
    token,
    "/api/safety/downloads",
  );

  const jobs = useMemo(
    () => jobsQuery.data?.data ?? [],
    [jobsQuery.data?.data],
  );
  const submissions = useMemo(
    () => submissionsQuery.data?.data ?? [],
    [submissionsQuery.data?.data],
  );
  const downloadLog = useMemo(
    () => downloadLogQuery.data?.data ?? [],
    [downloadLogQuery.data?.data],
  );

  const jobsLoading = jobsQuery.status === "loading";
  const subsLoading = submissionsQuery.status === "loading";
  const downloadLogLoading = downloadLogQuery.status === "loading";

  const pipelineCounts = useMemo(
    () => computePipelineCounts(submissions),
    [submissions],
  );
  const outstanding = useMemo(
    () => outstandingJobs(jobs, submissions),
    [jobs, submissions],
  );
  const chartData = useMemo(
    () => submissionsByFormType(submissions),
    [submissions],
  );

  const submissionsCsv = useMemo(
    () => safetySubmissionsCsvRows(submissions),
    [submissions],
  );
  const downloadsCsv = useMemo(
    () => safetyDownloadsCsvRows(downloadLog),
    [downloadLog],
  );

  // SSSP records are fetched per-job in SsspPanel; we keep a lightweight
  // aggregated list here just for the CSV export and the pipeline badge.
  // The list is derived lazily so it doesn't add a network request at mount.
  const [ssspRecords, setSsspRecords] = useState<ReadonlyArray<SsspRecord>>([]);
  const ssspReadyCount = ssspRecords.filter((r) => r.status === "ready").length;
  const ssspCsv = useMemo(() => ssspCsvRows(ssspRecords), [ssspRecords]);

  const handleSsspPanelLoaded = useCallback(
    (jobId: string, record: SsspRecord | null) => {
      if (!record) return;
      setSsspRecords((prev) => {
        const filtered = prev.filter((r) => r.job_id !== jobId);
        return [...filtered, record];
      });
    },
    [],
  );

  const patchJobStatus = useCallback(
    async (jobId: string, status: JobStatus) => {
      setUpdatingId(jobId);
      try {
        await adminFetch(
          token,
          `/api/safety/jobs/${encodeURIComponent(jobId)}`,
          {
            method: "PATCH",
            body: JSON.stringify({ status }),
          },
        );
        await jobsQuery.refetch();
      } finally {
        setUpdatingId(null);
      }
    },
    [token, jobsQuery],
  );

  const patchSubmissionStatus = useCallback(
    async (subId: string, status: "reviewed" | "archived") => {
      setUpdatingId(subId);
      try {
        await adminFetch(
          token,
          `/api/safety/forms/${encodeURIComponent(subId)}`,
          {
            method: "PATCH",
            body: JSON.stringify({ status }),
          },
        );
        await submissionsQuery.refetch();
      } finally {
        setUpdatingId(null);
      }
    },
    [token, submissionsQuery],
  );

  return (
    <div className="space-y-8">
      <section data-print-section="true">
        <div className="rounded-xl border border-brand-secondary/45 bg-brand-primary-darker/60 p-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/40 bg-brand-primary-darker/55 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-brand-secondary-light">
            <MaterialIcon
              icon="shield"
              size="sm"
              className="text-brand-secondary"
            />
            Safety Program Context
          </p>
          <h2 className="mt-3 text-lg font-black text-white uppercase tracking-wide">
            Safety Program (MISH Safety &amp; Health Program / Safety Manual)
          </h2>
          <p className="mt-1 text-sm text-brand-secondary-light/85">
            This dashboard tab manages jobs, form submissions, and download
            activity aligned with the current MISH revision.
          </p>
        </div>
      </section>

      {/* Jobs section */}
      <section data-print-section="true">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="work_outline"
              size="lg"
              className="text-brand-secondary"
            />
            ACTIVE JOBS
          </h2>
          <div
            data-print-hide="true"
            className="flex flex-wrap items-center gap-2 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => void jobsQuery.refetch()}
              disabled={jobsQuery.isFetching}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-3 py-2 text-sm font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white disabled:opacity-50 transition-colors"
            >
              <MaterialIcon
                icon={jobsQuery.isFetching ? "hourglass_empty" : "refresh"}
                size="sm"
              />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => setShowNewJobForm((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-black rounded-lg transition-colors"
            >
              <MaterialIcon icon={showNewJobForm ? "close" : "add"} size="sm" />
              {showNewJobForm ? "Cancel" : "New Job"}
            </button>
          </div>
        </div>

        {showNewJobForm && (
          <NewJobForm
            token={token}
            onCreated={() => {
              setShowNewJobForm(false);
              void jobsQuery.refetch();
            }}
            onCancel={() => setShowNewJobForm(false)}
          />
        )}

        <div className="bg-brand-primary-darker/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          <JobsTableContent
            jobsLoading={jobsLoading}
            jobs={jobs}
            token={token}
            updatingId={updatingId}
            expandedSsspJobId={expandedSsspJobId}
            onPatchStatus={patchJobStatus}
            onToggleSssp={(jobId) =>
              setExpandedSsspJobId((prev) => (prev === jobId ? null : jobId))
            }
            onSsspLoaded={handleSsspPanelLoaded}
          />
        </div>
      </section>

      {/* Outstanding jobs panel */}
      {outstanding.length > 0 && (
        <section data-print-section="true">
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="warning_amber"
              size="lg"
              className="text-amber-400"
            />
            OUTSTANDING — NO TOOLBOX TALK (7 DAYS)
          </h2>
          <div className="bg-amber-900/20 border-2 border-amber-600/60 rounded-xl p-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {outstanding.map((j) => (
                <div
                  key={j.id}
                  className="bg-brand-primary-darker/60 border border-amber-700/40 rounded-lg px-4 py-3"
                >
                  <p className="font-mono text-amber-400 font-bold text-sm">
                    {j.job_number}
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {j.job_name}
                  </p>
                  {j.super_name && (
                    <p className="text-brand-secondary-light/75 text-xs mt-1">
                      Super: {j.super_name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Submissions section */}
      <section data-print-section="true">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="assignment"
              size="lg"
              className="text-brand-secondary"
            />
            FORM SUBMISSIONS
          </h2>
          <div
            data-print-hide="true"
            className="flex flex-wrap items-center gap-2 w-full sm:w-auto"
          >
            <ExportCsvButton
              filename={`mh-safety-submissions-${new Date().toISOString().slice(0, 10)}.csv`}
              headers={SAFETY_SUBMISSIONS_CSV_HEADERS}
              rows={submissionsCsv}
            />
          </div>
        </div>

        {/* Pipeline counts */}
        <div className="flex flex-wrap gap-3 mb-4">
          {PIPELINE_BADGES.map(({ key, label, color }) => (
            <div
              key={key}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-xl ${color}`}
            >
              <span className="text-xl font-black leading-none">
                {pipelineCounts[key]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide">
                {label}
              </span>
            </div>
          ))}
          {ssspReadyCount > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-yellow-400 border-yellow-600 bg-yellow-900/30">
              <MaterialIcon icon="description" size="sm" />
              <span className="text-xl font-black leading-none">
                {ssspReadyCount}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide">
                SSSP Ready
              </span>
            </div>
          )}
        </div>

        {/* Submissions by type chart */}
        {!subsLoading && submissions.length > 0 && (
          <div className="bg-brand-primary-darker/55 border border-brand-primary/35 rounded-xl p-4 mb-4">
            <p className="text-xs font-black text-brand-secondary-light/85 uppercase tracking-wider mb-3">
              Submissions by Form Type
            </p>
            <SafetyBarChart data={[...chartData]} />
          </div>
        )}

        {/* Filter bar */}
        <div data-print-hide="true" className="flex flex-wrap gap-3 mb-4">
          <select
            aria-label="Filter by job"
            value={filterJobId}
            onChange={(e) => setFilterJobId(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-brand-primary-darker/55 border border-brand-primary/35 rounded-lg text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
          >
            <option value="">All Jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.job_number} — {j.job_name}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by form type"
            value={filterFormType}
            onChange={(e) => setFilterFormType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-brand-primary-darker/55 border border-brand-primary/35 rounded-lg text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
          >
            <option value="">All Form Types</option>
            {Object.entries(FORM_TYPE_LABELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-brand-primary-darker/55 border border-brand-primary/35 rounded-lg text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>

          <button
            type="button"
            onClick={() => void submissionsQuery.refetch()}
            disabled={submissionsQuery.isFetching}
            className="w-full sm:w-auto px-3 py-2 bg-brand-primary-dark/65 hover:bg-brand-primary-dark text-brand-secondary-light rounded-lg text-sm transition-colors inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <MaterialIcon
              icon={submissionsQuery.isFetching ? "hourglass_empty" : "refresh"}
              size="sm"
            />
            Refresh
          </button>
        </div>

        <div className="bg-brand-primary-darker/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          <SubmissionsTableContent
            subsLoading={subsLoading}
            submissions={submissions}
            updatingId={updatingId}
            onPatchStatus={patchSubmissionStatus}
          />
        </div>
      </section>

      {/* Download log section */}
      <section data-print-section="true">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="download"
              size="lg"
              className="text-brand-secondary"
            />
            DOWNLOAD LOG
          </h2>
          <div
            data-print-hide="true"
            className="flex flex-wrap items-center gap-2 w-full sm:w-auto"
          >
            {ssspCsv.length > 0 && (
              <ExportCsvButton
                filename={`mh-sssp-audit-${new Date().toISOString().slice(0, 10)}.csv`}
                headers={SSSP_CSV_HEADERS}
                rows={ssspCsv}
              />
            )}
            <ExportCsvButton
              filename={`mh-safety-downloads-${new Date().toISOString().slice(0, 10)}.csv`}
              headers={SAFETY_DOWNLOADS_CSV_HEADERS}
              rows={downloadsCsv}
            />
            <button
              type="button"
              onClick={() => void downloadLogQuery.refetch()}
              disabled={downloadLogQuery.isFetching}
              className="px-3 py-2 bg-brand-primary-dark/65 hover:bg-brand-primary-dark text-brand-secondary-light rounded-lg text-sm transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <MaterialIcon
                icon={
                  downloadLogQuery.isFetching ? "hourglass_empty" : "refresh"
                }
                size="sm"
              />
              Refresh
            </button>
          </div>
        </div>
        <div className="bg-brand-primary-darker/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          <DownloadLogTableContent
            downloadLogLoading={downloadLogLoading}
            downloadLog={downloadLog}
          />
        </div>
      </section>
    </div>
  );
}

// ─── Job Row ──────────────────────────────────────────────────────────────────

interface JobRowProps {
  readonly job: Job;
  readonly token: string;
  readonly updating: boolean;
  readonly onPatchStatus: (
    jobId: string,
    status: JobStatus,
  ) => void | Promise<void>;
  readonly ssspExpanded: boolean;
  readonly onToggleSssp: () => void;
  readonly onSsspLoaded: (jobId: string, record: SsspRecord | null) => void;
}

function JobRow({
  job,
  token,
  updating,
  onPatchStatus,
  ssspExpanded,
  onToggleSssp,
  onSsspLoaded,
}: JobRowProps) {
  return (
    <>
      <tr className="hover:bg-brand-primary-dark/50 transition-colors">
        <td className="px-4 py-3 font-mono text-brand-secondary font-bold">
          {job.job_number}
        </td>
        <td className="px-4 py-3 text-white font-semibold">{job.job_name}</td>
        <td className="px-4 py-3 text-brand-secondary-light/80">
          {job.location ?? "—"}
        </td>
        <td className="px-4 py-3 text-brand-secondary-light/80">
          {job.pm_name ?? "—"}
        </td>
        <td className="px-4 py-3 text-brand-secondary-light/80">
          {job.super_name ?? "—"}
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${JOB_STATUS_COLORS[job.status] ?? ""}`}
          >
            {job.status}
          </span>
        </td>
        <td data-print-hide="true" className="px-4 py-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleSssp}
              title={ssspExpanded ? "Close SSSP" : "Open SSSP"}
              aria-label={`${ssspExpanded ? "Close" : "Open"} SSSP for ${job.job_number}`}
              aria-expanded={ssspExpanded}
              className={`p-1.5 rounded-lg transition-colors ${
                ssspExpanded
                  ? "text-brand-secondary bg-brand-primary/20"
                  : "text-brand-secondary-light/70 hover:text-brand-secondary hover:bg-brand-primary/10"
              }`}
            >
              <MaterialIcon icon="description" size="sm" />
            </button>
            {job.status !== "closed" && (
              <button
                type="button"
                onClick={() => void onPatchStatus(job.id, "closed")}
                disabled={updating}
                title="Close job"
                aria-label={`Close job ${job.job_number}`}
                className="p-1.5 rounded-lg text-brand-secondary-light/70 hover:text-yellow-400 hover:bg-yellow-900/30 transition-colors disabled:opacity-40"
              >
                <MaterialIcon icon="check_circle" size="sm" />
              </button>
            )}
            {job.status !== "active" && (
              <button
                type="button"
                onClick={() => void onPatchStatus(job.id, "active")}
                disabled={updating}
                title="Reactivate job"
                aria-label={`Reactivate job ${job.job_number}`}
                className="p-1.5 rounded-lg text-brand-secondary-light/70 hover:text-green-400 hover:bg-green-900/30 transition-colors disabled:opacity-40"
              >
                <MaterialIcon icon="play_circle" size="sm" />
              </button>
            )}
            {job.status !== "archived" && (
              <button
                type="button"
                onClick={() => void onPatchStatus(job.id, "archived")}
                disabled={updating}
                title="Archive job"
                aria-label={`Archive job ${job.job_number}`}
                className="p-1.5 rounded-lg text-brand-secondary-light/70 hover:text-red-400 hover:bg-red-900/30 transition-colors disabled:opacity-40"
              >
                <MaterialIcon icon="archive" size="sm" />
              </button>
            )}
          </div>
        </td>
      </tr>
      {ssspExpanded && (
        <tr>
          <td
            colSpan={JOB_TABLE_HEADERS.length}
            className="p-0 border-b border-brand-primary/35"
          >
            <SsspPanel
              token={token}
              jobId={job.id}
              jobNumber={job.job_number}
              onLoaded={onSsspLoaded}
            />
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Submission Row ───────────────────────────────────────────────────────────

interface SubmissionRowProps {
  readonly submission: Submission;
  readonly updating: boolean;
  readonly onPatchStatus: (
    subId: string,
    status: "reviewed" | "archived",
  ) => void | Promise<void>;
}

function SubmissionRow({
  submission: sub,
  updating,
  onPatchStatus,
}: SubmissionRowProps) {
  return (
    <tr className="hover:bg-brand-primary-dark/50 transition-colors">
      <td className="px-4 py-3 text-brand-secondary-light/80 whitespace-nowrap">
        {formatSafetyDate(sub.created_at)}
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="text-brand-secondary font-mono font-bold text-xs">
            {sub.job_number}
          </p>
          <p className="text-brand-secondary-light/75 text-xs">
            {sub.job_name}
          </p>
        </div>
      </td>
      <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">
        {formatFormType(sub.form_type)}
      </td>
      <td className="px-4 py-3 text-brand-secondary-light/80">
        {sub.submitted_by}
      </td>
      <td className="px-4 py-3 text-center text-brand-secondary-light/80">
        {sub.print_count}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${STATUS_COLORS[sub.status] ?? ""}`}
        >
          {sub.status}
        </span>
      </td>
      <td data-print-hide="true" className="px-4 py-3">
        <div className="flex items-center gap-1">
          <a
            href={`/safety/print/${encodeURIComponent(sub.id)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View &amp; Print"
            aria-label="View and print submission"
            className="p-1.5 rounded-lg text-brand-secondary-light/70 hover:text-brand-secondary hover:bg-brand-primary/20 transition-colors"
          >
            <MaterialIcon icon="open_in_new" size="sm" />
          </a>
          {sub.status === "submitted" && (
            <button
              type="button"
              onClick={() => void onPatchStatus(sub.id, "reviewed")}
              disabled={updating}
              title="Mark Reviewed"
              aria-label="Mark submission reviewed"
              className="p-1.5 rounded-lg text-brand-secondary-light/70 hover:text-green-400 hover:bg-green-900/30 transition-colors disabled:opacity-40"
            >
              <MaterialIcon icon="check_circle" size="sm" />
            </button>
          )}
          {sub.status !== "archived" && (
            <button
              type="button"
              onClick={() => void onPatchStatus(sub.id, "archived")}
              disabled={updating}
              title="Archive"
              aria-label="Archive submission"
              className="p-1.5 rounded-lg text-brand-secondary-light/70 hover:text-red-400 hover:bg-red-900/30 transition-colors disabled:opacity-40"
            >
              <MaterialIcon icon="archive" size="sm" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
