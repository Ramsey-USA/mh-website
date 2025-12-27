# Complete Analytics System Reference

**Last Updated:** December 27, 2025  
**Status:** ✅ FULLY OPERATIONAL - 100% page coverage

---

## Quick Overview

The MH Construction analytics system provides comprehensive marketing intelligence without external tracking services. All data is stored locally in the visitor's browser (localStorage) and accessed through the military-themed dashboard.

### What It Tracks

1. **Geographic Location** - Where visitors are from (city, state, country)
2. **CTA Effectiveness** - Which contact links get clicked
3. **Journey Progression** - How visitors move through the sales funnel
4. **Service Interest** - Which services attract attention
5. **Project Interest** - Which project types generate engagement
6. **Lead Quality** - Automatic scoring (0-100) based on behavior
7. **Page Views** - Complete navigation history
8. **Form Submissions** - Contact form data with context

---

## Access Points

### Dashboard Access

1. Visit any page on the website
2. Triple-click the footer copyright text
3. Dashboard opens at `/dashboard`
4. View real-time analytics with military terminology

### Test Suite

- Open `test-analytics.html` in a browser
- Run comprehensive system tests
- Verify data collection and storage
- Simulate visitor journeys

---

## Implementation Architecture

### Core Files

#### Analytics Library (`src/lib/analytics/`)

**geolocation.ts** - Geographic location service

- 3-tier fallback: Cloudflare → IP API → Timezone
- 1-hour caching to reduce API calls
- Target market detection (WA, OR, ID)
- Mock data in development

**marketing-analytics.ts** - Marketing intelligence

- Journey stage tracking (awareness → decision)
- Service interest tracking (views, clicks, learn-more)
- Project interest tracking with context
- Lead scoring algorithm (0-100)
- Lead quality categories (cold, warm, hot, qualified)

**marketing-tracking.ts** - Marketing utilities

- Journey milestone tracking
- Landing page detection
- Navigation pattern analysis
- Conversion event tracking

**tracking.ts** - Core tracking functions

- `trackPageView()` - Page visit tracking
- `trackClick()` - Click event tracking with geolocation
- `trackEvent()` - Generic event tracking
- `trackFormSubmit()` - Form submission tracking

**hooks.ts** - React hooks

- `usePageTracking()` - Automatic page tracking on mount
- `useFormTracking()` - Form submission tracking
- Automatic journey stage determination

**metadata.ts** - Event metadata

- `getEnhancedTrackingProperties()` - Async with geolocation
- Device detection (mobile/tablet/desktop)
- Browser information
- Referrer tracking
- Session management

#### API Endpoints (`src/app/api/analytics/`)

**geolocation/route.ts** - Edge API

- Extracts Cloudflare headers (city, country, lat/long)
- Returns structured geographic data
- Runs on Edge runtime for low latency

#### Components

**TrackedContactLinks.tsx** (`src/components/analytics/`)

- `TrackedPhoneLink` - Phone number CTA with tracking
- `TrackedEmailLink` - Email CTA with tracking
- `TrackedLocationLink` - Address CTA with tracking
- Automatic click tracking with context

**Dashboard** (`src/app/dashboard/page.tsx`)

- Military-themed visualization
- Real-time data display
- MH branding (green #2D5F3F, tan #8B7355)
- Comprehensive metrics overview

---

## Page Coverage (100%)

All 27 pages use `usePageTracking()` hook:

### Main Pages

- ✅ Home (`/`)
- ✅ About (`/about`)
- ✅ Services (`/services`)
- ✅ Projects (`/projects`)
- ✅ Team (`/team`)
- ✅ Contact (`/contact`)
- ✅ Careers (`/careers`)

### Service Pages

- ✅ Industrial (`/services/industrial`)
- ✅ Commercial (`/services/commercial`)
- ✅ Tenant Improvements (`/services/tenant-improvements`)
- ✅ Design Build (`/services/design-build`)
- ✅ Public Sector (`/services/public-sector`)

### Location Pages

- ✅ Tri-Cities (`/tri-cities`)
- ✅ Pasco (`/pasco`)
- ✅ Kennewick (`/kennewick`)
- ✅ Richland (`/richland`)
- ✅ West Richland (`/west-richland`)
- ✅ Spokane (`/spokane`)
- ✅ Walla Walla (`/walla-walla`)
- ✅ Yakima (`/yakima`)

### Special Pages

- ✅ Veterans (`/veterans`)
- ✅ Testimonials (`/testimonials`)
- ✅ FAQ (`/faq`)
- ✅ Allies (`/allies`)
- ✅ Privacy (`/privacy`)
- ✅ Terms (`/terms`)
- ✅ Urgent (`/urgent`)

### Admin

- ✅ Dashboard (`/dashboard`)

---

## Data Storage Structure

All data stored in localStorage with these keys:

### Primary Storage Keys

**mh_analytics_pageviews**

```json
{
  "/": { "count": 15, "lastVisit": "2025-12-27T10:30:00Z" },
  "/services": { "count": 8, "lastVisit": "2025-12-27T10:35:00Z" }
}
```

**mh_analytics_clicks**

```json
[
  {
    "element": "footer-phone-cta",
    "contactType": "phone",
    "phoneNumber": "(509) 308-6489",
    "page": "/",
    "timestamp": "2025-12-27T10:30:00Z",
    "location": { "city": "Pasco", "state": "Washington" }
  }
]
```

**mh_analytics_journey**

```json
[
  { "page": "/", "stage": "awareness", "timestamp": "2025-12-27T10:30:00Z" },
  {
    "page": "/services",
    "stage": "consideration",
    "timestamp": "2025-12-27T10:35:00Z"
  },
  {
    "page": "/contact",
    "stage": "decision",
    "timestamp": "2025-12-27T10:40:00Z"
  }
]
```

**mh_analytics_journey_stages**

```json
{
  "awareness": 2,
  "consideration": 3,
  "decision": 1,
  "engaged": 1
}
```

**mh_analytics_service_interests**

```json
{
  "Commercial Construction": {
    "views": 45,
    "clicks": 23,
    "learnMore": 12
  },
  "Industrial Projects": {
    "views": 32,
    "clicks": 18,
    "learnMore": 9
  }
}
```

**mh_analytics_project_interests**

```json
{
  "Commercial": {
    "views": 28,
    "clicks": 15,
    "details": 8
  },
  "Industrial": {
    "views": 22,
    "clicks": 12,
    "details": 6
  }
}
```

**mh_analytics_forms**

```json
[
  {
    "formId": "contact-form",
    "fields": { "name": "John Doe", "email": "john@example.com" },
    "projectType": "Commercial",
    "budget": "$500k-$1M",
    "timestamp": "2025-12-27T10:45:00Z",
    "location": { "city": "Pasco", "state": "Washington" }
  }
]
```

**mh_analytics_conversions**

```json
[
  {
    "type": "form-submission",
    "value": 100,
    "context": { "formId": "contact-form", "projectType": "Commercial" },
    "timestamp": "2025-12-27T10:45:00Z"
  }
]
```

---

## Journey Stages Explained

### Awareness Stage

**Pages:** Home, About, Testimonials
**Behavior:** Learning about MH Construction
**Lead Score:** +5 points

### Consideration Stage

**Pages:** Services, Projects, Team, FAQ, Allies
**Behavior:** Evaluating capabilities and expertise
**Lead Score:** +15 points

### Decision Stage

**Pages:** Contact, Careers, Location pages
**Behavior:** Ready to engage or apply
**Lead Score:** +25 points

### Engaged Stage

**Trigger:** Form submission, multiple CTA clicks
**Behavior:** Active engagement with business
**Lead Score:** +30 points

### Veteran Stage

**Trigger:** Visit to `/veterans` page
**Behavior:** Veteran-specific interest
**Lead Score:** +20 points (bonus)

---

## Lead Scoring Algorithm

### Score Calculation (0-100)

**Base Factors:**

- Journey progression: 5-30 points per stage
- Page views: +1 point per page (max 15)
- Service interest: +5 points per service clicked
- Project interest: +5 points per project viewed
- CTA clicks: +10 points per click
- Form submission: +30 points

**Quality Categories:**

- **Cold (0-24):** Minimal engagement, awareness only
- **Warm (25-49):** Some interest, consideration stage
- **Hot (50-74):** Strong interest, decision stage
- **Qualified (75-100):** High engagement, form submitted or multiple CTAs

---

## CTA Tracking Components

### TrackedPhoneLink

```tsx
import { TrackedPhoneLink } from "@/components/analytics/TrackedContactLinks";

<TrackedPhoneLink
  phoneNumber="(509) 308-6489"
  className="custom-class"
  displayText="Call Us"
/>;
```

**Tracks:**

- Phone number clicked
- Page context
- Device type
- Geographic location
- Timestamp

### TrackedEmailLink

```tsx
import { TrackedEmailLink } from "@/components/analytics/TrackedContactLinks";

<TrackedEmailLink
  emailAddress="office@mhc-gc.com"
  className="custom-class"
  displayText="Email Us"
/>;
```

**Tracks:**

- Email address clicked
- Page context
- Geographic location
- Timestamp

### TrackedLocationLink

```tsx
import { TrackedLocationLink } from "@/components/analytics/TrackedContactLinks";

<TrackedLocationLink
  address="123 Main St, Pasco, WA"
  mapsUrl="https://maps.google.com/..."
  className="custom-class"
  displayText="Visit Us"
/>;
```

**Tracks:**

- Address clicked
- Maps link interaction
- Page context
- Geographic location
- Timestamp

---

## Geographic Tracking

### 3-Tier Fallback System

**Tier 1: Cloudflare Headers (Production)**

- Headers: `CF-IPCity`, `CF-IPCountry`, `CF-Region-Code`
- Latitude/Longitude from headers
- Instant, no API calls
- Only works in production on Cloudflare

**Tier 2: IP Geolocation API**

- Service: ipapi.co
- Free tier: 1,000 requests/day
- Returns: city, state, country, ZIP, lat/long
- Cached for 1 hour per IP

**Tier 3: Timezone Inference**

- Uses `Intl.DateTimeFormat().resolvedOptions().timeZone`
- Maps timezone to likely state/city
- Less accurate but always available
- Example: "America/Los_Angeles" → "Washington"

---

## Testing Guide

### Test Suite (`test-analytics.html`)

**Geographic Test**

- Verifies timezone detection
- Checks language detection
- Tests geolocation API availability
- Simulates geographic data storage

**CTA Test**

- Simulates phone click
- Simulates email click
- Verifies data persistence
- Checks localStorage storage

**Journey Test**

- Simulates user journey progression
- Tests stage calculation
- Verifies lead score calculation
- Checks journey history storage

**Service Interest Test**

- Simulates service card clicks
- Tests engagement tracking
- Verifies interest aggregation
- Identifies most popular services

**Data Storage Test**

- Verifies all localStorage keys exist
- Checks data structure validity
- Tests storage health
- Provides data viewer

**Lead Scoring Test**

- Calculates mock lead score
- Tests quality classification
- Verifies score breakdown
- Checks contribution factors

### Manual Testing

**Test Page Tracking:**

1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Visit any page
4. Check `mh_analytics_pageviews` key updated

**Test CTA Tracking:**

1. Open any page
2. Click phone/email/address in footer
3. Check `mh_analytics_clicks` key in localStorage
4. Verify event data includes location

**Test Journey Tracking:**

1. Visit home page (awareness)
2. Visit services page (consideration)
3. Visit contact page (decision)
4. Check `mh_analytics_journey` key
5. Verify stages calculated correctly

---

## Dashboard Features

### Military-Themed Interface

**Terminology:**

- "Mission Briefing" - Overview section
- "Tactical Intelligence" - Key metrics
- "Engagement Metrics" - Visitor behavior
- "Operation Status" - System health
- "Field Reports" - Geographic breakdown
- "CTA Performance" - Contact link effectiveness

**Branding:**

- Primary: Hunter Green (#2D5F3F)
- Secondary: Leather Tan (#8B7355)
- Military iconography
- Combat-ready aesthetics

### Dashboard Sections

1. **Mission Briefing** - System overview and key stats
2. **Tactical Intelligence** - Active visitors, hot leads, conversion rate
3. **Geographic Deployment** - Visitor locations breakdown
4. **CTA Effectiveness** - Phone/email/address click rates
5. **Journey Progression** - Funnel stage counts
6. **Service Interest** - Most popular services
7. **Project Interest** - Most viewed projects
8. **Lead Quality** - Score distribution (cold/warm/hot/qualified)

---

## For Developers

### Adding Page Tracking

```tsx
// Any page component
import { usePageTracking } from '@/lib/analytics/hooks';

export default function MyPage() {
  usePageTracking();

  return (
    // Page content
  );
}
```

### Adding Custom Event Tracking

```tsx
import { trackEvent } from "@/lib/analytics/tracking";

// Track custom event
trackEvent("button-click", {
  buttonName: "Download Brochure",
  section: "hero",
  customData: { format: "PDF" },
});
```

### Adding Service Interest Tracking

```tsx
import { trackServiceInterest } from "@/lib/analytics/marketing-analytics";

// Track service engagement
trackServiceInterest("Commercial Construction", "click", {
  position: 1,
  section: "services-showcase",
});
```

### Adding Project Interest Tracking

```tsx
import { trackProjectInterest } from "@/lib/analytics/marketing-analytics";

// Track project engagement
trackProjectInterest("Office Renovation", "view", {
  category: "Commercial",
  location: "Pasco, WA",
  featured: true,
});
```

---

## Privacy & Compliance

### Data Collection Practices

✅ **Privacy-First:**

- No external tracking services
- No cookies required
- All data stored locally in visitor's browser
- Visitor controls their own data

✅ **GDPR Compliant:**

- No personal data sent to servers
- No cross-site tracking
- Data stays with the user
- Can be cleared anytime

✅ **Transparent:**

- Open source implementation
- Clear documentation
- User can inspect all data
- Full control over deletion

### Data Deletion

Users can clear all analytics data:

1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Find keys starting with `mh_analytics_`
4. Delete manually or clear all storage

Or programmatically:

```javascript
// Clear all analytics data
Object.keys(localStorage)
  .filter((key) => key.startsWith("mh_analytics_"))
  .forEach((key) => localStorage.removeItem(key));
```

---

## Troubleshooting

### No Data Showing in Dashboard

**Check:**

1. Visit pages to generate data
2. Click CTAs to create events
3. Verify localStorage not blocked
4. Check browser console for errors

**Solution:**

- Generate test data using `test-analytics.html`
- Ensure localStorage enabled
- Check for browser extensions blocking storage

### Geographic Data Not Capturing

**Check:**

1. Verify API endpoint `/api/analytics/geolocation` responds
2. Check network tab for API calls
3. Verify ipapi.co not blocked

**Solution:**

- Use test suite to simulate data
- Check console for geolocation errors
- Verify API key if using paid tier

### Journey Stages Not Calculating

**Check:**

1. Verify page paths in journey tracking
2. Check localStorage `mh_analytics_journey` key
3. Ensure usePageTracking called on all pages

**Solution:**

- Review journey stage mapping in `hooks.ts`
- Verify page paths match expected patterns
- Check for duplicate tracking calls

### Lead Score Always Zero

**Check:**

1. Verify events being tracked
2. Check all storage keys populated
3. Review lead scoring algorithm

**Solution:**

- Generate activity (page views, clicks, forms)
- Use test suite to create mock data
- Verify scoring calculation in `marketing-analytics.ts`

---

## Support Resources

### Documentation

- `ANALYTICS-GUIDE-FOR-MATT-AND-JEREMY.md` - Owner's guide
- `docs/technical/ANALYTICS-ENHANCEMENT-DEC-2025.md` - Technical details
- `docs/technical/ANALYTICS-DATA-COLLECTION-CHECKLIST.md` - Data inventory

### Testing

- `test-analytics.html` - Comprehensive test suite
- `/dashboard` - Live data visualization

### Code Files

- `src/lib/analytics/` - All analytics modules
- `src/components/analytics/` - Tracking components
- `src/app/api/analytics/` - API endpoints
- `src/app/dashboard/` - Dashboard implementation

---

**Questions?** Review the comprehensive guide at `ANALYTICS-GUIDE-FOR-MATT-AND-JEREMY.md`

**Status:** ✅ System fully operational, 100% page coverage, ready for production

**Last Updated:** December 27, 2025
