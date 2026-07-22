export interface ProjectReview {
  id: string;
  author: string;
  quote: string;
  rating: number;
  datePublished?: string;
  projectSlug?: string;
}

// EVIDENCE REQUIRED: replace with the real Google Business Profile review link before production.
// This URL is the single canonical destination used by (a) this website's review CTAs and
// (b) the Phase III milestone-triggered Resend email / Twilio SMS dispatch defined in the
// MHC Digital Marketing & Operations Strategy §5.2. Trigger contract: dispatch fires on
// certificate-of-occupancy issuance, recorded by the PM during facility commissioning.
export const GOOGLE_REVIEW_DESTINATION_URL =
  "https://g.page/r/REPLACE_WITH_MHC_REVIEW_LINK/review";

// EVIDENCE REQUIRED: paste only reviews verbatim from the MHC Google Business Profile, with
// reviewer consent noted in the marketing drive. Never edit quote text beyond truncation with ellipsis.
export const VERIFIED_GOOGLE_REVIEWS: readonly ProjectReview[] = [];

export function getReviewsForProject(slug: string): readonly ProjectReview[] {
  return VERIFIED_GOOGLE_REVIEWS.filter(
    (review) => !review.projectSlug || review.projectSlug === slug,
  );
}
