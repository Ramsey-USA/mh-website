import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { useTranslations } from "next-intl";

export function ServicesHero() {
  const t = useTranslations("home");

  return (
    <section className="hero-section relative flex items-end justify-end text-white overflow-hidden">
      {/* Background - Ready for photo or video */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
      </div>

      {/* Header Text - Constrained between global header and bottom page nav */}
      <div className="hero-safe-top hero-safe-bottom absolute inset-0 z-30 flex items-end justify-end px-4 sm:px-6 lg:px-8 xl:px-12 pointer-events-none">
        <div className="ml-auto max-w-xl sm:max-w-2xl">
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
            <span className="block text-brand-secondary text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-1">
              {t("services.hero.sectionSubtitle")}
            </span>
            <span className="block text-brand-secondary">
              {t("services.hero.sectionTitle")}
            </span>
            <span className="block text-brand-primary">
              {t("services.hero.sectionTagline")}
            </span>
            <span className="block text-white/90 text-sm sm:text-base lg:text-lg">
              {t("services.hero.sectionDescription")}
            </span>
          </h1>
        </div>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.services}
        showRemainingPagesOverlay
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
