"use client";

import { useMemo } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import type { Testimonial } from "@/lib/data/testimonials";

interface AggregateRatingProps {
  /**
   * Array of testimonials to calculate rating from
   */
  testimonials: Testimonial[];
  /**
   * Display variant
   * @default "default"
   */
  variant?: "default" | "compact" | "hero";
  /**
   * Show detailed breakdown
   * @default false
   */
  showBreakdown?: boolean;
  /**
   * Optional custom title
   */
  title?: string;
  /**
   * Optional CSS classes
   */
  className?: string;
}

/**
 * AggregateRating Component
 *
 * Displays aggregate star rating with schema.org markup for SEO.
 * Calculates average from testimonials with ratings.
 *
 * Features:
 * - Automatic rating calculation
 * - Schema.org AggregateRating markup
 * - Multiple display variants
 * - Optional detailed breakdown
 *
 * @example
 * ```tsx
 * <AggregateRating
 *   testimonials={clientTestimonials}
 *   variant="default"
 *   showBreakdown={true}
 * />
 * ```
 */
export function AggregateRating({
  testimonials,
  variant = "default",
  showBreakdown = false,
  title,
  className = "",
}: AggregateRatingProps) {
  // Calculate aggregate rating
  const { averageRating, totalReviews, ratingBreakdown } = useMemo(() => {
    const withRatings = testimonials.filter((t) => t.rating);
    const total = withRatings.length;

    if (total === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const sum = withRatings.reduce((acc, t) => acc + (t.rating || 0), 0);
    const average = sum / total;

    // Calculate breakdown
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    withRatings.forEach((t) => {
      if (t.rating) {
        breakdown[t.rating as keyof typeof breakdown]++;
      }
    });

    return {
      averageRating: Number(average.toFixed(1)),
      totalReviews: total,
      ratingBreakdown: breakdown,
    };
  }, [testimonials]);

  // Render star icons
  const renderStars = (rating: number, size = "text-2xl") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <MaterialIcon
            key={i}
            icon="star"
            className={`${size} text-yellow-400 dark:text-yellow-300`}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <MaterialIcon
            key={i}
            icon="star_half"
            className={`${size} text-yellow-400 dark:text-yellow-300`}
          />,
        );
      } else {
        stars.push(
          <MaterialIcon
            key={i}
            icon="star_outline"
            className={`${size} text-gray-300 dark:text-gray-600`}
          />,
        );
      }
    }

    return stars;
  };

  if (totalReviews === 0) {
    return null; // Don't show if no ratings
  }

  // Compact variant (for inline display)
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-0.5">
          {renderStars(averageRating, "text-base")}
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {averageRating}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
        </span>

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AggregateRating",
              ratingValue: averageRating,
              reviewCount: totalReviews,
              bestRating: 5,
              worstRating: 1,
            }),
          }}
        />
      </div>
    );
  }

  // Hero variant (large display)
  if (variant === "hero") {
    return (
      <FadeInWhenVisible>
        <div
          className={`bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-gray-800/50 dark:to-gray-700/50 rounded-3xl p-8 lg:p-12 text-center border border-brand-primary/10 dark:border-gray-700 ${className}`}
        >
          {title && (
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {title}
            </h3>
          )}

          {/* Large Rating Display */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(averageRating, "text-4xl lg:text-5xl")}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-6xl lg:text-7xl font-black text-brand-primary dark:text-brand-secondary">
                {averageRating}
              </span>
              <span className="text-3xl lg:text-4xl text-gray-400 dark:text-gray-500">
                / 5.0
              </span>
            </div>

            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Based on{" "}
              <span className="font-bold text-brand-primary dark:text-brand-secondary">
                {totalReviews}+
              </span>{" "}
              verified reviews
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MaterialIcon
                icon="verified"
                className="text-green-600 dark:text-green-400"
              />
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon
                icon="thumb_up"
                className="text-blue-600 dark:text-blue-400"
              />
              <span>100% Recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon
                icon="military_tech"
                className="text-bronze-300 dark:text-bronze-400"
              />
              <span>Veteran-Owned</span>
            </div>
          </div>

          {/* Schema.org Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AggregateRating",
                ratingValue: averageRating,
                reviewCount: totalReviews,
                bestRating: 5,
                worstRating: 1,
              }),
            }}
          />
        </div>
      </FadeInWhenVisible>
    );
  }

  // Default variant
  return (
    <FadeInWhenVisible>
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        {title && (
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h3>
        )}

        {/* Rating Display */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl lg:text-5xl font-black text-brand-primary dark:text-brand-secondary">
              {averageRating}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              out of 5
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              {renderStars(averageRating, "text-xl")}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        {/* Rating Breakdown */}
        {showBreakdown && (
          <div className="space-y-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count =
                ratingBreakdown[stars as keyof typeof ratingBreakdown];
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                    {stars} star{stars !== 1 && "s"}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 dark:bg-yellow-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AggregateRating",
              ratingValue: averageRating,
              reviewCount: totalReviews,
              bestRating: 5,
              worstRating: 1,
            }),
          }}
        />
      </div>
    </FadeInWhenVisible>
  );
}
