"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { DashboardFormField } from "@/components/ui/forms/DashboardFormField";

const SafetyBarChart = dynamic(
  () => import("./SafetyBarChart").then((m) => ({ default: m.SafetyBarChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded-lg border border-gray-700 bg-gray-900/30 animate-pulse" />
    ),
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string;
  job_number: string;
  job_name: string;
  location: string | null;
  pm_name: string | null;
  super_name: string | null;
  status: "active" | "closed" | "archived";
  created_at: string;
}

interface Submission {
  id: string;
  job_id: string;
  job_number: string;
  job_name: string;
  form_type: string;
  submitted_by: string;
  status: "submitted" | "reviewed" | "archived";
  print_count: number;
  created_at: string;
}

type JobStatus = "active" | "closed" | "archived";

const FORM_TYPE_LABELS: Record<string, string> = {
  "toolbox-talk": "Toolbox Talk",
  jha: "JHA",
  "site-safety-inspection": "Site Inspection",
  "incident-report": "Incident Report",
};

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  reviewed: "bg-green-900/50 text-green-300 border-green-600",
  archived: "bg-gray-700/50 text-gray-400 border-gray-600",
};

const JOB_STATUS_COLORS: Record<string, string> = {
  active: "bg-green-900/50 text-green-300 border-green-600",
  closed: "bg-gray-700/50 text-gray-400 border-gray-600",
  archived: "bg-red-900/50 text-red-400 border-red-700",
};

interface DownloadLogEntry {
  id: string;
  section_key: string;
  section_title: string;
  download_type: string;
  downloaded_by: string;
  job_id: string | null;
  downloaded_at: string;
}

// ─── New Job Form ─────────────────────────────────────────────────────────────

interface NewJobFormProps {
  token: string;
  onCreated: () => void;
  onCancel: () => void;
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
  token: string;
}

export function SafetyTab({ token }: SafetyTabProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [showNewJobForm, setShowNewJobForm] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subsLoading, setSubsLoading] = useState(true);
  const [filterJobId, setFilterJobId] = useState<string>("");
  const [filterFormType, setFilterFormType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [downloadLog, setDownloadLog] = useState<DownloadLogEntry[]>([]);
  const [downloadLogLoading, setDownloadLogLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      // Admin token can fetch all job statuses — use the all-statuses variant
      const res = await fetch("/api/safety/jobs?all=1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setJobs(json.data as Job[]);
      }
    } finally {
      setJobsLoading(false);
    }
  }, [token]);

  const fetchSubmissions = useCallback(async () => {
    setSubsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterJobId) params.set("job_id", filterJobId);
      if (filterFormType) params.set("form_type", filterFormType);
      if (filterStatus) params.set("status", filterStatus);
      const res = await fetch(`/api/safety/forms?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setSubmissions(json.data as Submission[]);
      }
    } finally {
      setSubsLoading(false);
    }
  }, [token, filterJobId, filterFormType, filterStatus]);

  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    void fetchSubmissions();
  }, [fetchSubmissions]);

  const fetchDownloadLog = useCallback(async () => {
    setDownloadLogLoading(true);
    try {
      const res = await fetch("/api/safety/downloads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setDownloadLog((json as { data: DownloadLogEntry[] }).data);
      }
    } finally {
      setDownloadLogLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void fetchDownloadLog();
  }, [fetchDownloadLog]);

  // ── Computed values ──────────────────────────────────────────────────────────

  const pipelineCounts = useMemo(
    () => ({
      submitted: submissions.filter((s) => s.status === "submitted").length,
      reviewed: submissions.filter((s) => s.status === "reviewed").length,
      archived: submissions.filter((s) => s.status === "archived").length,
    }),
    [submissions],
  );

  const weekAgo = useMemo(
    () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    [],
  );

  const recentToolboxJobIds = useMemo(
    () =>
      new Set(
        submissions
          .filter(
            (s) =>
              s.form_type === "toolbox-talk" &&
              new Date(s.created_at) >= weekAgo,
          )
          .map((s) => s.job_id),
      ),
    [submissions, weekAgo],
  );

  const outstandingJobs = useMemo(
    () =>
      jobs.filter(
        (j) => j.status === "active" && !recentToolboxJobIds.has(j.id),
      ),
    [jobs, recentToolboxJobIds],
  );

  const chartData = useMemo(
    () =>
      Object.entries(FORM_TYPE_LABELS).map(([id, name]) => ({
        name,
        count: submissions.filter((s) => s.form_type === id).length,
      })),
    [submissions],
  );

  const patchJobStatus = async (jobId: string, status: JobStatus) => {
    setUpdatingId(jobId);
    try {
      await fetch(`/api/safety/jobs/${encodeURIComponent(jobId)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      await fetchJobs();
    } finally {
      setUpdatingId(null);
    }
  };

  const patchSubmissionStatus = async (
    subId: string,
    status: "reviewed" | "archived",
  ) => {
    setUpdatingId(subId);
    try {
      await fetch(`/api/safety/forms/${encodeURIComponent(subId)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      await fetchSubmissions();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Jobs section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="work_outline"
              size="lg"
              className="text-brand-secondary"
            />
            ACTIVE JOBS
          </h2>
          <button
            onClick={() => setShowNewJobForm((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-black rounded-lg transition-colors"
          >
            <MaterialIcon icon={showNewJobForm ? "close" : "add"} size="sm" />
            {showNewJobForm ? "Cancel" : "New Job"}
          </button>
        </div>

        {showNewJobForm && (
          <NewJobForm
            token={token}
            onCreated={() => {
              setShowNewJobForm(false);
              void fetchJobs();
            }}
            onCancel={() => setShowNewJobForm(false)}
          />
        )}

        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          {jobsLoading ? (
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
                    {[
                      "Job #",
                      "Name",
                      "Location",
                      "PM",
                      "Super",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-brand-secondary font-bold">
                        {job.job_number}
                      </td>
                      <td className="px-4 py-3 text-white font-semibold">
                        {job.job_name}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {job.location ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {job.pm_name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {job.super_name ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${JOB_STATUS_COLORS[job.status] ?? ""}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {job.status !== "closed" && (
                            <button
                              onClick={() =>
                                void patchJobStatus(job.id, "closed")
                              }
                              disabled={updatingId === job.id}
                              title="Close job"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/30 transition-colors disabled:opacity-40"
                            >
                              <MaterialIcon icon="check_circle" size="sm" />
                            </button>
                          )}
                          {job.status !== "active" && (
                            <button
                              onClick={() =>
                                void patchJobStatus(job.id, "active")
                              }
                              disabled={updatingId === job.id}
                              title="Reactivate job"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-900/30 transition-colors disabled:opacity-40"
                            >
                              <MaterialIcon icon="play_circle" size="sm" />
                            </button>
                          )}
                          {job.status !== "archived" && (
                            <button
                              onClick={() =>
                                void patchJobStatus(job.id, "archived")
                              }
                              disabled={updatingId === job.id}
                              title="Archive job"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors disabled:opacity-40"
                            >
                              <MaterialIcon icon="archive" size="sm" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Outstanding jobs panel */}
      {outstandingJobs.length > 0 && (
        <div>
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
              {outstandingJobs.map((j) => (
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
        </div>
      )}

      {/* Submissions section */}
      <div>
        <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
          <MaterialIcon
            icon="assignment"
            size="lg"
            className="text-brand-secondary"
          />
          FORM SUBMISSIONS
        </h2>

        {/* Pipeline counts */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            {
              label: "Awaiting Review",
              count: pipelineCounts.submitted,
              color: "text-yellow-400 border-yellow-600 bg-yellow-900/30",
            },
            {
              label: "Reviewed",
              count: pipelineCounts.reviewed,
              color: "text-green-400 border-green-600 bg-green-900/30",
            },
            {
              label: "Archived",
              count: pipelineCounts.archived,
              color: "text-gray-400 border-gray-600 bg-gray-700/30",
            },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-xl ${color}`}
            >
              <span className="text-xl font-black leading-none">{count}</span>
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
            <SafetyBarChart data={chartData} />
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
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
            onClick={() => void fetchSubmissions()}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors inline-flex items-center gap-1.5"
          >
            <MaterialIcon icon="refresh" size="sm" />
            Refresh
          </button>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          {subsLoading ? (
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
                    {[
                      "Date",
                      "Job",
                      "Form Type",
                      "Submitted By",
                      "Prints",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {submissions.map((sub) => {
                    const date = new Date(sub.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      },
                    );
                    return (
                      <tr
                        key={sub.id}
                        className="hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                          {date}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-brand-secondary font-mono font-bold text-xs">
                              {sub.job_number}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {sub.job_name}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">
                          {FORM_TYPE_LABELS[sub.form_type] ?? sub.form_type}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {sub.submitted_by}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-400">
                          {sub.print_count}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${STATUS_COLORS[sub.status] ?? ""}`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {/* View / Print */}
                            <a
                              href={`/safety/print/${encodeURIComponent(sub.id)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View &amp; Print"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-900/30 transition-colors"
                            >
                              <MaterialIcon icon="open_in_new" size="sm" />
                            </a>

                            {/* Mark Reviewed */}
                            {sub.status === "submitted" && (
                              <button
                                onClick={() =>
                                  void patchSubmissionStatus(sub.id, "reviewed")
                                }
                                disabled={updatingId === sub.id}
                                title="Mark Reviewed"
                                className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-900/30 transition-colors disabled:opacity-40"
                              >
                                <MaterialIcon icon="check_circle" size="sm" />
                              </button>
                            )}

                            {/* Archive */}
                            {sub.status !== "archived" && (
                              <button
                                onClick={() =>
                                  void patchSubmissionStatus(sub.id, "archived")
                                }
                                disabled={updatingId === sub.id}
                                title="Archive"
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors disabled:opacity-40"
                              >
                                <MaterialIcon icon="archive" size="sm" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Download log section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="download"
              size="lg"
              className="text-brand-secondary"
            />
            DOWNLOAD LOG
          </h2>
          <button
            onClick={() => void fetchDownloadLog()}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors inline-flex items-center gap-1.5"
          >
            <MaterialIcon icon="refresh" size="sm" />
            Refresh
          </button>
        </div>
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 border-brand-primary overflow-hidden">
          {downloadLogLoading ? (
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
                    {["Date", "Section", "Type", "Downloaded By", "Job"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {downloadLog.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {new Date(entry.downloaded_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "2-digit",
                          },
                        )}
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
      </div>
    </div>
  );
}
