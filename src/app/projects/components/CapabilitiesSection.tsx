/**
 * Service Capabilities Section
 * Displays construction service capabilities
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { capabilities } from "./projectsData";

export function CapabilitiesSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center scroll-reveal">
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Partnership
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Capabilities
              </span>
            </h2>
            <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
              Veteran-owned collaborative expertise across multiple construction
              markets, working WITH you to strengthen Pacific Northwest
              communities
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
          {capabilities.map((capability, index) => (
            <Card
              key={index}
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
      </div>
    </section>
  );
}
