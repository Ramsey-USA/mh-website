// Testimonials and reviews types and data
export type TestimonialStatus =
  | "pending"
  | "approved"
  | "featured"
  | "rejected";

export interface ClientTestimonial {
  id: string;
  clientName: string;
  clientLocation: string;
  projectType: "residential" | "commercial" | "renovation" | "emergency";
  projectTitle: string;
  rating: number; // 1-5 stars
  testimonialText: string;
  projectValue?: string;
  completionDate: string;
  submissionDate: string;
  status: TestimonialStatus;
  featured: boolean;
  images?: {
    before?: string[];
    after?: string[];
    client?: string; // Client photo (optional)
  };
  projectDetails?: {
    duration: string;
    challenges?: string[];
    highlights: string[];
  };
  contactPermission: boolean; // Permission to be contacted for references
  videoTestimonial?: {
    url: string;
    thumbnail: string;
  };
  tags: string[];
  source: "website" | "google" | "facebook" | "email" | "phone";
  adminNotes?: string;
  responseFromCompany?: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recentReviews: number; // Last 30 days
  featuredReviews: number;
}

export interface TestimonialFilter {
  rating?: number[];
  projectType?: string[];
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
  featured?: boolean;
}

// Mock testimonials data - Removed per company policy
// All testimonials will be real client feedback only
export const mockTestimonials: ClientTestimonial[] = [];

// Calculate review statistics
export const getReviewStats = (
  testimonials: ClientTestimonial[],
): ReviewStats => {
  const approvedTestimonials = testimonials.filter(
    (t) => t.status === "approved" || t.status === "featured",
  );

  const totalReviews = approvedTestimonials.length;
  const averageRating =
    totalReviews > 0
      ? approvedTestimonials.reduce((sum, t) => sum + t.rating, 0) /
        totalReviews
      : 0;

  const ratingDistribution = {
    5: approvedTestimonials.filter((t) => t.rating === 5).length,
    4: approvedTestimonials.filter((t) => t.rating === 4).length,
    3: approvedTestimonials.filter((t) => t.rating === 3).length,
    2: approvedTestimonials.filter((t) => t.rating === 2).length,
    1: approvedTestimonials.filter((t) => t.rating === 1).length,
  };

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentReviews = approvedTestimonials.filter(
    (t) => new Date(t.submissionDate) >= thirtyDaysAgo,
  ).length;

  const featuredReviews = testimonials.filter((t) => t.featured).length;

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution,
    recentReviews,
    featuredReviews,
  };
};
