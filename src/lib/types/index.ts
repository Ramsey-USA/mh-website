// TypeScript types for MH Construction website

export interface Consultation {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  projectType: 'residential' | 'commercial' | 'renovation' | 'custom';
  projectDescription?: string;
  location?: string;
  budget?: number;
  timeline?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
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
    complexity: 'low' | 'medium' | 'high';
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
  role: 'admin' | 'manager' | 'consultant' | 'viewer';
  phone?: string;
  specialties: string[];
  active: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'consultation' | 'estimate' | 'system' | 'urgent';
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
  category: 'residential' | 'commercial' | 'specialty';
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
  sender: 'user' | 'bot';
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