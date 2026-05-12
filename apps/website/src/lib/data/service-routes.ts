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
    title: "Commercial Construction",
    metaTitle: "Commercial Construction Services | MH Construction",
    metaDescription:
      "Plan and deliver commercial construction with a disciplined partner that keeps scope, budget, safety, and schedule aligned from kickoff through closeout.",
    ogImage: "/images/og/services/commercial-construction.webp",
    summary:
      "MH Construction plans and delivers commercial projects with disciplined coordination, clear communication, and a practical focus on schedule control.",
    category: "Commercial Construction",
    overview:
      "Use this service line for office buildings, tenant improvements, retail space, light industrial facilities, and other commercial projects that need direct coordination and steady execution.",
    focusAreas: [
      "Preconstruction planning and scope alignment",
      "Permitting and consultant coordination",
      "Commercial shell and interior build-outs",
      "Owner communication and schedule control",
    ],
    technicalPriorities: [
      "Bid package clarity",
      "Phased sequencing",
      "Budget visibility",
      "ADA and code compliance",
    ],
    deliverySteps: [
      "Confirm the project brief and success criteria.",
      "Lock the scope, schedule, and procurement path.",
      "Coordinate trades, inspections, and field updates.",
      "Close out the work with documentation and punch-list completion.",
    ],
    safetyCommitments: [
      "Daily field checks and pre-task planning",
      "Jobsite housekeeping and access control",
      "Documented quality checkpoints",
      "Clear escalation paths for change conditions",
    ],
    ctaText: "Schedule a commercial scope review",
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
      "MH Construction supports municipal and government work with clear documentation, code-aware planning, and public-sector coordination.",
    category: "Municipal & Government",
    overview:
      "Use this service line for civic buildings, public facilities, agency renovations, and grant-funded work that demands tight compliance and public accountability.",
    focusAreas: [
      "Public works coordination and documentation",
      "Grant-funded project support",
      "Occupied-building renovation planning",
      "Accessibility and life-safety compliance",
    ],
    technicalPriorities: [
      "Compliance tracking",
      "Procurement transparency",
      "Stakeholder reporting",
      "ADA-ready delivery",
    ],
    deliverySteps: [
      "Review the public scope and procurement rules.",
      "Build a field plan that protects operations and access.",
      "Track submittals, inspections, and reporting requirements.",
      "Complete closeout with clean records and clear handoff.",
    ],
    safetyCommitments: [
      "Controlled public access around work zones",
      "Documented safety meetings and site logs",
      "Dust, noise, and disruption management",
      "Immediate response to field hazards",
    ],
    ctaText: "Request a municipal project review",
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
      "MH Construction delivers drywall and interior scopes with clean finish standards, fast sequencing, and dependable trade coordination.",
    category: "Drywall & Interiors",
    overview:
      "Use this service line for tenant improvements, interior partitions, finish carpentry, insulation, and interior repairs that need tight detailing.",
    focusAreas: [
      "Metal stud framing and drywall installation",
      "Interior finish coordination",
      "Occupied-space work planning",
      "Punch-list and closeout discipline",
    ],
    technicalPriorities: [
      "Surface readiness",
      "Layout accuracy",
      "Finish quality",
      "Clean sequencing",
    ],
    deliverySteps: [
      "Verify layout, interfaces, and finish standards.",
      "Install framing, board, and insulation with clean sequencing.",
      "Coordinate finish trades to protect quality and schedule.",
      "Complete final walk-throughs and punch-list corrections.",
    ],
    safetyCommitments: [
      "Dust control and daily cleanup",
      "Safe overhead and ladder work",
      "Material staging that preserves clear access",
      "Finish protection in occupied areas",
    ],
    ctaText: "Plan a drywall and interiors scope",
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
      "MH Construction restores and remodels spaces with practical field planning, measured sequencing, and strong communication after damage or disruption.",
    category: "Restoration & Remodeling",
    overview:
      "Use this service line for repair work, tenant recovery, occupied remodels, and phased improvements where continuity matters as much as finish quality.",
    focusAreas: [
      "Damage assessment and recovery planning",
      "Occupied remodel sequencing",
      "Selective demolition and rebuild",
      "Finish restoration and final cleanup",
    ],
    technicalPriorities: [
      "Moisture and damage control",
      "Phased access planning",
      "Material replacement matching",
      "Clear client reporting",
    ],
    deliverySteps: [
      "Confirm the damaged scope and stabilization needs.",
      "Build a phased plan that protects the occupied area.",
      "Restore structure, finishes, and systems in sequence.",
      "Verify the repaired space against closeout requirements.",
    ],
    safetyCommitments: [
      "Hazard containment and clean work zones",
      "Moisture, dust, and debris control",
      "Careful utility isolation before demolition",
      "Consistent documentation for insurance or owner review",
    ],
    ctaText: "Start a restoration and remodeling review",
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
