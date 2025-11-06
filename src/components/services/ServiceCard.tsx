"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { CoreService } from "./servicesData";

interface ServiceCardProps {
  service: CoreService;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const cardId = service.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      key={index}
      id={cardId}
      className="group perspective h-[500px] cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side - Overview */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl h-full shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
            <CardHeader className="flex-shrink-0 pb-4">
              <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16 p-2">
                <MaterialIcon
                  icon={service.iconName}
                  size="xl"
                  className="text-brand-primary"
                />
              </div>
              <CardTitle className="mb-3 text-gray-900 dark:text-white text-xl sm:text-2xl font-black leading-tight">
                {service.title}
              </CardTitle>
              <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base">
                {service.subtitle}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0">
              <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center text-brand-secondary dark:text-brand-secondary-light">
                  <MaterialIcon
                    icon="autorenew"
                    size="md"
                    className="mr-2 animate-pulse"
                  />
                  <span className="text-xs sm:text-sm font-medium">
                    Hover to see details
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Side - Detailed Information */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card className="flex flex-col bg-gradient-to-br from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-gray-900 border border-brand-primary dark:border-brand-primary/50 rounded-3xl h-full shadow-xl p-6 overflow-hidden">
            <CardHeader className="flex-shrink-0 pb-3">
              <div className="flex items-center mb-3">
                <MaterialIcon
                  icon={service.iconName}
                  className="mr-3 text-brand-secondary text-2xl sm:text-3xl"
                />
                <CardTitle className="text-white text-lg sm:text-xl font-black leading-tight">
                  {service.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0 overflow-y-auto">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <MaterialIcon
                    icon="checklist"
                    className="mr-2 text-brand-secondary text-lg"
                  />
                  <p className="font-bold text-white text-sm sm:text-base">
                    What's Included:
                  </p>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start text-xs sm:text-sm"
                    >
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary text-base sm:text-lg"
                      />
                      <span className="text-white leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <MaterialIcon
                    icon="stars"
                    className="mr-2 text-brand-secondary text-lg"
                  />
                  <p className="font-bold text-white text-sm sm:text-base">
                    Partnership Benefits:
                  </p>
                </div>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex items-start text-xs sm:text-sm"
                    >
                      <MaterialIcon
                        icon="military_tech"
                        className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary text-base sm:text-lg"
                      />
                      <span className="text-white leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Text */}
              {service.ctaText && (
                <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm mt-auto p-3 border-brand-secondary border-l-4 rounded-lg">
                  <p className="font-medium text-white text-xs sm:text-sm leading-relaxed">
                    <MaterialIcon
                      icon="phone"
                      size="sm"
                      className="inline mr-2 text-brand-secondary"
                    />
                    {service.ctaText}
                  </p>
                </div>
              )}

              {/* CTA Link Button */}
              {service.ctaLink && (
                <Link
                  href={service.ctaLink}
                  className="flex-shrink-0 bg-brand-secondary hover:bg-brand-secondary-dark mt-auto p-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center text-white">
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="mr-2"
                    />
                    <span className="font-bold text-xs sm:text-sm">
                      {service.ctaLinkText || "Learn More"}
                    </span>
                  </div>
                </Link>
              )}

              <div className="flex items-center justify-center mt-4 text-brand-secondary">
                <MaterialIcon
                  icon="autorenew"
                  className="mr-2 text-lg sm:text-xl"
                />
                <span className="font-medium text-xs">Hover to return</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
