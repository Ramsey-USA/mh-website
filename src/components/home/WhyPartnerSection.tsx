"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

const partnershipValues = [
  {
    icon: "health_and_safety",
    title: ".64 EMR - Industry-Leading Safety",
    subtitle: "Every Team Member Returns Home Safe",
    description:
      "Multiple AGC-WA Top EMR Awards with .64 EMR—40% better than industry average. 3+ years without time-loss injury and OSHA VPP Star designation. No compromises on safety, period.",
    iconColor: "text-bronze-600",
    iconBgGradient: "from-bronze-600 to-bronze-700",
    accentColor: "bronze-500",
    highlights: [
      ".64 EMR (40% better than industry)",
      "3+ years without time-loss injury",
      "OSHA VPP Star designation",
      "Zero compromises on safety",
    ],
    stat: ".64 EMR",
    statLabel: "Safety Rating",
  },
  {
    icon: "workspace_premium",
    title: "150+ Years of Combined Experience",
    subtitle: "Proven Construction Expertise",
    description:
      "Our team brings 150+ years of combined construction expertise. Veterans and civilians working together, leveraging proven methods refined through generations. Deep experience you can trust.",
    iconColor: "text-brand-primary",
    iconBgGradient: "from-brand-primary to-brand-primary-dark",
    accentColor: "brand-primary",
    highlights: [
      "150+ years combined expertise",
      "Veteran + civilian team excellence",
      "Proven methods & practices",
      "Multi-generational experience",
    ],
    stat: "150+",
    statLabel: "Years Combined Experience",
  },
  {
    icon: "fact_check",
    title: "Complete Transparency",
    subtitle: "Zero Surprises",
    description:
      "Open-book pricing with complete visibility on every cost, timeline, and decision. You control the project, we execute it with full transparency. No hidden costs, honest assessments at every phase. Your word is your bond—so is ours.",
    iconColor: "text-brand-secondary",
    iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
    accentColor: "brand-secondary",
    highlights: [
      "Open-book pricing",
      "Real-time project updates",
      "Complete cost transparency",
      "Honest timelines & expectations",
    ],
    stat: "100%",
    statLabel: "Transparency Promise",
  },
  {
    icon: "handshake",
    title: "Long-Term Partnerships",
    subtitle: "Relationships That Outlast Projects",
    description:
      "70% of our business comes from referrals and repeat partners—trust earned through action, not words. Our commitment doesn't end when the project completes. We're in it for the long haul, building relationships that matter. THE ROI IS THE RELATIONSHIP.",
    iconColor: "text-bronze-600",
    iconBgGradient: "from-bronze-600 to-bronze-800",
    accentColor: "bronze-500",
    highlights: [
      "70% referral & repeat business",
      "Lifelong partnership commitment",
      "Ongoing support & service",
      "Community-focused relationships",
    ],
    stat: "70%",
    statLabel: "Referral Business",
  },
  {
    icon: "military_tech",
    title: "650+ Successful Projects",
    subtitle: "Proven Track Record",
    description:
      "650+ successfully completed projects demonstrate proven reliability. Veteran leadership brings discipline, planning under pressure, and consistent execution. Whether routine or urgent—we deliver results no matter the challenges.",
    iconColor: "text-bronze-300",
    themePreset: "veteran",
    iconBgGradient: "from-brand-primary to-brand-primary-dark",
    accentColor: "brand-primary",
    highlights: [
      "650+ completed projects",
      "Veteran-owned since Jan 2025",
      "Disciplined execution",
      "Service-earned values",
    ],
    stat: "650+",
    statLabel: "Successful Projects",
  },
  {
    icon: "verified",
    title: "3-State Licensing",
    subtitle: "Licensed Across the Pacific Northwest",
    description:
      "Fully licensed general contractor across Washington, Oregon, and Idaho. Comprehensive insurance and bonding provide complete protection for every project. Credentials maintained with precision—continuous compliance, zero compromises.",
    iconColor: "text-brand-secondary",
    iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
    accentColor: "brand-secondary",
    highlights: [
      "Licensed in WA, OR, and ID",
      "Full insurance & bonding coverage",
      "Complete compliance assurance",
      "Maintained with precision",
    ],
    stat: "3 States",
    statLabel: "Licensed",
  },
];

export function WhyPartnerSection() {
  return (
    <section
      id="why-partner"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="verified"
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
              Veteran-Owned Excellence
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Proven Performance & Earned Integrity
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Where{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              discipline meets construction expertise
            </span>
            —honest communication, proven craftsmanship, and{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              earned integrity
            </span>{" "}
            create partnerships built on trust.
          </p>

          {/* Core Philosophy Callout */}
          <div className="inline-block mt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-xl">
                <p className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
                  "Building projects for the client,{" "}
                  <span className="font-black italic text-bronze-700 dark:text-bronze-400 text-xl sm:text-2xl md:text-3xl">
                    NOT
                  </span>{" "}
                  the dollar"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Grid Cards with Unique Hover Effects */}
        <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {partnershipValues.map((value) => (
            <div
              key={value.title}
              className="group relative flex h-full min-h-[520px]"
            >
              {/* Colored Border Glow - Visible on hover */}
              <div
                className={`absolute -inset-2 bg-gradient-to-br ${value.iconBgGradient} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse`}
              ></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${value.iconBgGradient}`}
                ></div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Icon and Stat Section */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Enhanced Icon with Header Style */}
                    <div className="relative">
                      {/* Blur glow layer behind icon */}
                      <div
                        className={`absolute -inset-2 bg-gradient-to-br ${value.iconBgGradient} opacity-30 blur-lg rounded-2xl`}
                      ></div>
                      <div
                        className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.iconBgGradient} rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300`}
                      >
                        <MaterialIcon
                          icon={value.icon}
                          size="xl"
                          className="text-white drop-shadow-lg"
                          interactive
                          {...(value.themePreset && {
                            theme: value.themePreset as
                              | "veteran"
                              | "military"
                              | "tactical"
                              | "default",
                          })}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl sm:text-4xl font-black group-hover:scale-105 transition-transform duration-300 ${
                          value.accentColor === "bronze-500"
                            ? "text-bronze-700 dark:text-bronze-400"
                            : value.accentColor === "brand-secondary"
                              ? "text-brand-secondary-dark dark:text-brand-secondary-light"
                              : "text-brand-primary-dark dark:text-brand-primary-light"
                        }`}
                      >
                        {value.stat}
                      </div>
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        {value.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="mb-2 font-black text-gray-900 dark:text-white text-xl sm:text-2xl leading-tight">
                    {value.title}
                  </h3>
                  <p
                    className={`mb-4 text-sm sm:text-base font-semibold ${
                      value.accentColor === "bronze-500"
                        ? "text-bronze-700 dark:text-bronze-300"
                        : value.accentColor === "brand-secondary"
                          ? "text-brand-secondary-dark dark:text-brand-secondary"
                          : "text-brand-primary-dark dark:text-brand-primary"
                    }`}
                  >
                    {value.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mb-6 text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed flex-1">
                    {value.description}
                  </p>

                  {/* Key Highlights with Custom Icons */}
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    {value.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${value.iconBgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <MaterialIcon
                            icon="check"
                            className="text-white text-xs"
                          />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StaggeredFadeIn>

        {/* Enhanced CTA Section with Split Design */}
      </div>
    </section>
  );
}
