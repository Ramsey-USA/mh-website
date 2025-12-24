/**
 * Partnership Process Section
 * Outlines the step-by-step collaboration process
 */

import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getCardClassName } from "@/lib/styles/card-variants";
import { partnershipProcess } from "./projectsData";

export function PartnershipProcessSection() {
  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      {/* Diagonal Stripe Background Pattern */}
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
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

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
              <Card key={_index} className={getCardClassName("static")}>
                <CardContent className="p-6">
                  <div className="flex items-start min-h-[5rem]">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex justify-center items-center bg-brand-primary rounded-full w-12 h-12 font-bold text-white text-xl">
                        {process.step}
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
                        <MaterialIcon
                          icon={process.icon}
                          size="lg"
                          className="flex-shrink-0 ml-4 text-brand-primary"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
