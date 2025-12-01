"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  JobApplicationModal,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { ChatbotCTASection } from "@/components/chatbot";
import { TestimonialGrid } from "@/components/testimonials";
import { getEmployeeTestimonials } from "@/lib/data/testimonials";
import {
  openPositions,
  companyBenefits,
  veteranBenefits,
  cultureValues,
} from "@/lib/data/careers";
import { gridPresets } from "@/lib/styles/layout-variants";
import { getCardClassName } from "@/lib/styles/card-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

export default function CareersPage() {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleApplyNow = (_position?: string) => {
    // Position parameter reserved for future use to pre-fill the application form
    setShowApplicationModal(true);
  };

  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Careers"
        description="We're perfecting our career opportunities and benefits information to attract the best talent and accurately represent what makes MH Construction a great place to build your future."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section - Group 5: Recruitment & Growth */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Your Future Starts Here
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              Join a Team That Invests in You • Where Your Growth Is Our Mission
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              "Building for the Client,{" "}
              <span className="font-black text-bronze-300">NOT</span> the
              Dollar" — This isn't just how we treat customers—it's how we treat
              YOU. Join a veteran-led team where your career growth is our
              mission, your success is celebrated daily, and your future matters
              as much as any project we build. Award-winning safety (.64 EMR),
              150+ years combined expertise, and a culture where veterans and
              civilians thrive together. Your potential has a home here. Let's
              build YOUR future.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.careers}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
        {/* Why Work With Us */}
        <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden mb-20 lg:mb-32">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>

          {/* Animated Blur Orbs */}
          <div className="top-20 left-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="right-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 left-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mb-12 sm:mb-16 text-center">
                {/* Icon Header with Glow Effect */}
                <div className="flex justify-center items-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="star"
                        size="2xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Line Header */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Why Choose
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    MH Construction
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  This isn't just another construction job—it's a{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    career investment
                  </span>{" "}
                  in YOU. We're building your skills, your future, and your
                  financial security through meaningful work, continuous
                  training, and authentic partnerships. Every team member gets a
                  mentor, clear advancement paths, and the tools to succeed.
                  Your growth IS our success story.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className={gridPresets.cards4("lg")}>
              {cultureValues.map((value, index) => (
                <Card
                  key={index}
                  className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary hover:-translate-y-2 transition-all duration-300"
                >
                  <CardContent className="flex flex-col flex-grow p-6 xs:p-7 sm:p-8 text-center">
                    <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon={value.icon}
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg">
                      {value.title}
                    </h3>
                    <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Benefits & Perks */}
        <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden mb-20 lg:mb-32">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>

          {/* Animated Blur Orbs */}
          <div className="top-20 right-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="left-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 right-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mb-12 sm:mb-16 text-center">
                {/* Icon Header with Glow Effect */}
                <div className="flex justify-center items-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="volunteer_activism"
                        size="2xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Line Header */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Employee Benefits
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    & Perks
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  Your well-being and success matter here. We offer{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    competitive pay plus comprehensive benefits
                  </span>{" "}
                  because we know you're building a life, not just a career.
                  From health coverage to professional development, retirement
                  planning to performance bonuses—we invest in your total
                  success, every single day.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className={gridPresets.cards3("md")}>
              {companyBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-secondary transition-all duration-300"
                >
                  <CardContent className="flex flex-col flex-grow p-6 xs:p-7 sm:p-8">
                    <div className="mb-4">
                      <MaterialIcon
                        icon={benefit.icon}
                        size="xl"
                        className="text-brand-primary mb-3"
                      />
                      <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-lg">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Veteran Benefits Section */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 p-8 xs:p-10 sm:p-12 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="mb-12 text-center">
                <div className="flex justify-center items-center mb-4">
                  <MaterialIcon
                    icon="military_tech"
                    size="2xl"
                    className="text-brand-primary"
                  />
                </div>
                <h2 className="mb-6 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Supporting Our
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    Veterans
                  </span>
                </h2>
                <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-base xs:text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                  Veteran-owned, veteran-led, veteran-proud. Your military
                  experience translates directly to construction excellence:
                  discipline becomes precision, teamwork becomes partnership,
                  mission focus becomes project completion. We don't just hire
                  veterans—we celebrate your service, honor your skills, and
                  build careers that match your dedication. Priority hiring,
                  specialized transition support, and a command structure you
                  understand. Welcome home.
                </p>
              </div>

              <StaggeredFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {veteranBenefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className={getCardClassName(
                      "default",
                      "bg-white dark:bg-gray-800",
                    )}
                  >
                    <CardContent className="p-6">
                      <MaterialIcon
                        icon={benefit.icon}
                        size="lg"
                        className="text-brand-primary mb-3"
                      />
                      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100 text-base">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredFadeIn>

              <FadeInWhenVisible>
                <div className="mt-10 text-center">
                  <p className="mb-6 font-medium text-gray-700 text-lg dark:text-gray-300">
                    Veterans receive priority consideration for all positions
                  </p>
                  <div className="flex sm:flex-row flex-col justify-center gap-6 mt-10">
                    <Button
                      onClick={() => handleApplyNow("Veteran Application")}
                      variant="primary"
                      size="lg"
                      className="transition-all duration-300 min-w-[260px]"
                    >
                      <MaterialIcon
                        icon="military_tech"
                        size="lg"
                        className="mr-3"
                      />
                      <span className="font-medium">Apply as Veteran</span>
                    </Button>
                    <Link href="/veterans">
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon icon="info" size="lg" className="mr-3" />
                        <span className="font-medium">Veterans Initiative</span>
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon
                          icon="contact_mail"
                          size="lg"
                          className="mr-3"
                        />
                        <span className="font-medium">
                          Contact Veteran Liaison
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </FadeInWhenVisible>
        </section>

        {/* Open Positions */}
        <section
          id="positions"
          className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden mb-20 lg:mb-32"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>

          {/* Animated Blur Orbs */}
          <div className="top-20 left-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="right-10 bottom-20 absolute bg-brand-accent/10 dark:bg-brand-accent/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 left-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mb-12 sm:mb-16 text-center">
                {/* Icon Header with Glow Effect */}
                <div className="flex justify-center items-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-accent/20 dark:bg-brand-accent/30 blur-xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-accent to-bronze-600 p-4 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="work"
                        size="2xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Line Header */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Current Career
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    Opportunities
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  Your next career chapter starts here. These aren't just job
                  openings—they're{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    gateways to your future
                  </span>
                  . Every position offers competitive pay, comprehensive
                  training, clear advancement paths, and the chance to build
                  something meaningful. Veterans receive priority consideration.
                  Find your perfect fit below.
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="space-y-6">
              {openPositions.map((position, _index) => (
                <Card
                  key={_index}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-accent transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex sm:flex-row flex-col justify-between items-start mb-6">
                      <div className="flex-grow">
                        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-2xl">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="flex items-center text-gray-600 dark:text-gray-300">
                            <MaterialIcon
                              icon="business"
                              className="mr-1"
                              size="sm"
                            />
                            {position.department}
                          </span>
                          <span className="flex items-center text-gray-600 dark:text-gray-300">
                            <MaterialIcon
                              icon="location_on"
                              className="mr-1"
                              size="sm"
                            />
                            {position.location}
                          </span>
                          <span className="flex items-center text-gray-600 dark:text-gray-300">
                            <MaterialIcon
                              icon="schedule"
                              className="mr-1"
                              size="sm"
                            />
                            {position.type}
                          </span>
                          <span className="flex items-center text-gray-600 dark:text-gray-300">
                            <MaterialIcon
                              icon="work"
                              className="mr-1"
                              size="sm"
                            />
                            {position.experience}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {position.description}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <Button
                          onClick={() => handleApplyNow(position.title)}
                          variant="primary"
                          size="lg"
                          className="transition-all duration-300 min-w-[180px]"
                        >
                          <MaterialIcon
                            icon="send"
                            size="lg"
                            className="mr-3"
                          />
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    <div className={gridPresets.twoColumn("lg")}>
                      <div>
                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, reqIndex) => (
                            <li
                              key={reqIndex}
                              className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                            >
                              <MaterialIcon
                                icon="check_circle"
                                className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary"
                                size="sm"
                              />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                          What We Offer
                        </h4>
                        <ul className="space-y-2">
                          {position.benefits.map((benefit, benefitIndex) => (
                            <li
                              key={benefitIndex}
                              className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                            >
                              <MaterialIcon
                                icon="star"
                                className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                                size="sm"
                              />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Application Process Guide Section */}
        <section id="application-process" className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-16 text-center">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Your Journey to
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    Join Our Team
                  </span>
                </h2>

                <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                  No games, no ghosting, no endless waiting. Our hiring process
                  is transparent, efficient, and respectful of YOUR time—because
                  we know you're evaluating us just as much as we're evaluating
                  your fit. Fast-track options available for exceptional
                  candidates. Most offers extended within 2-3 weeks. Here's
                  exactly what to expect.
                </p>
              </div>

              <div className="gap-8 grid grid-cols-1 lg:grid-cols-5 mb-12">
                {/* Step 1: Submit Application */}
                <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                  <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mb-4 rounded-full w-14 h-14">
                    <span className="font-black text-2xl text-white">1</span>
                  </div>
                  <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="description"
                      size="lg"
                      className="text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Submit Application
                  </h3>
                  <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                    Complete our online application form or email your resume to
                    careers@mhc-gc.com. Include relevant certifications and
                    references.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="schedule"
                        size="sm"
                        className="text-accent-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        Response within 3-5 business days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Phone Screening */}
                <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                  <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mb-4 rounded-full w-14 h-14">
                    <span className="font-black text-2xl text-white">2</span>
                  </div>
                  <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="phone"
                      size="lg"
                      className="text-secondary-600 dark:text-secondary-400"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Phone Screening
                  </h3>
                  <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                    Brief 15-20 minute phone conversation to discuss your
                    background, career goals, and answer initial questions.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="schedule"
                        size="sm"
                        className="text-accent-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        15-20 minutes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3: In-Person Interview */}
                <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                  <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mb-4 rounded-full w-14 h-14">
                    <span className="font-black text-2xl text-white">3</span>
                  </div>
                  <div className="flex justify-center items-center bg-accent-100 dark:bg-accent-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="groups"
                      size="lg"
                      className="text-accent-600 dark:text-accent-400"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    In-Person Interview
                  </h3>
                  <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                    Meet our team at our office or job site. Discuss your
                    technical skills, safety mindset, and cultural fit.
                    Questions encouraged!
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="schedule"
                        size="sm"
                        className="text-accent-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        45-60 minutes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 4: Background Check */}
                <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                  <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mb-4 rounded-full w-14 h-14">
                    <span className="font-black text-2xl text-white">4</span>
                  </div>
                  <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="verified_user"
                      size="lg"
                      className="text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Background Check
                  </h3>
                  <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                    Standard background and reference checks to verify
                    employment history and qualifications. Drug screening may be
                    required.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="schedule"
                        size="sm"
                        className="text-accent-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        3-7 business days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 5: Offer & Onboarding */}
                <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                  <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mb-4 rounded-full w-14 h-14">
                    <span className="font-black text-2xl text-white">5</span>
                  </div>
                  <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="celebration"
                      size="lg"
                      className="text-secondary-600 dark:text-secondary-400"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                    Offer & Onboarding
                  </h3>
                  <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                    Receive formal offer, complete paperwork, and begin
                    orientation. Meet your mentor, get safety training, and
                    start building your career.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="schedule"
                        size="sm"
                        className="text-accent-600"
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        1-2 weeks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Details */}
              <FadeInWhenVisible>
                <div className="bg-white dark:bg-gray-800 shadow-md mt-12 p-8 rounded-xl">
                  <h3 className="mb-6 font-bold text-center text-gray-900 text-xl dark:text-gray-100">
                    What to Expect Timeline
                  </h3>
                  <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                    <div className="text-center">
                      <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-3 rounded-full w-12 h-12">
                        <MaterialIcon
                          icon="flash_on"
                          size="md"
                          className="text-primary-600"
                        />
                      </div>
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                        Fast-Track Available
                      </h4>
                      <p className="text-gray-600 text-sm dark:text-gray-300">
                        Exceptional candidates with urgent availability may
                        complete the process in 1 week
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-3 rounded-full w-12 h-12">
                        <MaterialIcon
                          icon="verified"
                          size="md"
                          className="text-secondary-600"
                        />
                      </div>
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                        Standard Process
                      </h4>
                      <p className="text-gray-600 text-sm dark:text-gray-300">
                        Most candidates complete the full process in 2-3 weeks
                        from application to offer
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center bg-accent-100 dark:bg-accent-900/30 mx-auto mb-3 rounded-full w-12 h-12">
                        <MaterialIcon
                          icon="support_agent"
                          size="md"
                          className="text-accent-600"
                        />
                      </div>
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                        Always Transparent
                      </h4>
                      <p className="text-gray-600 text-sm dark:text-gray-300">
                        We keep you informed at every stage and are always
                        available for your questions
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <p className="mb-6 font-medium text-gray-700 text-xl dark:text-gray-300">
                  Ready to start your journey with MH Construction?
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => {
                      const positionsSection =
                        document.getElementById("positions");
                      positionsSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    variant="primary"
                    size="lg"
                  >
                    <MaterialIcon icon="work" size="md" className="mr-2" />
                    View Open Positions
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = "mailto:careers@mhc-gc.com";
                    }}
                    variant="secondary"
                    size="lg"
                  >
                    <MaterialIcon icon="email" size="md" className="mr-2" />
                    Email Your Resume
                  </Button>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </section>

        {/* Employee Testimonials */}
        <section
          id="testimonials"
          className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden mb-20 lg:mb-32"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>

          {/* Animated Blur Orbs */}
          <div className="top-20 right-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="left-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 right-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mb-12 sm:mb-16 text-center">
                {/* Icon Header with Glow Effect */}
                <div className="flex justify-center items-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="groups"
                        size="2xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Line Header */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Hear From Our
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    Team Members
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  Don't just take our word for it—hear directly from{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    the people who work here
                  </span>{" "}
                  every day. Real stories from real team members about career
                  growth, workplace culture, leadership support, and why they
                  chose to build their futures with MH Construction. These
                  aren't scripted testimonials—they're authentic voices sharing
                  what makes this place special.
                </p>
              </div>
            </FadeInWhenVisible>

            <TestimonialGrid testimonials={getEmployeeTestimonials()} />
          </div>
        </section>

        {/* General Application Section */}
        <section id="general-application" className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 p-10 sm:p-12 md:p-16 rounded-2xl text-center border border-gray-200 dark:border-gray-700">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Don't See the
                </span>
                <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                  Perfect Role?
                </span>
              </h2>

              <p className="mx-auto mb-10 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                Your perfect role might not exist yet—but your FUTURE does.
                We're always seeking exceptional people who share our values:
                military precision, partnership mindset, quality obsession, and
                safety excellence. Veterans, experienced professionals, career
                changers, skilled trades—if you bring dedication and potential,
                we'll invest in your growth. Sometimes the best opportunities
                aren't posted; they're created when the right person reaches
                out. Tell us your story. Share your dreams. Let's build YOUR
                career path together. That conversation starts right now.
              </p>

              {/* CTA Buttons - Brand Standards */}
              <div className="flex sm:flex-row flex-col justify-center gap-6">
                <Button
                  onClick={() => handleApplyNow("General Application")}
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 min-w-[260px]"
                >
                  <MaterialIcon icon="upload" size="lg" className="mr-3" />
                  <span className="font-medium">Submit Application</span>
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="transition-all duration-300 min-w-[260px]"
                  >
                    <MaterialIcon
                      icon="contact_mail"
                      size="lg"
                      className="mr-3"
                    />
                    <span className="font-medium">Contact HR</span>
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-gray-500 dark:text-gray-400 text-lg">
                <MaterialIcon icon="phone" className="inline mr-2" size="sm" />
                HR Hotline: (509) 308-6489 |{" "}
                <a
                  href="mailto:office@mhc-gc.com"
                  className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                >
                  office@mhc-gc.com
                </a>
              </p>
            </div>
          </FadeInWhenVisible>
        </section>
      </div>

      {/* Chatbot CTA - Career Questions */}
      <ChatbotCTASection
        context="careers"
        title="Questions About Careers?"
        subtitle="Chat with General MH for instant answers about jobs, benefits, hiring process, and growth opportunities"
        exampleQuestions={[
          "What is your hiring process?",
          "Do you have veteran benefits?",
          "What are the pay ranges?",
          "How do I apply?",
          "What are career growth opportunities?",
        ]}
      />

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </div>
  );
}
