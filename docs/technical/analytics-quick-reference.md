# Analytics Quick Reference

**⭐ ENHANCED (Dec 27, 2025):** Now collects 100+ data points with privacy-first approach!

**Related Documentation:**

- [Analytics Tracking Guide](./analytics-tracking-guide.md) - Complete implementation guide
- [Admin Analytics System](./admin-analytics-system.md) - Dashboard access

---

## ⚡ 30-Second Setup for New Pages

```tsx
import { usePageTracking } from "@/lib/analytics/hooks";

export default function MyPage() {
  usePageTracking("Page Name"); // ✅ Done!
  return <div>Content</div>;
}
```

## 📦 Import Statements

```tsx
// Hooks (automatic tracking)
import {
  usePageTracking, // Page views, duration, scroll
  useClickTracking, // Click events
} from "@/lib/analytics/hooks";

// Contact link components
import {
  TrackedPhoneLink,
  TrackedEmailLink,
  TrackedLocationLink,
} from "@/components/analytics/TrackedContactLinks";

// Lightweight tracking island for RSC pages
import { PageTrackingClient } from "@/components/analytics/PageTrackingClient";

// Manual tracking functions
import {
  trackClick,
  trackFormSubmit,
  trackPageView,
  trackCTA,
  trackVideo,
  trackDownload,
  trackNavigation,
} from "@/lib/analytics/tracking";
```

## 🎯 Common Patterns

### Button Click

```tsx
<button onClick={() => trackClick("my-button", { context: "hero" })}>
  Click Me
</button>
```

### Contact Links

```tsx
<TrackedPhoneLink />
<TrackedEmailLink />
<TrackedLocationLink />
```

### CTA (Conversion)

```tsx
<button onClick={() => trackCTA("hero-cta", { section: "hero" })}>
  Get Started
</button>
```

### Form Submission

```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const res = await fetch("/api/contact", { method: "POST", body: ... });
  if (res.ok) trackFormSubmit("contact-form", { source: "contact-page" });
};
```

### Manual Click

```tsx
import { trackClick } from "@/lib/analytics/tracking";

<button onClick={() => trackClick("custom-button", { extra: "data" })}>
  Click
</button>;
```

### Video

```tsx
<video
  onPlay={() => trackVideo("video-id", "play")}
  onPause={() => trackVideo("video-id", "pause")}
  onEnded={() => trackVideo("video-id", "complete")}
/>
```

### Download

```tsx
<a onClick={() => trackDownload("file.pdf", { category: "docs" })}>Download</a>
```

## 📊 View Dashboard

1. Press `Ctrl + Shift + A` on Windows/Linux or `Cmd + Shift + A` on macOS
2. Sign in: `matt@mhc-gc.com` / `admin123`
3. View at `/dashboard`

## 🔄 Data Pipeline

**Client → Server → KV:**

1. Tracking functions write to localStorage (client) and batch events via `beacon.ts`
2. Events sent to `POST /api/analytics/collect` via `navigator.sendBeacon`
3. Collect endpoint writes aggregated data to Cloudflare KV
4. Dashboard reads cross-visitor KV data via `GET /api/analytics/dashboard`

**Debug (client-side only):**

```javascript
// In browser console:
localStorage.getItem("mh_analytics_pageviews");
localStorage.getItem("mh_analytics_clicks");
localStorage.getItem("mh_analytics_conversions");
localStorage.getItem("mh_analytics_sessions");
```

## 📚 Full Documentation

- **Setup Guide**: `docs/technical/analytics-tracking-guide.md`
- **Admin System**: `docs/technical/admin-analytics-system.md`

## ✅ New Page Checklist

- [ ] Add `usePageTracking('Page Name')` (or `<PageTrackingClient>` for RSC)
- [ ] Add `trackClick()` / `trackCTA()` for key buttons
- [ ] Use `<TrackedPhoneLink>` / `<TrackedEmailLink>` for contact links
- [ ] Call `trackFormSubmit()` after successful form submissions
- [ ] Test in dashboard

---

**Need help?** Check the full guide at `docs/technical/analytics-tracking-guide.md`
