"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";
import { Input, Textarea } from "@/components/ui/forms/Input";

interface Job {
  id: string;
  job_number: string;
  job_name: string;
}

interface ApiSuccess<T> {
  success: boolean;
  data: T;
}

function getAuthToken(): string | null {
  const fieldToken = localStorage.getItem("field_auth_token");
  const adminToken = localStorage.getItem("admin_token");
  return fieldToken ?? adminToken;
}

export default function SafetyIncidentReportPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    job_id: "",
    date: "",
    time: "",
    reporterName: "",
    incidentType: "",
    location: "",
    personInvolved: "",
    injuryOccurred: false,
    medicalAttentionRequired: false,
    description: "",
    immediateAction: "",
    rootCause: "",
    correctiveAction: "",
  });

  useEffect(() => {
    const currentToken = getAuthToken();
    if (!currentToken) {
      setLoadingJobs(false);
      setIsAuthorized(false);
      return;
    }

    setToken(currentToken);
    setIsAuthorized(true);

    const loadJobs = async () => {
      try {
        const res = await fetch("/api/safety/jobs", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        const json = (await res.json()) as ApiSuccess<Job[]> & {
          error?: string;
        };

        if (!res.ok || !json.success) {
          throw new Error(json.error ?? "Failed to load active jobs");
        }

        setJobs(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load jobs");
      } finally {
        setLoadingJobs(false);
      }
    };

    void loadJobs();
  }, []);

  const canSubmit = useMemo(() => {
    return (
      form.job_id &&
      form.date &&
      form.time &&
      form.reporterName &&
      form.incidentType &&
      form.location &&
      form.description
    );
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!token) {
      setError("Authorization token missing. Re-open the app and sign in.");
      return;
    }

    if (!canSubmit) {
      setError("Complete all required fields before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/safety/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_id: form.job_id,
          form_type: "incident-report",
          data: {
            date: form.date,
            time: form.time,
            reporterName: form.reporterName,
            incidentType: form.incidentType,
            location: form.location,
            personInvolved: form.personInvolved,
            injuryOccurred: form.injuryOccurred,
            medicalAttentionRequired: form.medicalAttentionRequired,
            description: form.description,
            immediateAction: form.immediateAction,
            rootCause: form.rootCause,
            correctiveAction: form.correctiveAction,
          },
        }),
      });

      const json = (await res.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Failed to submit incident report");
      }

      setSuccessMessage(
        "Incident report submitted successfully. It is now available in Safety admin review.",
      );
      setForm({
        job_id: "",
        date: "",
        time: "",
        reporterName: "",
        incidentType: "",
        location: "",
        personInvolved: "",
        injuryOccurred: false,
        medicalAttentionRequired: false,
        description: "",
        immediateAction: "",
        rootCause: "",
        correctiveAction: "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit incident report",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-16 dark:bg-gray-950 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-gray-900 sm:p-8">
          <MaterialIcon
            icon="lock"
            size="xl"
            className="mx-auto mb-3 text-brand-primary"
          />
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Team Access Required
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Incident reporting is available to authorized team members in the
            installed app. Sign in with your team credentials to continue.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white hover:bg-brand-primary-dark"
            >
              <MaterialIcon icon="dashboard" size="sm" className="text-white" />
              Return to Hub
            </Link>
            <Link
              href="/safety"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-primary px-5 py-3 text-sm font-bold text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              <MaterialIcon icon="shield" size="sm" />
              Safety Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTrackingClient pageName="safety-incident-report" />

      <section className="bg-gradient-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="report"
              size="sm"
              className="text-brand-secondary"
            />
            Direct Incident Entry
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Incident Report Submission
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-100 sm:text-base">
            Submit incident details immediately so safety leadership can review
            and respond. Required information aligns with the current print and
            compliance workflow.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-8 dark:bg-gray-950 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-gray-900 sm:p-7">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Active Job
                <select
                  value={form.job_id}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      job_id: event.target.value,
                    }))
                  }
                  disabled={loadingJobs}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-primary focus:outline-none dark:border-slate-600 dark:bg-gray-800 dark:text-white"
                  required
                >
                  <option value="">
                    {loadingJobs ? "Loading jobs..." : "Select active job"}
                  </option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.job_number} · {job.job_name}
                    </option>
                  ))}
                </select>
              </label>

              <Input
                label="Incident Type"
                type="text"
                value={form.incidentType}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    incidentType: event.target.value,
                  }))
                }
                placeholder="Injury, property damage, near miss, etc."
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Date"
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    date: event.target.value,
                  }))
                }
                required
              />

              <Input
                label="Time"
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    time: event.target.value,
                  }))
                }
                required
              />

              <Input
                label="Reporter Name"
                type="text"
                value={form.reporterName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    reporterName: event.target.value,
                  }))
                }
                placeholder="Full name"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Location"
                type="text"
                value={form.location}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    location: event.target.value,
                  }))
                }
                placeholder="Jobsite location"
                required
              />

              <Input
                label="Person Involved"
                type="text"
                value={form.personInvolved}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    personInvolved: event.target.value,
                  }))
                }
                placeholder="Name or crew reference"
              />
            </div>

            <Textarea
              label="Incident Description"
              value={form.description}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  description: event.target.value,
                }))
              }
              rows={4}
              placeholder="What happened, where, and immediate conditions"
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Textarea
                label="Immediate Action Taken"
                value={form.immediateAction}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    immediateAction: event.target.value,
                  }))
                }
                rows={3}
                placeholder="Immediate response actions"
              />

              <Textarea
                label="Corrective Action"
                value={form.correctiveAction}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    correctiveAction: event.target.value,
                  }))
                }
                rows={3}
                placeholder="Planned corrective or preventive measures"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.injuryOccurred}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      injuryOccurred: event.target.checked,
                    }))
                  }
                />
                Injury occurred
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.medicalAttentionRequired}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      medicalAttentionRequired: event.target.checked,
                    }))
                  }
                />
                Medical attention required
              </label>
            </div>

            <Textarea
              label="Root Cause Notes"
              value={form.rootCause}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  rootCause: event.target.value,
                }))
              }
              rows={2}
              placeholder="Known or suspected root cause"
            />

            {(error || successMessage) && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  error
                    ? "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/30 dark:text-red-300"
                    : "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/30 dark:text-green-300"
                }`}
              >
                {error ?? successMessage}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting || !canSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MaterialIcon icon="send" size="sm" className="text-white" />
                {submitting ? "Submitting..." : "Submit Incident Report"}
              </button>

              <Link
                href="/hub"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-primary px-5 py-3 text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                <MaterialIcon icon="dashboard" size="sm" />
                Back to Operations Hub
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
