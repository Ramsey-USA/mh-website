/**
 * Review and Rating Schema Generator
 * For testimonials and client reviews
 */

export interface ReviewSchemaProps {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number; // 1-5
  reviewTitle?: string;
}

export function generateReviewSchema(review: ReviewSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    name: review.reviewTitle,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "MH Construction",
      image: "https://www.mhc-gc.com/images/logo/mh-logo.png",
      priceRange: "$$-$$$",
      telephone: "(509) 308-6489",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3111 N. Capital Ave.",
        addressLocality: "Pasco",
        addressRegion: "WA",
        postalCode: "99301",
        addressCountry: "US",
      },
    },
  };
}

/**
 * Generate aggregate rating for the organization
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MH Construction",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
