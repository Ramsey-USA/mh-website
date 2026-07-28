# Employee Handbook Forms — Developing Specs

This folder holds the **individual, editable source files** for each MH Construction, Inc.
Employee Handbook form. Each form has two files:

Handbook-associated outputs here total 9 artifacts: 8 fillable forms plus the letterhead companion.

| File          | Role                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<slug>.json` | **Authoritative** fillable schema rendered by the shared form engine (same engine as the MISH safety forms). Edit this to change fields, layout, or content. |
| `<slug>.md`   | **Developing spec** — human-readable notes: purpose, chapter alignment, and field inventory. Keep in sync with the JSON.                                     |

## How forms are produced

1. `documents/forms/forms-manifest.json` references each form's schema via `fillableFile`.
2. `documents/scripts/generate.mjs` (`loadFormsManifest`) loads the schema into `form.fillable.pages`.
3. The shared fillable engine (`getFillablePages` → `renderSheet`) renders branded, AcroForm
   fillable PDFs with the canonical MH cover, header/footer chrome, and QR code.
4. `node documents/scripts/generate.mjs --manual employee-handbook --template form-packages`
   regenerates handbook form packages.
5. `node documents/scripts/generate.mjs --manual employee-handbook --template form-publish`
   publishes refreshed handbook form packages to `public/docs/employee/forms/`.

## Schema section types

`fieldGrid` (labeled fill-in fields) · `checkGrid` (checkboxes) · `narrative` (multi-line area) ·
`dataTable` (itemized rows) · `htmlBlock` (prose) · `refNote` (callout) ·
`signatures` (manual sign-off — always `"manualSignOnly": true` for handbook forms).

## Chapter alignment (9-chapter handbook)

Semantic TOC lettering system used in handbook outputs:

- `FORM CV` Company Vehicle
- `FORM RA` Receipt Acknowledgment
- `FORM SP` Safety Policy
- `FORM WH` Remote Work
- `FORM CE` Computer & Electronics
- `FORM EP` Employee Photo
- `FORM CP` Client Photo
- `FORM GE` General Expense
- `FORM LH` Letterhead

| Form                | TOC Code | Title                                                | Chapter                             |
| ------------------- | -------- | ---------------------------------------------------- | ----------------------------------- |
| HANDBOOK-FORM-01    | FORM CV  | Company Vehicle Policies & Procedures Acknowledgment | 7 · Technology & Data Use           |
| HANDBOOK-FORM-02    | FORM RA  | Employee Handbook Receipt Acknowledgment             | 1 · Introduction & Company Overview |
| HANDBOOK-FORM-03    | FORM SP  | Employee Safety Policy Acknowledgment                | 6 · Health, Safety, & Security      |
| HANDBOOK-FORM-04    | FORM WH  | Temporary Remote Work Application/Agreement          | 7 · Technology & Data Use           |
| HANDBOOK-FORM-05    | FORM CE  | Computer and Electronics Use Agreement               | 7 · Technology & Data Use           |
| HANDBOOK-FORM-06    | FORM EP  | Employee Photo Release Form                          | 7 · Technology & Data Use           |
| HANDBOOK-FORM-07    | FORM CP  | Client Photo Release Form                            | 7 · Technology & Data Use           |
| HANDBOOK-FORM-08    | FORM GE  | Purchase Approval General Expense                    | 3 · Compensation & Benefits         |
| HANDBOOK-LETTERHEAD | FORM LH  | MH Construction Company Letterhead                   | 1 · Introduction & Company Overview |

## Status

- Rev 4.0 handbook-to-form chapter alignment confirmed and standardized on 2026-07-28.
- Handbook form titles now use consistent "Acknowledgment" spelling in display text.
- Legacy slug/file names containing `acknowledgement` or `work-from-home` are intentionally
  retained for compatibility with existing links and download paths.
