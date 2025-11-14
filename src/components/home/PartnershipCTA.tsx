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
            <MaterialIcon icon="handshake" size="xl" className="text-white" />
          </div>
          <h2 className="mb-4 sm:mb-6 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
            THE ROI IS THE RELATIONSHIP
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 max-w-4xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-4 break-words">
            Partner with us to build something bigger than profit—build a
            relationship that grows your business. Join our network of{" "}
            <span className="font-medium text-white">
              trusted trade partners
            </span>{" "}
            with consistent projects including{" "}
            <span className="font-medium text-white">government contracts</span>{" "}
            across the Pacific Northwest.
          </p>

          {/* Trade Partnership CTA Buttons - Mobile optimized 4 Button Grid */}
          <div className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-4 sm:mb-6 max-w-6xl">
            <Link href="/trade-partners">
              <Button
                variant="primary"
                size="lg"
                className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="diversity_3"
                    size="lg"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Become a Trade
                    <br />
                    Partner
                  </span>
                </div>
              </Button>
            </Link>

            <Link href="/government">
              <Button
                variant="secondary"
                size="lg"
                className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="flag"
                    size="lg"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Government
                    <br />
                    Contracts
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
                    icon="photo_library"
                    size="xl"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-bold text-center text-sm sm:text-base leading-tight">
                    View Portfolio
                  </span>
                </div>
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="contact_phone"
                    size="lg"
                    className="flex-shrink-0 mb-1"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Contact Us
                    <br />
                    (509) 308-6489
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
