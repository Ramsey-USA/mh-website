"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  StaggeredFadeIn,
  FadeInWhenVisible,
} from "@/components/animations/FramerMotionComponents";
import { whyChooseUs } from "./servicesData";
import { gridPresets } from "@/lib/styles/layout-variants";

export function WhyChooseUs() {
  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      {/* Diagonal Stripe Background Pattern */}
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

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-16 sm:mb-20 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="military_tech"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            </div>

            {/* Two-line gradient heading */}
            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Why Partner With
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                MH Construction
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Built on{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                service-earned trust and operational integrity
              </span>
              , where mission partnerships matter more than transactions—your
              trusted partner for{" "}
              <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
                construction excellence
              </span>{" "}
              where handshakes still matter and promises are deployed with
              military precision.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.cards4("md", "mx-auto max-w-7xl")}
        >
          {whyChooseUs.map((reason, _index) => {
            const cardContent = (
              <Card className="flex flex-col bg-gradient-to-br from-white via-white to-brand-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 hover:shadow-2xl dark:hover:shadow-brand-primary/20 border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary dark:hover:border-brand-primary-light h-full transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <CardHeader className="flex-shrink-0 relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <MaterialIcon
                      icon={reason.iconName}
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-xl font-black">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow relative">
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4 flex-grow">
                    {reason.description}
                  </p>
                  {reason.ctaLink && (
                    <div className="flex items-center text-brand-primary dark:text-brand-primary-light hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors mt-auto pt-2 font-semibold">
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="mr-2"
                      />
                      <span className="text-sm">
                        {reason.ctaLinkText || "Learn More"}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            return reason.ctaLink ? (
              <Link key={_index} href={reason.ctaLink}>
                {cardContent}
              </Link>
            ) : (
              <div key={_index}>{cardContent}</div>
            );
          })}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
