# Forms Source Index

This folder is the source tree for the DOCX-backed form families used by the document generator.

## What Lives Here

- [forms-manifest.json](./forms-manifest.json) - canonical manifest consumed by the document generator and merge scripts
- [MHC-MISH-47-Forms/](./MHC-MISH-47-Forms/) - safety form DOCX sources for the MISH series
- [MHC-HANDBOOK-FORMS/](./MHC-HANDBOOK-FORMS/) - employee handbook form DOCX sources
- HTML form source templates such as [form-client-photo-release.html](./form-client-photo-release.html) and [form-employee-photo-release.html](./form-employee-photo-release.html)

## Folder Summary

- **MISH forms:** 50 manifest entries, with the DOCX source files organized under `MHC-MISH-47-Forms/`
- **Handbook forms:** 8 manifest entries, with the DOCX source files organized under `MHC-HANDBOOK-FORMS/`

## Tracking Tips

- Add or update form metadata in [forms-manifest.json](./forms-manifest.json) first.
- Keep the DOCX filename aligned with the `slug` so generator lookups stay predictable.
- Use the manifest to confirm which form family a source belongs to before moving files between folders.

## Related Output

- The generated PDF bundle lives in [documents/downloads/forms](../downloads/forms)
- The merged safety and handbook PDFs are published from [documents/generated-pdfs](../generated-pdfs)
