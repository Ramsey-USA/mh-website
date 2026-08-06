import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [metadataPath, repositoryRoot, outputPath] = process.argv.slice(2);

if (!metadataPath || !repositoryRoot || !outputPath) {
  throw new Error(
    'Usage: node build-ecosystem-phase0-reconciliation.mjs <metadata-index.csv> <repository-root> <output.json>',
  );
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const next = input[index + 1];

    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && next === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [rawHeaders, ...values] = rows;
  const headers = rawHeaders.map((header) => header.replace(/^\uFEFF/, ''));
  return values.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])),
  );
}

function documentKey(filename) {
  return filename
    .replace(/\.docx$/i, '')
    .replace(/-v\d+-\d+-draft$/i, '')
    .toLowerCase();
}

async function walkDocx(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walkDocx(fullPath)));
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.docx')) files.push(fullPath);
  }
  return files;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

const metadata = parseCsv(await readFile(metadataPath, 'utf8'));
const intakeRoot = path.join(repositoryRoot, 'documents', 'input');
const repositoryFiles = await walkDocx(intakeRoot);
const repositoryByKey = new Map();

for (const file of repositoryFiles) {
  const relative = path.relative(repositoryRoot, file).replaceAll('\\', '/');
  const family = relative.split('/')[2];
  const key = `${family}::${documentKey(path.basename(file))}`;
  if (repositoryByKey.has(key)) throw new Error(`Duplicate repository document key: ${key}`);
  repositoryByKey.set(key, { file, relative });
}

const matchedRepositoryPaths = new Set();
const records = [];

for (const source of metadata) {
  const repositoryFamily = source.package === 'company-bible' ? '01-core-doctrine' : source.package;
  const key = `${repositoryFamily}::${documentKey(`${source.document_id}.docx`)}`;
  const repository = repositoryByKey.get(key);
  let repositoryPath = null;
  let repositorySha256 = null;
  let repositoryDisposition;

  if (source.distribution_type === 'authorized-distribution-copy') {
    repositoryDisposition = 'sealed-authorized-distribution-copy';
  } else if (repository) {
    repositoryPath = repository.relative;
    repositorySha256 = sha256(await readFile(repository.file));
    matchedRepositoryPaths.add(repository.relative);
    repositoryDisposition =
      repositorySha256 === source.docx_sha256
        ? 'repository-exact-sealed-source'
        : 'repository-working-copy-diverged-from-sealed-baseline';
  } else {
    repositoryDisposition = 'unexplained-repository-omission';
  }

  records.push({
    controlledRecordId: source.controlled_record_id,
    documentId: source.document_id,
    package: source.package,
    distributionType: source.distribution_type,
    version: source.version,
    lifecycleStatus: source.status,
    docxSha256: source.docx_sha256,
    pdfSha256: source.pdf_sha256,
    pdfPhysicalPages: Number(source.pdf_physical_pages),
    repositoryPath,
    repositorySha256,
    repositoryDisposition,
    publicationClassification: 'not-public-draft',
  });
}

const unmatchedRepositoryPaths = repositoryFiles
  .map((file) => path.relative(repositoryRoot, file).replaceAll('\\', '/'))
  .filter((file) => !matchedRepositoryPaths.has(file));
const dispositionCounts = Object.fromEntries(
  [...new Set(records.map((record) => record.repositoryDisposition))]
    .sort()
    .map((disposition) => [
      disposition,
      records.filter((record) => record.repositoryDisposition === disposition).length,
    ]),
);
const packageCounts = Object.fromEntries(
  [...new Set(records.map((record) => record.package))]
    .sort()
    .map((family) => [family, records.filter((record) => record.package === family).length]),
);

const reconciliation = {
  schemaVersion: 1,
  generatedDate: '2026-08-06',
  lifecycleStatus: 'Rough Draft',
  sealedArtifact: {
    name: 'mh-ecosystem-draft-native-rebuild-master-governance-corrected-2026-08-06.zip',
    sha256: 'f6b9a39d944ba12cdeed7146be4b412f04dd5010752b694f1294b680d84d89b1',
    controlledRecordCount: records.length,
    docxCount: 193,
    pdfCount: 193,
    renderedPageCount: records.reduce((total, record) => total + record.pdfPhysicalPages, 0),
    numberedPackageCount: 10,
    companyBibleSeparate: true,
  },
  repositoryIntake: {
    docxCount: repositoryFiles.length,
    matchedRecordCount: matchedRepositoryPaths.size,
    unmatchedRepositoryPaths,
  },
  controls: {
    generationIsPublication: false,
    publicDraftDownloadsAllowed: false,
    fieldEffective: false,
    phase0Result: 'pass-with-controlled-divergence',
    divergenceRule:
      'Repository working copies may inform website development but never supersede the sealed baseline.',
  },
  packageCounts,
  dispositionCounts,
  records,
};

await writeFile(outputPath, `${JSON.stringify(reconciliation, null, 2)}\n`, 'utf8');

console.log(
  `Ecosystem register generated: ${records.length} records, ${repositoryFiles.length} repository DOCX files, ${matchedRepositoryPaths.size} matched controlled records.`,
);
