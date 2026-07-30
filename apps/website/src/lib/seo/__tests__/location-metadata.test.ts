import { buildLocationFaqSchema } from "../location-metadata";

describe("buildLocationFaqSchema", () => {
  it("builds a location-specific FAQPage schema with city-aware questions", () => {
    const location = {
      slug: "pasco",
      city: "Pasco",
      state: "WA",
      servicePriorities: ["Tenant improvements", "Municipal coordination"],
      nearbyAreas: ["Kennewick", "Richland"],
    } as any;

    const schema = buildLocationFaqSchema(location, "https://www.mhc-gc.com");

    expect(schema["@type"]).toBe("FAQPage");
    const mainEntity = schema.mainEntity ?? [];

    expect(mainEntity).toHaveLength(3);
    expect(mainEntity[0]?.name ?? "").toContain("Pasco");
    expect(mainEntity[1]?.name ?? "").toContain("Pasco");
    expect(mainEntity[2]?.name ?? "").toContain("Pasco");
  });
});
