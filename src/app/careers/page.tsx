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
import { SectionHeader } from "@/components/ui/layout";
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
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";

export default function CareersPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleApplyNow = (_position?: string) => {
    // Position parameter reserved for future use to pre-fill the application form
    setShowApplicationModal(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Your Future Starts Here
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              Join a Team That Invests in You • Building for the Client, NOT the
              Dollar
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              Where talent meets opportunity! Join a veteran-owned family that's
              building more than projects—we're building careers. Award-winning
              .6 EMR safety, 150+ years combined experience, and a culture that
              celebrates your growth. Where veterans and civilians build
              together, where your success is our success, and where every team
              member matters. Ready to build your future?
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
        <section className="mb-20 lg:mb-32">
          <SectionHeader
            subtitle="Why Join"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                MH Construction
              </span>
            }
            description="Veteran-owned family investing in your success. Award-winning .6 EMR safety, 3+ years no time-loss injury. When you succeed, we all succeed."
          />

          <StaggeredFadeIn className={gridPresets.cards4("lg")}>
            {cultureValues.map((value, _index) => (
              <Card key={_index} className={getCardClassName("default")}>
                <CardContent className="flex flex-col p-6 h-full text-center">
                  <div
                    className={`flex justify-center items-center bg-gradient-to-r ${value.color} mx-auto mb-4 rounded-full w-16 h-16`}
                  >
                    <MaterialIcon
                      icon={value.icon}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                    {value.title}
                  </h3>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Benefits & Perks */}
        <section className="mb-20 lg:mb-32">
          <SectionHeader
            subtitle="Employee Benefits"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                & Perks
              </span>
            }
            description="We believe in taking care of our team members with comprehensive benefits, continuous learning opportunities, and a supportive work environment where everyone goes home safe, every single day. Professional development includes regular training on new techniques, safety standards (OSHA 30, VPP Star), technology, plus cross-training across specialties, structured mentorship programs pairing experienced professionals with emerging leaders, and industry involvement that keeps you at the forefront of construction excellence."
          />

          <StaggeredFadeIn className={gridPresets.cards4("md", "mb-12")}>
            {companyBenefits.map((benefit, _index) => (
              <Card key={_index} className={getCardClassName("static")}>
                <CardContent className="flex flex-col p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon={benefit.icon}
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Employee Stories Section - POSITIONED AT 25-30% PAGE DEPTH FOR SEO */}
        <section id="employee-stories" className="mb-20 lg:mb-32">
          <TestimonialGrid
            testimonials={getEmployeeTestimonials()}
            title="Hear From Our Team Members"
            subtitle="Real stories from real people who chose to build their careers with MH Construction—from military veterans to skilled tradespeople"
            variant="employee"
            columns={3}
          />
        </section>

        {/* Veteran Benefits Section - DEDICATED */}
        <section id="veteran-benefits" className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-brand-primary/5 via-forest-600/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:via-forest-600/10 dark:to-brand-secondary/10 p-12 lg:p-16 rounded-2xl">
              <SectionHeader
                icon="military_tech"
                iconClassName="w-16 h-16"
                subtitle="Veteran Benefits"
                title={
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    & Support Programs
                  </span>
                }
                description={
                  <>
                    <strong className="text-brand-primary font-semibold">
                      Veteran-owned since January 2025 under Army veteran
                      leadership.
                    </strong>{" "}
                    We honor your service with dedicated programs, priority
                    hiring, and a workplace that understands military values—
                    discipline, precision, mission focus, and service above
                    self. Join a team where your military experience is not just
                    recognized but celebrated and leveraged for construction
                    excellence.
                  </>
                }
              />

              <StaggeredFadeIn className={gridPresets.cards3("md", "mb-12")}>
                {veteranBenefits.map((benefit, _index) => (
                  <Card key={_index} className={getCardClassName("primary")}>
                    <CardContent className="flex flex-col p-6 h-full">
                      <div className="flex items-center mb-4">
                        <div className="flex justify-center items-center bg-gradient-to-r from-brand-primary to-forest-600 mr-4 rounded-full w-12 h-12">
                          <MaterialIcon
                            icon={benefit.icon}
                            size="lg"
                            className="text-white"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="flex-grow text-gray-600 dark:text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredFadeIn>

              {/* Veteran Success Stats */}
              <FadeInWhenVisible>
                <div className="bg-white dark:bg-gray-800 shadow-xl p-8 lg:p-12 border-2 border-brand-primary dark:border-brand-primary/50 rounded-xl">
                  <h3 className="mb-8 font-black text-center text-gray-900 dark:text-white text-2xl sm:text-3xl">
                    Why Veterans Choose MH Construction
                  </h3>
                  <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                    <div className="text-center">
                      <MaterialIcon
                        icon="shield"
                        size="3xl"
                        className="mb-4 text-brand-primary"
                      />
                      <p className="mb-2 font-black text-4xl text-brand-primary">
                        .6 EMR
                      </p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Military-Grade Safety Standards
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        40% better than industry average with 3+ years no
                        time-loss injuries
                      </p>
                    </div>
                    <div className="text-center">
                      <MaterialIcon
                        icon="groups"
                        size="3xl"
                        className="mb-4 text-brand-primary"
                      />
                      <p className="mb-2 font-black text-4xl text-brand-primary">
                        Army Vet
                      </p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Veteran-Owned Leadership
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        Led by those who understand military service and values
                      </p>
                    </div>
                    <div className="text-center">
                      <MaterialIcon
                        icon="trending_up"
                        size="3xl"
                        className="mb-4 text-brand-primary"
                      />
                      <p className="mb-2 font-black text-4xl text-brand-primary">
                        150+
                      </p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Years Combined Experience
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        Structured mentorship from veteran and civilian leaders
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 text-center">
                    <blockquote className="mb-4 font-medium text-gray-700 dark:text-gray-300 text-lg sm:text-xl italic">
                      "Veterans bring mission-focused reliability, discipline
                      under pressure, and a commitment to excellence that
                      directly translates to construction success. Your service
                      matters here."
                    </blockquote>
                    <cite className="font-semibold text-brand-primary">
                      — MH Construction Leadership
                    </cite>
                  </div>

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
                        <MaterialIcon
                          icon="phishing"
                          size="lg"
                          className="mr-3"
                        />
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

        {/* Open Positions - MOVED EARLIER for primary conversion focus */}
        <section id="positions" className="mb-20 lg:mb-32">
          <SectionHeader
            icon="work"
            subtitle="Current Career"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Opportunities
              </span>
            }
            description="Explore our current job opportunities and find the perfect role to advance your career with us."
          />

          <StaggeredFadeIn className="space-y-6">
            {openPositions.map((position, _index) => (
              <Card
                key={_index}
                className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex sm:flex-row flex-col justify-between items-start mb-6">
                    <div className="flex-grow">
                      <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl">
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
                        <MaterialIcon icon="send" size="lg" className="mr-3" />
                        Apply Now
                      </Button>
                    </div>
                  </div>

                  <div className={gridPresets.twoColumn("lg")}>
                    <div>
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
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
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
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
        </section>

        {/* Employee Stories Section */}
        <section id="employee-stories">
          <TestimonialGrid
            testimonials={getEmployeeTestimonials()}
            title="Hear From Our Team Members"
            subtitle="Real stories from real people who chose to build their careers with MH Construction—from military veterans to skilled tradespeople"
            variant="employee"
            columns={3}
          />
        </section>

        {/* Application Process Guide Section */}
        <section id="application-process" className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-16 text-center">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Your Journey to
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Join Our Team
                  </span>
                </h2>
                <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                  We've streamlined our hiring process to be transparent,
                  efficient, and respectful of your time. Here's what to expect
                  at every stage.
                </p>
              </div>

              <div className="gap-8 grid grid-cols-1 lg:grid-cols-5 mb-12">
                {/* Step 1: Submit Application */}
                <FadeInWhenVisible>
                  <div className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
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
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Submit Application
                    </h3>
                    <p className="mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                      Complete our online application form or email your resume
                      to careers@mhc-gc.com. Include relevant certifications and
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
                          5-10 minutes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="checklist"
                          size="sm"
                          className="text-accent-600"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          Resume, certifications
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Step 2: Phone Screening */}
                <FadeInWhenVisible>
                  <div className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                    <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mb-4 rounded-full w-14 h-14">
                      <span className="font-black text-2xl text-white">2</span>
                    </div>
                    <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="call"
                        size="lg"
                        className="text-secondary-600 dark:text-secondary-400"
                      />
                    </div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Phone Screening
                    </h3>
                    <p className="mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                      Brief conversation with our HR team to discuss your
                      experience, salary expectations, and availability. Expect
                      a call within 3-5 business days.
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
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="checklist"
                          size="sm"
                          className="text-accent-600"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          Salary range, availability
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Step 3: In-Person Interview */}
                <FadeInWhenVisible>
                  <div className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
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
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      In-Person Interview
                    </h3>
                    <p className="mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
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
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="checklist"
                          size="sm"
                          className="text-accent-600"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          Portfolio, references
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Step 4: Skills Assessment */}
                <FadeInWhenVisible>
                  <div className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                    <div className="flex justify-center items-center bg-gradient-to-br from-primary-600 to-primary-700 mb-4 rounded-full w-14 h-14">
                      <span className="font-black text-2xl text-white">4</span>
                    </div>
                    <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="engineering"
                        size="lg"
                        className="text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Skills Assessment
                    </h3>
                    <p className="mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                      Hands-on evaluation of technical abilities. Demonstrate
                      your craft, equipment operation, or trade skills under
                      real-world conditions.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="schedule"
                          size="sm"
                          className="text-accent-600"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          1-2 hours
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="checklist"
                          size="sm"
                          className="text-accent-600"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          Tools, safety gear
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Step 5: Offer & Onboarding */}
                <FadeInWhenVisible>
                  <div className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                    <div className="flex justify-center items-center bg-gradient-to-br from-secondary-600 to-secondary-700 mb-4 rounded-full w-14 h-14">
                      <span className="font-black text-2xl text-white">5</span>
                    </div>
                    <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="celebration"
                        size="lg"
                        className="text-secondary-600 dark:text-secondary-400"
                      />
                    </div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                      Offer & Onboarding
                    </h3>
                    <p className="mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
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
                          1-2 days
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="checklist"
                          size="sm"
                          className="text-accent-600"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                          I-9, W-4, direct deposit
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Timeline Overview */}
              <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
                <h3 className="flex items-center justify-center gap-3 mb-6 font-bold text-gray-900 dark:text-white text-2xl">
                  <MaterialIcon
                    icon="timeline"
                    size="lg"
                    className="text-primary-600"
                  />
                  Total Timeline: 1-3 Weeks
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
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
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
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      Background Checks
                    </h4>
                    <p className="text-gray-600 text-sm dark:text-gray-300">
                      Criminal background and driving record checks conducted
                      for all final candidates
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
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      Always Transparent
                    </h4>
                    <p className="text-gray-600 text-sm dark:text-gray-300">
                      We'll keep you updated at every stage—no ghosting, no
                      surprises
                    </p>
                  </div>
                </div>
              </div>

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

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 via-brand-primary/10 dark:via-brand-primary/20 to-brand-secondary/5 dark:to-brand-secondary/10 p-12 lg:p-16 xl:p-20 rounded-2xl">
          <FadeInWhenVisible>
            <div className="text-center">
              {/* NO SECTION BADGES - Icon only */}
              <div className="mb-8">
                <MaterialIcon
                  icon="groups"
                  size="4xl"
                  className="text-brand-primary"
                />
              </div>

              {/* Standard header - NO SECTION BADGES */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Don't See the
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Perfect Role?
                </span>
              </h2>

              <p className="mx-auto mb-10 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                We're always looking for talented individuals to join our
                veteran-owned team. Whether you're a military veteran bringing
                discipline and precision, an experienced professional seeking a
                partnership-focused company, or someone passionate about quality
                craftsmanship and safety excellence—send us your resume and let
                us know how you'd like to contribute to our mission of building
                relationships that last beyond project completion.
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
