export interface ProjectReview {
  id: string;
  author: string;
  quote: string;
  rating: number;
  datePublished?: string;
  projectSlug?: string;
}

// Canonical Google Business Profile review destination used by all website review CTAs.
export const GOOGLE_REVIEW_DESTINATION_URL =
  "https://g.page/r/CVdv3YZLzJvdEAE/review";

// EVIDENCE REQUIRED: paste only reviews verbatim from the MHC Google Business Profile, with
// reviewer consent noted in the marketing drive. Never edit quote text beyond truncation with ellipsis.
export const VERIFIED_GOOGLE_REVIEWS: readonly ProjectReview[] = [];

export function getReviewsForProject(slug: string): readonly ProjectReview[] {
  return VERIFIED_GOOGLE_REVIEWS.filter(
    (review) => !review.projectSlug || review.projectSlug === slug,
  );
}
