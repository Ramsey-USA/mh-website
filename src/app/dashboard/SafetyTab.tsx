"use client";

import { useCallback, useMemo, useState } from "react";
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
  safetyDownloadsCsvRows,
  safetySubmissionsCsvRows,
  STATUS_COLORS,
  submissionsByFormType,
  type DownloadLogResponse,
  type Job,
  type JobsResponse,
  type JobStatus,
  type SubmissionsResponse,
} from "@/lib/dashboard/safety";

const SafetyBarChart = dynamic(
  () => import("./SafetyBarChart").then((m) => ({ default: m.SafetyBarChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded-lg border border-gray-700 bg-gray-900/30 animate-pulse" />
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/80 border border-brand-secondary/50 rounded-xl p-4 mb-4"
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
          className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
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
    color: "text-gray-400 border-gray-600 bg-gray-700/30",
  },
] as const;

export function SafetyTab({ token }: SafetyTabProps) {
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [filterJobId, setFilterJobId] = useState("");
  const [filterFormType, setFilterFormType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  const jobs = jobsQuery.data?.data ?? [];
  const submissions = submissionsQuery.data?.data ?? [];
  const downloadLog = downloadLogQuery.data?.data ?? [];

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
          <div data-print-hide="true" className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void jobsQuery.refetch()}
              disabled={jobsQuery.isFetching}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-3 py-2 text-sm font-black uppercase tracking-wide text-gray-200 hover:border-brand-secondary hover:text-white disabled:opacity-50 transition-colors"
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

        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          {jobsLoading && jobs.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <MaterialIcon
                icon="hourglass_empty"
                size="xl"
                className="animate-pulse mx-auto mb-2"
              />
              <p className="text-sm">Loading jobs…</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <MaterialIcon
                icon="work_off"
                size="xl"
                className="mx-auto mb-2"
              />
              <p className="text-sm">
                No jobs yet. Create the first job above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-900/50">
                    {JOB_TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {jobs.map((job) => (
                    <JobRow
                      key={job.id}
                      job={job}
                      updating={updatingId === job.id}
                      onPatchStatus={patchJobStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
                  className="bg-gray-900/60 border border-amber-700/40 rounded-lg px-4 py-3"
                >
                  <p className="font-mono text-amber-400 font-bold text-sm">
                    {j.job_number}
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {j.job_name}
                  </p>
                  {j.super_name && (
                    <p className="text-gray-400 text-xs mt-1">
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
          <div data-print-hide="true" className="flex items-center gap-2">
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
        </div>

        {/* Submissions by type chart */}
        {!subsLoading && submissions.length > 0 && (
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
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
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
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
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
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
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
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
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            <MaterialIcon
              icon={submissionsQuery.isFetching ? "hourglass_empty" : "refresh"}
              size="sm"
            />
            Refresh
          </button>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          {subsLoading && submissions.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <MaterialIcon
                icon="hourglass_empty"
                size="xl"
                className="animate-pulse mx-auto mb-2"
              />
              <p className="text-sm">Loading submissions…</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <MaterialIcon
                icon="assignment_late"
                size="xl"
                className="mx-auto mb-2"
              />
              <p className="text-sm">No submissions match your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-900/50">
                    {SUBMISSION_TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {submissions.map((sub) => (
                    <SubmissionRow
                      key={sub.id}
                      submission={sub}
                      updating={updatingId === sub.id}
                      onPatchStatus={patchSubmissionStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
          <div data-print-hide="true" className="flex items-center gap-2">
            <ExportCsvButton
              filename={`mh-safety-downloads-${new Date().toISOString().slice(0, 10)}.csv`}
              headers={SAFETY_DOWNLOADS_CSV_HEADERS}
              rows={downloadsCsv}
            />
            <button
              type="button"
              onClick={() => void downloadLogQuery.refetch()}
              disabled={downloadLogQuery.isFetching}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
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
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          {downloadLogLoading && downloadLog.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <MaterialIcon
                icon="hourglass_empty"
                size="xl"
                className="animate-pulse mx-auto mb-2"
              />
              <p className="text-sm">Loading download log…</p>
            </div>
          ) : downloadLog.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <MaterialIcon
                icon="info_outline"
                size="xl"
                className="mx-auto mb-2"
              />
              <p className="text-sm">No downloads recorded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-900/50">
                    {DOWNLOAD_TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {downloadLog.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {formatSafetyDate(entry.downloaded_at)}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-semibold text-xs">
                          {entry.section_title}
                        </p>
                        <p className="text-gray-500 text-xs font-mono">
                          {entry.section_key}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs font-mono">
                          {entry.download_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {entry.downloaded_by}
                      </td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                        {entry.job_id ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t border-gray-700 text-xs text-gray-500">
                {downloadLog.length} download
                {downloadLog.length !== 1 ? "s" : ""} recorded
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Job Row ──────────────────────────────────────────────────────────────────

interface JobRowProps {
  readonly job: Job;
  readonly updating: boolean;
  readonly onPatchStatus: (
    jobId: string,
    status: JobStatus,
  ) => void | Promise<void>;
}

function JobRow({ job, updating, onPatchStatus }: JobRowProps) {
  return (
    <tr className="hover:bg-gray-700/30 transition-colors">
      <td className="px-4 py-3 font-mono text-brand-secondary font-bold">
        {job.job_number}
      </td>
      <td className="px-4 py-3 text-white font-semibold">{job.job_name}</td>
      <td className="px-4 py-3 text-gray-400">{job.location ?? "—"}</td>
      <td className="px-4 py-3 text-gray-400">{job.pm_name ?? "—"}</td>
      <td className="px-4 py-3 text-gray-400">{job.super_name ?? "—"}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${JOB_STATUS_COLORS[job.status] ?? ""}`}
        >
          {job.status}
        </span>
      </td>
      <td data-print-hide="true" className="px-4 py-3">
        <div className="flex items-center gap-1">
          {job.status !== "closed" && (
            <button
              type="button"
              onClick={() => void onPatchStatus(job.id, "closed")}
              disabled={updating}
              title="Close job"
              aria-label={`Close job ${job.job_number}`}
              className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/30 transition-colors disabled:opacity-40"
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
              className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-900/30 transition-colors disabled:opacity-40"
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
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors disabled:opacity-40"
            >
              <MaterialIcon icon="archive" size="sm" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Submission Row ───────────────────────────────────────────────────────────

interface SubmissionRowProps {
  readonly submission: import("@/lib/dashboard/safety").Submission;
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
    <tr className="hover:bg-gray-700/30 transition-colors">
      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
        {formatSafetyDate(sub.created_at)}
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="text-brand-secondary font-mono font-bold text-xs">
            {sub.job_number}
          </p>
          <p className="text-gray-400 text-xs">{sub.job_name}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">
        {formatFormType(sub.form_type)}
      </td>
      <td className="px-4 py-3 text-gray-400">{sub.submitted_by}</td>
      <td className="px-4 py-3 text-center text-gray-400">{sub.print_count}</td>
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
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-900/30 transition-colors"
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
              className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-900/30 transition-colors disabled:opacity-40"
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
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors disabled:opacity-40"
            >
              <MaterialIcon icon="archive" size="sm" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
