import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";

const coreValues = [
  {
    value: "Honesty",
    icon: "verified",
    tagline: "Clear SITREP Every Time",
    description:
      "Mission briefs with full transparency—truthful assessments, open communication, and honest intel in every situation.",
    details:
      "Recon-level honesty: upfront discussion of project challenges and potential obstacles. Immediate SITREP for any timeline or budget changes. Honest assessment when a mission isn't the right fit. Complete intel on all costs before boots hit the ground. No corporate speak—just straight talk like briefing the CO. Your word is your bond, so is ours.",
    color: "from-brand-secondary to-brand-secondary-dark",
    bgColor:
      "bg-gradient-to-br from-brand-secondary/10 to-bronze-200/30 dark:from-brand-secondary/20 dark:to-bronze-900/30",
    iconBg: "bg-brand-secondary",
    stats: "100% Transparent Pricing",
  },
  {
    value: "Integrity",
    icon: "shield",
    tagline: "Mission First, People Always",
    description:
      "Military-grade ethics—doing what's right when no one's watching, following ROE even when it costs more.",
    details:
      "Standing by our mission orders: using specified materials and construction methods without unauthorized substitutions. Comprehensive warranties—we own the after-action results. Making decisions that benefit the client mission, not just our bottom line. Following through on commitments with military discipline even when circumstances change. No shortcuts in the field—integrity learned in service, proven in construction.",
    color: "from-primary-800 to-brand-primary-dark",
    bgColor:
      "bg-gradient-to-br from-primary-100/50 to-brand-primary/10 dark:from-primary-900/20 dark:to-primary-800/30",
    iconBg: "bg-primary-700",
    stats: "Unwavering Ethics",
  },
  {
    value: "Professionalism",
    icon: "business_center",
    tagline: "Military Bearing in Business",
    description:
      "Professionalism learned in uniform, applied to every construction operation—on time, mission-ready, zero excuses.",
    details:
      "Deployment discipline: arriving on time, prepared, and mission-ready. Clear comms in all interactions—no jargon, just direct orders and honest feedback. Proper site management with organized AO (area of operations). Treating your property with the same respect we'd show on base. Maintaining industry credentials with the same rigor as military training—continuous improvement is part of the mission.",
    color: "from-brand-primary to-brand-primary-dark",
    bgColor: "bg-gradient-to-br from-brand-primary/10 to-brand-primary/5",
    iconBg: "bg-brand-primary",
    stats: "Expert Service Standards",
  },
  {
    value: "Thoroughness",
    icon: "task_alt",
    tagline: "No Detail Left Behind",
    description:
      "Tactical-level planning and meticulous execution—complete documentation ensuring zero defects, zero surprises.",
    details:
      "Pre-construction recon: detailed site analysis and tactical planning. Precision measurements and calculations—no room for error in the field. Systematic QC checkpoints at every phase like inspection stations. Complete mission documentation with photo intelligence records. Comprehensive final after-action review with detailed punch lists. Military precision applied to every construction detail.",
    color: "from-primary-700 to-primary-900",
    bgColor:
      "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20",
    iconBg: "bg-primary-600",
    stats: "Zero Details Missed",
  },
];

/**
 * Core Values Section
 * Displays the four foundational principles with flip cards in a 2x2 grid
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
        {/* Enhanced Section Header with Side Accents */}
        <SectionHeader
          icon="shield"
          iconVariant="primary"
          subtitle="Mission-Ready Values from All Branches"
          title="Built on Honesty & Integrity"
          description="Four foundational values guide every mission brief, construction operation, and lasting partnership—deployed with the same precision whether we're planning a site recon or executing a build mission. Army thoroughness, Navy reliability, Air Force precision, Marine adaptability, Coast Guard flexibility, Space Force innovation—all focused on building projects for the client, NOT the dollar."
        />

        {/* Value Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
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
                            size="2xl"
                            className="text-white"
                            interactive
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
                honesty, integrity, professionalism,
              </span>{" "}
              and{" "}
              <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                thoroughness
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
