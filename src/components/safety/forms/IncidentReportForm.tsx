"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useLocale } from "@/hooks/useLocale";

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
  readonly superintendentName: string;
  readonly jobId: string;
  readonly jobLabel: string;
  readonly token: string;
  readonly onSubmitSuccess: (submissionId: string) => void;
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

const COPY = {
  en: {
    emergencyPrefix: "For life-threatening emergencies, call",
    emergencySuffix:
      "immediately. Notify your PM and safety officer as soon as safe to do so.",
    date: "Date",
    time: "Time",
    job: "Job",
    reportedBy: "Reported By",
    incidentType: "Incident Type",
    selectType: "- Select type -",
    locationOnSite: "Location on Site",
    locationPlaceholder: "e.g. Main entry, East elevation Level 2",
    personsInvolved: "Person(s) Involved",
    personInvolvedPlaceholder: "Full name and trade / role",
    injuryOccurred: "Injury occurred",
    medicalAttentionRequired: "Medical attention required",
    incidentDescription: "Incident Description",
    incidentDescriptionPlaceholder:
      "Describe exactly what happened - include sequence of events, equipment involved, and conditions at the time of the incident...",
    immediateAction: "Immediate Action Taken",
    immediateActionPlaceholder:
      "What was done immediately to respond to and contain the incident?",
    rootCause: "Root Cause Analysis",
    rootCausePlaceholder:
      "Identify the underlying root cause(s) - not just the immediate cause. Ask 'why' until you find the systemic issue.",
    correctiveAction: "Corrective Action Plan",
    correctiveActionPlaceholder:
      "What changes will be made to prevent recurrence? Who is responsible and by when?",
    witnesses: "Witnesses",
    addWitness: "Add Witness",
    noWitnesses: "No witnesses added.",
    witnessName: "Witness name",
    witnessStatement: "Brief statement",
    removeWitness: "Remove witness",
    supervisorSignoff: "Supervisor Sign-off (initials)",
    supervisorSignoffPlaceholder: "Initials confirming report accuracy",
    submitting: "Submitting...",
    submit: "Submit Incident Report",
    descriptionRequired: "Incident description is required.",
    rootCauseRequired: "Root cause analysis is required.",
    submitFailedShort: "Submit failed",
    submitFailedRetry: "Submit failed. Try again.",
  },
  es: {
    emergencyPrefix: "En emergencias que ponen en riesgo la vida, llame al",
    emergencySuffix:
      "de inmediato. Notifique a su PM y al oficial de seguridad tan pronto sea seguro hacerlo.",
    date: "Fecha",
    time: "Hora",
    job: "Obra",
    reportedBy: "Reportado por",
    incidentType: "Tipo de incidente",
    selectType: "- Seleccione tipo -",
    locationOnSite: "Ubicacion en obra",
    locationPlaceholder: "Ej. Acceso principal, elevacion este nivel 2",
    personsInvolved: "Persona(s) involucrada(s)",
    personInvolvedPlaceholder: "Nombre completo y oficio / rol",
    injuryOccurred: "Hubo lesion",
    medicalAttentionRequired: "Se requiere atencion medica",
    incidentDescription: "Descripcion del incidente",
    incidentDescriptionPlaceholder:
      "Describa exactamente lo ocurrido: secuencia de eventos, equipo involucrado y condiciones al momento del incidente...",
    immediateAction: "Accion inmediata tomada",
    immediateActionPlaceholder:
      "Que se hizo de inmediato para responder y contener el incidente?",
    rootCause: "Analisis de causa raiz",
    rootCausePlaceholder:
      "Identifique la(s) causa(s) raiz subyacente(s), no solo la causa inmediata. Pregunte 'por que' hasta llegar al problema sistemico.",
    correctiveAction: "Plan de accion correctiva",
    correctiveActionPlaceholder:
      "Que cambios se haran para evitar recurrencia? Quien es responsable y para cuando?",
    witnesses: "Testigos",
    addWitness: "Agregar testigo",
    noWitnesses: "No se agregaron testigos.",
    witnessName: "Nombre del testigo",
    witnessStatement: "Declaracion breve",
    removeWitness: "Eliminar testigo",
    supervisorSignoff: "Firma del supervisor (iniciales)",
    supervisorSignoffPlaceholder:
      "Iniciales que confirman la exactitud del reporte",
    submitting: "Enviando...",
    submit: "Enviar reporte de incidente",
    descriptionRequired: "La descripcion del incidente es obligatoria.",
    rootCauseRequired: "El analisis de causa raiz es obligatorio.",
    submitFailedShort: "Error al enviar",
    submitFailedRetry: "Error al enviar. Intente de nuevo.",
  },
} as const;

export function IncidentReportForm({
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.description.trim()) {
      setError(t.descriptionRequired);
      return;
    }
    if (!formData.rootCause.trim()) {
      setError(t.rootCauseRequired);
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
          {t.emergencyPrefix} <strong>911</strong> {t.emergencySuffix}
        </p>
      </div>

      {/* Meta row */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>
            {t.date} <span className="text-red-500">*</span>
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
          <label className={labelClass}>{t.time}</label>
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
          <label className={labelClass}>{t.job}</label>
          <input
            type="text"
            readOnly
            value={jobLabel}
            className={`${inputClass} bg-gray-50 dark:bg-gray-700`}
          />
        </div>
        <div>
          <label className={labelClass}>{t.reportedBy}</label>
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
          <label className={labelClass}>{t.incidentType}</label>
          <select
            value={formData.incidentType}
            onChange={(e) =>
              setFormData((d) => ({ ...d, incidentType: e.target.value }))
            }
            className={inputClass}
          >
            <option value="">{t.selectType}</option>
            {INCIDENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.locationOnSite}</label>
          <input
            type="text"
            placeholder={t.locationPlaceholder}
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
        <label className={labelClass}>{t.personsInvolved}</label>
        <input
          type="text"
          placeholder={t.personInvolvedPlaceholder}
          value={formData.personInvolved}
          onChange={(e) =>
            setFormData((d) => ({ ...d, personInvolved: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div className="flex gap-6">
        {[
          {
            field: "injuryOccurred" as const,
            label: t.injuryOccurred,
          },
          {
            field: "medicalAttentionRequired" as const,
            label: t.medicalAttentionRequired,
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
          {t.incidentDescription} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder={t.incidentDescriptionPlaceholder}
          value={formData.description}
          onChange={(e) =>
            setFormData((d) => ({ ...d, description: e.target.value }))
          }
          className={textareaClass}
        />
      </div>

      {/* Immediate action */}
      <div>
        <label className={labelClass}>{t.immediateAction}</label>
        <textarea
          rows={2}
          placeholder={t.immediateActionPlaceholder}
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
          {t.rootCause} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          placeholder={t.rootCausePlaceholder}
          value={formData.rootCause}
          onChange={(e) =>
            setFormData((d) => ({ ...d, rootCause: e.target.value }))
          }
          className={textareaClass}
        />
      </div>

      {/* Corrective action */}
      <div>
        <label className={labelClass}>{t.correctiveAction}</label>
        <textarea
          rows={3}
          placeholder={t.correctiveActionPlaceholder}
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
          <p className={labelClass}>{t.witnesses}</p>
          <button
            type="button"
            onClick={addWitness}
            className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-dark font-semibold"
          >
            <MaterialIcon icon="add" size="sm" />
            {t.addWitness}
          </button>
        </div>
        {formData.witnesses.length === 0 && (
          <p className="text-sm text-gray-400 italic">{t.noWitnesses}</p>
        )}
        <div className="space-y-3">
          {formData.witnesses.map((w) => (
            <div key={w.id} className="flex items-start gap-2">
              <div className="grid sm:grid-cols-2 gap-2 flex-1">
                <input
                  type="text"
                  placeholder={t.witnessName}
                  value={w.name}
                  onChange={(e) => updateWitness(w.id, "name", e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />
                <input
                  type="text"
                  placeholder={t.witnessStatement}
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
                aria-label={t.removeWitness}
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
        <label htmlFor="incident-supervisor-signoff" className={labelClass}>
          {t.supervisorSignoff}
        </label>
        <input
          id="incident-supervisor-signoff"
          type="text"
          placeholder={t.supervisorSignoffPlaceholder}
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
