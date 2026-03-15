// Project Portfolio Types
export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isFeatured: boolean;
  order: number;
}

export interface ProjectDetails {
  squareFootage?: number;
  completionDate: Date;
  duration: string; // e.g., "6 months"
  budget: {
    range: string; // e.g., "$500K - $750K"
    isPublic: boolean;
  };
  challenges?: string[];
  features: string[];
  materials: string[];
}

export interface ProjectPortfolio {
  id: string;
  title: string;
  description: string;
  category:
    | "residential"
    | "commercial"
    | "renovation"
    | "custom"
    | "industrial";
  subcategory?: string; // e.g., "Kitchen Remodel", "Office Building", etc.
  status: "completed" | "in-progress" | "planned";
  location: {
    city: string;
    state: string;
    isPublic: boolean; // Some clients may want location private
  };
  images: ProjectImage[];
  details: ProjectDetails;
  clientTestimonial?: {
    quote: string;
    clientName: string;
    clientTitle?: string;
    rating: number; // 1-5 stars
  };
  tags: string[]; // For filtering: ["luxury", "eco-friendly", "veteran-owned", etc.]
  seoMetadata: {
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
  isPublished: boolean;
  isFeatured: boolean; // For homepage showcase
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Team member who added the project
}

export interface ProjectFilter {
  category?: string[];
  tags?: string[];
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
