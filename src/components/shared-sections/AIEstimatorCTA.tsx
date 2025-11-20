/**
 * Shared Budget Planning Tool CTA Section Component
 * Promotional section highlighting the helpful budget planning tool
 * Used on: Homepage, Services pages
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";

interface AIEstimatorCTAProps {
  variant?: "full" | "compact";
  className?: string;
  location?: string;
}

export function AIEstimatorCTA({
  variant = "full",
  className = "",
  location = "default",
}: AIEstimatorCTAProps) {
  const { trackEvent } = useAnalytics();

  const handleEstimatorClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ai_estimator_cta_click", {
        event_category: "conversion",
        event_label: `${location}_estimator_cta`,
        location: location,
      });
    }
    trackEvent("ai_estimator_cta_click", {
      location: location,
      section: "estimator_cta",
    });
  };

  const handleConsultationClick = () => {
    trackEvent("consultation_cta_click", {
      location: location,
      section: "estimator_cta",
    });
  };

  if (variant === "compact") {
    return (
      <section
        className={`relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden ${className}`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.08)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <FadeInWhenVisible>
            <div className="mb-12 sm:mb-16 text-center">
              <div className="flex justify-center items-center mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                    <MaterialIcon
                      icon="calculate"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Want to Plan Ahead?
                </span>
                <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                  Try Our Optional Budget Tool
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words mb-8 sm:mb-12">
                While we always recommend starting with a personal consultation,
                our optional planning tool can help you prepare with preliminary
                budget estimates. Get Pacific Northwest market insights in under
                5 minutes—available 24/7.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon icon="speed" size="xl" className="text-white" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                  Under 5 Minutes
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Fast & thorough analysis
                </div>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="analytics"
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                  500+ Projects
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Data-driven intelligence
                </div>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-accent to-bronze-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="military_tech"
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                  Veteran-Owned
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Military precision & .64 EMR
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <Link href="/booking" className="flex-1">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full group/btn hover:scale-105 transition-all duration-200"
                  onClick={handleConsultationClick}
                >
                  <MaterialIcon
                    icon="event"
                    size="lg"
                    className="mr-2 group-hover/btn:scale-110 transition-transform"
                  />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/estimator" className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group/btn hover:scale-105 transition-all duration-200"
                  onClick={handleEstimatorClick}
                >
                  <MaterialIcon
                    icon="calculate"
                    size="lg"
                    className="mr-2 group-hover/btn:scale-110 transition-transform"
                  />
                  Try Budget Tool
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
              Personal consultation recommended first • Planning tool available
              24/7
            </p>
          </FadeInWhenVisible>
        </div>
      </section>
    );
  }

  // Full variant (for homepage)
  return (
    <section
      className={`relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.08)_0%,transparent_50%)]"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-12 sm:mb-16 text-center">
            <div className="flex justify-center items-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                  <MaterialIcon
                    icon="calculate"
                    size="2xl"
                    className="text-white"
                  />
                </div>
              </div>
            </div>
            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Prepare for Your
              </span>
              <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                Personal Consultation
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
              Our planning tool analyzes Pacific Northwest market data to
              provide preliminary budget estimates in under 5 minutes—helping
              you prepare for your in-person consultation with realistic cost
              expectations.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Key Features */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="speed"
                        className="text-white text-2xl"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                        Under 5 Minutes
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Complete detailed estimates fast, 24/7 availability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="analytics"
                        className="text-white text-2xl"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                        Data-Driven Intelligence
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pacific Northwest market data from WA, OR, and ID
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-brand-accent to-bronze-600 p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="military_tech"
                        className="text-white text-2xl"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                        Veteran-Owned Expertise
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Military precision backed by award-winning .64 EMR
                        safety
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking" className="flex-1">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full group/btn"
                      onClick={handleConsultationClick}
                    >
                      <MaterialIcon
                        icon="event"
                        size="lg"
                        className="mr-2 group-hover/btn:scale-110 transition-transform"
                      />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <Link href="/estimator" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full group/btn"
                      onClick={handleEstimatorClick}
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
              </div>

              {/* Right Side - Visual/Stats */}
              <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark p-8 lg:p-12 flex flex-col justify-center text-white">
                <h3 className="text-2xl font-bold mb-8">
                  Trusted by Pacific Northwest Businesses
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="dataset"
                        className="text-white text-3xl"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-black">500+</div>
                      <div className="text-white/80 text-sm">
                        Projects Analyzed
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="verified"
                        className="text-white text-3xl"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-black">.64 EMR</div>
                      <div className="text-white/80 text-sm">
                        Award-Winning Safety
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="engineering"
                        className="text-white text-3xl"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-black">150+</div>
                      <div className="text-white/80 text-sm">
                        Years Combined Experience
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 shadow-md mr-4">
                      <MaterialIcon
                        icon="schedule"
                        className="text-white text-3xl"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-black">24/7</div>
                      <div className="text-white/80 text-sm">
                        Always Available
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-white/80 italic">
                    "Get transparent, open-book pricing for your project. No
                    hidden costs, just honest assessments you can trust."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
