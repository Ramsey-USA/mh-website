"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { TimelineProps } from "@/components/ui/Timeline";

const Timeline = dynamic(
  () =>
    import("@/components/ui/Timeline").then((mod) => ({
      default: mod.Timeline,
    })),
  {
    ssr: false,
    loading: () => <TimelinePlaceholder />,
  },
);

function TimelinePlaceholder({ className = "" }: { className?: string }) {
  return (
    <section
      className={`relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 sm:mb-20 text-center">
          <div className="mx-auto h-6 w-36 rounded-full bg-gray-200 dark:bg-gray-700 mb-5" />
          <div className="mx-auto h-12 w-4/5 max-w-5xl rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
          <div className="mx-auto h-20 w-full max-w-5xl rounded-3xl bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="space-y-12 lg:space-y-20 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl bg-gray-100 dark:bg-gray-800 min-h-45 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TimelineDeferred(props: TimelineProps) {
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
        <Timeline {...props} />
      ) : (
        <TimelinePlaceholder className={props.className} />
      )}
    </div>
  );
}
