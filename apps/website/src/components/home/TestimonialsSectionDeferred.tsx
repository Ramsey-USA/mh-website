"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialsSectionDeferredProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  id?: string;
  animated?: boolean;
  testimonials: Testimonial[];
}

const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  {
    ssr: false,
    loading: () => <TestimonialsPlaceholder />,
  },
);

function TestimonialsPlaceholder() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 sm:mb-20 text-center">
          <div className="mx-auto h-6 w-40 rounded-full bg-gray-200 dark:bg-gray-700 mb-5" />
          <div className="mx-auto h-12 w-3/4 max-w-4xl rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
          <div className="mx-auto h-6 w-full max-w-5xl rounded-full bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-2xl p-8 sm:p-12 lg:p-16 min-h-[420px] animate-pulse" />
      </div>
    </section>
  );
}

export function TestimonialsSectionDeferred(
  props: TestimonialsSectionDeferredProps,
) {
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
        <TestimonialsSection {...props} />
      ) : (
        <TestimonialsPlaceholder />
      )}
    </div>
  );
}
