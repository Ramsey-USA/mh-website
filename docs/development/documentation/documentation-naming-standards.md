# Documentation File Naming Standards

**Category:** Development - Documentation Standards  
**Last Updated:** December 14, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Development Index](./development-index.md)
- [📝 Documentation Style Guide](./documentation-style-guide.md)
- [📝 Documentation Maintenance Guide](./documentation-maintenance-guide.md)
- [🏠 Master Index](../master-index.md)

---

## 🎯 Overview

This document defines the file naming conventions for all markdown documentation within
the MH Construction website repository. Consistent naming improves maintainability,
searchability, and developer experience.

---

## Naming Convention: kebab-case

**All markdown documentation files MUST use kebab-case naming:**

```text
kebab-case: lowercase words separated by hyphens
Examples: master-index.md, archive-readme.md, phase-consolidation-plan.md
```

### ✅ Correct Examples

```text
docs/master-index.md
docs/branding/branding-index.md
docs/development/documentation-naming-standards.md
docs/project/roadmaps/roadmaps-index.md
.vscode/test-snippets-here.md
src/components/shared-sections/NextStepsSection.tsx
```

### ❌ Incorrect Examples (Do Not Use)

```text
docs/MasterIndex.md              ❌ PascalCase
docs/ARCHIVE_README.md           ❌ UPPER_SNAKE_CASE
docs/TEST-SNIPPETS-HERE.md       ❌ Mixed with uppercase
docs/archive_README.md           ❌ Mixed case and underscore
docs/Archive_Note.md             ❌ Mixed conventions
```

---

## Why kebab-case?

1. **URL Friendly**: Hyphens work naturally in URLs (unlike underscores or spaces)
2. **Case Insensitive**: Works consistently across different file systems (Windows, macOS, Linux)
3. **Readability**: Easier to read than camelCase or UPPER_CASE
4. **Industry Standard**: Widely adopted for web documentation and markdown files
5. **Git Friendly**: Reduces case-sensitivity issues in version control
6. **Consistency**: Matches other web conventions (URLs, CSS classes, etc.)

---

## Special Cases

### README Files

The main project `README.md` (root level) is an exception and should remain uppercase
as per GitHub convention:

```text
✅ /README.md                    # Root project readme (GitHub convention)
✅ /contributing.md              # Contributing guide
✅ /docs/master-index.md         # Documentation hub
✅ /docs/archive/archive-readme.md  # Archive directory guide
```

### Index Files

Index files should follow the pattern: `{directory-name}-index.md`

```text
✅ docs/branding/branding-index.md
✅ docs/components/components-index.md
✅ docs/development/development-index.md
✅ docs/technical/technical-index.md
```

---

## Migration Summary (November 2025)

All documentation files were migrated to kebab-case naming on November 12, 2025:

### Files Renamed

| Old Name                      | New Name                      |
| ----------------------------- | ----------------------------- |
| `MasterIndex.md`              | `master-index.md`             |
| `ARCHIVE_README.md`           | `archive-readme.md`           |
| `PHASE_CONSOLIDATION_PLAN.md` | `phase-consolidation-plan.md` |
| `TEST-SNIPPETS-HERE.md`       | `test-snippets-here.md`       |
| `ARCHIVE-NOTE.md`             | `archive-note.md`             |

### References Updated

- All markdown file links updated across 194 documentation files
- Internal links corrected in navigation indices
- Cross-references updated in README and contributing guides
- Archive structure documentation updated

---

## Implementation Guidelines

### When Creating New Documentation

1. **Choose a descriptive name**: Use clear, meaningful words
2. **Use kebab-case**: All lowercase with hyphens between words
3. **Be specific**: `button-styling-guide.md` better than `buttons.md`
4. **Use full words**: Avoid abbreviations unless industry-standard
5. **Match directory naming**: Follow the directory's naming pattern

### Examples by Category

#### Technical Documentation

```text
✅ mobile-optimization-guide.md
✅ design-system-index.md
✅ performance-monitoring.md
✅ api-integration-guide.md
```

#### Business Documentation

```text
✅ team-profiles-index.md
✅ awards-achievements.md
✅ government-grant-projects.md
✅ partnership-type-definitions.md
```

#### Development Guides

```text
✅ chatbot-enhancement-guide.md
✅ new-page-development-guide.md
✅ documentation-style-guide.md
✅ ai-development-guidelines.md
```

---

## Enforcement

### Pre-commit Checks (Recommended)

Consider adding a pre-commit hook to validate file naming:

```bash
#!/bin/bash
# Check for non-kebab-case markdown files
if git diff --cached --name-only --diff-filter=A | grep -E '\.md$' | grep -v '^README\.md$' | grep -E '[A-Z_]'; then
    echo "Error: Markdown files must use kebab-case naming"
    echo "Found files with uppercase or underscores:"
    git diff --cached --name-only --diff-filter=A | grep -E '\.md$' | grep -v '^README\.md$' | grep -E '[A-Z_]'
    exit 1
fi
```

### Code Review Guidelines

During pull request reviews, verify:

- [ ] All new markdown files use kebab-case
- [ ] File names are descriptive and clear
- [ ] Internal links use correct kebab-case names
- [ ] Index files follow `{name}-index.md` pattern

---

## Tools and Commands

### Find Non-Compliant Files

```bash
# Find markdown files with uppercase or underscores (excluding README.md)
find . -name "*.md" -not -path "*/node_modules/*" | grep -E '([A-Z_]|[a-z][A-Z])' | grep -v '^./README.md$'
```

### Validate All Documentation

```bash
# Verify all doc files follow kebab-case
cd /workspaces/mh-website
find docs/ -name "*.md" | while read file; do
    basename "$file" | grep -q -E '^[a-z0-9-]+\.md$' || echo "Non-compliant: $file"
done
```

---

## Related Documentation

- [Contributing Guide](../../contributing.md) - Full contribution guidelines
- [Documentation Style Guide](./documentation-style-guide.md) - Content and formatting standards
- [Master Index](../master-index.md) - Complete documentation structure

---

## Questions or Issues?

If you have questions about documentation naming standards:

1. Check this guide first
2. Review the [Master Index](../master-index.md) for examples
3. Contact the development team at <office@mhc-gc.com>

---

\*\*Last Updated: December 14, 2025 | MH Construction Development Team
