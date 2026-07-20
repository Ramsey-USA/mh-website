#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function optionalEnv(name, fallback = "") {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
}

function parseJsonSafe(input, fallback) {
  try {
    return JSON.parse(input);
  } catch {
    return fallback;
  }
}

function scoreColor(score) {
  if (score >= 90) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

function scoreBadge(score) {
  const color = scoreColor(score);
  return `<span style="display:inline-block;min-width:36px;padding:2px 8px;border-radius:4px;background:${color};color:#fff;font-weight:700;text-align:center">${score}</span>`;
}

function parseSummary(summaryPath) {
  if (!fs.existsSync(summaryPath)) {
    return {
      hasSummary: false,
      generatedAt: null,
      successResults: [],
      failedResults: [],
      averages: null,
      topSeoPages: [],
      slowestPages: [],
    };
  }

  const summary = parseJsonSafe(fs.readFileSync(summaryPath, "utf8"), {});
  const results = Array.isArray(summary.results) ? summary.results : [];
  const successResults = results.filter(
    (result) => result?.success && result?.scores,
  );
  const failedResults = results.filter((result) => !result?.success);

  const avg = (key) => {
    if (successResults.length === 0) return null;
    const total = successResults.reduce(
      (sum, item) => sum + Number(item.scores?.[key] ?? 0),
      0,
    );
    return Math.round(total / successResults.length);
  };

  const averages =
    successResults.length > 0
      ? {
          performance: avg("performance"),
          accessibility: avg("accessibility"),
          bestPractices: avg("bestPractices"),
          seo: avg("seo"),
        }
      : null;

  const topSeoPages = [...successResults]
    .sort((a, b) => Number(a.scores.seo) - Number(b.scores.seo))
    .slice(0, 3);

  const slowestPages = [...successResults]
    .sort((a, b) => Number(a.scores.performance) - Number(b.scores.performance))
    .slice(0, 3);

  return {
    hasSummary: true,
    generatedAt: summary.generatedAt || null,
    totalPages: Number(summary.totalPages || results.length || 0),
    successfulAudits: Number(summary.successfulAudits || successResults.length),
    successResults,
    failedResults,
    averages,
    topSeoPages,
    slowestPages,
  };
}

function parseOutdatedPackages() {
  let raw = "{}";
  try {
    raw = execSync("pnpm outdated -r --format json", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    raw = String(error?.stdout || "{}");
  }

  const parsed = parseJsonSafe(raw.trim() || "{}", {});
  const entries = Object.entries(parsed).map(([name, info]) => {
    const current = String(info.current || "");
    const latest = String(info.latest || "");
    const currentMajor = Number(current.split(".")[0] || 0);
    const latestMajor = Number(latest.split(".")[0] || 0);
    const type = latestMajor > currentMajor ? "major" : "minor-or-patch";

    return {
      name,
      current,
      latest,
      type,
      dependencyType: info.dependencyType || "unknown",
      dependents: Array.isArray(info.dependentPackages)
        ? info.dependentPackages.length
        : 0,
    };
  });

  return {
    all: entries,
    majors: entries.filter((entry) => entry.type === "major"),
    safe: entries.filter((entry) => entry.type !== "major"),
  };
}

async function checkEndpoint(baseUrl, endpoint, acceptedStatuses) {
  const url = new URL(endpoint, baseUrl).toString();
  const started = Date.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: {
        "User-Agent": "mh-weekly-platform-digest/1.0",
      },
    });

    const latencyMs = Date.now() - started;
    const status = response.status;
    const ok = acceptedStatuses.includes(status);

    return {
      endpoint,
      url,
      status,
      latencyMs,
      ok,
    };
  } catch (error) {
    return {
      endpoint,
      url,
      status: "ERR",
      latencyMs: Date.now() - started,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function getAbsoluteUrl(baseUrl, rawUrl) {
  if (!rawUrl) return null;
  const value = rawUrl.trim();
  if (!value || value.startsWith("data:") || value.startsWith("blob:")) {
    return null;
  }

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return null;
  }
}

function inferMediaType(url, fallbackType) {
  const lower = String(url).toLowerCase();
  if (fallbackType) return fallbackType;
  if (lower.match(/\.(mp4|webm|mov|m4v|avi)(\?|$)/)) return "video";
  return "image";
}

function extractMediaCandidatesFromHtml(baseUrl, html) {
  const candidates = [];

  const imgRegex = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  let imgMatch = imgRegex.exec(html);
  while (imgMatch) {
    const url = getAbsoluteUrl(baseUrl, imgMatch[1]);
    if (url) {
      candidates.push({ url, mediaType: "image", sourceTag: "img" });
    }
    imgMatch = imgRegex.exec(html);
  }

  const sourceRegex = /<source[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  let sourceMatch = sourceRegex.exec(html);
  while (sourceMatch) {
    const url = getAbsoluteUrl(baseUrl, sourceMatch[1]);
    if (url) {
      candidates.push({
        url,
        mediaType: inferMediaType(url, "video"),
        sourceTag: "source",
      });
    }
    sourceMatch = sourceRegex.exec(html);
  }

  const posterRegex = /<video[^>]*\sposter=["']([^"']+)["'][^>]*>/gi;
  let posterMatch = posterRegex.exec(html);
  while (posterMatch) {
    const url = getAbsoluteUrl(baseUrl, posterMatch[1]);
    if (url) {
      candidates.push({ url, mediaType: "image", sourceTag: "video-poster" });
    }
    posterMatch = posterRegex.exec(html);
  }

  return candidates;
}

async function collectMediaCandidates(baseUrl, pagePaths) {
  const collected = [];
  const pageResults = [];

  for (const pagePath of pagePaths) {
    const pageUrl = new URL(pagePath, baseUrl).toString();
    try {
      const response = await fetch(pageUrl, {
        method: "GET",
        headers: {
          "User-Agent": "mh-weekly-platform-digest/1.0",
        },
      });

      const status = response.status;
      const html = await response.text();
      const pageCandidates = extractMediaCandidatesFromHtml(baseUrl, html);

      pageResults.push({
        pagePath,
        pageUrl,
        status,
        discovered: pageCandidates.length,
      });
      collected.push(...pageCandidates.map((item) => ({ ...item, pagePath })));
    } catch (error) {
      pageResults.push({
        pagePath,
        pageUrl,
        status: "ERR",
        discovered: 0,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const deduped = [];
  const seen = new Set();
  for (const item of collected) {
    if (seen.has(item.url)) continue;
    seen.add(item.url);
    deduped.push(item);
  }

  return { candidates: deduped, pageResults };
}

async function validateMediaAsset(candidate) {
  const acceptedStatuses = [200, 206, 301, 302, 304, 307, 308, 403];

  try {
    const response = await fetch(candidate.url, {
      method: "HEAD",
      redirect: "manual",
      headers: {
        "User-Agent": "mh-weekly-platform-digest/1.0",
      },
    });

    const status = response.status;
    const contentType = response.headers.get("content-type") || "";
    const statusOk = acceptedStatuses.includes(status);
    const typeOk =
      contentType.length === 0 ||
      (candidate.mediaType === "image"
        ? contentType.includes("image/")
        : contentType.includes("video/"));

    return {
      ...candidate,
      status,
      contentType,
      ok: statusOk && typeOk,
      reason: !statusOk ? "status" : !typeOk ? "content-type" : "ok",
    };
  } catch (error) {
    return {
      ...candidate,
      status: "ERR",
      contentType: "",
      ok: false,
      reason: "network",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function evaluateMediaRendering(baseUrl) {
  const pagesToSample = ["/", "/contact", "/projects", "/services", "/careers"];
  const sampleLimit = Number(optionalEnv("MEDIA_SAMPLE_LIMIT", "24"));
  const { candidates, pageResults } = await collectMediaCandidates(
    baseUrl,
    pagesToSample,
  );

  const sampled = candidates.slice(0, Math.max(1, sampleLimit));
  const checks = [];
  for (const candidate of sampled) {
    checks.push(await validateMediaAsset(candidate));
  }

  const passCount = checks.filter((item) => item.ok).length;
  const failCount = checks.length - passCount;

  return {
    pagesToSample,
    pageResults,
    discoveredCount: candidates.length,
    sampledCount: checks.length,
    passCount,
    failCount,
    checks,
  };
}

function healthBadge(ok) {
  return ok
    ? '<span style="color:#166534;font-weight:700">PASS</span>'
    : '<span style="color:#b91c1c;font-weight:700">FAIL</span>';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function fetchPageHtml(baseUrl, pagePath) {
  const pageUrl = new URL(pagePath, baseUrl).toString();
  try {
    const response = await fetch(pageUrl, {
      method: "GET",
      headers: {
        "User-Agent": "mh-weekly-platform-digest/1.0",
      },
    });

    const html = await response.text();
    return {
      pagePath,
      pageUrl,
      status: response.status,
      html,
    };
  } catch (error) {
    return {
      pagePath,
      pageUrl,
      status: "ERR",
      html: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function getHeroSectionChunk(html) {
  const heroClassMatch = html.match(
    /<section[^>]*class=["'][^"']*hero[^"']*["'][^>]*>[\s\S]*?<\/section>/i,
  );
  if (heroClassMatch) return heroClassMatch[0];

  const firstSectionMatch = html.match(/<section[^>]*>[\s\S]*?<\/section>/i);
  return firstSectionMatch ? firstSectionMatch[0] : "";
}

function hasVideoOrAdAsset(htmlChunk) {
  if (!htmlChunk) return false;
  return /<video\b|\.mp4\b|\.webm\b|\/videos\//i.test(htmlChunk);
}

function usesMhLogoFallback(htmlChunk) {
  if (!htmlChunk) return false;
  return /\/images\/logo\/mh-logo[^"'\s>]*\.(png|webp|jpg|jpeg|svg)/i.test(
    htmlChunk,
  );
}

async function evaluateHeroAndLogoCoverage(baseUrl) {
  const pages = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/team",
    "/contact",
    "/careers",
    "/public-sector",
    "/allies",
    "/veterans",
    "/testimonials",
  ];

  const results = [];
  for (const pagePath of pages) {
    const page = await fetchPageHtml(baseUrl, pagePath);
    const heroChunk = getHeroSectionChunk(page.html);
    const hasHeroSection = heroChunk.length > 0;

    results.push({
      pagePath,
      status: page.status,
      hasHeroSection,
      hasVideoOrAdAsset: hasVideoOrAdAsset(heroChunk),
      usesLogoFallbackInHero: usesMhLogoFallback(heroChunk),
      usesLogoFallbackAnywhere: usesMhLogoFallback(page.html),
    });
  }

  return {
    pages,
    results,
    missingHeroVideoPages: results.filter(
      (item) => item.hasHeroSection && !item.hasVideoOrAdAsset,
    ),
    heroLogoFallbackPages: results.filter(
      (item) => item.usesLogoFallbackInHero,
    ),
    siteLogoFallbackPages: results.filter(
      (item) => item.usesLogoFallbackAnywhere,
    ),
  };
}

function parseTestimonialsInUse() {
  const messagesPath = path.join(process.cwd(), "messages", "en.json");
  const data = parseJsonSafe(fs.readFileSync(messagesPath, "utf8"), {});

  const client = Array.isArray(data?.testimonialsData?.clientTestimonials)
    ? data.testimonialsData.clientTestimonials
    : [];
  const employee = Array.isArray(data?.careersPage?.data?.employeeTestimonials)
    ? data.careersPage.data.employeeTestimonials
    : [];

  return {
    client,
    employee,
    featuredClient: client.filter((item) => item?.featured),
    featuredEmployee: employee.filter((item) => item?.featured),
  };
}

function analyzeTeamBioCompleteness() {
  const teamDir = path.join(
    process.cwd(),
    "apps",
    "website",
    "src",
    "lib",
    "data",
    "team",
  );
  const files = fs
    .readdirSync(teamDir)
    .filter((file) => file.endsWith(".json"))
    .sort();

  const members = [];
  for (const file of files) {
    const content = parseJsonSafe(
      fs.readFileSync(path.join(teamDir, file), "utf8"),
      {},
    );
    const name = String(content.name || file.replace(/\.json$/, ""));
    const missing = [];

    const bio = String(content.bio || "").trim();
    if (bio.length < 220) missing.push("bio depth");

    const highlights = Array.isArray(content.careerHighlights)
      ? content.careerHighlights
      : [];
    if (highlights.length < 3) missing.push("career highlights");

    const specialties = Array.isArray(content.specialties)
      ? content.specialties
      : [];
    if (specialties.length < 3) missing.push("specialties");

    if (!String(content.certifications || "").trim()) {
      missing.push("certifications");
    }
    if (!String(content.hobbies || "").trim()) {
      missing.push("hobbies");
    }
    if (!String(content.specialInterests || "").trim()) {
      missing.push("special interests");
    }

    const avatar = String(content.avatar || "");
    if (!avatar || avatar.includes("placeholder")) {
      missing.push("headshot/avatar");
    }

    members.push({
      slug: String(content.slug || file.replace(/\.json$/, "")),
      name,
      missing,
      complete: missing.length === 0,
    });
  }

  return {
    total: members.length,
    complete: members.filter((member) => member.complete),
    needsAttention: members.filter((member) => !member.complete),
  };
}

async function main() {
  const apiKey = requiredEnv("RESEND_API_KEY");
  const toEmail = requiredEnv("REPORT_TO_EMAIL");
  const ccEmail = optionalEnv("REPORT_CC_EMAIL");
  const fromEmail = requiredEnv("REPORT_FROM_EMAIL");
  const baseUrl = optionalEnv("BASE_URL", "https://www.mhc-gc.com");

  const summaryPath = path.join(
    process.cwd(),
    "lighthouse-results",
    "summary.json",
  );
  const lighthouse = parseSummary(summaryPath);
  const outdated = parseOutdatedPackages();
  const media = await evaluateMediaRendering(baseUrl);
  const heroCoverage = await evaluateHeroAndLogoCoverage(baseUrl);
  const testimonialsInUse = parseTestimonialsInUse();
  const teamBioAudit = analyzeTeamBioCompleteness();

  const endpointsToCheck = [
    { endpoint: "/", acceptedStatuses: [200, 301, 302, 307, 308, 403] },
    { endpoint: "/contact", acceptedStatuses: [200, 301, 302, 307, 308, 403] },
    { endpoint: "/projects", acceptedStatuses: [200, 301, 302, 307, 308, 403] },
    {
      endpoint: "/dashboard",
      acceptedStatuses: [200, 301, 302, 307, 308, 401, 403, 404],
    },
    {
      endpoint: "/api/analytics/dashboard/overview",
      acceptedStatuses: [200, 301, 302, 307, 308, 401, 403, 404],
    },
  ];

  const endpointResults = [];
  for (const item of endpointsToCheck) {
    endpointResults.push(
      await checkEndpoint(baseUrl, item.endpoint, item.acceptedStatuses),
    );
  }

  const healthPasses = endpointResults.filter((result) => result.ok).length;
  const healthFails = endpointResults.length - healthPasses;

  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });

  const runTime = now.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });

  const toList = [...new Set([toEmail, ...(ccEmail ? [ccEmail] : [])])];

  const endpointRows = endpointResults
    .map(
      (result) => `
        <tr>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(result.endpoint)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(result.status)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${Math.max(0, Number(result.latencyMs || 0))}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${healthBadge(result.ok)}</td>
        </tr>
      `,
    )
    .join("");

  const lighthouseRows = lighthouse.successResults
    .map(
      (result) => `
        <tr>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(result.name)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${scoreBadge(result.scores.performance)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${scoreBadge(result.scores.accessibility)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${scoreBadge(result.scores.bestPractices)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${scoreBadge(result.scores.seo)}</td>
        </tr>
      `,
    )
    .join("");

  const lowestSeoList = lighthouse.topSeoPages
    .map(
      (result) => `<li>${escapeHtml(result.name)}: ${result.scores.seo}</li>`,
    )
    .join("");

  const slowestPagesList = lighthouse.slowestPages
    .map(
      (result) =>
        `<li>${escapeHtml(result.name)}: ${result.scores.performance}</li>`,
    )
    .join("");

  const majorUpgradeRows = outdated.majors
    .slice(0, 10)
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(item.name)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.current)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.latest)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.dependencyType)}</td>
        </tr>
      `,
    )
    .join("");

  const safeUpgradeRows = outdated.safe
    .slice(0, 10)
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(item.name)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.current)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.latest)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.dependencyType)}</td>
        </tr>
      `,
    )
    .join("");

  const mediaRows = media.checks
    .slice(0, 18)
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(item.pagePath)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(item.mediaType)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(item.status)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(item.contentType || "(none)")}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${healthBadge(item.ok)}</td>
        </tr>
      `,
    )
    .join("");

  const mediaFailuresList = media.checks
    .filter((item) => !item.ok)
    .slice(0, 6)
    .map(
      (item) =>
        `<li>${escapeHtml(item.pagePath)} • ${escapeHtml(item.mediaType)} • ${escapeHtml(String(item.status))} (${escapeHtml(item.reason)})</li>`,
    )
    .join("");

  const heroRows = heroCoverage.results
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0">${escapeHtml(item.pagePath)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${escapeHtml(String(item.status))}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${item.hasVideoOrAdAsset ? healthBadge(true) : healthBadge(false)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${item.usesLogoFallbackInHero ? healthBadge(false) : healthBadge(true)}</td>
          <td style="padding:8px 12px;border-top:1px solid #e2e8f0;text-align:center">${item.usesLogoFallbackAnywhere ? "Yes" : "No"}</td>
        </tr>
      `,
    )
    .join("");

  const missingHeroVideoList = heroCoverage.missingHeroVideoPages
    .slice(0, 8)
    .map((item) => `<li>${escapeHtml(item.pagePath)}</li>`)
    .join("");

  const heroLogoFallbackList = heroCoverage.heroLogoFallbackPages
    .slice(0, 8)
    .map((item) => `<li>${escapeHtml(item.pagePath)}</li>`)
    .join("");

  const siteLogoFallbackList = heroCoverage.siteLogoFallbackPages
    .slice(0, 10)
    .map((item) => `<li>${escapeHtml(item.pagePath)}</li>`)
    .join("");

  const clientTestimonialsList = testimonialsInUse.client
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.name || "Unknown")}</strong> — ${escapeHtml(item.company || "Unknown company")} ${item.featured ? "(featured)" : ""}</li>`,
    )
    .join("");

  const employeeTestimonialsList = testimonialsInUse.employee
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.name || "Unknown")}</strong> — ${escapeHtml(item.title || item.role || "Team Member")} ${item.featured ? "(featured)" : ""}</li>`,
    )
    .join("");

  const teamNeedsAttentionList = teamBioAudit.needsAttention
    .slice(0, 12)
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.name)}</strong>: ${escapeHtml(item.missing.join(", "))}</li>`,
    )
    .join("");

  const executiveSummaryHtml = `
    <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 16px">
      <tr>
        <td style="padding:12px;background:#fff8e1;border:1px solid #f3d47a;border-radius:8px">
          <p style="margin:0 0 6px;font-size:12px;color:#7c5b00;text-transform:uppercase;letter-spacing:.5px;font-weight:700">Forward To Team: Executive Summary</p>
          <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.45">
            Website/dashboard health: <strong>${healthPasses}/${endpointResults.length} pass</strong>. 
            Lighthouse coverage: <strong>${lighthouse.successfulAudits || 0}/${lighthouse.totalPages || 0}</strong>. 
            Media integrity: <strong>${media.passCount}/${media.sampledCount} pass</strong>.
            Hero video gaps: <strong>${heroCoverage.missingHeroVideoPages.length}</strong>. 
            Team bios needing detail: <strong>${teamBioAudit.needsAttention.length}</strong>. 
            Upgrade queue: <strong>${outdated.safe.length}</strong> safe and <strong>${outdated.majors.length}</strong> major candidates.
          </p>
        </td>
      </tr>
    </table>`;

  const lighthouseSummaryBlock = lighthouse.hasSummary
    ? `
      <p style="margin:0 0 12px;color:#334155">
        Audited ${lighthouse.successfulAudits}/${lighthouse.totalPages} pages successfully
        ${lighthouse.generatedAt ? `(${new Date(lighthouse.generatedAt).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT)` : ""}.
      </p>
      ${
        lighthouse.averages
          ? `<p style="margin:0 0 16px;color:#334155">
              Site averages: Perf ${scoreBadge(lighthouse.averages.performance)} · A11y ${scoreBadge(
                lighthouse.averages.accessibility,
              )} · Best ${scoreBadge(lighthouse.averages.bestPractices)} · SEO ${scoreBadge(lighthouse.averages.seo)}
            </p>`
          : ""
      }
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:12px">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="padding:10px 12px;text-align:left">Page</th>
            <th style="padding:10px 12px;text-align:center">Perf</th>
            <th style="padding:10px 12px;text-align:center">A11y</th>
            <th style="padding:10px 12px;text-align:center">Best</th>
            <th style="padding:10px 12px;text-align:center">SEO</th>
          </tr>
        </thead>
        <tbody>
          ${lighthouseRows}
        </tbody>
      </table>
      ${
        lighthouse.failedResults.length > 0
          ? `<p style="margin:8px 0;color:#b91c1c;font-weight:700">${lighthouse.failedResults.length} page(s) failed in Lighthouse.</p>`
          : ""
      }
    `
    : '<p style="margin:0;color:#b45309">Lighthouse summary.json missing for this run.</p>';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Mendl Sans Dusk';color:#0f172a;background:#eef2f7;padding:0;margin:0">
  <div style="max-width:900px;margin:24px auto;background:#ffffff;border-radius:12px;box-shadow:0 2px 10px rgba(15,23,42,.12);overflow:hidden;border:1px solid #dbe4ef">
    <div style="background:linear-gradient(120deg,#0b3a66 0%,#1e3a5f 55%,#2f5c7f 100%);padding:24px 28px;border-bottom:4px solid #c9a227">
      <p style="margin:0;color:#c9a227;font-size:12px;letter-spacing:1.1px;font-weight:700;text-transform:uppercase">MH Construction Weekly Operations Brief</p>
      <h1 style="margin:8px 0 6px;color:#ffffff;font-size:24px;line-height:1.25">Website + Dashboard Condition Report</h1>
      <p style="margin:0;color:#dbe7f2;font-size:14px">Built on Quality, Backed by Trust. • ${escapeHtml(date)} • ${escapeHtml(runTime)} PT</p>
    </div>

    <div style="padding:20px 28px 0;background:#ffffff">
      <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:10px 10px;margin:0 0 12px">
        <tr>
          <td style="background:#f8fbff;border:1px solid #d7e3f3;border-radius:10px;padding:14px 12px;text-align:center;width:33%">
            <p style="margin:0;color:#334155;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px">Health Checks</p>
            <p style="margin:8px 0 0;color:#0f172a;font-size:24px;font-weight:800">${healthPasses}/${endpointResults.length}</p>
            <p style="margin:4px 0 0;color:#64748b;font-size:12px">Passing endpoints</p>
          </td>
          <td style="background:#f8fbff;border:1px solid #d7e3f3;border-radius:10px;padding:14px 12px;text-align:center;width:33%">
            <p style="margin:0;color:#334155;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px">Lighthouse</p>
            <p style="margin:8px 0 0;color:#0f172a;font-size:24px;font-weight:800">${lighthouse.successfulAudits || 0}/${lighthouse.totalPages || 0}</p>
            <p style="margin:4px 0 0;color:#64748b;font-size:12px">Pages audited</p>
          </td>
          <td style="background:#f8fbff;border:1px solid #d7e3f3;border-radius:10px;padding:14px 12px;text-align:center;width:33%">
            <p style="margin:0;color:#334155;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px">Upgrade Signals</p>
            <p style="margin:8px 0 0;color:#0f172a;font-size:24px;font-weight:800">${outdated.all.length}</p>
            <p style="margin:4px 0 0;color:#64748b;font-size:12px">${outdated.safe.length} safe • ${outdated.majors.length} major</p>
          </td>
        </tr>
      </table>
      ${executiveSummaryHtml}
    </div>

    <div style="padding:6px 28px 0;background:#ffffff">
      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Platform Condition</h2>
      <p style="margin:0 0 10px;color:#334155;font-size:14px;line-height:1.45">This section confirms whether core website and dashboard surfaces are reachable and responsive enough for client, marketing, and operations workflows.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:18px;border:1px solid #dbe4ef;border-radius:10px;overflow:hidden">
        <thead>
          <tr style="background:#f1f6fc">
            <th style="padding:10px 12px;text-align:left;color:#334155">Endpoint</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Status</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Latency (ms)</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Result</th>
          </tr>
        </thead>
        <tbody>${endpointRows}</tbody>
      </table>

      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Marketing + UX Analytics Snapshot</h2>
      ${lighthouseSummaryBlock}

      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Media Rendering Integrity</h2>
      <p style="margin:0 0 8px;color:#334155;font-size:14px;line-height:1.45">
        Sampled <strong>${media.sampledCount}</strong> media assets discovered from key pages (out of ${media.discoveredCount} discovered). 
        Result: <strong>${media.passCount} pass</strong>, <strong>${media.failCount} fail</strong>.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:12px;border:1px solid #dbe4ef;border-radius:10px;overflow:hidden">
        <thead>
          <tr style="background:#f1f6fc">
            <th style="padding:10px 12px;text-align:left;color:#334155">Page</th>
            <th style="padding:10px 12px;text-align:left;color:#334155">Type</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Status</th>
            <th style="padding:10px 12px;text-align:left;color:#334155">Content-Type</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Result</th>
          </tr>
        </thead>
        <tbody>${mediaRows || '<tr><td colspan="5" style="padding:8px 12px;border-top:1px solid #e2e8f0">No media assets were discovered in sampled pages.</td></tr>'}</tbody>
      </table>
      ${
        media.failCount > 0
          ? `<p style="margin:0 0 4px;color:#b91c1c;font-weight:700">Media issues flagged:</p><ul style="margin:0 0 14px 18px;color:#b91c1c;line-height:1.4">${mediaFailuresList}</ul>`
          : '<p style="margin:0 0 14px;color:#166534;font-weight:700">No media rendering issues flagged in this sample.</p>'
      }

      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Hero Visual Coverage + Logo Fallback Audit</h2>
      <p style="margin:0 0 8px;color:#334155;font-size:14px;line-height:1.45">
        Tracks where hero sections still need richer video/ad media and where MH logo fallback visuals are still being used.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:12px;border:1px solid #dbe4ef;border-radius:10px;overflow:hidden">
        <thead>
          <tr style="background:#f1f6fc">
            <th style="padding:10px 12px;text-align:left;color:#334155">Page</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Status</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Hero Video/Ad</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Hero Uses Logo Fallback</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Logo Fallback Anywhere</th>
          </tr>
        </thead>
        <tbody>${heroRows}</tbody>
      </table>
      <p style="margin:0 0 4px;color:#334155">Hero sections missing video/ad assets:</p>
      <ul style="margin:0 0 8px 18px;color:#334155;line-height:1.45">${missingHeroVideoList || "<li>None</li>"}</ul>
      <p style="margin:0 0 4px;color:#334155">Hero sections using MH logo fallback imagery:</p>
      <ul style="margin:0 0 8px 18px;color:#334155;line-height:1.45">${heroLogoFallbackList || "<li>None</li>"}</ul>
      <p style="margin:0 0 12px;color:#334155">Pages using MH logo fallback imagery anywhere:</p>
      <ul style="margin:0 0 16px 18px;color:#334155;line-height:1.45">${siteLogoFallbackList || "<li>None</li>"}</ul>

      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Testimonials Currently In Use</h2>
      <p style="margin:0 0 6px;color:#334155">Client testimonials (${testimonialsInUse.client.length} total, ${testimonialsInUse.featuredClient.length} featured):</p>
      <ul style="margin:0 0 10px 18px;color:#334155;line-height:1.45">${clientTestimonialsList || "<li>None</li>"}</ul>
      <p style="margin:0 0 6px;color:#334155">Employee testimonials (${testimonialsInUse.employee.length} total, ${testimonialsInUse.featuredEmployee.length} featured):</p>
      <ul style="margin:0 0 16px 18px;color:#334155;line-height:1.45">${employeeTestimonialsList || "<li>None</li>"}</ul>

      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Team Bio Completion Audit</h2>
      <p style="margin:0 0 8px;color:#334155;font-size:14px;line-height:1.45">
        Complete profiles: <strong>${teamBioAudit.complete.length}/${teamBioAudit.total}</strong>. 
        Profiles needing more depth: <strong>${teamBioAudit.needsAttention.length}</strong>.
      </p>
      <p style="margin:0 0 4px;color:#334155">Members needing additional profile detail:</p>
      <ul style="margin:0 0 16px 18px;color:#334155;line-height:1.45">${teamNeedsAttentionList || "<li>None</li>"}</ul>

      <h3 style="margin:14px 0 6px;font-size:16px;color:#16324f">Priority Watchlist</h3>
      <p style="margin:0 0 4px;color:#334155">Lowest SEO pages this run:</p>
      <ul style="margin:0 0 10px 18px;color:#334155;line-height:1.45">${lowestSeoList || "<li>No data</li>"}</ul>
      <p style="margin:0 0 4px;color:#334155">Lowest performance pages this run:</p>
      <ul style="margin:0 0 16px 18px;color:#334155;line-height:1.45">${slowestPagesList || "<li>No data</li>"}</ul>

      <h2 style="margin:0 0 10px;font-size:19px;color:#16324f">Tech Stack Upgrade Opportunities</h2>
      <p style="margin:0 0 8px;color:#334155">Safe updates (minor/patch) recommended for routine maintenance:</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:14px;border:1px solid #dbe4ef;border-radius:10px;overflow:hidden">
        <thead>
          <tr style="background:#f1f6fc">
            <th style="padding:10px 12px;text-align:left;color:#334155">Package</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Current</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Latest</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Type</th>
          </tr>
        </thead>
        <tbody>${safeUpgradeRows || '<tr><td colspan="4" style="padding:8px 12px;border-top:1px solid #e2e8f0">No safe updates currently.</td></tr>'}</tbody>
      </table>

      <p style="margin:0 0 8px;color:#334155">Major upgrades needing deliberate review and testing:</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:8px;border:1px solid #dbe4ef;border-radius:10px;overflow:hidden">
        <thead>
          <tr style="background:#f1f6fc">
            <th style="padding:10px 12px;text-align:left;color:#334155">Package</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Current</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Latest</th>
            <th style="padding:10px 12px;text-align:center;color:#334155">Type</th>
          </tr>
        </thead>
        <tbody>${majorUpgradeRows || '<tr><td colspan="4" style="padding:8px 12px;border-top:1px solid #e2e8f0">No major upgrades currently.</td></tr>'}</tbody>
      </table>

      <table role="presentation" style="width:100%;border-collapse:collapse;margin:14px 0 8px">
        <tr>
          <td style="padding:10px 12px;background:#f8fbff;border:1px solid #dbe4ef;border-radius:8px">
            <p style="margin:0 0 4px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.5px">Recommended Next Actions</p>
            <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.45">1) Resolve any endpoint failures first. 2) Prioritize the lowest SEO/performance pages for marketing and UX wins. 3) Batch safe upgrades this week and stage major upgrades behind targeted testing.</p>
          </td>
        </tr>
      </table>

      <p style="margin:16px 0 22px;font-size:12px;color:#64748b">
        Full workflow logs and artifacts:
        <a href="https://github.com/Ramsey-USA/mh-website/actions/workflows/lighthouse-weekly.yml" style="color:#1e3a5f;font-weight:700">weekly report workflow</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  if (optionalEnv("DRY_RUN", "0") === "1") {
    console.log("DRY_RUN enabled. Email payload preview:");
    console.log(
      JSON.stringify(
        {
          from: fromEmail,
          to: toList,
          subject: `Weekly Platform Health + Upgrade Digest — ${date}`,
          htmlLength: html.length,
          endpointChecks: endpointResults,
          mediaChecks: {
            discovered: media.discoveredCount,
            sampled: media.sampledCount,
            pass: media.passCount,
            fail: media.failCount,
          },
          heroCoverage: {
            missingVideoCount: heroCoverage.missingHeroVideoPages.length,
            heroLogoFallbackCount: heroCoverage.heroLogoFallbackPages.length,
            siteLogoFallbackCount: heroCoverage.siteLogoFallbackPages.length,
          },
          testimonialsInUse: {
            client: testimonialsInUse.client.length,
            employee: testimonialsInUse.employee.length,
          },
          teamBioAudit: {
            total: teamBioAudit.total,
            complete: teamBioAudit.complete.length,
            needsAttention: teamBioAudit.needsAttention.length,
          },
          updateCounts: {
            total: outdated.all.length,
            safe: outdated.safe.length,
            major: outdated.majors.length,
          },
        },
        null,
        2,
      ),
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toList,
      subject: `Weekly Platform Health + Upgrade Digest — ${date}`,
      html,
    }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Resend API error: ${JSON.stringify(body)}`);
  }

  console.log(`Weekly digest emailed successfully. ID: ${body.id}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
