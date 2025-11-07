/**
 * Video Schema Generator
 * For project videos, tutorials, testimonials
 */

export interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 format: PT1M30S for 1 min 30 sec
  contentUrl?: string;
  embedUrl?: string;
}

export function generateVideoSchema(video: VideoSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    publisher: {
      "@type": "Organization",
      name: "MH Construction",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mhc-gc.com/images/logo/mh-logo.png",
      },
    },
  };
}
