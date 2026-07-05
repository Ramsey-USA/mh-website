/**
 * Veteran Benefits Banner
 * Highlights Veteran-Owned credentials and certifications
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Card } from "@/components/ui";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

export function VeteranBenefitsBanner() {
  return (
    <section
      id="Veteran-Owned"
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
              <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

              <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                {/* Top Accent Bar */}
                <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex items-center">
                  <div className="relative inline-block mr-4 shrink-0">
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl transition-all duration-300">
                      <MaterialIcon
                        icon="military_tech"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Veteran-Owned"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                      Veteran-Owned Leadership
                    </h3>
                    <p className="font-body text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      Veteran-owned operations with clear planning and
                      accountable project follow-through
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Certified & Trusted Card */}
            <div className="group relative flex flex-1">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

              <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                {/* Top Accent Bar */}
                <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                <div className="p-6 flex items-center">
                  <div className="relative inline-block mr-4 shrink-0">
                    <div className="absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-3 shadow-xl transition-all duration-300">
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
                    <p className="font-body text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      Licensed, bonded, and committed to quality construction
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
