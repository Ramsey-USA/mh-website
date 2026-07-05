import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = "apps/website/documents/output";
const stack = [root];
const pdfs = [];

while (stack.length > 0) {
  const dir = stack.pop();
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      stack.push(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
      pdfs.push(fullPath);
    }
  }
}

pdfs.sort();

let unresolvedCount = 0;
let extractFailCount = 0;
let processedCount = 0;
const unresolvedFiles = [];
const extractFailFiles = [];
const tokenPattern = /\{\{[^}]+\}\}/;

for (const file of pdfs) {
  processedCount += 1;
  if (processedCount % 25 === 0) {
    // Emit periodic progress so long scans do not appear stalled.
    console.log(`PROGRESS ${processedCount}/${pdfs.length}`);
  }
  const gs = spawnSync("gs", ["-q", "-sDEVICE=txtwrite", "-o", "-", file], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

  if (gs.status !== 0) {
    extractFailCount += 1;
    extractFailFiles.push(file);
    continue;
  }

  const text = (gs.stdout || "").replace(/\u0000/g, "");
  if (tokenPattern.test(text)) {
    unresolvedCount += 1;
    unresolvedFiles.push(file);
  }
}

console.log(`SCANNED_GLOBAL=${pdfs.length}`);
console.log(`UNRESOLVED_GLOBAL=${unresolvedCount}`);
console.log(`EXTRACT_FAIL_GLOBAL=${extractFailCount}`);

if (unresolvedFiles.length > 0) {
  console.log("---UNRESOLVED_FILES---");
  for (const file of unresolvedFiles) {
    console.log(file);
  }
}

if (extractFailFiles.length > 0) {
  console.log("---EXTRACT_FAIL_FILES---");
  for (const file of extractFailFiles) {
    console.log(file);
  }
}
