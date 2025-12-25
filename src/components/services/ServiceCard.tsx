"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { CoreService } from "./servicesData";

interface ServiceCardProps {
  service: CoreService;
  onOpenModal: () => void;
}

export function ServiceCard({ service, onOpenModal }: ServiceCardProps) {
  const cardId = service.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      id={cardId}
      className="group cursor-pointer relative flex h-full"
      onClick={onOpenModal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenModal();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${service.title}`}
    >
      {/* Animated Border Glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
        {/* Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

        <div className="relative p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex-shrink-0 pb-4 text-center">
            <div className="relative inline-block mb-6">
              {/* Blur glow layer behind icon */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
              <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl w-20 h-20 p-2 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                <MaterialIcon
                  icon={service.iconName}
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <h3 className="mb-3 text-gray-900 dark:text-white text-xl sm:text-2xl font-black leading-tight break-words">
              {service.title}
            </h3>
            <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base break-words mb-4">
              {service.subtitle}
            </p>
          </div>
          <div className="relative flex flex-col flex-grow">
            {/* Key highlights - simplified preview */}
            <div className="mb-6 space-y-2">
              {service.features.slice(0, 3).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                >
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-brand-primary flex-shrink-0"
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
              <div className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:via-brand-primary/10 group-hover:to-brand-primary/5 transition-all duration-300">
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
      </div>
    </div>
  );
}
