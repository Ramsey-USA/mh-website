# MH Construction – Veteran-Owned Excellence

🎯 Production Ready | ✓ Cloudflare Optimized | 🇺🇸 Veteran-Owned (Since Jan 2025)

**Building projects for the client, NOT the dollar** — Traditional business values, veteran integrity,
and proven craftsmanship. Call (509) 308-6489 for direct consultation.

---

## 🚀 Current Status (December 2025)

### Production-Ready Platform ✅

- **Build Time:** ~35s
- **TypeScript:** Strict mode, zero errors
- **ESLint:** Zero errors, clean build
- **SEO Score:** 100/100
- **Lighthouse:** 94+ all pages
- **Bundle:** 225 kB optimized
- **Documentation:** 40 essential files (streamlined from 192)

### Core Identity (Dec 2025)

- **Veteran-owned since January 2025** under Army veteran leadership
- **No gimmicks:** Removed booking/estimator/AI features - direct human contact only
- **Contact-first:** All paths lead to phone (509) 308-6489 or email
- **Honest messaging:** Removed 50+ instances of "AI-powered", "cutting-edge", "revolutionary"
- **Four core values:** Honesty, Integrity, Professionalism, Thoroughness
- **Face-to-face consultation:** Your word is your bond, so is ours

### Tech Stack

- **Framework:** Next.js 15.5.2 with App Router
- **Language:** TypeScript 5.9.3 (strict mode)
- **Styling:** Tailwind CSS 3.4.18
- **Icons:** Google Material Icons (font-based)
- **Deployment:** Cloudflare Pages
- **Email:** Resend API

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or equivalent
- Cloudflare account (for deployment)
- Resend API key (for email)

### Local Development

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Key Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run type-check       # TypeScript check
npm run lint             # ESLint check
npm run test             # Run tests
```

### Environment Setup

Create `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

---

## 📚 Documentation Structure

**37 essential files organized by purpose:**

### 🎨 Branding (11 files)

- **Standards:** color-system, component-standards, hero-section, typography
- **Strategy:** brand-overview, messaging, page-specific-messaging, universal-terminology

### 💼 Business (18 files)

- **Core:** core-values, services, testimonials
- **Team:** 15 employee profiles

### 💻 Development (3 files)

- ai-development-guidelines, consistency-guide, development-standards

### 🔧 Technical (4 files)

- buttons-ctas-complete-guide, icon-system-complete
- seo-complete-guide, cloudflare-guide

### 📱 Marketing (2 files)

- GBP-POST-TEMPLATES, GOOGLE-BUSINESS-PROFILE-GUIDE

**Start here:** `docs/START-HERE.md`

---

## 🏗️ Project Architecture

```
src/
├── app/              # Next.js 15 App Router pages
├── components/       # React components
│   ├── home/        # Homepage sections
│   ├── shared-sections/  # Reusable sections
│   ├── seo/         # SEO components
│   └── ui/          # Base UI components
├── lib/             # Utilities and configs
│   ├── seo/         # SEO utilities
│   └── utils/       # Helper functions
├── hooks/           # Custom React hooks
├── styles/          # Global styles
└── types/           # TypeScript types
```

---

## 🎯 Core Values

1. **Honesty** - Transparent pricing, open communication
2. **Integrity** - Your word is your bond, so is ours
3. **Professionalism** - Military precision in every detail
4. **Thoroughness** - No shortcuts, no detail overlooked

---

## 📞 Contact

- **Phone:** (509) 308-6489
- **Email:** <info@mhconstruction.com>
- **Website:** <https://www.mhc-gc.com>
- **Location:** 3111 N. Capitol Ave, Pasco, WA 99301

**Veteran-owned since January 2025** | Licensed in WA, OR, ID

---

## 📄 License

Proprietary - MH Construction © 2025

## 🏗️ Project Architecture

### Technology Stack

**Frontend:**

- **Next.js 15.5.2** - Modern platform for reliable performance
- **React 18.3.1** - Industry-standard framework
- **TypeScript 5.9.3** - Type safety for quality assurance
- **Tailwind CSS 3.4.18** - Consistent design system
- **Framer Motion 12.23.24** - Smooth, professional animations
- **Recharts 2.x** - Interactive data visualization and radar charts

**Backend & Infrastructure:**

- **Cloudflare Pages** - Edge runtime deployment
- **Cloudflare D1** - Serverless SQL database (5 tables configured)
- **Cloudflare KV** - Key-value storage for caching and analytics
- **Cloudflare R2** - File storage (assets, resumes)
- **Resend API** - Transactional email service

**Testing & Quality:**

- **Jest 30.2** - Unit and integration testing
- **Testing Library** - Component testing
- **ESLint 9.36** - Code linting with Next.js config
- **Prettier 3.1** - Code formatting
- **Lighthouse CI** - Performance monitoring

### Core Features

#### Veteran Values Meet Honest Business

- **12 Focused Pages** - Quality over quantity, honest content
- **Personal Consultation Priority** - Face-to-face meetings where relationships begin
  - **Recon phase:** Expert on-site assessments with transparent pricing (think: site survey, not sales pitch)
  - **Intel sharing:** Open-book methodology - no hidden costs, period (full transparency like a mission brief)
  - **Priority tasking:** Veteran scheduling - service recognizes service across all branches
  - **Rally point:** Primary path: `/contact` for all consultation requests
- **"General MH" Assistant** - Helpful 24/7 support tool ⭐ **Phases 1-3 Complete (November 2024)**
  - 98-99% question coverage to help clients find information
  - Context-aware responses guiding to personal consultation
  - Veteran service branch recognition
  - Supports relationship-building, doesn't replace it
  - [Phase 1 Report](./docs/development/chatbot-integration-complete.md) |
    [Phase 2 Report](./docs/development/chatbot-phase2-complete.md) |
    [Phase 3 Report](./docs/development/chatbot-phase3-complete.md)
- **Veteran Benefits Integration:**
  - Combat Veteran Discount at the Ready
  - Priority scheduling
  - Service branch recognition
- **Interactive Components:**
  - Form progress tracking
  - Interactive project timelines
  - Activity feeds
  - Before/after sliders
  - Team member tags
- **Email Integration** via Resend API
  - **Primary**: `office@mhc-gc.com` (public/displayed)
  - **CC**: `matt@mhc-gc.com` (private notifications)
  - All forms send to BOTH addresses
- **Phone Call Tracking** (New Nov 2025)
  - Instant notifications when visitors click phone numbers
  - Tracks source, timestamp, device info
  - See `/docs/technical/phone-tracking-system.md`
- **Dark/Light Mode** with theme persistence
- **Full Accessibility** - WCAG 2.1 AA compliant

### Our Approach: People First, Tools Second

MH Construction believes in **personal relationships and face-to-face conversations**.
Our tools exist to serve you better, not replace the human touch.

**Start with Direct Conversation (`/contact`) — THE MH WAY:**

- Personal consultation with experienced professionals
- On-site assessment where we shake hands and earn your trust
- Open-book transparent pricing - see everything
- Detailed project planning together
- Priority scheduling for veterans
- **This is how real partnerships begin**

**Our Philosophy:** We believe the best results come from honest, direct communication.
Every interaction should bring us closer to understanding your vision and building
a partnership that lasts beyond project completion.

---

## 📁 Project Structure

```text
mh-website/
├── src/
│   ├── app/              # Next.js 15 App Router
│   │   ├── api/          # Edge API routes (auth, consultations, contact, etc.)
│   │   ├── (pages)/      # Public pages (21+ routes)
│   │   └── layout.tsx    # Root layout with providers
│   ├── components/       # React components (30+ subdirectories)
│   │   ├── chatbot/      # General MH assistant
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Navigation, Footer, Header
│   │   ├── seo/          # SEO components
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Core libraries (20+ modules)
│   │   ├── ai/           # AI and chatbot logic
│   │   ├── auth/         # Authentication system
│   │   ├── db/           # Database clients (D1)
│   │   ├── styles/       # Centralized style utilities
│   │   ├── seo/          # SEO utilities and metadata
│   │   └── utils/        # Helper functions
│   ├── contexts/         # React contexts (Theme, Auth, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── providers/        # Provider components
│   └── types/            # TypeScript definitions
├── docs/                 # Comprehensive documentation (163 files)
│   ├── master-index.md    # Documentation hub (START HERE)
│   ├── branding/         # Brand guidelines
│   ├── components/       # Component documentation
│   ├── development/      # Development guides
│   ├── technical/        # Technical architecture
│   └── business/         # Business documentation
├── config/               # Configuration files
│   ├── cloudflare/       # Wrangler configuration
│   ├── deployment/       # Docker, docker-compose
│   └── monitoring/       # Lighthouse CI, audit configs
├── migrations/           # D1 database migrations (5 tables)
├── scripts/              # Automation scripts (15+ utilities)
├── public/               # Static assets
│   ├── icons/            # PWA icons
│   ├── images/           # Optimized images
│   ├── videos/           # Optimized video assets
│   ├── robots.txt        # AI crawler permissions (GEO)
│   ├── llms.txt          # LLM-optimized content
│   └── sitemap.xml       # SEO sitemap
├── testing/              # Testing utilities
└── coverage/             # Test coverage reports
```

Full navigation: [MasterIndex](./docs/master-index.md)

---

## 📁 Documentation System

### Start Here

**[MasterIndex](./docs/master-index.md)** - Central documentation hub with complete navigation

### New Developer - Start Here

**[Developer Workflow Pathway](./docs/development/developer-workflow-pathway.md)** - ⭐ **START HERE** -
Complete step-by-step guide connecting ALL documentation (brand → development → implementation)

This comprehensive guide provides:

- **Phase-by-phase learning path** (Brand Foundation → Implementation → Page Development)
- **Visual flow charts** showing how all documentation connects
- **Task-based pathways** ("I need to create a new page", "I need to update an existing page")
- **Time estimates** for each phase (30 min, 45 min, etc.)
- **Validation checklists** to ensure nothing is missed

**Total onboarding time:** 2-3 hours to become productive

### Key Documentation Areas

#### For New Developers

1. **[Developer Workflow Pathway](./docs/development/developer-workflow-pathway.md)** - ⭐ **START HERE** -
   Complete guided journey
2. **[Development Quick Start](./docs/development/development-index.md)** - Get up and running
3. **[Consistency Guide](./docs/development/consistency-guide.md)** - ⭐ **MANDATORY** -
   Implementation standards
4. **[Style Utilities Guide](./docs/development/style-utilities-guide.md)** - ⭐ **MANDATORY** -
   Centralized utilities
5. **[AI Development Guidelines](./docs/development/ai-development-guidelines.md)** -
   Working with AI features

#### Branding & Design

- **[Branding Index](./docs/branding/branding-index.md)** - Complete brand system
- **[Brand Overview](./docs/branding/strategy/brand-overview.md)** - Core identity
- **[Slogan Rotation Guide](./docs/branding/strategy/slogan-rotation-guide.md)** - Messaging
- **[Color System](./docs/branding/standards/color-system.md)** - Brand colors
- **[Typography](./docs/branding/standards/typography.md)** - Font standards
- **[Icons Hub](./docs/technical/design-system/icons/icons-index.md)** - Complete icon system

#### Components

- **[Components Index](./docs/components/components-index.md)** - All components documented
- **[Shared Sections Guide](./docs/components/shared-sections-guide.md)** - Reusable sections
- **[Interactive Components](./docs/components/before-after-slider-guide.md)** - Interactive features

#### Technical Architecture

- **[Technical Index](./docs/technical/technical-index.md)** - Technical documentation hub
- **[Configuration Guide](./docs/technical/configuration-guide.md)** - System configuration
- **[Ultimate SEO Guide](./docs/technical/seo/ultimate-seo-guide.md)** - SEO implementation
- **[Performance Index](./docs/technical/performance/performance-index.md)** - Performance optimization
- **[Navigation Complete Guide](./docs/technical/navigation/navigation-complete-guide.md)** - Dual-label nav system

#### Navigation System Standards

**Dual-Label Navigation Pattern** - Civilian + Military Terminology (December 2025)

All mobile hamburger menu items use **both civilian and military-themed labels** to balance
accessibility with veteran brand identity:

```text
Primary Label (Civilian) → Secondary Label (Military)
────────────────────────────────────────────────────
Home              → Base HQ
About Us          → Our Oath
Services          → Operations
Projects          → Missions
Our Team          → Chain of Command
Reviews           → Commendations
Careers           → Enlist
Contact           → Rally Point
Government        → Public Sector
Partners          → Allies
Veterans          → Service First
Emergency         → Rapid Response
Help/FAQ          → Intel Brief
```

**Implementation:**

- Primary label: Clear, standard terminology for all users
- Secondary label: Military-themed, reinforces veteran-owned identity
- Visual hierarchy: Primary bold, secondary smaller with brand color
- Location: Mobile hamburger menu (`/src/components/layout/Navigation.tsx`)

**Benefits:**
✓ Accessible to all audiences
✓ Reinforces veteran-owned military precision brand
✓ Professional yet distinctive
✓ SEO-friendly with standard terms

#### Deployment & Operations

- **[Cloudflare Complete Guide](./docs/deployment/cloudflare-complete-guide.md)** - Full deployment guide
- **[Database Setup](./migrations/readme.md)** - D1 database migrations

### Documentation Stats

- **163 Markdown files** across all categories (consolidated from 178 in Nov 2025)
- **Fully indexed** through MasterIndex system
- **Active maintenance** - Updated November 18, 2025
- **Comprehensive coverage** - Business, technical, branding, components
- **6 consolidated guides** - Single source of truth per topic
- **Historical archives** - Completed projects in `/docs/project/history/`

---

## 🎨 Brand Essentials

### Core Values - Four-Value Professional Foundation System

#### "Old School Business" — Where Your Word is Your Bond

**Trust-Centered Philosophy**: "Trust as our ultimate goal and measurable company foundation"

Our four core values build toward trust as the culmination of excellence in every interaction:

1. **Honesty** - Transparent Communication Always
   - Realistic timelines and accurate cost estimates
   - No hidden costs, transparent pricing breakdowns
   - Immediate notification of any changes

2. **Integrity** - Doing What's Right, Every Time
   - Ethical decisions even when it costs more
   - Following through on every commitment
   - Making decisions that benefit clients, not our bottom line

3. **Professionalism** - Excellence in Every Interaction
   - Expert construction knowledge and industry best practices
   - Professional conduct with respectful, timely communication
   - Industry-leading credentials and organized processes

4. **Thoroughness** - Attention to Detail in Everything We Do
   - Comprehensive planning with contingency scenarios
   - Meticulous execution and complete documentation
   - Multiple quality control checkpoints

**How Values Build Trust**:

- Honesty eliminates doubt
- Integrity builds credibility
- Professionalism builds confidence
- Thoroughness creates peace of mind

**Measuring Success**: 98% satisfaction rate, 70% referral rate, active community involvement

See [Core Values Guide](./docs/business/core-values.md) for complete details.

### Core Slogan

#### "Building projects for the client, NOT the dollar"

_Where handshakes matter, promises are kept, and relationships last longer than buildings._

### Hero Section Tagline Strategy (Updated December 2025)

Each page features a **unique, page-specific tagline WITH dual naming system**
(Military → Civilian format) to honor veteran identity while maintaining accessibility.
This approach:

- **Dual naming at top**: "Base HQ → Home", "Our Oath → About Us", etc.
- **Unique page-specific mantra** for enhanced SEO and user engagement
- Reinforces each page's unique purpose and value proposition
- Reduces tagline fatigue and improves message retention
- Blends military operations terminology with construction expertise
- Maintains brand consistency while adding variety
- Honors all service branches (Army, Navy, Air Force, Marines, Coast Guard, Space Force)

**Examples:**

- Homepage: "Base HQ → Home" | "Your Tri-Cities Construction Command Center"
- About: "Our Oath → About Us" | "Service-Earned Values, Construction Excellence"
- Services: "Operations → Services" | "The Battle Plan - Strategic Construction Excellence"
- Projects: "Missions → Projects" | "Mission Success: 650+ Completed Projects"
- Team: "Chain of Command → Our Team" | "150+ Years Combined Military-Grade Expertise"

### Chain of Command Team Structure

Our veteran-owned team operates with clear military-inspired hierarchy and accountability:

**The Upper Brass** (Executive Leadership)

- Owner & President: Jeremy Thamert (35+ years experience, Army veteran)
- Vice President: Arnold Garcia (40+ years experience)
- Founder: Mike Holstein (30+ years, company established 2010)
- **Focus:** Strategic direction, mission-focused excellence

**Mission Commanders** (Project Management)

- Project Managers and Lead Estimators
- **Focus:** Mission planning, precision estimating, tactical coordination

**Special Operations** (Strategic Initiatives)

- Marketing, Safety, and specialized functions
- **Focus:** Competitive advantage through specialized expertise

**Logistics Command** (Administration & Support)

- Finance, HR, Administrative operations
- **Focus:** Critical logistics and mission support

**Field Officers** (Superintendents)

- Senior Superintendents and field leadership
- **Focus:** Frontline operations, quality craftsmanship, safety excellence

**Total Experience:** 150+ years combined military-grade expertise across all service branches (Army, Navy, Air Force, Marines, Coast Guard, Space Force).

Complete guides:

- [Hero Tagline Strategy](./docs/branding/strategy/hero-tagline-strategy.md)
- [Hero Section Standards](./docs/branding/standards/hero-section-standards.md)
- [Slogan & Tagline Guide](./docs/branding/strategy/slogan-rotation-guide.md)

### Page-Specific Messaging (Updated December 2025)

Each page group reflects our veteran-owned values and commitment to honest business:

**5 Core Page Groups:**

1. **Veteran Foundation** (Home, About, Veterans) - Honesty-first, service over self, military precision
   - Core slogan prominence: "Building projects for the client, NOT the dollar"
   - Emphasis on integrity, transparency, and keeping your word
   - Veteran benefits and recognition throughout

2. **Professional Services** (Services, Projects, Government) - Proven expertise, thorough execution
   - Showcase real work, real results, real testimonials
   - No-nonsense project management with military discipline
   - Compliance-focused for government work

3. **Partnership & Team** (Team, Careers, Trade Partners) - Building lasting relationships
   - "THE ROI IS THE RELATIONSHIP" messaging
   - Emphasis on trust, mutual respect, and long-term commitment
   - Team values: competence, character, commitment
   - **Chain of Command Structure:**
     - **The Upper Brass** - Executive leadership (Owner, VP, Founder)
     - **Mission Commanders** - Project management and estimating
     - **Special Operations** - Marketing, safety, and strategic initiatives
     - **Logistics Command** - Administration and support operations
     - **Field Officers** - Superintendents and field operations

4. **Direct Communication** (Contact, FAQ, Urgent) - Accessible, responsive, human-first
   - Face-to-face consultation prioritized
   - Transparent pricing, honest timelines
   - 24/7 support for urgent needs

**Core Principle:** Every page emphasizes veteran values—honesty, integrity, professionalism, and thoroughness.
We don't just talk about these values; we live them in every interaction.

Complete guide:
[Page-Specific Messaging Guide](./docs/branding/strategy/page-specific-messaging-guide.md)

### Brand Colors

- **Hunter Green** (`#386851`) - Primary brand color
- **Leather Tan** (`#BD9264`) - Secondary/accent color
- **Bronze** (`#CD7F32`) - Accent highlights

Full color system: [Color System Guide](./docs/branding/standards/color-system.md)

### Typography

Responsive sizing with `clamp()` utilities for fluid typography across all devices.
See: [Typography Standards](./docs/branding/standards/typography.md)

### Icons

Material Icons via custom `<MaterialIcon />` component.
Complete reference: [Icons Hub](./docs/technical/design-system/icons/icons-index.md)

---

## 👨‍💻 Development Workflow

### 🎯 New to Development? Follow This Path

**Before writing any code**, follow the complete learning path:

1. **[Developer Workflow Pathway](./docs/development/developer-workflow-pathway.md)** - ⭐ **READ FIRST** -
   Complete step-by-step guide through all documentation
2. **Phase 1: Brand Foundation** (30-45 min) - Understand brand identity, messaging, and visual standards
3. **Phase 2: Implementation** (45-60 min) - Learn technical patterns and coding standards
4. **Phase 3: Page Development** (15-20 min) - Master the page creation workflow
5. **Phase 4: Specialized Topics** (as needed) - Deep dive into specific areas

### Creating New Pages

**Prerequisites**: Complete the [Developer Workflow Pathway](./docs/development/developer-workflow-pathway.md) first!

1. **Understand the brand** - Read [Page-Specific Messaging Guide](./docs/branding/strategy/page-specific-messaging-guide.md)
   to identify which of the 5 core page groups your page belongs to
2. **Review standards** - Check [Homepage Compliance Checklist](./docs/branding/standards/homepage-compliance-checklist.md)
   for validation requirements
3. **Create page component** in `src/app/[route]/page.tsx`
4. **Add metadata export** with SEO information (see [SEO Complete Guide](./docs/technical/seo/seo-complete-guide.md))
5. **Update sitemap** in `src/app/sitemap.ts` with new route
6. **Use centralized utilities** from `src/lib/styles/` (see [Style Utilities Guide](./docs/development/style-utilities-guide.md))
7. **Test locally** with `npm run dev`
8. **Validate code quality** with `npm run type-check && npm run lint`
9. **Run SEO audit** with `npm run seo:audit`
10. **Use cohesion checklist** - Follow [Cohesion Checklist](./docs/development/cohesion-checklist.md)
    to ensure consistency

**Detailed Guide**: See [New Page Development Guide](./docs/development/new-page-development-guide.md)

### Code Standards

- **TypeScript strict mode** - All code must pass strict type checking
- **Zero ESLint errors** - Clean linting required
- **Centralized utilities** - Use `cardStyles`, `gridLayouts`, `Section` components
- **Responsive design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 AA compliance
- **Performance** - Optimize bundle sizes and loading times

### Pattern Usage

**Use centralized patterns instead of inline styles:**

```tsx
import { cardStyles, gridLayouts } from "@/lib/styles/shared-styles";

// Grid layout
<div className={gridLayouts.threeColumnResponsive}>
  {items.map((item) => (
    <div key={item.id} className={cardStyles.base}>
      {/* Card content */}
    </div>
  ))}
</div>;
```

**Use Section components for consistent layouts:**

```tsx
import { Section, SectionHeader } from "@/components/ui";

<Section>
  <SectionHeader title="Section Title" subtitle="Optional subtitle" />
  {/* Section content */}
</Section>;
```

See: [Style Utilities Guide](./docs/development/style-utilities-guide.md)

### Before Committing

```bash
# Run all checks
npm run type-check    # TypeScript validation
npm run lint          # ESLint check
npm run test          # Run test suite
npm run build         # Verify production build
npm run seo:audit     # SEO validation
```

### Database Migrations

```bash
# Local development
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0001_create_consultations.sql

# Production (after testing)
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0001_create_consultations.sql
```

See: [Database Migration Guide](./migrations/readme.md)

## � Deployment

### Cloudflare Pages Deployment

```bash
# Full production deployment
npm run deploy:production

# Manual steps
npm run build:cloudflare           # Build for Cloudflare
npx wrangler pages deploy .vercel/output/static --project-name=mh-construction
```

### Environment Configuration

Production deployment requires:

- Cloudflare Pages project configured
- Custom domain: `mhc-gc.com`
- D1 Database: `mh-construction-db`
- KV Namespaces: `CACHE`, `ANALYTICS`
- R2 Buckets: `mh-construction-assets`, `mh-construction-resumes`
- Environment variables configured in Cloudflare dashboard

### Pre-Deployment Checklist

- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] All ESLint errors resolved (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] SEO audit passes 100/100 (`npm run seo:audit`)
- [ ] Test coverage maintained (`npm run test`)
- [ ] Database migrations applied (if needed)
- [ ] Environment variables configured
- [ ] Images optimized

### Monitoring

- **Lighthouse CI** - Automated performance monitoring
- **Cloudflare Analytics** - Traffic and performance metrics
- **SEO Audits** - Regular SEO health checks

See: [Cloudflare Complete Guide](./docs/deployment/cloudflare-complete-guide.md)

---

## 📊 Current Metrics

### Performance

| Metric              | Value   |
| ------------------- | ------- |
| Build Time          | 34.7s   |
| Shared JS Bundle    | 102 kB  |
| Homepage Bundle     | 225 kB  |
| Lighthouse Score    | 94+     |
| First Load JS       | ~250 kB |
| Time to Interactive | < 3.5s  |

### Code Quality

| Metric              | Value |
| ------------------- | ----- |
| TypeScript Errors   | 0     |
| ESLint Errors       | 0     |
| Test Files          | 7     |
| Documentation Files | 163   |
| Component Count     | 100+  |
| Pages               | 12    |

### SEO & Accessibility

| Metric              | Value   |
| ------------------- | ------- |
| SEO Score           | 100/100 |
| Pages Audited       | 12      |
| Accessibility Score | 94+     |
| Mobile Friendly     | ✅ Yes  |
| PWA Ready           | ✅ Yes  |

### Expected Business Impact

- **+35–60%** engagement uplift from interactive components
- **+25–50%** increase in qualified leads
- **+80%** maintenance efficiency improvement
- **97–98/100** overall quality score

---

## 🤝 Partnership Types

MH Construction builds lasting relationships with two distinct groups:

| Type      | Audience               | Primary CTA           | Color        | Icon         | Routes             |
| --------- | ---------------------- | --------------------- | ------------ | ------------ | ------------------ |
| Client 🏠 | Project owners         | Schedule Consultation | Hunter Green | handshake    | /contact /services |
| Trade 🏗️  | Subcontractors/vendors | Join Our Network      | Leather Tan  | construction | /trade-partners    |

**Our Approach:** Every partnership starts with a conversation, builds through trust,
and succeeds through mutual commitment. We shake hands, keep promises, and build together.

Full documentation: [Partnership Type Definitions](./docs/partnerships/partnership-type-definitions.md)

## 📞 Contact & Support

**Phone:** (509) 308-6489

**Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)

**Address:** 3111 N. Capitol Ave., Pasco, WA 99301

**Service Area:** Pacific Northwest (Washington, Oregon, Idaho)

- **Primary:** Tri-Cities area (Richland, Pasco, Kennewick), Benton County, Franklin County
- **Extended:** Yakima, Spokane, Walla Walla, Hermiston, Coeur d'Alene, Eastern Washington

---

## 🤝 Contributing

See [contributing.md](./contributing.md) for contribution guidelines.

**Key Contribution Areas:**

- Bug fixes and improvements
- Documentation updates
- New component development
- Performance optimizations
- Accessibility enhancements
- Test coverage improvements

**Before Contributing:**

- Review [Consistency Guide](./docs/development/consistency-guide.md)
- Follow [Style Utilities Guide](./docs/development/style-utilities-guide.md)
- Ensure all tests pass
- Maintain zero TypeScript/ESLint errors
- Update relevant documentation

---

## 🏆 Recent Achievements

### Recent Optimization Milestones (December 2025)

- ✅ Perfect 100/100 SEO across all 12 audited pages
- ✅ Interactive component system deployed (6 major components)
- ✅ Code optimization: ~750 lines removed through refactoring
- ✅ Shared section components: ~425 additional lines eliminated
- ✅ Removed placeholder case studies - honest content only
- ✅ Documentation system consolidated (178 → 163 files, -8.4%)
- ✅ Zero TypeScript errors maintained
- ✅ Zero ESLint errors - clean build achieved
- ✅ Build time: 34.7s (production-ready)
- ✅ Quality score: 97-98/100

### Performance Improvements

- **Quality Score Evolution:** Progressed from 88 to 97-98 through systematic optimization
- **+80%** maintenance efficiency improvement
- **34.7s** build time (production-ready)
- **225 kB** homepage bundle (optimized)
- **Veteran-focused messaging** across all pages

### Testing & Quality

```bash
# Quick validation
npm run type-check && npm run lint && npm run seo:audit

# Expected output:
# ✓ TypeScript: 0 errors
# ✓ ESLint: 32 warnings (minor)
# ✓ SEO: 100/100
```

---

## �️ Roadmap

### Current Focus (November 2025)

- ✅ Core platform optimization completed
- Database integration with Cloudflare D1
- Enhanced analytics and monitoring
- Additional test coverage
- Content optimization
- Performance fine-tuning

### Future Enhancements

- Advanced AI chatbot features
- Real-time project tracking dashboard
- Client portal development
- Mobile app considerations
- Enhanced 3D project visualizations

See: [Future Phases Roadmap](./docs/project/roadmaps/future-phases-roadmap.md)

---

## 🔧 Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript Errors:**

```bash
# Check for errors
npm run type-check

# Common fix: restart VS Code TypeScript server
# CMD/CTRL + Shift + P -> "TypeScript: Restart TS Server"
```

**Database Connection Issues:**

```bash
# Verify D1 database exists
npx wrangler d1 list

# Test local database
npx wrangler d1 execute mh-construction-db --local --command="SELECT 1;"

# Check migrations
npx wrangler d1 execute mh-construction-db --local --command="SELECT name FROM sqlite_master WHERE type='table';"
```

**Deployment Issues:**

```bash
# Verify Cloudflare authentication
npx wrangler whoami

# Check build output
npm run build:cloudflare

# Manual deployment
npx wrangler pages deploy .vercel/output/static --project-name=mh-construction
```

**Performance Issues:**

```bash
# Analyze bundle size
npm run build:analyze

# Check for large dependencies
npm run bundle:size

# Profile build
npm run build:profile
```

### Getting Help

1. Check [MasterIndex](./docs/master-index.md) for relevant documentation
2. Review [Development Index](./docs/development/development-index.md)
3. Search existing documentation (163 files, well-organized)
4. Check component documentation in [Components Index](./docs/components/components-index.md)
5. Review recent changes in git history

---

## 🔐 Security

### Best Practices

- Never commit API keys or secrets
- Use environment variables for all credentials
- Keep dependencies updated
- Follow OWASP security guidelines
- Validate all user inputs
- Sanitize database queries
- Use HTTPS in production

### Security Features

- Edge runtime security (Cloudflare)
- JWT-based authentication
- Session management
- Rate limiting (planned)
- Input validation
- SQL injection prevention (parameterized queries)
- XSS prevention (React's built-in protection)

See: [Security Documentation](./src/app/api/security/README.md)

---

## 📈 SEO Strategy

Current implementation achieves 100/100 scores through:

- Comprehensive metadata system
- Structured data (JSON-LD)
- **AI Search Engine Optimization (GEO)** - robots.txt + llms.txt for AI crawlers
- **Core Web Vitals optimized** - LCP < 2.5s with video hero backgrounds
- Optimized images and video assets
- Mobile-first responsive design
- Fast loading times (< 3.5s interactive)
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- XML sitemaps (static + dynamic)

Advanced roadmap: [Advanced SEO Optimization](./docs/technical/seo/advanced-seo-optimization.md)

---

**Last Updated:** December 14, 2025
**Version:** 4.0.1
**Status:** Production Ready | Veteran-Focused | Honesty-First | 100/100 SEO

---

_Building partnerships, serving communities, creating lasting value in the Pacific Northwest._
_Veteran-owned. Veteran-operated. Your word is your bond — so is ours._
