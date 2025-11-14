# VS Code Setup - Complete Configuration Guide

**Category:** Development  
**Last Updated:** November 8, 2025  
**Status:** ✅ Active

## 🎯 Overview

Your VS Code workspace is now fully configured with 24+ extensions optimized for Next.js 15 + TypeScript + Tailwind CSS development.

---

## ✅ Installed Extensions (24 total)

### 🎯 Critical Extensions

- ✅ **ESLint** - Real-time linting with flat config
- ✅ **Prettier** - Auto-formatting on save
- ✅ **Tailwind CSS IntelliSense** - Class autocomplete + color previews
- ✅ **Pretty TypeScript Errors** - Human-readable TS errors
- ✅ **Jest** - Test runner integration (NEW!)
- ✅ **Next.js Snippets** - App Router code snippets (NEW!)

### 🎨 Code Quality

- ✅ **Error Lens** - Inline error display
- ✅ **Code Spell Checker** - Typo detection
- ✅ **axe Accessibility Linter** - A11y validation
- ✅ **Markdownlint** - MD file validation

### 🚀 Productivity

- ✅ **Path Intellisense** - File path autocomplete
- ✅ **npm Intellisense** - Package autocomplete
- ✅ **Auto Rename Tag** - Paired tag renaming
- ✅ **Import Cost** - Bundle size indicator
- ✅ **GitLens** - Git superpowers
- ✅ **Better Comments** - Colorized comments

### 🎨 Tailwind Tools

- ✅ **Headwind** - Auto-sort Tailwind classes
- ✅ **Tailwind Fold** - Collapse long class lists

### ⚛️ React/Next.js

- ✅ **ES7+ React Snippets** - Component templates
- ✅ **Next.js Snippets** - App Router patterns

---

## 🎨 Custom Code Snippets

Type these prefixes to generate boilerplate code:

### Next.js Components

- `mh-server-component` - Server component template with props
- `mh-client-component` - Client component with useState
- `mh-page` - Full page template with hero section
- `mh-api-route` - API route handler with error handling

### MH Branding

- `mh-card` - Card with style variants (default/elevated/interactive/bordered/minimal)
- `mh-grid` - Responsive grid layout (2col/3col/4col/autoFit/masonry)
- `mh-icon` - Material Icon component

### Testing

- `mh-test-suite` - Jest test suite for components
- `mh-test-integration` - Integration test with fetch mocking

### Comments

- `mh-todo` - TODO comment (orange highlight)
- `mh-fixme` - FIXME comment (red highlight)
- `mh-note` - NOTE comment (green highlight)

### Utilities

- `mh-try-catch` - Try-catch with logger
- `mh-async-fn` - Async function with error handling

---

## 🔧 Extension Usage Tips

### Jest Extension

**Sidebar:** View all tests in Test Explorer  
**Run Tests:** Click play button next to test names  
**Coverage:** Enable "Show Coverage on Load" in settings  
**Keyboard:** `Ctrl+Shift+T` to run tests

### Tailwind CSS IntelliSense

**Features:**

- Autocomplete classes as you type
- Hover over classes to see CSS
- Color previews for brand colors
- Validates unknown classes

**Custom Config:** Already set up for `clsx()`, `cn()`, and `cva()`

### Headwind (Auto-Sort Classes)

**Auto-sorts on save** - No action needed!  
**Manual sort:** Right-click → "Sort Tailwind CSS Classes"

### Error Lens

**Inline errors** - See problems next to code  
**Customize:** Adjust font size in settings  
**Disable temporarily:** Click "Error Lens" in status bar

### GitLens

**Blame annotations** - See who wrote each line  
**Line history** - Click line number → "View Line History"  
**File history** - Right-click file → "View File History"

### Path Intellisense

**Autocomplete:** Type `@/` to see src/ folder suggestions  
**Custom mapping:** Already configured for `@/` alias

### Import Cost

**Bundle size:** Shows KB/MB next to imports  
**Color coding:**

- Green: < 50 KB (small)
- Yellow: 50-100 KB (medium)
- Red: > 100 KB (large)

### Better Comments

**Colorized comments:**

- `// ! Alert` - Red
- `// ? Question` - Blue
- `// todo: Task` - Orange
- `// * Highlight` - Green
- `// NOTE: Important` - Hunter Green (brand color!)
- `// FIXME: Fix this` - Leather Tan (brand color!)

---

## ⚙️ Workspace Settings

All configured in `.vscode/settings.json`:

### Auto-Formatting

- ✅ Format on save (Prettier)
- ✅ ESLint fixes on save
- ✅ Tailwind class sorting on save

### TypeScript

- ✅ Auto-imports enabled
- ✅ Non-relative imports preferred (`@/` alias)
- ✅ Update imports on file move

### Jest

- ✅ Test Explorer enabled
- ✅ Coverage colors configured
- ✅ Run via `npm test`

### Path Aliases

- ✅ `@/` maps to `src/`
- ✅ Works with imports and path intellisense

---

## 🧪 Testing Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test booking-flow.test.ts

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### VS Code Test Explorer

1. Open Testing sidebar (beaker icon)
2. See all test files and cases
3. Click play button to run individual tests
4. See results inline in editor

### Test Snippets

Use `mh-test-suite` or `mh-test-integration` to generate test boilerplate!

---

## 🎨 Using Custom Snippets

### Example: Create New Page

1. Type `mh-page`
2. Press `Tab`
3. Fill in placeholders:
   - Page Title
   - SEO description
   - PageName
   - Content

### Example: Add MH Card

1. Type `mh-card`
2. Press `Tab`
3. Select variant: `default`, `elevated`, `interactive`, `bordered`, or `minimal`
4. Add content

### Example: Create Test

1. Type `mh-test-suite`
2. Press `Tab`
3. Fill in component name and test cases

---

## 📝 Recommended Workflow

### Starting Development

1. **Open file** - Path Intellisense helps with `@/` imports
2. **Write code** - Tailwind IntelliSense autocompletes classes
3. **See errors** - Error Lens shows issues inline
4. **Save file** - Auto-formats, fixes ESLint issues, sorts Tailwind classes
5. **Run tests** - Use Test Explorer or `npm test`

### Before Committing

1. Run `npm run type-check` - Zero TS errors
2. Run `npm run lint` - Zero ESLint warnings
3. Run `npm run test` - All tests pass
4. Run `npm run build` - Build succeeds

---

## 🎯 Keyboard Shortcuts

### Essential Shortcuts

- `Ctrl+Shift+P` - Command palette
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search in files
- `Ctrl+Shift+T` - Run tests (Jest)
- `Ctrl+Space` - Trigger autocomplete
- `Alt+Shift+F` - Format document

### GitLens Shortcuts

- `Ctrl+Shift+G` - Git panel
- `Alt+B` - Toggle Git blame

### Custom Snippets

- Type prefix (e.g., `mh-page`)
- Press `Tab` to expand
- Use `Tab` to jump between fields

---

## 🐛 Troubleshooting

### Extension Not Working?

1. **Reload window:** `Ctrl+Shift+P` → "Reload Window"
2. **Check extension logs:** Output panel → Select extension
3. **Verify settings:** `.vscode/settings.json` is present

### Jest Not Running Tests?

1. Ensure terminal is in project root
2. Run `npm test` manually first
3. Check `jest.jestCommandLine` in settings
4. Reload window

### Tailwind Classes Not Autocompleting?

1. Ensure `tailwind.config.ts` exists
2. Check `tailwindCSS.experimental.classRegex` in settings
3. Reload window after config changes

### Import Cost Not Showing?

1. Open JavaScript/TypeScript file
2. Wait a few seconds for calculation
3. Check if npm dependencies are installed

---

## 📚 Additional Resources

- [ESLint Config](../../eslint.config.mjs) - Linting rules
- [Jest Config](../../jest.config.js) - Testing setup
- [Tailwind Config](../../tailwind.config.ts) - Design system
- [TypeScript Config](../../tsconfig.json) - TS settings

---

## 🎉 You're All Set

Your VS Code is now optimized for MH Construction development. Happy coding! 🚀

**Quick Start:**

1. Open a `.tsx` file
2. Type `mh-` and see all custom snippets
3. Try `mh-page` to create a new page
4. Use Test Explorer to run tests
5. Let auto-formatting do the work on save!

---

**Maintained by:** MH Construction Development Team  
**Version:** 1.0.0  
**Last Updated:** November 8, 2025
