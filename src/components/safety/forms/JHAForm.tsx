"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface CrewMember {
  id: string;
  name: string;
  role: string;
}

interface JHAStep {
  id: string;
  step: string;
  hazard: string;
  control: string;
}

interface JHAData {
  date: string;
  supervisorName: string;
  taskDescription: string;
  workLocation: string;
  requiredPPE: string;
  crewMembers: CrewMember[];
  steps: JHAStep[];
  supervisorSignature: string;
}

interface Props {
  superintendentName: string;
  jobId: string;
  jobLabel: string;
  token: string;
  onSubmitSuccess: (submissionId: string) => void;
}

export function JHAForm({
  superintendentName,
  jobId,
  jobLabel,
  token,
  onSubmitSuccess,
}: Props) {
  const today = new Date().toISOString().split("T")[0] ?? "";

  const [formData, setFormData] = useState<JHAData>({
    date: today,
    supervisorName: superintendentName,
    taskDescription: "",
    workLocation: "",
    requiredPPE: "",
    crewMembers: [{ id: crypto.randomUUID(), name: "", role: "" }],
    steps: [{ id: crypto.randomUUID(), step: "", hazard: "", control: "" }],
    supervisorSignature: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Crew helpers
  const addCrew = () =>
    setFormData((d) => ({
      ...d,
      crewMembers: [...d.crewMembers, { id: crypto.randomUUID(), name: "", role: "" }],
    }));
  const removeCrew = (id: string) =>
    setFormData((d) => ({
      ...d,
      crewMembers: d.crewMembers.filter((c) => c.id !== id),
    }));
  const updateCrew = (id: string, field: "name" | "role", value: string) =>
    setFormData((d) => ({
      ...d,
      crewMembers: d.crewMembers.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));

  // Step helpers
  const addStep = () =>
    setFormData((d) => ({
      ...d,
      steps: [...d.steps, { id: crypto.randomUUID(), step: "", hazard: "", control: "" }],
    }));
  const removeStep = (id: string) =>
    setFormData((d) => ({
      ...d,
      steps: d.steps.filter((s) => s.id !== id),
    }));
  const updateStep = (id: string, field: "step" | "hazard" | "control", value: string) =>
    setFormData((d) => ({
      ...d,
      steps: d.steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.taskDescription.trim()) {
      setError("Task description is required.");
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
        body: JSON.stringify({ job_id: jobId, form_type: "jha", data: formData }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submit failed");
      onSubmitSuccess(json.data.id as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50";
  const labelClass =
    "block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Meta row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData((d) => ({ ...d, date: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Job</label>
          <input type="text" readOnly value={jobLabel} className={`${inputClass} bg-gray-50 dark:bg-gray-700`} />
        </div>
        <div>
          <label className={labelClass}>Supervisor</label>
          <input
            type="text"
            value={formData.supervisorName}
            onChange={(e) => setFormData((d) => ({ ...d, supervisorName: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>

      {/* Task + Location */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Task / Work Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Overhead steel beam installation"
            value={formData.taskDescription}
            onChange={(e) => setFormData((d) => ({ ...d, taskDescription: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Work Location on Site</label>
          <input
            type="text"
            placeholder="e.g. East elevation, Level 3"
            value={formData.workLocation}
            onChange={(e) => setFormData((d) => ({ ...d, workLocation: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>

      {/* Required PPE */}
      <div>
        <label className={labelClass}>Required PPE</label>
        <input
          type="text"
          placeholder="e.g. Hard hat, harness, Hi-Vis vest, steel-toed boots"
          value={formData.requiredPPE}
          onChange={(e) => setFormData((d) => ({ ...d, requiredPPE: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Crew Members */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Crew Members</label>
          <button
            type="button"
            onClick={addCrew}
            className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-dark font-semibold"
          >
            <MaterialIcon icon="add" size="sm" />
            Add Row
          </button>
        </div>
        <div className="space-y-2">
          {formData.crewMembers.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Full name"
                value={c.name}
                onChange={(e) => updateCrew(c.id, "name", e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              <input
                type="text"
                placeholder="Role / trade"
                value={c.role}
                onChange={(e) => updateCrew(c.id, "role", e.target.value)}
                className="w-36 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              {formData.crewMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCrew(c.id)}
                  aria-label="Remove crew member"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <MaterialIcon icon="remove_circle_outline" size="sm" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* JHA Steps */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass}>Job Steps — Hazard Analysis</label>
          <button
            type="button"
            onClick={addStep}
            className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-dark font-semibold"
          >
            <MaterialIcon icon="add" size="sm" />
            Add Step
          </button>
        </div>

        {/* Header row */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-1 px-1">
          {["Step / Task Sequence", "Potential Hazard", "Control / Mitigation", ""].map((h) => (
            <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {formData.steps.map((s, idx) => (
            <div key={s.id} className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-start bg-gray-50 dark:bg-gray-800/60 rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div>
                <span className="sm:hidden text-xs font-semibold text-gray-500 uppercase">Step {idx + 1}</span>
                <textarea
                  rows={2}
                  placeholder="Describe the task step…"
                  value={s.step}
                  onChange={(e) => updateStep(s.id, "step", e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
                />
              </div>
              <div>
                <span className="sm:hidden text-xs font-semibold text-gray-500 uppercase">Hazard</span>
                <textarea
                  rows={2}
                  placeholder="What could go wrong?"
                  value={s.hazard}
                  onChange={(e) => updateStep(s.id, "hazard", e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
                />
              </div>
              <div>
                <span className="sm:hidden text-xs font-semibold text-gray-500 uppercase">Control</span>
                <textarea
                  rows={2}
                  placeholder="How will it be controlled?"
                  value={s.control}
                  onChange={(e) => updateStep(s.id, "control", e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
                />
              </div>
              {formData.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(s.id)}
                  aria-label="Remove step"
                  className="mt-1 sm:mt-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <MaterialIcon icon="remove_circle_outline" size="sm" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Supervisor sign-off */}
      <div>
        <label className={labelClass}>Supervisor Sign-off (initials)</label>
        <input
          type="text"
          placeholder="Initials confirming review with crew"
          value={formData.supervisorSignature}
          onChange={(e) => setFormData((d) => ({ ...d, supervisorSignature: e.target.value }))}
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
        className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
      >
        {submitting ? (
          <>
            <MaterialIcon icon="hourglass_empty" size="sm" />
            Submitting…
          </>
        ) : (
          <>
            <MaterialIcon icon="send" size="sm" />
            Submit JHA
          </>
        )}
      </button>
    </form>
  );
}
