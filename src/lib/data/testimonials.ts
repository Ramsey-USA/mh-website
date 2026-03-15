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

// CLIENT PARTNER TESTIMONIALS - Coming Soon
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
