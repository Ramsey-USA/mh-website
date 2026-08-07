import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(scriptDirectory, "../..");
const qrDirectory = join(repositoryRoot, "apps/website/public/images/qr-codes");
const manifestPath = join(qrDirectory, "qr-codes-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

manifest.schemaVersion = 2;
manifest.hashAlgorithm = "sha256";
manifest.qrCodes = manifest.qrCodes.map((entry) => {
  const relativePath = entry.relativePath || entry.filename;
  const file = join(qrDirectory, relativePath);
  const sha256 = createHash("sha256").update(readFileSync(file)).digest("hex");
  return { ...entry, sha256 };
});

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Backfilled ${manifest.qrCodes.length} QR manifest hashes.`);
