"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

const partnershipValues = [
  {
    icon: "emoji_events",
    title: "Award-Winning Safety",
    subtitle: ".6 EMR Excellence",
    description:
      "Multiple AGC-WA Top EMR Awards with .6 EMR—40% better than industry average. 3+ years without time-loss injury and OSHA VPP Star designation demonstrate our unwavering commitment to zero-incident workplace culture.",
    iconColor: "text-brand-secondary",
    highlights: [
      ".6 EMR (40% better than industry)",
      "3+ years without time-loss injury",
      "OSHA VPP Star designation",
      "Multiple AGC-WA Top EMR Awards",
    ],
    stat: ".6 EMR",
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
    title: "Owner-Focused Transparency",
    subtitle: "No Surprises Partnership",
    description:
      "Open-book pricing, honest timelines, and constant communication. You control it, we manage it—full visibility into every decision. Veteran integrity means no hidden costs, ever.",
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
    title: "Veteran-Fueled Reliability",
    subtitle: "Military Precision Meets Construction",
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
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-gray-900 py-8 sm:py-12 lg:py-16 text-white">
      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center scroll-reveal">
          <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
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
              "Building for the Client,{" "}
              <span className="font-black text-bronze-300 text-xl sm:text-2xl md:text-3xl">
                NOT
              </span>{" "}
              the Dollar"
            </p>
          </div>
        </div>

        {/* Core Partnership Values - Interactive Flip Cards */}
        <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
          {partnershipValues.map((value, _index) => (
            <div key={_index} className="group h-80 sm:h-96 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-between bg-white/10 backdrop-blur-sm p-6 sm:p-8 border border-white/20 rounded-lg sm:rounded-xl h-full">
                    <div>
                      <div className="mb-4">
                        <MaterialIcon
                          icon={value.icon}
                          size="xl"
                          className={`drop-shadow-lg ${value.iconColor || "text-white"}`}
                        />
                      </div>
                      <h3 className="font-black text-white text-xl sm:text-2xl lg:text-3xl tracking-tight leading-tight mb-2 break-words">
                        {value.title}
                      </h3>
                      <p className="text-brand-secondary text-sm sm:text-base font-semibold mb-4">
                        {value.subtitle}
                      </p>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed break-words">
                        {value.description.split(".")[0]}.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                      <MaterialIcon icon="touch_app" size="sm" />
                      <span className="hidden sm:inline">
                        Hover for details
                      </span>
                      <span className="sm:hidden">Tap for details</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card - Detailed highlights and stats */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="h-full rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-primary/95 via-brand-accent/95 to-gray-900/95 p-6 sm:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {/* Stat Highlight */}
                    <div className="mb-6 text-center">
                      <div className="text-4xl sm:text-5xl font-bold text-brand-secondary mb-1">
                        {value.stat}
                      </div>
                      <div className="text-sm sm:text-base text-brand-secondary/80 font-medium">
                        {value.statLabel}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-white/90 mb-6 leading-relaxed break-words">
                      {value.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-brand-secondary uppercase tracking-wider mb-3">
                        Key Highlights
                      </h4>
                      {value.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-white/90"
                        >
                          <MaterialIcon
                            icon="check_circle"
                            className="text-brand-secondary flex-shrink-0 mt-0.5"
                            size="sm"
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
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary/90 text-brand-primary font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
            >
              <MaterialIcon icon="info" size="sm" />
              Learn More About Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg border-2 border-white/30 transition-all duration-300 text-base sm:text-lg"
            >
              <MaterialIcon icon="handshake" size="sm" />
              Start a Partnership
            </Link>
          </div>
          <p className="mt-6 text-white/70 text-sm sm:text-base">
            Ready to experience the difference? Call us at{" "}
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
