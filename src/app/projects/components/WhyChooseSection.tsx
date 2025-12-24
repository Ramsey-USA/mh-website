/**
 * Why Choose MH Section
 * Highlights key differentiators and value propositions
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { whyChooseReasons } from "./projectsData";

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
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
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
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
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Why Partner With
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              MH Construction
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Your{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              trusted partner
            </span>{" "}
            for{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              commercial construction excellence
            </span>{" "}
            in the Pacific Northwest.
          </p>
        </div>

        <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
          {whyChooseReasons.map((reason, _index) => (
            <Card
              key={_index}
              className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
            >
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
              <CardContent className="flex flex-grow items-start">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
