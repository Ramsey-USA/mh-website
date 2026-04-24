import {
  buildCertificationShowcase,
  type CertificationShowcaseItem,
} from "../certification-showcase";

function labels(items: CertificationShowcaseItem[]): string[] {
  return items.map((item) => item.label);
}

describe("buildCertificationShowcase", () => {
  it("returns empty array for empty input", () => {
    expect(buildCertificationShowcase("")).toEqual([]);
    expect(buildCertificationShowcase()).toEqual([]);
  });

  it("expands Six Sigma Black Belt into White/Yellow/Green", () => {
    const result = buildCertificationShowcase("Six Sigma Black Belt");

    expect(labels(result)).toEqual([
      "Six Sigma Black Belt",
      "Six Sigma White Belt",
      "Six Sigma Yellow Belt",
      "Six Sigma Green Belt",
    ]);
    expect(
      result.find((item) => item.label === "Six Sigma Black Belt")?.inferred,
    ).toBe(false);
    expect(
      result.find((item) => item.label === "Six Sigma White Belt")?.inferred,
    ).toBe(true);
  });

  it("expands OSHA 30 into OSHA 10", () => {
    const result = buildCertificationShowcase("OSHA 30, CPR");

    expect(labels(result)).toEqual(["OSHA 30", "CPR Certified", "OSHA 10"]);
    expect(result.find((item) => item.label === "OSHA 10")?.inferred).toBe(
      true,
    );
  });

  it("preserves custom certifications", () => {
    const result = buildCertificationShowcase("HubSpot, Google Ads");

    expect(labels(result)).toEqual(["HubSpot", "Google Ads"]);
    expect(result.every((item) => item.inferred === false)).toBe(true);
  });

  it("expands Six Sigma Master Black Belt ladder", () => {
    const result = buildCertificationShowcase("Six Sigma Master Black Belt");

    expect(labels(result)).toEqual([
      "Six Sigma Master Black Belt",
      "Six Sigma White Belt",
      "Six Sigma Yellow Belt",
      "Six Sigma Green Belt",
      "Six Sigma Black Belt",
    ]);
  });

  it("expands Procore admin ladder", () => {
    const result = buildCertificationShowcase("Procore Certified Admin");

    expect(labels(result)).toEqual([
      "Procore Certified Admin",
      "Procore Certified",
      "Procore Certified Associate",
      "Procore Certified Project Manager",
    ]);
  });

  it("maps representative team certifications to library labels", () => {
    const result = buildCertificationShowcase(
      "CDL, State Certified Spanish/English Interpreter, Forklifts, Aerial Platforms/Scissor Lifts, CPR/First Aid, Powder Actuated Tools",
    );

    expect(labels(result)).toEqual([
      "CDL",
      "Spanish/English Interpreter",
      "Forklift Certified",
      "Aerial Lift Certified",
      "Scissor Lift Certified",
      "CPR Certified",
      "First Aid Certified",
      "Powder Actuated Tools Certified",
    ]);
  });

  it("maps office and digital certifications to library labels", () => {
    const result = buildCertificationShowcase(
      "Global Accelerator Web Development & AI Design, Google Ads, HubSpot, Microsoft Office Specialist, Customer Service Excellence",
    );

    expect(labels(result)).toEqual([
      "Global Accelerator Web Development & AI Design",
      "Google Ads",
      "HubSpot",
      "Microsoft Office Specialist",
      "Customer Service Excellence",
    ]);
  });
});
