"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Button } from "@/components/ui";
import Link from "next/link";

interface UnderConstructionProps {
  pageName: string;
  description?: string;
  showContactCTA?: boolean;
  estimatedCompletion?: string;
}

/**
 * Under Construction Component
 * Displays professional notice while preserving page progress behind the scenes
 * Follows MH Construction brand messaging: transparency, traditional values, authenticity
 */
export function UnderConstruction({
  pageName,
  description,
  showContactCTA = true,
  estimatedCompletion = "Soon",
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Under Construction Notice */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <FadeInWhenVisible>
            <div className="flex justify-center items-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-secondary/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-secondary to-bronze-600 p-6 rounded-2xl shadow-2xl">
                  <MaterialIcon
                    icon="construction"
                    size="4xl"
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            <h1 className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 text-white/90 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                {pageName} Page
              </span>
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Under Construction
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/90 leading-relaxed px-4">
              {description ||
                "We're refining this page to meet our exacting standards of accuracy and excellence."}
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Transparency Message Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-secondary/10 dark:from-brand-primary/20 dark:via-gray-800 dark:to-brand-secondary/20 p-8 sm:p-10 lg:p-12 border-2 border-brand-primary/30 dark:border-brand-primary/40 rounded-2xl shadow-lg">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-brand-primary/20 dark:bg-brand-primary/30 p-3 rounded-full">
                  <MaterialIcon
                    icon="handshake"
                    size="xl"
                    className="text-brand-primary dark:text-brand-primary-light"
                  />
                </div>
              </div>

              <h2 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl text-center">
                Our Commitment to You
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    "Your Word Is Your Bond - So Is Ours."
                  </span>{" "}
                  At MH Construction, we believe in doing things right, not
                  fast. Just as we bring military precision to every
                  construction project, we're applying the same standards to our
                  website.
                </p>

                <p>
                  Because we value{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    transparency and accuracy
                  </span>{" "}
                  above all else, we're taking time to ensure every page
                  reflects the quality and authenticity you'll experience when
                  partnering with us.
                </p>

                <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-brand-secondary/30 rounded-xl mt-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">
                    💬 What You Can Do Right Now:
                  </p>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-3 mt-1 flex-shrink-0"
                      />
                      <span>
                        <strong>Call us directly:</strong>{" "}
                        <a
                          href="tel:+15093086489"
                          className="font-semibold text-brand-primary hover:text-brand-primary-dark underline"
                        >
                          (509) 308-6489
                        </a>{" "}
                        for immediate assistance
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-3 mt-1 flex-shrink-0"
                      />
                      <span>
                        <strong>Email us:</strong>{" "}
                        <a
                          href="mailto:office@mhc-gc.com"
                          className="font-semibold text-brand-primary hover:text-brand-primary-dark underline"
                        >
                          office@mhc-gc.com
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-3 mt-1 flex-shrink-0"
                      />
                      <span>
                        <strong>Visit our homepage</strong> for core information
                        about our services and values
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-3 mt-1 flex-shrink-0"
                      />
                      <span>
                        <strong>Schedule a consultation</strong> to discuss your
                        project needs
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-center mt-6 font-semibold text-brand-primary dark:text-brand-primary-light text-lg">
                  Building for the Client, NOT the Dollar
                </p>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Expected Completion: {estimatedCompletion}
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact CTA Section */}
      {showContactCTA && (
        <section className="relative py-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInWhenVisible>
              <h3 className="mb-6 font-bold text-white text-2xl sm:text-3xl">
                Ready to Start Your Project?
              </h3>
              <p className="mb-8 text-white/90 text-lg">
                Don't let our website updates slow you down. Contact us today to
                discuss your construction needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="min-w-[200px]"
                  >
                    <MaterialIcon icon="home" size="lg" className="mr-2" />
                    Return Home
                  </Button>
                </Link>
                <a href="tel:+15093086489">
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-w-[200px] bg-white hover:bg-gray-100 text-brand-primary border-2 border-white"
                  >
                    <MaterialIcon icon="phone" size="lg" className="mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      )}
    </div>
  );
}
