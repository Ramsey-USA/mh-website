"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import Image from "next/image";

export interface CoreValue {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
}

interface AboutValuesProps {
  coreValues: CoreValue[];
}

// Map values to images
const valueImages: { [key: string]: string } = {
  Honesty: "/images/values/honesty.webp",
  Integrity: "/images/values/integrity.webp",
  Professionalism: "/images/values/professionalism.webp",
  Thoroughness: "/images/values/thoroughness.webp",
};

// Map values to stats
const valueStats: { [key: string]: string } = {
  Honesty: "100% Transparent Pricing",
  Integrity: "Unwavering Ethics",
  Professionalism: "Expert Service Standards",
  Thoroughness: "Zero Details Missed",
};

export function AboutValues({ coreValues }: AboutValuesProps) {
  return (
    <section
      id="values"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
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
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="shield"
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
              Veteran-Owned Values
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Built on Honesty & Integrity
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Four foundational values guide every{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              project and partnership
            </span>
            —focused on building projects for the{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              client
            </span>
            ,{" "}
            <span className="font-black italic text-bronze-600 dark:text-bronze-400">
              NOT
            </span>{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              the dollar
            </span>
            .
          </p>
        </div>

        {/* Stacked Value Cards with Alternating Layout */}
        <div className="space-y-12 lg:space-y-16">
          {coreValues.map((item, index) => {
            const isEven = index % 2 === 0;
            const image =
              valueImages[item.title] || "/images/values/honesty.webp";
            const stats = valueStats[item.title] || "Core Value";

            return (
              <div
                key={item.title}
                className="scroll-reveal group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:grid lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
                  {/* Image Side */}
                  <div
                    className={`relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] overflow-hidden ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${item.title} - ${item.subtitle}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Overlay gradient for better icon visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"></div>

                    {/* Icon Badge on Image */}
                    <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                      <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-2xl"></div>
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
                          <MaterialIcon
                            icon={item.iconName}
                            size="xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="space-y-4 lg:space-y-5">
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl lg:text-3xl leading-tight tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-base sm:text-lg lg:text-xl">
                          {item.subtitle}
                        </p>
                      </div>

                      <p className="font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-base leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex-shrink-0">
                          <MaterialIcon
                            icon="analytics"
                            size="md"
                            className="text-brand-primary dark:text-brand-primary-light"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Key Metric
                          </p>
                          <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-gray-100">
                            {stats}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
