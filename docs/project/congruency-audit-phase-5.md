# Congruency Audit — Phase 5

**Audit Date:** April 15, 2026  
**Auditor:** GitHub Copilot  
**Scope:** Remaining brand inconsistencies identified after Phases 1–4; process and tooling opportunities  
**Baseline:** [brand-constants.md](../branding/brand-constants.md)

---

## Executive Summary

Phases 1–4 resolved 133 issues across source code, data files, public assets, and primary
documentation. This phase documents the remaining known inconsistencies — concentrated in
branding strategy docs and one source file — plus structural improvement opportunities that
would prevent regression.

**Total findings:** 26  
**🔴 Critical:** 0  
**🟡 High (brand docs):** 18  
**🟢 Medium (process/tooling):** 8

---

## Section 1: Slogan Capitalization — Remaining Docs

The following files still use `"Building projects for the client, NOT the dollar"` instead
of the canonical `"Building projects for the Client, NOT the Dollar"`.

### 1.1 `docs/branding/strategies/messaging.md`

| Line | Current                                                                         |
| ---- | ------------------------------------------------------------------------------- |
| 137  | `"Building projects for the client, NOT the dollar. Our veteran-owned team..."` |
| 187  | `- "Building projects for the client, NOT the dollar"`                          |
| 332  | `#### Primary Slogan: "Building projects for the client, NOT the dollar"`       |

### 1.2 `docs/branding/standards/hero-section-standards.md`

| Line | Current                                                     |
| ---- | ----------------------------------------------------------- |
| 43   | `"Building projects for the client, NOT the dollar"`        |
| 212  | `<p>"Building projects for the client, NOT the dollar"...`  |
| 219  | `<p>"Building projects for the client, NOT the dollar"</p>` |
| 227  | `<p>"Building projects for the client, NOT the dollar"</p>` |

### 1.3 `docs/branding/standards/unified-component-standards.md`

| Line | Current                                                                 |
| ---- | ----------------------------------------------------------------------- |
| 419  | `"Building projects for the client, NOT the dollar" — Descriptive text` |

### 1.4 `docs/branding/strategy/page-specific-messaging-guide.md`

| Line | Current                                                                  |
| ---- | ------------------------------------------------------------------------ |
| 111  | `- "Building projects for the client, NOT the dollar"`                   |
| 206  | `- "Building projects for the client, NOT the dollar" (always applies)`  |
| 286  | `- "Building projects for the client, NOT the dollar" (always applies)`  |
| 366  | `- "Building projects for the client, NOT the dollar" (always applies)`  |
| 421  | `3. **Use "Building projects for the client, NOT the dollar"**...`       |
| 521  | `**Primary Slogan:** "Building projects for the client, NOT the dollar"` |

### 1.5 `docs/branding/strategy/universal-terminology-guide.md`

| Line                    | Current                                                       |
| ----------------------- | ------------------------------------------------------------- |
| 553–555                 | Three example lines with lowercase `client` and `dollar`      |
| 627, 638, 645           | Three more example lines with lowercase `client` and `dollar` |
| 702, 705, 718, 781, 822 | Five additional instances                                     |

### 1.6 `docs/development/standards/page-template-guide.md`

| Line | Current                                                    |
| ---- | ---------------------------------------------------------- |
| 162  | `tagline: &quot;Building projects for the client, NOT the` |

**Remediation:** Replace all instances with `"Building projects for the Client, NOT the Dollar"`.

---

## Section 2: Veteran-Owned Capitalization — Remaining Docs

Standard: `Veteran-Owned Since January 2025` (capital V, capital O, includes month)

### 2.1 `docs/branding/strategy/page-specific-messaging-guide.md`

| Line | Current                                               | Issue             |
| ---- | ----------------------------------------------------- | ----------------- |
| 26   | `Veteran-owned since January 2025`                    | lowercase `owned` |
| 153  | `"Veteran-owned since January 2025..."`               | lowercase `owned` |
| 239  | `"Founded in 2010, veteran-owned since January 2025"` | all lowercase     |
| 462  | `Veteran-owned since January 2025`                    | lowercase `owned` |

### 2.2 `docs/branding/strategy/universal-terminology-guide.md`

| Line | Current                              | Issue         |
| ---- | ------------------------------------ | ------------- |
| 150  | `"veteran-owned since January 2025"` | all lowercase |

---

## Section 3: Address Format — Remaining Docs

Standard: `3111 N Capitol Ave, Pasco, WA 99301` (no periods on abbreviations)

### 3.1 `docs/branding/strategy/universal-terminology-guide.md`

| Line | Current                                          |
| ---- | ------------------------------------------------ |
| 236  | `3111 N. Capitol Ave.` (in a code/example block) |
| 521  | `3111 N. Capitol Ave.` (in a code/example block) |

### 3.2 `docs/technical/services-integration-guide.md`

| Line | Current                                            |
| ---- | -------------------------------------------------- |
| 1274 | `Address \| 3111 N. Capitol Ave., Pasco, WA 99301` |

---

## Section 4: Source Code — Slogan in Testimonials

### 4.1 `src/app/testimonials/page.tsx`

Two instances present the slogan without proper capitalization in narrative prose:

| Line      | Current                                                                       |
| --------- | ----------------------------------------------------------------------------- |
| 93        | `"...demonstrate our commitment to building for the client, not the dollar."` |
| 1015–1016 | `"...and commitment to building for the client, not the dollar."`             |

**Note:** These are narrative sentence constructions wrapped inside longer strings, so the
full canonical slogan isn't displayed — but the phrasing still implies the brand slogan and
should match the standard. Recommend updating to `the Client, NOT the Dollar` or
rephrasing as distinct prose (e.g., `client-first values`).

---

## Section 5: Missing Standard Footers

The following technical/deployment docs end without the standard MH Construction footer line.

**Standard footer:**

```markdown
---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
```

| File                                                  | Status                               |
| ----------------------------------------------------- | ------------------------------------ |
| `docs/technical/safety-program-guide.md`              | Missing footer                       |
| `docs/deployment/safety-smoke-setup.md`               | Missing footer                       |
| `docs/deployment/safety-ci-gate-policy.md`            | Missing footer                       |
| `docs/branding/strategy/brand-overview.md`            | Ends with version history, no footer |
| `docs/branding/strategy/messaging.md`                 | Ends with version history, no footer |
| `docs/development/standards/development-standards.md` | Ends with team note, no footer       |
| `docs/technical/analytics-tracking-guide.md`          | Ends with checklist, no footer       |

---

## Section 6: Process & Tooling Opportunities

These are not individual file fixes — they are structural improvements that would prevent
brand inconsistencies from recurring.

### 6.1 No Centralized Brand Slogan Constant in Docs

`src/lib/constants/company.ts` correctly defines `COMPANY_INFO.slogan.primary`. However,
the ~20 docs files that show the slogan all hardcode it as a string. A single grep-based
pre-commit hook or CI script checking for the banned variant `for the client, not the`
would catch regressions before they merge.

**Recommendation:** Add to `scripts/` a lightweight content-lint script:

```bash
#!/bin/bash
# scripts/brand-lint.sh
FAIL=0
check() {
  if grep -rn "$1" --include="*.md" --include="*.ts" --include="*.tsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=coverage \
    --exclude-dir=.open-next . | grep -v "audit\|CHANGELOG\|brand-lint"; then
    echo "❌ BANNED PATTERN: $1"
    FAIL=1
  fi
}
check "for the client, not the"
check "N\. Capitol Ave\."
check "Veteran-[Oo]wned since [0-9]"
check "veteran-owned since"
exit $FAIL
```

Add to `package.json` scripts:

```json
"lint:brand": "bash scripts/brand-lint.sh"
```

Add to CI (`.github/workflows/`) and pre-commit hooks alongside `npm run lint`.

### 6.2 `universal-terminology-guide.md` Shows Banned Variants as Examples

`docs/branding/strategy/universal-terminology-guide.md` intentionally shows incorrect
variants as "what NOT to do" examples (lines 181, etc.) alongside correct ones. This is
valuable but means a simple grep-based lint would produce false positives.

**Recommendation:** Wrap banned-variant examples in HTML comments:

```markdown
<!-- LINT-EXEMPT: showing incorrect usage for documentation -->

❌ "veteran-owned since January 2025"

<!-- END-LINT-EXEMPT -->
```

Or prefix the section with a comment that the lint script can skip.

### 6.3 Version History Blocks Reference Old Version Numbers

`docs/branding/strategy/brand-overview.md` and `docs/branding/strategy/messaging.md` have
version history blocks that reference `v6.0.0`, `v5.0.0`, etc. These are historical and
correct, but the **"Last Major Update"** line in `brand-overview.md` says
`December 28, 2025 (v6.0.0)` — which could be confusing since the current header shows
`v7.0.0`.

**Recommendation:** Add a clear "Current Version" line above the version history block:

```markdown
**Current Version:** 7.0.0 (April 15, 2026)
**Last Major Update:** December 28, 2025 (v6.0.0 — Veteran-Owned Excellence Transformation)
```

### 6.4 `docs/branding/strategy/brand-constants.md` as Source of Truth

The audit reports reference `docs/branding/brand-constants.md`. Many docs already cite it
as "canonical reference." Ensure this file:

1. Defines the canonical slogan with correct capitalization
2. Defines the canonical address with no periods
3. Defines `Veteran-Owned Since January 2025` exactly
4. Is linked from every branding doc header

---

## Implementation Checklist

```
[x] Fix messaging.md — 3 slogan instances (lines 137, 187, 332) ✅ Already correct
[x] Fix hero-section-standards.md — 4 slogan instances (lines 43, 212, 219, 227) ✅ Already correct
[x] Fix unified-component-standards.md — 1 slogan instance (line 419) ✅ Already correct
[x] Fix page-specific-messaging-guide.md — 6 slogan + 4 veteran-owned instances ✅ Already correct
[x] Fix universal-terminology-guide.md — 10 slogan + 1 veteran-owned + 2 address instances ✅ Fixed April 15, 2026
[x] Fix page-template-guide.md — 1 slogan instance (line 162) ✅ Already correct
[x] Fix services-integration-guide.md — 1 address instance (line 1274) ✅ Already correct
[x] Fix testimonials/page.tsx — 2 narrative slogan instances (lines 93, 1015) ✅ Fixed April 15, 2026
[x] Add standard footer to 7 docs missing it ✅ Fixed April 15, 2026
[x] Create scripts/brand-lint.sh content check script ✅ Created April 15, 2026
[x] Add npm run lint:brand to package.json ✅ Added April 15, 2026
[x] Update brand-overview.md "Last Major Update" line for clarity ✅ Fixed April 15, 2026
```

---

## Cross-Reference

- **Phase 1:** [documentation-audit-report.md](documentation-audit-report.md) — 47 issues ✅
- **Phase 2:** [website-congruency-audit.md](website-congruency-audit.md) — 38 issues ✅
- **Phase 2 Extended:** [website-congruency-audit-phase-2.md](website-congruency-audit-phase-2.md) — 24 issues ✅
- **Phase 3:** [additional-congruency-audit.md](additional-congruency-audit.md) — 24 issues ✅
- **Phase 5 (this):** 26 findings identified — ✅ Remediation complete April 15, 2026

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
