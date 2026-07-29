# Forms Source Index

This folder is the source tree for the form families used by the document generator.

## What Lives Here

- [forms-manifest.json](./forms-manifest.json) - canonical manifest consumed by the document generator and merge scripts
- [handbook/](./handbook/) - employee handbook forms: one editable **fillable schema** (`.json`) and one **developing spec** (`.md`) per form
- [mish/](./mish/) - MISH safety forms: one editable **fillable schema** (`.json`) and one **developing spec** (`.md`) per form
- [MHC-MISH-59-Forms/](./MHC-MISH-59-Forms/) - safety form DOCX sources for the MISH series

## Form Source Models

- **Handbook forms (9):** Eight fillable schemas plus the handbook letterhead artifact are defined
  by individual, git-trackable files under `handbook/<slug>.json` (referenced from the manifest via
  `fillableFile`). The shared fillable engine renders the schemas into AcroForm PDFs, so every
  handbook form is fillable by construction. A companion `handbook/<slug>.md` documents the fields
  and intent for ongoing editing.
- **MISH forms (59):** Each form is defined by an individual, git-trackable fillable schema in
  `mish/<slug>.json` (referenced from the manifest via `fillableFile`) and rendered by the same
  shared fillable engine used for handbook forms. DOCX sources under `MHC-MISH-59-Forms/` remain
  as source lineage and can be used to re-bootstrap schema scaffolds when needed.

## Tracking Tips

- Handbook forms: edit the per-form `handbook/<slug>.json` schema (and keep the `.md` spec in sync).
- MISH forms: edit the per-form `mish/<slug>.json` schema (and keep the `.md` spec in sync).
- The manifest entry only needs `fillableFile` pointing at the schema.
- Keep filenames aligned with the `slug` so generator lookups stay predictable.
- Regenerate a single handbook or MISH form package with:
  `node documents/scripts/generate.mjs --template form-package --form <slug>`
- Bootstrap MISH schema/spec files from existing manifest + DOCX-backed defaults with:
  `pnpm --filter @mhc/website run docs:migrate:mish:fillable`

## Related Output

- The generated PDF bundle lives in [documents/downloads/forms](../downloads/forms)
- The merged safety and handbook PDFs are published from [documents/generated-pdfs](../generated-pdfs)

## MISH 5.0 Source of Truth

- Authoring baseline for APP structure: `documents/content/MHC-MISH-APP-59-Sections/Dean Thoemke-AGC-APP development.docx`.
- Apply the guide's Policy -> Procedure -> Task hierarchy when updating MISH form language and associated acknowledgments.
- MISH expands to **MH Construction Industrial Safety & Health Program** and serves as MH Construction's branded APP backbone.
- Project-specific SSSPs must inherit MISH controls and be uniquely authored per project conditions and scope.
