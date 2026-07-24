#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const DB_ID = "98ad144a-cfe2-4f19-a55c-c43140279840";
const EVENT_SLUG = "operation-cast-recover-2026";
const DEFAULT_OUT_DIR = path.join(
  process.cwd(),
  "tmp",
  "events",
  "operation-cast-recover",
  "print-sheets",
);

const QUERIES = {
  confirmedVeterans: `SELECT full_name, branch_of_service, phone, email, emergency_contact, tshirt_size, created_at
FROM cast_recover_registrations
WHERE event_slug = '${EVENT_SLUG}'
  AND registration_type = 'veteran'
  AND roster_status = 'confirmed'
ORDER BY created_at ASC;`,
  alternateVeterans: `SELECT full_name, branch_of_service, phone, email, emergency_contact, tshirt_size, created_at
FROM cast_recover_registrations
WHERE event_slug = '${EVENT_SLUG}'
  AND registration_type = 'veteran'
  AND roster_status = 'alternate'
ORDER BY created_at ASC;`,
  captains: `SELECT full_name, phone, email, vessel_type_length, passenger_capacity, gear_notes, created_at
FROM cast_recover_registrations
WHERE event_slug = '${EVENT_SLUG}'
  AND registration_type = 'captain'
ORDER BY created_at ASC;`,
};

function stripAnsi(text) {
  return text.replace(/\u001b\[[0-9;]*m/g, "");
}

function toCsvCell(value) {
  const raw = value === null || value === undefined ? "" : String(value);
  const escaped = raw.replace(/"/g, '""');
  return `"${escaped}"`;
}

function toCsv(rows, columns) {
  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns.map((column) => toCsvCell(row[column])).join(","),
  );
  return [header, ...lines].join("\n");
}

function markdownTable(rows, columns, headers) {
  const headerRow = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row, index) => {
    const values = columns.map((column) => {
      const value = row[column];
      if (value === null || value === undefined || value === "") return "-";
      return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
    });
    return `| ${index + 1} | ${values.join(" | ")} |`;
  });

  if (body.length === 0) {
    body.push(`| - | ${columns.map(() => "-").join(" | ")} |`);
  }

  return [headerRow, divider, ...body].join("\n");
}

function parseWranglerJson(stdout) {
  const cleanOut = stripAnsi(stdout).trim();

  const tryParse = (candidate) => {
    try {
      return JSON.parse(candidate);
    } catch {
      return null;
    }
  };

  const direct = tryParse(cleanOut);
  if (direct) return direct;

  const starts = [cleanOut.indexOf("["), cleanOut.indexOf("{")]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b);

  for (const index of starts) {
    const parsed = tryParse(cleanOut.slice(index));
    if (parsed) return parsed;
  }

  throw new Error("Unable to parse Wrangler JSON output.");
}

function extractRows(parsed) {
  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      if (Array.isArray(item)) return item;
      if (item && Array.isArray(item.results)) return item.results;
      if (item && item.result && Array.isArray(item.result)) {
        return extractRows(item.result);
      }
    }
  }

  if (parsed && typeof parsed === "object") {
    if (Array.isArray(parsed.results)) return parsed.results;
    if (Array.isArray(parsed.result)) return extractRows(parsed.result);
    if (parsed.result && Array.isArray(parsed.result.results)) {
      return parsed.result.results;
    }
  }

  return [];
}

function runQuery(sql) {
  const args = [
    "exec",
    "wrangler",
    "d1",
    "execute",
    DB_ID,
    "--remote",
    `--command=${sql}`,
    "--json",
  ];

  const result = spawnSync("pnpm", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env,
  });

  if (result.status !== 0) {
    const stderr = stripAnsi(result.stderr || "").trim();
    const stdout = stripAnsi(result.stdout || "").trim();
    throw new Error(
      [
        "Wrangler query failed.",
        stderr ? `stderr: ${stderr}` : "",
        stdout ? `stdout: ${stdout}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  const parsed = parseWranglerJson(result.stdout || "");
  return extractRows(parsed);
}

function buildPrintableMarkdown(confirmedRows, alternateRows, captainRows) {
  const generatedAt = new Date().toISOString();

  const confirmedTable = markdownTable(
    confirmedRows,
    [
      "full_name",
      "branch_of_service",
      "phone",
      "email",
      "emergency_contact",
      "tshirt_size",
      "created_at",
    ],
    [
      "#",
      "Name",
      "Branch",
      "Phone",
      "Email",
      "Emergency Contact",
      "T-Shirt",
      "Registered",
    ],
  );

  const alternateTable = markdownTable(
    alternateRows,
    [
      "full_name",
      "branch_of_service",
      "phone",
      "email",
      "emergency_contact",
      "tshirt_size",
      "created_at",
    ],
    [
      "#",
      "Name",
      "Branch",
      "Phone",
      "Email",
      "Emergency Contact",
      "T-Shirt",
      "Registered",
    ],
  );

  const captainTable = markdownTable(
    captainRows,
    [
      "full_name",
      "phone",
      "email",
      "vessel_type_length",
      "passenger_capacity",
      "gear_notes",
      "created_at",
    ],
    [
      "#",
      "Captain",
      "Phone",
      "Email",
      "Vessel",
      "Capacity",
      "Gear Notes",
      "Registered",
    ],
  );

  return `# Operation: Cast & Recover - Event Day Print Sheets

Generated: ${generatedAt}
Event slug: ${EVENT_SLUG}

## Summary

- Confirmed veterans: ${confirmedRows.length}
- Alternate veterans: ${alternateRows.length}
- Captains: ${captainRows.length}

## Confirmed Veterans

${confirmedTable}

## Alternate Veterans

${alternateTable}

## Captains

${captainTable}
`;
}

function fit(value, width) {
  const normalized = value === null || value === undefined ? "" : String(value);
  const singleLine = normalized.replace(/\s+/g, " ").trim();
  if (singleLine.length <= width) {
    return singleLine.padEnd(width, " ");
  }
  if (width <= 1) return singleLine.slice(0, width);
  return `${singleLine.slice(0, width - 1)}…`;
}

function formatIsoDate(value) {
  if (!value) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().slice(0, 16).replace("T", " ");
}

async function buildPrintablePdf(confirmedRows, alternateRows, captainRows) {
  let PDFDocument;
  let StandardFonts;
  let rgb;

  try {
    ({ PDFDocument, StandardFonts, rgb } = require("pdf-lib"));
  } catch {
    throw new Error(
      "pdf-lib is required to generate print PDF. Install dependencies and retry.",
    );
  }

  const pdf = await PDFDocument.create();
  pdf.setTitle("Operation: Cast & Recover Event Day Print Sheets");
  pdf.setAuthor("MH Construction, Inc.");
  pdf.setSubject("Veteran and captain event-day rosters");
  pdf.setKeywords(["MH Construction", "Operation Cast and Recover", "roster"]);

  const regular = await pdf.embedFont(StandardFonts.Courier);
  const bold = await pdf.embedFont(StandardFonts.CourierBold);

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 36;
  const bodySize = 10;
  const headingSize = 14;
  const lineHeight = 13;
  const bottomBuffer = 48;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const newPage = () => {
    page = pdf.addPage([pageWidth, pageHeight]);
    y = pageHeight - margin;
  };

  const ensureSpace = (lines = 1) => {
    if (y - lines * lineHeight < bottomBuffer) {
      newPage();
    }
  };

  const drawText = (text, options = {}) => {
    ensureSpace(1);
    page.drawText(text, {
      x: options.x ?? margin,
      y,
      size: options.size ?? bodySize,
      font: options.bold ? bold : regular,
      color: rgb(0.06, 0.09, 0.14),
    });
    y -= options.lineHeight ?? lineHeight;
  };

  const drawRule = () => {
    ensureSpace(1);
    page.drawLine({
      start: { x: margin, y: y + 4 },
      end: { x: pageWidth - margin, y: y + 4 },
      thickness: 0.75,
      color: rgb(0.72, 0.76, 0.8),
    });
    y -= 8;
  };

  const drawSection = (title, subtitle, header, rows, rowFormatter) => {
    ensureSpace(5);
    drawText(title, { bold: true, size: headingSize, lineHeight: 18 });
    drawText(subtitle, { bold: false, size: 9, lineHeight: 12 });
    drawRule();
    drawText(header, { bold: true });
    drawText("-".repeat(Math.min(header.length, 100)), {
      bold: false,
      size: 9,
    });

    if (rows.length === 0) {
      drawText("No entries.", { size: 10 });
      y -= 8;
      return;
    }

    for (let index = 0; index < rows.length; index += 1) {
      const line = rowFormatter(rows[index], index);
      drawText(line, { size: 9.5, lineHeight: 12 });
    }

    y -= 8;
  };

  drawText("MH Construction - Operation: Cast & Recover", {
    bold: true,
    size: 16,
    lineHeight: 20,
  });
  drawText("Event Day Print Sheets", {
    bold: true,
    size: 12,
    lineHeight: 16,
  });
  drawText(`Generated: ${new Date().toISOString()}`, {
    size: 9,
    lineHeight: 12,
  });
  drawText(`Event slug: ${EVENT_SLUG}`, { size: 9, lineHeight: 12 });
  drawText(
    `Summary - Confirmed veterans: ${confirmedRows.length} | Alternate veterans: ${alternateRows.length} | Captains: ${captainRows.length}`,
    { size: 9, lineHeight: 12 },
  );
  y -= 6;

  drawSection(
    "Confirmed Veterans",
    "Use checkbox at left for dock check-in.",
    "[ ] #  Name                     Branch       Phone           Shirt  Registered",
    confirmedRows,
    (row, index) =>
      `[ ] ${String(index + 1).padStart(2, "0")} ${fit(row.full_name, 24)} ${fit(row.branch_of_service, 12)} ${fit(row.phone, 14)} ${fit(row.tshirt_size, 6)} ${fit(formatIsoDate(row.created_at), 16)}`,
  );

  drawSection(
    "Alternate Veterans",
    "Promote in order as slots open.",
    "[ ] #  Name                     Branch       Phone           Shirt  Registered",
    alternateRows,
    (row, index) =>
      `[ ] ${String(index + 1).padStart(2, "0")} ${fit(row.full_name, 24)} ${fit(row.branch_of_service, 12)} ${fit(row.phone, 14)} ${fit(row.tshirt_size, 6)} ${fit(formatIsoDate(row.created_at), 16)}`,
  );

  drawSection(
    "Captains",
    "Use checkbox at left for launch confirmation.",
    "[ ] #  Captain                  Phone           Capacity  Vessel                    Registered",
    captainRows,
    (row, index) =>
      `[ ] ${String(index + 1).padStart(2, "0")} ${fit(row.full_name, 24)} ${fit(row.phone, 14)} ${fit(row.passenger_capacity, 8)} ${fit(row.vessel_type_length, 24)} ${fit(formatIsoDate(row.created_at), 16)}`,
  );

  drawText("Notes:", { bold: true, size: 10 });
  for (let i = 0; i < 8; i += 1) {
    drawText(
      "________________________________________________________________________________",
      {
        size: 9,
        lineHeight: 12,
      },
    );
  }

  return pdf.save();
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseOutDirArg(argv) {
  const outFlagIndex = argv.indexOf("--outDir");
  if (outFlagIndex >= 0) {
    const value = argv[outFlagIndex + 1];
    if (!value) {
      throw new Error("Missing value for --outDir");
    }
    return path.resolve(process.cwd(), value);
  }
  return DEFAULT_OUT_DIR;
}

function printHelp() {
  console.log(
    `Usage:\n  node scripts/events/export-cast-recover-print-sheets.js [--outDir <path>]\n\nExamples:\n  pnpm run event:cast-recover:print-sheets\n  node scripts/events/export-cast-recover-print-sheets.js --outDir tmp/custom-print\n`,
  );
}

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printHelp();
    return;
  }

  const outDir = parseOutDirArg(process.argv);
  ensureDir(outDir);

  const confirmedRows = runQuery(QUERIES.confirmedVeterans);
  const alternateRows = runQuery(QUERIES.alternateVeterans);
  const captainRows = runQuery(QUERIES.captains);

  const confirmedCsv = toCsv(confirmedRows, [
    "full_name",
    "branch_of_service",
    "phone",
    "email",
    "emergency_contact",
    "tshirt_size",
    "created_at",
  ]);

  const alternateCsv = toCsv(alternateRows, [
    "full_name",
    "branch_of_service",
    "phone",
    "email",
    "emergency_contact",
    "tshirt_size",
    "created_at",
  ]);

  const captainsCsv = toCsv(captainRows, [
    "full_name",
    "phone",
    "email",
    "vessel_type_length",
    "passenger_capacity",
    "gear_notes",
    "created_at",
  ]);

  const printableMarkdown = buildPrintableMarkdown(
    confirmedRows,
    alternateRows,
    captainRows,
  );
  const printablePdf = await buildPrintablePdf(
    confirmedRows,
    alternateRows,
    captainRows,
  );

  const outputs = [
    {
      fileName: "cast-recover-confirmed-veterans.csv",
      content: confirmedCsv,
    },
    {
      fileName: "cast-recover-alternate-veterans.csv",
      content: alternateCsv,
    },
    {
      fileName: "cast-recover-captains.csv",
      content: captainsCsv,
    },
    {
      fileName: "cast-recover-event-day-print-sheet.md",
      content: printableMarkdown,
    },
  ];

  for (const output of outputs) {
    fs.writeFileSync(
      path.join(outDir, output.fileName),
      output.content,
      "utf8",
    );
  }

  const pdfPath = path.join(outDir, "cast-recover-event-day-print-sheet.pdf");
  fs.writeFileSync(pdfPath, Buffer.from(printablePdf));

  console.log("Cast & Recover print sheets generated:");
  for (const output of outputs) {
    console.log(`- ${path.join(outDir, output.fileName)}`);
  }
  console.log(`- ${pdfPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
