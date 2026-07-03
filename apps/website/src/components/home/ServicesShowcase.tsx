"use client";

import { useState, useCallback, useMemo, type CSSProperties } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import { gridPresets } from "@/lib/styles/layout-variants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import { trackServiceInterest } from "@/lib/analytics/marketing-tracking";
import { useLocale } from "@/hooks/useLocale";
import en from "@/../messages/home/en.json";
import es from "@/../messages/home/es.json";
import { cornerRadius, hoverMotion } from "@/lib/styles/design-tokens";

const ServicesDetailModal = dynamic(
  () =>
    import("@/components/ui/modals/Modal").then((mod) => ({
      default: mod.Modal,
    })),
  { ssr: false },
);

// Helper function to render subtitle with styled "NOT"
function renderSubtitle(subtitle: string) {
  if (subtitle.includes("NOT")) {
    const parts = subtitle.split("NOT");
    return (
      <>
        {parts[0]}
        <span className="font-black italic text-bronze-600 dark:text-bronze-400">
          NOT
        </span>
        {parts[1]}
      </>
    );
  }
  return subtitle;
}

const serviceIcons = [
  {
    icon: "engineering",
    iconGradient: "from-brand-primary via-brand-primary-dark to-primary-800",
    iconGlow: "from-brand-primary/30 to-brand-primary-dark/30",
  },
  {
    icon: "map",
    iconGradient: "from-brand-secondary via-bronze-600 to-bronze-700",
    iconGlow: "from-brand-secondary/30 to-bronze-600/30",
  },
  {
    icon: "build",
    iconGradient: "from-bronze-600 via-bronze-700 to-bronze-800",
    iconGlow: "from-bronze-600/30 to-bronze-800/30",
  },
  {
    icon: "inventory_2",
    iconGradient: "from-primary-600 via-primary-700 to-primary-800",
    iconGlow: "from-primary-600/30 to-primary-800/30",
  },
  {
    icon: "construction",
    iconGradient:
      "from-brand-secondary via-brand-secondary-dark to-secondary-700",
    iconGlow: "from-brand-secondary/30 to-brand-secondary-dark/30",
  },
  {
    icon: "domain",
    iconGradient: "from-brand-primary via-primary-600 to-brand-primary-dark",
    iconGlow: "from-brand-primary/30 to-primary-600/30",
  },
];

type ServicePathId =
  | "all"
  | "plan-control"
  | "build-expand"
  | "modernize-spaces";

type ServiceFocusId =
  | "all"
  | "ag-winery"
  | "public-sector"
  | "procurement"
  | "industrial"
  | "occupied-ti"
  | "rapid-ti";

function getServiceFunnelMeta(title: string): {
  path: Exclude<ServicePathId, "all">;
  focus: Exclude<ServiceFocusId, "all">;
} {
  const normalized = title.toLowerCase();

  if (normalized.includes("ag") || normalized.includes("winery")) {
    return { path: "build-expand", focus: "ag-winery" };
  }

  if (normalized.includes("municipal")) {
    return { path: "plan-control", focus: "public-sector" };
  }

  if (normalized.includes("procurement") || normalized.includes("trade")) {
    return { path: "plan-control", focus: "procurement" };
  }

  if (normalized.includes("industrial")) {
    return { path: "build-expand", focus: "industrial" };
  }

  if (
    normalized.includes("commercial tenant") ||
    normalized.includes("espacios activos")
  ) {
    return { path: "modernize-spaces", focus: "occupied-ti" };
  }

  return { path: "modernize-spaces", focus: "rapid-ti" };
}

function getServiceLaneHref(title: string) {
  const { path, focus } = getServiceFunnelMeta(title);

  return `/?utm_source=homepage&utm_medium=modal&utm_campaign=services-funnel&utm_content=path-${path}_focus-${focus}#services`;
}

/**
 * Services Showcase Section
 * Interactive cards with modal details for core construction services
 * Optimized with keyboard navigation, body scroll lock, and performance enhancements
 */
export function ServicesShowcase({
  sectionVariant = "white",
  className = "",
  maxVisibleCards,
}: {
  sectionVariant?: "white" | "gray";
  className?: string;
  maxVisibleCards?: number;
}) {
  const locale = useLocale();
  const t = locale === "es" ? es.services : en.services;
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<
    string | null
  >(null);
  const [selectedPath, setSelectedPath] = useState<ServicePathId>("all");
  const [selectedFocus, setSelectedFocus] = useState<ServiceFocusId>("all");
  const [showAllServices, setShowAllServices] = useState(false);

  const trackFunnelInteraction = useCallback(
    (
      interaction:
        | "path_select"
        | "focus_select"
        | "reset_filters"
        | "modal_open",
      properties?: Record<string, unknown>,
    ) => {
      trackServiceInterest("Services Funnel", "click", {
        location: "homepage-showcase",
        interaction,
        path: selectedPath,
        focus: selectedFocus,
        ...properties,
      });
    },
    [selectedPath, selectedFocus],
  );

  // Build services array from translations with icon metadata
  const services = useMemo(
    () =>
      (t.items || []).map((item, index) => ({
        ...item,
        icon: serviceIcons[index]?.icon || "engineering",
        iconGradient:
          serviceIcons[index]?.iconGradient ||
          "from-brand-primary via-brand-primary-dark to-primary-800",
        iconGlow:
          serviceIcons[index]?.iconGlow ||
          "from-brand-primary/30 to-brand-primary-dark/30",
        funnel: getServiceFunnelMeta(item.title),
        link: getServiceLaneHref(item.title),
      })),
    [t.items],
  );

  const pathOptions = useMemo(
    () => [
      { id: "all" as ServicePathId, label: t.funnel.pathOptions.all },
      {
        id: "plan-control" as ServicePathId,
        label: t.funnel.pathOptions.planControl,
      },
      {
        id: "build-expand" as ServicePathId,
        label: t.funnel.pathOptions.buildExpand,
      },
      {
        id: "modernize-spaces" as ServicePathId,
        label: t.funnel.pathOptions.modernizeSpaces,
      },
    ],
    [
      t.funnel.pathOptions.all,
      t.funnel.pathOptions.planControl,
      t.funnel.pathOptions.buildExpand,
      t.funnel.pathOptions.modernizeSpaces,
    ],
  );

  const filteredByPath = useMemo(
    () =>
      selectedPath === "all"
        ? services
        : services.filter((service) => service.funnel.path === selectedPath),
    [services, selectedPath],
  );

  const focusOptions = useMemo(() => {
    const focusLabels: Record<ServiceFocusId, string> = {
      all: t.funnel.focusOptions.all,
      "ag-winery": t.funnel.focusOptions.agWinery,
      "public-sector": t.funnel.focusOptions.publicSector,
      procurement: t.funnel.focusOptions.procurement,
      industrial: t.funnel.focusOptions.industrial,
      "occupied-ti": t.funnel.focusOptions.occupiedTi,
      "rapid-ti": t.funnel.focusOptions.rapidTi,
    };

    const availableFocuses = new Set<ServiceFocusId>(["all"]);

    for (const service of filteredByPath) {
      availableFocuses.add(service.funnel.focus);
    }

    const orderedFocuses: ServiceFocusId[] = [
      "all",
      "ag-winery",
      "public-sector",
      "procurement",
      "industrial",
      "occupied-ti",
      "rapid-ti",
    ];

    return orderedFocuses
      .filter((focus) => availableFocuses.has(focus))
      .map((focus) => ({ id: focus, label: focusLabels[focus] }));
  }, [filteredByPath, t.funnel.focusOptions]);

  const filteredServices = useMemo(
    () =>
      selectedFocus === "all"
        ? filteredByPath
        : filteredByPath.filter(
            (service) => service.funnel.focus === selectedFocus,
          ),
    [filteredByPath, selectedFocus],
  );

  const hasActiveFilters = selectedPath !== "all" || selectedFocus !== "all";

  const handlePathSelection = useCallback(
    (nextPath: ServicePathId) => {
      const nextFocus: ServiceFocusId = "all";

      if (nextPath === selectedPath && nextFocus === selectedFocus) {
        return;
      }

      const matchedCount = services.filter(
        (service) => nextPath === "all" || service.funnel.path === nextPath,
      ).length;

      setSelectedPath(nextPath);
      setSelectedFocus(nextFocus);
      setShowAllServices(false);

      trackFunnelInteraction("path_select", {
        nextPath,
        nextFocus,
        matchedCount,
      });
    },
    [selectedPath, selectedFocus, services, trackFunnelInteraction],
  );

  const handleFocusSelection = useCallback(
    (nextFocus: ServiceFocusId) => {
      if (nextFocus === selectedFocus) {
        return;
      }

      const matchedCount =
        nextFocus === "all"
          ? filteredByPath.length
          : filteredByPath.filter(
              (service) => service.funnel.focus === nextFocus,
            ).length;

      setSelectedFocus(nextFocus);
      setShowAllServices(false);

      trackFunnelInteraction("focus_select", {
        nextPath: selectedPath,
        nextFocus,
        matchedCount,
      });
    },
    [filteredByPath, selectedFocus, selectedPath, trackFunnelInteraction],
  );

  const resetFilters = useCallback(
    (origin: "manual" | "empty_state") => {
      if (!hasActiveFilters) {
        return;
      }

      trackFunnelInteraction("reset_filters", {
        origin,
        previousPath: selectedPath,
        previousFocus: selectedFocus,
      });

      setSelectedPath("all");
      setSelectedFocus("all");
      setShowAllServices(false);
    },
    [hasActiveFilters, selectedFocus, selectedPath, trackFunnelInteraction],
  );

  const visibleLimit =
    typeof maxVisibleCards === "number" ? Math.max(1, maxVisibleCards) : null;

  const visibleServices = useMemo(() => {
    if (visibleLimit === null || showAllServices) {
      return filteredServices;
    }

    return filteredServices.slice(0, visibleLimit);
  }, [filteredServices, showAllServices, visibleLimit]);

  const hasHiddenServices =
    visibleLimit !== null && filteredServices.length > visibleLimit;
  const revealServicesLabel =
    locale === "es"
      ? `Ver los ${filteredServices.length} servicios`
      : `View all ${filteredServices.length} services`;
  const collapseServicesLabel =
    locale === "es" ? "Mostrar menos" : "Show fewer";

  // Memoize the selected service data to prevent unnecessary recalculations
  const currentService = useMemo(
    () =>
      selectedServiceTitle === null
        ? null
        : services.find((service) => service.title === selectedServiceTitle) ||
          null,
    [selectedServiceTitle, services],
  );

  const showcaseContactHref = useMemo(() => {
    const base =
      "/contact?utm_source=homepage&utm_medium=modal&utm_campaign=services-umbrella";

    if (!currentService) {
      return `${base}&utm_content=services-showcase`;
    }

    const slug = currentService.title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return `${base}&utm_content=${slug}`;
  }, [currentService]);

  // Close modal handler
  const closeModal = useCallback(() => {
    setSelectedServiceTitle(null);
  }, []);

  // Open modal handler
  const openModal = useCallback(
    (title: string) => {
      setSelectedServiceTitle(title);
      trackFunnelInteraction("modal_open", {
        serviceName: title,
      });
    },
    [trackFunnelInteraction],
  );

  return (
    <BrandedContentSection
      id="services"
      variant={sectionVariant}
      className={className}
      header={{
        icon: "explore",
        iconVariant: "bronze",
        subtitle: t.sectionSubtitle,
        title: t.sectionTitle,
        description: (
          <>
            {locale === "es" ? (
              t.sectionDescription
            ) : (
              <>
                Understand each delivery lane from{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  preconstruction planning
                </span>{" "}
                through active build and{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  close-out
                </span>
                .
              </>
            )}
          </>
        ),
      }}
    >
      <div className="mb-8 sm:mb-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-6">
        <div className="space-y-5">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {t.funnel.helperText}
          </p>

          <div>
            <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              {t.funnel.pathStepLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {pathOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handlePathSelection(option.id)}
                  aria-pressed={selectedPath === option.id}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    selectedPath === option.id
                      ? "bg-brand-primary text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              {t.funnel.focusStepLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleFocusSelection(option.id)}
                  aria-pressed={selectedFocus === option.id}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    selectedFocus === option.id
                      ? "bg-brand-secondary text-gray-900"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <p
            className="text-sm text-gray-700 dark:text-gray-300"
            aria-live="polite"
          >
            {t.funnel.resultsLabel.replace(
              "{count}",
              String(filteredServices.length),
            )}
          </p>

          {hasActiveFilters ? (
            <div>
              <button
                type="button"
                onClick={() => resetFilters("manual")}
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t.funnel.resetFilters}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-center">
          <h3 className="text-xl font-black text-gray-900 dark:text-white">
            {t.funnel.noResultsTitle}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {t.funnel.noResultsDescription}
          </p>
          <button
            type="button"
            onClick={() => resetFilters("empty_state")}
            className="mt-4 inline-flex items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-white hover:bg-brand-primary-dark transition-colors"
          >
            {t.funnel.resetFilters}
          </button>
        </div>
      ) : null}

      {/* Service Cards Grid */}
      <div className={gridPresets.cards3("md")}>
        {visibleServices.map((service, index) => (
          <button
            type="button"
            key={service.title}
            className="scroll-reveal cursor-pointer text-left bg-transparent border-0 p-0"
            style={{ "--delay": `${index * 0.1}s` } as CSSProperties}
            onClick={() => {
              trackServiceInterest(service.title, "click", {
                location: "homepage-showcase",
                position: index + 1,
                path: selectedPath,
                focus: selectedFocus,
              });
              openModal(service.title);
            }}
            aria-label={`${t.viewDetailsAriaPrefix} ${service.title}`}
          >
            <Card
              className={`flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-secondary/20 border border-gray-200 dark:border-gray-700 ${cornerRadius.card} h-full transition-all duration-300 p-6 sm:p-8 overflow-hidden group hover:scale-[1.02]`}
            >
              <div className="relative flex flex-col h-full">
                <CardHeader className="shrink-0 pb-4 px-0">
                  {/* Enhanced Icon Container */}
                  <div className="relative inline-block mb-4 sm:mb-5 shrink-0">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${service.iconGlow} blur-xl ${cornerRadius.card}`}
                    ></div>
                    <div
                      className={`relative flex justify-center items-center bg-linear-to-br ${service.iconGradient} ${cornerRadius.icon} w-16 h-16 sm:w-20 sm:h-20 shadow-xl ${hoverMotion.iconSubtle}`}
                    >
                      <MaterialIcon
                        icon={service.icon}
                        size="xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <CardTitle className="mb-2 sm:mb-3 text-gray-900 dark:text-white text-xl sm:text-2xl font-black leading-tight wrap-break-word">
                    {service.title}
                  </CardTitle>
                  <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base wrap-break-word">
                    {renderSubtitle(service.subtitle)}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col grow pt-0 px-0">
                  <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed wrap-break-word">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4 sm:pt-5">
                    <div
                      className={`relative overflow-hidden ${cornerRadius.element} bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 border border-gray-200 dark:border-gray-600 group-hover:border-brand-primary dark:group-hover:border-brand-primary-light transition-all duration-300`}
                    >
                      {/* Animated background gradient on hover */}
                      <div className="absolute inset-0 bg-linear-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4">
                        <MaterialIcon
                          icon="info"
                          size="md"
                          className="text-brand-primary dark:text-brand-primary-light group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                        />
                        <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-700 dark:text-gray-200 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                          {t.clickForDetails}
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="text-brand-primary dark:text-brand-primary-light group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {hasHiddenServices ? (
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllServices((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-3 text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-expanded={showAllServices}
            aria-controls="services"
          >
            <MaterialIcon
              icon={showAllServices ? "expand_less" : "expand_more"}
              size="sm"
              className="text-current"
              ariaLabel=""
            />
            {showAllServices ? collapseServicesLabel : revealServicesLabel}
          </button>
        </div>
      ) : null}

      {/* Service Detail Modal */}
      {currentService && (
        <ServicesDetailModal
          isOpen={true}
          onClose={closeModal}
          title={currentService.title}
          size="xl"
          showVeteranBadge={false}
          backdropAriaLabel={t.closeDetailsBackdropAria}
          panelClassName="max-w-3xl rounded-3xl border-0 dark:bg-gray-800"
          contentClassName="p-0"
          renderHeader={({ titleId, onClose }) => (
            <div
              className={`relative bg-linear-to-br ${currentService.iconGradient} p-6 sm:p-8 text-white`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-black/10 to-black/20"></div>
              <button
                onClick={onClose}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:bg-white/20 active:bg-white/30 ${cornerRadius.full} p-2.5 sm:p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl hover:scale-110 z-10`}
                aria-label={t.closeModalAria}
                type="button"
                autoFocus
              >
                <MaterialIcon
                  icon="close"
                  size="xl"
                  className="drop-shadow-md"
                />
              </button>
              <div className="relative flex items-start gap-4">
                <div
                  className={`shrink-0 bg-white/20 backdrop-blur-sm p-4 ${cornerRadius.icon} shadow-xl border border-white/30`}
                >
                  <MaterialIcon
                    icon={currentService.icon}
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3
                    id={titleId}
                    className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2"
                  >
                    {currentService.title}
                  </h3>
                  <p className="text-brand-secondary text-base sm:text-lg lg:text-xl font-semibold">
                    {renderSubtitle(currentService.subtitle)}
                  </p>
                </div>
              </div>
            </div>
          )}
        >
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              {currentService.description}
            </p>

            {/* What's Included */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 ${cornerRadius.element} mr-3`}
                >
                  <MaterialIcon
                    icon="checklist"
                    size="lg"
                    className="text-brand-primary dark:text-brand-primary-light"
                  />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                  {t.whatsIncluded}
                </h4>
              </div>
              <ul className="space-y-3 ml-13">
                {currentService.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="shrink-0 mt-1 mr-3 text-brand-primary dark:text-brand-primary-light"
                      size="md"
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Benefits */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 bg-brand-secondary/10 dark:bg-brand-secondary/20 ${cornerRadius.element} mr-3`}
                >
                  <MaterialIcon
                    icon="stars"
                    size="lg"
                    className="text-brand-secondary dark:text-brand-secondary-light"
                  />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                  {t.keyBenefits}
                </h4>
              </div>
              <ul className="space-y-3 ml-13">
                {currentService.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <MaterialIcon
                      icon="military_tech"
                      className="shrink-0 mt-1 mr-3 text-brand-secondary dark:text-brand-secondary-light"
                      size="md"
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href={currentService.link} className="flex-1">
                <Button variant="primary" className="w-full group/btn">
                  <MaterialIcon
                    icon="arrow_forward"
                    size="md"
                    className="mr-2 group-hover/btn:translate-x-1 transition-transform"
                  />
                  {currentService.cta || t.learnMoreFallback}
                </Button>
              </Link>
              <Link href={showcaseContactHref} className="flex-1">
                <Button variant="secondary" className="w-full group/btn">
                  <MaterialIcon
                    icon="mail"
                    size="md"
                    className="mr-2 group-hover/btn:scale-110 transition-transform"
                  />
                  {t.contactCta}
                </Button>
              </Link>
            </div>
          </div>
        </ServicesDetailModal>
      )}
    </BrandedContentSection>
  );
}
