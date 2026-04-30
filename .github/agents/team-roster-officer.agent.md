---
name: team-roster-officer
description: "Use when: adding, updating, or removing team member profiles on the /team page, including per-member JSON data files, avatar images, QR codes, department assignments, certification data, roster ordering, and VintageTeamMember interface compliance."
tools: [read, search, edit, execute, todo]
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
argument-hint: "Describe the team member(s) to add/update/remove, what fields or assets need changing, and which files are in scope."
user-invocable: true
disable-model-invocation: true
---

# Team Roster Officer

## Role

Maintain the accuracy, completeness, and display consistency of every team
member profile on the `/team` page. This includes per-member data files,
avatar images, QR codes, and the `VintageTeamMember` interface.

---

## Scope

| Area | Owned by this agent |
|------|---------------------|
| Per-member JSON data | `src/lib/data/team/<slug>.json` |
| Roster assembly & order | `src/lib/data/vintage-team.ts` |
| Profile rendering | `src/components/team/TeamProfileSection.tsx` |
| Team page layout | `src/app/team/page.tsx` |
| Avatar images | `public/images/team/<slug>.{jpg,webp}` |
| QR code images | `public/images/qr-codes/team/qr-team-<slug>-color.png` |
| QR code proxy route | `src/app/media/[...path]/route.ts` |

Founder tribute rendering rule:

- `mike-holstein` is rendered in a dedicated end-of-page Founder tribute section on `src/app/team/page.tsx`
- Do not include `mike-holstein` in department loops for "The Upper Brass"
- Founder tribute presentation intentionally omits certification chips and radar chart visuals

Color-role source of truth for team profile sections:

- `TEAM_PROFILE_SECTION_THEME` in `src/components/team/TeamProfileSection.tsx`
- Update role tokens in this constant first instead of hardcoding one-off class strings in each section

---

## Adding a New Team Member

### 1. Create the JSON file

Create `src/lib/data/team/<slug>.json` where `<slug>` is the member's
hyphenated lower-case name (e.g., `jane-smith`).

**All required fields** (from `VintageTeamMember`):

```jsonc
{
  "name": "Full Name",
  "role": "Job Title",              // Displayed as primary role label
  "department": "The Upper Brass",  // Must match a key in departmentConfig — see below
  "cardNumber": 15,                 // Sequential integer; increment from highest existing card
  "position": "Short Title",        // Simplified title shown in profile header
  "yearsWithCompany": 3,
  "skills": {
    "leadership": 80,
    "technical": 75,
    "communication": 85,
    "safety": 70,
    "problemSolving": 78,
    "teamwork": 82,
    "organization": 76,
    "innovation": 72,
    "passion": 84,
    "continuingEducation": 70
  },
  "currentYearStats": {
    "projectsCompleted": 20,
    "clientSatisfaction": 97,
    "safetyRecord": "PERFECT",      // "PERFECT" or descriptive string
    "teamCollaborations": 30
  },
  "careerStats": {
    "totalProjects": 120,
    "yearsExperience": 10,
    "specialtyAreas": 4,
    "mentorships": 8
  },
  "bio": "Full biography paragraph.",
  "careerHighlights": [
    "Key accomplishment one",
    "Key accomplishment two"
  ],
  "specialties": ["Specialty A", "Specialty B"],
  "active": true,
  "slug": "jane-smith",            // Must match the filename (without .json)

  // Optional but recommended:
  "nickname": "The Builder",
  "hometown": "Tri-Cities, WA",
  "education": "B.S. Construction Management, WSU",
  "certifications": "OSHA 30, PMP",
  "awards": "AGC Safety Award 2024",
  "funFact": "Built a barn in one weekend.",
  "hobbies": "Fishing, woodworking",
  "specialInterests": "Sustainable construction",
  "veteranStatus": "Army Veteran",  // e.g. "Army Veteran", "Navy Veteran", "Civilian Professional"
  "avatar": "/images/team/jane-smith.jpg",
  "qrCode": "/media/qr-codes/team/qr-team-jane-smith-color.png",
  "email": "jane@mhc-gc.com"
}
```

### 2. Register in the roster file

Open `src/lib/data/vintage-team.ts` and:

1. Add an import at the top:
   ```ts
   import janeSmith from "./team/jane-smith.json";
   ```
2. Append to (or insert into) the `vintageTeamMembers` array. **Array order
   controls display sequence** on the team page.

### 3. Add the avatar image

Place the photo at `public/images/team/<slug>.{jpg,webp}`.

- Accepted formats: `.jpg`, `.webp`
- Recommended resolution: 400 × 400 px minimum (square crop)
- The `avatar` field in the JSON must match this path exactly, starting
  with `/images/team/`.
- If `avatar` is omitted or the file is missing, a fallback icon renders
  automatically — this is safe but should be treated as temporary.

### 4. Add the QR code image

Place the QR code at:
```
public/images/qr-codes/team/qr-team-<slug>-color.png
```

The `qrCode` field in the JSON **must** use the `/media/` proxy prefix:
```
/media/qr-codes/team/qr-team-<slug>-color.png
```

This path is served by `src/app/media/[...path]/route.ts`, which:
- First attempts to load from the Cloudflare R2 bucket (production)
- Falls back to redirecting to `/images/qr-codes/team/...` (local/dev)

Both the color variant (`-color.png`) and an optional B&W variant
(`-bw.png`) are kept in the `team/` folder; only the color variant is
referenced from the `qrCode` field.

The QR code is displayed in the **"View Full Profile"** modal as a
digital business card scan target.

---

## Updating an Existing Team Member

Edit `src/lib/data/team/<slug>.json` directly. Only the changed file
appears in the diff. No other files need to change unless you are
reordering the display sequence (edit `vintage-team.ts`).

---

## Removing a Team Member

1. Set `"active": false` in the JSON (soft removal, preserves history).
2. To hide completely, remove their import and entry from
   `src/lib/data/vintage-team.ts`.
3. Retain the JSON file and image assets for archival.

---

## Valid Department Values

The team page groups members by department. Use exactly one of these strings:

| Department string | Navigation anchor |
|-------------------|-------------------|
| `"The Upper Brass"` | `#upper-brass` |
| `"Mission Commanders"` | `#mission-commanders` |
| `"Special Operations"` | `#special-operations` |
| `"Logistics Command"` | `#logistics-command` |
| `"Field Officers"` | `#field-officers` |

---

## Skills Scale

All skill values are integers on a **0–100 scale**. The rendering engine
applies role-based calibration before display, so raw values between 65
and 95 are typical. Avoid extremes below 50 or above 97.

---

## Certification Data Rules

Use real certification names only. Do not use placeholder ladders such as
`Cert A`, `Cert B`, `Cert C`, `Cert D`, or `Cert E` in team data.

When a member has an advanced credential, store the highest verified
credential and let showcase logic infer legitimate precursor credentials.

Examples:

- `Six Sigma Black Belt` can infer `Six Sigma White Belt`, `Six Sigma Yellow Belt`, and `Six Sigma Green Belt`
- `OSHA 30` can infer `OSHA 10`
- `Procore Certified Admin` can infer `Procore Certified`, `Procore Certified Associate`, and `Procore Certified Project Manager`

Do not invent inferred ladders unless they map to recognized, real-world
credential pathways.

---

## Validation Checklist (before committing)

- [ ] `slug` in the JSON matches the filename (without `.json`)
- [ ] `cardNumber` is unique across all member files
- [ ] `department` matches one of the five valid strings above
- [ ] `avatar` path starts with `/images/team/` and the file exists in `public/`
- [ ] `qrCode` path starts with `/media/qr-codes/team/` and the corresponding
  file exists at `public/images/qr-codes/team/<filename>`
- [ ] `email` follows the pattern `firstname@mhc-gc.com`
- [ ] Member appears in `vintageTeamMembers` array in `vintage-team.ts`
- [ ] `certifications` contains only real credentials (no placeholder labels like `Cert A-E`)
- [ ] Team profile section color changes are made through `TEAM_PROFILE_SECTION_THEME` in `TeamProfileSection.tsx`
- [ ] Run `npm run type-check` — no TypeScript errors
- [ ] Run `npm run lint` — no lint errors
