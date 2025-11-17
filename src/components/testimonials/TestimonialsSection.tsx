/**
 * Testimonials Section Component
 * A reusable section that displays Client Partner testimonials and reviews
 * Can be embedded on multiple pages (About, Projects, etc.)
 */

import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { mockTestimonials } from "@/lib/types/testimonials";
import { formatDate } from "@/lib/utils/dateUtils";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  showStats?: boolean;
  maxTestimonials?: number;
  showCTA?: boolean;
  id?: string;
  className?: string;
}

export default function TestimonialsSection({
  title = "Client Partner Testimonials",
  subtitle = "Read what our satisfied Client Partners say about our construction, renovation, and commercial services across the Pacific Northwest.",
  showStats = true,
  maxTestimonials,
  showCTA = true,
  id = "testimonials",
  className = "",
}: TestimonialsSectionProps) {
  // Get all approved and featured testimonials
  const displayTestimonials = mockTestimonials
    .filter(
      (testimonial) =>
        testimonial.status === "approved" || testimonial.status === "featured",
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

  // Apply max testimonials limit if specified
  const testimonialsToShow = maxTestimonials
    ? displayTestimonials.slice(0, maxTestimonials)
    : displayTestimonials;

  // Show "Coming Soon" if no testimonials available
  if (testimonialsToShow.length === 0) {
    return (
      <section
        id={id}
        className={`relative bg-gray-50 dark:bg-gray-900 py-20 lg:py-32 xl:py-40 ${className}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
                {title}
              </span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center min-h-[400px] max-w-3xl mx-auto">
            <MaterialIcon
              icon="construction"
              size="4xl"
              className="text-brand-primary mb-6"
            />
            <h3 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl text-center">
              Coming Soon
            </h3>
            <p className="max-w-2xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
              Client Partner testimonials will be available soon. We're
              committed to sharing only authentic feedback from our valued
              partners.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`relative bg-gray-50 dark:bg-gray-900 py-20 lg:py-32 xl:py-40 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24 lg:mb-32">
          <h2 className="mb-6 font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
            <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
              {title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Stats */}
          {showStats && (
            <div className="flex justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary dark:text-brand-primary-light">
                  {displayTestimonials.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary dark:text-brand-primary-light">
                  {(
                    displayTestimonials.reduce((sum, t) => sum + t.rating, 0) /
                    displayTestimonials.length
                  ).toFixed(1)}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary dark:text-brand-primary-light">
                  100%
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Satisfaction
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonialsToShow.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
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
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
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
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">
                    {testimonial.rating}/5
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                  {testimonial.projectTitle}
                </h3>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic font-light leading-relaxed">
                  &quot;{testimonial.testimonialText}&quot;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
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
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4">
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
                        className="bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary-light px-2 py-1 rounded-full text-xs font-medium border border-brand-primary/20"
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
        {showCTA && (
          <div className="text-center mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 font-light leading-relaxed">
              Get a free consultation and estimate for your construction or
              renovation project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/estimator"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MaterialIcon icon="calculate" className="w-5 h-5" />
                Get Free Estimate
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-brand-primary dark:text-brand-secondary border-2 border-brand-primary dark:border-brand-secondary font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <MaterialIcon icon="phone" className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
