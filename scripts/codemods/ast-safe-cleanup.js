#!/usr/bin/env node
/**
 * AST-safe cleanup codemod.
 *
 * This script intentionally uses the TypeScript parser so it can make
 * surgical edits without the broad text replacements that previously broke
 * callback indexes and catch variables.
 *
 * Default mode is dry-run. Pass --write to apply changes.
 *
 * Current transforms:
 * 1. Remove empty named imports: import {} from "...";
 * 2. Remove unused default React imports while preserving named imports.
 * 3. Rename catch clause variables to underscored names and update in-scope refs.
 * 4. Rename unused callback index params like index -> _index.
 * 5. Repair callback bodies that reference index while the callback param is _index.
 * 6. Repair logger._error(...) / console._error(...) back to .error(...).
 * 7. Repair setSubmitStatus("_error") back to setSubmitStatus("error").
 * 8. Normalize a small allowlist of Tailwind utility aliases in literal className strings.
 */

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = path.join(__dirname, "..", "..");
const APPS_DIR = path.join(ROOT, "apps");
const IGNORE_DIRS = new Set([
  ".git",
  ".next",
  ".open-next",
  ".swc",
  "coverage",
  "dist",
  "build",
  "node_modules",
]);
const CALLBACK_METHODS = new Set([
  "map",
  "filter",
  "forEach",
  "some",
  "every",
  "flatMap",
  "find",
  "findIndex",
]);
const CLASSNAME_TOKEN_REPLACEMENTS = new Map([
  ["flex-shrink-0", "shrink-0"],
  ["flex-grow", "grow"],
  ["break-words", "wrap-break-word"],
]);

const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const VERBOSE = args.includes("--verbose") || args.includes("-v");
const appArg = args.find((arg) => arg.startsWith("--app="));
const targetApps = appArg
  ? new Set(
      appArg
        .slice("--app=".length)
        .split(",")
        .map((value) => value.trim()),
    )
  : null;

const stats = {
  filesScanned: 0,
  filesChanged: 0,
  emptyImportsRemoved: 0,
  reactImportsCleaned: 0,
  catchVariablesRenamed: 0,
  callbackParamsRenamed: 0,
  callbackIndexFixes: 0,
  loggerCallFixes: 0,
  submitStatusFixes: 0,
  classNameFixes: 0,
};

function replaceClassNameTokens(rawText) {
  let nextText = rawText;
  let replacements = 0;

  for (const [fromToken, toToken] of CLASSNAME_TOKEN_REPLACEMENTS) {
    const tokenPattern = new RegExp(`(^|\\s)${fromToken}(?=\\s|$)`, "g");
    nextText = nextText.replace(tokenPattern, (match, prefix) => {
      replacements += 1;
      return `${prefix}${toToken}`;
    });
  }

  return { nextText, replacements };
}

function maybeQueueClassNameCleanup(edits, sourceFile, node, literalNode) {
  const classNameText = literalNode.text;
  const { nextText, replacements } = replaceClassNameTokens(classNameText);

  if (replacements === 0 || nextText === classNameText) {
    return;
  }

  const replacementText = ts.isNoSubstitutionTemplateLiteral(literalNode)
    ? `\`${nextText}\``
    : JSON.stringify(nextText);

  pushEdit(
    edits,
    literalNode.getStart(sourceFile),
    literalNode.getEnd(),
    replacementText,
    "classNameFix",
  );
  stats.classNameFixes += replacements;
}

function getSourceRoots() {
  if (!fs.existsSync(APPS_DIR)) {
    throw new Error(`Apps directory not found: ${APPS_DIR}`);
  }

  return fs
    .readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !targetApps || targetApps.has(entry.name))
    .map((entry) => path.join(APPS_DIR, entry.name, "src"))
    .filter((dirPath) => fs.existsSync(dirPath));
}

function collectSourceFiles() {
  const files = [];
  const extensions = new Set([".ts", ".tsx"]);

  function walk(dirPath) {
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      if (entry.isDirectory() && IGNORE_DIRS.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (extensions.has(path.extname(fullPath))) {
        files.push(fullPath);
      }
    }
  }

  for (const root of getSourceRoots()) {
    walk(root);
  }

  return files;
}

function createSourceFile(filePath, content) {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.TS;
  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
}

function isDeclarationName(node) {
  const parent = node.parent;
  if (!parent) {
    return false;
  }

  return (
    (ts.isVariableDeclaration(parent) && parent.name === node) ||
    (ts.isParameter(parent) && parent.name === node) ||
    (ts.isFunctionDeclaration(parent) && parent.name === node) ||
    (ts.isFunctionExpression(parent) && parent.name === node) ||
    (ts.isArrowFunction(parent) && parent.name === node) ||
    (ts.isClassDeclaration(parent) && parent.name === node) ||
    (ts.isClassExpression(parent) && parent.name === node) ||
    (ts.isInterfaceDeclaration(parent) && parent.name === node) ||
    (ts.isTypeAliasDeclaration(parent) && parent.name === node) ||
    (ts.isEnumDeclaration(parent) && parent.name === node) ||
    (ts.isMethodDeclaration(parent) && parent.name === node) ||
    (ts.isPropertyDeclaration(parent) && parent.name === node) ||
    (ts.isPropertySignature(parent) && parent.name === node) ||
    (ts.isImportClause(parent) && parent.name === node) ||
    (ts.isImportSpecifier(parent) && parent.name === node) ||
    (ts.isNamespaceImport(parent) && parent.name === node) ||
    (ts.isImportEqualsDeclaration(parent) && parent.name === node) ||
    (ts.isBindingElement(parent) && parent.name === node) ||
    (ts.isTypeParameterDeclaration(parent) && parent.name === node) ||
    (ts.isCatchClause(parent) && parent.variableDeclaration === node)
  );
}

function isReferenceIdentifier(node) {
  if (!ts.isIdentifier(node) || isDeclarationName(node)) {
    return false;
  }

  const parent = node.parent;
  if (!parent) {
    return true;
  }

  if (ts.isPropertyAccessExpression(parent) && parent.name === node) {
    return false;
  }

  if (ts.isPropertyAssignment(parent) && parent.name === node) {
    return false;
  }

  if (ts.isMethodDeclaration(parent) && parent.name === node) {
    return false;
  }

  if (ts.isPropertyDeclaration(parent) && parent.name === node) {
    return false;
  }

  if (ts.isPropertySignature(parent) && parent.name === node) {
    return false;
  }

  if (ts.isJsxAttribute(parent) && parent.name === node) {
    return false;
  }

  if (ts.isQualifiedName(parent) && parent.right === node) {
    return false;
  }

  return true;
}

function hasNestedDeclarationNamed(node, name) {
  let found = false;

  function visit(current) {
    if (found) {
      return;
    }

    if (
      current !== node &&
      ts.isIdentifier(current) &&
      current.text === name &&
      isDeclarationName(current)
    ) {
      found = true;
      return;
    }

    ts.forEachChild(current, visit);
  }

  ts.forEachChild(node, visit);
  return found;
}

function collectReferenceIdentifiers(node, name) {
  const refs = [];

  function visit(current) {
    if (
      ts.isIdentifier(current) &&
      current.text === name &&
      isReferenceIdentifier(current)
    ) {
      refs.push(current);
    }

    ts.forEachChild(current, visit);
  }

  visit(node);
  return refs;
}

function findLineStart(text, index) {
  const newLineIndex = text.lastIndexOf("\n", index - 1);
  return newLineIndex === -1 ? 0 : newLineIndex + 1;
}

function findLineEnd(text, index) {
  const newLineIndex = text.indexOf("\n", index);
  return newLineIndex === -1 ? text.length : newLineIndex + 1;
}

function pushEdit(edits, start, end, text, kind) {
  if (start === end && text === "") {
    return;
  }
  edits.push({ start, end, text, kind });
}

function pushFullLineRemoval(edits, sourceText, node, kind) {
  const start = findLineStart(sourceText, node.getStart());
  const end = findLineEnd(sourceText, node.getEnd());
  pushEdit(edits, start, end, "", kind);
}

function applyEdits(content, edits) {
  return edits
    .sort((left, right) => right.start - left.start)
    .reduce(
      (nextContent, edit) =>
        nextContent.slice(0, edit.start) +
        edit.text +
        nextContent.slice(edit.end),
      content,
    );
}

function visitFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const sourceFile = createSourceFile(filePath, content);
  const edits = [];

  function visit(node) {
    if (
      ts.isJsxAttribute(node) &&
      node.name.text === "className" &&
      node.initializer
    ) {
      if (ts.isStringLiteral(node.initializer)) {
        maybeQueueClassNameCleanup(edits, sourceFile, node, node.initializer);
      } else if (
        ts.isJsxExpression(node.initializer) &&
        node.initializer.expression &&
        (ts.isStringLiteral(node.initializer.expression) ||
          ts.isNoSubstitutionTemplateLiteral(node.initializer.expression))
      ) {
        maybeQueueClassNameCleanup(
          edits,
          sourceFile,
          node,
          node.initializer.expression,
        );
      }
    }

    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "className" &&
      (ts.isStringLiteral(node.initializer) ||
        ts.isNoSubstitutionTemplateLiteral(node.initializer))
    ) {
      maybeQueueClassNameCleanup(edits, sourceFile, node, node.initializer);
    }

    if (ts.isImportDeclaration(node)) {
      const importClause = node.importClause;
      const namedBindings = importClause && importClause.namedBindings;

      if (
        importClause &&
        namedBindings &&
        ts.isNamedImports(namedBindings) &&
        namedBindings.elements.length === 0
      ) {
        pushFullLineRemoval(edits, content, node, "emptyImport");
        stats.emptyImportsRemoved += 1;
        return;
      }

      if (
        importClause &&
        importClause.name &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        node.moduleSpecifier.text === "react"
      ) {
        const defaultName = importClause.name.text;
        const reactRefs = collectReferenceIdentifiers(
          sourceFile,
          defaultName,
        ).filter((ref) => ref !== importClause.name);

        if (reactRefs.length === 0) {
          if (importClause.namedBindings) {
            pushEdit(
              edits,
              importClause.name.getStart(sourceFile),
              importClause.namedBindings.getStart(sourceFile),
              "",
              "reactImport",
            );
          } else {
            pushFullLineRemoval(edits, content, node, "reactImport");
          }
          stats.reactImportsCleaned += 1;
        }
      }
    }

    if (
      ts.isCatchClause(node) &&
      node.variableDeclaration &&
      ts.isIdentifier(node.variableDeclaration.name)
    ) {
      const originalName = node.variableDeclaration.name.text;
      if (
        !originalName.startsWith("_") &&
        !hasNestedDeclarationNamed(node.block, originalName)
      ) {
        const nextName =
          originalName === "error" ? "_error" : `_${originalName}`;
        const refs = collectReferenceIdentifiers(node.block, originalName);
        pushEdit(
          edits,
          node.variableDeclaration.name.getStart(sourceFile),
          node.variableDeclaration.name.getEnd(),
          nextName,
          "catchVariable",
        );
        for (const ref of refs) {
          pushEdit(
            edits,
            ref.getStart(sourceFile),
            ref.getEnd(),
            nextName,
            "catchVariable",
          );
        }
        stats.catchVariablesRenamed += 1;
      }
    }

    if (
      ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === "logger" ||
        node.expression.text === "console") &&
      node.name.text === "_error"
    ) {
      pushEdit(
        edits,
        node.name.getStart(sourceFile),
        node.name.getEnd(),
        "error",
        "loggerCallFix",
      );
      stats.loggerCallFixes += 1;
    }

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "setSubmitStatus" &&
      node.arguments.length >= 1 &&
      ts.isStringLiteral(node.arguments[0]) &&
      node.arguments[0].text === "_error"
    ) {
      pushEdit(
        edits,
        node.arguments[0].getStart(sourceFile),
        node.arguments[0].getEnd(),
        '"error"',
        "submitStatusFix",
      );
      stats.submitStatusFixes += 1;
    }

    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression)
    ) {
      const methodName = node.expression.name.text;
      const callback = node.arguments[0];

      if (
        CALLBACK_METHODS.has(methodName) &&
        callback &&
        (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) &&
        callback.parameters.length >= 2 &&
        ts.isIdentifier(callback.parameters[1].name)
      ) {
        const indexParam = callback.parameters[1].name;
        const paramName = indexParam.text;
        const body = callback.body;

        if (!paramName.startsWith("_")) {
          const refs = collectReferenceIdentifiers(body, paramName);
          if (refs.length === 0) {
            const nextName = paramName === "index" ? "_index" : `_${paramName}`;
            pushEdit(
              edits,
              indexParam.getStart(sourceFile),
              indexParam.getEnd(),
              nextName,
              "callbackParam",
            );
            stats.callbackParamsRenamed += 1;
          }
        } else if (
          paramName === "_index" &&
          !hasNestedDeclarationNamed(body, "index")
        ) {
          const brokenRefs = collectReferenceIdentifiers(body, "index");
          if (brokenRefs.length > 0) {
            for (const ref of brokenRefs) {
              pushEdit(
                edits,
                ref.getStart(sourceFile),
                ref.getEnd(),
                "_index",
                "callbackIndexFix",
              );
            }
            stats.callbackIndexFixes += 1;
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (edits.length === 0) {
    return null;
  }

  return {
    filePath,
    content,
    nextContent: applyEdits(content, edits),
    edits,
  };
}

function main() {
  const files = collectSourceFiles();

  console.log("🧠 AST-safe cleanup codemod\n");
  console.log(WRITE ? "✍️  WRITE MODE\n" : "🔍 DRY RUN MODE\n");

  for (const filePath of files) {
    stats.filesScanned += 1;
    const result = visitFile(filePath);
    if (!result || result.nextContent === result.content) {
      continue;
    }

    stats.filesChanged += 1;

    if (VERBOSE) {
      const kinds = [...new Set(result.edits.map((edit) => edit.kind))].join(
        ", ",
      );
      console.log(`• ${path.relative(ROOT, filePath)} (${kinds})`);
    }

    if (WRITE) {
      fs.writeFileSync(filePath, result.nextContent, "utf8");
    }
  }

  console.log("Summary");
  console.log("=======");
  console.log(`Files scanned:            ${stats.filesScanned}`);
  console.log(`Files changed:            ${stats.filesChanged}`);
  console.log(`Empty imports removed:    ${stats.emptyImportsRemoved}`);
  console.log(`React imports cleaned:    ${stats.reactImportsCleaned}`);
  console.log(`Catch vars renamed:       ${stats.catchVariablesRenamed}`);
  console.log(`Callback params renamed:  ${stats.callbackParamsRenamed}`);
  console.log(`Broken index refs fixed:  ${stats.callbackIndexFixes}`);
  console.log(`Logger call fixes:        ${stats.loggerCallFixes}`);
  console.log(`Submit status fixes:      ${stats.submitStatusFixes}`);
  console.log(`className token fixes:    ${stats.classNameFixes}`);

  if (!WRITE) {
    console.log("\nRun with --write to apply these edits.");
  }
}

try {
  main();
} catch (error) {
  console.error(
    "\n❌ AST-safe cleanup failed:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}
