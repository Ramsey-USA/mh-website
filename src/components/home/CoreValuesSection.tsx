import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { gridPresets } from "@/lib/styles/layout-variants";

const coreValues = [
  {
    value: "Integrity First",
    icon: "balance",
    tagline: "Doing What's Right, Every Time",
    description:
      "Ethical business practices, quality workmanship, and promise keeping—making the right decision even when it costs us more. We never cut corners, even when no one is watching.",
    details:
      "We recommend solutions that benefit you, not just our profit margin. Using specified materials and methods, never substituting without approval, standing behind our work with comprehensive warranties, and treating your property with the same care we'd want for our own.",
    color: "from-brand-primary to-brand-primary-dark",
    bgColor: "bg-gradient-to-br from-brand-primary/10 to-brand-primary/5",
    iconBg: "bg-brand-primary",
    stats: "Character-Driven Excellence",
  },
  {
    value: "Owner-Focused Transparency",
    icon: "visibility",
    tagline: "No Surprises, Ever",
    description:
      "Open communication, transparent pricing, and honest assessments. You control it, we manage it.",
    details:
      "Pre-construction meetings with complete cost breakdowns, regular updates with photo documentation, open-book approach to material costs and labor, immediate notification of any changes or delays. All agreements, changes, and decisions in writing—full visibility into every decision.",
    color: "from-brand-primary-dark to-primary-800",
    bgColor:
      "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20",
    iconBg: "bg-primary-600",
    stats: "Open-Book Progress",
  },
  {
    value: "Partnership-Driven Trust",
    icon: "handshake",
    tagline: "We Build Trust, Not Just Structures",
    description:
      "Investing in long-term partnerships that last well beyond project completion. We measure success by relationships built, not just profit margins.",
    details:
      "Following up after completion to ensure satisfaction, being available for questions long after final payment, building referral networks based on mutual trust, and treating every interaction as an investment in lasting partnerships. Prioritizing relationship value over short-term gains—working WITH you to build something bigger than buildings.",
    color: "from-brand-secondary to-brand-secondary-dark",
    bgColor:
      "bg-gradient-to-br from-brand-secondary/10 to-bronze-200/30 dark:from-brand-secondary/20 dark:to-bronze-900/30",
    iconBg: "bg-brand-secondary",
    stats: "70% Referral Business",
  },
  {
    value: "Veteran-Fueled Reliability",
    icon: "military_tech",
    tagline: "Calm and Precise Under Pressure",
    description:
      "Military-trained discipline and attention to detail honed through service meet construction expertise to deliver reliable results no matter the challenges.",
    details:
      "Systematic approach to problem-solving under pressure, clear communication chains and decision-making processes, adapting quickly to changing conditions without losing focus, and following through on commitments no matter the obstacles. Leading with confidence earned through military experience. Staying unshakably calm when challenges arise.",
    color: "from-primary-700 to-primary-900",
    bgColor:
      "bg-gradient-to-br from-primary-100/50 to-brand-primary/10 dark:from-primary-900/20 dark:to-primary-800/30",
    iconBg: "bg-primary-700",
    stats: "Military Precision",
  },
  {
    value: "Craftsmanship that Lasts",
    icon: "construction",
    tagline: "Built for the Long Run",
    description:
      "Quality over speed, meticulous attention to every detail, and selecting durable materials that stand the test of time. Building as if it's for our own families.",
    details:
      "Using proven construction methods refined over decades, selecting materials based on longevity not just cost, quality control checkpoints at every phase, and building structures that serve communities for generations with unwavering attention to detail. Taking pride in work that lasts.",
    color: "from-bronze-600 to-bronze-800",
    bgColor:
      "bg-gradient-to-br from-bronze-100/60 to-bronze-200/40 dark:from-bronze-900/30 dark:to-bronze-800/20",
    iconBg: "bg-bronze-600",
    stats: "Generational Quality",
  },
  {
    value: "Precision & Experience",
    icon: "precision_manufacturing",
    tagline: "150+ Years Combined Team Expertise",
    description:
      "Deep technical mastery across all construction disciplines with time-tested approaches refined through decades of successful projects.",
    details:
      "Detailed project planning with multiple contingency scenarios, precise measurements and calculations, leveraging 150+ years of combined team experience, continuous learning staying current with industry innovations, and bringing calm experienced leadership to complex projects. Expert guidance that helps you avoid costly mistakes.",
    color: "from-brand-primary to-brand-secondary",
    bgColor:
      "bg-gradient-to-br from-brand-primary/8 to-brand-secondary/8 dark:from-brand-primary/15 dark:to-brand-secondary/15",
    iconBg: "bg-gradient-to-br from-brand-primary to-brand-secondary",
    stats: "150+ Years Combined Experience",
  },
];

/**
 * Core Values Section
 * Displays the six foundational principles with flip cards
 */
export function CoreValuesSection() {
  return (
    <section
      id="core-values"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 values-section overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
      <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
                <MaterialIcon icon="shield" size="2xl" className="text-white" />
              </div>
            </div>
          </div>
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Building for the Client, NOT the Dollar
            </span>
            <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
              Our Six Core Values
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
            Building trust through{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              six foundational values
            </span>{" "}
            that guide every partnership, every decision, and every
            relationship—because{" "}
            <span className="text-brand-primary dark:text-brand-primary-light font-bold">
              we build trust, not just structures
            </span>
            .
          </p>
        </div>

        {/* Value Cards */}
        <div className={gridPresets.cards3("sm")}>
          {coreValues.map((item, _index) => (
            <div
              key={item.value}
              className="group perspective-1000 scroll-reveal value-card h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px]"
              style={{ animationDelay: `${_index * 0.1}s` }}
            >
              <div className="relative w-full h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 p-5 sm:p-6 md:p-7 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden transition-all duration-300 backface-hidden group-hover:scale-[1.02]">
                  {/* Gradient Background Overlay */}
                  <div
                    className={`absolute inset-0 ${item.bgColor} opacity-80 dark:opacity-60`}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-800/40"></div>

                  <div className="z-10 relative flex flex-col h-full text-center">
                    <div className="flex-1 flex flex-col justify-center min-h-0">
                      {/* Enhanced Icon Container */}
                      <div className="relative inline-block mb-4 sm:mb-5 mx-auto flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-xl rounded-3xl"></div>
                        <div
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 ${item.iconBg} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          <MaterialIcon
                            icon={item.icon}
                            size="xl"
                            className="text-white"
                          />
                        </div>
                      </div>

                      <h3 className="mb-2 sm:mb-3 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-2xl leading-tight tracking-tight break-words px-2 flex-shrink-0">
                        {item.value}
                      </h3>
                      <p className="mb-3 sm:mb-4 font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base md:text-lg break-words px-2 flex-shrink-0">
                        {item.tagline}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed break-words px-2 sm:px-3 flex-shrink-0">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-300 dark:border-gray-600">
                      <div className="flex items-center justify-center gap-2 text-brand-primary dark:text-brand-primary-light">
                        <MaterialIcon
                          icon="autorenew"
                          size="md"
                          className="animate-spin-slow group-hover:animate-spin"
                        />
                        <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                          <span className="hidden sm:inline">
                            Hover to learn more
                          </span>
                          <span className="sm:hidden">Tap to learn more</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} shadow-2xl dark:shadow-brand-primary/30 p-6 sm:p-7 lg:p-8 rounded-3xl overflow-hidden rotate-y-180 transition-all duration-300 backface-hidden`}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>

                  <div className="relative flex flex-col h-full text-white text-center">
                    <div className="flex-shrink-0 mb-4">
                      <div className="inline-block bg-white/20 backdrop-blur-sm p-3 rounded-2xl mb-3">
                        <MaterialIcon
                          icon={item.icon}
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg lg:text-xl leading-tight break-words px-2">
                        {item.value} in Action
                      </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 px-2">
                      <p className="font-normal text-white/95 text-xs sm:text-sm lg:text-base leading-relaxed break-words">
                        {item.details}
                      </p>
                    </div>

                    <div className="flex-shrink-0 bg-white/25 backdrop-blur-md mt-4 sm:mt-5 p-3 sm:p-4 border border-white/30 rounded-2xl shadow-lg">
                      <div className="mb-2 font-semibold text-white text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                        <MaterialIcon
                          icon="analytics"
                          size="sm"
                          className="text-white"
                        />
                        <span>Key Metric</span>
                      </div>
                      <div className="font-bold text-sm sm:text-base lg:text-lg break-words">
                        {item.stats}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center scroll-reveal">
          <div className="mx-auto max-w-4xl bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 dark:from-brand-primary/20 dark:via-brand-secondary/20 dark:to-brand-primary/20 p-8 sm:p-10 lg:p-12 border border-brand-primary/20 dark:border-brand-primary/30 rounded-3xl shadow-xl backdrop-blur-sm">
            <div className="inline-block bg-brand-primary/10 dark:bg-brand-primary/20 p-3 rounded-2xl mb-6">
              <MaterialIcon
                icon="verified"
                size="xl"
                className="text-brand-primary dark:text-brand-primary-light"
              />
            </div>
            <h3 className="mb-4 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl lg:text-4xl leading-tight">
              The Ultimate Goal:{" "}
              <span className="text-brand-primary dark:text-brand-primary-light">
                Trust
              </span>
            </h3>
            <p className="mb-6 font-normal text-gray-700 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed px-4">
              Trust isn't just another value—it's the result when all other
              values are consistently demonstrated. It's earned through{" "}
              <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                partnership excellence, military precision, transparent
                communication, quality craftsmanship,
              </span>{" "}
              and{" "}
              <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                150+ years of combined experience
              </span>
              .
            </p>
            <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-md border border-brand-primary/20">
              <MaterialIcon
                icon="emoji_events"
                size="md"
                className="text-brand-secondary"
              />
              <span className="font-bold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base">
                98% Client Satisfaction | 70% Referral Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
