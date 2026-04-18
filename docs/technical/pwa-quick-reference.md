# PWA Quick Reference Guide

**Related Documentation:**

- [Browser Titles](./browser-tab-titles-inventory.md) - Title system used in PWA

---

## Quick Commands

```bash
# Test PWA functionality
npm run test:pwa

# Open Lighthouse PWA audit guidance
npm run lighthouse:guide

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
// public/sw.js (Line 32-37)
const _CACHE_NAME = "mh-construction-v5.0.0"; // ← Change this
const STATIC_CACHE_NAME = "mh-construction-static-v5.0.0";
const DYNAMIC_CACHE_NAME = "mh-construction-dynamic-v5.0.0";
// ... update all cache names
```

### Add Page to Offline Cache

```javascript
// public/sw.js (Line 56-67)
const STATIC_ASSETS = [
  ...CRITICAL_ASSETS,
  "/new-page", // ← Add here
  "/contact",
  "/projects",
  "/services",
];
```

### Modify Cache Duration

```javascript
// public/sw.js (Line 40-48)
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
- [ ] Run Lighthouse audit from PageSpeed Insights or Chrome DevTools

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
│   ├── PWAOnly.tsx          ← Render only in installed PWA
│   ├── ServiceWorkerRegistration.tsx
│   ├── PWAInstallPrompt.tsx
│   ├── PWAInstallCTA.tsx    ← Branded install call-to-action
│   ├── OfflineIndicator.tsx ← Fixed offline/syncing banner
│   ├── DownloadGate.tsx     ← Role-gated document downloads
│   └── UpdateNotification.tsx
├── hooks/
│   ├── usePWA.ts            ← Detect standalone/installable state
│   └── useOfflineStatus.ts  ← Track online state + pending count
└── app/
    ├── layout.tsx           ← PWAManager integration
    └── offline/
        └── page.tsx         ← Offline fallback page

scripts/
└── test-pwa.js              ← PWA test suite
```

## Key Metrics

| Metric         | Target | Current                |
| -------------- | ------ | ---------------------- |
| PWA Test Score | 90%+   | Baseline: **98%** ✅   |
| Lighthouse PWA | 90+    | See PageSpeed/DevTools |
| Offline Pages  | 5+     | **8** ✅               |
| Cache Layers   | 3+     | **5** ✅               |
| Icon Sizes     | 8+     | **8** ✅               |

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

- 🧪 Test script: `scripts/test-pwa.js`
- 🔧 Service worker: `public/sw.js`
- 📱 Manifest: `public/manifest.json`

---

**Need Help?** Check the service worker at `public/sw.js` or run `npm run test:pwa`

---

## PWA-First Development

The MH Construction site is built PWA-first: every page works offline, and
select sections are enhanced (or gated) when the app is installed. This section
documents the building blocks.

### `usePWA` hook

Detects the current PWA context. Safe for SSR — all values are `false` until
client hydration.

```typescript
import { usePWA } from "@/hooks/usePWA";

const { isStandalone, isInstallable, isIOS } = usePWA();
// isStandalone → true when launched from home screen / installed PWA
// isInstallable → true when browser supports install prompt (not yet installed)
// isIOS         → true on iPhone/iPad (uses Add to Home Screen flow)
```

### `PWAOnly` component

Renders `children` only inside the installed PWA (standalone mode). Renders
`fallback` (default: nothing) in the regular browser.

```tsx
import { PWAOnly } from "@/components/pwa";

// Show nothing in browser, show quick-actions in installed app
<PWAOnly>
  <AppQuickActions />
</PWAOnly>

// Show install CTA in browser, show quick-actions after installation
<PWAOnly fallback={<InstallBanner />}>
  <AppQuickActions />
</PWAOnly>
```

### `useOfflineStatus` hook

Tracks real-time connectivity and IndexedDB pending submission count. Used by
`OfflineIndicator` but available to any component.

```typescript
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

const { isOnline, pendingCount, refreshPendingCount } = useOfflineStatus();
```

### PWA-only sections in the Hub (`/hub`)

The Hub shows an **App** tab only when running as an installed PWA (detected via
`usePWA().isStandalone`). The tab contains:

| Feature                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| Quick Call / Email       | One-tap contact to the office                       |
| Push notification toggle | Requests `Notification.permission`                  |
| Quick Links              | Home screen shortcuts to key pages                  |
| Check for update         | Calls `serviceWorker.update()` on all registrations |
| Reload app               | `window.location.reload()` for force refresh        |

To add a new PWA-only section to any page, wrap it in `<PWAOnly>`:

```tsx
import { PWAOnly } from "@/components/pwa";

export default function MyPage() {
  return (
    <>
      <RegularContent />
      <PWAOnly>
        <MyPWAOnlySection />
      </PWAOnly>
    </>
  );
}
```
