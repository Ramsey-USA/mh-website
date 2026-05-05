/**
 * @jest-environment jsdom
 *
 * Tests for analytics-tracked contact link components:
 * TrackedPhoneLink, TrackedEmailLink, TrackedLocationLink
 */

import { render, screen, fireEvent } from "@testing-library/react";

const mockTrackClick = jest.fn();

jest.mock("@/lib/analytics/hooks", () => ({
  useClickTracking: () => mockTrackClick,
  usePageTracking: jest.fn(),
}));

import {
  TrackedPhoneLink,
  TrackedEmailLink,
  TrackedLocationLink,
} from "../TrackedContactLinks";

beforeEach(() => {
  mockTrackClick.mockClear();
});

// ── TrackedPhoneLink ──────────────────────────────────────────────────────────

describe("TrackedPhoneLink", () => {
  it("renders a tel: link", () => {
    render(<TrackedPhoneLink>Call Us</TrackedPhoneLink>);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toMatch(/^tel:/);
  });

  it("renders children text", () => {
    render(<TrackedPhoneLink>(509) 308-6489</TrackedPhoneLink>);
    expect(screen.getByText("(509) 308-6489")).toBeInTheDocument();
  });

  it("calls trackClick on click with phone contact type", () => {
    render(<TrackedPhoneLink trackId="test-phone">Call</TrackedPhoneLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      "test-phone",
      expect.objectContaining({ contactType: "phone" }),
    );
  });

  it("uses default trackId when not provided", () => {
    render(<TrackedPhoneLink>Call</TrackedPhoneLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      "phone-click",
      expect.any(Object),
    );
  });

  it("spreads custom trackProperties", () => {
    render(
      <TrackedPhoneLink trackProperties={{ location: "header" }}>
        Call
      </TrackedPhoneLink>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ location: "header" }),
    );
  });

  it("applies className", () => {
    render(<TrackedPhoneLink className="custom-class">Call</TrackedPhoneLink>);
    expect(screen.getByRole("link")).toHaveClass("custom-class");
  });
});

// ── TrackedEmailLink ──────────────────────────────────────────────────────────

describe("TrackedEmailLink", () => {
  it("renders a mailto: link", () => {
    render(<TrackedEmailLink>Email Us</TrackedEmailLink>);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toMatch(/^mailto:/);
  });

  it("calls trackClick on click with email contact type", () => {
    render(<TrackedEmailLink trackId="test-email">Email</TrackedEmailLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      "test-email",
      expect.objectContaining({ contactType: "email" }),
    );
  });

  it("uses default trackId when not provided", () => {
    render(<TrackedEmailLink>Email</TrackedEmailLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      "email-click",
      expect.any(Object),
    );
  });
});

// ── TrackedLocationLink ───────────────────────────────────────────────────────

describe("TrackedLocationLink", () => {
  it("renders a Google Maps link", () => {
    render(<TrackedLocationLink>Our Address</TrackedLocationLink>);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("google.com/maps");
  });

  it("calls trackClick on click with address contact type", () => {
    render(
      <TrackedLocationLink trackId="test-address">Address</TrackedLocationLink>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      "test-address",
      expect.objectContaining({ contactType: "address" }),
    );
  });

  it("uses default trackId when not provided", () => {
    render(<TrackedLocationLink>Address</TrackedLocationLink>);
    fireEvent.click(screen.getByRole("link"));
    expect(mockTrackClick).toHaveBeenCalledWith(
      "address-click",
      expect.any(Object),
    );
  });
});
