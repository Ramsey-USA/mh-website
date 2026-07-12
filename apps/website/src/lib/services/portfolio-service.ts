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

// Sample portfolio projects for MH Construction
// In production, populate this from Cloudflare D1 or KV via an admin dashboard.
export const portfolioData: ProjectPortfolio[] = [
  {
    id: "proj-001",
    title: "Kennewick Commercial Office Renovation",
    description:
      "Complete interior renovation of a 12,000 sq ft commercial office building, including structural upgrades, modern open-floor plan design, and energy-efficient HVAC installation.",
    category: "renovation",
    subcategory: "Commercial Office",
    status: "completed",
    location: { city: "Kennewick", state: "WA", isPublic: true },
    images: [
      {
        id: "img-001-1",
        url: "/images/projects/kennewick-office-renovation.jpg",
        alt: "Kennewick commercial office after renovation",
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 12000,
      completionDate: new Date("2024-06-15"),
      duration: "5 months",
      budget: { range: "$400K – $600K", isPublic: true },
      features: [
        "Open-plan collaborative workspace",
        "Energy-efficient LED lighting throughout",
        "Updated ADA-compliant restrooms",
        "Modern reception and lobby area",
      ],
      materials: [
        "Engineered hardwood flooring",
        "Steel framing",
        "Low-VOC paint",
      ],
    },
    tags: ["commercial", "renovation", "energy-efficient", "ADA-compliant"],
    seoMetadata: {
      slug: "kennewick-commercial-office-renovation",
      metaTitle: "Kennewick Commercial Office Renovation | MH Construction",
      metaDescription:
        "MH Construction completed a 12,000 sq ft commercial office renovation in Kennewick, WA featuring modern open-plan design and energy-efficient upgrades.",
      keywords: ["commercial renovation", "office remodel", "Kennewick WA"],
    },
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-07-01"),
    createdBy: "admin",
  },
  {
    id: "proj-002",
    title: "Pasco Industrial Warehouse Build-Out",
    description:
      "New 24,000 sq ft industrial warehouse construction for a regional distribution company, featuring reinforced concrete flooring, loading docks, and climate control.",
    category: "industrial",
    subcategory: "Distribution Warehouse",
    status: "completed",
    location: { city: "Pasco", state: "WA", isPublic: true },
    images: [
      {
        id: "img-002-1",
        url: "/images/projects/pasco-warehouse.jpg",
        alt: "Pasco industrial warehouse exterior",
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 24000,
      completionDate: new Date("2023-11-30"),
      duration: "8 months",
      budget: { range: "$1.2M – $1.8M", isPublic: true },
      features: [
        "Six fully operational loading docks",
        "Reinforced 6-inch concrete slab floor",
        "Overhead crane infrastructure (5-ton capacity)",
        "LED high-bay lighting system",
        "Climate-controlled storage zones",
      ],
      materials: [
        "Pre-engineered steel building system",
        "Reinforced concrete",
        "Insulated metal wall panels",
      ],
    },
    tags: ["industrial", "warehouse", "new-construction", "commercial"],
    seoMetadata: {
      slug: "pasco-industrial-warehouse-build-out",
      metaTitle: "Pasco Industrial Warehouse Construction | MH Construction",
      metaDescription:
        "24,000 sq ft industrial warehouse built by MH Construction in Pasco, WA with loading docks, heavy-duty flooring, and climate control.",
      keywords: ["industrial construction", "warehouse build", "Pasco WA"],
    },
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-12-01"),
    createdBy: "admin",
  },
  {
    id: "proj-003",
    title: "Richland Corporate Office Tenant Improvement",
    description:
      "3,800 sq ft corporate office tenant improvement delivered in Richland, WA with universal accessibility upgrades, energy-efficient systems, and premium interior finishes.",
    category: "commercial",
    subcategory: "Corporate Office Tenant Improvement",
    status: "completed",
    location: { city: "Richland", state: "WA", isPublic: true },
    images: [
      {
        id: "img-003-1",
        url: "/images/projects/richland-custom-home.jpg",
        alt: "Richland corporate office tenant improvement exterior view",
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 3800,
      completionDate: new Date("2024-03-20"),
      duration: "10 months",
      budget: { range: "$750K – $950K", isPublic: false },
      features: [
        "Open-concept collaboration zones with acoustic controls",
        "Executive briefing room with integrated AV infrastructure",
        "Built-in office storage and custom casework",
        "ADA-compliant restrooms and circulation upgrades",
        "EV-ready fleet parking and access controls",
        "Solar-ready roof infrastructure",
      ],
      materials: [
        "Engineered lumber framing",
        "Hardie board exterior siding",
        "Natural stone countertops",
        "Andersen windows",
      ],
    },
    clientTestimonial: {
      quote:
        "MH Construction went above and beyond for our operations team. They understood our workflow and delivered a space that performs every day.",
      clientName: "Operations Director, Richland Project Stakeholder",
      rating: 5,
    },
    tags: ["commercial", "tenant-improvement", "veteran-owned", "office"],
    seoMetadata: {
      slug: "richland-corporate-office-tenant-improvement",
      metaTitle:
        "Richland Corporate Office Tenant Improvement | MH Construction",
      metaDescription:
        "3,800 sq ft corporate office tenant improvement completed by MH Construction in Richland, WA with premium finishes, universal accessibility, and solar-ready infrastructure.",
      keywords: [
        "corporate office tenant improvement",
        "commercial tenant improvement",
        "Richland WA",
      ],
    },
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2024-04-01"),
    createdBy: "admin",
  },
  {
    id: "proj-004",
    title: "Spokane Healthcare Clinic Tenant Improvement",
    description:
      "Comprehensive tenant improvement of a 6,500 sq ft medical clinic, including exam rooms, procedure suites, waiting areas, and full compliance with healthcare facility codes.",
    category: "commercial",
    subcategory: "Healthcare Tenant Improvement",
    status: "completed",
    location: { city: "Spokane", state: "WA", isPublic: true },
    images: [
      {
        id: "img-004-1",
        url: "/images/projects/spokane-healthcare-clinic.jpg",
        alt: "Spokane medical clinic interior",
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 6500,
      completionDate: new Date("2023-08-01"),
      duration: "6 months",
      budget: { range: "$600K – $800K", isPublic: true },
      features: [
        "Eight fully equipped exam rooms",
        "Two procedure suites with medical gas systems",
        "Reception and waiting area with calming design",
        "Staff break room and administrative offices",
        "Full ADA compliance",
        "Negative-pressure isolation room",
      ],
      materials: [
        "Antimicrobial wall panels",
        "Luxury vinyl tile flooring",
        "Specialty medical-grade cabinetry",
      ],
    },
    tags: ["commercial", "healthcare", "tenant-improvement", "ADA-compliant"],
    seoMetadata: {
      slug: "spokane-healthcare-clinic-tenant-improvement",
      metaTitle: "Spokane Healthcare Clinic Construction | MH Construction",
      metaDescription:
        "6,500 sq ft medical clinic tenant improvement in Spokane, WA by MH Construction — fully compliant healthcare facility with procedure suites.",
      keywords: ["healthcare construction", "medical clinic", "Spokane WA"],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-09-01"),
    createdBy: "admin",
  },
  {
    id: "proj-005",
    title: "West Richland Light Industrial Flex Facility",
    description:
      "Construction of a 16-suite light industrial flex facility with shared logistics infrastructure, energy-efficient systems, and phased occupancy turnover.",
    category: "industrial",
    subcategory: "Light Industrial Flex",
    status: "completed",
    location: { city: "West Richland", state: "WA", isPublic: true },
    images: [
      {
        id: "img-005-1",
        url: "/images/projects/west-richland-multifamily.jpg",
        alt: "West Richland light industrial flex facility exterior",
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 18000,
      completionDate: new Date("2024-09-30"),
      duration: "14 months",
      budget: { range: "$2.2M – $2.8M", isPublic: true },
      features: [
        "16 configurable industrial suites",
        "Covered loading and fleet parking",
        "Shared operations and dispatch center",
        "Dedicated utility service for each suite",
        "High-efficiency mechanical and lighting systems",
        "Phased occupancy turnover program",
      ],
      materials: [
        "Pre-engineered steel framing",
        "Fiber cement siding",
        "Industrial-grade roofing",
        "Insulated low-E glazing",
      ],
    },
    tags: ["industrial", "flex-facility", "veteran-owned", "energy-efficient"],
    seoMetadata: {
      slug: "west-richland-light-industrial-flex-facility",
      metaTitle:
        "West Richland Light Industrial Flex Facility | MH Construction",
      metaDescription:
        "16-suite light industrial flex facility built by MH Construction in West Richland, WA with phased occupancy and energy-efficient design.",
      keywords: [
        "light industrial construction",
        "flex facility build-out",
        "West Richland WA",
      ],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2024-10-01"),
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
