# Document Title

Brief description of what this document covers.

## Overview

Main overview section with proper spacing.

### Subsection Example

Content goes here with proper formatting.

#### Sub-subsection

More detailed content.

## Proper List Formatting

### Unordered Lists

Here's how to format unordered lists correctly:

- First item with proper spacing
- Second item
- Third item with sub-items:
  - Sub-item one
  - Sub-item two

And text continues after the list with proper spacing.

### Ordered Lists

Here's how to format ordered lists correctly:

1. First numbered item
2. Second numbered item
3. Third numbered item with details:
   - Supporting detail
   - Another detail

Text continues after numbered lists.

## Code Examples

### Inline Code

Use `inline code` for short code snippets.

### Code Blocks

For longer code examples:

```javascript
function example() {
  return "Always specify language";
}
```

```bash
# Shell commands
npm install
npm run build
```

```text
Plain text blocks need 'text' specified
to avoid MD040 violations
```

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| More     | Data     | Here     |

## Links and References

- [Internal link](./other-file.md)
- [External link](https://example.com)

## Best Practices

### Line Length

Keep lines under 80 characters when possible. Break long sentences
at natural word boundaries to maintain readability while staying
within the character limit.

### Spacing Rules

1. Always add blank lines before and after headings
2. Always add blank lines before and after lists
3. Use consistent spacing throughout the document

### Common Violations to Avoid

- **MD022**: Missing blank lines around headings
- **MD032**: Missing blank lines around lists
- **MD013**: Lines over 80 characters
- **MD040**: Missing language specifiers in code blocks
- **MD009**: Trailing spaces at end of lines
- **MD024**: Duplicate heading content

## Document Structure

### Recommended Sections

1. **Title and Description**: Clear, concise document purpose
2. **Overview**: High-level summary
3. **Main Content**: Organized with proper headings
4. **Examples**: Code samples with language specified
5. **References**: Links to related documents

### Heading Hierarchy

```text
# Main Title (H1) - Only one per document
## Major Section (H2)
### Subsection (H3)
#### Details (H4)
##### Minor Details (H5)
###### Smallest Details (H6)
```

## Conclusion

This template ensures:

- Proper spacing around all elements
- Correct code block formatting
- Appropriate line lengths
- Clear document structure
- Compliance with all markdown linting rules

---

**File Creation Template Checklist:**

- [ ] Document title is clear and descriptive
- [ ] All headings have blank lines before and after
- [ ] All lists have blank lines before and after
- [ ] All code blocks specify language
- [ ] No lines exceed 80 characters
- [ ] No trailing spaces
- [ ] Proper heading hierarchy
- [ ] Clear section organization
