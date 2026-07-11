# Employee Handbook Forms — Developing Specs

This folder holds the **individual, editable source files** for each MH Construction, Inc.
Employee Handbook form. Each form has two files:

| File          | Role                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<slug>.json` | **Authoritative** fillable schema rendered by the shared form engine (same engine as the MISH safety forms). Edit this to change fields, layout, or content. |
| `<slug>.md`   | **Developing spec** — human-readable notes: purpose, chapter alignment, and field inventory. Keep in sync with the JSON.                                     |

## How forms are produced

1. `documents/forms/forms-manifest.json` references each form's schema via `fillableFile`.
2. `documents/scripts/generate.mjs` (`loadFormsManifest`) loads the schema into `form.fillable.pages`.
3. The shared fillable engine (`getFillablePages` → `renderSheet`) renders branded, AcroForm
   fillable PDFs with the canonical MH cover, header/footer chrome, and QR code.
4. `npm run docs:generate:handbook` regenerates every handbook form package.

## Schema section types

`fieldGrid` (labeled fill-in fields) · `checkGrid` (checkboxes) · `narrative` (multi-line area) ·
`dataTable` (itemized rows) · `htmlBlock` (prose) · `refNote` (callout) ·
`signatures` (manual sign-off — always `"manualSignOnly": true` for handbook forms).

## Chapter alignment (9-chapter handbook)

| Form             | Title                                                 | Chapter                             |
| ---------------- | ----------------------------------------------------- | ----------------------------------- |
| HANDBOOK-FORM-01 | Company Vehicle Policies & Procedures Acknowledgement | 7 · Technology & Data Use           |
| HANDBOOK-FORM-02 | Employee Handbook Receipt Acknowledgment              | 1 · Introduction & Company Overview |
| HANDBOOK-FORM-03 | Employee Safety Policy Acknowledgement                | 6 · Health, Safety, & Security      |
| HANDBOOK-FORM-04 | Temporary Work From Home Application/Agreement        | 7 · Technology & Data Use           |
| HANDBOOK-FORM-05 | Computer & Electronics Use Policy Acknowledgment      | 7 · Technology & Data Use           |
| HANDBOOK-FORM-06 | Employee Photo Release Form                           | 7 · Technology & Data Use           |
| HANDBOOK-FORM-07 | Client Photo Release Form                             | 7 · Technology & Data Use           |
| HANDBOOK-FORM-08 | Purchase Approval General Expense                     | 3 · Compensation & Benefits         |
