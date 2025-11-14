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
        className={`relative bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32 overflow-hidden ${className}`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-[0_25px_80px_-20px_rgba(56,104,81,0.2)] transition-shadow duration-500">
            <div className="p-8 lg:p-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center bg-brand-secondary/10 text-brand-secondary px-5 py-2 rounded-full text-sm font-bold mb-6 hover:bg-brand-secondary/20 transition-colors duration-300">
                  <MaterialIcon
                    icon="auto_awesome"
                    size="sm"
                    className="mr-2"
                  />
                  Helpful Planning Tool
                </div>
                <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Want to Plan Ahead?
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Try Our Optional Budget Tool
                  </span>
                </h2>
                <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8">
                  While we always recommend starting with a personal
                  consultation, our optional planning tool can help you prepare
                  with preliminary budget estimates. Get Pacific Northwest
                  market insights in under 5 minutes—available 24/7.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
                <div className="text-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="speed"
                      size="md"
                      className="text-brand-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                    Under 5 Minutes
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Fast & thorough analysis
                  </div>
                </div>
                <div className="text-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="analytics"
                      size="md"
                      className="text-brand-secondary group-hover:scale-110 transition-transform duration-300"
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
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MaterialIcon
                      icon="military_tech"
                      size="md"
                      className="text-brand-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white mb-1 text-lg">
                    Veteran-Owned
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Military precision & .6 EMR
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
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
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
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    Try Budget Tool
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
                Personal consultation recommended first • Planning tool
                available 24/7
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full variant (for homepage)
  return (
    <section
      className={`bg-gradient-to-br from-brand-primary/10 via-brand-secondary/5 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32 ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="inline-flex items-center bg-brand-secondary/10 text-brand-secondary px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <MaterialIcon
                      icon="auto_awesome"
                      size="sm"
                      className="mr-2"
                    />
                    Helpful Planning Tool
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                    Prepare for Your
                    <span className="block text-brand-primary">
                      Personal Consultation
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Our planning tool analyzes Pacific Northwest market data to
                    provide preliminary budget estimates in under 5
                    minutes—helping you prepare for your in-person consultation
                    with realistic cost expectations.
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="speed"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        Under 5 Minutes
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Complete detailed estimates fast, 24/7 availability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-secondary/10 rounded-full flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="analytics"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        Data-Driven Intelligence
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pacific Northwest market data from WA, OR, and ID
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="military_tech"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        Veteran-Owned Expertise
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Military precision backed by award-winning .6 EMR safety
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
                      className="w-full"
                      onClick={handleConsultationClick}
                    >
                      <MaterialIcon icon="event" size="md" className="mr-2" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <Link href="/estimator" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleEstimatorClick}
                    >
                      <MaterialIcon
                        icon="calculate"
                        size="md"
                        className="mr-2"
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
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="dataset"
                        size="lg"
                        className="text-white"
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
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="verified"
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-black">.6 EMR</div>
                      <div className="text-white/80 text-sm">
                        Award-Winning Safety
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="engineering"
                        size="lg"
                        className="text-white"
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
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                      <MaterialIcon
                        icon="schedule"
                        size="lg"
                        className="text-white"
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
