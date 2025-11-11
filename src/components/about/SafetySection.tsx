/**
 * Safety & Compliance Section Component
 * Displays MH Construction's safety culture, regulatory compliance, and quality assurance
 * Reusable across About, Team, and Government pages
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";

export function SafetySection() {
  return (
    <section id="safety" className="bg-white dark:bg-gray-900 py-20 lg:py-32">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Safety &
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Compliance
              </span>
            </h2>
            <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
              Safety is never compromised at MH Construction. Our award-winning
              comprehensive safety programs and regulatory compliance ensure
              every project meets the highest standards. With multiple AGC-WA
              Top EMR Awards and a .6 EMR (40% better than industry average), we
              demonstrate unwavering commitment to zero-incident workplace
              culture.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
        >
          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="security"
                  size="lg"
                  className="text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Safety First Culture
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Daily safety meetings and site-specific hazard protocols
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    OSHA 30 leadership & OSHA 10 for all team members
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Comprehensive safety equipment and continuous monitoring
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Zero-tolerance policy for safety violations
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
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
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Licensed and insured in Washington, Oregon, and Idaho
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Current with all local and federal building codes
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Environmental compliance and sustainability practices
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
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
                  className="text-brand-accent"
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
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Multi-point quality inspections at every project phase
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Documented quality control processes and checklists
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Third-party verification for critical installations
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
                  />
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                    Comprehensive warranty and dedicated post-project support
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent text-xs sm:text-sm"
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
