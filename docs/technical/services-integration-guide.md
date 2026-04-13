# External Services Integration Guide

**Category:** Technical - Infrastructure
**Last Updated:** April 2026
**Version:** 1.0.0
**Status:** ✅ Active

This guide documents the integration of all external services used by the MH Construction
website: **Cloudflare** (hosting/CDN), **Hostinger** (domain), **Twilio** (SMS), and
**Resend** (email).

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Cloudflare (Hosting & CDN)](#cloudflare-hosting--cdn)
- [Hostinger (Domain Registration)](#hostinger-domain-registration)
- [Resend (Email Service)](#resend-email-service)
- [Twilio (SMS Notifications)](#twilio-sms-notifications)
- [Service Health Monitoring](#service-health-monitoring)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  HOSTINGER (Domain Registrar)                                               │
│  ├── Domain: mhc-gc.com                                                     │
│  ├── DNS: Delegated to Cloudflare nameservers                               │
│  └── MX Records: Configured for email hosting                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLOUDFLARE (CDN + Edge Network)                                            │
│  ├── Zone: mhc-gc.com                                                       │
│  ├── SSL/TLS: Full (Strict)                                                 │
│  ├── Caching: Edge + Tiered Cache                                           │
│  ├── Security: WAF, Bot Protection, Turnstile                               │
│  └── DNS: Managed (proxied records)                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLOUDFLARE WORKERS (Application Runtime)                                   │
│  ├── Worker: mhc-v2-website                                                 │
│  ├── Runtime: @opennextjs/cloudflare (Next.js 15)                           │
│  ├── Bindings:                                                              │
│  │   ├── AI: Workers AI (chatbot)                                           │
│  │   ├── KV: CACHE (rate limiting), ANALYTICS                               │
│  │   ├── D1: Database (forms, users, sessions)                              │
│  │   └── R2: FILE_ASSETS, SAFETY_INTAKE, RESUMES                            │
│  └── Secrets: JWT_SECRET, passwords, API keys                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
┌─────────────────────────────┐             ┌─────────────────────────────┐
│  RESEND (Email Service)     │             │  TWILIO (SMS Service)       │
│  ├── API: api.resend.com    │             │  ├── API: api.twilio.com    │
│  ├── Domain: mhc-gc.com     │             │  ├── Number: +1-509-xxx     │
│  ├── SPF/DKIM: Required     │             │  └── Use: Admin alerts      │
│  └── Use: Form submissions  │             └─────────────────────────────┘
└─────────────────────────────┘
```

---

## Cloudflare (Hosting & CDN)

Cloudflare Workers provides the application runtime, CDN, and edge services.

### Dashboard Location

- **Zone:** `mhc-gc.com`
- **Worker:** Workers & Pages → `mhc-v2-website`
- **URLs:**
  - Production: `https://www.mhc-gc.com`
  - Preview: `*.mhc-v2-website.twelthmann.workers.dev`

### Bindings Configured

| Binding         | Type   | Purpose                      |
| --------------- | ------ | ---------------------------- |
| `AI`            | AI     | Workers AI for chatbot       |
| `CACHE`         | KV     | Rate limiting, session cache |
| `ANALYTICS`     | KV     | Server-side analytics        |
| `DB`            | D1     | Primary database             |
| `FILE_ASSETS`   | R2     | Static file storage          |
| `SAFETY_INTAKE` | R2     | Safety form uploads          |
| `RESUMES`       | R2     | Job application resumes      |
| `ASSETS`        | Assets | Static Next.js assets        |

### Required Dashboard Settings

**Speed → Optimization → Content Optimization:**

- Early Hints: **ON**
- Auto Minify (HTML/JS/CSS): **OFF** (Next.js already minifies)
- Rocket Loader: **OFF** (breaks React hydration)

**Speed → Optimization → Protocol Optimization:**

- HTTP/2: **ON**
- HTTP/3 with QUIC: **ON**
- 0-RTT Connection Resumption: **ON**

**Caching → Tiered Cache:**

- Smart Tiered Cache: **ON** (free)

**SSL/TLS:**

- Mode: Full (strict)
- Always Use HTTPS: **ON**
- Minimum TLS Version: 1.2
- HSTS: Managed via `_headers`

For detailed Cloudflare configuration, see [cloudflare-guide.md](../deployment/cloudflare-guide.md).

---

## Hostinger (Domain Registration)

Hostinger serves as the domain registrar for `mhc-gc.com`. DNS is delegated to Cloudflare
for performance, security, and integration with Workers.

### Configuration Steps

1. **Domain Registered:** `mhc-gc.com` registered with Hostinger
2. **Nameserver Delegation:** Point to Cloudflare nameservers:
   - `ann.ns.cloudflare.com`
   - `isaac.ns.cloudflare.com`
3. **DNSSEC:** Enable after nameserver delegation (managed by Cloudflare)

### Hostinger Dashboard

- **Domain Management:** `hpanel.hostinger.com` → Domains → mhc-gc.com
- **Nameservers:** Custom → Cloudflare nameservers
- **Auto-Renew:** Enable to prevent accidental expiration
- **WHOIS Privacy:** Enable to protect registrant information

### Email Configuration

If using Hostinger email hosting alongside Cloudflare:

1. In Cloudflare DNS, add MX records pointing to Hostinger mail servers
2. Add SPF record: `v=spf1 include:_spf.hostinger.com ~all`
3. Configure DKIM via Hostinger email dashboard

> **Note:** Email sending (transactional) uses Resend, not Hostinger SMTP.
> Hostinger email is for receiving mail at `@mhc-gc.com` addresses.

---

## Resend (Email Service)

Resend provides transactional email delivery for form submissions and notifications.

### Configuration

**Dashboard:** `resend.com/dashboard`

| Setting           | Value                   |
| ----------------- | ----------------------- |
| **Sender Domain** | `mhc-gc.com` (verified) |
| **From Address**  | `noreply@mhc-gc.com`    |
| **API Key**       | `re_xxxx...` (secret)   |

### DNS Records Required

Add these records in Cloudflare DNS (via Resend verification flow):

| Type | Name                | Value                          |
| ---- | ------------------- | ------------------------------ |
| TXT  | `resend._domainkey` | `k=rsa; p=...` (from Resend)   |
| TXT  | `_dmarc`            | `v=DMARC1; p=reject; ...`      |
| TXT  | Root (`@`)          | SPF record with Resend include |

### Code Integration

The email service is implemented in `src/lib/email/email-service.ts`:

```typescript
import { emailService } from "@/lib/email/email-service";

// Send to office team
await emailService.sendToOffice("New Contact", {
  html: "<p>Message content</p>",
  text: "Message content",
});

// Send acknowledgment to user
await emailService.sendAcknowledgment(
  "user@example.com",
  "Thank you for contacting us",
  { html: "...", text: "..." },
);
```

### Rate Limits

- **Free Tier:** 100 emails/day, 1 domain
- **Pro Tier:** 50,000 emails/month, unlimited domains
- **Contact Forms:** ~10-50 emails/day expected

---

## Twilio (SMS Notifications)

Twilio provides SMS notifications for admin alerts and urgent form submissions.

### Configuration

**Dashboard:** `console.twilio.com`

| Setting          | Value                |
| ---------------- | -------------------- |
| **Account SID**  | `ACxxxx...` (secret) |
| **Auth Token**   | `xxxx...` (secret)   |
| **Phone Number** | `+15093086489`       |

### Code Integration

The SMS service is implemented in `src/lib/notifications/notification-service.ts`:

```typescript
import { sendNotification } from "@/lib/notifications/notification-service";

// Send SMS notification
await sendNotification({
  recipient: "+15095551234",
  message: "Urgent: New safety form submission",
  type: "sms",
});

// With retry logic
await sendNotificationWithRetry(
  {
    recipient: "+15095551234",
    message: "Important alert",
    type: "sms",
  },
  3,
); // 3 retries with exponential backoff
```

### Rate Limits & Pricing

- **Outbound SMS:** $0.0079/message (US)
- **Recommended:** Use SMS sparingly for urgent alerts only
- **Fallback:** If Twilio credentials are missing, SMS silently skips

### Best Practices

1. **Admin-only:** Only use SMS for admin notifications, not user confirmations
2. **Batch carefully:** Use `sendBulkNotifications` for multiple alerts
3. **Graceful degradation:** Code handles missing credentials without errors

---

## Service Health Monitoring

### Environment Variable Validation

At startup, the following are validated (lazy initialization):

| Service    | Required Vars                                                   | Fallback Behavior     |
| ---------- | --------------------------------------------------------------- | --------------------- |
| Resend     | `RESEND_API_KEY`, `EMAIL_FROM`                                  | Logs warning, skips   |
| Twilio     | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` | Logs warning, skips   |
| Cloudflare | Auto-bound via wrangler.toml                                    | Hard error if missing |

### Health Check Endpoint

Check service availability via `/api/security/status`:

```json
{
  "status": "healthy",
  "timestamp": "2026-04-13T12:00:00Z",
  "services": {
    "database": "connected",
    "email": "configured",
    "sms": "configured",
    "storage": "connected"
  }
}
```

---

## Environment Variables

### Required (Cloudflare Dashboard Secrets)

```bash
# Authentication
JWT_SECRET=<min-32-chars>
ADMIN_MATT_PASSWORD=<strong-password>
ADMIN_JEREMY_PASSWORD=<strong-password>
FIELD_STAFF_PASSWORD=<memorable-phrase>

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=noreply@mhc-gc.com

# Bot Protection
TURNSTILE_SECRET_KEY=0x...
```

### Optional (Cloudflare Dashboard Secrets)

```bash
# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxx
TWILIO_FROM_NUMBER=+15093086489
```

### Build-Time (wrangler.toml or Dashboard)

```bash
NEXT_PUBLIC_SITE_URL=https://www.mhc-gc.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional
```

---

## Troubleshooting

### Emails Not Sending

1. Verify `RESEND_API_KEY` is set in Cloudflare dashboard
2. Check domain verification in Resend dashboard
3. Verify SPF/DKIM DNS records are propagated

### SMS Not Sending

1. Verify all three Twilio secrets are set
2. Check Twilio dashboard for account status
3. Verify phone number is valid and active

### Cloudflare Bindings Not Working

1. Run `wrangler deploy` after updating `wrangler.toml`
2. Check binding names match code expectations
3. Verify D1/KV/R2 resources exist in dashboard

### DNS Resolution Issues

1. Verify Hostinger nameservers point to Cloudflare
2. Check DNSSEC status in both Hostinger and Cloudflare
3. Wait for DNS propagation (up to 48 hours)

---

## See Also

- [Cloudflare Deployment Guide](../deployment/cloudflare-guide.md)
- [Secrets Management](./secrets-management.md)
- [Security Overview](./security-overview.md)
