# Services Integration Roadmap

**Category:** Technical - Integrations Roadmap
**Last Updated:** July 10, 2026
**Status:** Active planning companion

Use this roadmap with [External Services Integration Guide](./services-integration-guide.md).

## Purpose

This document tracks recommended service additions and operational maturity steps
without bloating the implementation guide.

## Priority Roadmap

### High Priority

#### Google Search Console (Free) ✅ Verified

Why:

- Discover query-level traffic drivers
- Monitor index coverage and crawl health
- Detect high-impression/low-CTR opportunities

Current status:

- Verification file deployed at `public/google362c2769be0feebe.html`

Baseline setup checklist:

1. Verify ownership at `https://search.google.com/search-console`
2. Submit sitemap: `https://www.mhc-gc.com/sitemap.xml`
3. Confirm robots.txt access in Search Console settings
4. Review indexing coverage and submit high-value pages as needed

Weekly checks:

- Crawl/index errors
- Core Web Vitals trend
- Query and page CTR trend
- Manual actions and security status

#### Google Business Profile (Free) ✅ Schema Ready

Why:

- Critical local SEO surface for calls and direction requests
- Supports city-level lead capture

Baseline profile checklist:

1. Claim or create listing in `https://business.google.com`
2. Complete business profile fields with canonical brand details
3. Add all active service areas and core services
4. Upload fresh project media and logo assets
5. Set a weekly review response SLA and posting cadence

Operational cadence:

- Respond to reviews within 24 hours
- Publish weekly project or team updates
- Review profile insights weekly

#### CRM System ✅ Built-In

Status:

- Internal CRM is active in dashboard and no external CRM is required for core lead flow

Core capabilities:

- Lifecycle stages from new lead to won/lost
- Follow-up ownership and overdue tracking
- Pipeline notes and loss-reason analysis

Optional external tools if required later:

- HubSpot CRM (automation-heavy)
- Pipedrive (sales pipeline-heavy)

### Medium Priority

#### Sentry Error Tracking ✅ Configured

Status:

- Client and server monitoring configured and active

Operations checklist:

1. Ensure DSN bindings remain present in deployed environments
2. Review alert routing and escalation ownership quarterly
3. Confirm release/environment tagging conventions

#### VPS Backups to R2

Why:

- Protect workflow and analytics data from VPS failure

Baseline approach:

1. Weekly backup script for key Docker volumes
2. Offsite storage in R2
3. Success/failure notification through n8n

#### Review Collection Workflow

Why:

- Strong review velocity directly improves local trust and conversion

Suggested flow:

1. Trigger post-project review request from n8n
2. Route to GBP review form
3. Track rating and count trend over time

### Lower Priority

#### Google Analytics 4

Use when paid campaigns require direct Google Ads attribution coupling.

#### Scheduling Platform (Cal.com)

Use when appointment self-scheduling becomes a measurable bottleneck.

## Service Stack Snapshot

### Current Implemented Stack

| Category              | Service            | Status    |
| --------------------- | ------------------ | --------- |
| Code Repository       | GitHub             | ✅ Active |
| Hosting/CDN/WAF       | Cloudflare Workers | ✅ Active |
| Domain                | NameCheap          | ✅ Active |
| Email (Team)          | Microsoft 365      | ✅ Active |
| Email (Notifications) | n8n + Resend       | ✅ Active |
| Communications        | Twilio             | ✅ Active |
| Automation            | n8n                | ✅ Active |
| Analytics             | PostHog            | ✅ Active |
| Uptime                | Uptime Kuma        | ✅ Active |
| SEO Research          | Semrush Pro        | ✅ Active |
| AI Chatbot            | Workers AI         | ✅ Active |
| Database              | Cloudflare D1      | ✅ Active |
| Storage               | Cloudflare R2      | ✅ Active |
| Bot Protection        | Turnstile          | ✅ Active |
| Lead Tracking         | Built-in CRM       | ✅ Active |

### Target Additions

| Category          | Service                 | Priority | Status                      |
| ----------------- | ----------------------- | -------- | --------------------------- |
| SEO Visibility    | Google Search Console   | High     | Ready                       |
| Local SEO         | Google Business Profile | High     | Ready                       |
| Error Tracking    | Sentry                  | Medium   | Configured                  |
| Disaster Recovery | VPS Backups to R2       | Medium   | Script/cron rollout pending |
| Reputation        | Review Collection       | Medium   | Automation rollout pending  |
| Paid Ads          | Google Analytics 4      | Low      | Optional                    |
| Scheduling        | Cal.com                 | Low      | Optional                    |

## Related

- [External Services Integration Guide](./services-integration-guide.md)
- [Cloudflare Deployment Guide](../deployment/cloudflare-guide.md)
- [Secrets Management](./secrets-management.md)
