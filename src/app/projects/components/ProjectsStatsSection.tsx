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
      className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40"
    >
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center scroll-reveal">
            <div className="flex justify-center items-center mb-6">
              <MaterialIcon
                icon="analytics"
                size="xl"
                className="text-brand-primary dark:text-brand-primary"
              />
            </div>
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Proven Track
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Record
              </span>
            </h2>
            <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
              Numbers that reflect our veteran-owned commitment to excellence
              and lasting partnerships
            </p>
          </div>

          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl">
            {projectStats.map((stat, _index) => (
              <HoverScale key={index}>
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
