# Developer Workflow Pathway

**Category**: Development Workflow & Onboarding  
**Last Updated**: November 18, 2025  
**Status**: ✅ Active - Complete Developer Journey

---

## 🧭 Quick Navigation

- **[📚 Master Index](../master-index.md)** - Central documentation hub
- **[🎨 Branding Index](../branding/branding-index.md)** - Brand guidelines
- **[🎨 Standards Index](../branding/standards/standards-index.md)** - Visual design standards
- **[💻 Development Index](./development-index.md)** - Development documentation
- **[🔧 Technical Index](../technical/technical-index.md)** - Technical documentation

---

## 🎯 Purpose

This guide provides a **step-by-step pathway** through all MH Construction documentation, connecting branding
standards, development guidelines, and implementation references in a logical order. Follow this path to understand
how all documentation connects and guides your development work.

---

## 📖 The Complete Developer Journey

### Phase 1: Understanding the Brand (30-45 minutes)

**Goal**: Learn the brand identity, messaging, and visual standards before writing any code.

#### Step 1: Brand Foundation

📍 **Start**: [Master Index](../master-index.md) → [Branding Index](../branding/branding-index.md)

**Read in order**:

1. **[Brand Overview](../branding/strategy/brand-overview.md)** (10 min)
   - Company identity and mission
   - Core values and positioning
   - Partnership philosophy

2. **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** ⭐ **CRITICAL** (15 min)
   - 7 page groups with unique voices
   - Group 1: Homepage & Landing Pages (Professional, Trustworthy)
   - Group 2: Service Pages (Consultative, Detailed)
   - Group 3: About/Team Pages (Warm, Personal)
   - Group 4: Project Showcase (Confident, Technical)
   - Group 5: Careers/Recruitment (Enthusiastic, Aspirational)
   - Group 6: Resources/Blog (Educational, Helpful)
   - Group 7: Contact/Conversion (Action-Oriented, Clear)

3. **[Universal Terminology Guide](../branding/strategy/universal-terminology-guide.md)** ⭐ **ESSENTIAL** (10 min)
   - Company-wide language standards
   - "Client Partners" vs "customers"
   - Veteran status language
   - Partnership terminology

**Why this matters**: You need to understand the brand voice BEFORE implementing any page. Each page group has
a different tone, and using the wrong voice damages brand consistency.

---

#### Step 2: Visual Standards

📍 **Start**: [Branding Index](../branding/branding-index.md) → [Standards Index](../branding/standards/standards-index.md)

**Read in order**:

1. **[Color System](../branding/standards/color-system.md)** (5 min)
   - Primary: Hunter Green `#386851`
   - Secondary: Leather Tan `#BD9264`
   - Dark mode: `dark:text-gray-100` for headings (NOT `dark:text-white`)

2. **[Typography](../branding/standards/typography.md)** (10 min)
   - Font: Inter (Google Fonts)
   - Responsive scaling patterns
   - **CRITICAL RULE**: Always use `dark:text-gray-100` for h2/h3/h4

3. **[Component Standards](../branding/standards/component-standards.md)** (10 min)
   - Button styles and variants
   - Card components
   - Form elements

4. **[Homepage Compliance Checklist](../branding/standards/homepage-compliance-checklist.md)** ⭐ **NEW** (5 min)
   - Validation commands
   - Common mistakes to avoid
   - Quick reference for standards

**Why this matters**: The homepage (`src/app/page.tsx`) is the source of truth. All pages must match these
visual patterns for consistency.

---

### Phase 2: Development Standards (45-60 minutes)

**Goal**: Learn the technical implementation patterns and coding standards.

#### Step 3: Core Implementation Guide

📍 **Start**: [Development Index](./development-index.md) → Implementation Guides

**Read in order**:

1. **[Consistency Guide](./consistency-guide.md)** ⭐ **MANDATORY** (30 min)
   - Complete implementation standards (733 lines)
   - Page structure patterns
   - Section visual patterns (3 blur orbs + 2 radial gradients)
   - Component usage patterns
   - Typography implementation
   - Color implementation
   - Mobile responsiveness

2. **[Section Visual Standards](./guidelines/section-visual-standards.md)** ⭐ **NEW** (15 min)
   - Icon headers with glow effects
   - Card layouts and spacing
   - CTA button placement
   - Complete section examples from homepage/about

3. **[Style Utilities Guide](./style-utilities-guide.md)** ⭐ **MANDATORY** (10 min)
   - Centralized style utilities
   - Reusable card/grid/section components
   - Import patterns

4. **[Style Utilities Quick Reference](./style-utilities-quick-reference.md)** ⚡ (5 min)
   - Daily cheat sheet
   - Copy-paste ready examples
   - Common patterns

**Why this matters**: The Consistency Guide is your single source of truth for HOW to implement pages.
It connects brand standards to actual code patterns.

---

#### Step 4: Component Library

📍 **Start**: [Components Index](../components/components-index.md)

**Read in order**:

1. **[UI Components Guide](../components/ui/mh-ui-guide.md)** (15 min)
   - Button component API
   - Card component API
   - Form components
   - MaterialIcon component

2. **[Shared Sections Guide](../components/shared-sections-guide.md)** (10 min)
   - TestimonialsSection
   - NextStepsSection
   - AIEstimatorCTA

**Why this matters**: Use existing components instead of creating new ones. This ensures consistency and reduces code duplication.

---

### Phase 3: Page Development Workflow (15-20 minutes)

**Goal**: Understand the complete workflow for creating or editing pages.

#### Step 5: Page Creation Process

📍 **Start**: [Development Index](./development-index.md) → Workflow Guides

**Read in order**:

1. **[New Page Development Guide](./new-page-development-guide.md)** (10 min)
   - Complete page creation workflow
   - Navigation integration
   - Breadcrumb setup
   - SEO optimization

2. **[Cohesion Checklist](./cohesion-checklist.md)** (10 min)
   - Pre-development checklist
   - During development checklist
   - Post-development checklist
   - Testing requirements

**Why this matters**: This is your step-by-step process for creating new pages that match all standards.

---

### Phase 4: Specialized Topics (As Needed)

**Goal**: Deep dive into specific areas based on your task.

#### SEO & Performance

📍 **Start**: [Technical Index](../technical/technical-index.md) → [SEO Index](../technical/seo/seo-index.md)

- **[SEO Complete Guide](../technical/seo/seo-complete-guide.md)** - Comprehensive SEO reference
- **[SEO Quick Reference](../../seo-quick-reference.md)** - Quick commands
- Run `npm run seo:audit` for automated checks

#### Buttons & CTAs

📍 **Start**: [Design System Index](../technical/design-system/design-system-index.md)

- **[Buttons & CTAs Complete Guide](../technical/design-system/buttons-ctas-complete-guide.md)** - Complete button system

#### Navigation

📍 **Start**: [Navigation Index](../technical/navigation/navigation-index.md)

- **[Navigation Complete Guide](../technical/navigation/navigation-complete-guide.md)** - Complete navigation system

#### Icons

📍 **Start**: [Icons Index](../technical/design-system/icons-index.md)

- **[Icon System Complete](../technical/design-system/icon-system-complete.md)** - Complete icon system

---

## 🎯 Quick Reference: Development Flow Chart

```text
┌─────────────────────────────────────────────────────────────┐
│  START: Master Index                                        │
│  📚 docs/master-index.md                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: UNDERSTAND BRAND                                  │
├─────────────────────────────────────────────────────────────┤
│  1. Branding Index → Brand Overview                         │
│  2. Page-Specific Messaging Guide (7 groups) ⭐             │
│  3. Universal Terminology Guide ⭐                           │
│  4. Standards Index → Color System                          │
│  5. Typography Standards                                    │
│  6. Component Standards                                     │
│  7. Homepage Compliance Checklist ⭐                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: LEARN IMPLEMENTATION                              │
├─────────────────────────────────────────────────────────────┤
│  1. Development Index                                       │
│  2. Consistency Guide (PRIMARY REFERENCE) ⭐                │
│  3. Section Visual Standards ⭐                              │
│  4. Style Utilities Guide ⭐                                 │
│  5. Style Utilities Quick Reference ⚡                       │
│  6. Components Index → UI Components                        │
│  7. Shared Sections Guide                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 3: CREATE/EDIT PAGES                                 │
├─────────────────────────────────────────────────────────────┤
│  1. New Page Development Guide                              │
│  2. Cohesion Checklist (before, during, after)              │
│  3. Homepage Compliance Checklist (validation)              │
│  4. Run: npm run seo:audit                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 4: SPECIALIZED TOPICS (as needed)                    │
├─────────────────────────────────────────────────────────────┤
│  → SEO Complete Guide                                       │
│  → Buttons & CTAs Complete Guide                            │
│  → Navigation Complete Guide                                │
│  → Icon System Complete                                     │
│  → Mobile Optimization Guide                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Documentation Connections Map

### How All Documentation Connects

```text
Master Index (docs/master-index.md)
├── 🎨 Branding Index (docs/branding/branding-index.md)
│   ├── 📘 Strategy (docs/branding/strategy/)
│   │   ├── brand-overview.md ← START HERE for brand identity
│   │   ├── page-specific-messaging-guide.md ⭐ CRITICAL (7 groups)
│   │   ├── universal-terminology-guide.md ⭐ ESSENTIAL
│   │   ├── messaging.md
│   │   └── estimator-vs-consultation-language.md
│   │
│   ├── 🎨 Standards (docs/branding/standards/)
│   │   ├── standards-index.md ← Visual standards hub
│   │   ├── color-system.md
│   │   ├── typography.md
│   │   ├── component-standards.md
│   │   ├── hero-section-standards.md
│   │   ├── section-enhancement-patterns.md
│   │   └── homepage-compliance-checklist.md ⭐ NEW
│   │
│   └── 🔧 Implementation (docs/branding/implementation/)
│       └── branding-quick-reference.md
│
├── 💻 Development Index (docs/development/development-index.md)
│   ├── consistency-guide.md ⭐ PRIMARY REFERENCE (733 lines)
│   ├── section-visual-standards.md ⭐ NEW
│   ├── style-utilities-guide.md ⭐ MANDATORY
│   ├── style-utilities-quick-reference.md ⚡ DAILY USE
│   ├── new-page-development-guide.md
│   ├── cohesion-checklist.md
│   ├── development-standards.md
│   └── developer-workflow-pathway.md ← YOU ARE HERE
│
├── 🧩 Components Index (docs/components/components-index.md)
│   ├── ui/mh-ui-guide.md
│   ├── shared-sections-guide.md
│   └── navigation/navigation-components-guide.md
│
└── 🔧 Technical Index (docs/technical/technical-index.md)
    ├── design-system/
    │   ├── design-system-index.md
    │   ├── buttons-ctas-complete-guide.md
    │   ├── icon-system-complete.md
    │   └── mobile-optimization-guide.md
    │
    ├── seo/
    │   ├── seo-index.md
    │   └── seo-complete-guide.md
    │
    └── navigation/
        ├── navigation-index.md
        └── navigation-complete-guide.md
```

---

## 📋 Task-Based Pathways

### "I need to create a new page"

**Path**: Master Index → Branding → Development → Implementation

1. ✅ Read **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** -
   Identify which group your page belongs to
2. ✅ Read **[Universal Terminology Guide](../branding/strategy/universal-terminology-guide.md)** - Use correct language
3. ✅ Review **[Consistency Guide](./consistency-guide.md)** - Learn implementation patterns
4. ✅ Review **[Homepage Compliance Checklist](../branding/standards/homepage-compliance-checklist.md)** -
   Know validation standards
5. ✅ Follow **[New Page Development Guide](./new-page-development-guide.md)** - Step-by-step creation
6. ✅ Use **[Cohesion Checklist](./cohesion-checklist.md)** - Ensure consistency
7. ✅ Run `npm run seo:audit` - Validate SEO

---

### "I need to update an existing page"

**Path**: Standards → Development → Implementation

1. ✅ Check **[Homepage Compliance Checklist](../branding/standards/homepage-compliance-checklist.md)** - Know current standards
2. ✅ Review **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** -
   Confirm correct voice
3. ✅ Reference **[Consistency Guide](./consistency-guide.md)** - Apply correct patterns
4. ✅ Use **[Style Utilities Quick Reference](./style-utilities-quick-reference.md)** - Find code patterns
5. ✅ Run validation commands from Homepage Compliance Checklist
6. ✅ Run `npm run seo:audit`

---

### "I need to implement a section"

**Path**: Standards → Components → Implementation

1. ✅ Review **[Section Visual Standards](./guidelines/section-visual-standards.md)** - Learn section patterns
2. ✅ Check **[Section Enhancement Patterns](../branding/standards/section-enhancement-patterns.md)** - 3 blur orbs + 2 gradients
3. ✅ Review **[Homepage](../../src/app/page.tsx)** - See real examples
4. ✅ Use **[Style Utilities Guide](./style-utilities-guide.md)** - Import utilities
5. ✅ Reference **[Consistency Guide](./consistency-guide.md)** - Implementation details

---

### "I need to add a button/CTA"

**Path**: Design System → Components → Implementation

1. ✅ Read **[Buttons & CTAs Complete Guide](../technical/design-system/buttons-ctas-complete-guide.md)**
2. ✅ Check **[Component Standards](../branding/standards/component-standards.md)**
3. ✅ Use Button component from **[UI Components Guide](../components/ui/mh-ui-guide.md)**

---

### "I need to understand the brand"

**Path**: Branding → Strategy → Standards

1. ✅ Start **[Branding Index](../branding/branding-index.md)**
2. ✅ Read **[Brand Overview](../branding/strategy/brand-overview.md)**
3. ✅ Read **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** ⭐
4. ✅ Read **[Universal Terminology Guide](../branding/strategy/universal-terminology-guide.md)** ⭐
5. ✅ Review **[Messaging](../branding/strategy/messaging.md)**
6. ✅ Check **[Color System](../branding/standards/color-system.md)**
7. ✅ Check **[Typography](../branding/standards/typography.md)**

---

## 🎓 Learning Levels

### Level 1: Brand Foundation (Day 1)

**Time**: 1-2 hours

- [ ] Read Master Index overview
- [ ] Read Branding Index
- [ ] Read Brand Overview
- [ ] Read Page-Specific Messaging Guide ⭐
- [ ] Read Universal Terminology Guide ⭐
- [ ] Review Color System
- [ ] Review Typography Standards

**Outcome**: Understand brand identity, voice, and visual basics

---

### Level 2: Implementation Basics (Day 2-3)

**Time**: 2-3 hours

- [ ] Read Development Index
- [ ] Read Consistency Guide (PRIMARY) ⭐
- [ ] Read Section Visual Standards ⭐
- [ ] Review Style Utilities Guide
- [ ] Review Component Standards
- [ ] Review Homepage Compliance Checklist ⭐

**Outcome**: Understand how to implement pages and sections

---

### Level 3: Component Mastery (Day 4-5)

**Time**: 2-3 hours

- [ ] Review Components Index
- [ ] Study UI Components Guide
- [ ] Study Shared Sections Guide
- [ ] Review Buttons & CTAs Complete Guide
- [ ] Practice with Style Utilities Quick Reference

**Outcome**: Master reusable components and patterns

---

### Level 4: Advanced Topics (Week 2+)

**Time**: Ongoing

- [ ] Deep dive into SEO Complete Guide
- [ ] Study Navigation Complete Guide
- [ ] Study Icon System Complete
- [ ] Study Mobile Optimization Guide
- [ ] Review Technical Documentation as needed

**Outcome**: Expert-level understanding of all systems

---

## ✅ Validation Checklist

### Before Starting Development

- [ ] Read Page-Specific Messaging Guide - know which group your page belongs to
- [ ] Read Universal Terminology Guide - use correct language
- [ ] Read Consistency Guide - understand implementation patterns
- [ ] Review Homepage Compliance Checklist - know validation standards

### During Development

- [ ] Use Style Utilities Quick Reference - copy patterns
- [ ] Reference Section Visual Standards - match visual patterns
- [ ] Check Component Standards - use correct components
- [ ] Follow Cohesion Checklist - maintain consistency

### After Development

- [ ] Run validation commands from Homepage Compliance Checklist
- [ ] Run `npm run seo:audit`
- [ ] Verify no `dark:text-white` in headings
- [ ] Verify 3 blur orbs + 2 gradients per section
- [ ] Verify correct messaging voice for page group

---

## 🔗 Key Reference Files

### Must-Read (Everyone)

1. **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** ⭐ CRITICAL
2. **[Universal Terminology Guide](../branding/strategy/universal-terminology-guide.md)** ⭐ ESSENTIAL
3. **[Consistency Guide](./consistency-guide.md)** ⭐ PRIMARY REFERENCE
4. **[Homepage Compliance Checklist](../branding/standards/homepage-compliance-checklist.md)** ⭐ NEW

### Daily Use (Developers)

1. **[Style Utilities Quick Reference](./style-utilities-quick-reference.md)** ⚡
2. **[Section Visual Standards](./guidelines/section-visual-standards.md)** ⭐
3. **[New Page Development Guide](./new-page-development-guide.md)**
4. **[Cohesion Checklist](./cohesion-checklist.md)**

### Reference (As Needed)

1. **[Buttons & CTAs Complete Guide](../technical/design-system/buttons-ctas-complete-guide.md)**
2. **[SEO Complete Guide](../technical/seo/seo-complete-guide.md)**
3. **[Navigation Complete Guide](../technical/navigation/navigation-complete-guide.md)**
4. **[Icon System Complete](../technical/design-system/icon-system-complete.md)**

---

## 🚨 Critical Rules to Remember

### Branding Rules

1. ✅ Use correct voice for each page group (7 groups in Page-Specific Messaging Guide)
2. ✅ Use "Client Partners" not "customers" (Universal Terminology Guide)
3. ✅ Always use `dark:text-gray-100` for h2/h3/h4 (NOT `dark:text-white`)
4. ✅ Hunter Green `#386851` for primary, Leather Tan `#BD9264` for secondary

### Implementation Rules

1. ✅ Homepage (`src/app/page.tsx`) is source of truth
2. ✅ Every section needs: 3 blur orbs + 2 radial gradients + icon header
3. ✅ Use centralized utilities from Style Utilities Guide
4. ✅ Follow Consistency Guide for all implementation patterns

### Validation Rules

1. ✅ Run validation commands from Homepage Compliance Checklist
2. ✅ Run `npm run seo:audit` after any page changes
3. ✅ Check Cohesion Checklist before marking complete
4. ✅ Verify responsive behavior on mobile

---

## 📞 Need Help?

### Documentation Issues

- Check **[Documentation Maintenance Guide](./documentation-maintenance-guide.md)**
- Verify links work: `npm run validate:links` (if available)

### Implementation Questions

- Review **[Consistency Guide](./consistency-guide.md)** first
- Check **[Troubleshooting Guide](./troubleshooting.md)**
- Reference **[Style Utilities Quick Reference](./style-utilities-quick-reference.md)**

### Design Questions

- Review **[Component Standards](../branding/standards/component-standards.md)**
- Check **[Design System](../technical/design-system/design-system.md)**
- Reference **[Section Visual Standards](./guidelines/section-visual-standards.md)**

---

## 🔄 Version History

- **1.0.0** (Nov 18, 2025): Initial comprehensive developer workflow pathway
  - Complete documentation connection map
  - Phase-by-phase learning path
  - Task-based pathways
  - Learning levels with time estimates
  - Validation checklists

---

**Maintained by**: MH Construction Development Team  
**Next Review**: December 2025

> **Note**: This is a living document. As new standards or guides are added, update this pathway to reflect the connections.
