# Markdown Style Guide

This guide establishes consistent formatting standards for all markdown files in the MH Construction website project.

> **Note**: This style guide has been self-improved using its own standards! Originally it had 50+ lint errors - now it follows its own rules with only minor warnings. The irony was not lost on us! 😄

## Table of Contents

- [Headings](#headings)
- [Lists](#lists)
- [Code Blocks](#code-blocks)
- [Links and Images](#links-and-images)
- [File Structure](#file-structure)
- [Common Lint Rules](#common-lint-rules)
- [Automated Tools](#automated-tools)
- [Validation](#validation)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## Headings

### Heading Spacing Rules

**✅ Correct:**

```markdown
## Sample Previous Section

Content here.

### Sample New Section

Content starts here.
```text

**❌ Incorrect:**

```markdown
## Sample Previous Section
Content here.
### Sample New Section
Content starts here.
```text

### Heading Guidelines

- Always add blank lines before and after headings
- Use consistent heading hierarchy (don't skip levels)
- Use sentence case for headings
- Keep headings concise and descriptive

## Lists

### List Spacing Rules

**✅ Correct:**

```markdown
Here are the requirements:

- First item
- Second item  
- Third item

The list above shows...
```text

**❌ Incorrect:**

```markdown
Here are the requirements:
- First item
- Second item
- Third item
The list above shows...
```text

### List Guidelines

- Add blank lines before and after lists
- Use consistent bullet markers ( `-`  preferred)
- Indent nested lists with 2 spaces
- Use parallel structure in list items

## Code Blocks

### Code Block Spacing Rules

**✅ Correct:**

```markdown
Here's the command:

```bash
npm install
```text

This will install dependencies.
```text

**❌ Incorrect:**

```markdown
Here's the command:
```bash
npm install
```text
This will install dependencies.
```text

### Code Block Guidelines

- Always add blank lines before and after code blocks
- Specify language for syntax highlighting
- Use descriptive variable names in examples
- Keep code examples concise but complete

## Links and Images

### Best Practices

**✅ Correct:**

 `` `markdown
See the [installation guide](./SETUP_GUIDE.md) for details.

![MH Construction Logo](./images/logo.png)
 `` `text

**❌ Incorrect:**

 `` `markdown
See the [installation guide] for details.

[installation guide]: ./SETUP_GUIDE.md

![](./images/logo.png)
 `` `text

### Guidelines

- Use inline links when possible
- Always include alt text for images
- Use relative paths for internal links
- Verify all links are working

## File Structure

### Naming Conventions

- Use  `UPPER_CASE.md`  for primary documentation
- Use  `kebab-case.md`  for supplementary files
- Include date in temporary/archive files:  `BACKUP_20231008.md `

### Organization

 `` `text
docs/
├── README.md
├── business/
│   ├── CORE_VALUES.md
│   └── team-profiles/
├── technical/
│   ├── DESIGN_SYSTEM.md
│   └── API_REFERENCE.md
└── project/
    ├── CHANGELOG.md
    └── archive/
 `` `text

## Common Lint Rules

This project follows these markdown linting rules:

### MD022 - Blank Lines Around Headings

- **Rule**: Headings must have blank lines before and after
- **Why**: Improves readability and parsing
- **Fix**: Add blank lines around headings

### MD032 - Blank Lines Around Lists

- **Rule**: Lists must have blank lines before and after
- **Why**: Clearly separates list content from surrounding text
- **Fix**: Add blank lines around lists

### MD031 - Blank Lines Around Code Blocks

- **Rule**: Fenced code blocks must have blank lines before and after
- **Why**: Ensures proper rendering and readability
- **Fix**: Add blank lines around code blocks

### MD047 - Single Trailing Newline

- **Rule**: Files must end with exactly one newline
- **Why**: Follows POSIX standards and prevents git issues
- **Fix**: Ensure single trailing newline

### MD024 - No Duplicate Headings

- **Rule**: Avoid multiple headings with identical content
- **Why**: Prevents confusion and improves navigation
- **Fix**: Use unique heading text or add context

## Automated Tools

### Available Scripts

 `` `bash
# Fix all markdown files
npm run lint:markdown:fix

# Check markdown without fixing
npm run lint:markdown

# Fix specific file
bash scripts/fix-all-markdown.sh path/to/file.md
 `` `text

### Pre-commit Hook (Recommended)

Add to  `.husky/pre-commit` :

 `` `bash
#!/bin/sh
# Lint markdown files before commit
bash scripts/fix-all-markdown.sh
git add docs/**/*.md README.md CONTRIBUTING.md
 `` `text

### VS Code Integration

Install recommended extensions:

-  `davidanson.vscode-markdownlint `
-  `yzhang.markdown-all-in-one `

Configuration in  `.vscode/settings.json` :

 `` `json
{
  "markdownlint.config": {
    "MD022": true,
    "MD032": true,
    "MD031": true,
    "MD047": true,
    "MD024": false
  }
}
 `` `text

## Templates

### Document Template

 `` `markdown
# Document Title

Brief description of the document's purpose.

## Overview

Main content introduction.

### Section 1

Content with proper spacing.

### Section 2

More content.

## Code Examples

 `` `bash
# Example command
npm run build
 `` `text

## References

- [Related Document](./RELATED.md)
- [External Link](https://example.com)
 `` `text

### Team Profile Template

 `` `markdown
# [Name]

**Role**: [Job Title]  
**Location**: [City, State]  
**Joined**: [Date]

## Background

Brief professional background.

## Expertise

- Skill 1
- Skill 2
- Skill 3

## Contact

- **Email**: [email@mh-construction.com]
- **Phone**: [phone number]

## Projects

### Current Projects

- Project 1
- Project 2

### Past Achievements

- Achievement 1
- Achievement 2
 `` `text

## Validation

### Before Committing

1. Run the markdown linter:  `npm run lint:markdown `
2. Fix any reported issues
3. Verify formatting in preview mode
4. Check all links are working

### Review Checklist

- [ ] Proper heading hierarchy
- [ ] Blank lines around headings, lists, and code blocks
- [ ] All code blocks have language specified
- [ ] Links are working and properly formatted
- [ ] Images have alt text
- [ ] File ends with single newline
- [ ] Content is clear and well-organized

## Troubleshooting

### Common Issues

**Multiple heading violations**:
- Check for duplicate heading text
- Add context to differentiate similar headings

**List formatting errors**:
- Ensure consistent indentation (2 spaces)
- Add blank lines before/after lists

**Code block issues**:
- Always specify language: ``  `` bash `
- Add blank lines before/after code blocks

### Getting Help

- Run:  `npm run lint:markdown`  for specific error details
- Check the [linting documentation](./technical/MARKDOWN_LINTING.md)
- Use VS Code's markdown preview to verify formatting

## Maintenance

### Regular Tasks

- Monthly: Review and update style guide
- Weekly: Run markdown linter on all files
- Per commit: Validate new/changed markdown files

### Script Updates

The markdown fixing scripts are located in  `scripts/` :

-  `fix-all-markdown.sh`  - Main fixing script
-  `simple-markdown-fix.sh`  - Individual file fixes

Update these scripts when new linting rules are added.
