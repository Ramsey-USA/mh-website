/**
 * Core Services Section
 * Displays the main services offered with modal details
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates";
import { gridPresets } from "@/lib/styles/layout-variants";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/modals/Modal";
import {
  cornerRadius,
  hoverMotion,
  transitionDuration,
} from "@/lib/styles/design-tokens";
import { ServiceCard } from "./ServiceCard";
import type { CoreService } from "./servicesData";

interface CoreServicesSectionProps {
  services: CoreService[];
  title: string;
  subtitle: string;
  description: string;
}

export function CoreServicesSection(props: Readonly<CoreServicesSectionProps>) {
  const { services, title, subtitle, description } = props;
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Memoize the selected service data
  const currentService = useMemo(() => {
    if (selectedService === null) {
      return null;
    }

    return services[selectedService];
  }, [selectedService, services]);

  // Close modal handler
  const closeModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  // Open modal handler
  const openModal = useCallback((index: number) => {
    setSelectedService(index);
  }, []);

  const contactHref = useMemo(() => {
    const base =
      "/contact?utm_source=services&utm_medium=modal&utm_campaign=service-detail";

    if (!currentService) {
      return `${base}&utm_content=core-service`;
    }

    const slug = currentService.title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return `${base}&utm_content=${slug}`;
  }, [currentService]);

  return (
    <BrandedContentSection
      id="core-services"
      header={{
        icon: "flag",
        iconVariant: "primary",
        subtitle,
        title,
        description,
      }}
    >
      <StaggeredFadeIn
        className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            onOpenModal={() => openModal(index)}
          />
        ))}
      </StaggeredFadeIn>

      {/* Service Detail Modal */}
      {currentService && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title={currentService.title}
          size="xl"
          showVeteranBadge={false}
          backdropAriaLabel="Close core service details modal"
          panelClassName={`max-w-3xl ${cornerRadius.card} border border-brand-primary/20 bg-white dark:bg-gray-800 shadow-2xl`}
          contentClassName="p-0"
          renderHeader={({ titleId, onClose }) => (
            <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-6 sm:p-8 text-white">
              <div className="absolute inset-0 bg-linear-to-br from-black/10 to-black/20"></div>
              <button
                onClick={onClose}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:bg-white/20 active:bg-white/30 ${cornerRadius.full} p-2.5 sm:p-3 transition-all ${transitionDuration.fast} focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl z-10 ${hoverMotion.button}`}
                aria-label="Close modal"
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
                    icon={currentService.iconName}
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
                <div className="flex-1 pt-1">
                  <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
                    Core Service Detail
                  </p>
                  <h2
                    id={titleId}
                    className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-2 drop-shadow-lg"
                  >
                    {currentService.title}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base font-semibold drop-shadow-md">
                    {currentService.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )}
        >
          <div className="p-6 sm:p-8 max-h-[calc(90vh-200px)] overflow-y-auto">
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              {currentService.description}
            </p>

            {/* Features */}
            <div
              className={`mb-6 ${cornerRadius.icon} border border-brand-primary/20 bg-brand-primary/5 dark:bg-brand-primary/10 p-5`}
            >
              <div className="flex items-center gap-2 mb-4">
                <MaterialIcon
                  icon="checklist"
                  size="lg"
                  className="text-brand-primary"
                />
                <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">
                  What's Included
                </h3>
              </div>
              <ul className="space-y-3">
                {currentService.features.map((feature) => (
                  <li
                    key={`${currentService.title}-feature-${feature}`}
                    className={`flex items-start gap-3 ${hoverMotion.translateUpLarge}`}
                  >
                    <div
                      className={`shrink-0 w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 ${cornerRadius.small} flex items-center justify-center mt-0.5 ${hoverMotion.iconSubtle}`}
                    >
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div
              className={`mb-6 ${cornerRadius.icon} border border-brand-secondary/20 bg-brand-secondary/5 dark:bg-brand-secondary/10 p-5`}
            >
              <div className="flex items-center gap-2 mb-4">
                <MaterialIcon
                  icon="military_tech"
                  size="lg"
                  className="text-brand-secondary"
                />
                <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">
                  Benefits
                </h3>
              </div>
              <ul className="space-y-3">
                {currentService.benefits.map((benefit) => (
                  <li
                    key={`${currentService.title}-benefit-${benefit}`}
                    className={`flex items-start gap-3 ${hoverMotion.translateUpLarge}`}
                  >
                    <div
                      className={`shrink-0 w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 ${cornerRadius.small} flex items-center justify-center mt-0.5 ${hoverMotion.iconSubtle}`}
                    >
                      <MaterialIcon
                        icon="military_tech"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Text */}
            {currentService.ctaText && (
              <div
                className={`bg-linear-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 p-4 ${cornerRadius.element} border border-brand-primary/30 mb-6`}
              >
                <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  <MaterialIcon
                    icon="phone"
                    size="sm"
                    className="inline mr-2 text-brand-primary"
                  />
                  {currentService.ctaText}
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {currentService.ctaLink && (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full group"
                  asChild
                >
                  <Link href={currentService.ctaLink} className="flex-1">
                    <MaterialIcon
                      icon="arrow_forward"
                      size="md"
                      className={`mr-2 ${hoverMotion.iconSubtle}`}
                    />
                    {currentService.ctaLinkText || "Learn More"}
                  </Link>
                </Button>
              )}
              <Button
                variant="secondary"
                size="lg"
                className="w-full group"
                asChild
              >
                <Link href={contactHref} className="flex-1">
                  <MaterialIcon
                    icon="handshake"
                    size="md"
                    className={`mr-2 ${hoverMotion.iconSubtle}`}
                  />
                  Begin Partnership
                </Link>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </BrandedContentSection>
  );
}
