import { MaterialIcon } from "@/components/icons/MaterialIcon";

const coreValues = [
  {
    value: "Honesty & Transparency",
    icon: "visibility",
    description:
      "We provide full-disclosure transparency from day one. Our open-dialogue progress meetings include all stakeholders, ensuring every topic is vetted and documented.",
    details:
      "We believe you, the client, should have the most complete and up-to-date information—good or bad—to make truly educated decisions. We manage the project; you control it.",
    color: "from-brand-primary to-brand-accent",
    bgColor: "bg-brand-primary/5",
    stats: "Open-Book Progress Meetings",
  },
  {
    value: "Integrity",
    icon: "balance",
    description:
      "Integrity is the unwavering commitment to our word. As a team built on principles of accountability and trust, we view our business conduct as a direct reflection of our personal character.",
    details:
      "Our conversation, character, and conduct are consistently diligent, ensuring our actions on your project transcend the transactional relationship.",
    color: "from-forest-600 to-forest-800",
    bgColor: "bg-forest-100 dark:bg-forest-900",
    stats: "Character-Driven Conduct",
  },
  {
    value: "Precision & Experience",
    icon: "precision_manufacturing",
    description:
      "With over 150 years of combined experience in commercial construction, we offer a project team that has seen and managed virtually every challenge.",
    details:
      "This collective wisdom is delivered in a neat, engineer-driven project package, providing the reliable foresight necessary to keep your project on track and minimize risk.",
    color: "from-brand-secondary to-bronze-700",
    bgColor: "bg-brand-secondary/5",
    stats: "150+ Years Combined Experience",
  },
  {
    value: "Client-First Ethics",
    icon: "favorite",
    description:
      'Our foundation is built on small-town values: we are a "client" focused company, not just a "project" focused one.',
    details:
      "This means we are committed to acting solely in your best interest. We operate with discipline—staying organized, concise, and direct—so that your valuable time is respected and your decisions are always well-informed.",
    color: "from-brand-accent to-forest-800",
    bgColor: "bg-brand-accent/5",
    stats: "Client-Focused Approach",
  },
  {
    value: "Professionalism & Control",
    icon: "engineering",
    description:
      "Professionalism here is the confident, controlled ability to navigate complex projects.",
    details:
      "Decades of experience navigating complex projects with levelheaded management and coordinated workflow.",
    color: "from-bronze-600 to-bronze-800",
    bgColor: "bg-bronze-100 dark:bg-bronze-900",
    stats: "Harmonious Workflow Management",
  },
  {
    value: "Trust (The Culmination)",
    icon: "verified",
    description:
      "Earning your trust is not a starting point; it is the culmination of our consistent performance in all other core values.",
    details:
      "Trust is the measurable result that your project is on track, flowing smoothly, and supported by open, honest communication. We understand that your trust is the foundation upon which MH Construction exists.",
    color: "from-brand-primary to-brand-secondary",
    bgColor: "bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5",
    stats: "Foundation of Our Existence",
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
              Built on
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Professional Foundation
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
            Our foundation rests on{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              six core principles
            </span>{" "}
            that guide every partnership, every decision, and every
            collaborative relationship we build with{" "}
            <span className="text-brand-primary font-semibold">
              trust as our ultimate goal
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
