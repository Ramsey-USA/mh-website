"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import type { FAQ } from "@/lib/data/faqs";

interface FAQCardProps {
  faq: FAQ;
  className?: string;
}

export function FAQCard({ faq, className = "" }: FAQCardProps) {
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
        className={`bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex flex-shrink-0 justify-center items-center rounded-full w-12 h-12 ${iconColorClasses[faq.iconColor]}`}
          >
            <MaterialIcon icon={faq.icon} size="md" />
          </div>
          <div className="flex-1">
            <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
              {faq.question}
            </h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
            {faq.tip && (
              <p className="text-gray-600 text-sm dark:text-gray-400 italic">
                {faq.tip}
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
    </FadeInWhenVisible>
  );
}
