"use client";

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function PartnershipCTA() {
  return (
    <section
      id="partnership-cta"
      className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
      <div className="top-20 right-10 absolute bg-white/10 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="left-10 bottom-20 absolute bg-white/8 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 left-1/4 absolute bg-white/5 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <FadeInWhenVisible>
          <div className="mb-16 sm:mb-20 lg:mb-24 scroll-reveal">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white/50 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-accent/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-accent via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                  <MaterialIcon
                    icon="verified"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white/50 rounded-full"></div>
            </div>

            {/* Two-line gradient heading */}
            <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="inline-block mb-3 sm:mb-4 font-semibold bg-gradient-to-r from-white via-brand-accent to-white bg-clip-text text-transparent text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Rally Point: Let's Build Trust Through
              </span>
              <span className="inline-block bg-gradient-to-r from-brand-accent via-white to-brand-accent bg-clip-text text-transparent font-black drop-shadow-lg overflow-visible py-1">
                Lasting Partnerships
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto mb-8 sm:mb-12 max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Partner with a{" "}
              <span className="font-bold text-brand-accent">
                veteran-led team (all branches)
              </span>{" "}
              where four mission-ready values create one result: Trust. We're
              building{" "}
              <span className="font-bold text-white">
                projects for the client
              </span>
              ,{" "}
              <span className="font-black italic text-brand-accent text-xl sm:text-2xl md:text-3xl">
                NOT
              </span>{" "}
              the dollar. Experience{" "}
              <span className="font-bold text-brand-accent">
                service-earned honesty, military-grade integrity, operational
                professionalism, and tactical thoroughness
              </span>{" "}
              in every construction mission across the Pacific Northwest.
            </p>
          </div>

          {/* Trade Partnership CTA Buttons - Mobile optimized 4 Button Grid */}
          <div className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-4 sm:mb-6 max-w-6xl">
            <Link href="/trade-partners">
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
