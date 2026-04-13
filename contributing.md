# Contributing to MH Construction Website

We welcome contributions to the MH Construction website. Start with [README.md](./README.md) for
project context, then follow this guide for Git workflow and contribution process.

**Quick orientation:**

- [Development Standards](./docs/development/standards/development-standards.md) — code patterns and conventions
- [Consistency Guide](./docs/development/standards/consistency-guide.md) — **MANDATORY** reading before any UI work
- [Unified Component Standards](./docs/branding/standards/unified-component-standards.md) v7.0.0 — design system
- [Page Compliance Checklist](./docs/development/standards/page-compliance-checklist.md) — 150+ items to verify before PR
- [Common Mistakes](./docs/development/standards/common-mistakes.md) — 22 errors to avoid
- [Cloudflare Deployment Guide](./docs/deployment/cloudflare-guide.md) — deploy process
- [Services Integration Guide](./docs/technical/services-integration-guide.md) — Cloudflare, Hostinger, Resend, Twilio

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
npm run lint
npm run type-check
npm run test
npm run build

git add .
git commit -m "feat: describe what changed"
git push origin feature/feature-name
# Then open a Pull Request
```

### Commit Message Convention

```text
feat:     new feature
fix:      bug fix
docs:     documentation only
refactor: code change with no behavior change
test:     adding or updating tests
chore:    dependency updates, config changes
```

---

## Pull Request Checklist

Before submitting a PR, confirm:

- [ ] `npm run type-check` passes (zero errors)
- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run build` succeeds
- [ ] `npm test` passes (all tests green)
- [ ] Docs updated if the change affects documented behavior
- [ ] No `.env` secrets, `*.bak`, or generated output committed
- [ ] Page-level changes pass the [Page Compliance Checklist](./docs/development/standards/page-compliance-checklist.md)

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

---

**Last updated:** March 26, 2026
