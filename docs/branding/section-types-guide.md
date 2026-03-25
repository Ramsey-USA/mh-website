# Section Types Guide (Non-Technical)

**Purpose:** Explain page section types for non-coders  
**Audience:** Marketing, Project Managers, Content Editors  
**Version:** 1.0.0  
**Created:** December 28, 2025

---

## Overview

This guide explains the different "building blocks" used to construct pages on the MH
Construction website. Think of these like LEGO pieces - each has a specific purpose and look.

**Why this matters:** When discussing page layouts or requesting changes, using these names helps
everyone understand exactly which part of the page you're talking about.

---

## The 5 Main Section Types

### 1. HeroSection

**What it looks like:**

- The BIG banner at the very top of each page
- Full-screen height (covers your entire browser window)
- Dark gradient background (black → hunter green → black)
- Large title with gold accent text
- Sometimes has an icon in a glowing box
- Has the navigation menu at the bottom

**When you see it:**

- First thing on EVERY page (homepage, About, Services, Contact, etc.)
- Takes up the full screen before you scroll

**Example pages:**

- Homepage hero (with "Building projects for the Client, NOT the Dollar")
- Services hero (with construction icon)
- About hero (with team-related imagery)

**Non-coder explanation:** _"This is the big banner at the top with our page title and tagline"_

---

### 2. BrandedContentSection

**What it looks like:**

- Full-width section with subtle diagonal stripes in background
- Has two large "glowing blob" effects (one gold, one green)
- Usually has a two-line title:
  - First line: Solid gray text (subtitle)
  - Second line: Shimmery gold-to-green gradient text (main title)
- Icon at top in a fancy glowing box
- White or light gray background

**When you see it:**

- Main content sections throughout the site
- After the hero, between content blocks
- Most common section type (26 pages × 2-5 sections each = 70+ sections)

**Example sections:**

- "Our Core Values" section on homepage
- "What We Offer" section on Services page
- "Our Team" section on About page

**Non-coder explanation:** _"This is the fancy section with the gold/green shimmery title and the subtle striped background"_

**Technical note:** Previously called "StandardSection" - renamed for clarity

---

### 3. ShowcaseSection

**What it looks like:**

- Grid of cards (usually 3 or 4 across)
- Each card has:
  - Colorful thin bar at top
  - Icon in glowing box
  - Title and description
  - Animated glow effect on hover
- Cards are evenly spaced and aligned

**When you see it:**

- Core Values (shield, handshake, medal icons)
- Service categories (hammer, blueprint, gear icons)
- Team member highlights
- Feature/benefit listings

**Example sections:**

- "Why Choose Us" (with benefit cards)
- "Our Services" (with service type cards)
- "Core Values" (with value cards)

**Non-coder explanation:** _"This shows boxes with icons that explain different things - like our values or services"_

---

### 4. CTABanner

**What it looks like:**

- Full-width colored strip (usually hunter green or gold)
- White text
- Large call-to-action button (often gold or white)
- Shorter height than other sections
- Eye-catching and action-oriented

**When you see it:**

- Between major sections
- After explaining something (prompts user action)
- Bottom of pages (before footer)

**Example sections:**

- "Ready to Start Your Project? Contact Us Today" banner
- "Schedule a Free Consultation" strip
- "Download Our PWA App" notification

**Non-coder explanation:** _"This is the colored bar that asks people to contact us or take action"_

---

### 5. ProcessTimeline

**What it looks like:**

- Vertical line down the center (or side)
- Numbered circles on the line (1, 2, 3, 4, 5...)
- Cards alternating left and right
- Each card shows one step in a process
- Icons and descriptions for each step

**When you see it:**

- Construction process walkthrough
- Job application steps
- Project phases explanation
- "How it works" sections

**Example sections:**

- "Our 5-Step Process" on homepage
- "Application Process" on Careers page
- "Project Timeline" on Projects page

**Non-coder explanation:** _"This shows the numbered steps from start to finish with the vertical line connecting them"_

---

## Quick Reference Table

| Section Type              | Where You See It     | Main Purpose           | Visual Identifier                   |
| ------------------------- | -------------------- | ---------------------- | ----------------------------------- |
| **HeroSection**           | Top of every page    | Introduce page topic   | Full-screen dark banner             |
| **BrandedContentSection** | Throughout pages     | Main content blocks    | Gold/green gradient title + stripes |
| **ShowcaseSection**       | Mid-page sections    | Display multiple items | Grid of glowing cards               |
| **CTABanner**             | Between sections     | Drive user action      | Colored strip with button           |
| **ProcessTimeline**       | Process explanations | Show step-by-step flow | Numbered vertical line              |

---

## How to Use This Guide

### When Requesting Changes

**❌ Vague:** "Can we update the section with the services?"

**✅ Clear:** "Can we update the ShowcaseSection on the Services page that displays the 6 service cards?"

**❌ Vague:** "The title at the top needs updating"

**✅ Clear:** "The HeroSection title on the About page needs to change from 'Our Story' to 'Our Oath'"

### When Describing Issues

**❌ Vague:** "The homepage content looks off"

**✅ Clear:** "The BrandedContentSection titled 'Our Core Values' has misaligned cards on mobile"

### When Planning New Pages

**✅ Clear page structure:**

1. HeroSection (introduce the page)
2. BrandedContentSection #1 (explain main topic)
3. ShowcaseSection (display 4-6 key items)
4. BrandedContentSection #2 (deeper dive)
5. CTABanner (prompt action)
6. ProcessTimeline (if applicable)
7. TestimonialsSection (build trust)
8. NextStepsSection (final CTA)

---

## Common Combinations

### Typical Page Structure

```text
HeroSection (full-screen intro)
   ↓
BrandedContentSection (introduction)
   ↓
ShowcaseSection (features/values)
   ↓
CTABanner (mid-page action prompt)
   ↓
BrandedContentSection (detailed content)
   ↓
ProcessTimeline (how it works)
   ↓
TestimonialsSection (social proof)
   ↓
NextStepsSection (final CTA)
```

### Service Page Pattern

```text
HeroSection → BrandedContentSection (overview) → ShowcaseSection (services grid) → ProcessTimeline (construction process) → BrandedContentSection (differentiators) → CTABanner → Testimonials
```

### About Page Pattern

```text
HeroSection → BrandedContentSection (mission) → ShowcaseSection (values) → BrandedContentSection (history) → ShowcaseSection (team) → Testimonials → NextSteps
```

---

## Glossary for Technical Terms

**Component:** A reusable building block (like a LEGO piece)

**Section:** A full-width horizontal slice of a webpage

**Hero:** The big introductory banner at the top

**CTA (Call-to-Action):** Button or prompt asking user to do something

**Grid:** Arranged in rows and columns (like a spreadsheet)

**Gradient:** Color that smoothly fades from one shade to another

**Blob:** Large soft-edged circle of color (background decoration)

**Hover effect:** Animation that happens when you move mouse over something

---

## Related Resources

**For Technical Users:**

- [Template Components Documentation](../development/components/template-components.md)
- [Page Template Guide](../development/standards/page-template-guide.md)
- [Component Cheatsheet](../development/quick-reference/component-cheatsheet.md)

**For Non-Technical Users:**

- [Branding Overview](./strategy/brand-overview.md)

---

## Questions?

### "Which section type should I use for X?"

- **Introducing a topic:** BrandedContentSection
- **Listing 3-6 items:** ShowcaseSection
- **Step-by-step process:** ProcessTimeline
- **Asking user to act:** CTABanner
- **Page intro:** HeroSection

### "Can we mix and match?"

Yes! Pages typically use 4-8 different sections combined. The key is using the right section for the right purpose.

### "How do I know which section I'm looking at?"

Look for these visual clues:

- **Full-screen dark banner** = HeroSection
- **Gold/green gradient title + stripes** = BrandedContentSection
- **Grid of cards** = ShowcaseSection
- **Colored strip with button** = CTABanner
- **Numbered vertical line** = ProcessTimeline

---

This guide is maintained by the development team. Last updated: December 28, 2025.
