import fs from "fs";
import path from "path";

describe("AI discovery content", () => {
  const llmsPath = path.resolve(__dirname, "../../../public/llms.txt");
  const llmsFullPath = path.resolve(__dirname, "../../../public/llms-full.txt");
  const aiPath = path.resolve(__dirname, "../../../public/ai.txt");

  const llms = fs.readFileSync(llmsPath, "utf8");
  const llmsFull = fs.readFileSync(llmsFullPath, "utf8");
  const ai = fs.readFileSync(aiPath, "utf8");

  it("publishes a comprehensive company overview for AI systems", () => {
    expect(llms).toContain("MH Construction, Inc.");
    expect(llms).toContain("Built on Quality, Backed by Trust.");
    expect(llms).toContain(
      "No gaps. No guesswork. Just accountable follow-through.",
    );
    expect(llms).toContain("Washington, Oregon, and Idaho");
    expect(llms).toContain("BBB Accredited");
    expect(llms).toContain("Jeremy Thamert");
    expect(llms).toContain("https://www.mhc-gc.com/about");
    expect(llms).toContain("https://www.mhc-gc.com/contact");
  });

  it("includes a fuller operational profile in the extended AI reference", () => {
    expect(llmsFull).toContain("Founded 2010");
    expect(llmsFull).toContain("BBB Accredited Business with A+ Rating");
    expect(llmsFull).toContain("Commercial Construction");
    expect(llmsFull).toContain("Government & Public Sector Construction");
    expect(llmsFull).toContain("Tri-State licensed");
    expect(llmsFull).toContain("650+");
  });

  it("keeps the AI profile aligned with the broader company story", () => {
    expect(ai).toContain("Veteran-owned general contractor");
    expect(ai).toContain(
      "commercial, tenant improvement, municipal, agricultural and winery, and light industrial",
    );
    expect(ai).toContain("Scope clarity");
    expect(ai).toContain("https://www.mhc-gc.com/contact");
  });
});
