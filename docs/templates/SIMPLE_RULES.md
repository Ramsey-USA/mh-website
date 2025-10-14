# Simple Markdown Rules

Follow these rules to avoid linting errors.

## Spacing Rules

### Around Headings

Always put blank lines before and after headings.

### Around Lists

Always put blank lines before and after lists:

- Item one
- Item two
- Item three

Text after lists needs a blank line before it.

## Code Blocks

Always specify the language:

```javascript
const example = "specify language";
```

For plain text use 'text':

```text
Example plain text
```

## Line Length

Keep lines under 80 characters. Break long lines at word boundaries.

## File Endings

Files must end with exactly one newline character.

## Quick Check

Before committing, run: `npm run lint:markdown`
