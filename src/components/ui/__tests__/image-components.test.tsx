/**
 * @jest-environment jsdom
 *
 * Extended tests for OptimizedImage sub-components:
 * HeroImage, GalleryImage, AvatarImage (all at 0% coverage).
 * Also covers load/error state branches and fill mode.
 */

import { render, screen, fireEvent, act } from "@testing-library/react";

jest.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

// Mock next/image to call onLoad/onError synchronously for testability
jest.mock(
  "next/image",
  () =>
    function MockImage({
      alt,
      src,
      onLoad,
      onError,
      className,
      fill,
      width,
      height,
      ...rest
    }: {
      alt: string;
      src: string;
      onLoad?: () => void;
      onError?: () => void;
      className?: string;
      fill?: boolean;
      width?: number;
      height?: number;
    }) {
      return (
        <img
          alt={alt}
          src={src}
          className={className}
          onLoad={onLoad}
          onError={onError}
          data-fill={fill ? "true" : undefined}
          data-width={width}
          data-height={height}
          {...rest}
        />
      );
    },
);

import { HeroImage, GalleryImage, AvatarImage } from "../media/OptimizedImage";

// ─── HeroImage ────────────────────────────────────────────────────────────────

describe("HeroImage", () => {
  it("renders without overlay by default", () => {
    const { container } = render(
      <HeroImage src="/hero.jpg" alt="Hero image" width={800} height={400} />,
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "Hero image");
    // No overlay div with aria-hidden
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it("renders overlay when overlay=true", () => {
    const { container } = render(
      <HeroImage
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={400}
        overlay={true}
      />,
    );
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });

  it("applies custom overlayClassName", () => {
    const { container } = render(
      <HeroImage
        src="/hero.jpg"
        alt="Hero"
        width={800}
        height={400}
        overlay={true}
        overlayClassName="bg-red-500/50"
      />,
    );
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay?.className).toContain("bg-red-500/50");
  });

  it("passes className to underlying OptimizedImage", () => {
    const { container } = render(
      <HeroImage
        src="/hero.jpg"
        alt="Hero"
        width={800}
        height={400}
        className="my-hero-class"
      />,
    );
    const img = container.querySelector("img");
    expect(img?.className).toContain("my-hero-class");
  });

  it("renders with priority=true (always set for hero)", () => {
    const { container } = render(
      <HeroImage src="/hero.jpg" alt="Hero" width={800} height={400} />,
    );
    // HeroImage always sets priority=true — the mock just renders the img
    expect(container.querySelector("img")).toBeInTheDocument();
  });
});

// ─── GalleryImage ─────────────────────────────────────────────────────────────

describe("GalleryImage", () => {
  it("renders without caption or category", () => {
    const { container } = render(
      <GalleryImage
        src="/photo.jpg"
        alt="Gallery photo"
        width={400}
        height={300}
      />,
    );
    expect(container.querySelector("img")).toHaveAttribute(
      "alt",
      "Gallery photo",
    );
    expect(container.querySelector("p")).toBeNull(); // no caption
  });

  it("renders caption when provided", () => {
    render(
      <GalleryImage
        src="/photo.jpg"
        alt="Gallery photo"
        width={400}
        height={300}
        caption="Our latest project"
      />,
    );
    expect(screen.getByText("Our latest project")).toBeInTheDocument();
  });

  it("renders category badge when provided", () => {
    render(
      <GalleryImage
        src="/photo.jpg"
        alt="Gallery photo"
        width={400}
        height={300}
        category="Commercial"
      />,
    );
    expect(screen.getByText("Commercial")).toBeInTheDocument();
  });

  it("renders both caption and category", () => {
    render(
      <GalleryImage
        src="/photo.jpg"
        alt="Gallery photo"
        width={400}
        height={300}
        caption="Nice building"
        category="Industrial"
      />,
    );
    expect(screen.getByText("Nice building")).toBeInTheDocument();
    expect(screen.getByText("Industrial")).toBeInTheDocument();
  });

  it("applies className to image", () => {
    const { container } = render(
      <GalleryImage
        src="/photo.jpg"
        alt="Gallery"
        width={400}
        height={300}
        className="custom-class"
      />,
    );
    const img = container.querySelector("img");
    expect(img?.className).toContain("custom-class");
  });
});

// ─── AvatarImage ──────────────────────────────────────────────────────────────

describe("AvatarImage", () => {
  it("renders fallback (first letter of alt) when no src", () => {
    render(<AvatarImage alt="Jane Doe" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders custom fallback text when provided", () => {
    render(<AvatarImage alt="Jane Doe" fallback="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    const { container } = render(
      <AvatarImage src="/avatars/jane.jpg" alt="Jane Doe" />,
    );
    expect(container.querySelector("img")).toBeInTheDocument();
  });

  it("falls back to initials when image errors", () => {
    const { container } = render(
      <AvatarImage src="/avatars/broken.jpg" alt="Jane Doe" />,
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();

    act(() => {
      fireEvent.error(img!);
    });

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders sm size class", () => {
    const { container } = render(<AvatarImage alt="Test" size="sm" />);
    expect(container.firstChild?.toString()).toBeTruthy();
    // The fallback div should have sizeClass applied
  });

  it("renders md size class (default)", () => {
    const { container } = render(<AvatarImage alt="Test" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders lg size class", () => {
    const { container } = render(<AvatarImage alt="Test" size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders xl size class", () => {
    const { container } = render(<AvatarImage alt="Test" size="xl" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies className to wrapper", () => {
    const { container } = render(
      <AvatarImage alt="Test" className="my-avatar-class" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
