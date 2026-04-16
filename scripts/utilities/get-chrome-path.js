#!/usr/bin/env node

const fs = require("fs");

function firstExistingPath(candidates) {
  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function getChromePath() {
  const envPath = process.env.CHROME_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }

  try {
    const puppeteer = require("puppeteer");
    const puppeteerPath = puppeteer.executablePath();
    if (puppeteerPath && fs.existsSync(puppeteerPath)) {
      return puppeteerPath;
    }
  } catch {
    // Fall through to common binary locations.
  }

  return firstExistingPath([
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ]);
}

module.exports = { getChromePath };
