# MH Construction - Modern Construction Platform

🎯 **Production Ready** | ✅ **Cloudflare Optimized** | 🇺🇸 **Veteran-Owned Since January 2025**

A modern Next.js construction platform featuring AI-powered cost estimation, military-themed chatbot
assistance, and comprehensive project showcase capabilities.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy:production
```

Visit `http://localhost:3000` to see the site.

---

## 🏗️ Project Overview

**MH Construction** is a veteran-owned construction company serving the Pacific Northwest (WA, OR, ID).
This platform showcases services, manages client consultations, and provides AI-powered project
estimation.

### Core Features

- **11 Main Pages**: Home, About, Services, Projects, Team, Careers, Contact, Booking, Estimator,
  Government, Trade Partners
- **AI Chatbot**: Military-themed "General MH" assistant on every page
- **Cost Estimator**: AI-powered project cost calculator with regional pricing
- **Booking System**: Consultation scheduling with calendar integration
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Email Integration**: Resend API for form submissions to `office@mhc-gc.com`

### Tech Stack

- **Framework**: Next.js 15.5.2 (App Router, React 19)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Google Material Icons (font-based)
- **Animations**: Framer Motion
- **Deployment**: Cloudflare Pages with Edge Runtime
- **Email**: Resend API
- **Database**: Cloudflare D1 (SQL) / KV Storage

---

## 📁 Project Structure

```text
mh-website/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── services/          # Services showcase
│   │   ├── projects/          # Portfolio
│   │   ├── team/              # Team profiles
│   │   ├── contact/           # Contact hub with map
│   │   ├── booking/           # Consultation scheduler
│   │   ├── careers/           # Job listings
│   │   ├── estimator/         # AI cost calculator
│   │   ├── government/        # Government projects
│   │   ├── trade-partners/    # Subcontractor network
│   │   └── api/               # Edge API routes
│   ├── components/            # React components
│   │   ├── layout/           # Navigation, Footer
│   │   ├── ui/               # Button, Card, Modal, etc.
│   │   ├── chatbot/          # AI assistant
│   │   ├── blog/             # Blog section component
│   │   ├── testimonials/     # Reviews section component
│   │   └── [feature]/        # Feature-specific components
│   ├── lib/                  # Utilities and services
│   │   ├── ai/              # AI chatbot logic
│   │   ├── cloudflare/      # Cloudflare integrations
│   │   ├── data/            # Static data (team, services)
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Helper functions
│   └── styles/              # Global CSS
├── public/                  # Static assets
│   ├── images/             # Photos and graphics
│   └── icons/              # PWA icons
├── docs/                   # Documentation
│   ├── business/          # Business info, branding
│   ├── technical/         # Architecture, design system
│   ├── development/       # Dev guidelines, references
│   └── deployment/        # Setup guides
└── scripts/               # Automation scripts
```

---

## 🎨 Building New Pages & Sections

### Page Layout Pattern

All pages follow this standard hero section structure:

```tsx
// app/new-page/page.tsx
import { MaterialIcon } from "@/components/icons";

export default function NewPage() {
  return (
    <>
      {/* Hero Section - Always First */}
      <section
        className="relative bg-gradient-to-br from-brand-primary 
        via-brand-accent to-gray-900 pt-20 sm:pt-24 lg:pt-32 pb-12 
        sm:pb-16 lg:pb-24 text-white"
      >
        {/* Veteran Badge */}
        <div className="flex justify-center items-center gap-2 mb-4 sm:mb-6">
          <MaterialIcon
            icon="military_tech"
            size="lg"
            className="text-bronze-300"
          />
          <span
            className="font-semibold text-bronze-300 text-sm 
            sm:text-base tracking-wide uppercase"
          >
            Veteran-Owned Excellence
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-center font-bold mb-6 text-brand-secondary"
          style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
        >
          Page Title
        </h1>

        {/* Partnership Tagline */}
        <p
          className="text-center mb-8 font-medium"
          style={{ fontSize: "clamp(1.125rem, 3vw, 2.25rem)" }}
        >
          "Building for the Owner,
          <span className="text-bronze-300">NOT</span> the Dollar"
        </p>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 py-12">
        {/* Your content here */}
      </section>
    </>
  );
}
```

### Section Component Pattern

Create reusable sections that can be embedded on any page:

```tsx
// components/feature/feature-section.tsx
interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showCTA?: boolean;
}

export function FeatureSection({
  title = "Default Title",
  subtitle,
  maxItems = 6,
  showCTA = true,
}: FeatureSectionProps) {
  return (
    <section className="py-12 bg-background" id="feature-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 
            bg-gradient-to-r from-brand-primary to-brand-accent 
            bg-clip-text text-transparent"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Your cards/content here */}
        </div>

        {/* Optional CTA */}
        {showCTA && (
          <div className="text-center mt-12">
            <Button variant="primary" size="lg">
              Take Action
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
```

---

## 🎨 Brand Standards

### Colors

- **Primary (Hunter Green)**: `#386851` - Main CTAs, headers
- **Accent (Leather Tan)**: `#BD9264` - Secondary buttons, accents
- **Bronze**: `#CD7F32` - Veteran badge, highlights

### Typography

- **Headings**: Use `clamp()` for responsive scaling
  - H1: `clamp(2rem, 8vw, 6rem)`
  - Tagline: `clamp(1.125rem, 3vw, 2.25rem)`
- **NO gradients inside cards** - Use solid colors
- **Gradients on clean backgrounds only** - Hero sections, page headers

### Icons

- **Always use MaterialIcon component**: `<MaterialIcon icon="icon_name" size="lg" />`
- **NO emojis in source code** - Markdown docs only
- Find icons at: [Google Material Icons](https://fonts.google.com/icons)

### Buttons

```tsx
// Primary action (Hunter Green)
<Button variant="primary" size="lg">
  <MaterialIcon icon="build" className="mr-3" />
  Start Project
</Button>

// Secondary action (Leather Tan)
<Button variant="secondary" size="lg">
  <MaterialIcon icon="phone" className="mr-3" />
  Contact Us
</Button>

// Outline (Subtle)
<Button variant="outline" size="md">
  Learn More
</Button>
```

---

## 🔧 Development Workflow

### Environment Setup

Create `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.mhc-gc.com
NEXT_PUBLIC_SITE_NAME=MH Construction

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=MH Construction <office@mhc-gc.com>

# Cloudflare (optional for local dev)
CLOUDFLARE_ACCOUNT_ID=your_account_id
KV_NAMESPACE_ID=your_kv_namespace_id
D1_DATABASE_ID=your_d1_database_id
```

### Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Production build test
npm run start           # Start production server locally

# Code Quality
npm run lint            # Check for linting errors
npm run lint:fix        # Auto-fix linting issues
npm run type-check      # TypeScript validation

# Deployment
npm run build:cloudflare     # Build for Cloudflare Edge
npm run pages:deploy         # Deploy to Cloudflare Pages
npm run deploy:production    # Build + deploy in one command
```

### Adding a New Component

1. **Create component file**: `src/components/[category]/component-name.tsx`
2. **Export from index**: Add to `src/components/[category]/index.ts`
3. **Use absolute imports**: `import { ComponentName } from "@/components/[category]"`
4. **Follow naming**: PascalCase for files, kebab-case for directories

### Adding a New Page

1. **Create directory**: `src/app/new-route/`
2. **Add page file**: `src/app/new-route/page.tsx`
3. **Add metadata**: `src/app/new-route/metadata.ts` (optional)
4. **Add layout**: `src/app/new-route/layout.tsx` (if needed)
5. **Update navigation**: Add route to `src/components/navigation/navigationConfigs.ts`

---

## 📚 Documentation

### 🗂️ [Master Documentation Index](./docs/MasterIndex.md)

**Central hub for all documentation** - Navigate the complete documentation library by category, find quick
references, and access all guides and standards in one place.

---

### Essential Guides

- **[Consistency Guide](./docs/development/consistency-guide.md)** - Complete consistency
  standards
- **[Cloudflare Deployment](./cloudflare-deployment.md)** - Complete deployment setup
- **[Design System](./docs/technical/design-system/design-system.md)** - Colors, typography,
  spacing
- **[Development Guidelines](./docs/development/guidelines/development-guidelines.md)** - Coding
  standards
- **[Component Library](./src/components/ui/mh-ui-guide.md)** - UI component reference
- **[Icon System](./docs/technical/design-system/icons/icon-system-quick-reference.md)** - Icon
  usage

### Quick References

- **[Developer Checklist](./docs/development/reference/developer-checklist.md)** - Pre-commit
  verification
- **[Branding Quick Reference](./docs/branding/implementation/branding-quick-reference.md)** - Brand
  standards
- **[Mobile Quick Reference](./docs/technical/design-system/mobile-quick-reference.md)** -
  Responsive design

### Architecture

- **[Project Architecture](./docs/project/architecture.md)** - System design overview
- **[Navigation System](./docs/technical/navigation/navigation.md)** - Navigation patterns

---

## 🚀 Deployment

### Cloudflare Pages

The site is configured for Cloudflare Pages with Edge Runtime:

```bash
# One-command deployment
npm run deploy:production

# Or step-by-step
npm run build:cloudflare
npm run pages:deploy
```

**Build Settings**:

- Build command: `npm run build`
- Build output directory: `.next`
- Framework preset: Next.js (App Router)
- Node version: 18+

See [cloudflare-deployment.md](./cloudflare-deployment.md) for complete setup guide.

---

## 📊 Project Status

```bash
✅ Build: SUCCESS (~34s production build)
✅ TypeScript: 188 files, zero errors
✅ ESLint: Clean, no warnings
✅ Branding: 100/100 compliance
✅ Routes: 11 pages + 14 API endpoints
✅ Navigation: All links validated
✅ Performance: 94+ Lighthouse score
✅ SEO: Sitemap, meta tags, structured data
✅ Accessibility: WCAG 2.1 AA compliant
```

### Key Metrics

| Metric          | Status                       |
| --------------- | ---------------------------- |
| **Build Time**  | ~34s                         |
| **Bundle Size** | 102 KB shared JS             |
| **Lighthouse**  | 94+                          |
| **Routes**      | 25 total (11 pages + 14 API) |
| **Components**  | 100+ reusable                |
| **Type Safety** | 100% TypeScript              |

---

## 📞 Contact & Support

- **Phone**: [(509) 308-6489](tel:+15093086489)
  - Client inquiries: ext. 100
  - Vendor inquiries: ext. 150
- **Email**: [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Address**: 3111 N. Capital Ave., Pasco, WA 99301
- **Service Area**: Pacific Northwest (WA, OR, ID)
- **Website**: [www.mhc-gc.com](https://www.mhc-gc.com)

---

## 🤝 Contributing

See [contributing.md](./contributing.md) for development guidelines and contribution workflow.

---

**Last Updated**: November 6, 2025  
**Version**: 4.0.2  
**Status**: Production Ready

_Building partnerships, serving communities, creating lasting value in the Pacific Northwest._
