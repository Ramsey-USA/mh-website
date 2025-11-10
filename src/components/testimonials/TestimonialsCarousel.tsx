"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = "",
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length, autoPlayInterval]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <div className={`relative mx-auto max-w-5xl ${className}`}>
      {/* Main Carousel Card */}
      <div className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16 min-h-[400px] sm:min-h-[450px] flex flex-col justify-between">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex justify-center items-center bg-brand-secondary/10 p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16">
          <svg
            className="w-full h-full text-brand-secondary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Testimonial Content */}
        <div className="flex-1 mb-8">
          {/* Star Rating */}
          {currentTestimonial.rating && (
            <div className="flex space-x-1 mb-6">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <MaterialIcon
                  key={i}
                  icon="star"
                  className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7"
                />
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="font-light text-gray-700 dark:text-gray-300 text-xl sm:text-2xl lg:text-3xl italic leading-relaxed tracking-wide mb-8">
            "{currentTestimonial.quote}"
          </blockquote>
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg p-3 rounded-2xl w-16 h-16 sm:w-20 sm:h-20">
            <span className="font-bold text-white text-2xl sm:text-3xl">
              {currentTestimonial.name.charAt(0)}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="mb-1 font-black text-gray-900 dark:text-gray-100 text-xl sm:text-2xl tracking-tight">
              {currentTestimonial.name}
            </p>
            {currentTestimonial.location && (
              <p className="font-medium text-gray-600 dark:text-gray-400 text-sm sm:text-base tracking-wide">
                {currentTestimonial.location}
              </p>
            )}
            {currentTestimonial.project && (
              <p className="font-bold text-brand-primary text-sm sm:text-base mt-1">
                {currentTestimonial.project}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Previous testimonial"
        >
          <MaterialIcon
            icon="chevron_left"
            className="text-gray-900 dark:text-white w-6 h-6"
          />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Next testimonial"
        >
          <MaterialIcon
            icon="chevron_right"
            className="text-gray-900 dark:text-white w-6 h-6"
          />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              index === currentIndex
                ? "bg-brand-primary w-12 h-3"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-3 h-3"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
        {currentIndex + 1} / {testimonials.length}
      </div>
    </div>
  );
}
