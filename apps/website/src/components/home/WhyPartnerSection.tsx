"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import type { SupportedLocale } from "@/lib/i18n/locale";
import en from "../../../../../messages/home/en.json";
import es from "../../../../../messages/home/es.json";

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

interface WhyPartnerSectionProps {
  sectionVariant?: "white" | "gray";
  locale?: SupportedLocale;
  className?: string;
  condensed?: boolean;
  condensedVisibleCount?: number;
  headerSubtitle?: string;
  headerTitle?: string;
  headerDescription?: ReactNode;
  headerSize?: "display" | "section";
}

export function WhyPartnerSection({
  sectionVariant = "white",
  locale = "en",
  className = "",
  condensed = false,
  condensedVisibleCount = 4,
  headerSubtitle,
  headerTitle,
  headerDescription,
  headerSize = "display",
}: WhyPartnerSectionProps) {
  const t = locale === "es" ? es.whyPartner : en.whyPartner;
  const [showAllStandards, setShowAllStandards] = useState(false);
  const visibleCount = Math.max(1, condensedVisibleCount);
  const valuesToRender = useMemo(() => {
    if (!condensed || showAllStandards) {
      return t.values || [];
    }

    return (t.values || []).slice(0, visibleCount);
  }, [condensed, showAllStandards, t.values, visibleCount]);
  const hasHiddenValues = condensed && (t.values || []).length > visibleCount;

  const revealButtonLabel =
    locale === "es"
      ? `Ver los ${(t.values || []).length} estandares`
      : `View all ${(t.values || []).length} standards`;
  const collapseButtonLabel = locale === "es" ? "Mostrar menos" : "Show fewer";

  return (
    <BrandedContentSection
      id="why-partner"
      variant={sectionVariant}
      className={className}
      headerSize={headerSize}
      header={{
        icon: "verified",
        iconVariant: "primary",
        subtitle: headerSubtitle ?? t.sectionSubtitle,
        title: headerTitle ?? t.sectionTitle,
        description:
          headerDescription ??
          (locale === "es" ? (
            t.sectionDescription
          ) : (
            <>
              Review the operating standards behind every{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                project stakeholder relationship
              </span>
              : safety leadership, transparent process controls, and{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                measurable reliability
              </span>{" "}
              across every phase.
            </>
          )),
      }}
    >
      {/* Core Philosophy Callout */}
      <div className="flex justify-center mb-10 sm:mb-12">
        <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="font-body font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
            {t.philosophy}
          </p>
        </div>
      </div>

      {/* Modern Grid Cards with Unique Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-10 sm:mb-12">
        {valuesToRender.map((value: WhyPartnerValue, idx: number) => {
          const iconData = partnershipIcons[idx] ?? partnershipIcons[0]!;
          const displayStat = resolveDisplayStat(value);
          const statAccentClass = getStatAccentClass(iconData.accentColor);
          const subtitleAccentClass = getSubtitleAccentClass(
            iconData.accentColor,
          );
          return (
            <div key={value.title} className="group relative flex h-full">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 shadow-lg transition-colors duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div
                  className={`h-1 bg-linear-to-r ${iconData.iconBgGradient}`}
                ></div>

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  {/* Icon and Stat Section */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 bg-linear-to-br ${iconData.iconBgGradient} rounded-xl shadow-md border border-white/40 dark:border-gray-700/50`}
                    >
                      <MaterialIcon
                        icon={iconData.icon}
                        size="lg"
                        className="text-white"
                        interactive
                        {...(iconData.themePreset && {
                          theme: iconData.themePreset as
                            "veteran" | "military" | "tactical" | "default",
                        })}
                      />
                    </div>
                    <div className="text-right">
                      {displayStat ? (
                        <div
                          className={`text-3xl sm:text-4xl font-black ${statAccentClass}`}
                        >
                          {displayStat}
                        </div>
                      ) : null}
                      <div className="font-heading text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
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
                  <div className="relative mb-5 flex-1">
                    <p
                      className={`font-body text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed ${
                        condensed && !showAllStandards
                          ? "max-h-20 overflow-hidden"
                          : ""
                      }`}
                    >
                      {value.description}
                    </p>
                    {condensed && !showAllStandards ? (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-transparent to-white dark:to-gray-800" />
                    ) : null}
                  </div>

                  {/* Key Highlights with Custom Icons */}
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    {value.highlights.slice(0, 3).map((highlight: string) => (
                      <div
                        key={`${value.title}-${highlight}`}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`mt-0.5 shrink-0 w-5 h-5 rounded-full bg-linear-to-br ${iconData.iconBgGradient} flex items-center justify-center`}
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

      {hasHiddenValues ? (
        <div className="mb-10 sm:mb-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllStandards((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-3 text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-expanded={showAllStandards}
            aria-controls="why-partner"
          >
            <MaterialIcon
              icon={showAllStandards ? "expand_less" : "expand_more"}
              size="sm"
              className="text-current"
              ariaLabel=""
            />
            {showAllStandards ? collapseButtonLabel : revealButtonLabel}
          </button>
        </div>
      ) : null}

      {/* Trade Partner CTA */}
      <div className="mt-2 flex justify-center">
        <div className="max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg px-8 py-5">
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
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary hover:bg-brand-secondary-dark text-black font-bold rounded-xl shadow-md transition-colors text-sm sm:text-base"
          >
            {t.tradeCta.button}
            <MaterialIcon icon="arrow_forward" size="sm" ariaLabel="" />
          </Link>
        </div>
      </div>
    </BrandedContentSection>
  );
}
