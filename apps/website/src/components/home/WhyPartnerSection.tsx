import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import type { SupportedLocale } from "@/lib/i18n/locale";
import en from "@/../messages/home/en.json";
import es from "@/../messages/home/es.json";

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

function resolveDisplayStat(value: WhyPartnerValue): string {
  const explicitStat = value.stat?.trim();
  if (explicitStat) {
    return explicitStat;
  }

  // Fallback to the title prefix when copy uses "<metric> - <statement>" format.
  const [titlePrefix] = value.title.split(" - ");
  if (titlePrefix && titlePrefix !== value.title) {
    return titlePrefix.trim();
  }

  const numericMatch = value.title.match(/\d+(?:\.\d+)?\+?%?/);
  return numericMatch?.[0] ?? "";
}

function getStatAccentClass(accentColor?: string): string {
  if (accentColor === "bronze-500") {
    return "text-bronze-700 dark:text-bronze-400";
  }

  if (accentColor === "brand-secondary") {
    return "text-brand-secondary-dark dark:text-brand-secondary-light";
  }

  return "text-brand-primary-dark dark:text-brand-primary-light";
}

function getSubtitleAccentClass(accentColor?: string): string {
  if (accentColor === "bronze-500") {
    return "text-bronze-700 dark:text-bronze-300";
  }

  if (accentColor === "brand-secondary") {
    return "text-brand-secondary-dark dark:text-brand-secondary";
  }

  return "text-brand-primary-dark dark:text-brand-primary";
}

export function WhyPartnerSection({
  sectionVariant = "white",
  locale = "en",
  className = "",
}: {
  sectionVariant?: "white" | "gray";
  locale?: SupportedLocale;
  className?: string;
}) {
  const t = locale === "es" ? es.whyPartner : en.whyPartner;
  return (
    <BrandedContentSection
      id="why-partner"
      variant={sectionVariant}
      className={className}
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
                Review the operating standards behind every{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  client partnership
                </span>
                : safety leadership, transparent process controls, and{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  measurable reliability
                </span>{" "}
                across every phase.
              </>
            )}
          </>
        ),
      }}
    >
      {/* Core Philosophy Callout */}
      <div className="flex justify-center mb-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-3xl blur-sm opacity-40 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <p className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
              {t.philosophy}
            </p>
          </div>
        </div>
      </div>

      {/* Modern Grid Cards with Unique Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {(t.values || []).map((value: WhyPartnerValue, idx: number) => {
          const iconData = partnershipIcons[idx] ?? partnershipIcons[0]!;
          const displayStat = resolveDisplayStat(value);
          const statAccentClass = getStatAccentClass(iconData.accentColor);
          const subtitleAccentClass = getSubtitleAccentClass(
            iconData.accentColor,
          );
          return (
            <div
              key={value.title}
              className="group relative flex h-full min-h-130"
            >
              {/* Colored Border Glow - Visible on hover */}
              <div
                className={`absolute -inset-1 bg-linear-to-br ${iconData.iconBgGradient} rounded-3xl opacity-15 group-hover:opacity-35 blur-lg transition-all duration-500`}
              ></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/40 dark:group-hover:border-brand-primary/50 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div
                  className={`h-1 bg-linear-to-r ${iconData.iconBgGradient}`}
                ></div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Icon and Stat Section */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Enhanced Icon with Header Style */}
                    <div className="relative">
                      {/* Blur glow layer behind icon */}
                      <div
                        className={`absolute -inset-2 bg-linear-to-br ${iconData.iconBgGradient} opacity-30 blur-lg rounded-2xl`}
                      ></div>
                      <div
                        className={`relative inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${iconData.iconBgGradient} rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300`}
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
                      {displayStat ? (
                        <div
                          className={`text-3xl sm:text-4xl font-black group-hover:scale-105 transition-transform duration-300 ${statAccentClass}`}
                        >
                          {displayStat}
                        </div>
                      ) : null}
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
                    className={`mb-4 text-sm sm:text-base font-semibold ${subtitleAccentClass}`}
                  >
                    {value.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mb-6 text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed flex-1">
                    {value.description}
                  </p>

                  {/* Key Highlights with Custom Icons */}
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    {value.highlights.slice(0, 3).map((highlight: string) => (
                      <div
                        key={`${value.title}-${highlight}`}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`mt-0.5 shrink-0 w-5 h-5 rounded-full bg-linear-to-br ${iconData.iconBgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
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
      </div>

      {/* Trade Partner CTA */}
      <div className="mt-4 flex justify-center">
        <div className="relative group max-w-2xl w-full">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-secondary to-bronze-600 rounded-3xl blur-sm opacity-35 group-hover:opacity-65 transition duration-500" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg px-8 py-5">
            <div className="flex items-center gap-3">
              <MaterialIcon
                icon="handshake"
                size="xl"
                className="text-brand-secondary shrink-0"
                ariaLabel={t.tradeCta.iconAria}
              />
              <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg leading-snug">
                {t.tradeCta.prompt}{" "}
                <span className="text-brand-secondary font-bold">
                  {t.tradeCta.highlight}
                </span>
              </p>
            </div>
            <Link
              href="/allies"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary hover:bg-brand-secondary-dark text-black font-bold rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl text-sm sm:text-base"
            >
              {t.tradeCta.button}
              <MaterialIcon icon="arrow_forward" size="sm" ariaLabel="" />
            </Link>
          </div>
        </div>
      </div>
    </BrandedContentSection>
  );
}
