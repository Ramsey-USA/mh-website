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
import {
  cornerRadius,
  hoverMotion,
  transitionDuration,
} from "@/lib/styles/design-tokens";

interface ServiceArea {
  title: string;
  iconName: string;
  areas: string[];
  links?: (string | null)[];
}

interface ServiceAreasSectionProps {
  serviceAreas: ServiceArea[];
  title: string;
  subtitle: string;
  description: string;
  maxLocationsPerArea?: number;
  showAllLocationsCta?: boolean;
}

export function ServiceAreasSection(props: Readonly<ServiceAreasSectionProps>) {
  const {
    serviceAreas,
    title,
    subtitle,
    description,
    maxLocationsPerArea,
    showAllLocationsCta = false,
  } = props;
  const totalAreas = serviceAreas.reduce(
    (count, area) => count + area.areas.length,
    0,
  );
  const linkedAreas = serviceAreas.reduce(
    (count, area) =>
      count +
      (area.links?.filter((link): link is string => Boolean(link)).length ?? 0),
    0,
  );

  return (
    <BrandedContentSection
      id="service-areas"
      header={{
        icon: "location_on",
        iconVariant: "primary",
        subtitle,
        title,
        description,
      }}
    >
      <FadeInWhenVisible>
        <div className="mx-auto mb-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          <Card
            className={`${cornerRadius.element} border border-brand-primary/25 bg-white/90 px-4 py-3 text-center shadow-sm dark:border-brand-primary/35 dark:bg-gray-900/80`}
          >
            <p className="font-subheading text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Service Hubs
            </p>
            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
              {serviceAreas.length}
            </p>
          </Card>
          <Card
            className={`${cornerRadius.element} border border-brand-primary/25 bg-white/90 px-4 py-3 text-center shadow-sm dark:border-brand-primary/35 dark:bg-gray-900/80`}
          >
            <p className="font-subheading text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Coverage Points
            </p>
            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
              {totalAreas}
            </p>
          </Card>
          <Card
            className={`${cornerRadius.element} border border-brand-primary/25 bg-white/90 px-4 py-3 text-center shadow-sm dark:border-brand-primary/35 dark:bg-gray-900/80`}
          >
            <p className="font-subheading text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Location Guides
            </p>
            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
              {linkedAreas}
            </p>
          </Card>
        </div>

        <StaggeredFadeIn
          className={gridPresets.twoColumn("md", "mx-auto max-w-4xl")}
        >
          {serviceAreas.map((area) => (
            <Card
              key={area.title}
              className={`group relative overflow-hidden border-2 border-brand-primary/20 bg-linear-to-br from-white via-white to-brand-primary/10 p-6 sm:p-7 shadow-lg transition-all ${transitionDuration.normal} hover:border-brand-primary hover:shadow-2xl dark:border-brand-primary/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/90 dark:hover:border-brand-primary-light dark:hover:shadow-brand-primary/20 ${hoverMotion.translateUpLarge}`}
            >
              <div
                className={`absolute -top-10 -right-10 h-28 w-28 ${cornerRadius.full} bg-brand-primary/10 blur-2xl transition-colors ${transitionDuration.slow} ${hoverMotion.imageZoom} dark:bg-brand-primary/15`}
              ></div>

              <div className="relative mb-5 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center ${cornerRadius.icon} bg-linear-to-br from-brand-primary to-brand-primary-dark shadow-lg ${hoverMotion.iconPlayful}`}
                >
                  <MaterialIcon
                    icon={area.iconName}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {area.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-primary dark:text-brand-primary-light">
                    {area.areas.length} service locations
                  </p>
                </div>
              </div>

              <ul className="relative grid gap-3 sm:grid-cols-2">
                {area.areas
                  .slice(0, maxLocationsPerArea ?? area.areas.length)
                  .map((location) => {
                    const originalIndex = area.areas.indexOf(location);
                    const link = area.links?.[originalIndex] ?? null;
                    const content = (
                      <>
                        <div
                          className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center ${cornerRadius.small} bg-brand-primary/10 transition-colors ${transitionDuration.fast} dark:bg-brand-primary/20`}
                        >
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-primary"
                          />
                        </div>
                        <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                          {location}
                        </span>
                        {link && (
                          <span className="font-subheading ml-auto inline-flex items-center text-xs font-semibold uppercase tracking-wide text-brand-secondary opacity-0 transition-opacity group-hover/item:opacity-100">
                            Explore
                            <MaterialIcon
                              icon="arrow_forward"
                              size="sm"
                              className="ml-1"
                            />
                          </span>
                        )}
                      </>
                    );

                    return (
                      <li
                        key={`${area.title}-${location}`}
                        className="group/item"
                      >
                        {link ? (
                          <Link
                            href={link}
                            className={`flex items-center ${cornerRadius.element} border border-brand-primary/15 bg-white/80 px-3 py-3 transition-all ${transitionDuration.fast} hover:border-brand-secondary/40 hover:bg-white dark:border-brand-primary/20 dark:bg-gray-900/70 dark:hover:bg-gray-900`}
                          >
                            {content}
                          </Link>
                        ) : (
                          <div
                            className={`flex items-center ${cornerRadius.element} border border-brand-primary/10 bg-white/60 px-3 py-3 dark:border-brand-primary/20 dark:bg-gray-900/60`}
                          >
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>

              {(maxLocationsPerArea ?? area.areas.length) <
                area.areas.length && (
                <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                  +
                  {area.areas.length -
                    (maxLocationsPerArea ?? area.areas.length)}{" "}
                  more in this service area
                </p>
              )}
            </Card>
          ))}
        </StaggeredFadeIn>

        {showAllLocationsCta && (
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <Link
              href="/locations"
              className={`inline-flex items-center ${cornerRadius.full} border border-brand-primary/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white dark:border-brand-primary/40 dark:bg-gray-900`}
            >
              View full location coverage
              <MaterialIcon icon="arrow_forward" size="sm" className="ml-2" />
            </Link>
          </div>
        )}
      </FadeInWhenVisible>
    </BrandedContentSection>
  );
}
