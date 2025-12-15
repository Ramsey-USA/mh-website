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
        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-right">
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
          {/* Main Title */}
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
            <span className="block text-brand-secondary">The Battle Plan</span>
          </h1>

          {/* Subtitle - Group 3: Future Vision */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
            Your Vision, Our Precision
          </p>

          {/* Veteran-Owned Emphasis */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-bronze-300 leading-snug font-bold tracking-wide">
            Veteran-Owned Excellence · Comprehensive Solutions
          </p>

          {/* Values-Future Messaging - Group 3 */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
            Building Tomorrow's Success on Today's Values
          </p>

          {/* Description - Future-focused with veteran values and military-construction terminology */}
          <p className="text-right text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
            "Building projects for the client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            dollar" — Veteran-owned operational precision meets comprehensive
            service offerings. From SITREP-level communications and transparent
            mission briefs to battle-tested craftsmanship across residential,
            commercial, and government construction operations. Where
            professional excellence today creates trusted mission partnerships
            tomorrow.
          </p>
        </div>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.services}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
