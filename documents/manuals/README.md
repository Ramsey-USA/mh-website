# Manual Template Index

This folder contains the HTML source templates used by the document generator.

## Template Families

- [safety-manual-cover.html](./safety-manual-cover.html) - safety manual cover source
- [safety-manual-letterhead.html](./safety-manual-letterhead.html) - safety manual letterhead source
- [safety-manual-policy.html](./safety-manual-policy.html) - policy / front-matter source
- [safety-manual-section.html](./safety-manual-section.html) - section body source
- [safety-manual-spine.html](./safety-manual-spine.html) - spine source
- [safety-manual-tabs.html](./safety-manual-tabs.html) - tab divider source
- [safety-manual-toc.html](./safety-manual-toc.html) - table of contents source
- [employee-handbook-cover.html](./employee-handbook-cover.html) - employee handbook cover source
- [employee-handbook-letterhead.html](./employee-handbook-letterhead.html) - employee handbook letterhead source
- [employee-handbook-section.html](./employee-handbook-section.html) - employee handbook section source
- [employee-handbook-spine.html](./employee-handbook-spine.html) - employee handbook spine source
- [employee-handbook-tabs.html](./employee-handbook-tabs.html) - employee handbook tab source
- [form-cover.html](./form-cover.html) - form cover sheet source
- [form-fillable.html](./form-fillable.html) - fillable form source
- [operations-hub-dashboard-access-guide.html](./operations-hub-dashboard-access-guide.html) - dashboard access guide source
- [website-page-inventory.html](./website-page-inventory.html) - website page inventory source

## Temporary Workspace

- [_tmp_form_covers/](./_tmp_form_covers/) - temporary generated cover artifacts during form cover refreshes

## Tracking Tips

- Keep the filename aligned with the template family it generates.
- Treat `_tmp_form_covers/` as disposable workspace, not a source-of-truth folder.
- Update the corresponding generator branch in [documents/scripts/generate.mjs](../scripts/generate.mjs) when adding a new template family.

## Related Output

- Generated PDFs land in [documents/generated-pdfs](../generated-pdfs)
- User-friendly downloads live in [documents/downloads](../downloads)
