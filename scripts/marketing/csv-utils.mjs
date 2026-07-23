import fs from "node:fs";

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === ",") {
      values.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  values.push(current);
  return values;
}

function splitCsvRows(raw) {
  const rows = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];

    if (ch === '"') {
      if (inQuotes && raw[i + 1] === '"') {
        current += '""';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      current += ch;
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && raw[i + 1] === "\n") {
        i += 1;
      }
      if (current.trim().length > 0) {
        rows.push(current);
      }
      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim().length > 0) {
    rows.push(current);
  }

  return rows;
}

export function readCsvFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const rows = splitCsvRows(raw);
  if (rows.length === 0) {
    return [];
  }

  const headers = parseCsvLine(rows[0]).map((header) => header.trim());
  return rows.slice(1).map((row) => {
    const cells = parseCsvLine(row);
    const record = {};

    headers.forEach((header, index) => {
      record[header] = (cells[index] ?? "").trim();
    });

    return record;
  });
}

export function readCsvFileWithHeaders(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const rows = splitCsvRows(raw);
  if (rows.length === 0) {
    return {
      headers: [],
      rows: [],
    };
  }

  const headers = parseCsvLine(rows[0]).map((header) => header.trim());
  const parsedRows = rows.slice(1).map((row) => {
    const cells = parseCsvLine(row);
    const record = {};

    headers.forEach((header, index) => {
      record[header] = (cells[index] ?? "").trim();
    });

    return record;
  });

  return {
    headers,
    rows: parsedRows,
  };
}

export function escapeCsvCell(value) {
  const str = value == null ? "" : String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function writeCsvFile(filePath, headers, rows) {
  const lines = [headers.map(escapeCsvCell).join(",")];
  for (const row of rows) {
    lines.push(
      headers.map((header) => escapeCsvCell(row[header] ?? "")).join(","),
    );
  }
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

export function normalizeKey(...parts) {
  return parts
    .map((part) =>
      String(part ?? "")
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean)
    .join("|");
}
