"use client";

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function PartnershipCTA() {
  return (
    <section
      id="partnership-cta"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Unique Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <FadeInWhenVisible>
          <div className="mb-16 sm:mb-20 lg:mb-24 scroll-reveal">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="verified"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            </div>

            {/* Two-line gradient heading */}
            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="inline-block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Let's Build Trust Through
              </span>
              <span className="inline-block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-1">
                Lasting Partnerships
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto mb-8 sm:mb-12 max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Partner with a{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                veteran-owned team
              </span>{" "}
              where four core values create one result: Trust. We're building{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                projects for the client
              </span>
              ,{" "}
              <span className="font-black italic text-bronze-700 dark:text-bronze-400 text-xl sm:text-2xl md:text-3xl">
                NOT
              </span>{" "}
              the dollar. Experience{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                honesty, integrity, professionalism, and thoroughness
              </span>{" "}
              in every project across the Pacific Northwest.
            </p>
          </div>

          {/* Trade Partnership CTA Buttons - Mobile optimized 4 Button Grid */}
          <div className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-4 sm:mb-6 max-w-6xl">
            <Link href="/allies">
              <Button
                variant="primary"
                size="lg"
                className="group/btn w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="diversity_3"
                    size="lg"
                    className="flex-shrink-0 mb-1 group-hover/btn:scale-110 transition-transform"
                  />
                  <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                    Become a Trade
                    <br />
                    Partner
                  </span>
                </div>
              </Button>
            </Link>

            <Link href="/projects">
              <Button
                variant="secondary"
                size="xl"
                className="group/btn w-full h-auto min-h-[64px] sm:min-h-[72px] transition-all duration-300 p-4 sm:p-5 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="photo_library"
                    size="xl"
                    className="flex-shrink-0 mb-1 group-hover/btn:scale-110 transition-transform"
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
