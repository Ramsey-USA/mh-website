"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ServicesShowcase = dynamic(
  () =>
    import("./ServicesShowcase").then((mod) => ({
      default: mod.ServicesShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <section className="bg-white py-20 lg:py-32 xl:py-40" id="services">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-72 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  },
);

export function ServicesShowcaseDeferred({
  className = "",
  maxVisibleCards,
}: {
  className?: string;
  maxVisibleCards?: number;
}) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const target = triggerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={triggerRef}>
      {shouldRender ? (
        <ServicesShowcase
          sectionVariant="white"
          className={className}
          {...(typeof maxVisibleCards === "number" ? { maxVisibleCards } : {})}
        />
      ) : (
        <section className="bg-white py-20 lg:py-32 xl:py-40" id="services">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-72 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
