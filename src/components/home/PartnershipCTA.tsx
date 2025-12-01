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
          <div className="mb-12 sm:mb-16 lg:mb-20 scroll-reveal">
            <div className="flex justify-center items-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-accent/30 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-accent to-bronze-600 p-4 rounded-2xl shadow-lg">
                  <MaterialIcon
                    icon="verified"
                    size="2xl"
                    className="text-white"
                  />
                </div>
              </div>
            </div>
            <h2 className="mb-6 sm:mb-8 font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-3 sm:mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-sm">
                Let's Build Trust Through
              </span>
              <span className="block text-brand-accent font-black drop-shadow-lg">
                Lasting Partnerships
              </span>
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
              Partner with a veteran-led team where{" "}
              <span className="font-bold text-brand-accent">
                six core values create one result: Trust
              </span>
              . We're Building for the Client,{" "}
              <span className="font-black text-brand-accent">NOT</span> the
              Dollar. Experience{" "}
              <span className="font-medium text-brand-accent">
                professionalism, thoroughness, honesty, integrity, innovation,
                and partnership
              </span>{" "}
              in every project across the Pacific Northwest.
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

            <Link href="/government">
              <Button
                variant="secondary"
                size="lg"
                className="group/btn w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
              >
                <div className="flex flex-col justify-center items-center">
                  <MaterialIcon
                    icon="flag"
                    size="lg"
                    className="flex-shrink-0 mb-1 group-hover/btn:scale-110 transition-transform"
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
