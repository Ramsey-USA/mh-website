"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getCardClassName } from "@/lib/styles/card-variants";
import type { SpecialtyService } from "./servicesData";

interface SpecialtyServiceCardProps {
  service: SpecialtyService;
}

export function SpecialtyServiceCard({ service }: SpecialtyServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group h-full">
      <Card
        className={getCardClassName(
          "static",
          `rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer ${
            isExpanded ? "ring-2 ring-brand-secondary" : ""
          }`,
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${service.title} details`}
      >
        <CardHeader className="flex-shrink-0 pb-4 p-4 sm:p-5 lg:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 bg-brand-secondary/10 rounded-2xl w-12 h-12 sm:w-14 sm:h-14 p-2 flex items-center justify-center">
                <MaterialIcon
                  icon={service.iconName}
                  size="lg"
                  className="text-brand-secondary"
                />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="mb-2 text-gray-900 dark:text-white text-base sm:text-lg md:text-xl font-bold leading-tight break-words">
                  {service.title}
                </CardTitle>
                <p className="font-semibold text-brand-secondary dark:text-brand-secondary-light text-xs sm:text-sm break-words">
                  {service.subtitle}
                </p>
              </div>
            </div>
            <button
              className="flex-shrink-0 text-brand-secondary dark:text-brand-secondary-light hover:scale-110 transition-transform"
              aria-label={isExpanded ? "Collapse" : "Expand"}
              type="button"
            >
              <MaterialIcon
                icon={isExpanded ? "expand_less" : "expand_more"}
                size="xl"
                className="transition-transform duration-300"
              />
            </button>
          </div>
        </CardHeader>

        {!isExpanded && (
          <CardContent className="flex-grow pt-0 px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words line-clamp-3">
              {service.description}
            </p>
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center text-brand-secondary dark:text-brand-secondary-light">
                <MaterialIcon icon="info" size="sm" className="mr-2" />
                <span className="text-xs font-medium">
                  Click to view details
                </span>
              </div>
            </div>
          </CardContent>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <CardContent className="flex-grow pt-0 px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 animate-in slide-in-from-top duration-300 overflow-y-auto">
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words">
              {service.description}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {/* Markets List */}
              {service.markets && (
                <div className="bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center mb-2">
                    <MaterialIcon
                      icon="business"
                      className="mr-2 text-brand-secondary text-sm sm:text-base flex-shrink-0"
                    />
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                      Markets We Serve:
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {service.markets.map((market, mIndex) => (
                      <li key={mIndex} className="flex items-start text-xs">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-secondary text-xs sm:text-sm"
                        />
                        <span className="text-gray-700 dark:text-gray-300 leading-tight break-words">
                          {market}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Build Types List */}
              {service.buildTypes && (
                <div className="bg-brand-primary/5 dark:bg-brand-primary/10 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center mb-2">
                    <MaterialIcon
                      icon="construction"
                      className="mr-2 text-brand-primary text-sm sm:text-base flex-shrink-0"
                    />
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                      What We Build:
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {service.buildTypes.map((type, tIndex) => (
                      <li key={tIndex} className="flex items-start text-xs">
                        <MaterialIcon
                          icon="arrow_right"
                          className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-primary text-xs sm:text-sm"
                        />
                        <span className="text-gray-700 dark:text-gray-300 leading-tight break-words">
                          {type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features List */}
              {service.features && (
                <div className="bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center mb-2">
                    <MaterialIcon
                      icon="verified"
                      className="mr-2 text-brand-secondary text-sm sm:text-base flex-shrink-0"
                    />
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                      Key Features:
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-xs">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-secondary text-xs sm:text-sm"
                        />
                        <span className="text-gray-700 dark:text-gray-300 leading-tight break-words">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Capabilities List */}
              {service.capabilities && !service.markets && (
                <div className="bg-brand-primary/5 dark:bg-brand-primary/10 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center mb-2">
                    <MaterialIcon
                      icon="settings"
                      className="mr-2 text-brand-primary text-sm sm:text-base flex-shrink-0"
                    />
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                      Capabilities:
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {service.capabilities.map((cap, cIndex) => (
                      <li key={cIndex} className="flex items-start text-xs">
                        <MaterialIcon
                          icon="arrow_right"
                          className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-primary text-xs sm:text-sm"
                        />
                        <span className="text-gray-700 dark:text-gray-300 leading-tight break-words">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Note */}
              {service.note && (
                <div className="bg-brand-secondary/10 dark:bg-brand-secondary/20 p-3 border-l-4 border-brand-secondary rounded-md">
                  <p className="font-medium text-gray-700 dark:text-gray-300 text-xs leading-relaxed break-words">
                    <MaterialIcon
                      icon="info"
                      className="inline mr-1.5 text-brand-secondary text-xs sm:text-sm"
                    />
                    {service.note}
                  </p>
                </div>
              )}

              {/* CTA Text */}
              {service.ctaText && (
                <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 p-3 border-l-4 border-brand-primary rounded-md">
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-xs leading-relaxed break-words">
                    <MaterialIcon
                      icon="phone"
                      className="inline mr-1.5 text-brand-primary text-xs sm:text-sm"
                    />
                    {service.ctaText}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center text-brand-secondary dark:text-brand-secondary-light">
                <MaterialIcon icon="expand_less" size="sm" className="mr-2" />
                <span className="text-xs font-medium">Click to collapse</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
