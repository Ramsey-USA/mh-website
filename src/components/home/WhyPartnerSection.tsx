"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates";
import { useLocale } from "@/hooks/useLocale";
import en from "@/../messages/en.json";
import es from "@/../messages/es.json";

const partnershipIcons = [
  {
    icon: "health_and_safety",
    iconColor: "text-bronze-600",
    iconBgGradient: "from-bronze-600 to-bronze-700",
    accentColor: "bronze-500",
  },
  {
    icon: "workspace_premium",
    iconColor: "text-brand-primary",
    iconBgGradient: "from-brand-primary to-brand-primary-dark",
    accentColor: "brand-primary",
  },
  {
    icon: "fact_check",
    iconColor: "text-brand-secondary",
    iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
    accentColor: "brand-secondary",
  },
  {
    icon: "handshake",
    iconColor: "text-bronze-600",
    iconBgGradient: "from-bronze-600 to-bronze-800",
    accentColor: "bronze-500",
  },
  {
    icon: "military_tech",
    iconColor: "text-bronze-300",
    themePreset: "veteran",
    iconBgGradient: "from-brand-primary to-brand-primary-dark",
    accentColor: "brand-primary",
  },
  {
    icon: "verified",
    iconColor: "text-brand-secondary",
    iconBgGradient: "from-brand-secondary to-brand-secondary-dark",
    accentColor: "brand-secondary",
  },
];

type WhyPartnerValue = {
  title: string;
  stat?: string;
  statLabel: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accentColor?: string;
};

export function WhyPartnerSection() {
  const locale = useLocale();
  const t = locale === "es" ? es.home.whyPartner : en.home.whyPartner;
  return (
    <BrandedContentSection
      id="why-partner"
      header={{
        icon: "verified",
        iconVariant: "primary",
        subtitle: t.sectionSubtitle,
        title: t.sectionTitle,
        description: (
          <>
            {locale === "es" ? (
              t.sectionDescription
            ) : (
              <>
                Where{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  discipline meets construction expertise
                </span>
                —honest communication, proven craftsmanship, and{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  earned integrity
                </span>{" "}
                create partnerships built on trust.
              </>
            )}
          </>
        ),
      }}
    >
      {/* Core Philosophy Callout */}
      <div className="flex justify-center mb-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-xl">
            <p className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
              {locale === "es" ? (
                t.philosophy
              ) : (
                <>
                  "Building projects for the Client,{" "}
                  <span className="font-black italic text-bronze-700 dark:text-bronze-400 text-xl sm:text-2xl md:text-3xl">
                    NOT
                  </span>{" "}
                  the dollar"
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Modern Grid Cards with Unique Hover Effects */}
      <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {(t.values || []).map((value: WhyPartnerValue, idx: number) => {
          const iconData = partnershipIcons[idx] ?? partnershipIcons[0]!;
          return (
            <div
              key={value.title}
              className="group relative flex h-full min-h-[520px]"
            >
              {/* Colored Border Glow - Visible on hover */}
              <div
                className={`absolute -inset-2 bg-gradient-to-br ${iconData.iconBgGradient} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse`}
              ></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${iconData.iconBgGradient}`}
                ></div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Icon and Stat Section */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Enhanced Icon with Header Style */}
                    <div className="relative">
                      {/* Blur glow layer behind icon */}
                      <div
                        className={`absolute -inset-2 bg-gradient-to-br ${iconData.iconBgGradient} opacity-30 blur-lg rounded-2xl`}
                      ></div>
                      <div
                        className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${iconData.iconBgGradient} rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300`}
                      >
                        <MaterialIcon
                          icon={iconData.icon}
                          size="xl"
                          className="text-white drop-shadow-lg"
                          interactive
                          {...(iconData.themePreset && {
                            theme: iconData.themePreset as
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
                          iconData.accentColor === "bronze-500"
                            ? "text-bronze-700 dark:text-bronze-400"
                            : iconData.accentColor === "brand-secondary"
                              ? "text-brand-secondary-dark dark:text-brand-secondary-light"
                              : "text-brand-primary-dark dark:text-brand-primary-light"
                        }`}
                      >
                        {value.stat ?? ""}
                      </div>
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
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
                    {value.highlights
                      .slice(0, 3)
                      .map((highlight: string, hIdx: number) => (
                        <div key={hIdx} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${iconData.iconBgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
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
          );
        })}
      </StaggeredFadeIn>

      {/* Trade Partner CTA */}
      <div className="mt-4 flex justify-center">
        <div className="relative group max-w-2xl w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-50 group-hover:opacity-90 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-brand-secondary/30 dark:border-brand-secondary/40 shadow-xl px-8 py-5">
            <div className="flex items-center gap-3">
              <MaterialIcon
                icon="handshake"
                size="xl"
                className="text-brand-secondary flex-shrink-0"
                ariaLabel="Trade partners"
              />
              <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg leading-snug">
                Are you a trade contractor?{" "}
                <span className="text-brand-secondary font-bold">
                  Join our Ally network.
                </span>
              </p>
            </div>
            <Link
              href="/allies"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary hover:bg-brand-secondary-dark text-black font-bold rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl text-sm sm:text-base"
            >
              View Trade Partner Opportunities
              <MaterialIcon icon="arrow_forward" size="sm" ariaLabel="" />
            </Link>
          </div>
        </div>
      </div>
    </BrandedContentSection>
  );
}
