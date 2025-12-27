# Analytics Quick Reference

**⭐ ENHANCED (Dec 27, 2025):** Now collects 100+ data points with privacy-first approach!

**Related Documentation:**

- [Analytics Enhancement Guide](./ANALYTICS-ENHANCEMENT-DEC-2025.md) - Latest improvements
- [Data Collection Checklist](./ANALYTICS-DATA-COLLECTION-CHECKLIST.md) - Complete data inventory
- [Full Implementation Guide](./ANALYTICS-IMPLEMENTATION-COMPLETE.md) - Complete overview

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
  useFormTracking, // Form interactions
  useCTATracking, // Conversion tracking
  useElementTracking, // Visibility tracking
} from "@/lib/analytics/hooks";

// Components (drop-in replacements)
import {
  TrackedButton, // <button>
  TrackedLink, // <Link> or <a>
  TrackedCTA, // CTA button
  TrackedForm, // <form>
  TrackedInput, // <input>
  TrackedTextArea, // <textarea>
} from "@/components/analytics/TrackedComponents";

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
<TrackedButton trackId="my-button">Click Me</TrackedButton>
```

### Link Click

```tsx
<TrackedLink trackId="nav-services" href="/services">
  Services
</TrackedLink>
```

### CTA (Conversion)

```tsx
<TrackedCTA trackId="hero-cta" trackProperties={{ section: "hero" }}>
  Get Started
</TrackedCTA>
```

### Form

```tsx
<TrackedForm trackId="contact-form" onSubmit={handleSubmit}>
  <TrackedInput trackId="email" formId="contact-form" type="email" />
  <button type="submit">Submit</button>
</TrackedForm>
```

### Manual Click

```tsx
const trackClick = useClickTracking();

<button onClick={() => trackClick("custom-button", { extra: "data" })}>
  Click
</button>;
```

### Element Visibility

```tsx
const ref = useElementTracking("testimonial-viewed");
<div ref={ref}>Content</div>;
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

1. Triple-click copyright in footer
2. Sign in: `matt@mhc-gc.com` / `admin123`
3. View at `/dashboard`

## 🔍 Debug Data

```javascript
// In browser console:
localStorage.getItem("mh_analytics_pageviews");
localStorage.getItem("mh_analytics_clicks");
localStorage.getItem("mh_analytics_conversions");
localStorage.getItem("mh_analytics_sessions");
```

## 📚 Full Documentation

- **Setup Guide**: `docs/technical/analytics-tracking-guide.md`
- **Live Example**: Visit `/tracking-example` in dev
- **Admin System**: `docs/technical/admin-analytics-system.md`

## ✅ New Page Checklist

- [ ] Add `usePageTracking('Page Name')`
- [ ] Replace buttons with `<TrackedButton>`
- [ ] Replace links with `<TrackedLink>`
- [ ] Wrap forms with `<TrackedForm>`
- [ ] Test in dashboard

---

**Need help?** Check the full guide at `docs/technical/analytics-tracking-guide.md`
