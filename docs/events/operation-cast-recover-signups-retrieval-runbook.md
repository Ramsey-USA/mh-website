# Operation: Cast & Recover Signup Retrieval Runbook

**Category:** Events - Operations Runbook  
**Scope:** Retrieve veteran and captain signup sheets from Cloudflare D1  
**Last Updated:** July 24, 2026

## Purpose

This runbook is the canonical procedure for retrieving Operation: Cast & Recover signup data through the codebase tooling.

Use this file when asked to pull:

- Full signup sheets
- Confirmed veteran roster
- Alternate veteran roster
- Captain signup roster
- Quick roster counts

## Quick Navigation

- **Event record:** [Operation: Cast & Recover 2026 - Registration and Sponsorship](./operation-cast-recover-2026-registration-and-sponsorship.md)
- **Public registration route:** [https://www.mhc-gc.com/events/operation-cast-recover](https://www.mhc-gc.com/events/operation-cast-recover)

## Data Source

- **Database table:** `cast_recover_registrations`
- **Event slug:** `operation-cast-recover-2026`
- **Schema owner migration:** `migrations/0023_create_cast_recover_registrations.sql`
- **API owner route:** `apps/website/src/app/api/events/cast-recover/route.ts`

## Tooling Prerequisites

Run from repository root or website package folder:

```bash
cd /workspaces/mh-website/apps/website
```

Use repo-pinned Wrangler via pnpm:

```bash
pnpm exec wrangler --version
```

## Authentication

Choose one method.

### Method A: Interactive Login (local operator)

```bash
pnpm exec wrangler login
```

### Method B: Token-Based (CI or headless)

```bash
export CLOUDFLARE_API_TOKEN="<token>"
export CLOUDFLARE_ACCOUNT_ID="<account-id>"
```

## Quick Count Query

Use this first to verify that rows exist.

Preferred one-command alias:

```bash
pnpm run event:cast-recover:counts
```

Direct Wrangler command:

```bash
pnpm exec wrangler d1 execute 98ad144a-cfe2-4f19-a55c-c43140279840 --remote --command="SELECT registration_type, roster_status, COUNT(*) AS total FROM cast_recover_registrations WHERE event_slug = 'operation-cast-recover-2026' GROUP BY registration_type, roster_status ORDER BY registration_type, roster_status;"
```

## Full Signup Sheet Query

Preferred one-command alias:

```bash
pnpm run event:cast-recover:signups
```

Direct Wrangler command:

```bash
pnpm exec wrangler d1 execute 98ad144a-cfe2-4f19-a55c-c43140279840 --remote --command="SELECT created_at, registration_type, roster_status, full_name, branch_of_service, phone, email, emergency_contact, tshirt_size, vessel_type_length, passenger_capacity, gear_notes FROM cast_recover_registrations WHERE event_slug = 'operation-cast-recover-2026' ORDER BY created_at DESC;"
```

## Print-Ready Event Sheets

Generate printable roster files for event-day use:

```bash
pnpm run event:cast-recover:print-sheets
```

Default output directory:

- `/workspaces/mh-website/apps/website/tmp/events/operation-cast-recover/print-sheets/`

Generated files:

- `cast-recover-confirmed-veterans.csv`
- `cast-recover-alternate-veterans.csv`
- `cast-recover-captains.csv`
- `cast-recover-event-day-print-sheet.md`
- `cast-recover-event-day-print-sheet.pdf`

Optional custom output directory:

```bash
node scripts/events/export-cast-recover-print-sheets.js --outDir tmp/events/print
```

## Veteran and Captain Sheet Queries

### Confirmed Veterans

```bash
pnpm exec wrangler d1 execute 98ad144a-cfe2-4f19-a55c-c43140279840 --remote --command="SELECT full_name, branch_of_service, phone, email, emergency_contact, tshirt_size, created_at FROM cast_recover_registrations WHERE event_slug = 'operation-cast-recover-2026' AND registration_type = 'veteran' AND roster_status = 'confirmed' ORDER BY created_at ASC;"
```

### Alternate Veterans

```bash
pnpm exec wrangler d1 execute 98ad144a-cfe2-4f19-a55c-c43140279840 --remote --command="SELECT full_name, branch_of_service, phone, email, emergency_contact, tshirt_size, created_at FROM cast_recover_registrations WHERE event_slug = 'operation-cast-recover-2026' AND registration_type = 'veteran' AND roster_status = 'alternate' ORDER BY created_at ASC;"
```

### Captains

```bash
pnpm exec wrangler d1 execute 98ad144a-cfe2-4f19-a55c-c43140279840 --remote --command="SELECT full_name, phone, email, vessel_type_length, passenger_capacity, gear_notes, created_at FROM cast_recover_registrations WHERE event_slug = 'operation-cast-recover-2026' AND registration_type = 'captain' ORDER BY created_at ASC;"
```

## Optional: Save Output to Files

```bash
pnpm exec wrangler d1 execute 98ad144a-cfe2-4f19-a55c-c43140279840 --remote --command="SELECT created_at, registration_type, roster_status, full_name, branch_of_service, phone, email, emergency_contact, tshirt_size, vessel_type_length, passenger_capacity, gear_notes FROM cast_recover_registrations WHERE event_slug = 'operation-cast-recover-2026' ORDER BY created_at DESC;" > /tmp/cast-recover-signups.txt
```

## Operator Notes

- If Wrangler prompts for OAuth, complete login and rerun the command.
- If a fetch/network error occurs, retry once before escalating.
- Keep roster handling private; treat contact data as sensitive operational information.
- This runbook covers retrieval only; data edits should go through approved admin workflows.
