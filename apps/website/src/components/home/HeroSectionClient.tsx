"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_DEFAULT_INITIAL_DELAY_MS = 3200;
const HERO_VIDEO_JULY_INITIAL_DELAY_MS = 7000;

function getInitialHeroVideoDelayMs(now: Date = new Date()): number {
  const isJuly = now.getMonth() === 6;
  return isJuly
    ? HERO_VIDEO_JULY_INITIAL_DELAY_MS
    : HERO_VIDEO_DEFAULT_INITIAL_DELAY_MS;
}

interface HeroSectionCopy {
  baseLabel: string;
  founded: string;
  tagline: string;
  mission: string;
  serving: string;
}

interface HeroSectionClientProps {
  copy: HeroSectionCopy;
  heroSlogan?: string;
  useVideoHero: boolean;
  hasWebm: boolean;
  hasMp4: boolean;
  hasPoster: boolean;
  webmSrc: string;
  mp4Src: string;
  posterSrc: string;
}

export function HeroSectionClient({
  copy,
  heroSlogan,
  useVideoHero,
  hasWebm,
  hasMp4,
  hasPoster,
  webmSrc,
  mp4Src,
  posterSrc,
}: Readonly<HeroSectionClientProps>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedPlaybackRef = useRef(false);
  const delayedStartTimerRef = useRef<ReturnType<
    typeof globalThis.setTimeout
  > | null>(null);
  const initialVideoDelayMsRef = useRef<number>(getInitialHeroVideoDelayMs());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const showLegacyBackdrop = !isVideoReady;

  useEffect(() => {
    if (!useVideoHero) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    const syncPlaybackState = () => {
      setIsVideoPlaying(!video.paused && !video.ended);
    };

    const clearDelayedStartTimer = () => {
      if (delayedStartTimerRef.current === null) {
        return;
      }

      globalThis.clearTimeout(delayedStartTimerRef.current);
      delayedStartTimerRef.current = null;
    };

    const attemptPlayback = async () => {
      try {
        await video.play();
        hasStartedPlaybackRef.current = true;
      } catch {
        // Autoplay can be blocked by client/browser policy; keep poster/frame visible.
      } finally {
        syncPlaybackState();
      }
    };

    const scheduleDelayedInitialPlayback = () => {
      if (hasStartedPlaybackRef.current) {
        void attemptPlayback();
        return;
      }

      if (delayedStartTimerRef.current !== null) {
        return;
      }

      delayedStartTimerRef.current = globalThis.setTimeout(() => {
        delayedStartTimerRef.current = null;
        if (!document.hidden) {
          void attemptPlayback();
        }
      }, initialVideoDelayMsRef.current);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearDelayedStartTimer();
        video.pause();
        syncPlaybackState();
        return;
      }

      scheduleDelayedInitialPlayback();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          scheduleDelayedInitialPlayback();
        } else {
          clearDelayedStartTimer();
          video.pause();
          syncPlaybackState();
        }
      },
      { threshold: 0.35 },
    );

    scheduleDelayedInitialPlayback();
    syncPlaybackState();
    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearDelayedStartTimer();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [useVideoHero]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      if (delayedStartTimerRef.current !== null) {
        globalThis.clearTimeout(delayedStartTimerRef.current);
        delayedStartTimerRef.current = null;
      }

      video.muted = false;
      setIsMuted(false);
      void video
        .play()
        .then(() => {
          hasStartedPlaybackRef.current = true;
          setIsVideoPlaying(true);
        })
        .catch(() => setIsVideoPlaying(false));
      return;
    }

    video.pause();
    setIsVideoPlaying(false);
  };

  const replayVideo = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    video.muted = false;
    setIsMuted(false);
    void video
      .play()
      .then(() => {
        hasStartedPlaybackRef.current = true;
        setIsVideoPlaying(true);
      })
      .catch(() => setIsVideoPlaying(false));
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    setIsVideoPlaying(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section
      data-page-hero="true"
      className="hero-section relative flex items-end justify-end text-white overflow-hidden"
      style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
    >
      {/* Background - Video Support */}
      <div className="absolute inset-0">
        {useVideoHero ? (
          <>
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-contain object-[center_58%] min-[430px]:object-cover min-[430px]:object-[center_60%] sm:object-cover transition-opacity duration-300 ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted={isMuted}
              playsInline
              preload="metadata"
              poster={hasPoster ? posterSrc : undefined}
              aria-label="MH Construction homepage hero video highlighting project delivery leadership by Jeremy Thamert"
              onPlay={() => setIsVideoPlaying(true)}
              onPlaying={() => setIsVideoPlaying(true)}
              onCanPlay={() => setIsVideoReady(true)}
              onWaiting={() => setIsVideoPlaying(false)}
              onLoadedData={(event) => {
                setIsVideoReady(true);
                setIsVideoPlaying(!event.currentTarget.paused);
              }}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
              onError={() => {
                setIsVideoReady(false);
                setIsVideoPlaying(false);
              }}
            >
              {hasMp4 ? <source src={mp4Src} type="video/mp4" /> : null}
              {hasWebm ? <source src={webmSrc} type="video/webm" /> : null}
            </video>

            <div
              className={`absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900 transition-opacity duration-300 ${
                showLegacyBackdrop ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
        )}
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/15 via-gray-900/35 to-gray-900/50"></div>

      {/* Header Text - Bottom Right */}
      <div
        className={`hero-safe-top hero-safe-bottom relative z-10 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176 ${isVideoPlaying ? "opacity-0" : "opacity-100"}`}
      >
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            <span className="mb-1 block text-brand-secondary text-[clamp(0.8rem,1.8vw,1.4rem)] leading-[1.2]">
              {copy.baseLabel} -&gt; Command Center
            </span>
            <span className="mb-1 block text-brand-secondary/90 text-[clamp(0.75rem,1.5vw,1.15rem)] leading-[1.25]">
              {copy.tagline}
            </span>
            {heroSlogan ? null : null}
            <span className="block text-white">{copy.mission}</span>
            <span className="mt-1.5 block text-brand-secondary/75 text-[clamp(0.65rem,1.1vw,0.9rem)] leading-[1.4]">
              {copy.founded} | {copy.serving}
            </span>
          </h1>
        </div>
      </div>

      {/* Playback Controls - Positioned above page navigation */}
      {useVideoHero ? (
        <div className="absolute top-3 left-3 z-40 flex items-center gap-1 rounded-md border border-white/15 bg-black/15 px-1.5 py-1 opacity-45 backdrop-blur-[2px] transition-opacity duration-200 hover:opacity-95 focus-within:opacity-95 sm:top-4 sm:left-4">
          <button
            type="button"
            onClick={togglePlayPause}
            className="rounded px-2 py-1 text-[10px] font-semibold text-white/85 transition-colors hover:bg-black/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70"
            aria-label={isVideoPlaying ? "Pause hero video" : "Play hero video"}
          >
            {isVideoPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={replayVideo}
            className="rounded px-2 py-1 text-[10px] font-semibold text-white/85 transition-colors hover:bg-black/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70"
            aria-label="Replay hero video"
          >
            Replay
          </button>
          <button
            type="button"
            onClick={stopVideo}
            className="rounded px-2 py-1 text-[10px] font-semibold text-white/85 transition-colors hover:bg-black/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70"
            aria-label="Stop hero video"
          >
            Stop
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className={`rounded px-2 py-1 text-[10px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 ${
              isMuted
                ? "bg-brand-secondary text-gray-950 shadow-md shadow-brand-secondary/45 ring-1 ring-brand-secondary/80 motion-safe:animate-pulse motion-safe:duration-1000 hover:bg-brand-secondary/90"
                : "text-white/85 hover:bg-black/30 hover:text-white"
            }`}
            aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      ) : null}

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.home}
        showRemainingPagesOverlay
        className="absolute bottom-0 left-0 right-0 z-30 border-white/0 bg-transparent backdrop-blur-xl dark:border-gray-700/0 dark:bg-transparent"
      />
    </section>
  );
}
