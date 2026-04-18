/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/shared-sections", () => ({
  NextStepsSection: () => null,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/resources/SafetyComplianceBadge", () => ({
  SafetyComplianceBadge: () => null,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({ "@type": "BreadcrumbList" })),
}));

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "submission-123" }),
}));

describe("Safety navigation contracts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it("routes safety manual card from resources page to the public safety resource center", () => {
    const { default: ResourcesPage } = require("../resources/page") as {
      default: React.ComponentType;
    };

    render(<ResourcesPage />);

    const safetyManualLink = screen.getByRole("link", {
      name: /MISH — Safety & Health Program/i,
    });
    expect(safetyManualLink).toHaveAttribute(
      "href",
      "/resources/safety-program",
    );
  });

  it("keeps section page primary back navigation on the public safety resource center", async () => {
    const { default: SectionPage } =
      require("../resources/safety-manual/section/[slug]/page") as {
        default: (props: {
          params: Promise<{ slug: string }>;
        }) => Promise<React.ReactElement>;
      };

    const ui = await SectionPage({
      params: Promise.resolve({ slug: "table-of-contents" }),
    });
    render(ui);

    const backLink = screen.getByRole("link", {
      name: /Back to Safety Program/i,
    });
    expect(backLink).toHaveAttribute(
      "href",
      "/resources/safety-program#manual-downloads",
    );

    const middleNav = screen.getByRole("link", {
      name: /^Safety Program Resources$/i,
    });
    expect(middleNav).toHaveAttribute(
      "href",
      "/resources/safety-program#manual-downloads",
    );
  });

  it("returns print page users to /safety/hub", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          accessToken: "token-123",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: {
            id: "submission-123",
            job_id: "job-1",
            job_number: "J-001",
            job_name: "Sample Project",
            form_type: "toolbox-talk",
            submitted_by: "Test User",
            data: JSON.stringify({ topic: "Lift plan review" }),
            print_count: 0,
            status: "submitted",
            created_at: "2026-04-01T00:00:00.000Z",
          },
        }),
      });

    Object.defineProperty(global, "fetch", {
      writable: true,
      value: fetchMock,
    });

    const { default: PrintPageClient } =
      require("../safety/print/[id]/PrintPageClient") as {
        default: React.ComponentType;
      };

    render(<PrintPageClient />);

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /Back to Hub/i }),
      ).toBeInTheDocument();
    });

    const backToHub = screen.getByRole("link", { name: /Back to Hub/i });
    expect(backToHub).toHaveAttribute("href", "/safety/hub");
  });
});
