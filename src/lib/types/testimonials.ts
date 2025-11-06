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

// Mock testimonials data
export const mockTestimonials: ClientTestimonial[] = [
  {
    id: "testimonial-001",
    clientName: "John Smith",
    clientLocation: "Tri-Cities, WA",
    projectType: "commercial",
    projectTitle: "Baskin Robbins Store Build",
    rating: 5,
    testimonialText:
      "Working with Todd and the MH Construction team on our Baskin Robbins build was exceptional. Todd's communication throughout the entire project kept us informed every step of the way, and the quality of workmanship exceeded our expectations. From start to finish, they demonstrated professionalism and attention to detail that made this build a success.",
    projectValue: "$250,000",
    completionDate: "2024-10-15",
    submissionDate: "2024-10-20",
    status: "featured",
    featured: true,
    images: {
      after: [
        "/images/testimonials/baskin-robbins-after-1.jpg",
        "/images/testimonials/baskin-robbins-after-2.jpg",
      ],
    },
    projectDetails: {
      duration: "4 months",
      highlights: [
        "Excellent communication",
        "Quality workmanship",
        "Professional execution",
        "On-time completion",
      ],
    },
    contactPermission: true,
    tags: [
      "commercial construction",
      "retail build",
      "quality workmanship",
      "Todd Schoeff",
    ],
    source: "email",
    responseFromCompany:
      "Thank you John! It was a pleasure working with you on the Baskin Robbins project. We're proud to have delivered the quality you expected and appreciate your trust in our team.",
  },
  {
    id: "testimonial-002",
    clientName: "Keith Bjella",
    clientLocation: "Tri-Cities, WA",
    projectType: "commercial",
    projectTitle: "Tenant Improvement Project",
    rating: 5,
    testimonialText:
      "The tenant improvement process with MH Construction was outstanding from design through construction. Their ability to facilitate the entire process while managing multiple stakeholders, coordinating various processes, overseeing employees and subcontractors, and maintaining transparency and fairness throughout was truly impressive. They made what could have been a complex project feel seamless.",
    projectValue: "$320,000",
    completionDate: "2024-11-30",
    submissionDate: "2024-12-05",
    status: "featured",
    featured: true,
    images: {
      after: [
        "/images/testimonials/bjella-tenant-improvement-1.jpg",
        "/images/testimonials/bjella-tenant-improvement-2.jpg",
      ],
    },
    projectDetails: {
      duration: "5 months",
      highlights: [
        "Design through construction facilitation",
        "Multiple stakeholder coordination",
        "Transparent communication",
        "Fair and professional management",
        "Complex process made seamless",
      ],
    },
    contactPermission: true,
    tags: [
      "tenant improvement",
      "commercial project",
      "stakeholder coordination",
      "transparency",
      "process management",
    ],
    source: "email",
    responseFromCompany:
      "Thank you Keith! Your tenant improvement project showcased exactly what we strive for—seamless coordination and transparent communication. We're grateful for the opportunity to work with you.",
  },
  {
    id: "testimonial-003",
    clientName: "Jennifer & Mike Thompson",
    clientLocation: "Pasco Heights, WA",
    projectType: "residential",
    projectTitle: "Custom Family Home Construction",
    rating: 5,
    testimonialText:
      "MH Construction exceeded our expectations in every way. Their military precision and attention to detail resulted in our dream home being completed ahead of schedule and within budget. Mark and his team were professional, communicative, and genuinely cared about delivering quality work. The veteran-owned values really showed in their commitment to excellence.",
    projectValue: "$475,000",
    completionDate: "2024-11-30",
    submissionDate: "2024-12-05",
    status: "featured",
    featured: true,
    images: {
      before: ["/images/testimonials/thompson-before-1.jpg"],
      after: [
        "/images/testimonials/thompson-after-1.jpg",
        "/images/testimonials/thompson-after-2.jpg",
      ],
      client: "/images/testimonials/thompson-family.jpg",
    },
    projectDetails: {
      duration: "3.5 months",
      challenges: [
        "Challenging soil conditions",
        "Weather delays during winter",
      ],
      highlights: [
        "Completed ahead of schedule",
        "Under budget delivery",
        "Energy-efficient design",
        "Custom millwork",
      ],
    },
    contactPermission: true,
    tags: [
      "new construction",
      "family home",
      "energy efficient",
      "custom design",
    ],
    source: "website",
    responseFromCompany:
      "Thank you Jennifer and Mike! It was a pleasure working with you both. We're thrilled that you love your new home and appreciate your trust in our veteran team.",
  },
  {
    id: "testimonial-004",
    clientName: "Robert & Lisa Chen",
    clientLocation: "Richland, WA",
    projectType: "renovation",
    projectTitle: "Kitchen & Master Bathroom Remodel",
    rating: 5,
    testimonialText:
      "Our kitchen and bathroom look absolutely amazing! The MH Construction team was professional, clean, and delivered exactly what they promised. Jim's custom cabinetry work is exceptional, and Sarah's design coordination made the whole process seamless. We love our new spaces and have already recommended them to friends.",
    projectValue: "$92,000",
    completionDate: "2024-09-20",
    submissionDate: "2024-09-25",
    status: "approved",
    featured: true,
    images: {
      before: [
        "/images/testimonials/chen-before-1.jpg",
        "/images/testimonials/chen-before-2.jpg",
      ],
      after: [
        "/images/testimonials/chen-after-1.jpg",
        "/images/testimonials/chen-after-2.jpg",
      ],
      client: "/images/testimonials/chen-couple.jpg",
    },
    projectDetails: {
      duration: "7 weeks",
      highlights: [
        "Custom cabinetry",
        "Quartz countertops",
        "Modern fixtures",
        "Increased home value",
      ],
    },
    contactPermission: true,
    tags: ["renovation", "kitchen", "bathroom", "custom cabinetry"],
    source: "website",
    responseFromCompany:
      "Thank you Robert and Lisa! Your kitchen and bathroom transformations turned out beautifully. We appreciate your patience during the renovation process.",
  },
  {
    id: "testimonial-005",
    clientName: "TechFlow Solutions",
    clientLocation: "Kennewick, WA",
    projectType: "commercial",
    projectTitle: "Office Space Renovation",
    rating: 5,
    testimonialText:
      "The team at MH Construction transformed our outdated office into a modern workspace that our employees love. The project was completed on time despite our tight timeline, and the quality exceeded our expectations. Their ability to work around our business operations with minimal disruption was impressive.",
    projectValue: "$185,000",
    completionDate: "2024-10-15",
    submissionDate: "2024-10-18",
    status: "approved",
    featured: false,
    images: {
      before: ["/images/testimonials/techflow-before-1.jpg"],
      after: [
        "/images/testimonials/techflow-after-1.jpg",
        "/images/testimonials/techflow-after-2.jpg",
      ],
    },
    projectDetails: {
      duration: "5 weeks",
      challenges: [
        "Working around occupied business operations",
        "Tight timeline",
      ],
      highlights: [
        "Modern design",
        "Minimal business disruption",
        "Ahead of schedule completion",
      ],
    },
    contactPermission: true,
    tags: ["commercial", "office renovation", "modern design"],
    source: "email",
    responseFromCompany:
      "Thank you TechFlow Solutions! We're glad your team loves the new workspace. It was a pleasure working with you on this transformation.",
  },
  {
    id: "testimonial-006",
    clientName: "David Rodriguez",
    clientLocation: "West Richland, WA",
    projectType: "emergency",
    projectTitle: "Storm Damage Repair",
    rating: 5,
    testimonialText:
      "When a storm damaged our roof and siding, MH Construction responded immediately. They had a team out the same day for emergency repairs and completed the full restoration quickly and professionally. As a fellow veteran, I appreciated their prompt service and quality work during a stressful time.",
    projectValue: "$35,000",
    completionDate: "2024-08-15",
    submissionDate: "2024-08-20",
    status: "approved",
    featured: false,
    images: {
      before: ["/images/testimonials/rodriguez-damage-1.jpg"],
      after: ["/images/testimonials/rodriguez-repair-1.jpg"],
    },
    projectDetails: {
      duration: "1 week",
      highlights: [
        "Same-day emergency response",
        "Insurance coordination",
        "Quality restoration",
      ],
    },
    contactPermission: true,
    tags: ["emergency repair", "storm damage", "veteran customer"],
    source: "phone",
    responseFromCompany:
      "Thank you for your service, David! We're honored to help a fellow veteran and glad we could restore your home quickly.",
  },
  {
    id: "testimonial-007",
    clientName: "Maria Gonzalez",
    clientLocation: "Pasco, WA",
    projectType: "residential",
    projectTitle: "Home Addition & Deck",
    rating: 4,
    testimonialText:
      "MH Construction did a great job on our home addition and deck project. The work quality is excellent and the team was professional throughout. The project took a bit longer than expected due to permit delays, but they kept us informed and the final result is beautiful.",
    projectValue: "$125,000",
    completionDate: "2024-07-30",
    submissionDate: "2024-08-05",
    status: "approved",
    featured: false,
    images: {
      before: ["/images/testimonials/gonzalez-before-1.jpg"],
      after: ["/images/testimonials/gonzalez-after-1.jpg"],
    },
    projectDetails: {
      duration: "8 weeks",
      challenges: ["Permit processing delays", "Weather interruptions"],
      highlights: [
        "Quality craftsmanship",
        "Excellent communication",
        "Beautiful final result",
      ],
    },
    contactPermission: false,
    tags: ["home addition", "deck construction", "quality work"],
    source: "website",
  },
  {
    id: "testimonial-008",
    clientName: "James & Patricia Wilson",
    clientLocation: "Kennewick, WA",
    projectType: "renovation",
    projectTitle: "Basement Finishing",
    rating: 5,
    testimonialText:
      "We couldn't be happier with our finished basement! MH Construction turned our unused basement into a beautiful family recreation space. The attention to detail, from the flooring to the built-in entertainment center, exceeded our expectations. Highly recommend!",
    projectValue: "$65,000",
    completionDate: "2024-06-15",
    submissionDate: "2024-06-20",
    status: "pending",
    featured: false,
    images: {
      before: ["/images/testimonials/wilson-before-1.jpg"],
      after: [
        "/images/testimonials/wilson-after-1.jpg",
        "/images/testimonials/wilson-after-2.jpg",
      ],
    },
    projectDetails: {
      duration: "6 weeks",
      highlights: [
        "Custom built-ins",
        "Quality flooring",
        "Entertainment center",
        "Family space transformation",
      ],
    },
    contactPermission: true,
    tags: ["basement finishing", "family space", "custom built-ins"],
    source: "facebook",
  },
];

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
