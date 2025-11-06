import { MaterialIcon } from "@/components/icons/MaterialIcon";

const coreValues = [
  {
    value: "Integrity First",
    icon: "balance",
    description:
      "Doing What's Right, Every Time. Ethical business practices, quality workmanship, and promise keeping—making the right decision even when it costs us more.",
    details:
      "We recommend solutions that benefit you, not just our profit margin. Using specified materials and methods, never substituting without approval, and standing behind our work with comprehensive warranties.",
    color: "from-brand-primary to-brand-accent",
    bgColor: "bg-brand-primary/5",
    stats: "Character-Driven Conduct",
  },
  {
    value: "Owner-Focused Transparency",
    icon: "visibility",
    description:
      "No Surprises. Open communication, detailed breakdowns, and honest assessments mean you're never left wondering what's happening with your project.",
    details:
      "Pre-construction meetings with complete cost breakdowns, regular updates with photo documentation, open-book approach to material costs, and immediate notification of any changes or delays.",
    color: "from-forest-600 to-forest-800",
    bgColor: "bg-forest-100 dark:bg-forest-900",
    stats: "Open-Book Progress Meetings",
  },
  {
    value: "Relationship ROI",
    icon: "handshake",
    description:
      "We Build Trust, Not Just Structures. THE ROI IS THE RELATIONSHIP—investing in long-term partnerships that last well beyond project completion.",
    details:
      "Following up after completion to ensure satisfaction, being available for questions long after final payment, and building referral networks based on mutual trust.",
    color: "from-brand-secondary to-bronze-700",
    bgColor: "bg-brand-secondary/5",
    stats: "Long-Term Partnerships",
  },
  {
    value: "Veteran-Fueled Reliability",
    icon: "military_tech",
    description:
      "Calm and Precise Under Pressure. Military-trained discipline meets construction expertise to deliver reliable results no matter the challenges.",
    details:
      "Systematic approach to problem-solving under pressure, clear communication chains, adapting quickly to changing conditions, and following through on commitments no matter the obstacles.",
    color: "from-brand-accent to-forest-800",
    bgColor: "bg-brand-accent/5",
    stats: "Military Precision",
  },
  {
    value: "Craftsmanship that Lasts",
    icon: "construction",
    description:
      "Built for the Long Run. Quality over speed, attention to every detail, selecting materials that stand the test of time.",
    details:
      "Using proven construction methods refined over decades, selecting materials based on longevity, quality control checkpoints at every phase, and building structures that serve communities for generations.",
    color: "from-bronze-600 to-bronze-800",
    bgColor: "bg-bronze-100 dark:bg-bronze-900",
    stats: "Generational Quality",
  },
  {
    value: "Precision & Experience",
    icon: "precision_manufacturing",
    description:
      "150+ Years Combined Team Expertise. Deep knowledge across all construction disciplines with time-tested approaches refined through decades of experience.",
    details:
      "Detailed project planning with multiple contingency scenarios, precise measurements and calculations, leveraging 150+ years of combined team experience, and expert guidance that helps you avoid costly mistakes.",
    color: "from-brand-primary to-brand-secondary",
    bgColor: "bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5",
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
      className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16 values-section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.05)_0%,transparent_50%)]"></div>
      <div className="top-40 left-10 absolute bg-brand-secondary/10 blur-2xl rounded-full w-24 h-24"></div>
      <div className="right-10 bottom-20 absolute bg-brand-primary/10 blur-2xl rounded-full w-32 h-32"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center scroll-reveal">
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <MaterialIcon
              icon="shield"
              size="xl"
              className="text-brand-primary dark:text-brand-primary"
            />
          </div>
          <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              THE ROI IS THE RELATIONSHIP
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Our Six Core Values
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
            Building trust through{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              six foundational values
            </span>{" "}
            that guide every partnership, every decision, and every
            relationship—because{" "}
            <span className="text-brand-primary font-semibold">
              we build trust, not just structures
            </span>
            .
          </p>
        </div>

        {/* Value Cards */}
        <div className="gap-4 sm:gap-6 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((item, index) => (
            <div
              key={item.value}
              className="group perspective-1000 scroll-reveal value-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-full h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[380px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                  <div
                    className={`absolute inset-0 ${item.bgColor} rounded-2xl sm:rounded-3xl`}
                  ></div>

                  <div className="z-10 relative flex flex-col justify-between h-full text-center">
                    <div>
                      <div
                        className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${item.color} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg p-3`}
                      >
                        <MaterialIcon
                          icon={item.icon}
                          size="2xl"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-3 sm:mb-4 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight">
                        {item.value}
                      </h3>
                      <p className="font-light text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 font-semibold text-brand-primary dark:text-bronze-400 text-xs uppercase tracking-wider">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary shadow-xl hover:shadow-2xl p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl sm:rounded-3xl overflow-hidden rotate-y-180 transition-shadow duration-300 backface-hidden">
                  <div className="flex flex-col justify-between h-full text-white text-center">
                    <div className="flex-shrink-0">
                      <MaterialIcon
                        icon={item.icon}
                        size="lg"
                        className="mx-auto mb-2 sm:mb-3 text-white"
                      />
                      <h3 className="mb-2 font-black text-base sm:text-lg lg:text-xl">
                        {item.value} in Action
                      </h3>
                      <p className="mb-3 font-light text-white/90 text-sm sm:text-base leading-snug">
                        {item.details}
                      </p>
                    </div>

                    <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-2 sm:p-3 md:p-4 border border-white/10 rounded-xl">
                      <div className="mb-1 sm:mb-2 font-medium text-white/80 text-xs sm:text-sm uppercase tracking-wider">
                        Key Metric
                      </div>
                      <div className="font-bold text-sm sm:text-base lg:text-lg xl:text-xl">
                        {item.stats}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
