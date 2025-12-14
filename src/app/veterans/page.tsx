import { type Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Main Title - REQUIRED RESPONSIVE SCALING */}
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-brand-secondary font-black drop-shadow-lg">
                  Combat Proven
                </span>
              </h1>

              {/* Subtitle - Group 4: Professional & Patriotic */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
                Honoring Those Who Served
              </p>

              {/* Veteran-Owned Leadership Emphasis */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-bronze-300 leading-snug px-2 font-bold tracking-wide">
                Army Veteran Leadership Since January 2025
              </p>

              {/* Group 4: Service & Values Focus */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
                Mission-Focused Excellence · Shared Military Values
              </p>

              {/* Description - Respectful, professional, integrity-driven with military-construction terminology */}
              <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
                "Building projects for the client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar" — Veteran-owned and veteran-led, we serve those who
                served with SITREP-level communications, transparent mission
                briefs, and battle-tested craftsmanship. Supporting Pacific
                Northwest veterans through priority hiring operations, tactical
                community partnerships, and shared commitment to service-earned
                integrity. Your service is honored. Your trust is earned through
                every construction mission we deploy.
              </p>
            </div>
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
          <SectionHeader
            icon="military_tech"
            iconVariant="bronze"
            subtitle="Leadership"
            title="Veteran-Owned Leadership"
            description="MH Construction is owned and led by Army veteran Jeremy Thamert. His military service instilled operational values of integrity, mission-focused discipline, and keeping your word—principles that define every construction operation and partnership we build. When veterans work with veterans, trust is built on shared service experience and mutual operational respect."
          />

          <FadeInWhenVisible>
            <Card
              className={getCardClassName(
                "default",
                "border-l-4 border-l-brand-primary text-center max-w-3xl mx-auto",
              )}
            >
              <CardHeader>
                <MaterialIcon
                  icon="shield"
                  className="mx-auto mb-4 text-brand-primary text-6xl"
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
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent transition-colors font-semibold text-lg"
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
          <SectionHeader
            icon="volunteer_activism"
            iconVariant="secondary"
            subtitle="Beyond the Event"
            title="Year-Round Veterans Support"
            description="As a newly veteran-owned company, we're deploying long-term operational programs to support veterans. Priority hiring is active now, with tactical apprenticeship programs and mission partnerships in development."
          />

          <StaggeredFadeIn className={gridPresets.cards3("md")}>
            <Card className={getCardClassName("default")}>
              <CardHeader>
                <MaterialIcon
                  icon="work"
                  className="mb-4 text-brand-primary text-5xl"
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
                  className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors font-semibold"
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
                  className="mb-4 text-brand-secondary text-5xl"
                />
                <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">
                  Veteran Trade Partners
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
                  href="/trade-partners"
                  className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
                >
                  <span>Become a Trade Partner</span>
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
                  icon="school"
                  className="mb-4 text-brand-accent text-5xl"
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
                  className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors font-semibold"
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
          <SectionHeader
            icon="verified"
            iconVariant="primary"
            subtitle="Our Foundation"
            title="Military Standards in Every Project"
            description="The values we learned in service guide everything we do in construction. Our veteran team brings military discipline and precision to every aspect of our work."
          />

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
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-2xl"
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
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-2xl"
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
                      className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-2xl"
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
                      icon="emoji_people"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary text-2xl"
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
                      icon="groups"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary text-2xl"
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
                      icon="psychology"
                      className="flex-shrink-0 mt-1 mr-3 text-brand-secondary text-2xl"
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
                  className="mx-auto mb-4 text-brand-secondary text-5xl"
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
              <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
                <h2 className="mb-8 font-black text-brand-primary dark:text-brand-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight">
                  Annual Veterans Fishing Classic
                </h2>
                <p className="mx-auto max-w-3xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                  Join us for our inaugural fishing benefit event honoring
                  veterans with 40+ boats from the local community. A day of
                  fishing, fellowship, and gratitude on Pacific Northwest
                  waters.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className={gridPresets.cards3("md")}>
              <Card className={getCardClassName("default", "text-center")}>
                <CardHeader>
                  <MaterialIcon
                    icon="directions_boat"
                    className="mx-auto mb-4 text-brand-primary text-5xl"
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
                    icon="groups"
                    className="mx-auto mb-4 text-brand-secondary text-5xl"
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
                    icon="favorite"
                    className="mx-auto mb-4 text-brand-accent text-5xl"
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
                        className="flex-shrink-0 mt-1 text-brand-primary text-3xl"
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
                        className="flex-shrink-0 mt-1 text-brand-secondary text-3xl"
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
                        className="flex-shrink-0 mt-1 text-brand-accent text-3xl"
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
              <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
                <h2 className="mb-8 font-black text-brand-primary dark:text-brand-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight">
                  Organizational Partnership Opportunities
                </h2>
                <p className="mx-auto max-w-3xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                  MH Construction partners with corporations, non-profits,
                  veteran service organizations, and community groups to co-host
                  impactful veteran events. We provide the construction industry
                  platform and connections—you bring your organization's
                  resources, expertise, and mission to create meaningful
                  experiences together.
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
                    className="mx-auto mb-4 text-brand-accent text-5xl"
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
                        icon="people"
                        className="mx-auto mb-3 text-brand-primary text-4xl"
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
                        icon="settings"
                        className="mx-auto mb-3 text-brand-secondary text-4xl"
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
                        className="mx-auto mb-3 text-brand-accent text-4xl"
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
                <MaterialIcon icon="email" size="lg" />
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
