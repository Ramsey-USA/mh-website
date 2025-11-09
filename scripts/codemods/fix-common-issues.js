#!/usr/bin/env node
/**
 * Codemod: fix-common-issues
 *
 * Automatically applies repetitive TypeScript fixes:
 * 1. catch (error) -> catch (_error) and replace usages inside block
 * 2. logger.error(..., error) / console.error(..., error) when catch declares _error: replace with _error
 * 3. key={index} when map((x, _index)) -> key={_index}
 * 4. `${index + 1}` or other template occurrences inside map with _index variable
 * 5. Replace bare 'index' occurrences in JSX attribute positions when callback param is _index
 * 6. Add missing logger import where logger.error is used but logger not imported
 * 7. Replace setSubmitStatus("_error") with setSubmitStatus("error")
 * 8. Ensure throw error; inside catch (_error) becomes throw _error;
 * 9. Add 'override' modifier to React class component methods (componentDidCatch, render) when extending Component
 * 10. Remove unused default React import (convert 'import React, { useState }' to 'import { useState }')
 *
 * This focuses on safe textual transforms; complex type shape fixes are left manual.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const SRC = path.join(ROOT, "src");
const LOOSE = process.argv.includes("--loose");

/** File extensions we process */
const exts = new Set([".ts", ".tsx"]);

/** Collect all files recursively */
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function hasLoggerImport(content) {
  return (
    /from\s+"@\/lib\/utils\/logger"/.test(content) ||
    /require\(.*logger.*\)/.test(content)
  );
}

function addLoggerImport(content) {
  if (hasLoggerImport(content)) return content;
  // Insert after first import line
  const lines = content.split("\n");
  let inserted = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^import /.test(lines[i])) {
      lines.splice(i + 1, 0, 'import { logger } from "@/lib/utils/logger";');
      inserted = true;
      break;
    }
  }
  if (!inserted) {
    lines.unshift('import { logger } from "@/lib/utils/logger";');
  }
  return lines.join("\n");
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let content = original;
  let changed = false;

  // 1 & 2: Normalize catch blocks
  // catch (error) => catch (_error)
  content = content.replace(/catch\s*\((error)\)/g, (m, g1) => {
    changed = true;
    return "catch (_error)";
  });
  // Replace usages of variable 'error' (not method names) inside catch blocks we changed
  if (/catch \(_error\)/.test(content)) {
    const before = content;
    content = content.replace(
      /(catch \(_error\)[^{}]*\{[\s\S]*?\})/g,
      (segment) => {
        // Replace bare variable references 'error' but avoid method names like logger.error or console.error
        let seg = segment.replace(/(?<!\.)\berror\b/g, "_error");
        // Also if there's 'throw error;' change to 'throw _error;'
        seg = seg.replace(/throw\s+_?error\s*;/g, "throw _error;");
        return seg;
      },
    );
    if (content !== before) changed = true;
  }

  // 3/4/5: key/index fixes inside map callbacks
  // Find patterns: map((..., _index) => ... key={index}
  const mapIndexRegex = /map\(\(([^)]*?_index[^)]*)\)=>\s*\{/g; // coarse
  // We'll just global replace key={index} -> key={_index} when _index present earlier in file
  if (/map\([^)]*_index/.test(content)) {
    const before = content;
    content = content.replace(/key={index}/g, "key={_index}");
    content = content.replace(/\bindex \+ 1\b/g, "_index + 1");
    content = content.replace(/\bindex\b/g, (match) => {
      // avoid replacing inside words
      return "_index";
    });
    if (content !== before) changed = true;
  }

  // Limit over-replacement by reverting occurrences where index is actually declared
  // If '(item, index)' exists we shouldn't have replaced those. Simple revert for map((..., index)
  if (
    /map\([^)]*index[^)]*\)/.test(content) &&
    !/map\([^)]*_index[^)]*\)/.test(content)
  ) {
    // revert _index back to index for those contexts
    const before = content;
    content = content.replace(/_index/g, "index");
    if (content !== before) changed = true;
  }

  // Revert any accidental 'logger._error' or 'console._error' from previous runs
  if (/logger\._error\(/.test(content) || /console\._error\(/.test(content)) {
    const before = content;
    content = content.replace(/logger\._error\(/g, "logger.error(");
    content = content.replace(/console\._error\(/g, "console.error(");
    if (content !== before) changed = true;
  }

  // 6: Add logger import if logger.error present and no import
  if (/logger\.error\(/.test(content) && !hasLoggerImport(content)) {
    content = addLoggerImport(content);
    changed = true;
  }

  // 7: setSubmitStatus("_error") literal -> setSubmitStatus("error")
  if (/setSubmitStatus\("_error"\)/.test(content)) {
    const before = content;
    content = content.replace(
      /setSubmitStatus\("_error"\)/g,
      'setSubmitStatus("error")',
    );
    if (content !== before) changed = true;
  }

  // 8: throw error; (outside earlier catch replacement) -> throw _error; if inside catch (_error) block
  if (/catch \(_error\)/.test(content) && /throw error;/.test(content)) {
    const before = content;
    content = content.replace(/catch \(_error\)([^{]*\{[\s\S]*?\})/g, (block) =>
      block.replace(/throw\s+error\s*;/g, "throw _error;"),
    );
    if (content !== before) changed = true;
  }

  // 9: Add override modifier for React class components
  if (/extends Component/.test(content)) {
    const before = content;
    content = content.replace(
      /(\n\s*)(componentDidCatch\s*\()/g,
      "$1override componentDidCatch(",
    );
    content = content.replace(/(\n\s*)(render\s*\()/g, "$1override render(");
    if (content !== before) changed = true;
  }

  // 10: Remove unused default React import
  if (/import React, \{/.test(content)) {
    // Check if React identifier is used (React.) or <React.Fragment>
    if (!/React\./.test(content) && !/<React\./.test(content)) {
      const before = content;
      content = content.replace(
        /import React, \{([^}]*)\} from "react";/g,
        'import {$1} from "react";',
      );
      if (content !== before) changed = true;
    }
  } else if (/import React from "react";/.test(content)) {
    if (!/React\./.test(content) && !/<React\./.test(content)) {
      const before = content;
      content = content.replace(/import React from "react";\n?/g, "");
      if (content !== before) changed = true;
    }
  }

  // Loose mode patches for unknown callback params in common patterns
  if (LOOSE) {
    let beforeLoose = content;
    // Annotate filter/map/reduce callbacks where second param is untyped (m, user, metric)
    content = content.replace(/\.filter\(\(m\)\s*=>/g, ".filter((m: any) =>");
    content = content.replace(/\.map\(\(user\)\s*=>/g, ".map((user: any) =>");
    content = content.replace(
      /\.map\(\(message\)\s*=>/g,
      ".map((message: any) =>",
    );
    content = content.replace(
      /\.reduce\(\(sum,\s*m\)\s*=>/g,
      ".reduce((sum: any, m: any) =>",
    );
    content = content.replace(/forEach\(\(m\)\s*=>/g, "forEach((m: any) =>");
    if (content !== beforeLoose) changed = true;
  }

  if (changed && content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

function main() {
  const files = walk(SRC).filter((f) => exts.has(path.extname(f)));
  let modifiedCount = 0;
  for (const f of files) {
    if (processFile(f)) modifiedCount++;
  }
  console.log(`Codemod complete. Modified ${modifiedCount} files.`);
}

main();
