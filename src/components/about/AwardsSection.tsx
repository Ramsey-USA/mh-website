/**
 * Awards & Recognition Section Component
 * Displays MH Construction's industry awards, safety recognition, and certifications
 * Reusable across About, Team, and other credibility-building pages
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";

export function AwardsSection() {
  return (
    <section id="awards" className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Awards &
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Recognition
              </span>
            </h2>
            <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Our commitment to excellence has been recognized by industry
              leaders and the communities we serve throughout the Pacific
              Northwest.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
        >
          <Card
            className={getCardClassName("secondary", "h-full duration-300")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="workspace_premium"
                  size="lg"
                  className="text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Excellence in Construction
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Associated General Contractors (AGC) - Washington Chapter
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Outstanding Commercial Project Award for innovation and quality
                craftsmanship
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="military_tech"
                  size="lg"
                  className="text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Veteran Business Enterprise
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Certified Veteran-Owned Small Business (VOSB)
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Veteran-owned since January 2025 under Army veteran leadership.
                Department of Veterans Affairs certification recognizing veteran
                entrepreneurship excellence.
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("accent", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="eco"
                  size="lg"
                  className="text-brand-accent"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Sustainable Building Leader
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Washington State Green Building Council
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Recognition for commitment to sustainable construction practices
                and LEED compliance
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="verified_user"
                  size="lg"
                  className="text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Safety Excellence
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                OSHA Voluntary Protection Program (VPP)
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Star designation for exemplary workplace safety and health
                programs
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="emoji_events"
                  size="lg"
                  className="text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  2025 Most Improved EMR
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Associated General Contractors (AGC) - Washington Chapter
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                25% EMR reduction from 2024 with 3+ years without time loss or
                impairment injury. L&I Claims Free Discount Program
                participation demonstrating sustained safety excellence under
                veteran-owned leadership.
              </p>
            </CardContent>
          </Card>

          <Card
            className={getCardClassName("secondary", "h-full duration-300")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="shield"
                  size="lg"
                  className="text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  2021 Top EMR Award
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Associated General Contractors (AGC) - Washington Chapter
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                'As Low as You Can Go' recognition at .6 EMR (40% better than
                industry average) with 7-year average EMR of .65 and 3+
                consecutive years claims-free
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("accent", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="shield"
                  size="lg"
                  className="text-brand-accent"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  2020 Top EMR Award
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Associated General Contractors (AGC) - Washington Chapter
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                'As Low as You Can Go' at .6 EMR & 6-year average EMR of .66
                with 3+ years claims-free
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("primary", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="shield"
                  size="lg"
                  className="text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  2019 Top EMR Award
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Associated General Contractors (AGC) - Washington Chapter
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                'As Low as You Can Go' at .6 EMR & 5-year average EMR of .68
                with 3+ years claims-free
              </p>
            </CardContent>
          </Card>

          <Card className={getCardClassName("accent", "h-full duration-300")}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="groups"
                  size="lg"
                  className="text-brand-accent"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Community Partner
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Tri-Cities Chamber of Commerce
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Business Excellence Award for community involvement and economic
                development support
              </p>
            </CardContent>
          </Card>

          <Card
            className={getCardClassName("secondary", "h-full duration-300")}
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <MaterialIcon
                  icon="trending_up"
                  size="lg"
                  className="text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Industry Innovation
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base">
                Construction Technology Advancement
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Recognition for innovative use of technology in project
                management and execution
              </p>
            </CardContent>
          </Card>
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
