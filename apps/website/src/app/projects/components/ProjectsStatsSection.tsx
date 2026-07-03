/**
 * Projects Stats Section
 * Displays key project metrics and achievements with animated counters
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { projectStats } from "./projectsData";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Card } from "@/components/ui";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

export function ProjectsStatsSection() {
  return (
    <section
      id="stats"
      className="relative bg-gray-50 dark:bg-gray-800 py-10 sm:py-14 lg:py-18 xl:py-20 overflow-hidden"
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-12 sm:mb-14 text-center scroll-reveal">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-6 gap-3 sm:gap-4">
              <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="bar_chart"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                    ariaLabel="Proven track record"
                  />
                </div>
              </div>
              <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            </div>

            {/* Two-line gradient heading */}
            <h2 className="mb-5 sm:mb-6 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight tracking-tighter overflow-visible">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-tight overflow-visible py-1">
                Delivery Snapshot
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1 pb-2 leading-tight">
                By The Numbers
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-4xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed tracking-wide px-2">
              A concise view of project volume, safety discipline, and regional
              delivery coverage across WA, OR, and ID.
            </p>
          </div>

          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl">
            {projectStats.map((stat, _index) => (
              <HoverScale key={_index}>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-secondary/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-linear-to-r from-brand-primary via-brand-secondary to-bronze-700"></div>

                    <div className="p-6 flex flex-col flex-1 text-center">
                      <div className="relative inline-block mx-auto mb-4">
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-secondary/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative rounded-xl bg-linear-to-br from-brand-primary via-brand-secondary to-bronze-700 p-3 shadow-xl transition-all duration-300">
                          <MaterialIcon
                            icon={stat.icon}
                            size="3xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={stat.label}
                          />
                        </div>
                      </div>
                      <div className="mb-2 font-bold text-gray-900 dark:text-white text-4xl lg:text-5xl">
                        {stat.animated ? (
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix || ""}
                            decimals={stat.decimals || 0}
                            duration={2000}
                          />
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="font-medium text-gray-600 dark:text-gray-300 text-lg">
                        {stat.label}
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverScale>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
