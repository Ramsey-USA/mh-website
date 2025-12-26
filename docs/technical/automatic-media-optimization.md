# Automatic Media Optimization

This project automatically optimizes images and videos when they're added to the repository.

## How It Works

### GitHub Actions Workflow

When you push images or videos to `public/images/` or `public/videos/`, a GitHub Action automatically:

1. **Detects** new/modified media files
2. **Optimizes** them using industry-standard tools
3. **Commits** the optimized versions back to your branch
4. **Reports** savings and optimization stats

### Image Optimization

**Automatic conversions:**

- PNG/JPG → WebP (40-84% smaller)
- Progressive JPEGs
- Metadata stripping
- Quality optimization (80% default)

**Runtime optimization (Next.js):**

- WebP/AVIF format conversion
- Responsive srcset generation
- Lazy loading
- Automatic resizing

### Video Optimization

**Automatic processing:**

- Converts to WebM (VP9) and MP4 (H.264)
- Multiple quality levels (1080p, 720p, 480p)
- Generates poster images (first frame)
- Optimizes for web streaming

**Quality presets:**

- **1080p**: 5000k video bitrate, 192k audio
- **720p**: 2500k video bitrate, 128k audio
- **480p**: 1000k video bitrate, 96k audio

## Usage

### Adding Media Files

Simply add your files to the appropriate directory:

```bash
# Add images
cp my-photo.jpg public/images/

# Add videos
cp my-video.mp4 public/videos/

# Commit and push
git add public/
git commit -m "Add new media"
git push
```

The GitHub Action will automatically optimize them within minutes.

### Manual Optimization (Optional)

You can also run optimization locally:

```bash
# Optimize all images
npm run optimize:images

# Optimize all videos
npm run optimize:videos

# Audit images for opportunities
npm run audit:images
```

### Using Optimized Images

**With Next.js Image component (recommended):**

```tsx
import Image from "next/image";

<Image
  src="/images/my-photo.jpg" // Automatically optimized
  alt="Description"
  width={800}
  height={600}
/>;
```

**With custom ResponsiveImage components:**

```tsx
import { HeroImage } from "@/components/images";

<HeroImage
  src="/images/hero.jpg"
  alt="Hero image"
  priority // LCP optimization
/>;
```

### Using Optimized Videos

The workflow creates multiple formats for browser compatibility:

```tsx
<video controls poster="/videos/my-video-poster.jpg">
  <source src="/videos/my-video.webm" type="video/webm" />
  <source src="/videos/my-video.mp4" type="video/mp4" />
  Your browser doesn't support video playback.
</video>
```

## Workflow Triggers

The optimization workflow runs when:

- **Push** to `main` or `develop` branches
- **Pull Request** with media changes
- Only triggers for these paths:
  - `public/images/**`
  - `public/videos/**`

## Output Locations

Optimized files are saved to:

```
public/
├── images/
│   └── my-photo.jpg          # Original
├── images-optimized/
│   └── my-photo.webp         # Optimized (auto-copied)
├── videos/
│   └── my-video.mp4          # Original
└── videos-optimized/
    ├── my-video.webm         # WebM version
    ├── my-video.mp4          # Optimized MP4
    └── my-video-poster.jpg   # Poster image
```

## Optimization Reports

After each optimization, the workflow provides:

- **File count**: How many files were optimized
- **Size savings**: Total bytes saved
- **Formats created**: WebP, WebM, MP4, posters
- **GitHub Summary**: Detailed report in Actions tab

## Requirements

### GitHub Actions (automatic)

- ✅ Runs automatically on GitHub
- ✅ No local setup required
- ✅ Works for all contributors

### Local Development (optional)

- **Node.js**: 22+ (already required)
- **sharp**: Installed via npm (images)
- **FFmpeg**: Required for videos

Install FFmpeg locally:

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

## Performance Impact

### Images

- **Size reduction**: 40-84% smaller
- **LCP improvement**: 30-40% faster
- **Format support**: WebP (96%+ browsers)
- **Fallback**: Automatic PNG/JPG for old browsers

### Videos

- **Size reduction**: 30-60% smaller
- **Formats**: WebM + MP4 (100% browser coverage)
- **Streaming**: Optimized for progressive download
- **Quality**: Maintains visual fidelity

## Troubleshooting

### Workflow Not Running

Check:

1. Files are in `public/images/` or `public/videos/`
2. Push is to `main` or `develop` branch
3. File extensions are supported (png, jpg, mp4, mov, etc.)

### Optimization Failed

The workflow will:

- Continue on errors (won't block your push)
- Report failures in GitHub Actions log
- Skip files that can't be optimized

### Large File Sizes

For very large videos (>100MB):

- Consider hosting on video platforms (YouTube, Vimeo)
- Use Cloudflare Stream for enterprise video
- Pre-compress before committing

## CI Configuration

The workflow supports CI flags for silent operation:

```bash
# Silent mode (no color output)
npm run optimize:images -- --ci
npm run optimize:videos -- --ci
```

## Skipping Optimization

To skip the workflow for a specific commit:

```bash
git commit -m "Add media [skip ci]"
```

## Best Practices

1. **Image Sizes**: Keep originals under 5MB when possible
2. **Video Length**: Under 2 minutes for best performance
3. **Format Choice**:
   - Use PNG for logos/icons with transparency
   - Use JPG for photos
   - Use MP4 for videos (auto-converted to WebM)
4. **Naming**: Use descriptive names: `hero-homepage.jpg` not `img1.jpg`
5. **Alt Text**: Always provide meaningful alt text for accessibility

## Monitoring

Track optimization in:

- **GitHub Actions**: Actions tab → "Optimize Images & Videos"
- **Commit History**: Auto-commits show optimization stats
- **Build Logs**: npm run build shows image optimization

## Future Enhancements

Potential improvements:

- [ ] AVIF format support (even smaller than WebP)
- [ ] Cloudflare Images integration
- [ ] AI-powered image compression
- [ ] Video thumbnail generation with multiple frames
- [ ] Automatic responsive image variants

---

**Status**: ✅ Active  
**Maintained By**: GitHub Actions (automated)  
**Last Updated**: 2025-12-26
