"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Optimized Video Hero Section Component
 *
 * Features:
 * - LCP-optimized with poster image priority loading
 * - Deferred video loading (after page load)
 * - Responsive video sources (WebM + MP4 fallback)
 * - Smooth transition from poster to video
 * - Fully accessible and mobile-optimized
 *
 * Core Web Vitals Strategy:
 * 1. Poster image loads immediately (becomes LCP element)
 * 2. Video loads after window.load event
 * 3. Smooth fade transition maintains visual quality
 */
export function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Wait for page load (after LCP) before loading video
    const handleLoad = () => {
      // Small delay to ensure LCP is recorded
      setTimeout(() => {
        setShouldLoadVideo(true);
      }, 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
      return;
    }

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      // Start video playback
      videoRef.current
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.info("Video autoplay prevented:", error);
          // Fallback: poster image will remain visible
        });
    }
  }, [shouldLoadVideo]);

  return (
    <section className="video-hero-container">
      {/* Video Element with Poster */}
      <video
        ref={videoRef}
        className={`video-hero-background ${isVideoPlaying ? "video-playing" : ""}`}
        poster="/images/hero-poster-optimized.webp"
        autoPlay={false} // Controlled by useEffect for better LCP
        loop
        muted
        playsInline
        preload="none"
        aria-label="MH Construction hero background video"
      >
        {/* WebM format - Best compression for modern browsers */}
        {shouldLoadVideo && (
          <>
            <source
              src="/videos/mh-hero-desktop.webm"
              type="video/webm"
              media="(min-width: 769px)"
            />
            <source
              src="/videos/mh-hero-mobile.webm"
              type="video/webm"
              media="(max-width: 768px)"
            />
            {/* MP4 Fallback - Universal compatibility */}
            <source
              src="/videos/mh-hero-desktop.mp4"
              type="video/mp4"
              media="(min-width: 769px)"
            />
            <source
              src="/videos/mh-hero-mobile.mp4"
              type="video/mp4"
              media="(max-width: 768px)"
            />
          </>
        )}
        {/* Fallback text for browsers that don't support video */}
        <p className="sr-only">
          Your browser does not support the video tag. MH Construction -
          Building Excellence.
        </p>
      </video>

      {/* Dark overlay for better text contrast */}
      <div className="video-hero-overlay" />

      {/* Hero Content */}
      <div className="video-hero-content">
        <div className="max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Company Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-700/80 px-4 py-2 backdrop-blur-sm">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold tracking-wide text-white">
              Veteran-Owned & Operated
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            MH Construction, Inc.
          </h1>

          {/* Tagline */}
          <p className="mb-4 text-xl font-medium text-emerald-100 sm:text-2xl md:text-3xl">
            Building for the Client, NOT the Dollar
          </p>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-3xl text-base text-slate-200 sm:text-lg md:text-xl">
            Serving the Pacific Northwest with integrity, quality craftsmanship,
            and an old-school mentality since 2010.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/50 sm:w-auto"
            >
              Get Free Consultation
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50 sm:w-auto"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="video-hero-scroll-indicator">
        <div className="mx-auto flex flex-col items-center">
          <span className="mb-2 text-sm font-medium text-white/80">
            Scroll to explore
          </span>
          <svg
            className="h-6 w-6 animate-bounce text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
