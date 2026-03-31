import { render, screen } from "@testing-library/react";
import { WhyPartnerSection } from "../WhyPartnerSection";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}));

describe("WhyPartnerSection", () => {
  it("renders the core philosophy callout", () => {
    render(<WhyPartnerSection />);
    expect(
      screen.getByText(/Building projects for the client/i),
    ).toBeInTheDocument();
  });

  it("renders the EMR safety card", () => {
    render(<WhyPartnerSection />);
    expect(
      screen.getByText(".64 EMR - Industry-Leading Safety"),
    ).toBeInTheDocument();
  });

  it("renders the experience card", () => {
    render(<WhyPartnerSection />);
    expect(
      screen.getByText("150+ Years of Combined Experience"),
    ).toBeInTheDocument();
  });

  it("renders the transparency card", () => {
    render(<WhyPartnerSection />);
    expect(screen.getByText("Complete Transparency")).toBeInTheDocument();
  });

  it("renders the long-term partnerships card", () => {
    render(<WhyPartnerSection />);
    expect(screen.getByText("Long-Term Partnerships")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<WhyPartnerSection />);
    expect(screen.getByText("Safety Rating")).toBeInTheDocument();
    expect(screen.getByText("Referral Business")).toBeInTheDocument();
  });

  it("renders highlight bullets", () => {
    render(<WhyPartnerSection />);
    expect(
      screen.getByText(".64 EMR (40% better than industry)"),
    ).toBeInTheDocument();
    expect(screen.getByText("Open-book pricing")).toBeInTheDocument();
  });
});
