/**
 * Safety & Compliance Section Component
 * Displays MH Construction's safety culture, regulatory compliance, and quality assurance
 * Reusable across About, Team, and Government pages
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
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
          <div className="group relative flex h-full">
            {/* Animated Border Glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
              {/* Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative inline-block">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-2.5 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="verified_user"
                        size="lg"
                        ariaLabel="Mission-first safety"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h3 className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-bold">
                    Mission-First Safety Culture
                  </h3>
                </div>
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
              </div>
            </div>
          </div>

          <div className="group relative flex h-full">
            {/* Animated Border Glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
              {/* Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative inline-block">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-2.5 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="gavel"
                        size="lg"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h3 className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-bold">
                    Regulatory Compliance
                  </h3>
                </div>
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
              </div>
            </div>
          </div>

          <div className="group relative flex h-full">
            {/* Animated Border Glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
              {/* Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative inline-block">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-2.5 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="health_and_safety"
                        size="lg"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h3 className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-bold">
                    Quality Assurance
                  </h3>
                </div>
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
              </div>
            </div>
          </div>
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
