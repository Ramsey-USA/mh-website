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
import { ServiceCard } from "./ServiceCard";
import type { CoreService } from "./servicesData";

interface CoreServicesSectionProps {
  services: CoreService[];
}

export function CoreServicesSection({ services }: CoreServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Memoize the selected service data
  const currentService = useMemo(
    () => (selectedService !== null ? services[selectedService] : null),
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
      id="core-services"
      header={{
        icon: "flag",
        iconVariant: "primary",
        subtitle: "Core Partnership",
        title: "Services",
        description: (
          <>
            Comprehensive{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              partnership-focused management services
            </span>{" "}
            designed to bring your vision to life through collaboration and{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              disciplined execution
            </span>
            .
          </>
        ),
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
          panelClassName="max-w-3xl rounded-3xl border-0 dark:bg-gray-800"
          contentClassName="p-0"
          renderHeader={({ titleId, onClose }) => (
            <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-6 sm:p-8 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:bg-white/20 active:bg-white/30 rounded-full p-2.5 sm:p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl hover:scale-110 z-10"
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
                <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/30">
                  <MaterialIcon
                    icon={currentService.iconName}
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
                <div className="flex-1 pt-1">
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
            <div className="mb-6">
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
                {currentService.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
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
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MaterialIcon
                  icon="stars"
                  size="lg"
                  className="text-brand-secondary"
                />
                <h3 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">
                  Partnership Benefits
                </h3>
              </div>
              <ul className="space-y-3">
                {currentService.benefits.map((benefit, bIndex) => (
                  <li
                    key={bIndex}
                    className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
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
              <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 p-4 rounded-xl border-l-4 border-brand-primary mb-6">
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
                <Link href={currentService.ctaLink} className="flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full group/btn"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="md"
                      className="mr-2 group-hover/btn:translate-x-1 transition-transform"
                    />
                    {currentService.ctaLinkText || "Learn More"}
                  </Button>
                </Link>
              )}
              <Link href="/contact" className="flex-1">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full group/btn"
                >
                  <MaterialIcon
                    icon="handshake"
                    size="md"
                    className="mr-2 group-hover/btn:scale-110 transition-transform"
                  />
                  Begin Partnership
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </BrandedContentSection>
  );
}
