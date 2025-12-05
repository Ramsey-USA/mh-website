# Video Hero Component - Implementation Guide

## Overview

This guide covers the implementation of the LCP-optimized video hero component for MH Construction's website.

## Files Created

### 1. React Component

**Location:** `/src/components/home/VideoHeroSection.tsx`

**Features:**

- ✅ LCP-optimized with poster image priority
- ✅ Deferred video loading (after page load)
- ✅ WebM (primary) + MP4 (fallback) formats
- ✅ Responsive video sources (mobile/desktop)
- ✅ Smooth poster-to-video transition
- ✅ Full accessibility support
- ✅ Reduced motion support

**Key Attributes:**

```tsx
<video
  poster="/images/hero-poster-optimized.webp"  // CRITICAL for LCP
  autoPlay={false}                              // Controlled via useEffect
  loop                                          // Continuous playback
  muted                                         // Required for autoplay
  playsInline                                   // iOS compatibility
  preload="none"                                // Deferred loading
>
```

### 2. CSS Styles

**Location:** `/src/styles/video-hero.css`

**Critical Classes:**

- `.video-hero-background` - Video element with `z-index: -1` and `object-fit: cover`
- `.video-hero-container` - Full viewport container
- `.video-hero-overlay` - Dark gradient for text readability
- `.video-hero-content` - Content layer above video (z-index: 10)

### 3. Vanilla HTML/CSS Example

**Location:** `/public/video-hero-example.html`

A complete standalone HTML file demonstrating the same LCP-optimization strategy without React.

## Usage

### Import the Component

```tsx
import { VideoHeroSection } from "@/components/home";

export default function HomePage() {
  return (
    <>
      <VideoHeroSection />
      {/* Rest of your page content */}
    </>
  );
}
```

### Import the CSS

Add to your main CSS file or `app/layout.tsx`:

```tsx
import "@/styles/video-hero.css";
```

## Video File Requirements

### Desktop Videos

- **WebM:** `/public/videos/mh-hero-desktop.webm` (recommended)
- **MP4:** `/public/videos/mh-hero-desktop.mp4` (fallback)
- **Dimensions:** 1920x1080 or 1280x720
- **Max Size:** < 5MB
- **Bitrate:** 2-3 Mbps

### Mobile Videos

- **WebM:** `/public/videos/mh-hero-mobile.webm` (recommended)
- **MP4:** `/public/videos/mh-hero-mobile.mp4` (fallback)
- **Dimensions:** 720x1280 (portrait) or 1280x720 (landscape)
- **Max Size:** < 2MB
- **Bitrate:** 1-1.5 Mbps

### Poster Image (CRITICAL)

- **Location:** `/public/images/hero-poster-optimized.webp`
- **Format:** WebP (with JPEG fallback if needed)
- **Dimensions:** Match video aspect ratio
- **Max Size:** < 100KB
- **Quality:** 80-85%
- **Purpose:** This is your LCP element!

## Video Optimization Commands

### Convert and Optimize with FFmpeg

#### Desktop Video (1920x1080)

```bash
# WebM (VP9 codec - best compression)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 2M \
  -vf "scale=1920:-2" -an \
  public/videos/mh-hero-desktop.webm

# MP4 (H.264 codec - universal fallback)
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 \
  -vf "scale=1920:-2" -movflags +faststart -an \
  public/videos/mh-hero-desktop.mp4
```

#### Mobile Video (1280x720)

```bash
# WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 38 -b:v 1M \
  -vf "scale=1280:-2" -an \
  public/videos/mh-hero-mobile.webm

# MP4
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 30 \
  -vf "scale=1280:-2" -movflags +faststart -an \
  public/videos/mh-hero-mobile.mp4
```

#### Create Optimized Poster Image

```bash
# Extract frame at 2 seconds
ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 -q:v 2 poster.jpg

# Convert to WebP with optimization
ffmpeg -i poster.jpg -vf "scale=1920:-2" \
  -quality 85 public/images/hero-poster-optimized.webp
```

## Core Web Vitals Strategy

### LCP Optimization Flow

1. **Immediate:** Poster image loads (high priority)
2. **After Load:** Video begins loading
3. **Smooth Transition:** Fade from poster to video
4. **Fallback:** If video fails, poster remains

### Expected Performance

- **LCP:** < 2.5s ✅ (poster image)
- **FID:** < 100ms ✅ (deferred JS)
- **CLS:** < 0.1 ✅ (fixed dimensions)

### Testing

```bash
# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Check LCP specifically
npx lighthouse http://localhost:3000 \
  --only-categories=performance \
  --preset=desktop
```

## Accessibility Features

✅ ARIA labels for screen readers
✅ Keyboard navigation support
✅ Reduced motion media queries
✅ High contrast mode support
✅ Semantic HTML structure
✅ Focus management

## Browser Support

| Browser | WebM | MP4 | Poster | Autoplay |
| ------- | ---- | --- | ------ | -------- |
| Chrome  | ✅   | ✅  | ✅     | ✅       |
| Firefox | ✅   | ✅  | ✅     | ✅       |
| Safari  | ❌   | ✅  | ✅     | ✅       |
| Edge    | ✅   | ✅  | ✅     | ✅       |
| iOS     | ❌   | ✅  | ✅     | ✅\*     |

\*iOS requires `muted` and `playsInline` attributes

## Troubleshooting

### Video Not Playing

- Check browser console for autoplay errors
- Verify video files exist at correct paths
- Ensure `muted` attribute is present
- Test with smaller video files first

### Poor LCP Score

- Verify poster image is < 100KB
- Check poster image has high priority loading
- Ensure video loads AFTER page load event
- Test with WebPageTest or Lighthouse

### Layout Shift Issues

- Verify container has fixed height (`100vh`)
- Check `object-fit: cover` is applied
- Ensure overlay doesn't cause reflow

## Next Steps

1. Create/optimize your video files using FFmpeg commands above
2. Create optimized poster image
3. Place files in correct directories
4. Import component in your homepage
5. Test locally with Lighthouse
6. Deploy and monitor with RUM

## Support

For issues or questions, refer to:

- `/docs/optimization/video-hero-core-web-vitals.md` (detailed guide)
- Chrome DevTools Performance tab
- Lighthouse CI reports
- Core Web Vitals monitoring in production

---

**Built for MH Construction, Inc.**
_Building projects for the client, NOT the dollar_
