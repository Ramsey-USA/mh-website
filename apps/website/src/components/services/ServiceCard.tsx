"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { IconContainer, GlowEffect, Card } from "@/components/ui";
import type { CoreService } from "./servicesData";

interface ServiceCardProps {
  service: CoreService;
  onOpenModal: () => void;
}

export function ServiceCard(props: Readonly<ServiceCardProps>) {
  const { service, onOpenModal } = props;
  const cardId = service.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <button
      id={cardId}
      className="group cursor-pointer relative flex h-full"
      onClick={onOpenModal}
      type="button"
      aria-label={`View details for ${service.title}`}
    >
      {/* Animated Border Glow */}
      <GlowEffect gradient="primary-dark" />

      <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        {/* Top Accent Bar */}
        <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

        <div className="relative p-6 sm:p-8 flex flex-col flex-1">
          <div className="shrink-0 pb-4 text-center">
            <div className="relative inline-block mb-6">
              {/* Blur glow layer behind icon */}
              <GlowEffect
                gradient="primary-dark"
                opacity={30}
                animate={false}
                className="rounded-2xl"
              />
              <IconContainer
                size="lg"
                gradient="primary"
                shape="rounded"
                className="group-hover:rotate-3"
              >
                <MaterialIcon
                  icon={service.iconName}
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </IconContainer>
            </div>
            <h3 className="mb-3 text-gray-900 dark:text-white text-xl sm:text-2xl font-black leading-tight wrap-break-word">
              {service.title}
            </h3>
            <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base wrap-break-word mb-4">
              {service.subtitle}
            </p>
          </div>
          <div className="relative flex flex-col grow">
            {/* Key highlights - simplified preview */}
            <div className="mb-6 space-y-2">
              {service.features.slice(0, 3).map((feature) => (
                <div
                  key={`${service.title}-${feature}`}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                >
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-brand-primary shrink-0"
                  />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
              {service.features.length > 3 && (
                <p className="text-xs text-brand-primary dark:text-brand-primary-light font-semibold italic">
                  +{service.features.length - 3} more features...
                </p>
              )}
            </div>

            {/* Click for details indicator */}
            <div className="mt-auto pt-4 border-t border-brand-primary/20 dark:border-brand-primary/30 group-hover:border-brand-primary dark:group-hover:border-brand-primary-light transition-colors duration-300">
              <div className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-linear-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:via-brand-primary/10 group-hover:to-brand-primary/5 transition-all duration-300">
                <MaterialIcon
                  icon="info"
                  size="md"
                  className="text-brand-primary dark:text-brand-primary-light group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                />
                <span className="font-bold text-sm uppercase tracking-wider text-gray-700 dark:text-gray-200 group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors duration-300">
                  Click for Full Details
                </span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="text-brand-primary dark:text-brand-primary-light group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}
