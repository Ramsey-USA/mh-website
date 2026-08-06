import { readFile } from 'node:fs/promises';
import path from 'node:path';

const repositoryRoot = path.resolve(process.argv[2] ?? '.');
const manifest = JSON.parse(
  await readFile(path.join(repositoryRoot, 'documents/content/mh-ecosystem/ecosystem-pdf-manifest.json'), 'utf8'),
);
const failures = [];

if (manifest.lifecycleStatus !== 'Approved') failures.push('Ecosystem lifecycle status is not Approved.');
if (manifest.publicationEligible !== true) failures.push('Ecosystem publication authorization is not enabled.');
for (const entry of manifest.entries ?? []) {
  if (entry.lifecycleStatus !== 'Approved') failures.push(`Document is not Approved: ${entry.documentId}`);
  if (entry.publicationEligible !== true) failures.push(`Document is not publication eligible: ${entry.documentId}`);
  if (entry.qrPipelineStatus !== 'approved-for-publication') failures.push(`QR target is not approved: ${entry.documentId}`);
}

if (failures.length) {
  console.error('Ecosystem publication approval gate failed:');
  for (const failure of failures.slice(0, 25)) console.error(`- ${failure}`);
  if (failures.length > 25) console.error(`- ${failures.length - 25} additional approval failures suppressed.`);
  process.exit(1);
}

console.log(`Ecosystem publication approval gate passed for ${manifest.entries.length} controlled documents.`);
