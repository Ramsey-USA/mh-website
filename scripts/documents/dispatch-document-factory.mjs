import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contractText = await readFile(
  path.join(root, "documents/content/mh-ecosystem/factory-sync-contract.json"),
  "utf8",
);
const contract = JSON.parse(contractText);
const manifestText = await readFile(
  path.join(root, contract.intakeManifest),
  "utf8",
);
const manifest = JSON.parse(manifestText);
const token = process.env.MH_DOCUMENT_FACTORY_TOKEN;
const sourceCommit = process.env.GITHUB_SHA;

if (!token)
  throw new Error(
    "MH_DOCUMENT_FACTORY_TOKEN is required for cross-repository dispatch.",
  );
if (!/^[0-9a-f]{40}$/i.test(sourceCommit ?? ""))
  throw new Error("GITHUB_SHA must be an exact commit SHA.");
if (
  manifest.recordCount !== 354 ||
  manifest.lifecycleStatus !== "DRAFT" ||
  manifest.publicationAllowed !== false
) {
  throw new Error("Factory intake manifest failed Draft governance controls.");
}

const manifestSha256 = createHash("sha256").update(manifestText).digest("hex");
const response = await fetch(
  `https://api.github.com/repos/${contract.factoryRepository}/dispatches`,
  {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "mh-website-document-control",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      event_type: contract.synchronization.websiteEvent,
      client_payload: {
        contractVersion: contract.contractVersion,
        governanceSchema: contract.governanceSchema,
        sourceRepository: contract.sourceRepository,
        sourceCommit,
        intakeManifestPath: contract.intakeManifest,
        intakeManifestSha256: manifestSha256,
        sourceAuthoritySha256: manifest.sourceAuthoritySha256,
        candidateArchiveSha256: manifest.candidateArchiveSha256,
        recordCount: manifest.recordCount,
        publicationAllowed: false,
      },
    }),
  },
);
if (!response.ok)
  throw new Error(
    `Factory dispatch failed: ${response.status} ${await response.text()}`,
  );
console.log(
  `Dispatched ${contract.synchronization.websiteEvent} for ${sourceCommit}.`,
);
