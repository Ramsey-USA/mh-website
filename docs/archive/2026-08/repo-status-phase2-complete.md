# Repository Status Report (Phase 2 Complete)

- Repository: Ramsey-USA/mh-website
- Branch: main
- Generated: 2026-07-19 14:06:15 UTC
- Baseline commit for change summary: 92ee126668b6f5f6f6d38b470356aa023a0a2317

## 1. Tree listing of all files currently in apps/website/src/app/ (2 levels deep)

```text
apps/website/src/app
apps/website/src/app/about
apps/website/src/app/about/details
apps/website/src/app/about/layout.tsx
apps/website/src/app/about/page.tsx
apps/website/src/app/accessibility
apps/website/src/app/accessibility/layout.tsx
apps/website/src/app/accessibility/page.tsx
apps/website/src/app/allies
apps/website/src/app/allies/layout.tsx
apps/website/src/app/allies/page.tsx
apps/website/src/app/api
apps/website/src/app/api/chat
apps/website/src/app/api/consultations
apps/website/src/app/api/contact
apps/website/src/app/api/health
apps/website/src/app/api/job-applications
apps/website/src/app/api/newsletter
apps/website/src/app/api/og
apps/website/src/app/api/track-phone-call
apps/website/src/app/api/upload
apps/website/src/app/careers
apps/website/src/app/careers/CareersPageClient.tsx
apps/website/src/app/careers/layout.tsx
apps/website/src/app/careers/loading.tsx
apps/website/src/app/careers/page.tsx
apps/website/src/app/careers/print
apps/website/src/app/contact
apps/website/src/app/contact/ContactPageClient.tsx
apps/website/src/app/contact/layout.tsx
apps/website/src/app/contact/loading.tsx
apps/website/src/app/contact/MapFacade.tsx
apps/website/src/app/contact/page.tsx
apps/website/src/app/contact/__tests__
apps/website/src/app/cool-desert-nights
apps/website/src/app/cool-desert-nights/CoolDesertNightsPageClient.tsx
apps/website/src/app/cool-desert-nights/page.tsx
apps/website/src/app/docs
apps/website/src/app/docs/[...path]
apps/website/src/app/employee-handbook
apps/website/src/app/employee-handbook/page.tsx
apps/website/src/app/employee-handbook/__tests__
apps/website/src/app/error.tsx
apps/website/src/app/events
apps/website/src/app/events/EventsLandingPageClient.tsx
apps/website/src/app/events/page.tsx
apps/website/src/app/faq
apps/website/src/app/faq/[category]
apps/website/src/app/faq/layout.tsx
apps/website/src/app/faq/page.tsx
apps/website/src/app/file-handler
apps/website/src/app/file-handler/route.ts
apps/website/src/app/global-error.tsx
apps/website/src/app/globals.css
apps/website/src/app/jeremy-thamert
apps/website/src/app/jeremy-thamert/page.tsx
apps/website/src/app/layout.tsx
apps/website/src/app/locations
apps/website/src/app/locations/[city]
apps/website/src/app/locations/layout.tsx
apps/website/src/app/locations/page.tsx
apps/website/src/app/locations/__tests__
apps/website/src/app/media
apps/website/src/app/media/[...path]
apps/website/src/app/not-found.tsx
apps/website/src/app/offline
apps/website/src/app/offline/layout.tsx
apps/website/src/app/offline/page.tsx
apps/website/src/app/offline/RetryConnectionButton.tsx
apps/website/src/app/offline/__tests__
apps/website/src/app/page.tsx
apps/website/src/app/privacy
apps/website/src/app/privacy/layout.tsx
apps/website/src/app/privacy/page.tsx
apps/website/src/app/privacy/__tests__
apps/website/src/app/projects
apps/website/src/app/projects/components
apps/website/src/app/projects/layout.tsx
apps/website/src/app/projects/loading.tsx
apps/website/src/app/projects/page.tsx
apps/website/src/app/projects/ProjectsPageClient.tsx
apps/website/src/app/projects/[slug]
apps/website/src/app/projects/__tests__
apps/website/src/app/protocol-handler
apps/website/src/app/protocol-handler/route.ts
apps/website/src/app/public-sector
apps/website/src/app/public-sector/InteractiveGrantSelector.tsx
apps/website/src/app/public-sector/layout.tsx
apps/website/src/app/public-sector/page.tsx
apps/website/src/app/public-sector/PublicSectorFullPage.tsx
apps/website/src/app/public-sector/__tests__
apps/website/src/app/public-sector/tri-state-government-construction
apps/website/src/app/public-sector/veteran-led-compliance
apps/website/src/app/qr-codes
apps/website/src/app/qr-codes/page.tsx
apps/website/src/app/resources
apps/website/src/app/resources/page.tsx
apps/website/src/app/resources/safety-manual
apps/website/src/app/resources/safety-program
apps/website/src/app/robots.ts
apps/website/src/app/safety
apps/website/src/app/safety/hub
apps/website/src/app/safety/incident-report
apps/website/src/app/safety/intake
apps/website/src/app/safety/layout.tsx
apps/website/src/app/safety/page.tsx
apps/website/src/app/safety/print
apps/website/src/app/services
apps/website/src/app/services/layout.tsx
apps/website/src/app/services/page.tsx
apps/website/src/app/sitemap
apps/website/src/app/sitemap/page.tsx
apps/website/src/app/sitemap.ts
apps/website/src/app/team
apps/website/src/app/team/layout.tsx
apps/website/src/app/team/loading.tsx
apps/website/src/app/team/page.tsx
apps/website/src/app/terms
apps/website/src/app/terms/layout.tsx
apps/website/src/app/terms/page.tsx
apps/website/src/app/terms/__tests__
apps/website/src/app/testimonials
apps/website/src/app/testimonials/layout.tsx
apps/website/src/app/testimonials/loading.tsx
apps/website/src/app/testimonials/page.tsx
apps/website/src/app/testimonials/__tests__
apps/website/src/app/__tests__
apps/website/src/app/__tests__/branding-congruency-contract.test.ts
apps/website/src/app/__tests__/branding-guardrails.test.ts
apps/website/src/app/__tests__/error.test.tsx
apps/website/src/app/__tests__/global-error.test.tsx
apps/website/src/app/__tests__/handlers.test.ts
apps/website/src/app/__tests__/home-sections-render.test.tsx
apps/website/src/app/__tests__/loading-smoke.test.tsx
apps/website/src/app/__tests__/not-found.test.tsx
apps/website/src/app/__tests__/operations-hub-workflows.test.tsx
apps/website/src/app/__tests__/pages-smoke.test.tsx
apps/website/src/app/__tests__/public-copy-phrasing-guard.test.ts
apps/website/src/app/__tests__/robots.test.ts
apps/website/src/app/__tests__/safety-navigation-contracts.test.tsx
apps/website/src/app/__tests__/section-rhythm-contract.test.ts
apps/website/src/app/__tests__/seo-title-guard.test.ts
apps/website/src/app/__tests__/sitemap.test.ts
apps/website/src/app/__tests__/tab-title-sitewide-contract.test.ts
apps/website/src/app/__tests__/visual-congruency-guard.test.ts
apps/website/src/app/veterans
apps/website/src/app/veterans/layout.tsx
apps/website/src/app/veterans/page.tsx
apps/website/src/app/veterans/public-sector-construction
```

## 2. Tree listing of all files in apps/website/src/components/ (2 levels deep)

```text
apps/website/src/components
apps/website/src/components/about
apps/website/src/components/about/AboutHero.tsx
apps/website/src/components/about/AwardsSection.tsx
apps/website/src/components/about/CompanyStats.tsx
apps/website/src/components/about/index.ts
apps/website/src/components/about/LeadershipTeam.tsx
apps/website/src/components/about/PartnershipPhilosophy.tsx
apps/website/src/components/about/SafetySection.tsx
apps/website/src/components/about/__tests__
apps/website/src/components/about/ValuesShowcase.tsx
apps/website/src/components/allies
apps/website/src/components/allies/index.ts
apps/website/src/components/allies/TradeGroupCarousel.tsx
apps/website/src/components/allies/VendorPlatformLink.tsx
apps/website/src/components/analytics
apps/website/src/components/analytics/index.ts
apps/website/src/components/analytics/__tests__
apps/website/src/components/analytics/TrackedBridgeLinks.tsx
apps/website/src/components/animations
apps/website/src/components/animations/FramerMotionComponents.tsx
apps/website/src/components/animations/index.ts
apps/website/src/components/animations/ScrollReveal.tsx
apps/website/src/components/animations/__tests__
apps/website/src/components/chatbot
apps/website/src/components/chatbot/ChatWidgetLazy.tsx
apps/website/src/components/chatbot/ChatWidget.tsx
apps/website/src/components/chatbot/index.ts
apps/website/src/components/chatbot/__tests__
apps/website/src/components/error
apps/website/src/components/error/ErrorBoundary.tsx
apps/website/src/components/error/ErrorFallbackCard.tsx
apps/website/src/components/error/index.ts
apps/website/src/components/error/__tests__
apps/website/src/components/events
apps/website/src/components/events/EventsHero.tsx
apps/website/src/components/events/index.ts
apps/website/src/components/forms
apps/website/src/components/forms/FormWrapper.tsx
apps/website/src/components/forms/__tests__
apps/website/src/components/home
apps/website/src/components/home/CoreValuesSection.tsx
apps/website/src/components/home/HeroSectionClient.tsx
apps/website/src/components/home/HeroSection.tsx
apps/website/src/components/home/index.ts
apps/website/src/components/home/ServicesShowcaseDeferred.tsx
apps/website/src/components/home/ServicesShowcase.tsx
apps/website/src/components/home/TestimonialsSectionDeferred.tsx
apps/website/src/components/home/__tests__
apps/website/src/components/home/TimelineDeferred.tsx
apps/website/src/components/home/WhyPartnerSection.tsx
apps/website/src/components/icons
apps/website/src/components/icons/index.ts
apps/website/src/components/icons/MaterialIcon.tsx
apps/website/src/components/icons/PNWStatesMap.tsx
apps/website/src/components/icons/__tests__
apps/website/src/components/layout
apps/website/src/components/layout/AppShell.tsx
apps/website/src/components/layout/FaviconLinks.tsx
apps/website/src/components/layout/Footer.tsx
apps/website/src/components/layout/globalMenuItems.ts
apps/website/src/components/layout/index.ts
apps/website/src/components/layout/Navigation.tsx
apps/website/src/components/layout/SectionContainer.tsx
apps/website/src/components/layout/SectionShell.tsx
apps/website/src/components/layout/SemiquincentennialBanner.tsx
apps/website/src/components/layout/__tests__
apps/website/src/components/layout/UnderConstruction.tsx
apps/website/src/components/legal
apps/website/src/components/legal/LegalContactCard.tsx
apps/website/src/components/legal/LegalPageLayout.tsx
apps/website/src/components/locations
apps/website/src/components/locations/index.ts
apps/website/src/components/locations/LocationPageContent.tsx
apps/website/src/components/locations/LocationsHero.tsx
apps/website/src/components/modals
apps/website/src/components/modals/ModalWrapper.tsx
apps/website/src/components/modals/__tests__
apps/website/src/components/monitoring
apps/website/src/components/monitoring/HomePageSentrySupport.tsx
apps/website/src/components/monitoring/SentryInit.tsx
apps/website/src/components/monitoring/SentryTestButton.tsx
apps/website/src/components/monitoring/__tests__
apps/website/src/components/navigation
apps/website/src/components/navigation/Breadcrumbs.tsx
apps/website/src/components/navigation/Breadcrumb.tsx
apps/website/src/components/navigation/DesktopNavigation.tsx
apps/website/src/components/navigation/footer-data.ts
apps/website/src/components/navigation/index.ts
apps/website/src/components/navigation/LocaleSwitcher.tsx
apps/website/src/components/navigation/MobileNavigation.tsx
apps/website/src/components/navigation/navigationConfigs.ts
apps/website/src/components/navigation/navigation-data.ts
apps/website/src/components/navigation/PageNavigation.tsx
apps/website/src/components/navigation/SiteFooter.tsx
apps/website/src/components/navigation/SiteHeader.tsx
apps/website/src/components/navigation/__tests__
apps/website/src/components/navigation/UtilityBar.tsx
apps/website/src/components/performance
apps/website/src/components/performance/DeferredPerformanceEnhancements.tsx
apps/website/src/components/performance/index.ts
apps/website/src/components/performance/MobilePerformanceMonitor.tsx
apps/website/src/components/performance/__tests__
apps/website/src/components/performance/WebVitalsReporter.tsx
apps/website/src/components/pwa
apps/website/src/components/pwa/DownloadGate.tsx
apps/website/src/components/pwa/index.ts
apps/website/src/components/pwa/OfflineIndicator.tsx
apps/website/src/components/pwa/PWAInstallCTA.tsx
apps/website/src/components/pwa/PWAManager.tsx
apps/website/src/components/pwa/PWAOnly.tsx
apps/website/src/components/pwa/ServiceWorkerRegistration.tsx
apps/website/src/components/pwa/__tests__
apps/website/src/components/pwa/UpdateNotification.tsx
apps/website/src/components/resources
apps/website/src/components/resources/index.ts
apps/website/src/components/resources/ResourcesHero.tsx
apps/website/src/components/resources/SafetyComplianceBadge.tsx
apps/website/src/components/resources/__tests__
apps/website/src/components/seo
apps/website/src/components/seo/EnhancedSEO.tsx
apps/website/src/components/seo/index.ts
apps/website/src/components/seo/SeoMeta.tsx
apps/website/src/components/seo/__tests__
apps/website/src/components/services
apps/website/src/components/services/ConstructionExpertiseSection.tsx
apps/website/src/components/services/ConstructionProcessSection.tsx
apps/website/src/components/services/CoreServicesSection.tsx
apps/website/src/components/services/GovernmentProjectsSection.tsx
apps/website/src/components/services/index.ts
apps/website/src/components/services/PartnershipTypesSection.tsx
apps/website/src/components/services/ServiceAreasSection.tsx
apps/website/src/components/services/ServiceCard.tsx
apps/website/src/components/services/servicesData.ts
apps/website/src/components/services/ServicesHero.tsx
apps/website/src/components/services/SpecialtyServiceCard.tsx
apps/website/src/components/services/SpecialtyServicesSection.tsx
apps/website/src/components/services/__tests__
apps/website/src/components/services/WhyChooseUs.tsx
apps/website/src/components/shared-sections
apps/website/src/components/shared-sections/AccreditationsLogoRow.tsx
apps/website/src/components/shared-sections/HeroSectionEnforcer.tsx
apps/website/src/components/shared-sections/index.ts
apps/website/src/components/shared-sections/IndividualBrandingStamp.tsx
apps/website/src/components/shared-sections/JeremyAuthorityLinksStrip.tsx
apps/website/src/components/shared-sections/JeremyQuoteRibbon.tsx
apps/website/src/components/shared-sections/NextStepsSection.tsx
apps/website/src/components/shared-sections/TestimonialsSection.tsx
apps/website/src/components/team
apps/website/src/components/team/index.ts
apps/website/src/components/team/SkillsRadarChart.tsx
apps/website/src/components/team/TeamProfileSectionDeferred.tsx
apps/website/src/components/team/TeamProfileSection.tsx
apps/website/src/components/team/__tests__
apps/website/src/components/templates
apps/website/src/components/templates/BrandedContentSection.tsx
apps/website/src/components/templates/index.ts
apps/website/src/components/templates/__tests__
apps/website/src/components/testimonials
apps/website/src/components/testimonials/index.ts
apps/website/src/components/testimonials/TestimonialCard.tsx
apps/website/src/components/testimonials/TestimonialGrid.tsx
apps/website/src/components/testimonials/TestimonialsCarousel.tsx
apps/website/src/components/testimonials/TestimonialsHero.tsx
apps/website/src/components/testimonials/__tests__
apps/website/src/components/__tests__
apps/website/src/components/__tests__/remaining-components.test.tsx
apps/website/src/components/ui
apps/website/src/components/ui/accessibility
apps/website/src/components/ui/AlternatingShowcase.tsx
apps/website/src/components/ui/AnimatedCounter.tsx
apps/website/src/components/ui/backgrounds
apps/website/src/components/ui/badge.tsx
apps/website/src/components/ui/base
apps/website/src/components/ui/button.tsx
apps/website/src/components/ui/card.tsx
apps/website/src/components/ui/container.tsx
apps/website/src/components/ui/ContentCard.tsx
apps/website/src/components/ui/cta
apps/website/src/components/ui/focus-ring.tsx
apps/website/src/components/ui/forms
apps/website/src/components/ui/GlowEffect.tsx
apps/website/src/components/ui/IconContainer.tsx
apps/website/src/components/ui/index.ts
apps/website/src/components/ui/LanguageToggle.tsx
apps/website/src/components/ui/layout
apps/website/src/components/ui/media
apps/website/src/components/ui/modals
apps/website/src/components/ui/RouteLoadingState.tsx
apps/website/src/components/ui/section-heading.tsx
apps/website/src/components/ui/SimpleSkeleton.tsx
apps/website/src/components/ui/Skeleton.tsx
apps/website/src/components/ui/StripedBackground.tsx
apps/website/src/components/ui/__tests__
apps/website/src/components/ui/Timeline.tsx
apps/website/src/components/ui/WaVobBadge.tsx
```

## 3. Full contents of apps/website/tailwind.config.ts

```ts
const FONT_HEADING_STACK = [
  '"Mendl Sans Dusk Bold"',
  '"Mendl Sans Dusk"',
  "mendl-sans-dusk",
  "sans-serif",
];

const FONT_SUBHEADING_STACK = [
  '"Mendl Sans Dusk Medium"',
  '"Mendl Sans Dusk"',
  "mendl-sans-dusk",
  "sans-serif",
];

const FONT_BODY_STACK = [
  '"Mendl Sans Dusk Regular"',
  '"Mendl Sans Dusk"',
  "mendl-sans-dusk",
  "sans-serif",
];

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-green": "#386851",
        "brand-tan": "#BD9264",
        "brand-white": "#FFFFFF",
        "brand-black": "#000000",
        brand: {
          green: "#386851",
          tan: "#BD9264",
          white: "#FFFFFF",
          black: "#000000",
          primary: "#386851",
          "primary-light": "#628F79",
          "primary-dark": "#1E392C",
          "primary-darker": "#12231b", // Deepest Hunter Green — gradient terminus
          secondary: "#BD9264", // Leather Tan (large text 18pt+, backgrounds)
          "secondary-text": "#8A6B49", // Alias for secondary-dark — WCAG AA (4.71:1)
          "secondary-light": "#D9BD93",
          "secondary-dark": "#8A6B49",
          // Architectural Bronze — accent color for CTA borders & Featured Project labels
          bronze: "#A87948",
          "bronze-light": "#CD9B6D",
          "bronze-dark": "#6B4E2E",
          "bronze-text": "#6B4E2E", // WCAG AAA compliant for body text (7.32:1)
        },
        bronze: {
          50: "#fdf9f5",
          100: "#f8f0e6",
          200: "#f0ddc6",
          300: "#e4c49e",
          400: "#CD9B6D", // Bronze Light
          500: "#A87948", // Bronze Core
          600: "#8c6139",
          700: "#6B4E2E", // Bronze Dark
          800: "#503a22",
          900: "#3a2918",
        },
        primary: {
          50: "#f0f7f4",
          100: "#d9ebe2",
          200: "#b3d7c5",
          300: "#8cc3a8",
          400: "#66af8b",
          500: "#386851",
          600: "#1E392C",
          700: "#192f24",
          800: "#12231b",
          900: "#0c1812",
        },
        secondary: {
          50: "#fdf9f5",
          100: "#f8f0e6",
          200: "#f0ddc6",
          300: "#e4c49e",
          400: "#D9BD93", // Leather Tan Light
          500: "#BD9264", // Leather Tan Core
          600: "#a67d52",
          700: "#8A6B49", // Leather Tan Dark — AA text
          800: "#6f5236",
          900: "#5a422c",
        },
        surface: {
          base: "#FFFFFF",
          muted: "#FAFAFA",
          elevated: "#F5F5F5",
          inverse: "#121212",
        },
        ink: {
          primary: "#212121",
          secondary: "#757575",
          inverse: "#FFFFFF",
          muted: "#9E9E9E",
        },
        // Semantic colors per branding guidelines
        success: {
          light: "#10b981",
          dark: "#22c55e",
          DEFAULT: "#10b981",
        },
        warning: {
          light: "#f59e0b",
          dark: "#fbbf24",
          DEFAULT: "#f59e0b",
        },
        error: {
          light: "#ef4444",
          dark: "#f87171",
          DEFAULT: "#ef4444",
        },
        info: {
          light: "#3b82f6",
          dark: "#60a5fa",
          DEFAULT: "#3b82f6",
        },
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
        focus: {
          ring: "#386851",
          "ring-offset": "#FFFFFF",
          inverse: "#BD9264",
        },
        // Semantic text colors per branding guidelines
        text: {
          primary: {
            light: "#212121", // Gray 900
            dark: "#FFFFFF",
            DEFAULT: "#212121",
          },
          secondary: {
            light: "#757575", // Gray 600
            dark: "#B0B0B0", // Gray 400
            DEFAULT: "#757575",
          },
          muted: {
            light: "#9E9E9E", // Gray 500
            dark: "#757575", // Gray 600
            DEFAULT: "#9E9E9E",
          },
        },
        // Semantic background colors per branding guidelines
        bg: {
          primary: {
            light: "#FFFFFF",
            dark: "#121212",
            DEFAULT: "#FFFFFF",
          },
          secondary: {
            light: "#FAFAFA", // Gray 50
            dark: "#1E1E1E",
            DEFAULT: "#FAFAFA",
          },
          surface: {
            light: "#F5F5F5", // Gray 100
            dark: "#2D2D2D",
            DEFAULT: "#F5F5F5",
          },
        },
        // Semantic border colors per branding guidelines
        border: {
          primary: {
            light: "#E0E0E0", // Gray 300
            dark: "#424242", // Gray 700
            DEFAULT: "#E0E0E0",
          },
          secondary: {
            light: "#EEEEEE", // Gray 200
            dark: "#303030", // Gray 800
            DEFAULT: "#EEEEEE",
          },
        },
      },
      fontFamily: {
        // Keep font stacks centralized in src/styles/variables.css
        // so Tailwind utilities and global CSS always stay in sync.
        sans: ["var(--font-body)", ...FONT_BODY_STACK],
        heading: ["var(--font-heading)", ...FONT_HEADING_STACK],
        body: ["var(--font-body)", ...FONT_BODY_STACK],
        display: ["var(--font-heading)", ...FONT_HEADING_STACK],
        subheading: [
          "var(--font-subheading, var(--font-heading))",
          ...FONT_SUBHEADING_STACK,
        ],
      },
      spacing: {
        "layout-2xs": "0.25rem",
        "layout-xs": "0.5rem",
        "layout-sm": "0.75rem",
        "layout-md": "1rem",
        "layout-lg": "1.5rem",
        "layout-xl": "2rem",
        "layout-2xl": "3rem",
        "layout-3xl": "4rem",
        "layout-4xl": "6rem",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "scale-up": "scaleUp 0.3s ease-out",
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wave: "wave 1.5s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        scaleUp: {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        wave: {
          "0%, 100%": {
            transform: "perspective(400px) rotateY(0deg)",
          },
          "50%": {
            transform: "perspective(400px) rotateY(10deg)",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.6",
          },
        },
      },
      boxShadow: {
        "elevation-1": "0 1px 2px rgba(15, 23, 42, 0.08)",
        "elevation-2": "0 4px 10px rgba(15, 23, 42, 0.1)",
        "elevation-3": "0 10px 24px rgba(15, 23, 42, 0.14)",
        brand:
          "0 10px 25px -5px rgba(56, 104, 81, 0.4), 0 10px 10px -5px rgba(56, 104, 81, 0.04)",
        "brand-secondary":
          "0 10px 25px -5px rgba(189, 146, 100, 0.4), 0 10px 10px -5px rgba(189, 146, 100, 0.04)",
        // Award-winning elevation system
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(56, 104, 81, 0.5)",
        "glow-lg": "0 0 40px rgba(56, 104, 81, 0.6)",
        "glow-secondary": "0 0 20px rgba(189, 146, 100, 0.5)",
      },
      maxWidth: {
        reading: "72ch",
        content: "80rem",
        gallery: "96rem",
      },
      borderRadius: {
        panel: "0.5rem",
        card: "0.75rem",
        interactive: "0.375rem",
      },
      fontSize: {
        // Fluid typography - responsive text sizes
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
        "fluid-3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
        "fluid-4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
        "fluid-5xl": "clamp(3rem, 2rem + 5vw, 4rem)",
      },
      lineHeight: {
        tight: "1.2",
        snug: "1.4",
        normal: "1.6",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
      },
      transitionDuration: {
        instant: "0ms",
        micro: "120ms",
        smooth: "220ms",
        emphasis: "320ms",
      },
      transitionTimingFunction: {
        "brand-standard": "cubic-bezier(0.2, 0.7, 0.2, 1)",
        "brand-emphasis": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        95: "95",
        "utility-bar": "45",
        header: "70",
        "mobile-menu": "80",
        dialog: "1000",
        toast: "1100",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1f2937",
            a: {
              color: "#386851",
              "&:hover": {
                color: "#2d5240",
              },
            },
          },
        },
        dark: {
          css: {
            color: "#FFFFFF",
            a: {
              color: "#4a7a63",
              "&:hover": {
                color: "#5c9378",
              },
            },
            h1: {
              color: "#FFFFFF",
            },
            h2: {
              color: "#FFFFFF",
            },
            h3: {
              color: "#FFFFFF",
            },
            h4: {
              color: "#FFFFFF",
            },
            strong: {
              color: "#FFFFFF",
            },
            code: {
              color: "#FFFFFF",
            },
            figcaption: {
              color: "#B0B0B0",
            },
            blockquote: {
              color: "#B0B0B0",
              borderLeftColor: "#4a7a63",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".perspective-2000": {
          perspective: "2000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

module.exports = config;
```

## 4. Full contents of apps/website/src/app/globals.css

```css
/* ============================================
   MH BRAND FONTS
  Heading / Subheading: Mendl Sans Dusk (self-hosted)
  Body: Mendl Sans Dusk (self-hosted)
   ============================================ */

/* Import CSS variables from shared design system */
@import "../../../../packages/shared/src/styles/variables.css";

/* Import 3D card flip utilities */
@import "../styles/card-flip.css";

/* Tailwind CSS v4 — point to legacy JS config for theme/plugins */
@import "tailwindcss";
@config "../../tailwind.config.ts";

/* Mendl Sans Dusk OTF variants are loaded via next/font/local in src/lib/fonts.ts.
   Keep a minimal self-hosted @font-face contract for fallback and validation guards. */
@font-face {
  font-family: "mendl-sans-dusk";
  src: url("/fonts/Mendl%20Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf")
    format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "mendl-sans-dusk";
  src: url("/fonts/Mendl%20Fonts/fonnts.com-Mendl_Sans_Dusk_Medium.otf")
    format("opentype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "mendl-sans-dusk";
  src: url("/fonts/Mendl%20Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf")
    format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Material Icons font setup */
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "liga";
}

/* ============================================
   TAILWIND LAYER EXTENSIONS
   Clean utility classes in proper layers
   ============================================ */

@layer utilities {
  .mh-logo-parallax-layer {
    background-repeat: no-repeat;
    background-position: center calc(50% + var(--mh-logo-parallax-offset, 0px));
    background-size: clamp(320px, 62vw, 920px) auto;
    will-change: background-position;
  }

  .mh-logo-parallax-overlay {
    mix-blend-mode: multiply;
  }

  .dark .mh-logo-parallax-overlay {
    mix-blend-mode: screen;
  }

  .mh-global-logo-parallax-active .mh-diagonal-stripe-pattern {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .mh-logo-parallax-layer {
      background-position: center;
    }
  }

  @media (max-width: 767px) {
    .mh-logo-parallax-layer {
      background-size: clamp(260px, 80vw, 560px) auto;
    }
  }

  /* MH display heading system: tuned to keep capitals crisp and distinctive. */
  .mh-heading-display {
    font-family: var(--font-heading);
    font-weight: var(--weight-mh-heading);
    letter-spacing: var(--tracking-mh-heading);
    line-height: var(--line-height-mh-heading);
    text-wrap: balance;
    font-feature-settings:
      "case" 1,
      "cpsp" 1,
      "ss01" 1,
      "ss02" 1;
  }

  .mh-heading-display-tight {
    letter-spacing: var(--tracking-mh-heading-tight);
  }

  .mh-subheading-display {
    font-family: var(--font-heading);
    font-weight: var(--weight-mh-subheading);
    letter-spacing: var(--tracking-mh-subheading);
    line-height: var(--line-height-mh-subheading);
    text-transform: uppercase;
    font-feature-settings:
      "case" 1,
      "cpsp" 1,
      "ss01" 1;
  }

  /* Mobile viewport fixes */
  .hero-section {
    height: calc(
      100vh - var(--mh-nav-offset, 6.5rem) - var(--mh-pwa-nav-offset, 0px) -
        1rem
    ) !important;
    height: calc(
      100svh - var(--mh-nav-offset, 6.5rem) - var(--mh-pwa-nav-offset, 0px) -
        1rem
    ) !important; /* Stable viewport height to avoid mobile address-bar jump */
    height: calc(
      100dvh - var(--mh-nav-offset, 6.5rem) - var(--mh-pwa-nav-offset, 0px) -
        1rem
    ) !important; /* Dynamic viewport height for mobile */
    min-height: calc(
      100vh - var(--mh-nav-offset, 6.5rem) - var(--mh-pwa-nav-offset, 0px) -
        1rem
    );
    min-height: calc(
      100svh - var(--mh-nav-offset, 6.5rem) - var(--mh-pwa-nav-offset, 0px) -
        1rem
    );
    min-height: calc(
      100dvh - var(--mh-nav-offset, 6.5rem) - var(--mh-pwa-nav-offset, 0px) -
        1rem
    );
  }

  .hero-safe-top {
    padding-top: calc(var(--mh-nav-offset, 6.5rem) + 0.75rem);
  }

  .hero-safe-top-lg {
    padding-top: calc(var(--mh-nav-offset, 6.5rem) + 1.5rem);
  }

  .hero-safe-bottom {
    padding-bottom: calc(var(--mh-page-nav-height, 3.5rem) + 1rem);
  }

  .section-shell {
    width: min(100%, var(--layout-content-max, 80rem));
    margin-inline: auto;
    padding-inline: clamp(1rem, 2.5vw, 2rem);
  }

  .section-shell-reading {
    width: min(100%, var(--layout-reading-max, 72ch));
    margin-inline: auto;
    padding-inline: clamp(1rem, 2.5vw, 2rem);
  }

  .section-shell-wide {
    width: min(100%, var(--layout-gallery-max, 96rem));
    margin-inline: auto;
    padding-inline: clamp(1rem, 2.5vw, 2rem);
  }

  .section-stack {
    padding-block: clamp(2rem, 4vw, 4rem);
  }

  /* Hide scrollbar for horizontal scroll areas */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  /* Icon performance utilities */
  .icon-container {
    @apply flex items-center justify-center;
  }

  /* Focus styling for accessibility - WCAG AAA compliant */
  .focus-brand {
    @apply focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2;
  }

  /* Touch targets for mobile accessibility */
  .touch-target-min {
    min-width: 44px;
    min-height: 44px;
  }

  .touch-target-sm {
    min-width: 36px;
    min-height: 36px;
  }

  /* Brand glow effect */
  .btn-glow:hover {
    box-shadow:
      0 10px 25px -5px
        color-mix(in srgb, var(--color-brand-primary) 40%, transparent),
      0 10px 10px -5px
        color-mix(in srgb, var(--color-brand-primary) 4%, transparent);
  }

  /* Architectural Bronze CTA border — use on any call-to-action outline element */
  .cta-border {
    border-color: var(--color-brand-bronze);
  }
  .cta-border:hover {
    border-color: var(--color-brand-bronze-dark);
  }

  /* Mobile-specific text utilities */
  .text-readable-min {
    font-size: max(9px, 0.75rem);
  }

  /* Hardware acceleration for smooth mobile animations */
  .mobile-smooth {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }

  /* Custom animation utilities */
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Dark mode gradient utilities - Per branding guidelines */
  .gradient-hero-dark {
    @apply dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark;
  }

  .gradient-section-dark {
    @apply dark:from-gray-800 dark:via-gray-900 dark:to-gray-800;
  }

  .gradient-text-three-color {
    @apply bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent;
  }

  .gradient-text-bronze {
    @apply bg-linear-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent;
  }

  /* Dark mode opacity adjustments for patterns */
  .pattern-opacity {
    @apply opacity-[0.03] dark:opacity-[0.05];
  }

  .blob-opacity-primary {
    @apply from-brand-primary/10 dark:from-brand-primary/20;
  }

  .blob-opacity-secondary {
    @apply from-brand-secondary/10 dark:from-brand-secondary/20;
  }

  /* Extra small mobile utilities */
  @media (max-width: 374px) {
    .mobile-sm\:text-micro {
      font-size: 8px;
      line-height: 10px;
    }

    .mobile-sm\:gap-micro {
      gap: 2px;
    }

    .mobile-sm\:p-micro {
      padding: 2px;
    }
  }
}
/* ============================================
   BASE LAYER - Global Performance Optimizations
   ============================================ */

@layer base {
  :root {
    --mh-nav-offset: 7rem;

    /* Semantic foundation tokens */
    --color-page-bg: var(--color-bg-primary, #ffffff);
    --color-page-bg-muted: var(--color-bg-secondary, #f7f9f7);
    --color-surface: var(--color-bg-surface, #f5f5f5);
    --color-surface-elevated: var(--color-bg-elevated, #ffffff);

    --color-text-primary: #111111;
    --color-text-secondary: #2f2f2f;
    --color-text-muted: #5f5f5f;
    --color-text-inverse: #ffffff;

    --color-border-subtle: #dcdcdc;
    --color-border-strong: #9f9f9f;

    --color-link: #386851;
    --color-link-hover: #1e392c;
    --color-link-visited: #2f5745;

    --color-selection-bg: color-mix(in srgb, #386851 22%, #ffffff);
    --color-selection-text: #111111;

    --color-focus-ring: #386851;
    --color-focus-ring-offset: #ffffff;

    --layout-reading-max: 72ch;
    --layout-content-max: 80rem;
    --layout-gallery-max: 96rem;

    --radius-control: 0.375rem;
    --radius-surface: 0.5rem;

    --shadow-surface-sm: 0 1px 2px rgba(15, 23, 42, 0.08);
    --shadow-surface-md: 0 4px 10px rgba(15, 23, 42, 0.1);

    color-scheme: light;
  }

  .dark {
    --color-page-bg: #0f1412;
    --color-page-bg-muted: #151f1b;
    --color-surface: #1b2521;
    --color-surface-elevated: #23302b;

    --color-text-primary: #f7f7f7;
    --color-text-secondary: #e0e0e0;
    --color-text-muted: #bebebe;
    --color-text-inverse: #121212;

    --color-border-subtle: #3a4540;
    --color-border-strong: #5e6a64;

    --color-link: #d9bd93;
    --color-link-hover: #ead4ae;
    --color-link-visited: #cd9b6d;

    --color-selection-bg: color-mix(in srgb, #bd9264 30%, #000000);
    --color-selection-text: #ffffff;

    --color-focus-ring: #d9bd93;
    --color-focus-ring-offset: #0f1412;

    --shadow-surface-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
    --shadow-surface-md: 0 8px 18px rgba(0, 0, 0, 0.45);

    color-scheme: dark;
  }

  html {
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
    font-synthesis: none;
    font-synthesis-weight: none;
    font-synthesis-style: none;
  }

  body {
    font-family: var(--font-body);
    font-size: clamp(1rem, 0.97rem + 0.2vw, 1.1rem);
    line-height: 1.6;
    background-color: var(--color-page-bg);
    color: var(--color-text-primary);
    @apply transition-colors duration-300;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    letter-spacing: var(--tracking-mh-heading);
    line-height: var(--line-height-mh-heading);
    text-wrap: balance;
    color: var(--color-text-primary);
    font-feature-settings:
      "case" 1,
      "cpsp" 1,
      "ss01" 1;
  }

  h1 {
    font-size: clamp(2rem, 1.4rem + 2.4vw, 3.2rem);
  }

  h2 {
    font-size: clamp(1.65rem, 1.2rem + 1.8vw, 2.4rem);
  }

  h3 {
    font-size: clamp(1.35rem, 1.05rem + 1.1vw, 1.9rem);
  }

  h4 {
    font-size: clamp(1.2rem, 0.98rem + 0.8vw, 1.6rem);
  }

  h5 {
    font-size: clamp(1.05rem, 0.92rem + 0.5vw, 1.3rem);
  }

  h6 {
    font-size: clamp(0.95rem, 0.9rem + 0.3vw, 1.1rem);
  }

  p,
  li,
  dd,
  dt {
    font-family: var(--font-body);
    color: var(--color-text-primary);
  }

  small,
  figcaption,
  .text-muted {
    color: var(--color-text-muted);
  }

  a {
    color: var(--color-link);
    text-decoration-color: color-mix(
      in srgb,
      var(--color-link) 55%,
      transparent
    );
    text-underline-offset: 0.16em;
    transition:
      color 160ms ease,
      text-decoration-color 160ms ease;
  }

  a:hover {
    color: var(--color-link-hover);
    text-decoration-color: var(--color-link-hover);
  }

  a:visited {
    color: var(--color-link-visited);
  }

  ::selection {
    background: var(--color-selection-bg);
    color: var(--color-selection-text);
  }

  :focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
    box-shadow: 0 0 0 2px var(--color-focus-ring-offset);
  }

  hr {
    border: 0;
    border-top: 1px solid var(--color-border-subtle);
  }

  input,
  select,
  textarea {
    color: var(--color-text-primary);
    background-color: var(--color-surface-elevated);
    border-color: var(--color-border-subtle);
  }

  /* Optimize rendering performance */
  * {
    -webkit-tap-highlight-color: transparent;
  }
}

/* ============================================
   COMPONENT LAYER - Reusable Component Styles
   ============================================ */

@layer components {
  /* MH Construction Button System Enhancements */
  .mh-button-glow {
    box-shadow: var(--shadow-brand);
  }

  .mh-button-glow-secondary {
    box-shadow: var(--shadow-brand-secondary);
  }

  /* Enhanced button interactions */
  .button-lift {
    transition: transform var(--duration-300) var(--ease-bounce);
  }

  .button-lift:hover {
    transform: translateY(-2px);
  }

  .button-lift:active {
    transform: translateY(0);
  }

  /* Consistent button base styles */
  .btn-base {
    @apply inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
    padding: var(--button-padding-y) var(--button-padding-x);
    border-radius: var(--button-radius);
    transition: var(--button-transition);
  }

  .btn-primary {
    @apply inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
    @apply bg-brand-primary text-white hover:bg-brand-secondary focus:ring-brand-primary;
    @apply dark:bg-brand-primary-light dark:hover:bg-brand-secondary-light;
    padding: var(--button-padding-y) var(--button-padding-x);
    border-radius: var(--button-radius);
    transition: var(--button-transition);
    box-shadow: var(--shadow-brand);
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
    @apply border border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:ring-brand-primary;
    @apply dark:border-brand-primary-light dark:text-brand-primary-light dark:hover:bg-brand-primary-light;
    padding: var(--button-padding-y) var(--button-padding-x);
    border-radius: var(--button-radius);
    transition: var(--button-transition);
  }

  /* Card components */
  .card-base {
    @apply rounded-xl overflow-hidden;
    background-color: var(--color-surface-elevated);
    border: 1px solid var(--color-border-subtle);
    padding: var(--card-padding);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow, var(--shadow-surface-md));
  }

  /* Input components */
  .input-base {
    @apply block w-full rounded-md shadow-sm focus:outline-none;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-color: var(--color-border-subtle);
    padding: var(--input-padding-y) var(--input-padding-x);
    border-radius: var(--input-radius);
    border-width: var(--input-border-width);
    box-shadow: var(--shadow-surface-sm);
  }

  .input-base::placeholder {
    color: var(--color-text-muted);
  }

  .input-base:focus-visible {
    border-color: var(--color-focus-ring);
    box-shadow:
      0 0 0 1px var(--color-focus-ring),
      0 0 0 3px var(--color-focus-ring-offset);
  }

  /* Ensure inline-block cards render properly */
  .inline-block {
    display: inline-block;
    vertical-align: top;
  }

  /* Group hover effects for card flips */
  .group:hover .group-hover\:rotate-y-180 {
    @apply rotate-y-180;
  }

  /* Enhanced modal animations */
  .animate-modal-backdrop {
    animation: modal-backdrop-in var(--duration-300) var(--ease-out);
  }

  .animate-modal-slide {
    animation: modal-slide-in 0.4s var(--ease-bounce);
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }

  /* Dark mode text utilities */
  .text-primary {
    color: var(--color-text-primary);
  }

  .text-secondary {
    color: var(--color-text-secondary);
  }

  .text-muted {
    color: var(--color-text-muted);
  }

  /* Dark mode background utilities */
  .bg-primary {
    background-color: var(--color-page-bg);
  }

  .bg-secondary {
    background-color: var(--color-page-bg-muted);
  }

  .bg-surface {
    background-color: var(--color-surface);
  }

  /* Dark mode border utilities */
  .border-primary {
    border-color: var(--color-border-subtle);
  }

  .border-secondary {
    border-color: var(--color-border-strong);
  }
}

/* ============================================
   CUSTOM ANIMATIONS & KEYFRAMES
   ============================================ */

@keyframes modal-backdrop-in {
  from {
    opacity: 0;
    -webkit-backdrop-filter: blur(0px);
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
  }
}

@keyframes modal-slide-in {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 0 0
      color-mix(in srgb, var(--color-brand-primary) 40%, transparent);
  }
  50% {
    box-shadow: 0 0 0 20px transparent;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.4s ease-out;
}

/* ============================================
   RESPONSIVE DESIGN IMPROVEMENTS
   ============================================ */

/* Prevent horizontal scrolling on the root viewport only. Keep sections free to
   manage their own horizontal overflow so they won't capture pointer/scroll
   events (avoid creating scroll containers at section-level). */
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Ensure main and container sizing remain full-width but do NOT force
   overflow-x hidden here — sections/components should opt-in when they
   intentionally need to hide overflow (e.g. carousels or 3D effects). */
main {
  max-width: 100%;
}

.container {
  max-width: 100%;
  /* NOTE: intentionally do NOT set overflow-x here to avoid creating
     scroll-capturing containers. Use utility classes where necessary
     on the specific components that require overflow control. */
}

/* Improve mobile touch interactions */
@media (max-width: 768px) {
  /* Ensure cards and content don't exceed screen width */
  .feature-card,
  .service-card,
  .team-card {
    max-width: 100%;
    overflow: hidden;
  }

  /* Fix card flip on mobile - disable 3D transform for better UX */
  .feature-card .group-hover\:rotate-y-180 {
    transition: none;
  }

  .feature-card:active .group-hover\:rotate-y-180 {
    transform: rotateY(180deg);
  }

  /* Improve touch targets for mobile */
  button,
  a,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }

  /* Better spacing on mobile */
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Mobile-specific typography adjustments */
  .text-responsive {
    font-size: clamp(0.875rem, 2.5vw, 1rem);
    line-height: 1.5;
  }

  /* Ensure better readability on small screens */
  p {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  h1 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.2;
  }

  h2 {
    font-size: clamp(1.25rem, 4vw, 2rem);
    line-height: 1.3;
  }

  h3 {
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    line-height: 1.4;
  }
}

/* Tablet optimizations */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Adjust grid gaps for better spacing */
  .grid {
    gap: 1.5rem;
  }
}

/* Prevent text overflow and improve readability */
.text-responsive {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Global word-wrap utilities for all text content */
* {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Enhanced scrollbar styling for card overflow */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--color-text-primary) 22%, transparent);
  border-radius: 2px;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--color-text-primary) 24%, transparent);
}

.scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--color-border-subtle) 88%, #ffffff);
}

.dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--color-border-strong) 90%, #000000);
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background: transparent;
}

/* Fix for fixed height cards on mobile */
@media (max-width: 640px) {
  .feature-card {
    height: auto !important;
    min-height: 360px !important;
  }

  .feature-card .relative {
    min-height: 280px !important;
    height: 100% !important;
  }

  .value-card .relative {
    min-height: 280px !important;
    height: auto !important;
  }

  .testimonial-card .relative {
    min-height: 280px !important;
    height: auto !important;
  }
}

/* Enhanced mobile utilities */
@media (max-width: 640px) {
  /* Improve button interactions on mobile */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Ensure proper icon sizing on mobile */
  .material-icons {
    font-size: inherit;
    width: 1em;
    height: 1em;
  }

  /* Ensure cards don't overflow container */
  .card-container {
    max-width: 100%;
    overflow-x: hidden;
  }
}

/* Responsive container padding for all screen sizes */
@media (max-width: 375px) {
  .container,
  .max-w-7xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Improve touch targets on mobile */
@media (hover: none) and (pointer: coarse) {
  button,
  a,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* ============================================
   3D FLIP CARD ANIMATIONS
   ============================================ */

/* Perspective container for 3D effect */
.perspective {
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

/* Preserve 3D transforms for children */
.preserve-3d {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

/* Hide backface of flipped elements */
.backface-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* Rotate Y axis for flip effect */
.rotate-y-180 {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

/* Smooth transition for flip animation */
.group:hover .group-hover\:rotate-y-180 {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

/* Touch device support - tap to flip */
@media (hover: none) and (pointer: coarse) {
  .perspective {
    -webkit-tap-highlight-color: transparent;
  }

  /* On touch devices, use active state instead of hover */
  .group:active .group-hover\:rotate-y-180 {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
}

/* Activity Feed slide-in animation */
@keyframes slide-in-left {
  from {
    transform: translateX(-120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* ============================================
   AWARD-WINNING ENHANCEMENTS
   Accessibility + Micro-interactions
   ============================================ */

/* Skip to main content link - WCAG AAA */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-brand-primary);
  color: white;
  padding: 0.5rem 1rem;
  z-index: 100;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 0.25rem 0;
}

.skip-link:focus {
  top: 0;
}

/* Smooth animations with reduced motion support */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .mh-logo-parallax-layer,
  .card-hover,
  .btn-lift,
  .image-zoom img,
  .btn-shine::before {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Scroll-triggered animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Alias used by .scroll-reveal CSS-only path (must match slideUp) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: slideUp 0.6s ease-out forwards;
}

.animate-in-delay-1 {
  animation: slideUp 0.6s ease-out 0.1s forwards;
  opacity: 0;
}

.animate-in-delay-2 {
  animation: slideUp 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-in-delay-3 {
  animation: slideUp 0.6s ease-out 0.3s forwards;
  opacity: 0;
}

/* Button hover enhancements - GPU accelerated */
@layer utilities {
  .btn-lift {
    transition:
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .btn-lift:hover {
    transform: translateY(-2px);
  }

  .btn-lift:active {
    transform: translateY(0);
  }

  /* Card hover effects */
  .card-hover {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    will-change: transform;
  }

  .card-hover:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.15),
      0 10px 10px -5px rgba(0, 0, 0, 0.08);
  }

  .card-hover:hover img {
    transform: scale(1.05);
  }

  .card-hover img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Ensure card 3D transforms work properly */
  .feature-card .preserve-3d,
  .value-card .preserve-3d {
    transform-style: preserve-3d;
  }

  .feature-card .backface-hidden,
  .value-card .backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* Image zoom on hover */
  .image-zoom {
    overflow: hidden;
  }

  .image-zoom img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-zoom:hover img {
    transform: scale(1.05);
  }

  /* Gradient shine effect on hover */
  .btn-shine {
    position: relative;
    overflow: hidden;
  }

  .btn-shine::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .btn-shine:hover::before {
    transform: translateX(0);
  }

  /* Scroll progress indicator */
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--color-brand-primary),
      var(--color-brand-secondary)
    );
    z-index: 100;
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.15s ease-out;
    will-change: transform;
  }
}

/* Skeleton loading animations */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-surface) 88%, #ffffff) 25%,
    color-mix(in srgb, var(--color-surface-elevated) 85%, #d9d9d9) 50%,
    color-mix(in srgb, var(--color-surface) 88%, #ffffff) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.dark .skeleton {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-surface) 88%, #000000) 25%,
    color-mix(in srgb, var(--color-surface-elevated) 85%, #6a6a6a) 50%,
    color-mix(in srgb, var(--color-surface) 88%, #000000) 75%
  );
  background-size: 200% 100%;
}

.animate-slide-in-left {
  animation: slide-in-left 0.4s ease-out forwards;
}

/* === SCROLL REVEAL ANIMATIONS === */
/* Hybrid approach: works with or without JavaScript ScrollReveal component */

/* Default behavior: CSS-only animation (for pages without ScrollReveal component) */
.scroll-reveal {
  opacity: 1;
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.25, 0, 1) both;
  /* Uses --delay CSS custom property when set via inline style; falls back to 0s */
  animation-delay: var(--delay, 0s);
}

/* When ScrollReveal JS component is present, use JS-controlled reveal */
.scroll-reveal.js-controlled {
  opacity: 0;
  transform: translateY(20px);
  animation: none;
  transition:
    opacity 0.6s cubic-bezier(0.25, 0.25, 0, 1),
    transform 0.6s cubic-bezier(0.25, 0.25, 0, 1);
}

.scroll-reveal.js-controlled.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger fallbacks for CSS-only animation (when no --delay prop is set inline) */
.scroll-reveal:not(.js-controlled):nth-child(1) {
  animation-delay: var(--delay, 0s);
}
.scroll-reveal:not(.js-controlled):nth-child(2) {
  animation-delay: var(--delay, 0.1s);
}
.scroll-reveal:not(.js-controlled):nth-child(3) {
  animation-delay: var(--delay, 0.2s);
}
.scroll-reveal:not(.js-controlled):nth-child(4) {
  animation-delay: var(--delay, 0.3s);
}
.scroll-reveal:not(.js-controlled):nth-child(5) {
  animation-delay: var(--delay, 0.4s);
}
.scroll-reveal:not(.js-controlled):nth-child(6) {
  animation-delay: var(--delay, 0.5s);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal,
  .scroll-reveal.js-controlled,
  .scroll-reveal.js-controlled.revealed {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

@media print {
  :root {
    color-scheme: light;
  }

  html,
  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 11pt;
    line-height: 1.45;
  }

  a,
  a:visited {
    color: #000000 !important;
    text-decoration: underline;
  }

  a[href^="tel:"],
  a[href^="mailto:"] {
    font-weight: 700;
  }

  article,
  [data-case-study],
  [class*="case-study"],
  [class*="CaseStudy"],
  [class*="contact"],
  [class*="Contact"],
  [id*="event"],
  [class*="event"] {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  nav,
  aside,
  [role="dialog"],
  .scroll-progress {
    display: none !important;
  }
}
```

## 5. Full contents of apps/website/src/app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import "../../../../packages/shared/src/styles/material-icons.css";
import { AppShell } from "@/components/layout/AppShell";
import Footer from "@/components/layout/Footer";
import FaviconLinks from "@/components/layout/FaviconLinks";
import { ThemeProvider } from "@/contexts/theme-context";
import { SentryInit } from "@/components/monitoring/SentryInit";
import { SentryTestButton } from "@/components/monitoring/SentryTestButton";
import ChatWidgetLazy from "@/components/chatbot/ChatWidgetLazy";
import { DeferredPerformanceEnhancements } from "@/components/performance/DeferredPerformanceEnhancements";
import {
  StructuredData,
  generateEnhancedOrganizationSchema,
  generateJeremyLeadershipVideoSchema,
  generateJeremyPersonSchema,
  generateWebsiteSchema,
} from "@/components/seo/SeoMeta";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ScrollProgress } from "@/components/ui/accessibility/ScrollProgress";
import { GoogleAnalytics } from "@/lib/analytics/components/GoogleAnalytics";
import { COMPANY_INFO } from "@/lib/constants/company";
import { buildDualSeoTitle, MH_SLOGANS } from "@/lib/branding/page-names";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getMessages } from "next-intl/server";
import { getAllJeremyRibbons } from "@/lib/content/jeremy-ribbons";
import { getIndividualBrandingStamp } from "@/lib/content/individual-branding-stamps";
import { mendlFontVariableClasses } from "@/lib/fonts";

const SEARCH_ENGINE_VERIFICATION_OTHER = Object.fromEntries(
  [
    ["msvalidate.01", process.env["NEXT_PUBLIC_BING_SITE_VERIFICATION"]],
    [
      "baidu-site-verification",
      process.env["NEXT_PUBLIC_BAIDU_SITE_VERIFICATION"],
    ],
  ].filter((entry): entry is [string, string] => Boolean(entry[1])),
);

const CLIENT_MESSAGE_NAMESPACES = new Set([
  "careersPage",
  "common",
  "contact",
  "coolDesertNightsPage",
  "home",
  "projectsPageShell",
  "siteFooter",
  "siteHeader",
  "statusStates",
  "testimonialGrid",
  "testimonialsData",
]);

function pickClientMessages(messages: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(messages).filter(([key]) =>
      CLIENT_MESSAGE_NAMESPACES.has(key),
    ),
  );
}

export const metadata: Metadata = withGeoMetadata({
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || COMPANY_INFO.urls.getSiteUrl(),
  ),
  title: {
    default: buildDualSeoTitle(
      "home",
      "Construction Planning and Delivery in WA, OR, and ID",
    ),
    // Child routes already provide fully-branded titles in most cases.
    // Keep template neutral to avoid duplicate "| MH Construction" suffixes.
    template: "%s",
  },
  description:
    "MH Construction, led by Owner & President Jeremy Thamert, partners with owners, facilities teams, and public agencies to plan and deliver commercial, tenant improvement, municipal, agricultural and winery, and light industrial projects across Washington, Oregon, and Idaho.",
  keywords: [
    "Jeremy Thamert",
    "Jeremy Thamert MH Construction",
    "Jeremy Thamert Owner and President",
    "MH Construction home",
    MH_SLOGANS.primary,
    MH_SLOGANS.supporting[0],
    "relationship-first construction partner",
    "mission-partner-focused construction delivery",
    "owner representative construction coordination",
    "facilities team construction support",
    "municipal mission-partner alignment",
    "commercial construction consultation",
    "Pacific Northwest general contractor",
    "general contractor",
    "general contractor Tri-State",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "Tri-State construction company",
    "general contractor Richland WA",
    "general contractor Pasco WA",
    "general contractor Kennewick WA",
    "construction services",
    "veteran-owned construction leadership",
    "Tri-State licensed contractor",
    "transparent construction partnerships",
    "client partner construction communication",
    "construction project management",
    "Procore construction project management",
    "Washington Oregon Idaho contractor",
    "agricultural and winery construction",
    "community-focused building",
    "tenant improvements contractor",
    "municipal construction services",
    "light industrial construction",
    "concrete services",
    "carpentry contractor",
    "commercial construction",
    "Yakima general contractor",
    "Spokane general contractor",
    "Walla Walla general contractor",
    "Hermiston general contractor",
    "Coeur d'Alene general contractor",
    "Omak general contractor",
    "Pendleton Oregon general contractor",
    "Eastern Washington contractor",
    "clear construction communication",
    "accountable construction delivery",
  ],
  authors: [
    {
      name: "Jeremy Thamert",
    },
    {
      name: "MH Construction Partnership-Driven Team",
    },
  ],
  creator: "MH Construction, Inc.",
  publisher: "MH Construction, Inc.",
  alternates: {
    canonical: "https://www.mhc-gc.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com",
    siteName: "MH Construction",
    title: buildDualSeoTitle(
      "home",
      "Construction Planning and Delivery in WA, OR, and ID",
    ),
    description:
      "Stakeholder-focused planning and delivery for commercial, tenant improvement, municipal, agricultural and winery, and light industrial projects across Washington, Oregon, and Idaho.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction - Veteran-Owned General Contractor - Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: buildDualSeoTitle(
      "home",
      "Construction Planning and Delivery in WA, OR, and ID",
    ),
    description:
      "MH Construction partners with owners, facilities teams, and public agencies to deliver commercial, tenant improvement, municipal, agricultural and winery, and light industrial projects across WA, OR, and ID.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MH Construction",
    startupImage: [
      {
        url: "/icons/icon-512x512.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // Search console verification (Google, Bing, Yandex, Yahoo, and Baidu)
  // Set these env vars in Cloudflare dashboard after each platform is verified.
  verification: {
    google: process.env["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"],
    yandex: process.env["NEXT_PUBLIC_YANDEX_VERIFICATION"],
    yahoo: process.env["NEXT_PUBLIC_YAHOO_SITE_VERIFICATION"],
    other: SEARCH_ENGINE_VERIFICATION_OTHER,
  },
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#386851",
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = await getServerLocale();
  const messages = pickClientMessages(await getMessages({ locale })) as Awaited<
    ReturnType<typeof getMessages>
  >;
  const isProduction = process.env.NODE_ENV === "production";
  const isLighthouseAudit = /Chrome-Lighthouse/i.test(
    requestHeaders.get("user-agent") ?? "",
  );
  const enableRuntimeEnhancements = isProduction && !isLighthouseAudit;

  return (
    <html
      lang={locale}
      className={["dark", mendlFontVariableClasses].filter(Boolean).join(" ")}
    >
      <head>
        <FaviconLinks />
        <Script
          id="set-theme-before-hydration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const storageKey = "mh-construction-theme";
                const stored = localStorage.getItem(storageKey);
                const theme =
                  stored === "dark" || stored === "light" || stored === "system"
                    ? stored
                    : "dark";
                const prefersDark =
                  window.matchMedia &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches;
                const shouldUseDark =
                  theme === "dark" || (theme === "system" && prefersDark);

                document.documentElement.classList.toggle("dark", shouldUseDark);
                document.documentElement.style.colorScheme = shouldUseDark
                  ? "dark"
                  : "light";
              } catch {
                document.documentElement.classList.add("dark");
                document.documentElement.style.colorScheme = "dark";
              }
            })();`,
          }}
        />
        {/* Google Analytics */}
        {isProduction && process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"] && (
          <GoogleAnalytics
            measurementId={process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"]}
          />
        )}
        {/* Cloudflare Email Protection - async non-blocking script */}
        <Script
          id="cf-email-protection-shim"
          strategy="beforeInteractive"
          async
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              if (window.CloudFlare) {
                window.CloudFlare.emailDecode = window.CloudFlare.emailDecode || function() {};
              }
            `,
          }}
        />
        {/* Preconnect to external origins used by GA and Sentry to reduce
            connection latency (TCP + TLS handshake done early) */}
        {isProduction && process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"] ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        ) : null}
        <link rel="author" href="https://www.mhc-gc.com/jeremy-thamert" />
        {!isProduction || isLighthouseAudit ? (
          <Script
            id="clear-sw-cache-for-dev-and-lighthouse"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(() => {
                try {
                  if ("serviceWorker" in navigator) {
                    navigator.serviceWorker.getRegistrations()
                      .then((registrations) => Promise.all(registrations.map((r) => r.unregister())))
                      .catch(() => undefined);
                  }
                  if ("caches" in window) {
                    caches.keys()
                      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
                      .catch(() => undefined);
                  }
                } catch {
                  // Best-effort cleanup for dev and Lighthouse audits.
                }
              })();`,
            }}
          />
        ) : null}

        {/* Enhanced Schema Markup */}
        {isProduction ? (
          <StructuredData
            data={[
              generateEnhancedOrganizationSchema(),
              generateJeremyPersonSchema(),
              generateJeremyLeadershipVideoSchema(),
              generateWebsiteSchema(),
            ]}
          />
        ) : null}
      </head>
      <body className="font-body">
        {isProduction ? <SentryInit /> : null}
        {!isProduction ? (
          <Suspense>
            <SentryTestButton />
          </Suspense>
        ) : null}
        <SkipLink />
        <ScrollProgress />
        {enableRuntimeEnhancements ? <DeferredPerformanceEnhancements /> : null}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider defaultTheme="dark" storageKey="mh-construction-theme">
            <AppShell
              footer={<Footer />}
              jeremyRibbons={getAllJeremyRibbons()}
              jeremyStamp={getIndividualBrandingStamp("jeremy-thamert")}
            >
              {children}
            </AppShell>
            {!isLighthouseAudit ? <ChatWidgetLazy /> : null}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## 6. Route segments currently defined (every folder in src/app that contains a page.tsx)

```text
/about/details
/about
/accessibility
/allies
/careers
/careers/print
/contact
/cool-desert-nights
/employee-handbook
/events
/faq/[category]
/faq
/jeremy-thamert
/locations/[city]
/locations
/offline
/
/privacy
/projects
/projects/[slug]
/public-sector
/public-sector/tri-state-government-construction
/public-sector/veteran-led-compliance
/qr-codes
/resources
/resources/safety-manual/[cluster]
/resources/safety-manual/contents
/resources/safety-manual/forms
/resources/safety-manual
/resources/safety-manual/section/[slug]
/resources/safety-program
/safety/incident-report
/safety/intake
/safety
/safety/print/[id]
/services
/sitemap
/team
/terms
/testimonials
/veterans
/veterans/public-sector-construction
```

## 7. Navigation items currently rendered in the main nav component

- Main nav component file path: apps/website/src/components/navigation/SiteHeader.tsx
- Navigation data source file path: apps/website/src/components/navigation/navigation-data.ts
- Wrapper rendered by app shell: apps/website/src/components/layout/Navigation.tsx
- Note: /podcast is marked planned in nav definitions and currently filtered out from rendered navigation.

| Label (en)     | Label (es)         | Href           | Priority  |
| -------------- | ------------------ | -------------- | --------- |
| Services       | Servicios          | /services      | primary   |
| Projects       | Proyectos          | /projects      | primary   |
| Public Sector  | Sector público     | /public-sector | primary   |
| About MH       | Sobre MH           | /about         | primary   |
| Contact        | Contacto           | /contact       | primary   |
| Events         | Eventos            | /events        | secondary |
| Resources      | Recursos           | /resources     | secondary |
| Careers        | Carreras           | /careers       | secondary |
| Safety         | Seguridad          | /safety        | secondary |
| Trade Partners | Socios comerciales | /allies        | secondary |
| Veterans       | Veteranos          | /veterans      | secondary |
| Team           | Equipo             | /team          | secondary |

## 8. next-intl config or middleware file contents related to locale routing

### middleware.ts

```ts
/**
 * Next.js Middleware
 * Enhanced middleware with Cloudflare optimization and security features
 */

import { type NextRequest } from "next/server";
import {
  getPreferredLocaleFromAcceptLanguage,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
} from "./src/lib/i18n/locale";
import { securityMiddleware } from "./src/middleware/security";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/images/qr-codes/")) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = pathname.replace("/images/", "/media/");
    return Response.rewrite(targetUrl);
  }

  // Apex → www redirect is handled by Cloudflare Redirect Rule "apex-to-www"
  // at the CDN edge (~10-20 ms faster than handling in Worker).
  // Rule: https://mhc-gc.com/* → https://www.mhc-gc.com/${1}

  // Apply security middleware
  const response = await securityMiddleware(request);

  // Add Cloudflare-specific optimizations
  if (response) {
    // Keep response tagging lightweight; cache policy ownership lives in
    // route handlers and next.config.js headers.
    if (pathname.startsWith("/api/")) {
      response.headers.set("CF-Cache-Tag", "api");
      // Mutation requests must never be stored in any cache (browser or CDN)
      // to prevent contact submissions, auth tokens, and form payloads from
      // being replayed. GET routes define their own cache semantics.
      if (request.method !== "GET") {
        response.headers.set("Cache-Control", "no-store");
      }
    } else {
      response.headers.set("CF-Cache-Tag", "html");

      const localeCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
      if (!localeCookie || !isSupportedLocale(localeCookie)) {
        const preferredLocale = getPreferredLocaleFromAcceptLanguage(
          request.headers.get("accept-language"),
        );

        response.cookies.set({
          name: LOCALE_COOKIE_NAME,
          value: preferredLocale,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
      }
    }
  }

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *
     * Static framework assets
     *   - _next/              Next.js static chunks and image optimiser
     *
     * Browser / PWA entry points (served verbatim, no extra middleware needed)
     *   - favicon.ico
     *   - sw.js               Service worker (requires exact same-origin headers)
     *   - manifest.json       PWA manifest
     *
     * SEO / crawler discovery files (static, must not be modified in-flight)
     *   - robots.txt
     *   - sitemap.xml
     *   - sitemap-index.xml   Root sitemap index (public/sitemap-index.xml)
     *   - llms.txt            LLM discovery file (public/llms.txt)
     *   - google*.html        Google Search Console verification files
     *
     * Static asset directories (cache headers already set in next.config.js)
     *   - fonts/              Self-hosted woff2 files
     *   - icons/              PWA icons
     *   - images/             Optimised WebP/AVIF images
     *   - videos/             Optimized media assets (range requests)
     *
     * Cloudflare-native / internal endpoints
     *   - api/health          Service health check — skip auth & rate-limit overhead
     *   - api/security/status Security status probe — skip auth & rate-limit overhead
     *   - api/cf-*            Cloudflare-managed API endpoints
     *
     * Cloudflare Workers config files (not real HTTP paths)
     *   - _headers            Custom response headers file
     *   - _redirects          Redirect rules file
     */
    "/images/qr-codes/:path*",
    "/((?!api/health|api/security/status|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|google[a-z0-9]+\\.html|_headers|_redirects|fonts|icons|images|videos).*)",
  ],
};
```

### apps/website/src/lib/i18n/locale.ts

```ts
export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE_NAME = "locale";
export const PATH_LOCALE_HEADER_NAME = "x-mh-path-locale";
const LOCALE_COOKIE_REGEX = new RegExp(
  String.raw`(?:^|;\s*)${LOCALE_COOKIE_NAME}=([^;]+)`,
);

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(
  value: string | null | undefined,
): SupportedLocale {
  if (!value) return DEFAULT_LOCALE;
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

export function readLocaleFromCookieString(
  cookieString: string | null | undefined,
): SupportedLocale {
  if (!cookieString) return DEFAULT_LOCALE;

  const match = LOCALE_COOKIE_REGEX.exec(cookieString);
  return normalizeLocale(match?.[1]);
}

export function getClientLocale(): SupportedLocale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  return readLocaleFromCookieString(document.cookie);
}

export function setClientLocale(locale: SupportedLocale): void {
  if (typeof document === "undefined") return;

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  document.documentElement.lang = locale;

  if (globalThis.window !== undefined) {
    globalThis.dispatchEvent(new Event("localechange"));
  }
}

export function getPreferredLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): SupportedLocale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const sortedCandidates = acceptLanguage
    .split(",")
    .map((entry) => {
      const parts = entry.trim().split(";");
      const langRange = (parts[0] ?? "").toLowerCase();
      const qualityParam = parts.find((param) =>
        param.trim().toLowerCase().startsWith("q="),
      );

      const quality = qualityParam
        ? Number.parseFloat(qualityParam.split("=")[1] ?? "1")
        : 1;

      return {
        langRange,
        quality: Number.isNaN(quality) ? 1 : quality,
      };
    })
    .filter((candidate) => candidate.langRange.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const candidate of sortedCandidates) {
    const baseLanguage = candidate.langRange.split("-")[0];
    if (baseLanguage !== undefined && isSupportedLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return DEFAULT_LOCALE;
}
```

### apps/website/src/lib/i18n/locale.server.ts

```ts
import { cookies, headers } from "next/headers";
import {
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  PATH_LOCALE_HEADER_NAME,
  normalizeLocale,
  type SupportedLocale,
} from "./locale";

export async function getServerLocale(): Promise<SupportedLocale> {
  const headerStore = await headers();
  const localeFromPath = headerStore.get(PATH_LOCALE_HEADER_NAME);
  if (localeFromPath && isSupportedLocale(localeFromPath)) {
    return localeFromPath;
  }

  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
}
```

### apps/website/next.config.js

```js
/**
 * MH Construction - Next.js Configuration
 *
 * Optimized for Next.js 16 with Cloudflare Workers deployment (OpenNext adapter)
 * Production-ready configuration with performance optimizations
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 * @see docs/project/architecture.md
 * @version 2.2.0
 * @lastUpdated 2026-04-29
 */

// Disable telemetry during CI/production builds
process.env.NEXT_TELEMETRY_DISABLED = "1";

// Required for local development when code reads Cloudflare bindings
// through getCloudflareContext() (KV, D1, R2, etc.).
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev({ remoteBindings: false }).catch((error) => {
  console.warn(
    "[next.config.js] Cloudflare dev context init failed; continuing without bindings",
    error,
  );
});

// ── Build-time environment guard ──────────────────────────────────────────────
// NEXT_PUBLIC_SITE_URL is baked into the client bundle at build time.
// If missing, canonical URLs, OG tags, and sitemap links will be wrong.
// Note: RESEND_API_KEY and JWT_SECRET are Cloudflare Workers *runtime* secrets
// (injected via dashboard bindings) — they are NOT available during `next build`
// and must NOT be checked here.
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  // Keep canonical URLs stable in production builds even when env bindings are
  // not present at build time (for example in local CI smoke builds).
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.mhc-gc.com";
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const createNextIntlPlugin = require("next-intl/plugin");
const path = require("node:path");
const redirectRecords = require("./src/lib/routing/redirects.json");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const isLowMemoryBuild = process.env.LOW_MEMORY_BUILD === "true";
const enableNextExperiments = process.env.NEXT_ENABLE_EXPERIMENTS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE OPTIMIZATIONS ===
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production

  // Transpile ESM-only packages so next/jest transforms them in tests
  transpilePackages: ["jose"],

  // Target modern browsers to reduce polyfills
  // Matches browserslist: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

  ...(enableNextExperiments
    ? {
        experimental: {
          // Reduce build worker pressure in constrained containers.
          // Also disable when NEXT_PRIVATE_STANDALONE=true (OpenNext): spawning
          // webpack workers alongside standalone file-tracing exhausts available
          // memory in the devcontainer, causing the build process to be SIGTERM'd.
          webpackBuildWorker:
            !isLowMemoryBuild && process.env.NEXT_PRIVATE_STANDALONE !== "true",
          // CSS optimization - cssChunking defaults to true for better splitting
          // Tree-shake large packages at compile time (experimental in Next.js 16)
          optimizePackageImports: [
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-progress",
            "recharts",
          ],
        },
      }
    : {}),

  // Exclude build-tool node_modules from the trace step (~20s savings)
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-gnu/**/*",
      "node_modules/@swc/core-linux-x64-musl/**/*",
      "node_modules/@esbuild/**/*",
      "node_modules/webpack/**/*",
      "node_modules/typescript/**/*",
      "node_modules/jest-worker/**/*",
      "node_modules/jest-resolve/**/*",
      "node_modules/jest-runtime/**/*",
      "node_modules/eslint/**/*",
      "node_modules/@eslint/**/*",
      "node_modules/eslint-*/**/*",
      "node_modules/tailwindcss/**/*",
      "node_modules/postcss/**/*",
      "node_modules/autoprefixer/**/*",
      "node_modules/@next/bundle-analyzer/**/*",
      "node_modules/husky/**/*",
      "node_modules/@commitlint/**/*",
      // @react-email/render is NOT installed (see peerDependencyRules in
      // package.json). This entry guards against future re-installation so the
      // package + its prettier dependency (~10 MiB) are never traced into the
      // Cloudflare Worker bundle.
      "node_modules/@react-email/**/*",
      "node_modules/prettier/**/*",
      "node_modules/@prettier/**/*",
      "node_modules/markdownlint-cli2/**/*",
      "node_modules/cspell/**/*",
    ],
  },

  // === BUILD CONFIGURATION ===
  compiler: {
    // Preserve console.error in production so runtime errors remain visible
    // in Cloudflare Workers logs. Only strip debug/info/warn logs.
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Type checking is handled by ci:gate (npm run type-check) — skip during
  // next build to save ~22s. Errors still caught pre-merge.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Build directories
  distDir: ".next",
  cleanDistDir: true,

  // === SECURITY ===
  poweredByHeader: false,

  // Allow Codespaces / devcontainer host preview origins to reach the HMR
  // websocket without being blocked by Next.js cross-origin protection.
  // Production builds ignore this field.
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.app.github.dev"],

  // === WEBPACK CUSTOMIZATION ===
  webpack: (config, { dev, isServer }) => {
    // Exclude backup directories from compilation
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /backups/, /\.backup\./, /\.next/],
    });

    // Shared monorepo packages resolve via path alias so that `@/lib/db` etc.
    // automatically points at packages/shared regardless of which app is built.
    const sharedRoot = path.resolve(__dirname, "../../packages/shared/src/lib");
    const sharedLibs = [
      "db",
      "auth",
      "security",
      "utils",
      "constants",
      "types",
      "cloudflare",
      "api",
      "email",
      "notifications",
      "analytics",
      "monitoring",
      "safety",
    ];

    // Enhanced module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      // Shared lib: @/lib/<module> → packages/shared/src/lib/<module>
      ...Object.fromEntries(
        sharedLibs.map((lib) => [`@/lib/${lib}`, path.join(sharedRoot, lib)]),
      ),
      // resend v6 declares @react-email/render as an optional peer dependency.
      // We do NOT install it (it is excluded from package.json `dependencies` and
      // `pnpm.peerDependencyRules.ignoreMissing`) because it transitively depends
      // on `prettier` (~10 MiB), which would balloon the Cloudflare Worker bundle.
      // This alias is a defence-in-depth guard so the Next.js webpack build also
      // treats the import as an empty module if it is somehow resolved.
      "@react-email/render": false,
    };

    // Production optimizations
    if (!dev) {
      // Enable persistent caching for faster rebuilds (all build targets)
      config.cache = {
        type: "filesystem",
        compression: isLowMemoryBuild ? false : "gzip",
      };
    }

    if (!dev && !isServer && !isLowMemoryBuild) {
      // Better code splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Recharts chunk (lazy-loaded only when needed)
            recharts: {
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              name: "recharts",
              priority: 35,
              reuseExistingChunk: true,
            },
            // Lib chunk (large dependencies)
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context?.match(
                  /[/\\]node_modules[/\\](.*?)(?:[/\\]|$)/,
                )?.[1];
                return `npm.${packageName?.replace("@", "") ?? "vendor"}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Commons chunk (shared code)
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        },
        runtimeChunk: {
          name: "runtime",
        },
      };
    }

    return config;
  },

  // === IMAGE OPTIMIZATION ===
  // CF Workers has no `sharp` runtime, so Next.js server-side image resizing
  // and format conversion (AVIF/WebP) cannot run at request time.
  // Images are pre-converted to WebP/WebM by the GitHub Actions optimize workflow
  // (npm run optimize:images). Serve them as-is from the ASSETS binding.
  images: {
    formats: ["image/webp"], // Pre-converted by CI; AVIF excluded (requires sharp)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow the quality values used at <Image quality="..." /> call sites.
    // Default is [75]; we use 20 (LQIP/blur), 72 (project cards), and 85
    // (high-fidelity logos).
    qualities: [20, 72, 75, 85],
    minimumCacheTTL: 2592000, // 30 days — safe because Next.js uses content-hash URLs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Required for CF Workers — no sharp available at runtime
    remotePatterns: [],
  },

  // === REDIRECTS ===
  async redirects() {
    return redirectRecords;
  },

  // === HEADERS ===
  async headers() {
    // Long-lived immutable cache headers for build outputs are PRODUCTION ONLY.
    // Applying them in dev breaks Next.js HMR / fast refresh because Turbopack
    // serves chunks from /_next/static with content hashes that the browser
    // would otherwise refuse to refetch. (Next.js logs a warning in dev.)
    const isProd = process.env.NODE_ENV === "production";
    const prodOnly = (entries) => (isProd ? entries : []);

    return [
      // Cache HTML pages at the edge while revalidating frequently.
      // Excludes API routes, static assets, and authenticated surfaces.
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: String.raw`/:path((?!api|admin|dashboard|_next|.*\..*).*)`,
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Cache static assets (production only — dev keeps default no-cache so
      // edited images refresh without a hard reload)
      ...prodOnly([
        {
          source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        // Cache Next.js build chunks (main.js, etc.)
        {
          source: "/:path*.js",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
            },
          ],
        },
        // Cache CSS files
        {
          source: "/:path*.css",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
            },
          ],
        },
      ]),
      // Service worker must never be cached — browsers check for updates on
      // every navigation. A stale sw.js blocks PWA version updates for users.
      // This rule comes AFTER the broad /:path*.js rule so it takes precedence.
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Cache fonts
      {
        source: "/:path*.(woff|woff2|eot|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
```

### next.config.js

```js
/**
 * MH Construction - Next.js Configuration
 *
 * Optimized for Next.js 16 with Cloudflare Workers deployment (OpenNext adapter)
 * Production-ready configuration with performance optimizations
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 * @see docs/project/architecture.md
 * @version 2.2.0
 * @lastUpdated 2026-04-29
 */

// Disable telemetry during CI/production builds
process.env.NEXT_TELEMETRY_DISABLED = "1";

// Required for local development when code reads Cloudflare bindings
// through getCloudflareContext() (KV, D1, R2, etc.).
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev({ remoteBindings: false }).catch((error) => {
  console.warn(
    "[next.config.js] Cloudflare dev context init failed; continuing without bindings",
    error,
  );
});

// ── Build-time environment guard ──────────────────────────────────────────────
// NEXT_PUBLIC_SITE_URL is baked into the client bundle at build time.
// If missing, canonical URLs, OG tags, and sitemap links will be wrong.
// Note: RESEND_API_KEY and JWT_SECRET are Cloudflare Workers *runtime* secrets
// (injected via dashboard bindings) — they are NOT available during `next build`
// and must NOT be checked here.
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  // Apply the production fallback so the build can proceed; canonical URLs will
  // still be correct since the fallback matches the live domain.
  // To silence this warning, add NEXT_PUBLIC_SITE_URL=https://www.mhc-gc.com
  // in the Cloudflare Workers dashboard (Settings → Environment variables).
  console.warn(
    "[next.config.js] NEXT_PUBLIC_SITE_URL is not set — " +
      "falling back to https://www.mhc-gc.com. " +
      "Add it to the Cloudflare Workers dashboard to suppress this warning.",
  );
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.mhc-gc.com";
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const createNextIntlPlugin = require("next-intl/plugin");
const path = require("node:path");
const withNextIntl = createNextIntlPlugin("./apps/website/src/i18n/request.ts");
const isLowMemoryBuild = process.env.LOW_MEMORY_BUILD === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE OPTIMIZATIONS ===
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production

  // Transpile ESM-only packages so next/jest transforms them in tests
  transpilePackages: ["jose"],

  // Target modern browsers to reduce polyfills
  // Matches browserslist: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

  experimental: {
    // Reduce build worker pressure in constrained containers.
    webpackBuildWorker: !isLowMemoryBuild,
    // CSS optimization - cssChunking defaults to true for better splitting
    // Tree-shake large packages at compile time (experimental in Next.js 16)
    optimizePackageImports: [
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-progress",
      "recharts",
    ],
  },

  // Exclude build-tool node_modules from the trace step (~20s savings)
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-gnu/**/*",
      "node_modules/@swc/core-linux-x64-musl/**/*",
      "node_modules/@esbuild/**/*",
      "node_modules/webpack/**/*",
      "node_modules/typescript/**/*",
      "node_modules/jest-worker/**/*",
      "node_modules/jest-resolve/**/*",
      "node_modules/jest-runtime/**/*",
      "node_modules/eslint/**/*",
      "node_modules/@eslint/**/*",
      "node_modules/eslint-*/**/*",
      "node_modules/tailwindcss/**/*",
      "node_modules/postcss/**/*",
      "node_modules/autoprefixer/**/*",
      "node_modules/@next/bundle-analyzer/**/*",
      "node_modules/husky/**/*",
      "node_modules/@commitlint/**/*",
      // @react-email/render is NOT installed (see peerDependencyRules in
      // package.json). This entry guards against future re-installation so the
      // package + its prettier dependency (~10 MiB) are never traced into the
      // Cloudflare Worker bundle.
      "node_modules/@react-email/**/*",
      "node_modules/prettier/**/*",
      "node_modules/@prettier/**/*",
      "node_modules/markdownlint-cli2/**/*",
      "node_modules/cspell/**/*",
    ],
  },

  // === BUILD CONFIGURATION ===
  compiler: {
    // Preserve console.error in production so runtime errors remain visible
    // in Cloudflare Workers logs. Only strip debug/info/warn logs.
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Type checking is handled by ci:gate (npm run type-check) — skip during
  // next build to save ~22s. Errors still caught pre-merge.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Build directories
  distDir: ".next",
  cleanDistDir: true,

  // === SECURITY ===
  poweredByHeader: false,

  // Allow Codespaces / devcontainer host preview origins to reach the HMR
  // websocket without being blocked by Next.js cross-origin protection.
  // Production builds ignore this field.
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.app.github.dev"],

  // === WEBPACK CUSTOMIZATION ===
  webpack: (config, { dev, isServer }) => {
    // Exclude backup directories from compilation
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /backups/, /\.backup\./, /\.next/],
    });

    // Enhanced module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "apps/website/src"),
      // resend v6 declares @react-email/render as an optional peer dependency.
      // We do NOT install it (it is excluded from package.json `dependencies` and
      // `pnpm.peerDependencyRules.ignoreMissing`) because it transitively depends
      // on `prettier` (~10 MiB), which would balloon the Cloudflare Worker bundle.
      // This alias is a defence-in-depth guard so the Next.js webpack build also
      // treats the import as an empty module if it is somehow resolved.
      "@react-email/render": false,
    };

    // Production optimizations
    if (!dev) {
      // Enable persistent caching for faster rebuilds (all build targets)
      config.cache = {
        type: "filesystem",
        compression: isLowMemoryBuild ? false : "gzip",
      };
    }

    if (!dev && !isServer && !isLowMemoryBuild) {
      // Better code splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Recharts chunk (lazy-loaded only when needed)
            recharts: {
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              name: "recharts",
              priority: 35,
              reuseExistingChunk: true,
            },
            // Lib chunk (large dependencies)
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context?.match(
                  /[/\\]node_modules[/\\](.*?)(?:[/\\]|$)/,
                )?.[1];
                return `npm.${packageName?.replace("@", "") ?? "vendor"}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Commons chunk (shared code)
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        },
        runtimeChunk: {
          name: "runtime",
        },
      };
    }

    return config;
  },

  // === IMAGE OPTIMIZATION ===
  // CF Workers has no `sharp` runtime, so Next.js server-side image resizing
  // and format conversion (AVIF/WebP) cannot run at request time.
  // Images are pre-converted to WebP/WebM by the GitHub Actions optimize workflow
  // (npm run optimize:images). Serve them as-is from the ASSETS binding.
  images: {
    formats: ["image/webp"], // Pre-converted by CI; AVIF excluded (requires sharp)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow the quality values used at <Image quality="..." /> call sites.
    // Default is [75]; we use 20 (LQIP/blur), 72 (project cards), and 85
    // (high-fidelity logos).
    qualities: [20, 72, 75, 85],
    minimumCacheTTL: 2592000, // 30 days — safe because Next.js uses content-hash URLs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Required for CF Workers — no sharp available at runtime
    remotePatterns: [],
  },

  // === REDIRECTS ===
  async redirects() {
    return [
      {
        source: "/partners",
        destination: "/allies",
        permanent: true, // 301
      },
      {
        source: "/trade-partners",
        destination: "/allies",
        permanent: true, // 301
      },
      {
        source: "/government",
        destination: "/public-sector",
        permanent: true, // 301
      },
      {
        source: "/book",
        destination: "/contact",
        permanent: true, // 301
      },
    ];
  },

  // === HEADERS ===
  async headers() {
    // Long-lived immutable cache headers for build outputs are PRODUCTION ONLY.
    // Applying them in dev breaks Next.js HMR / fast refresh because Turbopack
    // serves chunks from /_next/static with content hashes that the browser
    // would otherwise refuse to refetch. (Next.js logs a warning in dev.)
    const isProd = process.env.NODE_ENV === "production";
    const prodOnly = (entries) => (isProd ? entries : []);

    return [
      // Cache HTML pages at the edge while revalidating frequently.
      // Excludes API routes, static assets, and authenticated surfaces.
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: String.raw`/:path((?!api|admin|dashboard|_next|.*\..*).*)`,
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Cache static assets (production only — dev keeps default no-cache so
      // edited images refresh without a hard reload)
      ...prodOnly([
        {
          source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        // Cache Next.js static files (CSS, JS bundles)
        {
          source: "/_next/static/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        // Cache Next.js build chunks (main.js, etc.)
        {
          source: "/:path*.js",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
            },
          ],
        },
        // Cache CSS files
        {
          source: "/:path*.css",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
            },
          ],
        },
      ]),
      // Service worker must never be cached — browsers check for updates on
      // every navigation. A stale sw.js blocks PWA version updates for users.
      // This rule comes AFTER the broad /:path*.js rule so it takes precedence.
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Cache fonts
      {
        source: "/:path*.(woff|woff2|eot|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
```

## 9. Summary of what changed since the original repo handoff

Interpreted as net changes from initial commit to current HEAD (same repository, current main branch).

- Net changed paths vs baseline: 1807
- Added files (A): 1189
- Modified files (M): 460
- Deleted files (D): 140
- Renamed files (R*): 18

### Added files (A)

```text
.env.copilot.local.save
.env.r2.local.example
.github/actions/setup-node-workflow/action.yml
.github/actions/setup-workspace/action.yml
.github/agents/ci-workflow-compliance-officer.agent.md
.github/agents/migration-data-integrity-officer.agent.md
.github/agents/security-secrets-guard-officer.agent.md
.github/reports/AGENT_COMPLIANCE_PR_SUMMARY_2026-07-11.md
.github/reports/AGENT_COMPLIANCE_REPORT_2026-07-11.md
.github/workflows/seo-jeremy-nightly.yml
apps/website/public/.well-known/security.txt
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/fonts/Mendl
apps/website/public/images/README.md
apps/website/public/images/credentials/agc-wa-logo.png
apps/website/public/images/credentials/agc-wa-logo.webp
apps/website/public/images/home-hero-poster.webp
apps/website/public/images/logo/veteran-owned-business.webp
apps/website/public/images/projects/alverez-auto-lot/atc-e-20181226-p007.jpg
apps/website/public/images/projects/alverez-auto-lot/atc-e-20181226-p007.webp
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190128-p009.jpg
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190128-p009.webp
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190130-p012.jpg
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190130-p012.webp
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190417-p020.jpg
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190417-p020.webp
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190502-p025.jpg
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190502-p025.webp
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190715-p036.jpg
apps/website/public/images/projects/alverez-auto-lot/atc-e-20190715-p036.webp
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-accessible-parking-p001-photo.jpg
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-accessible-parking-p001-photo.webp
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-loading-dock-doors-p008-photo.jpg
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-loading-dock-doors-p008-photo.webp
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.jpg
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.webp
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p011-photo.jpg
apps/website/public/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p011-photo.webp
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.jpg
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.webp
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-coroner-office-monument-sign-p012-photo.jpg
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-coroner-office-monument-sign-p012-photo.webp
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-service-bay-exterior-p008-photo.jpg
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-service-bay-exterior-p008-photo.webp
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-service-wall-p002-photo.jpg
apps/website/public/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-service-wall-p002-photo.webp
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-building-facade-p002-photo.jpg
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-building-facade-p002-photo.webp
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-entrance-corner-p003-photo.jpg
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-entrance-corner-p003-photo.webp
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-main-entrance-and-signage-p001-photo.jpg
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-main-entrance-and-signage-p001-photo.webp
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-office-and-warehouse-facade-p004-photo.jpg
apps/website/public/images/projects/volm-companies/volm-companies-remodel-2020-02-05-office-and-warehouse-facade-p004-photo.webp
apps/website/public/images/qr-codes/contact/qr-contact-bw.webp
apps/website/public/images/qr-codes/contact/qr-contact-color.webp
apps/website/public/images/qr-codes/contact/qr-email-bw.webp
apps/website/public/images/qr-codes/contact/qr-email-color.webp
apps/website/public/images/qr-codes/contact/qr-location-bw.webp
apps/website/public/images/qr-codes/contact/qr-location-color.webp
apps/website/public/images/qr-codes/contact/qr-phone-bw.webp
apps/website/public/images/qr-codes/contact/qr-phone-color.webp
apps/website/public/images/qr-codes/core/qr-about-bw.webp
apps/website/public/images/qr-codes/core/qr-about-color.webp
apps/website/public/images/qr-codes/core/qr-accessibility-bw.webp
apps/website/public/images/qr-codes/core/qr-accessibility-color.webp
apps/website/public/images/qr-codes/core/qr-allies-bw.webp
apps/website/public/images/qr-codes/core/qr-allies-color.webp
apps/website/public/images/qr-codes/core/qr-careers-bw.webp
apps/website/public/images/qr-codes/core/qr-careers-color.webp
apps/website/public/images/qr-codes/core/qr-faq-bw.webp
apps/website/public/images/qr-codes/core/qr-faq-color.webp
apps/website/public/images/qr-codes/core/qr-homepage-bw.webp
apps/website/public/images/qr-codes/core/qr-homepage-color.webp
apps/website/public/images/qr-codes/core/qr-projects-bw.webp
apps/website/public/images/qr-codes/core/qr-projects-color.webp
apps/website/public/images/qr-codes/core/qr-public-sector-bw.webp
apps/website/public/images/qr-codes/core/qr-public-sector-color.webp
apps/website/public/images/qr-codes/core/qr-resources-bw.webp
apps/website/public/images/qr-codes/core/qr-resources-color.webp
apps/website/public/images/qr-codes/core/qr-services-bw.webp
apps/website/public/images/qr-codes/core/qr-services-color.webp
apps/website/public/images/qr-codes/core/qr-team-bw.webp
apps/website/public/images/qr-codes/core/qr-team-color.webp
apps/website/public/images/qr-codes/core/qr-testimonials-bw.webp
apps/website/public/images/qr-codes/core/qr-testimonials-color.webp
apps/website/public/images/qr-codes/core/qr-veterans-bw.webp
apps/website/public/images/qr-codes/core/qr-veterans-color.webp
apps/website/public/images/qr-codes/events/qr-cdn-booth-entry-bw.webp
apps/website/public/images/qr-codes/events/qr-cdn-booth-entry-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-01-company-vehicle-acknowledgement-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-01-company-vehicle-acknowledgement-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-02-handbook-receipt-acknowledgment-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-02-handbook-receipt-acknowledgment-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-03-safety-policy-acknowledgement-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-03-safety-policy-acknowledgement-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-04-work-from-home-agreement-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-04-work-from-home-agreement-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-05-computer-electronics-use-agreement-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-05-computer-electronics-use-agreement-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-06-employee-photo-release-form-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-06-employee-photo-release-form-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-07-client-photo-release-form-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-07-client-photo-release-form-color.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-08-purchase-approval-general-expense-bw.webp
apps/website/public/images/qr-codes/handbook-forms/qr-handbook-form-handbook-08-purchase-approval-general-expense-color.webp
apps/website/public/images/qr-codes/rfq/qr-traho-contact-bw.webp
apps/website/public/images/qr-codes/rfq/qr-traho-contact-color.webp
apps/website/public/images/qr-codes/rfq/qr-traho-overview-bw.webp
apps/website/public/images/qr-codes/rfq/qr-traho-overview-color.webp
apps/website/public/images/qr-codes/rfq/qr-traho-projects-bw.webp
apps/website/public/images/qr-codes/rfq/qr-traho-projects-color.webp
apps/website/public/images/qr-codes/rfq/qr-traho-safety-bw.webp
apps/website/public/images/qr-codes/rfq/qr-traho-safety-color.webp
apps/website/public/images/qr-codes/rfq/qr-traho-services-bw.webp
apps/website/public/images/qr-codes/rfq/qr-traho-services-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-01-injury-free-workplace-plan-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-01-injury-free-workplace-plan-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-02-drug-free-work-place-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-02-drug-free-work-place-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-03-program-policy-and-requirements-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-03-program-policy-and-requirements-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-04-safety-and-health-orientation-sign-in-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-04-safety-and-health-orientation-sign-in-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-05-pre-job-safety-planning-job-hazard-analysis-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-05-pre-job-safety-planning-job-hazard-analysis-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-06-emergency-response-plan-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-06-emergency-response-plan-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-08-incident-near-miss-report-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-08-incident-near-miss-report-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-09-safety-meeting-toolbox-talk-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-09-safety-meeting-toolbox-talk-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-10-ppe-issuance-and-inspection-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-10-ppe-issuance-and-inspection-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-11-fall-protection-pretask-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-11-fall-protection-pretask-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-12-flammable-combustible-liquids-inspection-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-12-flammable-combustible-liquids-inspection-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-13-fire-prevention-inspection-checklist-insp-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-13-fire-prevention-inspection-checklist-insp-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-14-hot-work-permit-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-14-hot-work-permit-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-15-lockout-tagout-procedure-and-verification-permit-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-15-lockout-tagout-procedure-and-verification-permit-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-16-confined-space-entry-permit-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-16-confined-space-entry-permit-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-17-ladder-inspection-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-17-ladder-inspection-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-18-vehicle-pre-trip-inspection-driver-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-18-vehicle-pre-trip-inspection-driver-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-19-equipment-maintenance-and-inspection-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-19-equipment-maintenance-and-inspection-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-20-aerial-lift-pre-operation-inspection-and-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-20-aerial-lift-pre-operation-inspection-and-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-21-crane-suspended-work-platform-permit-and-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-21-crane-suspended-work-platform-permit-and-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-22-scaffold-erection-and-inspection-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-22-scaffold-erection-and-inspection-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-23-industrial-hygiene-exposure-assessment-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-23-industrial-hygiene-exposure-assessment-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-24-hazard-communication-sds-acknowledgment-ack-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-24-hazard-communication-sds-acknowledgment-ack-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-25-heat-illness-prevention-monitoring-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-25-heat-illness-prevention-monitoring-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-26-excavation-and-trenching-safety-inspection-and-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-26-excavation-and-trenching-safety-inspection-and-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-27-equipment-modification-authorization-permit-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-27-equipment-modification-authorization-permit-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-28-housekeeping-inspection-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-28-housekeeping-inspection-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-29-electrical-safety-pre-task-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-29-electrical-safety-pre-task-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-30-signs-signals-and-barricades-inspection-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-30-signs-signals-and-barricades-inspection-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-33-floor-opening-and-open-sided-surface-inspection-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-33-floor-opening-and-open-sided-surface-inspection-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-34-compressed-gas-cylinder-inspection-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-34-compressed-gas-cylinder-inspection-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-35-rigging-inspection-and-pre-lift-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-35-rigging-inspection-and-pre-lift-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-36-hand-and-portable-power-tool-inspection-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-36-hand-and-portable-power-tool-inspection-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-37-concrete-and-masonry-pre-task-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-37-concrete-and-masonry-pre-task-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-38-commercial-driver-drug-program-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-38-commercial-driver-drug-program-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-39-silica-exposure-control-plan-and-monitoring-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-39-silica-exposure-control-plan-and-monitoring-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-40-forklift-pit-pre-operation-inspection-and-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-40-forklift-pit-pre-operation-inspection-and-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-41-distracted-driving-mvr-policy-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-41-distracted-driving-mvr-policy-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-42-cold-weather-operations-safety-checklist-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-42-cold-weather-operations-safety-checklist-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-43-general-waste-management-disposal-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-43-general-waste-management-disposal-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-44-struck-by-caught-in-pre-task-jha-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-44-struck-by-caught-in-pre-task-jha-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-46-subcontractor-safety-compliance-acknowledgment-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-46-subcontractor-safety-compliance-acknowledgment-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-47-insurance-and-coi-verification-checklist-insp-ack-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-47-insurance-and-coi-verification-checklist-insp-ack-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-48-emergency-response-plan-drill-and-acknowledgment-log-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-48-emergency-response-plan-drill-and-acknowledgment-log-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-49-incident-investigation-root-cause-analysis-report-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-49-incident-investigation-root-cause-analysis-report-color.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-50-return-to-work-program-agreement-ack-bw.webp
apps/website/public/images/qr-codes/safety-forms/qr-safety-form-mish-50-return-to-work-program-agreement-ack-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-01-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-01-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-02-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-02-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-03-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-03-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-04-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-04-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-05-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-05-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-06-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-06-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-07-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-07-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-08-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-08-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-09-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-09-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-10-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-10-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-11-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-11-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-12-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-12-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-13-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-13-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-14-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-14-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-15-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-15-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-16-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-16-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-17-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-17-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-18-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-18-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-19-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-19-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-20-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-20-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-21-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-21-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-22-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-22-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-23-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-23-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-24-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-24-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-25-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-25-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-26-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-26-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-27-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-27-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-28-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-28-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-29-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-29-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-30-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-30-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-31-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-31-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-32-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-32-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-33-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-33-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-34-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-34-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-35-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-35-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-36-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-36-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-37-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-37-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-38-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-38-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-39-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-39-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-40-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-40-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-41-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-41-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-42-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-42-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-43-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-43-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-44-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-44-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-45-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-45-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-46-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-46-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-47-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-47-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-48-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-48-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-49-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-49-color.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-50-bw.webp
apps/website/public/images/qr-codes/safety-sections/qr-safety-section-50-color.webp
apps/website/public/images/qr-codes/safety/qr-employee-handbook-bw.webp
apps/website/public/images/qr-codes/safety/qr-employee-handbook-color.webp
apps/website/public/images/qr-codes/safety/qr-hub-bw.webp
apps/website/public/images/qr-codes/safety/qr-hub-color.webp
apps/website/public/images/qr-codes/safety/qr-safety-dashboard-bw.webp
apps/website/public/images/qr-codes/safety/qr-safety-dashboard-color.webp
apps/website/public/images/qr-codes/safety/qr-safety-incident-report-bw.webp
apps/website/public/images/qr-codes/safety/qr-safety-incident-report-color.webp
apps/website/public/images/qr-codes/safety/qr-safety-intake-bw.webp
apps/website/public/images/qr-codes/safety/qr-safety-intake-color.webp
apps/website/public/images/qr-codes/safety/qr-safety-manual-bw.webp
apps/website/public/images/qr-codes/safety/qr-safety-manual-color.webp
apps/website/public/images/qr-codes/safety/qr-safety-program-bw.webp
apps/website/public/images/qr-codes/safety/qr-safety-program-color.webp
apps/website/public/images/qr-codes/social/qr-facebook-bw.webp
apps/website/public/images/qr-codes/social/qr-facebook-color.webp
apps/website/public/images/qr-codes/social/qr-instagram-bw.webp
apps/website/public/images/qr-codes/social/qr-instagram-color.webp
apps/website/public/images/qr-codes/social/qr-linkedin-bw.webp
apps/website/public/images/qr-codes/social/qr-linkedin-color.webp
apps/website/public/images/qr-codes/social/qr-twitter-bw.webp
apps/website/public/images/qr-codes/social/qr-twitter-color.webp
apps/website/public/images/qr-codes/social/qr-youtube-bw.webp
apps/website/public/images/qr-codes/social/qr-youtube-color.webp
apps/website/public/images/qr-codes/team/qr-team-arnold-garcia-bw.webp
apps/website/public/images/qr-codes/team/qr-team-arnold-garcia-color.webp
apps/website/public/images/qr-codes/team/qr-team-ben-woodall-bw.webp
apps/website/public/images/qr-codes/team/qr-team-ben-woodall-color.webp
apps/website/public/images/qr-codes/team/qr-team-derek-parks-bw.webp
apps/website/public/images/qr-codes/team/qr-team-derek-parks-color.webp
apps/website/public/images/qr-codes/team/qr-team-jennifer-tene-bw.webp
apps/website/public/images/qr-codes/team/qr-team-jennifer-tene-color.webp
apps/website/public/images/qr-codes/team/qr-team-jeremy-thamert-bw.webp
apps/website/public/images/qr-codes/team/qr-team-jeremy-thamert-color.webp
apps/website/public/images/qr-codes/team/qr-team-kim-thamert-bw.webp
apps/website/public/images/qr-codes/team/qr-team-kim-thamert-color.webp
apps/website/public/images/qr-codes/team/qr-team-lisa-kandle-bw.webp
apps/website/public/images/qr-codes/team/qr-team-lisa-kandle-color.webp
apps/website/public/images/qr-codes/team/qr-team-matt-ramsey-bw.webp
apps/website/public/images/qr-codes/team/qr-team-matt-ramsey-color.webp
apps/website/public/images/qr-codes/team/qr-team-porter-cline-bw.webp
apps/website/public/images/qr-codes/team/qr-team-porter-cline-color.webp
apps/website/public/images/qr-codes/team/qr-team-reagan-massey-bw.webp
apps/website/public/images/qr-codes/team/qr-team-reagan-massey-color.webp
apps/website/public/images/qr-codes/team/qr-team-steve-mcclary-bw.webp
apps/website/public/images/qr-codes/team/qr-team-steve-mcclary-color.webp
apps/website/public/images/qr-codes/team/qr-team-todd-schoeff-bw.webp
apps/website/public/images/qr-codes/team/qr-team-todd-schoeff-color.webp
apps/website/public/images/qr-downloads/README.md
apps/website/public/images/qr-downloads/contact/qr-contact-bw.png
apps/website/public/images/qr-downloads/contact/qr-contact-bw.webp
apps/website/public/images/qr-downloads/contact/qr-contact-color.png
apps/website/public/images/qr-downloads/contact/qr-contact-color.webp
apps/website/public/images/qr-downloads/contact/qr-email-bw.png
apps/website/public/images/qr-downloads/contact/qr-email-bw.webp
apps/website/public/images/qr-downloads/contact/qr-email-color.png
apps/website/public/images/qr-downloads/contact/qr-email-color.webp
apps/website/public/images/qr-downloads/contact/qr-location-bw.png
apps/website/public/images/qr-downloads/contact/qr-location-bw.webp
apps/website/public/images/qr-downloads/contact/qr-location-color.png
apps/website/public/images/qr-downloads/contact/qr-location-color.webp
apps/website/public/images/qr-downloads/contact/qr-phone-bw.png
apps/website/public/images/qr-downloads/contact/qr-phone-bw.webp
apps/website/public/images/qr-downloads/contact/qr-phone-color.png
apps/website/public/images/qr-downloads/contact/qr-phone-color.webp
apps/website/public/images/qr-downloads/core/qr-about-bw.png
apps/website/public/images/qr-downloads/core/qr-about-bw.webp
apps/website/public/images/qr-downloads/core/qr-about-color.png
apps/website/public/images/qr-downloads/core/qr-about-color.webp
apps/website/public/images/qr-downloads/core/qr-accessibility-bw.png
apps/website/public/images/qr-downloads/core/qr-accessibility-bw.webp
apps/website/public/images/qr-downloads/core/qr-accessibility-color.png
apps/website/public/images/qr-downloads/core/qr-accessibility-color.webp
apps/website/public/images/qr-downloads/core/qr-allies-bw.png
apps/website/public/images/qr-downloads/core/qr-allies-bw.webp
apps/website/public/images/qr-downloads/core/qr-allies-color.png
apps/website/public/images/qr-downloads/core/qr-allies-color.webp
apps/website/public/images/qr-downloads/core/qr-careers-bw.png
apps/website/public/images/qr-downloads/core/qr-careers-bw.webp
apps/website/public/images/qr-downloads/core/qr-careers-color.png
apps/website/public/images/qr-downloads/core/qr-careers-color.webp
apps/website/public/images/qr-downloads/core/qr-faq-bw.png
apps/website/public/images/qr-downloads/core/qr-faq-bw.webp
apps/website/public/images/qr-downloads/core/qr-faq-color.png
apps/website/public/images/qr-downloads/core/qr-faq-color.webp
apps/website/public/images/qr-downloads/core/qr-homepage-bw.png
apps/website/public/images/qr-downloads/core/qr-homepage-bw.webp
apps/website/public/images/qr-downloads/core/qr-homepage-color.png
apps/website/public/images/qr-downloads/core/qr-homepage-color.webp
apps/website/public/images/qr-downloads/core/qr-projects-bw.png
apps/website/public/images/qr-downloads/core/qr-projects-bw.webp
apps/website/public/images/qr-downloads/core/qr-projects-color.png
apps/website/public/images/qr-downloads/core/qr-projects-color.webp
apps/website/public/images/qr-downloads/core/qr-public-sector-bw.png
apps/website/public/images/qr-downloads/core/qr-public-sector-bw.webp
apps/website/public/images/qr-downloads/core/qr-public-sector-color.png
apps/website/public/images/qr-downloads/core/qr-public-sector-color.webp
apps/website/public/images/qr-downloads/core/qr-resources-bw.png
apps/website/public/images/qr-downloads/core/qr-resources-bw.webp
apps/website/public/images/qr-downloads/core/qr-resources-color.png
apps/website/public/images/qr-downloads/core/qr-resources-color.webp
apps/website/public/images/qr-downloads/core/qr-services-bw.png
apps/website/public/images/qr-downloads/core/qr-services-bw.webp
apps/website/public/images/qr-downloads/core/qr-services-color.png
apps/website/public/images/qr-downloads/core/qr-services-color.webp
apps/website/public/images/qr-downloads/core/qr-team-bw.png
apps/website/public/images/qr-downloads/core/qr-team-bw.webp
apps/website/public/images/qr-downloads/core/qr-team-color.png
apps/website/public/images/qr-downloads/core/qr-team-color.webp
apps/website/public/images/qr-downloads/core/qr-testimonials-bw.png
apps/website/public/images/qr-downloads/core/qr-testimonials-bw.webp
apps/website/public/images/qr-downloads/core/qr-testimonials-color.png
apps/website/public/images/qr-downloads/core/qr-testimonials-color.webp
apps/website/public/images/qr-downloads/core/qr-veterans-bw.png
apps/website/public/images/qr-downloads/core/qr-veterans-bw.webp
apps/website/public/images/qr-downloads/core/qr-veterans-color.png
apps/website/public/images/qr-downloads/core/qr-veterans-color.webp
apps/website/public/images/qr-downloads/events/qr-cdn-booth-entry-bw.png
apps/website/public/images/qr-downloads/events/qr-cdn-booth-entry-bw.webp
apps/website/public/images/qr-downloads/events/qr-cdn-booth-entry-color.png
apps/website/public/images/qr-downloads/events/qr-cdn-booth-entry-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-01-company-vehicle-acknowledgement-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-01-company-vehicle-acknowledgement-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-01-company-vehicle-acknowledgement-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-01-company-vehicle-acknowledgement-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-02-handbook-receipt-acknowledgment-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-02-handbook-receipt-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-02-handbook-receipt-acknowledgment-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-02-handbook-receipt-acknowledgment-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-03-safety-policy-acknowledgement-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-03-safety-policy-acknowledgement-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-03-safety-policy-acknowledgement-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-03-safety-policy-acknowledgement-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-04-work-from-home-agreement-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-04-work-from-home-agreement-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-04-work-from-home-agreement-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-04-work-from-home-agreement-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-05-computer-electronics-use-agreement-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-05-computer-electronics-use-agreement-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-05-computer-electronics-use-agreement-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-05-computer-electronics-use-agreement-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-06-employee-photo-release-form-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-06-employee-photo-release-form-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-06-employee-photo-release-form-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-06-employee-photo-release-form-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-07-client-photo-release-form-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-07-client-photo-release-form-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-07-client-photo-release-form-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-07-client-photo-release-form-color.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-08-purchase-approval-general-expense-bw.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-08-purchase-approval-general-expense-bw.webp
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-08-purchase-approval-general-expense-color.png
apps/website/public/images/qr-downloads/handbook-forms/qr-handbook-form-handbook-08-purchase-approval-general-expense-color.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-contact-bw.png
apps/website/public/images/qr-downloads/rfq/qr-traho-contact-bw.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-contact-color.png
apps/website/public/images/qr-downloads/rfq/qr-traho-contact-color.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-overview-bw.png
apps/website/public/images/qr-downloads/rfq/qr-traho-overview-bw.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-overview-color.png
apps/website/public/images/qr-downloads/rfq/qr-traho-overview-color.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-projects-bw.png
apps/website/public/images/qr-downloads/rfq/qr-traho-projects-bw.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-projects-color.png
apps/website/public/images/qr-downloads/rfq/qr-traho-projects-color.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-safety-bw.png
apps/website/public/images/qr-downloads/rfq/qr-traho-safety-bw.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-safety-color.png
apps/website/public/images/qr-downloads/rfq/qr-traho-safety-color.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-services-bw.png
apps/website/public/images/qr-downloads/rfq/qr-traho-services-bw.webp
apps/website/public/images/qr-downloads/rfq/qr-traho-services-color.png
apps/website/public/images/qr-downloads/rfq/qr-traho-services-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-01-injury-free-workplace-plan-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-01-injury-free-workplace-plan-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-01-injury-free-workplace-plan-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-01-injury-free-workplace-plan-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-02-drug-free-work-place-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-02-drug-free-work-place-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-02-drug-free-work-place-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-02-drug-free-work-place-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-03-program-policy-and-requirements-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-03-program-policy-and-requirements-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-03-program-policy-and-requirements-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-03-program-policy-and-requirements-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-04-safety-and-health-orientation-sign-in-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-04-safety-and-health-orientation-sign-in-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-04-safety-and-health-orientation-sign-in-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-04-safety-and-health-orientation-sign-in-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-05-pre-job-safety-planning-job-hazard-analysis-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-05-pre-job-safety-planning-job-hazard-analysis-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-05-pre-job-safety-planning-job-hazard-analysis-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-05-pre-job-safety-planning-job-hazard-analysis-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-06-emergency-response-plan-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-06-emergency-response-plan-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-06-emergency-response-plan-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-06-emergency-response-plan-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-08-incident-near-miss-report-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-08-incident-near-miss-report-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-08-incident-near-miss-report-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-08-incident-near-miss-report-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-09-safety-meeting-toolbox-talk-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-09-safety-meeting-toolbox-talk-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-09-safety-meeting-toolbox-talk-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-09-safety-meeting-toolbox-talk-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-10-ppe-issuance-and-inspection-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-10-ppe-issuance-and-inspection-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-10-ppe-issuance-and-inspection-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-10-ppe-issuance-and-inspection-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-11-fall-protection-pretask-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-11-fall-protection-pretask-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-11-fall-protection-pretask-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-11-fall-protection-pretask-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-12-flammable-combustible-liquids-inspection-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-12-flammable-combustible-liquids-inspection-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-12-flammable-combustible-liquids-inspection-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-12-flammable-combustible-liquids-inspection-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-13-fire-prevention-inspection-checklist-insp-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-13-fire-prevention-inspection-checklist-insp-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-13-fire-prevention-inspection-checklist-insp-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-13-fire-prevention-inspection-checklist-insp-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-14-hot-work-permit-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-14-hot-work-permit-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-14-hot-work-permit-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-14-hot-work-permit-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-15-lockout-tagout-procedure-and-verification-permit-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-15-lockout-tagout-procedure-and-verification-permit-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-15-lockout-tagout-procedure-and-verification-permit-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-15-lockout-tagout-procedure-and-verification-permit-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-16-confined-space-entry-permit-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-16-confined-space-entry-permit-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-16-confined-space-entry-permit-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-16-confined-space-entry-permit-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-17-ladder-inspection-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-17-ladder-inspection-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-17-ladder-inspection-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-17-ladder-inspection-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-18-vehicle-pre-trip-inspection-driver-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-18-vehicle-pre-trip-inspection-driver-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-18-vehicle-pre-trip-inspection-driver-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-18-vehicle-pre-trip-inspection-driver-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-19-equipment-maintenance-and-inspection-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-19-equipment-maintenance-and-inspection-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-19-equipment-maintenance-and-inspection-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-19-equipment-maintenance-and-inspection-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-20-aerial-lift-pre-operation-inspection-and-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-20-aerial-lift-pre-operation-inspection-and-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-20-aerial-lift-pre-operation-inspection-and-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-20-aerial-lift-pre-operation-inspection-and-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-21-crane-suspended-work-platform-permit-and-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-21-crane-suspended-work-platform-permit-and-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-21-crane-suspended-work-platform-permit-and-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-21-crane-suspended-work-platform-permit-and-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-22-scaffold-erection-and-inspection-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-22-scaffold-erection-and-inspection-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-22-scaffold-erection-and-inspection-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-22-scaffold-erection-and-inspection-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-23-industrial-hygiene-exposure-assessment-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-23-industrial-hygiene-exposure-assessment-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-23-industrial-hygiene-exposure-assessment-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-23-industrial-hygiene-exposure-assessment-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-24-hazard-communication-sds-acknowledgment-ack-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-24-hazard-communication-sds-acknowledgment-ack-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-24-hazard-communication-sds-acknowledgment-ack-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-24-hazard-communication-sds-acknowledgment-ack-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-25-heat-illness-prevention-monitoring-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-25-heat-illness-prevention-monitoring-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-25-heat-illness-prevention-monitoring-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-25-heat-illness-prevention-monitoring-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-26-excavation-and-trenching-safety-inspection-and-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-26-excavation-and-trenching-safety-inspection-and-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-26-excavation-and-trenching-safety-inspection-and-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-26-excavation-and-trenching-safety-inspection-and-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-27-equipment-modification-authorization-permit-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-27-equipment-modification-authorization-permit-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-27-equipment-modification-authorization-permit-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-27-equipment-modification-authorization-permit-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-28-housekeeping-inspection-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-28-housekeeping-inspection-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-28-housekeeping-inspection-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-28-housekeeping-inspection-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-29-electrical-safety-pre-task-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-29-electrical-safety-pre-task-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-29-electrical-safety-pre-task-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-29-electrical-safety-pre-task-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-30-signs-signals-and-barricades-inspection-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-30-signs-signals-and-barricades-inspection-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-30-signs-signals-and-barricades-inspection-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-30-signs-signals-and-barricades-inspection-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-33-floor-opening-and-open-sided-surface-inspection-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-33-floor-opening-and-open-sided-surface-inspection-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-33-floor-opening-and-open-sided-surface-inspection-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-33-floor-opening-and-open-sided-surface-inspection-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-34-compressed-gas-cylinder-inspection-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-34-compressed-gas-cylinder-inspection-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-34-compressed-gas-cylinder-inspection-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-34-compressed-gas-cylinder-inspection-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-35-rigging-inspection-and-pre-lift-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-35-rigging-inspection-and-pre-lift-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-35-rigging-inspection-and-pre-lift-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-35-rigging-inspection-and-pre-lift-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-36-hand-and-portable-power-tool-inspection-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-36-hand-and-portable-power-tool-inspection-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-36-hand-and-portable-power-tool-inspection-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-36-hand-and-portable-power-tool-inspection-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-37-concrete-and-masonry-pre-task-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-37-concrete-and-masonry-pre-task-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-37-concrete-and-masonry-pre-task-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-37-concrete-and-masonry-pre-task-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-38-commercial-driver-drug-program-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-38-commercial-driver-drug-program-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-38-commercial-driver-drug-program-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-38-commercial-driver-drug-program-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-39-silica-exposure-control-plan-and-monitoring-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-39-silica-exposure-control-plan-and-monitoring-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-39-silica-exposure-control-plan-and-monitoring-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-39-silica-exposure-control-plan-and-monitoring-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-40-forklift-pit-pre-operation-inspection-and-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-40-forklift-pit-pre-operation-inspection-and-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-40-forklift-pit-pre-operation-inspection-and-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-40-forklift-pit-pre-operation-inspection-and-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-41-distracted-driving-mvr-policy-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-41-distracted-driving-mvr-policy-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-41-distracted-driving-mvr-policy-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-41-distracted-driving-mvr-policy-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-42-cold-weather-operations-safety-checklist-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-42-cold-weather-operations-safety-checklist-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-42-cold-weather-operations-safety-checklist-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-42-cold-weather-operations-safety-checklist-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-43-general-waste-management-disposal-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-43-general-waste-management-disposal-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-43-general-waste-management-disposal-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-43-general-waste-management-disposal-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-44-struck-by-caught-in-pre-task-jha-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-44-struck-by-caught-in-pre-task-jha-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-44-struck-by-caught-in-pre-task-jha-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-44-struck-by-caught-in-pre-task-jha-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-46-subcontractor-safety-compliance-acknowledgment-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-46-subcontractor-safety-compliance-acknowledgment-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-46-subcontractor-safety-compliance-acknowledgment-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-46-subcontractor-safety-compliance-acknowledgment-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-47-insurance-and-coi-verification-checklist-insp-ack-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-47-insurance-and-coi-verification-checklist-insp-ack-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-47-insurance-and-coi-verification-checklist-insp-ack-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-47-insurance-and-coi-verification-checklist-insp-ack-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-48-emergency-response-plan-drill-and-acknowledgment-log-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-48-emergency-response-plan-drill-and-acknowledgment-log-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-48-emergency-response-plan-drill-and-acknowledgment-log-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-48-emergency-response-plan-drill-and-acknowledgment-log-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-49-incident-investigation-root-cause-analysis-report-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-49-incident-investigation-root-cause-analysis-report-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-49-incident-investigation-root-cause-analysis-report-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-49-incident-investigation-root-cause-analysis-report-color.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-50-return-to-work-program-agreement-ack-bw.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-50-return-to-work-program-agreement-ack-bw.webp
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-50-return-to-work-program-agreement-ack-color.png
apps/website/public/images/qr-downloads/safety-forms/qr-safety-form-mish-50-return-to-work-program-agreement-ack-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-01-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-01-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-01-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-01-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-02-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-02-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-02-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-02-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-03-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-03-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-03-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-03-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-04-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-04-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-04-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-04-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-05-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-05-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-05-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-05-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-06-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-06-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-06-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-06-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-07-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-07-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-07-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-07-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-08-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-08-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-08-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-08-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-09-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-09-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-09-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-09-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-10-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-10-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-10-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-10-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-11-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-11-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-11-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-11-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-12-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-12-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-12-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-12-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-13-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-13-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-13-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-13-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-14-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-14-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-14-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-14-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-15-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-15-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-15-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-15-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-16-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-16-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-16-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-16-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-17-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-17-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-17-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-17-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-18-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-18-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-18-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-18-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-19-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-19-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-19-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-19-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-20-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-20-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-20-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-20-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-21-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-21-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-21-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-21-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-22-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-22-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-22-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-22-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-23-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-23-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-23-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-23-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-24-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-24-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-24-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-24-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-25-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-25-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-25-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-25-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-26-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-26-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-26-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-26-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-27-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-27-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-27-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-27-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-28-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-28-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-28-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-28-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-29-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-29-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-29-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-29-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-30-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-30-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-30-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-30-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-31-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-31-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-31-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-31-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-32-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-32-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-32-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-32-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-33-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-33-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-33-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-33-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-34-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-34-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-34-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-34-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-35-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-35-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-35-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-35-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-36-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-36-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-36-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-36-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-37-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-37-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-37-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-37-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-38-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-38-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-38-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-38-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-39-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-39-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-39-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-39-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-40-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-40-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-40-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-40-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-41-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-41-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-41-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-41-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-42-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-42-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-42-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-42-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-43-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-43-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-43-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-43-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-44-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-44-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-44-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-44-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-45-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-45-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-45-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-45-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-46-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-46-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-46-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-46-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-47-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-47-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-47-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-47-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-48-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-48-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-48-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-48-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-49-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-49-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-49-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-49-color.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-50-bw.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-50-bw.webp
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-50-color.png
apps/website/public/images/qr-downloads/safety-sections/qr-safety-section-50-color.webp
apps/website/public/images/qr-downloads/safety/qr-employee-handbook-bw.png
apps/website/public/images/qr-downloads/safety/qr-employee-handbook-bw.webp
apps/website/public/images/qr-downloads/safety/qr-employee-handbook-color.png
apps/website/public/images/qr-downloads/safety/qr-employee-handbook-color.webp
apps/website/public/images/qr-downloads/safety/qr-hub-bw.png
apps/website/public/images/qr-downloads/safety/qr-hub-bw.webp
apps/website/public/images/qr-downloads/safety/qr-hub-color.png
apps/website/public/images/qr-downloads/safety/qr-hub-color.webp
apps/website/public/images/qr-downloads/safety/qr-safety-dashboard-bw.png
apps/website/public/images/qr-downloads/safety/qr-safety-dashboard-bw.webp
apps/website/public/images/qr-downloads/safety/qr-safety-dashboard-color.png
apps/website/public/images/qr-downloads/safety/qr-safety-dashboard-color.webp
apps/website/public/images/qr-downloads/safety/qr-safety-incident-report-bw.png
apps/website/public/images/qr-downloads/safety/qr-safety-incident-report-bw.webp
apps/website/public/images/qr-downloads/safety/qr-safety-incident-report-color.png
apps/website/public/images/qr-downloads/safety/qr-safety-incident-report-color.webp
apps/website/public/images/qr-downloads/safety/qr-safety-intake-bw.png
apps/website/public/images/qr-downloads/safety/qr-safety-intake-bw.webp
apps/website/public/images/qr-downloads/safety/qr-safety-intake-color.png
apps/website/public/images/qr-downloads/safety/qr-safety-intake-color.webp
apps/website/public/images/qr-downloads/safety/qr-safety-manual-bw.png
apps/website/public/images/qr-downloads/safety/qr-safety-manual-bw.webp
apps/website/public/images/qr-downloads/safety/qr-safety-manual-color.png
apps/website/public/images/qr-downloads/safety/qr-safety-manual-color.webp
apps/website/public/images/qr-downloads/safety/qr-safety-program-bw.png
apps/website/public/images/qr-downloads/safety/qr-safety-program-bw.webp
apps/website/public/images/qr-downloads/safety/qr-safety-program-color.png
apps/website/public/images/qr-downloads/safety/qr-safety-program-color.webp
apps/website/public/images/qr-downloads/social/qr-facebook-bw.png
apps/website/public/images/qr-downloads/social/qr-facebook-bw.webp
apps/website/public/images/qr-downloads/social/qr-facebook-color.png
apps/website/public/images/qr-downloads/social/qr-facebook-color.webp
apps/website/public/images/qr-downloads/social/qr-instagram-bw.png
apps/website/public/images/qr-downloads/social/qr-instagram-bw.webp
apps/website/public/images/qr-downloads/social/qr-instagram-color.png
apps/website/public/images/qr-downloads/social/qr-instagram-color.webp
apps/website/public/images/qr-downloads/social/qr-linkedin-bw.png
apps/website/public/images/qr-downloads/social/qr-linkedin-bw.webp
apps/website/public/images/qr-downloads/social/qr-linkedin-color.png
apps/website/public/images/qr-downloads/social/qr-linkedin-color.webp
apps/website/public/images/qr-downloads/social/qr-twitter-bw.png
apps/website/public/images/qr-downloads/social/qr-twitter-bw.webp
apps/website/public/images/qr-downloads/social/qr-twitter-color.png
apps/website/public/images/qr-downloads/social/qr-twitter-color.webp
apps/website/public/images/qr-downloads/social/qr-youtube-bw.png
apps/website/public/images/qr-downloads/social/qr-youtube-bw.webp
apps/website/public/images/qr-downloads/social/qr-youtube-color.png
apps/website/public/images/qr-downloads/social/qr-youtube-color.webp
apps/website/public/images/qr-downloads/team/qr-team-arnold-garcia-bw.png
apps/website/public/images/qr-downloads/team/qr-team-arnold-garcia-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-arnold-garcia-color.png
apps/website/public/images/qr-downloads/team/qr-team-arnold-garcia-color.webp
apps/website/public/images/qr-downloads/team/qr-team-ben-woodall-bw.png
apps/website/public/images/qr-downloads/team/qr-team-ben-woodall-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-ben-woodall-color.png
apps/website/public/images/qr-downloads/team/qr-team-ben-woodall-color.webp
apps/website/public/images/qr-downloads/team/qr-team-derek-parks-bw.png
apps/website/public/images/qr-downloads/team/qr-team-derek-parks-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-derek-parks-color.png
apps/website/public/images/qr-downloads/team/qr-team-derek-parks-color.webp
apps/website/public/images/qr-downloads/team/qr-team-jennifer-tene-bw.png
apps/website/public/images/qr-downloads/team/qr-team-jennifer-tene-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-jennifer-tene-color.png
apps/website/public/images/qr-downloads/team/qr-team-jennifer-tene-color.webp
apps/website/public/images/qr-downloads/team/qr-team-jeremy-thamert-bw.png
apps/website/public/images/qr-downloads/team/qr-team-jeremy-thamert-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-jeremy-thamert-color.png
apps/website/public/images/qr-downloads/team/qr-team-jeremy-thamert-color.webp
apps/website/public/images/qr-downloads/team/qr-team-kim-thamert-bw.png
apps/website/public/images/qr-downloads/team/qr-team-kim-thamert-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-kim-thamert-color.png
apps/website/public/images/qr-downloads/team/qr-team-kim-thamert-color.webp
apps/website/public/images/qr-downloads/team/qr-team-lisa-kandle-bw.png
apps/website/public/images/qr-downloads/team/qr-team-lisa-kandle-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-lisa-kandle-color.png
apps/website/public/images/qr-downloads/team/qr-team-lisa-kandle-color.webp
apps/website/public/images/qr-downloads/team/qr-team-matt-ramsey-bw.png
apps/website/public/images/qr-downloads/team/qr-team-matt-ramsey-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-matt-ramsey-color.png
apps/website/public/images/qr-downloads/team/qr-team-matt-ramsey-color.webp
apps/website/public/images/qr-downloads/team/qr-team-porter-cline-bw.png
apps/website/public/images/qr-downloads/team/qr-team-porter-cline-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-porter-cline-color.png
apps/website/public/images/qr-downloads/team/qr-team-porter-cline-color.webp
apps/website/public/images/qr-downloads/team/qr-team-reagan-massey-bw.png
apps/website/public/images/qr-downloads/team/qr-team-reagan-massey-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-reagan-massey-color.png
apps/website/public/images/qr-downloads/team/qr-team-reagan-massey-color.webp
apps/website/public/images/qr-downloads/team/qr-team-steve-mcclary-bw.png
apps/website/public/images/qr-downloads/team/qr-team-steve-mcclary-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-steve-mcclary-color.png
apps/website/public/images/qr-downloads/team/qr-team-steve-mcclary-color.webp
apps/website/public/images/qr-downloads/team/qr-team-todd-schoeff-bw.png
apps/website/public/images/qr-downloads/team/qr-team-todd-schoeff-bw.webp
apps/website/public/images/qr-downloads/team/qr-team-todd-schoeff-color.png
apps/website/public/images/qr-downloads/team/qr-team-todd-schoeff-color.webp
apps/website/public/images/safety/README.md
apps/website/public/images/social/README.md
apps/website/public/images/team/README.md
apps/website/public/images/vendors/mckinney-glass-logo.webp
apps/website/public/videos/hero-commercials/mh-construction-radio-ad-jeremy-thamert.webm
apps/website/public/videos/hero-commercials/poster-mh-construction-radio-ad-jeremy-thamert.jpg
apps/website/scripts/build-opennext-resilient.sh
apps/website/scripts/build-qr-download-bundle.js
apps/website/scripts/lib/load-cloudflare-r2-env.sh
apps/website/scripts/r2-publish-qr-codes.sh
apps/website/scripts/validation/check-cloudflare-phase1.sh
apps/website/scripts/validation/check-no-legacy-pdf-output.sh
apps/website/scripts/validation/check-r2-publish-env.sh
apps/website/scripts/validation/check-revision-congruency.js
apps/website/scripts/validation/report-spanish-coverage.js
apps/website/scripts/validation/sweep-spanish-render.sh
apps/website/src/components/shared-sections/JeremyAuthorityLinksStrip.tsx
apps/website/src/lib/media/hero-commercials.ts
apps/website/src/test-utils/fetch.ts
apps/website/src/test-utils/storage.ts
apps/website/tmp/spanish-coverage-report.md
docs/archive/2026-07/branding-validation-optimization-status.md
docs/archive/2026-07/codebase-analysis.md
docs/archive/2026-07/large-component-refactoring.md
docs/archive/2026-07/markdown-consolidation-ledger-2026-07-10.md
docs/archive/2026-07/performance-optimization-strategy.md
docs/branding/standards/color-quick-reference.md
docs/branding/standards/index.md
docs/branding/strategy/construction-terminology-glossary.md
docs/branding/strategy/index.md
docs/deployment/cloudflare-dashboard-fast-path.md
docs/deployment/cloudflare-security-hardening-runbook.md
docs/development/standards/consistency-implementation-checklists.md
docs/technical/seo/index.md
docs/technical/seo/section-ordering-reference.md
docs/technical/services-integration-roadmap.md
documents/content/mhc-employee-handbook-2026/sections/01-introduction-company-overview.html
documents/content/mhc-employee-handbook-2026/sections/02-employment-classifications-schedules.html
documents/content/mhc-employee-handbook-2026/sections/03-compensation-benefits.html
documents/content/mhc-employee-handbook-2026/sections/04-code-of-conduct.html
documents/content/mhc-employee-handbook-2026/sections/05-leave-time-off.html
documents/content/mhc-employee-handbook-2026/sections/06-health-safety-security.html
documents/content/mhc-employee-handbook-2026/sections/07-technology-data-use.html
documents/content/mhc-employee-handbook-2026/sections/08-disciplinary-action-separation.html
documents/content/mhc-employee-handbook-2026/sections/09-workplace-respect-anti-harassment.html
documents/content/project-stories/auto-lot-nw.json
documents/content/project-stories/darigold-pasco-production-facility.json
documents/content/project-stories/franklin-county-coroners-office-morgue.json
documents/content/project-stories/lcsnw-tri-cities.json
documents/content/project-stories/volm-companies-remodel.json
documents/downloads/README.md
documents/forms/README.md
documents/forms/handbook/README.md
documents/forms/handbook/form-handbook-ce-computer-electronics-use-agreement.json
documents/forms/handbook/form-handbook-ce-computer-electronics-use-agreement.md
documents/forms/handbook/form-handbook-cp-client-photo-release-form.json
documents/forms/handbook/form-handbook-cp-client-photo-release-form.md
documents/forms/handbook/form-handbook-cv-company-vehicle-acknowledgement.json
documents/forms/handbook/form-handbook-cv-company-vehicle-acknowledgement.md
documents/forms/handbook/form-handbook-ep-employee-photo-release-form.json
documents/forms/handbook/form-handbook-ep-employee-photo-release-form.md
documents/forms/handbook/form-handbook-ge-purchase-approval-general-expense.json
documents/forms/handbook/form-handbook-ge-purchase-approval-general-expense.md
documents/forms/handbook/form-handbook-ra-handbook-receipt-acknowledgment.json
documents/forms/handbook/form-handbook-ra-handbook-receipt-acknowledgment.md
documents/forms/handbook/form-handbook-sp-safety-policy-acknowledgement.json
documents/forms/handbook/form-handbook-sp-safety-policy-acknowledgement.md
documents/forms/handbook/form-handbook-wh-work-from-home-agreement.json
documents/forms/handbook/form-handbook-wh-work-from-home-agreement.md
documents/forms/mish/README.md
documents/forms/mish/form-mish-01-injury-free-workplace-plan-acknowledgment.json
documents/forms/mish/form-mish-01-injury-free-workplace-plan-acknowledgment.md
documents/forms/mish/form-mish-02-drug-free-work-place-acknowledgment.json
documents/forms/mish/form-mish-02-drug-free-work-place-acknowledgment.md
documents/forms/mish/form-mish-03-program-policy-and-requirements-acknowledgment.json
documents/forms/mish/form-mish-03-program-policy-and-requirements-acknowledgment.md
documents/forms/mish/form-mish-04-safety-and-health-orientation-sign-in-log.json
documents/forms/mish/form-mish-04-safety-and-health-orientation-sign-in-log.md
documents/forms/mish/form-mish-05-pre-job-safety-planning-job-hazard-analysis.json
documents/forms/mish/form-mish-05-pre-job-safety-planning-job-hazard-analysis.md
documents/forms/mish/form-mish-06-emergency-response-plan-acknowledgment.json
documents/forms/mish/form-mish-06-emergency-response-plan-acknowledgment.md
documents/forms/mish/form-mish-08-incident-near-miss-report.json
documents/forms/mish/form-mish-08-incident-near-miss-report.md
documents/forms/mish/form-mish-09-safety-meeting-toolbox-talk-log.json
documents/forms/mish/form-mish-09-safety-meeting-toolbox-talk-log.md
documents/forms/mish/form-mish-10-ppe-issuance-and-inspection-log.json
documents/forms/mish/form-mish-10-ppe-issuance-and-inspection-log.md
documents/forms/mish/form-mish-11-fall-protection-pretask-jha.json
documents/forms/mish/form-mish-11-fall-protection-pretask-jha.md
documents/forms/mish/form-mish-12-flammable-combustible-liquids-inspection-checklist.json
documents/forms/mish/form-mish-12-flammable-combustible-liquids-inspection-checklist.md
documents/forms/mish/form-mish-13-fire-prevention-inspection-checklist-insp.json
documents/forms/mish/form-mish-13-fire-prevention-inspection-checklist-insp.md
documents/forms/mish/form-mish-14-hot-work-permit.json
documents/forms/mish/form-mish-14-hot-work-permit.md
documents/forms/mish/form-mish-15-lockout-tagout-procedure-and-verification-permit.json
documents/forms/mish/form-mish-15-lockout-tagout-procedure-and-verification-permit.md
documents/forms/mish/form-mish-16-confined-space-entry-permit.json
documents/forms/mish/form-mish-16-confined-space-entry-permit.md
documents/forms/mish/form-mish-17-ladder-inspection-checklist.json
documents/forms/mish/form-mish-17-ladder-inspection-checklist.md
documents/forms/mish/form-mish-18-vehicle-pre-trip-inspection-driver-log.json
documents/forms/mish/form-mish-18-vehicle-pre-trip-inspection-driver-log.md
documents/forms/mish/form-mish-19-equipment-maintenance-and-inspection-log.json
documents/forms/mish/form-mish-19-equipment-maintenance-and-inspection-log.md
documents/forms/mish/form-mish-20-aerial-lift-pre-operation-inspection-and-jha.json
documents/forms/mish/form-mish-20-aerial-lift-pre-operation-inspection-and-jha.md
documents/forms/mish/form-mish-21-crane-suspended-work-platform-permit-and-jha.json
documents/forms/mish/form-mish-21-crane-suspended-work-platform-permit-and-jha.md
documents/forms/mish/form-mish-22-scaffold-erection-and-inspection-checklist.json
documents/forms/mish/form-mish-22-scaffold-erection-and-inspection-checklist.md
documents/forms/mish/form-mish-23-industrial-hygiene-exposure-assessment-log.json
documents/forms/mish/form-mish-23-industrial-hygiene-exposure-assessment-log.md
documents/forms/mish/form-mish-24-hazard-communication-sds-acknowledgment-ack.json
documents/forms/mish/form-mish-24-hazard-communication-sds-acknowledgment-ack.md
documents/forms/mish/form-mish-25-heat-illness-prevention-monitoring-log.json
documents/forms/mish/form-mish-25-heat-illness-prevention-monitoring-log.md
documents/forms/mish/form-mish-26-excavation-and-trenching-safety-inspection-and-jha.json
documents/forms/mish/form-mish-26-excavation-and-trenching-safety-inspection-and-jha.md
documents/forms/mish/form-mish-27-equipment-modification-authorization-permit.json
documents/forms/mish/form-mish-27-equipment-modification-authorization-permit.md
documents/forms/mish/form-mish-28-housekeeping-inspection-checklist.json
documents/forms/mish/form-mish-28-housekeeping-inspection-checklist.md
documents/forms/mish/form-mish-29-electrical-safety-pre-task-jha.json
documents/forms/mish/form-mish-29-electrical-safety-pre-task-jha.md
documents/forms/mish/form-mish-30-signs-signals-and-barricades-inspection-checklist.json
documents/forms/mish/form-mish-30-signs-signals-and-barricades-inspection-checklist.md
documents/forms/mish/form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log.json
documents/forms/mish/form-mish-32-respiratory-protection-fit-test-and-issuance-record-ack-log.md
documents/forms/mish/form-mish-33-floor-opening-and-open-sided-surface-inspection.json
documents/forms/mish/form-mish-33-floor-opening-and-open-sided-surface-inspection.md
documents/forms/mish/form-mish-34-compressed-gas-cylinder-inspection-log.json
documents/forms/mish/form-mish-34-compressed-gas-cylinder-inspection-log.md
documents/forms/mish/form-mish-35-rigging-inspection-and-pre-lift-jha.json
documents/forms/mish/form-mish-35-rigging-inspection-and-pre-lift-jha.md
documents/forms/mish/form-mish-36-hand-and-portable-power-tool-inspection-checklist.json
documents/forms/mish/form-mish-36-hand-and-portable-power-tool-inspection-checklist.md
documents/forms/mish/form-mish-37-concrete-and-masonry-pre-task-jha.json
documents/forms/mish/form-mish-37-concrete-and-masonry-pre-task-jha.md
documents/forms/mish/form-mish-38-commercial-driver-drug-program-acknowledgment.json
documents/forms/mish/form-mish-38-commercial-driver-drug-program-acknowledgment.md
documents/forms/mish/form-mish-39-silica-exposure-control-plan-and-monitoring-log.json
documents/forms/mish/form-mish-39-silica-exposure-control-plan-and-monitoring-log.md
documents/forms/mish/form-mish-40-forklift-pit-pre-operation-inspection-and-jha.json
documents/forms/mish/form-mish-40-forklift-pit-pre-operation-inspection-and-jha.md
documents/forms/mish/form-mish-41-distracted-driving-mvr-policy-acknowledgment.json
documents/forms/mish/form-mish-41-distracted-driving-mvr-policy-acknowledgment.md
documents/forms/mish/form-mish-42-cold-weather-operations-safety-checklist.json
documents/forms/mish/form-mish-42-cold-weather-operations-safety-checklist.md
documents/forms/mish/form-mish-43-general-waste-management-disposal-log.json
documents/forms/mish/form-mish-43-general-waste-management-disposal-log.md
documents/forms/mish/form-mish-44-struck-by-caught-in-pre-task-jha.json
documents/forms/mish/form-mish-44-struck-by-caught-in-pre-task-jha.md
documents/forms/mish/form-mish-46-subcontractor-safety-compliance-acknowledgment.json
documents/forms/mish/form-mish-46-subcontractor-safety-compliance-acknowledgment.md
documents/forms/mish/form-mish-47-insurance-and-coi-verification-checklist-insp-ack.json
documents/forms/mish/form-mish-47-insurance-and-coi-verification-checklist-insp-ack.md
documents/forms/mish/form-mish-48-emergency-response-plan-drill-and-acknowledgment-log.json
documents/forms/mish/form-mish-48-emergency-response-plan-drill-and-acknowledgment-log.md
documents/forms/mish/form-mish-49-incident-investigation-root-cause-analysis-report.json
documents/forms/mish/form-mish-49-incident-investigation-root-cause-analysis-report.md
documents/forms/mish/form-mish-50-return-to-work-program-agreement-ack.json
documents/forms/mish/form-mish-50-return-to-work-program-agreement-ack.md
documents/input/README.md
documents/input/project-stories/alverez-auto-lot/2026-07_auto-lot-nw_story_v1.docx
documents/input/project-stories/darigold-processing-plant/2026-07_darigold-pasco-production-facility_story_v1.docx
documents/input/project-stories/franklin-county-morgue/2026-07_franklin-county-coroners-office-morgue_story_v1.docx
documents/input/project-stories/lcsnw-tri-cities/lcsnw-tri-cities-2518.docx
documents/input/project-stories/volm-companies/2026-07_volm-companies-remodel_story_v1.docx
documents/input/seo/Jeremy_Thamert_Website_Biography_and_References.docx
documents/input/seo/jeremy-thamert/README.md
documents/manuals/README.md
documents/manuals/employee-handbook-toc.html
documents/scripts/build-download-bundle.mjs
documents/scripts/optimize-pdfs.mjs
packages/shared/__mocks__/@opennextjs/cloudflare.js
packages/shared/jest.config.js
packages/shared/src/lib/icons/index.ts
packages/shared/src/lib/utils/__mocks__/logger.ts
scripts/docs/check-new-doc-index-links.sh
scripts/docs/clean-stale-pdf-output.sh
scripts/duplicates/sync-app-mirrors.sh
scripts/legacy-audits/README.md
scripts/markdown/run-markdownlint.sh
scripts/migrations/sync-from-root.sh
scripts/monitoring/send-weekly-platform-digest.mjs
scripts/validation/check-doc-stack-congruency.mjs
scripts/validation/check-manual-template-congruence.mjs
scripts/validation/check-mendl-font-policy.mjs
scripts/wrappers/sync-from-website.sh
tmp/form-qa/form-mish-04-safety-and-health-orientation-sign-in-log-2.png
tmp/form-qa/form-mish-04-safety-and-health-orientation-sign-in-log-3.png
tmp/form-qa/form-mish-10-ppe-issuance-and-inspection-log-2.png
tmp/form-qa/form-mish-10-ppe-issuance-and-inspection-log-3.png
tmp/form-qa/form-mish-10-ppe-issuance-and-inspection-log-4.png
tmp/form-qa/form-mish-14-hot-work-permit-2.png
tmp/form-qa/form-mish-14-hot-work-permit-3.png
tmp/form-qa/form-mish-14-hot-work-permit-4.png
tmp/form-qa/form-mish-20-aerial-lift-pre-operation-inspection-and-jha-2.png
tmp/form-qa/form-mish-20-aerial-lift-pre-operation-inspection-and-jha-3.png
tmp/form-qa/form-mish-20-aerial-lift-pre-operation-inspection-and-jha-4.png
tmp/form-qa/form-mish-26-check-3.png
tmp/form-qa/form-mish-26-excavation-and-trenching-safety-inspection-and-jha-2.png
tmp/form-qa/form-mish-26-excavation-and-trenching-safety-inspection-and-jha-3.png
tmp/form-qa/form-mish-26-excavation-and-trenching-safety-inspection-and-jha-4.png
tmp/form-qa/form-mish-35-rigging-inspection-and-pre-lift-jha-2.png
tmp/form-qa/form-mish-35-rigging-inspection-and-pre-lift-jha-3.png
tmp/form-qa/form-mish-35-rigging-inspection-and-pre-lift-jha-4.png
```

### Modified files (M)

```text
.github/AGENT_INVOCATION_MATRIX.md
.github/agents/brand-comms-captain.agent.md
.github/agents/documentation-drift-officer.agent.md
.github/agents/form-development-officer.agent.md
.github/agents/forms-logistics-officer.agent.md
.github/agents/manual-development-standards-officer.agent.md
.github/agents/manual-structure-officer.agent.md
.github/agents/master-at-arms.agent.md
.github/agents/performance-budget-officer.agent.md
.github/agents/qr-code-officer.agent.md
.github/agents/safety-pdf-editor.agent.md
.github/agents/team-roster-officer.agent.md
.github/agents/video-upload-officer.agent.md
.github/workflows/branding-compliance.yml
.github/workflows/build-benchmark.yml
.github/workflows/ci-cd.yml
.github/workflows/dependency-review.yml
.github/workflows/deploy-pipeline-alerts.yml
.github/workflows/generate-pdfs.yml
.github/workflows/lighthouse-weekly.yml
.github/workflows/markdown-quality.yml
.github/workflows/nightly-coverage.yml
.github/workflows/optimize-media.yml
.github/workflows/pr-agent-compliance-reminder.yml
.github/workflows/safety-smoke.yml
.github/workflows/security-nightly.yml
.gitignore
.husky/pre-commit
.husky/pre-push
.markdownlintignore
.prettierignore
BRANDING_OPTIMIZATION_MASTER_STATUS.md
CHANGELOG.md
README.md
apps/dashboard/documents/brands/mhc.json
apps/dashboard/package.json
apps/dashboard/postcss.config.js
apps/dashboard/src/__tests__/api/security.test.ts
apps/dashboard/src/__tests__/api/testimonials-publish.test.ts
apps/dashboard/src/__tests__/helpers/api-test-utils.ts
apps/dashboard/src/app/__tests__/hub-routing.test.tsx
apps/dashboard/src/app/api/auth/admin-login/route.ts
apps/dashboard/src/app/api/auth/field-login/route.ts
apps/dashboard/src/app/api/auth/hub-login/route.ts
apps/dashboard/src/app/api/auth/logout/route.ts
apps/dashboard/src/app/api/functions/[functionName]/route.ts
apps/dashboard/src/app/api/safety/forms/route.ts
apps/dashboard/src/app/api/safety/intake/route.ts
apps/dashboard/src/app/api/security/__tests__/status-extended.test.ts
apps/dashboard/src/app/api/security/events/route.ts
apps/dashboard/src/app/api/security/status/route.ts
apps/dashboard/src/app/dashboard/BrandingTab.tsx
apps/dashboard/src/app/dashboard/DashboardClientPage.tsx
apps/dashboard/src/app/dashboard/RfqTab.tsx
apps/dashboard/src/app/dashboard/SafetyTab.tsx
apps/dashboard/src/app/dashboard/TeamQuestionnaireTab.tsx
apps/dashboard/src/app/dashboard/layout.tsx
apps/dashboard/src/app/globals.css
apps/dashboard/src/app/hub/page.tsx
apps/dashboard/src/app/layout.tsx
apps/dashboard/src/components/hub/ProfileReviewClient.tsx
apps/dashboard/src/components/hub/TeamProfileForm.tsx
apps/dashboard/src/components/icons/__tests__/AmericanFlag.test.tsx
apps/dashboard/src/components/icons/__tests__/MaterialIcon.test.tsx
apps/dashboard/src/hooks/__tests__/useAdminTabData.test.tsx
apps/dashboard/src/hooks/__tests__/useHubAdminAuth.test.tsx
apps/dashboard/src/lib/admin-auth/__tests__/api.test.ts
apps/dashboard/src/lib/admin-auth/api.ts
apps/dashboard/src/lib/dashboard/document-branding.ts
apps/dashboard/src/lib/dashboard/drivers.ts
apps/dashboard/src/lib/dashboard/leads.ts
apps/dashboard/src/lib/dashboard/rfq.ts
apps/dashboard/src/lib/data/documents.ts
apps/dashboard/src/lib/data/team/jeremy-thamert.json
apps/dashboard/src/lib/data/team/matt-ramsey.json
apps/dashboard/src/lib/data/team/reagan-massey.json
apps/dashboard/src/lib/data/team/steve-mcclary.json
apps/dashboard/src/lib/data/testimonials.ts
apps/dashboard/src/lib/data/vintage-team.ts
apps/dashboard/tailwind.config.ts
apps/dashboard/test/mocks/opennext-cloudflare.js
apps/dashboard/tsconfig.json
apps/website/.prettierignore
apps/website/config/hero-commercials.json
apps/website/jest.config.js
apps/website/jest.setup.js
apps/website/middleware.ts
apps/website/next.config.js
apps/website/open-next.config.ts
apps/website/package.json
apps/website/postcss.config.js
apps/website/public/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp
apps/website/public/images/og/faq/general-information.webp
apps/website/public/images/og/faq/safety-quality.webp
apps/website/public/images/og/faq/working-together.webp
apps/website/public/images/qr-codes/README.md
apps/website/public/images/qr-codes/qr-codes-manifest.json
apps/website/public/images/qr-codes/safety/qr-employee-handbook-bw.png
apps/website/public/images/qr-codes/safety/qr-employee-handbook-color.png
apps/website/public/sw.js
apps/website/scripts/brand-lint.sh
apps/website/scripts/check-translations.js
apps/website/scripts/generate-qr-codes.js
apps/website/scripts/mh-scripts-guide.md
apps/website/scripts/optimization/optimize-videos.js
apps/website/scripts/r2-publish-employee-handbook.sh
apps/website/scripts/r2-publish-forms.sh
apps/website/scripts/r2-publish-safety-pdfs.sh
apps/website/scripts/r2-seed-pdfs.sh
apps/website/scripts/resend-all-submissions.mjs
apps/website/scripts/validation/__tests__/check-website-congruency.test.js
apps/website/scripts/validation/check-brand-congruency-sync.js
apps/website/scripts/validation/check-branding-locale-parity.js
apps/website/scripts/validation/check-core-values-slogans.js
apps/website/scripts/validation/check-hero-commercial-guardrails.js
apps/website/scripts/validation/check-hero-guardrails.js
apps/website/scripts/validation/check-jeremy-route-metadata.js
apps/website/scripts/validation/check-jeremy-seo-signals.js
apps/website/scripts/validation/check-public-asset-budgets.js
apps/website/scripts/validation/check-secrets.sh
apps/website/scripts/validation/check-website-congruency.js
apps/website/scripts/validation/verify-published-docs-urls.sh
apps/website/src/__tests__/api/chat.test.ts
apps/website/src/__tests__/integration/contact-form.test.ts
apps/website/src/app/__tests__/branding-guardrails.test.ts
apps/website/src/app/__tests__/operations-hub-workflows.test.tsx
apps/website/src/app/__tests__/pages-smoke.test.tsx
apps/website/src/app/__tests__/safety-navigation-contracts.test.tsx
apps/website/src/app/__tests__/tab-title-sitewide-contract.test.ts
apps/website/src/app/about/details/page.tsx
apps/website/src/app/about/page.tsx
apps/website/src/app/accessibility/page.tsx
apps/website/src/app/allies/page.tsx
apps/website/src/app/api/chat/route.ts
apps/website/src/app/api/contact/route.ts
apps/website/src/app/api/newsletter/route.ts
apps/website/src/app/api/track-phone-call/route.ts
apps/website/src/app/careers/print/PrintableApplicationClient.tsx
apps/website/src/app/contact/ContactPageClient.tsx
apps/website/src/app/contact/page.tsx
apps/website/src/app/docs/[...path]/__tests__/route.test.ts
apps/website/src/app/docs/[...path]/route.ts
apps/website/src/app/employee-handbook/__tests__/page.test.tsx
apps/website/src/app/employee-handbook/page.tsx
apps/website/src/app/events/page.tsx
apps/website/src/app/faq/[category]/page.tsx
apps/website/src/app/faq/page.tsx
apps/website/src/app/globals.css
apps/website/src/app/jeremy-thamert/page.tsx
apps/website/src/app/layout.tsx
apps/website/src/app/locations/page.tsx
apps/website/src/app/media/[...path]/route.ts
apps/website/src/app/offline/__tests__/page.test.tsx
apps/website/src/app/offline/page.tsx
apps/website/src/app/page.tsx
apps/website/src/app/privacy/page.tsx
apps/website/src/app/projects/ProjectsPageClient.tsx
apps/website/src/app/projects/[slug]/page.tsx
apps/website/src/app/projects/__tests__/useProjectsSearch.test.ts
apps/website/src/app/projects/components/ProjectCard.tsx
apps/website/src/app/projects/components/ProjectsFilterSection.tsx
apps/website/src/app/projects/components/ProjectsGridSection.tsx
apps/website/src/app/projects/components/TestimonialsSection.tsx
apps/website/src/app/projects/components/WhyChooseSection.tsx
apps/website/src/app/projects/components/__tests__/projects-components.test.tsx
apps/website/src/app/projects/components/projectsData.ts
apps/website/src/app/projects/components/useProjectsSearch.ts
apps/website/src/app/public-sector/PublicSectorFullPage.tsx
apps/website/src/app/public-sector/page.tsx
apps/website/src/app/public-sector/tri-state-government-construction/page.tsx
apps/website/src/app/public-sector/veteran-led-compliance/page.tsx
apps/website/src/app/qr-codes/page.tsx
apps/website/src/app/resources/page.tsx
apps/website/src/app/resources/safety-manual/[cluster]/page.tsx
apps/website/src/app/resources/safety-manual/__tests__/page.test.ts
apps/website/src/app/resources/safety-manual/contents/page.tsx
apps/website/src/app/resources/safety-manual/forms/page.tsx
apps/website/src/app/resources/safety-manual/page.tsx
apps/website/src/app/resources/safety-program/page.tsx
apps/website/src/app/safety/incident-report/page.tsx
apps/website/src/app/safety/intake/page.tsx
apps/website/src/app/safety/page.tsx
apps/website/src/app/safety/print/[id]/PrintPageClient.tsx
apps/website/src/app/services/page.tsx
apps/website/src/app/sitemap.ts
apps/website/src/app/team/page.tsx
apps/website/src/app/terms/__tests__/page.test.tsx
apps/website/src/app/terms/page.tsx
apps/website/src/app/testimonials/__tests__/page.test.tsx
apps/website/src/app/testimonials/page.tsx
apps/website/src/app/veterans/page.tsx
apps/website/src/components/__tests__/remaining-components.test.tsx
apps/website/src/components/about/AboutHero.tsx
apps/website/src/components/about/LeadershipTeam.tsx
apps/website/src/components/about/PartnershipPhilosophy.tsx
apps/website/src/components/about/ValuesShowcase.tsx
apps/website/src/components/about/__tests__/ValuesShowcase.test.tsx
apps/website/src/components/analytics/index.ts
apps/website/src/components/animations/FramerMotionComponents.tsx
apps/website/src/components/animations/ScrollReveal.tsx
apps/website/src/components/animations/__tests__/animations.test.tsx
apps/website/src/components/chatbot/ChatWidget.tsx
apps/website/src/components/chatbot/ChatWidgetLazy.tsx
apps/website/src/components/chatbot/__tests__/ChatWidget.test.tsx
apps/website/src/components/events/EventsHero.tsx
apps/website/src/components/home/CoreValuesSection.tsx
apps/website/src/components/home/HeroSection.tsx
apps/website/src/components/home/HeroSectionClient.tsx
apps/website/src/components/home/ServicesShowcase.tsx
apps/website/src/components/home/ServicesShowcaseDeferred.tsx
apps/website/src/components/home/TestimonialsSectionDeferred.tsx
apps/website/src/components/home/TimelineDeferred.tsx
apps/website/src/components/home/WhyPartnerSection.tsx
apps/website/src/components/home/__tests__/ServicesShowcase.test.tsx
apps/website/src/components/home/__tests__/WhyPartnerSection.test.tsx
apps/website/src/components/icons/__tests__/AmericanFlag.test.tsx
apps/website/src/components/icons/index.ts
apps/website/src/components/layout/AppShell.tsx
apps/website/src/components/layout/Footer.tsx
apps/website/src/components/layout/SemiquincentennialBanner.tsx
apps/website/src/components/layout/UnderConstruction.tsx
apps/website/src/components/layout/__tests__/Footer.test.tsx
apps/website/src/components/layout/__tests__/SemiquincentennialBanner.test.tsx
apps/website/src/components/layout/__tests__/navigation-footer-link-contract.test.tsx
apps/website/src/components/legal/LegalPageLayout.tsx
apps/website/src/components/locations/LocationPageContent.tsx
apps/website/src/components/locations/LocationsHero.tsx
apps/website/src/components/navigation/PageNavigation.tsx
apps/website/src/components/navigation/navigationConfigs.ts
apps/website/src/components/pwa/PWAInstallCTA.tsx
apps/website/src/components/pwa/__tests__/DownloadGate-OfflineIndicator.test.tsx
apps/website/src/components/resources/ResourcesHero.tsx
apps/website/src/components/resources/SafetyComplianceBadge.tsx
apps/website/src/components/seo/EnhancedSEO.tsx
apps/website/src/components/seo/SeoMeta.tsx
apps/website/src/components/seo/__tests__/EnhancedSEO.test.tsx
apps/website/src/components/seo/__tests__/SeoMeta.test.tsx
apps/website/src/components/services/ServicesHero.tsx
apps/website/src/components/services/servicesData.ts
apps/website/src/components/shared-sections/HeroSectionEnforcer.tsx
apps/website/src/components/shared-sections/JeremyQuoteRibbon.tsx
apps/website/src/components/shared-sections/NextStepsSection.tsx
apps/website/src/components/shared-sections/TestimonialsSection.tsx
apps/website/src/components/team/SkillsRadarChart.tsx
apps/website/src/components/team/TeamProfileSection.tsx
apps/website/src/components/team/__tests__/TeamProfileSection.test.tsx
apps/website/src/components/templates/BrandedContentSection.tsx
apps/website/src/components/testimonials/TestimonialsHero.tsx
apps/website/src/components/ui/GlowEffect.tsx
apps/website/src/components/ui/LanguageToggle.tsx
apps/website/src/components/ui/StripedBackground.tsx
apps/website/src/components/ui/Timeline.tsx
apps/website/src/components/ui/__tests__/LanguageToggle.test.tsx
apps/website/src/components/ui/__tests__/ui-extended.test.tsx
apps/website/src/components/ui/backgrounds/BrandColorBlobs.tsx
apps/website/src/components/ui/backgrounds/DiagonalStripePattern.tsx
apps/website/src/components/ui/cta/PitchDeckCTA.tsx
apps/website/src/components/ui/cta/StrategicCTABanner.tsx
apps/website/src/components/ui/cta/__tests__/SmokeBossFunnel.test.tsx
apps/website/src/components/ui/cta/__tests__/cta-components.test.tsx
apps/website/src/components/ui/cta/index.ts
apps/website/src/components/ui/layout/PageHero.tsx
apps/website/src/components/ui/layout/Section.tsx
apps/website/src/components/ui/media/OptimizedVideo.tsx
apps/website/src/components/ui/modals/Modal.tsx
apps/website/src/components/ui/modals/__tests__/AdminSignInModal.test.tsx
apps/website/src/components/ui/modals/__tests__/JobApplicationModal.test.tsx
apps/website/src/content/jeremy-page-ribbons.md
apps/website/src/contexts/__tests__/theme-context.test.tsx
apps/website/src/i18n/__tests__/request.test.ts
apps/website/src/i18n/__tests__/translations-parity.test.ts
apps/website/src/i18n/request.ts
apps/website/src/lib/branding/page-names.ts
apps/website/src/lib/chatbot/__tests__/fallback.test.ts
apps/website/src/lib/chatbot/__tests__/knowledge-base.test.ts
apps/website/src/lib/chatbot/fallback.ts
apps/website/src/lib/chatbot/knowledge-base.ts
apps/website/src/lib/content/hero-page-slogans.ts
apps/website/src/lib/content/jeremy-ribbons.ts
apps/website/src/lib/data/about-timeline.ts
apps/website/src/lib/data/documents.ts
apps/website/src/lib/data/faq-data.ts
apps/website/src/lib/data/locations.ts
apps/website/src/lib/data/project-case-studies.ts
apps/website/src/lib/data/safety-manual-clusters.ts
apps/website/src/lib/data/service-routes.ts
apps/website/src/lib/data/team/arnold-garcia.json
apps/website/src/lib/data/team/ben-woodall.json
apps/website/src/lib/data/team/jeremy-thamert.json
apps/website/src/lib/data/team/matt-ramsey.json
apps/website/src/lib/data/team/reagan-massey.json
apps/website/src/lib/data/team/steve-mcclary.json
apps/website/src/lib/data/testimonials.ts
apps/website/src/lib/data/vintage-team.ts
apps/website/src/lib/i18n/__tests__/locale.server.test.ts
apps/website/src/lib/i18n/locale.server.ts
apps/website/src/lib/i18n/locale.ts
apps/website/src/lib/pwa/__tests__/offline-queue.test.ts
apps/website/src/lib/pwa/offline-queue.ts
apps/website/src/lib/seo/__tests__/schemas.test.ts
apps/website/src/lib/seo/geo-metadata.ts
apps/website/src/lib/seo/location-metadata.ts
apps/website/src/lib/seo/page-seo-utils.ts
apps/website/src/lib/services/__tests__/portfolio-service.test.ts
apps/website/src/lib/services/health-check.ts
apps/website/src/lib/services/portfolio-service.ts
apps/website/src/middleware/security.ts
apps/website/test/mocks/next-intl.js
apps/website/tsconfig.json
config/config-directory-guide.md
docs/archive/2026-07/hero-congruency-audit-2026-05-16.md
docs/archive/2026-07/hero-congruency-rollout-plan-2026-05-16.md
docs/archive/2026-07/hero-presence-inventory-2026-05-16.md
docs/archive/2026-07/home-page-optimization-progress.md
docs/archive/2026-07/index.md
docs/archive/index.md
docs/branding/brand-constants.md
docs/branding/governance/brand-congruency-master-checklist.md
docs/branding/governance/website-guardrails-coverage.md
docs/branding/index.md
docs/branding/standards/color-system.md
docs/branding/standards/documents-and-forms-standards.md
docs/branding/standards/hero-section-standards.md
docs/branding/standards/unified-component-standards.md
docs/branding/strategy/brand-overview.md
docs/branding/strategy/dual-terminology-standard.md
docs/branding/strategy/messaging.md
docs/branding/strategy/page-specific-messaging-guide.md
docs/branding/strategy/page-specific-slogans.md
docs/branding/strategy/slogan-coverage-matrix.md
docs/branding/strategy/universal-terminology-guide.md
docs/business/core-values.md
docs/business/index.md
docs/business/project-specializations.md
docs/business/services.md
docs/deployment/cicd-pipeline.md
docs/deployment/cloudflare-compatibility.md
docs/deployment/cloudflare-guide.md
docs/deployment/cloudflare-verification-runbook.md
docs/deployment/index.md
docs/development/index.md
docs/development/standards/branding-congruency-checklist.md
docs/development/standards/common-mistakes.md
docs/development/standards/consistency-guide.md
docs/development/standards/design-system-standards.md
docs/development/standards/development-standards.md
docs/development/standards/hero-commercial-video-guardrails.md
docs/development/standards/index.md
docs/development/standards/page-compliance-checklist.md
docs/development/standards/page-template-guide.md
docs/index.md
docs/media/index.md
docs/media/media-strategy.md
docs/performance/index.md
docs/project/architecture.md
docs/project/index.md
docs/project/operational-hub-congruent-plan.md
docs/technical/automatic-media-optimization.md
docs/technical/design-system/buttons-ctas-complete-guide.md
docs/technical/design-system/icon-system-complete.md
docs/technical/design-system/index.md
docs/technical/homepage.md
docs/technical/index.md
docs/technical/pwa-quick-reference.md
docs/technical/safety-program-guide.md
docs/technical/seo/seo-complete-guide.md
docs/technical/services-integration-guide.md
documents/brands/mhc.json
documents/content/employee-handbook.json
documents/content/safety-manual-public.json
documents/forms/forms-manifest.json
documents/letterhead/MHC-company-letterhead.html
documents/manuals/employee-handbook-cover.html
documents/manuals/employee-handbook-letterhead.html
documents/manuals/employee-handbook-section.html
documents/manuals/employee-handbook-spine.html
documents/manuals/employee-handbook-tabs.html
documents/manuals/form-cover.html
documents/manuals/form-fillable.html
documents/manuals/operations-hub-dashboard-access-guide.html
documents/manuals/safety-manual-cover.html
documents/manuals/safety-manual-letterhead.html
documents/manuals/safety-manual-policy.html
documents/manuals/safety-manual-section.html
documents/manuals/safety-manual-spine.html
documents/manuals/safety-manual-tabs.html
documents/manuals/safety-manual-toc.html
documents/manuals/website-page-inventory.html
documents/scripts/audit-mish-overrun.mjs
documents/scripts/build-safety-manual-public.mjs
documents/scripts/extract-word.mjs
documents/scripts/generate-letterhead-docx.mjs
documents/scripts/generate.mjs
documents/scripts/merge.mjs
documents/scripts/ocr-pdf.mjs
documents/scripts/rfq-generate.mjs
documents/scripts/rfq-preview.mjs
documents/styles/brand.css
documents/styles/components.css
documents/styles/print-base.css
jest.config.js
messages/en.json
messages/es.json
messages/home/en.json
messages/home/es.json
middleware.ts
next.config.js
open-next.config.ts
package.json
packages/shared/package.json
packages/shared/src/lib/analytics/hooks.ts
packages/shared/src/lib/analytics/index.ts
packages/shared/src/lib/analytics/tracking.ts
packages/shared/src/lib/api/__tests__/form-handler.test.ts
packages/shared/src/lib/api/form-handler.ts
packages/shared/src/lib/api/responses.ts
packages/shared/src/lib/auth/__tests__/middleware.test.ts
packages/shared/src/lib/cloudflare/__tests__/r2.test.ts
packages/shared/src/lib/cloudflare/r2.ts
packages/shared/src/lib/constants/navigation-icons.ts
packages/shared/src/lib/db/__tests__/client.test.ts
packages/shared/src/lib/db/__tests__/env.test.ts
packages/shared/src/lib/email/__tests__/email-service.test.ts
packages/shared/src/lib/email/template-builder.ts
packages/shared/src/lib/email/templates.ts
packages/shared/src/lib/email/templates/testimonial-blast.ts
packages/shared/src/lib/monitoring/__tests__/sentry-server.test.ts
packages/shared/src/lib/notifications/__tests__/n8n-webhook.test.ts
packages/shared/src/lib/notifications/__tests__/notification-service.test.ts
packages/shared/src/lib/notifications/__tests__/twilio-sms.test.ts
packages/shared/src/lib/notifications/notification-service.ts
packages/shared/src/lib/security/__tests__/audit-logger.test.ts
packages/shared/src/lib/security/__tests__/rate-limiter-kv.test.ts
packages/shared/src/lib/security/__tests__/rate-limiter-no-cache.test.ts
packages/shared/src/lib/security/__tests__/rate-limiter.test.ts
packages/shared/src/lib/security/__tests__/security-manager.test.ts
packages/shared/src/lib/security/__tests__/turnstile.test.ts
packages/shared/src/lib/security/scanner/__tests__/vulnerability-scanner.test.ts
packages/shared/src/lib/security/security-manager.ts
pnpm-lock.yaml
pnpm-workspace.yaml
scripts/add-team-qr-codes.js
scripts/brand-lint.sh
scripts/check-translations.js
scripts/deploy-opennext.mjs
scripts/docs/check-sync.sh
scripts/docs/sync-to-app.sh
scripts/fix-code-issues.js
scripts/lighthouse-guide.js
scripts/r2-publish-safety-pdfs.sh
scripts/resend-all-submissions.mjs
scripts/seo-audit.js
scripts/test-basic-performance.js
scripts/test-lighthouse-quick.js
scripts/test-lighthouse.js
scripts/test-pwa.js
scripts/test-qr-codes.js
scripts/validation/check-branding-doc-contracts.sh
scripts/validation/check-font-system-usage.sh
scripts/validation/check-no-generated-artifacts.sh
```

### Deleted files (D)

```text
BRANDING_TESTS_CONTINUATION_SUMMARY.md
BRANDING_TESTS_FINAL_STATUS.md
BRANDING_TESTS_OPTIMIZATION.md
BRANDING_TESTS_OPTIMIZATION_SUMMARY.md
apps/dashboard/src/components/analytics/__tests__/TrackedContactLinks.test.tsx
apps/dashboard/src/components/analytics/__tests__/analytics.test.tsx
apps/dashboard/src/components/analytics/index.ts
apps/dashboard/src/components/icons/PNWStatesMap.tsx
apps/dashboard/src/components/icons/index.ts
apps/dashboard/src/contexts/auth-context.tsx
apps/dashboard/src/lib/data/team/mike-holstein.json
apps/dashboard/src/lib/hub/__tests__/api.test.ts
apps/dashboard/src/lib/hub/api.ts
apps/dashboard/src/styles/variables.css
apps/website/all_discovered.txt
apps/website/concrete_pages.txt
apps/website/config/cloudflare/edge-optimization.md
apps/website/config/cloudflare/wrangler-example.toml
apps/website/config/cloudflare/wrangler-workers-example.toml
apps/website/config/config-directory-guide.md
apps/website/config/cspell/names-and-places-words.txt
apps/website/config/cspell/project-words.txt
apps/website/config/cspell/safety-industry-words.txt
apps/website/config/cspell/spanish-custom-words.txt
apps/website/config/cspell/technical-additions.txt
apps/website/config/deployment/Dockerfile
apps/website/config/deployment/docker-compose.yml
apps/website/config/monitoring/audit-ci.json
apps/website/config/monitoring/n8n-form-notification-workflow.json
apps/website/config/monitoring/uptime-kuma-monitors.md
apps/website/dashboard_discovered.txt
apps/website/migrations/0001_create_consultations.sql
apps/website/migrations/0002_create_job_applications.sql
apps/website/migrations/0003_create_contact_submissions.sql
apps/website/migrations/0004_create_users.sql
apps/website/migrations/0005_create_sessions.sql
apps/website/migrations/0006_create_newsletter_subscribers.sql
apps/website/migrations/0007_add_created_at_indexes.sql
apps/website/migrations/0008_create_jobs.sql
apps/website/migrations/0009_create_safety_form_submissions.sql
apps/website/migrations/0010_create_safety_download_log.sql
apps/website/migrations/0011_create_authorized_drivers.sql
apps/website/migrations/0012_create_safety_intake_submissions.sql
apps/website/migrations/0013_create_leads.sql
apps/website/migrations/0014_create_safety_access_log.sql
apps/website/migrations/0015_create_team_profiles.sql
apps/website/migrations/0016_team_profiles_approval.sql
apps/website/migrations/0017_create_sssp.sql
apps/website/migrations/0022_team_profiles_identity_fields.sql
apps/website/migrations/RUN-IN-CONSOLE.sql
apps/website/monitoring/loki.yml
apps/website/monitoring/prometheus.yml
apps/website/public/fonts/Inter-Bold.woff2
apps/website/public/fonts/Inter-Regular.woff2
apps/website/public/fonts/Inter-SemiBold.woff2
apps/website/public/images/projects/kennewick-office-renovation.jpg
apps/website/public/images/projects/kennewick-office-renovation.webp
apps/website/public/images/projects/pasco-warehouse.jpg
apps/website/public/images/projects/pasco-warehouse.webp
apps/website/public/images/projects/richland-custom-home.jpg
apps/website/public/images/projects/richland-custom-home.webp
apps/website/public/images/projects/spokane-healthcare-clinic.jpg
apps/website/public/images/projects/spokane-healthcare-clinic.webp
apps/website/public/images/projects/west-richland-multifamily.jpg
apps/website/public/images/projects/west-richland-multifamily.webp
apps/website/public/images/qr-codes/team/qr-team-gator-bw.png
apps/website/public/images/qr-codes/team/qr-team-gator-color.png
apps/website/public/images/qr-codes/team/qr-team-mike-holstein-bw.png
apps/website/public/images/qr-codes/team/qr-team-mike-holstein-color.png
apps/website/public/videos/culture/flag_honesty_loop.mp4
apps/website/public/videos/culture/flag_honesty_loop.webm
apps/website/public/videos/culture/poster-flag-honesty-loop.jpg
apps/website/public/videos/hero-commercials/home-hero-optimized.webm
apps/website/src/components/analytics/EnhancedAnalytics.tsx
apps/website/src/components/analytics/GoogleAnalytics.tsx
apps/website/src/components/analytics/PageTrackingClient.tsx
apps/website/src/components/analytics/TrackedContactLinks.tsx
apps/website/src/components/analytics/__tests__/TrackedContactLinks.test.tsx
apps/website/src/components/analytics/__tests__/analytics.test.tsx
apps/website/src/components/icons/AmericanFlag.tsx
apps/website/src/components/ui/cta/SmokeBossFunnel.tsx
apps/website/src/contexts/auth-context.tsx
apps/website/src/lib/data/team/gator.json
apps/website/src/styles/material-icons.css
apps/website/test_full_output.txt
apps/website/test_output.txt
apps/website/tracked_tests.txt
apps/website/website_discovered.txt
docs/development/LARGE_COMPONENT_REFACTORING.md
docs/development/PERFORMANCE_OPTIMIZATION_STRATEGY.md
docs/development/codebase-analysis.md
docs/home-page-optimization-progress.md
documents/content/MH
documents/content/MHC-Employee-Handbook-Sections/HANDBOOK-01_introduction.docx
documents/content/MHC-Employee-Handbook-Sections/HANDBOOK-02_company-policies.docx
documents/content/MHC-Employee-Handbook-Sections/HANDBOOK-03_employment-basics.docx
documents/content/MHC-Employee-Handbook-Sections/HANDBOOK-04_compensation.docx
documents/content/MHC-Employee-Handbook-Sections/HANDBOOK-05_employee-benefits.docx
documents/content/MHC-Employee-Handbook-Sections/HANDBOOK-06_miscellaneous.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-01_company-vehicle-policies-and-procedures-acknowledgement.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-02_employee-handbook-receipt-acknowledgment.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-03_employee-safety-policy-acknowledgement-form.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-04_temporary-work-from-home-application-agreement.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-05_employee-acknowledgment-and-agreement-of-computer-and-electronics-use-policy.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-06_employee-photo-release-form.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-07-client-photo-release-form.docx
documents/forms/MHC-HANDBOOK-FORMS/HANDBOOK-FORM-08_purchase-approval-general-expense.docx
documents/forms/form-client-photo-release.html
documents/forms/form-employee-photo-release.html
documents/scripts/create-handbook-forms.mjs
documents/scripts/dissect-employee-handbook.mjs
lint_markdown_output.txt
packages/shared/migrations/0001_create_consultations.sql
packages/shared/migrations/0002_create_job_applications.sql
packages/shared/migrations/0003_create_contact_submissions.sql
packages/shared/migrations/0004_create_users.sql
packages/shared/migrations/0005_create_sessions.sql
packages/shared/migrations/0006_create_newsletter_subscribers.sql
packages/shared/migrations/0007_add_created_at_indexes.sql
packages/shared/migrations/0008_create_jobs.sql
packages/shared/migrations/0009_create_safety_form_submissions.sql
packages/shared/migrations/0010_create_safety_download_log.sql
packages/shared/migrations/0011_create_authorized_drivers.sql
packages/shared/migrations/0012_create_safety_intake_submissions.sql
packages/shared/migrations/0013_create_leads.sql
packages/shared/migrations/0014_create_safety_access_log.sql
packages/shared/migrations/0015_create_team_profiles.sql
packages/shared/migrations/0016_team_profiles_approval.sql
packages/shared/migrations/0017_create_sssp.sql
packages/shared/migrations/0018_create_booth_entries.sql
packages/shared/migrations/0019_add_booth_entry_optins.sql
packages/shared/migrations/0022_team_profiles_identity_fields.sql
packages/shared/migrations/RUN-IN-CONSOLE.sql
packages/shared/src/lib/security/vulnerability-scanner.ts
page-01.png
public/images/qr-codes/README.md
scripts/mh-scripts-guide.md
temp-markdownlint.json
testing/mh-testing-guide.md
tmp/global-pdf-scan.mjs
```

### Renamed files (R*)

```text
R056  apps/website/public/videos/hero-commercials/home-hero-optimized-audio.mp4  apps/website/public/videos/hero-commercials/mh-construction-radio-ad-jeremy-thamert.mp4
R100  apps/dashboard/src/components/analytics/EnhancedAnalytics.tsx  packages/shared/src/lib/analytics/components/EnhancedAnalytics.tsx
R100  apps/dashboard/src/components/analytics/GoogleAnalytics.tsx  packages/shared/src/lib/analytics/components/GoogleAnalytics.tsx
R100  apps/dashboard/src/components/analytics/PageTrackingClient.tsx  packages/shared/src/lib/analytics/components/PageTrackingClient.tsx
R100  apps/dashboard/src/components/analytics/TrackedContactLinks.tsx  packages/shared/src/lib/analytics/components/TrackedContactLinks.tsx
R086  apps/dashboard/src/lib/data/team/gator.json  packages/shared/src/lib/data/team/gator.json
R098  apps/website/src/lib/data/team/mike-holstein.json  packages/shared/src/lib/data/team/mike-holstein.json
R100  apps/dashboard/src/components/icons/AmericanFlag.tsx  packages/shared/src/lib/icons/AmericanFlag.tsx
R100  apps/dashboard/src/styles/material-icons.css  packages/shared/src/styles/material-icons.css
R094  apps/website/src/styles/variables.css  packages/shared/src/styles/variables.css
R100  audit_localization.py  scripts/legacy-audits/audit_localization.py
R100  auditor.js  scripts/legacy-audits/auditor.js
R100  regenerate_report.sh  scripts/legacy-audits/regenerate_report.sh
R100  report_gen.sh  scripts/legacy-audits/report_gen.sh
R100  route_audit.mjs  scripts/legacy-audits/route_audit.mjs
R100  scanner.sh  scripts/legacy-audits/scanner.sh
R100  sweep_locales.sh  scripts/legacy-audits/sweep_locales.sh
R100  update_files.py  scripts/legacy-audits/update_files.py
```
