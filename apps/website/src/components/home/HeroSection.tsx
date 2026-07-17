import { HeroSectionClient } from "@/components/home/HeroSectionClient";
import { MH_SLOGANS } from "@/lib/branding/page-names";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { HOME_HERO_MEDIA } from "@/lib/media/hero-commercials";

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
  baseLabel: "Home",
  founded: "Founded 2010 • Veteran-Owned Since January 2025 • BABAA Supporter",
  tagline: getHeroPageSlogan("home").slogan,
  mission: MH_SLOGANS.primary,
  serving:
    "Tri-Cities HQ (Pasco, Richland, Kennewick) | Licensed in WA, OR, ID",
};

/**
 * Homepage Hero Section
 * Full-screen hero with background support for photo/video
 */
export function HeroSection({
  locale: _locale = "en",
  copy = DEFAULT_EN_COPY,
}: Readonly<HeroSectionProps>) {
  return (
    <HeroSectionClient
      copy={copy}
      useVideoHero
      hasWebm={false}
      hasMp4
      hasPoster
      webmSrc={HOME_HERO_MEDIA.webmSrc}
      mp4Src={HOME_HERO_MEDIA.mp4Src}
      posterSrc={HOME_HERO_MEDIA.posterSrc}
    />
  );
}
