/**
 * Review and Rating Schema Generator
 * For testimonials and client reviews
 */

import { COMPANY_INFO } from "@/lib/constants/company";

export interface ReviewSchemaProps {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number; // 1-5
  reviewTitle?: string;
  /** Absolute URL to the client/site photo for this review */
  image?: string | undefined;
}

export function generateReviewSchema(review: ReviewSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
      ...(review.image ? { image: review.image } : {}),
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
      priceRange: "$$$$",
      telephone: COMPANY_INFO.phone.display,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.zip,
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
