"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card } from "@/components/ui";
import type { ProjectGallerySlide } from "@/lib/services/portfolio-service";

interface ProjectGalleryCarouselProps {
  slides: ProjectGallerySlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function ProjectGalleryCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 6500,
  className = "",
}: ProjectGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (
      !isAutoPlaying ||
      prefersReducedMotion ||
      slides.length <= 1 ||
      autoPlayInterval <= 0
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion, slides.length, autoPlayInterval]);

  if (slides.length === 0) {
    return (
      <div className={`relative mx-auto max-w-6xl ${className}`}>
        <Card className="relative overflow-hidden rounded-3xl border border-gray-200/80 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 shadow-2xl p-8 sm:p-12 lg:p-16 text-center">
          <MaterialIcon
            icon="photo_library"
            size="4xl"
            className="mx-auto mb-6 text-brand-primary"
          />
          <h3 className="mb-4 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
            Project photos are coming soon
          </h3>
          <p className="font-body mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
            Public project photography will appear here as published project
            records are added to the portfolio.
          </p>
        </Card>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  if (!currentSlide) return null;

  const slideCaption = currentSlide.image.caption ?? currentSlide.image.alt;
  const slideLocation = currentSlide.projectLocation.isPublic
    ? `${currentSlide.projectLocation.city}, ${currentSlide.projectLocation.state}`
    : "Location private";

  const goToSlide = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    setCurrentIndex(nextIndex);
    setIsAutoPlaying(false);
  };

  const goToNext = () => goToSlide(currentIndex + 1);
  const goToPrevious = () => goToSlide(currentIndex - 1);
  const toggleAutoPlay = () => setIsAutoPlaying((previous) => !previous);

  return (
    <div className={`relative mx-auto max-w-6xl ${className}`}>
      <Card
        className="relative overflow-hidden rounded-3xl border border-gray-200/80 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 shadow-2xl outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Project photo gallery"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goToNext();
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToPrevious();
          }

          if (event.key === " ") {
            event.preventDefault();
            toggleAutoPlay();
          }
        }}
      >
        <div
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-900"
          style={{ aspectRatio: "16 / 10" }}
        >
          <Image
            src={currentSlide.image.url}
            alt={currentSlide.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 70vw"
            quality={82}
            priority={currentIndex === 0}
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-linear-to-b from-black/55 via-black/10 to-transparent p-4 sm:p-6 text-white">
            <div className="rounded-full bg-black/35 px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              Photo {currentIndex + 1} of {slides.length}
            </div>
            <button
              type="button"
              onClick={toggleAutoPlay}
              className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={
                isAutoPlaying
                  ? "Pause gallery rotation"
                  : "Resume gallery rotation"
              }
            >
              <MaterialIcon
                icon={isAutoPlaying ? "pause" : "play_arrow"}
                className="h-4 w-4"
              />
              {isAutoPlaying ? "Pause" : "Play"}
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/50 to-transparent p-5 sm:p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              <span>{currentSlide.projectCategory}</span>
              {currentSlide.projectSubcategory ? (
                <span aria-hidden="true">|</span>
              ) : null}
              {currentSlide.projectSubcategory ? (
                <span>{currentSlide.projectSubcategory}</span>
              ) : null}
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              <Link
                href={`/projects/${currentSlide.projectSlug}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
              >
                {currentSlide.projectTitle}
              </Link>
            </h3>
            <p className="mt-1 text-sm sm:text-base text-white/85">
              {slideLocation} · {currentSlide.projectYearCompleted}
            </p>
            <p
              className="font-body mt-3 max-w-4xl text-sm sm:text-base leading-relaxed text-white/90"
              aria-live="polite"
            >
              {slideCaption}
            </p>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/90 p-3 text-gray-900 shadow-xl backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Previous project photo"
          >
            <MaterialIcon icon="chevron_left" className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/90 p-3 text-gray-900 shadow-xl backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Next project photo"
          >
            <MaterialIcon icon="chevron_right" className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 bg-white/95 dark:bg-gray-800/95 border-t border-gray-200/80 dark:border-gray-700">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Public project photography
            </p>
            <p className="mt-1 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
              {currentSlide.projectTitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block h-2 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / slides.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 tabular-nums">
              {currentIndex + 1}/{slides.length}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
