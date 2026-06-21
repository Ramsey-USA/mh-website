/**
 * Testimonials data contracts.
 *
 * Runtime testimonial content is sourced from i18n messages
 * (for example testimonialsData.clientTestimonials and
 * careersPage.data.employeeTestimonials) to preserve EN/ES parity.
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
  category?: string; // commercial, industrial, healthcare, etc.
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
