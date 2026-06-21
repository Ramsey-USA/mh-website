/**
 * Construction Expertise Section
 * Shows partnership-focused construction management information
 */

import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates";

export function ConstructionExpertiseSection({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <BrandedContentSection
      id="expertise"
      header={{
        icon: "handshake",
        iconVariant: "secondary",
        subtitle,
        title,
        description,
      }}
    >
      <FadeInWhenVisible>
        <div className="h-px w-full bg-linear-to-r from-transparent via-brand-primary/30 to-transparent" />
      </FadeInWhenVisible>
    </BrandedContentSection>
  );
}
