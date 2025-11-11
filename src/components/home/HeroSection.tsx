"use client";

import { useRef, useEffect, useState } from "react";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * Homepage Hero Section
 * Full-screen hero with video background
 */
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play with sound once on load
    video.muted = false;
    video.volume = 0.7;
    video.play().catch(() => {
      // If autoplay with sound fails, fall back to muted
      video.muted = true;
      video.play();
    });

    // After first play completes, mute it
    const handleEnded = () => {
      if (!hasPlayedOnce) {
        setHasPlayedOnce(true);
        setIsMuted(true);
        video.muted = true;
        video.play(); // Continue looping muted
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [hasPlayedOnce]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          playsInline
        >
          <source src="/videos/mh_veterans_day_vid.mp4" type="video/mp4" />
        </video>
        {/* Light overlay for subtle darkening if needed */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-gray-900/30 to-brand-secondary/20"></div>
      </div>

      {/* Video Controls */}
      <div className="absolute top-20 right-4 z-20 flex gap-2">
        <button
          onClick={togglePlay}
          className="bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <MaterialIcon
            icon={isPlaying ? "pause" : "play_arrow"}
            size="md"
            className="text-white"
          />
        </button>
        <button
          onClick={toggleMute}
          className="bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <MaterialIcon
            icon={isMuted ? "volume_off" : "volume_up"}
            size="md"
            className="text-white"
          />
        </button>
      </div>

      {/* Veterans Day Message */}
      <div className="absolute bottom-20 left-0 right-0 z-10 text-center pb-4">
        <p className="text-brand-secondary text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
          Happy Veterans Day!
        </p>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.home}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
