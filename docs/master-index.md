# MH Construction Documentation Master Index

**Welcome to the MH Construction Documentation Hub** | **Last Updated**: November 12, 2025

This is your central navigation point for all MH Construction project documentation. Whether you're a developer,
designer, content writer, or stakeholder, start here to find what you need.

---

## 🚀 Quick Start

**New to the project?**

- 🆕 **[Development Quick Start](./development/development-index.md)** - Get up and running
- 📖 **[Consistency Guide](./development/consistency-guide.md)** - Implementation standards (START HERE for development)
- ⚡ **[Style Utilities Guide](./development/style-utilities-guide.md)** - ⭐ **NEW** - Centralized style utilities (mandatory)
- 🎨 **[Branding Overview](./branding/branding-index.md)** - Brand guidelines and visual standards
- 🏗️ **[Project Overview](./project/project-index.md)** - Architecture and roadmaps

### 🔧 Refactoring Summary (Nov 8, 2025)

Centralized cards, grids, sections, career data → ~750 lines removed, 90+ instances standardized.
See: [Style Utilities Guide](./development/style-utilities-guide.md) · [Refactoring Roadmap](./technical/refactoring-roadmap.md).

### ⚡ Interactive Enhancements (Phase 5 Complete)

Delivered FormProgress, InteractiveTimeline, ActivityFeed, TeamMemberTag, BeforeAfterSlider.
Replaced simple calculators with AI-powered estimator system (`/estimator`) →
+35–60% engagement uplift expected. Build: 31.0s, Homepage bundle 217 kB, zero TS/ESLint errors.

### 🤖 AI System Integration (Nov 10, 2025)

**Two Distinct User Paths:**

1. **AI Estimator** (`/estimator`) - Automated instant estimates
   - 24/7 availability, under 5 minutes
   - Based on 500+ project database
   - Preliminary budget planning

2. **Expert Consultation** (`/booking`) - Human expert analysis
   - In-person detailed assessment
   - Custom solutions & open-book pricing
   - Scheduled appointments

**Chatbot Integration**: "General MH" intelligently routes users to appropriate path based on query intent.
Use `ChatbotCTASection` + contextual prompts for lead capture & analytics.

### 🧩 Shared Section Components (Nov 10, 2025)

Created reusable page sections to eliminate duplicate code across website.

**Components Created:**

- `TestimonialsSection` - Testimonials carousel with customizable content
- `NextStepsSection` - Three-option CTA cards (Consultation, Estimate, Contact)
- `AIEstimatorCTA` - AI estimator promotion with full/compact variants

**Impact:** ~425 lines removed, 3 pages refactored (homepage, about, services).
See: [Shared Sections Guide](./components/shared-sections-guide.md) · [Components Index](./components/components-index.md).

---

## 📚 Documentation Categories

### 🎨 [Branding](./branding/branding-index.md)

#### Brand identity, visual standards, and guidelines

- **[Brand Strategy](./branding/strategy/)** - Brand identity, messaging, content standards
- **[Visual Standards](./branding/standards/)** - Colors, typography, icons, components
- **[Implementation Reference](./branding/implementation/)** - Developer quick reference
- **[Branding Archive](./archive/branding-archive/)** - Historical brand documents (8 files)

**Key Files:**

- [Brand Overview](./branding/strategy/brand-overview.md) - Core brand identity
- [Messaging Guidelines](./branding/strategy/messaging.md) - Voice, tone, communication
- [Slogan Rotation Guide](./branding/strategy/slogan-rotation-guide.md) - Complete slogan library
- [Hero Tagline Strategy](./branding/strategy/hero-tagline-strategy.md) - ⭐ **NEW** (Nov 2025) -
  Page-specific hero taglines
- [Color System](./branding/standards/color-system.md) - Complete color palette
- [Typography](./branding/standards/typography.md) - Font system and hierarchy
- [Hero Section Standards](./branding/standards/hero-section-standards.md) - Hero implementation
- [Icons Hub](./technical/design-system/icons/icons-index.md) - Complete icon system

---

### 💼 [Business](./business/business-index.md)

#### Company information, services, and team

- **[Services](./business/services.md)** - What we offer
- **[Core Values](./business/core-values.md)** - Our principles
- **[Team Roster](./business/team-roster.md)** - Meet the team
- **[Team Profiles](./business/team-profiles/)** - Individual team members
- **[Veterans Initiative](./business/veterans.md)** - Veteran-owned status, community programs, and our annual fishing event
- **[Government Projects](./business/government-grant-projects.md)** - Grant expertise

**Master Reference:**

- [MH Branding Index](./branding/branding-index.md) - Modular brand documentation hub

---

### 🧩 [Components](./components/components-index.md)

#### Component library and implementation guides

- **[UI Components](./components/ui/mh-ui-guide.md)** - Reusable UI component library
- **[Navigation Components](./components/navigation/navigation-components-guide.md)** - Navigation patterns and implementation
- **[Interactive Components](./components/before-after-slider-guide.md)** - Before/After slider and interactive features

**When to Use:**

- Building new features with existing components
- Understanding component APIs and props
- Implementing navigation patterns
- Creating interactive user interfaces

---

### 💻 [Development](./development/development-index.md)

#### Development standards, guidelines, and tools

**⭐ Essential Reading:**

- **[Consistency Guide](./development/consistency-guide.md)** - ⭐ Complete implementation standards (733 lines)
- **[Development Standards](./development/development-standards.md)** - Coding conventions
- **[AI Development Guidelines](./development/ai-development-guidelines.md)** - Rules for AI assistants

**Categories:**

- **[Component Standards](./branding/standards/component-standards.md)** - Component design standards
- **[Components Index](./components/components-index.md)** - Complete component documentation hub
- **[UI Components Guide](./components/ui/mh-ui-guide.md)** - Reusable UI components library
- **[Navigation Components Guide](./components/navigation/navigation-components-guide.md)** - Navigation implementation
- **[Reference Hub](./development/reference/reference-index.md)** - Quick references and checklists (6 references)
- **[Guidelines](./development/guidelines/)** - Detailed development guidelines

**Tools & Utilities:**

- [VS Code Complete Setup](./development/vscode-setup-complete.md) - ⭐ **NEW (Nov 2025)** - Full configuration guide
- [VS Code Extensions Guide](./development/vscode-extensions-guide.md) - Detailed extension documentation
- [Chatbot Enhancement Guide](./development/chatbot-enhancement-guide.md) - ⭐ **NEW (Nov 12, 2024)** -
  Comprehensive chatbot improvement strategies (Phases 1-4 roadmap)
- [Chatbot Integration Complete](./development/chatbot-integration-complete.md) - FAQ system implementation (Phase 1)
- [Chatbot Phase 2 Complete](./development/chatbot-phase2-complete.md) - Contact, pricing, timeline handlers (Phase 1)
- [Chatbot Phase 2 Short-term](./development/chatbot-phase2-short-term-complete.md) - ⭐ **NEW (Nov 12, 2024)** -
  Knowledge base, synonyms, follow-ups, analytics (Phase 2, 95-98% coverage)
- [Chatbot Phase 3 Complete](./development/chatbot-phase3-complete.md) - ⭐ **NEW (Nov 2024)** -
  Conversation memory, confidence scoring, personalization, feedback system (Phase 3, 98-99% coverage)
- [Scripts Guide](../scripts/mh-scripts-guide.md) - ⭐ **ESSENTIAL** - Automation scripts (SEO, testing, cleanup, optimization)
- [Testing Guide](../testing/mh-testing-guide.md) - ⭐ **ESSENTIAL** - Comprehensive testing suites (cohesion, security, responsive)
- [Config Directory Guide](../config/config-directory-guide.md) - Deployment configs (Cloudflare, Docker, monitoring)
- [Troubleshooting](./development/troubleshooting.md)
- [Terminology Guide](./development/terminology-guide.md)
- [Documentation Maintenance](./development/documentation-maintenance-guide.md)

---

### 🔧 [Technical](./technical/technical-index.md)

#### Architecture, APIs, and technical implementation

**System Architecture:**

- **[Configuration Guide](./technical/configuration-guide.md)** - 🆕 **NEW** - Complete configuration system documentation
- **[Config Directory Guide](../config/config-directory-guide.md)** - Deployment-specific configs (Cloudflare, Docker, CI/CD)
- **[Design System Hub](./technical/design-system/design-system-index.md)** - Complete design system navigation
- **[Design System Standards](./technical/design-system/design-system.md)** - Core design system
- **[Features](./technical/features.md)** - Platform features and capabilities
- **[Email System](./technical/email-system.md)** - Email infrastructure (dual recipients: office@ + matt@)
- **[Phone Tracking System](./technical/phone-tracking-system.md)** - ⭐ **NEW (Nov 2025)** -
  Phone call tracking with instant notifications

**Subsystems:**

- **[Navigation Hub](./technical/navigation/navigation-index.md)** - Navigation system documentation
- **[Performance Hub](./technical/performance/performance-index.md)** - Performance optimization
- **[SEO & Accessibility Hub](./technical/seo/seo-index.md)** - Search and accessibility

**SEO Documentation:**

- **[Ultimate SEO Guide](./technical/seo/ultimate-seo-guide.md)** - Auto-adaptive SEO system (100/100 score)
- **[Advanced SEO Optimization](./technical/seo/advanced-seo-optimization.md)** - Multi-search engine strategies
- **[SEO Quick Reference](../seo-quick-reference.md)** - Quick SEO commands and tips
- Run `npm run seo:audit` for automated SEO analysis

**Key Design System Docs:**

- [Design System Hub](./technical/design-system/design-system-index.md) - Complete navigation
- [Buttons & CTAs Hub](./technical/design-system/buttons-and-ctas/buttons-ctas-index.md) - Button system
- [Icons Hub](./technical/design-system/icons/icons-index.md) - Icon system
- [Layout Hub](./technical/design-system/layout/layout-index.md) - Page layout documentation
- [Page Layout Standards](./technical/design-system/layout/page-layout-standards.md) - Layout standards
- [Mobile Optimization Guide](./technical/design-system/mobile-optimization-guide.md) - Mobile design

**Chatbot System:**

- [Chatbot First Strategy](./development/chatbot-first-strategy.md) - Chatbot-first user engagement strategy
- [Chatbot Enhancement Guide](./development/chatbot-enhancement-guide.md) - ⭐ **NEW (Nov 12, 2024)** -
  10 enhancement strategies and implementation roadmap (Phases 1-3 complete)
- [Chatbot Phase 1: Integration](./development/chatbot-integration-complete.md) - FAQ system (20+ responses, 90-95% coverage)
- [Chatbot Phase 1: Query Handlers](./development/chatbot-phase2-complete.md) - Contact, pricing, timeline handlers
- [Chatbot Phase 2: SHORT-TERM](./development/chatbot-phase2-short-term-complete.md) - ⭐ **NEW (Nov 12, 2024)** -
  Knowledge base, synonyms (30+), follow-ups (7 categories), analytics (95-98% coverage)
- [Chatbot Phase 3: MEDIUM-TERM](./development/chatbot-phase3-complete.md) - ⭐ **NEW (Nov 2024)** -
  Conversation memory, confidence scoring, personalization, feedback collection (98-99% coverage)

**Summary:** Phases 1-3 complete. Chatbot coverage progression:
60% (baseline) → 90-95% (Phase 1) → 95-98% (Phase 2) → 98-99% (Phase 3) ✨
~965 lines of intelligent code added across all phases.

---

### 🚀 [Deployment](./deployment/deployment-index.md)

Deployment, hosting, and production guides.

Key docs: [Cloudflare Deployment Ready](./deployment/cloudflare-deployment-ready.md) ·
[Pages Setup](./deployment/cloudflare-pages-setup.md) · [D1 Setup](./deployment/d1-database-setup.md) ·
[Cloudflare Optimization](./deployment/cloudflare-optimization.md)

---

### 🏗️ [Project](./project/project-index.md)

#### Project management, roadmaps, and architecture

- **[History](./project/history/)** - Project evolution and decisions
- **[Roadmaps](./project/roadmaps/)** - Future plans and milestones

**Key Documents:**

- [Architecture](./project/architecture.md) - System design overview

---

### 🔄 [Migrations](./migrations/migrations-index.md)

#### Migration guides and transition documentation

- **[Documentation Migrations](./migrations/documentation/)** - Doc structure changes
- **[Domain Migrations](./migrations/domains/)** - Domain and email transitions

---

### 🤝 [Partnerships](./partnerships/partnerships-index.md)

#### Partnership and vendor documentation

**⚠️ CRITICAL DISTINCTION:** MH Construction uses "partnership" in two fundamentally different contexts:

- **Client Partnerships** 🏠 - Project collaborations with homeowners and businesses (project clients)
- **Trade Partnerships** 🏗️ - Business relationships with subcontractors, suppliers, and vendors

**Essential Reading:**

- **[Partnership Type Definitions](./partnerships/partnership-type-definitions.md)** ⭐ **START HERE** -
  Comprehensive guide defining both partnership types with implementation guidelines
- **[Partnership Implementation Guide](./development/reference/partnership-implementation-guide.md)** -
  Developer quick reference for code implementation

**Categories:**

- **[Messaging](./partnerships/messaging/)** - Communication standards for both partnership types
- **[Vendor & Trade](./partnerships/vendor-trade/)** - Trade partner specific information

**Key Guides:**

- [Partnership Messaging Guide](./partnerships/messaging/partnership-messaging-guide.md) - Overall messaging framework
- [Client vs Vendor Distinctions](./partnerships/messaging/client-vs-vendor-distinctions.md) - Language patterns
- [Trade Partnership Guide](./partnerships/vendor-trade/trade-partnership-guide.md) - Trade partner onboarding

**Quick Reference:**

| Partnership Type | Audience                         | Primary CTA                   | Color        | Icon           | Routes                  |
| ---------------- | -------------------------------- | ----------------------------- | ------------ | -------------- | ----------------------- |
| **Client** 🏠    | Homeowners, businesses hiring us | "Get Free Estimate"           | Hunter Green | `handshake`    | `/services`, `/booking` |
| **Trade** 🏗️     | Subcontractors, suppliers        | "Apply to be Approved Vendor" | Leather Tan  | `construction` | `/trade-partners`       |

---

### ⚙️ [Operations](./operations/operations-index.md)

Build processes & performance (see build optimization subsection).

---

### 📄 [Templates](./templates/templates-index.md)

Document & code templates for rapid creation.

---

## 🎯 Documentation by Role

### **For Developers**

1. **[Consistency Guide](./development/consistency-guide.md)** ⭐ START HERE
2. **[Style Utilities Guide](./development/style-utilities-guide.md)** ⭐ NEW - Mandatory for all development
3. **[Ultimate SEO Guide](./technical/seo/ultimate-seo-guide.md)** ⭐ AUTO-ADAPTIVE SEO
4. **[Development Standards](./development/development-standards.md)** - Coding rules
5. **[AI Guidelines](./development/ai-development-guidelines.md)** - AI assistant rules
6. **[Design System](./technical/design-system/design-system.md)** - UI components
7. **[VS Code Complete Setup](./development/vscode-setup-complete.md)** - ⭐ **NEW** - Full configuration + custom snippets
8. **[Refactoring Roadmap](./technical/refactoring-roadmap.md)** - Code improvement initiatives

**Quick Actions:**

- Use utilities: See [Quick Reference](./development/style-utilities-quick-reference.md)
- Use code snippets: Type `mh-` in any `.tsx` file (see [VS Code Setup](./development/vscode-setup-complete.md))
- Add new page: Update `src/app/sitemap.ts` + run `npm run seo:audit`
- Check SEO: `npm run seo:audit`
- See [SEO Quick Reference](../seo-quick-reference.md)

### **For Designers**

1. **[Branding Index](./branding/branding-index.md)** - Brand guidelines hub
2. **[Color System](./branding/standards/color-system.md)** - Colors and palette
3. **[Typography](./branding/standards/typography.md)** - Font system
4. **[Component Standards](./branding/standards/component-standards.md)** - UI specs
5. **[Design System](./technical/design-system/design-system.md)** - Complete patterns
6. **[VS Code Setup](./development/vscode-setup-complete.md)** - Editor configuration for design tokens

### **For Content Writers**

1. **[Messaging Guidelines](./branding/strategy/messaging.md)** - Voice and tone
2. **[Content Standards](./branding/strategy/content-messaging-standards.md)** - Writing rules
3. **[Partnership Messaging](./partnerships/messaging/partnership-messaging-guide.md)** - Partner content
4. **[SEO Best Practices](./technical/seo/ultimate-seo-guide.md)** - SEO content optimization
5. **[CTA Standards](./branding/standards/cta-standardization-plan.md)** - Call-to-action patterns

### **For Project Managers**

1. **[Project Index](./project/project-index.md)** - Project overview
2. **[Business Index](./business/business-index.md)** - Business information
3. **[Roadmaps](./project/roadmaps/)** - Future plans
4. **[Migrations](./migrations/migrations-index.md)** - Transition tracking

---

## 📊 Snapshot Metrics (Nov 2025)

| Metric                    | Value                                       |
| ------------------------- | ------------------------------------------- |
| Markdown Files            | 178                                         |
| Categories                | 11                                          |
| Index Files               | 29                                          |
| Root-Level Guides         | 4 (scripts, testing, config, seo-quick-ref) |
| Build Time                | 31.0s                                       |
| SEO Coverage              | 13/13 pages 100%                            |
| Static Pages Generated    | 21                                          |
| Quality Score             | 97–98/100                                   |
| Interactive Systems       | 6                                           |
| Chatbot Coverage          | 90-95% (Phase 1 & 2 complete)               |
| Lines Optimized (removed) | 10,925+ (includes shared sections)          |

---

## 🔍 Finding What You Need

### **By Topic**

| Topic              | Primary Location   | Quick Link                                                                             |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| **Brand Colors**   | Branding Standards | [color-system.md](./branding/standards/color-system.md)                                |
| **Typography**     | Branding Standards | [typography.md](./branding/standards/typography.md)                                    |
| **Icons**          | Design System      | [icons/](./technical/design-system/icons/icons-index.md)                               |
| **Components**     | Components         | [components-index.md](./components/components-index.md)                                |
| **UI Library**     | Components         | [mh-ui-guide.md](./components/ui/mh-ui-guide.md)                                       |
| **Mobile**         | Technical          | [mobile-optimization-guide.md](./technical/design-system/mobile-optimization-guide.md) |
| **Buttons & CTAs** | Design System      | [buttons-and-ctas/](./technical/design-system/buttons-and-ctas/buttons-ctas-index.md)  |
| **Navigation**     | Technical          | [navigation/](./technical/navigation/)                                                 |
| **SEO**            | Technical          | [seo/](./technical/seo/seo-index.md)                                                   |
| **SEO Audit**      | Root               | Run `npm run seo:audit`                                                                |
| **Advanced SEO**   | Technical          | [advanced-seo-optimization.md](./technical/seo/advanced-seo-optimization.md)           |
| **Deployment**     | Deployment         | [cloudflare-deployment-ready.md](./deployment/cloudflare-deployment-ready.md)          |
| **Database**       | Deployment         | [d1-database-setup.md](./deployment/d1-database-setup.md)                              |

### **By File Type**

- **Standards**: Look in `branding/standards/` or `development/`
- **Guides**: Check `partnerships/messaging/` or `technical/`
- **References**: See `development/reference/`
- **Templates**: Browse `templates/`
- **Archives**: Check central `archive/` directory (15 files organized by category)

---

## 🆘 Need Help?

### **Common Questions**

**Q: Where do I start as a new developer?**  
A: Read the [Consistency Guide](./development/consistency-guide.md) first, then [Development Standards](./development/development-standards.md).

**Q: How do I implement brand standards?**  
A: Start with [Branding Index](./branding/branding-index.md), then see
[Consistency Guide](./development/consistency-guide.md) for code patterns.

**Q: Where are the component examples?**  
A: See [Design System](./technical/design-system/design-system.md) and [Component Standards](./branding/standards/component-standards.md).

**Q: How do I deploy changes?**  
A: Check [Cloudflare Deployment Ready](./deployment/cloudflare-deployment-ready.md).

**Q: Where's the style guide?**  
A: [Consistency Guide](./development/consistency-guide.md) has everything - it's the one-stop implementation reference.

### **Troubleshooting**

- **Build Issues**: [Troubleshooting Guide](./development/troubleshooting.md)
- **Documentation Issues**: [Documentation Maintenance](./development/documentation-maintenance-guide.md)
- **VS Code Setup**: [VS Code Extensions Guide](./development/vscode-extensions-guide.md)

---

## 📝 Documentation Standards

### **File Naming Conventions**

- Index files: `{folder-name}-index.md`
- Guides: `{topic}-guide.md`
- Standards: `{topic}-standards.md`
- References: `{topic}-reference.md`
- Archives: `archive-{description}.md`

### **Required Metadata**

```markdown
# Document Title

**Category**: Business|Development|Technical|Branding|Project
**Last Updated**: YYYY-MM-DD
**Status**: ✅ Current | ⚠️ Needs Update | 🗄️ Archived
```

### **Link Format**

- Relative links: `./folder/file.md`
- Always use `.md` extension
- Test links before committing

---

## 🔄 Recent Highlights (Condensed)

- Docs filing optimization complete (174 MD files indexed) ✔️
- Phase 5 interactive feature set deployed (6 major components) ✔️
- 100/100 SEO across 13 audited pages ✔️
- Code & brand consolidation (10,500+ lines removed) ✔️
- Advanced 10-phase SEO roadmap established ✔️

Maintenance: Weekly (incremental), Monthly (index audit), Quarterly (full review).

---

## 🌟 Quick Actions

| I want to...             | Go here                                                                          |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Start developing**     | [Consistency Guide](./development/consistency-guide.md)                          |
| **Use style utilities**  | [Style Utilities Guide](./development/style-utilities-guide.md)                  |
| **Improve chatbot**      | [Chatbot Enhancement Guide](./development/chatbot-enhancement-guide.md)          |
| **Add a new page**       | [Ultimate SEO Guide](./technical/seo/ultimate-seo-guide.md)                      |
| **Check SEO**            | Run `npm run seo:audit` or [SEO Quick Ref](../seo-quick-reference.md)            |
| **Run tests**            | [Testing Guide](../testing/mh-testing-guide.md) - Cohesion, security, responsive |
| **Use automation**       | [Scripts Guide](../scripts/mh-scripts-guide.md) - SEO, cleanup, optimization     |
| **Learn the brand**      | [Branding Index](./branding/branding-index.md)                                   |
| **See components**       | [Design System](./technical/design-system/design-system.md)                      |
| **View refactoring**     | [Refactoring Roadmap](./technical/refactoring-roadmap.md)                        |
| **Deploy to production** | [Deployment](./deployment/cloudflare-deployment-ready.md)                        |
| **Write content**        | [Messaging Guidelines](./branding/strategy/messaging.md)                         |
| **Check the roadmap**    | [Project Roadmaps](./project/roadmaps/)                                          |
| **Fix an issue**         | [Troubleshooting](./development/troubleshooting.md)                              |
| **Contact the team**     | [Team Roster](./business/team-roster.md)                                         |

---

## 📧 Contact & Support

- **Development Questions**: See [Development Index](./development/development-index.md)
- **Brand Questions**: See [Branding Index](./branding/branding-index.md)
- **Project Management**: See [Project Index](./project/project-index.md)

---

**🏠 [Back to Main README](../README.md)**

---

**Maintained by**: MH Construction Documentation Team  
**Version**: 4.0.1 (aligned with application package.json)  
**Last Updated**: November 12, 2025

> Internal Cohesion Note: Enhanced visibility for root-level guides (scripts, testing).
> All 29 index files verified current (Nov 6-12, 2025).
> Chatbot system documentation added (3 comprehensive guides, 90-95% coverage).
> Root-level guides prominently featured in Quick Actions and Tools & Utilities.
> Re-run `find . -name '*.md' | wc -l` and `npm run validate:links` monthly.
