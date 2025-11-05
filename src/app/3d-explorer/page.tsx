"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

/**
 * 3D Explorer - Under Construction Page
 *
 * Immersive 3D visualization platform coming soon.
 * Page follows MH Construction hero section standards with under construction notice.
 * Brand-optimized with proper colors, typography, and component standards.
 */
export default function ThreeDExplorerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Following Brand Standards */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements - Brand Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>
        <div className="absolute top-20 right-20 bg-brand-primary/10 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 bg-brand-secondary/10 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>

        {/* Content - Clean and Simple Per Brand Standards */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title - Brand Secondary Color (Leather Tan) */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                3D Project Explorer
              </span>
            </h1>

            {/* Subtitle - Professional & Clean */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              Immersive Visualization Platform Coming Soon
            </p>

            {/* Description - Partnership Language */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              "Building for the Owner, NOT the Dollar" — We're developing an
              immersive 3D visualization platform that combines military
              precision with cutting-edge technology to bring your construction
              projects to life before breaking ground.
            </p>

            {/* Under Construction Notice Card - Brand-Optimized */}
            <FadeInWhenVisible>
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 border border-white/10 rounded-3xl max-w-3xl mx-auto mt-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
                {/* Card Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex justify-center items-center bg-brand-secondary/10 rounded-2xl w-16 h-16 p-2 mr-4">
                    <MaterialIcon
                      icon="construction"
                      size="xl"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                    Page Under Construction
                  </h2>
                </div>

                {/* Card Description - Partnership Focus */}
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-8 font-light">
                  Our veteran-owned team is building an HD visualization
                  platform featuring real-time design adjustments, immersive
                  walkthroughs, and collaborative project planning with the same
                  military precision we bring to every construction project.
                </p>

                {/* Feature Preview Section */}
                <div className="mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-secondary mb-6 flex items-center justify-center">
                    <MaterialIcon
                      icon="check_circle"
                      size="md"
                      className="mr-2"
                    />
                    Coming Features
                  </h3>

                  {/* Feature Grid - 3 Column Standard */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                    {/* HD Visualization Card */}
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-secondary/30 transition-all duration-300 group">
                      <div className="flex justify-center items-center bg-brand-primary/10 rounded-xl w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="view_in_ar"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-2">
                        HD Visualization
                      </span>
                      <span className="text-xs text-white/60 text-center leading-relaxed">
                        Immersive walkthroughs
                      </span>
                    </div>

                    {/* Real-time Edits Card */}
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-secondary/30 transition-all duration-300 group">
                      <div className="flex justify-center items-center bg-brand-primary/10 rounded-xl w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="edit"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-2">
                        Real-time Edits
                      </span>
                      <span className="text-xs text-white/60 text-center leading-relaxed">
                        Design adjustments
                      </span>
                    </div>

                    {/* Collaboration Card */}
                    <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-secondary/30 transition-all duration-300 group">
                      <div className="flex justify-center items-center bg-brand-primary/10 rounded-xl w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="groups"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-2">
                        Collaboration
                      </span>
                      <span className="text-xs text-white/60 text-center leading-relaxed">
                        Project planning
                      </span>
                    </div>
                  </div>
                </div>

                {/* Partnership Message */}
                <div className="bg-brand-primary/10 backdrop-blur-sm p-4 rounded-xl border border-brand-primary/20">
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed text-center">
                    <MaterialIcon
                      icon="handshake"
                      size="sm"
                      className="inline mr-2 text-brand-secondary"
                    />
                    <span className="font-semibold">
                      Interested in learning more?
                    </span>{" "}
                    Contact us to be notified when this feature launches and
                    discover how we can work WITH you on your next project.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Call-to-Action Buttons - Brand Standards */}
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
                      icon="smart_toy"
                      size="lg"
                      className="mr-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-medium">Try AI Estimator</span>
                  </Button>
                </Link>

                {/* Contact - Outline Button */}
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full group transition-all duration-300 touch-manipulation"
                    aria-label="Contact MH Construction for partnership opportunities"
                  >
                    <MaterialIcon
                      icon="contact_phone"
                      size="lg"
                      className="mr-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-medium">Contact Us</span>
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>

            {/* Back to Home Link - Brand Color */}
            <FadeInWhenVisible>
              <Link
                href="/"
                className="inline-flex items-center text-brand-secondary hover:text-brand-secondary-light transition-all duration-300 pt-6 group"
                aria-label="Return to home page"
              >
                <MaterialIcon
                  icon="arrow_back"
                  size="sm"
                  className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                />
                <span className="font-medium">Back to Home</span>
              </Link>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  );
}
