"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

interface ValueCategory {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDescription: string;
  benefits: string[];
  iconGradient: string;
  accentGradient: string;
}

const valueCategories: ValueCategory[] = [
  {
    id: "partners",
    icon: "groups",
    title: "For Our Partners",
    subtitle: "Client Partnership Excellence",
    shortDesc:
      "Predictable experience and long-term partnerships built on trust.",
    fullDescription:
      "Our values create a predictable, consistent experience you can count on. Every project is backed by 150+ years combined military-grade expertise, ensuring peace of mind knowing your project is in capable hands. We don't just complete projects—we build long-term partnerships that extend beyond project completion.",
    benefits: [
      "Predictable, consistent experience you can count on",
      "Peace of mind knowing your project is in capable hands",
      "Long-term partnership beyond project completion",
      "True ROI—the return is the relationship",
      "Transparent communication at every project phase",
      "Battle-tested standards ensuring first-time-right execution",
      "70% referral rate demonstrates earned trust",
      "Service-earned commitment to your success",
    ],
    iconGradient:
      "from-brand-primary via-brand-primary-dark to-brand-primary-darker",
    accentGradient:
      "from-brand-primary via-brand-primary-dark to-brand-primary-darker",
  },
  {
    id: "community",
    icon: "domain",
    title: "For Our Community",
    subtitle: "Economic & Social Impact",
    shortDesc:
      "Economic development and quality standards raising the bar for our region.",
    fullDescription:
      "Our values drive meaningful community impact across the Pacific Northwest. We support local suppliers, raise quality standards in the construction industry, and create opportunities for veterans and military families. Every structure we build serves communities for generations.",
    benefits: [
      "Economic development supporting local suppliers",
      "Raising quality standards in construction industry",
      "Veteran support and opportunities for military families",
      "Building structures serving communities for generations",
      "Pacific Northwest regional authority with 3-state licensing",
      "Industry-leading safety culture protecting everyone on site",
      "Partnership with AGC-WA and industry organizations",
      "Contributing to sustainable growth and development",
    ],
    iconGradient:
      "from-brand-secondary via-brand-secondary-dark to-secondary-700",
    accentGradient:
      "from-brand-secondary via-brand-secondary-dark to-secondary-700",
  },
  {
    id: "team",
    icon: "engineering",
    title: "For Our Team",
    subtitle: "Professional Excellence Culture",
    shortDesc:
      "Professional pride and growth in an environment valuing excellence.",
    fullDescription:
      "Our values create an environment where team members take professional pride in meaningful work. Clear standards and expectations guide every interaction, while opportunities for personal growth abound in a culture that values excellence. Every team member is part of something larger than individual projects.",
    benefits: [
      "Professional pride in meaningful work",
      "Clear standards and expectations in every interaction",
      "Personal growth in environment valuing excellence",
      "Being part of something larger than individual projects",
      "Zero-incident safety culture protecting every team member",
      "OSHA VPP Star certification demonstrates commitment",
      "Veteran-owned leadership with operational discipline",
      "Chain of Command structure with unified mission",
    ],
    iconGradient: "from-brand-secondary via-bronze-700 to-bronze-800",
    accentGradient: "from-brand-secondary via-bronze-700 to-bronze-800",
  },
];

/**
 * Values Showcase Section with Modal Details
 * Interactive cards showing why values matter to Partners, Community, and Team
 * Pattern matches ServicesShowcase from homepage
 */
export function ValuesShowcase() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  // Memoize the selected value data
  const currentValue = useMemo(
    () => (selectedValue !== null ? valueCategories[selectedValue] : null),
    [selectedValue],
  );

  // Close modal handler
  const closeModal = useCallback(() => {
    setSelectedValue(null);
  }, []);

  // Open modal handler
  const openModal = useCallback((index: number) => {
    setSelectedValue(index);
  }, []);

  // Handle escape key press and body scroll lock
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedValue !== null) {
        closeModal();
      }
    };

    if (selectedValue !== null) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedValue, closeModal]);

  return (
    <section
      id="values"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="verified"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          </div>

          {/* Two-line gradient heading */}
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Why Our Values
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Matter
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Our{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              service-earned values—integrity, transparency, and excellence
            </span>{" "}
            drive every project decision and partnership we build. These
            battle-tested principles aren't just{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              words on a wall
            </span>
            —they're the foundation of how we do business with 150+ years
            combined military-grade expertise backing every promise we make to
            every partner.
          </p>

          {/* Call to Action Hint */}
          <p className="mt-6 text-brand-primary dark:text-brand-primary-light font-semibold text-sm sm:text-base animate-pulse">
            Click any card below to learn more
          </p>
        </div>

        {/* Value Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {valueCategories.map((value, index) => (
            <div
              key={value.id}
              className="group relative flex h-full cursor-pointer"
              onClick={() => openModal(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Learn more about ${value.title}`}
            >
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-primary dark:group-hover:border-brand-primary-light shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full group-hover:scale-[1.02]">
                {/* Top Accent Bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${value.accentGradient}`}
                ></div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                      <div
                        className={`relative rounded-xl bg-gradient-to-br ${value.iconGradient} p-3 shadow-xl group-hover:scale-110 transition-all duration-300`}
                      >
                        <MaterialIcon
                          icon={value.icon}
                          size="xl"
                          className="text-white drop-shadow-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                    {value.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-center text-sm sm:text-base md:text-lg leading-relaxed mb-4 flex-grow">
                    {value.shortDesc}
                  </p>

                  {/* Learn More Button */}
                  <div className="flex justify-center mt-4">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-colors duration-200 font-semibold text-sm group-hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(index);
                      }}
                    >
                      <span>Learn More</span>
                      <MaterialIcon icon="arrow_forward" size="sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Detail Modal */}
        {currentValue && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => {
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
              <div
                className={`relative bg-gradient-to-br ${currentValue.iconGradient} p-6 sm:p-8`}
              >
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
                      icon={currentValue.icon}
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      id="modal-title"
                      className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2"
                    >
                      {currentValue.title}
                    </h3>
                    <p className="text-white/90 text-base sm:text-lg font-semibold">
                      {currentValue.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  {currentValue.fullDescription}
                </p>

                {/* Benefits List */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl mr-3">
                      <MaterialIcon
                        icon="checklist"
                        className="text-brand-primary"
                        size="lg"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                      Key Benefits
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {currentValue.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-700 dark:text-gray-300"
                      >
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                          size="md"
                        />
                        <span className="text-base sm:text-lg leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Veteran Badge */}
                <div className="mt-8 p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 rounded-xl border border-brand-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <MaterialIcon
                      icon="military_tech"
                      size="lg"
                      className="text-brand-primary"
                    />
                    <h5 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                      Veteran-Owned Excellence
                    </h5>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    These values are backed by 150+ years combined
                    military-grade expertise, ensuring operational discipline
                    meets proven construction excellence in every project we
                    undertake.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
