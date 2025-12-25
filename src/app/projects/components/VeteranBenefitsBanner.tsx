/**
 * Veteran Benefits Banner
 * Highlights veteran-owned credentials and certifications
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

export function VeteranBenefitsBanner() {
  return (
    <section
      id="veteran-owned"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 overflow-hidden"
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="flex md:flex-row flex-col justify-center items-stretch gap-6 mx-auto max-w-5xl">
            {/* Veteran-Owned Card */}
            <div className="group relative flex flex-1">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex items-center">
                  <div className="relative inline-block mr-4 flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="military_tech"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Veteran-owned"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                      Veteran-Owned Excellence
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      Service-earned values with military precision since
                      January 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certified & Trusted Card */}
            <div className="group relative flex flex-1">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                <div className="p-6 flex items-center">
                  <div className="relative inline-block mr-4 flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Certified"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                      Certified & Trusted
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      Licensed, bonded, and committed to quality construction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
