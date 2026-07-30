# Dual Terminology Standard

**Last Updated:** July 28, 2026  
**Status:** Canonical Reference (enterprise terminology)

## Purpose

Define one source of truth for dual terminology used across MH Construction assets.
This standard is intentionally military-themed construction language and may be expanded or optimized to
create stronger enterprise language as long as clarity, trust, and brand congruency are preserved.

Primary source for current terminology expansion: `docs/branding/standards/mhc-terms.docx`
("MH Construction Brand Terms Library", Version 2.0, effective 04/07/2026).

**Brand Congruency:** Dual terminology must never weaken trust content, factual veteran-owned framing, or accessibility clarity.

This standard governs:

- Navigation labels
- Breadcrumb labels
- Hero labels
- Browser tab titles (metadata)
- Structured data name fields
- CTA labels and chatbot page-reference labels
- Dashboard labels and in-app workflow language
- Public/manual PDF labels (MISH, handbook, forms, TOC surfaces)
- Cross-document naming used in markdown standards, SOPs, and implementation guides

## Enterprise Asset Coverage

Use the same primary/secondary pair across all surfaces for each concept.

| Concept                    | Primary Label                | Secondary/Clarifier                                                                    | Required Asset Coverage                                                                |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Safety Program             | MISH Safety & Health Program | Safety Manual                                                                          | Website routes, dashboard modules, MISH PDFs, safety forms indexes, compliance docs    |
| Employee Operations        | Dashboard                    | Staff Hub                                                                              | Website employee-facing CTAs, dashboard shell, handbook workflow docs, onboarding docs |
| External Audience          | Project Stakeholders         | owners, architects, bonding banks, insurers, subcontractors, vendors, future employees | Website marketing copy, proposal text, trust/compliance pages, public manuals/indexes  |
| Handbook Public Surface    | Employee Handbook            | Public Index + Blank Forms                                                             | Website handbook page, downloadable handbook TOC/forms docs, handbook instructions     |
| Internal Handbook Workflow | Employee Handbook Workflows  | Dashboard (Staff Hub) Required                                                         | Dashboard flows, handbook process docs, internal SOPs                                  |

Rendered pair requirement:

- Safety Program surfaces should render the pair as `MISH Safety & Health Program (Safety Manual)` when shown inline.
- Employee workflow surfaces should render the pair as `Dashboard (Staff Hub)` when shown inline.

## Core Rule

Use surface-specific dual terminology to preserve both clarity and MH brand voice.
For general copy, rendered labels, and document surfaces, use MH brand term first and standard industry term second in parentheses where dual rendering is needed (for example, `Mission Brief (Pre-Task Meeting)` and `Operational Theater (Jobsite)`).
For SEO-facing page names and metadata, retain construction terminology as the primary search label and MH terminology as the supporting clarifier (for example, `Services (Operations Brief)`).
Home remains the intentional anchor exception as `Home (Command Center)`.
When a concept has a required primary/secondary pair above, do not collapse it to a single alias on one surface.
When showing the pair inline in copy or labels, use the canonical rendered form exactly (for example,
`Dashboard (Staff Hub)` and `MISH Safety & Health Program (Safety Manual)`).

The terminology system may be expanded with new pairs when the business needs a stronger enterprise voice,
provided the new language still reads like military-themed construction language and does not dilute the
canonical pairs above.

For construction-process terms and PMBOK 6 alignment, use [Construction Terminology Glossary](./construction-terminology-glossary.md) as the companion reference.

Regulatory safety exception:

- In MISH documents, safety forms, and OSHA/WISHA communications, do not replace protected regulatory terms (for example: `Competent Person`, `Qualified Person`, `Authorized Person`, `Hazard Communication`, `Personal Protective Equipment (PPE)`, `Stop Work Authority`, `Incident`).
- Brand terms such as `Protective Posture` and `Operational Pause` are allowed in public website and marketing copy only.

Canonical navigation pattern matrix:

1. PageNavigation top row: MH brand name only (`mhBrandName`) to keep labels concise in the 6-cell layout.
2. PageNavigation More overlay: MH brand name primary with plain-language SEO name as supporting description.
3. Hamburger menu: plain-language SEO name primary with MH brand name on the secondary line.
4. Footer navigation: plain-language SEO name primary with MH brand name as the supporting sublabel.
5. Metadata/SEO title fields: canonical dual title helper format remains `SEO Name (MH Brand Name)` where dual titles are required.
6. Dashboard and document surfaces: use the same concept pair as website surfaces (for example, `Dashboard (Staff Hub)` and `MISH Safety & Health Program (Safety Manual)`).

Browser tab implementation rule:

- Route metadata titles should use `buildDualSeoTitle(pageKey, descriptor)` in app-level `metadata` exports.
- For special route states (print, redirect, archive), keep the canonical page key and vary only the descriptor.
- Enforcement test: `apps/website/src/app/__tests__/tab-title-sitewide-contract.test.ts`.

Do not use slogan-heavy aliases as standalone page labels in SEO-facing surfaces.

For cross-page consistency, all shared labels must resolve through the terminology dictionary in `apps/website/src/lib/branding/page-names.ts`.

## Hero Slogan Alignment (Dual-Terminology)

Hero slogans are content signals, not navigation labels, and must remain congruent with dual-terminology intent.

1. Every page-level hero must use one unique page-specific slogan that portrays that page's purpose.
2. Hero slogans should naturally echo the page's SEO name or MH brand name when it improves clarity.
3. Do not reuse the same page-specific hero slogan across different hero surfaces.
4. Keep hero slogans factual, concise, and relationship-first; avoid hype or gimmick phrasing.
5. Keep SEO-facing labels plain-language even when hero slogans use MH brand voice.

Canonical runtime source for hero slogan uniqueness: `apps/website/src/content/hero-page-slogans.md`.
Governance companion for review and authoring rules: `docs/branding/strategy/page-specific-slogans.md`.

## Canonical Label Set

### Enterprise-Wide Required Pairs

- `MISH Safety & Health Program (Safety Manual)`
- `Dashboard (Staff Hub)`
- `Project Stakeholders` (external audiences)
- `Employee Handbook` for public index/form labels
- `Employee Handbook Workflows` for dashboard/internal process language

### Services

- PageNavigation top row: `Operations Brief`
- Hamburger/Footer primary: `Services`
- Hamburger/Footer secondary: `Operations Brief`
- Browser tab standard: `Services (Operations Brief) | Commercial and Industrial Construction Services | MH Construction`

### Projects

- PageNavigation top row: `Project SITREP`
- Hamburger/Footer primary: `Projects`
- Hamburger/Footer secondary: `Project SITREP`
- Browser tab standard: `Projects (Project SITREP) | Completed Commercial and Industrial Construction Projects | MH Construction`

### Contact

- PageNavigation top row: `Comms Desk`
- Hamburger/Footer primary: `Contact`
- Hamburger/Footer secondary: `Comms Desk`
- Browser tab standard: `Contact (Comms Desk) | Your Project. Honest Guidance. Let's Connect. | MH Construction`

### Team

- PageNavigation More overlay menuitem: `Command Staff`
- Overlay supporting description + Hamburger/Footer primary: `Our Team`
- Keep veteran-owned factual framing and leadership clarity.

### Additional Covered Labels

- Metadata dual form remains canonical, for example `Locations (Regional AO)`.
- UI surfaces should follow the surface matrix above rather than forced parenthetical rendering.

### Terms Library v2.0 Enterprise Additions

Approved expansion terms for strategy, marketing, handbook, and operations documentation:

- `Command Doctrine` (Operations Hierarchy)
- `Operational Theater` (Project Site / Jobsite)
- `Mission Parameters` (Project Scope)
- `Force Multiplier` (Efficiency Gain)
- `Boots on the Ground` (Field Crew)
- `Rules of Engagement (ROE)` (Project Contract)
- `Situation Report (SITREP)` (Project Status Update)
- `Ground Truth` (Verified Field Conditions)
- `Zero-Gap Accountability` (Delivery Alignment / Scope Accountability)
- `Handshake Pride` (Relationship Discipline)
- `Verified Performance` (Evidence-Based Delivery)
- `Mission-Ready Handoff` (Transition Readiness / Handover)
- `Mission Accomplished` (Project Closeout)
- `Operational Tempo` (Project Schedule / Pace)
- `Standby to Standby` (On Call / Ready to Mobilize)

## Construction Terminology Alignment

The dual-terminology system should be able to express the core management ideas used in PMBOK 6 and common
construction practice without losing the MH military-themed voice. Use these approved concept mappings when
writing or reviewing process content.

| PMBOK 6 / Construction Concept | Preferred MH Term Family           | Example MH Phrasing                                      |
| ------------------------------ | ---------------------------------- | -------------------------------------------------------- |
| Integration                    | Project coordination               | accountable follow-through, single-path coordination     |
| Scope                          | Scope architecture                 | front-end scope controls, scope-fit planning             |
| Schedule                       | Sequence logic                     | milestone discipline, execution cadence                  |
| Cost                           | Budget control                     | open-book pricing, budget clarity                        |
| Quality                        | QA/QC and inspection discipline    | quality checkpoints, first-time-right execution          |
| Resources                      | Crew readiness and team allocation | field readiness, resource alignment                      |
| Communications                 | Briefings and status updates       | clear communication, structured handoffs                 |
| Risk                           | Risk modeling and contingencies    | risk-informed planning, controlled contingencies         |
| Procurement                    | Procurement sequencing             | project-specific procurement, trade partner coordination |
| Stakeholders                   | Project stakeholders               | review-ready communication, stakeholder updates          |

When a PMBOK or process term has a direct MH equivalent, use the MH phrasing in public-facing copy and the
PMBOK label only in technical or training references where the standard is explicitly required.

### Common Alias Coverage

The terminology dictionary also recognizes common page-label variants so shared UI and metadata stay congruent:

- `Contact Us` and `Get in Touch` -> Contact / Comms Desk terminology pair
- `Our Work` -> Projects terminology pair
- `Crew` and `Staff` -> Our Team terminology pair
- `FAQ`, `FAQs`, and `Questions & Answers` -> Help/FAQ terminology pair
- `Forms Index` and `Safety Forms Index` -> Safety Forms terminology pair

## SEO and Accessibility Guardrails

1. Primary terms must remain human-readable and search-friendly.
2. Labels must stay consistent with the surface matrix across nav, metadata, schema, and visible headings.
3. ARIA labels should prioritize plain-language clarity.
4. Spanish equivalents must match intent and avoid terminology drift.

## Public Copy Duplication Guardrail

1. Shared phrasing across different pages is allowed.
2. Duplicate guarded phrasing within the same page file is not allowed.
3. Repeated sentence-level boilerplate within the same page file is not allowed.
4. Enforcement test: `src/app/__tests__/public-copy-phrasing-guard.test.ts`.

## Trust and Compliance Guardrails

1. Never remove accreditation/trust surfaces while normalizing terminology.
2. Never alter WA/OR/ID license values or verification links during terminology-only changes.
3. Preserve factual ownership phrasing: `Founded 2010, Veteran-Owned Since January 2025`.
4. Preserve audience clarity: external pages must address project stakeholders; internal workflows must route current employees to Dashboard (Staff Hub).

## Implementation References

- Terminology dictionary: `apps/website/src/lib/branding/page-names.ts`
- Metadata generators: `apps/website/src/lib/seo/page-seo-utils.ts`
- Global metadata baseline: `apps/website/src/app/layout.tsx`
- Shared SEO defaults: `apps/website/src/components/seo/EnhancedSEO.tsx`
- Navigation labels: `apps/website/src/components/layout/Navigation.tsx`
- Footer labels: `apps/website/src/components/layout/Footer.tsx`
- Page nav labels: `apps/website/src/components/navigation/PageNavigation.tsx`
- Chatbot page references: `apps/website/src/lib/chatbot/knowledge-base.ts`

## Change Control

If terminology changes are approved:

1. Update this file first.
2. Update `apps/website/src/lib/branding/page-names.ts` (keys + aliases) first, then apply synchronized updates across website, dashboard, and document references.
3. Run targeted tests for changed areas, including terminology and copy guard tests.
4. Update markdown governance references (`docs/branding/brand-constants.md`, `docs/branding/strategy/universal-terminology-guide.md`, and relevant indexes) so policy and implementation remain congruent.
5. Record any temporary exceptions in project governance notes.
