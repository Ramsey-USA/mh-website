"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getCardClassName } from "@/lib/styles/card-variants";
import type { SpecialtyService } from "./servicesData";

interface SpecialtyServiceCardProps {
  service: SpecialtyService;
  index: number;
}

export function SpecialtyServiceCard({
  service,
  index,
}: SpecialtyServiceCardProps) {
  return (
    <div
      key={index}
      className="group perspective h-[450px] cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card
            className={getCardClassName(
              "static",
              "rounded-3xl shadow-lg hover:shadow-2xl duration-300 p-6",
            )}
          >
            <CardHeader className="flex-shrink-0 pb-4">
              <div className="flex justify-center items-center bg-brand-secondary/10 mb-4 rounded-2xl w-14 h-14 p-2">
                <MaterialIcon
                  icon={service.iconName}
                  size="lg"
                  className="text-brand-secondary"
                />
              </div>
              <CardTitle className="mb-2 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                {service.title}
              </CardTitle>
              <p className="font-semibold text-brand-secondary dark:text-brand-secondary-light text-sm">
                {service.subtitle}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0">
              <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center text-brand-secondary dark:text-brand-secondary-light">
                  <MaterialIcon
                    icon="autorenew"
                    size="sm"
                    className="mr-2 animate-pulse"
                  />
                  <span className="text-xs font-medium">Hover for details</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Side - Detailed Lists */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card className="flex flex-col bg-gradient-to-br from-brand-secondary to-brand-secondary-dark dark:from-brand-secondary-dark dark:to-gray-900 border border-brand-secondary dark:border-brand-secondary/50 rounded-3xl h-full shadow-xl p-6 overflow-hidden">
            <CardHeader className="flex-shrink-0 pb-3">
              <div className="flex items-center mb-3">
                <MaterialIcon
                  icon={service.iconName}
                  className="mr-2 text-white text-2xl"
                />
                <CardTitle className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                  {service.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow pt-0">
              <div className="flex-grow">
                {/* Markets List */}
                {service.markets && (
                  <>
                    <div className="flex items-center mb-2">
                      <MaterialIcon
                        icon="business"
                        className="mr-2 text-white text-base"
                      />
                      <p className="font-bold text-white text-xs sm:text-sm">
                        Markets We Serve:
                      </p>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {service.markets.map((market, mIndex) => (
                        <li key={mIndex} className="flex items-start text-xs">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-1.5 text-white text-sm"
                          />
                          <span className="text-white/90 leading-tight">
                            {market}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Build Types List */}
                {service.buildTypes && (
                  <>
                    <div className="flex items-center mb-2">
                      <MaterialIcon
                        icon="construction"
                        className="mr-2 text-white text-base"
                      />
                      <p className="font-bold text-white text-xs sm:text-sm">
                        What We Build:
                      </p>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {service.buildTypes.map((type, tIndex) => (
                        <li key={tIndex} className="flex items-start text-xs">
                          <MaterialIcon
                            icon="arrow_right"
                            className="flex-shrink-0 mt-0.5 mr-1.5 text-white text-sm"
                          />
                          <span className="text-white/90 leading-tight">
                            {type}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Features/Capabilities List */}
                {service.features && (
                  <>
                    <div className="flex items-center mb-2">
                      <MaterialIcon
                        icon="verified"
                        className="mr-2 text-white text-base"
                      />
                      <p className="font-bold text-white text-xs sm:text-sm">
                        Quality Materials:
                      </p>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-xs">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-1.5 text-white text-sm"
                          />
                          <span className="text-white/90 leading-tight">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {service.capabilities && !service.markets && (
                  <>
                    <div className="flex items-center mb-2">
                      <MaterialIcon
                        icon="settings"
                        className="mr-2 text-white text-base"
                      />
                      <p className="font-bold text-white text-xs sm:text-sm">
                        Capabilities:
                      </p>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {service.capabilities.map((cap, cIndex) => (
                        <li key={cIndex} className="flex items-start text-xs">
                          <MaterialIcon
                            icon="arrow_right"
                            className="flex-shrink-0 mt-0.5 mr-1.5 text-white text-sm"
                          />
                          <span className="text-white/90 leading-tight">
                            {cap}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Additional Note */}
                {service.note && (
                  <div className="bg-white/10 backdrop-blur-sm mt-2 p-2.5 border-white border-l-2 rounded-md">
                    <p className="font-medium text-white/90 text-xs leading-relaxed">
                      {service.note}
                    </p>
                  </div>
                )}

                {/* CTA Text */}
                {service.ctaText && (
                  <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm mt-auto p-2.5 border-white border-l-2 rounded-md">
                    <p className="font-medium text-white text-xs leading-relaxed">
                      <MaterialIcon
                        icon="phone"
                        className="inline mr-1.5 text-white text-sm"
                      />
                      {service.ctaText}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center mt-3 text-white">
                <MaterialIcon icon="autorenew" className="mr-2 text-base" />
                <span className="font-medium text-xs">Hover to return</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
