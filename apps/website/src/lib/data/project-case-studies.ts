import {
  type ContentGovernanceRecord,
  isPubliclyVisibleContent,
} from "@/lib/content/content-governance";

export interface ProjectCaseStudy {
  slug: string;
  projectId: string;
  isPublished?: boolean;
  governance?: ContentGovernanceRecord;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  description: string;
  location: {
    city: string;
    state: string;
  };
  yearCompleted: number;
  category: string;
  technicalSpecs: Record<string, string | number | string[]>;
  safetyMilestones: string[];
  results: string[];
  evidenceSourceFile?: string;
  evidenceNotes?: string;
  reviewStatus?: string;
}

const DEFAULT_REVIEW_WINDOW = "2027-06-30";

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "lcsnw-tri-cities",
    projectId: "proj-006",
    isPublished: false,
    governance: {
      stableId: "project-case-study:proj-006",
      ownerRole: "marketing-manager",
      lifecycle: "draft",
      approvalState: "pending",
      publishState: "internal",
      nextReviewAt: DEFAULT_REVIEW_WINDOW,
      sourceReferences: [
        {
          sourceType: "internal-record",
          reference: "project:lcsnw-tri-cities",
          note: "Story record pending final source ingest.",
        },
      ],
    },
    title: "LCSNW Tri-Cities Office Expansion",
    metaTitle: "LCSNW Tri-Cities Office Expansion | MH Construction",
    metaDescription:
      "MH Construction completed the 38,000 sq ft LCSNW Tri-Cities office expansion in Kennewick, delivering trauma-informed youth behavioral health space.",
    ogImage: "/images/projects/project-default.webp",
    description:
      "MH Construction led the adaptive reuse of a former call center into a 38,000-square-foot trauma-informed youth behavioral health facility for Lutheran Community Services Northwest in Kennewick.",
    location: { city: "Kennewick", state: "WA" },
    yearCompleted: 2026,
    category: "Healthcare Commercial Remodel",
    technicalSpecs: {
      squareFootage: 38000,
      addedProgramSpace: 10000,
      deliveryMethod: "Adaptive reuse and interior commercial remodel",
      primaryScope: [
        "25 private counseling offices",
        "Eight conference rooms",
        "Three staff break rooms",
        "Play therapy, teen, and training rooms",
        "Mechanical, plumbing, and HVAC upgrades",
      ],
    },
    safetyMilestones: [
      "Permitted commercial remodel delivery with mechanical and plumbing scope",
      "Sequenced interior demolition and build-back for controlled trade flow",
      "Field coordination through framing, finish, and handover stages",
      "Final turnover aligned with public opening on 2026-07-13",
    ],
    results: [
      "Delivered 38,000 square feet of trauma-informed healthcare space.",
      "Expanded operating footprint by approximately 10,000 square feet.",
      "Consolidated two Kennewick offices into one service hub.",
      "Built capacity foundation for youth mental and behavioral health delivery in Tri-Cities.",
    ],
  },
  {
    slug: "volm-companies-remodel",
    projectId: "proj-007",
    isPublished: true,
    governance: {
      stableId: "project-case-study:proj-007",
      ownerRole: "marketing-manager",
      lifecycle: "published",
      approvalState: "approved",
      publishState: "public",
      approvalReference: "Verified public summary",
      nextReviewAt: DEFAULT_REVIEW_WINDOW,
      sourceReferences: [
        {
          sourceType: "document",
          reference:
            "documents/input/project-stories/volm-companies/2026-07_volm-companies-remodel_story_v1.docx",
          note: "Story record documents ROW19-0275 permit closeout.",
        },
      ],
    },
    title: "Volm Companies Remodel",
    metaTitle:
      "Volm Companies Remodel | Commercial Tenant Improvement in Pasco, WA",
    metaDescription:
      "MH Construction delivered exterior updates and commercial tenant improvements for the Volm Companies regional distribution facility in Pasco, WA.",
    ogImage:
      "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-main-entrance-and-signage-p001-photo.webp",
    description:
      "MH Construction delivered a commercial tenant improvement and exterior refresh at Volm Companies' active Pasco facility, sequencing facade and frontage updates while supporting daily logistics operations.",
    location: { city: "Pasco", state: "WA" },
    yearCompleted: 2020,
    category: "Commercial Tenant Improvement",
    technicalSpecs: {
      deliveryMethod: "Active-site tenant improvement",
      permitReference: "City of Pasco ROW19-0275",
      primaryScope: [
        "Exterior facade updates",
        "Right-of-way curb, gutter, and sidewalk improvements",
        "Main entrance and storefront glazing integration",
        "Signage and exterior finish coordination",
      ],
    },
    safetyMilestones: [
      "Sequenced right-of-way work to protect active facility access",
      "Maintained controlled personnel and logistics traffic routes",
      "Completed city permit inspection closeout for frontage scope",
      "Applied MH active-industrial-site safety protocols throughout field operations",
    ],
    results: [
      "Modernized facility frontage and exterior brand presentation.",
      "Completed tenant-improvement and right-of-way scope with documented permit closeout.",
      "Preserved operational continuity at an active regional distribution site.",
    ],
    evidenceSourceFile:
      "documents/input/project-stories/volm-companies/2026-07_volm-companies-remodel_story_v1.docx",
    evidenceNotes:
      "Story record documents ROW19-0275 permit closeout, controlled industrial sequencing, and final photography on 2020-02-05.",
    reviewStatus: "Verified public summary",
  },
  {
    slug: "darigold-pasco-production-facility",
    projectId: "proj-008",
    isPublished: true,
    governance: {
      stableId: "project-case-study:proj-008",
      ownerRole: "marketing-manager",
      lifecycle: "published",
      approvalState: "approved",
      publishState: "public",
      approvalReference: "Pending verification",
      nextReviewAt: DEFAULT_REVIEW_WINDOW,
      sourceReferences: [
        {
          sourceType: "document",
          reference:
            "documents/input/project-stories/darigold-processing-plant/2026-07_darigold-pasco-production-facility_story_v1.docx",
          note: "Package-level scope remains pending verification.",
        },
      ],
    },
    title: "Darigold Pasco Production Facility",
    metaTitle: "Darigold Pasco Production Facility | MH Construction",
    metaDescription:
      "MH Construction field documentation from Darigold's Pasco production facility, covering exterior closeout conditions and public project milestones.",
    ogImage:
      "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.webp",
    description:
      "This case study captures verified exterior conditions and public milestones for Darigold's Pasco facility while MH package-level scope confirmation remains in review.",
    location: { city: "Pasco", state: "WA" },
    yearCompleted: 2025,
    category: "Industrial Food Processing",
    technicalSpecs: {
      deliveryContext: "Multi-party industrial delivery",
      site: "8201 N Railroad Avenue, Pasco, WA",
      primaryScope: [
        "Exterior frontage condition capture",
        "Main entrance and glazing condition capture",
        "Parking, accessibility, and EV-station condition capture",
        "Loading-dock frontage condition capture",
      ],
      scopeVerificationStatus: "MH package scope pending final verification",
    },
    safetyMilestones: [
      "Documented exterior closeout conditions with date-stamped field media",
      "Maintained public-facing language tied to verified records",
      "Held package-level attribution pending contract-level confirmation",
      "Maintained verification-safe language while legal review remained in progress",
    ],
    results: [
      "Established a structured, verifiable closeout record for exterior conditions.",
      "Connected field documentation to published project milestones and site context.",
      "Published verification-safe SEO content without overclaiming unverified scope ownership.",
    ],
    evidenceSourceFile:
      "documents/input/project-stories/darigold-processing-plant/2026-07_darigold-pasco-production-facility_story_v1.docx",
    evidenceNotes:
      "Story record confirms 2025-10-22 exterior closeout documentation while MH package-level scope remains pending verification.",
    reviewStatus: "Pending verification",
  },
  {
    slug: "franklin-county-coroners-office-morgue",
    projectId: "proj-009",
    isPublished: true,
    governance: {
      stableId: "project-case-study:proj-009",
      ownerRole: "marketing-manager",
      lifecycle: "published",
      approvalState: "approved",
      publishState: "public",
      approvalReference: "Verified public summary",
      nextReviewAt: DEFAULT_REVIEW_WINDOW,
      sourceReferences: [
        {
          sourceType: "document",
          reference:
            "documents/input/project-stories/franklin-county-morgue/2026-07_franklin-county-coroners-office-morgue_story_v1.docx",
          note: "Story record confirms RFQ and design milestones.",
        },
      ],
    },
    title: "Franklin County Coroner's Office Morgue",
    metaTitle: "Franklin County Coroner's Office Morgue | MH Construction",
    metaDescription:
      "MH Construction served as general contractor for Franklin County's 1,560-square-foot Coroner's Office morgue facility in Pasco, Washington.",
    ogImage:
      "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.webp",
    description:
      "MH Construction delivered municipal new construction for Franklin County's Coroner's Office morgue facility in Pasco, supporting secure receiving, refrigeration, and examination functions at a local county site.",
    location: { city: "Pasco", state: "WA" },
    yearCompleted: 2025,
    category: "Municipal New Construction",
    technicalSpecs: {
      squareFootage: 1560,
      deliveryMethod: "Municipal design-bid-build",
      primaryScope: [
        "Receiving and release garage",
        "Walk-in refrigeration",
        "Examination and observation spaces",
        "Restroom and supporting building systems",
      ],
      designTeam: "Meier Architecture | Engineering",
    },
    safetyMilestones: [
      "Contract documents assigned contractor-controlled jobsite safety responsibilities",
      "Coordination aligned to referenced 2021 code and life-safety requirements",
      "Secure receiving and transport access integrated into facility layout",
      "Final permit closeout and inspection acceptance remain documented as TBD",
    ],
    results: [
      "Delivered a purpose-built county facility for local death-investigation operations.",
      "Reduced reliance on travel for county autopsy and examination procedures.",
      "Improved coordination with law enforcement, funeral-service, and donor-recovery partners.",
    ],
    evidenceSourceFile:
      "documents/input/project-stories/franklin-county-morgue/2026-07_franklin-county-coroners-office-morgue_story_v1.docx",
    evidenceNotes:
      "Story record confirms the RFQ and design milestones, 2025-09-01 completion, and the 2025-10-29 public opening.",
    reviewStatus: "Verified public summary",
  },
  {
    slug: "auto-lot-nw",
    projectId: "proj-010",
    isPublished: true,
    governance: {
      stableId: "project-case-study:proj-010",
      ownerRole: "marketing-manager",
      lifecycle: "published",
      approvalState: "approved",
      publishState: "public",
      nextReviewAt: DEFAULT_REVIEW_WINDOW,
      sourceReferences: [
        {
          sourceType: "internal-record",
          reference: "project:auto-lot-nw",
          note: "Legacy record pending external story document linkage.",
        },
      ],
    },
    title: "The Auto Lot",
    metaTitle:
      "The Auto Lot Dealership Project | Kennewick, WA | MH Construction",
    metaDescription:
      "MH Construction served as general contractor for The Auto Lot, a completed 4,200-square-foot dealership and showroom in Kennewick, Washington.",
    ogImage: "/images/projects/alverez-auto-lot/atc-e-20190128-p009.webp",
    description:
      "MH Construction delivered The Auto Lot dealership project in Kennewick, coordinating storefront, showroom, and site improvements to support a rebrand and capacity expansion.",
    location: { city: "Kennewick", state: "WA" },
    yearCompleted: 2024,
    category: "Commercial Automotive Dealership",
    technicalSpecs: {
      squareFootage: 4200,
      deliveryMethod: "Commercial dealership new build",
      primaryScope: [
        "Client-facing showroom environment",
        "Storefront glazing and entry elevation",
        "Paved lot circulation and striping",
        "Landscape and frontage improvements",
      ],
      designTeam: "Baker Architecture",
    },
    safetyMilestones: [
      "Integrated accessible parking and entry-route site elements",
      "Coordinated exterior and interior closeout documentation",
      "Aligned facility completion and public opening milestones",
      "Retained verification-safe project framing where detailed records were not supplied",
    ],
    results: [
      "Delivered a larger dealership site supporting increased inventory capacity.",
      "Established a modern indoor showroom and client-partner circulation environment.",
      "Supported a brand transition to The Auto Lot at a high-visibility Kennewick location.",
    ],
  },
];

function isCaseStudyPublished(project: ProjectCaseStudy): boolean {
  if (project.governance && !isPubliclyVisibleContent(project.governance)) {
    return false;
  }

  return project.isPublished !== false;
}

export function getPublishedProjectCaseStudies(): ProjectCaseStudy[] {
  return projectCaseStudies.filter((project) => isCaseStudyPublished(project));
}

export function getProjectCaseStudyBySlug(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}

export function getPublishedProjectCaseStudyBySlug(slug: string) {
  return getPublishedProjectCaseStudies().find(
    (project) => project.slug === slug,
  );
}

export function getProjectCaseStudySlugs(): string[] {
  return projectCaseStudies.map((project) => project.slug);
}

export function getPublishedProjectCaseStudySlugs(): string[] {
  return getPublishedProjectCaseStudies().map((project) => project.slug);
}
