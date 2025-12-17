/**
 * Projects Hero Section
 * Hero header for the projects page
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function ProjectsHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

      {/* Content - Bottom Right */}
      <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        {/* Victories Trophy Icon */}
        <div className="flex justify-end mb-4">
          <MaterialIcon
            icon="emoji_events"
            size="5xl"
            theme="veteran"
            className="drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
            ariaLabel="Victories - Completed projects"
          />
        </div>
        <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
          <span className="block text-brand-secondary">Victories</span>
          <span className="block text-brand-primary">
            Battle-Tested Results
          </span>
          <span className="block text-white/90">
            Building projects for the client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            dollar
          </span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="bottom-8 left-1/2 absolute flex flex-col items-center -translate-x-1/2 transform animate-bounce">
        <MaterialIcon icon="expand_more" size="2xl" className="text-white/60" />
      </div>
    </section>
  );
}
