import { HeroSectionClient } from "@/components/home/HeroSectionClient";

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
  founded: "Founded 2010 • Veteran-Owned Since January 2025 • BABAA Supporter",
  tagline: "Relationship-first construction across WA, OR, and ID",
  mission: "Building projects for the Client, NOT the Dollar",
  serving:
    "Tri-Cities HQ (Pasco, Richland, Kennewick) | Licensed in WA, OR, ID",
};

const HOME_HERO_WEBM = "/videos/hero-commercials/home-hero-optimized.webm";
const HOME_HERO_MP4 = "/videos/hero-commercials/home-hero-optimized.mp4";
const HOME_HERO_POSTER = "/images/home-hero-poster.jpg";

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
      hasWebm
      hasMp4
      hasPoster
      webmSrc={HOME_HERO_WEBM}
      mp4Src={HOME_HERO_MP4}
      posterSrc={HOME_HERO_POSTER}
    />
  );
}
