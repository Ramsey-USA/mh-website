"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { COMPANY_INFO } from "@/lib/constants/company";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Submission {
  id: string;
  job_id: string;
  job_number: string;
  job_name: string;
  form_type:
    | "toolbox-talk"
    | "jha"
    | "site-safety-inspection"
    | "incident-report";
  submitted_by: string;
  data: unknown;
  print_count: number;
  status: string;
  created_at: string;
}

// ─── Render helpers ───────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 print:mb-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-1 mb-3 print:text-gray-600">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | null | undefined;
}) {
  return (
    <div className="mb-2">
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider leading-none mb-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-900">{value || "—"}</p>
    </div>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-3 gap-x-6 gap-y-2">{children}</div>;
}

// ─── Typed form data interfaces ───────────────────────────────────────────────

interface ToolboxTalkData {
  date?: string;
  conductedBy?: string;
  topic?: string;
  hazardsDiscussed?: string;
  safetyObservations?: string;
  actionItems?: string;
  attendees?: Array<{ name: string; signature: string }>;
}

interface JHAData {
  date?: string;
  supervisorName?: string;
  taskDescription?: string;
  workLocation?: string;
  requiredPPE?: string;
  supervisorSignature?: string;
  crewMembers?: Array<{ name: string; role: string }>;
  steps?: Array<{ step: string; hazard: string; control: string }>;
}

interface InspectionZoneItem {
  id: string;
  label: string;
  result: "pass" | "fail" | "na";
  notes: string;
}

interface SiteInspectionData {
  date?: string;
  inspectorName?: string;
  weatherConditions?: string;
  overallNotes?: string;
  zones?: Array<{ id: string; name: string; items: InspectionZoneItem[] }>;
}

interface IncidentReportData {
  date?: string;
  time?: string;
  reporterName?: string;
  incidentType?: string;
  location?: string;
  personInvolved?: string;
  injuryOccurred?: boolean;
  medicalAttentionRequired?: boolean;
  description?: string;
  immediateAction?: string;
  rootCause?: string;
  correctiveAction?: string;
  supervisorSignature?: string;
  witnesses?: Array<{ name: string; statement: string }>;
}

// ─── Form-specific renderers ──────────────────────────────────────────────────

function ToolboxTalkPrint({ data }: { data: Record<string, unknown> }) {
  const d = data as ToolboxTalkData;
  const attendees = d.attendees ?? [];
  return (
    <>
      <Section title="Meeting Details">
        <FieldGrid>
          <Field label="Date" value={d.date} />
          <Field label="Conducted By" value={d.conductedBy} />
          <Field label="Topic" value={d.topic} />
        </FieldGrid>
      </Section>
      {d.hazardsDiscussed && (
        <Section title="Hazards Discussed">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {d.hazardsDiscussed}
          </p>
        </Section>
      )}
      {d.safetyObservations && (
        <Section title="Safety Observations">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {d.safetyObservations}
          </p>
        </Section>
      )}
      {d.actionItems && (
        <Section title="Action Items">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {d.actionItems}
          </p>
        </Section>
      )}
      {attendees.length > 0 && (
        <Section title="Attendees">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200 w-1/2">
                  Name
                </th>
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Signature / Initials
                </th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((a, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-3 py-2 border border-gray-200">
                    {a.name || "—"}
                  </td>
                  <td className="px-3 py-2 border border-gray-200">
                    {a.signature || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}
    </>
  );
}

function JHAPrint({ data }: { data: Record<string, unknown> }) {
  const d = data as JHAData;
  const crew = d.crewMembers ?? [];
  const steps = d.steps ?? [];
  return (
    <>
      <Section title="Job Details">
        <FieldGrid>
          <Field label="Date" value={d.date} />
          <Field label="Supervisor" value={d.supervisorName} />
          <Field label="Task" value={d.taskDescription} />
          <Field label="Work Location" value={d.workLocation} />
          <Field label="Required PPE" value={d.requiredPPE} />
        </FieldGrid>
      </Section>
      {crew.length > 0 && (
        <Section title="Crew Members">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Name
                </th>
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Role / Trade
                </th>
              </tr>
            </thead>
            <tbody>
              {crew.map((c, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-3 py-2 border border-gray-200">
                    {c.name || "—"}
                  </td>
                  <td className="px-3 py-2 border border-gray-200">
                    {c.role || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}
      {steps.length > 0 && (
        <Section title="Hazard Analysis">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200 w-1/3">
                  Step / Task
                </th>
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200 w-1/3">
                  Potential Hazard
                </th>
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Control / Mitigation
                </th>
              </tr>
            </thead>
            <tbody>
              {steps.map((s, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-3 py-2 border border-gray-200 align-top">
                    {s.step || "—"}
                  </td>
                  <td className="px-3 py-2 border border-gray-200 align-top">
                    {s.hazard || "—"}
                  </td>
                  <td className="px-3 py-2 border border-gray-200 align-top">
                    {s.control || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}
      {d.supervisorSignature && (
        <Section title="Supervisor Sign-off">
          <p className="text-sm text-gray-800">{d.supervisorSignature}</p>
        </Section>
      )}
    </>
  );
}

function SiteInspectionPrint({ data }: { data: Record<string, unknown> }) {
  const d = data as SiteInspectionData;
  const zones = d.zones ?? [];

  const RESULT_STYLES: Record<string, string> = {
    pass: "text-green-700 font-bold",
    fail: "text-red-700 font-bold",
    na: "text-gray-500",
  };

  return (
    <>
      <Section title="Inspection Details">
        <FieldGrid>
          <Field label="Date" value={d.date} />
          <Field label="Inspector" value={d.inspectorName} />
          <Field label="Weather / Conditions" value={d.weatherConditions} />
        </FieldGrid>
      </Section>
      {zones.map((zone) => (
        <Section key={zone.id} title={zone.name}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Item
                </th>
                <th className="text-center px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200 w-16">
                  Result
                </th>
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200 w-1/3">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {zone.items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-3 py-2 border border-gray-200">
                    {item.label}
                  </td>
                  <td
                    className={`px-3 py-2 border border-gray-200 text-center uppercase text-xs ${RESULT_STYLES[item.result] ?? ""}`}
                  >
                    {item.result}
                  </td>
                  <td className="px-3 py-2 border border-gray-200 text-xs text-gray-600">
                    {item.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ))}
      {d.overallNotes && (
        <Section title="Overall Notes">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {d.overallNotes}
          </p>
        </Section>
      )}
    </>
  );
}

function IncidentReportPrint({ data }: { data: Record<string, unknown> }) {
  const d = data as IncidentReportData;
  const witnesses = d.witnesses ?? [];
  return (
    <>
      <Section title="Incident Details">
        <FieldGrid>
          <Field label="Date" value={d.date} />
          <Field label="Time" value={d.time} />
          <Field label="Reported By" value={d.reporterName} />
          <Field label="Incident Type" value={d.incidentType} />
          <Field label="Location" value={d.location} />
          <Field label="Person(s) Involved" value={d.personInvolved} />
        </FieldGrid>
        <div className="flex gap-4 mt-2 text-sm">
          <span>
            Injury occurred: <strong>{d.injuryOccurred ? "Yes" : "No"}</strong>
          </span>
          <span>
            Medical attention:{" "}
            <strong>{d.medicalAttentionRequired ? "Yes" : "No"}</strong>
          </span>
        </div>
      </Section>
      <Section title="Incident Description">
        <p className="text-sm text-gray-800 whitespace-pre-line">
          {d.description}
        </p>
      </Section>
      {d.immediateAction && (
        <Section title="Immediate Action Taken">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {d.immediateAction}
          </p>
        </Section>
      )}
      <Section title="Root Cause Analysis">
        <p className="text-sm text-gray-800 whitespace-pre-line">
          {d.rootCause}
        </p>
      </Section>
      {d.correctiveAction && (
        <Section title="Corrective Action Plan">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {d.correctiveAction}
          </p>
        </Section>
      )}
      {witnesses.length > 0 && (
        <Section title="Witnesses">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Name
                </th>
                <th className="text-left px-3 py-2 text-xs font-bold text-gray-600 border border-gray-200">
                  Statement
                </th>
              </tr>
            </thead>
            <tbody>
              {witnesses.map((w, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-3 py-2 border border-gray-200">
                    {w.name || "—"}
                  </td>
                  <td className="px-3 py-2 border border-gray-200">
                    {w.statement || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}
      {d.supervisorSignature && (
        <Section title="Supervisor Sign-off">
          <p className="text-sm text-gray-800">{d.supervisorSignature}</p>
        </Section>
      )}
    </>
  );
}

const FORM_LABELS: Record<string, string> = {
  "toolbox-talk": "Toolbox Talk",
  jha: "Job Hazard Analysis",
  "site-safety-inspection": "Site Safety Inspection",
  "incident-report": "Incident Report",
};

// ─── Default export ───────────────────────────────────────────────────────────

export default function PrintPageClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("field_auth_token");
    if (!token) {
      setError("Not authenticated. Please sign in to the Safety Hub first.");
      setLoading(false);
      return;
    }

    fetch(`/api/safety/forms/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Submission not found or access denied.");
        return r.json();
      })
      .then((json) => {
        const raw = json.data as Submission & { data: string | unknown };
        // data is stored as JSON string in D1
        const parsedData =
          typeof raw.data === "string"
            ? (JSON.parse(raw.data) as unknown)
            : raw.data;
        setSubmission({ ...raw, data: parsedData });
      })
      .catch((err: unknown) => {
        setError((err as Error).message ?? "Failed to load submission.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <MaterialIcon
          icon="hourglass_empty"
          size="xl"
          className="animate-pulse"
        />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-6">
        <MaterialIcon icon="error_outline" size="xl" className="text-red-400" />
        <p className="text-gray-700 font-semibold">
          {error ?? "Submission not found."}
        </p>
        <a
          href="/safety/hub"
          className="text-brand-primary hover:underline text-sm"
        >
          Return to Safety Hub
        </a>
      </div>
    );
  }

  const formLabel = FORM_LABELS[submission.form_type] ?? submission.form_type;
  const submittedDate = new Date(submission.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <>
      {/* Print toolbar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <a
            href="/safety/hub"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            Back to Hub
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors"
          >
            <MaterialIcon icon="print" size="sm" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Printable document */}
      <div className="max-w-3xl mx-auto px-6 py-8 print:p-0 print:max-w-none">
        {/* MH Letterhead */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-800 print:border-gray-900">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/icon-96x96.png"
              alt="MH Construction"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <p className="font-black text-lg text-gray-900 leading-none">
                MH Construction
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Safety Management System
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-black text-gray-900">{formLabel}</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Submitted {submittedDate} by {submission.submitted_by}
            </p>
            <p className="text-xs text-gray-500">
              Job: {submission.job_number} — {submission.job_name}
            </p>
            <p className="text-xs text-gray-400 font-mono mt-1">
              ID: {submission.id}
            </p>
          </div>
        </div>

        {/* Form-specific content */}
        {submission.form_type === "toolbox-talk" && (
          <ToolboxTalkPrint data={submission.data as Record<string, unknown>} />
        )}
        {submission.form_type === "jha" && (
          <JHAPrint data={submission.data as Record<string, unknown>} />
        )}
        {submission.form_type === "site-safety-inspection" && (
          <SiteInspectionPrint
            data={submission.data as Record<string, unknown>}
          />
        )}
        {submission.form_type === "incident-report" && (
          <IncidentReportPrint
            data={submission.data as Record<string, unknown>}
          />
        )}

        {/* Footer with credentials */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              <span className="font-semibold text-gray-600">
                MH Construction, Inc.
              </span>
              <span className="mx-2">|</span>
              <span>(509) 308-6489</span>
              <span className="mx-2">·</span>
              <span>www.mhc-gc.com</span>
            </div>
            <div className="flex items-center gap-3">
              {/* BBB Seal */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.bbb.sealHorizontal}
                alt="BBB Accredited A+"
                className="h-6 w-auto print:h-5"
              />
              {/* AGC Logo */}
              <Image
                src="/images/logo/agc-member.png"
                alt="AGC Member"
                width={60}
                height={24}
                className="h-6 w-auto print:h-5"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>WA: MHCONCI907R7 · OR: 765043-99 · ID: RCE-49250</span>
            <span>Printed {new Date().toLocaleDateString("en-US")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
