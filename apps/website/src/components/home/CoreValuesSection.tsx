"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import { CORE_VALUE_ICONS } from "@/lib/constants/navigation-icons";
import { cornerRadius, hoverMotion } from "@/lib/styles/design-tokens";
import type { SupportedLocale } from "@/lib/i18n/locale";
import en from "@/../messages/home/en.json";
import es from "@/../messages/home/es.json";

const coreValuesBase = [
  {
    value: "Honesty",
    icon: CORE_VALUE_ICONS.honesty,
    tagline: "Clear Communication Every Time",
    valueSlogan: "Truth in every touchpoint.",
    supportingSlogan: "Clear facts. No spin. No surprises.",
    description:
      "Full transparency-truthful assessments, open communication, honest intel. Upfront discussion of challenges and obstacles. Real-time updates on timeline or budget changes. Honest assessment when a project is not the right fit. Complete cost breakdown before starting. Straight talk, no jargon.",
    image: "/images/values/honesty.webp",
    videoWebm: "/videos/culture/flag_honesty_loop.webm",
    video: "/videos/culture/flag_honesty_loop.mp4",
    iconBg: "bg-brand-secondary",
    stats: "100% Transparent Pricing",
  },
  {
    value: "Integrity",
    icon: CORE_VALUE_ICONS.integrity,
    tagline: "Doing What's Right",
    valueSlogan: "Do right when no one is watching.",
    supportingSlogan: "Commitments kept under pressure.",
    description:
      "Strong ethics-doing what is right even when no one is watching. Using specified materials and methods without substitutions. Comprehensive warranties-we stand behind our work. Making decisions that benefit Client Partners, not just our bottom line. Following through on commitments even when circumstances change. No shortcuts, period.",
    image: "/images/values/integrity.webp",
    iconBg: "bg-primary-700",
    stats: "Unwavering Ethics",
  },
  {
    value: "Professionalism",
    icon: CORE_VALUE_ICONS.professionalism,
    tagline: "Excellence in Action",
    valueSlogan: "Prepared, precise, and respectful.",
    supportingSlogan: "Standards high on every site, every day.",
    description:
      "On time, prepared, and ready-zero excuses. Arriving on time and prepared. Clear communication in all interactions. Proper site management and organization. Treating your property with respect. Maintaining industry credentials and continuous improvement.",
    image: "/images/values/professionalism.webp",
    iconBg: "bg-brand-primary",
    stats: "Expert Service Standards",
  },
  {
    value: "Thoroughness",
    icon: CORE_VALUE_ICONS.thoroughness,
    tagline: "No Detail Left Behind",
    valueSlogan: "Every detail accounted for.",
    supportingSlogan: "Measure twice, document always, close out clean.",
    description:
      "Meticulous planning and execution-complete documentation, zero surprises. Detailed site analysis and planning. Precision measurements and calculations. Systematic quality checkpoints at every phase. Complete documentation with photo records. Comprehensive final review with detailed punch lists.",
    image: "/images/values/thoroughness.webp",
    iconBg: "bg-primary-600",
    stats: "Zero Details Missed",
  },
];

export function CoreValuesSection({
  sectionVariant = "white",
  className = "",
  animated = false,
  locale = "en",
  condensed = false,
}: {
  sectionVariant?: "white" | "gray";
  className?: string;
  animated?: boolean;
  locale?: SupportedLocale;
  condensed?: boolean;
}) {
  const t = locale === "es" ? es.coreValues : en.coreValues;
  const [expandedValues, setExpandedValues] = useState<Record<string, boolean>>(
    {},
  );

  const coreValues = coreValuesBase.map((item, i) => ({
    ...item,
    value: t.values[i]?.value ?? item.value,
    tagline: t.values[i]?.tagline ?? item.tagline,
    valueSlogan: t.values[i]?.valueSlogan ?? item.valueSlogan,
    supportingSlogan: t.values[i]?.supportingSlogan ?? item.supportingSlogan,
    description: t.values[i]?.description ?? item.description,
    stats: t.values[i]?.stats ?? item.stats,
  }));

  const readMoreLabel =
    locale === "es" ? "Leer estandar completo" : "Read full standard";
  const showLessLabel = locale === "es" ? "Mostrar menos" : "Show less";

  return (
    <BrandedContentSection
      id="core-values"
      variant={sectionVariant}
      className={className}
      animated={animated}
      header={{
        icon: "shield",
        iconVariant: "primary",
        subtitle: t.sectionSubtitle,
        title: t.sectionTitle,
        description: (
          <>
            {locale === "es" ? (
              t.sectionDescription
            ) : (
              <>
                These values set the standard for decisions on{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  scope, budget, and schedule
                </span>
                {" while protecting "}
                <span className="font-bold text-gray-900 dark:text-white">
                  quality and accountability
                </span>
                {"."}
              </>
            )}
          </>
        ),
      }}
    >
      <div
        className={
          condensed ? "space-y-8 lg:space-y-10" : "space-y-12 lg:space-y-16"
        }
      >
        {coreValues.map((item, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = Boolean(expandedValues[item.value]);
          return (
            <div
              key={item.value}
              className="scroll-reveal group"
              style={{ "--delay": `${index * 0.1}s` } as CSSProperties}
            >
              <div
                className={`flex flex-col lg:grid lg:grid-cols-2 bg-white dark:bg-gray-800 ${cornerRadius.card} shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300`}
              >
                <div
                  className={`relative ${condensed ? "h-52 sm:h-64 lg:h-full lg:min-h-96" : "h-64 sm:h-80 lg:h-full lg:min-h-125"} overflow-hidden ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {item.video ? (
                    <video
                      className={`absolute inset-0 h-full w-full object-cover ${hoverMotion.imageZoom}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/videos/culture/poster-flag_honesty_loop.jpg"
                      aria-hidden="true"
                    >
                      {item.videoWebm ? (
                        <source src={item.videoWebm} type="video/webm" />
                      ) : null}
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={item.image}
                      alt={`${item.value} - ${item.tagline}`}
                      fill
                      className={hoverMotion.imageZoom}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      quality={75}
                      priority={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent lg:bg-linear-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"></div>

                  <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                    <div className="relative inline-block">
                      <div
                        className={`absolute inset-0 bg-linear-to-br from-brand-primary/30 to-brand-secondary/30 blur-xl ${cornerRadius.icon}`}
                      ></div>
                      <div
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${item.iconBg} ${cornerRadius.icon} flex items-center justify-center shadow-xl`}
                      >
                        <MaterialIcon
                          icon={item.icon}
                          size="xl"
                          className="text-white"
                          interactive
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 sm:p-7 ${condensed ? "lg:p-8" : "lg:p-10"} flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    className={
                      condensed
                        ? "space-y-3 lg:space-y-4"
                        : "space-y-4 lg:space-y-5"
                    }
                  >
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-gray-100 text-xl sm:text-2xl leading-tight tracking-tight mb-2">
                        {item.value}
                      </h3>
                      <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base">
                        {item.tagline}
                      </p>
                      <p className="mt-2 font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-relaxed">
                        {item.valueSlogan}
                      </p>
                      <p className="mt-1 font-medium text-brand-primary/90 dark:text-brand-primary-light/90 text-xs sm:text-sm leading-relaxed">
                        {item.supportingSlogan}
                      </p>
                    </div>

                    <div className="relative">
                      <p
                        className={`font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-base leading-relaxed ${
                          condensed && !isExpanded
                            ? "max-h-20 overflow-hidden"
                            : ""
                        }`}
                      >
                        {item.description}
                      </p>
                      {condensed && !isExpanded ? (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-transparent to-white dark:to-gray-800" />
                      ) : null}
                    </div>

                    {condensed ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedValues((prev) => ({
                            ...prev,
                            [item.value]: !prev[item.value],
                          }))
                        }
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <MaterialIcon
                          icon={isExpanded ? "expand_less" : "expand_more"}
                          size="sm"
                          className="text-current"
                          ariaLabel=""
                        />
                        {isExpanded ? showLessLabel : readMoreLabel}
                      </button>
                    ) : null}

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div
                        className={`flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 ${cornerRadius.element} shrink-0`}
                      >
                        <MaterialIcon
                          icon="analytics"
                          size="md"
                          className="text-brand-primary dark:text-brand-primary-light"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          {t.keyMetric}
                        </p>
                        <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-gray-100">
                          {item.stats}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BrandedContentSection>
  );
}
