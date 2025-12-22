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

export function ProjectsStatsSection() {
  return (
    <section
      id="stats"
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
        <FadeInWhenVisible>
          <div className="mb-16 sm:mb-20 text-center scroll-reveal">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="bar_chart"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                    ariaLabel="Proven track record"
                  />
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            </div>

            {/* Two-line gradient heading */}
            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Proven Track
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Record
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                650+ construction missions completed
              </span>
              —numbers that reflect our veteran-owned commitment to proven
              results and trusted partnerships across the Tri-Cities
            </p>
          </div>

          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl">
            {projectStats.map((stat, _index) => (
              <HoverScale key={_index}>
                <div className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 to-brand-secondary/5 dark:to-brand-secondary/10 hover:shadow-xl dark:hover:shadow-gray-600/50 p-6 border border-brand-primary/20 dark:border-brand-primary/30 rounded-xl text-center transition-all duration-300">
                  <MaterialIcon
                    icon={stat.icon}
                    size="3xl"
                    className="mb-4 text-brand-primary"
                  />
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
              </HoverScale>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
