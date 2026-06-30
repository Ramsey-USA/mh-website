export interface ProjectCaseStudy {
  slug: string;
  projectId: string;
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
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "kennewick-commercial-office-renovation",
    projectId: "proj-001",
    title: "Kennewick Commercial Office Renovation",
    metaTitle: "Kennewick Commercial Office Renovation | MH Construction",
    metaDescription:
      "A 12,000 sq ft commercial office renovation in Kennewick, WA with phased interior upgrades, modern circulation, and safety-first delivery.",
    ogImage: "/images/projects/kennewick-office-renovation.webp",
    description:
      "MH Construction delivered a phased interior renovation that improved office function, updated finishes, and kept the occupied environment under control.",
    location: { city: "Kennewick", state: "WA" },
    yearCompleted: 2024,
    category: "Commercial",
    technicalSpecs: {
      squareFootage: 12000,
      deliveryMethod: "Renovation",
      primaryScope: ["Interior remodel", "HVAC coordination", "ADA updates"],
      finishPackage: [
        "Engineered hardwood",
        "Low-VOC paint",
        "Updated lighting",
      ],
    },
    safetyMilestones: [
      "Occupied-space access control",
      "Daily housekeeping and debris removal",
      "Quality checkpoints at demolition and finish stages",
      "Trade coordination with clear handoffs",
    ],
    results: [
      "Delivered a modernized workplace with minimal disruption.",
      "Aligned the interior finish schedule with owner operations.",
      "Kept the jobsite clean and accessible through closeout.",
    ],
  },
  {
    slug: "pasco-industrial-warehouse-build-out",
    projectId: "proj-002",
    title: "Pasco Industrial Warehouse Build-Out",
    metaTitle: "Pasco Industrial Warehouse Build-Out | MH Construction",
    metaDescription:
      "A 24,000 sq ft industrial warehouse pole-building build-out in Pasco, WA with loading docks, climate control, and durable concrete flooring.",
    ogImage: "/images/projects/pasco-warehouse.webp",
    description:
      "MH Construction built a distribution-ready warehouse with pole-building scope coordination, resilient materials, utility planning, and a clear operational layout managed in Procore.",
    location: { city: "Pasco", state: "WA" },
    yearCompleted: 2023,
    category: "Industrial",
    technicalSpecs: {
      squareFootage: 24000,
      deliveryMethod: "Pole-building build-out",
      primaryScope: ["Loading docks", "Reinforced slab", "Climate control"],
      finishPackage: [
        "Steel building system",
        "Insulated wall panels",
        "High-bay lighting",
      ],
    },
    safetyMilestones: [
      "Concrete pour sequencing tied to access control",
      "Equipment and material staging plan",
      "Inspection coordination for utilities and dock systems",
      "Quality verification before turnover",
    ],
    results: [
      "Delivered a durable warehouse built for daily freight movement.",
      "Kept mechanical and electrical coordination on schedule.",
      "Finished the facility with a practical, operations-first layout.",
    ],
  },
  {
    slug: "richland-corporate-office-tenant-improvement",
    projectId: "proj-003",
    title: "Richland Corporate Office Tenant Improvement",
    metaTitle: "Richland Corporate Office Tenant Improvement | MH Construction",
    metaDescription:
      "A 3,800 sq ft corporate office commercial tenant improvement in Richland, WA designed for accessible circulation, efficient systems, and careful finish detailing.",
    ogImage: "/images/projects/richland-custom-home.webp",
    description:
      "MH Construction delivered a corporate office commercial tenant improvement with universal accessibility principles, premium finishes, door and hardware installation, and a clear delivery plan managed in Procore.",
    location: { city: "Richland", state: "WA" },
    yearCompleted: 2024,
    category: "Commercial",
    technicalSpecs: {
      squareFootage: 3800,
      deliveryMethod: "Commercial tenant improvement",
      primaryScope: [
        "Open collaboration zones",
        "Executive briefing room",
        "Door and hardware installation",
        "Fleet access upgrades",
      ],
      finishPackage: [
        "Stone countertops",
        "Hardie board siding",
        "Andersen windows",
      ],
    },
    safetyMilestones: [
      "Controlled framing and material staging",
      "Interior finish protection",
      "Inspection sequencing tied to system completion",
      "Final punch-list review with the owner",
    ],
    results: [
      "Delivered a commercial workspace aligned to the operations brief.",
      "Kept the finish schedule aligned with client move-in milestones.",
      "Balanced quality, efficiency, and durable material selection.",
    ],
  },
  {
    slug: "spokane-healthcare-clinic-tenant-improvement",
    projectId: "proj-004",
    title: "Spokane Healthcare Clinic Tenant Improvement",
    metaTitle: "Spokane Healthcare Clinic Tenant Improvement | MH Construction",
    metaDescription:
      "A 6,500 sq ft healthcare tenant improvement in Spokane, WA built for code compliance, patient flow, and durable clinic operations.",
    ogImage: "/images/projects/spokane-healthcare-clinic.webp",
    description:
      "MH Construction coordinated a healthcare commercial tenant improvement with clear patient flow, compliant finishes, door and hardware installation, and careful sequencing around occupied operations.",
    location: { city: "Spokane", state: "WA" },
    yearCompleted: 2023,
    category: "Commercial",
    technicalSpecs: {
      squareFootage: 6500,
      deliveryMethod: "Commercial tenant improvement",
      primaryScope: [
        "Exam rooms",
        "Procedure suites",
        "Reception area",
        "Door and hardware installation",
      ],
      finishPackage: [
        "Antimicrobial wall panels",
        "Medical-grade cabinetry",
        "LVT flooring",
      ],
    },
    safetyMilestones: [
      "Occupied-building access control",
      "Dust and infection-control planning",
      "ADA verification and inspection routing",
      "Healthcare-specific quality checks before turnover",
    ],
    results: [
      "Delivered a clinic layout that supported patient and staff flow.",
      "Kept compliance coordination visible throughout the project.",
      "Closed out the space with clean finishes and clear handoff.",
    ],
  },
  {
    slug: "west-richland-light-industrial-flex-facility",
    projectId: "proj-005",
    title: "West Richland Light Industrial Flex Facility",
    metaTitle: "West Richland Light Industrial Flex Facility | MH Construction",
    metaDescription:
      "A 16-suite light industrial flex facility in West Richland, WA built with energy-efficient systems and durable shared infrastructure.",
    ogImage: "/images/projects/west-richland-multifamily.webp",
    description:
      "MH Construction completed a light industrial project with controlled sequencing, shared logistics planning, and energy-conscious detailing.",
    location: { city: "West Richland", state: "WA" },
    yearCompleted: 2024,
    category: "Industrial",
    technicalSpecs: {
      squareFootage: 18000,
      deliveryMethod: "Light industrial new build",
      primaryScope: [
        "Sixteen configurable suites",
        "Shared operations core",
        "Covered loading",
      ],
      finishPackage: [
        "Fiber cement siding",
        "Industrial-grade roofing",
        "Low-E windows",
      ],
    },
    safetyMilestones: [
      "Phase-based site access and material staging",
      "Ongoing quality verification across repeat units",
      "Utility and fire-life-safety coordination",
      "Final inspection walkthrough for common areas and units",
    ],
    results: [
      "Delivered a functional industrial asset with durable finishes.",
      "Kept the suite-by-suite rollout controlled and repeatable.",
      "Built shared infrastructure that supports long-term tenant operations.",
    ],
  },
];

export function getProjectCaseStudyBySlug(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}

export function getProjectCaseStudySlugs(): string[] {
  return projectCaseStudies.map((project) => project.slug);
}
