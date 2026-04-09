/**
 * Documents Data
 *
 * Centralized registry of all MH Construction branded documents.
 * Used by the /resources web pages to list available manuals and forms.
 *
 * To add a new document: add an entry to the relevant array below.
 * The `pdfPath` is relative to documents/output/ and served statically.
 */

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
  category: "manual" | "form";
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
  sections?: DocumentSection[];
  tags: string[];
  /** URL to the document's QR code image for display on the website */
  qrCodeUrl?: string;
  /** R2 object key for the document PDF (relative to the docs/ prefix) */
  r2Key?: string;
}

// ── Manuals ───────────────────────────────────────────────────────────────────

export const manuals: DocumentEntry[] = [
  {
    id: "safety-manual",
    title: "MISH — Safety & Health Program",
    subtitle: "MH Construction Industrial Safety & Health Program",
    description:
      "MH Construction's 44-section Industrial Safety & Health Program (MISH) — built on the AGC Accident Prevention Program (APP) framework and fully aligned with OSHA 29 CFR 1926, WISHA/L&I (WA), OAR (OR), and IDAPA (ID) state regulations. Covers injury prevention, emergency response, PPE, fall protection, hazard communication, and all OSHA-required construction safety standards.",
    category: "manual",
    icon: "health_and_safety",
    revisionYear: 2026,
    revisionNumber: "2",
    revisionDate: "04/07/2026",
    totalSections: 45, // 00–44
    totalPages: 350,
    hasSectionPdfs: true,
    pdfPath: "/docs/safety/safety-manual-complete.pdf",
    r2Key: "docs/safety/safety-manual-complete.pdf",
    tags: ["safety", "OSHA", "field", "required", "MISH", "AGC", "APP"],
    sections: [
      {
        number: "00",
        title: "Table of Contents",
        slug: "table-of-contents",
        summary:
          "Complete index of all 44 safety program sections with page references.",
        pages: 2,
        category: "Planning & Administration",
        priority: "reference",
      },
      {
        number: "01",
        title: "Injury-Free Workplace Plan",
        slug: "injury-free-workplace-plan",
        summary:
          "Outlines MH Construction's commitment to a zero-injury jobsite culture, management responsibilities, and employee accountability.",
        pages: 8,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Project Integration",
        priority: "required",
      },
      {
        number: "02",
        title: "Drug-Free Workplace",
        slug: "drug-free-workplace",
        summary:
          "Policy for maintaining a drug and alcohol-free workplace, testing procedures, and consequences of violations.",
        pages: 6,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.23",
        priority: "required",
      },
      {
        number: "03",
        title: "Program Policy and Requirements",
        slug: "program-policy-and-requirements",
        summary:
          "Establishes the legal and regulatory framework for the safety program including OSHA compliance requirements.",
        pages: 5,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Project Integration",
        priority: "required",
      },
      {
        number: "04",
        title: "Safety and Health Orientation",
        slug: "safety-and-health-orientation",
        summary:
          "Required new-employee and subcontractor orientation covering site rules, emergency procedures, and reporting obligations.",
        pages: 7,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.21",
        pmbok: "Resource Management",
        priority: "required",
      },
      {
        number: "05",
        title: "Pre-Job Safety Planning",
        slug: "pre-job-safety-planning",
        summary:
          "Job Hazard Analysis (JHA) process, pre-task planning requirements, and site-specific safety planning.",
        pages: 6,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Risk Management",
        priority: "required",
      },
      {
        number: "06",
        title: "Emergency Response",
        slug: "emergency-response",
        summary:
          "Emergency action plans, evacuation procedures, emergency contacts, and first-aid response protocols.",
        pages: 9,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.35",
        pmbok: "Risk Management",
        priority: "required",
      },
      {
        number: "07",
        title: "Safety Bulletin Boards",
        slug: "safety-bulletin-boards",
        summary:
          "Requirements for posting mandatory OSHA and company safety notices at each job site.",
        pages: 3,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1903.2",
        priority: "required",
      },
      {
        number: "08",
        title: "Event Reporting of Incidents, Accidents & Near Misses",
        slug: "event-reporting",
        summary:
          "Procedures for reporting, investigating, and documenting all incidents, accidents, and near-miss events.",
        pages: 8,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1904",
        pmbok: "Risk Management",
        priority: "required",
      },
      {
        number: "09",
        title: "Safety and Health Meetings / Inspections",
        slug: "safety-health-meetings-inspections",
        summary:
          "Requirements for conducting regular toolbox talks, safety meetings, and site inspections.",
        pages: 5,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Quality Management",
        priority: "required",
      },
      {
        number: "10",
        title: "Personal Protective Equipment (PPE)",
        slug: "personal-protective-equipment",
        summary:
          "Required PPE for all jobsite roles, selection criteria, inspection, maintenance, and enforcement.",
        pages: 10,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.95",
        pmbok: "Resource Management",
        priority: "field",
      },
      {
        number: "11",
        title: "Fall Protection",
        slug: "fall-protection",
        summary:
          "Fall prevention systems, guardrail requirements, personal fall arrest systems, and training requirements.",
        pages: 12,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.502",
        pmbok: "Risk Management",
        priority: "required",
      },
      {
        number: "12",
        title: "Flammable and Combustible Liquids",
        slug: "flammable-combustible-liquids",
        summary:
          "Safe storage, handling, and disposal of flammable and combustible liquids on construction sites.",
        pages: 7,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.152",
        priority: "field",
      },
      {
        number: "13",
        title: "Fire Prevention",
        slug: "fire-prevention",
        summary:
          "Fire prevention plan, extinguisher placement, hot work permits, and evacuation routes.",
        pages: 8,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.150",
        priority: "required",
      },
      {
        number: "14",
        title: "Welding, Cutting, and Heating Operations",
        slug: "welding-cutting-heating",
        summary:
          "Safe procedures for welding, torch cutting, and heating operations including hot work permits.",
        pages: 9,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.350",
        priority: "field",
      },
      {
        number: "15",
        title: "Lockout / Tagout (LOTO)",
        slug: "lockout-tagout",
        summary:
          "Energy control procedures for servicing and maintaining machinery to prevent unexpected energization.",
        pages: 11,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1910.147",
        priority: "required",
      },
      {
        number: "16",
        title: "Confined Space Entry",
        slug: "confined-space-entry",
        summary:
          "Permit-required confined space procedures, atmospheric testing, rescue plans, and attendant responsibilities.",
        pages: 10,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.1200",
        priority: "required",
      },
      {
        number: "17",
        title: "Use and Care of Ladders",
        slug: "use-and-care-of-ladders",
        summary:
          "Safe use, inspection, and maintenance of portable, extension, and fixed ladders.",
        pages: 6,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.1053",
        priority: "field",
      },
      {
        number: "18",
        title: "Motor Vehicle Safety Program",
        slug: "motor-vehicle-safety",
        summary:
          "Company vehicle use policy, driver qualification requirements, and safe driving standards.",
        pages: 7,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.600",
        priority: "required",
      },
      {
        number: "19",
        title: "Equipment Maintenance and Inspection",
        slug: "equipment-maintenance-inspection",
        summary:
          "Pre-use inspection checklists, maintenance schedules, and out-of-service procedures for construction equipment.",
        pages: 8,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Quality Management",
        priority: "field",
      },
      {
        number: "20",
        title: "Aerial Lifts and Elevating Work Platforms",
        slug: "aerial-lifts-elevating-work-platforms",
        summary:
          "Safe operation, pre-use inspection, and operator training for boom lifts, scissor lifts, and aerial platforms.",
        pages: 9,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.453",
        priority: "field",
      },
      {
        number: "21",
        title: "Crane-Suspended Work Platforms",
        slug: "crane-suspended-work-platforms",
        summary:
          "Requirements for personnel hoisting using cranes, inspection criteria, and load calculations.",
        pages: 7,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.1431",
        priority: "field",
      },
      {
        number: "22",
        title: "Use and Handling of Scaffolds",
        slug: "scaffolds",
        summary:
          "Scaffold erection, inspection, capacity requirements, and safe access procedures per OSHA standards.",
        pages: 11,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.451",
        priority: "field",
      },
      {
        number: "23",
        title: "Industrial Hygiene Program",
        slug: "industrial-hygiene",
        summary:
          "Prevention and control of occupational hazards including noise, dust, chemical exposure, and ergonomics.",
        pages: 8,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.55",
        pmbok: "Resource Management",
        priority: "required",
      },
      {
        number: "24",
        title: "Contractor Hazard Communication Program",
        slug: "hazard-communication",
        summary:
          "GHS/HazCom requirements, SDS management, chemical labeling, and employee right-to-know training.",
        pages: 9,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.59",
        priority: "required",
      },
      {
        number: "25",
        title: "Heat-Related Illness Prevention",
        slug: "heat-illness-prevention",
        summary:
          "Recognition, prevention, and response to heat exhaustion and heat stroke on outdoor jobsites.",
        pages: 7,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.51",
        priority: "field",
      },
      {
        number: "26",
        title: "Excavation, Trenching, and Shoring",
        slug: "excavation-trenching-shoring",
        summary:
          "Soil classification, sloping, shoring, and shielding requirements for safe excavation work.",
        pages: 10,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.652",
        pmbok: "Risk Management",
        priority: "field",
      },
      {
        number: "27",
        title: "Construction Equipment Modifications and Fabrications",
        slug: "equipment-modifications",
        summary:
          "Approval process and engineering requirements for any field modification of construction equipment.",
        pages: 5,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.20",
        priority: "reference",
      },
      {
        number: "28",
        title: "Housekeeping",
        slug: "housekeeping",
        summary:
          "Jobsite cleanliness standards to reduce slip, trip, and fall hazards and maintain an organized work area.",
        pages: 4,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.25",
        priority: "field",
      },
      {
        number: "29",
        title: "Electrical Safety",
        slug: "electrical-safety",
        summary:
          "Electrical hazard recognition, GFCI requirements, lockout/tagout for electrical systems, and safe work practices.",
        pages: 10,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.400",
        priority: "required",
      },
      {
        number: "30",
        title: "Signs, Signals, and Barricades",
        slug: "signs-signals-barricades",
        summary:
          "Requirements for traffic control, safety signage, and barricading hazardous areas.",
        pages: 6,
        category: "Site Control & Environment",
        oshaRef: "29 CFR 1926.200",
        priority: "field",
      },
      {
        number: "31",
        title: "Miscellaneous Construction Requirements",
        slug: "miscellaneous-construction",
        summary:
          "Additional OSHA-required safety standards not covered in standalone sections.",
        pages: 8,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926",
        priority: "reference",
      },
      {
        number: "32",
        title: "Respiratory Protection",
        slug: "respiratory-protection",
        summary:
          "Respirator selection, fit testing, medical evaluation, and maintenance procedures.",
        pages: 9,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.103",
        priority: "required",
      },
      {
        number: "33",
        title: "Floor Openings, Open-Sided Surfaces, and Ramps",
        slug: "floor-openings-open-surfaces",
        summary:
          "Guarding requirements for floor holes, wall openings, elevated platforms, and construction ramps.",
        pages: 7,
        category: "Physical Hazards",
        oshaRef: "29 CFR 1926.502",
        priority: "field",
      },
      {
        number: "34",
        title: "Compressed Gas / Compressed Air",
        slug: "compressed-gas-air",
        summary:
          "Safe handling, storage, and use of compressed gas cylinders and pneumatic tools.",
        pages: 6,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.350",
        priority: "field",
      },
      {
        number: "35",
        title: "Rigging",
        slug: "rigging",
        summary:
          "Rigging equipment inspection, load capacity, hand signals, and lift planning requirements.",
        pages: 10,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.251",
        priority: "field",
      },
      {
        number: "36",
        title: "Hand and Portable Power Tools",
        slug: "hand-portable-power-tools",
        summary:
          "Safe use, inspection, and maintenance of hand tools and portable power tools.",
        pages: 7,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.300",
        priority: "field",
      },
      {
        number: "37",
        title: "Concrete and Masonry Construction",
        slug: "concrete-masonry",
        summary:
          "Safety requirements for concrete forming, placement, curing, and masonry operations.",
        pages: 8,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1926.701",
        priority: "field",
      },
      {
        number: "38",
        title: "Commercial Drivers Drug and Alcohol Program",
        slug: "commercial-drivers-drug-alcohol",
        summary:
          "DOT-compliant drug and alcohol testing program for CDL drivers operating company vehicles.",
        pages: 9,
        category: "Personnel & Policy",
        oshaRef: "49 CFR Part 382",
        priority: "required",
      },
      {
        number: "39",
        title: "Subcontractor Management Plan",
        slug: "subcontractor-management",
        summary:
          "Pre-qualification requirements, safety expectations, and oversight procedures for subcontractors.",
        pages: 7,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.20",
        pmbok: "Procurement Management",
        priority: "required",
      },
      {
        number: "40",
        title: "Waste Management Plan",
        slug: "waste-management",
        summary:
          "Construction waste disposal, recycling requirements, and environmental compliance standards.",
        pages: 5,
        category: "Planning & Administration",
        oshaRef: "29 CFR 1926.25",
        priority: "required",
      },
      {
        number: "41",
        title: "Short Service Employee Program",
        slug: "short-service-employee",
        summary:
          "Enhanced supervision and mentoring requirements for employees with less than 6 months of experience.",
        pages: 6,
        category: "Personnel & Policy",
        oshaRef: "29 CFR 1926.21",
        pmbok: "Resource Management",
        priority: "required",
      },
      {
        number: "42",
        title: "Forklift / Truck Safety",
        slug: "forklift-truck-safety",
        summary:
          "Forklift operator certification, pre-use inspection, load handling, and pedestrian safety.",
        pages: 8,
        category: "Equipment & Operations",
        oshaRef: "29 CFR 1910.178",
        priority: "field",
      },
      {
        number: "43",
        title: "Bloodborne Pathogens",
        slug: "bloodborne-pathogens",
        summary:
          "Exposure control plan, PPE requirements, and post-exposure procedures for bloodborne pathogen risks.",
        pages: 7,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1910.1030",
        priority: "required",
      },
      {
        number: "44",
        title: "Silica Exposure Control",
        slug: "silica-exposure-control",
        summary:
          "Written exposure control plan, engineering controls, and medical surveillance for respirable crystalline silica.",
        pages: 9,
        category: "Health & Industrial Hygiene",
        oshaRef: "29 CFR 1926.1153",
        priority: "required",
      },
    ],
  },
];

// ── Standalone Forms ──────────────────────────────────────────────────────────

export const forms: DocumentEntry[] = [
  {
    id: "toolbox-talk",
    title: "Toolbox Talk",
    subtitle: "Pre-Work Safety Briefing",
    description:
      "Branded one-page form for conducting and documenting daily pre-work safety briefings. Includes topic area, key points, attendance sign-off (15 rows), and foreman signature.",
    category: "form",
    icon: "record_voice_over",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/toolbox-talk.pdf",
    r2Key: "docs/safety/forms/toolbox-talk.pdf",
    tags: ["safety", "field", "daily", "sign-off"],
  },
  {
    id: "incident-report",
    title: "Incident / Near-Miss Report",
    subtitle: "MISH Section 08 — Event Reporting",
    description:
      "OSHA-aligned form for documenting workplace incidents, injuries, accidents, and near-miss events per MISH Section 08 and OSHA 29 CFR 1904. Includes root-cause analysis and corrective-action sections.",
    category: "form",
    icon: "report_problem",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/incident-report.pdf",
    r2Key: "docs/safety/forms/incident-report.pdf",
    tags: ["safety", "reporting", "OSHA", "incident"],
  },
  {
    id: "jha",
    title: "Job Hazard Analysis (JHA)",
    subtitle: "MISH Section 05 — Pre-Task Planning",
    description:
      "Systematic breakdown of job steps, associated hazards, and corrective actions before beginning work. Required by MISH Section 05 and OSHA 29 CFR 1926.20 for all non-routine and high-risk tasks.",
    category: "form",
    icon: "fact_check",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/jha.pdf",
    r2Key: "docs/safety/forms/jha.pdf",
    tags: ["safety", "planning", "hazard", "pre-task"],
  },
  {
    id: "equipment-checklist",
    title: "Equipment Inspection Checklist",
    subtitle: "MISH Sections 19 / 20 / 42 — Pre-Use Inspection",
    description:
      "Daily pre-use inspection checklist for construction equipment, aerial lifts, and forklifts per MISH Sections 19, 20, and 42. 23-point checklist with Pass/Fail/N-A columns and tag-out decision block.",
    category: "form",
    icon: "checklist",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/equipment-checklist.pdf",
    r2Key: "docs/safety/forms/equipment-checklist.pdf",
    tags: ["equipment", "inspection", "daily", "field"],
  },
  {
    id: "signin-log",
    title: "Project Sign-In / Visitor Log",
    subtitle: "MISH Sections 04 & 07 — Site Access Record",
    description:
      "Daily landscape-format log for recording all personnel and visitors entering the job site, including company, trade, time in/out, emergency contact, and safety orientation status.",
    category: "form",
    icon: "assignment_ind",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/signin-log.pdf",
    r2Key: "docs/safety/forms/signin-log.pdf",
    tags: ["field", "access", "daily", "log"],
  },
  {
    id: "sub-prequal",
    title: "Subcontractor Pre-Qualification Form",
    subtitle: "MISH Section 39 — Vetting & Compliance",
    description:
      "Required MISH Section 39 documentation for onboarding subcontractors, including license verification, insurance certificates, 3-year safety record, EMR, and AGC APP program review.",
    category: "form",
    icon: "verified",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/sub-prequal.pdf",
    r2Key: "docs/safety/forms/sub-prequal.pdf",
    tags: ["subcontractor", "compliance", "onboarding"],
  },
  {
    id: "change-order",
    title: "Change Order / Field Notice",
    subtitle: "Scope Change Documentation",
    description:
      "Field-level documentation for scope changes, owner-directed work, and design deviations requiring written authorization.",
    category: "form",
    icon: "edit_document",
    revisionYear: 2026,
    pdfPath: "/docs/safety/forms/change-order.pdf",
    r2Key: "docs/safety/forms/change-order.pdf",
    tags: ["project", "field", "change-order", "documentation"],
  },
];

// ── Combined export ───────────────────────────────────────────────────────────

export const allDocuments: DocumentEntry[] = [...manuals, ...forms];

export function getDocumentById(id: string): DocumentEntry | undefined {
  return allDocuments.find((d) => d.id === id);
}

export function getSectionBySlug(
  documentId: string,
  slug: string,
): DocumentSection | undefined {
  const doc = getDocumentById(documentId);
  return doc?.sections?.find((s) => s.slug === slug);
}
