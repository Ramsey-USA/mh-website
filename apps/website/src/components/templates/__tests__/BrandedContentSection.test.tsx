/**
 * @jest-environment jsdom
 *
 * Tests for BrandedContentSection — all variants and branches
 */

import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

// FadeInWhenVisible wraps children — mock to render them immediately
jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="fade-in">{children}</div>
  ),
}));

import { BrandedContentSection } from "../BrandedContentSection";

// ─── Basic rendering ──────────────────────────────────────────────────────────

describe("BrandedContentSection", () => {
  it("renders children", () => {
    render(
      <BrandedContentSection id="test">
        <span>Content here</span>
      </BrandedContentSection>,
    );
    expect(screen.getByText("Content here")).toBeTruthy();
  });

  it("sets the section id", () => {
    const { container } = render(
      <BrandedContentSection id="my-section">
        <span>X</span>
      </BrandedContentSection>,
    );
    expect(container.querySelector("#my-section")).toBeTruthy();
  });

  it("renders with header (subtitle + title)", () => {
    render(
      <BrandedContentSection
        id="s1"
        header={{ icon: "shield", subtitle: "Sub", title: "Title" }}
      >
        <span>Body</span>
      </BrandedContentSection>,
    );
    expect(screen.getByText("Sub")).toBeTruthy();
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("shield")).toBeTruthy();
  });

  it("renders header description when provided", () => {
    render(
      <BrandedContentSection
        id="s2"
        header={{
          icon: "star",
          subtitle: "S",
          title: "T",
          description: "Desc text",
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("Desc text")).toBeTruthy();
  });

  it("renders JSX description", () => {
    render(
      <BrandedContentSection
        id="s3"
        header={{
          icon: "info",
          subtitle: "S",
          title: "T",
          description: <strong>Bold description</strong>,
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("Bold description")).toBeTruthy();
  });

  it("omits description block when not provided", () => {
    render(
      <BrandedContentSection
        id="s4"
        header={{ icon: "home", subtitle: "S", title: "T" }}
      >
        <span>C</span>
      </BrandedContentSection>,
    );
    // No <p> description paragraph
    expect(screen.queryByRole("paragraph")).toBeNull();
  });

  // ─── variant ───────────────────────────────────────────────────────────────

  it("uses white background by default", () => {
    const { container } = render(
      <BrandedContentSection id="s5">
        <span />
      </BrandedContentSection>,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-white");
  });

  it("uses gray background when variant=gray", () => {
    const { container } = render(
      <BrandedContentSection id="s6" variant="gray">
        <span />
      </BrandedContentSection>,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-gray-50");
  });

  // ─── animated ─────────────────────────────────────────────────────────────

  it("wraps in FadeInWhenVisible when animated=true (default)", () => {
    render(
      <BrandedContentSection id="s7">
        <span>Anim</span>
      </BrandedContentSection>,
    );
    expect(screen.getByTestId("fade-in")).toBeTruthy();
  });

  it("does NOT wrap in FadeInWhenVisible when animated=false", () => {
    render(
      <BrandedContentSection id="s8" animated={false}>
        <span>NoAnim</span>
      </BrandedContentSection>,
    );
    expect(screen.queryByTestId("fade-in")).toBeNull();
    expect(screen.getByText("NoAnim")).toBeTruthy();
  });

  // ─── className / containerClassName ───────────────────────────────────────

  it("applies className to section element", () => {
    const { container } = render(
      <BrandedContentSection id="s9" className="extra-class">
        <span />
      </BrandedContentSection>,
    );
    expect(container.querySelector(".extra-class")).toBeTruthy();
  });

  it("applies containerClassName to inner container", () => {
    const { container } = render(
      <BrandedContentSection id="s10" containerClassName="inner-class">
        <span />
      </BrandedContentSection>,
    );
    expect(container.querySelector(".inner-class")).toBeTruthy();
  });

  // ─── iconVariant branches ─────────────────────────────────────────────────

  it("renders iconVariant=primary (default)", () => {
    render(
      <BrandedContentSection
        id="s11"
        header={{
          icon: "star",
          iconVariant: "primary",
          subtitle: "S",
          title: "T",
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("star")).toBeTruthy();
  });

  it("renders iconVariant=secondary", () => {
    render(
      <BrandedContentSection
        id="s12"
        header={{
          icon: "star",
          iconVariant: "secondary",
          subtitle: "S",
          title: "T",
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("star")).toBeTruthy();
  });

  it("renders iconVariant=bronze", () => {
    render(
      <BrandedContentSection
        id="s13"
        header={{
          icon: "star",
          iconVariant: "bronze",
          subtitle: "S",
          title: "T",
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("star")).toBeTruthy();
  });

  it("renders iconVariant=custom with custom gradients", () => {
    render(
      <BrandedContentSection
        id="s14"
        header={{
          icon: "military_tech",
          iconVariant: "custom",
          customIconGradient: "from-green-700 via-green-800 to-green-900",
          customIconBlur: "from-green-600/30 to-green-700/30",
          customTitleGradient: "from-green-700 to-green-900",
          subtitle: "Veteran Owned",
          title: "Built on Service",
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("military_tech")).toBeTruthy();
    expect(screen.getByText("Built on Service")).toBeTruthy();
  });

  it("renders iconVariant=custom without custom gradients (falls back)", () => {
    render(
      <BrandedContentSection
        id="s15"
        header={{
          icon: "star",
          iconVariant: "custom",
          // no customIconGradient / customIconBlur / customTitleGradient
          subtitle: "S",
          title: "T",
        }}
      >
        <span />
      </BrandedContentSection>,
    );
    expect(screen.getByText("star")).toBeTruthy();
  });

  it("renders without header (header omitted)", () => {
    render(
      <BrandedContentSection id="s16">
        <span>No header</span>
      </BrandedContentSection>,
    );
    expect(screen.getByText("No header")).toBeTruthy();
    // No h2 heading rendered
    expect(screen.queryByRole("heading")).toBeNull();
  });
});
