/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { Badge } from "../badge";
import { FocusRing } from "../focus-ring";

describe("Standardized UI primitives", () => {
  it("renders Button as a semantic button by default", () => {
    render(<Button>Submit</Button>);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders Button as link when using asChild", () => {
    render(
      <Button asChild variant="text">
        <a href="/contact">Contact</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("applies disabled and focus-visible state classes to Button", () => {
    render(
      <Button disabled variant="primary">
        Disabled
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button.className).toContain("disabled:pointer-events-none");
    expect(button.className).toContain("focus-visible:ring-2");
  });

  it("renders all card variants without crashing", () => {
    const variants = [
      "service",
      "project",
      "proof",
      "testimonial",
      "event",
      "article",
    ] as const;

    for (const variant of variants) {
      const { unmount } = render(
        <Card variant={variant} data-testid={`card-${variant}`}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>desc</CardDescription>
          </CardHeader>
          <CardContent>content</CardContent>
        </Card>,
      );
      expect(screen.getByTestId(`card-${variant}`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders Container width and gutter variants", () => {
    const { rerender } = render(
      <Container size="narrow" gutter="compact" data-testid="container" />,
    );
    expect(screen.getByTestId("container").className).toContain("max-w-3xl");
    expect(screen.getByTestId("container").className).toContain("sm:px-5");

    rerender(<Container size="wide" gutter="none" data-testid="container" />);
    expect(screen.getByTestId("container").className).toContain(
      "max-w-[88rem]",
    );
    expect(screen.getByTestId("container").className).toContain("px-0");
  });

  it("renders SectionHeading with eyebrow, level control, and accent", () => {
    render(
      <SectionHeading
        as="h3"
        eyebrow="Service Line"
        title="Commercial Buildouts"
        description="Coordinated delivery from precon to turnover."
        accent
      />,
    );
    expect(screen.getByText("Service Line")).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: "Commercial Buildouts",
    });
    expect(heading.tagName).toBe("H3");
    expect(
      screen.getByText("Coordinated delivery from precon to turnover."),
    ).toBeInTheDocument();
  });

  it("renders Badge as semantic inline text token", () => {
    render(<Badge variant="verified">Verified</Badge>);
    const badge = screen.getByText("Verified");
    expect(badge.tagName).toBe("SPAN");
  });

  it("applies focus ring classes with asChild", () => {
    render(
      <FocusRing asChild tone="primary">
        <button type="button">Focusable</button>
      </FocusRing>,
    );
    const button = screen.getByRole("button", { name: "Focusable" });
    expect(button.className).toContain("focus-visible:ring-2");
  });
});
