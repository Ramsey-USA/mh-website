import {
  getAllIndividualBrandingStamps,
  getIndividualBrandingStamp,
} from "../individual-branding-stamps";

describe("individual-branding-stamps", () => {
  it("loads Jeremy's four-star stamp from markdown source", () => {
    const stamp = getIndividualBrandingStamp("jeremy-thamert");

    expect(stamp).toBeTruthy();
    expect(stamp?.icon).toBe("star");
    expect(stamp?.stars).toBe(4);
    expect(stamp?.label).toBe("Four-Star Command Stamp");
  });

  it("returns all configured individual branding stamps", () => {
    const stamps = getAllIndividualBrandingStamps();

    expect(stamps["jeremy-thamert"]).toBeTruthy();
    expect(stamps["jeremy-thamert"]?.stars).toBe(4);
    expect(stamps["matt-ramsey"]).toBeTruthy();
    expect(stamps["matt-ramsey"]?.icon).toBe("anchor");
    expect(stamps["matt-ramsey"]?.stars).toBe(1);
  });
});
