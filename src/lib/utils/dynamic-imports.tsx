/**
 * Centralized Dynamic Imports
 *
 * This file contains all commonly used dynamic imports to prevent duplication.
 * Instead of repeating the same dynamic import code across multiple pages,
 * import from here to ensure consistency.
 *
 * @example
 * import { NextStepsSection, TestimonialGrid } from "@/lib/utils/dynamic-imports";
 */

import dynamic from "next/dynamic";

/**
 * Standard final CTA section - used on most pages
 * SSR enabled for SEO
 */
export const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

/**
 * Testimonial grid with carousel
 * Client-side only (below-the-fold, interactive)
 */
export const TestimonialGrid = dynamic(
  () =>
    import("@/components/testimonials").then((mod) => ({
      default: mod.TestimonialGrid,
    })),
  { ssr: false },
);

/**
 * Job application modal
 * Client-side only (interactive)
 */
export const JobApplicationModal = dynamic(
  () =>
    import("@/components/ui").then((mod) => ({
      default: mod.JobApplicationModal,
    })),
  { ssr: false },
);
