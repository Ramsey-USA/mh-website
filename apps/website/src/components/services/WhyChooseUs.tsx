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
import {
  cornerRadius,
  hoverMotion,
  transitionDuration,
} from "@/lib/styles/design-tokens";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

interface WhyChooseUsProps {
  title: string;
  subtitle: string;
  description: string;
}

export function WhyChooseUs({
  title,
  subtitle,
  description,
}: Readonly<WhyChooseUsProps>) {
  return (
    <section
      id="trust-in-action"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-16 sm:mb-20 text-center">
            <div className="flex items-center justify-center mb-8 gap-4">
              <div
                className={`h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 ${cornerRadius.full}`}
              ></div>
              <div className="relative">
                <div
                  className={`absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl ${cornerRadius.full}`}
                ></div>
                <div
                  className={`relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 ${cornerRadius.icon} shadow-2xl border-2 border-white/50 dark:border-gray-600`}
                >
                  <MaterialIcon
                    icon="military_tech"
                    size="2xl"
                    className="text-white drop-shadow-lg"
                  />
                </div>
              </div>
              <div
                className={`h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 ${cornerRadius.full}`}
              ></div>
            </div>

            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                {subtitle}
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                {title}
              </span>
            </h2>

            <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              {description}
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn className={gridPresets.cards4("md", "gap-6 lg:gap-8")}>
          {whyChooseUs.map((reason) => {
            const cardContent = (
              <Card
                className={`group relative h-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-all ${transitionDuration.normal} hover:shadow-2xl hover:border-brand-primary/30`}
              >
                <div
                  className={`absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 ${cornerRadius.full} bg-brand-primary/5 blur-2xl transition-colors ${transitionDuration.slow} ${hoverMotion.imageZoom} dark:bg-brand-primary/10`}
                ></div>

                <CardHeader className="relative shrink-0">
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center ${cornerRadius.icon} bg-linear-to-br from-brand-primary to-brand-primary-dark shadow-lg ${hoverMotion.iconPlayful}`}
                  >
                    <MaterialIcon
                      icon={reason.iconName}
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <CardTitle className="flex min-h-12 items-center text-xl font-black text-gray-900 dark:text-white">
                    {reason.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative flex grow flex-col">
                  <p className="font-body mb-4 grow text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {reason.description}
                  </p>
                  {reason.ctaLink ? (
                    <div className="mt-auto flex items-center pt-2 font-semibold text-brand-primary transition-colors hover:text-brand-secondary dark:text-brand-primary-light dark:hover:text-brand-secondary">
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="mr-2"
                      />
                      <span className="text-sm">
                        {reason.ctaLinkText || "Learn More"}
                      </span>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );

            return reason.ctaLink ? (
              <Link key={reason.title} href={reason.ctaLink}>
                {cardContent}
              </Link>
            ) : (
              <div key={reason.title}>{cardContent}</div>
            );
          })}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
