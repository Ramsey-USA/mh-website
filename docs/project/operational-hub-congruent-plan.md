# MH Operational Hub Congruent Plan

**Category:** Project - Operations Planning  
**Created:** April 17, 2026  
**Last Updated:** April 18, 2026  
**Version:** 1.1  
**Status:** ✅ Canonical (Execution Source of Truth)  
**Supersedes sequencing conflicts in:**

- `docs/project/operational-hub-build-plan.md`
- `docs/project/operations-command-center-roadmap.md`
- `docs/technical/safety-program-guide.md` (route/auth sections only)
- `docs/technical/services-integration-guide.md` (automation transition sections only)

---

## Objective

Ship one coherent Operational Hub delivery path without migration collisions, route ambiguity, or infrastructure churn.

---

## Locked Decisions

1. **Single authenticated portal:** `/hub` is the canonical staff route.
2. **Backward compatibility:** `/safety/hub` now redirects to `/hub` (active compatibility route).
3. **Role model:** `admin`, `superintendent`, `worker`, `traveler`.
4. **Notification architecture (transition):** keep n8n + Resend + Twilio as primary during sprint delivery; build Cloudflare-native queues/workflows in parallel; cutover only after parity validation.
5. **Migration policy:** preserve existing sequential numbering in `/migrations`; do not reuse numbers already present in repo.
6. **Employee manual placement:** employee handbook/manual is a `/hub` experience (`employee-manual` tab), not a disconnected product line.

---

## Canonical Route Model

| Audience                 | Route         | Access                     |
| ------------------------ | ------------- | -------------------------- |
| Public safety showcase   | `/safety`     | Public                     |
| Staff operational center | `/hub`        | 4-role authenticated gate  |
| Admin management         | `/dashboard`  | Admin only                 |
| Legacy field URL         | `/safety/hub` | 301/308 redirect to `/hub` |

Optional: keep `/handbook` as a convenience alias that redirects to `/hub?tab=employee-manual`.

---

## Canonical Migration Sequence

Current repository already contains migrations through `0013`.

| Migration                                  | Purpose                            |
| ------------------------------------------ | ---------------------------------- |
| `0014_create_safety_access_log.sql`        | Hub access logging and audit trail |
| `0015_extend_authorized_drivers.sql`       | Driver program schema extension    |
| `0016_create_handbook_acknowledgments.sql` | Handbook acknowledgment tracking   |
| `0017_create_employee_certifications.sql`  | Employee certification tracking    |
| `0018_create_content_calendar.sql`         | Social/content scheduling          |
| `0019_create_company_policies.sql`         | Insurance and bonding tracking     |

Rule: if any migration lands out-of-order in `main`, renumber future unpublished migrations before merge.

---

## Unified 8-Week Execution Plan

### Weeks 1-2: Auth + Hub Foundation

- Deliver 4-role auth APIs and RoleGate UI for `/hub`.
- Add worker/traveler passcode flows.
- Keep admin and superintendent paths intact.
- Add `/hub` shell route and initial tab scaffolding.

### Weeks 3-4: Access Logging + Compliance Hooks

- Ship `safety_access_log` migration and API.
- Log successful login events server-side for all auth paths.
- Add client-side hub activity logging.
- Add admin dashboard Access Log tab with filters and auto-refresh.

### Weeks 5-6: Hub Consolidation + Content Integration

- Move field workflow to `/hub` and activate `/safety/hub` redirect.
- Expand docs data model for safety + employee manual + joining content.
- Integrate handbook/manual into `/hub` (`employee-manual` tab).
- Add subtle "Staff Access" nav entry.

### Weeks 7-8: i18n + Offline + Transition Readiness

- Add `next-intl` cookie-based EN/ES toggle for hub scope.
- Complete high-risk Spanish translations first (JHA action items, form submit/confirm language).
- Extend PWA offline queueing/caching for field forms.
- Start Cloudflare queues/workflows in parallel for notification migration readiness.

---

## Dependency Gates

| Gate                                              | Needed By | Owner         | Status  |
| ------------------------------------------------- | --------- | ------------- | ------- |
| P1 Employee Manual source content                 | Week 5    | Matt / Jeremy | Blocked |
| P2 Travelers training URLs                        | Week 5    | Matt / Jeremy | Blocked |
| Env vars: `WORKER_PASSWORD`, `TRAVELERS_PASSWORD` | Week 1    | Engineering   | Pending |
| Notification parity criteria (n8n vs Cloudflare)  | Week 8    | Engineering   | Pending |

---

## Infrastructure Transition Policy

Short-term production path:

- n8n + Resend + Twilio remains active for operational notifications and digest routing.

Parallel build path:

- Implement Cloudflare Queues/Workflows equivalents without removing n8n.

Cutover gate:

- Switch primary only after event parity, delivery reliability, and alert latency meet or exceed n8n baseline for two consecutive weeks.

---

## Change Control

Any scope change must update all of the following in the same PR:

1. `docs/project/operational-hub-congruent-plan.md` (this file)
2. `docs/project/operational-hub-build-plan.md` (implementation stream details)
3. `docs/project/operations-command-center-roadmap.md` (timeline/budget sequence)

This avoids plan drift and keeps one congruent execution path.
