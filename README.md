# MH Construction - Modern Construction Platform

🎯 **Production Ready** | ✅ **Cloudflare Optimized** | 🇺🇸 **Veteran-Owned Since January 2025**

A modern Next.js construction platform featuring AI-powered cost estimation, military-themed "General MH" chatbot
assistant with authentic Army General personality, and comprehensive project showcase capabilities.

---

## 🎖️ Veteran-Owned Excellence

**MH Construction became veteran-owned in January 2025** under Army veteran leadership. We're actively
establishing partnerships with veteran organizations to expand our service offerings and support the
veteran community.

### Current Veteran Benefits

- **12% Combat Veteran Discount** on all construction projects
- **Priority Scheduling** for consultations and project timelines
- **Fellow Veteran Team Members** who understand your unique needs
- **VA Loan Coordination** and assistance throughout the process
- **Service Branch Recognition** by our "General MH" AI assistant (HOOAH, ANCHORS AWEIGH, SEMPER FI)

### Growing Partnerships

We're establishing strategic relationships with veteran organizations to enhance benefits and expand
services. More opportunities coming as partnerships develop!

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

**Our Team**: Our leadership, crafted through military structure, alongside a team of skilled professionals,
brings unwavering dedication and owner-first focus to every project.

### Core Features

- **12 Main Pages**: Home, About, Services, Projects, Team, Careers, Contact, Booking, Estimator,
  Government, Trade Partners, Urgent Support
- **AI Chatbot "General MH"**: Military-themed Army General assistant with authentic service branch recognition
- **Cost Estimator**: AI-powered project cost calculator with 12% combat veteran discount
- **Booking System**: Consultation scheduling with veteran priority protocols
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Email Integration**: Resend API for form submissions to `office@mhc-gc.com`
- **Veteran Services**: Accessibility modifications, energy efficiency, security operations (PTSD-aware)

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
│   │   ├── urgent/            # Urgent construction support for GCs
│   │   ├── 3d-explorer/       # 3D model viewer
│   │   └── api/               # Edge API routes
│   │       ├── auth/         # Authentication endpoints
│   │       ├── consultations/ # Consultation booking
│   │       ├── contact/      # Contact form
│   │       ├── job-applications/ # Career applications
│   │       ├── functions/    # Dynamic function endpoints
│   │       └── security/     # Security monitoring
│   ├── components/            # React components
│   │   ├── layout/           # Navigation, Footer
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── base/        # Base components (Button, Card, etc.)
│   │   │   ├── forms/       # Form components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── media/       # Media components
│   │   │   ├── modals/      # Modal dialogs
│   │   │   └── specialty/   # Specialty components
│   │   ├── chatbot/          # AI assistant
│   │   ├── testimonials/     # Reviews section
│   │   ├── estimator/        # Cost estimator components
│   │   ├── navigation/       # Navigation system
│   │   ├── performance/      # Performance monitoring
│   │   └── [feature]/        # Feature-specific components
│   ├── lib/                  # Utilities and services
│   │   ├── ai/              # AI chatbot logic
│   │   │   ├── core/        # Core AI functionality
│   │   │   ├── estimator/   # Cost estimation AI
│   │   │   └── veteran/     # Veteran-specific AI
│   │   ├── api/             # API utilities
│   │   ├── auth/            # Authentication
│   │   ├── cloudflare/      # Cloudflare integrations
│   │   ├── data/            # Static data (team, services)
│   │   ├── db/              # Database utilities
│   │   ├── security/        # Security utilities
│   │   ├── types/           # TypeScript definitions
│   │   ├── utils/           # Helper functions
│   │   └── veteran/         # Veteran services
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── providers/           # React providers
│   ├── middleware/          # Request middleware
│   └── styles/              # Global CSS
├── public/                  # Static assets
│   ├── images/             # Photos and graphics
│   ├── icons/              # PWA icons
│   └── screenshots/        # App screenshots
├── docs/                   # Documentation
│   ├── business/          # Business info, branding
│   ├── branding/          # Brand guidelines
│   ├── technical/         # Architecture, design system
│   ├── development/       # Dev guidelines, references
│   ├── deployment/        # Setup guides
│   ├── project/           # Project management
│   ├── partnerships/      # Partner documentation
│   ├── migrations/        # Migration guides
│   └── operations/        # Operations docs
├── scripts/               # Automation scripts
│   ├── analysis/          # Code analysis tools
│   ├── cleanup/           # Cleanup utilities
│   ├── markdown/          # Markdown processing
│   ├── optimization/      # Optimization scripts
│   ├── utilities/         # General utilities
│   └── validation/        # Validation scripts
└── migrations/            # Database migrations
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

### Core Brand Messages

**Primary Slogans:**

- "Building for the Owner, NOT the Dollar"
- "THE ROI IS THE RELATIONSHIP"
- "Let's Build More than Just Structures - Partner with a team that puts your vision—and your relationship—first."

**Mission**: We deliver high-quality construction rooted in integrity, clear communication, and long-term
relationships.

**Vision**: To be the Pacific Northwest's most trusted veteran-led construction partner - renowned for
craftsmanship and character.

**Supporting Statement**: "We're big enough to scale and small enough to stay personal."

### Core Values

1. **Integrity First** - Doing What's Right, Every Time
2. **Owner-Focused Transparency** - No Surprises
3. **Relationship ROI** - We Build Trust, Not Just Structures
4. **Veteran-Fueled Reliability** - Calm and Precise Under Pressure
5. **Craftsmanship that Lasts** - Built for the Long Run
6. **Precision & Experience** - 150+ Years Combined Team Expertise

See [Core Values](./docs/business/core-values.md) for complete details.

### Our Owner-First Process

1. **Pre-Construction Planning** - Comprehensive planning and master scheduling
2. **Budget Transparency** - Open-book pricing with detailed breakdowns
3. **Proactive Communication** - Regular updates and immediate change notifications
4. **Quality Execution** - Military precision with experienced craftsmen
5. **Seamless Close-Out** - Complete documentation and ongoing support

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

# SEO & Optimization
npm run seo:audit       # Run SEO audit on all pages
npm run seo:check       # Quick SEO validation
npm run seo:report      # Generate detailed SEO report

# Testing
npm run test            # Run test suite
npm run test:coverage   # Generate coverage report

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
3. **Add to sitemap**: Add ONE line to `src/app/sitemap.ts`:

   ```typescript
   { path: "/new-route", priority: 0.8, changeFreq: "monthly" as const },
   ```

4. **Add metadata** (optional): `src/app/new-route/metadata.ts`
5. **Update navigation** (if in menu): Add to `src/components/navigation/navigationConfigs.ts`
6. **Run SEO audit**: `npm run seo:audit` to validate

**That's it!** The auto-adaptive SEO system handles sitemap generation, metadata defaults, and validation automatically.

---

## 📚 Documentation

### 🗂️ [Master Documentation Index](./docs/MasterIndex.md)

**Central hub for all documentation** - Navigate the complete documentation library by category, find quick
references, and access all guides and standards in one place.

---

### Essential Guides

- **[Consistency Guide](./docs/development/consistency-guide.md)** - Complete consistency standards
- **[Ultimate SEO Guide](./docs/technical/seo/ultimate-seo-guide.md)** - Auto-adaptive SEO system ⭐
- **[Cloudflare Deployment](./cloudflare-deployment.md)** - Complete deployment setup
- **[Design System](./docs/technical/design-system/design-system.md)** - Colors, typography, spacing
- **[Development Guidelines](./docs/development/guidelines/development-guidelines.md)** - Coding standards
- **[Component Library](./src/components/ui/mh-ui-guide.md)** - UI component reference
- **[Icon System](./docs/technical/design-system/icons/icon-system-quick-reference.md)** - Icon usage

### Quick References

- **[SEO Quick Reference](./SEO-QUICK-REFERENCE.md)** - SEO commands and best practices
- **[Developer Checklist](./docs/development/reference/developer-checklist.md)** - Pre-commit verification
- **[Branding Quick Reference](./docs/branding/implementation/branding-quick-reference.md)** - Brand standards
- **[Mobile Quick Reference](./docs/technical/design-system/mobile-quick-reference.md)** - Responsive design

### Architecture & SEO

- **[Project Architecture](./docs/project/architecture.md)** - System design overview
- **[Navigation System](./docs/technical/navigation/navigation.md)** - Navigation patterns
- **[SEO Compliance Status](./docs/technical/seo/seo-compliance-status.md)** - Current SEO health

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
✅ Build: SUCCESS (~26s production build)
✅ TypeScript: Clean, zero errors
✅ ESLint: Clean, no warnings
✅ SEO: 92/100 average score (Excellent!)
✅ SEO Audit: 13/13 pages passing
✅ Branding: 100/100 compliance
✅ Routes: 12 pages + 8 API endpoints
✅ Navigation: All links validated
✅ Performance: 94+ Lighthouse score
✅ Accessibility: WCAG 2.1 AA compliant
```

### Key Metrics

| Metric          | Status                      |
| --------------- | --------------------------- |
| **Build Time**  | ~26s                        |
| **Bundle Size** | 102 KB shared JS            |
| **Lighthouse**  | 94+                         |
| **SEO Score**   | 92/100 (Excellent)          |
| **Routes**      | 20 total (12 pages + 8 API) |
| **Components**  | 100+ reusable               |
| **Type Safety** | 100% TypeScript             |

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

**Last Updated**: November 7, 2025  
**Version**: 4.0.3  
**Status**: Production Ready

_Building partnerships, serving communities, creating lasting value in the Pacific Northwest._
