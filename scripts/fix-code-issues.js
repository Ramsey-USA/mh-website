#!/usr/bin/env node
/**
 * Comprehensive Code Fix Script
 * Consolidates all fix scripts into one unified tool
 *
 * REPLACES:
 * - fix-typescript-warnings.py
 * - fix-unused-systematically.js
 * - fix-unused-vars.sh
 * - fix-warnings-focused.sh
 * - cleanup/bulk-fix-lint.sh
 * - cleanup/fix-lint-warnings.sh
 * - utilities/fix-lint-warnings.sh
 * - codemods/fix-common-issues.js
 *
 * Features:
 * 1. Fix unused variables and imports
 * 2. Fix catch block error naming
 * 3. Fix React component patterns
 * 4. Fix TypeScript warnings
 * 5. Add missing imports
 * 6. Clean up console statements
 * 7. Fix any/unknown types
 * 8. Fix async/await patterns
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose") || args.includes("-v");
const FIX_ALL = args.includes("--all");
const FIX_IMPORTS = args.includes("--imports") || FIX_ALL;
const FIX_UNUSED = args.includes("--unused") || FIX_ALL;
const FIX_TYPES = args.includes("--types") || FIX_ALL;
const FIX_PATTERNS = args.includes("--patterns") || FIX_ALL;

console.log("🔧 MH Construction - Comprehensive Code Fix Tool\n");

if (DRY_RUN) {
  console.log("🔍 DRY RUN MODE - No files will be modified\n");
}

// Statistics
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  importsFixed: 0,
  unusedVarsFixed: 0,
  typesFixed: 0,
  patternsFixed: 0,
};

/**
 * Get all TypeScript files in src directory
 */
function getAllTsFiles() {
  const exts = [".ts", ".tsx"];
  const files = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (exts.includes(path.extname(full))) {
        files.push(full);
      }
    }
  }

  walk(SRC);
  return files;
}

/**
 * Check if file has logger import
 */
function hasLoggerImport(content) {
  return (
    /from\s+["']@\/lib\/utils\/logger["']/.test(content) ||
    /require\(.*logger.*\)/.test(content)
  );
}

/**
 * Add logger import to file
 */
function addLoggerImport(content) {
  if (hasLoggerImport(content)) return content;

  // Find the last import statement
  const lines = content.split("\n");
  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("import ")) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex >= 0) {
    lines.splice(
      lastImportIndex + 1,
      0,
      'import { logger } from "@/lib/utils/logger";',
    );
    return lines.join("\n");
  }

  return content;
}

/**
 * Fix 1: Unused imports
 */
function fixUnusedImports(content) {
  let fixed = 0;
  let modified = content;

  // Remove completely unused imports
  const lines = modified.split("\n");
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for empty import blocks
    if (/import\s*{\s*}\s*from/.test(line)) {
      fixed++;
      continue; // Skip this line
    }

    newLines.push(line);
  }

  modified = newLines.join("\n");

  return { content: modified, fixed };
}

/**
 * Fix 2: Catch block error naming
 */
function fixCatchBlocks(content) {
  let fixed = 0;
  let modified = content;

  // Replace catch (error) with catch (_error)
  const catchRegex = /catch\s*\(\s*error\s*\)/g;
  const matches = modified.match(catchRegex);
  if (matches) {
    modified = modified.replace(catchRegex, "catch (_error)");

    // Also fix references inside catch blocks
    modified = modified.replace(
      /catch\s*\(_error\)([^{]*\{[\s\S]*?\})/g,
      (block) => {
        return block
          .replace(/logger\.error\([^,]*,\s*error\s*[,)]/g, (m) =>
            m.replace("error", "_error"),
          )
          .replace(/console\.error\([^,]*,\s*error\s*[,)]/g, (m) =>
            m.replace("error", "_error"),
          )
          .replace(/throw\s+error\s*;/g, "throw _error;");
      },
    );

    fixed = matches.length;
  }

  return { content: modified, fixed };
}

/**
 * Fix 3: Unused function parameters
 */
function fixUnusedParams(content) {
  let fixed = 0;
  let modified = content;

  // Common patterns for unused params
  const patterns = [
    { from: /\bmap\(\s*\([^,]+,\s*index\s*\)/g, to: "map(($1, _index)" },
    { from: /\bfilter\(\s*\([^,]+,\s*index\s*\)/g, to: "filter(($1, _index)" },
    {
      from: /\bforEach\(\s*\([^,]+,\s*index\s*\)/g,
      to: "forEach(($1, _index)",
    },
  ];

  for (const pattern of patterns) {
    const matches = modified.match(pattern.from);
    if (matches) {
      modified = modified.replace(pattern.from, pattern.to);
      fixed += matches.length;
    }
  }

  return { content: modified, fixed };
}

/**
 * Fix 4: React component patterns
 */
function fixReactPatterns(content) {
  let fixed = 0;
  let modified = content;

  // Remove unused default React import
  if (/import React,\s*\{/.test(modified)) {
    if (!/React\./.test(modified) && !/<React\./.test(modified)) {
      const before = modified;
      modified = modified.replace(
        /import React,\s*\{([^}]*)\}\s*from\s+["']react["'];?/g,
        'import {$1} from "react";',
      );
      if (modified !== before) fixed++;
    }
  } else if (/import React from ["']react["'];?/.test(modified)) {
    if (!/React\./.test(modified) && !/<React\./.test(modified)) {
      const before = modified;
      modified = modified.replace(/import React from ["']react["'];?\n?/g, "");
      if (modified !== before) fixed++;
    }
  }

  // Add override for React class components
  if (/extends\s+Component/.test(modified)) {
    const before = modified;
    modified = modified.replace(
      /(\n\s*)(componentDidCatch\s*\()/g,
      "$1override componentDidCatch(",
    );
    modified = modified.replace(/(\n\s*)(render\s*\()/g, "$1override render(");
    if (modified !== before) fixed++;
  }

  return { content: modified, fixed };
}

/**
 * Fix 5: Type issues (any -> unknown where safe)
 */
function fixTypes(content) {
  let fixed = 0;
  let modified = content;

  // Safe replacements
  const patterns = [
    { from: /catch\s*\(\s*e:\s*any\s*\)/g, to: "catch (e: unknown)" },
    { from: /catch\s*\(\s*err:\s*any\s*\)/g, to: "catch (err: unknown)" },
    {
      from: /catch\s*\(\s*error:\s*any\s*\)/g,
      to: "catch (_error: unknown)",
    },
    { from: /\.\.\.args:\s*any\[\]/g, to: "...args: unknown[]" },
    { from: /\.\.\.data:\s*any\[\]/g, to: "...data: unknown[]" },
  ];

  for (const pattern of patterns) {
    const matches = modified.match(pattern.from);
    if (matches) {
      modified = modified.replace(pattern.from, pattern.to);
      fixed += matches.length;
    }
  }

  return { content: modified, fixed };
}

/**
 * Fix 6: Add missing logger import
 */
function fixMissingLogger(content) {
  let fixed = 0;
  let modified = content;

  // Check if logger is used but not imported
  if (/logger\.(error|warn|info|log|debug)/.test(modified)) {
    if (!hasLoggerImport(modified)) {
      modified = addLoggerImport(modified);
      fixed = 1;
    }
  }

  return { content: modified, fixed };
}

/**
 * Fix 7: Map key issues
 */
function fixMapKeys(content) {
  let fixed = 0;
  let modified = content;

  // Fix key={index} when using _index
  if (/map\([^)]*_index/.test(modified)) {
    const before = modified;
    modified = modified.replace(/key={index}/g, "key={_index}");
    modified = modified.replace(/\{index\s*\+\s*1\}/g, "{_index + 1}");
    if (modified !== before) {
      fixed = (before.match(/key={index}/g) || []).length;
    }
  }

  return { content: modified, fixed };
}

/**
 * Process a single file
 */
function processFile(filePath) {
  stats.filesProcessed++;

  if (VERBOSE) {
    console.log(`\n📄 Processing: ${path.relative(ROOT, filePath)}`);
  }

  let content = fs.readFileSync(filePath, "utf-8");
  const originalContent = content;
  let fileFixed = 0;

  // Apply fixes
  if (FIX_IMPORTS) {
    const result = fixUnusedImports(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.importsFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Fixed ${result.fixed} import issues`);
    }
  }

  if (FIX_UNUSED) {
    let result = fixCatchBlocks(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.unusedVarsFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Fixed ${result.fixed} catch blocks`);
    }

    result = fixUnusedParams(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.unusedVarsFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Fixed ${result.fixed} unused parameters`);
    }
  }

  if (FIX_TYPES) {
    const result = fixTypes(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.typesFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Fixed ${result.fixed} type issues`);
    }
  }

  if (FIX_PATTERNS) {
    let result = fixReactPatterns(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.patternsFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Fixed ${result.fixed} React patterns`);
    }

    result = fixMissingLogger(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.patternsFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Added logger import`);
    }

    result = fixMapKeys(content);
    content = result.content;
    fileFixed += result.fixed;
    stats.patternsFixed += result.fixed;
    if (result.fixed > 0 && VERBOSE) {
      console.log(`  ✓ Fixed ${result.fixed} map key issues`);
    }
  }

  // Write file if modified
  if (content !== originalContent) {
    stats.filesModified++;

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, "utf-8");
    }

    if (!VERBOSE && fileFixed > 0) {
      console.log(
        `✓ ${path.relative(ROOT, filePath)} - ${fileFixed} fixes applied`,
      );
    }
  }
}

/**
 * Main execution
 */
function main() {
  // Show usage if no options
  if (!FIX_ALL && !FIX_IMPORTS && !FIX_UNUSED && !FIX_TYPES && !FIX_PATTERNS) {
    console.log("Usage: node scripts/fix-code-issues.js [options]\n");
    console.log("Options:");
    console.log("  --all        Fix all issues (recommended)");
    console.log("  --imports    Fix unused imports");
    console.log("  --unused     Fix unused variables and parameters");
    console.log("  --types      Fix type issues (any -> unknown)");
    console.log("  --patterns   Fix React and code patterns");
    console.log(
      "  --dry-run    Show what would be fixed without modifying files",
    );
    console.log("  --verbose    Show detailed output");
    console.log("\nExample:");
    console.log("  node scripts/fix-code-issues.js --all\n");
    process.exit(0);
  }

  console.log("Scanning files...\n");
  const files = getAllTsFiles();
  console.log(`Found ${files.length} TypeScript files\n`);

  // Process all files
  files.forEach(processFile);

  // Print summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary");
  console.log("=".repeat(50));
  console.log(`Files processed:    ${stats.filesProcessed}`);
  console.log(`Files modified:     ${stats.filesModified}`);
  console.log(`Imports fixed:      ${stats.importsFixed}`);
  console.log(`Unused vars fixed:  ${stats.unusedVarsFixed}`);
  console.log(`Types fixed:        ${stats.typesFixed}`);
  console.log(`Patterns fixed:     ${stats.patternsFixed}`);
  console.log(
    `Total fixes:        ${stats.importsFixed + stats.unusedVarsFixed + stats.typesFixed + stats.patternsFixed}`,
  );

  if (DRY_RUN) {
    console.log("\n⚠️  This was a dry run. No files were modified.");
    console.log("   Run without --dry-run to apply changes.\n");
  } else {
    console.log("\n✅ All fixes applied successfully!\n");
  }
}

// Run the script
try {
  main();
} catch (error) {
  console.error("\n❌ Error:", error.message);
  process.exit(1);
}
