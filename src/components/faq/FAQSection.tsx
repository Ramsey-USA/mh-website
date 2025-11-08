"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { FAQCard } from "./FAQCard";
import type { FAQ } from "@/lib/data/faqs";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  columns?: 1 | 2;
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  className?: string;
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions about our services, process, and what makes MH Construction your trusted partner.",
  columns = 2,
  showCTA = true,
  ctaTitle = "Still Have Questions?",
  ctaDescription = "We're here to help! Reach out and we'll answer any questions about your specific project needs.",
  ctaButtonText = "Contact Us",
  ctaButtonHref = "/booking",
  className = "",
}: FAQSectionProps) {
  const gridCols = columns === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";

  return (
    <section
      id="faq"
      className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32 ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible className="mb-16 text-center">
          <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
            <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              {title.split(" ").slice(0, -1).join(" ")}
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              {title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
            {subtitle}
          </p>
        </FadeInWhenVisible>

        <div className={`gap-8 grid ${gridCols}`}>
          {columns === 2 ? (
            <>
              {/* Column 1 */}
              <div className="space-y-6">
                {faqs
                  .filter((_, index) => index % 2 === 0)
                  .map((faq) => (
                    <FAQCard key={faq.id} faq={faq} />
                  ))}
              </div>
              {/* Column 2 */}
              <div className="space-y-6">
                {faqs
                  .filter((_, index) => index % 2 === 1)
                  .map((faq) => (
                    <FAQCard key={faq.id} faq={faq} />
                  ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {faqs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
              ))}
            </div>
          )}
        </div>

        {/* CTA at Bottom */}
        {showCTA && (
          <FadeInWhenVisible className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto p-8 rounded-2xl max-w-3xl">
              <h3 className="mb-4 font-bold text-2xl text-white">{ctaTitle}</h3>
              <p className="mb-6 text-lg text-white/90">{ctaDescription}</p>
              <Link href={ctaButtonHref}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="group bg-white hover:bg-gray-100 text-primary-700 hover:text-primary-800"
                >
                  <MaterialIcon icon="phone" size="md" className="mr-2" />
                  {ctaButtonText}
                  <MaterialIcon
                    icon="arrow_forward"
                    size="sm"
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
