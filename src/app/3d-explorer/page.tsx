"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

/**
 * 3D Explorer - Under Development Page
 *
 * Immersive 3D visualization platform coming soon.
 * Hero section with navbar following MH Construction brand standards.
 * Future: Will feature video background showcasing platform vision and capabilities.
 *
 * Brand Standards Applied:
 * - Clean hero section (title, subtitle, description, nav only)
 * - Page-specific tagline: "Innovation Meets Construction Excellence"
 * - Tech Innovation Group messaging (GROUP 6)
 * - Partnership language emphasizing technology serving relationships
 * - Proper responsive typography scaling
 * - Brand colors: Hunter Green and Leather Tan
 */
export default function ThreeDExplorerPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="3D Project Explorer"
        description="We're preparing our interactive 3D project visualization tool. This cutting-edge technology will allow you to explore our projects in immersive detail."
        estimatedCompletion="January 2026"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Clean & Professional Per Brand Standards */}
      {/* NOTE: This section is ready for video background integration */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements - Brand Colors */}
        {/* TODO: Replace with video background showcasing 3D visualization capabilities */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>
        <div className="absolute top-20 right-20 bg-brand-primary/10 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 bg-brand-secondary/10 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>

        {/* Content - Clean and Simple Per Brand Standards */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {/* Main Title - Brand Secondary Color (Leather Tan) */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Innovation Meets Construction Excellence
              </span>
            </h1>

            {/* Subtitle - Technology as Enhancement */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              Technology Serving Traditional Values
            </p>

            {/* Description - Partnership Language with Tech Focus */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              Where data meets decades of experience. We're developing an
              immersive 3D visualization platform that brings your vision to
              life before breaking ground. "Building for the Client,{" "}
              <span className="font-black text-bronze-300">NOT</span> the
              Dollar" means investing in innovative tools that enhance—never
              replace—the personal partnerships that define our work. AI-powered
              estimation meets personal consultation. Smart tools for smarter
              planning. Innovation with integrity, technology with trust.
            </p>
          </div>

          {/* Page Navigation Bar - Always at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <PageNavigation items={navigationConfigs["3dExplorer"]} />
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "3D Explorer" }]}
      />

      {/* Platform Vision Section - Under Development */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 py-16 sm:py-20 lg:py-24 text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Development Status Card - Tech Innovation Group Messaging */}
            <FadeInWhenVisible>
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 border border-white/10 rounded-3xl max-w-3xl mx-auto mt-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
                {/* Card Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex justify-center items-center bg-brand-secondary/10 rounded-2xl w-16 h-16 p-2 mr-4">
                    <MaterialIcon
                      icon="engineering"
                      size="xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                    Platform in Development
                  </h2>
                </div>

                {/* Card Description - Technology Serving Relationships */}
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-8 font-light">
                  Smart tools for smarter planning. Our veteran-led team is
                  developing an advanced 3D visualization platform that enhances
                  collaboration and transparency—because technology should serve
                  relationships, never replace them. Innovation with integrity,
                  built with the same precision we bring to every project.
                </p>

                {/* Future Capabilities Preview */}
                <div className="mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-secondary mb-6 flex items-center justify-center">
                    <MaterialIcon
                      icon="visibility"
                      size="md"
                      className="mr-2"
                    />
                    Planned Capabilities
                  </h3>

                  {/* Feature Grid - 3 Column Standard */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                    {/* Immersive Visualization Card */}
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-secondary/30 transition-all duration-300 group">
                      <div className="flex justify-center items-center bg-brand-primary/10 rounded-xl w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="view_in_ar"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-2">
                        Immersive Walkthroughs
                      </span>
                      <span className="text-xs text-white/60 text-center leading-relaxed">
                        Experience projects before they're built
                      </span>
                    </div>

                    {/* Real-time Collaboration Card */}
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-secondary/30 transition-all duration-300 group">
                      <div className="flex justify-center items-center bg-brand-primary/10 rounded-xl w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="edit"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-2">
                        Design Adjustments
                      </span>
                      <span className="text-xs text-white/60 text-center leading-relaxed">
                        Real-time modifications and feedback
                      </span>
                    </div>

                    {/* Team Collaboration Card */}
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-secondary/30 transition-all duration-300 group">
                      <div className="flex justify-center items-center bg-brand-primary/10 rounded-xl w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="groups"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-2">
                        Collaborative Planning
                      </span>
                      <span className="text-xs text-white/60 text-center leading-relaxed">
                        Work together seamlessly
                      </span>
                    </div>
                  </div>
                </div>

                {/* Partnership Emphasis Message */}
                <div className="bg-brand-primary/10 backdrop-blur-sm p-4 rounded-xl border border-brand-primary/20">
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed text-center">
                    <MaterialIcon
                      icon="handshake"
                      size="sm"
                      className="inline mr-2 text-brand-secondary"
                    />
                    <span className="font-semibold">
                      Want updates on our progress?
                    </span>{" "}
                    Contact us to be notified when this platform launches.
                    Technology that serves partnerships, built by a team that
                    values relationships above all.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Explore Current Capabilities Section */}
            <FadeInWhenVisible>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                {/* AI Estimator - Secondary Button (Leather Tan) */}
                <Link href="/estimator" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full group transition-all duration-300 touch-manipulation"
                    aria-label="Try our AI-powered cost estimator"
                  >
                    <MaterialIcon
                      icon="calculate"
                      size="lg"
                      className="mr-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-medium">Try AI Estimator</span>
                  </Button>
                </Link>

                {/* Schedule Consultation - Primary Button (Hunter Green) */}
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full group transition-all duration-300 touch-manipulation"
                    aria-label="Schedule a consultation to discuss your project"
                  >
                    <MaterialIcon
                      icon="event"
                      size="lg"
                      className="mr-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-medium">Schedule Consultation</span>
                  </Button>
                </Link>

                {/* Get Notified - Outline Button */}
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full group transition-all duration-300 touch-manipulation"
                    aria-label="Contact us to get notified when 3D Explorer launches"
                  >
                    <MaterialIcon
                      icon="notifications"
                      size="lg"
                      className="mr-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-medium">Get Notified</span>
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Why 3D Visualization Section - Value Proposition */}
      <section className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-gray-100 mb-4">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Why Visualization Matters
                </span>
                <span className="block text-brand-primary">
                  See It Before You Build It
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                3D visualization transforms construction planning from abstract
                concepts to tangible understanding—helping you make confident
                decisions before breaking ground.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Benefit 1: Clear Communication */}
            <FadeInWhenVisible>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-primary/10 rounded-xl p-3 mr-4">
                    <MaterialIcon
                      icon="chat"
                      size="xl"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Crystal Clear Communication
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Eliminate misunderstandings. See exactly what you're
                      getting, discuss changes visually, and ensure everyone is
                      on the same page from day one.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Benefit 2: Confident Decisions */}
            <FadeInWhenVisible>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-secondary/10 rounded-xl p-3 mr-4">
                    <MaterialIcon
                      icon="verified"
                      size="xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Make Confident Decisions
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Walk through your project virtually before construction
                      begins. Identify potential issues early and make informed
                      choices about materials, layouts, and design.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Benefit 3: Time & Cost Savings */}
            <FadeInWhenVisible>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-primary/10 rounded-xl p-3 mr-4">
                    <MaterialIcon
                      icon="savings"
                      size="xl"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Save Time & Money
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Catch design conflicts before they become costly field
                      changes. Reduce rework, minimize delays, and keep your
                      project on budget and on schedule.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Benefit 4: Enhanced Collaboration */}
            <FadeInWhenVisible>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-secondary/10 rounded-xl p-3 mr-4">
                    <MaterialIcon
                      icon="diversity_3"
                      size="xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Enhanced Team Collaboration
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Bring all stakeholders together in a shared visual
                      environment. Architects, engineers, contractors, and
                      Client Partners collaborate seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Benefit 5: Quality Assurance */}
            <FadeInWhenVisible>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-primary/10 rounded-xl p-3 mr-4">
                    <MaterialIcon
                      icon="verified_user"
                      size="xl"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Built-In Quality Assurance
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Verify every detail matches specifications before
                      construction. Our military precision meets cutting-edge
                      visualization for uncompromising quality.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Benefit 6: Future-Ready Innovation */}
            <FadeInWhenVisible>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-secondary/10 rounded-xl p-3 mr-4">
                    <MaterialIcon
                      icon="rocket_launch"
                      size="xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Future-Ready Technology
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Stay ahead with VR integration, real-time rendering, and
                      collaborative planning tools. Innovation that serves your
                      success, built with integrity.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Bottom Partnership Message */}
          <FadeInWhenVisible>
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <MaterialIcon
                  icon="handshake"
                  size="2xl"
                  className="text-brand-primary mx-auto mb-4"
                />
                <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-200 font-medium mb-2">
                  Technology Serving Partnerships
                </p>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  We're investing in 3D visualization not to replace
                  relationships, but to strengthen them. Better tools mean
                  better communication, clearer understanding, and stronger
                  partnerships—because "Building for the Client,{" "}
                  <span className="font-black text-bronze-300">NOT</span> the
                  Dollar" means continually finding new ways to serve you
                  better.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "3D Explorer" }]}
      />
    </div>
  );
}
