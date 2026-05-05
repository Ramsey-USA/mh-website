/**
 * @jest-environment jsdom
 *
 * Tests for components/resources/SafetyComplianceBadge.tsx
 */

import { render, screen } from "@testing-library/react";
import {
  SafetyComplianceBadge,
  type BadgeVariant,
} from "../SafetyComplianceBadge";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-testid="icon">{icon}</span>
  ),
}));

const ALL_VARIANTS: BadgeVariant[] = [
  "osha",
  "agc",
  "wisha",
  "pmbok",
  "dot",
  "veteran",
  "bbb",
  "travelers",
];

describe("SafetyComplianceBadge", () => {
  it("renders without throwing for every variant", () => {
    ALL_VARIANTS.forEach((variant) => {
      expect(() =>
        render(<SafetyComplianceBadge variant={variant} />),
      ).not.toThrow();
    });
  });

  it("uses the default label when no label prop is passed", () => {
    render(<SafetyComplianceBadge variant="osha" />);
    expect(screen.getByText(/OSHA/i)).toBeInTheDocument();
  });

  it("uses the custom label when one is provided", () => {
    render(<SafetyComplianceBadge variant="osha" label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders the citation when provided", () => {
    render(<SafetyComplianceBadge variant="agc" citation="AGC §1.2" />);
    expect(screen.getByText(/AGC §1\.2/i)).toBeInTheDocument();
  });

  it("does not render citation when it is not provided", () => {
    const { container } = render(<SafetyComplianceBadge variant="bbb" />);
    // The citation span only renders when citation is truthy
    expect(container.querySelector(".opacity-70")).toBeNull();
  });

  it("renders an icon via MaterialIcon", () => {
    render(<SafetyComplianceBadge variant="veteran" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
