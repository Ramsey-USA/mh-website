# Documentation Last Reviewed Tracking

**Purpose:** Track when documentation was last verified for accuracy (even if content unchanged)  
**Last Updated:** November 10, 2025  
**Status:** ✅ Active System

---

## 📋 Why Track "Last Reviewed"?

**Last Updated** tells you when content changed.  
**Last Reviewed** tells you when content was verified as still accurate.

Many docs don't need updates but should be periodically verified for accuracy, especially after:

- Framework updates (Next.js, React, etc.)
- Dependency changes
- Team structure changes
- Process changes

---

## 🎯 Review Schedule

### Monthly Quick Check

**Goal:** Verify critical docs are still accurate  
**Time:** 15-20 minutes  
**Focus:** High-impact, frequently-referenced docs

**Priority Docs:**

- [master-index.md](../master-index.md)
- [Consistency Guide](../development/consistency-guide.md)
- [Style Utilities Guide](../development/style-utilities-guide.md)
- [Branding Index](../branding/branding-index.md)
- [Technical Index](../technical/technical-index.md)

### Quarterly Comprehensive Review

**Goal:** Full documentation health check  
**Time:** 2-3 hours  
**Focus:** All category indexes and major guides

**Review Items:**

- All `*-index.md` files (29 files)
- Development standards and guides
- Technical documentation
- Partnership and business docs
- Component documentation

### Annual Deep Review

**Goal:** Complete documentation audit  
**Time:** Full day  
**Focus:** Every markdown file

**Activities:**

- Review all 150+ markdown files
- Update screenshots and examples
- Remove outdated content
- Consolidate where appropriate
- Update metrics and statistics

---

## 📝 Review Template

When reviewing a document, add or update this metadata at the top:

```markdown
# Document Title

**Last Updated:** YYYY-MM-DD  
**Last Reviewed:** YYYY-MM-DD  
**Status:** ✅ Current | ⚠️ Needs Update | 🗄️ Archive Candidate
```

### Status Definitions

- **✅ Current** - Content is accurate and up-to-date
- **⚠️ Needs Update** - Minor updates needed but still usable
- **🗄️ Archive Candidate** - Content outdated or superseded, consider archiving

---

## 🗓️ November 2025 Review Status

### ✅ Reviewed & Current

**Category Indexes (29 files):**

| File                  | Last Updated | Last Reviewed | Status     |
| --------------------- | ------------ | ------------- | ---------- |
| master-index.md       | Nov 10, 2025 | Nov 10, 2025  | ✅ Current |
| branding-index.md     | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| business-index.md     | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| components-index.md   | Nov 8, 2025  | Nov 10, 2025  | ✅ Current |
| deployment-index.md   | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| development-index.md  | Nov 8, 2025  | Nov 10, 2025  | ✅ Current |
| migrations-index.md   | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| operations-index.md   | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| partnerships-index.md | Nov 10, 2025 | Nov 10, 2025  | ✅ Current |
| project-index.md      | Nov 10, 2025 | Nov 10, 2025  | ✅ Current |
| technical-index.md    | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| templates-index.md    | -            | Nov 10, 2025  | ✅ Current |

**Root-Level Guides:**

| File                             | Last Updated | Last Reviewed | Status     |
| -------------------------------- | ------------ | ------------- | ---------- |
| scripts/mh-scripts-guide.md      | Nov 7, 2025  | Nov 10, 2025  | ✅ Current |
| testing/mh-testing-guide.md      | -            | Nov 10, 2025  | ✅ Current |
| config/config-directory-guide.md | Nov 8, 2025  | Nov 10, 2025  | ✅ Current |
| seo-quick-reference.md           | Nov 7, 2025  | Nov 10, 2025  | ✅ Current |

**Key Development Docs:**

| File                         | Last Updated | Last Reviewed | Status     |
| ---------------------------- | ------------ | ------------- | ---------- |
| consistency-guide.md         | Nov 6, 2025  | Nov 10, 2025  | ✅ Current |
| style-utilities-guide.md     | Nov 8, 2025  | Nov 10, 2025  | ✅ Current |
| development-standards.md     | Oct 14, 2025 | Nov 10, 2025  | ✅ Current |
| ai-development-guidelines.md | Oct 14, 2025 | Nov 10, 2025  | ✅ Current |

---

## 📊 Next Review Dates

| Review Type   | Next Date         | Focus                      |
| ------------- | ----------------- | -------------------------- |
| **Monthly**   | December 10, 2025 | Critical docs & indexes    |
| **Quarterly** | February 10, 2026 | All indexes & major guides |
| **Annual**    | November 10, 2026 | Full documentation audit   |

---

## 🔍 Review Checklist

### For Each Document

- [ ] Links still work (especially cross-references)
- [ ] Code examples still compile/work
- [ ] Screenshots still relevant (if any)
- [ ] Information still accurate (no framework/process changes)
- [ ] File structure references still correct
- [ ] Team member info still current (for business docs)
- [ ] Statistics/metrics still accurate

### Common Issues to Check

- **Framework Updates:** Did Next.js, React, or Tailwind versions change?
- **Process Changes:** Did development workflows change?
- **Team Changes:** Did team members change roles?
- **File Moves:** Were any files moved or renamed?
- **Feature Changes:** Were features added/removed/changed?

---

## 🚀 Quick Review Commands

```bash
# Check for broken links in all markdown files
npm run validate:links

# Count total markdown files
find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.next/*" | wc -l

# Find docs not updated in 6+ months
find docs -name "*.md" -mtime +180 -type f

# Check for TODO or FIXME markers in docs
grep -r "TODO\|FIXME" docs/**/*.md
```

---

## 📝 Review Process

### 1. Monthly Quick Review (15-20 min)

```bash
# Open critical docs
code docs/master-index.md
code docs/development/consistency-guide.md
code docs/development/style-utilities-guide.md

# Verify:
# - Links work
# - Information accurate
# - No obvious outdated content
# - Update "Last Reviewed" date
```

### 2. Quarterly Comprehensive (2-3 hours)

```bash
# Review all index files
code docs/**/*-index.md

# Review major guides
code docs/development/*.md
code docs/technical/*.md
code docs/branding/*.md

# Run validation
npm run validate:links
npm run lint:markdown

# Update this tracking file
```

### 3. Annual Deep Review (full day)

```bash
# Review everything
npm run analyze:docs  # If you create this script

# Check archive candidates
# Update statistics in MasterIndex
# Consolidate where needed
# Update all "Last Reviewed" dates
```

---

## 🎯 Action Items After Review

### If Content is Current

1. Update "Last Reviewed" date
2. Mark as ✅ Current
3. Continue to next doc

### If Minor Updates Needed

1. Make updates
2. Update "Last Updated" date
3. Update "Last Reviewed" date
4. Mark as ✅ Current

### If Major Updates Needed

1. Create GitHub issue or task
2. Mark as ⚠️ Needs Update
3. Schedule time for updates
4. Update when complete

### If Should Be Archived

1. Mark as 🗄️ Archive Candidate
2. Add to archive directory
3. Add archive notice to file
4. Update references
5. Update this tracking file

---

## 📈 Review Metrics

**November 2025 Baseline:**

- Total Docs: 174
- Index Files: 29
- Root Guides: 4
- Last Full Review: Nov 10, 2025
- Docs Archived: 5 (optimization completed)
- Health Score: 97/100

**Next Metrics Update:** December 10, 2025

---

## 🔗 Related Documentation

- [Documentation Maintenance Guide](../development/documentation-maintenance-guide.md)
- [Documentation Style Guide](../development/documentation-style-guide.md)
- [Archive README](../archive/archive-readme.md)
- [Documentation Consolidation Review](../project/documentation-consolidation-review-nov-2025.md)

---

**Tracking Maintained By:** MH Construction Documentation Team  
**System Started:** November 10, 2025  
**Next Update:** December 10, 2025

---

_Regular reviews keep documentation accurate and trustworthy._
