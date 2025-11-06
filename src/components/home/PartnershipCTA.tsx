"use client";

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function PartnershipCTA() {
  return (
    <section
      id="partnership-cta"
      className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary py-12 sm:py-16 lg:py-24 cta-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <FadeInWhenVisible>
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <MaterialIcon icon="launch" size="xl" className="text-white" />
          </div>
          <h2 className="mb-4 sm:mb-6 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
            Ready to Start Our Partnership?
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 max-w-4xl font-light text-white/90 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed px-2">
            Join business partners across the{" "}
            <span className="font-medium text-white">Tri-Cities area</span> who
            chose collaborative construction management for their commercial,
            industrial, and medical facility projects.
          </p>

          {/* Commercial CTA Buttons - Mobile optimized 4 Button Grid */}
          <div className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-4 sm:mb-6 max-w-6xl">
            <Link href="/booking">
              <Button
                variant="primary"
                size="lg"
                className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="event"
                    size="lg"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Schedule Free
                    <br />
                    Consultation
                  </span>
                </div>
              </Button>
            </Link>

            <Link href="/estimator">
              <Button
                variant="secondary"
                size="lg"
                className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="smart_toy"
                    size="lg"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Get Instant AI
                    <br />
                    Estimate
                  </span>
                </div>
              </Button>
            </Link>

            <Link href="/projects">
              <Button
                variant="secondary"
                size="xl"
                className="group w-full h-auto min-h-[64px] sm:min-h-[72px] transition-all duration-300 p-4 sm:p-5 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="visibility"
                    size="xl"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-bold text-center text-sm sm:text-base leading-tight">
                    View Our Work
                  </span>
                </div>
              </Button>
            </Link>

            <a href="tel:+15093086489">
              <Button
                variant="primary"
                size="lg"
                className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="phone"
                    size="lg"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Call Now
                    <br />
                    (509) 308-6489
                  </span>
                </div>
              </Button>
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
