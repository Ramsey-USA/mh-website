// Pure helpers and types for the RFQ Package Builder wizard.
// Extracted from src/app/dashboard/RfqTab.tsx so they are testable
// without React/jsdom and reusable from other wizard surfaces.

export interface EvaluationCriterion {
  title: string;
  weight: string;
}

export interface ExhibitConfig {
  id: string;
  label: string;
  description: string;
  file: string;
  enabled: boolean;
}

export interface RfqConfig {
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

export type WizardStep =
  | "rfq-info"
  | "eval-criteria"
  | "sections"
  | "exhibits"
  | "review";

export interface RfqSection {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

export interface WizardStepInfo {
  id: WizardStep;
  label: string;
  icon: string;
}

export const ALL_SECTIONS: readonly RfqSection[] = [
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
] as const;

export const DEFAULT_EXHIBITS: readonly ExhibitConfig[] = [
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
] as const;

export const STEPS: readonly WizardStepInfo[] = [
  { id: "rfq-info", label: "RFQ Info", icon: "assignment" },
  { id: "eval-criteria", label: "Eval. Criteria", icon: "checklist" },
  { id: "sections", label: "Sections", icon: "article" },
  { id: "exhibits", label: "Exhibits", icon: "folder_open" },
  { id: "review", label: "Review & Export", icon: "download" },
] as const;

export function requiredSectionIds(): string[] {
  return ALL_SECTIONS.filter((s) => s.required).map((s) => s.id);
}

export function slugifyRfqName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function rfqConfigSlug(config: RfqConfig): string {
  return slugifyRfqName(config.projectName || config.rfqNumber || "rfq");
}

export interface RfqInfoInput {
  projectName: string;
  issuingOrg: string;
  rfqNumber: string;
}

export function isRfqInfoComplete(input: RfqInfoInput): boolean {
  return (
    input.projectName.trim().length > 0 &&
    input.issuingOrg.trim().length > 0 &&
    input.rfqNumber.trim().length > 0
  );
}

export interface BuildConfigInput {
  projectName: string;
  issuingOrg: string;
  rfqNumber: string;
  dueDate: string;
  submissionDate: string;
  recipientName: string;
  recipientTitle: string;
  recipientEmail: string;
  hasEvalCriteria: boolean;
  evalCriteria: readonly EvaluationCriterion[];
  selectedSections: readonly string[];
  exhibits: readonly ExhibitConfig[];
  exhibitNotes: string;
}

export function buildRfqConfig(input: BuildConfigInput): RfqConfig {
  return {
    projectName: input.projectName,
    issuingOrg: input.issuingOrg,
    rfqNumber: input.rfqNumber,
    dueDate: input.dueDate,
    submissionDate: input.submissionDate,
    recipientName: input.recipientName,
    recipientTitle: input.recipientTitle,
    recipientEmail: input.recipientEmail,
    evaluationCriteria: input.hasEvalCriteria
      ? input.evalCriteria.filter((c) => c.title.trim())
      : [],
    sections: [...input.selectedSections],
    exhibits: input.exhibits
      .filter((e) => e.enabled)
      .map(({ enabled: _enabled, ...rest }) => rest),
    additionalNotes: input.exhibitNotes,
  };
}

export function rfqConfigFilename(config: RfqConfig): string {
  return `rfq-params-${rfqConfigSlug(config)}.json`;
}
