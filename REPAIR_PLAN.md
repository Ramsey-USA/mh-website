# MH Website Systematic Repair & Branding Guide

## Purpose

This document provides a step-by-step plan to systematically repair the MH Construction
website, ensuring all pages render correctly and follow MH branding standards.

---

## 1. Audit & Triage

- [ ] Run a full build and type check to list all errors and warnings
- [ ] List all missing or broken components
- [ ] Identify pages with major rendering or styling issues
- [ ] Document all deviations from MH branding guidelines

## 2. Core Styling & Branding

- [ ] Ensure Tailwind CSS and global styles are loaded on every page
- [ ] Verify and fix the ThemeProvider, AuthProvider, and GlobalChatbotProvider
- [ ] Standardize color palette, typography, and spacing per MH_BRANDING.md
- [ ] Implement/restore the correct hero section pattern on all pages
- [ ] Ensure navigation and footer match branding

## 3. Component & Layout Repair

- [ ] Restore or rebuild all UI components (buttons, cards, icons, etc.)
- [ ] Fix or replace all broken imports and missing files
- [ ] Refactor layout wrappers to use correct providers and structure
- [ ] Remove or update deprecated/unused code

## 4. Page-by-Page Fixes

- [ ] Home page: Ensure hero, features, and testimonials render and style correctly
- [ ] About page: Fix hero, core values, and team sections
- [ ] Services page: Repair hero, service cards, and CTAs
- [ ] Projects page: Ensure portfolio/gallery and hero are correct
- [ ] Estimator page: Fix estimator form and hero
- [ ] Careers, Contact, Trade Partners, Government, etc.: Standardize hero and content

## 5. Testing & QA

- [ ] Run all e2e and integration tests
- [ ] Manually review all pages in light and dark mode
- [ ] Check mobile and desktop responsiveness
- [ ] Validate accessibility (a11y) and SEO

## 6. Final Polish

- [ ] Optimize images and assets
- [ ] Remove all placeholder or debug code
- [ ] Ensure all branding and legal requirements are met
- [ ] Prepare for production deployment

---

## References

- `/docs/business/MH_BRANDING.md`
- `/docs/technical/PAGE_LAYOUT_STANDARDS.md`
- `/docs/guidelines/DEVELOPMENT_GUIDELINES.md`

---

**Work through each checklist item, commit regularly, and review progress after each major section.**
