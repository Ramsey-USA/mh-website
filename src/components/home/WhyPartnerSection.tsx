"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

const partnershipValues = [
  {
    icon: "emoji_events",
    title: "Award-Winning Safety",
    subtitle: ".64 EMR Excellence",
    description:
      "Multiple AGC-WA Top EMR Awards with .64 EMR—40% better than industry average. 3+ years without time-loss injury and OSHA VPP Star designation demonstrate our unwavering commitment to zero-incident workplace culture.",
    iconColor: "text-brand-secondary",
    highlights: [
      ".64 EMR (40% better than industry)",
      "3+ years without time-loss injury",
      "OSHA VPP Star designation",
      "Multiple AGC-WA Top EMR Awards",
    ],
    stat: ".64 EMR",
    statLabel: "Safety Rating",
  },
  {
    icon: "workspace_premium",
    title: "150+ Years Experience",
    subtitle: "Proven Excellence",
    description:
      "Our team brings deep expertise across all construction disciplines—refined through decades of successful projects. We leverage proven methods refined through generations of construction excellence.",
    iconColor: "text-brand-secondary",
    highlights: [
      "150+ years combined team experience",
      "Expertise across all disciplines",
      "Proven methods & best practices",
      "Continuous learning & innovation",
    ],
    stat: "150+",
    statLabel: "Years Combined Experience",
  },
  {
    icon: "visibility",
    title: "Transparent Honesty",
    subtitle: "No Surprises Partnership",
    description:
      "Open-book pricing, honest timelines, and constant communication. You control it, we manage it—full visibility into every decision. Our commitment to honesty means no hidden costs, ever.",
    iconColor: "text-brand-secondary",
    highlights: [
      "Open-book pricing & budgets",
      "Real-time project updates",
      "Complete cost transparency",
      "Honest timelines & expectations",
    ],
    stat: "100%",
    statLabel: "Transparency Promise",
  },
  {
    icon: "handshake",
    title: "Partnership-Driven Trust",
    subtitle: "Beyond Project Completion",
    description:
      "Our partnership doesn't end when construction finishes. 70% of our business comes from referrals and repeat client partners—testament to lasting partnerships that become lifelong community connections built on trust, not transactions.",
    iconColor: "text-brand-secondary",
    highlights: [
      "70% referral & repeat business",
      "Lifelong partnership commitment",
      "Post-project support & service",
      "Community-focused relationships",
    ],
    stat: "70%",
    statLabel: "Referral Business",
  },
  {
    icon: "military_tech",
    title: "Reliability",
    subtitle: "Veteran-Trained Dependability",
    description:
      "Army veteran leadership brings military discipline, attention to detail, and calm decision-making under pressure. We deliver reliable results no matter the challenges, backed by service-earned integrity.",
    iconColor: "text-brand-secondary",
    highlights: [
      "Army veteran-owned since Jan 2025",
      "Military precision & discipline",
      "Calm under pressure leadership",
      "Service-earned integrity values",
    ],
    stat: "Veteran",
    statLabel: "Owned & Operated",
  },
  {
    icon: "verified_user",
    title: "Licensed & Insured",
    subtitle: "Multi-State Capabilities",
    description:
      "Fully licensed general contractor across Washington, Oregon, and Idaho. Comprehensive insurance coverage and bonding provide peace of mind for every project phase.",
    iconColor: "text-brand-secondary",
    highlights: [
      "Licensed in WA, OR, and ID",
      "Full insurance & bonding",
      "Compliant with all regulations",
      "Regular credential updates",
    ],
    stat: "3 States",
    statLabel: "Licensed Coverage",
  },
];

export function WhyPartnerSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 dark:from-brand-primary-dark dark:via-gray-900 dark:to-gray-950 py-12 sm:py-16 lg:py-24 xl:py-32 text-white overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.1)_0%,transparent_50%)]"></div>
      <div className="top-20 left-10 absolute bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-secondary/15 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-secondary/30 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                <MaterialIcon
                  icon="handshake"
                  size="2xl"
                  className="text-white"
                />
              </div>
            </div>
          </div>
          <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-3 sm:mb-4 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              The MH Partnership
            </span>
            <span className="block text-white font-black drop-shadow-lg">
              Difference
            </span>
          </h2>

          <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Experience the collaborative approach where veteran values and
            genuine partnership create extraordinary results.
          </p>

          {/* Core Philosophy Tagline */}
          <div className="mt-6 sm:mt-8 mb-3 sm:mb-4">
            <p className="mx-auto max-w-4xl font-bold text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed tracking-wide px-2">
              "Building projects for the client,{" "}
              <span className="font-black italic text-bronze-300 text-xl sm:text-2xl md:text-3xl">
                NOT
              </span>{" "}
              the dollar"
            </p>
          </div>
        </div>

        {/* Core Partnership Values - Interactive Flip Cards */}
        <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-16">
          {partnershipValues.map((value, _index) => (
            <div
              key={_index}
              className="group perspective-1000 scroll-reveal h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px]"
              style={{ animationDelay: `${_index * 0.1}s` }}
            >
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col h-full bg-white/10 backdrop-blur-md shadow-lg hover:shadow-2xl p-5 sm:p-6 md:p-7 lg:p-8 border border-white/30 rounded-3xl transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Gradient Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-80 rounded-3xl"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex-1 flex flex-col justify-center min-h-0">
                        {/* Enhanced Icon Container */}
                        <div className="relative inline-block mb-4 sm:mb-5 mx-auto flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/40 to-brand-secondary-dark/40 blur-xl rounded-3xl"></div>
                          <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-2xl w-16 h-16 sm:w-20 sm:h-20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <MaterialIcon
                              icon={value.icon}
                              size="xl"
                              className="text-white"
                            />
                          </div>
                        </div>
                        <h3 className="mb-2 sm:mb-3 font-black text-white text-lg sm:text-xl md:text-2xl tracking-tight leading-tight break-words px-2 flex-shrink-0 text-center">
                          {value.title}
                        </h3>
                        <p className="mb-3 sm:mb-4 text-brand-secondary text-sm sm:text-base font-semibold break-words px-2 flex-shrink-0 text-center">
                          {value.subtitle}
                        </p>
                        <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed break-words px-2 flex-shrink-0 text-center">
                          {value.description.split(".")[0]}.
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/30">
                        <div className="flex items-center justify-center gap-2 text-brand-secondary">
                          <MaterialIcon
                            icon="autorenew"
                            size="md"
                            className="animate-spin-slow group-hover:animate-spin"
                          />
                          <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                            <span className="hidden sm:inline">
                              Hover for details
                            </span>
                            <span className="sm:hidden">Tap for details</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Card - Detailed highlights and stats */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="h-full rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-2xl p-5 sm:p-6 md:p-7 lg:p-8 overflow-hidden">
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20 rounded-3xl"></div>

                    <div className="relative flex flex-col h-full">
                      {/* Stat Highlight */}
                      <div className="flex-shrink-0 mb-4">
                        <div className="inline-block bg-white/20 backdrop-blur-sm p-3 rounded-2xl mb-3 mx-auto">
                          <MaterialIcon
                            icon={value.icon}
                            size="lg"
                            className="text-white"
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-secondary mb-1">
                            {value.stat}
                          </div>
                          <div className="text-xs sm:text-sm text-brand-secondary/90 font-semibold uppercase tracking-wider">
                            {value.statLabel}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex-1 min-h-0 mb-4">
                        <p className="text-xs sm:text-sm md:text-base text-white/95 leading-relaxed break-words text-center">
                          {value.description}
                        </p>
                      </div>

                      {/* Highlights List - Top 3 only */}
                      <div className="flex-shrink-0">
                        <h4 className="text-xs sm:text-sm font-bold text-brand-secondary uppercase tracking-wider mb-2 text-center">
                          Key Highlights
                        </h4>
                        <div className="space-y-1.5">
                          {value.highlights
                            .slice(0, 3)
                            .map((highlight, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-white/95"
                              >
                                <MaterialIcon
                                  icon="check_circle"
                                  className="text-brand-secondary flex-shrink-0 mt-0.5 text-xs"
                                />
                                <span className="text-xs sm:text-sm leading-snug break-words">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary/90 text-brand-primary font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
            >
              <MaterialIcon icon="foundation" size="sm" />
              Our Foundation
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg border-2 border-white/30 transition-all duration-300 text-base sm:text-lg"
            >
              <MaterialIcon icon="handshake" size="sm" />
              Begin Your Project
            </Link>
          </div>
          <p className="mt-6 text-white/70 text-sm sm:text-base">
            Experience our six core values in action. Call us at{" "}
            <a
              href="tel:+15093086489"
              className="text-brand-secondary hover:text-brand-secondary/80 font-semibold transition-colors"
            >
              (509) 308-6489
            </a>
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-secondary/20 to-transparent"></div>
      </div>
    </section>
  );
}
