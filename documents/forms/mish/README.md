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

- DOCX source files remain in `documents/forms/MHC-MISH-59-Forms/` for source lineage.
- For MISH 51-59, the manifest now points to the chapter-named DOCX lineage files under that folder so the source folder matches the current chapter set.
- Structural source-of-truth for MISH 5.0 authoring remains `documents/content/MHC-MISH-APP-59-Sections/Dean Thoemke-AGC-APP development.docx`.
- To re-bootstrap schema/spec files from legacy defaults, run:
  `pnpm --filter @mhc/website run docs:migrate:mish:fillable`

## Developing Spec Catalog Addendum

The following MISH developing spec files are intentionally retained and should remain
discoverable from this index:

- [FORM MISH 07 - Safety Bulletin Board Posting Audit Log](./form-mish-07-safety-bulletin-board-posting-audit-log.md)
- [FORM MISH 31 - Miscellaneous Construction Requirements Compliance Checklist](./form-mish-31-miscellaneous-construction-requirements-compliance-checklist.md)
- [FORM MISH 45 - Miscellaneous Safety Requirements Compliance Checklist](./form-mish-45-miscellaneous-safety-requirements-compliance-checklist.md)
- [FORM MISH 51 - Leading Indicators Safety Performance Metrics Log](./form-mish-51-leading-indicators-safety-performance-metrics-log.md)
- [FORM MISH 52 - Safety Culture Assessment Continuous Improvement Record](./form-mish-52-safety-culture-assessment-continuous-improvement-record.md)
- [FORM MISH 53 - Management of Change Request Approval](./form-mish-53-management-of-change-request-approval.md)
- [FORM MISH 54 - Fatigue Risk Assessment Mitigation Log](./form-mish-54-fatigue-risk-assessment-mitigation-log.md)
- [FORM MISH 55 - Mental Health Workforce Wellbeing Support Log](./form-mish-55-mental-health-workforce-wellbeing-support-log.md)
- [FORM MISH 56 - Near Miss Reporting Analysis Form](./form-mish-56-near-miss-reporting-analysis-form.md)
- [FORM MISH 57 - Contractor Prequalification Safety Data Package Checklist](./form-mish-57-contractor-prequalification-safety-data-package-checklist.md)
- [FORM MISH 58 - Safety Technology Digital Tools Inspection Record](./form-mish-58-safety-technology-digital-tools-inspection-record.md)
- [FORM MISH 59 - Stop Work Authority Activation Report](./form-mish-59-stop-work-authority-activation-report.md)
