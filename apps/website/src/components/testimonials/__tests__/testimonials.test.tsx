/**
 * @jest-environment jsdom
 *
 * Tests for testimonial components:
 * TestimonialCard, TestimonialGrid, TestimonialsCarousel
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import type { Testimonial } from "@/lib/data/testimonials";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// ── Shared test data ──────────────────────────────────────────────────────────

const clientTestimonial: Testimonial = {
  id: "test-client-1",
  name: "Jane Smith",
  location: "Richland, WA",
  project: "Custom Home",
  rating: 5,
  quote: "Outstanding service and professionalism throughout the project.",
  type: "client",
  featured: true,
};

const employeeTestimonial: Testimonial = {
  id: "test-employee-1",
  name: "Bob Jones",
  role: "Senior Carpenter",
  quote: "Great place to work with a strong team culture.",
  type: "employee",
};

const veteranTestimonial: Testimonial = {
  id: "test-veteran-1",
  name: "Sgt. Mike Davis",
  quote: "Veteran-owned businesses understand the importance of integrity.",
  type: "veteran",
  veteranStatus: true,
};

// ── TestimonialCard ───────────────────────────────────────────────────────────

describe("TestimonialCard", () => {
  const { TestimonialCard } = require("../TestimonialCard");

  it("renders without throwing (client testimonial)", () => {
    expect(() =>
      render(<TestimonialCard testimonial={clientTestimonial} />),
    ).not.toThrow();
  });

  it("renders the testimonial name", () => {
    render(<TestimonialCard testimonial={clientTestimonial} />);
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders the quote text", () => {
    render(<TestimonialCard testimonial={clientTestimonial} />);
    // quote is wrapped in a blockquote with curly quotes — use regex
    expect(
      screen.getByText(/Outstanding service and professionalism/),
    ).toBeInTheDocument();
  });

  it("renders employee variant without throwing", () => {
    expect(() =>
      render(
        <TestimonialCard
          testimonial={employeeTestimonial}
          variant="employee"
        />,
      ),
    ).not.toThrow();
  });

  it("renders veteran variant without throwing", () => {
    expect(() =>
      render(
        <TestimonialCard testimonial={veteranTestimonial} variant="veteran" />,
      ),
    ).not.toThrow();
  });

  it("renders client variant explicitly", () => {
    expect(() =>
      render(
        <TestimonialCard testimonial={clientTestimonial} variant="client" />,
      ),
    ).not.toThrow();
  });

  it("hides image when showImage=false", () => {
    const { container } = render(
      <TestimonialCard testimonial={clientTestimonial} showImage={false} />,
    );
    // Avatar initials should not be present
    expect(container.querySelector(".bg-gradient-to-br")).toBeNull();
  });

  it("renders rating stars when showRating=true", () => {
    render(
      <TestimonialCard testimonial={clientTestimonial} showRating={true} />,
    );
    // Rating = 5 — look for star icons
    const stars = screen.getAllByText(
      (_, el) => el?.getAttribute("data-icon") === "star",
    );
    expect(stars.length).toBeGreaterThan(0);
  });
});

// ── TestimonialGrid ───────────────────────────────────────────────────────────

describe("TestimonialGrid", () => {
  const { TestimonialGrid } = require("../TestimonialGrid");

  const testimonials = [
    clientTestimonial,
    employeeTestimonial,
    veteranTestimonial,
  ];

  it("renders without throwing", () => {
    expect(() =>
      render(<TestimonialGrid testimonials={testimonials} />),
    ).not.toThrow();
  });

  it("renders all testimonial names", () => {
    render(<TestimonialGrid testimonials={testimonials} />);
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Jones")).toBeInTheDocument();
    expect(screen.getByText("Sgt. Mike Davis")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<TestimonialGrid testimonials={testimonials} title="Our Reviews" />);
    // Title is split into two spans (words before last / last word)
    expect(screen.getByText("Reviews")).toBeInTheDocument();
  });

  it("renders with maxItems limit", () => {
    render(<TestimonialGrid testimonials={testimonials} maxItems={1} />);
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Jones")).not.toBeInTheDocument();
  });

  it("renders view more button when showViewMoreButton=true", () => {
    render(
      <TestimonialGrid
        testimonials={testimonials}
        showViewMoreButton={true}
        viewMoreHref="/testimonials"
      />,
    );
    const link = screen
      .getAllByRole("link")
      .find((el) => (el as HTMLAnchorElement).href.includes("/testimonials"));
    expect(link).toBeDefined();
  });

  it("renders 'Coming Soon' when no testimonials", () => {
    render(<TestimonialGrid testimonials={[]} />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it("renders with 2-column layout", () => {
    expect(() =>
      render(<TestimonialGrid testimonials={testimonials} columns={2} />),
    ).not.toThrow();
  });
});

// ── TestimonialsCarousel ──────────────────────────────────────────────────────

describe("TestimonialsCarousel", () => {
  const { TestimonialsCarousel } = require("../TestimonialsCarousel");

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without throwing", () => {
    expect(() =>
      render(
        <TestimonialsCarousel
          testimonials={[clientTestimonial, employeeTestimonial]}
        />,
      ),
    ).not.toThrow();
  });

  it("renders 'Coming Soon' when no testimonials", () => {
    render(<TestimonialsCarousel testimonials={[]} />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it("shows the first testimonial name by default", () => {
    render(
      <TestimonialsCarousel
        testimonials={[clientTestimonial, employeeTestimonial]}
      />,
    );
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders navigation buttons for multi-testimonial carousel", () => {
    render(
      <TestimonialsCarousel
        testimonials={[clientTestimonial, employeeTestimonial]}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders single testimonial without error", () => {
    expect(() =>
      render(<TestimonialsCarousel testimonials={[clientTestimonial]} />),
    ).not.toThrow();
  });

  it("autoPlay=false disables auto-advance", () => {
    render(
      <TestimonialsCarousel
        testimonials={[clientTestimonial, employeeTestimonial]}
        autoPlay={false}
      />,
    );
    jest.advanceTimersByTime(10000);
    // Still shows the first testimonial
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
