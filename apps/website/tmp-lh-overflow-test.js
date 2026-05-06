const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

(async () => {
  const inPath = "documents/output/MHC-company-letterhead.pdf";
  const outPath = "documents/output/MHC-company-letterhead-overflow-test.pdf";
  const bytes = fs.readFileSync(inPath);
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();

  const set = (name, value) => {
    try {
      form.getTextField(name).setText(value);
    } catch {
      // ignore missing fields
    }
  };

  set("lh.date", "05/06/2026");
  set("lh.to", "Field Operations Manager");
  set("lh.attn", "Safety Team");
  set("lh.from", "MH Construction Executive Office");
  set("lh.re", "Overflow and line artifact validation");

  const para =
    "This is an overflow stress test sentence for the fixed body box. ";
  set("lh.body.page1", Array(220).fill(para).join(""));
  set("lh.body.page2", Array(320).fill(para).join(""));
  set("lh.body.page3", Array(320).fill(para).join(""));

  fs.writeFileSync(outPath, await doc.save());
  console.log(outPath);
})();
