"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useLocale } from "@/hooks/useLocale";

type InspectionResult = "pass" | "fail" | "na";

interface CheckItem {
  id: string;
  label: string;
  result: InspectionResult;
  notes: string;
}

interface InspectionZone {
  id: string;
  name: string;
  items: CheckItem[];
}

function makeItem(label: string): CheckItem {
  return { id: crypto.randomUUID(), label, result: "na", notes: "" };
}

function buildDefaultZones(): InspectionZone[] {
  return [
    {
      id: crypto.randomUUID(),
      name: "Housekeeping & General Site",
      items: [
        makeItem("Walkways clear of debris and trip hazards"),
        makeItem("Materials stacked and stored properly"),
        makeItem("Waste disposal areas maintained"),
        makeItem("Emergency exits accessible and unobstructed"),
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "PPE — Personal Protective Equipment",
      items: [
        makeItem("Hard hats worn by all personnel"),
        makeItem("Hi-Vis vests / safety apparel in use"),
        makeItem("Eye protection available and worn where required"),
        makeItem("Hearing protection available where required"),
        makeItem("Foot protection (steel-toed) in use"),
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "Electrical Safety",
      items: [
        makeItem("Temporary power/cords in good condition (no fraying)"),
        makeItem("GFCIs in use on all temporary power"),
        makeItem(
          "Lockout/Tagout procedures followed for de-energized equipment",
        ),
        makeItem("Overhead power line safe distances maintained"),
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "Fall Protection",
      items: [
        makeItem("Guardrails installed at all open-sided edges ≥6 ft"),
        makeItem("Personal fall arrest systems in use where required"),
        makeItem("Harnesses and lanyards inspected and in good condition"),
        makeItem("Ladders secured and set at correct angle (4:1)"),
        makeItem("Scaffold inspected by a competent person"),
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "Equipment & Tools",
      items: [
        makeItem("Heavy equipment pre-use inspection completed"),
        makeItem("Hand and power tools in safe operating condition"),
        makeItem("Rigging and lifting gear inspected before use"),
        makeItem("Equipment operators qualified and authorized"),
      ],
    },
  ];
}

interface SiteInspectionData {
  date: string;
  inspectorName: string;
  weatherConditions: string;
  overallNotes: string;
  zones: InspectionZone[];
}

interface Props {
  superintendentName: string;
  jobId: string;
  jobLabel: string;
  token: string;
  onSubmitSuccess: (submissionId: string) => void;
}

const RESULT_LABELS: Record<InspectionResult, string> = {
  pass: "Pass",
  fail: "Fail",
  na: "N/A",
};

const RESULT_COLORS: Record<InspectionResult, string> = {
  pass: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 ring-green-400",
  fail: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 ring-red-400",
  na: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 ring-gray-400",
};

export function SiteInspectionForm({
  superintendentName,
  jobId,
  jobLabel,
  token,
  onSubmitSuccess,
}: Props) {
  const locale = useLocale();
  const isEs = locale === "es";
  const today = new Date().toISOString().split("T")[0] ?? "";

  const [formData, setFormData] = useState<SiteInspectionData>({
    date: today,
    inspectorName: superintendentName,
    weatherConditions: "",
    overallNotes: "",
    zones: buildDefaultZones(),
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setItemResult = (
    zoneId: string,
    itemId: string,
    result: InspectionResult,
  ) =>
    setFormData((d) => ({
      ...d,
      zones: d.zones.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              items: z.items.map((it) =>
                it.id === itemId ? { ...it, result } : it,
              ),
            }
          : z,
      ),
    }));

  const setItemNotes = (zoneId: string, itemId: string, notes: string) =>
    setFormData((d) => ({
      ...d,
      zones: d.zones.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              items: z.items.map((it) =>
                it.id === itemId ? { ...it, notes } : it,
              ),
            }
          : z,
      ),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
          form_type: "site-safety-inspection",
          data: formData,
        }),
      });
      const json = await res.json();
      if (!res.ok)
        throw new Error(
          json.error ?? (isEs ? "Error al enviar" : "Submit failed"),
        );
      onSubmitSuccess(json.data.id as string);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEs
            ? "Error al enviar. Intente de nuevo."
            : "Submit failed. Try again.",
      );
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
            {isEs ? "Fecha de inspección" : "Inspection Date"}{" "}
            <span className="text-red-500">*</span>
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
          <label className={labelClass}>{isEs ? "Obra" : "Job"}</label>
          <input
            type="text"
            readOnly
            value={jobLabel}
            className={`${inputClass} bg-gray-50 dark:bg-gray-700`}
          />
        </div>
        <div>
          <label className={labelClass}>
            {isEs ? "Inspector" : "Inspector"}
          </label>
          <input
            type="text"
            value={formData.inspectorName}
            onChange={(e) =>
              setFormData((d) => ({ ...d, inspectorName: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          {isEs ? "Clima / condiciones del sitio" : "Weather / Site Conditions"}
        </label>
        <input
          type="text"
          placeholder={
            isEs
              ? "Ej. Despejado, 22°C; terreno húmedo en esquina noroeste"
              : "e.g. Clear, 72°F; wet ground in NW corner"
          }
          value={formData.weatherConditions}
          onChange={(e) =>
            setFormData((d) => ({ ...d, weatherConditions: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      {/* Checklist zones */}
      {formData.zones.map((zone) => {
        const failCount = zone.items.filter(
          (it) => it.result === "fail",
        ).length;
        return (
          <div
            key={zone.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                {zone.name}
              </h4>
              {failCount > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                  <MaterialIcon icon="warning" size="sm" />
                  {isEs
                    ? `${failCount} falla${failCount > 1 ? "s" : ""}`
                    : `${failCount} fail${failCount > 1 ? "s" : ""}`}
                </span>
              )}
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {zone.items.map((item) => (
                <div key={item.id} className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 pt-0.5">
                      {item.label}
                    </p>
                    <div className="flex gap-1 shrink-0">
                      {(["pass", "fail", "na"] as InspectionResult[]).map(
                        (r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setItemResult(zone.id, item.id, r)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ring-1 ring-inset ${
                              item.result === r
                                ? RESULT_COLORS[r]
                                : "ring-gray-200 dark:ring-gray-700 text-gray-400 hover:ring-gray-400"
                            }`}
                          >
                            {isEs
                              ? r === "pass"
                                ? "Pasa"
                                : r === "fail"
                                  ? "Falla"
                                  : "N/A"
                              : RESULT_LABELS[r]}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                  {item.result === "fail" && (
                    <div className="mt-2 pl-0">
                      <input
                        type="text"
                        placeholder={
                          isEs
                            ? "Describa el problema y la acción correctiva requerida…"
                            : "Describe the issue and corrective action required…"
                        }
                        value={item.notes}
                        onChange={(e) =>
                          setItemNotes(zone.id, item.id, e.target.value)
                        }
                        className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Overall notes */}
      <div>
        <label className={labelClass}>
          {isEs ? "Notas generales de inspección" : "Overall Inspection Notes"}
        </label>
        <textarea
          rows={3}
          placeholder={
            isEs
              ? "Observaciones adicionales, reconocimientos o requerimientos de seguimiento…"
              : "Any additional observations, commendations, or follow-up requirements…"
          }
          value={formData.overallNotes}
          onChange={(e) =>
            setFormData((d) => ({ ...d, overallNotes: e.target.value }))
          }
          className={`${inputClass} resize-none`}
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
            {isEs ? "Enviando…" : "Submitting…"}
          </>
        ) : (
          <>
            <MaterialIcon icon="send" size="sm" />
            {isEs ? "Enviar inspección" : "Submit Inspection"}
          </>
        )}
      </button>
    </form>
  );
}
