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
        <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
          <span className="block text-brand-secondary">The Battle Plan</span>
          <span className="block text-brand-primary">
            Your Vision, Our Precision
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
        items={navigationConfigs.services}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
