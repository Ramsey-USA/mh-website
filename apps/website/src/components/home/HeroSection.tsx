import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { existsSync } from "node:fs";
import { join } from "node:path";

interface HeroSectionCopy {
  baseLabel: string;
  founded: string;
  tagline: string;
  mission: string;
  serving: string;
}

interface HeroSectionProps {
  locale?: "en" | "es";
  copy?: HeroSectionCopy;
}

const DEFAULT_EN_COPY: HeroSectionCopy = {
  baseLabel: "Base HQ -> Home",
  founded: "Founded 2010",
  tagline: "Veteran-Owned Since January 2025",
  mission: "Building projects for the Client, NOT the Dollar",
  serving: "Serving WA, OR, and ID from the Tri-Cities",
};

const HOME_HERO_WEBM = "/videos/home-hero.webm";
const HOME_HERO_MP4 = "/videos/home-hero.mp4";
const HOME_HERO_POSTER = "/images/home-hero-poster.jpg";

const HAS_HOME_HERO_VIDEO_ASSETS = (() => {
  const appPublicPath = join(process.cwd(), "public");
  return (
    existsSync(join(appPublicPath, HOME_HERO_WEBM.slice(1))) &&
    existsSync(join(appPublicPath, HOME_HERO_MP4.slice(1))) &&
    existsSync(join(appPublicPath, HOME_HERO_POSTER.slice(1)))
  );
})();

/**
 * Homepage Hero Section
 * Full-screen hero with background support for photo/video
 */
export function HeroSection({
  locale: _locale = "en",
  copy = DEFAULT_EN_COPY,
}: Readonly<HeroSectionProps>) {
  const useVideoHero = HAS_HOME_HERO_VIDEO_ASSETS;

  return (
    <section className="hero-section relative flex items-end justify-end text-white overflow-hidden">
      {/* Background - Video Support */}
      <div className="absolute inset-0">
        {useVideoHero ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HOME_HERO_POSTER}
            aria-hidden="true"
          >
            <source src={HOME_HERO_WEBM} type="video/webm" />
            <source src={HOME_HERO_MP4} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
        )}
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>

      {/* Header Text - Bottom Right */}
      <div className="relative z-10 max-w-2xl ml-auto mr-4 sm:mr-6 lg:mr-8 xl:mr-12 mb-32 sm:mb-36 md:mb-40 lg:mb-44 pointer-events-none">
        <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
          <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
            {copy.tagline}
          </span>
          <span className="block text-brand-primary">{copy.mission}</span>
          <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-2">
            {copy.serving}
          </span>
        </h1>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.home}
        showRemainingPagesOverlay
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
