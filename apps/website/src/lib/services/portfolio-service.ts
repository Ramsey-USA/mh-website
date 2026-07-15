// Portfolio service for managing project data
import { type ProjectPortfolio, type ProjectFilter } from "@/lib/types";

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase();
}

function buildProjectSearchText(project: ProjectPortfolio): string {
  return normalizeSearchValue(
    [
      project.title,
      project.description,
      project.subcategory ?? "",
      project.location.city,
      project.location.state,
      ...project.tags,
    ].join(" "),
  );
}

export const portfolioData: ProjectPortfolio[] = [
  {
    id: "proj-006",
    title: "LCSNW Tri-Cities Office Expansion",
    description:
      "Adaptive reuse and commercial remodel of a former call center into a trauma-informed youth behavioral health facility in Kennewick, WA.",
    category: "commercial",
    subcategory: "Healthcare Office Expansion",
    status: "completed",
    location: { city: "Kennewick", state: "WA", isPublic: true },
    images: [
      {
        id: "img-006-1",
        url: "/images/projects/project-default.webp",
        alt: "LCSNW Tri-Cities Office Expansion project overview",
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 38000,
      completionDate: new Date("2026-07-13"),
      duration: "8 months",
      budget: { range: "Not published", isPublic: false },
      features: [
        "Adaptive reuse of a former call-center layout",
        "25 private counseling offices",
        "Specialized play therapy, teen, and training rooms",
        "Eight conference rooms and three staff break rooms",
        "Mechanical, plumbing, and HVAC system upgrades",
        "Trauma-informed interior planning and finish coordination",
      ],
      materials: [
        "Commercial flooring systems",
        "Custom cabinetry",
        "Durable interior finish packages",
      ],
    },
    tags: [
      "commercial",
      "healthcare",
      "adaptive-reuse",
      "kennewick",
      "office-expansion",
    ],
    seoMetadata: {
      slug: "lcsnw-tri-cities",
      metaTitle: "LCSNW Tri-Cities Office Expansion | MH Construction",
      metaDescription:
        "MH Construction completed the 38,000 sq ft LCSNW Tri-Cities office expansion in Kennewick, delivering trauma-informed youth behavioral health space.",
      keywords: [
        "commercial remodel",
        "Kennewick construction",
        "healthcare contractor",
        "office expansion",
        "LCSNW Tri-Cities",
      ],
    },
    isPublished: false,
    isFeatured: false,
    createdAt: new Date("2026-07-15"),
    updatedAt: new Date("2026-07-15"),
    createdBy: "admin",
  },
  {
    id: "proj-007",
    title: "Volm Companies Remodel",
    description:
      "Commercial tenant improvement and exterior facade updates at Volm Companies' active Pasco distribution and manufacturing facility.",
    category: "commercial",
    subcategory: "Commercial Tenant Improvement",
    status: "completed",
    location: { city: "Pasco", state: "WA", isPublic: true },
    images: [
      {
        id: "img-007-1",
        url: "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-main-entrance-and-signage-p001-photo.webp",
        alt: "Volm Companies remodel main entrance, facade, and signage in Pasco",
        isFeatured: true,
        order: 1,
      },
      {
        id: "img-007-2",
        url: "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-building-facade-p002-photo.webp",
        alt: "Wide building facade view after Volm Companies tenant improvement",
        isFeatured: false,
        order: 2,
      },
      {
        id: "img-007-3",
        url: "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-entrance-corner-p003-photo.webp",
        alt: "Corner entrance view with updated facade and storefront glazing at Volm Companies",
        isFeatured: false,
        order: 3,
      },
      {
        id: "img-007-4",
        url: "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-office-and-warehouse-facade-p004-photo.webp",
        alt: "Office and warehouse facade overview at Volm Companies Pasco facility",
        isFeatured: false,
        order: 4,
      },
    ],
    details: {
      completionDate: new Date("2020-02-05"),
      duration: "TBD",
      budget: { range: "Not published", isPublic: false },
      challenges: [
        "Maintaining safe personnel and logistics access during active operations",
        "Sequencing exterior updates without disrupting distribution workflows",
      ],
      features: [
        "Exterior facade updates and tenant-improvement scope",
        "Right-of-way coordination for curb, gutter, and sidewalk work",
        "Main entrance and storefront glazing integration",
        "Corporate signage coordination and exterior finishing",
      ],
      materials: [
        "Exterior wall panel systems",
        "Commercial glazing",
        "Concrete sitework at right-of-way frontage",
      ],
    },
    clientTestimonial: {
      quote:
        "This is a pretty impressive building and they have done a quality job the whole way through.",
      clientName: "Daniel Mueller",
      clientTitle: "President and CEO",
      rating: 5,
    },
    tags: [
      "commercial",
      "tenant-improvement",
      "pasco",
      "exterior-facade",
      "industrial-distribution",
    ],
    seoMetadata: {
      slug: "volm-companies-remodel",
      metaTitle:
        "Volm Companies Remodel | Commercial Tenant Improvement in Pasco, WA",
      metaDescription:
        "MH Construction delivered exterior updates and commercial tenant improvements for the Volm Companies regional distribution facility in Pasco, WA.",
      keywords: [
        "commercial tenant improvement",
        "Pasco WA construction",
        "industrial remodel",
        "exterior facade update",
        "MH Construction projects",
      ],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2026-07-15"),
    updatedAt: new Date("2026-07-15"),
    createdBy: "admin",
  },
  {
    id: "proj-008",
    title: "Darigold Pasco Production Facility",
    description:
      "Field-documented exterior closeout conditions at Darigold's Pasco production facility, captured by MH Construction during ongoing project activity.",
    category: "industrial",
    subcategory: "Food Processing Facility",
    status: "in-progress",
    location: { city: "Pasco", state: "WA", isPublic: true },
    images: [
      {
        id: "img-008-1",
        url: "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.webp",
        alt: "Darigold Pasco facility main entrance and parking frontage",
        isFeatured: true,
        order: 1,
      },
      {
        id: "img-008-2",
        url: "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-accessible-parking-p001-photo.webp",
        alt: "Darigold Pasco facility accessible parking and frontage",
        isFeatured: false,
        order: 2,
      },
      {
        id: "img-008-3",
        url: "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-loading-dock-doors-p008-photo.webp",
        alt: "Darigold Pasco facility loading dock door bank",
        isFeatured: false,
        order: 3,
      },
      {
        id: "img-008-4",
        url: "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p011-photo.webp",
        alt: "Darigold Pasco facility main entrance landscaping and parking",
        isFeatured: false,
        order: 4,
      },
    ],
    details: {
      completionDate: new Date("2025-10-22"),
      duration: "TBD",
      budget: { range: "Not published", isPublic: false },
      challenges: [
        "Coordinating multi-party industrial delivery and active operations",
        "Verifying package-level scope ownership before publication",
      ],
      features: [
        "Exterior closeout condition documentation",
        "Frontage, parking, and accessible-stall condition capture",
        "Main entrance and loading-dock frontage capture",
        "EV charging area and landscaped frontage capture",
      ],
      materials: [
        "Industrial exterior cladding systems",
        "Commercial glazing and storefront assemblies",
        "Paved and striped sitework infrastructure",
      ],
    },
    tags: [
      "industrial",
      "food-processing",
      "pasco",
      "field-documentation",
      "closeout",
    ],
    seoMetadata: {
      slug: "darigold-pasco-production-facility",
      metaTitle: "Darigold Pasco Production Facility | MH Construction",
      metaDescription:
        "MH Construction field documentation from Darigold's Pasco production facility, covering exterior closeout conditions and public project milestones.",
      keywords: [
        "Darigold Pasco project",
        "Pasco industrial construction",
        "dairy processing facility",
        "food processing construction",
        "construction closeout",
      ],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2026-07-15"),
    updatedAt: new Date("2026-07-15"),
    createdBy: "admin",
  },
  {
    id: "proj-009",
    title: "Franklin County Coroner's Office Morgue",
    description:
      "Municipal new construction of a 1,560-square-foot Coroner's Office morgue facility in Pasco, Washington, supporting local examination and secure receiving operations.",
    category: "commercial",
    subcategory: "Municipal Public-Sector Facility",
    status: "completed",
    location: { city: "Pasco", state: "WA", isPublic: true },
    images: [
      {
        id: "img-009-1",
        url: "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.webp",
        alt: "Franklin County Coroner's Office morgue building frontage in Pasco",
        caption:
          "Building frontage view showing entry area, windows, and adjacent paved approach.",
        isFeatured: true,
        order: 1,
      },
      {
        id: "img-009-2",
        url: "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-service-bay-exterior-p008-photo.webp",
        alt: "Service bay exterior and secure access area at Franklin County morgue",
        caption:
          "Service-bay corner showing overhead-door access, canopy, and perimeter fencing.",
        isFeatured: false,
        order: 2,
      },
      {
        id: "img-009-3",
        url: "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-service-wall-p002-photo.webp",
        alt: "Service wall and utility area at Franklin County Coroner's Office morgue",
        caption:
          "Service-wall elevation with paved access zone and wall-mounted utility equipment.",
        isFeatured: false,
        order: 3,
      },
      {
        id: "img-009-4",
        url: "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-coroner-office-monument-sign-p012-photo.webp",
        alt: "Franklin County Office of the Coroner monument sign",
        caption:
          "Monument sign identifying the Franklin County Office of the Coroner site.",
        isFeatured: false,
        order: 4,
      },
    ],
    details: {
      squareFootage: 1560,
      completionDate: new Date("2025-09-01"),
      duration: "TBD",
      budget: { range: "Reported project cost: $960,000", isPublic: true },
      challenges: [
        "Coordinating multidisciplinary municipal design requirements",
        "Building secure receiving and examination functions at an active county property",
      ],
      features: [
        "Receiving and release garage with secure overhead-door access",
        "Walk-in refrigeration and specialized examination space",
        "Observation room and supporting restroom",
        "Coordination of civil, structural, mechanical, plumbing, and electrical scopes",
      ],
      materials: [
        "Commercial overhead-door system",
        "Specialized refrigeration components",
        "Municipal-grade exterior and sitework assemblies",
      ],
    },
    clientTestimonial: {
      quote:
        "I'm so glad the way it turned out and the way it works for us. It's a really nice flow.",
      clientName: "Curtis McGary",
      clientTitle: "Franklin County Coroner",
      rating: 5,
    },
    tags: [
      "municipal",
      "public-sector",
      "pasco",
      "coroner-facility",
      "new-construction",
    ],
    seoMetadata: {
      slug: "franklin-county-coroners-office-morgue",
      metaTitle: "Franklin County Coroner's Office Morgue | MH Construction",
      metaDescription:
        "MH Construction served as general contractor for Franklin County's 1,560-square-foot Coroner's Office morgue facility in Pasco, Washington.",
      keywords: [
        "Franklin County Coroner's Office morgue",
        "Pasco WA general contractor",
        "municipal construction",
        "autopsy facility",
        "MH Construction",
      ],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2026-07-15"),
    updatedAt: new Date("2026-07-15"),
    createdBy: "admin",
  },
  {
    id: "proj-010",
    title: "The Auto Lot",
    description:
      "Commercial automotive dealership project in Kennewick, WA, delivering a customer-facing showroom, storefront identity, and expanded site circulation.",
    category: "commercial",
    subcategory: "Automotive Dealership",
    status: "completed",
    location: { city: "Kennewick", state: "WA", isPublic: true },
    images: [
      {
        id: "img-010-1",
        url: "/images/projects/alverez-auto-lot/atc-e-20190128-p009.webp",
        alt: "The Auto Lot storefront and front lot in Kennewick",
        caption:
          "Wide front view of The Auto Lot showroom facade, entry glazing, and parking layout.",
        isFeatured: true,
        order: 1,
      },
      {
        id: "img-010-2",
        url: "/images/projects/alverez-auto-lot/atc-e-20181226-p007.webp",
        alt: "The Auto Lot entrance elevation and accessible parking",
        caption:
          "Front elevation showing glazed entrance, sign tower, and accessible parking striping.",
        isFeatured: false,
        order: 2,
      },
      {
        id: "img-010-3",
        url: "/images/projects/alverez-auto-lot/atc-e-20190130-p012.webp",
        alt: "Side elevation of The Auto Lot with metal wall panels and paved lot",
        caption:
          "Side wall elevation with metal cladding, lot paving, and lighting elements.",
        isFeatured: false,
        order: 3,
      },
      {
        id: "img-010-4",
        url: "/images/projects/alverez-auto-lot/atc-e-20190417-p020.webp",
        alt: "Rear corner view of The Auto Lot dealership facility",
        caption:
          "Rear corner view showing exterior envelope finishes and vehicle circulation area.",
        isFeatured: false,
        order: 4,
      },
      {
        id: "img-010-5",
        url: "/images/projects/alverez-auto-lot/atc-e-20190502-p025.webp",
        alt: "Auto Lot dealership signage and paved display area",
        caption:
          "Freestanding dealership signage adjacent to vehicle display and paved frontage.",
        isFeatured: false,
        order: 5,
      },
      {
        id: "img-010-6",
        url: "/images/projects/alverez-auto-lot/atc-e-20190715-p036.webp",
        alt: "Showroom-facing exterior of The Auto Lot in Kennewick",
        caption:
          "Exterior storefront and lot relationship supporting customer circulation at the site.",
        isFeatured: false,
        order: 6,
      },
    ],
    details: {
      squareFootage: 4200,
      completionDate: new Date("2024-03-15"),
      duration: "TBD",
      budget: { range: "Not published", isPublic: false },
      challenges: [
        "Expanding from a constrained previous location to a larger public-facing site",
        "Coordinating customer circulation, inventory display, and storefront visibility",
      ],
      features: [
        "Glazed storefront and customer showroom environment",
        "Indoor vehicle display and sales-facing interior layout",
        "Paved inventory and parking circulation areas",
        "Accessible parking routes and entry approach",
        "Landscape beds and perimeter site improvements",
      ],
      materials: [
        "Storefront glazing systems",
        "Metal wall panel exterior envelope",
        "Paved sitework and striping",
      ],
    },
    tags: ["commercial", "automotive", "dealership", "kennewick", "showroom"],
    seoMetadata: {
      slug: "auto-lot-nw",
      metaTitle:
        "The Auto Lot Dealership Project | Kennewick, WA | MH Construction",
      metaDescription:
        "MH Construction served as general contractor for The Auto Lot, a completed 4,200-square-foot dealership and showroom in Kennewick, Washington.",
      keywords: [
        "The Auto Lot",
        "Auto Lot NW",
        "Kennewick commercial construction",
        "automotive dealership construction",
        "MH Construction",
      ],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2026-07-15"),
    updatedAt: new Date("2026-07-15"),
    createdBy: "admin",
  },
];

const publishedProjects = portfolioData.filter(
  (project) => project.isPublished,
);
const featuredProjects = publishedProjects.filter(
  (project) => project.isFeatured,
);
const publishedProjectsBySlug = new Map(
  publishedProjects.map((project) => [project.seoMetadata.slug, project]),
);
const publishedProjectsByCategory = publishedProjects.reduce(
  (projectsByCategory, project) => {
    const existingProjects = projectsByCategory.get(project.category) ?? [];
    existingProjects.push(project);
    projectsByCategory.set(project.category, existingProjects);
    return projectsByCategory;
  },
  new Map<string, ProjectPortfolio[]>(),
);
const projectSearchIndex = new Map(
  publishedProjects.map((project) => [
    project.id,
    buildProjectSearchText(project),
  ]),
);
const portfolioStats = {
  totalProjects: publishedProjects.length,
  categories: Array.from(
    new Set(publishedProjects.map((project) => project.category)),
  ),
  featuredProjects: featuredProjects.length,
  completedProjects: publishedProjects.filter(
    (project) => project.status === "completed",
  ).length,
};

export class PortfolioService {
  // Get all published projects
  static getAllProjects(): ProjectPortfolio[] {
    return [...publishedProjects];
  }

  // Get featured projects for homepage
  static getFeaturedProjects(): ProjectPortfolio[] {
    return [...featuredProjects];
  }

  // Get project by slug
  static getProjectBySlug(slug: string): ProjectPortfolio | undefined {
    return publishedProjectsBySlug.get(slug);
  }

  // Filter projects by category
  static getProjectsByCategory(category: string): ProjectPortfolio[] {
    if (category === "all") {
      return this.getAllProjects();
    }
    return [...(publishedProjectsByCategory.get(category) ?? [])];
  }

  // Search projects using a precomputed index to minimize repeated string work
  static searchProjects(category: string, query: string): ProjectPortfolio[] {
    const normalizedQuery = normalizeSearchValue(query);
    const scopedProjects =
      category === "all"
        ? publishedProjects
        : (publishedProjectsByCategory.get(category) ?? []);

    if (!normalizedQuery) {
      return [...scopedProjects];
    }

    return scopedProjects.filter((project) =>
      projectSearchIndex.get(project.id)?.includes(normalizedQuery),
    );
  }

  // Search and filter projects
  static filterProjects(filter: ProjectFilter): ProjectPortfolio[] {
    let filteredProjects = [...publishedProjects];

    if (filter.category && filter.category.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        filter.category!.includes(project.category),
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        filter.tags!.some((tag: string) => project.tags.includes(tag)),
      );
    }

    if (filter.location) {
      const normalizedLocation = normalizeSearchValue(filter.location);
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.location.city.toLowerCase().includes(normalizedLocation) ||
          project.location.state.toLowerCase().includes(normalizedLocation),
      );
    }

    if (filter.dateRange) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.details.completionDate >= filter.dateRange!.start &&
          project.details.completionDate <= filter.dateRange!.end,
      );
    }

    return filteredProjects;
  }

  // Get related projects (same category, different project)
  static getRelatedProjects(projectId: string, limit = 3): ProjectPortfolio[] {
    const currentProject = portfolioData.find(
      (project) => project.id === projectId,
    );
    if (!currentProject) return [];

    return publishedProjects
      .filter(
        (project) =>
          project.id !== projectId &&
          project.category === currentProject.category,
      )
      .slice(0, limit);
  }

  // Get project statistics
  static getPortfolioStats() {
    return {
      ...portfolioStats,
      categories: [...portfolioStats.categories],
    };
  }
}
