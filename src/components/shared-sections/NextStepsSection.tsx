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
    _subtitle = "Partner with veteran-owned excellence where honesty, integrity, professionalism, and thoroughness guide every decision.",
  className = "",
  onConsultationClick,
  onEstimateClick,
  onContactClick,
}: NextStepsSectionProps) {
  return (
    <section
      id="next-steps"
      className={`relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${className}`}
    >
      {/* Unique Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-accent/30 to-bronze-600/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-accent via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="handshake"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          </div>

          {/* Two-line gradient heading */}
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Ready to Start Your Project?
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Let's Build Together
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Where{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              your word is your bond
            </span>
            , and ours is too. Partner with{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              veteran-owned excellence
            </span>{" "}
            backed by proven values.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* Option 1: Download Pitch Deck */}
          <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex justify-center mb-6">
              <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon
                  icon="picture_as_pdf"
                  size="xl"
                  className="text-white"
                />
              </div>
            </div>
            <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
              MH Construction Pitch Deck
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Download our comprehensive pitch deck to explore our capabilities,
              values, and proven track record.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>Complete company overview</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>Services & capabilities breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-primary flex-shrink-0"
                />
                <span>Project portfolio highlights</span>
              </li>
            </ul>
            <Button
              variant="primary"
              size="lg"
              className="w-full group/btn opacity-60 cursor-not-allowed"
              onClick={(e) => {
                e.preventDefault();
                onConsultationClick?.();
              }}
              disabled
            >
              <MaterialIcon
                icon="download"
                size="lg"
                className="mr-2 group-hover/btn:scale-110 transition-transform"
              />
              Coming Soon
            </Button>
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
              See Our Real Work
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Real projects. Real results. Real testimonials from Client
              Partners who trust us.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>650+ completed projects since 2010</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>98% Client Partner satisfaction rate</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary flex-shrink-0"
                />
                <span>70% referral rate - proven excellence</span>
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
              Let's Talk Face-to-Face
            </h3>
            <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
              Honest answers from real people. No automated systems. Just
              transparent communication.
            </p>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Face-to-face consultation preferred</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Transparent pricing from day one</span>
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-accent flex-shrink-0"
                />
                <span>Direct line to decision-makers</span>
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
