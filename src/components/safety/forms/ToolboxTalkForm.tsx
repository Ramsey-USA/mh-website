"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useLocale } from "@/hooks/useLocale";

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
  readonly superintendentName: string;
  readonly jobId: string;
  readonly jobLabel: string;
  readonly token: string;
  readonly onSubmitSuccess: (submissionId: string) => void;
}

const COPY = {
  en: {
    date: "Date",
    job: "Job",
    conductedBy: "Conducted By",
    safetyTopic: "Safety Topic / Subject",
    safetyTopicPlaceholder: "e.g. Fall Protection - Ladder Safety Review",
    hazardsDiscussed: "Hazards Discussed",
    hazardsPlaceholder: "List specific hazards reviewed during this meeting...",
    safetyObservations: "Safety Observations",
    observationsPlaceholder:
      "Note any positive observations or areas for improvement...",
    actionItems: "Action Items / Follow-ups",
    actionItemsPlaceholder:
      "List any corrective actions or follow-up tasks assigned...",
    attendees: "Attendees",
    addRow: "Add Row",
    fullName: "Full name",
    initialsOrSignature: "Initials / signature",
    removeAttendee: "Remove attendee",
    submitting: "Submitting...",
    submit: "Submit Toolbox Talk",
    requiredDateTopic: "Date and topic are required.",
    submitFailedShort: "Submit failed",
    submitFailedRetry: "Submit failed. Try again.",
  },
  es: {
    date: "Fecha",
    job: "Obra",
    conductedBy: "Dirigido por",
    safetyTopic: "Tema de seguridad",
    safetyTopicPlaceholder:
      "Ej. Proteccion contra caidas - revision de seguridad en escaleras",
    hazardsDiscussed: "Peligros discutidos",
    hazardsPlaceholder:
      "Liste los peligros especificos revisados durante esta reunion...",
    safetyObservations: "Observaciones de seguridad",
    observationsPlaceholder:
      "Anote observaciones positivas o areas de mejora...",
    actionItems: "Acciones / Seguimiento",
    actionItemsPlaceholder:
      "Liste acciones correctivas o tareas de seguimiento asignadas...",
    attendees: "Asistentes",
    addRow: "Agregar fila",
    fullName: "Nombre completo",
    initialsOrSignature: "Iniciales / firma",
    removeAttendee: "Eliminar asistente",
    submitting: "Enviando...",
    submit: "Enviar charla de seguridad",
    requiredDateTopic: "La fecha y el tema son obligatorios.",
    submitFailedShort: "Error al enviar",
    submitFailedRetry: "Error al enviar. Intente de nuevo.",
  },
} as const;

export function ToolboxTalkForm({
  superintendentName,
  jobId,
  jobLabel,
  token,
  onSubmitSuccess,
}: Props) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = isEs ? COPY.es : COPY.en;
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
      attendees: [
        ...d.attendees,
        { id: crypto.randomUUID(), name: "", signature: "" },
      ],
    }));

  const removeAttendee = (id: string) =>
    setFormData((d) => ({
      ...d,
      attendees: d.attendees.filter((a) => a.id !== id),
    }));

  const updateAttendee = (
    id: string,
    field: "name" | "signature",
    value: string,
  ) =>
    setFormData((d) => ({
      ...d,
      attendees: d.attendees.map((a) =>
        a.id === id ? { ...a, [field]: value } : a,
      ),
    }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.date || !formData.topic.trim()) {
      setError(t.requiredDateTopic);
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
      if (!res.ok) {
        throw new Error(json.error ?? t.submitFailedShort);
      }

      onSubmitSuccess(json.data.id as string);
    } catch (err) {
      const fallbackError = t.submitFailedRetry;
      setError(err instanceof Error ? err.message : fallbackError);
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
            {t.date} <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) =>
              setFormData((d) => ({ ...d, date: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
            {t.job}
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
            {t.conductedBy}
          </label>
          <input
            type="text"
            value={formData.conductedBy}
            onChange={(e) =>
              setFormData((d) => ({ ...d, conductedBy: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          {t.safetyTopic} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder={t.safetyTopicPlaceholder}
          value={formData.topic}
          onChange={(e) =>
            setFormData((d) => ({ ...d, topic: e.target.value }))
          }
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        />
      </div>

      {/* Hazards */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          {t.hazardsDiscussed}
        </label>
        <textarea
          rows={3}
          placeholder={t.hazardsPlaceholder}
          value={formData.hazardsDiscussed}
          onChange={(e) =>
            setFormData((d) => ({ ...d, hazardsDiscussed: e.target.value }))
          }
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
        />
      </div>

      {/* Safety observations */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          {t.safetyObservations}
        </label>
        <textarea
          rows={3}
          placeholder={t.observationsPlaceholder}
          value={formData.safetyObservations}
          onChange={(e) =>
            setFormData((d) => ({ ...d, safetyObservations: e.target.value }))
          }
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
        />
      </div>

      {/* Action items */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
          {t.actionItems}
        </label>
        <textarea
          rows={2}
          placeholder={t.actionItemsPlaceholder}
          value={formData.actionItems}
          onChange={(e) =>
            setFormData((d) => ({ ...d, actionItems: e.target.value }))
          }
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none"
        />
      </div>

      {/* Attendees */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {t.attendees}
          </p>
          <button
            type="button"
            onClick={addAttendee}
            className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-dark font-semibold"
          >
            <MaterialIcon icon="add" size="sm" />
            {t.addRow}
          </button>
        </div>
        <div className="space-y-2">
          {formData.attendees.map((a) => (
            <div key={a.id} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={t.fullName}
                value={a.name}
                onChange={(e) => updateAttendee(a.id, "name", e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              <input
                type="text"
                placeholder={t.initialsOrSignature}
                value={a.signature}
                onChange={(e) =>
                  updateAttendee(a.id, "signature", e.target.value)
                }
                className="w-32 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              {formData.attendees.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAttendee(a.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={t.removeAttendee}
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
            {t.submitting}
          </>
        ) : (
          <>
            <MaterialIcon icon="send" size="sm" />
            {t.submit}
          </>
        )}
      </button>
    </form>
  );
}
