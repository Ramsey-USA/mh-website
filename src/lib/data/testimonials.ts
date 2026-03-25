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
  image?: string;
  type: "client" | "employee" | "veteran";
  category?: string; // commercial, residential, healthcare, etc.
  featured?: boolean;
  date?: string; // When testimonial was given
  veteranStatus?: boolean; // For veteran-specific testimonials
}

// CLIENT PARTNER TESTIMONIALS
export const clientTestimonials: Testimonial[] = [
  {
    id: "client-001",
    name: "J. & K. Thompson",
    location: "Richland, WA",
    project: "Custom Home Build",
    rating: 5,
    quote:
      "MH Construction went above and beyond for our family. They truly understood our vision and delivered a home we're incredibly proud of. The team was professional, communicative, and finished on schedule.",
    type: "client",
    category: "residential",
    featured: true,
    date: "2024-04",
  },
  {
    id: "client-002",
    name: "Pacific Rim Distribution Co.",
    company: "Pacific Rim Distribution Co.",
    location: "Pasco, WA",
    project: "Industrial Warehouse Build-Out",
    rating: 5,
    quote:
      "From the initial bid to final walk-through, MH Construction was outstanding. They built our 24,000 sq ft distribution center on time and within budget. We wouldn't hesitate to use them again.",
    type: "client",
    category: "industrial",
    featured: true,
    date: "2023-12",
  },
  {
    id: "client-003",
    name: "Dr. Sarah M.",
    company: "Cascade Valley Medical Group",
    location: "Spokane, WA",
    project: "Healthcare Clinic Tenant Improvement",
    rating: 5,
    quote:
      "Navigating healthcare facility codes is complex — MH Construction handled every requirement flawlessly. Our clinic was completed on schedule and every detail was exactly what we needed.",
    type: "client",
    category: "commercial",
    featured: true,
    date: "2023-09",
  },
  {
    id: "client-004",
    name: "Marcus B.",
    location: "Kennewick, WA",
    project: "Commercial Office Renovation",
    rating: 5,
    quote:
      "Our office renovation transformed the entire feel of our workplace. The MH Construction crew was respectful, clean, and worked around our schedule so we never lost a day of business.",
    type: "client",
    category: "commercial",
    featured: false,
    date: "2024-07",
  },
  {
    id: "client-005",
    name: "Apex Property Management",
    company: "Apex Property Management",
    location: "West Richland, WA",
    project: "Multi-Family Complex",
    rating: 5,
    quote:
      "Managing a 16-unit build is no small feat. MH Construction kept us informed every step of the way and delivered a quality product that our residents love.",
    type: "client",
    category: "residential",
    featured: false,
    date: "2024-10",
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
