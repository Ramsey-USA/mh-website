/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";
import { CONTENT_ANGLES, MARKETING_PHASES } from "@/lib/data/project-marketing";
import { PROJECT_MARKETING_RECORDS } from "@/lib/data/project-marketing-records";
import { eventRecords } from "@/lib/data/events";

type JsonRecord = Record<string, unknown>;

const ROOT_MESSAGES_DIR = path.resolve(process.cwd(), "..", "..", "messages");
const HOME_MESSAGES_DIR = path.join(ROOT_MESSAGES_DIR, "home");

const DISALLOWED_COPY_PATTERNS = [
  "award-winning",
  "world-class",
  "best in",
  "#1",
  "guaranteed",
  "seamless",
  "cutting-edge",
  "state-of-the-art",
] as const;

function loadJson(filePath: string): JsonRecord {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as JsonRecord;
}

function getNestedValue(obj: JsonRecord, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object" || Array.isArray(acc)) {
      return undefined;
    }

    return (acc as JsonRecord)[key];
  }, obj);
}

function collectStrings(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") {
    into.push(value);
    return into;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectStrings(item, into);
    }
    return into;
  }

  if (value && typeof value === "object") {
    for (const nestedValue of Object.values(value as JsonRecord)) {
      collectStrings(nestedValue, into);
    }
  }

  return into;
}

function collectKeyPaths(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  const keys = Object.keys(value as JsonRecord);
  if (keys.length === 0) {
    return prefix ? [prefix] : [];
  }

  return keys.flatMap((key) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    return collectKeyPaths((value as JsonRecord)[key], nextPrefix);
  });
}

describe("Project marketing system guardrails", () => {
  it("TAXONOMY CONTRACT: marketing phases and content angles are exact and ordered", () => {
    expect(MARKETING_PHASES).toEqual([
      "preconstruction",
      "active",
      "closing",
      "post-launch",
    ]);

    expect(CONTENT_ANGLES).toEqual([
      "schedule-transparency",
      "field-progress",
      "safety-controls",
      "quality-closeout",
      "partnership-proof",
    ]);
  });

  it("EVIDENCE GATE CONTRACT: records enforce media/review/milestone quality", () => {
    for (const record of PROJECT_MARKETING_RECORDS) {
      for (const mediaAsset of record.mediaAssets) {
        expect(mediaAsset.src).toMatch(/^\/images\/projects\/|^\/media\//);
      }

      if (record.walkthrough.status === "live") {
        expect(record.walkthrough.embedUrl?.trim()).toBeTruthy();
      }

      for (const review of record.reviews) {
        expect(review.quote.trim().length).toBeGreaterThan(0);
        expect(Number.isInteger(review.rating)).toBe(true);
        expect(review.rating).toBeGreaterThanOrEqual(1);
        expect(review.rating).toBeLessThanOrEqual(5);
      }

      for (const milestone of record.milestones) {
        expect(milestone.title).not.toMatch(/TBD|lorem|placeholder/i);
        if (milestone.eventHref) {
          expect(milestone.eventHref).toMatch(/^\/events(\/|#|$)/);
        }
      }
    }
  });

  it("CROSS-LINK CONTRACT: event and project references only point to existing records", () => {
    const knownProjectSlugs = new Set(
      PROJECT_MARKETING_RECORDS.map((record) => record.slug),
    );

    for (const event of eventRecords) {
      if (event.projectSlug) {
        expect(knownProjectSlugs.has(event.projectSlug)).toBe(true);
      }
    }

    const knownEventSlugs = new Set(eventRecords.map((event) => event.slug));
    for (const record of PROJECT_MARKETING_RECORDS) {
      for (const milestone of record.milestones) {
        if (!milestone.eventHref) {
          continue;
        }

        const withoutPrefix = milestone.eventHref.replace(/^\/events\//, "");
        const beforeHash = withoutPrefix.split("#")[0] ?? "";
        const eventSlug = beforeHash.split("?")[0] ?? "";
        expect(eventSlug.length).toBeGreaterThan(0);
        expect(knownEventSlugs.has(eventSlug)).toBe(true);
      }
    }
  });

  it("COPY PHRASING CONTRACT: banned phrases are absent from controlled namespaces", () => {
    const enRoot = loadJson(path.join(ROOT_MESSAGES_DIR, "en.json"));
    const enHome = loadJson(path.join(HOME_MESSAGES_DIR, "en.json"));

    const namespaceValues = [
      getNestedValue(enRoot, "projectMarketing"),
      getNestedValue(enRoot, "activeProjects"),
      getNestedValue(enRoot, "googleReviews"),
      getNestedValue(enRoot, "podcastPage"),
      getNestedValue(enHome, "behindTheTech"),
    ];

    const fullText = collectStrings(namespaceValues).join("\n").toLowerCase();

    for (const bannedPhrase of DISALLOWED_COPY_PATTERNS) {
      expect(fullText).not.toContain(bannedPhrase);
    }
  });

  it("LOCALE PARITY CONTRACT: new namespaces are key-complete in EN and ES", () => {
    const enRoot = loadJson(path.join(ROOT_MESSAGES_DIR, "en.json"));
    const esRoot = loadJson(path.join(ROOT_MESSAGES_DIR, "es.json"));
    const enHome = loadJson(path.join(HOME_MESSAGES_DIR, "en.json"));
    const esHome = loadJson(path.join(HOME_MESSAGES_DIR, "es.json"));

    const rootNamespaces = [
      "projectMarketing",
      "activeProjects",
      "googleReviews",
      "podcastPage",
    ];

    for (const namespace of rootNamespaces) {
      const enNamespace = getNestedValue(enRoot, namespace);
      const esNamespace = getNestedValue(esRoot, namespace);
      expect(enNamespace).toBeDefined();
      expect(esNamespace).toBeDefined();

      expect(collectKeyPaths(enNamespace)).toEqual(
        collectKeyPaths(esNamespace),
      );
      expect(collectKeyPaths(esNamespace)).toEqual(
        collectKeyPaths(enNamespace),
      );
    }

    const enBehindTheTech = getNestedValue(enHome, "behindTheTech");
    const esBehindTheTech = getNestedValue(esHome, "behindTheTech");
    expect(enBehindTheTech).toBeDefined();
    expect(esBehindTheTech).toBeDefined();
    expect(collectKeyPaths(enBehindTheTech)).toEqual(
      collectKeyPaths(esBehindTheTech),
    );
    expect(collectKeyPaths(esBehindTheTech)).toEqual(
      collectKeyPaths(enBehindTheTech),
    );
  });
});
