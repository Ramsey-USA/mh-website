/**
 * Specialty Services Section
 * Displays specialized construction services with accordion cards
 */

import { BrandedContentSection } from "@/components/templates";
import { SpecialtyServiceCard } from "./SpecialtyServiceCard";
import type { SpecialtyService } from "./servicesData";

interface SpecialtyServicesSectionProps {
  services: SpecialtyService[];
  title: string;
  subtitle: string;
  description: string;
}

export function SpecialtyServicesSection({
  services,
  title,
  subtitle,
  description,
}: SpecialtyServicesSectionProps) {
  return (
    <BrandedContentSection
      id="specialty"
      header={{
        icon: "hub",
        iconVariant: "secondary",
        subtitle,
        title,
        description,
      }}
    >
      {/* Grid - 2 columns on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => (
          <SpecialtyServiceCard key={service.title} service={service} />
        ))}
      </div>
    </BrandedContentSection>
  );
}
