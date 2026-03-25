"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps {
  /** Path to .webm source (preferred — smaller, better quality on modern browsers) */
  webmSrc?: string;
  /** Path to .mp4 source (fallback for Safari / older browsers) */
  mp4Src?: string;
  /** Poster image shown before playback starts */
  poster?: string;
  className?: string;
  /** Loop the video (default: false) */
  loop?: boolean;
  /** Mute audio (required for autoPlay) */
  muted?: boolean;
  /** Start playing as soon as the browser allows (requires muted: true) */
  autoPlay?: boolean;
  /** Show native browser controls */
  controls?: boolean;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Called when playback starts */
  onPlay?: () => void;
  /** Called when playback is paused */
  onPause?: () => void;
  /** Called when the video plays past 90% — useful for completion tracking */
  onNearEnd?: () => void;
}

/**
 * OptimizedVideo — serves WebM with MP4 fallback, exposes analytics callbacks.
 *
 * Usage:
 * ```tsx
 * <OptimizedVideo
 *   webmSrc="/videos/mh_veterans_day_vid.webm"
 *   mp4Src="/videos/mh_veterans_day_vid.mp4"
 *   poster="/images/og-default.webp"
 *   controls
 *   ariaLabel="MH Construction Veterans Day message"
 *   onPlay={() => trackVideo('veterans-day', 'play')}
 * />
 * ```
 *
 * To generate the .webm companion run:
 *   npm run optimize:videos
 */
export function OptimizedVideo({
  webmSrc,
  mp4Src,
  poster,
  className,
  loop = false,
  muted = false,
  autoPlay = false,
  controls = true,
  ariaLabel,
  onPlay,
  onPause,
  onNearEnd,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const nearEndFired = useRef(false);

  const handleTimeUpdate = useCallback(() => {
    if (!onNearEnd || nearEndFired.current) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.currentTime / video.duration >= 0.9) {
      nearEndFired.current = true;
      onNearEnd();
    }
  }, [onNearEnd]);

  if (hasError || (!webmSrc && !mp4Src)) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg",
          className,
        )}
        role="img"
        aria-label={ariaLabel ?? "Video unavailable"}
      >
        <span className="material-icons text-gray-400 text-4xl">
          videocam_off
        </span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn("w-full h-full object-cover", className)}
      poster={poster}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
      controls={controls}
      playsInline
      aria-label={ariaLabel}
      onPlay={onPlay}
      onPause={onPause}
      onTimeUpdate={handleTimeUpdate}
      onError={() => setHasError(true)}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      {mp4Src && <source src={mp4Src} type="video/mp4" />}
      Your browser does not support HTML5 video.
    </video>
  );
}

/**
 * HeroVideo — full-bleed background video for hero sections.
 * Always autoPlays, muted, looped with no controls (decorative).
 */
interface HeroVideoProps {
  webmSrc?: string;
  mp4Src?: string;
  poster?: string;
  /** Overlay class — default is a dark gradient for text readability */
  overlayClassName?: string;
  children?: React.ReactNode;
}

export function HeroVideo({
  webmSrc,
  mp4Src,
  poster,
  overlayClassName = "bg-gradient-to-br from-gray-900/80 via-brand-primary/60 to-gray-900/80",
  children,
}: HeroVideoProps) {
  return (
    <div className="relative overflow-hidden">
      <OptimizedVideo
        {...(webmSrc ? { webmSrc } : {})}
        {...(mp4Src ? { mp4Src } : {})}
        {...(poster ? { poster } : {})}
        autoPlay
        muted
        loop
        controls={false}
        ariaLabel=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className={cn("absolute inset-0", overlayClassName)}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
