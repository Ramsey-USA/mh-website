"use client";

import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Section, SectionHeader } from "@/components/ui/layout";
import {
  ServicesHero,
  ServiceCard,
  SpecialtyServiceCard,
  WhyChooseUs,
  ServicesCTA,
  coreServices,
  specialtyServices,
  serviceAreas,
} from "@/components/services";
import { TestimonialGrid } from "@/components/testimonials";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { ChatbotCTASection } from "@/components/chatbot";
import { QuickCostCalculator } from "@/components/calculator";
import { InteractiveTimeline } from "@/components/timeline";
import { gridPresets } from "@/lib/styles/layout-variants";

export default function ServicesPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <ServicesHero />

        {/* Construction Expertise Section */}
        <Section variant="default" padding="default">
          <SectionHeader
            subtitle="Partnership-Focused"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Construction Management
              </span>
            }
            description={
              <>
                <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                  Planning a new commercial building demands intricate details
                  and expert partnership oversight. Work WITH us through
                  comprehensive Partnership-Focused Construction Management
                  services throughout the Tri-Cities (Pasco, WA) area.
                </p>

                <div className="bg-brand-primary/5 dark:bg-gray-800 p-6 sm:p-8 border-brand-primary border-l-4 rounded-xl">
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                    <strong className="text-brand-primary dark:text-brand-primary-light block mb-2">
                      Our Partnership Priority:
                    </strong>
                    Delivering an exceptional partnership experience from start
                    to finish. Our commitment to thorough communication and
                    upfront collaboration is critical to streamlining the
                    process, preventing costly on-the-fly decisions later on.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      className="transition-all duration-300 min-w-[280px]"
                    >
                      <MaterialIcon icon="phone" size="lg" className="mr-3" />
                      <span className="font-medium">Call (509) 308-6489</span>
                    </Button>
                  </Link>
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      size="lg"
                      className="transition-all duration-300 min-w-[280px]"
                    >
                      <MaterialIcon icon="event" size="lg" className="mr-3" />
                      <span className="font-medium">
                        Schedule Free Consultation
                      </span>
                    </Button>
                  </Link>
                </div>
              </>
            }
          />
        </Section>

        {/* Core Services Section */}
        <Section id="core-services" variant="gray" padding="default">
          <SectionHeader
            subtitle="Core Partnership"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Services
              </span>
            }
            description="Comprehensive partnership-focused management services designed to bring your vision to life through collaboration and military precision"
          />

          <StaggeredFadeIn
            className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
          >
            {coreServices.map((service, _index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </StaggeredFadeIn>
        </Section>

        {/* Specialty Services Section */}
        <Section variant="default" padding="default">
          <SectionHeader
            subtitle="Specialized Partnership"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Solutions
              </span>
            }
            description="Diverse collaborative construction expertise across the Tri-Cities and Pacific Northwest region"
          />

          <StaggeredFadeIn
            className={gridPresets.cards3("lg", "mx-auto max-w-7xl")}
          >
            {specialtyServices.map((service, _index) => (
              <SpecialtyServiceCard
                key={index}
                service={service}
                index={index}
              />
            ))}
          </StaggeredFadeIn>
        </Section>

        {/* Service Areas Section */}
        <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-accent dark:to-gray-800 py-20 lg:py-32 text-white">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2 className="mb-8 pb-2 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Areas We
                  </span>
                  <span className="block text-white font-black">Serve</span>
                </h2>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn
              className={gridPresets.twoColumn("md", "mx-auto max-w-4xl")}
            >
              {serviceAreas.map((area, _index) => (
                <Card
                  key={index}
                  className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm border-white/30 p-8"
                >
                  <div className="flex items-center mb-6">
                    <MaterialIcon
                      icon={area.iconName}
                      size="2xl"
                      className="text-white mr-4"
                    />
                    <h3 className="text-white text-2xl font-bold">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {area.areas.map((location, lIndex) => (
                      <li key={lIndex} className="flex items-center">
                        <MaterialIcon
                          icon="check_circle"
                          size="md"
                          className="text-brand-secondary mr-3"
                        />
                        <span className="text-white/90 text-lg">
                          {location}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Client Testimonials Section - SERVICE FOCUSED */}
        <TestimonialGrid
          testimonials={getClientTestimonials()}
          title="What Our Partners Say About Us"
          subtitle="Real feedback from partners who trust us with their commercial and residential construction projects"
          variant="client"
          showViewMoreButton={true}
          viewMoreHref="/about#testimonials"
        />

        {/* Interactive Timeline Tool - Visualize Your Project */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
                  <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl">
                    Visualize Your
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary">
                    Project Timeline
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                  Get an instant view of your project phases and timeline.
                  Adjust complexity to see how different factors affect your
                  construction schedule.
                </p>
              </div>
            </FadeInWhenVisible>

            <InteractiveTimeline />
          </div>
        </section>

        {/* Construction Process Overview Section */}
        <section
          id="process"
          className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32"
        >
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Construction Process
                  </span>
                </h2>
                <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                  From initial consultation to project completion, we guide you
                  through every step with transparency, communication, and
                  collaborative excellence
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="mx-auto max-w-6xl">
              <StaggeredFadeIn className="space-y-8">
                {/* Step 1 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">1</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-primary border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="contact_phone"
                          size="lg"
                          className="text-brand-primary"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Initial Consultation
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        We start by listening to your vision, understanding your
                        needs, and discussing your project goals. Whether you
                        have detailed plans or just an idea, we'll work WITH you
                        to clarify scope, timeline, and budget expectations.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          Free Consultation
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          No Obligation
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          24-48 Hour Response
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-secondary to-brand-secondary-dark shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">2</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-secondary border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="calculate"
                          size="lg"
                          className="text-brand-secondary"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Detailed Estimation & Planning
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our Lead Estimator provides a comprehensive, transparent
                        cost breakdown with no hidden fees. We analyze all
                        variables, identify potential risks, and create a
                        realistic timeline. You'll understand every aspect of
                        your project costs upfront.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Transparent Pricing
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          20+ Years Experience
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          No Surprises
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-accent to-forest-700 shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">3</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-accent border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="description"
                          size="lg"
                          className="text-brand-accent"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Contract & Pre-Construction
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        We finalize contracts with clear terms, obtain necessary
                        permits, coordinate with subcontractors, and schedule
                        materials. Our Project Manager handles all paperwork,
                        submittals, and RFIs while keeping you informed every
                        step of the way.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Clear Contracts
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Permit Handling
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Full Coordination
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 4 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">4</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-primary border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="construction"
                          size="lg"
                          className="text-brand-primary"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Construction Execution
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our Senior Superintendent oversees all on-site
                        operations with award-winning safety standards (.6 EMR).
                        We provide regular progress updates, coordinate
                        subcontractors, manage quality inspections, and address
                        any issues immediately. You're never left wondering
                        what's happening.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          Daily Updates
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          .6 EMR Safety
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          Quality Control
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 5 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-secondary to-brand-secondary-dark shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">5</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-secondary border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="fact_check"
                          size="lg"
                          className="text-brand-secondary"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Quality Inspections & Compliance
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Multi-point quality inspections at every project phase
                        ensure code compliance and craftsmanship excellence.
                        Third-party inspections, building department
                        coordination, and thorough documentation mean your
                        project meets all standards.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Code Compliance
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Quality Checks
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Full Documentation
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 6 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-accent to-forest-700 shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">6</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-accent border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="check_circle"
                          size="lg"
                          className="text-brand-accent"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Project Close-Out & Follow-Up
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Final walkthrough, punch list completion, warranty
                        documentation, and post-project support ensure your
                        complete satisfaction. We don't disappear after
                        completion—THE ROI IS THE RELATIONSHIP means we're here
                        for the long term.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Final Walkthrough
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Warranty Support
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Ongoing Partnership
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </StaggeredFadeIn>

              {/* CTA Section */}
              <FadeInWhenVisible>
                <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 shadow-xl mx-auto mt-16 p-8 lg:p-12 border-2 border-brand-primary dark:border-brand-primary/50 rounded-2xl max-w-4xl text-center">
                  <MaterialIcon
                    icon="handshake"
                    size="4xl"
                    className="mb-6 text-brand-primary"
                  />
                  <h3 className="mb-4 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl">
                    Ready to Start Your Project?
                  </h3>
                  <p className="mb-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Let's discuss your construction needs and create a plan
                    together. Free consultation, transparent pricing, and
                    partnership-focused collaboration from day one.
                  </p>
                  <div className="flex sm:flex-row flex-col justify-center gap-6">
                    <Link href="/booking">
                      <Button
                        variant="primary"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon icon="event" size="lg" className="mr-3" />
                        <span className="font-medium">
                          Schedule Free Consultation
                        </span>
                      </Button>
                    </Link>
                    <Link href="/estimator">
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon
                          icon="calculate"
                          size="lg"
                          className="mr-3"
                        />
                        <span className="font-medium">Get Expert Estimate</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section
          id="next-steps"
          className="relative bg-gradient-to-br from-accent-600 via-accent-700 to-primary-600 py-20 lg:py-32"
        >
          <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-5"></div>
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-black text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                Let's Build Something Great Together
              </h2>
              <p className="mx-auto max-w-3xl font-light text-accent-100 text-xl sm:text-2xl md:text-3xl leading-relaxed">
                Take the next step toward bringing your construction vision to
                life with transparent pricing, expert guidance, and
                veteran-owned reliability.
              </p>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
              {/* Option 1: Request Estimate */}
              <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-primary-500">
                <div className="bg-primary-500 -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2">
                  <span className="font-bold text-sm text-white uppercase tracking-wide">
                    Start Here
                  </span>
                </div>
                <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 rounded-full w-20 h-20">
                  <MaterialIcon
                    icon="calculate"
                    size="xl"
                    className="text-white"
                  />
                </div>
                <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  Get Expert Estimate
                </h3>
                <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Get a detailed, transparent estimate with line-item pricing
                  within 3-5 business days.
                </p>
                <Link href="/estimator">
                  <Button variant="primary" size="lg" className="w-full">
                    <MaterialIcon icon="calculate" size="md" className="mr-2" />
                    Get Expert Estimate
                  </Button>
                </Link>
              </div>

              {/* Option 2: Schedule Consultation */}
              <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20">
                  <MaterialIcon icon="event" size="xl" className="text-white" />
                </div>
                <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  Schedule Free Consultation
                </h3>
                <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Book a free consultation to discuss your project scope,
                  timeline, and goals.
                </p>
                <Link href="/booking">
                  <Button variant="secondary" size="lg" className="w-full">
                    <MaterialIcon
                      icon="calendar_today"
                      size="md"
                      className="mr-2"
                    />
                    Schedule Free Consultation
                  </Button>
                </Link>
              </div>

              {/* Option 3: Contact Us */}
              <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 rounded-full w-20 h-20">
                  <MaterialIcon
                    icon="contact_phone"
                    size="xl"
                    className="text-white"
                  />
                </div>
                <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  Contact Us
                </h3>
                <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Have questions? Reach out directly via phone, email, or
                  contact form for immediate help.
                </p>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-accent-600 hover:bg-accent-700"
                  >
                    <MaterialIcon icon="mail" size="md" className="mr-2" />
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mt-12 text-center text-white">
              <div>
                <p className="mb-2 font-black text-4xl">150+</p>
                <p className="text-accent-100">Years Combined Experience</p>
              </div>
              <div>
                <p className="mb-2 font-black text-4xl">.6 EMR</p>
                <p className="text-accent-100">Award-Winning Safety</p>
              </div>
              <div>
                <p className="mb-2 font-black text-4xl">3-5 Days</p>
                <p className="text-accent-100">Estimate Turnaround</p>
              </div>
              <div>
                <p className="mb-2 font-black text-4xl">24/7</p>
                <p className="text-accent-100">Emergency Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Cost Calculator */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Get Your Project
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Cost Estimate
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                Use our interactive calculator to get an instant estimate for
                your construction project. See how project type, size, quality,
                and timeline affect your budget.
              </p>
            </div>
            <QuickCostCalculator />
          </div>
        </section>

        {/* Chatbot CTA - Ask Questions */}
        <ChatbotCTASection
          context="services"
          title="Questions About Our Services?"
          subtitle="Chat with General MH for instant answers about pricing, timelines, processes, and more"
          exampleQuestions={[
            "What are your payment terms?",
            "Do you offer warranties?",
            "What is your safety record?",
            "How long do projects take?",
            "Are you licensed and insured?",
          ]}
        />

        {/* Portfolio Section - Simplified */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible className="mb-16 lg:mb-24 text-center scroll-reveal">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Our Construction
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Portfolio
                </span>
              </h2>
              <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Explore our completed projects showcasing quality craftsmanship
                across commercial, residential, and government sectors
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible className="text-center">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <MaterialIcon icon="visibility" className="mr-2" size="md" />
                  View Complete Portfolio
                </Button>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <MaterialIcon icon="info" size="sm" className="inline mr-2" />
                Detailed portfolio with High-Level CRM integration coming soon
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* CTA Section */}
        <ServicesCTA />
      </div>
    </>
  );
}
