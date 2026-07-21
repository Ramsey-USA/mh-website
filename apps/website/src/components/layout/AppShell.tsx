"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation, SemiquincentennialBanner } from "@/components/layout";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { EventsHubBanner } from "@/components/ui/cta";
import { DiagonalStripePattern } from "@/components/ui/backgrounds";
import { usePWA } from "@/hooks/usePWA";
import { JeremyQuoteRibbon } from "@/components/shared-sections/JeremyQuoteRibbon";
import type { IndividualBrandingStamp } from "@/lib/content/individual-branding-stamps";
import { resolveJeremyRibbonKey } from "@/lib/content/jeremy-ribbon-routing";
import {
  FORM_MANUAL_ICONS,
  PAGE_ICONS,
  SEMANTIC_ICONS,
} from "@/lib/constants/navigation-icons";

interface AppShellProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  jeremyRibbons?: Record<
    string,
    {
      eyebrow: string;
      quote: string;
      attribution: string;
    }
  >;
  jeremyStamp?: IndividualBrandingStamp | null;
}

const QUICK_ACTIONS = [
  { label: "Hub", href: "/hub", icon: PAGE_ICONS.hub },
  { label: "Safety", href: "/safety", icon: SEMANTIC_ICONS.safety },
  { label: "Incident", href: "/safety/incident-report", icon: "report" },
  { label: "Resources", href: "/resources", icon: FORM_MANUAL_ICONS.source },
] as const;

const PARALLAX_MAX_OFFSET_PX = 140;

function resolveGlobalParallaxLogos(pathname: string) {
  if (pathname.startsWith("/veterans")) {
    return {
      light: "/images/logo/mh-veteran-bg.webp",
      dark: "/images/logo/mh-veteran-bg.webp",
    };
  }

  if (pathname.startsWith("/public-sector")) {
    return {
      light: "/images/logo/mh-logo-black.webp",
      dark: "/images/logo/mh-logo-white.webp",
    };
  }

  return {
    light: "/images/logo/mh-logo-light-bg.webp",
    dark: "/images/logo/mh-logo-dark-bg.webp",
  };
}

function humanizePathSegment(segment: string): string {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildFallbackBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const normalizedPath = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (normalizedPath === "/") {
    return [{ label: "Home" }];
  }

  const segments = normalizedPath.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const decodedSegment = decodeURIComponent(segment);
    const isLast = index === segments.length - 1;

    let label = humanizePathSegment(decodedSegment);
    if (currentPath === "/about") {
      label = "About Us";
    }
    if (currentPath === "/projects") {
      label = "Projects";
    }

    items.push(isLast ? { label } : { label, href: currentPath });
  });

  return items;
}

function AppShellBreadcrumbFallback() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const fallbackItems = buildFallbackBreadcrumbItems(pathname);

  useEffect(() => {
    const hasPageBreadcrumb = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('[data-mh-breadcrumb="true"]'),
      ).some((element) => element.dataset["mhBreadcrumbSource"] !== "fallback");

    const updateVisibility = () => {
      setShouldRender(!hasPageBreadcrumb());
    };

    updateVisibility();

    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Breadcrumb
      items={fallbackItems}
      source="fallback"
      className="border-t border-gray-200 dark:border-gray-700"
    />
  );
}

function SemiquincentennialAfterHeroSlot() {
  const pathname = usePathname();
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const showSemiquincentennialBanner =
    pathname !== "/cool-desert-nights" && pathname !== "/events";
  const INITIAL_SLOT_DELAY_MS = 250;

  useEffect(() => {
    setSlot(null);

    let cancelled = false;
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let createdSlot: HTMLDivElement | null = null;

    const placeSlot = () => {
      if (cancelled) return;

      const main = document.getElementById("main-content");
      const heroLikeSection =
        main?.querySelector<HTMLElement>(
          'section.hero-section, section[id$="-hero"], section[id*="hero"], section[aria-labelledby="hero-heading"], [data-page-hero="true"]',
        ) ?? main?.querySelector<HTMLElement>("section");

      const firstRenderableChild = Array.from(main?.children ?? []).find(
        (node) => node.tagName !== "SCRIPT" && node.tagName !== "TEMPLATE",
      ) as HTMLElement | undefined;

      // Prefer true hero anchors. Fallback only after retries so campaign
      // content does not jump above hero during hydration.
      let anchor = heroLikeSection ?? null;

      if (!anchor) {
        attempts += 1;
        if (attempts < 40) {
          timeoutId = globalThis.setTimeout(placeSlot, 50);
          return;
        }
        anchor = firstRenderableChild ?? null;
      }

      if (!anchor?.parentElement) {
        timeoutId = globalThis.setTimeout(placeSlot, 50);
        return;
      }

      createdSlot = document.createElement("div");
      createdSlot.dataset["semiquincentennialAfterHero"] = "true";
      anchor.after(createdSlot);
      setSlot(createdSlot);
    };

    timeoutId = globalThis.setTimeout(placeSlot, INITIAL_SLOT_DELAY_MS);

    return () => {
      cancelled = true;
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
      setSlot(null);
      createdSlot?.remove();
    };
  }, [pathname]);

  if (!slot) return null;

  return createPortal(
    <>
      <AppShellBreadcrumbFallback />
      {showSemiquincentennialBanner ? <SemiquincentennialBanner /> : null}
    </>,
    slot,
  );
}

export function AppShell({
  children,
  footer,
  jeremyRibbons,
  jeremyStamp,
}: Readonly<AppShellProps>) {
  const { isStandalone } = usePWA();
  const pwaHeaderRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const parallaxLogos = useMemo(
    () => resolveGlobalParallaxLogos(pathname),
    [pathname],
  );

  const activeRibbon = useMemo(() => {
    const ribbons = jeremyRibbons ?? {};
    const availableKeys = Object.keys(ribbons);
    const routeKey = resolveJeremyRibbonKey(pathname, availableKeys);

    if (routeKey && ribbons[routeKey]) {
      return ribbons[routeKey];
    }

    return (
      ribbons["default"] ?? {
        eyebrow: "Words from the General",
        quote:
          "My commitment on every page is the same: clear planning, disciplined execution, and communication that keeps the mission, the schedule, and the build aligned.",
        attribution: "Jeremy Thamert, Owner & President",
      }
    );
  }, [jeremyRibbons, pathname]);

  useEffect(() => {
    if (!isStandalone) {
      return;
    }

    const root = document.documentElement;

    const updateOffset = () => {
      if (!pwaHeaderRef.current) {
        return;
      }

      const rect = pwaHeaderRef.current.getBoundingClientRect();
      root.style.setProperty(
        "--mh-pwa-nav-offset",
        `${Math.ceil(rect.height)}px`,
      );
    };

    updateOffset();

    const ResizeObserverImpl = globalThis.ResizeObserver;
    if (!ResizeObserverImpl || !pwaHeaderRef.current) {
      return () => {
        root.style.removeProperty("--mh-pwa-nav-offset");
      };
    }

    const observer = new ResizeObserverImpl(updateOffset);
    observer.observe(pwaHeaderRef.current);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--mh-pwa-nav-offset");
    };
  }, [isStandalone]);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection =
      "connection" in navigator
        ? ((
            navigator as Navigator & {
              connection?: { saveData?: boolean };
            }
          ).connection ?? null)
        : null;

    const shouldDisableParallax = () =>
      mediaQuery.matches || Boolean(connection?.saveData);

    const getParallaxSpeed = () => {
      const isMobile = globalThis.innerWidth < 768;
      return isMobile ? 0.06 : 0.1;
    };

    const setOffset = (offset: number) => {
      const clampedOffset = Math.max(
        0,
        Math.min(PARALLAX_MAX_OFFSET_PX, Math.round(offset)),
      );
      root.style.setProperty("--mh-logo-parallax-offset", `${clampedOffset}px`);
    };

    if (shouldDisableParallax()) {
      setOffset(0);
      return () => {
        root.style.removeProperty("--mh-logo-parallax-offset");
      };
    }

    let rafId = 0;

    const updateParallaxOffset = () => {
      rafId = 0;
      const scrollY = globalThis.scrollY || 0;
      setOffset(scrollY * getParallaxSpeed());
    };

    const onScroll = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = globalThis.requestAnimationFrame(updateParallaxOffset);
    };

    updateParallaxOffset();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);

    const onMotionPreferenceChange = () => {
      if (shouldDisableParallax()) {
        setOffset(0);
      } else {
        onScroll();
      }
    };

    mediaQuery.addEventListener("change", onMotionPreferenceChange);

    return () => {
      if (rafId !== 0) {
        globalThis.cancelAnimationFrame(rafId);
      }
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
      mediaQuery.removeEventListener("change", onMotionPreferenceChange);
      root.style.removeProperty("--mh-logo-parallax-offset");
    };
  }, []);

  const pageBackground = (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-15 overflow-hidden"
    >
      <div
        className="mh-logo-parallax-layer mh-logo-parallax-overlay absolute inset-0 dark:hidden"
        style={{
          backgroundImage: `url('${parallaxLogos.light}')`,
          opacity: 0.065,
        }}
      />
      <div
        className="mh-logo-parallax-layer mh-logo-parallax-overlay absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `url('${parallaxLogos.dark}')`,
          opacity: 0.09,
        }}
      />
    </div>
  );

  if (!isStandalone) {
    return (
      <>
        {pageBackground}
        <Navigation />
        <div className="mh-global-logo-parallax-active relative z-10 flex min-h-screen flex-col bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <main id="main-content" className="grow pt-(--mh-nav-offset,6.5rem)">
            {children}
            <SemiquincentennialAfterHeroSlot />
          </main>
          <EventsHubBanner />
          <section
            className="relative overflow-hidden border-y border-brand-primary/20 bg-linear-to-b from-gray-100 via-white to-gray-100 py-8 sm:py-10 dark:border-brand-primary/35 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
            aria-label="Jeremy leadership ribbon"
          >
            <DiagonalStripePattern lightOpacity={0.04} darkOpacity={0.06} />
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <JeremyQuoteRibbon
                ribbon={activeRibbon}
                variant="global"
                stamp={jeremyStamp ?? null}
              />
            </div>
          </section>
          {footer ?? null}
        </div>
      </>
    );
  }

  return (
    <>
      {pageBackground}
      <Navigation />
      <div className="mh-global-logo-parallax-active relative z-10 flex min-h-screen flex-col bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <header
          ref={pwaHeaderRef}
          className="fixed top-[var(--mh-nav-offset, 0px)] left-0 right-0 z-60 bg-white/80 px-4 py-3 backdrop-blur-sm dark:bg-gray-900/80 sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
            <Link
              href="/hub"
              prefetch={false}
              className="font-heading inline-flex items-center gap-2 self-start rounded-full border border-brand-secondary/60 bg-brand-secondary/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-secondary"
            >
              <MaterialIcon icon="construction" size="sm" />
              PWA Command Deck
            </Link>

            <nav
              aria-label="PWA quick actions"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  prefetch={false}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-3 py-2 text-xs font-semibold text-brand-primary transition-all duration-300 hover:border-brand-secondary/60 hover:bg-brand-secondary/10 hover:text-brand-secondary"
                >
                  <MaterialIcon icon={action.icon} size="sm" />
                  <span>{action.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main
          id="main-content"
          className="grow pt-[calc(var(--mh-nav-offset,6.5rem)+var(--mh-pwa-nav-offset,0px)+1rem)]"
        >
          {children}
          <SemiquincentennialAfterHeroSlot />
        </main>

        <EventsHubBanner />
        <section
          className="relative overflow-hidden border-y border-brand-primary/20 bg-linear-to-b from-gray-100 via-white to-gray-100 py-8 sm:py-10 dark:border-brand-primary/35 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
          aria-label="Jeremy leadership ribbon"
        >
          <DiagonalStripePattern lightOpacity={0.04} darkOpacity={0.06} />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <JeremyQuoteRibbon
              ribbon={activeRibbon}
              variant="global"
              stamp={jeremyStamp ?? null}
            />
          </div>
        </section>
        {footer ?? null}
      </div>
    </>
  );
}
