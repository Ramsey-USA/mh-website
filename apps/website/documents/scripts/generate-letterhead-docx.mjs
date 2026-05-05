/**
 * MH Construction — Word (.docx) letterhead generator.
 *
 * Why this exists:
 *   The PDF letterhead has a fillable body that, by PDF spec, can only
 *   scroll within its fixed box — it cannot reflow onto a second page.
 *   Word's layout engine *can* auto-paginate, so for any letter longer
 *   than a few paragraphs the .docx is the official deliverable. The
 *   PDF stays as a quick-fill option for short notes.
 *
 * What this generates:
 *   - Page 1 with full identity header (logo + company info + accent rule)
 *   - Address / from / job-bid / subject table (tan labels, hunter-green
 *     bold typed text — same visual language as the PDF letterhead)
 *   - Empty body paragraph that auto-flows to page 2, 3, N as the user types
 *   - Page footer (repeats every page) with company contact, AGC + BBB +
 *     WA VOB seals, chamber logos, and the veteran-owned mission strip
 *
 * Usage:
 *   import { generateLetterheadDocx } from "./generate-letterhead-docx.mjs";
 *   await generateLetterheadDocx({ outPath, brand, docsDir });
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import sharp from "sharp";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeaderFooterType,
  HeightRule,
  ImageRun,
  Packer,
  PageOrientation,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
  convertInchesToTwip,
} from "docx";

// ── Brand color helpers ──────────────────────────────────────────────────────
const stripHash = (hex) => (hex || "").replace(/^#/, "").toUpperCase();

// ── Image loader (converts WebP → PNG so docx can embed it) ──────────────────
async function loadImageBytes(absPath) {
  const bytes = await readFile(absPath);
  if (/\.webp$/i.test(absPath)) {
    return { data: await sharp(bytes).png().toBuffer(), type: "png" };
  }
  if (/\.jpe?g$/i.test(absPath)) return { data: bytes, type: "jpg" };
  return { data: bytes, type: "png" };
}

async function loadAllImages(brand, docsDir) {
  const root = resolve(docsDir, "..");
  const A = (rel) => resolve(docsDir, rel);
  const P = (rel) => resolve(root, rel);
  return {
    logo: await loadImageBytes(A("assets/logo-color.png")),
    agc: await loadImageBytes(A("assets/AGC-seal-v1.webp")),
    bbb: await loadImageBytes(A("assets/bbb/bbb-accredited-seal.png")),
    vob: await loadImageBytes(
      P("public/images/logo/veteran-owned-business.jpg"),
    ),
    pasco: await loadImageBytes(
      P("public/images/credentials/Pasco-Chamber-logo-color-transparent.png"),
    ),
    richland: await loadImageBytes(
      P("public/images/credentials/Richland-Chamber-logo-full-color.png"),
    ),
    kennewick: await loadImageBytes(
      P(
        "public/images/credentials/Kennewick-TriCity-Regional-Chamber-logo-horizontal.png",
      ),
    ),
  };
}

// ── Styling primitives ───────────────────────────────────────────────────────
// Aptos — Microsoft 365's default sans-serif since 2024 (designed by Steve
// Matteson, the creator of Segoe UI). It's a clean, professional grotesque
// that pairs well with the MH brand's modern architectural identity. Word
// substitutes Calibri/Arial automatically on systems without Aptos, so this
// is safe across Word 2016+, Word for Mac, Word Online, and Google Docs.
const FONT_BODY = "Aptos";
const FONT_DISPLAY = "Aptos Display"; // tighter heavier cut for big headers

function label(text, color) {
  // Field label — small caps, letter-spaced, darker tan
  return new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: FONT_BODY,
        size: 13, // 6.5pt (half-points)
        bold: true,
        color: stripHash(color),
        characterSpacing: 24, // ~0.16em letter-spacing
      }),
    ],
  });
}

function fillSlot(placeholder) {
  // Fillable line — empty paragraph styled as 12pt bold hunter-green so
  // when the user clicks and types, their text adopts the official look.
  return new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        text: placeholder || "",
        font: FONT_BODY,
        size: 24, // 12pt
        bold: true,
        color: stripHash("#1E392C"), // primaryDark
      }),
    ],
  });
}

function plain(text, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: opts.spacing || { before: 0, after: 0 },
    children: [
      new TextRun({
        text,
        font: opts.font || FONT_BODY,
        size: opts.size ?? 22, // 11pt
        bold: !!opts.bold,
        italics: !!opts.italic,
        color: opts.color ? stripHash(opts.color) : undefined,
        characterSpacing: opts.spacingChars,
      }),
    ],
  });
}

// ── Header (page 1) — tagline strip + logo + QR panel ────────────────────────
function buildHeader(brand, images, qrPng) {
  const tan = stripHash(brand.colors.secondaryText);
  const hunter = stripHash(brand.colors.primary);

  // Top tagline strip (matches PDF): company+city left, founding year right.
  const taglineRow = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noTableBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noCellBorders(),
            margins: { top: 0, bottom: 60, left: 0, right: 0 },
            children: [
              plain(
                `${brand.companyShort.toUpperCase()}  •  ${brand.addressCityStateZip.toUpperCase()}`,
                {
                  bold: true,
                  size: 14, // 7pt
                  color: brand.colors.primaryDark,
                  spacingChars: 30,
                },
              ),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noCellBorders(),
            margins: { top: 0, bottom: 60, left: 0, right: 0 },
            children: [
              plain(
                `FOUNDED 2010, ${brand.tagline.replace(/^Founded \d+,\s*/i, "").toUpperCase()}`,
                {
                  bold: true,
                  size: 14,
                  color: brand.colors.primaryDark,
                  spacingChars: 30,
                  alignment: AlignmentType.RIGHT,
                },
              ),
            ],
          }),
        ],
      }),
    ],
  });

  // Logo (left) + tan-bordered QR panel (right) — matches PDF identity row.
  const qrCell = qrPng
    ? new TableCell({
        width: { size: 40, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        borders: {
          top: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: stripHash(brand.colors.secondary),
          },
          bottom: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: stripHash(brand.colors.secondary),
          },
          left: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: stripHash(brand.colors.secondary),
          },
          right: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: stripHash(brand.colors.secondary),
          },
        },
        children: [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: noTableBorders(),
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                    borders: noCellBorders(),
                    margins: { top: 0, bottom: 0, left: 0, right: 80 },
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: qrPng,
                            type: "png",
                            transformation: { width: 70, height: 70 },
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 60, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                    borders: noCellBorders(),
                    margins: { top: 0, bottom: 0, left: 0, right: 0 },
                    children: [
                      plain("SCAN TO VISIT", {
                        bold: true,
                        size: 13,
                        color: brand.colors.secondaryText,
                        spacingChars: 30,
                      }),
                      plain("MHC-GC.COM", {
                        bold: true,
                        size: 22,
                        color: brand.colors.primary,
                        spacing: { before: 40, after: 20 },
                        font: FONT_DISPLAY,
                      }),
                      plain(brand.website, {
                        size: 16,
                        color: brand.colors.primaryDark,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : new TableCell({
        width: { size: 40, type: WidthType.PERCENTAGE },
        borders: noCellBorders(),
        children: [new Paragraph({ children: [] })],
      });

  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noTableBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 60, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            borders: noCellBorders(),
            margins: { top: 0, bottom: 0, left: 0, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: images.logo.data,
                    type: images.logo.type,
                    transformation: { width: 165, height: 94 },
                  }),
                ],
              }),
            ],
          }),
          qrCell,
        ],
      }),
    ],
  });

  return new Header({
    children: [
      taglineRow,
      headerTable,
      // Hunter-green accent rule + tan secondary stripe
      new Paragraph({
        spacing: { before: 80, after: 0 },
        border: {
          bottom: {
            color: hunter,
            space: 1,
            style: BorderStyle.SINGLE,
            size: 18,
          },
        },
        children: [new TextRun({ text: "" })],
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        border: {
          bottom: {
            color: stripHash(brand.colors.secondary),
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        children: [new TextRun({ text: "" })],
      }),
    ],
  });
}

// ── Continuation header (pages 2+) — slim band ───────────────────────────────
function buildContinuationHeader(brand) {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 0, after: 60 },
        children: [
          new TextRun({
            text: `${brand.companyShort} • Letter (continued)`,
            font: FONT_BODY,
            size: 18,
            bold: true,
            color: stripHash(brand.colors.primary),
            characterSpacing: 24,
          }),
          new TextRun({
            text: "  Page ",
            font: FONT_BODY,
            size: 18,
            color: stripHash(brand.colors.secondaryText),
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        border: {
          bottom: {
            color: stripHash(brand.colors.secondary),
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        children: [new TextRun({ text: "" })],
      }),
    ],
  });
}

// ── Footer (every page) — contact + accreditation + veteran strip ────────────
function buildFooter(brand, images) {
  const hunter = stripHash(brand.colors.primary);
  const tan = stripHash(brand.colors.secondary);

  const accreditationCell = new TableCell({
    width: { size: 60, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 0, bottom: 0, left: 100, right: 0 },
    children: [
      plain("ACCREDITATION & TRUST", {
        bold: true,
        size: 13,
        color: brand.colors.secondaryText,
        spacingChars: 24,
        alignment: AlignmentType.RIGHT,
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 60, after: 0 },
        children: [
          new ImageRun({
            data: images.agc.data,
            type: images.agc.type,
            transformation: { width: 50, height: 50 },
          }),
          new TextRun({ text: "  " }),
          new ImageRun({
            data: images.bbb.data,
            type: images.bbb.type,
            transformation: { width: 100, height: 38 },
          }),
          new TextRun({ text: "  " }),
          new ImageRun({
            data: images.vob.data,
            type: images.vob.type,
            transformation: { width: 50, height: 38 },
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 80, after: 0 },
        children: [
          new ImageRun({
            data: images.pasco.data,
            type: images.pasco.type,
            transformation: { width: 70, height: 32 },
          }),
          new TextRun({ text: "  " }),
          new ImageRun({
            data: images.kennewick.data,
            type: images.kennewick.type,
            transformation: { width: 95, height: 26 },
          }),
          new TextRun({ text: "  " }),
          new ImageRun({
            data: images.richland.data,
            type: images.richland.type,
            transformation: { width: 32, height: 34 },
          }),
        ],
      }),
    ],
  });

  const contactCell = new TableCell({
    width: { size: 40, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 0, bottom: 0, left: 0, right: 100 },
    children: [
      plain("COMPANY CONTACT", {
        bold: true,
        size: 13,
        color: brand.colors.secondaryText,
        spacingChars: 24,
      }),
      plain(brand.companyName, {
        bold: true,
        size: 20,
        color: brand.colors.primary,
        spacing: { before: 60, after: 20 },
      }),
      plain(brand.addressStreet, { size: 18, color: brand.colors.primaryDark }),
      plain(brand.addressCityStateZip, {
        size: 18,
        color: brand.colors.primaryDark,
      }),
      plain(`${brand.phone}  •  ${brand.website}`, {
        size: 18,
        color: brand.colors.primaryDark,
        spacing: { before: 20, after: 20 },
      }),
      plain(buildLicensesLine(brand), {
        italic: true,
        size: 16,
        color: brand.colors.secondaryText,
      }),
    ],
  });

  return new Footer({
    children: [
      // Tan accent stripe above the footer block
      new Paragraph({
        spacing: { before: 0, after: 120 },
        border: {
          top: { color: tan, space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
        children: [new TextRun({ text: "" })],
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: noTableBorders(),
        rows: [new TableRow({ children: [contactCell, accreditationCell] })],
      }),
      // Hunter-green veteran strip
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 0 },
        shading: {
          type: ShadingType.SOLID,
          color: hunter,
          fill: hunter,
        },
        children: [
          new TextRun({
            text: "  Veteran-Owned  ★  Mission-First  ★  Built on Honor, Integrity & Trust  ",
            font: FONT_BODY,
            size: 16,
            bold: true,
            color: "FFFFFF",
            characterSpacing: 24,
          }),
        ],
      }),
    ],
  });
}

function buildLicensesLine(brand) {
  // Match PDF format exactly: "WA Lic: MHCONCI907R7 · OR Lic: 194331 · ID Lic: RCE-49250"
  const lic = brand.licenses || {};
  return Object.entries(lic)
    .map(([state, num]) => `${state} Lic: ${num}`)
    .join("  ·  ");
}

// ── Address-block table (the "table header" — same fields as the PDF) ────────
function buildAddressTable(brand) {
  const tan = brand.colors.secondaryText;

  // 6-column grid mirroring the PDF letterhead form:
  //   [spacer ............................................] [DATE]
  //   [TO — Name ..............] [COMPANY / ORGANIZATION ..]
  //   [ADDRESS ................] [CITY, STATE, ZIP ........]
  //   [FROM ...................] [JOB / BID # ............]
  //   [RE — SUBJECT ........................................]
  const halfCellMargins = { top: 40, bottom: 40, left: 0, right: 100 };
  const halfCellMarginsR = { top: 40, bottom: 40, left: 100, right: 0 };

  const labelCellLeft = (text) =>
    new TableCell({
      width: { size: 50, type: WidthType.PERCENTAGE },
      margins: halfCellMargins,
      borders: noCellBorders(),
      children: [label(text, tan), fillSlot()],
    });
  const labelCellRight = (text) =>
    new TableCell({
      width: { size: 50, type: WidthType.PERCENTAGE },
      margins: halfCellMarginsR,
      borders: noCellBorders(),
      children: [label(text, tan), fillSlot()],
    });

  // Date row — spacer left, label+slot right-aligned
  const dateRow = new TableRow({
    children: [
      new TableCell({
        width: { size: 50, type: WidthType.PERCENTAGE },
        borders: noCellBorders(),
        children: [new Paragraph({ children: [] })],
      }),
      new TableCell({
        width: { size: 50, type: WidthType.PERCENTAGE },
        margins: halfCellMarginsR,
        borders: noCellBorders(),
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({
                text: "DATE",
                font: FONT_BODY,
                size: 13,
                bold: true,
                color: stripHash(tan),
                characterSpacing: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 0 },
            children: [
              new TextRun({
                text: "",
                font: FONT_BODY,
                size: 24,
                bold: true,
                color: stripHash(brand.colors.primaryDark),
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const subjectRow = new TableRow({
    children: [
      new TableCell({
        columnSpan: 2,
        width: { size: 100, type: WidthType.PERCENTAGE },
        margins: halfCellMargins,
        borders: noCellBorders(),
        children: [label("RE — Subject", tan), fillSlot()],
      }),
    ],
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noTableBorders(),
    rows: [
      dateRow,
      new TableRow({
        children: [
          labelCellLeft("To"),
          labelCellRight("Company / Organization"),
        ],
      }),
      new TableRow({
        children: [
          labelCellLeft("Address"),
          labelCellRight("City, State, ZIP"),
        ],
      }),
      new TableRow({
        children: [labelCellLeft("From"), labelCellRight("Job/Bid #")],
      }),
      subjectRow,
    ],
  });
}

// ── Border helpers ───────────────────────────────────────────────────────────
function noTableBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return {
    top: none,
    bottom: none,
    left: none,
    right: none,
    insideHorizontal: none,
    insideVertical: none,
  };
}
function noCellBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: none, bottom: none, left: none, right: none };
}

// ── Main entry ───────────────────────────────────────────────────────────────
export async function generateLetterheadDocx({
  outPath,
  brand,
  docsDir,
  qrPngBuffer,
}) {
  const images = await loadAllImages(brand, docsDir);

  const headerP1 = buildHeader(brand, images, qrPngBuffer);
  const headerCont = buildContinuationHeader(brand);
  const footer = buildFooter(brand, images);

  const doc = new Document({
    creator: brand.companyName,
    title: `${brand.companyShort} Letterhead`,
    description:
      "Official MH Construction letterhead — type and it auto-flows to the next page.",
    styles: {
      default: {
        document: {
          run: { font: FONT_BODY, size: 22 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(8.5),
              height: convertInchesToTwip(11),
              orientation: PageOrientation.PORTRAIT,
            },
            margin: {
              top: convertInchesToTwip(1.6), // room for header
              right: convertInchesToTwip(0.85),
              bottom: convertInchesToTwip(2.3), // room for footer + veteran strip
              left: convertInchesToTwip(0.85),
              header: convertInchesToTwip(0.4),
              footer: convertInchesToTwip(0.4),
            },
            // Outer page frame (matches the thin tan rule around the PDF
            // letterhead) plus a thick hunter-green LEFT bar approximating
            // the PDF's left ribbon. Page borders print on every page.
            borders: {
              pageBorderTop: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: stripHash(brand.colors.secondary),
                space: 18,
              },
              pageBorderRight: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: stripHash(brand.colors.secondary),
                space: 18,
              },
              pageBorderBottom: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: stripHash(brand.colors.secondary),
                space: 18,
              },
              pageBorderLeft: {
                style: BorderStyle.SINGLE,
                size: 36, // ~4.5pt thick green ribbon
                color: stripHash(brand.colors.primary),
                space: 18,
              },
            },
          },
          titlePage: true, // page 1 uses different header from page 2+
        },
        headers: {
          first: headerP1,
          default: headerCont,
        },
        footers: {
          first: footer,
          default: footer,
        },
        children: [
          buildAddressTable(brand),
          new Paragraph({
            spacing: { before: 240, after: 0 },
            children: [new TextRun({ text: "" })],
          }),
          // Empty body — user types here; Word auto-flows to page 2+
          new Paragraph({
            spacing: { before: 0, after: 0, line: 320 },
            children: [
              new TextRun({
                text: "",
                font: FONT_BODY,
                size: 24,
                color: stripHash(brand.colors.primaryDark),
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  await writeFile(outPath, buffer);
  return outPath;
}
