/**
 * Awards & Recognition Section Component
 * Displays MH Construction's industry awards, safety recognition, and certifications
 * Reusable across About, Team, and other credibility-building pages
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";

const recognitionCards = [
  {
    title: "Veteran Business Enterprise",
    badge: "Certified VOSB",
    detail: "Department of Veterans Affairs certification",
    icon: "military_tech",
    glowFrom: "from-brand-primary/40",
    glowTo: "to-brand-primary-dark/40",
    barFrom: "from-brand-primary",
    barVia: "via-brand-primary-dark",
    barTo: "to-brand-primary-darker",
    iconFrom: "from-brand-primary",
    iconVia: "via-brand-primary-dark",
    iconTo: "to-brand-primary-darker",
  },
  {
    title: "Excellence in Construction",
    badge: "AGC Washington",
    detail: "Outstanding Commercial Project Award",
    icon: "workspace_premium",
    glowFrom: "from-brand-secondary/40",
    glowTo: "to-bronze-600/40",
    barFrom: "from-brand-secondary",
    barVia: "via-bronze-700",
    barTo: "to-bronze-800",
    iconFrom: "from-brand-secondary",
    iconVia: "via-bronze-700",
    iconTo: "to-bronze-800",
  },
  {
    title: "Sustainable Building Leader",
    badge: "WA Green Building Council",
    detail: "LEED compliance & sustainable practices",
    icon: "eco",
    glowFrom: "from-brand-primary/40",
    glowTo: "to-brand-primary-dark/40",
    barFrom: "from-brand-primary",
    barVia: "via-brand-primary-dark",
    barTo: "to-brand-primary-darker",
    iconFrom: "from-brand-primary",
    iconVia: "via-brand-primary-dark",
    iconTo: "to-brand-primary-darker",
  },
  {
    title: "Safety Excellence",
    badge: "OSHA VPP Star",
    detail: "Exemplary workplace safety programs",
    icon: "verified_user",
    glowFrom: "from-brand-primary/40",
    glowTo: "to-brand-primary-dark/40",
    barFrom: "from-brand-primary",
    barVia: "via-brand-primary-dark",
    barTo: "to-brand-primary-darker",
    iconFrom: "from-brand-primary",
    iconVia: "via-brand-primary-dark",
    iconTo: "to-brand-primary-darker",
  },
];

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
    <BrandedContentSection
      id="awards"
      header={{
        icon: "workspace_premium",
        iconVariant: "bronze",
        subtitle: "Proven Excellence",
        title: "Industry Recognition",
        description: (
          <>
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
          </>
        ),
      }}
    >
      {/* Industry Recognition Cards - 4 Key Awards */}
      <div className="mb-20">
        <h3 className="mb-8 font-bold text-center text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
          Industry Recognition
        </h3>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-7xl">
          {recognitionCards.map((card) => (
            <div key={card.title} className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div
                className={`absolute -inset-2 bg-gradient-to-br ${card.glowFrom} ${card.glowTo} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse`}
              ></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${card.barFrom} ${card.barVia} ${card.barTo}`}
                ></div>

                <div className="p-6 flex flex-col flex-1 text-center">
                  <div className="relative inline-block mx-auto mb-4">
                    <div
                      className={`absolute -inset-2 bg-gradient-to-br ${card.glowFrom} ${card.glowTo} opacity-30 blur-lg rounded-xl`}
                    ></div>
                    <div
                      className={`relative rounded-xl bg-gradient-to-br ${card.iconFrom} ${card.iconVia} ${card.iconTo} p-3 shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      <MaterialIcon
                        icon={card.icon}
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h4 className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-bold mb-4">
                    {card.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                    {card.badge}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300 text-xs">
                    {card.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
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
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              Consistently recognized for industry-leading safety performance
              and zero-incident culture
            </p>
          </div>
        </div>
      </div>
    </BrandedContentSection>
  );
}
