/** @jest-environment jsdom */
/**
 * Smoke tests for all 11 location pages.
 * Each is a 12-line server component wrapping <LocationPageContent>.
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

// Dynamically import each page after mocks are set up
const locationPages = [
  {
    slug: "kennewick",
    name: "KennewickLocationPage",
    path: "../kennewick/page",
  },
  { slug: "pasco", name: "PascoLocationPage", path: "../pasco/page" },
  { slug: "richland", name: "RichlandLocationPage", path: "../richland/page" },
  { slug: "spokane", name: "SpokaneLocationPage", path: "../spokane/page" },
  { slug: "yakima", name: "YakimaLocationPage", path: "../yakima/page" },
  {
    slug: "walla-walla",
    name: "WallaWallaLocationPage",
    path: "../walla-walla/page",
  },
  {
    slug: "west-richland",
    name: "WestRichlandLocationPage",
    path: "../west-richland/page",
  },
  {
    slug: "hermiston",
    name: "HermistonLocationPage",
    path: "../hermiston/page",
  },
  {
    slug: "pendleton",
    name: "PendletonLocationPage",
    path: "../pendleton/page",
  },
  { slug: "omak", name: "OmakLocationPage", path: "../omak/page" },
  {
    slug: "coeur-d-alene",
    name: "CoeurDAleneLocationPage",
    path: "../coeur-d-alene/page",
  },
];

describe("Location pages", () => {
  it.each(locationPages)(
    "$slug page renders LocationPageContent",
    ({ path }) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { default: Page } = require(path) as {
        default: React.ComponentType;
      };
      render(<Page />);
      expect(screen.getByTestId("location-page-content")).toBeInTheDocument();
    },
  );
});
