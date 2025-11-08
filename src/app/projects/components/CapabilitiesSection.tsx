/**
 * Service Capabilities Section
 * Displays construction service capabilities
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section, SectionHeader } from "@/components/ui/layout";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { capabilities } from "./projectsData";

export function CapabilitiesSection() {
  return (
    <Section variant="default" padding="large">
      <SectionHeader
        subtitle="Partnership"
        title={
          <span className="block text-brand-primary dark:text-brand-primary font-black">
            Capabilities
          </span>
        }
        description="Veteran-owned collaborative expertise across multiple construction markets, working WITH you to strengthen Pacific Northwest communities"
      />

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
    </Section>
  );
}
