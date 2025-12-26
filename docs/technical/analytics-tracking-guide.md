# Analytics Tracking Implementation Guide

## Quick Start: Add Tracking to ANY Page in 30 Seconds

### Step 1: Add the Hook (Automatic Tracking)

At the top of your page component, add ONE line:

```tsx
import { usePageTracking } from "@/lib/analytics/hooks";

export default function MyNewPage() {
  usePageTracking("My Page Name"); // ✅ That's it!

  return <div>Your page content</div>;
}
```

**This automatically tracks:**

- ✅ Page views
- ✅ Time spent on page
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Exit/bounce tracking
- ✅ Session initialization
- ✅ **Device info** (type, OS, browser, screen resolution) ⭐
- ✅ **Geographic data** (timezone, language) ⭐
- ✅ **Network info** (connection type, speed) ⭐
- ✅ **Traffic source** (referrer, UTM params, organic/social/paid) ⭐

### Step 2: Track Buttons & Links (Optional)

Replace regular elements with tracked versions:

```tsx
import { TrackedButton, TrackedLink, TrackedCTA } from '@/components/analytics/TrackedComponents';

// Regular buttons → Tracked buttons
<TrackedButton trackId="contact-us">Contact Us</TrackedButton>

// Regular links → Tracked links
<TrackedLink trackId="services-link" href="/services">Services</TrackedLink>

// CTA buttons (for conversion tracking)
<TrackedCTA trackId="hero-cta" trackProperties={{ section: 'hero' }}>
  Get Started
</TrackedCTA>
```

### Step 3: Track Forms (Optional)

```tsx
import { TrackedForm } from "@/components/analytics/TrackedComponents";

<TrackedForm trackId="contact-form" onSubmit={handleSubmit}>
  <input name="email" />
  <button type="submit">Submit</button>
</TrackedForm>;
```

---

## Complete Examples

### Example 1: Basic Page with Tracking

```tsx
"use client";

import { usePageTracking } from "@/lib/analytics/hooks";

export default function AboutPage() {
  usePageTracking("About Us");

  return (
    <div>
      <h1>About Us</h1>
      <p>Company information...</p>
    </div>
  );
}
```

### Example 2: Page with Interactive Elements

```tsx
"use client";

import { usePageTracking } from "@/lib/analytics/hooks";
import {
  TrackedButton,
  TrackedLink,
} from "@/components/analytics/TrackedComponents";

export default function ServicesPage() {
  usePageTracking("Services");

  return (
    <div>
      <h1>Our Services</h1>

      <TrackedLink trackId="service-construction" href="/services/construction">
        Construction Services
      </TrackedLink>

      <TrackedButton
        trackId="request-quote"
        trackProperties={{ service: "general" }}
        onClick={() => console.log("Quote requested")}
      >
        Request Quote
      </TrackedButton>
    </div>
  );
}
```

### Example 3: Page with Form Tracking

```tsx
"use client";

import { useState } from "react";
import { usePageTracking } from "@/lib/analytics/hooks";
import {
  TrackedForm,
  TrackedInput,
} from "@/components/analytics/TrackedComponents";

export default function ContactPage() {
  usePageTracking("Contact");
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic...
  };

  return (
    <div>
      <h1>Contact Us</h1>

      <TrackedForm
        trackId="contact-form"
        onSubmit={handleSubmit}
        trackProperties={{ source: "contact-page" }}
      >
        <TrackedInput
          trackId="email"
          formId="contact-form"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <button type="submit">Send Message</button>
      </TrackedForm>
    </div>
  );
}
```

### Example 4: Page with Manual Tracking

For specific interactions that need custom tracking:

```tsx
"use client";

import { usePageTracking, useClickTracking } from "@/lib/analytics/hooks";

export default function InteractivePage() {
  usePageTracking("Interactive Demo");
  const trackClick = useClickTracking();

  const handleSpecialAction = () => {
    // Track this specific action
    trackClick("special-action-button", {
      category: "engagement",
      label: "User performed special action",
    });

    // Your logic...
  };

  return <button onClick={handleSpecialAction}>Special Action</button>;
}
```

---

## Advanced Tracking

### Track Element Visibility

Track when specific elements come into view:

```tsx
import { useElementTracking } from "@/lib/analytics/hooks";

function TestimonialCard() {
  const ref = useElementTracking("testimonial-card-viewed");

  return <div ref={ref}>Testimonial content</div>;
}
```

### Track Video Interactions

```tsx
import { trackVideo } from "@/lib/analytics/tracking";

<video
  onPlay={() => trackVideo("promo-video", "play")}
  onPause={() => trackVideo("promo-video", "pause")}
  onEnded={() => trackVideo("promo-video", "complete")}
>
  <source src="/video.mp4" />
</video>;
```

### Track Downloads

```tsx
import { trackDownload } from "@/lib/analytics/tracking";

<a
  href="/brochure.pdf"
  onClick={() =>
    trackDownload("company-brochure.pdf", { category: "marketing" })
  }
>
  Download Brochure
</a>;
```

### Track Navigation Events

```tsx
import { trackNavigation } from "@/lib/analytics/tracking";

<nav>
  <button onClick={() => trackNavigation("mobile-menu", { action: "open" })}>
    Menu
  </button>
</nav>;
```

---

## Available Tracking Functions

### Hooks (Automatic)

- `usePageTracking(pageName)` - Auto-tracks page views, duration, scroll
- `useClickTracking()` - Returns function to track clicks
- `useFormTracking(formId)` - Returns form tracking helpers
- `useCTATracking()` - Returns function to track CTAs
- `useElementTracking(elementId)` - Returns ref for visibility tracking

### Components (Drop-in Replacements)

- `<TrackedButton>` - Replaces `<button>`
- `<TrackedLink>` - Replaces `<Link>` or `<a>`
- `<TrackedCTA>` - For conversion-focused buttons
- `<TrackedForm>` - Replaces `<form>`
- `<TrackedInput>` - Replaces `<input>`
- `<TrackedTextArea>` - Replaces `<textarea>`

### Manual Functions (Direct Calls)

- `trackClick(elementId, properties)` - Track any click
- `trackFormSubmit(formId, properties)` - Track form submission
- `trackFormField(fieldId, action, properties)` - Track field interaction
- `trackPageView(page, properties)` - Track page view
- `trackPageDuration(page, duration)` - Track time on page
- `trackScrollDepth(depth)` - Track scroll percentage
- `trackCTA(ctaId, properties)` - Track CTA click
- `trackNavigation(navId, properties)` - Track navigation
- `trackVideo(videoId, action)` - Track video interaction
- `trackDownload(fileName, properties)` - Track file download

---

## Data Storage & Retrieval

All tracking data is stored in localStorage under these keys:

- `mh_analytics_pageviews` - Page view data
- `mh_analytics_clicks` - Click event data
- `mh_analytics_conversions` - Form submissions and CTAs
- `mh_analytics_sessions` - Session information

### View Data in Dashboard

1. Triple-click the copyright text in the footer
2. Sign in with admin credentials:
   - **Matt:** <matt@mhc-gc.com> / admin123
   - **Jeremy:** <jeremy@mhc-gc.com> / admin123
3. View comprehensive analytics at `/dashboard`

### Access Data Programmatically

```tsx
import { analyticsEngine } from "@/lib/analytics";

const dashboardData = analyticsEngine.getDashboardData();
console.log(dashboardData.overview.pageViews);
console.log(dashboardData.userBehavior.averageSessionDuration);
```

---

## Checklist for New Pages

When creating a new page, follow this checklist:

- [ ] Add `usePageTracking('Page Name')` at the top of the component
- [ ] Replace key buttons with `<TrackedButton>` or `<TrackedCTA>`
- [ ] Replace navigation links with `<TrackedLink>`
- [ ] Wrap forms with `<TrackedForm>`
- [ ] Add custom tracking for special interactions (video, downloads, etc.)
- [ ] Test by viewing data in admin dashboard

---

## Troubleshooting

### Tracking not working?

1. Make sure component is marked `"use client"`
2. Check browser console for errors
3. Verify localStorage isn't disabled
4. Check that tracking functions are imported correctly

### Data not showing in dashboard?

1. Make sure you've interacted with the page (clicks, scrolls, etc.)
2. Check localStorage in DevTools: Application → Local Storage
3. Refresh the dashboard page
4. Verify you're signed in as admin

### Need to reset data?

```javascript
// In browser console:
localStorage.removeItem("mh_analytics_pageviews");
localStorage.removeItem("mh_analytics_clicks");
localStorage.removeItem("mh_analytics_conversions");
localStorage.removeItem("mh_analytics_sessions");
```

---

## Best Practices

1. **Name your track IDs consistently**: Use kebab-case and descriptive names
   - ✅ `hero-get-started-button`
   - ❌ `btn1`

2. **Add context with properties**: Include useful metadata

   ```tsx
   trackClick("apply-now", {
     position: "Software Engineer",
     source: "careers-page",
     category: "application",
   });
   ```

3. **Track meaningful interactions**: Focus on user actions that matter
   - CTAs and conversion points
   - Form submissions
   - Key navigation events
   - Content engagement (video plays, downloads)

4. **Don't over-track**: Avoid tracking every single element
   - Track buttons that drive actions, not decorative elements
   - Track important links, not every footer link

5. **Test your tracking**: After implementing, verify data appears in dashboard

---

## Support

If you need help with tracking implementation, check:

- This guide (docs/technical/analytics-tracking-guide.md)
- Admin system docs (docs/technical/admin-analytics-system.md)
- Example pages in src/app/
- Component source code in src/components/analytics/

For questions, contact the development team.
