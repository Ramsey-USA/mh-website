import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function ServicesHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

      {/* Content - Bottom Right */}
      <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        {/* Battle Plan Map Icon */}
        <div className="flex justify-end mb-4">
          <MaterialIcon
            icon="map"
            size="5xl"
            theme="military"
            className="drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
            ariaLabel="The Battle Plan - Construction services"
          />
        </div>
        <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
          <span className="block text-brand-secondary text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 font-black drop-shadow-lg">
            Operations → Services
          </span>
          <span className="block text-brand-secondary font-black drop-shadow-lg mb-3">
            The Battle Plan
          </span>
          <span className="block text-white font-black drop-shadow-lg mb-3">
            Strategic Construction Excellence from Concept to Completion
          </span>
          <span className="block text-white/90 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
            Building projects for the client,{" "}
            <span className="font-black italic text-brand-secondary">NOT</span>{" "}
            the dollar
          </span>
        </h1>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.services}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
