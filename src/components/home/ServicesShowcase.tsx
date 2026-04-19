"use client";

import { useState, useCallback, useMemo, type CSSProperties } from "react";
import Link from "next/link";
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
import { Modal } from "@/components/ui/modals/Modal";
import { useLocale } from "@/hooks/useLocale";
import en from "@/../messages/en.json";
import es from "@/../messages/es.json";

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

/**
 * Services Showcase Section
 * Interactive cards with modal details for core construction services
 * Optimized with keyboard navigation, body scroll lock, and performance enhancements
 */
export function ServicesShowcase() {
  const locale = useLocale();
  const t = locale === "es" ? es.home.services : en.home.services;
  const [selectedService, setSelectedService] = useState<number | null>(null);

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
        link: "/services",
      })),
    [t.items],
  );

  // Memoize the selected service data to prevent unnecessary recalculations
  const currentService = useMemo(
    () => (selectedService === null ? null : services[selectedService]),
    [selectedService, services],
  );

  // Close modal handler
  const closeModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  // Open modal handler
  const openModal = useCallback((index: number) => {
    setSelectedService(index);
  }, []);

  return (
    <BrandedContentSection
      id="services"
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
                From planning to completion, every project reflects our{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  core values
                </span>{" "}
                —honesty, integrity, professionalism, and{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  thoroughness
                </span>
                .
              </>
            )}
          </>
        ),
      }}
    >
      {/* Service Cards Grid */}
      <div className={gridPresets.cards3("md")}>
        {services.map((service, index) => (
          <button
            type="button"
            key={service.title}
            className="scroll-reveal cursor-pointer text-left bg-transparent border-0 p-0"
            style={{ "--delay": `${index * 0.1}s` } as CSSProperties}
            onClick={() => {
              trackServiceInterest(service.title, "click", {
                location: "homepage-showcase",
                position: index + 1,
              });
              openModal(index);
            }}
            aria-label={`${t.viewDetailsAriaPrefix} ${service.title}`}
          >
            <Card className="flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-secondary/20 border border-gray-200 dark:border-gray-700 rounded-3xl h-full transition-all duration-300 p-6 sm:p-7 lg:p-8 overflow-hidden group hover:scale-[1.02]">
              <div className="relative flex flex-col h-full">
                <CardHeader className="flex-shrink-0 pb-4 px-0">
                  {/* Enhanced Icon Container */}
                  <div className="relative inline-block mb-4 sm:mb-5 flex-shrink-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.iconGlow} blur-xl rounded-3xl`}
                    ></div>
                    <div
                      className={`relative flex justify-center items-center bg-gradient-to-br ${service.iconGradient} rounded-2xl w-16 h-16 sm:w-20 sm:h-20 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <MaterialIcon
                        icon={service.icon}
                        size="xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                  <CardTitle className="mb-2 sm:mb-3 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-black leading-tight break-words">
                    {service.title}
                  </CardTitle>
                  <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base break-words">
                    {renderSubtitle(service.subtitle)}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow pt-0 px-0">
                  <p className="mb-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4 sm:pt-5">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 border-2 border-gray-200 dark:border-gray-600 group-hover:border-brand-primary dark:group-hover:border-brand-primary-light transition-all duration-300">
                      {/* Animated background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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

      {/* Service Detail Modal */}
      {currentService && (
        <Modal
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
              className={`relative bg-gradient-to-br ${currentService.iconGradient} p-6 sm:p-8 text-white`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:bg-white/20 active:bg-white/30 rounded-full p-2.5 sm:p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl hover:scale-110 z-10"
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
                <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/30">
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
                <div className="flex items-center justify-center w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl mr-3">
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
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary dark:text-brand-primary-light"
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
                <div className="flex items-center justify-center w-10 h-10 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-xl mr-3">
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
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary dark:text-brand-secondary-light"
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
              <Link href="/contact" className="flex-1">
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
        </Modal>
      )}
    </BrandedContentSection>
  );
}
