"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";

const milestones = [
  {
    phase: 1,
    year: "2010",
    icon: "foundation",
    title: "Foundation: Partnership Philosophy",
    description:
      'Mike Holstein establishes MH Construction on the principle: "We Work WITH You, Not FOR You"—building trust through honest communication and transparent practices.',
    impact: "Family Values Foundation",
    color: "primary",
  },
  {
    phase: 1,
    year: "2012",
    icon: "business",
    title: "First Major Commercial Success",
    description:
      "Completed first significant commercial project, establishing reputation for quality craftsmanship and reliable execution in the Tri-Cities region.",
    impact: "Proven Track Record Begins",
    color: "primary",
  },
  {
    phase: 1,
    year: "2015",
    icon: "family_restroom",
    title: "Family Legacy Strengthens",
    description:
      "Mike's daughters join the company, reinforcing family-centered values and commitment to treating clients like extended family members.",
    impact: "Multi-Generational Trust",
    color: "primary",
  },
  {
    phase: 2,
    year: "2016",
    icon: "hub",
    title: "Arnold Garcia Joins as VP",
    description:
      "Arnold brings strategic leadership and client relationship expertise, establishing partnerships that outlast projects—building the 70% referral rate foundation.",
    impact: "Partnership Excellence",
    color: "secondary",
  },
  {
    phase: 2,
    year: "2017",
    icon: "public",
    title: "3-State Licensing Achieved",
    description:
      "Expanded licensing across Washington, Oregon, and Idaho—bringing proven excellence to the entire Pacific Northwest region with complete compliance.",
    impact: "Regional Authority",
    color: "secondary",
  },
  {
    phase: 2,
    year: "2019",
    icon: "shield",
    title: "First Top EMR Award",
    description:
      "AGC-WA recognizes .64 EMR achievement ('As Low as You Can Go')—40% better than industry average, establishing safety-first culture that protects every team member.",
    impact: "Industry-Leading Safety",
    color: "secondary",
  },
  {
    phase: 2,
    year: "2020",
    icon: "celebration",
    title: "100+ Projects Milestone",
    description:
      "Reached 100 successfully completed projects across commercial, industrial, and public sectors—proving consistent excellence regardless of project complexity.",
    impact: "Proven Reliability",
    color: "secondary",
  },
  {
    phase: 3,
    year: "2021",
    icon: "workspace_premium",
    title: "Consecutive Top EMR Recognition",
    description:
      "Second AGC-WA Top EMR Award validates sustained commitment to zero-incident culture—3+ years without time-loss injury demonstrates unwavering safety discipline.",
    impact: "Sustained Excellence",
    color: "bronze",
  },
  {
    phase: 3,
    year: "2022",
    icon: "verified",
    title: "OSHA VPP Star Designation",
    description:
      "Achieved OSHA Voluntary Protection Program Star status alongside 500+ project milestone—highest recognition of workplace safety and health management excellence.",
    impact: "National Recognition",
    color: "bronze",
  },
  {
    phase: 3,
    year: "2023",
    icon: "trending_up",
    title: "650+ Projects Completed",
    description:
      "Surpassed 650 successful projects while maintaining perfect safety record—demonstrating scalable excellence that never compromises quality or safety for growth.",
    impact: "Proven Scalability",
    color: "bronze",
  },
  {
    phase: 3,
    year: "2024",
    icon: "history",
    title: "15th Anniversary & Succession",
    description:
      "Mike Holstein announces succession plan ensuring continuity of partnership philosophy while preparing for next chapter—15 years of trust-building leadership.",
    impact: "Legacy Secured",
    color: "bronze",
  },
  {
    phase: 4,
    year: "Jan 2025",
    icon: "military_tech",
    title: "Veteran-Owned Leadership",
    description:
      "Jeremy Thamert assumes ownership bringing operational discipline and mission-focused execution—enhancing established excellence with military-grade structure and zero-compromise standards.",
    impact: "Operational Enhancement",
    color: "veteran",
  },
  {
    phase: 4,
    year: "2025",
    icon: "rocket_launch",
    title: "Integrated CRM Platform",
    description:
      "Implementing High-Level CRM for seamless communication and real-time project updates—leveraging technology to enhance the personal service that defines MH partnerships.",
    impact: "Enhanced Client Experience",
    color: "veteran",
  },
  {
    phase: 4,
    year: "Future",
    icon: "explore",
    title: "Continued Mission Excellence",
    description:
      "Building projects for the client, NOT the dollar—where founding father's partnership philosophy meets veteran operational discipline, creating unmatched construction excellence.",
    impact: "Trust, One Project at a Time",
    color: "veteran",
  },
];

export function CompanyEvolution() {
  return (
    <section
      id="evolution"
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
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
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
              Company Evolution
            </span>
            <span className="block bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              From Founding Father to Veteran Excellence
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            15 years of proven trust, now enhanced with{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              operational discipline
            </span>
            —where family values meet mission-focused execution. Mike Holstein's{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              partnership philosophy
            </span>{" "}
            combined with Jeremy Thamert's{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              veteran leadership
            </span>{" "}
            creates unmatched construction excellence.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Connecting Line - Desktop only */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary/30 via-brand-secondary/30 to-bronze-600/30"></div>

          {/* Timeline Milestones */}
          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              // Determine gradient colors based on phase
              let circleGradient = "from-brand-primary to-brand-primary-dark";
              let cardBorderHover =
                "group-hover:border-brand-primary dark:group-hover:border-brand-primary-light";
              let iconGradient = "from-brand-primary to-brand-primary-dark";

              if (milestone.color === "secondary") {
                circleGradient = "from-brand-secondary to-brand-secondary-dark";
                cardBorderHover =
                  "group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light";
                iconGradient = "from-brand-secondary to-brand-secondary-dark";
              } else if (milestone.color === "bronze") {
                circleGradient = "from-bronze-600 to-bronze-800";
                cardBorderHover =
                  "group-hover:border-bronze-600 dark:group-hover:border-bronze-400";
                iconGradient = "from-bronze-600 to-bronze-800";
              } else if (milestone.color === "veteran") {
                circleGradient =
                  "from-brand-primary via-brand-secondary to-bronze-700";
                cardBorderHover =
                  "group-hover:border-brand-primary dark:group-hover:border-brand-primary-light";
                iconGradient =
                  "from-brand-primary via-brand-secondary to-bronze-700";
              }

              return (
                <div
                  key={`${milestone.year}-${index}`}
                  className="relative group scroll-reveal"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Desktop Layout - Alternating */}
                  <div className="hidden lg:flex items-center gap-8">
                    {isEven ? (
                      <>
                        {/* Content Left */}
                        <div className="flex-1 text-right">
                          <div
                            className={`inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${cardBorderHover}`}
                          >
                            <div className="flex items-start justify-end gap-4 mb-4">
                              <div className="text-right">
                                <div className="flex items-center justify-end gap-2 mb-2">
                                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {milestone.impact}
                                  </span>
                                </div>
                                <h3 className="font-black text-gray-900 dark:text-white text-xl lg:text-2xl mb-2">
                                  {milestone.title}
                                </h3>
                              </div>
                              <div
                                className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                              >
                                <MaterialIcon
                                  icon={milestone.icon}
                                  size="lg"
                                  className="text-white"
                                />
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>

                        {/* Center Year Badge */}
                        <div className="flex-shrink-0 relative z-10">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${circleGradient} rounded-full flex items-center justify-center text-white font-black text-sm shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300`}
                          >
                            {milestone.year}
                          </div>
                        </div>

                        {/* Empty Right */}
                        <div className="flex-1"></div>
                      </>
                    ) : (
                      <>
                        {/* Empty Left */}
                        <div className="flex-1"></div>

                        {/* Center Year Badge */}
                        <div className="flex-shrink-0 relative z-10">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${circleGradient} rounded-full flex items-center justify-center text-white font-black text-sm shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300`}
                          >
                            {milestone.year}
                          </div>
                        </div>

                        {/* Content Right */}
                        <div className="flex-1 text-left">
                          <div
                            className={`inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${cardBorderHover}`}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div
                                className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
                              >
                                <MaterialIcon
                                  icon={milestone.icon}
                                  size="lg"
                                  className="text-white"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {milestone.impact}
                                  </span>
                                </div>
                                <h3 className="font-black text-gray-900 dark:text-white text-xl lg:text-2xl mb-2">
                                  {milestone.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout - Vertical */}
                  <div className="lg:hidden flex gap-4">
                    {/* Left Side - Year Badge and Line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${circleGradient} rounded-full flex items-center justify-center text-white font-black text-xs shadow-xl border-4 border-white dark:border-gray-900 relative z-10`}
                      >
                        {milestone.year}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-1 flex-1 bg-gradient-to-b from-brand-primary to-brand-secondary mt-2 min-h-[80px]"></div>
                      )}
                    </div>

                    {/* Right Side - Card */}
                    <div className="flex-1 pb-8">
                      <div
                        className={`bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${cardBorderHover}`}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center shadow-lg`}
                          >
                            <MaterialIcon
                              icon={milestone.icon}
                              size="md"
                              className="text-white"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                              {milestone.impact}
                            </span>
                            <h3 className="font-black text-gray-900 dark:text-white text-lg">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
