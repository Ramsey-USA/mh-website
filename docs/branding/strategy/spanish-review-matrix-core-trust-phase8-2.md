# Spanish Review Matrix - Core And Trust Pages (Phase 8.2)

**Category:** Branding - Strategy
**Last Updated:** July 20, 2026

## Purpose

Repository-only translation review artifact for Prompt 8.2 core and trust page
surfaces. This table tracks namespace coverage, sensitive wording review scope,
and human approval status.

## Review Scope

- Homepage and `components/home/*`
- `/services` and service-detail content surfaces
- `/about` and `/about/details`
- `/contact` and associated validation/success/error copy
- `/projects` and project-detail content surfaces
- `/testimonials`
- `/team`
- `/veterans` and veteran bridge routes
- `/public-sector` and supporting routes
- `/safety` and linked public resources surfaces

## Translation Review Table

| Namespace                    | Source key example                     | English source version                        | Spanish status                      | Translator/reviewer  | Sensitivity class                            | Approval status |
| :--------------------------- | :------------------------------------- | :-------------------------------------------- | :---------------------------------- | :------------------- | :------------------------------------------- | :-------------- |
| `messages/home:hero`         | `hero.title`                           | `messages/home/en.json` (2026-07-20 snapshot) | Complete - meaning equivalent       | `TBD-human-reviewer` | Construction messaging, CTA clarity          | `DRAFT-REVIEW`  |
| `messages/home:services`     | `services.cards.designBuild.title`     | `messages/home/en.json` (2026-07-20 snapshot) | Complete - meaning equivalent       | `TBD-human-reviewer` | Service capability and claim precision       | `DRAFT-REVIEW`  |
| `messages/home:process`      | `process.steps.execution.title`        | `messages/home/en.json` (2026-07-20 snapshot) | Complete - meaning equivalent       | `TBD-human-reviewer` | Delivery-process semantics                   | `DRAFT-REVIEW`  |
| `messages/home:testimonials` | `testimonials.sectionTitle`            | `messages/home/en.json` (2026-07-20 snapshot) | Complete - labels/context localized | `TBD-human-reviewer` | Quotation context, no quote invention        | `DRAFT-REVIEW`  |
| `messages/home:whyPartner`   | `whyPartner.cards.safety.title`        | `messages/home/en.json` (2026-07-20 snapshot) | Complete - meaning equivalent       | `TBD-human-reviewer` | Trust and safety framing                     | `DRAFT-REVIEW`  |
| `messages:contact`           | `contact.forms.mainForm.title`         | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Validation/error language, legal tone        | `DRAFT-REVIEW`  |
| `messages:projectsPageShell` | `projectsPageShell.pageHeader.title`   | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Project claim wording                        | `DRAFT-REVIEW`  |
| `messages:testimonialGrid`   | `testimonialGrid.heading.title`        | `messages/en.json` (2026-07-20 snapshot)      | Complete - labels/context localized | `TBD-human-reviewer` | Trust framing, quote context                 | `DRAFT-REVIEW`  |
| `messages:testimonialsData`  | `testimonialsData.items.0.projectType` | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Project naming and testimonial metadata      | `DRAFT-REVIEW`  |
| `messages:team`              | `team.hero.title`                      | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Team-role and credibility framing            | `DRAFT-REVIEW`  |
| `messages:veteransPage`      | `veteransPage.hero.title`              | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Veteran/public-sector claim sensitivity      | `DRAFT-REVIEW`  |
| `messages:veteransBridge`    | `veteransBridge.pageHeader.title`      | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Public-sector and mission-language precision | `DRAFT-REVIEW`  |
| `messages:safety`            | `safety.navigation.title`              | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Safety/legal/form wording exactness          | `DRAFT-REVIEW`  |
| `messages:siteHeader`        | `siteHeader.nav.services`              | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Global navigation label consistency          | `DRAFT-REVIEW`  |
| `messages:siteFooter`        | `siteFooter.links.contact`             | `messages/en.json` (2026-07-20 snapshot)      | Complete - meaning equivalent       | `TBD-human-reviewer` | Trust/contact/legal footer wording           | `DRAFT-REVIEW`  |

## Unresolved Terminology Flags

- No unresolved EN-only or ES-only namespaces in the current parity report.
- Expected invariant terms retained unchanged: person names, agency names,
  state names, and controlled IDs.
- Testimonial quote bodies remain source-faithful; only labels/context are
  localized unless an approved Spanish quote exists.

## Validation Evidence (Phase 8.2)

Run and attach outputs for:

1. `pnpm --filter @mhc/website run check:translations`
2. `pnpm --filter @mhc/website run report:spanish:coverage`
3. `pnpm --filter @mhc/website run sweep:spanish:render`
4. `pnpm --filter @mhc/website run congruency:locale:check`
