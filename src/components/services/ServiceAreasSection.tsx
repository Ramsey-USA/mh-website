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
    <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
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
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-16 sm:mb-20 text-center">
            {/* Icon with decorative lines */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                  <MaterialIcon
                    icon="location_on"
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
                Areas We
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Serve
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Serving the{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                Tri-Cities region and Pacific Northwest
              </span>{" "}
              with{" "}
              <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
                expert construction management services
              </span>
              .
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.twoColumn("md", "mx-auto max-w-4xl")}
        >
          {serviceAreas.map((area, _index) => (
            <Card
              key={_index}
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
      </div>
    </section>
  );
}
