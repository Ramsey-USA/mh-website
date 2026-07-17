import heroCommercials from "../../../config/hero-commercials.json";

export type HeroCommercial = (typeof heroCommercials)[number];

const heroCommercialsById = new Map(
  heroCommercials.map((entry: HeroCommercial) => [entry.id, entry] as const),
);

function getHeroCommercial(id: string): HeroCommercial {
  const heroCommercial = heroCommercialsById.get(id);

  if (!heroCommercial) {
    throw new Error(`Unknown hero commercial id: ${id}`);
  }

  return heroCommercial;
}

function toPublicUrl(relativePath: string): string {
  return `/${relativePath}`;
}

export function getHeroCommercialMp4Url(id: string): string {
  return toPublicUrl(getHeroCommercial(id).mp4);
}

export function getHeroCommercialWebmUrl(id: string): string | null {
  const heroCommercial = getHeroCommercial(id) as HeroCommercial & {
    webm?: string;
  };
  const webmPath = heroCommercial.webm;
  return typeof webmPath === "string" && webmPath.length > 0
    ? toPublicUrl(webmPath)
    : null;
}

export const HOME_HERO_POSTER_URL =
  "/images/home-hero-poster.jpg?v=20260716-audiofix";

const HOME_HERO_WEBM_URL = getHeroCommercialWebmUrl("home");

export const HOME_HERO_MEDIA = {
  webmSrc: HOME_HERO_WEBM_URL
    ? `${HOME_HERO_WEBM_URL}?v=20260716-audiofix`
    : "",
  mp4Src: `${getHeroCommercialMp4Url("home")}?v=20260716-audiofix`,
  posterSrc: HOME_HERO_POSTER_URL,
} as const;
