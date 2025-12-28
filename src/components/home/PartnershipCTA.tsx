"use client";

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";

export function PartnershipCTA() {
  return (
    <BrandedContentSection
      id="partnership-cta"
      header={{
        icon: "verified",
        iconVariant: "bronze",
        subtitle: "Let's Build Trust Through",
        title: "Lasting Partnerships",
        description: (
          <>
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
          </>
        ),
      }}
      containerClassName="text-center"
    >
      <FadeInWhenVisible>
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
    </BrandedContentSection>
  );
}
