import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repositoryRoot = path.resolve(process.argv[2] ?? '.');
const reconciliation = JSON.parse(
  await readFile(
    path.join(repositoryRoot, 'documents/content/mh-ecosystem/phase-0-reconciliation.json'),
    'utf8',
  ),
);

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

const entries = [];
for (const [index, record] of reconciliation.records.entries()) {
  const sourcePdf =
    record.package === 'company-bible'
      ? `documents/input/company-bible/${record.documentId}.pdf`
      : `documents/input/${record.package}/${record.documentId}.pdf`;
  const sourceHash = sha256(await readFile(path.join(repositoryRoot, sourcePdf)));
  if (sourceHash !== record.pdfSha256) throw new Error(`PDF hash mismatch: ${sourcePdf}`);

  const family = record.package === '06-tbt-library'
    ? 'tbt'
    : record.package === '07-sds-library'
      ? 'sds'
      : 'ecosystem';
  const isForm = /^(form-|ehb-f-|eom-f-|fin-f-|pep-f-|sub-f-|wmg-f-|bid-f-)/i.test(
    record.documentId,
  );
  const treatment = isForm
    ? 'print-form'
    : family === 'tbt'
      ? record.pdfPhysicalPages > 2
        ? 'extended-field-brief'
        : 'field-brief'
      : family === 'sds'
        ? 'chemical-reference-card'
        : record.package === 'company-bible'
          ? 'governing-publication'
          : 'controlled-publication';

  const omitControlCoverInPrint =
    treatment === 'print-form' ||
    treatment === 'field-brief' ||
    treatment === 'extended-field-brief' ||
    treatment === 'chemical-reference-card';
  const printPageCount = record.pdfPhysicalPages - (omitControlCoverInPrint ? 1 : 0);

  entries.push({
    sequence: index + 1,
    controlledRecordId: record.controlledRecordId,
    documentId: record.documentId,
    package: record.package,
    distributionType: record.distributionType,
    version: record.version,
    lifecycleStatus: record.lifecycleStatus,
    sourcePdf,
    pdfSha256: record.pdfSha256,
    pdfPhysicalPages: record.pdfPhysicalPages,
    includeInPackageBinder: record.package !== 'company-bible',
    includeInMasterNotebook: record.distributionType !== 'authorized-distribution-copy',
    futurePublicUrl: `https://www.mhc-gc.com/docs/${family}/${record.documentId}.pdf`,
    qrName: `${family}-document-${record.documentId}`,
    qrFolder: `${family}-documents`,
    publicationEligible: false,
    qrPipelineStatus: 'queued-until-document-publication-approval',
    treatment: {
      class: treatment,
      individualCover: treatment === 'controlled-publication' || treatment === 'governing-publication',
      individualToc:
        (treatment === 'controlled-publication' || treatment === 'governing-publication') &&
        record.pdfPhysicalPages >= 5,
      binderDividerTab: true,
      formMaximumPages: isForm ? 2 : null,
      printOptimized: omitControlCoverInPrint,
      printPageStartIndex: omitControlCoverInPrint ? 1 : 0,
      printPageCount,
      sourceControlCoverPreserved: true,
      sourceControlCoverIncludedInBinder: !omitControlCoverInPrint,
    },
  });
}

const manifest = {
  schemaVersion: 1,
  generatedDate: '2026-08-06',
  lifecycleStatus: 'Rough Draft',
  publicationEligible: false,
  sourceMode: 'verified-sealed-pdf-pairs',
  qrPipelineMode: 'manifest-queued-until-document-publication-approval',
  binderPlan: {
    companyBibleFirst: true,
    masterCover: true,
    masterToc: true,
    packageCovers: true,
    packageTocs: true,
    dividerTabs: true,
    printableSpines: true,
    packageBinderCount: 10,
    packageBindersIncludeDistributionCopies: true,
    masterNotebookExcludesDistributionCopies: true,
    masterNotebookRecordCount: entries.filter((entry) => entry.includeInMasterNotebook).length,
    expectedMasterNotebookSourcePages: entries
      .filter((entry) => entry.includeInMasterNotebook)
      .reduce((total, entry) => total + entry.treatment.printPageCount, 0),
  },
  counts: {
    controlledPdf: entries.length,
    tbt: entries.filter((entry) => entry.package === '06-tbt-library').length,
    sds: entries.filter((entry) => entry.package === '07-sds-library').length,
    authorizedDistributionCopies: entries.filter(
      (entry) => entry.distributionType === 'authorized-distribution-copy',
    ).length,
    printForms: entries.filter((entry) => entry.treatment.class === 'print-form').length,
  },
  entries,
};

await writeFile(
  path.join(repositoryRoot, 'documents/content/mh-ecosystem/ecosystem-pdf-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);

console.log(`Ecosystem PDF manifest generated: ${entries.length} verified PDFs across ten packages plus the Company Bible.`);
