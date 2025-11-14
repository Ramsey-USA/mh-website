# Documentation Maintenance Quick Guide

**For MH Construction Developers** | **Last Updated**: November 6, 2025

---

## 🎯 Quick Rules

### Naming Convention: ALWAYS Kebab-Case

```bash
# ✅ CORRECT
consistency-guide.md
mobile-quick-reference.md
branding-implementation-guide.md

# ❌ WRONG
CONSISTENCY-GUIDE.md          # No uppercase
Consistency_Guide.md           # No underscores or PascalCase
Consistency Guide.md           # No spaces
```

### File Organization

```text
Active Documentation:     descriptive-name.md
Historical/Archived:      archive-descriptive-name.md
Index Files:             {category}-index.md
Quick References:        {topic}-quick-reference.md
```

---

## 📂 Directory Structure Standards

### All directories MUST use kebab-case

```bash
# ✅ CORRECT
docs/branding/
  strategy/        # Brand identity and messaging
  standards/       # Visual design standards
  implementation/  # Developer references
docs/technical/design-system/
docs/development/guidelines/

# ❌ WRONG
docs/Business/Branding/  # Old path - now at docs/branding/
docs/technical/designSystem/
docs/development/Guidelines_old/
```

---

## ✅ Pre-Commit Checklist

### Before creating or renaming ANY markdown file

- [ ] Filename is all lowercase
- [ ] Words separated by hyphens (kebab-case)
- [ ] No underscores, no spaces, no uppercase
- [ ] Includes `.md` extension
- [ ] File location matches content category

### Before committing documentation changes

- [ ] Run: `npm run lint` (checks markdown formatting)
- [ ] Verify internal links work
- [ ] Check file follows frontmatter standards (see below)
- [ ] Ensure code blocks have language specified

---

## 📄 Markdown Content Standards

### Required Frontmatter Pattern

```markdown
# Document Title

**Last Updated**: November 6, 2025 | **Version**: 1.0.0 | **Status**: ✅ Active

Brief description of document purpose.

---

## Content starts here...
```

### Heading Structure

```markdown
# H1 - Document Title (only one per file)

## H2 - Major Sections

### H3 - Subsections

#### H4 - Details (use sparingly)
```

### Code Blocks - ALWAYS Specify Language

`````markdown
# ✅ CORRECT

````tsx
const component = () => <div>Hello</div>;
\```

```bash
npm install
\```

# ❌ WRONG (no language)
\```
npm install
\```
```

### Link Format

```markdown
# ✅ CORRECT: Relative paths

[Consistency Guide](./consistency-guide.md)
[Design System](../technical/design-system/design-system.md)

# ❌ WRONG: Absolute paths

[Consistency Guide](./consistency-guide.md)
```

---

## 🔍 Quick Validation Commands

### Check for non-kebab-case files

```bash
# Find uppercase in filenames
find docs -type f -name "*.md" -exec basename {} \; | grep -E "[A-Z]"

# Find underscores
find docs -type f -name "*_*.md"

# Find spaces (shouldn't exist in git)
find docs -type f -name "* *.md"
```

### Validate markdown formatting

```bash
# Lint all markdown files
npm run lint

# Check specific file
npx markdownlint docs/path/to/file.md
```

### Find broken internal links

```bash
# List all markdown links
grep -r "\[.*\](\./" docs/ --include="*.md"

# Find references to renamed files
grep -r "CONSISTENCY-GUIDE" docs/ --include="*.md"
```

---

## 🧹 Common Cleanup Tasks

### Renaming Files to Kebab-Case

```bash
# 1. Rename the file
mv docs/path/OLD-NAME.md docs/path/new-name.md

# 2. Update all references
grep -r "OLD-NAME" docs/ --include="*.md"
grep -r "OLD-NAME" README.md contributing.md

# 3. Verify no broken links
npm run lint
```

### Archiving Historical Documents

```bash
# 1. Rename with archive- prefix
mv docs/path/historical-doc.md docs/path/archive-historical-doc.md

# 2. Ensure lowercase
# archive-historical-doc.md (not archive-Historical-Doc.md)

# 3. Update any references or remove from index files
```

### Creating New Documentation

```bash
# 1. Choose correct directory
docs/business/        # Business context, branding, services
docs/technical/       # Architecture, design system, APIs
docs/development/     # Dev guidelines, references, guides
docs/deployment/      # Deployment, CI/CD, infrastructure

# 2. Use kebab-case filename
touch docs/category/my-new-guide.md

# 3. Add frontmatter (date, status, version)

# 4. Add to relevant index file
# Edit: docs/category/category-index.md
```

---

## 🚫 Common Mistakes to Avoid

### Naming Mistakes

```bash
❌ CONSISTENCY-GUIDE.md    # All uppercase
❌ Consistency-Guide.md    # PascalCase
❌ consistency_guide.md    # Underscores
❌ ConsistencyGuide.md     # No hyphens
❌ consistency guide.md    # Spaces

✅ consistency-guide.md    # Perfect!
```

### Content Mistakes

```markdown
❌ No frontmatter (date, status)
❌ Multiple H1 headings
❌ Code blocks without language specification
❌ Absolute file paths in links
❌ Lines exceeding 120 characters (where possible)

✅ Proper frontmatter
✅ Single H1, structured H2/H3
✅ All code blocks have language
✅ Relative paths for internal links
✅ Reasonable line lengths
```

---

## 📋 File Lifecycle

### Creating New Documentation

1. Determine category (business, technical, development, deployment)
2. Choose kebab-case filename: `descriptive-topic-name.md`
3. Add frontmatter (date, status, version)
4. Write content following standards
5. Add to category index file
6. Update README.md if essential guide
7. Commit with descriptive message

### Updating Existing Documentation

1. Update content
2. Update "Last Updated" date in frontmatter
3. Increment version if major changes
4. Note changes in git commit message
5. Verify links still work
6. Run `npm run lint`

### Archiving Old Documentation

1. Rename: `archive-original-name.md`
2. Ensure kebab-case maintained
3. Remove from index files
4. Update any references
5. Keep in same directory (don't delete)

---

## 🎯 Quality Targets

### File Organization

- ✅ 100% kebab-case compliance
- ✅ 0 files with uppercase letters
- ✅ 0 files with underscores
- ✅ Logical directory structure

### Content Quality

- ✅ All files have frontmatter
- ✅ All code blocks specify language
- ✅ Internal links use relative paths
- ✅ Markdown linting passes

---

## 📞 Need Help?

### Documentation Resources

- **[Consistency Guide](./consistency-guide.md)** - Complete standards
- **[Development Index](./development-index.md)** - All dev docs
- **[Cleanup Summary](./documentation-cleanup-summary.md)** - Recent changes

### Questions?

- Check existing documentation first
- Review this quick guide
- Ask development team
- Create GitHub issue for clarification

---

## 🔄 Regular Maintenance

### Weekly

- [ ] Check for new non-kebab-case files
- [ ] Verify no broken links

### Monthly

- [ ] Review for duplicate content
- [ ] Archive outdated documentation
- [ ] Update index files

### Quarterly

- [ ] Full documentation audit
- [ ] Consolidate overlapping guides
- [ ] Update maintenance guidelines

---

**Remember**: Clean, consistent documentation helps everyone build faster and with less confusion!

**Last Updated**: November 6, 2025
**Maintained By**: MH Construction Development Team
````
`````
