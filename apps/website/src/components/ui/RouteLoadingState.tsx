import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

type RouteLoadingVariant =
  "careers" | "contact" | "projects" | "team" | "testimonials";

type RouteLoadingStateProps = {
  variant: RouteLoadingVariant;
};

function LoadingHero() {
  return (
    <section
      aria-hidden="true"
      className="border-b border-gray-200/70 dark:border-gray-800"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <Skeleton className="mx-auto h-10 w-3/5" />
          <Skeleton className="mx-auto h-5 w-2/5" />
        </div>
      </div>
    </section>
  );
}

function ContactSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12"
      aria-hidden="true"
    >
      <div className="space-y-5">
        <Skeleton className="h-7 w-44" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`contact-form-${index}`} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="space-y-5">
        <Skeleton className="h-7 w-44" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`contact-details-${index}`}
            className="rounded-2xl border border-gray-200/70 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        ))}
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={`projects-filter-${index}`}
            className="h-10 w-24 rounded-full"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={`projects-card-${index}`}
            className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white dark:border-gray-700 dark:bg-gray-900"
          >
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TeamSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <article
          key={`team-card-${index}`}
          className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white dark:border-gray-700 dark:bg-gray-900"
        >
          <Skeleton className="h-56 w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </article>
      ))}
    </div>
  );
}

function TestimonialsSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <article
          key={`testimonials-card-${index}`}
          className="rounded-2xl border border-gray-200/70 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="space-y-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Skeleton
                  key={`testimonials-star-${index}-${starIndex}`}
                  className="h-4 w-4"
                />
              ))}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function CareersSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={`careers-filter-${index}`}
            className="h-10 w-24 rounded-full"
          />
        ))}
      </div>

      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={`careers-card-${index}`}
            className="rounded-2xl border border-gray-200/70 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-4 flex items-start justify-between gap-6">
              <div className="w-full space-y-2">
                <Skeleton className="h-6 w-2/5" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, chipIndex) => (
                <Skeleton
                  key={`careers-chip-${index}-${chipIndex}`}
                  className="h-6 w-20 rounded-full"
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function RouteLoadingState({
  variant,
}: Readonly<RouteLoadingStateProps>) {
  const contentByVariant: Record<RouteLoadingVariant, ReactNode> = {
    careers: <CareersSkeleton />,
    contact: <ContactSkeleton />,
    projects: <ProjectsSkeleton />,
    team: <TeamSkeleton />,
    testimonials: <TestimonialsSkeleton />,
  };

  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      <LoadingHero />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {contentByVariant[variant]}
      </section>
    </main>
  );
}
