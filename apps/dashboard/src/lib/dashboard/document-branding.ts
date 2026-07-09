import { PDFDocument, degrees, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import JSZip from "jszip";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { COMPANY_INFO } from "@/lib/constants/company";

const PDF_BRAND_TOP_BAR_HEIGHT = 42;
const PDF_FOOTER_MARGIN = 20;

const BRAND_PRIMARY_RGB = rgb(0.22, 0.41, 0.32);
const BRAND_PRIMARY_DARK_RGB = rgb(0.12, 0.22, 0.17);
const BRAND_SECONDARY_RGB = rgb(0.74, 0.57, 0.39);
const WHITE_RGB = rgb(1, 1, 1);

const DOCX_TITLE = `${COMPANY_INFO.name} Brand Compliance Header`;
const DOCX_SUBTITLE = `${COMPANY_INFO.tagline}`;
const DOCX_TRUST_LINE = `BBB ${COMPANY_INFO.details.bbbRating} Accredited | WA Veteran Owned Business`;

const BRAND_PLACEHOLDERS: Readonly<Record<string, string>> = {
  "{{MH_COMPANY_NAME}}": COMPANY_INFO.name,
  "{{MH_COMPANY_LEGAL_NAME}}": COMPANY_INFO.legalName,
  "{{MH_TAGLINE}}": COMPANY_INFO.tagline,
  "{{MH_PHONE}}": COMPANY_INFO.phone.display,
  "{{MH_EMAIL}}": COMPANY_INFO.email.main,
  "{{MH_ADDRESS}}": COMPANY_INFO.address.full,
  "{{MH_TRUST_LINE}}": DOCX_TRUST_LINE,
};

const MENDL_DAWN_FONT_FILES = Object.freeze([
  "Mendl Fonts/fonnts.com-Mendl_Sans_Dawn_Regular.otf",
]);

const MENDL_DUSK_FONT_FILES = Object.freeze([
  "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_SemiBold.otf",
]);

function resolveDashboardPdfFontPath(fileName: string): string | null {
  const candidates = [
    resolve(process.cwd(), `public/fonts/${fileName}`),
    resolve(process.cwd(), `../website/public/fonts/${fileName}`),
    resolve(process.cwd(), `apps/website/public/fonts/${fileName}`),
    resolve(process.cwd(), `../../apps/website/public/fonts/${fileName}`),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function resolveFirstDashboardPdfFontPath(fileNames: readonly string[]) {
  for (const fileName of fileNames) {
    const path = resolveDashboardPdfFontPath(fileName);
    if (path) {
      return path;
    }
  }
  return null;
}

async function embedDashboardMendlFont(
  pdfDoc: PDFDocument,
  options?: { bold?: boolean },
) {
  const fontPath =
    (options?.bold ?? false)
      ? resolveFirstDashboardPdfFontPath(MENDL_DUSK_FONT_FILES)
      : resolveFirstDashboardPdfFontPath(MENDL_DAWN_FONT_FILES);

  if (!fontPath) {
    throw new Error(
      `Unable to locate ${(options?.bold ?? false) ? "Mendl heading" : "Mendl body"} font for dashboard PDF branding.`,
    );
  }

  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await readFile(fontPath);
  return pdfDoc.embedFont(fontBytes, { subset: true });
}

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function replaceBrandPlaceholders(input: string): string {
  let output = input;
  for (const [placeholder, value] of Object.entries(BRAND_PLACEHOLDERS)) {
    output = output.replaceAll(placeholder, value);
  }
  return output;
}

function buildDocxBrandingBlock(): string {
  const title = escapeXml(DOCX_TITLE);
  const subtitle = escapeXml(DOCX_SUBTITLE);
  const trust = escapeXml(DOCX_TRUST_LINE);

  return [
    "<w:p>",
    '<w:pPr><w:jc w:val="center"/><w:spacing w:after="120"/></w:pPr>',
    '<w:r><w:rPr><w:b/><w:sz w:val="32"/><w:color w:val="386851"/></w:rPr>',
    `<w:t>${title}</w:t></w:r>`,
    "</w:p>",
    "<w:p>",
    '<w:pPr><w:jc w:val="center"/><w:spacing w:after="80"/></w:pPr>',
    '<w:r><w:rPr><w:sz w:val="22"/><w:color w:val="1E392C"/></w:rPr>',
    `<w:t>${subtitle}</w:t></w:r>`,
    "</w:p>",
    "<w:p>",
    '<w:pPr><w:jc w:val="center"/><w:spacing w:after="200"/></w:pPr>',
    '<w:r><w:rPr><w:sz w:val="20"/><w:color w:val="BD9264"/></w:rPr>',
    `<w:t>${trust}</w:t></w:r>`,
    "</w:p>",
  ].join("");
}

function injectDocxBrandingBanner(xml: string): string {
  const bodyTag = "<w:body>";
  const bodyIndex = xml.indexOf(bodyTag);
  if (bodyIndex < 0) {
    return xml;
  }

  const insertAt = bodyIndex + bodyTag.length;
  return `${xml.slice(0, insertAt)}${buildDocxBrandingBlock()}${xml.slice(insertAt)}`;
}

function isDocxXmlPath(path: string): boolean {
  return path.startsWith("word/") && path.endsWith(".xml");
}

export async function brandDocxDocument(
  source: Uint8Array,
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(source);
  const paths = Object.keys(zip.files);

  await Promise.all(
    paths.map(async (path) => {
      if (!isDocxXmlPath(path)) {
        return;
      }

      const zipEntry = zip.file(path);
      if (!zipEntry) {
        return;
      }

      const currentXml = await zipEntry.async("text");
      const withPlaceholders = replaceBrandPlaceholders(currentXml);
      const updatedXml =
        path === "word/document.xml"
          ? injectDocxBrandingBanner(withPlaceholders)
          : withPlaceholders;

      zip.file(path, updatedXml);
    }),
  );

  return zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
  });
}

function drawPdfBrandingHeader(
  page: PDFPage,
  pageWidth: number,
  pageHeight: number,
  title: string,
  subtitle: string,
  headingFont: PDFFont,
  bodyFont: PDFFont,
) {
  page.drawRectangle({
    x: 0,
    y: pageHeight - PDF_BRAND_TOP_BAR_HEIGHT,
    width: pageWidth,
    height: PDF_BRAND_TOP_BAR_HEIGHT,
    color: BRAND_PRIMARY_RGB,
  });

  page.drawRectangle({
    x: 0,
    y: pageHeight - PDF_BRAND_TOP_BAR_HEIGHT,
    width: pageWidth,
    height: 4,
    color: BRAND_SECONDARY_RGB,
  });

  page.drawText(title, {
    x: 22,
    y: pageHeight - 28,
    size: 11,
    font: headingFont,
    color: WHITE_RGB,
  });

  page.drawText(subtitle, {
    x: 22,
    y: pageHeight - 38,
    size: 8,
    font: bodyFont,
    color: WHITE_RGB,
  });
}

function drawPdfBrandingFooter(
  page: PDFPage,
  pageWidth: number,
  pageNumber: number,
  pageCount: number,
  bodyFont: PDFFont,
) {
  const footerLine = `${COMPANY_INFO.address.cityState} | ${COMPANY_INFO.phone.display} | ${COMPANY_INFO.email.main}`;
  const trustLine = DOCX_TRUST_LINE;
  const pageCounter = `Page ${pageNumber} of ${pageCount}`;

  page.drawLine({
    start: { x: 20, y: PDF_FOOTER_MARGIN + 18 },
    end: { x: pageWidth - 20, y: PDF_FOOTER_MARGIN + 18 },
    thickness: 1,
    color: BRAND_PRIMARY_DARK_RGB,
  });

  page.drawText(footerLine, {
    x: 22,
    y: PDF_FOOTER_MARGIN + 8,
    size: 7,
    font: bodyFont,
    color: BRAND_PRIMARY_DARK_RGB,
  });

  page.drawText(trustLine, {
    x: 22,
    y: PDF_FOOTER_MARGIN,
    size: 7,
    font: bodyFont,
    color: BRAND_SECONDARY_RGB,
  });

  page.drawText(pageCounter, {
    x: pageWidth - 90,
    y: PDF_FOOTER_MARGIN + 4,
    size: 8,
    font: bodyFont,
    color: BRAND_PRIMARY_DARK_RGB,
  });
}

function drawPdfWatermark(
  page: PDFPage,
  pageWidth: number,
  pageHeight: number,
  headingFont: PDFFont,
) {
  page.drawText(COMPANY_INFO.legalName, {
    x: pageWidth * 0.2,
    y: pageHeight * 0.45,
    size: 34,
    font: headingFont,
    color: rgb(0.92, 0.94, 0.93),
    rotate: degrees(34),
  });
}

export async function brandPdfDocument(
  source: Uint8Array,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(source, {
    ignoreEncryption: true,
    throwOnInvalidObject: false,
  });

  const pages = pdfDoc.getPages();
  const title = `${COMPANY_INFO.name} Branded Document`;
  const subtitle = `Generated ${new Date().toLocaleDateString("en-US")}`;

  const bodyFont = await embedDashboardMendlFont(pdfDoc);
  const headingFont = await embedDashboardMendlFont(pdfDoc, { bold: true });

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    drawPdfBrandingHeader(
      page,
      width,
      height,
      title,
      subtitle,
      headingFont,
      bodyFont,
    );
    drawPdfBrandingFooter(page, width, index + 1, pages.length, bodyFont);
    drawPdfWatermark(page, width, height, headingFont);
  });

  pdfDoc.setAuthor(COMPANY_INFO.legalName);
  pdfDoc.setProducer(`${COMPANY_INFO.name} Dashboard`);
  pdfDoc.setCreator(`${COMPANY_INFO.name} Branding Studio`);
  pdfDoc.setSubject("MH branded operational document");
  pdfDoc.setKeywords(["MH Construction", "Branded", "Operations", "Dashboard"]);

  return pdfDoc.save();
}

export function getBrandedFilename(originalName: string): string {
  const trimmed = originalName.trim();
  const dotIndex = trimmed.lastIndexOf(".");
  if (dotIndex <= 0 || dotIndex === trimmed.length - 1) {
    return `${trimmed || "document"}-mh-branded`;
  }

  const base = trimmed.slice(0, dotIndex);
  const extension = trimmed.slice(dotIndex);
  return `${base}-mh-branded${extension}`;
}
