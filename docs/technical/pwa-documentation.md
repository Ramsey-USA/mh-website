# Progressive Web App (PWA) Documentation

## Overview

The MH Construction website is a fully-featured Progressive Web App (PWA) that provides offline capabilities, installability, and native app-like experience. This document covers the PWA implementation, features, and maintenance.

## Current Status

✅ **Test Score: 98%** (49/50 tests passing)

### Key Features

- ✅ Full offline support with intelligent caching
- ✅ Installable on all major platforms (Desktop, Mobile, Tablet)
- ✅ Background sync for form submissions
- ✅ Push notifications support
- ✅ Update notifications with manual trigger
- ✅ Navigation preload for faster page loads
- ✅ 5-layer cache strategy
- ✅ IndexedDB for offline form storage
- ✅ 24 pages precached for instant offline access

## Architecture

### 1. Service Worker (`public/sw.js`)

The service worker is the core of the PWA functionality. Version: **v4.0.0**

#### Cache Layers

1. **Static Cache** (`mh-construction-static-v4.0.0`)
   - Duration: 30 days
   - Contains: HTML pages, CSS, JS bundles
   - Strategy: Cache-first

2. **Dynamic Cache** (`mh-construction-dynamic-v4.0.0`)
   - Duration: 24 hours
   - Contains: API responses, dynamic content
   - Strategy: Network-first with cache fallback

3. **Image Cache** (`mh-construction-images-v4.0.0`)
   - Duration: 90 days
   - Contains: All images, logos, project photos
   - Strategy: Cache-first with network update

4. **API Cache** (`mh-construction-api-v4.0.0`)
   - Duration: 5 minutes
   - Contains: API endpoints
   - Strategy: Stale-while-revalidate for critical endpoints

5. **CDN Cache** (`mh-construction-cdn-v4.0.0`)
   - Duration: 365 days
   - Contains: Cloudflare assets, external resources
   - Strategy: Cache-first with background update

#### Caching Strategies

```javascript
CACHE_FIRST; // Fast, use cache then update
NETWORK_FIRST; // Fresh, use network then cache
STALE_WHILE_REVALIDATE; // Use cache immediately, update in background
NETWORK_ONLY; // Always fetch from network
CACHE_ONLY; // Only use cache
```

#### Precached Assets (24 total)

Critical pages available offline:

- Home page (/)
- All service pages
- All location pages (Tri-Cities)
- Contact, Team, Careers, FAQ
- Legal pages (Privacy, Terms, Accessibility)

### 2. PWA Components (`src/components/pwa/`)

#### PWAManager.tsx

Main coordinator component that orchestrates all PWA functionality.

```tsx
<PWAManager />
```

Features:

- Service worker registration
- Update detection and notification
- Installation prompt coordination
- Error handling

#### ServiceWorkerRegistration.tsx

Handles service worker lifecycle:

- Registration
- Update detection
- Automatic hourly update checks
- Controller change handling

#### PWAInstallPrompt.tsx

Smart installation prompt:

- Detects `beforeinstallprompt` event
- 30-day cooldown for dismissed prompts
- Tracks installations via Google Analytics
- Platform-aware messaging

#### UpdateNotification.tsx

User-friendly update UI:

- Shows when new version is available
- One-click update with reload
- Dismissible with "Later" option
- Auto-hides after update

### 3. Manifest (`public/manifest.json`)

#### Key Properties

```json
{
  "name": "MH Construction - Base HQ → Home | Building Tomorrow",
  "short_name": "MH Const",
  "display": "standalone",
  "start_url": "/",
  "background_color": "#1e293b",
  "theme_color": "#386851"
}
```

#### Icons

8 icon sizes from 72x72 to 512x512:

- All support `maskable` and `any` purpose
- Optimized for all platforms
- File size: ~25KB each

#### Shortcuts (4)

Quick actions from home screen:

1. View Projects
2. Contact Us
3. Book Consultation
4. Get Estimate

#### Screenshots (4)

PWA store listing images:

- 2 wide (desktop) screenshots
- 2 narrow (mobile) screenshots

## Offline Capabilities

### What Works Offline

1. **Pages**: All 24 precached pages fully functional
2. **Images**: Cached images display normally
3. **Forms**: Submitted forms queue for sync
4. **Navigation**: Full site navigation available
5. **Static Content**: All text and layout preserved

### What Requires Online

1. **API Calls**: New data fetching
2. **Dynamic Content**: Real-time updates
3. **External Resources**: Third-party integrations
4. **Form Submission**: Actual sending (queued offline)

### Offline Fallback

When offline and no cached content available:

- Redirect to `/offline` page
- Friendly offline message
- Shows cached content availability
- Retry button
- Home navigation

## Background Sync

Form submissions are queued offline and automatically synced when connection is restored.

### Supported Forms

1. Contact forms → `/api/contact`
2. Testimonials → `/api/testimonials`
3. ~~Bookings~~ (deprecated, kept for compatibility)

### IndexedDB Storage

Database: `MHConstructionDB` (version 1)

Object Stores:

- `contact-forms`: Pending contact submissions
- `testimonials`: Pending testimonial submissions
- `bookings`: Legacy (no-op)

## Push Notifications

### Setup Status

✅ Service worker configured
⚠️ Backend implementation required

### Features

- Rich notifications with actions
- Badge support
- Vibration patterns
- Click-through navigation
- Multiple action buttons

### Future Use Cases

- Project updates
- Appointment reminders
- Estimate status
- Team messages
- Emergency notifications

## Installation

### Desktop (Chrome/Edge)

1. Visit website
2. Click install icon in address bar
3. Or use PWA install prompt (3-second delay)
4. App opens in standalone window

### Mobile (iOS)

1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Confirm installation

### Mobile (Android)

1. Open in Chrome
2. Tap "Add to Home Screen" prompt
3. Or Menu → "Install app"
4. App appears on home screen

## Testing

### Manual Testing

1. **Installation Test**

   ```bash
   # Open in browser
   # Check for install prompt
   # Install and verify standalone mode
   ```

2. **Offline Test**

   ```bash
   # Open DevTools → Network → Offline
   # Navigate between cached pages
   # Try form submission
   # Check offline page fallback
   ```

3. **Update Test**

   ```bash
   # Change service worker version
   # Reload page
   # Verify update notification
   # Click update and confirm reload
   ```

### Automated Testing

```bash
# Run comprehensive PWA test suite
npm run test:pwa
# or
node scripts/test-pwa.js
```

Test categories:

1. Manifest validation (10 tests)
2. Service worker configuration (12 tests)
3. Icon availability (12 tests)
4. PWA components (5 tests)
5. Offline support (2 tests)
6. Cache strategy analysis (2 tests)
7. Layout integration (3 tests)
8. Security & best practices (4 tests)

### Lighthouse Audit

```bash
npm run lighthouse
```

PWA score should be **90+** with:

- ✅ Installable
- ✅ Fast and reliable
- ✅ Optimized
- ✅ Service worker registered

## Maintenance

### Updating the Service Worker

1. **Increment version**:

   ```javascript
   // In public/sw.js
   const _CACHE_NAME = "mh-construction-v5.0.0"; // Update all cache names
   ```

2. **Update assets list** if needed:

   ```javascript
   const STATIC_ASSETS = [
     // Add new routes
     "/new-page",
   ];
   ```

3. **Deploy**: Service worker auto-updates on page reload

### Cache Management

#### Viewing Caches

```javascript
// In browser DevTools console
caches.keys().then(console.log);
```

#### Clearing Caches

```javascript
// Clear all caches
caches
  .keys()
  .then((keys) => Promise.all(keys.map((key) => caches.delete(key))));
```

#### Manual Cache Inspection

```
DevTools → Application → Cache Storage
```

### Debugging

#### Service Worker Status

```
DevTools → Application → Service Workers
```

Shows:

- Registration status
- Active worker
- Waiting worker
- Update trigger

#### Enable Debug Mode

```javascript
// In public/sw.js (line 6)
const DEBUG = true; // Set to true
```

Then check console for detailed logs.

### Common Issues

#### Issue: Service worker not registering

**Solutions**:

1. Check HTTPS (required except localhost)
2. Verify `sw.js` is in `/public/`
3. Check browser console for errors
4. Verify PWAManager is in layout.tsx

#### Issue: Updates not showing

**Solutions**:

1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Unregister old worker manually
3. Check version numbers updated
4. Clear browser cache

#### Issue: Offline page not showing

**Solutions**:

1. Verify `/offline` route exists
2. Check precached assets include "/offline"
3. Test with DevTools offline mode
4. Check service worker activation

#### Issue: Forms not syncing

**Solutions**:

1. Check IndexedDB permissions
2. Verify background sync registration
3. Check API endpoints are correct
4. Monitor console for sync events

## Performance Optimizations

### Current Optimizations

1. **Navigation Preload**: Enabled for faster page loads
2. **Critical Asset Priority**: Homepage loads first
3. **Stale-While-Revalidate**: Fast responses, background updates
4. **Long-term Image Caching**: 90-day image cache
5. **CDN Asset Caching**: 1-year CDN cache
6. **Compression**: All assets gzipped
7. **Code Splitting**: Next.js automatic splitting

### Performance Metrics

Target metrics:

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Future Optimizations

- [ ] Implement predictive prefetching
- [ ] Add service worker message bus
- [ ] Implement request deduplication
- [ ] Add cache warming on idle
- [ ] Implement smart cache pruning
- [ ] Add A/B testing for cache strategies

## Security Considerations

### Current Security

1. **HTTPS Required**: Service workers only work over HTTPS
2. **Same-Origin Policy**: Cache only same-origin content
3. **GET Requests Only**: Fetch handler only processes GET
4. **Safe Logging**: Production logging disabled via DEBUG flag
5. **Error Handling**: Comprehensive try-catch blocks
6. **Scope Limited**: Service worker scoped to root only

### Best Practices

1. Never cache sensitive data
2. Clear caches on logout
3. Validate cached responses
4. Set appropriate cache durations
5. Use versioned cache names
6. Handle errors gracefully

## Monitoring

### Metrics to Track

1. **Installation Rate**: % of users installing PWA
2. **Offline Usage**: % of requests served from cache
3. **Update Success**: % of successful updates
4. **Error Rate**: Service worker errors
5. **Cache Hit Ratio**: Cache vs network requests
6. **Background Sync**: Queued form submissions

### Google Analytics Integration

Track PWA events:

```javascript
gtag("event", "pwa_install", {
  event_category: "engagement",
  event_label: "PWA Installation",
});
```

Events tracked:

- `pwa_install`: App installation
- `pwa_update`: Service worker update
- `offline_view`: Offline page view
- `background_sync`: Successful sync

## Resources

### Documentation

- [MDN: Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Chrome DevTools: PWA](https://developer.chrome.com/docs/devtools/progressive-web-apps/)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox](https://developers.google.com/web/tools/workbox)

### Support

- Chrome: ✅ Full support
- Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ⚠️ Partial support (no background sync)
- Samsung Internet: ✅ Full support

## Changelog

### v4.0.0 (Current)

- ✅ Added navigation preload
- ✅ Improved error handling in install event
- ✅ Enhanced cache strategy analysis
- ✅ Updated manifest short_name to 8 chars
- ✅ Explicit GET request filtering
- ✅ Comprehensive test suite
- ✅ 98% test coverage

### v3.0.0

- Background sync implementation
- IndexedDB for form storage
- Push notification handlers
- Multiple cache layers

### v2.0.0

- Stale-while-revalidate strategy
- CDN optimization
- Cloudflare integration

### v1.0.0

- Initial PWA implementation
- Basic caching
- Offline page

---

**Last Updated**: December 26, 2025  
**Maintained By**: MH Construction Development Team  
**Test Status**: 49/50 Passing (98%)
