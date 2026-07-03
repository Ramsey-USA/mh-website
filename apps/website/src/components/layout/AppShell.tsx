"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navigation,
  Footer,
  SemiquincentennialBanner,
} from "@/components/layout";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { EventsHubBanner } from "@/components/ui/cta";
import { usePWA } from "@/hooks/usePWA";

interface AppShellProps {
  children: React.ReactNode;
}

const QUICK_ACTIONS = [
  { label: "Hub", href: "/hub", icon: "dashboard" },
  { label: "Safety", href: "/safety", icon: "shield" },
  { label: "Incident", href: "/safety/incident-report", icon: "report" },
  { label: "Resources", href: "/resources", icon: "menu_book" },
] as const;

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

    placeSlot();

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

export function AppShell({ children }: Readonly<AppShellProps>) {
  const { isStandalone } = usePWA();
  const pwaHeaderRef = useRef<HTMLElement>(null);

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

  if (!isStandalone) {
    return (
      <>
        <Navigation />
        <div className="flex min-h-screen flex-col bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <main id="main-content" className="grow pt-(--mh-nav-offset,6.5rem)">
            {children}
            <SemiquincentennialAfterHeroSlot />
          </main>
          <EventsHubBanner />
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen flex-col bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <header
          ref={pwaHeaderRef}
          className="fixed top-[var(--mh-nav-offset, 0px)] left-0 right-0 z-60 bg-white/80 px-4 py-3 backdrop-blur-sm dark:bg-gray-900/80 sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2">
            <Link
              href="/hub"
              prefetch={false}
              className="inline-flex items-center gap-2 self-start rounded-full border border-brand-secondary/60 bg-brand-secondary/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-secondary"
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
        <Footer />
      </div>
    </>
  );
}
