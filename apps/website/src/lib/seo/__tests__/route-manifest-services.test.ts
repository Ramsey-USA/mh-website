import { buildCanonicalRouteManifest } from "../route-manifest";

describe("route manifest service detail entries", () => {
  it("contains published service detail routes once", () => {
    const manifest = buildCanonicalRouteManifest();
    const servicePaths = manifest
      .filter((entry) => entry.path.startsWith("/services/"))
      .map((entry) => entry.path);

    expect(servicePaths).toContain("/services/commercial-construction");
    expect(servicePaths).toContain("/services/municipal-public-work");
    expect(servicePaths).not.toContain("/services/custom-home-builds-select");

    const unique = new Set(servicePaths);
    expect(unique.size).toBe(servicePaths.length);
  });

  it("omits unpublished project case-study routes from public discovery", () => {
    const manifest = buildCanonicalRouteManifest();
    const projectPaths = manifest
      .filter((entry) => entry.path.startsWith("/projects/"))
      .map((entry) => entry.path);

    expect(projectPaths).toContain("/projects/volm-companies-remodel");
    expect(projectPaths).not.toContain("/projects/lcsnw-tri-cities");
  });
});
