/**
 * Projects Hero Section
 * Hero header for the projects page
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export function ProjectsHero() {
  return (
    <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
      {/* Background - Ready for photo or video */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
      </div>

      {/* Header Text - Bottom Right */}
      <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        {/* Mission Icon */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-bronze-600/30 to-bronze-800/30 blur-2xl rounded-full"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-bronze-600 via-bronze-700 to-bronze-800 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
              <MaterialIcon
                icon="emoji_events"
                size="2xl"
                className="text-white drop-shadow-lg"
                ariaLabel="Victories - Completed projects"
              />
            </div>
          </div>
        </div>
        <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
          <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
            Missions → Projects
          </span>
          <span className="block text-brand-secondary">Victories</span>
          <span className="block text-brand-primary">
            650+ Missions Completed - Proven Results
          </span>
          <span className="block text-white/90">
            Building projects for the client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            dollar
          </span>
        </h1>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.projects}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
