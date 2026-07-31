import manualsIndex from "../../../../../../documents/content/manuals-index.json";

describe("manuals index registry", () => {
  it("includes the operations manual and the marketing and sales guides", () => {
    const ids = new Set(
      ((manualsIndex as { manuals?: Array<{ id: string }> }).manuals ?? []).map(
        (entry) => entry.id,
      ),
    );

    expect(ids.has("operations-manual")).toBe(true);
    expect(ids.has("marketing-strategy-guide")).toBe(true);
    expect(ids.has("sales-estimating-guide")).toBe(true);
  });
});
