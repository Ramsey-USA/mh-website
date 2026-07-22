import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  GOOGLE_REVIEW_DESTINATION_URL,
  type ProjectReview,
} from "@/lib/data/google-reviews";

interface GoogleReviewsStripProps {
  reviews: readonly ProjectReview[];
  labels: {
    heading: string;
    verifiedLabel: string;
    buttonLabel: string;
  };
}

export function GoogleReviewsStrip({
  reviews,
  labels,
}: Readonly<GoogleReviewsStripProps>) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-white py-12 dark:bg-gray-900 sm:py-14"
      aria-label={labels.heading}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            {labels.heading}
          </h2>
          <span className="rounded-full bg-brand-secondary/20 px-3 py-1 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-secondary-light">
            {labels.verifiedLabel}
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-card border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-3 flex items-center gap-1 text-brand-secondary">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <MaterialIcon
                    key={`${review.id}-star-${index}`}
                    icon="star"
                    size="sm"
                    ariaLabel="Filled star"
                  />
                ))}
              </div>
              <blockquote className="font-body text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                "{review.quote}"
              </blockquote>
              <p className="mt-3 font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-300">
                {review.author}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={GOOGLE_REVIEW_DESTINATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-interactive bg-brand-primary px-6 py-3 font-subheading font-semibold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <MaterialIcon
              icon="rate_review"
              size="sm"
              ariaLabel="Google reviews"
            />
            <span>{labels.buttonLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
