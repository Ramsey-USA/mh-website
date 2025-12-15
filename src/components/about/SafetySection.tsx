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
import { SectionHeader } from "@/components/ui/SectionHeader";

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
        <SectionHeader
          icon="shield"
          iconVariant="primary"
          subtitle="Safety &"
          title="Compliance"
          description="Safety is never compromised at MH Construction. Our award-winning comprehensive safety programs and regulatory compliance ensure every construction operation meets the highest standards. With multiple AGC-WA Top EMR Awards and a .64 EMR (40% better than industry average), we demonstrate unwavering commitment to zero-incident mission culture with military-grade safety discipline."
        />

        <StaggeredFadeIn
          className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
        >
          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="verified_user"
                  size="lg"
                  theme="military"
                  ariaLabel="Mission-first safety"
                  className="text-brand-primary"
                />
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
                <MaterialIcon
                  icon="gavel"
                  size="lg"
                  className="text-brand-secondary"
                />
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
                <MaterialIcon
                  icon="health_and_safety"
                  size="lg"
                  className="text-brand-primary"
                />
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
