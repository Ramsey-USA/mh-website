"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Section, SectionHeader } from "@/components/ui/layout";
import { AggregateRating } from "@/components/ratings";
import { getClientTestimonials } from "@/lib/data/testimonials";
import {
  AboutHero,
  AboutValues,
  coreValues,
  PartnershipPhilosophy,
  CompanyStats,
  LeadershipTeam,
  SafetySection,
  AwardsSection,
} from "@/components/about";
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";
import { PartnershipCTA } from "@/components/home/PartnershipCTA";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Partnership Philosophy Section */}
      <PartnershipPhilosophy />

      {/* Company Stats */}
      <CompanyStats />

      {/* Core Values Section */}
      <AboutValues coreValues={coreValues} />

      {/* Awards & Recognition Section - MOVED BEFORE TESTIMONIALS FOR CREDIBILITY */}
      <AwardsSection />

      {/* Next Steps Section */}
      <section
        id="next-steps"
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 py-20 lg:py-32"
      >
        <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-5"></div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-black text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto max-w-3xl font-light text-primary-100 text-xl sm:text-2xl md:text-3xl leading-relaxed">
              Let's partner together to bring your construction vision to life
              with veteran-owned excellence and military precision.
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-12">
            {/* Option 1: Schedule Consultation */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
                <MaterialIcon icon="event" size="xl" className="text-white" />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
                Schedule Consultation
              </h3>
              <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                Book a free 45-60 minute consultation to discuss your project
                goals, timeline, and budget.
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600 flex-shrink-0"
                  />
                  <span>Free consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600 flex-shrink-0"
                  />
                  <span>Expert recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600 flex-shrink-0"
                  />
                  <span>No obligation</span>
                </li>
              </ul>
              <Link href="/booking">
                <Button variant="primary" size="lg" className="w-full group">
                  <MaterialIcon
                    icon="calendar_today"
                    size="md"
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Book Consultation
                </Button>
              </Link>
            </div>

            {/* Option 2: Get Quick Estimate */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-4 border-secondary-500">
              <div className="bg-secondary-500 -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-md">
                <span className="font-bold text-sm text-white uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
              <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
                <MaterialIcon
                  icon="calculate"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
                Get Quick Estimate
              </h3>
              <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                Receive a detailed project estimate within 3-5 business days
                with transparent pricing.
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600 flex-shrink-0"
                  />
                  <span>3-5 day turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600 flex-shrink-0"
                  />
                  <span>Detailed line items</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600 flex-shrink-0"
                  />
                  <span>Open-book pricing</span>
                </li>
              </ul>
              <Link href="/estimator">
                <Button variant="secondary" size="lg" className="w-full group">
                  <MaterialIcon
                    icon="description"
                    size="md"
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Request Estimate
                </Button>
              </Link>
            </div>

            {/* Option 3: Contact Us */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
                <MaterialIcon
                  icon="contact_phone"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
                Contact Us Directly
              </h3>
              <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                Reach out via phone, email, or contact form for immediate
                assistance with your project.
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600 flex-shrink-0"
                  />
                  <span>24-48hr response</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600 flex-shrink-0"
                  />
                  <span>Multiple contact methods</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600 flex-shrink-0"
                  />
                  <span>Direct team access</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-accent-600 hover:bg-accent-700 group"
                >
                  <MaterialIcon
                    icon="mail"
                    size="md"
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 text-center text-white">
            <div>
              <p className="mb-2 font-black text-4xl">20+</p>
              <p className="text-primary-100">Years Experience</p>
            </div>
            <div>
              <p className="mb-2 font-black text-4xl">.6</p>
              <p className="text-primary-100">EMR Safety Rating</p>
            </div>
            <div>
              <p className="mb-2 font-black text-4xl">70%</p>
              <p className="text-primary-100">Referral Business</p>
            </div>
            <div>
              <p className="mb-2 font-black text-4xl">24/7</p>
              <p className="text-primary-100">Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section - AFTER AWARDS FOR SEO */}
      <section
        id="testimonials"
        className="bg-white dark:bg-gray-900 py-20 lg:py-32"
      >
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Reviews
                </span>
              </h2>
              <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Hear directly from our partners about their experience working
                with MH Construction on their most important projects.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn
            className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
          >
            <Card className="bg-white dark:bg-gray-900 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcon
                        key={i}
                        icon="star"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed text-sm sm:text-base md:text-lg">
                  &ldquo;Working with Todd and the MH Construction team on our
                  Baskin Robbins build was exceptional. Todd&apos;s
                  communication throughout the entire project kept us informed
                  every step of the way, and the quality of workmanship exceeded
                  our expectations. From start to finish, they demonstrated
                  professionalism and attention to detail that made this build a
                  success.&rdquo;
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon
                      icon="store"
                      size="sm"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                      John Smith
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Baskin Robbins Store Build - $250K Project
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcon
                        key={i}
                        icon="star"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed text-sm sm:text-base md:text-lg">
                  &ldquo;The tenant improvement process with MH Construction was
                  outstanding from design through construction. Their ability to
                  facilitate the entire process while managing multiple
                  stakeholders, coordinating various processes, overseeing
                  employees and subcontractors, and maintaining transparency and
                  fairness throughout was truly impressive.&rdquo;
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon
                      icon="business"
                      size="sm"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                      Keith Bjella
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Commercial Tenant Improvement - $320K Project
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900 hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcon
                        key={i}
                        icon="star"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed text-sm sm:text-base md:text-lg">
                  &ldquo;MH Construction exceeded our expectations in every way.
                  Their military precision and attention to detail resulted in
                  our dream home being completed ahead of schedule and within
                  budget. The veteran-owned values really showed in their
                  commitment to excellence.&rdquo;
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-primary/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon
                      icon="home"
                      size="sm"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                      Jennifer & Mike Thompson
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Custom Family Home - $475K Project
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggeredFadeIn>

          {/* Aggregate Rating - SEO Enhanced */}
          <div className="mt-16 lg:mt-24">
            <AggregateRating
              testimonials={getClientTestimonials()}
              variant="default"
              showBreakdown={true}
              title="Overall Client Satisfaction"
              className="max-w-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <LeadershipTeam />

      {/* Why Values Matter Section */}
      <Section variant="default" padding="default">
        <SectionHeader
          subtitle="Why Our Values"
          title={
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Matter
            </span>
          }
          description="Our commitment to integrity, transparency, and excellence drives every project decision and partnership we build. These aren't just words on a wall—they're the foundation of how we do business and the promise we make to every client."
          maxWidth="4xl"
        />

        <StaggeredFadeIn className={gridPresets.cards3("md")}>
          <Card
            className={getCardClassName(
              "default",
              "border-l-4 border-l-brand-primary hover:-translate-y-2 duration-300 hover:shadow-xl",
            )}
          >
            <CardHeader className="text-center">
              <MaterialIcon
                icon="people"
                className="mb-4 text-brand-primary text-5xl"
              />
              <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                For Our Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Predictable, consistent experience you can count on
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Peace of mind knowing your project is in capable hands
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Long-term partnership beyond project completion
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    True ROI—the return is the relationship
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={getCardClassName(
              "default",
              "border-l-4 border-l-brand-secondary hover:-translate-y-2 duration-300 hover:shadow-xl",
            )}
          >
            <CardHeader className="text-center">
              <MaterialIcon
                icon="location_city"
                className="mb-4 text-brand-secondary text-5xl"
              />
              <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                For Our Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Economic development supporting local suppliers
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Raising quality standards in construction industry
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Veteran support and opportunities for military families
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Building structures serving communities for generations
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={getCardClassName(
              "default",
              "border-l-4 border-l-brand-accent hover:-translate-y-2 duration-300 hover:shadow-xl",
            )}
          >
            <CardHeader className="text-center">
              <MaterialIcon
                icon="engineering"
                className="mb-4 text-brand-accent text-5xl"
              />
              <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                For Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Professional pride in meaningful work
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Clear standards and expectations in every interaction
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Personal growth in environment valuing excellence
                  </span>
                </li>
                <li className="flex items-start">
                  <MaterialIcon
                    icon="check_circle"
                    className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                  />
                  <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                    Being part of something larger than individual projects
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </StaggeredFadeIn>
      </Section>

      {/* Safety & Compliance Section */}
      <SafetySection />

      {/* News & Achievements Section - MERGED from Company Blog + Latest News */}
      <section
        id="news"
        className="relative bg-gray-50 dark:bg-gray-800 py-20 lg:py-32"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  News, Insights &
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Company Achievements
                </span>
              </h2>
              <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Stay updated with our latest projects, partnerships, industry
                insights, and milestones from our veteran-owned team
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Combined grid with best content from both sections - 6 items total */}
          <div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
            {/* Company Milestone */}
            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-primary h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="celebration"
                        className="text-brand-primary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-primary text-xs sm:text-sm">
                        Company Milestone
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Nov 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    50+ Successful Partnerships in Pacific Northwest
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    We&apos;re proud to announce reaching a major milestone:
                    over 50 completed construction partnerships across
                    Washington and Oregon. Thank you to all our clients and
                    trade partners who made this possible.
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      View Our Work
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-secondary h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="rocket_launch"
                        className="text-brand-secondary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                        New Technology
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Integrated CRM & Project Management Platform
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    We&apos;re implementing High-Level CRM to provide seamless
                    communication, real-time project updates, and enhanced
                    client experience throughout your construction journey.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      Learn More
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-accent h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="handshake"
                        className="text-brand-accent"
                        size="md"
                      />
                      <span className="font-semibold text-brand-accent text-xs sm:text-sm">
                        Partnership
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Oct 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Expanding Trade Partner Network
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    We&apos;re actively growing our network of skilled trade
                    partners to better serve our clients across the Pacific
                    Northwest. Join our veteran-owned partnership program.
                  </p>
                  <Link
                    href="/trade-partners"
                    className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      Become a Partner
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="border-l-4 border-l-brand-secondary h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="workspace_premium"
                        className="text-brand-secondary"
                        size="md"
                      />
                      <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                        Recognition
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                      Sep 2025
                    </span>
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Award-Winning Safety Record
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                    Our commitment to safety excellence has been recognized by
                    industry organizations. Zero accidents, 100% compliance -
                    that&apos;s the veteran-owned difference.
                  </p>
                  <Link
                    href="/about#safety"
                    className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      Safety Standards
                    </span>
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="ml-1"
                    />
                  </Link>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>

          {/* Footer note about future blog */}
          <FadeInWhenVisible className="mt-12 text-center">
            <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block">
              <div className="flex items-center gap-3">
                <MaterialIcon
                  icon="info"
                  size="md"
                  className="text-brand-primary"
                />
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Full blog with integrated High-Level CRM coming soon
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced Partnership Call to Action Section */}
      <PartnershipCTA />
    </div>
  );
}
