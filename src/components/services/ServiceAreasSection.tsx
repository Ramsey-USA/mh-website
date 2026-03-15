/**
 * Service Areas Section
 * Shows geographic coverage areas with optional links to location pages
 */

import Link from "next/link";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Card } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";

interface ServiceArea {
  title: string;
  iconName: string;
  areas: string[];
  links?: (string | null)[];
}

interface ServiceAreasSectionProps {
  serviceAreas: ServiceArea[];
}

export function ServiceAreasSection({
  serviceAreas,
}: ServiceAreasSectionProps) {
  return (
    <BrandedContentSection
      id="service-areas"
      header={{
        icon: "location_on",
        iconVariant: "primary",
        subtitle: "Areas We",
        title: "Serve",
        description: (
          <>
            Serving the{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              Tri-Cities region and Pacific Northwest
            </span>{" "}
            with{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              expert construction management services
            </span>
            .
          </>
        ),
      }}
    >
      <FadeInWhenVisible>
        <StaggeredFadeIn
          className={gridPresets.twoColumn("md", "mx-auto max-w-4xl")}
        >
          {serviceAreas.map((area, index) => (
            <Card
              key={index}
              className="relative bg-gradient-to-br from-white via-white to-brand-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-2 border-brand-primary/20 dark:border-brand-primary/30 p-8 hover:border-brand-primary dark:hover:border-brand-primary-light hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-300 group overflow-hidden"
            >
              {/* Card decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative flex items-center mb-6 gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <MaterialIcon
                    icon={area.iconName}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <h3 className="text-gray-900 dark:text-white text-2xl font-black">
                  {area.title}
                </h3>
              </div>
              <ul className="relative space-y-3">
                {area.areas.map((location, lIndex) => {
                  const link = area.links?.[lIndex];
                  const content = (
                    <>
                      <div className="flex-shrink-0 w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-primary"
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-lg">
                        {location}
                      </span>
                      {link && (
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-auto text-brand-secondary opacity-0 group-hover/item:opacity-100 transition-opacity"
                        />
                      )}
                    </>
                  );

                  return (
                    <li
                      key={lIndex}
                      className="flex items-center group/item hover:translate-x-1 transition-transform duration-200"
                    >
                      {link ? (
                        <Link
                          href={link}
                          className="flex items-center flex-1 hover:text-brand-secondary transition-colors"
                        >
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </StaggeredFadeIn>
      </FadeInWhenVisible>
    </BrandedContentSection>
  );
}
