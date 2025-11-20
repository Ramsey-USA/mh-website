# Video Hero Section - Core Web Vitals Optimization Guide

## Overview

This guide ensures your video hero sections don't negatively impact your Largest Contentful Paint (LCP)
scores and maintains excellent Core Web Vitals performance.

## Critical Implementation Guidelines

### 1. Video Loading Strategy

#### Use Poster Images (CRITICAL)

Always include a high-quality, optimized poster image that displays before the video loads:

```html
<video
  poster="/images/hero-poster-optimized.webp"
  preload="metadata"
  muted
  autoplay
  loop
  playsinline
></video>
```

**Poster Image Requirements:**

- Format: WebP with JPEG fallback
- Optimized size: < 100KB
- Dimensions: Match video aspect ratio
- Quality: 80-85% compression
- Use priority loading: `fetchpriority="high"` on the image

#### Lazy Load Strategy

```javascript
// Only autoplay video after LCP
window.addEventListener("load", () => {
  const heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    heroVideo.play();
  }
});
```

### 2. Video File Optimization

#### Compression Settings

- **Codec:** H.264 (MP4) for maximum compatibility
- **Resolution:** 1920x1080 maximum (scale down for mobile)
- **Bitrate:** 2-3 Mbps for 1080p
- **Frame Rate:** 24-30 fps
- **Duration:** Keep under 20 seconds, loop if needed

#### Command for FFmpeg Optimization

```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 \
  -vf "scale=1920:-2" -movflags +faststart \
  -an output-optimized.mp4
```

#### Multiple Formats & Responsive Loading

```html
<video poster="/images/hero-poster.webp" preload="none">
  <source
    srcset="/videos/hero-mobile.mp4"
    media="(max-width: 768px)"
    type="video/mp4"
  />
  <source src="/videos/hero-desktop.mp4" type="video/mp4" />
</video>
```

### 3. React/Next.js Implementation Example

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    // Wait for LCP before loading video
    if (typeof window !== "undefined") {
      window.addEventListener("load", () => {
        setShouldPlayVideo(true);
      });
    }
  }, []);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
    }
  }, [shouldPlayVideo]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Poster Image - Loads First for LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-poster-optimized.webp"
          alt="MH Construction - Building Excellence"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Video - Loads After LCP */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source
            src="/videos/hero-desktop-optimized.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
          <source src="/videos/hero-mobile-optimized.mp4" type="video/mp4" />
        </video>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-4xl px-4 text-center text-white">
          <h1 className="text-5xl font-bold md:text-7xl">
            MH Construction, Inc.
          </h1>
          <p className="mt-4 text-xl md:text-2xl">
            Building for the Client, NOT the Dollar
          </p>
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-900/40" />
    </section>
  );
}
```

### 4. Vanilla JavaScript Implementation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MH Construction - Building Excellence</title>
    <style>
      .video-hero {
        position: relative;
        height: 100vh;
        width: 100%;
        overflow: hidden;
      }

      .hero-poster,
      .hero-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero-poster {
        z-index: 1;
        transition: opacity 1s ease-in-out;
      }

      .hero-poster.fade-out {
        opacity: 0;
      }

      .hero-video {
        z-index: 0;
      }

      .hero-content {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: white;
        text-align: center;
      }

      .hero-overlay {
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.4);
        z-index: 2;
      }
    </style>
  </head>
  <body>
    <section class="video-hero">
      <!-- Poster Image - Critical for LCP -->
      <img
        id="hero-poster"
        class="hero-poster"
        src="/images/hero-poster-optimized.webp"
        alt="MH Construction - Building Excellence"
        fetchpriority="high"
      />

      <!-- Video Element - Loads After LCP -->
      <video
        id="hero-video"
        class="hero-video"
        muted
        loop
        playsinline
        preload="none"
      >
        <source
          src="/videos/hero-desktop-optimized.mp4"
          type="video/mp4"
          media="(min-width: 769px)"
        />
        <source src="/videos/hero-mobile-optimized.mp4" type="video/mp4" />
      </video>

      <!-- Overlay -->
      <div class="hero-overlay"></div>

      <!-- Hero Content -->
      <div class="hero-content">
        <div>
          <h1>MH Construction, Inc.</h1>
          <p>Building for the Client, NOT the Dollar</p>
        </div>
      </div>
    </section>

    <script>
      // Wait for page load (after LCP) before starting video
      window.addEventListener("load", function () {
        const video = document.getElementById("hero-video");
        const poster = document.getElementById("hero-poster");

        // Start loading and playing video
        video.load();
        video.play().catch((err) => {
          console.log("Video autoplay prevented:", err);
        });

        // Fade out poster once video is playing
        video.addEventListener("playing", function () {
          poster.classList.add("fade-out");
        });
      });

      // Fallback: Show poster if video fails
      document
        .getElementById("hero-video")
        .addEventListener("error", function () {
          console.log("Video failed to load, using poster image");
        });
    </script>
  </body>
</html>
```

### 5. Performance Checklist

- [ ] Poster image is optimized (WebP, < 100KB)
- [ ] Poster image has `priority` or `fetchpriority="high"`
- [ ] Video has `preload="none"` or `preload="metadata"`
- [ ] Video only loads/plays after page load event
- [ ] Mobile video is separate and smaller (< 2MB)
- [ ] Desktop video is optimized (< 5MB)
- [ ] `playsinline` attribute present (iOS requirement)
- [ ] Video is muted for autoplay compliance
- [ ] Fallback poster displays if video fails
- [ ] Smooth transition between poster and video

### 6. Core Web Vitals Targets

- **LCP:** < 2.5 seconds ✓
- **FID:** < 100ms ✓
- **CLS:** < 0.1 ✓

### 7. Testing Commands

```bash
# Test LCP with Lighthouse
npx lighthouse https://mhc-gc.com --only-categories=performance

# Test with PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://mhc-gc.com&category=PERFORMANCE"

# Local testing
npm run build && npm run start
```

### 8. CDN Recommendations

Serve videos from a CDN for optimal performance:

- **Cloudflare Stream** - Adaptive bitrate streaming
- **Cloudflare R2** - Cost-effective video storage
- **AWS CloudFront** - Global CDN distribution

### 9. Monitoring

Add Real User Monitoring (RUM) to track actual LCP:

```javascript
// Monitor LCP in production
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];

  console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);

  // Send to analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "LCP", {
      value: lastEntry.renderTime || lastEntry.loadTime,
      event_category: "Web Vitals",
    });
  }
});

observer.observe({ entryTypes: ["largest-contentful-paint"] });
```

## Summary

The key to maintaining excellent Core Web Vitals with video heroes:

1. **Always use an optimized poster image** (this becomes your LCP element)
2. **Defer video loading** until after the initial page load
3. **Optimize video files** aggressively (compression, resolution, format)
4. **Provide responsive videos** (different files for mobile/desktop)
5. **Monitor real-world performance** with RUM tools

This approach ensures your poster image loads quickly for LCP while providing an enhanced experience with
video once the page is fully loaded.
