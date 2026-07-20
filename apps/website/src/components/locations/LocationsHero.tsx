import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";

type LocationsHeroProps = {
  locale?: "en" | "es";
};

export function LocationsHero({ locale = "en" }: LocationsHeroProps) {
  const isEs = locale === "es";

  return (
    <section
      className="hero-section relative flex items-end justify-end text-white overflow-hidden"
      style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
      </div>

      {/* Header Text - Bottom Right */}
      <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              {isEs ? "Oficinas -> Ubicaciones" : "Offices -> Locations"}
            </span>
            <span className="block text-brand-secondary">
              {isEs ? "Tri-Cities firme" : "Tri-Cities Strong"}
            </span>
            <span className="block text-white">
              {isEs ? "Cobertura en WA, OR e ID" : "Serving WA, OR, and ID"}
            </span>
            <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-2">
              {COMPANY_INFO.slogan.primary}
            </span>
            <span className="block text-brand-secondary/80 text-xs xs:text-sm sm:text-base mt-1">
              {getHeroPageSlogan("locations").slogan}
            </span>
          </h1>
        </div>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.locations}
        showRemainingPagesOverlay
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
