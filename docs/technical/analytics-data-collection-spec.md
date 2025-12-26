# Analytics Data Collection Specification

**Last Updated:** December 26, 2025  
**Status:** Production Ready

## Overview

The MH Construction analytics system collects comprehensive, privacy-respectful data to understand user behavior, optimize performance, and improve user experience. All data is collected with user awareness and stored locally in the browser.

---

## Data Categories

### 1. Page View Analytics

**What We Track:**

- Page URL and path
- Page title/name
- Timestamp of visit
- Time spent on page (duration)
- Scroll depth percentage (25%, 50%, 75%, 100%)
- Entry/exit pages
- Previous page (referrer)

**Why:**

- Understand which pages are most valuable
- Identify content that engages users
- Optimize page structure and content placement
- Measure content effectiveness

**Storage:** `localStorage.mh_analytics_pageviews` (last 5,000 views)

---

### 2. Device & Browser Information

**What We Track:**

- Device type (desktop, tablet, mobile)
- Operating system (Windows, macOS, Linux, iOS, Android)
- Browser name and type (Chrome, Firefox, Safari, Edge)
- Screen resolution (e.g., 1920x1080)
- Viewport size (e.g., 1440x900)

**Why:**

- Ensure responsive design works across devices
- Identify browser-specific issues
- Optimize for most common configurations
- Plan progressive enhancement strategies

**How Collected:**

- User agent string parsing
- Window/screen API measurements
- Browser feature detection

**Functions:** `getDeviceInfo()` in `src/lib/analytics/metadata.ts`

---

### 3. Geographic & Regional Data

**What We Track:**

- Timezone (e.g., "America/Los_Angeles")
- Language preference (e.g., "en-US")
- Country (inferred from timezone when possible)
- Region (e.g., "America")

**Why:**

- Understand geographic distribution of users
- Optimize content for time zones
- Plan regional marketing efforts
- Ensure proper date/time formatting

**Privacy Note:**

- Uses browser-provided timezone and language settings
- No IP address tracking or geolocation API
- Country/region are broad inferences only

**Functions:** `getLocationInfo()` in `src/lib/analytics/metadata.ts`

---

### 4. Network Connection Information

**What We Track:**

- Connection type (4g, 3g, WiFi, etc.)
- Downlink speed (Mbps)
- Round-trip time (latency in ms)
- Data saver mode status

**Why:**

- Optimize for slow connections
- Adjust media quality dynamically
- Identify performance bottlenecks
- Respect data saver preferences

**Availability:**

- Only when browser supports Network Information API
- Gracefully degrades if not available

**Functions:** `getConnectionInfo()` in `src/lib/analytics/metadata.ts`

---

### 5. Traffic Source Analysis

**What We Track:**

- Source (google, facebook, direct, etc.)
- Medium (organic, social, referral, paid, etc.)
- Campaign name (from UTM parameters)
- Referrer URL
- UTM parameters (utm_source, utm_medium, utm_campaign)

**Why:**

- Measure marketing effectiveness
- Understand which channels drive traffic
- Optimize marketing spend
- Track campaign performance

**Detection Logic:**

- Referrer domain analysis (google.com → "google/organic")
- UTM parameter extraction
- Social media referrer detection
- Direct traffic identification (no referrer)

**Functions:** `getTrafficSource()` in `src/lib/analytics/metadata.ts`

---

### 6. Session Management

**What We Track:**

- Session ID (unique identifier)
- Session start time
- Session duration
- New vs returning visitor
- Total session count
- Pages viewed in session
- Time since last visit

**Why:**

- Understand user engagement patterns
- Calculate bounce rate accurately
- Identify returning customers
- Measure loyalty and retention

**Session Definition:**

- New session after 30 minutes of inactivity
- Session count stored across visits
- Returning visitor = anyone with sessionCount > 1

**Storage:** `localStorage.mh_analytics_sessions`

**Functions:** `getSessionInfo()` in `src/lib/analytics/metadata.ts`

---

### 7. User Interactions

**What We Track:**

**Clicks:**

- Element ID
- Element type (button, link, CTA)
- Page location
- Section/context
- Timestamp

**Forms:**

- Form ID
- Field interactions (focus, blur, change)
- Submission success/failure
- Form abandonment
- Time to complete

**Navigation:**

- Internal link clicks
- External link clicks
- Menu interactions
- Section navigation

**Why:**

- Understand user behavior patterns
- Identify popular CTAs
- Optimize form design
- Reduce friction points

**Storage:**

- `localStorage.mh_analytics_clicks` (last 1,000 clicks)
- `localStorage.mh_analytics_conversions`

---

### 8. Performance Metrics

**What We Track:**

- Page load time
- Time to interactive
- First contentful paint
- Largest contentful paint
- Cumulative layout shift
- First input delay

**Why:**

- Monitor site performance
- Identify slow pages
- Optimize load times
- Maintain high Lighthouse scores

**Source:** Browser Performance API

---

### 9. Conversion Events

**What We Track:**

- Form submissions (contact, consultation, careers)
- CTA clicks (primary conversion buttons)
- Email/phone click-to-actions
- Download interactions
- Video engagement

**Why:**

- Measure business goals
- Calculate conversion rates
- Optimize conversion funnels
- Track ROI

**Storage:** `localStorage.mh_analytics_conversions`

---

## Data Collection Functions

### Core Metadata Functions

Located in `src/lib/analytics/metadata.ts`:

```typescript
// Get device information
getDeviceInfo(): DeviceInfo

// Get geographic/language info
getLocationInfo(): LocationInfo

// Get network connection data
getConnectionInfo(): Record<string, unknown>

// Get session context
getSessionInfo(): Record<string, unknown>

// Get traffic source details
getTrafficSource(): Record<string, unknown>

// Get complete event metadata
getEventMetadata(): EventMetadata

// Get all enhanced tracking properties
getEnhancedTrackingProperties(): Record<string, unknown>
```

### Usage in Tracking

Every tracking function automatically includes enhanced metadata:

```typescript
// Example: trackClick automatically includes device, location, session, etc.
trackClick('button-id', { custom: 'property' });

// Result includes:
{
  element: 'button-id',
  custom: 'property',
  timestamp: '2025-12-26T...',
  url: 'https://...',
  path: '/page',
  isNewSession: false,
  sessionCount: 5,
  source: 'google',
  medium: 'organic',
  connection: { effectiveType: '4g', downlink: 10 },
  // ... and more
}
```

---

## Privacy & Compliance

### What We DON'T Track

❌ Personal identifiable information (PII)  
❌ Email addresses or names (unless submitted in forms)  
❌ IP addresses  
❌ Precise geolocation (GPS)  
❌ Browsing history outside our site  
❌ Cross-site tracking  
❌ Third-party cookies

### Data Storage

- **Location:** Browser localStorage only
- **Persistence:** Cleared on browser cache clear
- **Limits:** Fixed record limits (1,000 clicks, 5,000 page views)
- **Access:** Admin users only via dashboard

### Compliance

- **GDPR:** No personal data collection without consent
- **CCPA:** Users can clear localStorage to delete data
- **Transparency:** All tracking visible in browser DevTools

---

## Data Retention

| Data Type   | Retention         | Storage Key                |
| ----------- | ----------------- | -------------------------- |
| Page Views  | Last 5,000        | `mh_analytics_pageviews`   |
| Clicks      | Last 1,000        | `mh_analytics_clicks`      |
| Conversions | All               | `mh_analytics_conversions` |
| Sessions    | Current + history | `mh_analytics_sessions`    |
| Metadata    | Per-event         | Embedded in event data     |

---

## Accessing Collected Data

### For Users (Data Subject Rights)

**View your data:**

```javascript
// In browser console:
localStorage.getItem("mh_analytics_pageviews");
localStorage.getItem("mh_analytics_clicks");
localStorage.getItem("mh_analytics_conversions");
localStorage.getItem("mh_analytics_sessions");
```

**Delete your data:**

```javascript
// Clear all analytics data:
localStorage.removeItem("mh_analytics_pageviews");
localStorage.removeItem("mh_analytics_clicks");
localStorage.removeItem("mh_analytics_conversions");
localStorage.removeItem("mh_analytics_sessions");
```

### For Admins (Dashboard Access)

1. Triple-click copyright in footer
2. Sign in with admin credentials
3. View aggregated analytics at `/dashboard`

---

## Technical Implementation

### Automatic Collection

All tracking functions automatically call `getEnhancedTrackingProperties()`:

```typescript
// In src/lib/analytics/tracking.ts
export function trackClick(
  elementId: string,
  properties?: Record<string, unknown>,
) {
  const enhancedProps = getEnhancedTrackingProperties();

  analyticsEngine.track("user_interaction", {
    element: elementId,
    action: "click",
    ...enhancedProps, // ← Automatic metadata
    ...properties, // ← User properties override
  });
}
```

### Data Flow

```
User Action
    ↓
Tracking Function (trackClick, trackFormSubmit, etc.)
    ↓
getEnhancedTrackingProperties()
    ├── getDeviceInfo()
    ├── getLocationInfo()
    ├── getConnectionInfo()
    ├── getSessionInfo()
    └── getTrafficSource()
    ↓
Analytics Engine
    ↓
localStorage + Dashboard
```

---

## Best Practices for Developers

### Adding New Data Points

1. **Document it:** Add to this specification
2. **Privacy check:** Ensure no PII
3. **Test it:** Verify data appears in dashboard
4. **Optimize storage:** Use appropriate retention limits

### Respecting User Privacy

- Don't track sensitive form field values
- Don't log error messages with user input
- Don't correlate data across sessions without consent
- Always provide a way to opt-out or delete data

### Performance Considerations

- Metadata collection functions are lightweight
- Data stored with size limits to prevent bloat
- LocalStorage operations are batched where possible
- No external API calls (all client-side)

---

## Support & Questions

For questions about data collection:

- **Technical:** See `src/lib/analytics/metadata.ts`
- **Privacy:** Contact development team
- **Implementation:** Check [analytics-tracking-guide.md](./analytics-tracking-guide.md)

---

**Last Updated:** December 26, 2025  
**Maintained By:** MH Construction Development Team
