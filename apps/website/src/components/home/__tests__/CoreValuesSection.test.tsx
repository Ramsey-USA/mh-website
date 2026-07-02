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

  it("renders unique primary slogans for each core value", () => {
    render(<CoreValuesSection />);
    expect(screen.getByText("Truth in every touchpoint.")).toBeInTheDocument();
    expect(
      screen.getByText("Do right when no one is watching."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Prepared, precise, and respectful."),
    ).toBeInTheDocument();
    expect(screen.getByText("Every detail accounted for.")).toBeInTheDocument();
  });

  it("renders supporting slogans for each core value", () => {
    render(<CoreValuesSection />);
    expect(
      screen.getByText("Clear facts. No spin. No surprises."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Commitments kept under pressure."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Standards high on every site, every day."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Measure twice, document always, close out clean."),
    ).toBeInTheDocument();
  });

  it("renders Spanish core-value slogans in bilingual format", () => {
    render(<CoreValuesSection locale="es" />);

    expect(screen.getByText("Honestidad")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Truth in every touchpoint. (Verdad en cada punto de contacto.)",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Clear facts. No spin. No surprises. (Hechos claros. Sin adornos. Sin sorpresas.)",
      ),
    ).toBeInTheDocument();
  });

  it("renders stats labels", () => {
    render(<CoreValuesSection />);
    expect(screen.getByText("100% Transparent Pricing")).toBeInTheDocument();
    expect(screen.getByText("Unwavering Ethics")).toBeInTheDocument();
  });

  it("renders value media (video/image) for each value", () => {
    render(<CoreValuesSection />);
    const mediaCount =
      document.querySelectorAll("video").length +
      document.querySelectorAll("img").length;
    expect(mediaCount).toBe(4);
    expect(
      screen.getByAltText("Integrity - Doing What's Right"),
    ).toBeInTheDocument();
  });

  it("uses the MH core value icon standard", () => {
    render(<CoreValuesSection />);
    expect(screen.getAllByText("shield").length).toBeGreaterThan(0);
    expect(screen.getByText("balance")).toBeInTheDocument();
    expect(screen.getByText("business_center")).toBeInTheDocument();
    expect(screen.getByText("task_alt")).toBeInTheDocument();
  });
});
