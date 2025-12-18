/**
 * Service Capabilities Section
 * Displays construction service capabilities
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section } from "@/components/ui/layout";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { capabilities } from "./projectsData";

export function CapabilitiesSection() {
  return (
    <Section variant="default" padding="large">
      {/* Section Header - Military Construction Standard */}
      <div className="mb-16 sm:mb-20 text-center">
        {/* Icon with decorative lines */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
              <MaterialIcon
                icon="construction"
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
            Partnership
          </span>
          <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
            Capabilities
          </span>
        </h2>

        {/* Description with colored keyword highlighting */}
        <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
          Veteran-owned{" "}
          <span className="font-bold text-brand-primary dark:text-brand-primary-light">
            collaborative expertise across multiple construction markets
          </span>
          , working{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            WITH you
          </span>{" "}
          to strengthen Pacific Northwest communities.
        </p>
      </div>

      <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
        {capabilities.map((capability, _index) => (
          <Card
            key={_index}
            className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
          >
            <CardHeader className="flex-shrink-0">
              <MaterialIcon
                icon={capability.icon}
                size="2xl"
                className="mb-3 text-brand-primary"
              />
              <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                {capability.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-grow items-start">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {capability.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </StaggeredFadeIn>
    </Section>
  );
}
