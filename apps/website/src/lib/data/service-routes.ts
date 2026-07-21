export type ServicePublishStatus = "published" | "draft";

import {
  type ContentGovernanceRecord,
  isPubliclyVisibleContent,
} from "@/lib/content/content-governance";

export interface ServiceRecord {
  slug: string;
  title: string;
  summary: string;
  supportedProjectTypes: string[];
  processStatements: string[];
  proofReferences: string[];
  ctaLabel: string;
  ctaHref: string;
  publishStatus: ServicePublishStatus;
  governance?: ContentGovernanceRecord;
  spanishMessageKeys?: {
    title?: string;
    summary?: string;
  };
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  category: string;
  overview: string;
  focusAreas: string[];
  technicalPriorities: string[];
  deliverySteps: string[];
  safetyCommitments: string[];
}

const SERVICE_REVIEW_WINDOW = "2027-06-30";

function getServiceGovernance(
  service: Pick<ServiceRecord, "slug" | "publishStatus" | "proofReferences">,
): ContentGovernanceRecord {
  const isPublic = service.publishStatus === "published";

  return {
    stableId: `service-route:${service.slug}`,
    ownerRole: "operations-manager",
    lifecycle: isPublic ? "published" : "draft",
    approvalState: isPublic ? "approved" : "pending",
    publishState: isPublic ? "public" : "internal",
    ...(isPublic
      ? { approvalReference: "Service lane approved for public routing" }
      : {}),
    nextReviewAt: SERVICE_REVIEW_WINDOW,
    sourceReferences:
      service.proofReferences.length > 0
        ? service.proofReferences.map((reference) => ({
            sourceType: "route" as const,
            reference,
          }))
        : [
            {
              sourceType: "internal-record",
              reference: `service:${service.slug}`,
            },
          ],
  };
}

const serviceRouteSource: Omit<ServiceRecord, "governance">[] = [
  {
    slug: "commercial-construction",
    title: "Mission-Ready Construction",
    summary:
      "Commercial construction delivery with disciplined scope, schedule, and field coordination across WA, OR, and ID.",
    supportedProjectTypes: [
      "Commercial shell and interiors",
      "Municipal support facilities",
      "Agricultural and winery facilities",
      "Light industrial project scopes",
    ],
    processStatements: [
      "Align scope and constraints before procurement.",
      "Coordinate preconstruction, field execution, and handoff through one operating model.",
      "Maintain owner-visible communication and decision logs throughout delivery.",
    ],
    proofReferences: [
      "projects/volm-companies-remodel",
      "projects/auto-lot-nw",
      "projects/franklin-county-coroners-office-morgue",
    ],
    ctaLabel: "Schedule a mission scope review",
    ctaHref: "/contact",
    publishStatus: "published",
    spanishMessageKeys: {
      title: "services.records.commercial-construction.title",
      summary: "services.records.commercial-construction.summary",
    },
    metaTitle: "Mission-Ready Construction Services | MH Construction",
    metaDescription:
      "Plan and deliver mission-ready construction with a disciplined partner that keeps scope, budget, safety, and schedule aligned from kickoff through handoff.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Mission-Ready Construction",
    overview:
      "Use this service for new builds and renovations where multiple trades, schedule pressure, and operating constraints must stay aligned. Core strengths include Procore mission management, pole building delivery, door and hardware installation, and winery pond liner scopes for wastewater and sludge runoff control.",
    focusAreas: [
      "Predeployment scope alignment and risk review",
      "Permitting and design-team coordination",
      "Commercial shell and fit-out delivery",
      "Door and hardware package execution",
      "Pole building and post-frame delivery",
      "Winery pond liner installation for wastewater and sludge control",
      "Owner-facing schedule and decision controls",
    ],
    technicalPriorities: [
      "Procurement-ready bid packages",
      "Phased field sequencing",
      "Budget and change visibility",
      "Code and ADA compliance",
    ],
    deliverySteps: [
      "Confirm scope, success criteria, and operating constraints.",
      "Lock schedule, procurement path, and responsibility matrix.",
      "Coordinate RFIs, submittals, inspections, and field production.",
      "Close out with punch completion and handoff documentation.",
    ],
    safetyCommitments: [
      "Daily pre-task planning and field hazard checks",
      "Housekeeping and controlled site access",
      "Documented quality and safety checkpoints",
      "Defined escalation for change and hazard conditions",
    ],
  },
  {
    slug: "municipal-public-work",
    title: "Municipal & Government",
    summary:
      "Public-sector construction support with compliance-forward planning and documented coordination from kickoff through closeout.",
    supportedProjectTypes: [
      "Municipal buildings",
      "Civic renovations",
      "Grant-funded facilities",
      "Agency-facing project scopes",
    ],
    processStatements: [
      "Map procurement and reporting requirements at project start.",
      "Maintain auditable documentation and compliance tracking.",
      "Coordinate field execution for active public environments.",
    ],
    proofReferences: [
      "projects/franklin-county-coroners-office-morgue",
      "public-sector/overview",
    ],
    ctaLabel: "Request a municipal delivery review",
    ctaHref: "/public-sector",
    publishStatus: "published",
    spanishMessageKeys: {
      title: "services.records.municipal-public-work.title",
      summary: "services.records.municipal-public-work.summary",
    },
    metaTitle: "Municipal and Government Construction | MH Construction",
    metaDescription:
      "Support municipal and government construction with compliance-aware planning, transparent communication, and disciplined field execution.",
    ogImage: "/images/og/services/municipal-government.webp",
    category: "Municipal & Government",
    overview:
      "Use this service for civic buildings, public facilities, and agency renovations that require procurement discipline, auditable records, and active-site safety controls.",
    focusAreas: [
      "Public works documentation and mission-partner reporting",
      "Grant-funded project process support",
      "Occupied-site renovation and continuity planning",
      "Accessibility and life-safety compliance",
    ],
    technicalPriorities: [
      "Compliance tracking and audit trails",
      "Procurement transparency",
      "Agency and mission-partner reporting",
      "ADA-ready turnover",
    ],
    deliverySteps: [
      "Review public scope requirements and procurement rules.",
      "Build a field plan that protects access and operations.",
      "Track submittals, inspections, and required reporting.",
      "Deliver completion records and agency-ready handoff.",
    ],
    safetyCommitments: [
      "Controlled public access at active work zones",
      "Documented safety meetings and site logs",
      "Dust, noise, and disruption controls",
      "Immediate response and escalation for hazards",
    ],
  },
  {
    slug: "commercial-tenant-improvements",
    title: "Commercial Tenant Improvements",
    summary:
      "Occupied-space tenant improvements with sequencing, schedule control, and clear communication for active facilities.",
    supportedProjectTypes: [
      "Occupied commercial interiors",
      "Office and retail tenant improvements",
      "Healthcare and service environments",
      "Targeted renovation programs",
    ],
    processStatements: [
      "Define scope and interfaces before field start.",
      "Coordinate by phase to protect active operations.",
      "Track quality and punch closeout against handoff requirements.",
    ],
    proofReferences: ["projects/volm-companies-remodel"],
    ctaLabel: "Start a tenant improvement scope review",
    ctaHref: "/contact",
    publishStatus: "published",
    spanishMessageKeys: {
      title: "services.records.commercial-tenant-improvements.title",
      summary: "services.records.commercial-tenant-improvements.summary",
    },
    metaTitle: "Commercial Tenant Improvement Services | MH Construction",
    metaDescription:
      "Deliver occupied-space commercial tenant improvements with disciplined sequencing, documented controls, and reliable closeout.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Commercial TI",
    overview:
      "Use this service for fit-outs and renovation scopes where occupied operations and handoff deadlines matter. Delivery prioritizes business continuity and structured communication.",
    focusAreas: [
      "Interior fit-out sequencing",
      "Door and hardware coordination",
      "Occupied-space sequencing and protection",
      "Punch-list control and handoff",
    ],
    technicalPriorities: [
      "Constructability and interface readiness",
      "Finish quality control",
      "Clean sequencing across trades",
    ],
    deliverySteps: [
      "Confirm scope matrix and occupied-site constraints.",
      "Sequence trade scopes around active operations.",
      "Coordinate closeout and turnover records for owner signoff.",
      "Complete walk-throughs and close punch items.",
    ],
    safetyCommitments: [
      "Dust control and daily cleanup",
      "Safe overhead, lift, and ladder practices",
      "Material staging that preserves egress and access",
      "Finish protection in occupied spaces",
    ],
  },
  {
    slug: "agricultural-winery-construction",
    title: "Agricultural & Winery Construction",
    summary:
      "Agricultural and winery project delivery with technical sequencing, field coordination, and documentation controls.",
    supportedProjectTypes: [
      "Winery production facilities",
      "Agricultural support facilities",
      "Specialized wastewater and runoff-control scopes",
      "Operationally constrained rural commercial facilities",
    ],
    processStatements: [
      "Coordinate specialty scopes with facility operations.",
      "Align procurement and field sequencing for technical equipment and systems.",
      "Use documented controls for closeout and owner turnover.",
    ],
    proofReferences: [
      "projects/darigold-pasco-production-facility",
      "projects/volm-companies-remodel",
    ],
    ctaLabel: "Review agricultural and winery capabilities",
    ctaHref: "/projects",
    publishStatus: "published",
    spanishMessageKeys: {
      title: "services.records.agricultural-winery-construction.title",
      summary: "services.records.agricultural-winery-construction.summary",
    },
    metaTitle:
      "Agricultural and Winery Construction Services | MH Construction",
    metaDescription:
      "Deliver agricultural and winery construction with technical sequencing, scope controls, and field accountability.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Agricultural and Winery",
    overview:
      "Use this service when agricultural or winery facilities require technical sequencing, operational continuity, and practical field controls.",
    focusAreas: [
      "Facility-specific constructability planning",
      "Operational continuity during field execution",
      "Specialty scope integration and sequencing",
      "Closeout documentation and handoff readiness",
    ],
    technicalPriorities: [
      "Technical equipment and systems coordination",
      "Scope ownership and documentation control",
      "Schedule protection across interdependent scopes",
      "Owner-facing reporting cadence",
    ],
    deliverySteps: [
      "Validate facility requirements and delivery constraints.",
      "Coordinate specialty procurement and field sequence.",
      "Execute field scopes with active-operations controls.",
      "Complete turnover records and closeout confirmation.",
    ],
    safetyCommitments: [
      "Daily pre-task planning and jobsite hazard controls",
      "Access and logistics controls for active operations",
      "Documented quality and safety checkpoints",
      "Escalation path for safety and scope risks",
    ],
  },
  {
    slug: "light-industrial-construction",
    title: "Light Industrial Construction",
    summary:
      "Industrial project delivery for warehouses and processing facilities with safety-first field execution and practical layouts.",
    supportedProjectTypes: [
      "Warehouse and distribution facilities",
      "Processing support spaces",
      "Industrial tenant improvements",
      "Operational facility upgrades",
    ],
    processStatements: [
      "Define practical field sequence around safety and operations.",
      "Coordinate procurement and installation for industrial systems.",
      "Maintain disciplined closeout and turnover documentation.",
    ],
    proofReferences: ["projects/darigold-pasco-production-facility"],
    ctaLabel: "Discuss your industrial project scope",
    ctaHref: "/contact",
    publishStatus: "published",
    metaTitle: "Light Industrial Construction Services | MH Construction",
    metaDescription:
      "Plan and execute light industrial construction with disciplined safety controls and practical field coordination.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Light Industrial",
    overview:
      "Use this service for industrial facility scopes requiring durable execution, safety controls, and coordinated turnover.",
    focusAreas: [
      "Warehouse and processing layouts",
      "Industrial systems coordination",
      "Safety-forward field sequencing",
      "Closeout and handoff discipline",
    ],
    technicalPriorities: [
      "Code and life-safety alignment",
      "Field logistics planning",
      "Quality checkpoints during execution",
      "Owner-visible status reporting",
    ],
    deliverySteps: [
      "Validate industrial scope and operating constraints.",
      "Build field and procurement sequence plan.",
      "Execute with superintendent and PM control loops.",
      "Close out with turnover-ready documentation.",
    ],
    safetyCommitments: [
      "Pre-task safety planning and controls",
      "Active site access and logistics management",
      "Documented inspections and quality checks",
      "Escalation and response procedures",
    ],
  },
  {
    slug: "preconstruction-planning",
    title: "Preconstruction and Planning",
    summary:
      "Preconstruction planning that clarifies scope, budget path, schedule logic, and risk controls before mobilization.",
    supportedProjectTypes: [
      "Commercial new builds",
      "Tenant improvement programs",
      "Municipal and public-sector scopes",
      "Agricultural and winery facilities",
    ],
    processStatements: [
      "Align mission goals with constraints before field commitment.",
      "Define budget controls and sequencing strategy.",
      "Document risk assumptions and mitigation actions.",
    ],
    proofReferences: [
      "services/hub-process",
      "projects/volm-companies-remodel",
    ],
    ctaLabel: "Start preconstruction planning",
    ctaHref: "/contact",
    publishStatus: "published",
    metaTitle: "Preconstruction Planning Services | MH Construction",
    metaDescription:
      "Reduce delivery risk with preconstruction planning that aligns scope, budget, sequencing, and decision controls.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Preconstruction",
    overview:
      "Use this service when project teams need disciplined scope architecture, risk planning, and budget control before execution.",
    focusAreas: [
      "Scope and constructability validation",
      "Budget and schedule modeling",
      "Procurement and sequencing strategy",
      "Risk identification and mitigation planning",
    ],
    technicalPriorities: [
      "Decision-log clarity",
      "Trade coordination assumptions",
      "Cost and schedule guardrails",
      "Pre-mobilization readiness",
    ],
    deliverySteps: [
      "Gather scope, constraints, and mission criteria.",
      "Model budget and sequence options.",
      "Align stakeholders on delivery path and controls.",
      "Publish readiness plan for mobilization.",
    ],
    safetyCommitments: [
      "Early hazard planning before field work",
      "Safety controls integrated into sequence planning",
      "Documentation standards for handoff to field teams",
      "Defined escalation for planning-stage risk",
    ],
  },
  {
    slug: "procurement-trade-partnerships",
    title: "Procurement and Trade Partnerships",
    summary:
      "Material and trade coordination that supports schedule stability, quality controls, and clear accountability.",
    supportedProjectTypes: [
      "Commercial and industrial procurement packages",
      "Specialty-scope trade coordination",
      "Long-lead material planning",
      "Mission-critical phased procurement",
    ],
    processStatements: [
      "Coordinate procurement with field sequence and schedule needs.",
      "Track vendor commitments and long-lead risks.",
      "Maintain documentation for mission-partner visibility.",
    ],
    proofReferences: ["services/hub-procurement", "allies/network"],
    ctaLabel: "View trade partnership path",
    ctaHref: "/allies",
    publishStatus: "published",
    metaTitle: "Procurement and Trade Partnership Services | MH Construction",
    metaDescription:
      "Coordinate procurement and trade partners with disciplined planning, schedule alignment, and documented controls.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Procurement",
    overview:
      "Use this service when delivery requires coordinated material sourcing, trade alignment, and long-lead schedule control.",
    focusAreas: [
      "Material sourcing and timing",
      "Trade partner coordination",
      "Cost and commitment visibility",
      "Field-readiness planning",
    ],
    technicalPriorities: [
      "Long-lead tracking",
      "Procurement documentation",
      "Install-sequence coordination",
      "Issue escalation workflows",
    ],
    deliverySteps: [
      "Validate procurement requirements and sequencing.",
      "Coordinate suppliers and trade partners.",
      "Track delivery milestones and field readiness.",
      "Close procurement packages with supporting records.",
    ],
    safetyCommitments: [
      "Safe staging and logistics planning",
      "Access control for deliveries and field movement",
      "Coordination with site-specific safety plans",
      "Documented issue response and escalation",
    ],
  },
  {
    slug: "custom-home-builds-select",
    title: "Select Custom Home Builds",
    summary:
      "Custom home opportunities are reviewed by scope fit and delivery conditions within a commercial-first operating model.",
    supportedProjectTypes: [
      "Scope-qualified custom residential builds",
      "Residential work that aligns with delivery capacity",
    ],
    processStatements: [
      "Evaluate fit against current delivery priorities.",
      "Confirm scope and schedule alignment before commitment.",
    ],
    proofReferences: ["services/hub-qualification"],
    ctaLabel: "Request project qualification",
    ctaHref: "/contact",
    publishStatus: "draft",
    metaTitle: "Select Custom Home Build Qualification | MH Construction",
    metaDescription:
      "Review custom home build opportunities against scope fit, schedule alignment, and delivery conditions.",
    ogImage: "/images/og/services/commercial-construction.webp",
    category: "Qualification",
    overview:
      "This record stays in draft until full detail content and approval are published for a public service page.",
    focusAreas: ["Scope fit assessment", "Schedule and resource alignment"],
    technicalPriorities: ["Qualification controls", "Approval workflow"],
    deliverySteps: [
      "Submit project qualification details.",
      "Review fit against operating capacity.",
    ],
    safetyCommitments: ["Apply standard safety planning on approved work."],
  },
];

export const serviceRoutes: ServiceRecord[] = serviceRouteSource.map(
  (service) => ({
    ...service,
    governance: getServiceGovernance(service),
  }),
);

export function getServiceRouteBySlug(slug: string): ServiceRecord | undefined {
  return serviceRoutes.find((service) => service.slug === slug);
}

export function getServiceRouteSlugs(): string[] {
  return serviceRoutes.map((service) => service.slug);
}

export function getPublishedServiceRoutes(): ServiceRecord[] {
  return serviceRoutes.filter(
    (service) =>
      service.publishStatus === "published" &&
      (service.governance
        ? isPubliclyVisibleContent(service.governance)
        : true),
  );
}

export function getPublishedServiceRouteSlugs(): string[] {
  return getPublishedServiceRoutes().map((service) => service.slug);
}

export function isServiceDetailReady(service: ServiceRecord): boolean {
  return (
    service.publishStatus === "published" &&
    (service.governance
      ? isPubliclyVisibleContent(service.governance)
      : true) &&
    service.summary.trim().length > 0 &&
    service.overview.trim().length > 0 &&
    service.supportedProjectTypes.length > 0 &&
    service.processStatements.length > 0 &&
    service.proofReferences.length > 0 &&
    service.focusAreas.length > 0 &&
    service.ctaLabel.trim().length > 0 &&
    service.ctaHref.trim().length > 0
  );
}

export function getPublishedServiceDetailRoutes(): ServiceRecord[] {
  return getPublishedServiceRoutes().filter((service) =>
    isServiceDetailReady(service),
  );
}

export function getPublishedServiceDetailRouteSlugs(): string[] {
  return getPublishedServiceDetailRoutes().map((service) => service.slug);
}

export function getPublishedServiceDetailBySlug(
  slug: string,
): ServiceRecord | undefined {
  const service = getServiceRouteBySlug(slug);
  if (!service || !isServiceDetailReady(service)) {
    return undefined;
  }

  return service;
}
