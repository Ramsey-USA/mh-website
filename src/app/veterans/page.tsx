import { type Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Section } from "@/components/ui/layout";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { NextStepsSection } from "@/components/shared-sections";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { getVeteransSEO } from "@/lib/seo/page-seo-utils";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

// Get SEO metadata
const veteransSEOData = getVeteransSEO();

export const metadata: Metadata = {
  title: veteransSEOData.title as string,
  description: veteransSEOData.description as string,
  keywords: Array.isArray(veteransSEOData.keywords)
    ? veteransSEOData.keywords
    : [veteransSEOData.keywords || ""],
  openGraph: {
    title: veteransSEOData.openGraph?.title as string,
    description: veteransSEOData.openGraph?.description as string,
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "/veterans",
  },
};

/**
 * Veterans Initiative Page
 * Showcasing MH Construction's veteran-owned status and community support programs
 */
export default function VeteransPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Veterans Services"
        description="We're honoring our commitment to veterans by perfecting every detail about our specialized services and benefits for those who served."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <div className="relative min-h-screen">
      {/* Parallax Background - Fixed for entire page */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-10"
        style={{
          backgroundImage: "url('/images/logo/mh-veteran-bg.png')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Page Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/images/logo/mh-veteran-bg.png')" }}
          ></div>

          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

          {/* Content - Clean and Simple */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Combat Proven
              </span>
              <span className="block text-brand-primary font-black drop-shadow-lg">
                Honoring Those Who Served
              </span>
              <span className="block text-white/90 font-medium">
                Building projects for the client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar
              </span>
            </h1>
          </div>

          {/* Page Navigation - ALWAYS REQUIRED AT BOTTOM */}
          <PageNavigation
            items={navigationConfigs.veterans}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Combat Proven" }]}
        />

        {/* Our Veteran Leadership Section */}
        <Section
          variant="default"
          padding="default"
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        >
          {/* Section Header - Military Construction Standard */}
          <div className="mb-16 sm:mb-20 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="military_tech"
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
                Leadership
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Veteran-Owned Leadership
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              MH Construction is{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                owned and led by Army veteran Jeremy Thamert
              </span>
              . His military service instilled operational values of{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                integrity, mission-focused discipline, and keeping your word
              </span>
              —principles that define every construction operation and
              partnership we build. When veterans work with veterans, trust is
              built on shared service experience.
            </p>
          </div>

          <FadeInWhenVisible>
            <Card
              className={getCardClassName(
                "default",
                "border-l-4 border-l-brand-primary text-center max-w-3xl mx-auto",
              )}
            >
              <CardHeader>
                <MaterialIcon
                  icon="military_tech"
                  size="5xl"
                  theme="veteran"
                  ariaLabel="Army Veteran Leadership"
                  className="mx-auto mb-4 text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-2xl sm:text-3xl">
                  Jeremy Thamert
                </CardTitle>
                <p className="text-brand-primary font-semibold text-lg mt-2">
                  Owner | Army Veteran
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  As an Army veteran and owner of MH Construction, Jeremy
                  understands that your word is your bond. His military service
                  taught him the operational values of integrity,
                  mission-focused commitment, and personal
                  accountability—service-earned values that define every
                  partnership we build. Since acquiring the company in January
                  2025, Jeremy has been deploying a veteran-focused organization
                  that honors those who served. Building construction missions
                  for fellow veterans isn't just business, it's brotherhood
                  earned through shared service.
                </p>
              </CardContent>
            </Card>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="mt-12 text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors font-semibold text-lg"
            >
              <span>Meet Our Full Team</span>
              <MaterialIcon icon="arrow_forward" size="md" />
            </Link>
          </FadeInWhenVisible>
        </Section>

        {/* Year-Round Support Section - MOVED EARLIER FOR SEO */}
        <Section
          variant="gray"
          padding="default"
          className="bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm"
        >
          {/* Section Header - Military Construction Standard */}
          <div className="mb-16 sm:mb-20 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="volunteer_activism"
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
                Beyond the Event
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Year-Round Veterans Support
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              As a{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                newly veteran-owned company
              </span>
              , we're deploying long-term operational programs to support
              veterans.{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Priority hiring is active now
              </span>
              , with tactical apprenticeship programs and mission partnerships
              in development.
            </p>
          </div>

          <StaggeredFadeIn className={gridPresets.cards3("md")}>
            <Card className={getCardClassName("default")}>
              <CardHeader>
                <MaterialIcon
                  icon="badge"
                  size="4xl"
                  theme="military"
                  ariaLabel="Veteran Hiring Priority"
                  className="mb-4 text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">
                  Veteran Hiring Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4">
                  Qualified veterans receive priority consideration for all
                  positions. We're deploying tactical apprenticeship programs
                  for transitioning service members as we build our veteran
                  support operational network.
                </p>
                <Link
                  href="/careers"
                  className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-semibold"
                >
                  <span>View Career Opportunities</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="sm"
                    className="ml-1"
                  />
                </Link>
              </CardContent>
            </Card>

            <Card className={getCardClassName("default")}>
              <CardHeader>
                <MaterialIcon
                  icon="handshake"
                  size="4xl"
                  theme="veteran"
                  ariaLabel="Veteran Allies Network"
                  className="mb-4 text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">
                  Veteran Allies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4">
                  Recruiting veteran-owned subcontractors for our growing
                  network. As we establish company longevity, we're building
                  partnerships with preferential opportunities for veteran-owned
                  businesses.
                </p>
                <Link
                  href="/allies"
                  className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                >
                  <span>Become an Ally</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="sm"
                    className="ml-1"
                  />
                </Link>
              </CardContent>
            </Card>

            <Card className={getCardClassName("default")}>
              <CardHeader>
                <MaterialIcon
                  icon="military_tech"
                  size="4xl"
                  theme="veteran"
                  ariaLabel="Training & Education Programs"
                  className="mb-4 text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">
                  Training & Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4">
                  Developing programs for veterans pursuing construction trades,
                  including internship opportunities and GI Bill apprenticeship
                  participation as we grow our veteran support network.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                >
                  <span>Learn About Our Values</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="sm"
                    className="ml-1"
                  />
                </Link>
              </CardContent>
            </Card>
          </StaggeredFadeIn>
        </Section>

        {/* Military Standards Section */}
        <Section
          variant="default"
          padding="default"
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        >
          {/* Section Header - Military Construction Standard */}
          <div className="mb-16 sm:mb-20 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
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
                Our Foundation
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Military Standards in Every Project
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              The{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                values we learned in service
              </span>{" "}
              guide everything we do in construction. Our veteran team brings{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                military discipline and precision
              </span>{" "}
              to every aspect of our work.
            </p>
          </div>

          <StaggeredFadeIn className={gridPresets.twoColumn("md")}>
            <Card
              className={getCardClassName(
                "default",
                "border-l-4 border-l-brand-primary",
              )}
            >
              <CardContent className="pt-6">
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="military_tech"
                      size="xl"
                      theme="military"
                      ariaLabel="Military Discipline"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        Discipline
                      </h4>
                      <p className="text-base">
                        Consistent execution and accountability on every project
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="workspace_premium"
                      size="xl"
                      theme="military"
                      ariaLabel="Excellence Standard"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        Excellence
                      </h4>
                      <p className="text-base">
                        High standards in craftsmanship and service delivery
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="verified"
                      size="xl"
                      theme="military"
                      ariaLabel="Integrity Commitment"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        Integrity
                      </h4>
                      <p className="text-base">
                        Honest communication and transparent pricing always
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={getCardClassName(
                "default",
                "border-l-4 border-l-brand-secondary",
              )}
            >
              <CardContent className="pt-6">
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="volunteer_activism"
                      size="xl"
                      theme="veteran"
                      ariaLabel="Service Above Self"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        Service
                      </h4>
                      <p className="text-base">
                        Putting client partner mission above company profit
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="diversity_3"
                      size="xl"
                      theme="veteran"
                      ariaLabel="Team Unity"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        Teamwork
                      </h4>
                      <p className="text-base">
                        Collaborative approach to solving complex challenges
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="gps_fixed"
                      size="xl"
                      theme="veteran"
                      ariaLabel="Precision Excellence"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        Precision
                      </h4>
                      <p className="text-base">
                        Attention to detail in planning and execution
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </StaggeredFadeIn>

          {/* Veteran Team Member */}
          <FadeInWhenVisible className="mt-12">
            <Card
              className={getCardClassName(
                "default",
                "border-l-4 border-l-brand-secondary max-w-3xl mx-auto text-center",
              )}
            >
              <CardHeader>
                <MaterialIcon
                  icon="anchor"
                  size="4xl"
                  theme="veteran"
                  ariaLabel="Navy Veteran"
                  className="mx-auto mb-4 text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">
                  Matt Ramsey
                </CardTitle>
                <p className="text-brand-secondary font-semibold text-lg mt-2">
                  Digital Marketing Manager | Navy Veteran
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Navy veteran Matt Ramsey brings military discipline to digital
                  excellence, ensuring our veteran-owned business stays
                  connected with those we serve. His service taught him that
                  trust is earned through consistent action and genuine
                  commitment—principles that guide our digital presence and
                  veteran outreach initiatives.
                </p>
              </CardContent>
            </Card>
          </FadeInWhenVisible>
        </Section>

        {/* Annual Fishing Event Section - MOVED LATER FOR SEO */}
        <section
          id="fishing-event"
          className="relative bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm py-20 lg:py-32"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="directions_boat"
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
                    Annual Veterans
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Fishing Classic
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Join us for our{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    inaugural fishing benefit event
                  </span>{" "}
                  honoring veterans with{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    40+ boats from the local community
                  </span>
                  . A day of fishing, fellowship, and gratitude on Pacific
                  Northwest waters.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className={gridPresets.cards3("md")}>
              <Card className={getCardClassName("default", "text-center")}>
                <CardHeader>
                  <MaterialIcon
                    icon="directions_boat"
                    size="4xl"
                    theme="military"
                    ariaLabel="Fishing Fleet"
                    className="mx-auto mb-4 text-brand-primary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    40+ Boats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                    Local boating community coming together to provide fishing
                    experiences for 100-150 veterans and their families.
                  </p>
                </CardContent>
              </Card>

              <Card className={getCardClassName("default", "text-center")}>
                <CardHeader>
                  <MaterialIcon
                    icon="diversity_3"
                    size="4xl"
                    theme="veteran"
                    ariaLabel="Community Unity"
                    className="mx-auto mb-4 text-brand-secondary"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Community Powered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                    Made possible by generous sponsors and volunteers committed
                    to supporting those who've served our country.
                  </p>
                </CardContent>
              </Card>

              <Card className={getCardClassName("default", "text-center")}>
                <CardHeader>
                  <MaterialIcon
                    icon="volunteer_activism"
                    size="4xl"
                    theme="veteran"
                    ariaLabel="Free Veterans Support"
                    className="mx-auto mb-4 text-bronze-600"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Free for Veterans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                    No cost to participate. Fully sponsored event includes
                    breakfast, lunch, dinner, fishing gear, and awards ceremony.
                  </p>
                </CardContent>
              </Card>
            </StaggeredFadeIn>

            {/* Event Day Schedule */}
            <FadeInWhenVisible className="mt-16">
              <Card
                className={getCardClassName("default", "max-w-4xl mx-auto")}
              >
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center">
                    Event Day Schedule (Spring 2026)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MaterialIcon
                        icon="wb_twilight"
                        size="2xl"
                        theme="military"
                        ariaLabel="Morning Briefing"
                        className="flex-shrink-0 mt-1 text-brand-primary"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-2">
                          Morning (6:00 AM - 7:00 AM)
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                          Registration, breakfast, safety briefing, and boat
                          assignments at the marina
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MaterialIcon
                        icon="phishing"
                        size="2xl"
                        theme="veteran"
                        ariaLabel="Fishing Operations"
                        className="flex-shrink-0 mt-1 text-brand-secondary"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-2">
                          Day on the Water (7:00 AM - 5:00 PM)
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                          Guided fishing with experienced captains, instruction
                          for beginners, and veteran camaraderie
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MaterialIcon
                        icon="celebration"
                        size="2xl"
                        theme="veteran"
                        ariaLabel="Victory Celebration"
                        className="flex-shrink-0 mt-1 text-bronze-600"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-2">
                          Evening (5:00 PM - 8:00 PM)
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                          Return to dock, fish cleaning, BBQ dinner, awards
                          ceremony, and live entertainment
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            {/* Registration Info */}
            <FadeInWhenVisible className="mt-12 text-center">
              <div className="bg-brand-primary/10 dark:bg-brand-primary/20 p-8 rounded-xl inline-block">
                <MaterialIcon
                  icon="info"
                  size="xl"
                  theme="military"
                  ariaLabel="Registration Information"
                  className="text-brand-primary mb-4"
                />
                <p className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl mb-2">
                  Veteran Registration Opens January 2026
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                  Limited spaces available - first come, first served
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Partnership Opportunities Section */}
        <section
          id="sponsorship"
          className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-20 lg:py-32"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="handshake"
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
                    Organizational Partnership
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Opportunities
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  MH Construction partners with{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    corporations, non-profits, veteran service organizations,
                    and community groups
                  </span>{" "}
                  to co-host impactful veteran events. We provide{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    the construction industry platform and connections
                  </span>
                  —you bring your organization's resources, expertise, and
                  mission to create meaningful experiences together.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Title Event Partner */}
              <Card
                className={getCardClassName(
                  "default",
                  "border-t-4 border-t-purple-500",
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <MaterialIcon
                      icon="corporate_fare"
                      className="text-purple-500 text-5xl"
                    />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Title Event Partner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base">
                    <strong>For:</strong> Major corporations, national
                    non-profits, veteran service organizations (VFW, American
                    Legion, WWP, etc.), and foundations
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What Your Organization Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                      />
                      <span>
                        Event funding or resources (venue, catering, equipment)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                      />
                      <span>
                        Your organization's volunteer network and member base
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                      />
                      <span>
                        Specialized services aligned with your mission
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What MH Construction Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>
                        Construction industry platform and connections
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>
                        Event planning, logistics, and on-site management
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>
                        Co-branded marketing reaching Pacific Northwest
                        community
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>
                        Dedicated activation space for your organization at
                        event
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Co-Host Event Partner */}
              <Card
                className={getCardClassName(
                  "default",
                  "border-t-4 border-t-yellow-500",
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <MaterialIcon
                      icon="business"
                      className="text-yellow-500 text-5xl"
                    />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-2xl sm:text-3xl">
                    Co-Host Event Partner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base">
                    <strong>For:</strong> Regional businesses, community
                    foundations, veteran advocacy groups, and established local
                    non-profits
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What Your Organization Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                      />
                      <span>
                        Partial event resources or specific event components
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                      />
                      <span>
                        Access to your member network and communications
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                      />
                      <span>Your organization's expertise and services</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What MH Construction Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>Event infrastructure and operational support</span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>
                        Collaborative branding and joint marketing efforts
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>
                        Space for your organization to engage attendees
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Supporting Event Partner */}
              <Card
                className={getCardClassName(
                  "default",
                  "border-t-4 border-t-gray-400",
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <MaterialIcon
                      icon="groups"
                      className="text-gray-400 text-5xl"
                    />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Supporting Event Partner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base">
                    <strong>For:</strong> Local non-profits, veteran chapters,
                    community organizations, and service clubs
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What Your Organization Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-gray-400"
                      />
                      <span>In-kind services or specific event support</span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-gray-400"
                      />
                      <span>Volunteer assistance or specialized expertise</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What MH Construction Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>Partner recognition in event materials</span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>Listing on event website and communications</span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>Opportunity to connect with veteran attendees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Resource Contributor Partner */}
              <Card
                className={getCardClassName(
                  "default",
                  "border-t-4 border-t-orange-600",
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <MaterialIcon
                      icon="handshake"
                      className="text-orange-600 text-5xl"
                    />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                    Resource Contributor Partner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base">
                    <strong>For:</strong> Businesses and organizations providing
                    specific resources or services
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What Your Organization Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-orange-600"
                      />
                      <span>
                        Equipment, supplies, or services for the event
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-orange-600"
                      />
                      <span>Professional expertise or technical support</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-base font-semibold">
                    What MH Construction Provides:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>Recognition as event resource partner</span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-primary"
                      />
                      <span>Social media appreciation posts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </StaggeredFadeIn>

            {/* In-Kind Sponsorship */}
            <FadeInWhenVisible className="mt-16">
              <Card
                className={getCardClassName(
                  "default",
                  "max-w-4xl mx-auto bg-brand-light dark:bg-gray-800",
                )}
              >
                <CardHeader>
                  <MaterialIcon
                    icon="handshake"
                    className="mx-auto mb-4 text-bronze-600 text-5xl"
                  />
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center">
                    Example Resource Contributions From Partners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-700 dark:text-gray-300 text-lg mb-6">
                    Organizations contribute what aligns with their mission and
                    capabilities—we handle event coordination and execution.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Boats & Captains
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Food & Catering Services
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Fishing Equipment
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Prizes & Awards
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Media & Photography
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Volunteer Networks
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Veteran Services Tables
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      Event Entertainment
                    </span>
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            {/* Partnership Benefits Highlight */}
            <FadeInWhenVisible className="mt-16">
              <Card
                className={getCardClassName(
                  "default",
                  "max-w-5xl mx-auto bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10",
                )}
              >
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center">
                    Why Co-Host With MH Construction?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <MaterialIcon
                        icon="diversity_3"
                        size="3xl"
                        theme="military"
                        ariaLabel="Direct Veteran Access"
                        className="mx-auto mb-3 text-brand-primary"
                      />
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Direct Veteran Access
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Reach 100-150+ veterans and military families at every
                        event
                      </p>
                    </div>
                    <div>
                      <MaterialIcon
                        icon="engineering"
                        size="3xl"
                        theme="veteran"
                        ariaLabel="Turnkey Event Management"
                        className="mx-auto mb-3 text-brand-secondary"
                      />
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Turnkey Event Management
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        We handle logistics, permits, insurance, and
                        execution—you focus on your mission
                      </p>
                    </div>
                    <div>
                      <MaterialIcon
                        icon="campaign"
                        className="mx-auto mb-3 text-bronze-600 text-4xl"
                      />
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Co-Branded Impact
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Joint marketing reaches thousands across the Pacific
                        Northwest
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            {/* Contact CTA */}
            <FadeInWhenVisible className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-lg font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl"
              >
                <MaterialIcon
                  icon="mark_email_read"
                  size="lg"
                  theme="military"
                  ariaLabel="Partnership Contact"
                />
                <span>Discuss Partnership Opportunities</span>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Organizations, non-profits, and veteran groups: Let's combine
                resources to create meaningful veteran events together
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Next Steps Section */}
        <NextStepsSection />
      </div>
    </div>
  );
}
