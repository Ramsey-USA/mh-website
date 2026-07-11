# Forms Source Index

This folder is the source tree for the form families used by the document generator.

## What Lives Here

- [forms-manifest.json](./forms-manifest.json) - canonical manifest consumed by the document generator and merge scripts
- [handbook/](./handbook/) - employee handbook forms: one editable **fillable schema** (`.json`) and one **developing spec** (`.md`) per form
- [MHC-MISH-47-Forms/](./MHC-MISH-47-Forms/) - safety form DOCX sources for the MISH series

## Form Source Models

- **Handbook forms (8):** Each form is defined by an individual, git-trackable fillable schema in
  `handbook/<slug>.json` (referenced from the manifest via `fillableFile`). The shared fillable
  engine renders these into AcroForm PDFs, so every handbook form is fillable by construction. A
  companion `handbook/<slug>.md` documents the fields and intent for ongoing editing.
- **MISH forms (50):** Defined via manifest entries with DOCX sources under `MHC-MISH-47-Forms/`.

## Tracking Tips

- Handbook forms: edit the per-form `handbook/<slug>.json` schema (and keep the `.md` spec in sync).
  The manifest entry only needs `fillableFile` pointing at the schema.
- Keep filenames aligned with the `slug` so generator lookups stay predictable.
- Regenerate a single handbook form with:
  `node documents/scripts/generate.mjs --template form-package --form <slug>`

## Related Output

- The generated PDF bundle lives in [documents/downloads/forms](../downloads/forms)
- The merged safety and handbook PDFs are published from [documents/generated-pdfs](../generated-pdfs)
