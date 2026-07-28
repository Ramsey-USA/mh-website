/**
 * @jest-environment node
 */

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function writeFixtureFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function buildTerminologyLibraryJson() {
  return JSON.stringify(
    {
      library: {
        name: "MH Construction Brand Terms Library",
        version: "2.0",
      },
      categories: {
        commandStructure: [{ brandTerm: "Command Center", standardTerm: "HQ" }],
        programAndProcess: [
          { brandTerm: "Mission Brief", standardTerm: "Pre-Task Meeting" },
        ],
        qualityAndAccountability: [
          {
            brandTerm: "Zero-Gap Accountability",
            standardTerm: "Full Compliance",
          },
        ],
        safetyAndTechnicalExecution: [
          {
            brandTerm: "Safety Command Standards",
            standardTerm: "Safety Requirements",
          },
        ],
        leadershipAndCulture: [
          { brandTerm: "Relationship-First", standardTerm: "Client-Focused" },
        ],
        enterpriseAdditionsV2: [
          {
            brandTerm: "Operational Theater",
            standardTerm: "Project Site / Jobsite",
          },
          { brandTerm: "Mission Parameters", standardTerm: "Project Scope" },
          { brandTerm: "Force Multiplier", standardTerm: "Efficiency Gain" },
          { brandTerm: "Boots on the Ground", standardTerm: "Field Crew" },
          {
            brandTerm: "Rules of Engagement (ROE)",
            standardTerm: "Project Contract",
          },
          {
            brandTerm: "Situation Report (SITREP)",
            standardTerm: "Project Status Update",
          },
          {
            brandTerm: "Ground Truth",
            standardTerm: "Verified Field Conditions",
          },
          {
            brandTerm: "Mission Accomplished",
            standardTerm: "Project Closeout",
          },
          {
            brandTerm: "Operational Tempo",
            standardTerm: "Project Schedule / Pace",
          },
          {
            brandTerm: "Standby to Standby",
            standardTerm: "On Call / Ready to Mobilize",
          },
        ],
      },
      requiredPairs: [
        { concept: "Safety Program" },
        { concept: "Employee Operations" },
        { concept: "External Audience" },
      ],
      regulatoryProtectionRules: {
        protectedTerms: [
          "Competent Person",
          "Qualified Person",
          "Authorized Person",
          "Hazard Communication",
          "Personal Protective Equipment (PPE)",
          "Stop Work Authority",
          "Incident",
        ],
      },
    },
    null,
    2,
  );
}

function buildPageNamesFixture({ includeRoeAlias }) {
  return `
const PHRASE_NORMALIZATION_ALIASES = {
  "operational theater": "Project Site",
  "mission parameters": "Project Scope",
  "force multiplier": "Efficiency Gain",
  "boots on the ground": "Field Crew",
  "situation report": "Project Status Update",
  "situation report (sitrep)": "Project Status Update",
  "sitrep": "Project Status Update",
  "ground truth": "Verified Field Conditions",
  "mission accomplished": "Project Closeout",
  "operational tempo": "Project Schedule / Pace",
  "standby to standby": "On Call / Ready to Mobilize",
  ${includeRoeAlias ? '"rules of engagement (roe)": "Project Contract",' : ""}
};

const PHRASE_REGEX_REPLACEMENTS = [
  [/\\bOperational Theater\\b/gi, "Project Site"],
  [/\\bMission Parameters\\b/gi, "Project Scope"],
  [/\\bForce Multiplier\\b/gi, "Efficiency Gain"],
  [/\\bBoots on the Ground\\b/gi, "Field Crew"],
  [/\\bSituation Report\\b/gi, "Project Status Update"],
  [/\\bGround Truth\\b/gi, "Verified Field Conditions"],
  [/\\bMission Accomplished\\b/gi, "Project Closeout"],
  [/\\bOperational Tempo\\b/gi, "Project Schedule / Pace"],
  [/\\bStandby to Standby\\b/gi, "On Call / Ready to Mobilize"],
  ${includeRoeAlias ? '[/\\bRules of Engagement(?:\\s*\\(ROE\\))?\\b/gi, "Project Contract"],' : ""}
];
`;
}

describe("Client terminology guardrails parity", () => {
  const appRoot = path.resolve(__dirname, "..", "..", "..");
  const scriptPath = path.join(
    appRoot,
    "scripts",
    "validation",
    "check-client-terminology-guardrails.js",
  );

  it("passes when terminology library and page names parity is intact", () => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "mh-terminology-guardrails-pass-"),
    );
    const terminologyPath = path.join(tempDir, "terminology-library.json");
    const pageNamesPath = path.join(tempDir, "page-names.ts");

    writeFixtureFile(terminologyPath, buildTerminologyLibraryJson());
    writeFixtureFile(
      pageNamesPath,
      buildPageNamesFixture({ includeRoeAlias: true }),
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        TERMINOLOGY_LIBRARY_FILE: terminologyPath,
        PAGE_NAMES_FILE: pageNamesPath,
      },
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      "PASS: Client terminology guardrails check (no detour-risk phrasing found).",
    );
    expect(result.stderr).toBe("");
  });

  it("fails with a clear message when an enterprise alias is missing", () => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "mh-terminology-guardrails-fail-"),
    );
    const terminologyPath = path.join(tempDir, "terminology-library.json");
    const pageNamesPath = path.join(tempDir, "page-names.ts");

    writeFixtureFile(terminologyPath, buildTerminologyLibraryJson());
    writeFixtureFile(
      pageNamesPath,
      buildPageNamesFixture({ includeRoeAlias: false }),
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        TERMINOLOGY_LIBRARY_FILE: terminologyPath,
        PAGE_NAMES_FILE: pageNamesPath,
      },
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Page terminology aliases are missing enterprise term 'Rules of Engagement (ROE)'",
    );
  });
});
