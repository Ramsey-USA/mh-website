/**
 * Service Capabilities Section
 * Displays construction service capabilities
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { capabilities } from "./projectsData";

export function CapabilitiesSection() {
  return (
    <Section variant="default" padding="large">
      <SectionHeader
        icon="engineering"
        iconVariant="multi"
        subtitle="Partnership"
        title="Capabilities"
        description="Veteran-owned collaborative expertise across multiple construction markets, working WITH you to strengthen Pacific Northwest communities"
      />

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
