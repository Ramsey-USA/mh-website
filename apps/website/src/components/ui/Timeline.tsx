"use client";

import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import type { ReactNode, CSSProperties } from "react";

export interface TimelineStep {
  num: number;
  icon: string;
  title: string;
  desc: string;
  position?: "left" | "right";
}

export interface TimelineProps {
  id?: string;
  icon?: string;
  iconBg?: "primary" | "secondary" | "bronze";
  subtitle: string;
  title: string;
  description: string | ReactNode;
  steps: TimelineStep[];
  className?: string;
}

/**
 * Reusable Timeline Component
 *
 * Provides consistent vertical alternating timeline design across pages.
 * Used for:
 * - Homepage: "Our Process" (5 construction steps)
 * - About: "Company Evolution" (historical milestones)
 * - Services: Service delivery process
 * - Other pages: Any sequential workflow
 *
 * Design follows homepage template pattern with:
 * - Icon header with decorative lines
 * - Two-line gradient heading
 * - Alternating left/right layout (desktop)
 * - Vertical layout (mobile)
 * - Gradient connecting line
 * - Numbered circles for each step
 */
export function Timeline({
  id,
  icon = "timeline",
  iconBg = "primary",
  subtitle,
  title,
  description,
  steps,
  className = "",
}: TimelineProps) {
  // Color mapping for icon backgrounds
  const iconBgColors = {
    primary:
      "from-brand-primary via-brand-primary-dark to-brand-primary-darker",
    secondary: "from-brand-secondary via-bronze-700 to-bronze-800",
    bronze: "from-bronze-600 to-bronze-800",
  };

  const iconGlowColors = {
    primary: "from-brand-primary/30 to-brand-primary-dark/30",
    secondary: "from-brand-secondary/30 to-bronze-700/30",
    bronze: "from-bronze-700/40 to-bronze-800/40",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden",
        className,
      )}
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Standard Pattern */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div
                className={`absolute -inset-4 bg-gradient-to-br ${iconGlowColors[iconBg]} blur-2xl rounded-full`}
              ></div>
              <div
                className={`relative bg-gradient-to-br ${iconBgColors[iconBg]} p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600`}
              >
                <MaterialIcon
                  icon={icon}
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
              {subtitle}
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              {title}
            </span>
          </h2>

          {/* Description with HTML support for keyword highlighting */}
          {description && (
            <div
              className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {/* Timeline - Vertical Alternating Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30"></div>

          {/* Timeline Steps */}
          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="relative group scroll-reveal"
                style={{ "--delay": `${index * 0.1}s` } as CSSProperties}
              >
                {/* Desktop Layout - Alternating */}
                <div className="hidden lg:flex items-center gap-8">
                  {step.position === "left" ? (
                    <>
                      {/* Content Left */}
                      <div className="flex-1 text-right">
                        <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
                          <div className="flex items-center justify-end gap-4 mb-4">
                            <div>
                              <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
                                {step.title}
                              </h3>
                            </div>
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                              <MaterialIcon
                                icon={step.icon}
                                size="xl"
                                className="text-white"
                              />
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Center Circle */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                          {step.num}
                        </div>
                      </div>

                      {/* Empty Right */}
                      <div className="flex-1"></div>
                    </>
                  ) : (
                    <>
                      {/* Empty Left */}
                      <div className="flex-1"></div>

                      {/* Center Circle */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                          {step.num}
                        </div>
                      </div>

                      {/* Content Right */}
                      <div className="flex-1 text-left">
                        <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                              <MaterialIcon
                                icon={step.icon}
                                size="xl"
                                className="text-white"
                              />
                            </div>
                            <div>
                              <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Layout - Vertical */}
                <div className="lg:hidden flex gap-4">
                  {/* Left Side - Number and Line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl border-4 border-white dark:border-gray-900 relative z-10",
                        step.num === steps.length
                          ? "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                          : "bg-gradient-to-br from-brand-primary to-brand-primary-dark",
                      )}
                    >
                      {step.num}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-1 flex-1 bg-gradient-to-b from-brand-primary to-brand-secondary mt-2 min-h-[60px]"></div>
                    )}
                  </div>

                  {/* Right Side - Card */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary dark:hover:border-brand-primary-light">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={cn(
                            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg",
                            step.num === steps.length
                              ? "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                              : "bg-gradient-to-br from-brand-primary to-brand-primary-dark",
                          )}
                        >
                          <MaterialIcon
                            icon={step.icon}
                            size="lg"
                            className="text-white"
                          />
                        </div>
                        <h3 className="font-black text-gray-900 dark:text-white text-xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {step.desc}
                      </p>
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
