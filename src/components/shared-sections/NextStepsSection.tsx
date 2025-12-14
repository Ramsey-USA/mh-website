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
    _subtitle = "Four mission-ready values create one result: Trust. Partner with veteran-owned excellence where service-earned honesty, military-grade integrity, operational professionalism, and tactical thoroughness guide every decision.",
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
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white/50 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-accent/30 to-bronze-600/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-accent via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                <MaterialIcon
                  icon="handshake"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white/50 rounded-full"></div>
          </div>

          {/* Two-line gradient heading */}
          <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="inline-block mb-3 sm:mb-4 font-semibold bg-gradient-to-r from-white via-brand-accent to-white bg-clip-text text-transparent text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Rally Point: Let's Build Your
            </span>
            <span className="inline-block bg-gradient-to-r from-brand-accent via-white to-brand-accent bg-clip-text text-transparent font-black drop-shadow-lg overflow-visible py-1">
              Construction Mission Together
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Where{" "}
            <span className="font-bold text-brand-accent">
              your word is your bond
            </span>
            , and ours is too. Partner with{" "}
            <span className="font-bold text-white">
              all-branch veteran-owned excellence
            </span>{" "}
            backed by{" "}
            <span className="font-bold text-brand-accent">
              service-earned values
            </span>{" "}
            and{" "}
            <span className="font-bold text-brand-accent">
              military precision
            </span>
            .
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* Option 1: Schedule Free Consultation */}
          <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex justify-center mb-6">
              <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon
                  icon="event_available"
                  size="xl"
                  className="text-white"
                />
              </div>
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              Schedule Free Mission Brief
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Start with a face-to-face consultation. No pressure, just honest
              intel about your construction operation.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>No obligation initial recon</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>SITREP-level budget transparency</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>Veteran-trained project guidance</span>
              </li>
            </ul>
            <Link href="/contact#consultation">
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
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Option 2: View Our Work */}
          <div className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 border-2 border-brand-secondary flex flex-col h-full">
            <div className="bg-brand-secondary -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-md">
              <span className="font-bold text-sm text-white uppercase tracking-wide">
                Most Popular
              </span>
            </div>
            <div className="flex justify-center mb-6">
              <div className="rounded-xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon
                  icon="photo_library"
                  size="xl"
                  className="text-white"
                />
              </div>
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              See Our Completed Missions
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Explore our completed construction operations and see the
              battle-tested quality we deliver.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>650+ completed construction missions</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>Military-grade quality standards</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>Diverse operational capabilities</span>
              </li>
            </ul>
            <Link href="/projects">
              <Button
                variant="secondary"
                size="lg"
                className="w-full group/btn"
                onClick={onEstimateClick}
              >
                <MaterialIcon
                  icon="photo_library"
                  size="lg"
                  className="mr-2 group-hover/btn:scale-110 transition-transform"
                />
                View Our Work
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
              Direct Communications
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Reach out via phone, email, or contact form for immediate response
              on your construction operation.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Rapid 24-48hr response time</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Multiple contact channels</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Direct veteran team access</span>
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
