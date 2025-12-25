/**
 * Partnership Process Section
 * Outlines the step-by-step collaboration process
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { partnershipProcess } from "./projectsData";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

export function PartnershipProcessSection() {
  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-4xl">
          {/* Section Header - Military Construction Standard */}
          <div className="mb-16 sm:mb-20 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="timeline"
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
                Our Partnership
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Process
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              From{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                initial consultation to project completion
              </span>
              , we work{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                WITH you every step of the way
              </span>
              .
            </p>
          </div>

          <div className="space-y-6">
            {partnershipProcess.map((process, _index) => (
              <div key={_index} className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                  <div className="p-6">
                    <div className="flex items-start min-h-[5rem]">
                      <div className="flex-shrink-0 mr-4">
                        <div className="relative inline-block">
                          <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 opacity-30 blur-lg rounded-full"></div>
                          <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 rounded-full w-12 h-12 font-bold text-white text-xl shadow-xl group-hover:scale-110 transition-all duration-300">
                            {process.step}
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="flex-grow pr-4">
                            <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl leading-tight">
                              {process.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {process.description}
                            </p>
                          </div>
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 opacity-20 blur-lg rounded-xl"></div>
                            <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-2 shadow-lg group-hover:scale-110 transition-all duration-300">
                              <MaterialIcon
                                icon={process.icon}
                                size="lg"
                                className="text-white drop-shadow-lg"
                                ariaLabel={process.title}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
