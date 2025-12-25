"use client";

import { useState, useEffect, useCallback } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SpecialtyServiceCard } from "./SpecialtyServiceCard";
import type { SpecialtyService } from "./servicesData";

interface SpecialtyServicesCarouselProps {
  services: SpecialtyService[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function SpecialtyServicesCarousel({
  services,
  autoPlay = true,
  autoPlayInterval = 6000,
  className = "",
}: SpecialtyServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || services.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length, autoPlayInterval]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000);
  }, [services.length, autoPlay]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(autoPlay), 10000);
  }, [services.length, autoPlay]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(autoPlay), 10000);
    },
    [autoPlay],
  );

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? 0);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (services.length === 0) {
    return null;
  }

  return (
    <div className={`relative mx-auto max-w-7xl ${className}`}>
      {/* Carousel Container - Mobile/Tablet only */}
      <div
        className="relative lg:hidden overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative min-h-[500px]">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`absolute inset-0 transition-all duration-500 ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : index < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
              }`}
              style={{
                pointerEvents: index === currentIndex ? "auto" : "none",
              }}
            >
              <SpecialtyServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {services.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Previous service"
            >
              <MaterialIcon
                icon="chevron_left"
                className="text-gray-900 dark:text-white"
                size="lg"
              />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Next service"
            >
              <MaterialIcon
                icon="chevron_right"
                className="text-gray-900 dark:text-white"
                size="lg"
              />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {services.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={`carousel-dot-${index}`}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  index === currentIndex
                    ? "bg-brand-primary w-12 h-3"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-3 h-3"
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {services.length > 1 && (
          <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
            {currentIndex + 1} / {services.length}
          </div>
        )}
      </div>

      {/* Desktop Grid - 3 columns, no carousel */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        {services.map((service) => (
          <SpecialtyServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}
