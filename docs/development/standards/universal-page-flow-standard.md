# Universal Page Flow Standard

**Category:** Development - Page Architecture  
**Last Updated:** April 18, 2026  
**Version:** 1.0.0  
**Status:** Official Standard

**Purpose:** Define the required body-content flow for every MH Construction page so pages convert more clearly, feel less busy, and remain aligned with MH brand and SEO priorities.

**Scope:** This standard applies to all website pages and landing pages. Header, navigation, hero, toggles, and footer remain governed by their existing standards. This document governs the order and job of body sections.

---

## Core Rule

All MH Construction pages must structure body content using this universal sequence:

```text
Discover -> Trust -> Proof -> Action
```

This is the required MH page-architecture standard.

The goal is not to make every page look identical. The goal is to make every page move the visitor through the same decision logic.

---

## Why This Standard Exists

Large pages become difficult to scan when they stack too many values, stats, testimonials, process blocks, and CTAs without a clear narrative job for each section. This standard fixes that by making every section justify its position in the funnel.

This standard supports:

- better lead generation through clearer section sequencing
- less content fatigue across pages
- more intentional internal linking to smaller intent-based pages
- stronger reuse of existing sections without overloading a single page

---

## Universal Flow Definition

| Flow Stage   | Question It Answers                        | Typical Section Types                                                                 | Placement Guidance              |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------- |
| **Discover** | What is this page about and who is it for? | Service overviews, project grid, team intro, location services, partner categories    | First 1-2 body sections         |
| **Trust**    | Why should I believe MH is credible here?  | Values, local expertise, leadership, accreditations, safety, differentiators          | Early-mid body                  |
| **Proof**    | What evidence shows this claim is real?    | Testimonials, stats, case studies, awards, portfolio examples, completed partner work | Mid body                        |
| **Action**   | What should I do next?                     | Contact CTA, partner/application CTA, consultation CTA, Next Steps                    | Mid-late body and final section |

---

## Mandatory Rules

1. The first body section must orient the visitor to the page's main purpose.
2. Do not stack multiple sections that all perform the same Trust or Proof job unless each one adds a clearly different decision value.
3. Every page must have one primary action path.
4. A second action path is allowed only when the page intentionally branches users into a different qualified audience path.
5. The primary CTA should appear after the page has delivered enough Trust and Proof to make action reasonable.
6. `NextStepsSection` can remain the final section, but it must not be the only meaningful action opportunity on long pages.
7. If a page needs too many sections to satisfy multiple audiences, split the page into smaller intent-based destinations.

---

## Content Architecture Standard: Prefer Smaller Intent-Based Pages

MH Construction now favors more focused pages over oversized all-in-one pages.

### Split a page into smaller pages when

1. the page is serving more than one primary audience
2. the page is asking users to make more than one major decision
3. the page contains multiple proof clusters that could support separate landing pages
4. a section could stand alone as a useful internal-link or SEO destination
5. the page requires repeated Trust or Proof sections just to support unrelated content blocks

### Do not split a page when

1. the resulting page would be thin and repetitive
2. the content only makes sense as supporting context for the parent page
3. the extra click would reduce clarity without improving intent matching
4. the new page would not have a distinct conversion path or information purpose

### Standard for smaller pages

Each smaller page must have:

1. one clear audience or intent
2. one main narrative job
3. unique proof relevant to that intent
4. a distinct CTA or next-step path

---

## Page-Splitting Heuristics

Use this rule of thumb during planning:

- **Keep and reorder** when the page has one audience and one CTA path, but the section order is noisy.
- **Split into smaller pages** when the page has multiple audiences, multiple CTA paths, or multiple large content clusters.
- **Create a hub-and-spoke pattern** when one parent page should introduce the topic, and smaller child pages should handle deeper intent.

Examples:

- `/services` can remain a hub while deeper service-specific pages absorb long-form detail.
- `/projects` can remain a portfolio hub while category-specific proof pages absorb deeper case-study content.
- `/allies` should act as the dedicated partner-path destination instead of being buried inside broader client pages.

---

## Allies Visibility Rule

`/allies` is the dedicated MH destination for trade partners, vendors, and ally relationships.

Use this rule across the site:

1. Surface Allies from body sections on pages where partner intent naturally emerges.
2. Place Allies entry points after capability and trust context, but before final generic CTAs.
3. Do not place the Allies branch so early that it competes with the main client-orientation of the page.

Recommended referring pages:

- Services
- Contact
- About
- Veterans
- Projects
- selected location pages where partner capacity matters

The Allies page itself should follow:

```text
Discover partner network -> Trust MH as a prime partner -> Proof of collaboration -> Apply / Contact
```

---

## Template Guidance

### Home

Lead with orientation and service relevance, then trust, then proof, then the clearest next action.

### Services

Lead with what MH offers before abstract differentiators. Route trade-partner visitors to Allies after core service context.

### Projects

Show the work before supporting claims. Portfolio visibility should come before stats-heavy justification.

### About

Lead with story and leadership before deep credibility clusters.

### Team

Lead with leadership and org clarity, then employee proof, then action.

### Location pages

Lead with local services and local expertise, then trust markers, then contact.

### Vertical pages

Preserve audience-specific positioning, but still use Discover -> Trust -> Proof -> Action.

---

## Implementation Workflow

Before building or refactoring any page:

1. identify the page's primary audience
2. identify the page's primary conversion action
3. label each proposed section as Discover, Trust, Proof, or Action
4. remove or relocate any section that duplicates a nearby section's job
5. decide whether the page should be reordered or split into smaller pages
6. validate the final order using the page compliance checklist

---

## Exceptions

Exceptions are allowed only when a page has a documented reason to deviate, such as:

- legal or compliance-driven page structure
- system or product pages where user tasks override marketing flow
- campaign pages with a single-action landing-page pattern

Any exception should still preserve clarity and should be documented in the page plan or implementation notes.

---

## Related Documentation

- [Page Template Guide](./page-template-guide.md)
- [Page Compliance Checklist](./page-compliance-checklist.md)
- [Consistency Guide](./consistency-guide.md)
- [Section Types Guide](../../branding/section-types-guide.md)
- [Page-Specific Messaging Guide](../../branding/strategy/page-specific-messaging-guide.md)
- [Homepage Reference](../../technical/homepage.md)
