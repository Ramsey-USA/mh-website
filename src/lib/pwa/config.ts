/**
import { logger } from "@/lib/utils/logger";
 * PWA Configuration
 * Progressive Web App configuration for MH Construction website
 */

export const PWA_CONFIG = {
  name: "MH Construction",
  short_name: "MH Construction",
  description:
    "Professional construction services with veteran expertise and specialized military benefits",
  theme_color: "#1e40af",
  background_color: "#ffffff",
  display: "standalone",
  orientation: "portrait-primary",
  scope: "/",
  start_url: "/?source=pwa",
  id: "mh-construction-pwa",
  categories: ["business", "construction", "services"],
  lang: "en-US",
  dir: "ltr",

  // Icons configuration
  icons: [
    {
      src: "/icons/icon-72x72.png",
      sizes: "72x72",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-96x96.png",
      sizes: "96x96",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-128x128.png",
      sizes: "128x128",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-144x144.png",
      sizes: "144x144",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-152x152.png",
      sizes: "152x152",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-180x180.png",
      sizes: "180x180",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
      purpose: "maskable any",
    },
    {
      src: "/icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable any",
    },
  ],

  // Shortcuts for quick actions
  shortcuts: [
    {
      name: "Get Estimate",
      short_name: "Estimate",
      description: "Get a quick cost estimate for your project",
      url: "/cost-estimator?source=pwa-shortcut",
      icons: [
        {
          src: "/icons/shortcut-estimate.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    },
    {
      name: "Contact Us",
      short_name: "Contact",
      description: "Get in touch with our team",
      url: "/contact?source=pwa-shortcut",
      icons: [
        {
          src: "/icons/shortcut-contact.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    },
    {
      name: "Book Consultation",
      short_name: "Book",
      description: "Schedule a consultation with our experts",
      url: "/consultation?source=pwa-shortcut",
      icons: [
        {
          src: "/icons/shortcut-booking.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    },
    {
      name: "View Projects",
      short_name: "Projects",
      description: "Browse our completed projects",
      url: "/projects?source=pwa-shortcut",
      icons: [
        {
          src: "/icons/shortcut-projects.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    },
  ],

  // Protocol handlers for deep linking
  protocol_handlers: [
    {
      protocol: "web+mhconstruction",
      url: "/?handler=%s",
    },
  ],

  // Share target for receiving shared content
  share_target: {
    action: "/share-target",
    method: "POST",
    enctype: "multipart/form-data",
    params: {
      title: "title",
      text: "text",
      url: "url",
      files: [
        {
          name: "files",
          accept: ["image/*", ".pdf", ".doc", ".docx"],
        },
      ],
    },
  },

  // Edge side panel configuration
  edge_side_panel: {
    preferred_width: 480,
  },

  // Related applications
  related_applications: [
    {
      platform: "webapp",
      url: "https://mhconstruction.web.app/manifest.json",
    },
  ],

  // Privacy and security
  permissions: ["geolocation", "notifications", "camera", "microphone"],

  // Launch handler for handling app launches
  launch_handler: {
    client_mode: ["navigate-existing", "navigate-new"],
  },
};

// Cache configuration for different resource types
export const CACHE_CONFIG = {
  // Static resources that rarely change
  STATIC_CACHE: {
    name: "mh-static-v1",
    urls: [
      "/",
      "/services",
      "/about",
      "/contact",
      "/projects",
      "/cost-estimator",
      "/offline",
      "/manifest.json",
    ],
    strategy: "cacheFirst",
    maxAge: 86400, // 24 hours
  },

  // Dynamic content with network-first strategy
  DYNAMIC_CACHE: {
    name: "mh-dynamic-v1",
    strategy: "networkFirst",
    maxAge: 3600, // 1 hour
    maxEntries: 50,
  },

  // Images and media files
  IMAGES_CACHE: {
    name: "mh-images-v1",
    strategy: "cacheFirst",
    maxAge: 604800, // 7 days
    maxEntries: 100,
  },

  // API responses
  API_CACHE: {
    name: "mh-api-v1",
    strategy: "networkFirst",
    maxAge: 300, // 5 minutes
    maxEntries: 25,
  },

  // Fonts and CSS
  FONTS_CACHE: {
    name: "mh-fonts-v1",
    strategy: "cacheFirst",
    maxAge: 2592000, // 30 days
    maxEntries: 10,
  },
};

// Background sync configuration
export const BACKGROUND_SYNC_CONFIG = {
  FORM_SUBMISSION: {
    tag: "form-submission",
    options: {
      maxRetentionTime: 86400000, // 24 hours
    },
  },
  ANALYTICS: {
    tag: "analytics-sync",
    options: {
      maxRetentionTime: 604800000, // 7 days
    },
  },
  CONTACT_FORM: {
    tag: "contact-form",
    options: {
      maxRetentionTime: 259200000, // 3 days
    },
  },
};

// Push notification configuration
export const PUSH_CONFIG = {
  VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,

  // Default notification options
  DEFAULT_OPTIONS: {
    badge: "/icons/icon-96x96.png",
    icon: "/icons/icon-192x192.png",
    vibrate: [200, 100, 200],
    requireInteraction: true,
    actions: [
      {
        action: "view",
        title: "View",
        icon: "/icons/action-view.png",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: "/icons/action-dismiss.png",
      },
    ],
  },

  // Notification types
  TYPES: {
    ESTIMATE_READY: {
      title: "Your Estimate is Ready!",
      body: "Your project estimate has been calculated. Tap to view details.",
      tag: "estimate-ready",
      data: { type: "estimate", url: "/cost-estimator/results" },
    },
    CONSULTATION_REMINDER: {
      title: "Consultation Reminder",
      body: "Your consultation is coming up. Tap to view details.",
      tag: "consultation-reminder",
      data: { type: "consultation", url: "/consultation" },
    },
    PROJECT_UPDATE: {
      title: "Project Update",
      body: "There's a new update on your project. Tap to view.",
      tag: "project-update",
      data: { type: "project", url: "/projects" },
    },
    VETERAN_BENEFIT: {
      title: "New Veteran Benefit Available",
      body: "A new benefit program is available for veterans. Check it out!",
      tag: "veteran-benefit",
      data: { type: "veteran", url: "/veterans/benefits" },
    },
  },
};

// Offline configuration
export const OFFLINE_CONFIG = {
  // Pages to cache for offline viewing
  OFFLINE_PAGES: [
    "/",
    "/services",
    "/about",
    "/contact",
    "/projects",
    "/offline",
  ],

  // Fallback pages for different content types
  FALLBACKS: {
    document: "/offline",
    image: "/images/offline-placeholder.jpg",
    audio: null,
    video: null,
    font: null,
  },

  // Offline indicators
  INDICATORS: {
    showOfflineBanner: true,
    showConnectionStatus: true,
    cacheUpdateNotification: true,
  },
};

// Performance configuration
export const PERFORMANCE_CONFIG = {
  // Preload critical resources
  PRELOAD_RESOURCES: [
    {
      href: "/fonts/inter-var.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    { href: "/css/critical.css", as: "style" },
    { href: "/images/hero-background.webp", as: "image" },
  ],

  // Resource hints
  RESOURCE_HINTS: {
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    dnsPrefetch: [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
    ],
  },

  // Critical rendering path optimization
  CRITICAL_CSS: {
    inline: true,
    extract: true,
    minify: true,
  },
};

export default PWA_CONFIG;
