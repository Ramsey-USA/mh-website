#!/usr/bin/env node

/**
 * Script to systematically fix unused variables and imports
 * This will:
 * 1. Remove unused imports
 * 2. Prefix unused function parameters with _
 * 3. Remove unused variable declarations where safe
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔍 Analyzing unused variables and imports...\n");

// Get lint output
const lintOutput = execSync(
  "npx eslint src --ext .js,.jsx,.ts,.tsx --format json",
  {
    encoding: "utf-8",
    cwd: __dirname + "/..",
  },
).toString();

const results = JSON.parse(lintOutput);

let totalFixed = 0;
let totalFiles = 0;

results.forEach((result) => {
  if (result.messages.length === 0) return;

  const filePath = result.filePath;
  const unusedVarMessages = result.messages.filter(
    (m) => m.ruleId === "@typescript-eslint/no-unused-vars",
  );

  if (unusedVarMessages.length === 0) return;

  totalFiles++;
  console.log(`\n📄 ${path.relative(process.cwd(), filePath)}`);
  console.log(`   Found ${unusedVarMessages.length} unused variable(s)`);

  let content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  let modified = false;

  // Sort messages by line number in descending order to avoid offset issues
  unusedVarMessages.sort((a, b) => b.line - a.line);

  unusedVarMessages.forEach((msg) => {
    const match = msg.message.match(/'([^']+)' is (defined|assigned)/);
    if (!match) return;

    const varName = match[1];
    const lineIdx = msg.line - 1;
    const line = lines[lineIdx];

    // Check if it's an import statement
    if (line.trim().startsWith("import ")) {
      // Remove the unused import from the line
      const importRegex = new RegExp(`,?\\s*${varName}\\s*,?`);
      let newLine = line.replace(importRegex, "");

      // Clean up empty imports
      if (newLine.match(/import\s*{\s*}\s*from/)) {
        lines[lineIdx] = ""; // Remove entire import line
        modified = true;
        totalFixed++;
        console.log(`   ✓ Removed unused import: ${varName}`);
      } else if (newLine !== line) {
        // Clean up extra commas
        newLine = newLine
          .replace(/{\s*,/, "{")
          .replace(/,\s*}/, "}")
          .replace(/,\s*,/, ",");
        lines[lineIdx] = newLine;
        modified = true;
        totalFixed++;
        console.log(`   ✓ Removed ${varName} from imports`);
      }
    }
    // Check if it's a function parameter
    else if (
      line.includes("=>") ||
      line.includes("function") ||
      line.includes(`(${varName}`)
    ) {
      // Prefix with underscore if it's a parameter
      const paramRegex = new RegExp(`\\b${varName}\\b(?=[,:\\)\\s])`);
      if (line.match(paramRegex)) {
        lines[lineIdx] = line.replace(paramRegex, `_${varName}`);
        modified = true;
        totalFixed++;
        console.log(
          `   ✓ Prefixed parameter with _: ${varName} -> _${varName}`,
        );
      }
    }
    // Check if it's a destructured variable we can prefix
    else if (line.includes("const") || line.includes("let")) {
      const constRegex = new RegExp(`\\b${varName}\\b(?=\\s*[,=}])`);
      if (line.match(constRegex) && !line.includes(`_${varName}`)) {
        lines[lineIdx] = line.replace(constRegex, `_${varName}`);
        modified = true;
        totalFixed++;
        console.log(`   ✓ Prefixed variable with _: ${varName} -> _${varName}`);
      }
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
    console.log(`   💾 Saved changes`);
  }
});

console.log(`\n✅ Complete!`);
console.log(`   Files processed: ${totalFiles}`);
console.log(`   Total fixes: ${totalFixed}`);
console.log(`\nRun 'npm run lint' to verify remaining warnings.\n`);
