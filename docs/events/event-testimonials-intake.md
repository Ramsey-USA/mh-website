# Event Testimonials Intake

Category: Events - Testimonial Intake  
Last Updated: July 24, 2026

## Purpose

Use this file to collect approved testimonials specifically for event and volunteer work.

This intake is for:

- Richland Chamber of Commerce feedback
- Event partner feedback
- Volunteer captain and volunteer coordinator feedback
- Sponsor and community ally feedback

## Submission Rules

- Only include testimonials with explicit permission to publish.
- Keep wording factual and relationship-focused.
- Do not add private contact details.
- Include date and source context for auditability.
- Keep edits in both English and Spanish when available.

## Copy/Paste Template

Duplicate this block for each new testimonial.

```md
### Testimonial ID: event-YYYYMMDD-short-name

- Publish Status: draft | approved | published
- Source Organization:
- Source Contact Role:
- Event Name:
- Event Route: /events/
- City/Region:
- Date Collected (YYYY-MM-DD):
- Approval Reference:
- Attribution Preference: full-name | role-only | organization-only

English Quote:

>

Spanish Quote:

>

Public Display Fields:

- Name (EN):
- Name (ES):
- Location (EN):
- Location (ES):
- Project/Event Label (EN):
- Project/Event Label (ES):
- Rating (1-5):

Implementation Notes:

- Add/Update record in apps/website/src/lib/data/events.ts under eventTestimonials.
- Verify rendering on /events testimonial section.
- If schema labels change, update apps/website/src/app/events/page.tsx.
```

## Intake Queue

### Pending Review

- None yet.

### Approved for Publish

- None yet.

### Published

- None yet.

### Example Published Entry

### Testimonial ID: event-20260724-richland-chamber

- Publish Status: published
- Source Organization: Richland Chamber of Commerce
- Source Contact Role: Community Partnerships
- Event Name: Tri-Cities Community Event Calendar
- Event Route: /events
- City/Region: Richland, WA
- Date Collected (YYYY-MM-DD): 2026-07-24
- Approval Reference: Chamber partner testimonial approval (events)
- Attribution Preference: organization-only

English Quote:

> MH Construction has been a reliable community event partner, with clear communication, dependable volunteer support, and consistent follow-through.

Spanish Quote:

> MH Construction ha sido un aliado confiable en eventos comunitarios, con comunicacion clara, apoyo voluntario constante y cumplimiento en cada compromiso.

Public Display Fields:

- Name (EN): Richland Chamber of Commerce
- Name (ES): Camara de Comercio de Richland
- Location (EN): Richland, Washington
- Location (ES): Richland, Washington
- Project/Event Label (EN): Community Event Partnership
- Project/Event Label (ES): Alianza para evento comunitario
- Rating (1-5): 5

Implementation Notes:

- Record is implemented in apps/website/src/lib/data/events.ts under eventTestimonials.
- Route rendering is available in the testimonials section on /events.
