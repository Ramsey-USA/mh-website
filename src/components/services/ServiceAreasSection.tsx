/**
 * Service Areas Section
 * Shows geographic coverage areas
 */

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
}

interface ServiceAreasSectionProps {
  serviceAreas: ServiceArea[];
}

export function ServiceAreasSection({
  serviceAreas,
}: ServiceAreasSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-accent dark:from-brand-primary-dark dark:via-gray-900 dark:to-gray-800 py-20 lg:py-32 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary-dark/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center">
            <h2 className="mb-8 pb-2 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter drop-shadow-lg">
              <span className="block mb-4 font-semibold text-white/95 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Areas We
              </span>
              <span className="block text-white font-black">Serve</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.twoColumn("md", "mx-auto max-w-4xl")}
        >
          {serviceAreas.map((area, _index) => (
            <Card
              key={_index}
              className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border-2 border-white/30 dark:border-white/20 p-8 hover:bg-white/15 hover:border-white/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 group overflow-hidden"
            >
              {/* Card decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative flex items-center mb-6 gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <MaterialIcon
                    icon={area.iconName}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <h3 className="text-white text-2xl font-black drop-shadow-md">
                  {area.title}
                </h3>
              </div>
              <ul className="relative space-y-3">
                {area.areas.map((location, lIndex) => (
                  <li
                    key={lIndex}
                    className="flex items-center group/item hover:translate-x-1 transition-transform duration-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-secondary/30 dark:bg-brand-secondary/40 rounded-lg flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-secondary"
                      />
                    </div>
                    <span className="text-white/90 text-lg">{location}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
