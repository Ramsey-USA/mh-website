import { render, screen } from "@testing-library/react";
import { CoreValuesSection } from "../CoreValuesSection";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("CoreValuesSection", () => {
  it("renders all four core values", () => {
    render(<CoreValuesSection />);
    expect(screen.getByText("Honesty")).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
    expect(screen.getByText("Professionalism")).toBeInTheDocument();
    expect(screen.getByText("Thoroughness")).toBeInTheDocument();
  });

  it("renders taglines for each value", () => {
    render(<CoreValuesSection />);
    expect(
      screen.getByText("Clear Communication Every Time"),
    ).toBeInTheDocument();
    expect(screen.getByText("Doing What's Right")).toBeInTheDocument();
    expect(screen.getByText("Excellence in Action")).toBeInTheDocument();
    expect(screen.getByText("No Detail Left Behind")).toBeInTheDocument();
  });

  it("renders stats labels", () => {
    render(<CoreValuesSection />);
    expect(screen.getByText("100% Transparent Pricing")).toBeInTheDocument();
    expect(screen.getByText("Unwavering Ethics")).toBeInTheDocument();
  });

  it("renders images for each value", () => {
    render(<CoreValuesSection />);
    expect(
      screen.getByAltText("Honesty - Clear Communication Every Time"),
    ).toBeInTheDocument();
  });
});
