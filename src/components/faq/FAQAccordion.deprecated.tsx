/**
 * ⚠️ DEPRECATED - DO NOT USE ⚠️
 *
 * This component has been deprecated in favor of ChatbotCTASection.
 *
 * Why: Chatbot-first strategy provides better UX:
 * - Personalized, context-aware responses
 * - Lead capture during conversation
 * - 80% less maintenance (update chatbot once vs multiple pages)
 * - Better analytics (track actual questions)
 * - 24/7 availability
 *
 * Migration: Replace with ChatbotCTASection
 * ```tsx
 * import { ChatbotCTASection } from "@/components/chatbot";
 *
 * <ChatbotCTASection
 *   context="your-page"
 *   exampleQuestions={["Question 1?", "Question 2?"]}
 * />
 * ```
 *
 * See: /docs/development/chatbot-first-strategy.md
 * Date Deprecated: November 8, 2025
 */

"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import type { FAQ } from "@/lib/data/faqs";

interface FAQAccordionProps {
  faq: FAQ;
  className?: string;
  /**
   * Whether this accordion item is expanded by default
   */
  defaultExpanded?: boolean;
  /**
   * Callback when accordion is toggled
   */
  onToggle?: (expanded: boolean) => void;
}

/**
 * @deprecated Use ChatbotCTASection instead
 *
 * FAQAccordion Component
 *
 * Displays a single FAQ in an expandable/collapsible accordion format.
 * Supports deep linking via URL hash (e.g., /services#faq-licensing).
 *
 * @example
 * <FAQAccordion faq={faqData} defaultExpanded={false} />
 */
export function FAQAccordion({
  faq,
  className = "",
  defaultExpanded = false,
  onToggle,
}: FAQAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Handle deep linking via URL hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const faqId = `faq-${faq.id}`;

      if (hash === faqId) {
        setIsExpanded(true);
        // Scroll to element after a short delay to ensure rendering
        setTimeout(() => {
          const element = document.getElementById(faqId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }, [faq.id]);

  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const iconColorClasses = {
    primary:
      "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
    secondary:
      "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400",
    accent:
      "bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400",
  };

  const tagColorClasses = {
    primary:
      "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
    secondary:
      "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300",
    accent:
      "bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300",
  };

  return (
    <FadeInWhenVisible>
      <div
        id={`faq-${faq.id}`}
        className={`bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        {/* Accordion Header - Always Visible */}
        <button
          onClick={toggleExpanded}
          className="flex justify-between items-center gap-4 p-6 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-xl transition-colors duration-200"
          aria-expanded={isExpanded}
          aria-controls={`faq-content-${faq.id}`}
        >
          <div className="flex items-center gap-4 flex-1">
            <div
              className={`flex flex-shrink-0 justify-center items-center rounded-full w-12 h-12 ${iconColorClasses[faq.iconColor]}`}
            >
              <MaterialIcon icon={faq.icon} size="md" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
              {faq.question}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <MaterialIcon
              icon={isExpanded ? "expand_less" : "expand_more"}
              size="lg"
              className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                isExpanded ? "rotate-0" : "rotate-0"
              }`}
            />
          </div>
        </button>

        {/* Accordion Content - Collapsible */}
        <div
          id={`faq-content-${faq.id}`}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isExpanded}
        >
          <div className="px-6 pb-6 pt-0">
            <div className="pl-16">
              <p className="mb-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
              {faq.tip && (
                <p className="mb-3 text-gray-600 text-sm dark:text-gray-400 italic">
                  💡 {faq.tip}
                </p>
              )}
              {faq.tags && faq.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  {faq.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full ${tagColorClasses[faq.iconColor]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}
