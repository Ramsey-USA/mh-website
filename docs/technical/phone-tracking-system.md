# Phone Call Tracking System

**Last Updated**: November 12, 2025  
**Status**: Active

---

## Overview

The phone call tracking system monitors when visitors click phone numbers on the website and automatically sends email notifications to `matt@mhc-gc.com` and `office@mhc-gc.com`.

## How It Works

1. **Visitor clicks a tracked phone number** → Phone tracking fires
2. **API endpoint logs the interaction** → Captures source, timestamp, page, device info
3. **Email notification sent** → Both `matt@mhc-gc.com` and `office@mhc-gc.com` receive alerts
4. **Phone call proceeds** → Tracking doesn't interrupt the user experience

---

## Implementation

### Option 1: Use the React Hook (Recommended)

```tsx
import { usePhoneTracking } from "@/hooks/usePhoneTracking";

function MyComponent() {
  const { trackAndCall } = usePhoneTracking();

  return (
    <a
      href="tel:+15093086489"
      onClick={(e) => {
        e.preventDefault();
        trackAndCall("component-name");
      }}
    >
      (509) 308-6489
    </a>
  );
}
```

### Option 2: Use the Utility Function

```tsx
import { handlePhoneClick } from "@/lib/utils/phoneTracking";

<a href="tel:+15093086489" onClick={(e) => handlePhoneClick(e, "header")}>
  (509) 308-6489
</a>;
```

### Option 3: Direct API Call (for non-React contexts)

```typescript
fetch("/api/track-phone-call", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source: "location-identifier",
    phoneNumber: "(509) 308-6489",
    timestamp: new Date().toISOString(),
  }),
});
```

---

## API Endpoint

**Endpoint**: `POST /api/track-phone-call`

**Request Body**:

```json
{
  "source": "header",
  "phoneNumber": "(509) 308-6489",
  "timestamp": "2025-11-12T10:30:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://example.com",
  "page": "https://mhc-gc.com/services"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Phone call tracked successfully",
  "data": {
    "source": "header",
    "emailSent": true
  }
}
```

---

## Email Notifications

### Recipients

- **Primary**: `matt@mhc-gc.com`
- **CC**: `office@mhc-gc.com`

### Email Content

- Phone number clicked
- Source location (e.g., "header", "footer", "urgent-page")
- Timestamp (PST timezone)
- Page URL where click occurred
- Referrer (if available)
- Device/browser information
- **Alert message**: "This is a hot lead! Be prepared for an incoming call."

---

## Source Identifiers

Use descriptive source identifiers to track where calls originate:

| Source ID         | Location                   |
| ----------------- | -------------------------- |
| `header`          | Main navigation header     |
| `footer`          | Page footer                |
| `hero`            | Hero section CTA           |
| `urgent-page`     | Urgent services page       |
| `contact-page`    | Contact page               |
| `interactive-map` | Interactive map component  |
| `booking-form`    | Booking/consultation forms |
| `careers-page`    | Careers/HR contact         |
| `team-page`       | Team member contact cards  |

---

## Currently Tracked Locations

✅ **Interactive Map Component** - `InteractiveMap.tsx`  
⏳ **Pending**: Header, Footer, Urgent page, Contact page (to be added)

---

## Benefits

1. **Real-time Alerts**: Know immediately when someone tries to call
2. **Source Tracking**: Understand which pages drive phone inquiries
3. **Lead Qualification**: Phone clicks indicate high-intent prospects
4. **Response Preparation**: Be ready when the phone rings
5. **Analytics Data**: Build insights on phone engagement patterns

---

## Configuration

### Environment Variables

Phone tracking uses the same email configuration as form submissions:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@mhc-gc.com
```

### Disable Tracking (Development)

If `RESEND_API_KEY` is not set, tracking logs to console but doesn't send emails.

---

## Privacy & UX

- **No blocking**: Tracking happens asynchronously
- **Silent**: Users don't see any tracking indicators
- **Fast**: Doesn't delay the phone call
- **Fail-safe**: If tracking fails, the call still goes through

---

## Future Enhancements

- [ ] Add phone tracking to header navigation
- [ ] Add phone tracking to footer
- [ ] Add phone tracking to all CTA sections
- [ ] Dashboard showing phone click analytics
- [ ] A/B testing for phone number placement
- [ ] Integration with CRM for call logging

---

## Related Files

- **Hook**: `/src/hooks/usePhoneTracking.ts`
- **Utility**: `/src/lib/utils/phoneTracking.ts`
- **API**: `/src/app/api/track-phone-call/route.ts`
- **Example**: `/src/components/map/InteractiveMap.tsx`

---

## Questions?

Contact the development team or check the inline code documentation.
