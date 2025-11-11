"use client";

import { useRef, useState } from "react";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * Homepage Hero Section
 * Full-screen hero with video background
 */
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handlePlayWithSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 0.7;
    setIsMuted(false);
    video.play();
    setIsPlaying(true);
    setShowPlayButton(false);
  };

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
          className="absolute inset-0 w-full h-full object-cover z-0"
          loop
          playsInline
        >
          <source src="/videos/mh_veterans_day_vid.mp4" type="video/mp4" />
        </video>
        {/* Light overlay for subtle darkening if needed */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-gray-900/30 to-brand-secondary/20 z-10 pointer-events-none"></div>
      </div>

      {/* Large Play Button Overlay - Shows initially */}
      {showPlayButton && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <button
            onClick={handlePlayWithSound}
            className="bg-brand-primary/90 hover:bg-brand-primary backdrop-blur-sm p-8 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl"
            aria-label="Play video with sound"
          >
            <MaterialIcon
              icon="play_arrow"
              size="lg"
              className="text-white"
              style={{ fontSize: "64px" }}
            />
          </button>
        </div>
      )}

      {/* Video Controls - Top Right */}
      {!showPlayButton && (
        <div className="absolute top-20 right-4 z-50 flex gap-2">
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
      )}

      {/* Veterans Day Message - Moved higher above navigation */}
      <div className="absolute bottom-36 left-0 right-0 z-40 text-center pointer-events-none">
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
