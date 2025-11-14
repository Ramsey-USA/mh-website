# Documentation Style Guide

**Category:** Development - Documentation Standards  
**Last Updated:** November 6, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../master-index.md) - Central hub
- [💻 Development Index](./development-index.md) - Development documentation
- [📋 Guidelines Index](./guidelines/guidelines-index.md) - Development guidelines
- [📝 Documentation Maintenance Guide](./documentation-maintenance-guide.md) - Maintenance procedures

---

## 📋 Overview

Comprehensive style guide for creating, maintaining, and organizing documentation in the MH Construction project.
Follow these standards to ensure consistency, discoverability, and maintainability across all documentation.

---

## 📁 File Organization Standards

### When to Create a New File vs Update Existing

#### Create a NEW file when

✅ **Addressing a distinct topic or feature**

- New component documentation
- New feature implementation guide
- Separate troubleshooting guide

✅ **File would exceed 1,000 lines**

- Split into logical sections
- Create index to link sections

✅ **Different audience or purpose**

- Quick reference vs comprehensive guide
- Developer guide vs user guide

✅ **Standalone reference needed**

- API documentation
- Configuration reference
- Command-line tool docs

#### Update EXISTING file when

✅ **Adding to existing topic**

- More examples for existing component
- Additional configuration options
- Updates to existing features

✅ **Clarifying or expanding**

- Better explanations
- More detailed examples
- Additional context

✅ **Fixing errors or outdated info**

- Corrections
- Version updates
- Deprecated feature notes

---

## 📝 File Naming Conventions

### Standard Suffixes

Use these suffixes to indicate file type and purpose:

| Suffix              | Purpose                                       | Example                          |
| ------------------- | --------------------------------------------- | -------------------------------- |
| **`-guide.md`**     | Comprehensive tutorials (how to do something) | `mobile-optimization-guide.md`   |
| **`-reference.md`** | Quick lookups (what is available)             | `icon-system-quick-reference.md` |
| **`-standards.md`** | Requirements/policies (what must be done)     | `component-standards.md`         |
| **`-index.md`**     | Navigation hubs (where to find things)        | `technical-index.md`             |

### No Suffix Needed For

- **Business content:** `services.md`, `core-values.md`
- **Profiles:** `matt-ramsey.md`, `team-roster.md`
- **Specific tasks:** `d1-database-setup.md`, `run-migrations-manually.md`
- **Reports:** `build-optimization-success.md`
- **Archives:** `archive-branding-optimization-report-nov-2025.md`

### Naming Best Practices

✅ **DO:**

- Use lowercase with hyphens: `seo-enhancement-guide.md`
- Be descriptive: `button-system-complete-guide.md`
- Include context: `cloudflare-deployment-ready.md`
- Use consistent suffixes: `-guide`, `-reference`, `-standards`, `-index`

❌ **DON'T:**

- Use spaces: `SEO Guide.md`
- Use underscores: `seo_guide.md`
- Be vague: `stuff.md`, `docs.md`
- Mix conventions: `SEOGuide.md`

---

## 🗂️ Index Creation Criteria

### When to Create an Index File

Create an index file (`folder-name-index.md`) when:

✅ **Folder has 3+ documentation files**

- Helps users find relevant content
- Provides context and relationships

✅ **Files serve different purposes**

- Guide + reference + standards
- Multiple related topics

✅ **Navigation aid needed**

- Users might not know which file to read
- Need "when to use" guidance

### When NOT to Create an Index

❌ **Folder has 1-2 files only**

- Not enough content to justify index
- Parent index can link directly

❌ **Files are identical purpose**

- All archives with same format
- All profiles following template

❌ **Parent index sufficient**

- Small subfolder under well-documented parent
- Content obvious from filenames

---

## 📄 Documentation File Structure

### Standard Markdown Template

```markdown
# Document Title

**Category:** Type - Subcategory  
**Last Updated:** Month Day, Year  
**Status:** ✅ Active | 🔄 In Progress | 🗄️ Archive

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../master-index.md)
- [Parent Index](./parent-index.md)
- [Related Doc 1](./related-doc-1.md)

---

## 📋 Overview

Brief description of what this document covers (2-3 sentences).

---

## 📚 Main Content Sections

[Your content here]

---

## 🔗 Related Documentation

- [Related Topic 1](./related-1.md)
- [Related Topic 2](./related-2.md)

---

**Last Updated:** Month Day, Year  
**Status:** ✅ Active  
**Maintained by:** Team Name
```

### Index File Template

```markdown
# [Topic] Index

**Category:** Category Name  
**Last Updated:** Month Day, Year  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../master-index.md)
- [Parent Index](../parent-index.md)

---

## 📋 Overview

Description of what this index covers.

---

## 📚 Documentation Files

### [File Category 1]

**[filename.md](./filename.md)** - Brief description

Full description of what the file contains.

**Topics Covered:**

- Topic 1
- Topic 2
- Topic 3

**When to Use:** When you need to [specific use case]

---

## 🎯 When to Use Each Guide

| Need       | Use This Guide          | Why    |
| ---------- | ----------------------- | ------ |
| **Task 1** | [Guide 1](./guide-1.md) | Reason |
| **Task 2** | [Guide 2](./guide-2.md) | Reason |

---

## 🚀 Quick Start

[Optional: Quick start guide for common tasks]

---

## 🆘 Troubleshooting

[Optional: Common issues and solutions]

---

## 🔗 Related Documentation

- [Related Hub 1](../related/index.md)
- [Related Hub 2](../related2/index.md)

---

**Last Updated:** Month Day, Year  
**Status:** ✅ Active  
**Files:** X total
```

---

## ✍️ Writing Style Guidelines

### Tone and Voice

- **Clear and direct:** Avoid jargon when possible
- **Action-oriented:** Tell users what to do
- **Helpful:** Anticipate questions and provide answers
- **Professional but friendly:** Balance expertise with approachability

### Formatting Standards

#### Headers

```markdown
# H1 - Document Title (use once)

## H2 - Main Sections

### H3 - Subsections

#### H4 - Details (use sparingly)
```

#### Emphasis

- **Bold** for important terms, file names, UI elements
- _Italic_ for emphasis (use sparingly)
- `Code formatting` for code, commands, file paths

#### Lists

**Ordered lists** for sequential steps:

```markdown
1. First step
2. Second step
3. Third step
```

**Unordered lists** for non-sequential items:

```markdown
- Feature 1
- Feature 2
- Feature 3
```

**Task lists** for checklists:

```markdown
- [ ] Incomplete task
- [x] Complete task
```

#### Code Blocks

Always specify the language:

````markdown
```bash
npm run build
```

```typescript
const example: string = "hello";
```

```javascript
// next.config.js
module.exports = {
  // configuration
};
```
````

---

## 🔗 Cross-Referencing Best Practices

### Link Formats

#### Internal Links (Same Repository)

```markdown
[Link Text](./relative-path.md)
[Link Text](../parent/file.md)
[Link Text](../../grandparent/folder/file.md)
```

#### Section Links

```markdown
[Link to Section](#section-heading)
```

#### External Links

```markdown
[External Site](https://example.com)
```

### When to Add Cross-References

✅ **Always add "Related Documentation" section** with:

- Parent index
- Related guides in same category
- Related guides in other categories
- Prerequisites
- Follow-up documentation

✅ **Link to related content** when:

- Mentioning another feature
- Referencing another guide
- Pointing to examples
- Suggesting next steps

✅ **Use consistent link text**:

- Link to the actual page title
- Be descriptive: "See [Mobile Optimization Guide](./mobile-optimization-guide.md)"
- Not: "Click here" or "This page"

---

## 📊 Status Indicators

Use these status indicators consistently:

| Status          | Icon | Meaning                              |
| --------------- | ---- | ------------------------------------ |
| **Active**      | ✅   | Current, maintained documentation    |
| **In Progress** | 🔄   | Being written or updated             |
| **Archive**     | 🗄️   | Historical, superseded by newer docs |
| **Draft**       | 📝   | Work in progress, not final          |
| **Deprecated**  | ⚠️   | Outdated, use alternative            |

---

## 🎨 Visual Elements

### Emojis for Categories

Use these consistently in headers and navigation:

- 🗂️ Master/Main indices
- 🎨 Branding and design
- 💻 Development and coding
- 🛠️ Technical and architecture
- 🚀 Deployment and operations
- 📊 Data and analytics
- 🔧 Tools and utilities
- 📋 Lists and checklists
- 🆘 Troubleshooting and help
- ✅ Complete or success
- 🔄 In progress or ongoing
- 🗄️ Archive or historical
- ⚡ Performance related
- 📱 Mobile related
- 🔗 Links and references
- 📚 Documentation and guides

### Tables

Use tables for comparisons, metrics, or structured data:

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Callouts

Use blockquotes for important notes:

```markdown
> **Note:** Important information here

> **Warning:** Caution about potential issues

> **Tip:** Helpful suggestion
```

---

## 📅 Maintenance Guidelines

### Update Frequency

- **Active documentation:** Review quarterly or when features change
- **Technical guides:** Update with each major version
- **Index files:** Update when adding/removing files
- **Quick references:** Update immediately when standards change

### Last Updated Dates

- Update date when making substantial changes
- Don't update for typo fixes or formatting only
- Use format: "November 6, 2025"
- Include in frontmatter and footer

### Version Control

- Use git for all documentation changes
- Write descriptive commit messages
- Reference related issues or PRs
- Keep documentation changes in separate commits

---

## ✅ Pre-Publishing Checklist

Before committing new or updated documentation:

- [ ] Spell check completed
- [ ] Links tested and working
- [ ] Code examples tested
- [ ] Formatting consistent
- [ ] "Last Updated" date current
- [ ] Status indicator appropriate
- [ ] Cross-references added
- [ ] Follows naming conventions
- [ ] Index updated (if applicable)
- [ ] MasterIndex updated (if new file)

---

## 🔍 Common Documentation Tasks

### Adding a New Guide

1. Choose appropriate location (folder structure)
2. Name file with proper suffix (`-guide.md`, `-reference.md`, etc.)
3. Use standard template
4. Add to parent index
5. Update MasterIndex if top-level
6. Add cross-references
7. Commit with descriptive message

### Creating a New Index

1. Ensure folder has 3+ files
2. Name as `foldername-index.md`
3. Use index template
4. List all files with descriptions
5. Add "When to Use" guide
6. Include troubleshooting if relevant
7. Link from parent index
8. Update MasterIndex if applicable

### Archiving Documentation

1. Move file to appropriate archive folder
2. Update file with archive status
3. Add "Current Location" links
4. Update all references to archived file
5. Update indices
6. Document in archive index why archived

### Updating Existing Documentation

1. Check "Last Updated" date
2. Make changes
3. Update "Last Updated" date
4. Review cross-references still valid
5. Test all links
6. Commit with description of changes

---

## 🔗 Related Documentation

### Documentation Management

- [Documentation Maintenance Guide](./documentation-maintenance-guide.md) - Ongoing maintenance
- [Documentation Optimization Checklist](../project/documentation-optimization-checklist.md) - Phase 1
- [Documentation Optimization Phase 2](../project/documentation-optimization-phase-2.md) - Current project

### Standards and Guidelines

- [Development Guidelines](./guidelines/guidelines-index.md) - Development standards
- [Consistency Guide](./consistency-guide.md) - Implementation standards (733 lines)
- [Development Standards](./development-standards.md) - Coding conventions

### Templates

- [Markdown Template](../templates/markdown-template.md) - Basic template
- [Perfect Markdown Template](../templates/perfect-markdown-template.md) - Advanced template
- [Simple Rules](../templates/simple-rules.md) - Quick reference

---

## 📞 Questions or Suggestions

For questions about documentation standards:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Documentation Issues:** Submit to project repository
- **Style Guide Updates:** Propose via pull request

---

**Last Updated:** November 6, 2025  
**Status:** ✅ Active  
**Maintained by:** MH Construction Documentation Team

---

## Appendix: Example Decision Trees

### Should I Create a New File or Update Existing?

```text
Is this a completely new topic?
├─ YES → Create new file
└─ NO → Is it related to existing file?
    ├─ YES → Will it make file > 1,000 lines?
    │   ├─ YES → Create new file, link from index
    │   └─ NO → Update existing file
    └─ NO → Create new file in appropriate location
```

### Should I Create an Index File?

```text
How many files in folder?
├─ 0-2 files → No index needed
├─ 3-5 files → Probably yes
└─ 6+ files → Definitely yes

Are files related?
├─ YES → Likely need index for navigation
└─ NO → Consider reorganizing into subfolders
```

### Where Should This Documentation Go?

```text
What type of documentation?
├─ Brand guidelines → branding/
├─ Code standards → development/
├─ System architecture → technical/
├─ Deployment process → deployment/
├─ Business information → business/
├─ Project management → project/
├─ Partner information → partnerships/
├─ Operations procedures → operations/
└─ Historical → Remove or integrate into current docs
```
