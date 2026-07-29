/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";

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

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

jest.mock("@/components/ui/modals/Modal", () => ({
  Modal: ({
    children,
    isOpen,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
  }) => (isOpen ? <div>{children}</div> : null),
}));

jest.mock("../ServiceCard", () => ({
  ServiceCard: ({
    service,
    onOpenModal,
  }: {
    service: { title: string };
    onOpenModal: () => void;
  }) => <button onClick={onOpenModal}>{service.title}</button>,
}));

import { CoreServicesSection } from "../CoreServicesSection";

describe("CoreServicesSection", () => {
  it("renders project-fit guidance inside the service modal", () => {
    render(
      <CoreServicesSection
        services={[
          {
            slug: "demo",
            title: "Demo Service",
            subtitle: "Example scope",
            description: "A concise description of the service.",
            features: ["Feature one"],
            benefits: ["Benefit one"],
            ctaLink: "/contact",
            ctaLinkText: "Learn more",
          },
        ]}
        title="Core Services"
        subtitle="Services"
        description="A short description"
        locale="en"
      />,
    );

    const firstCard = screen.getByText("Demo Service");
    fireEvent.click(firstCard);

    expect(
      screen.getByText(/What this means for your project/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/What usually helps early on/i),
    ).toBeInTheDocument();
  });
});
