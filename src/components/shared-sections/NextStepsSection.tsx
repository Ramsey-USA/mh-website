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
  title: _title = "Let's Build Your Vision Together",
  subtitle:
    _subtitle = "Four core values create one result: Trust. Partner with veteran-owned excellence where honesty, integrity, professionalism, and thoroughness guide every decision.",
  className = "",
  onConsultationClick,
  onEstimateClick,
  onContactClick,
}: NextStepsSectionProps) {
  return (
    <section
      id="next-steps"
      className={`relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
      <div className="top-20 left-10 absolute bg-white/10 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-white/15 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-white/5 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/30 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-accent to-bronze-600 p-4 rounded-2xl shadow-lg">
                <MaterialIcon
                  icon="handshake"
                  size="2xl"
                  className="text-white"
                />
              </div>
            </div>
          </div>
          <h2 className="mb-6 sm:mb-8 font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-3 sm:mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-sm">
              Let's Build Your
            </span>
            <span className="block text-brand-accent font-black drop-shadow-lg">
              Vision Together
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
            Where your word is your bond, and{" "}
            <span className="font-medium text-brand-accent">ours is too</span>.
            Partner with veteran-owned excellence backed by{" "}
            <span className="font-medium text-brand-accent">
              old-school values
            </span>{" "}
            and{" "}
            <span className="font-medium text-brand-accent">
              modern precision
            </span>
            .
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* Option 1: Schedule Consultation */}
          <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex justify-center mb-6">
              <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon icon="event" size="xl" className="text-white" />
              </div>
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Begin Your Project
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Sit down with us face-to-face. Let's talk about your vision
              through the lens of our four core values.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>Free consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>Expert recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>No obligation</span>
              </li>
            </ul>
            <Link href="/booking">
              <Button
                variant="primary"
                size="lg"
                className="w-full group/btn"
                onClick={onConsultationClick}
              >
                <MaterialIcon
                  icon="handshake"
                  size="lg"
                  className="mr-2 group-hover/btn:scale-110 transition-transform"
                />
                Start Your Partnership
              </Button>
            </Link>
          </div>

          {/* Option 2: Get Quick Estimate */}
          <div className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 border-2 border-brand-secondary flex flex-col h-full">
            <div className="bg-brand-secondary -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-md">
              <span className="font-bold text-sm text-white uppercase tracking-wide">
                Most Popular
              </span>
            </div>
            <div className="flex justify-center mb-6">
              <div className="rounded-xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon
                  icon="calculate"
                  size="xl"
                  className="text-white"
                />
              </div>
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Budget Planning Tool
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Prepare for your consultation with our honest, transparent budget
              planning tool.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>Instant preliminary budget</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>Honest cost ranges</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>Transparent pricing</span>
              </li>
            </ul>
            <Link href="/estimator">
              <Button
                variant="secondary"
                size="lg"
                className="w-full group/btn"
                onClick={onEstimateClick}
              >
                <MaterialIcon
                  icon="calculate"
                  size="lg"
                  className="mr-2 group-hover/btn:scale-110 transition-transform"
                />
                Try Planning Tool
              </Button>
            </Link>
          </div>

          {/* Option 3: Contact Us */}
          <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex justify-center mb-6">
              <div className="rounded-xl bg-gradient-to-br from-brand-accent to-bronze-600 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon
                  icon="contact_phone"
                  size="xl"
                  className="text-white"
                />
              </div>
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Contact Us Directly
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Reach out via phone, email, or contact form for immediate
              assistance with your project.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>24-48hr response</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Multiple contact methods</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Direct team access</span>
              </li>
            </ul>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-brand-accent hover:bg-brand-accent/90 group/btn"
                onClick={onContactClick}
              >
                <MaterialIcon
                  icon="mail"
                  size="lg"
                  className="mr-2 group-hover/btn:scale-110 transition-transform"
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
