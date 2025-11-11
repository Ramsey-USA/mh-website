import { type Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Section, SectionHeader } from "@/components/ui/layout";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { NextStepsSection } from "@/components/shared-sections";

export const metadata: Metadata = {
  title:
    "Veterans Initiative & Annual Fishing Event | MH Construction - Veteran-Owned Company",
  description:
    "MH Construction, a veteran-owned business, proudly supports veterans through our annual fishing benefit event, hiring initiatives, and community partnerships. Join 40+ boats for our Spring 2026 fishing classic honoring those who served. Sponsorship opportunities available.",
  keywords: [
    "veteran-owned construction",
    "veterans fishing event",
    "veteran support programs",
    "military veteran hiring",
    "veteran benefit event",
    "community fishing event",
    "veteran sponsorship opportunities",
    "Pacific Northwest veterans",
    "Army veteran owned business",
    "Navy veteran business",
  ],
  openGraph: {
    title: "Veterans Initiative & Annual Fishing Event | MH Construction",
    description:
      "Supporting veterans through community events, hiring initiatives, and partnerships. Join our inaugural fishing classic Spring 2026 with 40+ boats honoring service members.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Veterans Initiative Page
 * Showcasing MH Construction's veteran-owned status and community support programs
 */
export default function VeteransPage() {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Veterans Day Honor Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <MaterialIcon
                icon="military_tech"
                className="text-brand-secondary text-2xl sm:text-3xl md:text-4xl animate-pulse"
              />
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-brand-secondary font-bold tracking-wide">
                Honoring Veterans Day 2025
              </p>
              <MaterialIcon
                icon="military_tech"
                className="text-brand-secondary text-2xl sm:text-3xl md:text-4xl animate-pulse"
              />
            </div>

            {/* Main Title - REQUIRED RESPONSIVE SCALING */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Veterans Initiative & Fishing Classic
              </span>
            </h1>

            {/* Subtitle - REQUIRED */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
              Honoring Service Through Community, Hiring Programs, and Annual
              Events
            </p>

            {/* Veterans Day Message */}
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-brand-secondary/30">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 leading-relaxed font-semibold italic">
                "Today we honor all who have served. Your sacrifice, courage,
                and dedication inspire everything we do. Thank you to all
                veterans, past and present."
              </p>
              <p className="mt-2 text-xs sm:text-sm text-brand-secondary font-bold">
                — Jeremy Thamert (Army Veteran) & Matt Ramsey (Navy Veteran)
              </p>
            </div>

            {/* Description - REQUIRED */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              "Building for the Owner, NOT the Dollar" — As a veteran-owned
              company, we're committed to supporting those who've served through
              community initiatives, hiring programs, and our annual fishing
              benefit event.
            </p>
          </div>
        </div>

        {/* Page Navigation - ALWAYS REQUIRED AT BOTTOM */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Veterans Initiative" },
          ]}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Our Veteran Leadership Section */}
      <Section variant="default" padding="default">
        <SectionHeader
          subtitle="Leadership"
          title="Veteran-Owned Excellence"
          description="MH Construction is led by Army veteran Jeremy Thamert and Navy veteran Matt Ramsey, bringing military precision and discipline to every project we undertake."
          maxWidth="4xl"
        />

        <StaggeredFadeIn className={gridPresets.twoColumn("md")}>
          <Card
            className={getCardClassName(
              "default",
              "border-l-4 border-l-brand-primary text-center",
            )}
          >
            <CardHeader>
              <MaterialIcon
                icon="shield"
                className="mx-auto mb-4 text-brand-primary text-6xl"
              />
              <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">
                Jeremy Thamert
              </CardTitle>
              <p className="text-brand-primary font-semibold text-lg mt-2">
                Owner | Army Veteran
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                As an Army veteran and owner of MH Construction, Jeremy brings
                military leadership and commitment to excellence to every
                project. His vision extends beyond construction—building
                community and supporting fellow veterans.
              </p>
            </CardContent>
          </Card>

          <Card
            className={getCardClassName(
              "default",
              "border-l-4 border-l-brand-secondary text-center",
            )}
          >
            <CardHeader>
              <MaterialIcon
                icon="anchor"
                className="mx-auto mb-4 text-brand-secondary text-6xl"
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
                Navy veteran Matt Ramsey developed MH Construction's website and
                digital presence, bringing military precision to marketing
                technology and promoting veteran-owned business status through
                innovative digital solutions.
              </p>
            </CardContent>
          </Card>
        </StaggeredFadeIn>

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
      <Section variant="gray" padding="default">
        <SectionHeader
          subtitle="Beyond the Event"
          title={
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Year-Round Veterans Support
            </span>
          }
          description="Our commitment to veterans extends throughout the year with hiring initiatives, partnerships, and community engagement."
          maxWidth="4xl"
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
                positions, with apprenticeship programs for transitioning
                service members.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors font-semibold"
              >
                <span>View Career Opportunities</span>
                <MaterialIcon icon="arrow_forward" size="sm" className="ml-1" />
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
                Actively recruiting veteran-owned subcontractors with
                preferential bidding and support for business growth.
              </p>
              <Link
                href="/trade-partners"
                className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors font-semibold"
              >
                <span>Become a Trade Partner</span>
                <MaterialIcon icon="arrow_forward" size="sm" className="ml-1" />
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
                Scholarships for veterans pursuing construction trades,
                internships for student veterans, and GI Bill apprenticeship
                programs.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors font-semibold"
              >
                <span>Learn About Our Values</span>
                <MaterialIcon icon="arrow_forward" size="sm" className="ml-1" />
              </Link>
            </CardContent>
          </Card>
        </StaggeredFadeIn>
      </Section>

      {/* Military Standards Section */}
      <Section variant="default" padding="default">
        <SectionHeader
          subtitle="Our Foundation"
          title={
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Military Standards in Every Project
            </span>
          }
          description="The values we learned in service guide everything we do in construction."
          maxWidth="4xl"
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
                      Putting client mission above company profit
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
      </Section>

      {/* Annual Fishing Event Section - MOVED LATER FOR SEO */}
      <section
        id="fishing-event"
        className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-20 lg:py-32"
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
                fishing, fellowship, and gratitude on Pacific Northwest waters.
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
                  Made possible by generous sponsors and volunteers committed to
                  supporting those who've served our country.
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
            <Card className={getCardClassName("default", "max-w-4xl mx-auto")}>
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

      {/* Sponsorship Opportunities Section */}
      <section id="sponsorship" className="relative py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
              <h2 className="mb-8 font-black text-brand-primary dark:text-brand-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight">
                Become an Event Sponsor
              </h2>
              <p className="mx-auto max-w-3xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                Support veterans in your community while gaining valuable brand
                exposure and making a meaningful impact on those who've served.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Platinum Sponsor */}
            <Card
              className={getCardClassName(
                "default",
                "border-t-4 border-t-purple-500",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <MaterialIcon
                    icon="workspace_premium"
                    className="text-purple-500 text-5xl"
                  />
                  <span className="text-purple-500 font-black text-3xl">
                    $10,000+
                  </span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Platinum Sponsor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                    />
                    <span>Title sponsor recognition in all materials</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                    />
                    <span>Logo on event t-shirts and promotional items</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                    />
                    <span>Speaking opportunity at awards ceremony</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                    />
                    <span>20+ social media posts featuring your brand</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-purple-500"
                    />
                    <span>10 complimentary event registrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Gold Sponsor */}
            <Card
              className={getCardClassName(
                "default",
                "border-t-4 border-t-yellow-500",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <MaterialIcon
                    icon="stars"
                    className="text-yellow-500 text-5xl"
                  />
                  <span className="text-yellow-500 font-black text-3xl">
                    $5,000+
                  </span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-2xl sm:text-3xl">
                  Gold Sponsor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                    />
                    <span>Premier sponsor recognition</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                    />
                    <span>Logo on event t-shirts and banners</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                    />
                    <span>10+ social media posts</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-yellow-500"
                    />
                    <span>6 complimentary event registrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Silver Sponsor */}
            <Card
              className={getCardClassName(
                "default",
                "border-t-4 border-t-gray-400",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <MaterialIcon
                    icon="grade"
                    className="text-gray-400 text-5xl"
                  />
                  <span className="text-gray-400 font-black text-3xl">
                    $2,500+
                  </span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Silver Sponsor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-gray-400"
                    />
                    <span>Sponsor recognition in materials</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-gray-400"
                    />
                    <span>Logo on event website</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-gray-400"
                    />
                    <span>5+ social media mentions</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-gray-400"
                    />
                    <span>4 complimentary event registrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Bronze Sponsor */}
            <Card
              className={getCardClassName(
                "default",
                "border-t-4 border-t-orange-600",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <MaterialIcon
                    icon="emoji_events"
                    className="text-orange-600 text-5xl"
                  />
                  <span className="text-orange-600 font-black text-3xl">
                    $1,000+
                  </span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                  Bronze Sponsor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-orange-600"
                    />
                    <span>Name recognition in event materials</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-orange-600"
                    />
                    <span>Social media mentions</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-orange-600"
                    />
                    <span>2 complimentary event registrations</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      className="flex-shrink-0 mt-1 mr-3 text-orange-600"
                    />
                    <span>Company name on website</span>
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
                  icon="volunteer_activism"
                  className="mx-auto mb-4 text-brand-accent text-5xl"
                />
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center">
                  In-Kind Donations Welcome
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-700 dark:text-gray-300 text-lg mb-6">
                  We also accept in-kind donations including boats, food,
                  fishing gear, prizes, professional services, and more.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Boats & Captains
                  </span>
                  <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Food & Beverage
                  </span>
                  <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Fishing Equipment
                  </span>
                  <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Prizes & Giveaways
                  </span>
                  <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Photography/Video
                  </span>
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
              <span>Contact Us About Sponsorship</span>
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Next Steps Section */}
      <NextStepsSection />
    </div>
  );
}
