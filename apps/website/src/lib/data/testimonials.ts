/**
 * Testimonials data contracts.
 *
 * Runtime testimonial content is sourced from i18n messages
 * (for example testimonialsData.clientTestimonials and
 * careersPage.data.employeeTestimonials) to preserve EN/ES parity.
 */

import type { ContentGovernanceRecord } from "@/lib/content/content-governance";

export interface Testimonial {
  id: string;
  name: string;
  role?: string; // For employees
  title?: string; // For employees
  location?: string; // For mission partners
  project?: string; // For mission partners
  company?: string; // For mission partners
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
  type: "stakeholder" | "employee" | "veteran";
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
  governance?: ContentGovernanceRecord;
}

const TESTIMONIAL_GOVERNANCE: ContentGovernanceRecord = {
  stableId: "testimonials:runtime-message-catalog",
  ownerRole: "marketing-manager",
  lifecycle: "published",
  approvalState: "approved",
  publishState: "public",
  approvalReference: "Localized testimonial content approval",
  nextReviewAt: "2027-06-30",
  sourceReferences: [
    {
      sourceType: "internal-record",
      reference: "messages/en.json:testimonialsData.clientTestimonials",
    },
    {
      sourceType: "internal-record",
      reference: "messages/en.json:careersPage.data.employeeTestimonials",
    },
  ],
};

export type TestimonialSource = Omit<Testimonial, "type">;

export type StakeholderTestimonialSource = Pick<
  TestimonialSource,
  | "id"
  | "name"
  | "location"
  | "project"
  | "company"
  | "rating"
  | "quote"
  | "featured"
  | "date"
  | "image"
  | "category"
>;

export type EmployeeTestimonialSource = Pick<
  TestimonialSource,
  | "id"
  | "name"
  | "title"
  | "role"
  | "quote"
  | "rating"
  | "featured"
  | "date"
  | "veteranStatus"
>;

export function withTestimonialType<T extends TestimonialSource>(
  testimonials: T[],
  type: Testimonial["type"],
): Array<T & Pick<Testimonial, "type" | "governance">> {
  return testimonials.map((testimonial) => ({
    ...testimonial,
    type,
    governance: TESTIMONIAL_GOVERNANCE,
  }));
}

export function normalizeStakeholderTestimonials(
  testimonials: StakeholderTestimonialSource[],
) {
  return withTestimonialType(testimonials, "stakeholder");
}

export function normalizeEmployeeTestimonials(
  testimonials: EmployeeTestimonialSource[],
) {
  return withTestimonialType(testimonials, "employee");
}
