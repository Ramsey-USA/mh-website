import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { useTranslations } from "next-intl";

export function ServicesHero() {
  const t = useTranslations("home");

  return (
    <section
      className="hero-section relative flex items-end justify-end text-white overflow-hidden"
      style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
    >
      {/* Background - Ready for photo or video */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
      </div>

      {/* Header Text - Bottom Right */}
      <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-tight tracking-tight">
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
