"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { useEffect, useRef, useState } from "react";

interface HeroSectionCopy {
  baseLabel: string;
  founded: string;
  tagline: string;
  mission: string;
  serving: string;
}

interface HeroSectionClientProps {
  copy: HeroSectionCopy;
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
  useVideoHero,
  hasWebm,
  hasMp4,
  hasPoster,
  webmSrc,
  mp4Src,
  posterSrc,
}: Readonly<HeroSectionClientProps>) {
  const videoRef = useRef<HTMLVideoElement>(null);
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

    const attemptInitialPlayback = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can be blocked by client/browser policy; keep poster/frame visible.
      } finally {
        syncPlaybackState();
      }
    };

    void attemptInitialPlayback();
    syncPlaybackState();
    const timer = globalThis.setInterval(syncPlaybackState, 250);

    return () => {
      globalThis.clearInterval(timer);
    };
  }, [useVideoHero]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      video.muted = false;
      setIsMuted(false);
      void video
        .play()
        .then(() => setIsVideoPlaying(true))
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
      .then(() => setIsVideoPlaying(true))
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
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted={isMuted}
              playsInline
              preload="auto"
              poster={hasPoster ? posterSrc : undefined}
              aria-label="MH Construction homepage hero video"
              onPlay={() => setIsVideoPlaying(true)}
              onPlaying={() => setIsVideoPlaying(true)}
              onCanPlay={() => setIsVideoReady(true)}
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
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>

      {/* Header Text - Bottom Right */}
      <div
        className={`hero-safe-top hero-safe-bottom relative z-10 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176 ${isVideoPlaying ? "opacity-0" : "opacity-100"}`}
      >
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-[clamp(1.35rem,3.5vw,2.75rem)] font-black text-white leading-[1.12] tracking-tight text-balance">
            <span className="mb-1 block text-brand-secondary text-[clamp(0.8rem,1.8vw,1.4rem)] leading-[1.2]">
              {copy.baseLabel}
            </span>
            <span className="mb-1 block text-brand-secondary/90 text-[clamp(0.75rem,1.5vw,1.15rem)] leading-[1.25]">
              {copy.tagline}
            </span>
            <span className="block text-white">
              Building projects for the Client,{" "}
              <span className="font-black italic text-brand-secondary">
                NOT
              </span>{" "}
              the Dollar
            </span>
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
            className="rounded px-2 py-1 text-[10px] font-semibold text-white/85 transition-colors hover:bg-black/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70"
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
        className="absolute bottom-0 left-0 right-0 z-30 border-white/0! bg-transparent! backdrop-blur-xl dark:border-gray-700/0! dark:bg-transparent!"
      />
    </section>
  );
}
