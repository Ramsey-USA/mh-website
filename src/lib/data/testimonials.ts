/**
 * Centralized Testimonials Data
 * Single source of truth for all testimonials across the website
 * Categories: Client Partner, employee, veteran
 */

export interface Testimonial {
  id: string;
  name: string;
  role?: string; // For employees
  title?: string; // For employees
  location?: string; // For Client Partners
  project?: string; // For Client Partners
  company?: string; // For Client Partners
  rating?: number; // 1-5 stars
  quote: string;
  /** Client portrait — /images/testimonials/[id].webp (800 px wide) */
  image?: string;
  /** Job-site or project photo — /images/projects/[slug]/hero.webp */
  projectPhoto?: string;
  /** Short video testimonial — /videos/testimonials/[id].mp4 */
  videoUrl?: string;
  /** Pre-sized social card (1080×1080 px) — /images/social/testimonials/[id].webp */
  socialCard?: string;
  type: "client" | "employee" | "veteran";
  category?: string; // commercial, residential, healthcare, etc.
  featured?: boolean;
  date?: string; // When testimonial was given
  veteranStatus?: boolean; // For veteran-specific testimonials
  /** True once this testimonial has been pushed to social + email */
  publishedToSocial?: boolean;
  /** ISO date of social/email publish */
  publishedAt?: string;
  /** Which platforms this testimonial was published to */
  platforms?: ("facebook" | "instagram" | "linkedin" | "twitter")[];
}

// CLIENT PARTNER TESTIMONIALS
export const clientTestimonials: Testimonial[] = [
  {
    id: "client-006",
    name: "Captain for Special Projects",
    company: "Yakima County Fire District 5",
    location: "Zillah, WA",
    project:
      "Admin & Dispatch Center and Fire Station 10 Remodel (operations maintained; 60+ telecom tower)",
    rating: 5,
    quote:
      "MH Construction defines how a professional contractor should perform. Excellent business ethics and fiscal responsibility while their construction knowledge is well above their peers. We value this relationship and hope to continue growing it on more Yakima County Fire District construction projects.",
    type: "client",
    category: "government",
    featured: true,
  },
  {
    id: "client-007",
    name: "Jesse Dunagan",
    company: "Lutheran Community Services NW",
    project: "40,000+ sqft remodel for new base of operations",
    rating: 5,
    quote:
      "MHC's team has been an absolute pleasure to partner with, having principles that are appreciated deeply by our LCSNW team. Those observed principles are ethics, curiosity, engagement, and sensitivity to perspectives, honesty, humbleness, safety, quality in craftsmanship and objective based solutions.",
    type: "client",
    category: "commercial",
    featured: true,
  },
  {
    id: "client-008",
    name: "Keith Bjella",
    company: "Windermere Pasco",
    project: "Tenant improvement",
    rating: 5,
    quote:
      "MH did a tenant improvement for us last year and we couldn't be happier. They helped facilitate the process from initial design, permitting, and construction. Even with the large number of stakeholders at our company, MH handled everything in stride. Extremely happy with their processes, employees, subcontractors, transparency, and fairness.",
    type: "client",
    category: "commercial",
    featured: true,
  },
  {
    id: "client-009",
    name: "Brandon Christensen",
    company: "Christensen - Fuel and Lubricants Service",
    project: "Multiple commercial projects",
    rating: 5,
    quote:
      "We've had MH Construction perform several commercial projects over the years. We have been very pleased with their workmanship, communication, and timeliness. We would not hesitate to utilize MH Construction in the future.",
    type: "client",
    category: "commercial",
    featured: true,
  },
  {
    id: "client-010",
    name: "Samantha Schuster",
    company: "Summer's Hub Pasco and Kennewick",
    project: "Commercial partnership projects",
    rating: 5,
    quote:
      "We are grateful to be customers of MH Construction and are very satisfied with the quality and professionalism of their work. Their team's attention to detail, timely communication, and reliable results have exceeded our expectations. We look forward to continuing our partnership with MH Construction on future projects and highly recommend their services to others.",
    type: "client",
    category: "commercial",
    featured: true,
  },
  {
    id: "client-011",
    name: "Blake Still",
    company: "Baskin-Robbins of Kennewick",
    project: "Commercial build",
    rating: 5,
    quote:
      "We couldn't be happier with the quality of workmanship. Todd was great to deal with, keeping us in the loop throughout the build.",
    type: "client",
    category: "commercial",
    featured: true,
  },
];

// EMPLOYEE TESTIMONIALS
export const employeeTestimonials: Testimonial[] = [
  {
    id: "emp-001",
    name: "Carlos R.",
    title: "Senior Project Manager",
    role: "Project Management",
    rating: 5,
    quote:
      "Working at MH Construction means being part of a team that actually cares — about the craft, about each other, and about the communities we build in. I've grown more here in two years than I did in five elsewhere.",
    type: "employee",
    featured: true,
    date: "2024-01",
    veteranStatus: true,
  },
  {
    id: "emp-002",
    name: "Tamara W.",
    title: "Estimator",
    role: "Pre-Construction",
    rating: 5,
    quote:
      "MH Construction is serious about inclusion and professional development. They invested in my certifications and gave me real responsibility from day one.",
    type: "employee",
    featured: true,
    date: "2024-03",
  },
  {
    id: "emp-003",
    name: "Derek L.",
    title: "Lead Carpenter",
    role: "Field Operations",
    rating: 5,
    quote:
      "The culture on every jobsite is safe, respectful, and focused. Leadership at MH Construction sets the standard and it trickles down to every crew member.",
    type: "employee",
    featured: false,
    date: "2023-11",
    veteranStatus: true,
  },
];

// CONVENIENCE FUNCTIONS - Filter testimonials by category
export function getClientTestimonials(featured?: boolean): Testimonial[] {
  return featured
    ? clientTestimonials.filter((t) => t.featured)
    : clientTestimonials;
}

export function getEmployeeTestimonials(featured?: boolean): Testimonial[] {
  return featured
    ? employeeTestimonials.filter((t) => t.featured)
    : employeeTestimonials;
}

export function getAllTestimonials(featured?: boolean): Testimonial[] {
  const all = [...clientTestimonials, ...employeeTestimonials];
  return featured ? all.filter((t) => t.featured) : all;
}

export function getVeteranTestimonials(): Testimonial[] {
  return [...clientTestimonials, ...employeeTestimonials].filter(
    (t) => t.veteranStatus,
  );
}
