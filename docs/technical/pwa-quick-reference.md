# PWA Quick Reference Guide

**⭐ UPDATED (Dec 27, 2025):** PWA manifest now includes dual-label military/construction terminology!

**Related Documentation:**

- [PWA Full Documentation](./pwa-documentation.md) - Complete guide
- [Browser Titles](./browser-tab-titles-inventory.md) - Title system used in PWA

---

## Quick Commands

```bash
# Test PWA functionality
npm run test:pwa

# Run Lighthouse PWA audit
npm run lighthouse

# Check service worker status
# Open DevTools → Application → Service Workers

# Clear all caches
# DevTools → Application → Cache Storage → Delete
```

## Service Worker Lifecycle

```text
Install → Activate → Fetch → Update → Repeat
```

1. **Install**: Cache critical assets
2. **Activate**: Clean old caches, claim clients
3. **Fetch**: Intercept network requests
4. **Update**: Detect new version, prompt user

## Cache Strategies at a Glance

| Strategy                   | Use Case                 | Offline     | Fresh Data         |
| -------------------------- | ------------------------ | ----------- | ------------------ |
| **Cache First**            | Static assets, images    | ✅          | After cache expire |
| **Network First**          | API calls, dynamic pages | ⚠️ Fallback | Always tries       |
| **Stale While Revalidate** | Critical endpoints       | ✅          | Background update  |
| **Network Only**           | Never cache              | ❌          | Always fresh       |
| **Cache Only**             | Pre-cached only          | ✅          | Never updates      |

## Common Tasks

### Update Service Worker Version

```javascript
// public/sw.js (Line 13-18)
const _CACHE_NAME = "mh-construction-v5.0.0"; // ← Change this
const STATIC_CACHE_NAME = "mh-construction-static-v5.0.0";
const DYNAMIC_CACHE_NAME = "mh-construction-dynamic-v5.0.0";
// ... update all cache names
```

### Add Page to Offline Cache

```javascript
// public/sw.js (Line 38-68)
const STATIC_ASSETS = [
  ...CRITICAL_ASSETS,
  // Main pages
  "/new-page", // ← Add here
  "/about",
  // ...
];
```

### Modify Cache Duration

```javascript
// public/sw.js (Line 20-26)
const CACHE_DURATION = {
  STATIC: 60 * 24 * 60 * 60 * 1000, // Change: 60 days
  IMAGES: 180 * 24 * 60 * 60 * 1000, // Change: 180 days
  // ...
};
```

### Debug Service Worker

```javascript
// public/sw.js (Line 6)
const DEBUG = true; // Enable detailed logging
```

Then check browser console for `[SW]` prefixed logs.

## Testing Checklist

### Pre-Deployment

- [ ] Update cache version numbers
- [ ] Run `npm run test:pwa` (should pass 50/50)
- [ ] Test offline mode (DevTools → Network → Offline)
- [ ] Test installation prompt
- [ ] Test update notification
- [ ] Run Lighthouse audit (PWA score 90+)

### Post-Deployment

- [ ] Verify service worker registers
- [ ] Check update notification appears for existing users
- [ ] Test offline functionality
- [ ] Monitor error logs
- [ ] Check cache hit ratios

## Troubleshooting

### Service Worker Not Updating

```javascript
// Force update in browser console
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((reg) => reg.unregister());
  window.location.reload();
});
```

### Clear All Caches

```javascript
// Run in browser console
caches
  .keys()
  .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
  .then(() => window.location.reload());
```

### Check Cache Contents

```javascript
// Run in browser console
caches
  .open("mh-construction-static-v4.0.0")
  .then((cache) => cache.keys())
  .then((keys) => console.log(keys.map((k) => k.url)));
```

## File Locations

```text
public/
├── sw.js                    ← Service worker
└── manifest.json            ← PWA manifest

src/
├── components/pwa/
│   ├── PWAManager.tsx       ← Main coordinator
│   ├── ServiceWorkerRegistration.tsx
│   ├── PWAInstallPrompt.tsx
│   └── UpdateNotification.tsx
└── app/
    ├── layout.tsx           ← PWAManager integration
    └── offline/
        └── page.tsx         ← Offline fallback page

scripts/
└── test-pwa.js              ← PWA test suite

docs/technical/
└── pwa-documentation.md     ← Full documentation
```

## Key Metrics

| Metric         | Target | Current                         |
| -------------- | ------ | ------------------------------- |
| PWA Test Score | 90%+   | **98%** ✅                      |
| Lighthouse PWA | 90+    | Check with `npm run lighthouse` |
| Offline Pages  | 20+    | **24** ✅                       |
| Cache Layers   | 3+     | **5** ✅                        |
| Icon Sizes     | 8+     | **8** ✅                        |

## Support Matrix

| Browser | Install | Offline | Sync | Push |
| ------- | ------- | ------- | ---- | ---- |
| Chrome  | ✅      | ✅      | ✅   | ✅   |
| Edge    | ✅      | ✅      | ✅   | ✅   |
| Firefox | ✅      | ✅      | ✅   | ✅   |
| Safari  | ⚠️      | ✅      | ❌   | ❌   |
| Samsung | ✅      | ✅      | ✅   | ✅   |

⚠️ = Partial support  
❌ = Not supported

## Emergency Procedures

### Disable Service Worker (Production)

1. Deploy empty service worker:

```javascript
// public/sw.js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => {
  self.clients.claim();
  caches
    .keys()
    .then((keys) => Promise.all(keys.map((key) => caches.delete(key))));
});
```

1. Users will auto-update on next visit
2. All caches cleared

### Force Update All Users

```javascript
// Add to sw.js activate event
self.registration.unregister();
```

Caution: Only use for critical issues!

## Best Practices

✅ **DO**

- Version all caches
- Test offline mode before deploy
- Use appropriate cache strategies
- Handle errors gracefully
- Monitor service worker errors
- Clear old caches on activate

❌ **DON'T**

- Cache sensitive user data
- Use long cache durations for APIs
- Forget to update version numbers
- Deploy untested service workers
- Cache external resources indefinitely
- Ignore service worker errors

## Performance Tips

1. **Prioritize Critical Assets**: Load homepage first
2. **Use Preload**: Enable navigation preload
3. **Optimize Cache Size**: Remove unused cached assets
4. **Monitor Cache Usage**: Track cache hit ratios
5. **Background Updates**: Use stale-while-revalidate
6. **Lazy Cache**: Don't precache everything

## Resources

- 📖 Full docs: `docs/technical/pwa-documentation.md`
- 🧪 Test script: `scripts/test-pwa.js`
- 🔧 Service worker: `public/sw.js`
- 📱 Manifest: `public/manifest.json`

---

**Need Help?** Check the full [PWA Documentation](./pwa-documentation.md)
