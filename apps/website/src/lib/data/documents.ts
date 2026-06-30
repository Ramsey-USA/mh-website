/**
 * Documents Data
 *
 * Centralized registry of all MH Construction branded documents.
 * Used by the /resources web pages to list available manuals and forms.
 *
 * To add a new document: add an entry to the relevant array below.
 * The `pdfPath` is relative to documents/output/ and served statically.
 */

import mhcBrand from "../../../documents/brands/mhc.json";
import employeeHandbookJson from "../../../documents/content/employee-handbook.json";
import safetyManualPublicJson from "../../../documents/content/safety-manual-public.json";
import formsManifestJson from "../../../documents/forms/forms-manifest.json";
import { existsSync } from "node:fs";
import { join } from "node:path";

const SAFETY_PROGRAM_TITLE =
  mhcBrand.safetyProgramTitle || "MISH — Safety & Health Program";
const SAFETY_PROGRAM_SUBTITLE =
  mhcBrand.safetyProgramSubtitle ||
  "MH Construction Industrial Safety & Health Program";
const SAFETY_PROGRAM_TOTAL_SECTIONS =
  Number(mhcBrand.safetyProgramTotalSections) || 50;
const SAFETY_PROGRAM_LAST_SECTION = String(
  Math.max(SAFETY_PROGRAM_TOTAL_SECTIONS - 1, 0),
).padStart(2, "0");
const SAFETY_PROGRAM_REVISION_YEAR = Number(mhcBrand.revisionYear) || 2026;
const SAFETY_PROGRAM_REVISION_NUMBER = mhcBrand.revisionNumber || "3";
const SAFETY_PROGRAM_REVISION_DATE = mhcBrand.revisionDate || "04/07/2026";
const EMPLOYEE_HANDBOOK_TITLE = "Employee Handbook";
const EMPLOYEE_HANDBOOK_SUBTITLE =
  "MH Construction Employee Policies and Procedures";
const EMPLOYEE_HANDBOOK_REVISION_YEAR = 2026;
const EMPLOYEE_HANDBOOK_REVISION_NUMBER = "1.0";
const EMPLOYEE_HANDBOOK_REVISION_DATE = "05/01/2026";

export type SectionCategory =
  | "Personnel & Policy"
  | "Planning & Administration"
  | "Physical Hazards"
  | "Equipment & Operations"
  | "Health & Industrial Hygiene"
  | "Site Control & Environment";

export type SectionPriority = "required" | "field" | "reference";

export interface DocumentSection {
  number: string;
  title: string;
  slug: string;
  summary: string;
  pages?: number;
  category: SectionCategory;
  oshaRef?: string;
  pmbok?: string;
  priority?: SectionPriority;
  /** URL to the section's QR code image for display on the website */
  qrCodeUrl?: string;
  /** R2 object key for the section PDF (relative to the docs/ prefix) */
  r2Key?: string;
}

export interface DocumentEntry {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: "manual" | "form" | "employee-manual" | "joining-program";
  icon: string;
  revisionYear: number;
  /** Revision number string, e.g. "2" */
  revisionNumber?: string;
  /** Revision effective date, e.g. "04/07/2026" */
  revisionDate?: string;
  totalSections?: number;
  totalPages?: number;
  /** Path to the complete PDF relative to /public (once copied) */
  pdfPath?: string;
  /** Whether per-section PDFs are available */
  hasSectionPdfs?: boolean;
  /** Optional direct path to a standalone table-of-contents PDF */
  contentsPdfPath?: string;
  /** Optional direct path to a standalone reference guide PDF */
  referencePdfPath?: string;
  sections?: DocumentSection[];
  tags: string[];
  /** URL to the document's QR code image for display on the website */
  qrCodeUrl?: string;
  /** R2 object key for the document PDF (relative to the docs/ prefix) */
  r2Key?: string;
  /** R2 object key for the standalone table-of-contents PDF */
  contentsR2Key?: string;
  /** R2 object key for the standalone reference guide PDF */
  referenceR2Key?: string;
}

// ── Manuals ───────────────────────────────────────────────────────────────────

const legacyManuals: DocumentEntry[] = [
  {
    id: "safety-manual",
    title: SAFETY_PROGRAM_TITLE,
    subtitle: SAFETY_PROGRAM_SUBTITLE,
    description: `MH Construction's written Safety Program (MISH) with ${SAFETY_PROGRAM_TOTAL_SECTIONS} sections (00-${SAFETY_PROGRAM_LAST_SECTION}), aligned with OSHA 29 CFR 1926, AGC CSEA expectations, and applicable WISHA/L&I (WA), OAR (OR), and IDAPA (ID) requirements. Legacy AGC APP references are retained in historical source material for continuity. Covers injury prevention, emergency response, PPE, fall protection, hazard communication, and OSHA-required construction safety standards.`,
    category: "manual",
    icon: "health_and_safety",
    revisionYear: SAFETY_PROGRAM_REVISION_YEAR,
    revisionNumber: SAFETY_PROGRAM_REVISION_NUMBER,
    revisionDate: SAFETY_PROGRAM_REVISION_DATE,
    totalSections: SAFETY_PROGRAM_TOTAL_SECTIONS,
    totalPages: 350,
    hasSectionPdfs: true,
    pdfPath: "/docs/safety/safety-manual-complete.pdf",
    r2Key: "docs/safety/safety-manual-complete.pdf",
    contentsPdfPath: "/docs/safety/safety-manual-contents.pdf",
    contentsR2Key: "docs/safety/safety-manual-contents.pdf",
    referencePdfPath: "/docs/safety/safety-manual-reference.pdf",
    referenceR2Key: "docs/safety/safety-manual-reference.pdf",
    tags: ["safety", "OSHA", "field", "required", "MISH", "AGC", "CSEA", "APP"],
    qrCodeUrl: "/images/qr-codes/safety/qr-safety-manual-color.png",
    sections: [
      // ── 50 sections, slugs/numbers/titles aligned to canonical
      //    documents/content/safety-manual.json (single source of truth).
      //    Section 00 (Table of Contents) is exposed via `contentsPdfPath`
      //    above and is intentionally NOT a MISH section here.
      {
        number: "01",
        title: "Safety & Health Program Overview",
        slug: "safety-health-program-overview",
        summary:
          "Establishes the legal and regulatory framework for MH Construction's MISH program — leadership commitment, scope, and OSHA-aligned governance.",
        pages: 5,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Project Integration",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-01-color.png",
      },
      {
        number: "02",
        title: "Injury-Free Workplace Commitment",
        slug: "injury-free-workplace-commitment",
        summary:
          "MH Construction's commitment to a zero-injury jobsite culture, management responsibilities, and employee accountability.",
        pages: 8,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Project Integration",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-02-color.png",
      },
      {
        number: "03",
        title: "Safety Roles & Responsibilities",
        slug: "safety-roles-responsibilities",
        summary:
          "Defines safety roles for executives, project managers, supervisors, foremen, employees, and subcontractors across every MH jobsite.",
        pages: 6,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Resource Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-03-color.png",
      },
      {
        number: "04",
        title: "Safety & Health Orientation",
        slug: "safety-health-orientation",
        summary:
          "Required new-employee and subcontractor orientation covering site rules, emergency procedures, and reporting obligations.",
        pages: 7,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.21",
        pmbok: "Resource Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-04-color.png",
      },
      {
        number: "05",
        title: "Safety Bulletin Boards & Communication",
        slug: "safety-bulletin-boards-communication",
        summary:
          "Requirements for posting mandatory OSHA and company safety notices and the daily field communication rhythm at each job site.",
        pages: 3,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1903.2",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-05-color.png",
      },
      {
        number: "06",
        title: "Drug & Alcohol Policy / Testing",
        slug: "drug-alcohol-policy-testing",
        summary:
          "Policy for maintaining a drug- and alcohol-free workplace, testing procedures, and consequences of violations.",
        pages: 6,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.23",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-06-color.png",
      },
      {
        number: "07",
        title: "Drug & Alcohol — Field Operations",
        slug: "drug-alcohol-field-operations",
        summary:
          "DOT-compliant drug and alcohol testing program for CDL drivers and field operations personnel.",
        pages: 9,
        category: "Personnel & Policy",
        oshaRef: "49 CFR Part 382",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-07-color.png",
      },
      {
        number: "08",
        title: "Short Service Employee Program",
        slug: "short-service-employee-program",
        summary:
          "Enhanced supervision and mentoring requirements for employees with less than 6 months of experience.",
        pages: 6,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.21",
        pmbok: "Resource Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-08-color.png",
      },
      {
        number: "09",
        title: "Pre-Job Safety Plan",
        slug: "pre-job-safety-plan",
        summary:
          "Job Hazard Analysis (JHA) process, pre-task planning requirements, and site-specific safety planning.",
        pages: 6,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Risk Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-09-color.png",
      },
      {
        number: "10",
        title: "Safety & Health Meetings / Inspections",
        slug: "safety-health-meetings-inspections",
        summary:
          "Requirements for conducting regular toolbox talks, safety meetings, and site inspections.",
        pages: 5,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Quality Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-10-color.png",
      },
      {
        number: "11",
        title: "Accident Reporting & Investigation",
        slug: "accident-reporting-investigation",
        summary:
          "Procedures for reporting, investigating, and documenting all incidents, accidents, and near-miss events.",
        pages: 8,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1904",
        pmbok: "Risk Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-11-color.png",
      },
      {
        number: "12",
        title: "Personal Protective Equipment (PPE)",
        slug: "personal-protective-equipment",
        summary:
          "Required PPE for all jobsite roles, selection criteria, inspection, maintenance, and enforcement.",
        pages: 10,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.95",
        pmbok: "Resource Management",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-12-color.png",
      },
      {
        number: "13",
        title: "HAZCOM Program",
        slug: "hazcom-program",
        summary:
          "GHS/HazCom requirements, SDS management, chemical labeling, and employee right-to-know training.",
        pages: 9,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.59",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-13-color.png",
      },
      {
        number: "14",
        title: "Industrial Hygiene Program",
        slug: "industrial-hygiene-program",
        summary:
          "Prevention and control of occupational hazards including noise, dust, chemical exposure, and ergonomics.",
        pages: 8,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.55",
        pmbok: "Resource Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-14-color.png",
      },
      {
        number: "15",
        title: "Heat Stress",
        slug: "heat-stress",
        summary:
          "Recognition, prevention, and response to heat exhaustion and heat stroke on outdoor jobsites.",
        pages: 7,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.51",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-15-color.png",
      },
      {
        number: "16",
        title: "Respiratory Protection",
        slug: "respiratory-protection",
        summary:
          "Respirator selection, fit testing, medical evaluation, and maintenance procedures.",
        pages: 9,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.103",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-16-color.png",
      },
      {
        number: "17",
        title: "Silica Safety Program",
        slug: "silica-safety-program",
        summary:
          "Written exposure control plan, engineering controls, and medical surveillance for respirable crystalline silica.",
        pages: 9,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.1153",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-17-color.png",
      },
      {
        number: "18",
        title: "Bloodborne Pathogens",
        slug: "bloodborne-pathogens",
        summary:
          "Exposure control plan, PPE requirements, and post-exposure procedures for bloodborne pathogen risks.",
        pages: 7,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1910.1030",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-18-color.png",
      },
      {
        number: "19",
        title: "Housekeeping",
        slug: "housekeeping",
        summary:
          "Jobsite cleanliness standards to reduce slip, trip, and fall hazards and maintain an organized work area.",
        pages: 4,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.25",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-19-color.png",
      },
      {
        number: "20",
        title: "Signs, Signals, and Barricades",
        slug: "signs-signals-barricades",
        summary:
          "Requirements for traffic control, safety signage, and barricading hazardous areas.",
        pages: 6,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.200",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-20-color.png",
      },
      {
        number: "21",
        title: "Fall Protection",
        slug: "fall-protection",
        summary:
          "Fall prevention systems, guardrail requirements, personal fall arrest systems, and training requirements.",
        pages: 12,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.502",
        pmbok: "Risk Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-21-color.png",
      },
      {
        number: "22",
        title: "Scaffolding — Use & Handling",
        slug: "scaffolding-use-handling",
        summary:
          "Scaffold erection, inspection, capacity requirements, and safe access procedures per OSHA standards.",
        pages: 11,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.451",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-22-color.png",
      },
      {
        number: "23",
        title: "Ladder Use & Care",
        slug: "ladder-use-care",
        summary:
          "Safe use, inspection, and maintenance of portable, extension, and fixed ladders.",
        pages: 6,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.1053",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-23-color.png",
      },
      {
        number: "24",
        title: "Open Floors & Holes",
        slug: "open-floors-holes",
        summary:
          "Guarding requirements for floor holes, wall openings, elevated platforms, and construction ramps.",
        pages: 7,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.502",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-24-color.png",
      },
      {
        number: "25",
        title: "Excavation, Trenching, and Shoring",
        slug: "excavation-trenching-shoring",
        summary:
          "Soil classification, sloping, shoring, and shielding requirements for safe excavation work.",
        pages: 10,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.652",
        pmbok: "Risk Management",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-25-color.png",
      },
      {
        number: "26",
        title: "Confined Space Entry",
        slug: "confined-space-entry",
        summary:
          "Permit-required confined space procedures, atmospheric testing, rescue plans, and attendant responsibilities.",
        pages: 10,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.1200",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-26-color.png",
      },
      {
        number: "27",
        title: "Lockout / Tagout (LOTO)",
        slug: "lockout-tagout",
        summary:
          "Energy control procedures for servicing and maintaining machinery to prevent unexpected energization.",
        pages: 11,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1910.147",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-27-color.png",
      },
      {
        number: "28",
        title: "Electrical Safety",
        slug: "electrical-safety",
        summary:
          "Electrical hazard recognition, GFCI requirements, lockout/tagout for electrical systems, and safe work practices.",
        pages: 10,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.400",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-28-color.png",
      },
      {
        number: "29",
        title: "Welding, Cutting, and Heating Operations",
        slug: "welding-cutting-heating",
        summary:
          "Safe procedures for welding, torch cutting, and heating operations including hot work permits.",
        pages: 9,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.350",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-29-color.png",
      },
      {
        number: "30",
        title: "Flammable and Combustible Liquids",
        slug: "flammable-combustible-liquids",
        summary:
          "Safe storage, handling, and disposal of flammable and combustible liquids on construction sites.",
        pages: 7,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.152",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-30-color.png",
      },
      {
        number: "31",
        title: "Fire Prevention",
        slug: "fire-prevention",
        summary:
          "Fire prevention plan, extinguisher placement, hot work permits, and evacuation routes.",
        pages: 8,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.150",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-31-color.png",
      },
      {
        number: "32",
        title: "Compressed Gas / Compressed Air",
        slug: "compressed-gas-air",
        summary:
          "Safe handling, storage, and use of compressed gas cylinders and pneumatic tools.",
        pages: 6,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.350",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-32-color.png",
      },
      {
        number: "33",
        title: "Motor Vehicle Safety Program",
        slug: "motor-vehicle-safety-program",
        summary:
          "Company vehicle use policy, driver qualification requirements, and safe driving standards.",
        pages: 7,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.600",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-33-color.png",
      },
      {
        number: "34",
        title: "Distracted Driving & Mobile Device Policy",
        slug: "distracted-driving-mobile-device-policy",
        summary:
          "Prohibition on handheld mobile device use while operating any vehicle. Covers company vehicles, personal vehicles on company time, and enforcement procedures.",
        pages: 4,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.600",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-34-color.png",
      },
      {
        number: "35",
        title: "Motor Vehicle Records Program",
        slug: "motor-vehicle-records-program",
        summary:
          "Annual MVR check process, acceptable driving record standards, and procedures for disqualifying or reinstating drivers.",
        pages: 4,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.600",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-35-color.png",
      },
      {
        number: "36",
        title: "Equipment Maintenance and Inspection",
        slug: "equipment-maintenance-inspection",
        summary:
          "Pre-use inspection checklists, maintenance schedules, and out-of-service procedures for construction equipment.",
        pages: 8,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Quality Management",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-36-color.png",
      },
      {
        number: "37",
        title: "Aerial Lifts & Elevated Work Platforms",
        slug: "aerial-lifts-elevated-work-platforms",
        summary:
          "Safe operation, pre-use inspection, and operator training for boom lifts, scissor lifts, and aerial platforms.",
        pages: 9,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.453",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-37-color.png",
      },
      {
        number: "38",
        title: "Crane-Suspended Work Platforms",
        slug: "crane-suspended-work-platforms",
        summary:
          "Requirements for personnel hoisting using cranes, inspection criteria, and load calculations.",
        pages: 7,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.1431",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-38-color.png",
      },
      {
        number: "39",
        title: "Rigging Procedures",
        slug: "rigging-procedures",
        summary:
          "Rigging equipment inspection, load capacity, hand signals, and lift planning requirements.",
        pages: 10,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.251",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-39-color.png",
      },
      {
        number: "40",
        title: "Forklift / Powered Industrial Truck Safety",
        slug: "forklift-power-industrial-truck-safety",
        summary:
          "Forklift operator certification, pre-use inspection, load handling, and pedestrian safety.",
        pages: 8,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1910.178",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-40-color.png",
      },
      {
        number: "41",
        title: "Construction Equipment Modification & Fabrication",
        slug: "construction-equipment-modification-fabrication",
        summary:
          "Approval process and engineering requirements for any field modification of construction equipment.",
        pages: 5,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.20",
        priority: "reference",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-41-color.png",
      },
      {
        number: "42",
        title: "Hand & Power Tools",
        slug: "hand-power-tools",
        summary:
          "Safe use, inspection, and maintenance of hand tools and portable power tools.",
        pages: 7,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.300",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-42-color.png",
      },
      {
        number: "43",
        title: "General Waste Management",
        slug: "general-waste-management",
        summary:
          "Construction waste disposal, recycling requirements, and environmental compliance standards.",
        pages: 5,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.25",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-43-color.png",
      },
      {
        number: "44",
        title: "Concrete & Masonry",
        slug: "concrete-masonry",
        summary:
          "Safety requirements for concrete forming, placement, curing, and masonry operations.",
        pages: 8,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.701",
        priority: "field",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-44-color.png",
      },
      {
        number: "45",
        title: "Miscellaneous Safety Requirements",
        slug: "miscellaneous-safety-requirements",
        summary:
          "Additional OSHA-required safety standards not covered in standalone sections.",
        pages: 8,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926",
        priority: "reference",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-45-color.png",
      },
      {
        number: "46",
        title: "Subcontractor Management Plan",
        slug: "subcontractor-management-plan",
        summary:
          "Pre-qualification requirements, safety expectations, and oversight procedures for subcontractors.",
        pages: 7,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Procurement Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-46-color.png",
      },
      {
        number: "47",
        title: "Insurance Requirements & Contractual Risk Transfer",
        slug: "insurance-requirements-contractual-risk-transfer",
        summary:
          "Minimum insurance coverages required of subcontractors and vendors. Additional insured endorsements, certificate of insurance requirements, and contractual indemnification provisions.",
        pages: 5,
        category: "Planning & Administration",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-47-color.png",
      },
      {
        number: "48",
        title: "Emergency Response Plan",
        slug: "emergency-response-plan",
        summary:
          "Emergency action plans, evacuation procedures, emergency contacts, and first-aid response protocols.",
        pages: 9,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.35",
        pmbok: "Risk Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-48-color.png",
      },
      {
        number: "49",
        title: "Incident Investigation & Root Cause Analysis",
        slug: "incident-investigation-root-cause-analysis",
        summary:
          "Structured incident investigation process including root cause analysis methodology, corrective action planning, and trend reporting to prevent recurrence.",
        pages: 8,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1904",
        pmbok: "Risk Management",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-49-color.png",
      },
      {
        number: "50",
        title: "Return-to-Work Program",
        slug: "return-to-work-program",
        summary:
          "Modified-duty and transitional work program for injured employees. Covers light-duty assignments, medical progress tracking, and coordination with treating physicians.",
        pages: 6,
        category: "Personnel & Policy",
        priority: "required",
        qrCodeUrl:
          "/images/qr-codes/safety-sections/qr-safety-section-50-color.png",
      },
    ],
  },
  {
    id: "employee-handbook",
    title: EMPLOYEE_HANDBOOK_TITLE,
    subtitle: EMPLOYEE_HANDBOOK_SUBTITLE,
    description:
      "Company employment policies, conduct expectations, workplace standards, benefits, and onboarding guidance. This handbook is maintained as a separate manual from MISH while using the same shared forms ecosystem where applicable.",
    category: "employee-manual",
    icon: "book",
    revisionYear: EMPLOYEE_HANDBOOK_REVISION_YEAR,
    revisionNumber: EMPLOYEE_HANDBOOK_REVISION_NUMBER,
    revisionDate: EMPLOYEE_HANDBOOK_REVISION_DATE,
    totalPages: 37,
    pdfPath: "/docs/employee/employee-handbook-2026.pdf",
    r2Key: "docs/employee/employee-handbook-2026.pdf",
    tags: ["employee", "handbook", "hr", "policies", "onboarding"],
    qrCodeUrl: "/images/qr-codes/safety/qr-employee-handbook-color.png",
  },
];

// ── Standalone Forms ──────────────────────────────────────────────────────────

type SafetyManualPublicSection = {
  id: string;
  number: number;
  numberStr: string;
  key: string;
  title: string;
  slug: string;
  previewHtml: string;
};

type SafetyManualPublicShape = {
  document?: {
    title?: string;
    revisionYear?: number;
    revisionDate?: string;
    totalSections?: number;
  };
  sections?: SafetyManualPublicSection[];
};

type EmployeeHandbookShape = {
  document?: {
    title?: string;
    subtitle?: string;
    revisionYear?: number;
    revisionDate?: string;
    revisionVersion?: string;
    totalPages?: number;
  };
  sections?: Array<{
    number: number;
    title: string;
    subtitle?: string;
    pages?: string;
    forms?: Array<{
      id: string;
      slug: string;
      title: string;
      purpose?: string;
    }>;
  }>;
};

type FormManifestEntry = {
  id: string;
  slug: string;
  title: string;
  category?: string;
  categoryLabel?: string;
  effectiveDate?: string;
  revision?: string;
  owner?: string;
  manualSection?: string[];
};

type FormsManifestShape = {
  forms?: FormManifestEntry[];
};

const safetyManualPublic = safetyManualPublicJson as SafetyManualPublicShape;
const employeeHandbook = employeeHandbookJson as EmployeeHandbookShape;
const formsManifest = formsManifestJson as FormsManifestShape;

const legacySafetyManual = legacyManuals.find(
  (doc) => doc.id === "safety-manual",
);
const legacySafetySectionsByNumber = new Map(
  (legacySafetyManual?.sections ?? []).map((section) => [
    Number(section.number),
    section,
  ]),
);

function toDisplayTitle(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w+/g, (word) => {
      const upper = word.toUpperCase();
      if (
        ["JHA", "PPE", "OSHA", "WISHA", "DOT", "AGC", "MVR"].includes(upper)
      ) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function previewSummary(previewHtml: string, fallback: string): string {
  const text = stripHtml(previewHtml);
  if (!text) return fallback;
  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}...` : text;
}

function formatIsoDate(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!iso) return fallback;
  return `${iso[2]}/${iso[3]}/${iso[1]}`;
}

function inferRevisionYear(effectiveDate: string | undefined): number {
  const year = effectiveDate?.match(/(20\d{2})/);
  return year ? Number(year[1]) : SAFETY_PROGRAM_REVISION_YEAR;
}

function mishSectionNumbers(entry: FormManifestEntry): number[] {
  return (entry.manualSection ?? [])
    .map((section) => section.match(/^MISH\s+(\d+)$/i)?.[1])
    .filter((value): value is string => Boolean(value))
    .map((value) => Number(value));
}

function publicPdfDetails(
  relativePath: string,
): { pdfPath: string; r2Key: string } | null {
  const normalized = relativePath.replace(/^\/+/, "");
  const absolute = join(
    process.cwd(),
    "public",
    normalized.replace(/^docs\//, "docs/"),
  );
  if (!existsSync(absolute)) return null;
  return {
    pdfPath: `/${normalized}`,
    r2Key: normalized,
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safetyFormSubtitle(entry: FormManifestEntry): string {
  const sections = entry.manualSection?.join(" / ") ?? "MISH";
  return `${sections} blank template`;
}

function safetyFormDescription(entry: FormManifestEntry): string {
  const sections =
    entry.manualSection?.join(", ") ?? "the current safety manual";
  const owner = entry.owner ? ` Maintained by ${entry.owner}.` : "";
  return `Blank field form aligned to ${sections}. Public download remains restricted until the current form package is published.${owner}`;
}

function safetyFormIcon(entry: FormManifestEntry): string {
  const haystack = `${entry.title} ${entry.slug}`.toLowerCase();
  if (haystack.includes("incident") || haystack.includes("accident")) {
    return "report";
  }
  if (haystack.includes("inspection") || haystack.includes("checklist")) {
    return "fact_check";
  }
  if (haystack.includes("meeting") || haystack.includes("toolbox")) {
    return "record_voice_over";
  }
  if (haystack.includes("permit") || haystack.includes("authorization")) {
    return "verified_user";
  }
  return "description";
}

function handbookFormSubtitle(entry: FormManifestEntry): string {
  const sections = entry.manualSection?.join(" / ") ?? "Employee Handbook";
  return `${sections} acknowledgment or policy form`;
}

function handbookFormDescription(entry: FormManifestEntry): string {
  const sections = entry.manualSection?.join(", ") ?? "the employee handbook";
  const owner = entry.owner ? ` Maintained by ${entry.owner}.` : "";
  return `Employee handbook form aligned to ${sections}. Public download remains restricted until the current handbook form package is published.${owner}`;
}

function handbookFormIcon(entry: FormManifestEntry): string {
  const haystack = `${entry.title} ${entry.slug}`.toLowerCase();
  if (haystack.includes("vehicle")) return "directions_car";
  if (haystack.includes("photo") || haystack.includes("release")) {
    return "photo_camera";
  }
  if (haystack.includes("computer") || haystack.includes("electronics")) {
    return "computer";
  }
  if (
    haystack.includes("work-from-home") ||
    haystack.includes("work from home")
  ) {
    return "home_work";
  }
  return "description";
}

const currentSafetySections: DocumentSection[] = (
  safetyManualPublic.sections ?? []
).map((section) => {
  const legacy = legacySafetySectionsByNumber.get(section.number);
  return {
    number: section.numberStr,
    title: toDisplayTitle(section.title),
    slug: section.slug,
    summary: previewSummary(
      section.previewHtml,
      legacy?.summary ??
        "Public preview available to credentialed parties upon request.",
    ),
    category: legacy?.category ?? "Planning & Administration",
    ...(legacy?.pages !== undefined ? { pages: legacy.pages } : {}),
    ...(legacy?.oshaRef ? { oshaRef: legacy.oshaRef } : {}),
    ...(legacy?.pmbok ? { pmbok: legacy.pmbok } : {}),
    ...(legacy?.priority ? { priority: legacy.priority } : {}),
    ...(legacy?.qrCodeUrl ? { qrCodeUrl: legacy.qrCodeUrl } : {}),
    ...(legacy?.r2Key ? { r2Key: legacy.r2Key } : {}),
  };
});

const currentEmployeeHandbookSections: DocumentSection[] = (
  employeeHandbook.sections ?? []
).map((section) => {
  const pages = section.pages ? `Pages ${section.pages}` : "Section summary";
  const subtitle = section.subtitle ? `${section.subtitle}. ` : "";
  return {
    number: String(section.number).padStart(2, "0"),
    title: section.title,
    slug: slugify(section.title),
    summary: `${subtitle}${pages}`.trim(),
    category: "Personnel & Policy",
  };
});

export const manuals: DocumentEntry[] = legacyManuals.map((doc) => {
  if (doc.id === "safety-manual") {
    return {
      ...doc,
      title: SAFETY_PROGRAM_TITLE,
      subtitle: SAFETY_PROGRAM_SUBTITLE,
      totalSections:
        safetyManualPublic.document?.totalSections ??
        currentSafetySections.length,
      sections: currentSafetySections,
    };
  }

  if (doc.id === "employee-handbook") {
    return {
      ...doc,
      title: employeeHandbook.document?.title ?? doc.title,
      ...((employeeHandbook.document?.subtitle ?? doc.subtitle)
        ? { subtitle: employeeHandbook.document?.subtitle ?? doc.subtitle }
        : {}),
      revisionYear: employeeHandbook.document?.revisionYear ?? doc.revisionYear,
      ...((employeeHandbook.document?.revisionVersion ?? doc.revisionNumber)
        ? {
            revisionNumber:
              employeeHandbook.document?.revisionVersion ?? doc.revisionNumber,
          }
        : {}),
      revisionDate: formatIsoDate(
        employeeHandbook.document?.revisionDate,
        doc.revisionDate ?? EMPLOYEE_HANDBOOK_REVISION_DATE,
      ),
      ...((employeeHandbook.document?.totalPages ?? doc.totalPages)
        ? {
            totalPages: employeeHandbook.document?.totalPages ?? doc.totalPages,
          }
        : {}),
      ...((employeeHandbook.sections?.length ?? doc.totalSections)
        ? {
            totalSections:
              employeeHandbook.sections?.length ?? doc.totalSections,
          }
        : {}),
      sections: currentEmployeeHandbookSections,
    };
  }

  return doc;
});

export const safetyForms: DocumentEntry[] = (formsManifest.forms ?? [])
  .filter((entry) => {
    const mishNumbers = mishSectionNumbers(entry);
    return mishNumbers.some(
      (sectionNumber) => sectionNumber >= 1 && sectionNumber <= 50,
    );
  })
  .map((entry) => {
    const displayTitle = toDisplayTitle(entry.title);
    const publishedPdf = publicPdfDetails(
      `docs/safety/forms/${entry.slug}.pdf`,
    );
    return {
      id: `safety-form-${entry.slug.replace(/^form-/, "")}`,
      title: displayTitle,
      subtitle: safetyFormSubtitle(entry),
      description: safetyFormDescription(entry),
      category: "form",
      icon: safetyFormIcon(entry),
      revisionYear: inferRevisionYear(entry.effectiveDate),
      ...(publishedPdf ?? {}),
      ...(entry.revision ? { revisionNumber: entry.revision } : {}),
      ...(entry.effectiveDate ? { revisionDate: entry.effectiveDate } : {}),
      tags: ["safety", "mish", "field"],
    };
  });

export const handbookForms: DocumentEntry[] = [
  ...(formsManifest.forms ?? [])
    .filter((entry) =>
      entry.manualSection?.some((section) => /^HANDBOOK\b/i.test(section)),
    )
    .map((entry) => {
      const publishedPdf = publicPdfDetails(
        `docs/employee/forms/${entry.slug}.pdf`,
      );
      return {
        id: `handbook-form-${entry.slug.replace(/^form-/, "")}`,
        title: toDisplayTitle(entry.title),
        subtitle: handbookFormSubtitle(entry),
        description: handbookFormDescription(entry),
        category: "form",
        icon: handbookFormIcon(entry),
        revisionYear: inferRevisionYear(entry.effectiveDate),
        ...(publishedPdf ?? {}),
        ...(entry.revision ? { revisionNumber: entry.revision } : {}),
        ...(entry.effectiveDate ? { revisionDate: entry.effectiveDate } : {}),
        tags: ["employee", "handbook", "policy"],
      };
    }),
  {
    id: "handbook-form-company-letterhead",
    title: "MH Construction Company Letterhead",
    subtitle: "Employee Handbook blank company correspondence template",
    description:
      "Blank company letterhead aligned to the employee handbook forms pipeline for official correspondence.",
    category: "form",
    icon: "description",
    revisionYear: EMPLOYEE_HANDBOOK_REVISION_YEAR,
    revisionNumber: EMPLOYEE_HANDBOOK_REVISION_NUMBER,
    revisionDate: EMPLOYEE_HANDBOOK_REVISION_DATE,
    ...(publicPdfDetails(
      "docs/employee/forms/form-handbook-company-letterhead.pdf",
    ) ?? {}),
    tags: ["employee", "handbook", "policy"],
  },
];

export const forms: DocumentEntry[] = [...safetyForms, ...handbookForms];

export const employeeManualSections: DocumentEntry[] = [];

export const joiningProgramDocs: DocumentEntry[] = [];

// ── Combined export ───────────────────────────────────────────────────────────

export const allDocuments: DocumentEntry[] = [...manuals, ...forms];

export function getDocumentById(id: string): DocumentEntry | undefined {
  return allDocuments.find((d) => d.id === id);
}
