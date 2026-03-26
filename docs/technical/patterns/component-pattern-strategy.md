# Website Component Pattern Strategy

## Overview

The MH Website uses a carefully curated set of reusable component patterns to
create a cohesive, professional user experience. This document outlines the
strategic approach to implementing these patterns across pages to maintain
consistency while allowing each page to have its unique character.

## Core Philosophy: "One of Each"

**Key Principle:** Each page should utilize 1-2 of these showcase patterns to
create visual interest without overwhelming users or creating pattern fatigue.

### Why This Matters

- **Consistency:** Users learn the visual language once, then recognize it across pages
- **Uniqueness:** Each page can choose different patterns for its specific content needs
- **Performance:** Limiting showcase patterns per page keeps load times reasonable
- **Engagement:** Variety across pages keeps the site feeling fresh during navigation
- **Maintainability:** Reusable components are easier to update and improve

## Available Showcase Patterns

### 1. AlternatingShowcase (Image/Text Alternating)

**Component:** `/src/components/ui/AlternatingShowcase.tsx`  
**Documentation:** `./AlternatingShowcase-pattern.md`

**Visual Format:**

- Alternating left/right image and text layout
- Large high-quality images with icon badges
- Detailed descriptions with optional metrics
- Professional, magazine-style presentation

**Best For:**

- 3-6 key features/concepts that benefit from visual reinforcement
- Content where imagery adds significant value
- Storytelling that needs visual context
- Professional showcase requiring gravitas

**Current Usage:**

- **Homepage:** Core Values Section (4 values)
- **About Page:** Safety Section (4 safety features)

**Ideal Page Types:**

- Services (service category deep-dives)
- Projects (project type showcases)
- About (values, capabilities, methodologies)
- Public Sector (compliance features)

### 2. ValuesShowcase (Interactive Modal Pattern)

**Component:** `/src/components/about/ValuesShowcase.tsx`

**Visual Format:**

- Card grid with hover effects and glow animations
- Click-to-open detailed modal overlays
- Expandable content for deep exploration
- Interactive, discovery-based experience

**Best For:**

- Complex information that needs progressive disclosure
- 3-6 categories with extensive detail
- Content users should explore at their own pace
- Building trust through comprehensive transparency

**Current Usage:**

- **About Page:** Values Showcase (3 categories: Partners, Community, Team)

**Ideal Page Types:**

- About (values, methodologies, differentiators)
- Services (service package details)
- Team (specialty area deep-dives)
- Any page where users need to "dig deeper" voluntarily

### 3. ContentCard Grid Pattern

**Component:** `/src/components/ui/ContentCard.tsx`  
**Documentation:** Component JSDoc

**Visual Format:**

- Consistent card grid (2-3 columns)
- Icon, category, title, description, CTA
- Variant options (news, feature, default)
- Clean, scannable presentation

**Best For:**

- 6+ items of similar type
- News, updates, announcements
- Feature lists, benefit summaries
- Any content requiring quick scanning

**Current Usage:**

- **About Page:** News & Achievements Section (6 cards)

**Ideal Page Types:**

- About (news, achievements, milestones)
- Services (service list overview)
- Projects (project portfolio grid)
- Careers (open positions, benefits)
- Blog/Resources (article previews)

### 4. Timeline Pattern

**Component:** `/src/components/ui/Timeline.tsx`

**Visual Format:**

- Vertical timeline with alternating left/right items
- Step numbers, icons, connecting lines
- Chronological or sequential presentation
- Clear progression visualization

**Best For:**

- Process steps (3-7 steps ideal)
- Company history/evolution
- Project lifecycle explanations
- Sequential methodologies

**Current Usage:**

- **Homepage:** Construction Process (5 steps)
- **About Page:** Company Evolution (5 milestones)

**Ideal Page Types:**

- Homepage (process overview)
- About (company history)
- Services (methodology breakdown)
- Projects (project phases)
- Careers (hiring process)

### 5. NextStepsSection (Unified CTA)

**Component:** `/src/components/shared-sections/NextStepsSection.tsx`  
**Documentation:** `./NextStepsSection-standardization.md`

**Visual Format:**

- Standardized final CTA section
- 4-card grid: PitchDeck, View Work, Get Estimate, Contact
- Gradient backgrounds with brand colors
- Consistent conversion funnel endpoint

**Usage Rule:** **Should appear on EVERY major page** as the final section (before footer)

**Current Usage:**

- Homepage, About, Services, Projects, Team, FAQ, Veterans

**Philosophy:**
This is the ONE pattern that should be repeated across all pages—it's the
unified conversion point that ties the entire site together.

## Strategic Pattern Assignment by Page

### Homepage

**Goal:** Broad overview, establish credibility, drive exploration

**Recommended Patterns:**

1. ✅ **Timeline** - Construction Process (already implemented)
2. ✅ **AlternatingShowcase** - Core Values (already implemented)
3. **ContentCard Grid** - Featured Projects or Services (3-4 cards)
4. ✅ **NextStepsSection** - Final CTA (already implemented)

**Strategy:** Show process + values, avoid overwhelming new visitors

---

### About Page

**Goal:** Build trust, showcase expertise, demonstrate values

**Recommended Patterns:**

1. ✅ **ValuesShowcase** - Why Values Matter (already implemented)
2. ✅ **Timeline** - Company Evolution (already implemented)
3. ✅ **AlternatingShowcase** - Safety & Compliance (already implemented)
4. ✅ **ContentCard Grid** - News & Achievements (already implemented)
5. ✅ **NextStepsSection** - Final CTA (already implemented)

**Strategy:** Most pattern-rich page—users here want comprehensive understanding

---

### Services Page ✅ COMPLIANT

**Goal:** Explain offerings, demonstrate expertise, drive inquiries

**Recommended Patterns:**

1. ✅ **ValuesShowcase (Modal)** - Core Services Interactive Exploration
   (implemented as CoreServicesSection)
1. ✅ **ContentCard Grid** - Specialty Services + Why Choose Us (multiple grids
   implemented)
1. ✅ **NextStepsSection** - Final CTA (already implemented)

**Implementation Status:** Page uses modal-based showcase (similar to
ValuesShowcase) for core services, multiple ContentCard grids for specialty
services and features, and NextStepsSection for final CTA. Strategy fully met.

**Strategy:** Choose ONE showcase pattern (Alternating OR Interactive), supplement with ContentCard grid

---

### Projects Page ✅ COMPLIANT

**Goal:** Showcase portfolio, demonstrate capabilities, inspire confidence

**Recommended Patterns:**

1. ✅ **ContentCard Grid** - Project Portfolio (3-column grid implemented)
2. ✅ **ContentCard Grid** - Capabilities + Why Choose (multiple supporting grids)
3. ✅ **NextStepsSection** - Final CTA (already implemented)
4. **AlternatingShowcase** - Project Type Highlights (OPTIONAL - not implemented, not required)

**Implementation Status:** Page uses primary ContentCard grid for portfolio with
multiple supporting grids. AlternatingShowcase marked as optional enhancement.
Core strategy fully met.

**Strategy:** Primarily grid-based for portfolio volume, optional Alternating for featured projects

---

### Team Page ✅ COMPLIANT

**Goal:** Humanize company, show expertise, build connection

**Recommended Patterns:**

1. ✅ **Static team cards** (appropriate—faces are the focus) - TeamProfileSection components by department
2. **Optional Enhancement:** ValuesShowcase for "Team Specialties" or "Department Capabilities" (not needed)
3. ✅ **ContentCard Grid** - Company Culture section (3 values: Team Unity, Leadership, Industry)
4. ✅ **Employee Testimonials** - Testimonial grid at optimal SEO position
5. ✅ **NextStepsSection** - Final CTA (already implemented)

**Implementation Status:** Page correctly prioritizes individual team member
profiles organized by 5 departments (Upper Brass, Mission Commanders, Field
Officers, Special Operations, Logistics Command). Includes employee
testimonials and company culture grid. Full compliance with "faces are the
focus" strategy.

**Strategy:** Keep focus on people, use interactive pattern only for specialty areas if needed

---

### Careers Page ✅ COMPLIANT

**Goal:** Attract talent, explain culture, drive applications

**Recommended Patterns:**

1. ✅ **AlternatingShowcase** - Why Work Here / Culture Pillars (4 culture values implemented)
2. ✅ **ContentCard Grid** - Benefits + Veteran Benefits + Open Positions (multiple grids)
3. ✅ **Timeline** - Application Process (5-step hiring timeline implemented)
4. ✅ **NextStepsSection** - Final CTA (standardized section added)

**Implementation Status:** Refactored culture values from 2x2 grid to
AlternatingShowcase for visual storytelling. All 4 recommended patterns now
present. Full compliance achieved.

**Strategy:** Show culture visually, make applying clear and simple

---

### Public Sector Page ✅ COMPLIANT

**Goal:** Demonstrate compliance, build government trust, show capabilities

**Recommended Patterns:**

1. ✅ **AlternatingShowcase** - Compliance Features (4 items implemented)
   - Prevailing Wage Compliance (DBRA)
   - Bonding & Insurance Excellence ($5M+ capacity)
   - Award-Winning Safety Programs (.64 EMR, OSHA VPP Star)
   - Veteran-Owned Commitment (Army veteran leadership)
2. ✅ **ContentCard Grid** - Grant Support Services (3 services)
3. ✅ **ContentCard Grid** - Hanford & DOE Capabilities (6 capabilities)
4. ✅ **ContentCard Grid** - Government Project Types (6 facility types)
5. ✅ **NextStepsSection** - Final CTA (added)

**Implementation Status:** Page refactored from "under construction" to full
production. Added AlternatingShowcase for federal compliance features with
detailed stats and visual storytelling. Multiple ContentCard grids showcase
services and capabilities. NextStepsSection provides final CTA. Full compliance
achieved.

**Strategy:** Visual credibility through Alternating, portfolio through grid

---

### Contact Page

**Goal:** Make contact easy, provide options, reduce friction

**Recommended Patterns:**

- **None** - This is a form-focused page
- Contact form is the primary interaction
- NextStepsSection would be redundant here

**Strategy:** Keep simple, form-focused, no showcase patterns needed

---

### FAQ Page ✅ COMPLIANT

**Goal:** Answer questions, reduce friction, build confidence

**Recommended Patterns:**

1. ✅ **Accordion-style Q&A** (appropriate) - Main content format
2. ✅ **NextStepsSection** - Final CTA (already implemented)

**Implementation Status:** Page uses accordion format for Q&A scanability with
NextStepsSection for final CTA. Full compliance achieved.

**Strategy:** Q&A format is best for scanability, no showcase patterns needed

---

### Veterans Page ✅ COMPLIANT

**Goal:** Connect with veteran community, show support, demonstrate values

**Recommended Patterns:**

1. ✅ **ContentCard Grid** - Veteran Foundation Values (3 cards: Leadership, Safety, Values)
2. ✅ **ContentCard Grid** - Veteran Benefits/Programs (multiple grids throughout)
3. ✅ **ContentCard Grid** - Partnership Criteria (6 criteria cards)
4. ✅ **NextStepsSection** - Final CTA with veteran-specific messaging

**Implementation Status:** Page uses multiple ContentCard grids to showcase
veteran leadership, benefits, programs, and partnership opportunities.
NextStepsSection includes veteran-specific customization. Strategy fully met
using grid format.

**Strategy:** Choose showcase format based on content depth and imagery availability

## Pattern Selection Decision Tree

### When to Use AlternatingShowcase

```text
Do you have 3-6 key concepts?
  └─ YES → Do you have high-quality relevant images?
      └─ YES → Does each concept need 2-4 sentences explanation?
          └─ YES → ✅ Use AlternatingShowcase
          └─ NO → Use ContentCard Grid instead
      └─ NO → Use ValuesShowcase or ContentCard Grid
  └─ NO → Use different pattern
```

### When to Use ValuesShowcase

```text
Do you have 3-6 categories with EXTENSIVE detail?
  └─ YES → Does the content benefit from progressive disclosure?
      └─ YES → Do users need to explore at their own pace?
          └─ YES → ✅ Use ValuesShowcase (Interactive Modal)
          └─ NO → Use AlternatingShowcase instead
      └─ NO → Use AlternatingShowcase or ContentCard Grid
  └─ NO → Use different pattern
```

### When to Use ContentCard Grid

```text
Do you have 6+ similar items?
  └─ YES → Are they primarily list/preview based?
      └─ YES → Do they need quick scanning vs. deep reading?
          └─ YES → ✅ Use ContentCard Grid
          └─ NO → Consider AlternatingShowcase if < 6 items
      └─ NO → Consider other patterns
  └─ NO → Too few items for grid
```

### When to Use Timeline

```text
Is your content sequential or chronological?
  └─ YES → Do you have 3-7 clear steps/phases?
      └─ YES → Does progression/order matter?
          └─ YES → ✅ Use Timeline
          └─ NO → Consider ContentCard Grid
      └─ NO → Too many or too few steps
  └─ NO → Use different pattern
```

## Pattern Mixing Guidelines

### ✅ Good Pattern Combinations

**Light Page (3-4 sections):**

- AlternatingShowcase (main content)
- ContentCard Grid (supplementary)
- NextStepsSection

**Medium Page (4-6 sections):**

- Timeline (process/history)
- AlternatingShowcase OR ValuesShowcase (detailed content)
- ContentCard Grid (supporting items)
- NextStepsSection

**Heavy Page (6+ sections):**

- Multiple content types intermixed
- Maximum 2 showcase patterns (Alternating + Interactive)
- ContentCard Grid for portfolio/list items
- Timeline for sequential content
- NextStepsSection

### ❌ Avoid These Combinations

**Too Many Showcase Patterns:**

- ❌ AlternatingShowcase + ValuesShowcase + Timeline on same page
- **Why:** Pattern overload, performance issues, user fatigue
- **Fix:** Choose 1-2 showcase patterns per page

**Pattern Redundancy:**

- ❌ Two AlternatingShowcase sections on same page
- **Why:** Loses uniqueness, feels repetitive
- **Fix:** Use different patterns or combine content into one showcase

**Missing NextStepsSection:**

- ❌ Major page without final CTA
- **Why:** No clear conversion path
- **Fix:** Always end with NextStepsSection (except Contact page)

## Content Planning Worksheet

Use this before building a new page:

### Page: **\*\***\_\_\_**\*\***

**1. What's the page goal?**

- [ ] Inform
- [ ] Build trust
- [ ] Drive conversion
- [ ] Showcase work
- [ ] Other: **\*\***\_\_\_**\*\***

**2. What content types do you have?**

- [ ] 3-6 key concepts (→ Consider AlternatingShowcase or ValuesShowcase)
- [ ] 6+ similar items (→ Consider ContentCard Grid)
- [ ] Sequential steps (→ Consider Timeline)
- [ ] Portfolio/gallery (→ Consider ContentCard Grid)

**3. Do you have supporting visuals?**

- [ ] High-quality images for each concept (→ AlternatingShowcase)
- [ ] Icons sufficient (→ ValuesShowcase or ContentCard)
- [ ] No visuals yet (→ ValuesShowcase or ContentCard Grid)

**4. Content depth needed?**

- [ ] Quick scanning (→ ContentCard Grid)
- [ ] Moderate detail (→ AlternatingShowcase)
- [ ] Extensive detail with exploration (→ ValuesShowcase)
- [ ] Step-by-step (→ Timeline)

**5. Selected Patterns:**

1. Primary: **\*\***\_\_\_**\*\***
2. Secondary: **\*\***\_\_\_**\*\***
3. Final CTA: NextStepsSection ✓

## Implementation Checklist

When adding a new showcase pattern to a page:

### Pre-Implementation

- [ ] Verified page doesn't already have 2+ showcase patterns
- [ ] Confirmed pattern choice matches content type
- [ ] Gathered all required content (text, images, icons)
- [ ] Reviewed existing pattern usage on similar pages
- [ ] Checked performance budget (image sizes, component weight)

### During Implementation

- [ ] Imported correct component and types
- [ ] Prepared content data array with all required fields
- [ ] Optimized images (WebP format, appropriate sizes)
- [ ] Added proper TypeScript types
- [ ] Included section ID for anchor links
- [ ] Tested responsive behavior (mobile, tablet, desktop)

### Post-Implementation

- [ ] Ran build to verify no errors
- [ ] Checked page load time (Lighthouse)
- [ ] Verified mobile experience
- [ ] Tested keyboard navigation
- [ ] Confirmed NextStepsSection is last section
- [ ] Updated page-specific documentation if needed

## Performance Considerations

### Pattern Weight (Approximate)

| Pattern                 | Component Size | Typical Data | Images | Total Impact |
| ----------------------- | -------------- | ------------ | ------ | ------------ |
| **AlternatingShowcase** | ~8KB           | ~2KB         | ~400KB | **HIGH**     |
| **ValuesShowcase**      | ~12KB          | ~3KB         | ~50KB  | **MEDIUM**   |
| **ContentCard Grid**    | ~4KB           | ~2KB         | ~200KB | **MEDIUM**   |
| **Timeline**            | ~5KB           | ~2KB         | ~0KB   | **LOW**      |
| **NextStepsSection**    | ~6KB           | ~1KB         | ~0KB   | **LOW**      |

### Page Load Budget

- **Target:** < 300KB total (excluding images)
- **Max 2 showcase patterns per page** to stay under budget
- **Image optimization required** for AlternatingShowcase
- **Lazy loading** for below-fold showcase patterns

## Accessibility Standards

All showcase patterns must meet:

- **WCAG 2.1 Level AA** compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper heading hierarchy
- Sufficient color contrast
- Focus indicators on interactive elements

## Future Pattern Development

When creating new showcase patterns:

### Requirements Checklist

- [ ] Solves a specific content presentation need
- [ ] Doesn't duplicate existing pattern capabilities
- [ ] Includes comprehensive TypeScript types
- [ ] Fully responsive (mobile-first approach)
- [ ] Meets accessibility standards
- [ ] Documented with usage guidelines
- [ ] Performance tested (Lighthouse score maintained)
- [ ] Follows existing design system (colors, spacing, typography)

### Documentation Required

1. Component-level JSDoc
2. Technical documentation in `/docs/technical/`
3. Usage examples
4. When to use / When NOT to use guidelines
5. Update this strategy document with new pattern

## Version History

| Version | Date     | Changes                           |
| ------- | -------- | --------------------------------- |
| 1.0     | Dec 2024 | Initial strategy document created |

## Quick Reference

### Pattern Selection Cheat Sheet

| Content Type    | Quantity | Detail Level | Has Images | → Pattern               |
| --------------- | -------- | ------------ | ---------- | ----------------------- |
| Key Features    | 3-6      | Moderate     | Yes        | **AlternatingShowcase** |
| Deep Concepts   | 3-6      | Extensive    | No         | **ValuesShowcase**      |
| List Items      | 6+       | Brief        | Optional   | **ContentCard Grid**    |
| Process/History | 3-7      | Moderate     | No         | **Timeline**            |
| Final CTA       | 1        | N/A          | No         | **NextStepsSection**    |

---

**Remember:** One of each per page. Consistency through variety. Quality over quantity.

**Questions?** Review individual pattern documentation in `/docs/technical/`
