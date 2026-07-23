"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { MH_SLOGANS } from "@/lib/branding/page-names";
import { GOOGLE_REVIEW_DESTINATION_URL } from "@/lib/data/google-reviews";

interface GoogleReviewRibbonProps {
  className?: string;
}

const HIDDEN_EXACT_ROUTES = new Set([
  "/testimonials",
  "/events",
  "/cool-desert-nights",
  "/careers",
]);

const HIDDEN_ROUTE_PREFIXES = ["/hub", "/safety", "/admin", "/api"];

export function GoogleReviewRibbon(props: Readonly<GoogleReviewRibbonProps>) {
  const { className = "" } = props;
  const pathname = usePathname();

  if (
    HIDDEN_EXACT_ROUTES.has(pathname) ||
    HIDDEN_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return null;
  }

  return (
    <aside
      aria-label="Google review request"
      className={`border-y border-brand-secondary/35 bg-linear-to-r from-brand-primary to-brand-primary-dark ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 text-white sm:items-center">
          <span
            className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 sm:mt-0"
            aria-hidden="true"
          >
            <MaterialIcon icon="rate_review" size="md" />
          </span>
          <div>
            <p className="font-subheading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-secondary-light/95">
              Google Reviews
            </p>
            <p className="font-heading text-lg font-black leading-snug sm:text-xl">
              {MH_SLOGANS.primary}
            </p>
            <p className="font-body mt-1 text-sm text-white/90 sm:text-base">
              If our team recently completed your project, please share your
              experience to help future project stakeholders make informed
              partnership decisions.
            </p>
          </div>
        </div>

        <Link
          href={GOOGLE_REVIEW_DESTINATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-interactive border border-brand-secondary/60 bg-brand-secondary/20 px-4 py-2 font-subheading text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-secondary hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
          aria-label="Leave a Google review for MH Construction"
        >
          <MaterialIcon icon="star" size="sm" ariaLabel="Leave a review" />
          Leave a Google Review
        </Link>
      </div>
    </aside>
  );
}
