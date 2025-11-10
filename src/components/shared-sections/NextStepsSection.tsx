/**
 * Shared Next Steps CTA Section Component
 * Three-option CTA section: Consultation, Estimate, Contact
 * Used on: Homepage, About, Services pages
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface NextStepsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  onConsultationClick?: () => void;
  onEstimateClick?: () => void;
  onContactClick?: () => void;
}

export function NextStepsSection({
  title = "Ready to Start Your Project?",
  subtitle = "Let's partner together to bring your construction vision to life with veteran-owned excellence and military precision.",
  className = "",
  onConsultationClick,
  onEstimateClick,
  onContactClick,
}: NextStepsSectionProps) {
  return (
    <section
      id="next-steps"
      className={`relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 py-20 lg:py-32 ${className}`}
    >
      <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-5"></div>
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-black text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl font-light text-primary-100 text-xl sm:text-2xl md:text-3xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-12">
          {/* Option 1: Schedule Consultation */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
              <MaterialIcon icon="event" size="xl" className="text-white" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Schedule Consultation
            </h3>
            <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
              Book a free 45-60 minute consultation to discuss your project
              goals, timeline, and budget.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-primary-600 flex-shrink-0"
                />
                <span>Free consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-primary-600 flex-shrink-0"
                />
                <span>Expert recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-primary-600 flex-shrink-0"
                />
                <span>No obligation</span>
              </li>
            </ul>
            <Link href="/booking">
              <Button
                variant="primary"
                size="lg"
                className="w-full group"
                onClick={onConsultationClick}
              >
                <MaterialIcon
                  icon="calendar_today"
                  size="md"
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Option 2: Get Quick Estimate */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-4 border-secondary-500">
            <div className="bg-secondary-500 -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-md">
              <span className="font-bold text-sm text-white uppercase tracking-wide">
                Most Popular
              </span>
            </div>
            <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
              <MaterialIcon icon="calculate" size="xl" className="text-white" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Get Quick Estimate
            </h3>
            <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
              Receive a detailed project estimate within 3-5 business days with
              transparent pricing.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-secondary-600 flex-shrink-0"
                />
                <span>3-5 day turnaround</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-secondary-600 flex-shrink-0"
                />
                <span>Detailed line items</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-secondary-600 flex-shrink-0"
                />
                <span>Open-book pricing</span>
              </li>
            </ul>
            <Link href="/estimator">
              <Button
                variant="secondary"
                size="lg"
                className="w-full group"
                onClick={onEstimateClick}
              >
                <MaterialIcon
                  icon="description"
                  size="md"
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                Request Estimate
              </Button>
            </Link>
          </div>

          {/* Option 3: Contact Us */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
              <MaterialIcon
                icon="contact_phone"
                size="xl"
                className="text-white"
              />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Contact Us Directly
            </h3>
            <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
              Reach out via phone, email, or contact form for immediate
              assistance with your project.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-accent-600 flex-shrink-0"
                />
                <span>24-48hr response</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-accent-600 flex-shrink-0"
                />
                <span>Multiple contact methods</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-accent-600 flex-shrink-0"
                />
                <span>Direct team access</span>
              </li>
            </ul>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-accent-600 hover:bg-accent-700 group"
                onClick={onContactClick}
              >
                <MaterialIcon
                  icon="mail"
                  size="md"
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
