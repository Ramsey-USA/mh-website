/**
 * Awards & Recognition Section Component
 * Displays MH Construction's industry awards, safety recognition, and certifications
 * Reusable across About, Team, and other credibility-building pages
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";

const emrTimeline = [
  {
    year: "2025",
    title: "Most Improved EMR",
    achievement: "25% EMR reduction from 2024",
    details:
      "3+ years without time loss or impairment injury. L&I Claims Free Discount Program participation.",
    icon: "emoji_events",
  },
  {
    year: "2021",
    title: "Top EMR Award",
    achievement: ".64 EMR - 'As Low as You Can Go'",
    details:
      "40% better than industry average with 7-year average EMR of .65 and 3+ consecutive years claims-free",
    icon: "shield",
  },
  {
    year: "2020",
    title: "Top EMR Award",
    achievement: ".64 EMR - 'As Low as You Can Go'",
    details: "6-year average EMR of .66 with 3+ years claims-free",
    icon: "shield",
  },
  {
    year: "2019",
    title: "Top EMR Award",
    achievement: ".64 EMR - 'As Low as You Can Go'",
    details: "5-year average EMR of .68 with 3+ years claims-free",
    icon: "shield",
  },
];

export function AwardsSection() {
  return (
    <section
      id="awards"
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
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="workspace_premium"
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
              Proven Excellence
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Industry Recognition
            </span>
          </h2>

          {/* Description with colored keywords */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Our commitment to{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              excellence has been recognized
            </span>{" "}
            by industry leaders and the communities we serve throughout the
            Pacific Northwest—where{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              actions speak louder than words
            </span>
            .
          </p>
        </div>

        {/* Industry Recognition Cards - 4 Key Awards */}
        <div className="mb-20">
          <h3 className="mb-8 font-bold text-center text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
            Industry Recognition
          </h3>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-7xl">
            <div className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex flex-col flex-1 text-center">
                  <div className="relative inline-block mx-auto mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="military_tech"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h4 className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-bold mb-4">
                    Veteran Business Enterprise
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                    Certified VOSB
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Department of Veterans Affairs certification
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                <div className="p-6 flex flex-col flex-1 text-center">
                  <div className="relative inline-block mx-auto mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h4 className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-bold mb-4">
                    Excellence in Construction
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                    AGC Washington
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Outstanding Commercial Project Award
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex flex-col flex-1 text-center">
                  <div className="relative inline-block mx-auto mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="eco"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h4 className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-bold mb-4">
                    Sustainable Building Leader
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                    WA Green Building Council
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    LEED compliance & sustainable practices
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 flex flex-col flex-1 text-center">
                  <div className="relative inline-block mx-auto mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="verified_user"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h4 className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-bold mb-4">
                    Safety Excellence
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                    OSHA VPP Star
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Exemplary workplace safety programs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AGC Safety Awards Trophy Case */}
        <div>
          <h3 className="mb-8 sm:mb-12 lg:mb-16 font-bold text-center text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
            AGC Washington - Safety Excellence Trophy Case
          </h3>

          {/* Trophy Case Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {emrTimeline.map((item, index) => (
              <div
                key={item.year}
                className="group scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-brand-primary dark:hover:border-brand-primary-light h-full overflow-hidden">
                  {/* Trophy Icon Background Watermark */}
                  <div className="absolute top-4 right-4 opacity-5 dark:opacity-10">
                    <MaterialIcon
                      icon="emoji_events"
                      className="text-brand-primary"
                      style={{ fontSize: "120px" }}
                    />
                  </div>

                  {/* Award Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-xl rounded-full"></div>
                        <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <MaterialIcon
                            icon={item.icon}
                            size="xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block font-black text-brand-primary dark:text-brand-primary-light text-4xl lg:text-5xl">
                          {item.year}
                        </span>
                        <span className="inline-block bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/30 dark:to-brand-secondary/30 px-3 py-1 rounded-full font-semibold text-brand-primary text-xs border border-brand-primary/30">
                          AGC Award
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Award Content */}
                  <div className="relative z-10">
                    <h4 className="font-black text-gray-900 dark:text-white text-xl lg:text-2xl mb-3">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-4">
                      <MaterialIcon
                        icon="shield"
                        size="sm"
                        className="text-brand-secondary"
                      />
                      <p className="font-bold text-brand-secondary dark:text-brand-secondary-light text-base lg:text-lg">
                        {item.achievement}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                      {item.details}
                    </p>
                  </div>

                  {/* Bottom Badge Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-1">
                      {[...Array(index + 1)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-brand-primary rounded-full"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Banner */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 dark:from-brand-primary/20 dark:via-brand-secondary/20 dark:to-brand-primary/20 rounded-2xl px-8 py-6 border-2 border-brand-primary/30 dark:border-brand-primary/50">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <MaterialIcon
                  icon="workspace_premium"
                  size="xl"
                  className="text-brand-primary"
                />
                <p className="font-bold text-gray-900 dark:text-white text-lg lg:text-xl">
                  4 Consecutive AGC Washington Safety Awards
                </p>
                <MaterialIcon
                  icon="workspace_premium"
                  size="xl"
                  className="text-brand-primary"
                />
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Consistently recognized for industry-leading safety performance
                and zero-incident culture
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
