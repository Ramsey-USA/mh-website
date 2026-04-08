"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface Attendee {
  id: string;
  name: string;
  signature: string;
}

interface ToolboxTalkData {
  date: string;
  conductedBy: string;
  topic: string;
  hazardsDiscussed: string;
  safetyObservations: string;
  actionItems: string;
  attendees: Attendee[];
}

interface Props {
  superintendentName: string;
  jobId: string;
  jobLabel: string;
  token: string;
  onSubmitSuccess: (submissionId: string) => void;
}

export function ToolboxTalkForm({
  superintendentName,
  jobId,
  jobLabel,
  token,
  onSubmitSuccess,
}: Props) {
  const today = new Date().toISOString().split("T")[0] ?? "";

  const [formData, setFormData] = useState<ToolboxTalkData>({
    date: today,
    conductedBy: superintendentName,
    topic: "",
    hazardsDiscussed: "",
    safetyObservations: "",
    actionItems: "",
    attendees: [{ id: crypto.randomUUID(), name: "", signature: "" }],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAttendee = () =>
    setFormData((d) => ({
      ...d,
      attendees: [...d.attendees, { id: crypto.randomUUID(), name: "", signature: "" }],
    }));

  const removeAttendee = (id: string) =>
    setFormData((d) => ({
      ...d,
      attendees: d.attendees.filter((a) => a.id !== id),
    }));

  const updateAttendee = (id: string, field: "name" | "signature", value: string) =>
    setFormData((d) => ({
      ...d,
      attendees: d.attendees.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.date || !formData.topic.trim()) {
      setError("Date and topic are required.");
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
          form_type: "toolbox-talk",
          data: formData,
        }),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Meta row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData((d) => ({ ...d, date: e.target.value }))}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
            Job
          </label>
          <input
            type="text"
            readOnly
            value={jobLabel}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
            Conducted By
          </label>
          <input
            type="text"
            value={formData.conductedBy}
            onChange={(e) => setFormData((d) => ({ ...d, conductedBy: e.target.value }))}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          Safety Topic / Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Fall Protection — Ladder Safety Review"
          value={formData.topic}
          onChange={(e) => setFormData((d) => ({ ...d, topic: e.target.value }))}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        />
      </div>

      {/* Hazards */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          Hazards Discussed
        </label>
        <textarea
          rows={3}
          placeholder="List specific hazards reviewed during this meeting…"
          value={formData.hazardsDiscussed}
          onChange={(e) => setFormData((d) => ({ ...d, hazardsDiscussed: e.target.value }))}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
        />
      </div>

      {/* Safety observations */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          Safety Observations
        </label>
        <textarea
          rows={3}
          placeholder="Note any positive observations or areas for improvement…"
          value={formData.safetyObservations}
          onChange={(e) => setFormData((d) => ({ ...d, safetyObservations: e.target.value }))}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
        />
      </div>

      {/* Action items */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          Action Items / Follow-ups
        </label>
        <textarea
          rows={2}
          placeholder="List any corrective actions or follow-up tasks assigned…"
          value={formData.actionItems}
          onChange={(e) => setFormData((d) => ({ ...d, actionItems: e.target.value }))}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
        />
      </div>

      {/* Attendees */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Attendees
          </label>
          <button
            type="button"
            onClick={addAttendee}
            className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-dark font-semibold"
          >
            <MaterialIcon icon="add" size="sm" />
            Add Row
          </button>
        </div>
        <div className="space-y-2">
          {formData.attendees.map((a) => (
            <div key={a.id} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Full name"
                value={a.name}
                onChange={(e) => updateAttendee(a.id, "name", e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              <input
                type="text"
                placeholder="Initials / signature"
                value={a.signature}
                onChange={(e) => updateAttendee(a.id, "signature", e.target.value)}
                className="w-32 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              {formData.attendees.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAttendee(a.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove attendee"
                >
                  <MaterialIcon icon="remove_circle_outline" size="sm" />
                </button>
              )}
            </div>
          ))}
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
            Submit Toolbox Talk
          </>
        )}
      </button>
    </form>
  );
}
