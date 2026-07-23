import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import QRCode from "qrcode";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(scriptDirectory, "..");
const publicRoot = path.join(websiteRoot, "public");
const imageDirectory = path.join(
  publicRoot,
  "images/events/operation-cast-recover",
);
const downloadDirectory = path.join(publicRoot, "downloads/events");
const eventUrl = "https://www.mhc-gc.com/events/operation-cast-recover";

const colors = {
  green: rgb(56 / 255, 104 / 255, 81 / 255),
  greenDark: rgb(31 / 255, 68 / 255, 51 / 255),
  tan: rgb(189 / 255, 146 / 255, 100 / 255),
  ink: rgb(29 / 255, 35 / 255, 32 / 255),
  gray: rgb(92 / 255, 99 / 255, 95 / 255),
  light: rgb(244 / 255, 246 / 255, 244 / 255),
  white: rgb(1, 1, 1),
};

await fs.mkdir(imageDirectory, { recursive: true });
await fs.mkdir(downloadDirectory, { recursive: true });

const qrBuffer = await QRCode.toBuffer(eventUrl, {
  type: "png",
  width: 960,
  margin: 2,
  color: { dark: "#1F4433", light: "#FFFFFF" },
  errorCorrectionLevel: "H",
});

const qrPath = path.join(imageDirectory, "registration-qr.png");
await fs.writeFile(qrPath, qrBuffer);

const pdf = await PDFDocument.create();
pdf.registerFontkit(fontkit);
pdf.setTitle("Operation: Cast & Recover Sponsorship Opportunities");
pdf.setAuthor("MH Construction, Inc.");
pdf.setSubject("Annual veteran fishing event sponsorship and prize donations");
pdf.setKeywords(["MH Construction", "veteran fishing event", "sponsorship"]);

const regularBytes = await fs.readFile(
  path.join(
    publicRoot,
    "fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf",
  ),
);
const boldBytes = await fs.readFile(
  path.join(
    publicRoot,
    "fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  ),
);
const regular = await pdf.embedFont(regularBytes, { subset: true });
const bold = await pdf.embedFont(boldBytes, { subset: true });
const qrImage = await pdf.embedPng(qrBuffer);

const page = pdf.addPage([612, 792]);
const { width, height } = page.getSize();

page.drawRectangle({ x: 0, y: height - 205, width, height: 205, color: colors.greenDark });
page.drawRectangle({ x: 0, y: height - 211, width, height: 6, color: colors.tan });
page.drawText("MH CONSTRUCTION PRESENTS", {
  x: 46,
  y: height - 58,
  size: 11,
  font: bold,
  color: colors.tan,
});
page.drawText("Operation: Cast & Recover", {
  x: 46,
  y: height - 105,
  size: 29,
  font: bold,
  color: colors.white,
});
page.drawText("Annual Veteran Fishing Event", {
  x: 46,
  y: height - 135,
  size: 15,
  font: regular,
  color: colors.white,
});
page.drawText("SEPTEMBER 26, 2026  |  COLUMBIA POINT MARINA PARK", {
  x: 46,
  y: height - 174,
  size: 10,
  font: bold,
  color: colors.tan,
});

page.drawText("Help Build a Memorable Day on the Columbia River", {
  x: 46,
  y: 535,
  size: 19,
  font: bold,
  color: colors.greenDark,
});

const intro =
  "MH Construction, a Veteran-Owned company, is bringing veterans and volunteer boat captains together for a day of fishing, connection, and community recognition. Local business support helps cover participant needs and creates a prize table worthy of the people we are gathering to serve.";
drawWrappedText(page, intro, 46, 505, 355, regular, 11, 16, colors.ink);

page.drawRectangle({ x: 426, y: 390, width: 140, height: 140, color: colors.white });
page.drawImage(qrImage, { x: 434, y: 398, width: 124, height: 124 });
page.drawText("Scan for details", {
  x: 452,
  y: 374,
  size: 10,
  font: bold,
  color: colors.greenDark,
});

page.drawRectangle({ x: 46, y: 244, width: 520, height: 126, color: colors.light });
page.drawText("SPONSORSHIP & DONATION OPPORTUNITIES", {
  x: 64,
  y: 342,
  size: 11,
  font: bold,
  color: colors.green,
});
[
  "High-value raffle prizes and outdoor gear",
  "Participant meals, beverages, apparel, and day-of supplies",
  "Fishing equipment, tackle, safety gear, and fuel support",
  "Direct event sponsorship and in-kind professional services",
].forEach((item, index) => {
  const y = 318 - index * 22;
  page.drawCircle({ x: 69, y: y + 3, size: 3, color: colors.tan });
  page.drawText(item, { x: 82, y, size: 10.5, font: regular, color: colors.ink });
});

page.drawText("Event Targets", { x: 46, y: 207, size: 14, font: bold, color: colors.greenDark });
page.drawText("50 veteran positions  |  10-12 vessels  |  All eras and service branches", {
  x: 46,
  y: 184,
  size: 10.5,
  font: regular,
  color: colors.ink,
});
page.drawText("Primary target: Fall King Salmon  |  Contingency: captain's choice", {
  x: 46,
  y: 164,
  size: 10.5,
  font: regular,
  color: colors.ink,
});

page.drawRectangle({ x: 0, y: 0, width, height: 116, color: colors.green });
page.drawText("Start a Sponsorship Conversation", {
  x: 46,
  y: 79,
  size: 15,
  font: bold,
  color: colors.white,
});
page.drawText("office@mhc-gc.com  |  (509) 308-6489  |  www.mhc-gc.com", {
  x: 46,
  y: 53,
  size: 10.5,
  font: regular,
  color: colors.white,
});
page.drawText("Built on Quality, Backed by Trust.", {
  x: 46,
  y: 28,
  size: 10,
  font: bold,
  color: colors.tan,
});

const pdfBytes = await pdf.save();
await fs.writeFile(
  path.join(downloadDirectory, "operation-cast-recover-sponsorship.pdf"),
  pdfBytes,
);

console.log(`Generated ${path.relative(websiteRoot, qrPath)}`);
console.log("Generated public/downloads/events/operation-cast-recover-sponsorship.pdf");

function drawWrappedText(pageRef, text, x, y, maxWidth, font, size, lineHeight, color) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  lines.forEach((value, index) => {
    pageRef.drawText(value, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });
}