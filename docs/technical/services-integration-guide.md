# External Services Integration Guide

**Category:** Technical - Infrastructure
**Last Updated:** April 15, 2026
**Version:** 1.2.0
**Status:** ✅ Active

This guide documents the integration of all external services used by the MH Construction
website: **GitHub** (code repository), **Cloudflare Pages** (hosting/CDN/WAF), **NameCheap** (domain),
**Microsoft 365** (email hosting), **Hostinger VPS** (n8n automation, Uptime Kuma monitoring),
**Resend** (transactional email), **Twilio** (communications), and **Semrush Pro** (SEO).
Email notifications route through **n8n + Resend SMTP**.

**Tech Stack:** Next.js 15 + Tailwind CSS + TypeScript — high-performance, mobile-responsive, tactical professional tone.

---

## Current Status Summary

| Service              | Status             | URL / Details                             |
| -------------------- | ------------------ | ----------------------------------------- |
| **Cloudflare Pages** | ✅ Live            | `mhc-gc.com`                              |
| **n8n**              | ✅ Running         | `http://n8n.mhc-gc.com:5678`              |
| **Portainer**        | ✅ Running         | `https://docker.mhc-gc.com:9443`          |
| **Uptime Kuma**      | ✅ Monitoring      | `http://status.mhc-gc.com:3001`           |
| **Resend**           | ✅ Domain verified | `mhc-gc.com`                              |
| **Sentry**           | ✅ Client + Server | `@sentry/browser` + `toucan-js` (DSN set) |
| **Twilio**           | ✅ Configured      | SMS alerts for urgent submissions         |
| **PostHog**          | ⏸️ Deferred        | Using Cloudflare Web Analytics ✅         |

### Recent Updates (April 15, 2026)

1. ✅ Deployed n8n, Portainer, Uptime Kuma on Hostinger VPS
2. ✅ Configured Resend SMTP in n8n (domain verified)
3. ✅ Website forms integrated with n8n webhook (`N8N_WEBHOOK_URL`)
4. ✅ Uptime Kuma monitoring active with email alerts
5. ✅ TCP monitoring for website (bypasses Cloudflare bot protection)
6. ✅ Internal monitors configured (n8n Health, Portainer Health)
7. ✅ DNS subdomains configured (n8n, status, docker)
8. ✅ Server-side Sentry via toucan-js for API route errors
9. ✅ Twilio SMS alerts for consultations and urgent contacts
10. ⏸️ PostHog deferred - using Cloudflare Web Analytics instead
11. ✅ **Client-side Sentry configured** — `@sentry/browser` with DSN, `sendDefaultPii: true`, session replay enabled

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [GitHub (Code Repository)](#github-code-repository)
- [Cloudflare Pages (Hosting & CDN)](#cloudflare-pages-hosting--cdn)
- [NameCheap (Domain Registration)](#namecheap-domain-registration)
- [Microsoft 365 (Email Hosting)](#microsoft-365-email-hosting)
- [Hostinger VPS (Automation & Monitoring)](#hostinger-vps-automation--monitoring)
- [PostHog (Analytics)](#posthog-analytics)
- [Email via n8n + Resend](#email-notifications-via-n8n--resend)
- [Twilio (Communications)](#twilio-communications)
- [Semrush Pro (SEO Intelligence)](#semrush-pro-seo-intelligence)
- [Workers AI (Chatbot)](#workers-ai-chatbot)
- [Service Health Monitoring](#service-health-monitoring)
- [Environment Variables](#environment-variables)
- [DNS Records for VPS Services](#dns-records-for-vps-services-optional)
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
│  n8n + Resend (Email)       │             │  TWILIO (Communications)    │
│  ├── Host: Hostinger VPS    │             │  ├── API: api.twilio.com    │
│  ├── SMTP: smtp.resend.com  │             │  ├── Local 509 numbers      │
│  ├── Domain: mhc-gc.com ✅  │             │  ├── SMS notifications      │
│  └── All notifications      │             │  └── WhatsApp Business API  │
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

| Component  | Details                          |
| ---------- | -------------------------------- |
| Plan       | Hostinger VPS KVM 2              |
| Hostname   | srv1588033                       |
| IP Address | `2.24.199.37`                    |
| OS         | Ubuntu 24.04 LTS                 |
| Engine     | Docker 29.4.0                    |
| Management | Portainer CE (visual dashboard)  |
| Firewall   | UFW (ports 22, 3001, 5678, 9443) |

### Services Running

#### n8n (Workflow Automation)

- **URL:** `http://2.24.199.37:5678`
- **Purpose:** The "brain" of operations — automates workflows between services
- **Container:** `n8n` (n8nio/n8n:latest)
- **Status:** ✅ Deployed
- **Use Cases:**
  - Form submission processing → M365 email notifications
  - Notification routing to different recipients
  - Data synchronization between services
  - Scheduled tasks (backups, reports)

#### Portainer (Container Management)

- **URL:** `https://2.24.199.37:9443`
- **Purpose:** Visual dashboard to manage Docker containers without CLI
- **Container:** `portainer` (portainer/portainer-ce:latest)
- **Status:** ✅ Deployed
- **Features:**
  - Start/stop/restart containers
  - View container logs in real-time
  - Manage Docker networks and volumes
  - Deploy new containers via UI

#### Uptime Kuma (Downtime Monitor)

- **URL:** `http://2.24.199.37:3001`
- **Purpose:** Simple monitor that pings your phone if any site goes down
- **Container:** `uptime-kuma` (louislam/uptime-kuma:latest)
- **Status:** ✅ Deployed
- **Monitored Sites:**
  - `https://www.mhc-gc.com` (main site)
  - `https://mhc-gc.com` (naked domain redirect)
  - n8n, Portainer health endpoints
- **Alerts:** Push notifications, SMS (via Twilio), email, Discord
- **Dashboard:** Public status page (optional)

#### PostHog (Self-Hosted Analytics) — Planned

- **Purpose:** Replaces Hotjar — heatmaps and session recordings
- **Status:** ⏳ Planned for future (requires VPS memory upgrade)
- **Features:**
  - Session recordings
  - Heatmaps (click, scroll, move)
  - User journey funnels
  - Feature flags
  - A/B testing
- **Privacy:** Self-hosted means full data ownership, no third-party data sharing
- **Integration:** JavaScript snippet or `posthog-js` library

### VPS Access

| Service         | URL / Command                        |
| --------------- | ------------------------------------ |
| Hostinger Panel | `hpanel.hostinger.com` → VPS → KVM 2 |
| SSH Access      | `ssh root@2.24.199.37`               |
| n8n             | `http://2.24.199.37:5678`            |
| Portainer       | `https://2.24.199.37:9443`           |
| Uptime Kuma     | `http://2.24.199.37:3001`            |

### Docker Compose Configuration

Services are managed via `/opt/mh-stack/docker-compose.yml`:

```yaml
version: "3.8"

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - GENERIC_TIMEZONE=America/Los_Angeles
      - TZ=America/Los_Angeles
    volumes:
      - n8n_data:/home/node/.n8n

  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    ports:
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - uptime_data:/app/data

volumes:
  n8n_data:
  portainer_data:
  uptime_data:
```

**Common Commands:**

```bash
# View running containers
ssh root@2.24.199.37 "docker ps"

# View logs
ssh root@2.24.199.37 "docker logs -f n8n"

# Restart all services
ssh root@2.24.199.37 "cd /opt/mh-stack && docker compose restart"

# Update images
ssh root@2.24.199.37 "cd /opt/mh-stack && docker compose pull && docker compose up -d"
```

### Docker Best Practices

1. **Isolation:** Each service runs in its own container
2. **Fail-safe:** Containers auto-restart on failure (`--restart=unless-stopped`)
3. **Updates:** Use Portainer or `docker compose pull && docker compose up -d`
4. **Backups:** Regularly backup Docker volumes and n8n workflows

> **Note:** The VPS handles internal automation only. Public-facing website traffic
> routes through Cloudflare Workers, not the VPS.

---

## PostHog (Analytics)

PostHog is self-hosted on the Hostinger VPS, providing privacy-first analytics with
heatmaps, session recordings, and user journey tracking.

### Why Self-Hosted?

| Benefit                  | Description                                       |
| ------------------------ | ------------------------------------------------- |
| **Data ownership**       | All data stays on your VPS, no third-party access |
| **No cookie banner**     | First-party analytics = simpler compliance        |
| **Unlimited recordings** | No per-recording fees like Hotjar                 |
| **Cost control**         | Fixed VPS cost vs per-event pricing               |

### VPS Configuration

PostHog runs as a Docker container on the Hostinger VPS:

```bash
# Docker Compose excerpt (from /root/docker-compose.yml)
services:
  posthog:
    image: posthog/posthog:latest
    restart: unless-stopped
    environment:
      - SECRET_KEY=${POSTHOG_SECRET_KEY}
      - SITE_URL=${POSTHOG_HOST}
      - DISABLE_SECURE_SSL_REDIRECT=true
    ports:
      - "8000:8000"
    volumes:
      - posthog_data:/var/lib/postgresql/data
```

**Access:** `https://<vps-ip>:8000` (recommend reverse proxy via Cloudflare Tunnel)

### Frontend Integration

Add the PostHog tracking snippet to record sessions and heatmaps:

**Option 1: Script tag** (in `src/app/layout.tsx`):

```tsx
import Script from "next/script";

// In the <head> section:
<Script
  id="posthog-js"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'${process.env.NEXT_PUBLIC_POSTHOG_HOST}'});
    `,
  }}
/>;
```

**Option 2: posthog-js library** (preferred):

```bash
npm install posthog-js
```

```tsx
// src/lib/analytics/posthog.ts
import posthog from "posthog-js";

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-mask]",
    },
  });
}

// src/components/analytics/PostHogProvider.tsx
("use client");
import { useEffect } from "react";
import { initPostHog } from "@/lib/analytics/posthog";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);
  return <>{children}</>;
}
```

### Environment Variables

Add to Cloudflare Dashboard → Workers & Pages → Settings → Environment Variables:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxx        # From PostHog dashboard → Project Settings
NEXT_PUBLIC_POSTHOG_HOST=https://posthog.yourvps.com  # Your PostHog instance URL
```

### Key Features to Configure

| Feature            | Dashboard Location     | Purpose                            |
| ------------------ | ---------------------- | ---------------------------------- |
| Session recordings | Recordings tab         | Watch real user interactions       |
| Heatmaps           | Heatmaps tab           | Click maps, scroll maps per page   |
| Funnels            | Insights → New insight | Track conversion paths             |
| Feature flags      | Feature Flags tab      | A/B test without deploys           |
| Web analytics      | Web Analytics tab      | Page views, bounce rate, referrers |

### Privacy Configuration

Configure in PostHog dashboard → Project Settings:

- **Mask IPs:** ON (stores hashed IPs only)
- **Disable geo-IP:** Optional (removes location data)
- **Session recording:** Mask text inputs by default
- **Autocapture:** Exclude sensitive elements with `data-ph-no-capture`

```html
<!-- Elements that won't be captured -->
<input data-ph-no-capture type="password" />
<div data-ph-no-capture>Sensitive content</div>
```

### Monitoring Dashboard

Create a custom dashboard with:

1. **Daily active users** — Trend line
2. **Top pages by view** — Bar chart
3. **Conversion funnel** — Contact form completion rate
4. **Session duration** — Average time on site
5. **Device breakdown** — Mobile vs desktop

---

## Email Notifications via n8n + Resend

Email notifications are handled by n8n automation workflows on the Hostinger VPS,
sending through Resend SMTP. This provides reliable transactional email delivery
with domain verification and excellent deliverability.

**Status:** ✅ Fully operational (April 2026)

- n8n workflow active at `http://2.24.199.37:5678`
- Resend domain `mhc-gc.com` verified
- Website forms integrated via `N8N_WEBHOOK_URL` secret

### Architecture

```text
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│   Form Submit   │───▶│  D1 Database     │───▶│  n8n Webhook         │
│   (Contact/etc) │    │  (record saved)  │    │  (VPS automation)    │
└─────────────────┘    └──────────────────┘    └──────────────────────┘
                                                         │
                                                         ▼
                                               ┌──────────────────────┐
                                               │  Resend SMTP         │
                                               │  (smtp.resend.com)   │
                                               └──────────────────────┘
                                                         │
                       ┌─────────────────────────────────┼───────────────┐
                       ▼                                 ▼               ▼
              ┌─────────────────┐           ┌─────────────────┐  ┌─────────────────┐
              │ office@mhc-gc   │           │ matt@mhc-gc     │  │ arnold@mhc-gc   │
              │ (main inbox)    │           │ (admin)         │  │ (superintendent)|
              └─────────────────┘           └─────────────────┘  └─────────────────┘
```

### Why n8n + Resend?

| Benefit                      | Description                                     |
| ---------------------------- | ----------------------------------------------- |
| **Easy integration**         | Simple SMTP with API key authentication         |
| **Excellent deliverability** | Emails from verified `mhc-gc.com` domain        |
| **Centralized automation**   | n8n handles all workflows in one place          |
| **Generous free tier**       | 3,000 emails/month free, then $0.50/1000        |
| **Simple DNS setup**         | Just MX and TXT records for domain verification |

### n8n Workflow Setup

**1. Create the notification workflow in n8n:**

```yaml
# Workflow: Form Submission Notifications
Trigger: Webhook (POST)
  └─ URL: http://2.24.199.37:5678/webhook/form-notification

Steps:
  1. Parse JSON payload (type, data)
  2. Build email based on type:
     - contact: New contact inquiry
     - consultation: Consultation request
     - newsletter: New subscriber
     - job-application: Resume submission
  3. Send via Microsoft 365 SMTP node
  4. Optional: Send SMS via Twilio (urgent only)
  5. Log result to webhook response
```

**2. n8n SMTP Node Configuration (Resend):**

| Setting      | Value                      |
| ------------ | -------------------------- |
| **Host**     | `smtp.resend.com`          |
| **Port**     | `465`                      |
| **Security** | `SSL/TLS`                  |
| **User**     | `resend`                   |
| **Password** | Resend API key             |
| **From**     | `notifications@mhc-gc.com` |

**3. Resend API Key:**

1. Go to `resend.com` → API Keys
2. Create new API key
3. Store in n8n SMTP credential as the password
4. Domain `mhc-gc.com` verified with DNS records in Cloudflare

### Website Integration

The website calls an n8n webhook after saving form data to D1:

**API Route Pattern** (`src/app/api/contact/route.ts`):

```typescript
// After saving to D1...
const webhookUrl = process.env["N8N_WEBHOOK_URL"];
if (webhookUrl) {
  // Non-blocking notification — don't fail the request if n8n is down
  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "contact",
      data: {
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        message: submission.message,
        submittedAt: new Date().toISOString(),
      },
    }),
  }).catch((err) => logger.warn("n8n notification failed", { err }));
}
```

### Environment Variable

Add to Cloudflare Dashboard → Workers & Pages → Settings → Environment Variables:

```bash
N8N_WEBHOOK_URL=https://<n8n-host>/webhook/form-notification
```

### Notification Recipients

Form notifications are sent to the appropriate team members:

| Form Type       | Recipients                            |
| --------------- | ------------------------------------- |
| Contact         | office@, matt@, arnold@               |
| Consultation    | office@, matt@, arnold@               |
| Job Application | office@, matt@, arnold@, brittney@    |
| Newsletter      | office@, matt@                        |
| Safety Forms    | office@, arnold@ + Twilio SMS to Matt |

### Email Templates in n8n

Create reusable email templates in n8n using the **HTML** node:

```html
<!-- Example: Contact form notification -->
<h2>New Contact Form Submission</h2>

<table>
  <tr>
    <td><strong>Name:</strong></td>
    <td>{{$json.data.name}}</td>
  </tr>
  <tr>
    <td><strong>Email:</strong></td>
    <td>{{$json.data.email}}</td>
  </tr>
  <tr>
    <td><strong>Phone:</strong></td>
    <td>{{$json.data.phone}}</td>
  </tr>
  <tr>
    <td><strong>Message:</strong></td>
    <td>{{$json.data.message}}</td>
  </tr>
</table>

<p>
  <a href="https://www.mhc-gc.com/dashboard/leads">View in Dashboard</a>
</p>
```

### Fallback: Direct Resend API

The website also has direct Resend integration in `src/lib/email/email-service.ts`.
This is the primary email delivery method for the website code. The n8n integration
via `src/lib/notifications/n8n-webhook.ts` provides a secondary notification channel.

**Email Flow:**

1. Form submitted → saved to D1 database
2. Direct Resend API call (primary) → sends acknowledgment + team notification
3. n8n webhook (secondary) → backup notification via n8n + Resend SMTP

Both use the same Resend account with verified `mhc-gc.com` domain.

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

## Workers AI (Chatbot)

Cloudflare Workers AI powers the website's intelligent chatbot, providing instant
answers about MH Construction services, trade partners (Allies), and general inquiries
using Meta's Llama 3.1 8B model.

### Architecture

```text
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│   ChatWidget    │───▶│  /api/chat       │───▶│  Workers AI Binding  │
│   (React)       │◀───│  (rate-limited)  │◀───│  @cf/meta/llama-3.1  │
└─────────────────┘    └──────────────────┘    └──────────────────────┘
        │                      │
        │                      ▼
        │              ┌──────────────────┐
        │              │  Knowledge Base  │
        │              │  (fallback)      │
        └──────────────┴──────────────────┘
```

### Cloudflare Binding

The AI binding is configured in `wrangler.toml`:

```toml
[[ai]]
binding = "AI"
```

No external API key required — Workers AI is billed per-request through Cloudflare.

### Implementation

**API Route:** `src/app/api/chat/route.ts`

```typescript
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Get the AI binding from Cloudflare context
const { env } = await getCloudflareContext();
const ai = env.AI;

// Build conversation with system prompt + history
const messages = [
  { role: "system", content: buildSystemPrompt() },
  ...history.map((m) => ({ role: m.role, content: m.content })),
  { role: "user", content: userMessage },
];

// Call Workers AI
const result = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
  messages,
  max_tokens: 300,
  temperature: 0.3, // Low temp for consistent, factual responses
});
```

**Knowledge Base:** `src/lib/chatbot/knowledge-base.ts`

| Export              | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `buildSystemPrompt` | Generates the persona, rules, and company data |
| `ALLIES`            | Typed array of trade partner information       |

**Frontend Widget:** `src/components/chatbot/ChatWidget.tsx`

| Feature              | Implementation                       |
| -------------------- | ------------------------------------ |
| Lazy loading         | `ChatWidgetLazy.tsx` with dynamic    |
| Conversation history | Sent with each request (max 10 msgs) |
| Quick actions        | Pre-defined prompts for common Qs    |
| Mobile-responsive    | Full-screen on mobile, panel on desk |
| Proactive prompt     | Shows after 60s of inactivity        |

### Chatbot Behavior Rules

The system prompt enforces these guardrails:

1. **No fabrication** — If unsure, direct to phone/email
2. **No pricing** — All cost questions → consultation
3. **No timelines** — Project-specific → direct contact
4. **Use proper terminology** — "Client Partners", "Trade Partners"
5. **Ally referrals** — Recommend specific Allies with contact info
6. **Navigation help** — Guide to appropriate website pages

### Fallback Strategy

When Workers AI is unavailable (local dev, rate limits, errors):

```typescript
function generateFallbackResponse(message: string): string {
  // Pattern matching on user message
  // Returns knowledge-base answers without AI
}
```

The fallback covers:

- Ally/trade partner queries
- Service area questions
- Contact information
- General company info

### Rate Limiting

The chat endpoint uses a stricter rate limit than other APIs:

| Setting       | Value         | Reason                    |
| ------------- | ------------- | ------------------------- |
| Max requests  | 10 per minute | AI inference is expensive |
| Window        | 60,000 ms     | Per-IP tracking via KV    |
| Exceeded code | 429           | Standard rate limit       |

### Cost

Workers AI is billed through Cloudflare:

| Model                          | Cost per 1M tokens |
| ------------------------------ | ------------------ |
| @cf/meta/llama-3.1-8b-instruct | ~$0.05-$0.10       |

With ~300 tokens per response and moderate traffic, expect $5-20/month.

### Testing Locally

Workers AI binding isn't available in local dev. The code automatically falls
back to `generateFallbackResponse()`. To test AI responses:

1. Deploy to preview: `wrangler deploy --env preview`
2. Test against preview URL
3. Check Cloudflare dashboard → Workers AI for usage stats

---

## Service Health Monitoring

### Environment Variable Validation

At startup, the following are validated (lazy initialization):

| Service    | Required Vars                                                   | Fallback Behavior     |
| ---------- | --------------------------------------------------------------- | --------------------- |
| n8n Email  | `N8N_WEBHOOK_URL`                                               | Logs warning, skips   |
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
    "n8n": "reachable",
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

# Bot Protection
TURNSTILE_SECRET_KEY=0x...

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx  # ✅ Configured

# n8n Webhook (backup notifications)
N8N_WEBHOOK_URL=http://2.24.199.37:5678/webhook/form-notification  # ✅ Configured
```

### Optional (Cloudflare Dashboard Secrets)

```bash
# SMS (Twilio) - not yet configured
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

## DNS Records for VPS Services

DNS subdomains configured in Cloudflare (April 14, 2026):

| Subdomain | Type | Value         | Proxy    | URL                              |
| --------- | ---- | ------------- | -------- | -------------------------------- |
| `n8n`     | A    | `2.24.199.37` | DNS only | `http://n8n.mhc-gc.com:5678`     |
| `status`  | A    | `2.24.199.37` | DNS only | `http://status.mhc-gc.com:3001`  |
| `docker`  | A    | `2.24.199.37` | DNS only | `https://docker.mhc-gc.com:9443` |

> **Note:** Using "DNS only" (grey cloud) since VPS services aren't behind Cloudflare proxy.

### With Cloudflare Tunnel (Advanced)

For full HTTPS without exposing ports, set up a Cloudflare Tunnel on the VPS:

```bash
# Install cloudflared on VPS
ssh root@2.24.199.37 "curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg && echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' > /etc/apt/sources.list.d/cloudflared.list && apt update && apt install cloudflared -y"

# Authenticate (run interactively)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create mhc-stack

# Configure (create ~/.cloudflared/config.yml)
tunnel: <TUNNEL_ID>
credentials-file: /root/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: n8n.mhc-gc.com
    service: http://localhost:5678
  - hostname: status.mhc-gc.com
    service: http://localhost:3001
  - hostname: docker.mhc-gc.com
    service: https://localhost:9443
    originRequest:
      noTLSVerify: true
  - service: http_status:404

# Run as service
cloudflared service install
systemctl start cloudflared
```

Then add CNAME records in Cloudflare DNS pointing to `<TUNNEL_ID>.cfargotunnel.com`.

---

## Troubleshooting

### Email Notifications Not Sending

1. **n8n approach:** Check n8n workflow execution logs
2. Verify M365 app password is valid in n8n SMTP credentials
3. Test webhook endpoint: `curl -X POST <N8N_WEBHOOK_URL>` with test payload
4. Check n8n container is running: `docker ps | grep n8n`

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

**Setup Steps:**

1. **Verify ownership** (one-time):
   - Go to `search.google.com/search-console`
   - Add property → URL prefix → `https://www.mhc-gc.com`
   - Choose "HTML file" verification method
   - ✅ File already deployed — click "Verify"

2. **Submit sitemap** (after verification):
   - In Search Console → Sitemaps
   - Add: `https://www.mhc-gc.com/sitemap.xml`
   - Status should show "Success" within 24 hours

3. **Verify robots.txt**:
   - In Search Console → Settings → robots.txt
   - Confirm no critical pages are blocked

4. **Check index coverage**:
   - Pages → Indexing → Pages
   - Review any "Not indexed" pages
   - Submit important pages via URL Inspection if needed

**Weekly Monitoring Tasks:**

| Task              | Location                     | What to check                     |
| ----------------- | ---------------------------- | --------------------------------- |
| Crawl errors      | Pages → Indexing             | 404s, server errors, soft 404s    |
| Core Web Vitals   | Experience → Core Web Vitals | LCP, FID, CLS on mobile/desktop   |
| Query performance | Performance → Search results | Clicks, impressions, avg position |
| Coverage changes  | Pages → Indexing             | New issues, recovered pages       |
| Manual actions    | Security & Manual Actions    | Should always be clean            |

**Integration with Workflow:**

- **n8n automation:** Weekly digest email with top queries and new issues
- **Semrush cross-reference:** Compare GSC keyword data with Semrush rankings
- **Content gaps:** Queries with high impressions but low clicks = meta description opportunities

#### Google Business Profile (Free) ✅ Schema Ready

**Why:** Critical for local SEO — "general contractor Tri-Cities" searches. Drives phone calls and direction requests.

**Schema Support:** The website emits `LocalBusiness` and `GeneralContractor` structured data
on every page via `src/components/seo/SeoMeta.tsx`. This enables rich results in Google Search.

**Setup Steps:**

1. **Claim or create listing**:
   - Go to `business.google.com`
   - Search for "MH Construction" or "MH Construction, Inc."
   - If found → "Claim this business"
   - If not found → "Add your business"

2. **Verify ownership** (required):
   - **Postcard:** Most reliable (5-7 days)
   - **Phone:** Instant if eligible (business phone must match)
   - **Email:** If eligible (domain verification)
   - Video/live call: For new businesses if required

3. **Complete profile** (critical for rankings):

   **Basic Information:**

   | Field                | Value                                                                  |
   | -------------------- | ---------------------------------------------------------------------- |
   | Business name        | `MH Construction, Inc.` (exact legal name)                             |
   | Primary category     | `General Contractor`                                                   |
   | Secondary categories | `Construction Company`, `Commercial Contractor`, `Building Contractor` |
   | Address              | 3111 N Capitol Ave, Pasco, WA 99301                                    |
   | Phone                | (509) 308-6489                                                         |
   | Website              | `https://www.mhc-gc.com`                                               |
   | Hours                | Mon-Fri 7:00 AM - 4:00 PM                                              |

   **Service Areas** (add all 11 location pages):
   - Richland, Kennewick, Pasco, West Richland
   - Yakima, Spokane, Walla Walla
   - Hermiston, Pendleton (OR)
   - Coeur d'Alene (ID), Omak

   **Services** (match `/services` page):
   - Commercial Construction Management
   - Pre-Construction Services
   - Design-Build
   - Tenant Improvements
   - Light Industrial Construction
   - Healthcare Construction
   - Education Construction
   - Public Safety Construction

   **Business Description** (250 chars):

   > Veteran-owned general contractor serving the Pacific Northwest since 2010. Commercial construction, design-build, tenant improvements. BBB A+ rated, 650+ projects completed. Call for free consultation.

4. **Upload media**:
   - **Logo:** Official MH Construction logo (square, 250x250+)
   - **Cover photo:** Hero image of team or flagship project
   - **Project photos:** 10+ labeled with project type and location
   - **Videos:** Project walkthroughs if available

**Ongoing Management:**

| Task               | Frequency     | Purpose                                      |
| ------------------ | ------------- | -------------------------------------------- |
| Respond to reviews | Within 24 hrs | Shows active engagement                      |
| Post updates       | Weekly        | Project completions, team news, tips         |
| Add Q&A entries    | Monthly       | Pre-answer common questions                  |
| Update photos      | Monthly       | Fresh content signals activity               |
| Check insights     | Weekly        | Track calls, direction requests, site visits |

**Review Response Templates:**

_5-star review:_

> Thank you for the kind words, {name}! It was a pleasure working on your
> {project_type}. We appreciate your trust in MH Construction.

_4-star review:_

> Thank you for your feedback, {name}. We're glad the project went well, and
> we'd love to hear how we can earn that fifth star next time!

_Negative review:_

> {name}, thank you for bringing this to our attention. We take all feedback
> seriously. Please reach out to `office@mhc-gc.com` so we can discuss and
> resolve this directly.

**n8n Automation Ideas:**

1. New review notification → Slack/SMS alert to Matt/Jeremy
2. Weekly insights summary → Email digest
3. Review milestone alerts (e.g., "You hit 50 reviews!")

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

#### Sentry (Error Tracking) ✅ Configured

**Why:** Know when production breaks before users complain. Stack traces, user context, release tracking.

**Status:** ✅ Fully configured — client-side (`@sentry/browser`) and server-side (`toucan-js`) error tracking active.

**DSN:** `https://4bcf174e0a1db00489a4d0cde0b290de@o4511220420050944.ingest.us.sentry.io/4511220427980800`

**Setup (Already Complete):**

1. ✅ Created account at `sentry.io`
2. ✅ Created new project → Browser JavaScript
3. ✅ DSN configured in environment variables
4. ✅ Code integrated with `sendDefaultPii: true` for automatic IP collection

**Environment Variables (add to Cloudflare Dashboard):**

```bash
# Client-side error tracking (browser)
NEXT_PUBLIC_SENTRY_DSN=https://4bcf174e0a1db00489a4d0cde0b290de@o4511220420050944.ingest.us.sentry.io/4511220427980800

# Server-side error tracking (API routes) - uses toucan-js
SENTRY_DSN=https://4bcf174e0a1db00489a4d0cde0b290de@o4511220420050944.ingest.us.sentry.io/4511220427980800
```

**Code Implementation:**

- `src/lib/monitoring/sentry.ts` — Client-side Sentry using `@sentry/browser`
- `src/lib/monitoring/sentry-server.ts` — Server-side Sentry using `toucan-js` (Cloudflare Workers compatible)
- `src/components/monitoring/SentryInit.tsx` — Client-side init component
- `src/components/error/ErrorBoundary.tsx` — Auto-captures React errors
- `src/app/layout.tsx` — SentryInit rendered on every page

**Features Enabled:**

- `sendDefaultPii: true` — Automatic IP address collection
- `browserTracingIntegration()` — Performance monitoring
- `replayIntegration()` — Session replay (10% sessions, 100% on error)
- ResizeObserver errors filtered out (noisy, harmless)

**Cost:** Free tier = 5K errors/month (plenty for this traffic)

**Usage:**

```typescript
// Client-side (components, pages)
import { captureException, captureMessage } from "@/lib/monitoring/sentry";

captureException(error, { context: "checkout flow" });
captureMessage("User completed onboarding", "info");

// Server-side (API routes)
import {
  captureServerException,
  withServerSentry,
} from "@/lib/monitoring/sentry-server";

export const POST = withServerSentry(async (request) => {
  // Your handler - errors auto-captured
});
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
| Email (Notifications) | n8n + M365 SMTP  | ✅ Active |
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

| Category          | Service                 | Priority  | Status                              | Cost   |
| ----------------- | ----------------------- | --------- | ----------------------------------- | ------ |
| SEO Visibility    | Google Search Console   | 🔴 High   | ✅ Ready — verify & submit sitemap  | Free   |
| Local SEO         | Google Business Profile | 🔴 High   | ✅ Ready — claim & complete profile | Free   |
| Error Tracking    | Sentry                  | 🟡 Medium | ✅ Configured — DSN active          | Free   |
| Disaster Recovery | VPS Backups to R2       | 🟡 Medium | Script ready — configure cron       | ~$1/mo |
| Reputation        | Review Collection       | 🟡 Medium | Template ready — create n8n flow    | Free   |
| Paid Ads          | Google Analytics 4      | 🟢 Low    | Optional                            | Free   |
| Scheduling        | Cal.com                 | 🟢 Low    | Optional                            | Free   |

---

## See Also

- [Cloudflare Deployment Guide](../deployment/cloudflare-guide.md)
- [Secrets Management](./secrets-management.md)
- [Security Overview](./security-overview.md)
