"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
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
      className="group cursor-pointer"
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
      <Card className="relative bg-gradient-to-br from-white via-white to-brand-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary dark:hover:border-brand-primary-light h-full shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-2 rounded-3xl p-6 sm:p-8 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

        <CardHeader className="relative flex-shrink-0 pb-4 px-0 text-center">
          <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark mb-6 rounded-2xl w-20 h-20 p-2 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
            <MaterialIcon
              icon={service.iconName}
              size="2xl"
              className="text-white"
            />
          </div>
          <CardTitle className="mb-3 text-gray-900 dark:text-white text-xl sm:text-2xl font-black leading-tight break-words">
            {service.title}
          </CardTitle>
          <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base break-words mb-4">
            {service.subtitle}
          </p>
        </CardHeader>
        <CardContent className="relative flex flex-col flex-grow pt-0 px-0">
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
        </CardContent>
      </Card>
    </div>
  );
}
