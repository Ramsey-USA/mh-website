/**
 * @jest-environment jsdom
 *
 * Smoke tests for all loading-skeleton pages.
 * Each is pure static JSX — a single render call drives full coverage.
 */

import { render } from "@testing-library/react";

const loadingPages = [
  { name: "Careers", path: "../careers/loading" },
  { name: "Contact", path: "../contact/loading" },
  { name: "Dashboard", path: "../dashboard/loading" },
  { name: "Projects", path: "../projects/loading" },
  { name: "Team", path: "../team/loading" },
  { name: "Testimonials", path: "../testimonials/loading" },
] as const;

describe.each(loadingPages)("$name loading skeleton", ({ path }) => {
  it("renders without throwing", () => {
    const { default: Loading } = require(path) as {
      default: React.ComponentType;
    };
    expect(() => render(<Loading />)).not.toThrow();
  });
});
