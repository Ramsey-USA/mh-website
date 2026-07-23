import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { MH_SLOGANS } from "@/lib/branding/page-names";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { HeroSectionClient } from "./HeroSectionClient";

interface HeroSectionCopy {
  baseLabel: string;
  founded: string;
  tagline: string;
  mission: string;
  serving: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

interface HeroSectionProps {
  locale?: "en" | "es";
  copy?: HeroSectionCopy;
}

interface HeroCommercialManifestEntry {
  campaignScope?: "company" | "route";
  mp4?: string;
  webm?: string;
  seo?: {
    routePath?: string;
    appliesToRoutes?: string[];
    thumbnailPath?: string;
  };
}

const DEFAULT_EN_COPY: HeroSectionCopy = {
  baseLabel: "Home",
  founded: "Founded 2010 • Veteran-Owned Since January 2025 • BABAA Supporter",
  tagline: getHeroPageSlogan("home").slogan,
  mission: MH_SLOGANS.primary,
  serving:
    "Tri-Cities HQ (Pasco, Richland, Kennewick) | Licensed in WA, OR, ID",
};

const MANIFEST_PATH = path.join(
  process.cwd(),
  "config",
  "hero-commercials.json",
);
const PUBLIC_DIR = path.join(process.cwd(), "public");
const HERO_MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_HERO_MEDIA_BASE_URL?.trim() ?? "";

function normalizePublicAssetPath(assetPath?: string): string {
  if (!assetPath) {
    return "";
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  const normalized = assetPath.replace(/^\/+/, "");
  return normalized ? `/${normalized}` : "";
}

function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function resolveMediaDeliveryPath(assetPath: string): string {
  if (!assetPath || isAbsoluteHttpUrl(assetPath) || !HERO_MEDIA_BASE_URL) {
    return assetPath;
  }

  const base = HERO_MEDIA_BASE_URL.replace(/\/+$/, "");
  const relativePath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${base}${relativePath}`;
}

function assetIsAvailable(assetPath: string): boolean {
  if (!assetPath) {
    return false;
  }

  if (isAbsoluteHttpUrl(assetPath)) {
    return true;
  }

  if (HERO_MEDIA_BASE_URL) {
    return true;
  }

  return fs.existsSync(path.join(PUBLIC_DIR, assetPath.replace(/^\//, "")));
}

function selectHomeHeroCommercial(): HeroCommercialManifestEntry | null {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      fs.readFileSync(MANIFEST_PATH, "utf8"),
    ) as HeroCommercialManifestEntry[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return null;
    }

    const companyEntry = parsed.find((entry) => {
      if (entry?.campaignScope !== "company") {
        return false;
      }

      const appliesTo = entry?.seo?.appliesToRoutes;
      return Array.isArray(appliesTo) && appliesTo.includes("/");
    });

    if (companyEntry) {
      return companyEntry;
    }

    return parsed.find((entry) => entry?.seo?.routePath === "/") ?? null;
  } catch {
    return null;
  }
}

export function HeroSection({
  locale = "en",
  copy = DEFAULT_EN_COPY,
}: Readonly<HeroSectionProps>) {
  const heroCommercial = selectHomeHeroCommercial();
  const mp4ManifestPath = normalizePublicAssetPath(heroCommercial?.mp4);
  const webmManifestPath = normalizePublicAssetPath(heroCommercial?.webm);
  const posterManifestPath = normalizePublicAssetPath(
    heroCommercial?.seo?.thumbnailPath,
  );
  const mp4Src = resolveMediaDeliveryPath(mp4ManifestPath);
  const webmSrc = resolveMediaDeliveryPath(webmManifestPath);
  const posterSrc = resolveMediaDeliveryPath(posterManifestPath);
  const hasMp4 = assetIsAvailable(mp4ManifestPath);
  const hasWebm = assetIsAvailable(webmManifestPath);
  const hasPoster = assetIsAvailable(posterManifestPath);
  const useVideoHero = hasMp4 || hasWebm;

  if (useVideoHero) {
    return (
      <HeroSectionClient
        locale={locale}
        copy={copy}
        useVideoHero={useVideoHero}
        hasWebm={hasWebm}
        hasMp4={hasMp4}
        hasPoster={hasPoster}
        webmSrc={webmSrc}
        mp4Src={mp4Src}
        posterSrc={posterSrc}
      />
    );
  }

  return (
    <section
      data-page-hero="true"
      className="hero-section relative isolate flex items-end justify-end overflow-hidden bg-gray-950 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/home-hero-poster.webp"
          alt="MH Construction project leadership and team collaboration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/15 via-gray-900/35 to-gray-900/50" />

      <div className="hero-safe-bottom relative z-10 mx-3 mt-3 mb-4 max-h-[calc(100%-1rem)] pointer-events-none sm:ml-auto sm:mr-5 sm:mt-4 sm:w-[min(88vw,44rem)] sm:max-w-176 lg:mr-7 xl:mr-10">
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            <span className="mb-1 block text-brand-secondary text-[clamp(0.8rem,1.8vw,1.4rem)] leading-[1.2]">
              {copy.baseLabel} -&gt; Command Center
            </span>
            <span className="mb-1 block text-brand-secondary/90 text-[clamp(0.75rem,1.5vw,1.15rem)] leading-[1.25]">
              {copy.tagline}
            </span>
            <span className="block text-white">{copy.mission}</span>
            <span className="mt-1.5 block text-brand-secondary/75 text-[clamp(0.65rem,1.1vw,0.9rem)] leading-[1.4]">
              {copy.founded} | {copy.serving}
            </span>
          </h1>

          <div className="pointer-events-auto mt-4 flex flex-wrap justify-end gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-4 py-2 text-xs sm:text-sm font-bold text-gray-900 shadow transition-colors hover:bg-brand-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              {copy.primaryCtaLabel ?? "Start a project conversation"}
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              {copy.secondaryCtaLabel ?? "View project proof"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
