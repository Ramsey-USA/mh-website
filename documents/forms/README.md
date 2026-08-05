# Forms Source Index

This folder is the source tree for the form families used by the document generator.

## What Lives Here

- [forms-manifest.json](./forms-manifest.json) - canonical manifest consumed by the document generator and merge scripts

## Form Source Models

- **Handbook forms (12 active EHB forms + letterhead):** The active employee-handbook forms are
  sourced from DOCX files in `documents/input/08-forms-ehb/` and referenced from the manifest via
  `docxPath`. The shared fillable renderer now builds handbook packages from the new EHB v3 source
  model rather than the retired per-form JSON schema set.
- **MISH forms (25 active safety forms):** The active safety-manual forms are sourced from DOCX
  files in `documents/input/10-forms-mish/` and referenced from the manifest via `docxPath`.
  The shared renderer builds the current safety package set directly from the numbered source model
  instead of the retired 59-form schema and lineage folders.

## Tracking Tips

- Handbook forms: edit the canonical DOCX files in `documents/input/08-forms-ehb/` and keep the
  chapter-to-form associations in `forms-manifest.json` and `employee-handbook.json` aligned.
- MISH forms: edit the canonical DOCX files in `documents/input/10-forms-mish/` and keep
  `forms-manifest.json` aligned with the safety-manual chapter associations.
- The manifest entry needs `docxPath` for both handbook and active MISH forms.
- Keep filenames aligned with the `slug` so generator lookups stay predictable.
- Regenerate a single handbook or MISH form package with:
  `node documents/scripts/generate.mjs --template form-package --form <slug>`

## Related Output

- The generated PDF bundle lives in [documents/downloads/forms](../downloads/forms)
- The merged safety and handbook PDFs are published from [documents/generated-pdfs](../generated-pdfs)

## MISH Source of Truth

- MISH expands to **MH Construction Industrial Safety & Health Program** and serves as MH Construction's branded APP backbone.
- Active chapter content is sourced from `documents/input/04-safety-and-field-ops/mish-manual-v3-0-draft.docx`.
- Active safety forms are sourced from `documents/input/10-forms-mish/`.
