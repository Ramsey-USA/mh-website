import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';

const repositoryRoot = path.resolve(process.argv[2] ?? '.');
const manifest = JSON.parse(
  await readFile(
    path.join(repositoryRoot, 'documents/content/mh-ecosystem/ecosystem-pdf-manifest.json'),
    'utf8',
  ),
);
const outputRoot = path.join(
  repositoryRoot,
  'apps/website/documents/generated-pdfs/controlled-ecosystem',
);
const expectedOutputSuffix = path.join('apps', 'website', 'documents', 'generated-pdfs', 'controlled-ecosystem');
if (!path.resolve(outputRoot).endsWith(expectedOutputSuffix) || path.resolve(outputRoot) === path.resolve(repositoryRoot)) {
  throw new Error(`Unsafe binder output path: ${outputRoot}`);
}
const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const GREEN = rgb(56 / 255, 104 / 255, 81 / 255);
const TAN = rgb(189 / 255, 146 / 255, 100 / 255);
const WHITE = rgb(1, 1, 1);
const PACKAGE_TITLES = {
  '01-core-doctrine': 'Core Doctrine',
  '02-strategy-and-business-dev': 'Strategy and Business Development',
  '03-project-delivery': 'Project Delivery',
  '04-safety-and-field-ops': 'Safety and Field Operations',
  '05-it-and-infrastructure': 'IT and Infrastructure',
  '06-tbt-library': 'Toolbox Talk Library',
  '07-sds-library': 'SDS Library',
  '08-forms-ehb': 'Employee Handbook and Forms',
  '09-forms-operations': 'Operations Forms',
  '10-forms-mish': 'MISH Forms',
  'company-bible': 'MH Company Bible',
};

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function displayTitle(entry) {
  return entry.documentId
    .replace(/-v\d+-\d+-draft$/i, '')
    .split('-')
    .map((word) => (['mh', 'mish', 'sds', 'tbt', 'it', 'ai', 'jha'].includes(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}

async function addCover(document, fonts, title, subtitle, recordCount) {
  const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: GREEN });
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: 92, color: TAN });
  page.drawText('MH CONSTRUCTION', { x: 54, y: 690, size: 18, font: fonts.bold, color: TAN });
  page.drawText(title, { x: 54, y: 585, size: 28, font: fonts.bold, color: WHITE, maxWidth: 500 });
  page.drawText(subtitle, { x: 54, y: 535, size: 13, font: fonts.regular, color: WHITE, maxWidth: 500 });
  page.drawText(`ROUGH DRAFT | ${recordCount} CONTROLLED RECORDS`, {
    x: 54,
    y: 52,
    size: 11,
    font: fonts.bold,
    color: WHITE,
  });
}

async function addToc(document, fonts, tocEntries, title) {
  const linesPerPage = 34;
  for (let offset = 0; offset < tocEntries.length; offset += linesPerPage) {
    const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawText(title, { x: 46, y: 735, size: 20, font: fonts.bold, color: GREEN });
    page.drawLine({ start: { x: 46, y: 720 }, end: { x: 566, y: 720 }, thickness: 2, color: TAN });
    tocEntries.slice(offset, offset + linesPerPage).forEach((entry, index) => {
      const y = 690 - index * 19;
      const titleText = entry.title.length > 69 ? `${entry.title.slice(0, 66)}...` : entry.title;
      page.drawText(titleText, { x: 46, y, size: 8.5, font: fonts.regular, color: GREEN });
      page.drawText(String(entry.page), { x: 530, y, size: 8.5, font: fonts.bold, color: GREEN });
    });
  }
}

function calculateTocEntries(dividerGroups, tocPages) {
  let completedPages = 1 + tocPages;
  const tocEntries = [];
  for (const group of dividerGroups) {
    completedPages += 1;
    for (const entry of group.entries) {
      tocEntries.push({ title: displayTitle(entry), page: completedPages + 1 });
      completedPages += entry.treatment.printPageCount;
    }
  }
  return tocEntries;
}

function addDivider(document, fonts, packageName) {
  const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: WHITE });
  page.drawRectangle({ x: 0, y: 0, width: 118, height: PAGE_HEIGHT, color: GREEN });
  page.drawRectangle({ x: 118, y: 0, width: 18, height: PAGE_HEIGHT, color: TAN });
  page.drawText(packageName === 'company-bible' ? 'GOVERNING' : packageName.slice(0, 2), {
    x: 164,
    y: 610,
    size: 16,
    font: fonts.bold,
    color: TAN,
  });
  page.drawText(PACKAGE_TITLES[packageName] ?? packageName, {
    x: 164,
    y: 535,
    size: 27,
    font: fonts.bold,
    color: GREEN,
    maxWidth: 390,
  });
  page.drawText('CONTROLLED SECTION TAB', { x: 164, y: 485, size: 11, font: fonts.regular, color: GREEN });
}

async function addSourceEntries(document, entries, fonts) {
  for (const entry of entries) {
    const source = await readFile(path.join(repositoryRoot, entry.sourcePdf));
    if (sha256(source) !== entry.pdfSha256) throw new Error(`PDF hash mismatch: ${entry.sourcePdf}`);
    const sourceDocument = await PDFDocument.load(source);
    const pageIndices = sourceDocument
      .getPageIndices()
      .slice(entry.treatment.printPageStartIndex);
    const pages = await document.copyPages(sourceDocument, pageIndices);
    for (const page of pages) {
      if (entry.treatment.printOptimized) {
        const trimHeight = 24;
        page.drawRectangle({
          x: 0,
          y: page.getHeight() - trimHeight,
          width: page.getWidth(),
          height: trimHeight,
          color: WHITE,
        });
      }
      document.addPage(page);
    }
  }
}

async function buildBinder(entries, outputPath, title, subtitle, dividerGroups) {
  const binder = await PDFDocument.create();
  const fonts = {
    regular: await binder.embedFont(StandardFonts.Helvetica),
    bold: await binder.embedFont(StandardFonts.HelveticaBold),
  };
  await addCover(binder, fonts, title, subtitle, entries.length);
  const tocPages = Math.max(1, Math.ceil(entries.length / 34));
  const tocEntries = calculateTocEntries(dividerGroups, tocPages);
  await addToc(binder, fonts, tocEntries, `${title} | Table of Contents`);
  for (const group of dividerGroups) {
    addDivider(binder, fonts, group.package);
    await addSourceEntries(binder, group.entries, fonts);
  }
  await mkdir(path.dirname(outputPath), { recursive: true });
  const bytes = await binder.save({ useObjectStreams: true });
  await writeFile(outputPath, bytes);
  return {
    artifactType: 'binder',
    path: path.relative(outputRoot, outputPath).replaceAll('\\', '/'),
    records: entries.length,
    pages: binder.getPageCount(),
    sha256: sha256(bytes),
  };
}

async function buildSpine(outputPath, title, subtitle) {
  const document = await PDFDocument.create();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page.drawRectangle({ x: 252, y: 36, width: 108, height: 720, color: GREEN });
  page.drawRectangle({ x: 252, y: 36, width: 16, height: 720, color: TAN });
  page.drawText(title, { x: 300, y: 95, size: 16, font: bold, color: WHITE, rotate: degrees(90) });
  page.drawText(subtitle, { x: 328, y: 95, size: 9, font: regular, color: WHITE, rotate: degrees(90) });
  await mkdir(path.dirname(outputPath), { recursive: true });
  const bytes = await document.save({ useObjectStreams: true });
  await writeFile(outputPath, bytes);
  return {
    artifactType: 'spine',
    path: path.relative(outputRoot, outputPath).replaceAll('\\', '/'),
    records: 0,
    pages: document.getPageCount(),
    sha256: sha256(bytes),
  };
}

async function buildPrintArtifact(entry) {
  if (!entry.treatment.printOptimized) return null;
  const source = await readFile(path.join(repositoryRoot, entry.sourcePdf));
  if (sha256(source) !== entry.pdfSha256) throw new Error(`PDF hash mismatch: ${entry.sourcePdf}`);
  const sourceDocument = await PDFDocument.load(source);
  const output = await PDFDocument.create();
  const pageIndices = sourceDocument
    .getPageIndices()
    .slice(entry.treatment.printPageStartIndex);
  const pages = await output.copyPages(sourceDocument, pageIndices);
  for (const page of pages) {
    const trimHeight = 24;
    page.drawRectangle({
      x: 0,
      y: page.getHeight() - trimHeight,
      width: page.getWidth(),
      height: trimHeight,
      color: WHITE,
    });
    output.addPage(page);
  }
  const family = entry.package === '06-tbt-library'
    ? 'tbt'
    : entry.package === '07-sds-library'
      ? 'sds'
      : 'forms';
  const outputPath = path.join(outputRoot, 'print-ready', family, `${entry.documentId}.pdf`);
  await mkdir(path.dirname(outputPath), { recursive: true });
  const bytes = await output.save({ useObjectStreams: true });
  await writeFile(outputPath, bytes);
  return {
    artifactType: 'print-ready',
    documentId: entry.documentId,
    treatmentClass: entry.treatment.class,
    path: path.relative(outputRoot, outputPath).replaceAll('\\', '/'),
    records: 1,
    pages: output.getPageCount(),
    sha256: sha256(bytes),
  };
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
const outputs = [];
for (const entry of manifest.entries) {
  const printArtifact = await buildPrintArtifact(entry);
  if (printArtifact) outputs.push(printArtifact);
}
const packageNames = [...new Set(
  manifest.entries.filter((entry) => entry.includeInPackageBinder).map((entry) => entry.package),
)].sort();

for (const packageName of packageNames) {
  const entries = manifest.entries.filter(
    (entry) => entry.package === packageName && entry.includeInPackageBinder,
  );
  const title = `${packageName.slice(0, 2)} | ${PACKAGE_TITLES[packageName]}`;
  outputs.push(
    await buildBinder(
      entries,
      path.join(outputRoot, 'packages', `${packageName}.pdf`),
      title,
      'Controlled MH Ecosystem package binder',
      [{ package: packageName, entries }],
    ),
  );
  outputs.push(await buildSpine(
    path.join(outputRoot, 'spines', `${packageName}-spine.pdf`),
    title,
    'MH Ecosystem | Rough Draft',
  ));
}

const masterEntries = manifest.entries.filter((entry) => entry.includeInMasterNotebook);
const masterGroups = [
  { package: 'company-bible', entries: masterEntries.filter((entry) => entry.package === 'company-bible') },
  ...packageNames.map((packageName) => ({
    package: packageName,
    entries: masterEntries.filter((entry) => entry.package === packageName),
  })),
].filter((group) => group.entries.length > 0);
outputs.push(
  await buildBinder(
    masterEntries,
    path.join(outputRoot, 'mh-ecosystem-master-notebook-v1-0-draft.pdf'),
    'MH Ecosystem Master Notebook',
    'Company Bible, ten controlled packages, and field-ready forms',
    masterGroups,
  ),
);
outputs.push(await buildSpine(
  path.join(outputRoot, 'spines', 'mh-ecosystem-master-notebook-spine.pdf'),
  'MH Ecosystem Master Notebook',
  'Rough Draft | 2026',
));

await writeFile(
  path.join(outputRoot, 'binder-build-manifest.json'),
  `${JSON.stringify({ schemaVersion: 1, lifecycleStatus: 'Rough Draft', outputs }, null, 2)}\n`,
  'utf8',
);

console.log(`Built ${packageNames.length} package binders, printable spines, and one ${masterEntries.length}-record master Ecosystem notebook.`);
