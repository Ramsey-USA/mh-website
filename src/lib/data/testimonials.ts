/**
 * Centralized Testimonials Data
 * Single source of truth for all testimonials across the website
 * Categories: client, employee, veteran
 */

export interface Testimonial {
  id: string;
  name: string;
  role?: string; // For employees
  title?: string; // For employees
  location?: string; // For clients
  project?: string; // For clients
  company?: string; // For clients
  rating?: number; // 1-5 stars
  quote: string;
  image?: string;
  type: "client" | "employee" | "veteran";
  category?: string; // commercial, residential, healthcare, etc.
  featured?: boolean;
  date?: string; // When testimonial was given
  veteranStatus?: boolean; // For veteran-specific testimonials
}

// CLIENT TESTIMONIALS - Coming Soon
export const clientTestimonials: Testimonial[] = [];

// EMPLOYEE TESTIMONIALS - Coming Soon
export const employeeTestimonials: Testimonial[] = [];

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

export function getVeteranTestimonials(): Testimonial[] {
  return [
    ...employeeTestimonials.filter((t) => t.type === "veteran"),
    ...clientTestimonials.filter((t) => t.veteranStatus),
  ];
}

export function getTestimonialsByCategory(
  category: string,
): Testimonial[] | undefined {
  return clientTestimonials.filter((t) => t.category === category);
}

export function getAllTestimonials(): Testimonial[] {
  return [...clientTestimonials, ...employeeTestimonials];
}

export function getFeaturedTestimonials(): Testimonial[] {
  return [...clientTestimonials, ...employeeTestimonials].filter(
    (t) => t.featured,
  );
}
