import { useTranslations } from "next-intl";
import { COMPANY_INFO } from "@/lib/constants/company";
import { cornerRadius, transitionDuration } from "@/lib/styles/design-tokens";

export function ServicesHero({
  heroSlogan = COMPANY_INFO.slogan.secondary,
}: Readonly<{ heroSlogan?: string }>) {
  const t = useTranslations("home");

  return (
    <section
      className="hero-section relative flex items-end justify-end text-white overflow-hidden"
      style={{
        minHeight: "32rem",
      }}
    >
      {/* Background - Ready for photo or video */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
      </div>

      {/* Header Text - Bottom Right */}
      <div
        className={`hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity ${transitionDuration.normal} sm:w-[min(88vw,44rem)] sm:max-w-176`}
      >
        <div
          className={`${cornerRadius.icon} border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5`}
        >
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            <span className="block text-brand-secondary text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-1">
              {t("services.hero.sectionSubtitle")} -&gt; Services
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
            <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-2">
              {COMPANY_INFO.slogan.primary}
            </span>
            <span className="block text-white/85 text-xs xs:text-sm sm:text-base mt-1">
              {heroSlogan}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
