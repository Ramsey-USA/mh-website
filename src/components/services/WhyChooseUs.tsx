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
    <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center scroll-reveal">
            {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Why Partner With
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                MH Construction
              </span>
            </h2>
            <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
              Built on service-earned trust, operational integrity, and the
              belief that mission partnerships matter more than
              transactions—your trusted partner for construction excellence
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
              <Card className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1">
                <CardHeader className="flex-shrink-0">
                  <MaterialIcon
                    icon={reason.iconName}
                    size="2xl"
                    className="mb-3 text-brand-primary"
                  />
                  <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    {reason.description}
                  </p>
                  {reason.ctaLink && (
                    <div className="flex items-center text-brand-primary dark:text-brand-primary-light hover:text-brand-accent dark:hover:text-brand-secondary transition-colors mt-auto pt-2">
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="mr-2"
                      />
                      <span className="font-semibold text-xs">
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
