/** @jest-environment jsdom */
/**
 * Smoke test for the dynamic locations route.
 */

const mockLocationData = {
  slug: "test",
  city: "Pasco",
  state: "Washington",
  stateCode: "WA",
  county: "Franklin",
  region: "Tri-Cities",
  nearbyAreas: [],
  servicePriorities: [],
  localSeoKeywords: [],
  contact: {},
};

jest.mock("@/lib/data/locations", () => ({
  getLocationBySlug: jest.fn(() => mockLocationData),
  getLocationSlugs: jest.fn(() => ["pasco", "kennewick"]),
}));

jest.mock("@/components/locations/LocationPageContent", () => ({
  LocationPageContent: ({ location }: { location: { city: string } }) => (
    <div data-testid="location-page-content">{location.city}</div>
  ),
}));

jest.mock("@/lib/seo/location-metadata", () => ({
  generateLocationMetadata: jest.fn(() => ({ title: "Test Location" })),
}));

import { render, screen } from "@testing-library/react";

describe("Location pages", () => {
  it("dynamic location page renders LocationPageContent", async () => {
    const { default: Page } = require("../[city]/page") as {
      default: (props: {
        params: Promise<{ city: string }>;
      }) => Promise<React.JSX.Element>;
    };

    render(await Page({ params: Promise.resolve({ city: "pasco" }) }));
    expect(screen.getByTestId("location-page-content")).toBeInTheDocument();
  });
});
