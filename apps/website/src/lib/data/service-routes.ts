export interface ServiceRouteData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  summary: string;
  category: string;
  overview: string;
  focusAreas: string[];
  technicalPriorities: string[];
  deliverySteps: string[];
  safetyCommitments: string[];
  ctaText: string;
  ctaHref: string;
}

export const serviceRoutes: ServiceRouteData[] = [
  {
    slug: "commercial-construction",
    title: "Mission-Ready Construction",
    metaTitle: "Mission-Ready Construction Services | MH Construction",
    metaDescription:
      "Plan and deliver mission-ready construction with a disciplined partner that keeps scope, budget, safety, and schedule aligned from kickoff through handoff.",
    ogImage: "/images/og/services/commercial-construction.webp",
    summary:
      "MH Construction delivers AG and winery facilities, mission-ready fit-outs, and municipal-adjacent projects with Procore-led controls, clear ownership, and disciplined field execution.",
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
    ctaText: "Schedule a mission scope review",
    ctaHref: "/contact",
  },
  {
    slug: "municipal-government",
    title: "Municipal & Government",
    metaTitle: "Municipal and Government Construction | MH Construction",
    metaDescription:
      "Support municipal and government construction with compliance-aware planning, transparent communication, and disciplined field execution.",
    ogImage: "/images/og/services/municipal-government.webp",
    summary:
      "MH Construction supports municipal and government delivery with compliance-focused planning, public mission-partner coordination, and Procore-based reporting.",
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
    ctaText: "Request a municipal delivery review",
    ctaHref: "/contact",
  },
  {
    slug: "drywall-interiors",
    title: "Drywall & Interiors",
    metaTitle: "Drywall and Interior Construction Services | MH Construction",
    metaDescription:
      "Deliver drywall and interior build-outs with crisp coordination, clean finishes, and efficient sequencing for occupied or fast-track spaces.",
    ogImage: "/images/og/services/drywall-interiors.webp",
    summary:
      "MH Construction delivers drywall and interior packages with reliable sequencing, finish discipline, and tight coordination for commercial TI and light industrial facilities.",
    category: "Drywall & Interiors",
    overview:
      "Use this service for fit-outs, interior partitions, insulation, and finish work where occupied operations and handoff deadlines matter. This service is focused on commercial and industrial scopes.",
    focusAreas: [
      "Metal stud framing and drywall installation",
      "Interior finish and interface coordination",
      "Occupied-space sequencing and protection",
      "Punch-list control and handoff",
    ],
    technicalPriorities: [
      "Surface and substrate readiness",
      "Layout and opening accuracy",
      "Finish quality control",
      "Clean sequencing across trades",
    ],
    deliverySteps: [
      "Verify layout, interfaces, and finish requirements.",
      "Install framing, board, and insulation by phase.",
      "Coordinate follow-on trades to protect quality and schedule.",
      "Complete walk-throughs and close punch items.",
    ],
    safetyCommitments: [
      "Dust control and daily cleanup",
      "Safe overhead, lift, and ladder practices",
      "Material staging that preserves egress and access",
      "Finish protection in occupied spaces",
    ],
    ctaText: "Plan a drywall and interiors execution review",
    ctaHref: "/contact",
  },
  {
    slug: "restoration-remodeling",
    title: "Restoration & Remodeling",
    metaTitle: "Restoration and Remodeling Services | MH Construction",
    metaDescription:
      "Restore damaged spaces and remodel existing facilities with disciplined recovery planning, practical sequencing, and clear client communication.",
    ogImage: "/images/og/services/restoration-remodeling.webp",
    summary:
      "MH Construction restores and remodels occupied spaces with practical field planning, controlled sequencing, and direct owner communication after damage or disruption.",
    category: "Restoration & Remodeling",
    overview:
      "Use this service for repair, tenant recovery, and phased remodel work where operations must continue during construction. Delivery is focused on commercial and industrial facilities.",
    focusAreas: [
      "Damage assessment and stabilization planning",
      "Occupied remodel sequencing and controls",
      "Selective demolition and rebuild",
      "Finish restoration and turnover cleanup",
    ],
    technicalPriorities: [
      "Moisture and damage containment",
      "Phased access and continuity planning",
      "Material replacement matching",
      "Clear owner reporting",
    ],
    deliverySteps: [
      "Confirm damage scope and immediate stabilization needs.",
      "Build a phased plan to protect occupied operations.",
      "Restore structure, finishes, and systems in sequence.",
      "Verify repaired areas against handoff requirements.",
    ],
    safetyCommitments: [
      "Hazard containment and controlled work zones",
      "Moisture, dust, and debris controls",
      "Utility isolation before selective demolition",
      "Consistent documentation for owner and insurer review",
    ],
    ctaText: "Start a restoration and remodeling scope review",
    ctaHref: "/contact",
  },
];

export function getServiceRouteBySlug(
  slug: string,
): ServiceRouteData | undefined {
  return serviceRoutes.find((service) => service.slug === slug);
}

export function getServiceRouteSlugs(): string[] {
  return serviceRoutes.map((service) => service.slug);
}
