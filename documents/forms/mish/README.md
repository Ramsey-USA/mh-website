# MISH Forms - Developing Specs

This folder holds the individual, editable source files for each MISH safety form.

Each form has two files:

- `<slug>.json`: Authoritative fillable schema rendered by the shared form engine. Edit this to change fields, layout, and content.
- `<slug>.md`: Developing spec with intent, ownership, and alignment notes. Keep it in sync with the JSON schema.

## How forms are produced

1. `documents/forms/forms-manifest.json` references each MISH schema via `fillableFile`.
2. `documents/scripts/generate.mjs` (`loadFormsManifest`) loads schema content into `form.fillable.pages`.
3. The shared fillable pipeline (`getFillablePages -> renderSheet`) renders branded, AcroForm-ready fillable PDFs.
4. `pnpm --filter @mhc/website run docs:generate:forms` regenerates all safety and handbook form packages.

## MISH source lineage

- DOCX source files remain in `documents/forms/MHC-MISH-47-Forms/` for source lineage.
- To re-bootstrap schema/spec files from legacy defaults, run:
  `pnpm --filter @mhc/website run docs:migrate:mish:fillable`
