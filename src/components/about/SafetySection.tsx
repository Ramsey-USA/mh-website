/**
 * Safety & Compliance Section Component
 * Displays MH Construction's safety culture, regulatory compliance, and quality assurance
 * Reusable across About, Team, and Government pages
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";

export function SafetySection() {
  return (
    <section
      id="safety"
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
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="shield"
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
              Mission-First Safety Culture
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Zero-Incident Commitment
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Safety is never compromised at MH Construction. Our{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              award-winning comprehensive safety programs
            </span>{" "}
            and regulatory compliance ensure every construction operation meets
            the highest standards. With multiple{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              AGC-WA Top EMR Awards
            </span>{" "}
            and a .64 EMR (40% better than industry average), we demonstrate
            unwavering commitment to{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              zero-incident mission culture
            </span>{" "}
            with military-grade safety discipline.
          </p>
        </div>

        <StaggeredFadeIn
          className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
        >
          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-xl rounded-full"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl flex items-center justify-center shadow-lg border-2 border-white/50 dark:border-gray-700/50">
                    <MaterialIcon
                      icon="verified_user"
                      size="lg"
                      ariaLabel="Mission-first safety"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Mission-First Safety Culture
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Daily safety meetings and site-specific hazard protocols
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    OSHA 30 leadership & OSHA 10 for all team members
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Comprehensive safety equipment and continuous monitoring
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Zero-tolerance policy for safety violations
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    3+ years without time-loss injury - industry leading
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={getCardClassName("secondary", "h-full duration-300")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/30 to-brand-secondary-dark/30 blur-xl rounded-full"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-bronze-700 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/50 dark:border-gray-700/50">
                    <MaterialIcon
                      icon="gavel"
                      size="lg"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Regulatory Compliance
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Licensed and insured in Washington, Oregon, and Idaho
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Current with all local and federal building codes
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Environmental compliance and sustainability practices
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Regular audits and certification maintenance
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className={getCardClassName("accent", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-xl rounded-full"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl flex items-center justify-center shadow-lg border-2 border-white/50 dark:border-gray-700/50">
                    <MaterialIcon
                      icon="health_and_safety"
                      size="lg"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Quality Assurance
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Multi-point quality inspections at every project phase
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Documented quality control processes and checklists
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Third-party verification for critical installations
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Comprehensive warranty and dedicated post-project support
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Materials selected for longevity, not just cost
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
