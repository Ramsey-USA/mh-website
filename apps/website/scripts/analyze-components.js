#!/usr/bin/env node

/**
 * Component Size Analyzer
 * Identifies largest components and files contributing to bundle size
 */

const fs = require("fs");
const path = require("path");

function getFileSize(filepath) {
  try {
    const stats = fs.statSync(filepath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function analyzeDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      if (
        !file.startsWith(".") &&
        file !== "node_modules" &&
        file !== ".next"
      ) {
        analyzeDirectory(filepath, results);
      }
    } else if (file.match(/\.(tsx?|jsx?)$/)) {
      const size = getFileSize(filepath);
      const lines = fs.readFileSync(filepath, "utf-8").split("\n").length;
      results.push({
        file: filepath.replace(process.cwd() + "/", ""),
        size,
        lines,
        sizeKB: (size / 1024).toFixed(2),
      });
    }
  });

  return results;
}

console.log("🔍 Analyzing component sizes...\n");

const srcDir = path.join(process.cwd(), "src");
const results = analyzeDirectory(srcDir);

// Sort by size
results.sort((a, b) => b.size - a.size);

console.log("📊 Top 20 Largest Files:\n");
console.log(
  "┌─────────────────────────────────────────────────────────┬──────────┬────────┐",
);
console.log(
  "│ File                                                    │ Size     │ Lines  │",
);
console.log(
  "├─────────────────────────────────────────────────────────┼──────────┼────────┤",
);

results.slice(0, 20).forEach((item) => {
  const fileName = item.file.padEnd(55).substring(0, 55);
  const size = `${item.sizeKB} KB`.padStart(8);
  const lines = String(item.lines).padStart(6);
  console.log(`│ ${fileName} │ ${size} │ ${lines} │`);
});

console.log(
  "└─────────────────────────────────────────────────────────┴──────────┴────────┘",
);

// Analyze by directory
const byDir = {};
results.forEach((item) => {
  const dir = path.dirname(item.file);
  if (!byDir[dir]) {
    byDir[dir] = { size: 0, files: 0, lines: 0 };
  }
  byDir[dir].size += item.size;
  byDir[dir].files++;
  byDir[dir].lines += item.lines;
});

const dirResults = Object.entries(byDir)
  .map(([dir, data]) => ({
    dir,
    ...data,
    sizeKB: (data.size / 1024).toFixed(2),
  }))
  .sort((a, b) => b.size - a.size);

console.log("\n📁 Largest Directories:\n");
console.log(
  "┌─────────────────────────────────────────────────────────┬──────────┬────────┐",
);
console.log(
  "│ Directory                                               │ Total KB │ Files  │",
);
console.log(
  "├─────────────────────────────────────────────────────────┼──────────┼────────┤",
);

dirResults.slice(0, 15).forEach((item) => {
  const dirName = item.dir.padEnd(55).substring(0, 55);
  const size = `${item.sizeKB} KB`.padStart(8);
  const files = String(item.files).padStart(6);
  console.log(`│ ${dirName} │ ${size} │ ${files} │`);
});

console.log(
  "└─────────────────────────────────────────────────────────┴──────────┴────────┘",
);

// Summary
const totalSize = results.reduce((sum, item) => sum + item.size, 0);
const totalLines = results.reduce((sum, item) => sum + item.lines, 0);
const avgSize = totalSize / results.length;

console.log("\n📈 Summary:");
console.log(`  Total Files: ${results.length}`);
console.log(`  Total Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  Total Lines: ${totalLines.toLocaleString()}`);
console.log(`  Average File Size: ${(avgSize / 1024).toFixed(2)} KB`);

// Recommendations
console.log("\n💡 Optimization Opportunities:");

const largeFiles = results.filter((f) => f.size > 30000); // > 30KB
if (largeFiles.length > 0) {
  console.log(`  • ${largeFiles.length} files are >30KB and could be split`);
  largeFiles.slice(0, 5).forEach((f) => {
    console.log(`    - ${f.file} (${f.sizeKB} KB)`);
  });
}

const longFiles = results.filter((f) => f.lines > 500); // > 500 lines
if (longFiles.length > 0) {
  console.log(
    `  • ${longFiles.length} files have >500 lines and could be refactored`,
  );
  longFiles.slice(0, 5).forEach((f) => {
    console.log(`    - ${f.file} (${f.lines} lines)`);
  });
}

console.log("\n✅ Run 'npm run build:analyze' to see bundle impact\n");
