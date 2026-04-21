"use client";

import { type ReactNode, useState, useCallback } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EvaluationCriterion {
  title: string;
  weight: string;
}

interface ExhibitConfig {
  id: string;
  label: string;
  description: string;
  file: string;
  enabled: boolean;
}

interface RfqConfig {
  projectName: string;
  issuingOrg: string;
  rfqNumber: string;
  dueDate: string;
  submissionDate: string;
  recipientName: string;
  recipientTitle: string;
  recipientEmail: string;
  evaluationCriteria: EvaluationCriterion[];
  sections: string[];
  exhibits: Omit<ExhibitConfig, "enabled">[];
  additionalNotes: string;
}

type WizardStep =
  | "rfq-info"
  | "eval-criteria"
  | "sections"
  | "exhibits"
  | "review";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_SECTIONS = [
  {
    id: "company-overview",
    label: "Company Overview",
    description: "Company history, ownership, service area, core capabilities",
    required: true,
  },
  {
    id: "scope",
    label: "Understanding of Scope",
    description: "Scope acknowledgment, consultation-first statement",
    required: false,
  },
  {
    id: "experience",
    label: "Relevant Experience & Portfolio",
    description: "Representative project types, references, portfolio link",
    required: false,
  },
  {
    id: "personnel",
    label: "Key Personnel",
    description: "Jeremy Thamert PM intro, team structure",
    required: false,
  },
  {
    id: "safety",
    label: "Safety Program",
    description: "MISH program overview, OSHA compliance, EMR, safety hub link",
    required: false,
  },
  {
    id: "accreditations",
    label: "Accreditations & Certifications",
    description: "BBB A+, AGC, Veteran-Owned, licenses, insurance",
    required: false,
  },
  {
    id: "consultation",
    label: "Consultation Commitment",
    description: "No-estimate pledge, next steps, slogan, contact CTA",
    required: true,
  },
];

const DEFAULT_EXHIBITS: ExhibitConfig[] = [
  {
    id: "A",
    label: "Safety Program: Table of Contents",
    description:
      "MH Construction Industrial Safety and Health Program (MISH) — Table of Contents with all 50 sections",
    file: "safety-manual-toc.pdf",
    enabled: false,
  },
  {
    id: "B",
    label: "Site Compliance Photos",
    description:
      "Recent jobsite safety compliance documentation and site photos",
    file: "site-compliance-photos.pdf",
    enabled: false,
  },
  {
    id: "C",
    label: "Previous Project Photos",
    description: "Representative photos from completed projects",
    file: "project-photos.pdf",
    enabled: false,
  },
  {
    id: "D",
    label: "Certificates & Licenses",
    description:
      "Copies of contractor licenses (WA/OR/ID), BBB certificate, insurance certificates",
    file: "certificates-licenses.pdf",
    enabled: false,
  },
  {
    id: "E",
    label: "Other Documentation",
    description: "",
    file: "",
    enabled: false,
  },
];

const STEPS: { id: WizardStep; label: string; icon: string }[] = [
  { id: "rfq-info", label: "RFQ Info", icon: "assignment" },
  { id: "eval-criteria", label: "Eval. Criteria", icon: "checklist" },
  { id: "sections", label: "Sections", icon: "article" },
  { id: "exhibits", label: "Exhibits", icon: "folder_open" },
  { id: "review", label: "Review & Export", icon: "download" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function RfqTab({ token: _token }: { token: string }) {
  const [step, setStep] = useState<WizardStep>("rfq-info");

  // Step 1 — RFQ info
  const [projectName, setProjectName] = useState("");
  const [issuingOrg, setIssuingOrg] = useState("");
  const [rfqNumber, setRfqNumber] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submissionDate, setSubmissionDate] = useState(
    new Date().toLocaleDateString("en-US"),
  );
  const [recipientName, setRecipientName] = useState("");
  const [recipientTitle, setRecipientTitle] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  // Step 2 — Evaluation criteria
  const [hasEvalCriteria, setHasEvalCriteria] = useState(true);
  const [evalCriteria, setEvalCriteria] = useState<EvaluationCriterion[]>([
    { title: "", weight: "" },
  ]);

  // Step 3 — Sections
  const [selectedSections, setSelectedSections] = useState<string[]>(
    ALL_SECTIONS.filter((s) => s.required).map((s) => s.id),
  );

  // Step 4 — Exhibits
  const [exhibits, setExhibits] = useState<ExhibitConfig[]>(DEFAULT_EXHIBITS);
  const [exhibitNotes, setExhibitNotes] = useState("");

  // Step 5 — Review
  const [exported, setExported] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const addCriterion = useCallback(() => {
    setEvalCriteria((prev) => [...prev, { title: "", weight: "" }]);
  }, []);

  const removeCriterion = useCallback((idx: number) => {
    setEvalCriteria((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const updateCriterion = useCallback(
    (idx: number, field: keyof EvaluationCriterion, value: string) => {
      setEvalCriteria((prev) =>
        prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c)),
      );
    },
    [],
  );

  const toggleSection = useCallback((id: string, required: boolean) => {
    if (required) return;
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }, []);

  const toggleExhibit = useCallback((idx: number) => {
    setExhibits((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, enabled: !e.enabled } : e)),
    );
  }, []);

  const updateExhibit = useCallback(
    (
      idx: number,
      field: keyof Omit<ExhibitConfig, "enabled">,
      value: string,
    ) => {
      setExhibits((prev) =>
        prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e)),
      );
    },
    [],
  );

  const buildConfig = useCallback((): RfqConfig => {
    return {
      projectName,
      issuingOrg,
      rfqNumber,
      dueDate,
      submissionDate,
      recipientName,
      recipientTitle,
      recipientEmail,
      evaluationCriteria: hasEvalCriteria
        ? evalCriteria.filter((c) => c.title.trim())
        : [],
      sections: selectedSections,
      exhibits: exhibits
        .filter((e) => e.enabled)
        .map(({ enabled: _enabled, ...rest }) => rest),
      additionalNotes: exhibitNotes,
    };
  }, [
    projectName,
    issuingOrg,
    rfqNumber,
    dueDate,
    submissionDate,
    recipientName,
    recipientTitle,
    recipientEmail,
    hasEvalCriteria,
    evalCriteria,
    selectedSections,
    exhibits,
    exhibitNotes,
  ]);

  const downloadConfig = useCallback(() => {
    const config = buildConfig();
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug = (config.projectName || config.rfqNumber || "rfq")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    a.href = url;
    a.download = `rfq-params-${slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  }, [buildConfig]);

  // ── Step navigation ───────────────────────────────────────────────────────────

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const canProceed = (): boolean => {
    if (step === "rfq-info") {
      return (
        projectName.trim().length > 0 &&
        issuingOrg.trim().length > 0 &&
        rfqNumber.trim().length > 0
      );
    }
    return true;
  };

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStep(STEPS[stepIndex + 1]!.id);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStep(STEPS[stepIndex - 1]!.id);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-brand-primary/20 p-3 rounded-xl border border-brand-primary/40">
          <MaterialIcon
            icon="description"
            size="lg"
            className="text-brand-secondary"
          />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wide">
            RFQ Package Builder
          </h2>
          <p className="text-sm text-gray-400">
            Build a complete qualification package — PDF + cover email
          </p>
        </div>
      </div>

      {/* Step progress bar */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
        <div className="flex gap-1">
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                s.id === step
                  ? "bg-brand-primary text-white"
                  : idx < stepIndex
                    ? "bg-green-900/50 text-green-300 border border-green-700"
                    : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <MaterialIcon icon={s.icon} size="sm" />
              <span className="hidden sm:inline">{s.label}</span>
              {idx < stepIndex && (
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-green-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
        {step === "rfq-info" && (
          <RfqInfoStep
            {...{
              projectName,
              setProjectName,
              issuingOrg,
              setIssuingOrg,
              rfqNumber,
              setRfqNumber,
              dueDate,
              setDueDate,
              submissionDate,
              setSubmissionDate,
              recipientName,
              setRecipientName,
              recipientTitle,
              setRecipientTitle,
              recipientEmail,
              setRecipientEmail,
            }}
          />
        )}
        {step === "eval-criteria" && (
          <EvalCriteriaStep
            hasEvalCriteria={hasEvalCriteria}
            setHasEvalCriteria={setHasEvalCriteria}
            evalCriteria={evalCriteria}
            addCriterion={addCriterion}
            removeCriterion={removeCriterion}
            updateCriterion={updateCriterion}
          />
        )}
        {step === "sections" && (
          <SectionsStep
            selectedSections={selectedSections}
            toggleSection={toggleSection}
          />
        )}
        {step === "exhibits" && (
          <ExhibitsStep
            exhibits={exhibits}
            toggleExhibit={toggleExhibit}
            updateExhibit={updateExhibit}
            exhibitNotes={exhibitNotes}
            setExhibitNotes={setExhibitNotes}
          />
        )}
        {step === "review" && (
          <ReviewStep
            config={buildConfig()}
            exported={exported}
            onDownload={downloadConfig}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={stepIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white font-bold uppercase text-sm transition-colors"
        >
          <MaterialIcon icon="arrow_back" size="sm" />
          Back
        </button>
        {stepIndex < STEPS.length - 1 ? (
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/80 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white font-bold uppercase text-sm transition-colors"
          >
            Next
            <MaterialIcon icon="arrow_forward" size="sm" />
          </button>
        ) : (
          <button
            onClick={downloadConfig}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold uppercase text-sm transition-colors"
          >
            <MaterialIcon icon="download" size="sm" />
            Download Config
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Step: RFQ Info ───────────────────────────────────────────────────────────

function RfqInfoStep({
  projectName,
  setProjectName,
  issuingOrg,
  setIssuingOrg,
  rfqNumber,
  setRfqNumber,
  dueDate,
  setDueDate,
  submissionDate,
  setSubmissionDate,
  recipientName,
  setRecipientName,
  recipientTitle,
  setRecipientTitle,
  recipientEmail,
  setRecipientEmail,
}: {
  projectName: string;
  setProjectName: (v: string) => void;
  issuingOrg: string;
  setIssuingOrg: (v: string) => void;
  rfqNumber: string;
  setRfqNumber: (v: string) => void;
  dueDate: string;
  setDueDate: (v: string) => void;
  submissionDate: string;
  setSubmissionDate: (v: string) => void;
  recipientName: string;
  setRecipientName: (v: string) => void;
  recipientTitle: string;
  setRecipientTitle: (v: string) => void;
  recipientEmail: string;
  setRecipientEmail: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">
          RFQ Information
        </h3>
        <p className="text-sm text-gray-400">
          Basic project and recipient details. These populate the title page and
          cover email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Project Name *" span={2}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. Water Treatment Facility Phase 2"
            className={inputClass}
          />
        </FormField>

        <FormField label="Issuing Organization *">
          <input
            type="text"
            value={issuingOrg}
            onChange={(e) => setIssuingOrg(e.target.value)}
            placeholder="e.g. City of Kennewick"
            className={inputClass}
          />
        </FormField>

        <FormField label="RFQ Reference Number *">
          <input
            type="text"
            value={rfqNumber}
            onChange={(e) => setRfqNumber(e.target.value)}
            placeholder="e.g. 2026-RFQ-007"
            className={inputClass}
          />
        </FormField>

        <FormField label="Submission Date">
          <input
            type="text"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            placeholder="e.g. 05/01/2026"
            className={inputClass}
          />
        </FormField>

        <FormField label="RFQ Due Date">
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="e.g. 05/15/2026"
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="border-t border-gray-700 pt-5">
        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">
          Recipient (for cover email &amp; title page)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Recipient Full Name">
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Jane Smith"
              className={inputClass}
            />
          </FormField>

          <FormField label="Recipient Title">
            <input
              type="text"
              value={recipientTitle}
              onChange={(e) => setRecipientTitle(e.target.value)}
              placeholder="e.g. Procurement Manager"
              className={inputClass}
            />
          </FormField>

          <FormField label="Recipient Email" span={2}>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="e.g. jsmith@kennewick.gov"
              className={inputClass}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}

// ─── Step: Evaluation Criteria ────────────────────────────────────────────────

function EvalCriteriaStep({
  hasEvalCriteria,
  setHasEvalCriteria,
  evalCriteria,
  addCriterion,
  removeCriterion,
  updateCriterion,
}: {
  hasEvalCriteria: boolean;
  setHasEvalCriteria: (v: boolean) => void;
  evalCriteria: EvaluationCriterion[];
  addCriterion: () => void;
  removeCriterion: (idx: number) => void;
  updateCriterion: (
    idx: number,
    field: keyof EvaluationCriterion,
    value: string,
  ) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">
          Evaluation Criteria
        </h3>
        <p className="text-sm text-gray-400">
          If the RFQ specifies evaluation criteria or factors, enter them here.
          They&apos;ll become the Table of Contents for the PDF.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasEvalCriteria}
            onChange={(e) => setHasEvalCriteria(e.target.checked)}
            className="w-4 h-4 rounded accent-brand-primary"
          />
          <span className="text-sm font-bold text-gray-200">
            This RFQ includes Evaluation Criteria / Scoring Factors
          </span>
        </label>
      </div>

      {hasEvalCriteria && (
        <div className="space-y-3">
          {evalCriteria.map((criterion, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-secondary w-6 text-center">
                {idx + 1}
              </span>
              <input
                type="text"
                value={criterion.title}
                onChange={(e) => updateCriterion(idx, "title", e.target.value)}
                placeholder="Criterion title (e.g. Company Experience)"
                className={`${inputClass} flex-1`}
              />
              <input
                type="text"
                value={criterion.weight}
                onChange={(e) => updateCriterion(idx, "weight", e.target.value)}
                placeholder="Weight (e.g. 25%)"
                className={`${inputClass} w-28`}
              />
              <button
                onClick={() => removeCriterion(idx)}
                disabled={evalCriteria.length <= 1}
                className="p-1.5 text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Remove criterion"
              >
                <MaterialIcon icon="close" size="sm" />
              </button>
            </div>
          ))}

          <button
            onClick={addCriterion}
            className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary/80 font-bold uppercase tracking-wider transition-colors"
          >
            <MaterialIcon icon="add_circle" size="sm" />
            Add Criterion
          </button>
        </div>
      )}

      {!hasEvalCriteria && (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-sm text-yellow-200">
          <MaterialIcon
            icon="info"
            size="sm"
            className="inline mr-2 text-yellow-400"
          />
          No TOC page will be generated. The PDF will go directly to the body
          sections.
        </div>
      )}
    </div>
  );
}

// ─── Step: Sections ───────────────────────────────────────────────────────────

function SectionsStep({
  selectedSections,
  toggleSection,
}: {
  selectedSections: string[];
  toggleSection: (id: string, required: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">
          Body Sections
        </h3>
        <p className="text-sm text-gray-400">
          Select the sections to include in the qualification package. Required
          sections are always included.
        </p>
      </div>

      <div className="space-y-2">
        {ALL_SECTIONS.map((section) => {
          const isSelected = selectedSections.includes(section.id);
          return (
            <label
              key={section.id}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                section.required
                  ? "border-brand-primary/50 bg-brand-primary/10 cursor-default"
                  : isSelected
                    ? "border-brand-secondary/50 bg-brand-secondary/10"
                    : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                readOnly={section.required}
                onChange={() => toggleSection(section.id, section.required)}
                className="mt-0.5 w-4 h-4 rounded accent-brand-primary"
                aria-label={`Include ${section.label} section`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {section.label}
                  </span>
                  {section.required && (
                    <span className="text-xs bg-brand-primary/30 text-brand-secondary px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {section.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Exhibits ───────────────────────────────────────────────────────────

function ExhibitsStep({
  exhibits,
  toggleExhibit,
  updateExhibit,
  exhibitNotes,
  setExhibitNotes,
}: {
  exhibits: ExhibitConfig[];
  toggleExhibit: (idx: number) => void;
  updateExhibit: (
    idx: number,
    field: keyof Omit<ExhibitConfig, "enabled">,
    value: string,
  ) => void;
  exhibitNotes: string;
  setExhibitNotes: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">
          Exhibits
        </h3>
        <p className="text-sm text-gray-400">
          Some RFQs require exhibits — safety manual TOC, site compliance
          photos, or other documentation. Select what applies and provide any
          clarification below.
        </p>
      </div>

      {/* Workflow callout */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-sm text-blue-200">
        <MaterialIcon
          icon="info"
          size="sm"
          className="inline mr-2 text-blue-400"
        />
        <strong>How exhibits work:</strong> After downloading the config JSON,
        place your exhibit PDF files in a local folder and run the CLI with{" "}
        <code className="bg-black/40 px-1 rounded text-blue-100">
          --exhibits-dir ./your-exhibit-folder/
        </code>
        . The file names below must match exactly.
      </div>

      <div className="space-y-3">
        {exhibits.map((exhibit, idx) => (
          <div
            key={exhibit.id}
            className={`rounded-lg border p-4 transition-colors ${
              exhibit.enabled
                ? "border-brand-secondary/50 bg-brand-secondary/5"
                : "border-gray-700 bg-gray-800/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={`exhibit-${exhibit.id}`}
                checked={exhibit.enabled}
                onChange={() => toggleExhibit(idx)}
                className="mt-0.5 w-4 h-4 rounded accent-brand-primary"
              />
              <div className="flex-1 space-y-3">
                <label
                  htmlFor={`exhibit-${exhibit.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                    Exhibit {exhibit.id}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {exhibit.label}
                  </span>
                </label>

                {exhibit.enabled && (
                  <div className="space-y-2">
                    <div>
                      <label className={labelClass}>
                        Exhibit Label (shown on divider page)
                      </label>
                      <input
                        type="text"
                        value={exhibit.label}
                        onChange={(e) =>
                          updateExhibit(idx, "label", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Description (shown on divider page)
                      </label>
                      <input
                        type="text"
                        value={exhibit.description}
                        onChange={(e) =>
                          updateExhibit(idx, "description", e.target.value)
                        }
                        placeholder="Brief description of this exhibit"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        PDF filename (must match your exhibit folder)
                      </label>
                      <input
                        type="text"
                        value={exhibit.file}
                        onChange={(e) =>
                          updateExhibit(idx, "file", e.target.value)
                        }
                        placeholder="e.g. safety-manual-toc.pdf"
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className={labelClass}>
          Additional Notes / Instructions for Exhibits
        </label>
        <textarea
          value={exhibitNotes}
          onChange={(e) => setExhibitNotes(e.target.value)}
          rows={3}
          placeholder="Any special ordering instructions, labels, or clarifications…"
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}

// ─── Step: Review & Export ────────────────────────────────────────────────────

function ReviewStep({
  config,
  exported,
  onDownload,
}: {
  config: RfqConfig;
  exported: boolean;
  onDownload: () => void;
}) {
  const enabledExhibits = config.exhibits;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1">
          Review &amp; Export
        </h3>
        <p className="text-sm text-gray-400">
          Review the RFQ package configuration, then download the JSON config to
          run the PDF generator locally.
        </p>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReviewBlock label="Project">
          <p className="text-white font-bold">{config.projectName || "—"}</p>
          <p className="text-gray-400 text-sm">{config.issuingOrg || "—"}</p>
          <p className="text-gray-400 text-sm">
            RFQ: {config.rfqNumber || "—"}
          </p>
        </ReviewBlock>
        <ReviewBlock label="Dates">
          <p className="text-gray-300 text-sm">Due: {config.dueDate || "—"}</p>
          <p className="text-gray-300 text-sm">
            Submitted: {config.submissionDate || "—"}
          </p>
        </ReviewBlock>
        <ReviewBlock label="Recipient">
          <p className="text-gray-300 text-sm">
            {config.recipientName || "—"} — {config.recipientTitle || "—"}
          </p>
          <p className="text-gray-300 text-sm">
            {config.recipientEmail || "—"}
          </p>
        </ReviewBlock>
        <ReviewBlock label="TOC / Eval Criteria">
          {config.evaluationCriteria.length > 0 ? (
            <ul className="text-gray-300 text-sm space-y-0.5">
              {config.evaluationCriteria.map((c, i) => (
                <li key={i}>
                  {i + 1}. {c.title}
                  {c.weight ? ` (${c.weight})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No evaluation criteria</p>
          )}
        </ReviewBlock>
        <ReviewBlock label="Body Sections">
          <ul className="text-gray-300 text-sm space-y-0.5">
            {config.sections.map((id) => {
              const s = ALL_SECTIONS.find((sec) => sec.id === id);
              return <li key={id}>{s ? s.label : id}</li>;
            })}
          </ul>
        </ReviewBlock>
        <ReviewBlock label="Exhibits">
          {enabledExhibits.length > 0 ? (
            <ul className="text-gray-300 text-sm space-y-0.5">
              {enabledExhibits.map((e) => (
                <li key={e.id}>
                  Exhibit {e.id}: {e.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No exhibits</p>
          )}
        </ReviewBlock>
      </div>

      {/* CLI instructions */}
      <div className="bg-gray-900/60 border border-gray-600 rounded-xl p-5 space-y-3">
        <h4 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-2">
          <MaterialIcon
            icon="terminal"
            size="sm"
            className="text-brand-secondary"
          />
          After Downloading — Run the Generator
        </h4>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li>
            Download the config JSON below and save it to your project folder.
          </li>
          {enabledExhibits.length > 0 && (
            <li>
              Place exhibit PDF files in a local folder (e.g.{" "}
              <code className="bg-black/40 px-1 rounded">./exhibits/</code>
              ). File names must match exactly what you entered above.
            </li>
          )}
          <li>
            In your terminal from the repo root, run:
            <pre className="mt-1 bg-black/50 rounded p-2 text-xs text-green-300 overflow-x-auto">
              {`npm run rfq:generate -- --config ./rfq-params-${(
                config.projectName || "rfq"
              )
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(
                  /^-|-$/g,
                  "",
                )}.json${enabledExhibits.length > 0 ? " --exhibits-dir ./exhibits/" : ""}`}
            </pre>
          </li>
          <li>
            Output will be in{" "}
            <code className="bg-black/40 px-1 rounded">
              documents/output/rfq/
            </code>
            :
            <ul className="mt-1 ml-4 space-y-0.5 text-gray-400">
              <li>
                •{" "}
                <code className="bg-black/40 px-1 rounded text-xs">
                  rfq-
                  {(config.projectName || "rfq")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")}
                  .pdf
                </code>{" "}
                — complete merged PDF package
              </li>
              <li>
                •{" "}
                <code className="bg-black/40 px-1 rounded text-xs">
                  rfq-...-email.html
                </code>{" "}
                — cover email draft (open in browser, copy to Outlook)
              </li>
            </ul>
          </li>
        </ol>
      </div>

      {/* Download button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onDownload}
          className="flex items-center gap-3 px-8 py-3.5 bg-green-700 hover:bg-green-600 rounded-xl text-white font-black uppercase tracking-wide text-base transition-colors shadow-lg"
        >
          <MaterialIcon icon="download" size="lg" />
          Download RFQ Config JSON
        </button>
        {exported && (
          <p className="text-green-400 text-sm flex items-center gap-1.5">
            <MaterialIcon icon="check_circle" size="sm" />
            Config downloaded! Run the CLI command above to generate the PDF.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

const inputClass =
  "w-full bg-gray-900/60 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-secondary transition-colors";

const labelClass =
  "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1";

function FormField({
  label,
  span,
  children,
}: {
  label: string;
  span?: 1 | 2;
  children: ReactNode;
}) {
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function ReviewBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-4">
      <h5 className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-2">
        {label}
      </h5>
      {children}
    </div>
  );
}
