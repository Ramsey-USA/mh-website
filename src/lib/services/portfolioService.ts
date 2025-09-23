// Portfolio service for managing project data
import { ProjectPortfolio, ProjectFilter } from '../types'

// Sample portfolio data - in production, this would come from Firebase/database
export const portfolioData: ProjectPortfolio[] = [
  {
    id: '1',
    title: 'Luxury Mountain Home',
    description:
      'A stunning 4,500 sq ft custom mountain retreat featuring timber frame construction, floor-to-ceiling windows, and sustainable materials throughout.',
    category: 'residential',
    subcategory: 'Custom Home',
    status: 'completed',
    location: {
      city: 'Spokane',
      state: 'WA',
      isPublic: true,
    },
    images: [
      {
        id: '1',
        url: '/images/portfolio/mountain-home-1.jpg',
        alt: 'Luxury Mountain Home Exterior',
        caption: 'Stunning timber frame construction with mountain views',
        isFeatured: true,
        order: 1,
      },
      {
        id: '2',
        url: '/images/portfolio/mountain-home-2.jpg',
        alt: 'Mountain Home Interior Living Room',
        caption: 'Open concept living space with vaulted ceilings',
        isFeatured: false,
        order: 2,
      },
    ],
    details: {
      squareFootage: 4500,
      completionDate: new Date('2024-08-15'),
      duration: '14 months',
      budget: {
        range: '$2.5M - $3M',
        isPublic: true,
      },
      challenges: [
        'Remote mountain location requiring specialized logistics',
        'Extreme weather conditions during construction',
        'Environmental protection requirements',
      ],
      features: [
        'Timber Frame Construction',
        'Radiant Floor Heating',
        'Smart Home Integration',
        'Solar Panel System',
        'Custom Millwork',
        'Stone Fireplace',
      ],
      materials: [
        'Reclaimed Timber',
        'Natural Stone',
        'Low-E Windows',
        'Metal Roofing',
      ],
    },
    clientTestimonial: {
      quote:
        'MH Construction exceeded our expectations. Their attention to detail and veteran discipline made our dream home a reality.',
      clientName: 'Sarah & Mike Johnson',
      rating: 5,
    },
    tags: ['luxury', 'eco-friendly', 'custom', 'veteran-built'],
    seoMetadata: {
      slug: 'luxury-mountain-home-spokane',
      metaTitle: 'Luxury Mountain Home Construction - Spokane, WA',
      metaDescription:
        'Custom 4,500 sq ft mountain retreat with timber frame construction and sustainable features in Spokane, WA.',
      keywords: [
        'luxury home',
        'mountain construction',
        'timber frame',
        'custom build',
        'Spokane',
      ],
    },
    isPublished: true,
    isFeatured: true,
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-08-20'),
    createdBy: 'admin',
  },
  {
    id: '2',
    title: 'Modern Office Complex',
    description:
      'A 25,000 sq ft LEED-certified office building featuring open concept design, natural lighting, and energy-efficient systems.',
    category: 'commercial',
    subcategory: 'Office Building',
    status: 'completed',
    location: {
      city: 'Yakima',
      state: 'WA',
      isPublic: true,
    },
    images: [
      {
        id: '3',
        url: '/images/portfolio/office-complex-1.jpg',
        alt: 'Modern Office Complex Exterior',
        caption: 'LEED-certified commercial construction',
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      squareFootage: 25000,
      completionDate: new Date('2024-06-30'),
      duration: '18 months',
      budget: {
        range: '$8M - $10M',
        isPublic: false,
      },
      features: [
        'LEED Gold Certification',
        'Open Concept Design',
        'Energy-Efficient HVAC',
        'Natural Lighting Systems',
        'Modern Security Systems',
        'Electric Vehicle Charging',
      ],
      materials: [
        'Steel Frame',
        'Glass Curtain Wall',
        'Sustainable Flooring',
        'LED Lighting',
      ],
    },
    tags: ['commercial', 'LEED-certified', 'modern', 'sustainable'],
    seoMetadata: {
      slug: 'modern-office-complex-yakima',
      metaTitle: 'LEED-Certified Office Building Construction - Yakima, WA',
      metaDescription:
        '25,000 sq ft modern office complex with sustainable design and energy-efficient systems in Yakima, WA.',
      keywords: [
        'office building',
        'commercial construction',
        'LEED certified',
        'Yakima',
      ],
    },
    isPublished: true,
    isFeatured: true,
    createdAt: new Date('2024-07-05'),
    updatedAt: new Date('2024-07-05'),
    createdBy: 'admin',
  },
  {
    id: '3',
    title: 'Kitchen & Bath Renovation',
    description:
      'Complete transformation of a 1970s ranch home kitchen and master bathroom with modern amenities and timeless design.',
    category: 'renovation',
    subcategory: 'Kitchen & Bath',
    status: 'completed',
    location: {
      city: 'Spokane',
      state: 'WA',
      isPublic: true,
    },
    images: [
      {
        id: '4',
        url: '/images/portfolio/kitchen-reno-1.jpg',
        alt: 'Modern Kitchen Renovation',
        caption: 'Complete kitchen transformation with custom cabinetry',
        isFeatured: true,
        order: 1,
      },
    ],
    details: {
      completionDate: new Date('2024-09-10'),
      duration: '3 months',
      budget: {
        range: '$75K - $100K',
        isPublic: true,
      },
      features: [
        'Custom Cabinetry',
        'Quartz Countertops',
        'Hardwood Flooring',
        'Recessed Lighting',
        'Tile Backsplash',
        'Modern Fixtures',
      ],
      materials: ['Quartz', 'Hardwood', 'Ceramic Tile', 'Stainless Steel'],
    },
    clientTestimonial: {
      quote:
        'The team was professional, clean, and delivered exactly what we envisioned. Highly recommend!',
      clientName: 'Jennifer Martinez',
      rating: 5,
    },
    tags: ['renovation', 'kitchen', 'bathroom', 'modern'],
    seoMetadata: {
      slug: 'kitchen-bath-renovation-spokane',
      metaTitle: 'Kitchen & Bathroom Renovation - Spokane, WA',
      metaDescription:
        'Complete kitchen and master bath renovation with modern amenities and custom features in Spokane, WA.',
      keywords: [
        'kitchen renovation',
        'bathroom remodel',
        'home improvement',
        'Spokane',
      ],
    },
    isPublished: true,
    isFeatured: false,
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-09-15'),
    createdBy: 'admin',
  },
]

export class PortfolioService {
  // Get all published projects
  static getAllProjects(): ProjectPortfolio[] {
    return portfolioData.filter(project => project.isPublished)
  }

  // Get featured projects for homepage
  static getFeaturedProjects(): ProjectPortfolio[] {
    return portfolioData.filter(
      project => project.isPublished && project.isFeatured
    )
  }

  // Get project by slug
  static getProjectBySlug(slug: string): ProjectPortfolio | undefined {
    return portfolioData.find(
      project => project.isPublished && project.seoMetadata.slug === slug
    )
  }

  // Filter projects by category
  static getProjectsByCategory(category: string): ProjectPortfolio[] {
    if (category === 'all') {
      return this.getAllProjects()
    }
    return portfolioData.filter(
      project => project.isPublished && project.category === category
    )
  }

  // Search and filter projects
  static filterProjects(filter: ProjectFilter): ProjectPortfolio[] {
    let filteredProjects = this.getAllProjects()

    if (filter.category && filter.category.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        filter.category!.includes(project.category)
      )
    }

    if (filter.tags && filter.tags.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        filter.tags!.some(tag => project.tags.includes(tag))
      )
    }

    if (filter.location) {
      filteredProjects = filteredProjects.filter(
        project =>
          project.location.city
            .toLowerCase()
            .includes(filter.location!.toLowerCase()) ||
          project.location.state
            .toLowerCase()
            .includes(filter.location!.toLowerCase())
      )
    }

    if (filter.dateRange) {
      filteredProjects = filteredProjects.filter(
        project =>
          project.details.completionDate >= filter.dateRange!.start &&
          project.details.completionDate <= filter.dateRange!.end
      )
    }

    return filteredProjects
  }

  // Get related projects (same category, different project)
  static getRelatedProjects(
    projectId: string,
    limit: number = 3
  ): ProjectPortfolio[] {
    const currentProject = portfolioData.find(p => p.id === projectId)
    if (!currentProject) return []

    return portfolioData
      .filter(
        project =>
          project.isPublished &&
          project.id !== projectId &&
          project.category === currentProject.category
      )
      .slice(0, limit)
  }

  // Get project statistics
  static getPortfolioStats() {
    const projects = this.getAllProjects()
    const categories = Array.from(new Set(projects.map(p => p.category)))

    return {
      totalProjects: projects.length,
      categories: categories,
      featuredProjects: projects.filter(p => p.isFeatured).length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
    }
  }
}
