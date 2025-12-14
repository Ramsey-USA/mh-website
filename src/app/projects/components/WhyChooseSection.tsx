/**
 * Why Choose MH Section
 * Highlights key differentiators and value propositions
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { whyChooseReasons } from "./projectsData";

export function WhyChooseSection() {
  return (
    <Section variant="gray" padding="large">
      <SectionHeader
        icon="verified"
        iconVariant="bronze"
        subtitle="Why Partner With"
        title="MH Construction"
        description="Your trusted partner for commercial construction excellence in the Pacific Northwest"
      />

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
    </Section>
  );
}
