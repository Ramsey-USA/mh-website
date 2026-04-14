# External Services Integration Guide

**Category:** Technical - Infrastructure
**Last Updated:** April 2026
**Version:** 1.0.0
**Status:** ✅ Active

This guide documents the integration of all external services used by the MH Construction
website: **GitHub** (code repository), **Cloudflare Pages** (hosting/CDN/WAF), **NameCheap** (domain),
**Microsoft 365** (email hosting), **Hostinger VPS** (automation & monitoring), **Resend** (email engine),
**Twilio** (communications), **PostHog** (analytics), and **Semrush Pro** (SEO).

**Tech Stack:** Next.js 15 + Tailwind CSS + TypeScript — high-performance, mobile-responsive, tactical professional tone.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [GitHub (Code Repository)](#github-code-repository)
- [Cloudflare Pages (Hosting & CDN)](#cloudflare-pages-hosting--cdn)
- [NameCheap (Domain Registration)](#namecheap-domain-registration)
- [Microsoft 365 (Email Hosting)](#microsoft-365-email-hosting)
- [Hostinger VPS (Automation & Monitoring)](#hostinger-vps-automation--monitoring)
- [Resend (Email Engine)](#resend-email-engine)
- [Twilio (Communications)](#twilio-communications)
- [Semrush Pro (SEO Intelligence)](#semrush-pro-seo-intelligence)
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
│  GITHUB (Code Repository)                                                   │
│  ├── Repo: Ramsey-USA/mh-website                                            │
│  ├── Branch: main (production)                                              │
│  ├── CI/CD: Auto-deploy to Cloudflare on push                               │
│  └── Backups: n8n workflow exports stored here                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAMECHEAP (Domain Registrar)                                               │
│  ├── Domain: mhc-gc.com                                                     │
│  └── DNS: Delegated to Cloudflare nameservers                               │
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
│  CLOUDFLARE PAGES (Application Runtime + WAF)                               │
│  ├── Worker: mhc-v2-website                                                 │
│  ├── Runtime: @opennextjs/cloudflare (Next.js 15)                           │
│  ├── Framework: Tailwind CSS + TypeScript                                   │
│  ├── Security: Enterprise WAF, Bot Protection, Turnstile (CAPTCHA)          │
│  ├── Bindings:                                                              │
│  │   ├── AI: Workers AI (chatbot)                                           │
│  │   ├── KV: CACHE (rate limiting), ANALYTICS, NEXT_CACHE_WORKERS_KV (ISR)  │
│  │   ├── D1: Database (forms, users, sessions)                              │
│  │   └── R2: FILE_ASSETS, SAFETY_INTAKE, RESUMES                            │
│  └── Secrets: JWT_SECRET, passwords, API keys                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
┌─────────────────────────────┐             ┌─────────────────────────────┐
│  RESEND (Email Engine)      │             │  TWILIO (Communications)    │
│  ├── API: api.resend.com    │             │  ├── API: api.twilio.com    │
│  ├── Domain: mhc-gc.com     │             │  ├── Local 509 numbers      │
│  ├── Transactional emails   │             │  ├── SMS notifications      │
│  └── Marketing newsletters  │             │  └── WhatsApp Business API  │
└─────────────────────────────┘             └─────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  MICROSOFT 365 (Email Hosting)                                              │
│  ├── Provider: Outlook/Exchange Online                                      │
│  ├── Domain: @mhc-gc.com mailboxes                                          │
│  └── MX/SPF/DKIM: Configured in Cloudflare DNS                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  HOSTINGER VPS (KVM 2) - Internal Operations ("The Sentry")                 │
│  ├── OS: Ubuntu 24.04 LTS + Docker                                          │
│  ├── Management: Portainer (visual Docker dashboard)                        │
│  ├── Automation: n8n (workflow automation)                                  │
│  ├── Analytics: PostHog (self-hosted heatmaps & session recordings)         │
│  └── Monitoring: Uptime Kuma (downtime alerts to phone)                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SEMRUSH PRO (SEO Intelligence - Strategic)                                 │
│  └── Periodic reconnaissance: keyword audits & competitor analysis          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## GitHub (Code Repository)

GitHub serves as the central code repository and backup location for automation workflows.

### Repository

- **URL:** `github.com/Ramsey-USA/mh-website`
- **Branch:** `main` (production)
- **Visibility:** Private

### CI/CD Pipeline

1. **Push to main** → GitHub triggers Cloudflare Pages deployment
2. **Pre-commit hooks:** Type checking, linting, tests run locally
3. **Auto-deploy:** Cloudflare builds and deploys on every push

### Backup Strategy

| Item            | Location                | Frequency        |
| --------------- | ----------------------- | ---------------- |
| Website code    | GitHub repo             | Every commit     |
| n8n workflows   | `/backups/n8n/` in repo | Weekly export    |
| Database schema | `/migrations/` in repo  | With each change |

### Access

- **Dashboard:** `github.com/Ramsey-USA/mh-website`
- **Clone:** `git clone git@github.com:Ramsey-USA/mh-website.git`
- **Codespaces:** Development environment in browser

---

## Cloudflare Pages (Hosting & CDN)

Cloudflare Workers provides the application runtime, CDN, and edge services.

### Dashboard Location

- **Zone:** `mhc-gc.com`
- **Worker:** Workers & Pages → `mhc-v2-website`
- **URLs:**
  - Production: `https://www.mhc-gc.com`
  - Preview: `*.mhc-v2-website.twelthmann.workers.dev`

### Bindings Configured

| Binding                 | Type   | Purpose                         |
| ----------------------- | ------ | ------------------------------- |
| `AI`                    | AI     | Workers AI for chatbot          |
| `CACHE`                 | KV     | Rate limiting, session cache    |
| `ANALYTICS`             | KV     | Server-side analytics           |
| `NEXT_CACHE_WORKERS_KV` | KV     | ISR caching (page revalidation) |
| `DB`                    | D1     | Primary database                |
| `FILE_ASSETS`           | R2     | Static file storage             |
| `SAFETY_INTAKE`         | R2     | Safety form uploads             |
| `RESUMES`               | R2     | Job application resumes         |
| `ASSETS`                | Assets | Static Next.js assets           |

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

### Cloudflare Pro Features (Activated April 14, 2026)

The Pro plan ($20/month) unlocks significant performance and security features:

**Speed → Optimization → Image Optimization:**

| Setting    | Value     | Impact                                        |
| ---------- | --------- | --------------------------------------------- |
| **Polish** | **Lossy** | Auto-compress images at edge; ~30-50% smaller |
| **Mirage** | **ON**    | Lazy-load + responsive images for mobile/slow |

> **Polish modes:** `Lossless` keeps quality identical; `Lossy` provides better
> compression with imperceptible quality loss. For a construction company website
> with hero photos and project images, `Lossy` is recommended.

**Speed → Optimization → Image Resizing:**

- Image Resizing: **ON**
- Enables `cdn-cgi/image/` URLs for on-demand responsive images
- Use via `format=auto,width=800,quality=85` parameters

**Rules → Redirect Rules (Pro: 50 rules vs Free: 3):**

Move the apex→www redirect from `middleware.ts` to edge:

| Rule Name     | When                         | Then                                                                 | Status |
| ------------- | ---------------------------- | -------------------------------------------------------------------- | ------ |
| `apex-to-www` | hostname equals `mhc-gc.com` | Dynamic redirect to `https://www.mhc-gc.com${http.request.uri.path}` | 301    |

> After creating this rule, remove the redirect block from `middleware.ts` to save
> ~10-20 ms of Worker CPU per redirect request.

**Security → WAF → Custom Rules (Pro: 5 rules):**

| Rule Name          | Expression                                                                                             | Action                  |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| `block-empty-ua`   | `http.request.uri.path contains "/api/" and len(http.user_agent) eq 0`                                 | Block                   |
| `rate-limit-forms` | `http.request.uri.path contains "/api/contact" or http.request.uri.path contains "/api/consultations"` | Rate limit (10 req/min) |

**Caching → Cache Analytics (Pro):**

- View cache hit ratio, bandwidth savings, and asset performance
- Target: >90% edge cache hit ratio for static assets

**Speed → Optimization → Mobile Redirect:**

- **OFF** — responsive design handles all viewports; no separate mobile site

---

## NameCheap (Domain Registration)

NameCheap serves as the domain registrar for `mhc-gc.com`. DNS is delegated to Cloudflare
for performance, security, and integration with Workers.

### Configuration Steps

1. **Domain Registered:** `mhc-gc.com` registered with NameCheap
2. **Nameserver Delegation:** Point to Cloudflare nameservers:
   - `ann.ns.cloudflare.com`
   - `isaac.ns.cloudflare.com`
3. **DNSSEC:** Enable after nameserver delegation (managed by Cloudflare)

### NameCheap Dashboard

- **Domain Management:** `ap.www.namecheap.com` → Domain List → mhc-gc.com
- **Nameservers:** Custom DNS → Cloudflare nameservers
- **Auto-Renew:** Enable to prevent accidental expiration
- **WHOIS Privacy:** WhoisGuard enabled (free with NameCheap)

---

## Microsoft 365 (Email Hosting)

Microsoft 365 (Outlook/Exchange Online) provides email hosting for `@mhc-gc.com` mailboxes.

### Configuration

With DNS managed by Cloudflare, add these Microsoft 365 records:

1. **MX Record:** `mhc-gc-com.mail.protection.outlook.com` (priority 0)
2. **SPF Record:** `v=spf1 include:spf.protection.outlook.com ~all`
3. **DKIM:** Configure CNAME records via Microsoft 365 admin center
4. **Autodiscover:** CNAME → `autodiscover.outlook.com`

### Microsoft 365 Admin Center

- **Admin Portal:** `admin.microsoft.com`
- **Exchange Admin:** `admin.exchange.microsoft.com`
- **Mailboxes:** Create/manage `@mhc-gc.com` addresses
- **Outlook Access:** `outlook.office.com` or desktop/mobile apps

> **Note:** Transactional email (form submissions) uses Resend API, not Outlook SMTP.
> Microsoft 365 is for employee mailboxes and receiving mail at `@mhc-gc.com`.

---

## Hostinger VPS (Automation & Monitoring)

Hostinger VPS (KVM 2) serves as the primary server for internal operations, hosting
automation workflows and monitoring tools.

### Server Specifications

| Component  | Details                         |
| ---------- | ------------------------------- |
| Plan       | Hostinger VPS KVM 2             |
| OS         | Ubuntu 24.04 LTS                |
| Engine     | Docker (containerized services) |
| Management | Portainer (visual dashboard)    |

### Services Running

#### n8n (Workflow Automation)

- **Purpose:** The "brain" of operations — automates workflows between services
- **Access:** Via Portainer or direct container access
- **Use Cases:**
  - Form submission processing
  - Notification routing
  - Data synchronization
  - Scheduled tasks

#### Portainer (Container Management)

- **Purpose:** Visual dashboard to manage Docker containers without CLI
- **Port:** Typically `9443` (HTTPS) or `9000` (HTTP)
- **Features:**
  - Start/stop/restart containers
  - View container logs
  - Manage Docker networks and volumes
  - Deploy new containers via UI

#### PostHog (Self-Hosted Analytics)

- **Purpose:** Replaces Hotjar — heatmaps and session recordings to see exactly how users interact with the site
- **Features:**
  - Session recordings
  - Heatmaps (click, scroll, move)
  - User journey funnels
  - Feature flags
  - A/B testing
- **Privacy:** Self-hosted means full data ownership, no third-party data sharing
- **Integration:** JavaScript snippet or `posthog-js` library

#### Uptime Kuma (Downtime Monitor)

- **Purpose:** Simple monitor that pings your phone if any site goes down
- **Port:** Typically `3001`
- **Monitored Sites:**
  - `www.mhc-gc.com` (main site)
  - Other internal services as needed
- **Alerts:** Push notifications, SMS (via Twilio), email, Discord, Slack
- **Dashboard:** Status page showing uptime history

### VPS Access

- **Hostinger Panel:** `hpanel.hostinger.com` → VPS → KVM 2
- **SSH Access:** `ssh root@<vps-ip>` (use SSH keys, not passwords)
- **Portainer:** `https://<vps-ip>:9443`

### Docker Best Practices

1. **Isolation:** Each service runs in its own container
2. **Fail-safe:** Containers auto-restart on failure (`--restart=unless-stopped`)
3. **Updates:** Use Portainer or `docker compose pull && docker compose up -d`
4. **Backups:** Regularly backup Docker volumes and n8n workflows

> **Note:** The VPS handles internal automation only. Public-facing website traffic
> routes through Cloudflare Workers, not the VPS.

---

## Resend (Email Engine)

Resend is the high-deliverability email engine for both **transactional follow-ups** and
**marketing newsletters**.

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

### Use Cases

| Type              | Purpose                            | Example                                    |
| ----------------- | ---------------------------------- | ------------------------------------------ |
| **Transactional** | Form acknowledgments, admin alerts | "Thank you for your consultation request"  |
| **Marketing**     | Newsletters, announcements         | Monthly company updates, project showcases |

---

## Twilio (Communications)

Twilio powers SMS notifications, local 509 phone numbers, and WhatsApp Business API
integration for multi-channel customer communication.

### Configuration

**Dashboard:** `console.twilio.com`

| Setting            | Value                |
| ------------------ | -------------------- |
| **Account SID**    | `ACxxxx...` (secret) |
| **Auth Token**     | `xxxx...` (secret)   |
| **Primary Number** | `+15093086489`       |
| **Region**         | 509 (Tri-Cities)     |

### Services

#### SMS Notifications

- Admin alerts for urgent form submissions
- Appointment reminders
- Status updates

#### Local 509 Numbers

- Professional local presence for Tri-Cities area
- Call forwarding to office lines
- SMS-enabled for two-way communication

#### WhatsApp Business API

- Customer support channel
- Rich media messaging (project photos, documents)
- Template messages for common responses

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

1. **Admin-only SMS:** Only use SMS for admin notifications, not user confirmations
2. **Batch carefully:** Use `sendBulkNotifications` for multiple alerts
3. **Graceful degradation:** Code handles missing credentials without errors
4. **WhatsApp templates:** Pre-approve message templates for business messages

---

## Semrush Pro (SEO Intelligence)

Semrush Pro is used for periodic "reconnaissance" missions — strategic keyword audits
and competitor analysis to inform content and SEO decisions.

### Use Cases

| Task                    | Frequency | Purpose                                     |
| ----------------------- | --------- | ------------------------------------------- |
| **Keyword Audit**       | Quarterly | Identify new ranking opportunities          |
| **Competitor Analysis** | Monthly   | Track competitor moves and strategies       |
| **Backlink Audit**      | Quarterly | Monitor link profile health                 |
| **Position Tracking**   | Weekly    | Monitor ranking changes for target keywords |
| **Site Audit**          | Monthly   | Identify technical SEO issues               |

### Dashboard

**Access:** `semrush.com` → Projects → MH Construction

### Integration with Workflow

1. **Research phase:** Use Semrush to identify target keywords
2. **Content creation:** Optimize pages based on Semrush recommendations
3. **Monitoring:** Track rankings and adjust strategy
4. **Reports:** Export data for quarterly SEO reviews

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

1. Verify NameCheap nameservers point to Cloudflare
2. Check DNSSEC status in both NameCheap and Cloudflare
3. Wait for DNS propagation (up to 48 hours)

---

## Recommended Additions

The following services are recommended to complete the "monster engine" tech stack:

### 🔴 High Priority

#### Google Search Console (Free) ✅ Verified

**Why:** See what keywords actually bring traffic, monitor index status, identify crawl errors.

**Status:** Verification file deployed at `public/google362c2769be0feebe.html`

**Post-Verification Steps:**

1. Go to `search.google.com/search-console`
2. Click "Verify" to complete verification
3. Submit sitemap: `https://www.mhc-gc.com/sitemap.xml`
4. Check URL inspection for any crawl issues

**Integration:** Pairs with Semrush for complete SEO visibility.

#### Google Business Profile (Free) ✅ Schema Ready

**Why:** Critical for local SEO — "general contractor Tri-Cities" searches. Drives phone calls and direction requests.

**Schema Support:** The website already emits `LocalBusiness` and `GeneralContractor` structured data
on every page via `src/components/seo/SeoMeta.tsx`. This enables rich results in Google Search.

**Setup:**

1. Go to `business.google.com`
2. Search for "MH Construction" or "MH Construction, Inc."
3. If found, claim the listing; if not, create new
4. Verify via postcard (most reliable), phone, or email
5. Complete all profile fields to match website

**Optimization Checklist:**

- [ ] Business name: `MH Construction, Inc.` (exact match to website)
- [ ] Primary category: `General Contractor`
- [ ] Secondary categories: `Construction Company`, `Commercial Construction`, `Building Contractor`
- [ ] Address: 2545 N Steptoe St, Kennewick, WA 99336
- [ ] Phone: (509) 308-6489 (must match website)
- [ ] Website: `https://www.mhc-gc.com`
- [ ] Hours: Mon-Fri 7:00 AM - 5:00 PM
- [ ] Service areas: Add all 11 location pages (Richland, Kennewick, Pasco, West Richland, Yakima, Spokane, Walla Walla, Hermiston, Pendleton, Coeur d'Alene, Omak)
- [ ] Services: List all from `/services` page
- [ ] Description: Use homepage meta description
- [ ] Photos: 10+ project photos (label with project type and location)
- [ ] Logo: Upload official logo
- [ ] Cover photo: Hero image of team or flagship project

**Ongoing Tasks:**

- Respond to all reviews within 24 hours
- Post weekly updates (project completions, team news)
- Add Q&A entries matching `/faq` page

#### CRM System ✅ Built-In

**Status:** Custom CRM is implemented in the admin dashboard.

**Features:**

- Lead tracking from form submission → estimate → won/lost
- Sources: Contact form, consultation requests, phone calls, referrals, walk-ins
- Statuses: New → Contacted → Estimate Sent → Negotiating → Won/Lost
- Assignment to Matt or Jeremy
- Follow-up date tracking with overdue alerts
- Notes history with timestamps
- Estimated project values and win probability
- Lost reason tracking for pipeline analysis

**Access:** `/dashboard` → Leads tab (requires admin login)

**Database:** `migrations/0013_create_leads.sql`

**API:** `/api/leads` (GET, POST, PATCH) + `/api/leads/sync` (auto-import from forms)

**No external CRM needed** — all lead tracking is integrated into the admin dashboard.

**Optional External Integration:**
If more advanced CRM features (email sequences, marketing automation) are needed later:

| Option          | Cost   | Best For                              |
| --------------- | ------ | ------------------------------------- |
| **HubSpot CRM** | Free   | Marketing automation, email sequences |
| **Pipedrive**   | $15/mo | Sales-focused, visual pipeline        |

---

### 🟡 Medium Priority

#### Sentry (Error Tracking) ✅ Code Ready

**Why:** Know when production breaks before users complain. Stack traces, user context, release tracking.

**Status:** Code integrated — just needs DSN from Sentry dashboard.

**Setup:**
1. Create account at `sentry.io`
2. Create new project → Browser JavaScript
3. Copy the DSN (looks like `https://xxx@xxx.ingest.sentry.io/xxx`)
4. Add to Cloudflare Dashboard → Workers & Pages → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```
5. Redeploy

**Code Implementation:**
- `src/lib/monitoring/sentry.ts` — Sentry initialization and helpers
- `src/components/monitoring/SentryInit.tsx` — Client-side init component
- `src/components/error/ErrorBoundary.tsx` — Auto-captures React errors
- `src/app/layout.tsx` — SentryInit rendered on every page

**Cost:** Free tier = 5K errors/month (plenty for this traffic)

**Usage:**
```typescript
import { captureException, captureMessage } from "@/lib/monitoring/sentry";

// Capture errors manually
captureException(error, { context: "checkout flow" });

// Capture messages/events
captureMessage("User completed onboarding", "info");
```

#### VPS Backup Strategy

**Why:** If VPS dies, n8n workflows and PostHog data are gone. Automate backups.

**n8n Backup Workflow:**

1. Weekly trigger → Export all n8n workflows as JSON
2. Compress → Upload to R2 bucket or GitHub repo
3. Notify on success/failure

**Docker Volume Backup Script:**

```bash
#!/bin/bash
# /root/backup.sh - run via cron weekly
BACKUP_DIR="/backups/$(date +%Y-%m-%d)"
mkdir -p $BACKUP_DIR

# n8n data
docker run --rm -v n8n_data:/data -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/n8n-data.tar.gz -C /data .

# PostHog data
docker run --rm -v posthog_data:/data -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/posthog-data.tar.gz -C /data .

# Upload to R2 (via rclone or aws cli)
rclone copy $BACKUP_DIR r2:mh-backups/vps/
```

**Cron:** `0 3 * * 0 /root/backup.sh` (Sundays at 3am)

#### Review Collection System

**Why:** Social proof drives construction decisions. 5-star reviews = more leads.

**Strategy:**

1. After project completion → n8n triggers review request email
2. Direct link to Google Business Profile review form
3. Track review count and rating over time

**Email Template:**

```
Subject: How did we do on your project?

Hi {customer_name},

We just wrapped up {project_type} at {address} and would love to hear how it went.

If you have 2 minutes, a Google review helps other homeowners find quality contractors:
→ [Leave a Review](https://g.page/r/...)

Thank you for trusting MH Construction!
```

---

### 🟢 Lower Priority (When Ready)

#### Google Analytics 4

**Why:** Ties directly to Google Ads if you run paid campaigns. More detailed acquisition data.

**Note:** PostHog already covers most analytics needs. Only add GA4 if running Google Ads.

**Setup:** Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` and integrate with `next/script`.

#### Calendly/Cal.com (Scheduling)

**Why:** Let customers book estimate appointments directly. Reduces phone tag.

**Recommendation:** Cal.com (open source, self-hostable on VPS if desired)

---

## Service Stack Summary

### Current Stack (Implemented)

| Category              | Service          | Status    |
| --------------------- | ---------------- | --------- |
| Code Repository       | GitHub           | ✅ Active |
| Hosting/CDN/WAF       | Cloudflare Pages | ✅ Active |
| Domain                | NameCheap        | ✅ Active |
| Email (Team)          | Microsoft 365    | ✅ Active |
| Email (Transactional) | Resend           | ✅ Active |
| Communications        | Twilio           | ✅ Active |
| Automation            | n8n              | ✅ Active |
| Analytics             | PostHog          | ✅ Active |
| Uptime                | Uptime Kuma      | ✅ Active |
| SEO Research          | Semrush Pro      | ✅ Active |
| AI Chatbot            | Workers AI       | ✅ Active |
| Database              | Cloudflare D1    | ✅ Active |
| Storage               | Cloudflare R2    | ✅ Active |
| Bot Protection        | Turnstile        | ✅ Active |
| Lead Tracking         | Built-in CRM     | ✅ Active |

### Recommended Additions

| Category          | Service                 | Priority  | Status                         | Cost   |
| ----------------- | ----------------------- | --------- | ------------------------------ | ------ |
| SEO Visibility    | Google Search Console   | 🔴 High   | ✅ Verified — submit sitemap   | Free   |
| Local SEO         | Google Business Profile | 🔴 High   | Schema ready — needs GBP claim | Free   |
| Error Tracking    | Sentry                  | 🟡 Medium | ✅ Code ready — needs DSN      | Free   |
| Disaster Recovery | VPS Backups to R2       | 🟡 Medium | Not started                    | ~$1/mo |
| Reputation        | Review Collection       | 🟡 Medium | Not started                    | Free   |
| Paid Ads          | Google Analytics 4      | 🟢 Low    | Optional                       | Free   |
| Scheduling        | Cal.com                 | 🟢 Low    | Optional                       | Free   |

---

## See Also

- [Cloudflare Deployment Guide](../deployment/cloudflare-guide.md)
- [Secrets Management](./secrets-management.md)
- [Security Overview](./security-overview.md)
