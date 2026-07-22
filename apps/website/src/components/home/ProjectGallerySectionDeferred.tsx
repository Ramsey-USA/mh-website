"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ProjectGallerySlide } from "@/lib/services/portfolio-service";

interface ProjectGallerySectionDeferredProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  slides: ProjectGallerySlide[];
}

const ProjectGallerySection = dynamic(
  () =>
    import("@/components/shared-sections/ProjectGallerySection").then(
      (mod) => ({
        default: mod.ProjectGallerySection,
      }),
    ),
  {
    ssr: false,
    loading: () => <ProjectGalleryPlaceholder />,
  },
);

function ProjectGalleryPlaceholder({ className = "" }: { className?: string }) {
  return (
    <section
      className={`bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 sm:mb-20 text-center">
          <div className="mx-auto h-6 w-40 rounded-full bg-gray-200 dark:bg-gray-700 mb-5" />
          <div className="mx-auto h-12 w-3/4 max-w-4xl rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
          <div className="mx-auto h-6 w-full max-w-5xl rounded-full bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mx-auto max-w-6xl rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-2xl p-8 sm:p-12 lg:p-16 min-h-[32rem] animate-pulse" />
      </div>
    </section>
  );
}

export function ProjectGallerySectionDeferred(
  props: ProjectGallerySectionDeferredProps,
) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    let cancelled = false;

    if (typeof IntersectionObserver === "undefined") {
      if (!cancelled) {
        setShouldRender(true);
      }
      return;
    }

    const target = triggerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!cancelled && entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [shouldRender]);

  return (
    <div ref={triggerRef}>
      {shouldRender ? (
        <ProjectGallerySection {...props} />
      ) : (
        <ProjectGalleryPlaceholder className={props.className ?? ""} />
      )}
    </div>
  );
}
