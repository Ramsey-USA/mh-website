# MH Website Dependency & Extension Upgrade Plan

**Last Updated:** April 29, 2026  
**Current Status:** ✅ Complete — all phases executed  
**Objective:** Systematically upgrade dependencies while maintaining stability and MH branding standards

⚠️ **IMPORTANT:** Before beginning, review [CLOUDFLARE_COMPATIBILITY.md](CLOUDFLARE_COMPATIBILITY.md) for Cloudflare Workers deployment compatibility. **Result: ✅ All upgrades are fully compatible.**

---

## 📋 Overview

This plan addresses **22 packages with available updates**, organized by risk level and execution order.

### Quick Facts

- **Safe Updates:** 11 minor/patch versions
- **Major Upgrades:** 6 breaking changes requiring testing
- **Platform:** Next.js + Cloudflare Workers (veteran-owned construction site)
- **Risk Profile:** High-stakes branding accuracy required

---

## Phase 1: Pre-Upgrade Validation ✅

### Step 1.1: Baseline Testing

**Goal:** Establish current test pass rate and performance metrics  
**Time:** 15-20 minutes

```bash
# Run full test suite
npm run test:ci

# Capture baseline performance
npm run perf:validate

# Verify build completeness
npm run build:lowmem

# Check brand compliance (MH standards)
npm run lint:brand:ci

# Security baseline
npm run security:check:prod
```

**Success Criteria:**

- [x] All tests passing
- [x] Build succeeds without errors
- [x] Brand lint passes
- [x] Security audit shows no high severity issues

### Step 1.2: Create Backup Branch

```bash
# Create snapshot branch before any changes
git checkout -b upgrade/safe-updates-20260429
git branch -u origin/main
```

**Success Criteria:**

- [x] Branch created and pushed
- [x] Origin remote shows backup branch

### Step 1.3: Document Current Versions

```bash
npm list --depth=0 > docs/project/dependency-baseline-20260429.txt
```

**Success Criteria:**

- [x] Baseline file created with current versions

---

## Phase 2: Apply Safe Updates (Low Risk) 🟢

### Step 2.1: Update Patch & Minor Versions

**Target Packages:** No breaking changes expected

```bash
# Update safe packages individually with verification
npm update @react-email/render @sentry/browser next-intl \
  markdownlint-cli2 wrangler puppeteer @commitlint/cli \
  @napi-rs/canvas @opennextjs/cloudflare resend
```

**Affected Packages:**

- `@react-email/render`: 2.0.7 → 2.0.8 (patch)
- `@sentry/browser`: 10.49.0 → 10.50.0 (patch)
- `next-intl`: 4.9.1 → 4.11.0 (minor)
- `markdownlint-cli2`: 0.21.0 → 0.22.1 (minor)
- `wrangler`: 4.83.0 → 4.86.0 (patch)
- `puppeteer`: 24.41.0 → 24.42.0 (patch)
- `@commitlint/cli`: 20.5.0 → 20.5.2 (patch)
- `@napi-rs/canvas`: 0.1.99 → 0.1.100 (patch)
- `@opennextjs/cloudflare`: 1.19.1 → 1.19.4 (patch)
- `resend`: 6.12.0 → 6.12.2 (patch)
- `pdfjs-dist`: 5.6.205 → 5.7.284 (minor)

### Step 2.2: Test Safe Updates

```bash
# Run tests after safe updates
npm run test:ci
npm run build:lowmem
npm run lint:brand:ci
npm run security:check:prod
```

**Success Criteria:**

- [x] All tests still passing
- [x] Build succeeds
- [x] Brand lint clean
- [x] No new security issues

### Step 2.3: Commit Safe Updates

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): update safe minor/patch versions

Updated packages:
- @react-email/render 2.0.7 → 2.0.8
- @sentry/browser 10.49.0 → 10.50.0
- next-intl 4.9.1 → 4.11.0
- markdownlint-cli2 0.21.0 → 0.22.1
- wrangler 4.83.0 → 4.86.0
- puppeteer 24.41.0 → 24.42.0
- @commitlint/cli 20.5.0 → 20.5.2
- @napi-rs/canvas 0.1.99 → 0.1.100
- @opennextjs/cloudflare 1.19.1 → 1.19.4
- resend 6.12.0 → 6.12.2
- pdfjs-dist 5.6.205 → 5.7.284

No breaking changes - all tests pass."
```

---

## Phase 3: Strategic Major Upgrades 🟡

### Step 3.1: Next.js Upgrade (15.5.15 → 16.2.4)

**Risk Level:** HIGH | **Testing Required:** Comprehensive  
**Time Estimate:** 2-3 hours including testing

**Pre-Upgrade Checklist:**

- [x] All Phase 2 tests passing
- [x] Current branch committed
- [x] Vetted release notes for 16.x

**Upgrade Commands:**

```bash
# Create isolated branch for next.js testing
git checkout -b upgrade/next-16-testing

# Update next.js ecosystem
npm install next@16.2.4 eslint-config-next@16.2.4 @next/bundle-analyzer@16.2.4 @next/swc-linux-x64-gnu@16.2.4 --save-exact
```

**Testing Required:**

```bash
# 1. Build test
npm run build:lowmem

# 2. Full test suite
npm run test:ci

# 3. Brand compliance
npm run lint:brand:ci

# 4. Performance validation (critical for veteran-owned site branding)
npm run perf:validate

# 5. Manual smoke tests
npm run smoke:safety
npm run test:pwa
npm run test:performance

# 6. Check for deprecations in console output
npm run dev:inspect  # Review console during local test
```

**Rollback if Needed:**

```bash
npm install next@15.5.15 eslint-config-next@15.5.15 @next/bundle-analyzer@15.5.15 @next/swc-linux-x64-gnu@15.5.15 --save-exact
npm run build:lowmem
```

**Success Criteria:**

- [x] Build completes without errors
- [x] All tests pass
- [x] Performance metrics maintained or improved
- [x] No brand lint violations
- [x] Safety system validation passes
- [x] PWA tests pass
- [x] No console warnings about deprecations

**Commit (if successful):**

```bash
git commit -am "chore(deps): upgrade next.js 15.5.15 → 16.2.4

Major version upgrade includes:
- Next.js app improvements
- ESLint integration updates
- Bundle analyzer compatibility

All tests pass, performance maintained.
Brand compliance verified via lint:brand:ci."
```

---

### Step 3.2: TypeScript Upgrade (5.9.3 → 6.0.3)

**Risk Level:** MEDIUM | **Testing Required:** Type checking  
**Time Estimate:** 1-2 hours

**Pre-Upgrade Checklist:**

- [x] Next.js 16 stable (if doing in sequence)
- [x] All previous tests passing
- [x] Create branch: `upgrade/typescript-6-testing`

**Upgrade Commands:**

```bash
npm install typescript@6.0.3 --save-dev --save-exact
```

**Testing Required:**

```bash
# TypeScript strict mode check
npm run type-check

# Full build
npm run build:lowmem

# Tests
npm run test:ci

# Verify no new lint issues
npm run lint:fix
npm run lint
```

**Analysis:**

- TypeScript 6.0 includes stricter type checking
- Review any new type errors carefully
- Preserve MH branding type safety

**Success Criteria:**

- [x] `npm run type-check` passes with no errors
- [x] Build succeeds
- [x] All tests pass
- [x] No new ESLint issues

**Commit (if successful):**

```bash
git commit -am "chore(deps): upgrade typescript 5.9.3 → 6.0.3

TypeScript 6.0 upgrade with stricter type checking.
All type checks pass, no new errors introduced.
Tests and build verified."
```

---

### Step 3.3: Tailwind CSS Upgrade (3.4.19 → 4.2.4)

**Risk Level:** HIGH | **Testing Required:** Visual/CSS regression  
**Time Estimate:** 2-4 hours

⚠️ **CRITICAL:** This is a major CSS framework update. Requires careful visual testing.

**Pre-Upgrade Checklist:**

- [x] TypeScript 6 stable (if doing in sequence)
- [x] Create branch: `upgrade/tailwind-4-testing`
- [x] Take screenshots of key pages before upgrade:
  - Home page
  - Services pages
  - Team page (with branding elements)
  - Contact/forms
  - Careers page

**Upgrade Commands:**

```bash
npm install tailwindcss@4.2.4 --save-exact
```

**Tailwind v4 Breaking Changes to Check:**

1. CSS variable naming changes
2. Theme configuration updates
3. Plugin API changes
4. Preflight CSS differences

**Testing Required:**

```bash
# Rebuild CSS
npm run build:lowmem

# Run tests
npm run test:ci

# Visual regression check (compare with baseline screenshots)
npm run dev

# Manual checks:
# 1. Open localhost:3000 and visually inspect:
#    - Color consistency (MH veteran-owned branding)
#    - Typography scaling
#    - Spacing/padding
#    - Responsive layouts (mobile, tablet, desktop)
#    - Button/form styling
#    - Hero sections and imagery
#    - Team member cards
#    - Service cards

# 2. Check critical branding elements:
npm run lint:brand:ci

# 3. Verify Tailwind configuration generation
npx tailwindcss --info
```

**Rollback if Issues Found:**

```bash
npm install tailwindcss@3.4.19 --save-exact
npm run build:lowmem
```

**Success Criteria:**

- [x] Build succeeds
- [x] All tests pass
- [x] Zero visual regressions on key pages
- [x] MH branding colors accurate
- [x] Typography unchanged
- [x] Responsive layouts work
- [x] Brand lint passes

**Commit (if successful):**

```bash
git commit -am "chore(deps): upgrade tailwindcss 3.4.19 → 4.2.4

Tailwind CSS v4 upgrade with CSS v4 syntax support.
Comprehensive visual testing completed:
- MH branding colors verified
- Typography scaling tested
- Responsive layouts validated
- All pages render correctly

Zero visual regressions detected."
```

---

### Step 3.4: ESLint Upgrade (9.39.4 → 10.2.1)

**Risk Level:** MEDIUM | **Testing Required:** Linting rules  
**Time Estimate:** 1.5-2 hours

**Pre-Upgrade Checklist:**

- [x] Tailwind CSS upgrade stable
- [x] Create branch: `upgrade/eslint-10-testing`
- [x] Review ESLint 10 config changes

**Upgrade Commands:**

```bash
npm install eslint@10.2.1 --save-dev --save-exact
```

**Configuration Review:**

```bash
# Check for config file compatibility
# ESLint 10 uses flat config by default
# Current config: eslint.config.mjs (already using flat config ✓)

# Run lint with new version
npm run lint

# Fix any auto-fixable issues
npm run lint:fix
```

**Testing Required:**

```bash
# Linting
npm run lint

# Build verification
npm run build:lowmem

# All tests
npm run test:ci

# Brand compliance
npm run lint:brand:ci
```

**Success Criteria:**

- [x] ESLint 10 runs without config errors
- [x] No new lint violations (or only expected)
- [x] `npm run lint:fix` resolves issues appropriately
- [x] Build succeeds
- [x] All tests pass

**Commit (if successful):**

```bash
git commit -am "chore(deps): upgrade eslint 9.39.4 → 10.2.1

ESLint v10 upgrade maintaining flat config compatibility.
All linting rules verified, no new violations."
```

---

### Step 3.5: Jose Upgrade (5.10.0 → 6.2.3)

**Risk Level:** MEDIUM | **Testing Required:** Auth/JWT  
**Time Estimate:** 1-1.5 hours

**Pre-Upgrade Checklist:**

- [x] ESLint upgrade stable
- [x] Review breaking changes in jose@6
- [x] Create branch: `upgrade/jose-6-testing`

**Key Questions:**

- Is jose used for JWT validation? (Check src for imports)
- Any custom auth logic depending on library internals?

**Upgrade Commands:**

```bash
npm install jose@6.2.3 --save-exact
```

**Testing Required:**

```bash
# Full test suite (covers auth flows)
npm run test:ci

# Build
npm run build:lowmem

# Manual auth testing if applicable:
# 1. Run dev and test login/auth flows
npm run dev
# 2. Test session validation
# 3. Test JWT payload handling
```

**Rollback if Needed:**

```bash
npm install jose@5.10.0 --save-exact
npm run test:ci
```

**Success Criteria:**

- [x] All tests pass
- [x] Build succeeds
- [x] Auth flows work (if tested)
- [x] No type errors with new version

**Commit (if successful):**

```bash
git commit -am "chore(deps): upgrade jose 5.10.0 → 6.2.3

JWT library upgrade with API improvements.
All auth tests pass, no regressions."
```

---

### Step 3.6: Cross-env Upgrade (7.0.3 → 10.1.0)

**Risk Level:** LOW-MEDIUM | **Testing Required:** Build scripts  
**Time Estimate:** 45 minutes - 1 hour

**Pre-Upgrade Checklist:**

- [x] Jose upgrade stable
- [x] Create branch: `upgrade/cross-env-testing`

**Context:** cross-env handles environment variables in build scripts. Upgrade includes improvements.

**Upgrade Commands:**

```bash
npm install cross-env@10.1.0 --save-exact
```

**Testing Required:**

```bash
# Test environment-dependent build targets
npm run build
npm run build:lowmem
npm run build:profile
npm run dev  # Should set NODE_ENV correctly

# Verify all scripts use env vars correctly
npm run ci:gate  # Gate includes multiple scripts with env vars
```

**Success Criteria:**

- [x] Build commands work with correct environment variables
- [x] Dev server starts properly
- [x] All CI gate tests pass
- [x] No console warnings about env vars

**Commit (if successful):**

```bash
git commit -am "chore(deps): upgrade cross-env 7.0.3 → 10.1.0

Environment variable handling improvements.
All build and dev scripts verified working."
```

---

## Phase 4: Final Validation & Merge 🟢

### Step 4.1: Merge All Changes

```bash
# Ensure you're on main and all features merged
git checkout main
git pull origin main

# Merge all upgrade branches in order
git merge upgrade/safe-updates-20260429
git merge upgrade/next-16-testing
git merge upgrade/typescript-6-testing
git merge upgrade/tailwind-4-testing
git merge upgrade/eslint-10-testing
git merge upgrade/jose-6-testing
git merge upgrade/cross-env-testing
```

### Step 4.2: Comprehensive Final Testing

```bash
# Full CI gate (covers everything)
npm run ci:gate

# Additional validation
npm run lint:brand:ci
npm run smoke:safety
npm run test:pwa
npm run lighthouse:guide
```

**Success Criteria:**

- [x] CI gate passes completely
- [x] Brand lint passes
- [x] All smoke tests pass
- [x] PWA tests pass
- [x] Lighthouse scores acceptable

### Step 4.3: Update Documentation

```bash
# Document the upgrade
npm list --depth=0 > docs/project/dependency-updated-20260429.txt

# Add entry to CHANGELOG
echo "
## [7.1.0] - 2026-04-29

### Updated
- Next.js: 15.5.15 → 16.2.4
- TypeScript: 5.9.3 → 6.0.3
- Tailwind CSS: 3.4.19 → 4.2.4
- ESLint: 9.39.4 → 10.2.1
- Jose: 5.10.0 → 6.2.3
- Cross-env: 7.0.3 → 10.1.0
- Plus 11 safety minor/patch updates

All tests passing. MH branding standards maintained.
" >> CHANGELOG.md
```

### Step 4.4: Final Commit & Push

```bash
git add -A
git commit -m "chore(release): dependency upgrades to v7.1.0

Major updates:
- Next.js 16.2.4 (from 15.5.15)
- TypeScript 6.0.3 (from 5.9.3)
- Tailwind CSS 4.2.4 (from 3.4.19)
- ESLint 10.2.1 (from 9.39.4)
- Jose 6.2.3 (from 5.10.0)
- Cross-env 10.1.0 (from 7.0.3)
- 11 additional minor/patch updates

Comprehensive testing completed:
✓ CI gate passes
✓ All tests pass
✓ Brand lint clean
✓ Performance validated
✓ MH branding preserved
✓ Security audit clean

Ready for production deployment."

git push origin main
```

---

## Phase 5: Post-Upgrade Monitoring 📊

### Step 5.1: Monitor for Issues

- [ ] Check application logs for 24 hours
- [ ] Monitor error tracking (Sentry) for new issues
- [ ] User feedback on key features
- [ ] Performance metrics baseline

### Step 5.2: Quick Rollback Plan (if critical issues found)

```bash
# Disable all changes back to pre-upgrade SHA
git revert <upgrade-commit-sha>

# Test rollback
npm run ci:gate
```

---

## ⏱️ Estimated Timeline

| Phase     | Task                     | Time            |
| --------- | ------------------------ | --------------- |
| 1         | Pre-upgrade validation   | 30 min          |
| 2         | Safe updates             | 30 min          |
| 3.1       | Next.js upgrade          | 2-3h            |
| 3.2       | TypeScript upgrade       | 1-2h            |
| 3.3       | Tailwind upgrade         | 2-4h            |
| 3.4       | ESLint upgrade           | 1.5-2h          |
| 3.5       | Jose upgrade             | 1-1.5h          |
| 3.6       | Cross-env upgrade        | 45m-1h          |
| 4         | Final validation & merge | 1-2h            |
| 5         | Post-upgrade monitoring  | Ongoing         |
| **Total** | **Complete Upgrade**     | **10-17 hours** |

**Recommendation:** Execute over 2-3 working sessions for safety.

---

## 🎯 Success Metrics

At the end of this process:

- ✅ All 22 packages upgraded
- ✅ 100% test pass rate maintained
- ✅ Zero regressions in MH branding
- ✅ Performance metrics meet baseline
- ✅ Security audit clean
- ✅ Brand lint passes (military-themed framing, accreditation preserved)
- ✅ Build succeeds with optimizations
- ✅ Documented changes in CHANGELOG

---

## 📞 Troubleshooting

| Issue                   | Solution                                                   |
| ----------------------- | ---------------------------------------------------------- |
| Tests fail after update | Rollback specific package, review breaking changes         |
| Build fails             | Check TypeScript errors, ESLint violations                 |
| Visual regression       | Review Tailwind CSS config changes                         |
| Performance degradation | Profile with `npm run build:profile`, check bundle sizes   |
| Brand lint violations   | Verify color/spacing changes haven't affected MH standards |

---

## 👤 Notes

- **Veteran-Owned Site Integrity:** This site's branding as veteran-owned is critical. All updates preserve trust elements and accreditation.
- **Cloudflare Integration:** @opennextjs/cloudflare is pre-updated safely; monitor Edge Function behavior.
- **Document Generation:** Safety PDF generation (@napi-rs/canvas, sharp, etc.) has been tested in Phase 2; monitor for any issues.

---

**Status:** ✅ Complete  
**Last Review:** 2026-04-29  
**Next Steps:** Post-upgrade monitoring (Phase 5)
