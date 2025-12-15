/**
 * Construction Process Overview Section
 * Shows the 6-step construction process
 */

import Link from "next/link";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { SectionHeader, Card, CardContent, Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function ConstructionProcessSection() {
  return (
    <section
      id="process"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>

      {/* Animated Blur Orbs */}
      <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          icon="timeline"
          iconVariant="secondary"
          subtitle="Our Partnership"
          title="Construction Process"
          description="From initial consultation to project completion, we guide you through every step with transparency, communication, and collaborative excellence"
        />

        <div className="mx-auto max-w-6xl relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent dark:from-brand-primary-dark dark:via-brand-secondary-dark dark:to-brand-accent hidden sm:block"></div>

          <StaggeredFadeIn className="space-y-8 lg:space-y-12">
            {/* Step 1 */}
            <div className="flex sm:flex-row flex-col gap-6 items-start relative">
              <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-accent shadow-xl rounded-full w-16 h-16 flex-shrink-0 z-10 ring-4 ring-white dark:ring-gray-800 hover:scale-110 transition-transform duration-300 group">
                <span className="font-black text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </span>
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-brand-primary/50 animate-ping opacity-20"></div>
              </div>
              <Card className="flex-1 bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border-l-4 border-brand-primary hover:shadow-2xl dark:hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="contact_phone"
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                      Initial Consultation
                    </h3>
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    We start by listening to your vision, understanding your
                    needs, and discussing your project goals. Whether you have
                    detailed plans or just an idea, we'll work{" "}
                    <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                      WITH you
                    </span>{" "}
                    to clarify scope, timeline, and budget expectations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-colors duration-200">
                      Free Consultation
                    </span>
                    <span className="bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-colors duration-200">
                      No Obligation
                    </span>
                    <span className="bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-colors duration-200">
                      24-48 Hour Response
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="flex sm:flex-row flex-col gap-6 items-start relative">
              <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-amber-700 shadow-xl rounded-full w-16 h-16 flex-shrink-0 z-10 ring-4 ring-white dark:ring-gray-800 hover:scale-110 transition-transform duration-300 group">
                <span className="font-black text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </span>
                <div className="absolute inset-0 rounded-full bg-brand-secondary/50 animate-ping opacity-20"></div>
              </div>
              <Card className="flex-1 bg-gradient-to-br from-white to-brand-secondary/5 dark:from-gray-900 dark:to-gray-800 border-l-4 border-brand-secondary hover:shadow-2xl dark:hover:shadow-brand-secondary/10 hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="calculate"
                        size="lg"
                        className="text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                      Detailed Estimation & Planning
                    </h3>
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our Lead Estimator provides a comprehensive, transparent
                    cost breakdown with no hidden fees. We analyze all
                    variables, identify potential risks, and create a realistic
                    timeline. You'll understand{" "}
                    <span className="font-semibold text-brand-secondary dark:text-brand-secondary-light">
                      every aspect
                    </span>{" "}
                    of your project costs upfront.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-brand-secondary/10 px-3 py-1.5 rounded-full text-brand-secondary text-sm font-medium hover:bg-brand-secondary/20 transition-colors duration-200">
                      Transparent Pricing
                    </span>
                    <span className="bg-brand-secondary/10 px-3 py-1.5 rounded-full text-brand-secondary text-sm font-medium hover:bg-brand-secondary/20 transition-colors duration-200">
                      20+ Years Experience
                    </span>
                    <span className="bg-brand-secondary/10 px-3 py-1.5 rounded-full text-brand-secondary text-sm font-medium hover:bg-brand-secondary/20 transition-colors duration-200">
                      No Surprises
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="flex sm:flex-row flex-col gap-6 items-start relative">
              <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-accent via-forest-600 to-forest-700 shadow-xl rounded-full w-16 h-16 flex-shrink-0 z-10 ring-4 ring-white dark:ring-gray-800 hover:scale-110 transition-transform duration-300 group">
                <span className="font-black text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </span>
                <div className="absolute inset-0 rounded-full bg-brand-accent/50 animate-ping opacity-20"></div>
              </div>
              <Card className="flex-1 bg-gradient-to-br from-white to-brand-accent/5 dark:from-gray-900 dark:to-gray-800 border-l-4 border-brand-accent hover:shadow-2xl dark:hover:shadow-brand-accent/10 hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="description"
                        size="lg"
                        className="text-brand-accent"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                      Contract & Pre-Construction
                    </h3>
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    We finalize contracts with clear terms, obtain necessary
                    permits, coordinate with subcontractors, and schedule
                    materials. Our Project Manager handles{" "}
                    <span className="font-semibold text-brand-accent dark:text-brand-accent-light">
                      all paperwork
                    </span>
                    , submittals, and RFIs while keeping you informed every step
                    of the way.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-brand-accent/10 px-3 py-1.5 rounded-full text-forest-700 text-sm font-medium hover:bg-brand-accent/20 transition-colors duration-200">
                      Clear Contracts
                    </span>
                    <span className="bg-brand-accent/10 px-3 py-1.5 rounded-full text-forest-700 text-sm font-medium hover:bg-brand-accent/20 transition-colors duration-200">
                      Permit Handling
                    </span>
                    <span className="bg-brand-accent/10 px-3 py-1.5 rounded-full text-forest-700 text-sm font-medium hover:bg-brand-accent/20 transition-colors duration-200">
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
                    Our Senior Superintendent oversees all on-site operations
                    with award-winning safety standards (.64 EMR). We provide
                    regular progress updates, coordinate subcontractors, manage
                    quality inspections, and address any issues immediately.
                    You're never left wondering what's happening.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                      Daily Updates
                    </span>
                    <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                      .64 EMR Safety
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
                    Third-party inspections, building department coordination,
                    and thorough documentation mean your project meets all
                    standards.
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
                    documentation, and post-project support ensure your complete
                    satisfaction. We don't disappear after completion—we're here
                    for the long term with ongoing partnership support.
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
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="transition-all duration-300 min-w-[260px]"
                  >
                    <MaterialIcon icon="phone" size="lg" className="mr-3" />
                    <span className="font-medium">Contact Us Today</span>
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="transition-all duration-300 min-w-[260px]"
                  >
                    <MaterialIcon
                      icon="photo_library"
                      size="lg"
                      className="mr-3"
                    />
                    <span className="font-medium">View Our Work</span>
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
