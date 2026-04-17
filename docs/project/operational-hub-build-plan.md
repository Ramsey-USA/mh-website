# MH Operational Hub — Build Plan

**Project:** Replace `/safety/hub` with a unified `/hub` route covering Safety, Employee Manual, and Employee Joining Program — with 4-role authentication, full access tracking + notifications to Matt, and a Spanish language toggle.

**Status key:** ⬜ Not started · 🔄 In progress · ✅ Done · ⚠️ Blocked (needs content/input)

---

## Prerequisites (Required Before Build)

| #   | Item                                                                                       | Owner         | Status |
| --- | ------------------------------------------------------------------------------------------ | ------------- | ------ |
| P1  | Employee Manual sections formatted as JSON (`DocumentSection[]`) or uploaded as PDFs to R2 | Matt / Jeremy | ⚠️     |
| P2  | Travelers training video URLs from Travelers account                                       | Matt / Jeremy | ⚠️     |
| P3  | Confirm: SMS for logins only, email for in-session activity? (vs. SMS for all events)      | Matt          | ⚠️     |
| P4  | Confirm: "Staff Access" footer link vs. main nav "Hub" entry                               | Matt / Jeremy | ⚠️     |

---

## Roles & Credentials

| Role             | Who                            | Login Method           | Env Var                                                                                                     |
| ---------------- | ------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `admin`          | Matt, Jeremy, Arnold, Brittney | Email + password       | Existing `ADMIN_MATT_PASSWORD`, `ADMIN_JEREMY_PASSWORD`, `ADMIN_ARNOLD_PASSWORD`, `ADMIN_BRITTNEY_PASSWORD` |
| `superintendent` | Field Superintendents          | Name + shared passcode | Existing `FIELD_STAFF_PASSWORD`                                                                             |
| `worker`         | Employees / field workers      | Shared passcode only   | **New** `WORKER_PASSWORD`                                                                                   |
| `traveler`       | Travelers Insurance auditors   | Shared passcode only   | **New** `TRAVELERS_PASSWORD`                                                                                |

---

## Access Matrix

| Feature                    | admin | superintendent | worker | traveler        |
| -------------------------- | ----- | -------------- | ------ | --------------- |
| Safety Manual — read       | ✅    | ✅             | ✅     | ✅              |
| Safety Forms — submit      | ✅    | ✅             | ✅     | ❌ audit notice |
| Safety Form History        | ✅    | ✅             | ❌     | ❌              |
| Safety Stat Cards + Alerts | ✅    | ✅             | ❌     | ❌              |
| Job Selector               | ✅    | ✅             | ✅     | ❌              |
| Employee Manual — read     | ✅    | ✅             | ✅     | ❌              |
| Employee Joining Program   | ✅    | ✅             | ✅     | ❌              |
| Travelers Training Videos  | ✅    | ✅             | ✅     | ✅              |
| Admin Dashboard            | ✅    | ❌             | ❌     | ❌              |

---

## Stream 1 — 4-Role Auth System

### Phase 1 — Worker Login API ⬜

**Create** `src/app/api/auth/worker-login/route.ts`

Pattern: exact mirror of `src/app/api/auth/field-login/route.ts`

- `export const dynamic = "force-dynamic"`
- Reads `WORKER_PASSWORD` env var; throws in production if missing; returns `"dev-placeholder-worker-password"` in dev
- Timing-safe HMAC comparison (copy `timingSafeEqual` from field-login)
- JWT: `generateTokenPair({ uid: \`worker-${Date.now()}\`, role: "worker", name: "Field Worker" })`
- Response: `{ success: true, accessToken, user: { uid, name, role }, expiresIn: 900 }`
- Cookie: `mh_worker_refresh_token` — httpOnly, secure in production, sameSite strict, path `/api/auth`, maxAge 86400
- Rate limit: `rateLimit(rateLimitPresets.strict)(handler)` — 3 attempts / 5 min
- No `name` field accepted (passcode only)

### Phase 2 — Traveler Login API ⬜

**Create** `src/app/api/auth/traveler-login/route.ts`

Same structure as Phase 1 with:

- Reads `TRAVELERS_PASSWORD` env var
- JWT role `"traveler"`, name `"Travelers Insurance"`
- Cookie name: `mh_traveler_refresh_token`

### Phase 3 — 4-Card Role Selector Login UI ⬜

**Update** `src/app/safety/hub/SafetyHubClient.tsx`

Replace `PasscodeGate` component with a 2-step component `RoleGate`:

**Step 1 — Role selector screen (4 cards):**

| Card             | Icon                   | Label                   | Sub-label                                     |
| ---------------- | ---------------------- | ----------------------- | --------------------------------------------- |
| `admin`          | `admin_panel_settings` | Admin / Office Staff    | Matt · Jeremy · Arnold · Brittney             |
| `superintendent` | `engineering`          | Field Superintendent    | Site access — Toolbox Talks, JHA, Inspections |
| `worker`         | `construction`         | Employee / Field Worker | Submit forms · Read safety manual             |
| `traveler`       | `verified_user`        | Travelers Insurance     | Auditor access                                |

**Step 2 — Credential form per role:**

| Role             | Fields           | Endpoint                        |
| ---------------- | ---------------- | ------------------------------- |
| `admin`          | Email + Password | `POST /api/auth/admin-login`    |
| `superintendent` | Name + Passcode  | `POST /api/auth/field-login`    |
| `worker`         | Passcode only    | `POST /api/auth/worker-login`   |
| `traveler`       | Passcode only    | `POST /api/auth/traveler-login` |

- All forms: back button → returns to Step 1
- On success: `localStorage.setItem("field_auth_token", accessToken)` + `localStorage.setItem("field_user", JSON.stringify(user))` — **same keys as today, no breaking change**
- Admin login response shape differs (`admin_token` / `admin_user`) — use those keys for admin path and redirect to `/dashboard`

### Phase 4 — Role-Based Hub Rendering ⬜

**Update** `SafetyHub` component in `src/app/safety/hub/SafetyHubClient.tsx`

Gate on `user.role`:

```ts
const isAdminOrSuper = user.role === "admin" || user.role === "superintendent";
const canSubmitForms = user.role !== "traveler";
const showJobSelector = user.role !== "traveler";
```

- **History tab nav item**: render only if `isAdminOrSuper`
- **Stat cards (`StatCard` grid)**: render only if `isAdminOrSuper`
- **Outstanding items banner**: render only if `isAdminOrSuper`
- **Job selector** in header: render only if `showJobSelector`
- **Forms tab — interactive submit UI**: render if `canSubmitForms`; otherwise render a read-only notice:
  ```
  "Travelers Insurance — Auditor View
   Forms are submitted by field staff. Contact Jeremy at (509) 308-6489 for submission records."
  ```
- **Employee Manual tab** (Phase 13): render only if `user.role !== "traveler"`
- **Joining Program tab** (Phase 13): render only if `user.role !== "traveler"`

---

## Stream 2 — Access Tracking & Notifications

### Phase 5 — Access Log DB Migration ⬜

**Create** `migrations/0014_create_safety_access_log.sql`

```sql
CREATE TABLE IF NOT EXISTS safety_access_log (
  id            TEXT PRIMARY KEY,
  event_type    TEXT NOT NULL CHECK (event_type IN (
                  'login','logout','download','form_view',
                  'form_submit','manual_view','joining_view')),
  role          TEXT NOT NULL,
  user_name     TEXT NOT NULL,
  resource_key  TEXT,
  resource_title TEXT,
  job_id        TEXT,
  ip_address    TEXT,
  user_agent    TEXT,
  accessed_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_access_log_event_type   ON safety_access_log(event_type);
CREATE INDEX IF NOT EXISTS idx_access_log_role          ON safety_access_log(role);
CREATE INDEX IF NOT EXISTS idx_access_log_accessed_at   ON safety_access_log(accessed_at);
CREATE INDEX IF NOT EXISTS idx_access_log_user_name     ON safety_access_log(user_name);
```

### Phase 6 — Access Log API ⬜

**Create** `src/app/api/safety/access-log/route.ts`

**`POST /api/safety/access-log`** — any valid JWT role

Request body:

```ts
{
  event_type: "login" | "logout" | "download" | "form_view" | "form_submit" | "manual_view" | "joining_view";
  resource_key?: string;   // section slug, form type, video id
  resource_title?: string;
  job_id?: string;
}
```

Handler steps:

1. Verify JWT from `Authorization: Bearer <token>` header
2. Extract `ip_address` from `request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For") ?? "unknown"`
3. Extract `user_agent` from `request.headers.get("User-Agent") ?? "unknown"`
4. Insert row into `safety_access_log` with `id = crypto.randomUUID()`
5. Fire notifications (non-blocking — `void Promise.allSettled([...])`):
   - SMS: `alertMatt(\`[MH Hub] ${user.name} (${user.role}) — ${event_type}${resource_title ? ": " + resource_title : ""} | IP: ${ip_address}\`)`
   - Email: `sendEmail({ to: "matt@mhc-gc.com", subject: "Hub Access: " + event_type, html: <detailed table> })`
6. Return `{ success: true }`
7. On DB error: log + return `internalServerError()`

**`GET /api/safety/access-log`** — `requireRole(["admin"])` only

Query params: `role?`, `event_type?`, `from_date?` (ISO), `to_date?` (ISO), `limit?` (default 500)

Returns: `{ data: AccessLogRow[], total: number }`

### Phase 7 — Login Event Logging (Server-Side) ⬜

**Update** all 4 login routes — after successful authentication and before returning the response, insert a `login` event:

```ts
// After successful auth, before return:
void logAccessEvent(request, {
  event_type: "login",
  role: jwtRole,
  user_name: resolvedName,
  resource_key: "login",
  resource_title: `${resolvedName} logged in`,
});
```

Extract into a shared helper `src/lib/safety/log-access-event.ts`:

```ts
export async function logAccessEvent(
  request: NextRequest,
  payload: {
    event_type: string;
    role: string;
    user_name: string;
    resource_key?: string;
    resource_title?: string;
    job_id?: string;
  },
): Promise<void>;
```

This helper directly inserts into D1 (bypassing the HTTP route) for reliability on login — and fires SMS + email via the same notification pattern as Phase 6.

Files to update:

- `src/app/api/auth/admin-login/route.ts`
- `src/app/api/auth/field-login/route.ts`
- `src/app/api/auth/worker-login/route.ts` _(new — Phase 1)_
- `src/app/api/auth/traveler-login/route.ts` _(new — Phase 2)_

### Phase 8 — Client-Side Tracking in Hub ⬜

**Update** `src/app/safety/hub/SafetyHubClient.tsx` (and later `HubClient.tsx`)

Add a `logAccess` helper (fire-and-forget):

```ts
function logAccess(payload: {
  event_type: string;
  resource_key?: string;
  resource_title?: string;
  job_id?: string;
}) {
  void fetch("/api/safety/access-log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}
```

Call sites:

- Tab switches → `useEffect` on `activeSection`:
  - `"forms"` → `logAccess({ event_type: "form_view", resource_key: activeFormType })`
  - `"downloads"` → `logAccess({ event_type: "download", resource_key: "downloads-tab" })`
- Inside `logDownload()` (existing function) → add `logAccess({ event_type: "download", resource_key: sectionKey, resource_title: sectionTitle })`
- Form submit success callback → `logAccess({ event_type: "form_submit", resource_key: activeFormType, job_id: selectedJobId })`
- Employee Manual section open → `logAccess({ event_type: "manual_view", resource_key: sectionSlug })`
- Joining Program open → `logAccess({ event_type: "joining_view", resource_key: "joining-program" })`

### Phase 9 — Extend Download Log Roles ⬜

**Update** `src/app/api/safety/downloads/route.ts`

Change POST `requireRole` call from `["admin", "superintendent"]` to `["admin", "superintendent", "worker", "traveler"]`.

### Phase 10 — Access Log Dashboard Tab ⬜

**Create** `src/app/dashboard/AccessLogTab.tsx`

Table columns:
| Column | Source | Notes |
|---|---|---|
| Time | `accessed_at` | Full timestamp, sort descending |
| Name | `user_name` | |
| Role | `role` | Color-coded badge (see below) |
| Event | `event_type` | Human-readable label |
| Resource | `resource_title ?? resource_key` | |
| IP Address | `ip_address` | |
| Device / Browser | `user_agent` | Parse to short string: `Chrome / macOS` |

Role badge colors:

- `admin` → `bg-brand-primary text-white`
- `superintendent` → `bg-blue-600 text-white`
- `worker` → `bg-green-600 text-white`
- `traveler` → `bg-amber-500 text-white`

Features:

- Filter bar: Role dropdown + Event Type dropdown + Date range (from/to)
- Auto-refresh every 30 seconds (`setInterval` in `useEffect`, clear on unmount)
- Fetch: `GET /api/safety/access-log` with filters as query params
- Loading skeleton (matches SafetyTab pattern)
- Empty state: "No access events yet"

**Update** `src/app/dashboard/page.tsx`

1. Add `"access-log"` to the `activeTab` type union:
   ```ts
   useState<"analytics" | "leads" | "safety" | "drivers" | "access-log">;
   ```
2. Add `AccessLogTab` to dynamic imports (same pattern as `SafetyTab`)
3. Add tab nav button "Access Log" with icon `verified_user`
4. Render `<AccessLogTab token={adminToken} />` when `activeTab === "access-log"`

---

## Stream 3 — Operational Hub at /hub

### Phase 11 — Expand Document Data Model ⬜

**Update** `src/lib/data/documents.ts`

1. Extend `DocumentEntry.category` type:

   ```ts
   category: "manual" | "form" | "employee-manual" | "joining-program";
   ```

2. Add export arrays (placeholder entries until P1 content is delivered):

   ```ts
   export const employeeManualSections: DocumentEntry[]; // populated from Employee Manual content
   export const joiningProgramDocs: DocumentEntry[]; // welcome packet + HR forms
   ```

3. Add combined export:
   ```ts
   export const allHubDocuments = [
     ...manuals,
     ...forms,
     ...employeeManualSections,
     ...joiningProgramDocs,
   ];
   ```

> ⚠️ **Blocked on P1** — Employee Manual section content required from Matt/Jeremy before this can be fully populated.

### Phase 12 — Travelers Training Video Data ⬜

**Create** `src/lib/data/travelers-training.ts`

```ts
export interface TravelersVideo {
  id: string;
  title: string;
  description: string;
  url: string; // External Travelers-provided link
  category: "safety" | "compliance" | "new-employee" | "equipment";
  duration?: string; // e.g. "12 min"
}

export const travelersVideos: TravelersVideo[] = [
  // Placeholder — URLs to be supplied by Matt/Jeremy (Prerequisite P2)
  {
    id: "tv-placeholder-1",
    title: "Coming Soon",
    description: "Travelers training videos will appear here.",
    url: "#",
    category: "safety",
  },
];
```

> ⚠️ **Blocked on P2** — Video URLs required from Matt/Jeremy.

### Phase 13 — New /hub Route ⬜

**Create** `src/app/hub/layout.tsx`:

```ts
export const metadata = {
  title: "Operational Hub | MH Construction",
  description:
    "Restricted staff portal — safety, employee resources, and onboarding.",
  robots: { index: false, follow: false },
};
```

**Create** `src/app/hub/page.tsx`:

- Server component
- Passes `allHubDocuments` + `travelersVideos` to `HubClient`

**Create** `src/app/hub/HubClient.tsx`:

- Move all logic from `SafetyHubClient.tsx` into this file
- Extend with new top-level nav tabs (in addition to existing `downloads | forms | history`):

| Tab ID            | Label           | Icon                | Roles                         |
| ----------------- | --------------- | ------------------- | ----------------------------- |
| `safety`          | Safety          | `health_and_safety` | All                           |
| `employee-manual` | Employee Manual | `menu_book`         | admin, superintendent, worker |
| `joining-program` | Joining Program | `person_add`        | admin, superintendent, worker |
| `history`         | History         | `history`           | admin, superintendent         |

**Safety tab** (existing functionality, unchanged):

- Section browser + section/form downloads
- Toolbox Talk, JHA, Site Inspection, Incident Report forms
- History sub-tab (admin + super only within Safety)

**Employee Manual tab** — read-only:

- Uses same `SectionBrowser` component as Safety
- Sections from `employeeManualSections`
- No form submission, download-only

**Joining Program tab:**

- Welcome Packet: download card for welcome PDF
- Required HR Forms: download cards (W-4, I-9, direct deposit, etc.)
- Travelers Training Videos: card grid
  ```
  ┌─────────────────────────────┐
  │ [Category badge]            │
  │ Video Title                 │
  │ Short description           │
  │ Duration pill               │
  │ [Watch Video →]             │  (opens in new tab, rel="noopener noreferrer")
  └─────────────────────────────┘
  ```
- Travelers logo + contact block at bottom

### Phase 14 — /safety/hub Backward Compat Redirect ⬜

**Update** `src/app/safety/hub/page.tsx`:

```ts
import { redirect } from "next/navigation";

export default function SafetyHubPage() {
  redirect("/hub");
}
```

Remove the `getDocumentById` call and `SafetyHubClient` import (no longer needed in this file).

### Phase 15 — Navigation Entry ⬜

**Update** `src/components/layout/Navigation.tsx`

> ⚠️ **Blocked on P4** — Confirm placement: main nav "Staff Hub" item vs. subtle footer link.

Recommended (pending confirmation): Add a low-key "Staff Access" link in the footer section of the nav, below the main links. This keeps the public nav clean while remaining discoverable to staff.

---

## Stream 4 — Spanish Language Toggle

### Phase 16 — i18n Infrastructure ⬜

**Install:**

```bash
npm install next-intl
```

**Update** `next.config.js`:

```js
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
module.exports = withNextIntl(existingConfig);
```

**Create** `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const locale = (await cookies()).get("locale")?.value ?? "en";
  const validLocale = ["en", "es"].includes(locale) ? locale : "en";
  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
```

**Strategy: Cookie-based locale — no URL changes.**
Existing routes (`/hub`, `/safety`, etc.) stay unchanged. The locale is read from a `locale` cookie set by the toggle. `next-intl` falls back to English for any untranslated keys.

### Phase 17 — Translation Files ⬜

**Create** `messages/en.json` — all hub/safety UI strings (English source of truth):

Top-level keys:

```json
{
  "hub": { "tabs": {}, "login": {}, "roleSelector": {} },
  "safety": { "tabs": {}, "forms": {}, "downloads": {} },
  "employeeManual": { "title": "", "description": "" },
  "joiningProgram": { "title": "", "sections": {} },
  "travelers": { "videos": {}, "contact": {} },
  "common": { "signIn": "", "back": "", "logout": "", "loading": "" }
}
```

**Create** `messages/es.json` — Spanish translations for all keys in `en.json`.

Pages not yet in scope (all other public pages) remain English-only; `next-intl`'s fallback handles missing keys gracefully.

### Phase 18 — Language Toggle Component ⬜

**Create** `src/components/ui/LanguageToggle.tsx`:

```tsx
"use client";
// EN | ES pill toggle
// Sets "locale" cookie → triggers server re-render with new locale
// Uses router.refresh() to re-render without full navigation
```

- Reads current locale from `useLocale()` (next-intl hook)
- On click: `document.cookie = "locale=es; path=/; max-age=31536000"` + `router.refresh()`
- Style: small pill — `EN · ES` with active locale underlined/bold
- Renders in the hub header and in the global nav

**Update** `src/components/layout/Navigation.tsx`:

- Import and render `<LanguageToggle />` on the right side of the nav bar, beside the mobile menu button
- Wrap in `<Suspense>` to avoid blocking nav hydration

---

## Verification Checklist

### Auth

- [ ] `/hub` shows 4-card role selector
- [ ] Admin path: email + password → full hub + admin dashboard link
- [ ] Superintendent path: name + passcode → full hub (all tabs + stat cards)
- [ ] Worker path: passcode only → Safety + Employee Manual + Joining Program; no History tab, no stat cards
- [ ] Traveler path: passcode only → Safety (read-only forms notice) + Travelers videos; no Employee Manual, no Joining Program
- [ ] Wrong passcode: 401 returned, 3rd attempt triggers 5-min lockout
- [ ] JWT `role` field correct for all 4 paths
- [ ] `/safety/hub` redirects to `/hub`

### Access Tracking

- [ ] Login event inserted into `safety_access_log` on successful auth (all 4 paths)
- [ ] Matt receives SMS and email on login (check Twilio + Resend logs)
- [ ] Tab switch to Forms → `form_view` event in access log
- [ ] File download → `download` event in access log with correct `resource_key`
- [ ] Form submit → `form_submit` event with correct `form_type` and `job_id`
- [ ] Employee Manual open → `manual_view` event
- [ ] Joining Program open → `joining_view` event

### Dashboard

- [ ] "Access Log" 5th tab appears in admin dashboard
- [ ] Table renders with correct role color badges
- [ ] IP address and device/browser columns populated
- [ ] Filters (role, event type, date range) work
- [ ] Auto-refresh fires every 30 seconds

### Operational Hub

- [ ] Safety tab: all existing functionality intact
- [ ] Employee Manual tab: sections browsable, PDFs downloadable
- [ ] Joining Program tab: welcome docs, HR forms, Travelers video grid visible
- [ ] Travelers video cards link to correct external URLs (open in new tab)
- [ ] History tab: visible only to admin + super

### Spanish Toggle

- [ ] EN | ES toggle appears in nav
- [ ] Selecting ES re-renders hub content in Spanish
- [ ] Locale persists across page navigation (cookie survives)
- [ ] Non-hub pages remain in English (graceful fallback)

---

## New Files Summary

| File                                           | Type      | Purpose                                                 |
| ---------------------------------------------- | --------- | ------------------------------------------------------- |
| `src/app/api/auth/worker-login/route.ts`       | API route | Worker shared-passcode authentication                   |
| `src/app/api/auth/traveler-login/route.ts`     | API route | Traveler shared-passcode authentication                 |
| `src/app/api/safety/access-log/route.ts`       | API route | Access event log — write + admin read                   |
| `src/lib/safety/log-access-event.ts`           | Utility   | Shared server-side access logging + notification helper |
| `migrations/0014_create_safety_access_log.sql` | Migration | `safety_access_log` table                               |
| `src/app/hub/layout.tsx`                       | Layout    | Hub route metadata (no-index)                           |
| `src/app/hub/page.tsx`                         | Page      | Hub server component                                    |
| `src/app/hub/HubClient.tsx`                    | Client    | Unified hub UI (all 4 roles)                            |
| `src/lib/data/travelers-training.ts`           | Data      | Travelers training video definitions                    |
| `src/app/dashboard/AccessLogTab.tsx`           | Component | Admin dashboard access log tab                          |
| `src/components/ui/LanguageToggle.tsx`         | Component | EN/ES cookie-based locale toggle                        |
| `messages/en.json`                             | i18n      | English strings (hub + safety scope)                    |
| `messages/es.json`                             | i18n      | Spanish translations                                    |
| `src/i18n/request.ts`                          | Config    | next-intl locale resolution                             |

## Modified Files Summary

| File                                     | Change                                                        |
| ---------------------------------------- | ------------------------------------------------------------- |
| `src/app/safety/hub/page.tsx`            | Replace with `redirect("/hub")`                               |
| `src/app/safety/hub/SafetyHubClient.tsx` | Replace `PasscodeGate` with `RoleGate` (2-step)               |
| `src/app/api/auth/admin-login/route.ts`  | Add login event logging via `logAccessEvent`                  |
| `src/app/api/auth/field-login/route.ts`  | Add login event logging via `logAccessEvent`                  |
| `src/app/api/safety/downloads/route.ts`  | Extend POST `requireRole` to all 4 roles                      |
| `src/app/dashboard/page.tsx`             | Add "Access Log" 5th tab                                      |
| `src/lib/data/documents.ts`              | Add `employee-manual` / `joining-program` categories + arrays |
| `src/components/layout/Navigation.tsx`   | Add Hub nav link + `<LanguageToggle />`                       |
| `next.config.js`                         | Wrap with `createNextIntlPlugin`                              |
| `wrangler.toml`                          | Add `WORKER_PASSWORD` + `TRAVELERS_PASSWORD` comment stubs    |

---

## Environment Variables Required

```bash
# Existing — must be set
FIELD_STAFF_PASSWORD=       # Superintendent shared passcode
ADMIN_MATT_PASSWORD=
ADMIN_JEREMY_PASSWORD=
ADMIN_ARNOLD_PASSWORD=
ADMIN_BRITTNEY_PASSWORD=
RESEND_API_KEY=             # Email notifications
TWILIO_ACCOUNT_SID=         # SMS notifications
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
JWT_SECRET=                 # ≥32 characters

# New — must be added to Cloudflare Workers secrets
WORKER_PASSWORD=            # Shared passcode for all employees/field workers
TRAVELERS_PASSWORD=         # Shared passcode for Travelers Insurance auditors
```
