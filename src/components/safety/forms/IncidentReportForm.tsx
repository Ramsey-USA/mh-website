"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface Witness {
  id: string;
  name: string;
  statement: string;
}

interface IncidentReportData {
  date: string;
  time: string;
  reporterName: string;
  personInvolved: string;
  injuryOccurred: boolean;
  incidentType: string;
  location: string;
  description: string;
  immediateAction: string;
  rootCause: string;
  correctiveAction: string;
  medicalAttentionRequired: boolean;
  witnesses: Witness[];
  supervisorSignature: string;
}

interface Props {
  superintendentName: string;
  jobId: string;
  jobLabel: string;
  token: string;
  onSubmitSuccess: (submissionId: string) => void;
}

const INCIDENT_TYPES = [
  "Near Miss",
  "First Aid",
  "Medical Treatment",
  "Recordable Injury",
  "Lost Time",
  "Property Damage",
  "Environmental",
  "Vehicle Accident",
];

export function IncidentReportForm({
  superintendentName,
  jobId,
  jobLabel,
  token,
  onSubmitSuccess,
}: Props) {
  const today = new Date().toISOString().split("T")[0] ?? "";
  const nowTime = new Date().toTimeString().slice(0, 5);

  const [formData, setFormData] = useState<IncidentReportData>({
    date: today,
    time: nowTime,
    reporterName: superintendentName,
    personInvolved: "",
    injuryOccurred: false,
    incidentType: "",
    location: "",
    description: "",
    immediateAction: "",
    rootCause: "",
    correctiveAction: "",
    medicalAttentionRequired: false,
    witnesses: [],
    supervisorSignature: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addWitness = () =>
    setFormData((d) => ({
      ...d,
      witnesses: [
        ...d.witnesses,
        { id: crypto.randomUUID(), name: "", statement: "" },
      ],
    }));
  const removeWitness = (id: string) =>
    setFormData((d) => ({
      ...d,
      witnesses: d.witnesses.filter((w) => w.id !== id),
    }));
  const updateWitness = (
    id: string,
    field: "name" | "statement",
    value: string,
  ) =>
    setFormData((d) => ({
      ...d,
      witnesses: d.witnesses.map((w) =>
        w.id === id ? { ...w, [field]: value } : w,
      ),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.description.trim()) {
      setError("Incident description is required.");
      return;
    }
    if (!formData.rootCause.trim()) {
      setError("Root cause analysis is required.");
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
          job_id: jobId,
          form_type: "incident-report",
          data: formData,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submit failed");
      onSubmitSuccess(json.data.id as string);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Submit failed. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50";
  const labelClass =
    "block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1";
  const textareaClass = `${inputClass} resize-none`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Severity warning banner */}
      <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl px-4 py-3">
        <MaterialIcon
          icon="warning_amber"
          size="md"
          className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
        />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          For life-threatening emergencies, call <strong>911</strong>{" "}
          immediately. Notify your PM and safety officer as soon as safe to do
          so.
        </p>
      </div>

      {/* Meta row */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) =>
              setFormData((d) => ({ ...d, date: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData((d) => ({ ...d, time: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Job</label>
          <input
            type="text"
            readOnly
            value={jobLabel}
            className={`${inputClass} bg-gray-50 dark:bg-gray-700`}
          />
        </div>
        <div>
          <label className={labelClass}>Reported By</label>
          <input
            type="text"
            value={formData.reporterName}
            onChange={(e) =>
              setFormData((d) => ({ ...d, reporterName: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Incident type + location */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Incident Type</label>
          <select
            value={formData.incidentType}
            onChange={(e) =>
              setFormData((d) => ({ ...d, incidentType: e.target.value }))
            }
            className={inputClass}
          >
            <option value="">— Select type —</option>
            {INCIDENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Location on Site</label>
          <input
            type="text"
            placeholder="e.g. Main entry, East elevation Level 2"
            value={formData.location}
            onChange={(e) =>
              setFormData((d) => ({ ...d, location: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Person involved + checkboxes */}
      <div>
        <label className={labelClass}>Person(s) Involved</label>
        <input
          type="text"
          placeholder="Full name and trade / role"
          value={formData.personInvolved}
          onChange={(e) =>
            setFormData((d) => ({ ...d, personInvolved: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div className="flex gap-6">
        {[
          { field: "injuryOccurred" as const, label: "Injury occurred" },
          {
            field: "medicalAttentionRequired" as const,
            label: "Medical attention required",
          },
        ].map(({ field, label }) => (
          <label
            key={field}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={formData[field]}
              onChange={(e) =>
                setFormData((d) => ({ ...d, [field]: e.target.checked }))
              }
              className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary/50 border-gray-300"
            />
            {label}
          </label>
        ))}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>
          Incident Description <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="Describe exactly what happened — include sequence of events, equipment involved, and conditions at the time of the incident…"
          value={formData.description}
          onChange={(e) =>
            setFormData((d) => ({ ...d, description: e.target.value }))
          }
          className={textareaClass}
        />
      </div>

      {/* Immediate action */}
      <div>
        <label className={labelClass}>Immediate Action Taken</label>
        <textarea
          rows={2}
          placeholder="What was done immediately to respond to and contain the incident?"
          value={formData.immediateAction}
          onChange={(e) =>
            setFormData((d) => ({ ...d, immediateAction: e.target.value }))
          }
          className={textareaClass}
        />
      </div>

      {/* Root cause */}
      <div>
        <label className={labelClass}>
          Root Cause Analysis <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          placeholder="Identify the underlying root cause(s) — not just the immediate cause. Ask 'why' until you find the systemic issue."
          value={formData.rootCause}
          onChange={(e) =>
            setFormData((d) => ({ ...d, rootCause: e.target.value }))
          }
          className={textareaClass}
        />
      </div>

      {/* Corrective action */}
      <div>
        <label className={labelClass}>Corrective Action Plan</label>
        <textarea
          rows={3}
          placeholder="What changes will be made to prevent recurrence? Who is responsible and by when?"
          value={formData.correctiveAction}
          onChange={(e) =>
            setFormData((d) => ({ ...d, correctiveAction: e.target.value }))
          }
          className={textareaClass}
        />
      </div>

      {/* Witnesses */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Witnesses</label>
          <button
            type="button"
            onClick={addWitness}
            className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-dark font-semibold"
          >
            <MaterialIcon icon="add" size="sm" />
            Add Witness
          </button>
        </div>
        {formData.witnesses.length === 0 && (
          <p className="text-sm text-gray-400 italic">No witnesses added.</p>
        )}
        <div className="space-y-3">
          {formData.witnesses.map((w) => (
            <div key={w.id} className="flex items-start gap-2">
              <div className="grid sm:grid-cols-2 gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Witness name"
                  value={w.name}
                  onChange={(e) => updateWitness(w.id, "name", e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />
                <input
                  type="text"
                  placeholder="Brief statement"
                  value={w.statement}
                  onChange={(e) =>
                    updateWitness(w.id, "statement", e.target.value)
                  }
                  className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />
              </div>
              <button
                type="button"
                onClick={() => removeWitness(w.id)}
                aria-label="Remove witness"
                className="mt-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <MaterialIcon icon="remove_circle_outline" size="sm" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Supervisor sign-off */}
      <div>
        <label className={labelClass}>Supervisor Sign-off (initials)</label>
        <input
          type="text"
          placeholder="Initials confirming report accuracy"
          value={formData.supervisorSignature}
          onChange={(e) =>
            setFormData((d) => ({ ...d, supervisorSignature: e.target.value }))
          }
          className={`${inputClass} max-w-xs`}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
          <MaterialIcon icon="error_outline" size="sm" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
      >
        {submitting ? (
          <>
            <MaterialIcon icon="hourglass_empty" size="sm" />
            Submitting…
          </>
        ) : (
          <>
            <MaterialIcon icon="send" size="sm" />
            Submit Incident Report
          </>
        )}
      </button>
    </form>
  );
}
