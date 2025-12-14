"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { SectionHeader } from "@/components/ui/SectionHeader";

const partnershipValues = [
  {
    icon: "emoji_events",
    title: ".64 EMR - Zero-Incident Mission Culture",
    subtitle: "Safety Protocols That Protect Every Team Member",
    description:
      "Multiple AGC-WA Top EMR Awards with .64 EMR—40% better than industry average. Military-grade safety discipline: 3+ years without time-loss injury and OSHA VPP Star designation. Every crew member returns home safe—that's the mission, every single day. No compromises on safety, period.",
    iconColor: "text-bronze-600",
    iconBgGradient: "from-bronze-600 to-bronze-700",
    accentColor: "bronze-500",
    highlights: [
      ".64 EMR (40% better than industry)",
      "3+ years without time-loss injury",
      "OSHA VPP Star designation",
      "Military-grade safety protocols",
    ],
    stat: ".64 EMR",
    statLabel: "Safety Rating",
  },
  {
    icon: "workspace_premium",
    title: "150+ Years of Combined Field Experience",
    subtitle: "Battle-Tested Construction Expertise",
    description:
      "Our team brings 150+ years of combined construction expertise—Army thoroughness in planning, Navy reliability in execution, Air Force precision in quality control, Marine adaptability under pressure. Veterans and civilians working together, leveraging proven methods refined through generations. From deployment to development—we've got the operational experience.",
    iconColor: "text-brand-primary",
    iconBgGradient: "from-brand-primary to-brand-primary-dark",
    accentColor: "brand-primary",
    highlights: [
      "150+ years combined expertise",
      "Veteran + civilian team excellence",
      "All-branch military precision",
      "Multi-generational battle-tested practices",
    ],
    stat: "150+",
    statLabel: "Years Combined Experience",
  },
  {
    icon: "visibility",
    title: "SITREP-Level Transparency",
    subtitle: "Clear Intel, Zero Surprises",
    description:
      "Open-book pricing like mission briefs—complete intel on every cost, every timeline, every decision. You control the mission, we execute it with full visibility. Military-trained honesty means real-time SITREPs, no hidden costs, and truthful assessments at every construction phase. Your word is your bond—so is ours.",
    iconColor: "text-brand-secondary",
    iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
    accentColor: "brand-secondary",
    highlights: [
      "Open-book pricing (mission-level clarity)",
      "Real-time project SITREPs",
      "Complete cost transparency",
      "Honest timelines & expectations",
    ],
    stat: "100%",
    statLabel: "Transparency Promise",
  },
  {
    icon: "handshake",
    title: "Long-Term Partnerships (Not One-Time Deployments)",
    subtitle: "Relationships That Outlast Projects",
    description:
      "70% of our business comes from referrals and repeat Client Partners—that's trust earned through action, not words. Our commitment doesn't end when the project completes. From post-deployment support to lifelong community connections—we're in it for the long haul, building relationships that matter. THE ROI IS THE RELATIONSHIP.",
    iconColor: "text-bronze-600",
    iconBgGradient: "from-bronze-600 to-bronze-800",
    accentColor: "bronze-500",
    highlights: [
      "70% referral & repeat business",
      "Lifelong partnership commitment",
      "Post-deployment support & service",
      "Community-focused relationships",
    ],
    stat: "70%",
    statLabel: "Referral Business",
  },
  {
    icon: "military_tech",
    title: "650+ Successful Missions - Battle-Tested Reliability",
    subtitle: "Proven Track Record Under Pressure",
    description:
      "650+ successfully completed construction operations demonstrate service-earned reliability. Veteran leadership brings military discipline, tactical planning under pressure, and mission-first execution. Whether it's a routine build or urgent construction support—we deliver results no matter the challenges. Reliability trained in service, proven in construction.",
    iconColor: "text-brand-primary",
    iconBgGradient: "from-brand-primary to-brand-primary-dark",
    accentColor: "brand-primary",
    highlights: [
      "650+ completed construction missions",
      "Veteran-owned since Jan 2025",
      "All-branch military precision",
      "Service-earned integrity values",
    ],
    stat: "650+",
    statLabel: "Successful Missions",
  },
  {
    icon: "verified_user",
    title: "3-State Operational Authority",
    subtitle: "Licensed for Multi-Jurisdiction Deployment",
    description:
      "Fully licensed general contractor across Washington, Oregon, and Idaho—cleared for construction operations throughout the Pacific Northwest. Comprehensive insurance coverage and bonding provide mission-ready protection for every project phase. Credentials maintained with military precision—continuous compliance, zero compromises.",
    iconColor: "text-brand-secondary",
    iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
    accentColor: "brand-secondary",
    highlights: [
      "Licensed in WA, OR, and ID",
      "Full insurance & bonding coverage",
      "Federal compliance assurance",
      "Military-grade credential maintenance",
    ],
    stat: "3 States",
    statLabel: "Operational Authority",
  },
];

export function WhyPartnerSection() {
  return (
    <section
      id="why-partner"
      className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28 xl:py-36 overflow-hidden"
    >
      {/* Unique Diagonal Stripe Background Pattern */}
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
        {/* Enhanced Section Header with Side Accents */}
        <SectionHeader
          icon="verified"
          iconVariant="primary"
          subtitle="Battle-Tested Excellence | All Branches Honored"
          title="Mission-Ready Performance & Service-Earned Integrity"
          description="Where military precision meets construction expertise—honest mission briefs, battle-tested craftsmanship, and service-earned integrity create partnerships built on trust. From basic training to contractor, we speak your language."
        >
          {/* Core Philosophy Callout */}
          <div className="inline-block">
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
        </SectionHeader>

        {/* Modern Grid Cards with Unique Hover Effects */}
        <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {partnershipValues.map((value, index) => (
            <div key={index} className="group relative flex min-h-[620px]">
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
        <FadeInWhenVisible>
          <div className="relative">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-2xl -z-10"></div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 sm:p-10 md:p-12 text-center shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                  Ready to Experience the{" "}
                  <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                    MH Difference?
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                  Join hundreds of satisfied client partners who've experienced
                  our four core values in action.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6">
                <Link
                  href="/about"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 text-base sm:text-lg"
                >
                  <MaterialIcon
                    icon="foundation"
                    size="md"
                    className="group-hover:rotate-12 transition-transform"
                  />
                  Our Oath
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                </Link>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-brand-secondary to-bronze-badge-600 hover:from-bronze-badge-600 hover:to-brand-secondary text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 text-base sm:text-lg"
                >
                  <MaterialIcon
                    icon="handshake"
                    size="md"
                    className="group-hover:scale-110 transition-transform"
                  />
                  Begin Your Project
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                </Link>
              </div>

              {/* Contact Info with Stylized Design */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 border-t-2 border-gray-300 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark p-2.5 rounded-lg">
                    <MaterialIcon
                      icon="phone"
                      className="text-white"
                      size="md"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Call Us Today
                    </div>
                    <a
                      href="tel:+15093086489"
                      className="text-brand-primary dark:text-brand-primary-light hover:text-brand-primary-dark font-bold text-lg transition-colors"
                    >
                      (509) 308-6489
                    </a>
                  </div>
                </div>
                <div className="hidden sm:block h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    650+ projects
                  </span>{" "}
                  built on trust
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
