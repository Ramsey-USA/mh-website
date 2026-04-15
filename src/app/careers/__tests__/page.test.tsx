import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CareersPage from "../page";

const replaceMock = jest.fn();
let mockSearchParams = new URLSearchParams();

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

jest.mock("next/dynamic", () => () => {
  return function MockDynamicComponent() {
    return null;
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
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
  JobApplicationModal: ({
    isOpen,
    entryPoint,
    onClose,
  }: {
    isOpen: boolean;
    entryPoint?: string;
    onClose?: () => void;
  }) =>
    isOpen ? (
      <div>
        Modal entry: {entryPoint ?? "none"}
        <button type="button" onClick={onClose}>
          Close Modal
        </button>
      </div>
    ) : null,
  AlternatingShowcase: () => null,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => null,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { careers: [] },
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/lib/data/testimonials", () => ({
  getEmployeeTestimonials: () => [],
}));

jest.mock("@/lib/data/careers", () => ({
  companyBenefits: [],
  veteranBenefits: [],
  cultureValues: [],
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    email: { main: "office@mhc-gc.com" },
    phone: { display: "(509) 308-6489", tel: "+15093086489" },
    bbb: {
      profileUrl: "https://www.bbb.org/test",
      sealClickUrl: "https://www.bbb.org/test#sealclick",
      sealHorizontal: "/images/bbb-seal.png",
      sealHorizontalWhite: "/images/bbb-seal-white.png",
      sealVertical: "/images/bbb-seal-vertical.png",
      sealVerticalWhite: "/images/bbb-seal-vertical-white.png",
      rating: "A+",
      accreditedSince: "April 7, 2026",
    },
    travelers: {
      website: "https://www.travelers.com",
      logo: "/images/travelers-logo.png",
      logoWhite: "/images/travelers-logo-white.png",
    },
  },
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/lib/seo/page-seo-utils", () => ({
  getCareersSEO: () => ({}),
}));

jest.mock("@/components/ui/SimpleSkeleton", () => ({
  SimpleSkeleton: () => null,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: () => ({}),
  breadcrumbPatterns: { careers: {} },
}));

describe("CareersPage application CTAs", () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    replaceMock.mockClear();
  });

  it("opens the modal with veteran application context", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    await user.click(screen.getByRole("button", { name: /Apply as Veteran/i }));

    expect(
      screen.getByText("Modal entry: Veteran Application"),
    ).toBeInTheDocument();
  });

  it("opens the modal with general application context", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    await user.click(
      screen.getByRole("button", { name: /Submit Application/i }),
    );

    expect(
      screen.getByText("Modal entry: General Application"),
    ).toBeInTheDocument();
  });

  it("opens the modal with general inquiry context from the primary start button", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    await user.click(
      screen.getAllByRole("button", { name: /Start Application/i })[0]!,
    );

    expect(
      screen.getByText("Modal entry: General Inquiry"),
    ).toBeInTheDocument();
  });

  it("opens the modal from the footer deep link query params", async () => {
    mockSearchParams = new URLSearchParams(
      "apply=true&entryPoint=Footer%20Application",
    );

    render(<CareersPage />);

    expect(
      await screen.findByText("Modal entry: Footer Application"),
    ).toBeInTheDocument();
  });

  it("closes the modal without cleaning URL when no apply params", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    // Open it first
    await user.click(screen.getByRole("button", { name: /Apply as Veteran/i }));
    expect(screen.getByText(/Modal entry:/)).toBeInTheDocument();

    // Close it
    await user.click(screen.getByRole("button", { name: /Close Modal/i }));
    expect(screen.queryByText(/Modal entry:/)).not.toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("closes the modal and cleans apply params from URL", async () => {
    const user = userEvent.setup();
    mockSearchParams = new URLSearchParams("apply=true&entryPoint=Test");

    render(<CareersPage />);

    // Modal auto-opens due to query params
    expect(await screen.findByText("Modal entry: Test")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Close Modal/i }));

    expect(replaceMock).toHaveBeenCalledWith("/careers", { scroll: false });
  });

  it("sends mailto when the email inquiry button is clicked", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    // The email button near the veteran section (contains the mark_email_read icon text)
    const emailButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.textContent?.includes("mark_email_read"));

    // Just clicking should exercise the window.location.href assignment without throwing
    await expect(user.click(emailButtons[0]!)).resolves.toBeUndefined();
  });
});
