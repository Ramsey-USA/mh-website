#!/usr/bin/env node

/**
 * Submit sitemap updates to supported search engines.
 *
 * Supports:
 * - Bing sitemap ping endpoint
 * - Yandex sitemap ping endpoint
 * - Optional Baidu URL push API (requires BAIDU_PUSH_TOKEN)
 *
 * Notes:
 * - Google no longer supports public sitemap ping endpoints.
 * - Yahoo sitemap handling is generally inherited from Bing crawl data.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mhc-gc.com"
).replace(/\/$/, "");
const sitemapUrls = [`${siteUrl}/sitemap.xml`, `${siteUrl}/sitemap-index.xml`];

async function main() {
  const results = [];

  for (const sitemapUrl of sitemapUrls) {
    results.push(
      await ping(
        "Bing",
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      ),
    );
    results.push(
      await ping(
        "Yandex",
        `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      ),
    );
  }

  if (process.env.BAIDU_PUSH_TOKEN) {
    results.push(await pushBaiduUrls(siteUrl, process.env.BAIDU_PUSH_TOKEN));
  } else {
    results.push({
      engine: "Baidu",
      ok: false,
      status: "skipped",
      details: "Set BAIDU_PUSH_TOKEN to enable API push.",
    });
  }

  if (process.env.INDEXNOW_KEY) {
    results.push(await submitIndexNow(siteUrl, process.env.INDEXNOW_KEY));
  } else {
    results.push({
      engine: "IndexNow",
      ok: false,
      status: "skipped",
      details: "Set INDEXNOW_KEY to submit URLs to Bing/Yandex via IndexNow.",
    });
  }

  results.push({
    engine: "Google",
    ok: false,
    status: "manual",
    details: "Submit sitemap(s) in Google Search Console.",
  });
  results.push({
    engine: "Yahoo",
    ok: false,
    status: "manual",
    details: "Yahoo discovery is typically handled via Bing indexing.",
  });

  printSummary(results);

  const hasFailure = results.some(
    (result) => result.status === "failed" || result.status === "error",
  );

  process.exitCode = hasFailure ? 1 : 0;
}

async function ping(engine, url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "user-agent": "MHC-Sitemap-Submitter/1.0",
      },
    });

    if (engine === "Bing" && response.status === 410) {
      return {
        engine,
        ok: false,
        status: "deprecated",
        details:
          "Bing sitemap ping endpoint is deprecated. Use Bing Webmaster console or IndexNow.",
        endpoint: url,
      };
    }

    if (!response.ok) {
      return {
        engine,
        ok: false,
        status: "failed",
        details: `${response.status} ${response.statusText}`,
        endpoint: url,
      };
    }

    return {
      engine,
      ok: true,
      status: "submitted",
      details: `${response.status} ${response.statusText}`,
      endpoint: url,
    };
  } catch (error) {
    return {
      engine,
      ok: false,
      status: "error",
      details: error instanceof Error ? error.message : "Unknown error",
      endpoint: url,
    };
  }
}

async function submitIndexNow(siteBaseUrl, key) {
  const apiUrl = "https://api.indexnow.org/indexnow";
  const payload = {
    host: siteBaseUrl.replace(/^https?:\/\//, ""),
    key,
    keyLocation: `${siteBaseUrl}/${key}.txt`,
    urlList: [
      `${siteBaseUrl}/`,
      `${siteBaseUrl}/en`,
      `${siteBaseUrl}/es`,
      `${siteBaseUrl}/sitemap.xml`,
      `${siteBaseUrl}/sitemap-index.xml`,
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "user-agent": "MHC-Sitemap-Submitter/1.0",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        engine: "IndexNow",
        ok: false,
        status: "failed",
        details: `${response.status} ${response.statusText}`,
      };
    }

    return {
      engine: "IndexNow",
      ok: true,
      status: "submitted",
      details: `${response.status} ${response.statusText}`,
    };
  } catch (error) {
    return {
      engine: "IndexNow",
      ok: false,
      status: "error",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function pushBaiduUrls(siteBaseUrl, token) {
  const apiUrl = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(siteBaseUrl)}&token=${encodeURIComponent(token)}`;
  const urls = [
    `${siteBaseUrl}/`,
    `${siteBaseUrl}/es`,
    `${siteBaseUrl}/sitemap.xml`,
    `${siteBaseUrl}/sitemap-index.xml`,
  ].join("\n");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "text/plain",
        "user-agent": "MHC-Sitemap-Submitter/1.0",
      },
      body: urls,
    });

    const responseBody = await response.text();

    if (!response.ok) {
      return {
        engine: "Baidu",
        ok: false,
        status: "failed",
        details: `${response.status} ${response.statusText}: ${responseBody}`,
      };
    }

    return {
      engine: "Baidu",
      ok: true,
      status: "submitted",
      details: responseBody || `${response.status} ${response.statusText}`,
    };
  } catch (error) {
    return {
      engine: "Baidu",
      ok: false,
      status: "error",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function printSummary(results) {
  console.log("\nSitemap submission summary\n");
  for (const result of results) {
    const marker = result.ok ? "PASS" : "INFO";
    console.log(
      `[${marker}] ${result.engine}: ${result.status} - ${result.details}`,
    );
    if (result.endpoint) {
      console.log(`       endpoint: ${result.endpoint}`);
    }
  }
  console.log("");
}

main();
