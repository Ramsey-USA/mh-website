# Contributing to MH Construction Website

**Last Updated:** April 22, 2026  
**Status:** ✅ Active

We welcome contributions to the MH Construction website. Start with [README.md](./README.md) for
project context, then follow this guide for Git workflow and contribution process.

All contributions must preserve MH branding congruency: factual veteran-owned framing, relationship-first voice, trust content, accessibility, and approved SEO naming.

**Quick orientation:**

- [Development Standards](./docs/development/standards/development-standards.md) — code patterns and conventions
- [Consistency Guide](./docs/development/standards/consistency-guide.md) — **MANDATORY** reading before any UI work
- [Unified Component Standards](./docs/branding/standards/unified-component-standards.md) v7.0.0 — design system
- [Page Compliance Checklist](./docs/development/standards/page-compliance-checklist.md) — 150+ items to verify before PR
- [Common Mistakes](./docs/development/standards/common-mistakes.md) — 22 errors to avoid
- [Cloudflare Deployment Guide](./docs/deployment/cloudflare-guide.md) — deploy process
- [Services Integration Guide](./docs/technical/services-integration-guide.md) — Cloudflare, Hostinger, Resend, Twilio
- [Agent Invocation Matrix](./.github/AGENT_INVOCATION_MATRIX.md) — canonical Copilot agent routing and merge-gate order

---

## Development Workflow

### Branch Strategy

| Branch      | Purpose                     |
| ----------- | --------------------------- |
| `main`      | Production — protected      |
| `feature/*` | New features                |
| `fix/*`     | Bug fixes                   |
| `hotfix/*`  | Critical production patches |

### Creating a Feature

```bash
git checkout -b feature/feature-name

# Make changes, then quality-check before committing:
pnpm run lint
pnpm run type-check
pnpm run test
pnpm run build

git add .
git commit -m "feat: describe what changed"
git push origin feature/feature-name
# Then open a Pull Request
```

### Local Pre-Commit Quality Checks (MUST RUN BEFORE COMMITTING)

**These checks run automatically in the pre-commit hook, but running them locally first prevents blocking:**

```bash
# 1. Lint check — catches duplicate imports, formatting, unused variables, etc.
pnpm run lint

# 2. Type check — catches TypeScript errors (runs again on pre-push)
pnpm run type-check

# 3. Build test — catches compilation issues early
pnpm run build

# 4. Unit tests — run relevant tests
pnpm run test
```

**Common Issues & Fixes:**

| Issue                         | Cause                                              | Fix                                                         |
| ----------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| `no-duplicate-imports` error  | Two import statements for same module              | Merge imports: `import { a, b } from 'module'`              |
| `'React' is already declared` | Duplicate React imports from different statements  | Combine: `import { useState, type ReactNode } from 'react'` |
| TypeScript errors on pre-push | Skipped local type-check                           | Run `pnpm run type-check` before committing                 |
| Commitlint format error       | Commit message doesn't follow Conventional Commits | Use proper format (see examples below)                      |

### Commit Message Convention (Conventional Commits)

**Format:** `<type>: <subject>` (lowercase, max 72 chars)

**Examples:**

```bash
# ✅ Good examples
git commit -m "feat: add sticky header navigation on all pages"
git commit -m "fix: resolve TypeScript undefined prop forwarding"
git commit -m "docs: update contributing guide with pre-commit workflow"
git commit -m "refactor: consolidate hero section height calculation"
git commit -m "test: add layout component coverage"
git commit -m "chore: update eslint dependencies"

# ❌ Bad examples (will be rejected)
git commit -m "Update stuff"  # Too vague
git commit -m "Fixed bug"     # Capitalized, missing type
git commit -m "Feat: new nav" # Capitalized type
```

**Supported Types:**

```text
feat:     New feature or functionality
fix:      Bug fix (resolves an issue)
docs:     Documentation only (README, guides, comments)
refactor: Code restructuring without behavior change
test:     Adding/updating tests or test utilities
chore:    Dependency updates, config changes, tooling
style:    Formatting or minor style adjustments
```

### Image Upload Naming (Enforced)

- Newly added or renamed image files are validated at commit time.
- Filenames must use lowercase kebab-case (for example: `team-group-photo-2025.webp`).
- Invalid names are blocked by the pre-commit hook until files are renamed and restaged.
- Uploaded `.jpg`/`.jpeg` files should be converted to `.webp` for site delivery, and redundant uploaded JPG/JPEG files should be removed once matching WebP replacements are in use.

---

## Pull Request Checklist

Before submitting a PR, confirm:

- [ ] `pnpm run type-check` passes (zero errors)
- [ ] `pnpm run lint` passes (zero warnings)
- [ ] `pnpm run build` succeeds
- [ ] `pnpm run test` passes (all tests green)
- [ ] For public copy/metadata/label changes, run `npm test -- src/app/__tests__/public-copy-phrasing-guard.test.ts src/lib/branding/__tests__/page-names.test.ts` in `apps/website`
- [ ] Docs updated if the change affects documented behavior
- [ ] No `.env` secrets, `*.bak`, or generated output committed
- [ ] Page-level changes pass the [Page Compliance Checklist](./docs/development/standards/page-compliance-checklist.md)
- [ ] **Smoke test mocks updated** if you modified `COMPANY_INFO` or shared constants (see below)
- [ ] Added/renamed image filenames use lowercase kebab-case and pass pre-commit checks
- [ ] Required agent invocations and handoffs completed per [Agent Invocation Matrix](./.github/AGENT_INVOCATION_MATRIX.md)

### ⚠️ Smoke Test Maintenance

When modifying `src/lib/constants/company.ts` (e.g., adding `bbb`, `travelers`, or other company properties), **you must update the mock objects** in these test files:

| Test File                              | Location                     | What to Update          |
| -------------------------------------- | ---------------------------- | ----------------------- |
| `pages-smoke.test.tsx`                 | `src/app/__tests__/`         | `COMPANY_INFO` mock     |
| `page.test.tsx`                        | `src/app/careers/__tests__/` | `COMPANY_INFO` mock     |
| `ContactPageClient.test.tsx`           | `src/app/contact/__tests__/` | `COMPANY_INFO` mock     |
| `safety-navigation-contracts.test.tsx` | `src/app/__tests__/`         | Any shared mocks        |
| `email-service.test.ts`                | `src/lib/email/__tests__/`   | `EMAIL_RECIPIENTS` mock |

**Why?** These tests mock `@/lib/constants/company` to avoid loading the full module. If you add a new property (like `COMPANY_INFO.bbb.sealClickUrl`) and a page uses it, tests will fail with `Cannot read properties of undefined`.

### PR Description Template

```markdown
## What changed

Brief description of the change.

## Type of change

- [ ] Bug fix
- [ ] New feature / page
- [ ] Refactor / cleanup
- [ ] Documentation update

## Testing

- [ ] All existing tests pass
- [ ] New tests added where applicable
- [ ] Manually verified on localhost:3000

## Notes for reviewer

Any context, tradeoffs, or follow-up items.
```

---

## Bug Reports

Open a GitHub Issue with:

```markdown
## Bug Description

Brief description of the issue.

## Steps to Reproduce

1. …
2. …

## Expected Behavior

What should happen.

## Actual Behavior

What actually happens.

## Environment

- Browser + version:
- OS:
- Node version (`node -v`):
```

---

## Critical: Email Recipients

All form submissions (Contact, Consultations, Job Applications) send to **two addresses**:

- **`office@mhc-gc.com`** — displayed publicly on the site
- **`matt@mhc-gc.com`** — receives copies silently (never displayed in UI)

**Never remove `matt@mhc-gc.com` from email recipient arrays.** Only `office@mhc-gc.com` belongs
in any UI component. See the API routes in `src/app/api/contact/`, `api/consultations/`,
and `api/job-applications/` for reference.

---

## Contact

- **General / Urgent:** [office@mhc-gc.com](mailto:office@mhc-gc.com) | (509) 308-6489
- **GitHub Issues:** bug reports and feature requests
- **GitHub Discussions:** general questions
