import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { gridPresets } from "@/lib/styles/layout-variants";

const coreValues = [
  {
    value: "Integrity First",
    icon: "balance",
    description:
      "Doing What's Right, Every Time. Ethical business practices, quality workmanship, and promise keeping—making the right decision even when it costs us more. We never cut corners, even when no one is watching.",
    details:
      "We recommend solutions that benefit you, not just our profit margin. Using specified materials and methods, never substituting without approval, standing behind our work with comprehensive warranties, and treating your property with the same care we'd want for our own.",
    color: "from-brand-primary to-brand-accent",
    bgColor: "bg-brand-primary/5",
    stats: "Character-Driven Excellence",
  },
  {
    value: "Owner-Focused Transparency",
    icon: "visibility",
    description:
      "No Surprises. Open communication, transparent pricing, and honest assessments mean you're never left wondering what's happening with your project. You control it, we manage it—full visibility into every decision.",
    details:
      "Pre-construction meetings with complete cost breakdowns, regular updates with photo documentation, open-book approach to material costs and labor, immediate notification of any changes or delays. All agreements, changes, and decisions in writing.",
    color: "from-forest-600 to-forest-800",
    bgColor: "bg-forest-100 dark:bg-forest-900",
    stats: "Open-Book Progress",
  },
  {
    value: "Partnership-Driven Trust",
    icon: "handshake",
    description:
      "We Build Trust, Not Just Structures. Investing in long-term partnerships that last well beyond project completion. We measure success by relationships built, not just profit margins—because lasting partnerships matter more than quick wins.",
    details:
      "Following up after completion to ensure satisfaction, being available for questions long after final payment, building referral networks based on mutual trust, and treating every interaction as an investment in lasting partnerships. Prioritizing relationship value over short-term gains—working WITH you to build something bigger than buildings.",
    color: "from-brand-secondary to-bronze-700",
    bgColor: "bg-brand-secondary/5",
    stats: "70% Referral Business",
  },
  {
    value: "Veteran-Fueled Reliability",
    icon: "military_tech",
    description:
      "Calm and Precise Under Pressure. Military-trained discipline and attention to detail honed through service meet construction expertise to deliver reliable results no matter the challenges. Staying unshakably calm when challenges arise.",
    details:
      "Systematic approach to problem-solving under pressure, clear communication chains and decision-making processes, adapting quickly to changing conditions without losing focus, and following through on commitments no matter the obstacles. Leading with confidence earned through military experience.",
    color: "from-brand-accent to-forest-800",
    bgColor: "bg-brand-accent/5",
    stats: "Military Precision",
  },
  {
    value: "Craftsmanship that Lasts",
    icon: "construction",
    description:
      "Built for the Long Run. Quality over speed, meticulous attention to every detail, and selecting durable materials that stand the test of time. Taking pride in work—building as if it's for our own families.",
    details:
      "Using proven construction methods refined over decades, selecting materials based on longevity not just cost, quality control checkpoints at every phase, and building structures that serve communities for generations with unwavering attention to detail.",
    color: "from-bronze-600 to-bronze-800",
    bgColor: "bg-bronze-100 dark:bg-bronze-900",
    stats: "Generational Quality",
  },
  {
    value: "Precision & Experience",
    icon: "precision_manufacturing",
    description:
      "150+ Years Combined Team Expertise. Deep technical mastery across all construction disciplines with time-tested approaches refined through decades of successful projects. Expert guidance that helps you avoid costly mistakes.",
    details:
      "Detailed project planning with multiple contingency scenarios, precise measurements and calculations, leveraging 150+ years of combined team experience, continuous learning staying current with industry innovations, and bringing calm experienced leadership to complex projects.",
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
              Building for the Client, NOT the Dollar
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Our Six Core Values
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
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
        <div className={gridPresets.cards3("sm")}>
          {coreValues.map((item, _index) => (
            <div
              key={item.value}
              className="group perspective-1000 scroll-reveal value-card h-80 sm:h-96 lg:h-[420px]"
              style={{ animationDelay: `${_index * 0.1}s` }}
            >
              <div className="relative w-full h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-2xl hover:shadow-brand-primary/10 p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden transition-all duration-300 backface-hidden hover:scale-105">
                  <div
                    className={`absolute inset-0 ${item.bgColor} rounded-3xl`}
                  ></div>

                  <div className="z-10 relative flex flex-col justify-between h-full text-center">
                    <div>
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg p-2 sm:p-3`}
                      >
                        <MaterialIcon
                          icon={item.icon}
                          size="2xl"
                          className="text-white"
                        />
                      </div>
                      <h3 className="mb-2 sm:mb-3 lg:mb-4 font-black text-gray-900 dark:text-gray-100 text-base sm:text-lg lg:text-xl xl:text-2xl leading-tight tracking-tight break-words px-2">
                        {item.value}
                      </h3>
                      <p className="font-light text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed break-words px-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4 font-semibold text-brand-primary dark:text-bronze-400 text-xs uppercase tracking-wider">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary shadow-2xl p-4 sm:p-5 lg:p-6 rounded-3xl overflow-hidden rotate-y-180 transition-shadow duration-300 backface-hidden">
                  <div className="flex flex-col h-full text-white text-center">
                    <div className="flex-shrink-0 mb-2 sm:mb-3">
                      <MaterialIcon
                        icon={item.icon}
                        size="lg"
                        className="mx-auto text-white"
                      />
                      <h3 className="mt-2 mb-1.5 sm:mb-2 font-bold text-sm sm:text-base lg:text-lg leading-tight break-words px-2">
                        {item.value} in Action
                      </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent px-2">
                      <p className="font-light text-white/90 text-xs sm:text-sm leading-snug break-words">
                        {item.details}
                      </p>
                    </div>

                    <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm mt-3 sm:mt-4 p-2.5 sm:p-3 lg:p-4 border border-white/10 rounded-xl">
                      <div className="mb-1.5 sm:mb-2 font-medium text-white/90 text-xs sm:text-sm uppercase tracking-wider">
                        Key Metric
                      </div>
                      <div className="font-bold text-xs sm:text-sm lg:text-base xl:text-lg break-words">
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
