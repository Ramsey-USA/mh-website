const path = require("node:path");
const { createRequire } = require("node:module");

const CANDIDATE_PACKAGE_ROOTS = [
  path.resolve(__dirname, "../../"),
  path.resolve(__dirname, "../../apps/website"),
  path.resolve(__dirname, "../../apps/dashboard"),
];

function createPackageRequire(packageRoot) {
  return createRequire(path.join(packageRoot, "package.json"));
}

function loadTailwindPlugin(packageName) {
  for (const packageRoot of CANDIDATE_PACKAGE_ROOTS) {
    try {
      const packageRequire = createPackageRequire(packageRoot);
      return packageRequire(packageName);
    } catch {
      // Keep probing workspace package roots until we find a valid install.
    }
  }

  const searchedRoots = CANDIDATE_PACKAGE_ROOTS.map((root) => `- ${root}`).join(
    "\n",
  );
  throw new Error(
    [
      `[tailwind] Could not resolve ${packageName}.`,
      "Searched package roots:",
      searchedRoots,
      'Run "pnpm install" at the repository root to restore workspace dependency links.',
    ].join("\n"),
  );
}

function getWorkspaceTailwindPlugins(options = {}) {
  const { forms = true, typography = true, aspectRatio = true } = options;
  const plugins = [];

  if (forms) {
    plugins.push(loadTailwindPlugin("@tailwindcss/forms"));
  }

  if (typography) {
    plugins.push(loadTailwindPlugin("@tailwindcss/typography"));
  }

  if (aspectRatio) {
    plugins.push(loadTailwindPlugin("@tailwindcss/aspect-ratio"));
  }

  return plugins;
}

module.exports = {
  getWorkspaceTailwindPlugins,
};
