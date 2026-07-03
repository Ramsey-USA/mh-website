# Analytics Tracking Implementation Guide

**Category:** Technical - Analytics  
**Last Updated:** April 18, 2026  
**Version:** 1.1.0  
**Status:** ✅ Active

**Brand Congruency:** Analytics event names, labels, and reporting language must remain aligned with canonical MH terminology and trust-safe phrasing.

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

### Step 2: Track Clicks & CTAs (Optional)

Use the manual tracking functions for buttons and links:

```tsx
import { trackClick, trackCTA } from "@/lib/analytics/tracking";

// Track a button click
<button onClick={() => trackClick("contact-us", { section: "hero" })}>
  Contact Us
</button>

// Track a CTA for conversion tracking
<button onClick={() => trackCTA("hero-cta", { section: "hero" })}>
  Get Started
</button>
```

For phone, email, and address links, use the built-in tracked components:

```tsx
import { TrackedPhoneLink, TrackedEmailLink } from "@/components/analytics/TrackedContactLinks";

<TrackedPhoneLink />
<TrackedEmailLink />
```

### Step 3: Track Forms (Optional)

Call `trackFormSubmit` after a successful form submission:

```tsx
import { trackFormSubmit } from "@/lib/analytics/tracking";

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const response = await fetch("/api/contact", { method: "POST", body: ... });
  if (response.ok) {
    trackFormSubmit("contact-form", { source: "contact-page" });
  }
};
```

---

## Optimization Guide (High Impact, Low Risk)

This analytics system can be optimized further. The fastest gains usually come
from improving data quality first, then reducing noise, then tuning dashboard
read performance.

### Priority Matrix

1. **P0 - Data quality guardrails (start here)**

- Normalize event names to kebab-case (example: `hero-cta-click`)
- Require core properties on key events: `page`, `source`, `deviceType`
- Avoid reusing one track ID for multiple unrelated actions

1. **P1 - Reduce event noise and payload size**

- Track decision-point interactions only (CTA, form, high-value nav)
- Do not track decorative or low-signal interactions
- Prefer short enums over long text in custom properties

1. **P1 - Improve dashboard read path**

- Keep summary cards based on pre-aggregated counters
- Keep expensive filtering/joins out of request-time paths
- Verify cache behavior for repeated admin refreshes

1. **P2 - Improve reliability around unload/navigation**

- Verify Google Analytics event delivery for unload/navigation transitions
- Verify `visibilitychange` and `beforeunload` flush behavior in QA
- Test mobile background/foreground transitions explicitly

### 30-Minute Optimization Checklist

- [ ] Confirm critical pages use `usePageTracking()` or `<PageTrackingClient>`
- [ ] Audit top 10 CTAs and verify one canonical event name per interaction
- [ ] Remove duplicate tracking calls on the same click path
- [ ] Verify `collect?v=2` Google Analytics requests are present in Network tab
- [ ] Verify `/api/analytics/dashboard` totals move after fresh interactions
- [ ] Capture one before/after dashboard screenshot for validation

### Event Naming Standard

Use this pattern for consistency and easier segmentation:

`<domain>-<surface>-<action>`

Examples:

- `lead-home-hero-cta-click`
- `lead-services-card-click`
- `conversion-contact-form-submit`
- `engagement-testimonial-carousel-next`

### Services Funnel Event Schema (GA4)

Use this schema for homepage services funnel reporting and dashboard segmentation.

**Primary events (already implemented):**

| Event Name      | Trigger                                             | Required Params                                                                             | Optional Params                 |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------- |
| `service-click` | Any services funnel interaction in the homepage hub | `serviceName`, `category`, `action`, `location`, `interaction`, `path`, `focus`             | `nextPath`, `nextFocus`         |
| `service-click` | Service card selected                               | `serviceName`, `category`, `action`, `location`, `interaction`, `path`, `focus`, `position` | `matchedCount`                  |
| `service-click` | Modal opened from service card                      | `serviceName`, `category`, `action`, `location`, `interaction`, `path`, `focus`             |                                 |
| `service-click` | Filters reset (manual or empty-state recovery)      | `serviceName`, `category`, `action`, `location`, `interaction`, `path`, `focus`, `origin`   | `previousPath`, `previousFocus` |

**Interaction enum values:**

- `path_select`
- `focus_select`
- `modal_open`
- `reset_filters`

**Canonical parameter values:**

- `path`: `all`, `plan-control`, `build-expand`, `modernize-spaces`
- `focus`: `all`, `ag-winery`, `public-sector`, `procurement`, `industrial`, `occupied-ti`, `rapid-ti`
- `location`: `homepage-showcase`
- `category`: `service-interest`

**Recommended GA4 custom dimensions:**

| Dimension Name         | Event Param    | Scope |
| ---------------------- | -------------- | ----- |
| Services Interaction   | `interaction`  | Event |
| Services Path          | `path`         | Event |
| Services Focus         | `focus`        | Event |
| Services Next Path     | `nextPath`     | Event |
| Services Next Focus    | `nextFocus`    | Event |
| Services Matched Count | `matchedCount` | Event |
| Services Reset Origin  | `origin`       | Event |
| Services Location      | `location`     | Event |

**Dashboard starter views:**

1. Funnel progression: `path_select -> focus_select -> modal_open -> contact conversion`.
2. Drop-off matrix by `path` and `focus`.
3. Recovery impact: `reset_filters` count vs. post-reset `modal_open`.
4. Lane demand ranking: modal opens grouped by `path` + `focus`.

### KPI Set for Optimization Success

- **Collection health**: successful collect responses / collect attempts
- **Signal quality**: events with required properties / total events
- **Conversion attribution quality**: conversions with source/campaign fields
- **Dashboard latency**: p95 response for `/api/analytics/dashboard`

## Using Google Analytics and Lighthouse Together

Use both systems together to prioritize work with business impact:

1. **Google Analytics answers**: Are users reaching and completing key journeys?
2. **Lighthouse answers**: Is page performance or UX quality blocking those journeys?

Decision framework:

- **High GA traffic + low Lighthouse score**: urgent optimization target.
- **High GA conversion page + weak Lighthouse score**: protect this path first.
- **Low traffic + low score**: lower priority unless strategic page.

Suggested baseline set:

- Track in GA: `page_view`, `click`, `form_submission`, `conversion`.
- Track in Lighthouse: Performance score, LCP, CLS, TBT.

Release validation pattern:

1. Capture Lighthouse baseline before changes.
2. Deploy performance/content changes.
3. Re-run Lighthouse on same pages under same conditions.
4. Compare GA conversion and engagement trends over the next 3-7 days.

Use this worksheet for each release:

- [docs/performance/performance-triage-template.md](../performance/performance-triage-template.md)

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
import { trackClick, trackCTA } from "@/lib/analytics/tracking";

export default function HomePage() {
  usePageTracking("Home");

  return (
    <div>
      <h1>Start with Your Project Type</h1>

      <button
        onClick={() =>
          trackClick("services-delivery-path", {
            step: 1,
            path: "build-expand",
          })
        }
      >
        Build & expand
      </button>

      <button
        onClick={() => {
          trackCTA("services-card-open", {
            step: 3,
            focus: "ag-winery",
            service: "AG and Winery Communities",
          });
        }}
      >
        Open AG and Winery service details
      </button>
    </div>
  );
}
```

### Example 3: Page with Form Tracking

```tsx
"use client";

import { useState } from "react";
import { usePageTracking } from "@/lib/analytics/hooks";
import { trackFormSubmit } from "@/lib/analytics/tracking";

export default function ContactPage() {
  usePageTracking("Contact");
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      trackFormSubmit("contact-form", { source: "contact-page" });
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
```

### Example 4: Page with Manual Tracking

For specific interactions that need custom tracking:

```tsx
"use client";

import { usePageTracking } from "@/lib/analytics/hooks";
import { trackClick } from "@/lib/analytics/tracking";

export default function InteractivePage() {
  usePageTracking("Interactive Demo");

  const handleSpecialAction = () => {
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

### Components

- `<TrackedPhoneLink>` - Tracked phone number link
- `<TrackedEmailLink>` - Tracked email link
- `<TrackedLocationLink>` - Tracked address/maps link
- `<PageTrackingClient>` - Lightweight tracking island for RSC pages
- `<EnhancedAnalytics>` - Full analytics provider (root layout)

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

Tracking uses a Google Analytics model:

- **Client event dispatch** via `window.gtag`
- **Google Analytics collection** in your configured GA property
- **Admin dashboard APIs** remain separate for operations data

### View Data in Dashboard

1. Navigate directly to `/dashboard` on the MH Construction website (preferred method)
2. Sign in with admin credentials when prompted
3. View comprehensive analytics — alternatively, from any page press `Ctrl + Shift + A` (Win/Linux) or `Cmd + Shift + A` (macOS) to open the sign-in modal

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

- [ ] Add `usePageTracking('Page Name')` at the top of the component (or use `<PageTrackingClient>` for RSC pages)
- [ ] Add `trackClick()` / `trackCTA()` calls for key buttons
- [ ] Use `<TrackedPhoneLink>` / `<TrackedEmailLink>` for contact links
- [ ] Call `trackFormSubmit()` after successful form submissions
- [ ] Add custom tracking for special interactions (video, downloads, etc.)
- [ ] Test by viewing data in admin dashboard

---

## Troubleshooting

### Tracking not working?

1. Make sure component is marked `"use client"`
2. Check browser console for errors
3. Verify localStorage isn't disabled (local cache layer)
4. Check that tracking functions are imported correctly
5. Verify the `ANALYTICS` KV namespace is bound in `wrangler.toml`
6. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set if GA events are expected

### Data not showing in dashboard?

1. Make sure you've interacted with the page (clicks, scrolls, etc.)
2. Check browser Network tab for GA `collect?v=2` requests
3. Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured for the current environment
4. Refresh the dashboard page
5. Verify you're signed in as admin

### Need to reset analytics state?

```javascript
// GA event data is not stored in app localStorage by this analytics layer.
// Use GA DebugView / Realtime reports to validate events.
```

### Need to validate tracking pipeline quickly?

1. Visit an instrumented page and trigger at least one tracked interaction
2. In DevTools Network, verify GA `collect?v=2` requests complete successfully
3. Validate event arrival in Google Analytics DebugView / Realtime
4. If events do not appear, verify measurement ID and `window.gtag` initialization

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

- This guide (you are here)
- [Admin Dashboard section](#admin-dashboard) in this guide
- Example pages in src/app/
- Component source code in src/components/analytics/

For questions, contact the development team.

---

## Admin Dashboard

## Access Instructions

### How to Access the Dashboard

1. **Navigate to `/dashboard`** on the MH Construction website (preferred method)
2. **Sign in** with admin credentials when prompted
3. **Access the Analytics Dashboard** — alternatively, from any page press `Ctrl + Shift + A` (Win/Linux) or `Cmd + Shift + A` (macOS) to trigger the sign-in modal

### Default Credentials

⚠️ **SECURITY WARNING: Default passwords must be changed before production!**

**Development Only:**

- Email: `matt@mhc-gc.com`
- Password: `admin123` (default - change immediately for production)

**Jeremy's Account:**

- Email: `jeremy@mhc-gc.com`
- Password: `admin123` (default - change immediately for production)

> 🔴 **CRITICAL**: These default passwords are ONLY for development. Before
> deploying to production, you **MUST** change them by setting environment
> variables `ADMIN_MATT_PASSWORD` and `ADMIN_JEREMY_PASSWORD` in Cloudflare
> Workers.
>
> **See: [Admin Password Security Guide](./admin-password-security.md) for complete instructions.**

## Dashboard Features

### Overview Statistics

- **Total Page Views**: Complete view count across all pages
- **Unique Visitors**: Number of distinct visitors
- **Average Session Duration**: How long users stay on the site
- **Conversion Rate**: Percentage of visitors who take action

### Performance Metrics

- **Page Load Time**: Average time to load pages
- **First Contentful Paint**: Speed of initial content rendering
- **Time to Interactive**: When page becomes fully interactive

### User Behavior

- **Top Pages**: Most visited pages with view counts
- **Bounce Rate**: Percentage of single-page sessions
- **Average Page Views**: Pages viewed per session
- **Returning Visitors**: Percentage of repeat visitors

### Conversions

- **Contact Form Submissions**: Total contact form completions
- **Consultation Requests**: Contact form consultation requests
- **Conversion by Type**: Breakdown of conversion types

### Veteran Engagement

- **Veteran Page Views**: Views on veteran-related pages
- **Engagement Rate**: Interaction level with veteran content

### Real-Time Data

- **Active Users**: Currently browsing users
- **Current Page Views**: Real-time page activity
- **Top Active Pages**: Most viewed pages right now

## Technical Architecture

### Components Created

1. **AdminSignInModal Component** (`apps/website/src/components/ui/modals/AdminSignInModal.tsx`) - Secure authentication modal with form validation, error handling, and JWT token management.

1. **Dashboard Page** (`apps/dashboard/src/app/dashboard/page.tsx`) - Comprehensive analytics visualization with real-time updates, protected-route auth checks, and responsive layout support.

1. **Admin Login API** (`apps/dashboard/src/app/api/auth/admin-login/route.ts`) - JWT token generation, credential verification, security logging, and middleware rate limiting.

1. **Analytics Dashboard API** (`apps/dashboard/src/app/api/analytics/dashboard/route.ts`) - Admin analytics retrieval with role-based access, 30-second Worker Cache support, and graceful KV fallback.

1. **Google Analytics Integration** (`src/components/analytics/GoogleAnalytics.tsx`) - `gtag` initialization plus GA-compatible page and custom event tracking.

### Security Features

- **Private Access**: Keyboard shortcut keeps the admin entry point off the visible footer UI
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access**: Admin role required
- **Access Logging**: All login attempts are logged
- **Protected Routes**: Dashboard requires valid auth token
- **NoIndex Meta**: Dashboard excluded from search engines

## Data Storage

Analytics data is handled via:

- **Google Analytics property**: Event collection and reporting
- **Admin auth session storage**: `admin_token`, `admin_user`

⚠️ **REQUIRED for production deployment:**

```bash
# Strong passwords (16+ characters recommended)
ADMIN_MATT_PASSWORD=your_secure_password_here
ADMIN_JEREMY_PASSWORD=your_secure_password_here

# JWT secret for token signing (32+ characters)
JWT_SECRET=your_jwt_secret_here
```

**How to set in Cloudflare:**

```bash
wrangler secret put ADMIN_MATT_PASSWORD
wrangler secret put ADMIN_JEREMY_PASSWORD
wrangler secret put JWT_SECRET
```

**See detailed guide:** [Admin Password Security](./admin-password-security.md)

### Security Checklist

Before production deployment:

- [ ] Generate strong passwords (16+ characters)
- [ ] Set `ADMIN_MATT_PASSWORD` in Cloudflare Workers
- [ ] Set `ADMIN_JEREMY_PASSWORD` in Cloudflare Workers
- [ ] Set `JWT_SECRET` in Cloudflare Workers
- [ ] Store passwords in team password manager (1Password)
- [ ] Test authentication with new passwords
- [ ] Verify default passwords no longer work
- [ ] Enable Cloudflare Access for additional security (optional)
- [ ] Review access logs for suspicious activity
- [ ] Schedule password rotation (90 days)
- [ ] Document emergency access procedures

**Related Documentation:**

- [Admin Password Security Guide](./admin-password-security.md)
- [Secrets Management Guide](./secrets-management.md)
- [ ] Enable Cloudflare Access for additional security
- [ ] Review access logs regularly
- [ ] Test authentication flow
- [ ] Verify dashboard data accuracy

## Dashboard Usage Tips

1. **Session Duration**: Login sessions last 1 hour
2. **Data Updates**: Analytics update in real-time as visitors browse
3. **Mobile Access**: Dashboard is fully responsive and works on mobile
4. **Logout**: Use the logout button in the dashboard header
5. **Privacy**: Only Matt and Jeremy have access credentials

## Dashboard Troubleshooting

### Can't Access Dashboard

- Navigate directly to `/dashboard` or use `Ctrl/Cmd + Shift + A` from any site page
- Check that you're using correct credentials
- Clear browser cache and try again
- Check console for error messages

### No Data Showing

- Dashboard may show sample data initially
- Data accumulates as visitors browse the site
- Real-time metrics require active traffic

### Authentication Issues

- Verify credentials are correct
- Check that API routes are deployed
- Ensure JWT_SECRET is set in environment

## Future Enhancements

Potential improvements:

- Database-backed analytics storage
- Historical data trends and graphs
- Export analytics reports (PDF/CSV)
- Email notifications for key metrics
- Custom date range filtering
- Advanced filtering and segmentation
- Integration with Google Analytics
- A/B testing capabilities
- Heatmap visualization
- Session replay functionality

## Dashboard Support

For technical issues or questions:

- Check browser console for errors
- Review Cloudflare logs
- Contact development team

---

**Last Updated**: April 8, 2026
**Version**: 1.0.0
**Status**: Production Ready

---

## Quick Reference Cheatsheet

### Import Statements

```tsx
// Hooks (automatic tracking)
import { usePageTracking, useClickTracking } from "@/lib/analytics/hooks";

// Contact link components (pre-wired tracking)
import {
  TrackedPhoneLink,
  TrackedEmailLink,
  TrackedLocationLink,
} from "@/components/analytics/TrackedContactLinks";

// Lightweight island for RSC pages
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

### Common Patterns

```tsx
// Button click
<button onClick={() => trackClick("my-button", { context: "hero" })}>Click</button>

// CTA conversion
<button onClick={() => trackCTA("hero-cta", { section: "hero" })}>Get Started</button>

// Contact links
<TrackedPhoneLink />
<TrackedEmailLink />
<TrackedLocationLink />

// Form submit (after successful API call)
if (res.ok) trackFormSubmit("contact-form", { source: "contact-page" });

// Video
<video
  onPlay={() => trackVideo("video-id", "play")}
  onEnded={() => trackVideo("video-id", "complete")}
/>

// Download
<a onClick={() => trackDownload("file.pdf", { category: "docs" })}>Download</a>
```

### New Page Checklist

- [ ] Add `usePageTracking('Page Name')` (or `<PageTrackingClient>` for RSC pages)
- [ ] Add `trackClick()` / `trackCTA()` for key buttons
- [ ] Use `<TrackedPhoneLink>` / `<TrackedEmailLink>` for contact links
- [ ] Call `trackFormSubmit()` after successful form submissions
- [ ] Verify data appears in dashboard (`Ctrl/Cmd + Shift + A`)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
