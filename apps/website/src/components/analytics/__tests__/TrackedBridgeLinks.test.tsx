/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";

const gtagMock = jest.fn();

Object.defineProperty(window, "gtag", {
  configurable: true,
  value: gtagMock,
});

import { TrackedBridgeButton, TrackedBridgeLink } from "../TrackedBridgeLinks";

beforeEach(() => {
  gtagMock.mockClear();
});

describe("TrackedBridgeLink", () => {
  it("sends a click event with the track id", () => {
    render(
      <TrackedBridgeLink href="/public-sector" trackId="bridge-public-sector">
        Public Sector
      </TrackedBridgeLink>,
    );

    fireEvent.click(screen.getByRole("link"));

    expect(gtagMock).toHaveBeenCalledWith("event", "click", {
      element: "bridge-public-sector",
      page_path: "/",
      event_category: "navigation",
    });
  });
});

describe("TrackedBridgeButton", () => {
  it("renders an outline button link and sends analytics", () => {
    render(
      <TrackedBridgeButton
        href="/contact"
        trackId="bridge-contact"
        variant="outline"
      >
        Contact
      </TrackedBridgeButton>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Contact" }));

    expect(gtagMock).toHaveBeenCalledWith("event", "click", {
      element: "bridge-contact",
      page_path: "/",
      event_category: "navigation",
    });
  });
});
