# Icon Size Troubleshooting Guide

## Current Status

✅ **Inline styles ARE present in HTML** - Verified via curl command
✅ **No CSS conflicts** - No `!important` declarations found
✅ **Material Icons font configured** - Font-face properly set up

## Problem

Icons still appear at 24px despite inline `fontSize` styles being present in the rendered HTML.

## Diagnostic Steps

### 1. Hard Refresh Browser (CRITICAL)

Your browser is likely caching old styles. Try:

- **Chrome/Edge**: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- **Firefox**: `Ctrl + F5` or `Cmd + Shift + R`
- **Safari**: `Cmd + Option + R`

### 2. Open Browser DevTools

Right-click an icon → **Inspect Element**

Check:

```html
<!-- You should see something like: -->
<span class="material-icons ..." style="font-size: 72px; line-height: 1; ...">
  precision_manufacturing
</span>
```text

### 3. Check Computed Styles

In DevTools **Computed** tab, verify:

- `font-size` should show `72px` (for value cards) or `48px` (for service cards)
- `font-family` should show `"Material Icons"`
- If you see a different font-size, note what's overriding it

### 4. Verify Material Icons Font Loaded

In DevTools **Network** tab:

1. Hard refresh page
2. Filter by "Fonts" or "woff2"
3. Look for: `flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2`
4. Status should be `200 OK`

If font doesn't load:

- Check browser console for errors
- Try accessing directly: <https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2>

### 5. Test Individual Icon

Open browser console and run:

```javascript
// Check if Material Icons CSS is loaded
const spans = document.querySelectorAll('.material-icons');
console.log('Material Icons found:', spans.length);

// Check first icon's computed styles
if (spans.length > 0) {
  const firstIcon = spans[0];
  const computed = window.getComputedStyle(firstIcon);
  console.log('Font Size:', computed.fontSize);
  console.log('Font Family:', computed.fontFamily);
  console.log('Line Height:', computed.lineHeight);
}
```text

### 6. Clear All Caches

If hard refresh doesn't work:

**Chrome/Edge:**

1. Settings → Privacy and security → Clear browsing data
2. Select "Cached images and files"
3. Time range: "All time"
4. Click "Clear data"

**Firefox:**

1. Settings → Privacy & Security
2. Cookies and Site Data → Clear Data
3. Check "Cached Web Content"

### 7. Disable Browser Extensions

Some extensions (ad blockers, privacy tools) can interfere:

1. Open in **Incognito/Private Mode**
2. Navigate to `http://localhost:3000`
3. Check if icons render correctly

### 8. Manual CSS Override Test

In browser console, run:

```javascript
// Force all material-icons to 72px
document.querySelectorAll('.material-icons').forEach(icon => {
  icon.style.fontSize = '72px';
  icon.style.lineHeight = '1';
  console.log('Set icon to 72px:', icon.textContent);
});
```text

If this works, the issue is CSS specificity or caching.

## Expected Results

After fixing:

| Card Type | Container | Padding | Icon Size | Fill Percentage |
|-----------|-----------|---------|-----------|-----------------|
| Feature   | 80px      | 8px     | 60px      | ~75%            |
| Value     | 96px      | 12px    | 72px      | ~75%            |
| Service   | 64px      | 8px     | 48px      | ~75%            |

## If Nothing Works

### Nuclear Option: Clear Next.js Cache

```bash
cd /workspaces/mh-website
rm -rf .next
npm run dev
```text

Then hard refresh browser (Ctrl+Shift+R).

### Verify Dev Server Port

Make sure you're viewing the correct port:

- Check terminal for "Local: <http://localhost:XXXX>"
- Ensure browser URL matches that port

### Check for Service Workers

Service workers can cache old assets:

```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    console.log('Unregistering:', registration);
    registration.unregister();
  });
  console.log('All service workers unregistered. Please refresh.');
});
```text

## What We Know Works

The HTML output shows:

```html
style="user-select:none;line-height:1;font-size:72px"  <!-- Value cards -->
style="user-select:none;line-height:1;font-size:48px"  <!-- Service cards -->
style="user-select:none;line-height:1;font-size:60px"  <!-- Feature cards -->
```text

**Inline styles have the highest CSS specificity** - they cannot be overridden by classes unless using `!important`.

## Next Steps

1. **Start with hard refresh** - This fixes 90% of caching issues
2. **Check DevTools** - See what's actually being applied
3. **Clear caches** - Nuclear option if needed
4. **Report findings** - Let me know what you see in DevTools

---

**Last Updated:** 2025-01-20
**Status:** Inline styles confirmed in HTML, investigating browser rendering
