# MHC Operations Command Center Roadmap

**Category:** Project - Operations Planning  
**Created:** April 13, 2026  
**Last Updated:** April 18, 2026  
**Version:** 1.1  
**Status:** ✅ Active

> Alignment update (April 18, 2026): this roadmap is now sequenced with `docs/project/operational-hub-build-plan.md` and the canonical execution order in `docs/project/operational-hub-congruent-plan.md`.

---

## TL;DR

Transform mhc-gc.com into an **Operations Command Center** — a single platform where every
manual, procedure, form, and compliance requirement is documented, QR-accessible,
version-controlled, and brand-enforced. This achieves **ultimate branding authority** by
making the website the canonical source for how MH Construction operates.

**Budget:** $5,000/year (~$417/month)  
**Timeline:** 12 weeks (Phases 1-4) + ongoing  
**HD Drywall:** On hold (in-progress on GitHub)  
**Heatmaps:** Included in plan, not immediate priority

---

## Current State (Already Built)

| System                | Status        | What Exists                                                                             |
| --------------------- | ------------- | --------------------------------------------------------------------------------------- |
| **Safety Program**    | ✅ Production | 50-section manual, QR PDFs, form submissions, intake portal, R2 storage                 |
| **Driving Program**   | ⚠️ Partial    | Driver database, license tracking, MVR monitoring, daily cron alerts, admin dashboard   |
| **Document Pipeline** | ✅ Production | Puppeteer PDF generation, branded covers/tabs/spines, QR back-links                     |
| **Email Templates**   | ✅ Production | Branded HTML builder, alert templates, digest summaries                                 |
| **PWA Offline App**   | ✅ Production | Service Worker v4.0.0, 5-layer caching, installable, offline-ready — needs form caching |
| **Analytics**         | ✅ Production | Geographic tracking, lead scoring, CTA effectiveness, KV-backed dashboard               |
| **Partnership Guide** | ✅ Production | Workers AI chatbot, context-aware responses                                             |

---

## The MHC Operations Platform

### Manual Suite

| Manual                             | Purpose                                              | Priority | Effort |
| ---------------------------------- | ---------------------------------------------------- | -------- | ------ |
| **MHC Employee Handbook**          | Company policies, benefits, expectations, culture    | HIGH     | 20 hrs |
| **MHC Driving Program**            | Vehicle policies, authorization, accidents, MVR      | HIGH     | 16 hrs |
| **MHC Safety Program**             | ✅ COMPLETE                                          | —        | —      |
| **MHC Project Management Manual**  | Estimating, scheduling, change orders, closeout      | MEDIUM   | 24 hrs |
| **MHC Quality Control Manual**     | Inspection checklists, punch lists, warranty         | MEDIUM   | 16 hrs |
| **MHC Subcontractor Guide**        | Onboarding subs, insurance requirements, payments    | MEDIUM   | 12 hrs |
| **MHC Field Operations Manual**    | Daily logs, equipment, material handling, site setup | LOW      | 20 hrs |
| **MHC Client Communication Guide** | How to talk to clients, email templates, escalation  | LOW      | 8 hrs  |

---

## Phase 1: Driving Program Completion (Week 1-2)

**Gaps to fill in existing system:**

### 1.1 Create MHC Driving Program Manual

Using Safety Program pipeline:

- `documents/content/MHC_Driving_Program_2026/` — source Word docs
- Sections: Authorization, Vehicle Use Policy, Accident Procedures, MVR Review, CDL Requirements, Personal Vehicle Use
- Generate QR-linked PDFs via existing `npm run docs:generate` pattern

### 1.2 Extend Database Schema

**Migration 0015: Extend `authorized_drivers` table**

```sql
ALTER TABLE authorized_drivers ADD COLUMN training_completion_date TEXT;
ALTER TABLE authorized_drivers ADD COLUMN defensive_driving_cert TEXT;
ALTER TABLE authorized_drivers ADD COLUMN incident_history TEXT; -- JSON array
ALTER TABLE authorized_drivers ADD COLUMN vehicle_assignments TEXT; -- JSON array
ALTER TABLE authorized_drivers ADD COLUMN annual_review_due TEXT;
ALTER TABLE authorized_drivers ADD COLUMN last_annual_review TEXT;
```

### 1.3 Enhance DriversTab Dashboard

- [ ] Bulk CSV import for driver onboarding
- [ ] Incident logger linked to driver records
- [ ] Document attachments (license scans → R2)
- [ ] Audit trail for authorization changes

### 1.4 Driver Self-Service Portal

Create `/hub/me` (unified self-service under the Operational Hub):

- [ ] View own license status, upcoming expirations
- [ ] Upload updated license photo
- [ ] Acknowledge policy updates (digital signature)

### 1.5 PWA Offline Form Caching

- [ ] Extend Service Worker to cache driving forms for field use
- [ ] Queue form submissions when offline → sync when reconnected
- [ ] Visual indicator showing online/offline status
- [ ] Cache driver manual PDFs for offline viewing

**PWA Enhancement Details:**

- Service Worker v4.0.0 already installed — extend with form caching
- Add to `public/sw.js`: cache driving forms, safety forms, manual PDFs
- IndexedDB queue for offline submissions
- Background sync API for automatic submission when online
- Dashboard shows "pending sync" count for offline submissions

### Phase 1 Files

| File                                            | Action                   |
| ----------------------------------------------- | ------------------------ |
| `migrations/0015_extend_authorized_drivers.sql` | Create                   |
| `src/app/dashboard/DriversTab.tsx`              | Enhance                  |
| `src/app/api/drivers/check-alerts/route.ts`     | Add incident alerts      |
| `documents/content/MHC_Driving_Program_2026/`   | Create content           |
| `public/sw.js`                                  | Extend for offline forms |
| `src/lib/pwa/offline-queue.ts`                  | Create                   |
| `src/app/hub/me/page.tsx`                       | Create                   |

### Phase 1 Verification

- [ ] Add driver via CSV upload → Driver appears in dashboard
- [ ] Driver uploads license scan → File in R2, thumbnail in dashboard
- [ ] Fill safety form offline → go online → Form auto-syncs
- [ ] Install PWA, view driving manual offline → Manual loads from cache

---

## Phase 2: Employee Handbook + Certifications (Week 3-4)

### 2.1 Create MHC Handbook Manual

- `documents/content/MHC_Handbook_2026/` — source docs
- Sections: Welcome, Mission/Values, Employment Policies, Benefits, Time Off, Conduct, Safety Overview, Acknowledgment
- Same PDF pipeline as Safety Program

### 2.2 Database Tables

**Migration 0016: `handbook_acknowledgments`**

```sql
CREATE TABLE handbook_acknowledgments (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  version TEXT NOT NULL,
  acknowledged_at TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_ack_employee ON handbook_acknowledgments(employee_id);
CREATE INDEX idx_ack_version ON handbook_acknowledgments(version);
```

**Migration 0017: `employee_certifications`**

```sql
CREATE TABLE employee_certifications (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  cert_type TEXT NOT NULL, -- osha_10, osha_30, forklift, first_aid, cpr, fall_protection, confined_space
  cert_name TEXT NOT NULL,
  issued_date TEXT,
  expiry_date TEXT,
  cert_number TEXT,
  issuing_authority TEXT,
  document_key TEXT, -- R2 reference
  status TEXT DEFAULT 'active', -- active, expired, pending_renewal
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE INDEX idx_certs_employee ON employee_certifications(employee_id);
CREATE INDEX idx_certs_expiry ON employee_certifications(expiry_date);
CREATE INDEX idx_certs_type ON employee_certifications(cert_type);
```

### 2.3 Employee Portal

Create handbook experience in `/hub` (`employee-manual` tab) with optional `/handbook` alias redirect if needed:

- [ ] Browse sections online (SSR from R2 PDFs or markdown)
- [ ] Download complete PDF
- [ ] Digital acknowledgment form

### 2.4 Onboarding Automation

- [ ] New hire added to D1 → email with handbook link
- [ ] Reminder cron if not acknowledged within 3 days
- [ ] Dashboard shows acknowledgment status

### 2.5 Employee Certifications Tracking

- [ ] Track: OSHA 10/30, forklift, first aid, CPR, confined space, fall protection
- [ ] Expiration alerts (same pattern as driver licenses)
- [ ] Document uploads to R2 (cert scans)
- [ ] Dashboard tab showing certification matrix by employee

**Certification Alert Cron:**

- Add to existing daily cron job
- 90/60/30/7 day expiration warnings
- Email to employee + admin
- Dashboard badge for expiring certs

### Phase 2 Files

| File                                                  | Action         |
| ----------------------------------------------------- | -------------- |
| `migrations/0016_create_handbook_acknowledgments.sql` | Create         |
| `migrations/0017_create_employee_certifications.sql`  | Create         |
| `src/app/hub/HubClient.tsx`                           | Enhance        |
| `src/app/dashboard/CertificationsTab.tsx`             | Create         |
| `src/app/api/certifications/`                         | Create routes  |
| `documents/content/MHC_Handbook_2026/`                | Create content |

### Phase 2 Verification

- [ ] New hire onboarding → Receives handbook email, acknowledges, status updates
- [ ] Add employee certification → Cert tracked, expiration alert scheduled

---

## Phase 3: Social Media & Podcast Hub (Week 5-8)

**Budget allocation:** ~$120/month for integrations

### Recommended Stack

| Platform               | Integration                                     | Cost                 |
| ---------------------- | ----------------------------------------------- | -------------------- |
| **Buffer**             | All social (FB, LinkedIn, Instagram, X, TikTok) | $60/mo (Team plan)   |
| **Transistor**         | Podcast hosting + distribution                  | $19/mo               |
| **Cloudflare Workers** | Orchestration, webhooks, analytics              | $0 (included in Pro) |
| **Riverside.fm**       | Remote podcast recording                        | $15/mo (Basic)       |
| **Descript**           | Podcast editing + transcription                 | $24/mo               |
| **Total**              |                                                 | **$118/mo**          |

**Email infrastructure:**

- **Microsoft 365 / Outlook** (existing) — business correspondence
- **Resend** (existing) — transactional emails (form notifications, alerts, digests)
- No changes needed — current setup works

### 3.1 Content Calendar

**Migration 0018: `content_calendar`**

```sql
CREATE TABLE content_calendar (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  platforms TEXT, -- JSON array: ["facebook", "linkedin", "instagram"]
  media_urls TEXT, -- JSON array
  scheduled_for TEXT NOT NULL,
  published_at TEXT,
  status TEXT DEFAULT 'draft', -- draft, scheduled, published, failed
  brand TEXT DEFAULT 'mhc', -- mhc, hd_drywall (future)
  buffer_id TEXT, -- Buffer post ID
  analytics TEXT, -- JSON: engagement metrics
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_calendar_scheduled ON content_calendar(scheduled_for);
CREATE INDEX idx_calendar_status ON content_calendar(status);
```

### 3.2 Buffer API Integration

- [ ] `POST /api/social/schedule` → creates Buffer post
- [ ] Webhook: Buffer posts → update `content_calendar` status
- [ ] Dashboard shows post performance (Buffer analytics API)

### 3.3 Podcast Infrastructure

- [ ] `/podcast` landing page with episode archive
- [ ] Transistor RSS feed embedded
- [ ] Episode show notes stored in D1
- [ ] Transcript search via Workers AI embeddings (future)

### 3.4 Content Repurposing Workflow

- [ ] Podcast episode → auto-generate social clips (Descript)
- [ ] Project completion → auto-generate GBP post template
- [ ] Safety milestone → auto-generate LinkedIn post

### Phase 3 Files

| File                                          | Action |
| --------------------------------------------- | ------ |
| `migrations/0018_create_content_calendar.sql` | Create |
| `src/app/podcast/page.tsx`                    | Create |
| `src/app/dashboard/SocialTab.tsx`             | Create |
| `src/app/api/social/schedule/route.ts`        | Create |
| `src/app/api/webhooks/buffer/route.ts`        | Create |
| `src/lib/integrations/buffer.ts`              | Create |

### Phase 3 Verification

- [ ] Schedule post in dashboard → Appears in Buffer queue, publishes at scheduled time
- [ ] Publish podcast episode → Shows on `/podcast`, RSS updates, social auto-posts

---

## Phase 4: Automation Engine + Compliance Tracking (Week 9-12)

**Build Cloudflare-native primitives in parallel with the existing n8n system, then evaluate cutover after stabilization.**

### 4.1 Cloudflare Queues Setup

- [ ] `lead-routing` — form submissions → notify → store → acknowledge
- [ ] `notifications` — centralized email/SMS dispatch
- [ ] `content-publish` — scheduled social posts → Buffer API

### 4.2 Cloudflare Workflows

- [ ] `new-lead-flow`: validate → D1 → email admin → ACK user → analytics
- [ ] `weekly-digest`: aggregate metrics → generate report → email Matt/Jeremy
- [ ] `license-expiry-escalation`: 90d → 60d → 30d → 7d → daily until resolved

### 4.3 Integration Webhooks

- [ ] `/api/webhooks/buffer` — post published confirmation
- [ ] `/api/webhooks/transistor` — new episode published
- [ ] `/api/webhooks/resend` — email delivery status

### 4.4 Insurance & Bonding Tracking

**Migration 0019: `company_policies`**

```sql
CREATE TABLE company_policies (
  id INTEGER PRIMARY KEY,
  policy_type TEXT NOT NULL, -- general_liability, auto, workers_comp, umbrella, bond, professional_liability
  policy_name TEXT NOT NULL,
  carrier TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  coverage_amount INTEGER, -- in cents
  premium_amount INTEGER, -- in cents
  effective_date TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  agent_name TEXT,
  agent_phone TEXT,
  agent_email TEXT,
  document_key TEXT, -- R2 reference for policy PDF
  status TEXT DEFAULT 'active', -- active, expired, pending_renewal, cancelled
  auto_renew INTEGER DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_policies_expiry ON company_policies(expiry_date);
CREATE INDEX idx_policies_type ON company_policies(policy_type);
```

**Insurance Alert Cron:**

- Add to existing daily cron job
- 90/60/30/14/7 day expiration warnings
- Email to Matt + Jeremy
- SMS for policies expiring in < 7 days
- Dashboard shows compliance status (all green = fully insured)

### Phase 4 Files

| File                                          | Action                      |
| --------------------------------------------- | --------------------------- |
| `migrations/0019_create_company_policies.sql` | Create                      |
| `src/app/dashboard/InsuranceTab.tsx`          | Create                      |
| `src/app/api/policies/`                       | Create routes               |
| `src/app/api/webhooks/transistor/route.ts`    | Create                      |
| `src/app/api/webhooks/resend/route.ts`        | Create                      |
| `src/lib/workflows/`                          | Create Cloudflare Workflows |

### Phase 4 Verification

- [ ] Submit contact form → Queue processes, email sent < 5s, analytics updated
- [ ] Add insurance policy → Policy tracked, 90-day warning scheduled
- [ ] Policy expires in 7 days → SMS + email sent to Matt/Jeremy

---

## Phase 5: Additional Manuals (Ongoing)

Using established pipeline, add manuals as business needs arise:

- Project Management Manual
- Quality Control Manual
- Subcontractor Guide
- Field Operations Manual
- Client Communication Guide

Each follows same pattern:

1. Word docs in `documents/content/{MANUAL}_2026/`
2. `npm run docs:extract-word` → JSON
3. `npm run docs:generate` → QR PDFs
4. Upload to R2, serve via `/manuals/{slug}`
5. Acknowledgment tracking if required

---

## Phase 6: Heatmaps & Session Recording (Future)

When ready to implement:

- **Microsoft Clarity** (free, unlimited) — add `<script>` to layout
- Provides: heatmaps, session recordings, rage clicks, dead clicks
- No backend changes required
- GDPR/CCPA compliant with built-in masking

---

## PWA Offline App Optimization (Integrated Throughout)

**Current State:** PWA v4.0.0 with 5-layer caching, installable on mobile/desktop

### Phase 1 (Week 1-2): Driving/Safety Form Offline

- Cache driving forms structure in Service Worker
- Cache safety forms structure (toolbox talks, JHAs, incident reports)
- IndexedDB queue for offline form submissions
- Background Sync API for automatic submission when online
- Cache manual PDFs for offline reading (driving program, safety program)
- Visual offline indicator in header/footer

### Phase 2 (Week 3-4): Handbook Offline

- Cache employee handbook sections
- Offline acknowledgment queuing (submit when back online)
- Cache certification lookup data

### Phase 3 (Week 5-8): Content Offline

- Cache podcast episodes for offline listening
- Pre-cache social media templates

### Phase 4 (Week 9-12): Full Offline Dashboard

- Offline mode for field supervisors
- View driver/employee status offline (last sync)
- Queue driver incidents offline
- Sync indicator showing pending uploads

### Technical Implementation

```javascript
// public/sw.js additions

// Cache strategies by content type
const CACHE_STRATEGIES = {
  manuals: "cache-first", // PDFs rarely change
  forms: "stale-while-revalidate", // Form structure + validation
  api: "network-first", // Live data when possible
  static: "cache-first", // Assets, icons, fonts
};

// Offline form queue (IndexedDB)
const OFFLINE_QUEUE_STORE = "offline-submissions";

// Background sync registration
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-forms") {
    event.waitUntil(syncOfflineForms());
  }
});
```

### PWA Files to Modify/Create

| File                                      | Action                                |
| ----------------------------------------- | ------------------------------------- |
| `public/sw.js`                            | Extend caching strategies             |
| `src/lib/pwa/offline-queue.ts`            | Create IndexedDB queue manager        |
| `src/lib/pwa/sync-manager.ts`             | Create background sync coordinator    |
| `src/components/pwa/OfflineIndicator.tsx` | Create UI component                   |
| `src/components/pwa/SyncStatus.tsx`       | Create pending sync counter           |
| `src/hooks/useOfflineForm.ts`             | Create form hook with offline support |

### PWA Verification Checklist

- [ ] Install PWA on mobile device
- [ ] Go offline (airplane mode)
- [ ] Fill out safety form → saved to queue
- [ ] Submit → shows "pending sync"
- [ ] Go online → form auto-submits
- [ ] Dashboard shows submission with correct timestamp

---

## Media Storage Strategy

**Decision:** Media goes to **Cloudflare R2** (not Git) to prevent repository bloat.

### Current State

| Media Type                | Location                        | Why                         |
| ------------------------- | ------------------------------- | --------------------------- |
| Logos, icons (<50KB)      | Git `public/images/`            | Small, versioned with code  |
| Team photos (<500KB each) | Git `public/images/`            | Small, WebP optimized by CI |
| Safety PDFs               | **R2 `mh-construction-assets`** | Off-Git, served via Workers |
| User uploads              | **R2 (resumes, safety-intake)** | Dynamic content             |

### New Media Strategy

| Media Type                     | Storage                    | Reason                        |
| ------------------------------ | -------------------------- | ----------------------------- |
| **Project photos** (galleries) | R2 `mh-construction-media` | Unlimited scale, no Git bloat |
| **Team photos** (high-res)     | R2 `mh-construction-media` | Source files large            |
| **Before/after galleries**     | R2 `mh-construction-media` | Collections grow over time    |
| **Videos (<100MB)**            | R2 `mh-construction-media` | Self-hosted, edge-delivered   |
| **Videos (>100MB)**            | **Cloudflare Stream**      | Adaptive bitrate, global CDN  |
| **Favicons, logos**            | Git `public/`              | Tiny, versioned               |

### R2 Media Implementation

1. **Create R2 bucket**

   ```bash
   wrangler r2 bucket create mh-construction-media
   ```

2. **Add binding to wrangler.toml**

   ```toml
   [[r2_buckets]]
   binding = "MEDIA"
   bucket_name = "mh-construction-media"
   ```

3. **Create media upload API**
   - `POST /api/admin/media` — upload images/videos to R2
   - Auto-generate WebP versions (using existing optimization scripts pre-upload)
   - Generate thumbnails for gallery views
   - Return CDN-cached URLs

4. **Create media browser in dashboard**
   - Browse uploaded media
   - Copy URLs for use in content
   - Delete/organize by project

5. **URL pattern**
   - `/media/{project-slug}/{filename}` → R2 via Workers
   - Cloudflare caches at edge automatically

### Media Cost Estimate

| Service           | Pricing                  | Estimate              |
| ----------------- | ------------------------ | --------------------- |
| R2 Storage        | $0.015/GB/month          | 50GB = $0.75/mo       |
| R2 Operations     | $0.36/million Class A    | Negligible            |
| R2 Egress         | **Free**                 | $0                    |
| Cloudflare Stream | $5/mo base + $1/1000 min | Only if >100MB videos |

**R2 is essentially free** for typical construction portfolio media. No egress fees (unlike S3).

### Media Files to Create

| File                                   | Purpose                       |
| -------------------------------------- | ----------------------------- |
| `src/app/api/admin/media/route.ts`     | Upload handler                |
| `src/app/api/media/[...path]/route.ts` | R2 proxy with caching headers |
| `src/app/dashboard/MediaTab.tsx`       | Admin media browser           |
| `src/lib/media/upload.ts`              | R2 upload utilities           |
| `scripts/upload-media.sh`              | Bulk upload script            |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    MHC Operations Command Center                 │
│                      (Cloudflare Pro Plan)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   MANUALS   │  │   FORMS     │  │  TRACKING   │              │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤              │
│  │ ✅ Safety   │  │ ✅ Contact  │  │ ✅ Drivers  │              │
│  │ 🔨 Driving  │  │ ✅ Careers  │  │ ✅ Analytics│              │
│  │ 🔨 Handbook │  │ ✅ Safety   │  │ 🔨 Incidents│              │
│  │ 📋 PM Guide │  │ ✅ Consult  │  │ 📋 Training │              │
│  │ 📋 QC Guide │  │ 🔨 Acknowl. │  │ 📋 Certs    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    CONTENT & SOCIAL                          ││
│  ├─────────────────────────────────────────────────────────────┤│
│  │  Dashboard → Buffer API → FB / LinkedIn / IG / X / TikTok   ││
│  │  Transistor → Podcast RSS → Apple / Spotify / Google        ││
│  │  Riverside → Record → Descript → Edit → Clips               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    AUTOMATION (Cloudflare)                   ││
│  ├─────────────────────────────────────────────────────────────┤│
│  │  Queues: lead-routing │ notifications │ content-publish     ││
│  │  Workflows: new-lead │ weekly-digest │ license-escalation   ││
│  │  Crons: driver-alerts │ content-scheduler │ digest-reports  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    COMMUNICATION                             ││
│  ├─────────────────────────────────────────────────────────────┤│
│  │  Microsoft 365: office@mhc-gc.com (Outlook — correspondence)││
│  │  Resend: Transactional email (form alerts, digests, onboard)││
│  │  Twilio: SMS alerts │ WhatsApp (future)                     ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    Cloudflare      Cloudflare     Cloudflare     Cloudflare
       D1              R2             KV          Workers AI
   (database)       (files)        (cache)       (chatbot)
```

**Legend:** ✅ Complete | 🔨 In Progress | 📋 Planned

---

## Budget Allocation ($5,000/year)

| Category        | Service                                 | Monthly  | Annual     |
| --------------- | --------------------------------------- | -------- | ---------- |
| **Hosting**     | Cloudflare Pro                          | $25      | $300       |
| **Social**      | Buffer Team                             | $60      | $720       |
| **Podcast**     | Transistor                              | $19      | $228       |
| **Recording**   | Riverside Basic                         | $15      | $180       |
| **Editing**     | Descript Creator                        | $24      | $288       |
| **Email**       | Microsoft 365 Business Basic (existing) | $6       | $72        |
| **SMS**         | Twilio (est.)                           | $15      | $180       |
| **SEO**         | Semrush (quarterly)                     | $33 avg  | $400       |
| **Contingency** | Unexpected tools/upgrades               | —        | $632       |
| **TOTAL**       |                                         | **$197** | **$3,000** |

**Remaining:** $2,000/year for future needs (video hosting, additional tools, HD Drywall infrastructure)

**Note:** Email infrastructure uses existing Microsoft 365 / Outlook. Resend handles transactional
emails (form notifications, alerts) while Outlook handles business correspondence.

---

## Complete Verification Matrix

| Phase | Test                                     | Expected Result                                             |
| ----- | ---------------------------------------- | ----------------------------------------------------------- |
| 1     | Add driver via CSV upload                | Driver appears in dashboard, cron picks up expiring license |
| 1     | Driver uploads license scan              | File in R2, thumbnail in dashboard                          |
| 1     | Fill safety form offline → go online     | Form auto-syncs, appears in dashboard                       |
| 1     | Install PWA, view driving manual offline | Manual loads from cache                                     |
| 2     | New hire onboarding                      | Receives handbook email, acknowledges, status updates       |
| 2     | Add employee certification               | Cert tracked, expiration alert scheduled                    |
| 3     | Schedule post in dashboard               | Appears in Buffer queue, publishes at scheduled time        |
| 3     | Publish podcast episode                  | Shows on `/podcast`, RSS updates, social auto-posts         |
| 4     | Submit contact form                      | Queue processes, email sent < 5s, analytics updated         |
| 4     | Add insurance policy                     | Policy tracked, 90-day warning scheduled                    |
| 4     | Policy expires in 7 days                 | SMS + email sent to Matt/Jeremy                             |

---

## Decisions Made

| Decision          | Resolution                                                                              |
| ----------------- | --------------------------------------------------------------------------------------- |
| VPS               | Retained short-term for n8n/monitoring; reevaluate after Cloudflare workflows stabilize |
| n8n               | Transitional primary for notifications during migration; target phased cutover          |
| Cloudflare        | Upgrading to Pro plan ($25/mo) — WAF, image optimization, analytics                     |
| Email             | Microsoft 365 / Outlook (existing) + Resend (transactional)                             |
| Social platform   | Buffer ($60/mo) — covers all platforms including TikTok                                 |
| Podcast           | Transistor + Riverside + Descript stack                                                 |
| PWA               | Existing v4.0.0 — extend for offline forms, manual caching, background sync             |
| Certifications    | Track in D1, same expiration alert pattern as driver licenses                           |
| Insurance/Bonding | Track in D1, alert Matt/Jeremy on expiration                                            |
| HD Drywall        | On hold, infrastructure ready when needed                                               |
| Heatmaps          | Microsoft Clarity (free), implement when prioritized                                    |
| Phased approach   | Strict adherence — no scope creep between phases                                        |
| Media storage     | Cloudflare R2 for photos/videos (not Git) — free egress, unlimited scale                |

---

## Timeline Summary

| Week                      | Phase   | Deliverables                                                      |
| ------------------------- | ------- | ----------------------------------------------------------------- |
| 1-2                       | Phase 1 | Driving Program manual, schema extension, PWA offline forms       |
| 3-4                       | Phase 2 | Employee Handbook, certifications tracking, acknowledgment system |
| 5-8                       | Phase 3 | Buffer integration, podcast infrastructure, content calendar      |
| 9-12                      | Phase 4 | Cloudflare Queues/Workflows, insurance tracking, webhooks         |
| Ongoing                   | Phase 5 | Additional manuals as needed                                      |
| Future                    | Phase 6 | Microsoft Clarity heatmaps                                        |
| Pre-Phase 1 or Integrated | Media   | R2 media bucket setup                                             |

---

## Next Steps

1. **Immediate:** Set up R2 media infrastructure (if adding photos soon)
2. **Phase 1:** Complete Driving Program (enhance existing foundation)
3. **Phase 2:** Employee Handbook (new manual, acknowledgment system)
4. **Phase 3:** Social/Podcast infrastructure (Buffer + Transistor setup)
5. **Phase 4:** Automation refinements, insurance tracking

---

**Document History:**

| Date           | Version | Changes                                                                                            |
| -------------- | ------- | -------------------------------------------------------------------------------------------------- |
| April 17, 2026 | 1.1     | Alignment update for migration sequencing, `/hub` routing, and staged n8n-to-Cloudflare transition |
| April 13, 2026 | 1.0     | Initial roadmap created                                                                            |
