const fs = require("fs");
const http = require("http");

async function getUrls() {
  const urls = new Set();
  if (fs.existsSync("all_pages.txt")) {
    const content = fs.readFileSync("all_pages.txt", "utf8");
    content.split("\n").forEach((line) => {
      let path = line.trim();
      if (!path) return;
      path = path
        .replace("apps/website/src/app/", "/")
        .replace("/page.tsx", "");
      if (path === "") path = "/";
      if (!path.includes("[")) urls.add(path);
    });
  }

  const configs = [
    {
      file: "apps/website/src/lib/data/faq-data.ts",
      regex: /id:\s*['"]([^'"]+)['"]/g,
      prefix: "/faq/",
    },
    {
      file: "apps/website/src/lib/data/service-routes.ts",
      regex: /slug:\s*['"]([^'"]+)['"]/g,
      prefix: "/services/",
    },
    {
      file: "apps/website/src/lib/data/project-case-studies.ts",
      regex: /slug:\s*['"]([^'"]+)['"]/g,
      prefix: "/projects/",
    },
    {
      file: "apps/website/src/lib/data/safety-manual-clusters.ts",
      regex: /slug:\s*['"]([^'"]+)['"]/g,
      prefix: "/resources/safety-manual/",
    },
  ];

  configs.forEach((cfg) => {
    if (fs.existsSync(cfg.file)) {
      const content = fs.readFileSync(cfg.file, "utf8");
      let match;
      while ((match = cfg.regex.exec(content)) !== null) {
        urls.add(cfg.prefix + match[1]);
      }
    }
  });

  if (fs.existsSync("apps/website/src/lib/data/locations.ts")) {
    const content = fs.readFileSync(
      "apps/website/src/lib/data/locations.ts",
      "utf8",
    );
    const locRegex = /^\s*([a-z\-]+):\s*\{/gm;
    let match;
    while ((match = locRegex.exec(content)) !== null) {
      urls.add(`/locations/${match[1]}`);
    }
  }

  urls.add("/safety/print/test");
  urls.add("/resources/safety-manual/section/program-foundation");
  return Array.from(urls).sort();
}

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
        if (body.length > 50000) req.destroy();
      });
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", (e) => resolve({ status: "ERROR", error: e.message }));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ status: "TIMEOUT" });
    });
  });
}

const errorSigs = [
  "Application error",
  "Unhandled Runtime Error",
  "Internal Server Error",
  "ReferenceError:",
  "TypeError:",
  "Error:",
];

async function run() {
  const urls = await getUrls();
  console.log(`Auditing ${urls.length} URLs...`);
  const results = [];
  for (const path of urls) {
    const res = await fetchUrl(`http://localhost:3000${path}`);
    const sigs =
      res.status === 200 && res.body
        ? errorSigs.filter((s) => res.body.includes(s))
        : [];
    results.push({ path, status: res.status, sigs });
  }

  const stats = {};
  const fails = [];
  const soft = [];
  results.forEach((r) => {
    stats[r.status] = (stats[r.status] || 0) + 1;
    if (r.status >= 400 || r.status === "ERROR" || r.status === "TIMEOUT") {
      fails.push(`${r.path} (${r.status})`);
    }
    if (r.sigs.length) soft.push(`${r.path} (${r.sigs.join(", ")})`);
  });

  console.log("\n--- AUDIT SUMMARY ---");
  console.log(`Total URLs: ${results.length}`);
  Object.entries(stats).forEach(([s, c]) => console.log(`Status ${s}: ${c}`));
  if (fails.length) {
    console.log("\nFailures:");
    fails.forEach((f) => console.log(`  ${f}`));
  }
  if (soft.length) {
    console.log("\nSoft Errors:");
    soft.forEach((s) => console.log(`  ${s}`));
  }
  console.log(
    `\n${fails.length || soft.length ? "✗ Issues detected" : "✓ All pages rendering"}`,
  );
}
run();
