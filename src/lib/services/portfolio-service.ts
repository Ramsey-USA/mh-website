// Portfolio service for managing project data
import { type ProjectPortfolio, type ProjectFilter } from "../types";

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
    title: "Richland Residential Custom Home",
    description:
      "3,800 sq ft custom single-family home built for a veteran family, incorporating universal design principles, high-efficiency systems, and premium finishes throughout.",
    category: "residential",
    subcategory: "Custom Home",
    status: "completed",
    location: { city: "Richland", state: "WA", isPublic: true },
    images: [
      {
        id: "img-003-1",
        url: "/images/projects/richland-custom-home.jpg",
        alt: "Richland custom home exterior view",
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
        "Open-concept great room with vaulted ceilings",
        "Chef's kitchen with custom cabinetry",
        "Home office with built-in storage",
        "Primary suite with spa bathroom",
        "Three-car garage with EV charging",
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
        "MH Construction went above and beyond for our family. They truly understood our vision and delivered a home we're incredibly proud of.",
      clientName: "J. & K. Thompson",
      rating: 5,
    },
    tags: ["residential", "custom-home", "veteran-owned", "luxury"],
    seoMetadata: {
      slug: "richland-residential-custom-home",
      metaTitle: "Richland Custom Home Builder | MH Construction",
      metaDescription:
        "3,800 sq ft custom home built by MH Construction in Richland, WA — premium finishes, universal design, and solar-ready infrastructure.",
      keywords: [
        "custom home builder",
        "residential construction",
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
    title: "West Richland Multi-Family Residential Complex",
    description:
      "Construction of a 16-unit multi-family residential complex with shared amenities, energy-efficient design, and veteran-priority lease program.",
    category: "residential",
    subcategory: "Multi-Family",
    status: "completed",
    location: { city: "West Richland", state: "WA", isPublic: true },
    images: [
      {
        id: "img-005-1",
        url: "/images/projects/west-richland-multifamily.jpg",
        alt: "West Richland multi-family complex exterior",
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
        "16 two-bedroom, two-bathroom units",
        "Covered parking for all residents",
        "Community room and fitness center",
        "In-unit washer/dryer connections",
        "Energy Star certified appliances",
        "Veteran-priority leasing program",
      ],
      materials: [
        "Wood-frame construction",
        "Fiber cement siding",
        "Architectural shingle roofing",
        "Double-pane low-E windows",
      ],
    },
    tags: ["residential", "multi-family", "veteran-owned", "energy-efficient"],
    seoMetadata: {
      slug: "west-richland-multi-family-complex",
      metaTitle: "West Richland Multi-Family Construction | MH Construction",
      metaDescription:
        "16-unit multi-family residential complex built by MH Construction in West Richland, WA with veteran-priority leasing and energy-efficient design.",
      keywords: [
        "multi-family construction",
        "apartment building",
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

export class PortfolioService {
  // Get all published projects
  static getAllProjects(): ProjectPortfolio[] {
    return portfolioData.filter((project) => project.isPublished);
  }

  // Get featured projects for homepage
  static getFeaturedProjects(): ProjectPortfolio[] {
    return portfolioData.filter(
      (project) => project.isPublished && project.isFeatured,
    );
  }

  // Get project by slug
  static getProjectBySlug(slug: string): ProjectPortfolio | undefined {
    return portfolioData.find(
      (project) => project.isPublished && project.seoMetadata.slug === slug,
    );
  }

  // Filter projects by category
  static getProjectsByCategory(category: string): ProjectPortfolio[] {
    if (category === "all") {
      return this.getAllProjects();
    }
    return portfolioData.filter(
      (project) => project.isPublished && project.category === category,
    );
  }

  // Search and filter projects
  static filterProjects(filter: ProjectFilter): ProjectPortfolio[] {
    let filteredProjects = this.getAllProjects();

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
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.location.city
            .toLowerCase()
            .includes(filter.location!.toLowerCase()) ||
          project.location.state
            .toLowerCase()
            .includes(filter.location!.toLowerCase()),
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
    const currentProject = portfolioData.find((p) => p.id === projectId);
    if (!currentProject) return [];

    return portfolioData
      .filter(
        (project) =>
          project.isPublished &&
          project.id !== projectId &&
          project.category === currentProject.category,
      )
      .slice(0, limit);
  }

  // Get project statistics
  static getPortfolioStats() {
    const projects = this.getAllProjects();
    const categories = Array.from(new Set(projects.map((p) => p.category)));

    return {
      totalProjects: projects.length,
      categories: categories,
      featuredProjects: projects.filter((p) => p.isFeatured).length,
      completedProjects: projects.filter((p) => p.status === "completed")
        .length,
    };
  }
}
