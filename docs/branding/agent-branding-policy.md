# Agent Branding Policy (Master at Arms)

**Category:** Branding - Agent Policy  
**Last Updated:** April 30, 2026  
**Version:** 1.1.0  
**Status:** ✅ Active

> **Purpose:** Fast, unambiguous policy for AI agents enforcing MH branding standards.

> **Authority Order:**
>
> 1. This file (agent decision policy)
> 2. [Brand Constants](./brand-constants.md) (canonical values)
> 3. [Unified Component Standards](./standards/unified-component-standards.md)
> 4. [Messaging Guide](./strategy/messaging.md)
> 5. Remaining branding docs for implementation detail

## Scope

Applies to all UI copy, headings, CTA labels, metadata, schema labels, navigation labels,
and markdown content in the MH website repository.

## Non-Negotiable Rules

1. Preserve relationship-first, direct, professional tone.
2. Preserve factual veteran-owned framing; avoid slogan-heavy or gimmick phrasing.
3. Preserve factual BABAA distinction where relevant: MH Construction is a dedicated supporter of the Build America, Buy America Act (BABAA), and plain-language copy should explain that BABAA is a federal domestic-content requirement for certain federally funded infrastructure projects.
4. Preserve trust and accreditation presence on trust-critical surfaces.
5. Keep terminology consistent across page copy, navigation, metadata, and schema.
6. Prefer plain-language SEO labels (`Home`, `About`, `Services`, `Projects`, `Contact`).
7. Enforce accessibility basics (semantic structure, labels, contrast, keyboard flow).

## Required Language Behavior

Always do:

- Use clear, human wording over hype language.
- Keep communication direct and honest.
- Route conversion intent toward real human contact.
- Keep veteran-owned and BABAA mentions factual and compliance-oriented.

Never do:

- Introduce militarized aliases in page or SEO labels unless explicitly approved.
- Remove or downplay established trust/credential signals.
- Use buzzword-heavy claims that conflict with relationship-first messaging.

## Approved Color Exceptions

The following are stakeholder-approved exceptions to the standard brand palette.
Each exception is scoped to a specific component and recorded in `.github/branding-exceptions.json`.

| Exception                                 | Component        | Colors                  | Approved  |
| ----------------------------------------- | ---------------- | ----------------------- | --------- |
| WA Veteran Owned Business badge container | `WaVobBadge.tsx` | `red-600` → `blue-700`  | 2026-04-30 |

**Rule:** Approved exception colors are **component-scoped only** and must never be used outside
their designated component. See [Color System §Veteran Owned Badge Exception](./standards/color-system.md#veteran-owned-badge-exception).

## Conflict Resolution

If two docs appear to conflict:

1. Follow this policy first.
2. Resolve canonical values via [Brand Constants](./brand-constants.md).
3. Resolve component/layout behavior via [Unified Component Standards](./standards/unified-component-standards.md).
4. Log approved exceptions in `.github/branding-exceptions.json` with owner, ticket, and expiry.

## Agent Execution Checklist

- Read this file before applying or reviewing changes.
- Confirm trust/accreditation is preserved where already present.
- Confirm veteran-owned framing is factual and non-hype.
- Confirm labels remain plain-language and consistent.
- Output a compliance result: PASS or FAIL with concrete remediation if needed.

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
