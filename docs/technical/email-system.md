# MH Construction Email System

**Complete Form-to-Email Integration with Dual Recipients** | Last Updated: November 12, 2025

---

## 📧 Overview

All website forms and phone tracking send email notifications using Resend transactional email service.

### CRITICAL: Dual Email Recipients (November 2025)

- **Primary (Public)**: `office@mhc-gc.com` - Displayed on website, main business email
- **CC (Private)**: `matt@mhc-gc.com` - Receives copies, NOT displayed publicly

This ensures zero missed leads and instant notification of all inquiries to both addresses.

## ✅ System Status

- **Status**: ✅ **Operational**
- **Email Service**: Resend (<https://resend.com>)
- **Domain Verification**: ✅ mhc-gc.com verified
- **API Integration**: ✅ Complete
- **Phone Tracking**: ✅ Active (Nov 2025)
- **Setup Date**: November 4, 2025
- **Last Updated**: November 12, 2025 (Dual recipients + phone tracking)

---

## 📋 Forms Connected

### 1. Contact Forms (`/contact`)

**Sends**: General inquiries, project requests, urgent construction support

**Data Included**:

- Name, email, phone
- Project type and location
- Budget and timeline
- Urgency level and preferred contact method
- Message content

### 2. Job Applications (`/careers`)

**Sends**: Career submissions with resume information

**Data Included**:

- Personal information (name, email, phone, address)
- Position applied for
- Years of experience
- Availability
- Veteran status
- Cover letter
- Resume file details

### 3. Consultation Bookings (`/booking`)

**Sends**: Partnership discussion scheduling

**Data Included**:

- Client information
- Project type and description
- Location and budget
- Scheduled date and time
- Additional notes

### 4. Consultations API (`/api/consultations`)

**Sends**: Direct API consultation requests

**Data Included**:

- Contact information
- Project details
- Budget and timeline
- Consultation preferences

### 5. Phone Call Tracking (`/api/track-phone-call`) ⭐ NEW Nov 2025

**Sends**: Instant notifications when visitors click phone numbers

**Data Included**:

- Phone number clicked: (509) 308-6489
- Source location (e.g., "header", "footer", "map")
- Timestamp (PST timezone)
- Page URL where click occurred
- Referrer information
- Device/browser details
- **Alert**: "Hot lead! Be prepared for incoming call"

**Recipients**: `matt@mhc-gc.com` AND `office@mhc-gc.com`

**Implementation**: See [Phone Tracking System Guide](./phone-tracking-system.md) for complete documentation.

---

## 🔧 Technical Implementation

### Architecture

**IMPORTANT: All emails sent to BOTH addresses - <office@mhc-gc.com> AND <matt@mhc-gc.com>**

```text
┌─────────────────┐
│  Website Forms  │
│  Phone Tracking │
└────────┬────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Email APIs                      │
│  - /api/contact/route.ts         │
│  - /api/track-phone-call/route.ts│
│  - Validates input               │
│  - Generates HTML/text emails    │
│  - Calls Resend API              │
│  - Logs submissions              │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Resend Email Service            │
│  - Sends to BOTH recipients      │
│  - Handles delivery              │
│  - Provides sending status       │
└────────┬─────────────────────────┘
         │
         ├─────────────────┬────────────────┐
         ▼                 ▼                │
┌──────────────────┐ ┌────────────────────┐│
│ office@mhc-gc.com│ │ matt@mhc-gc.com    ││
│ (Public/Display) │ │ (Private CC)       ││
└──────────────────┘ └────────────────────┘│
                                            │
```

### API Endpoint

**Path**: `/api/contact/route.ts`

**Method**: `POST`

**Recipients**: `["office@mhc-gc.com", "matt@mhc-gc.com"]` (Both addresses receive all form submissions)

**Request Body**:

```typescript
interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: "contact" | "job-application" | "consultation" | "urgent" | "general";
  recipientEmail?: string; // Defaults to office@mhc-gc.com
  metadata?: Record<string, any>;
}
```

**Response**:

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "uuid",
    "recipientEmail": "office@mhc-gc.com",
    "emailSent": true
  }
}
```

### Environment Variables

**Required**:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@mhc-gc.com
```

**Location**:

- **Local Development**: `.env.local` (not committed to git)
- **Production**: Cloudflare Pages Environment Variables

---

## 🎨 Email Template Features

### Professional Branding

- **Header**: Hunter Green gradient with MH Construction branding
- **Veteran Badge**: "Veteran-Owned Excellence" prominently displayed
- **Content Section**: Clean white background with organized data tables
- **Footer**: Company information with contact links

### Email Content

**HTML Version**:

- Responsive design for all devices
- Branded color scheme (Hunter Green #386851, Leather Tan #BD9264)
- Clickable phone and email links
- Professional table layout for form data

**Plain Text Version**:

- Clean text formatting
- All information preserved
- Compatible with any email client

### Metadata Included

- Submission timestamp (PST timezone)
- Unique submission ID
- Form type indicator
- All form field data
- Optional metadata (budget, location, project type, etc.)

---

## 🚀 Usage Examples

### Basic Contact Form

```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "(509) 555-1234",
    subject: "Project Inquiry",
    message: "I need a kitchen remodel estimate.",
    type: "contact",
  }),
});
```

### Job Application

```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "(509) 555-5678",
    subject: "Job Application: Project Manager",
    message: "Applying for Project Manager position...",
    type: "job-application",
    metadata: {
      position: "Project Manager",
      experience: "6-10 years",
      availability: "Immediately",
    },
  }),
});
```

### Consultation Booking

```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "(509) 555-9012",
    subject: "Consultation Booking: Custom Home",
    message: "Looking to build a custom home...",
    type: "consultation",
    metadata: {
      projectType: "Custom Home",
      location: "Pasco, WA",
      budget: "$500,000",
      scheduledDate: "2025-11-15",
      scheduledTime: "10:00 AM",
    },
  }),
});
```

---

## 🔒 Security & Privacy

### Data Protection

- **HTTPS Only**: All form submissions encrypted in transit
- **Input Validation**: Email addresses and phone numbers validated
- **Rate Limiting**: Protected against spam and abuse
- **API Key Security**: Resend API key stored in environment variables

### Email Validation

```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(data.email)) {
  return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
}
```

---

## 📊 Monitoring & Analytics

### Email Delivery Tracking

- **Success Logging**: All successful sends logged with email ID
- **Error Handling**: Failed sends logged with error details
- **Status Tracking**: Each submission tracked with status (sent/pending/failed)

### Console Logging

```typescript
// Success
console.log("Email sent successfully:", {
  id: emailResult?.id,
  to: emailData.to,
  subject: emailData.subject,
});

// Warning (no API key)
console.warn("⚠️  RESEND_API_KEY not configured. Email not sent.");

// Error
console.error("Error sending email with Resend:", error);
```

---

## 🛠️ Maintenance & Troubleshooting

### Common Issues

#### 1. No Emails Being Sent

**Check**:

- RESEND_API_KEY is configured in environment variables
- Domain verification is complete in Resend dashboard
- EMAIL_FROM address matches verified domain

#### 2. Emails Going to Spam

**Solutions**:

- Ensure SPF, DKIM, DMARC records are configured
- Check domain reputation in Resend dashboard
- Verify sender email is from verified domain

#### 3. Missing Form Data in Emails

**Check**:

- All required fields are being passed to API
- Metadata object is properly formatted
- Form validation is working correctly

### Testing Emails Locally

```bash
# 1. Ensure API key is in .env.local
echo "RESEND_API_KEY=re_your_key_here" >> .env.local

# 2. Start dev server
npm run dev

# 3. Submit a test form at http://localhost:3000/contact

# 4. Check terminal for email logs
# 5. Check office@mhc-gc.com inbox
```

---

## 📈 Resend Service Limits

### Free Tier

- **100 emails per day**
- **3,000 emails per month**
- Perfect for startup and testing

### Paid Tiers

- **$20/month**: 50,000 emails/month
- **$80/month**: 100,000 emails/month
- **Enterprise**: Custom pricing

### Current Usage

For typical MH Construction website traffic:

- **Expected**: 10-30 form submissions per day
- **Capacity**: Well within free tier limits
- **Recommendation**: Monitor monthly usage in Resend dashboard

---

## 🔄 Future Enhancements

### Planned Features

- [ ] Email response templates for common inquiries
- [ ] Automated follow-up emails to form submitters
- [ ] Integration with CRM system
- [ ] Email analytics and open rate tracking
- [ ] Custom email templates for different form types
- [ ] Attachment support for file uploads

### Optional Integrations

- **Mailchimp**: Marketing email list integration
- **HubSpot**: CRM and lead management
- **Zapier**: Workflow automation
- **Slack**: Real-time team notifications

---

## 📞 Support

### Technical Issues

Contact the development team:

- **Email**: <office@mhc-gc.com>
- **Phone**: (509) 308-6489

### Resend Support

- **Dashboard**: <https://resend.com/dashboard>
- **Documentation**: <https://resend.com/docs>
- **Support**: <https://resend.com/support>

---

## 📚 Related Documentation

- [API Documentation](./api-documentation.md)
- [Cloudflare Deployment](../deployment/cloudflare-guide.md)
- [Contributing Guidelines](../../contributing.md)
- [Component Standards](../branding/standards/component-standards.md)
- [Contact Form Components](../../src/components/contact/) - Contact form implementation

---

**Last Updated**: November 4, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

MH Construction Development Team
