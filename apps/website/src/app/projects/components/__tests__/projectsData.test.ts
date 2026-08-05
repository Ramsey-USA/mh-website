import { whyChooseReasons } from "../projectsData";

describe("projectsData trust copy", () => {
  it("uses controlled, contract-aware licensing language for the trust card", () => {
    const card = whyChooseReasons.find(
      (item) => item.title === "3 State - Licensed & Contract-Ready",
    );

    expect(card).toBeDefined();
    expect(card?.description).toContain(
      "Licensed across Washington, Oregon, and Idaho",
    );
    expect(card?.description).toContain("contract requirements");
    expect(card?.description).not.toContain("Fully licensed and insured");
  });
});
