/**
 * ⚠️ DEPRECATED - DO NOT USE ⚠️
 *
 * This component has been deprecated in favor of ChatbotCTASection.
 *
 * Why: Chatbot-first strategy provides better UX:
 * - Personalized, context-aware responses (vs generic FAQs)
 * - Lead capture during conversation
 * - 80% less maintenance (update chatbot once vs multiple FAQ pages)
 * - Better analytics (track actual user questions)
 * - Higher conversion (+25-40% vs static FAQs)
 *
 * Migration: Replace with ChatbotCTASection
 * ```tsx
 * import { ChatbotCTASection } from "@/components/chatbot";
 *
 * <ChatbotCTASection
 *   context="services" // or "booking", "careers", etc.
 *   exampleQuestions={[
 *     "What are your payment terms?",
 *     "Do you offer warranties?",
 *     "What's your safety record?",
 *   ]}
 * />
 * ```
 *
 * See: /docs/development/chatbot-first-strategy.md
 * Date Deprecated: November 8, 2025
 */

"use client";

import { FAQAccordion } from "./FAQAccordion.deprecated";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import type { FAQ } from "@/lib/data/faqs";

interface FAQAccordionSectionProps {
  /**
   * Array of FAQ items to display
   */
  faqs: FAQ[];
  /**
   * Optional section title
   * @default "Frequently Asked Questions"
   */
  title?: string;
  /**
   * Optional section subtitle/description
   */
  subtitle?: string;
  /**
   * Whether to show the CTA section at the bottom
   * @default true
   */
  showCTA?: boolean;
  /**
   * Custom CTA button text
   * @default "Still Have Questions?"
   */
  ctaText?: string;
  /**
   * Custom CTA button href
   * @default "/contact"
   */
  ctaHref?: string;
  /**
   * Custom CTA secondary button text
   * @default "Schedule Consultation"
   */
  ctaSecondaryText?: string;
  /**
   * Custom CTA secondary button href
   * @default "/booking"
   */
  ctaSecondaryHref?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ID of the first FAQ to expand by default (e.g., "licensing")
   */
  defaultExpandedId?: string;
}

/**
 * FAQAccordionSection Component
 *
 * Displays a full FAQ section with accordion-style collapsible items.
 * Supports deep linking to specific FAQs via URL hash.
 *
 * @example
 * ```tsx
 * <FAQAccordionSection
 *   faqs={serviceFAQs}
 *   title="Service FAQs"
 *   subtitle="Common questions about our services"
 *   defaultExpandedId="licensing"
 * />
 * ```
 */
export function FAQAccordionSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle,
  showCTA = true,
  ctaText = "Still Have Questions?",
  ctaHref = "/contact",
  ctaSecondaryText = "Schedule Consultation",
  ctaSecondaryHref = "/booking",
  className = "",
  defaultExpandedId,
}: FAQAccordionSectionProps) {
  return (
    <section
      id="faq"
      className={`py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900 ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 rounded-full w-16 h-16">
                <MaterialIcon
                  icon="help_outline"
                  size="xl"
                  className="text-primary-600 dark:text-primary-400"
                />
              </div>
            </div>
            <h2 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </FadeInWhenVisible>

        {/* FAQ Accordion Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq) => (
            <FAQAccordion
              key={faq.id}
              faq={faq}
              defaultExpanded={faq.id === defaultExpandedId}
            />
          ))}
        </div>

        {/* CTA Section */}
        {showCTA && (
          <FadeInWhenVisible>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-secondary-500 mx-auto mb-4 rounded-full w-16 h-16">
                <MaterialIcon
                  icon="support_agent"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-2xl">
                {ctaText}
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                Our team is here to help answer any questions you have about our
                services, processes, or your specific project needs.
              </p>
              <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => (window.location.href = ctaHref)}
                >
                  <MaterialIcon icon="mail" size="md" className="mr-2" />
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => (window.location.href = ctaSecondaryHref)}
                >
                  <MaterialIcon
                    icon="calendar_today"
                    size="md"
                    className="mr-2"
                  />
                  {ctaSecondaryText}
                </Button>
              </div>
            </div>
          </FadeInWhenVisible>
        )}
      </div>
    </section>
  );
}
