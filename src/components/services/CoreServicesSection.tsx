/**
 * Core Services Section
 * Displays the main services offered with modal details
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
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

  // Handle escape key press and body scroll lock
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedService !== null) {
        closeModal();
      }
    };

    if (selectedService !== null) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedService, closeModal]);
  return (
    <section
      id="core-services"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Diagonal Stripe Background Pattern */}
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
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 via-brand-secondary/20 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary-dark p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="flag"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Core services"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          </div>

          {/* Two-line gradient heading */}
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Core Partnership
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Services
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Comprehensive{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              partnership-focused management services
            </span>{" "}
            designed to bring your vision to life through collaboration and{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              military precision
            </span>
            .
          </p>
        </div>

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
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => {
              // Only close if clicking the backdrop itself
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                closeModal();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="document"
            >
              {/* Header with gradient background */}
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-6 sm:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
                <button
                  onClick={closeModal}
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
                      id="modal-title"
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

              {/* Content */}
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
