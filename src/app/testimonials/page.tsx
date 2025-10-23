/**
 * Testimonials Page
 * Displays all customer testimonials and reviews
 */

import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { mockTestimonials } from "@/lib/types/testimonials";
import { formatDate } from "@/lib/utils/dateUtils";

export const metadata: Metadata = {
  title: "Customer Testimonials - MH Construction",
  description:
    "Read testimonials and reviews from satisfied customers across the Pacific Northwest. See what our clients say about our construction and renovation services.",
  openGraph: {
    title: "Customer Testimonials - MH Construction",
    description:
      "Read testimonials and reviews from satisfied customers across the Pacific Northwest.",
    type: "website",
  },
};

export default function TestimonialsPage() {
  // Get all approved and featured testimonials
  const displayTestimonials = mockTestimonials
    .filter(
      (testimonial) =>
        testimonial.status === "approved" || testimonial.status === "featured"
    )
    .sort((a, b) => {
      // Featured first, then by rating, then by date
      if (a.status === "featured" && b.status !== "featured") return -1;
      if (b.status === "featured" && a.status !== "featured") return 1;
      if (a.rating !== b.rating) return b.rating - a.rating;
      return (
        new Date(b.submissionDate).getTime() -
        new Date(a.submissionDate).getTime()
      );
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Customer Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read what our satisfied customers say about our construction,
            renovation, and home improvement services across the Pacific
            Northwest.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {displayTestimonials.length}+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {(
                  displayTestimonials.reduce((sum, t) => sum + t.rating, 0) /
                  displayTestimonials.length
                ).toFixed(1)}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Page Navigation */}
        <PageNavigation
          items={navigationConfigs.testimonials}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t-4 border-brand-primary mb-8"
        />

        {/* Testimonials Grid */}
        <div
          id="client-reviews"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                testimonial.status === "featured"
                  ? "ring-2 ring-yellow-400"
                  : ""
              }`}
            >
              {/* Featured Badge */}
              {testimonial.status === "featured" && (
                <div className="bg-yellow-400 text-center py-2">
                  <span className="text-yellow-900 font-semibold text-sm flex items-center justify-center gap-1">
                    <MaterialIcon
                      icon="workspace_premium"
                      className="w-4 h-4"
                    />
                    Featured Review
                  </span>
                </div>
              )}

              {/* Project Image */}
              {testimonial.images?.after && testimonial.images.after[0] && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={testimonial.images.after[0]}
                    alt={testimonial.projectTitle}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 capitalize">
                    {testimonial.projectType}
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <MaterialIcon
                      key={i}
                      icon="star"
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">
                    {testimonial.rating}/5
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {testimonial.projectTitle}
                </h3>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-4 italic">
                  &quot;{testimonial.testimonialText}&quot;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {testimonial.images?.client && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.images.client}
                        alt={testimonial.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MaterialIcon icon="place" className="w-4 h-4" />
                        {testimonial.clientLocation}
                      </span>
                      <span className="flex items-center gap-1">
                        <MaterialIcon icon="event" className="w-4 h-4" />
                        {formatDate(testimonial.completionDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Tags */}
                {testimonial.tags && testimonial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {testimonial.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-gray-600 mb-6">
            Get a free consultation and estimate for your construction or
            renovation project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/estimator"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <MaterialIcon icon="calculate" className="w-5 h-5" />
              Get Free Estimate
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <MaterialIcon icon="phone" className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            All testimonials are from verified customers and represent actual
            project outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
