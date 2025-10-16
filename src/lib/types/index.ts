// TypeScript types for MH Construction website

export interface Consultation {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  projectType: "residential" | "commercial" | "renovation" | "custom";
  projectDescription?: string;
  location?: string;
  budget?: number;
  timeline?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  scheduledDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectEstimate {
  id: string;
  projectDetails: {
    type: string;
    squareFootage: number;
    location: string;
    timeline: string;
    complexity: "low" | "medium" | "high";
  };
  costBreakdown: {
    materials: number;
    labor: number;
    permits: number;
    equipment: number;
    overhead: number;
    total: number;
  };
  phases: EstimatePhase[];
  accuracy: number; // ±percentage
  validUntil: Date;
  createdBy?: string;
  createdAt: Date;
}

export interface EstimatePhase {
  id: string;
  name: string;
  description?: string;
  duration: string;
  cost: number;
  materials: string[];
  laborHours: number;
  dependencies?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "consultant" | "viewer";
  phone?: string;
  specialties: string[];
  active: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: "consultation" | "estimate" | "system" | "urgent";
  title: string;
  message: string;
  read: boolean;
  recipientId: string;
  data?: Record<string, unknown>;
  createdAt: Date;
}

export interface Company {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  businessHours: {
    consultations: string;
    general: string;
    emergency: string;
  };
  serviceAreas: string[];
  specialties: string[];
  certifications: string[];
  veteranOwned: boolean;
  foundedYear: number;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  category: "residential" | "commercial" | "specialty";
  estimatedDuration: string;
  priceRange: {
    min: number;
    max: number;
  };
  features: string[];
  images: string[];
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "bot";
  timestamp: Date;
  context?: string;
  helpful?: boolean;
}

// Form types
export interface ConsultationFormData {
  clientName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
}

export interface EstimatorFormData {
  projectType: string;
  squareFootage: number;
  location: string;
  timeline: string;
  complexity: string;
  features: string[];
  specialRequirements?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

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
  subcategory?: string[];
  status?: string[];
  tags?: string[];
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
}
