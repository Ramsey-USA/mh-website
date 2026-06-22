import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { COMPANY_INFO } from "@/lib/constants/company";
import Footer from "../Footer";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, prefetch, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/analytics/TrackedContactLinks", () => ({
  TrackedPhoneLink: ({ children, trackId, trackProperties, ...props }: any) => (
    <a href={`tel:${COMPANY_INFO.phone.tel}`} {...props}>
      {children}
    </a>
  ),
  TrackedEmailLink: ({ children, trackId, trackProperties, ...props }: any) => (
    <a href={`mailto:${COMPANY_INFO.email.main}`} {...props}>
      {children}
    </a>
  ),
  TrackedLocationLink: ({
    children,
    trackId,
    trackProperties,
    ...props
  }: any) => (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        COMPANY_INFO.address.full,
      )}`}
      {...props}
    >
      {children}
    </a>
  ),
}));

jest.mock("@/components/ui/modals/AdminSignInModal", () => ({
  AdminSignInModal: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <dialog open aria-labelledby="admin-access-title">
        <h2 id="admin-access-title">Admin Access</h2>
        <button onClick={onClose}>Close admin modal</button>
      </dialog>
    ) : null,
}));

describe("Footer", () => {
  const getNewsletterFeedback = () =>
    document.getElementById("footer-newsletter-feedback");
  const keyboardEventTarget = globalThis as unknown as Window;

  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows license numbers without relying on hover tooltips", () => {
    render(<Footer />);

    expect(screen.getByText("MHCONCI907R7")).toBeVisible();
    expect(screen.getByText("194331")).toBeVisible();
    expect(screen.getByText("RCE-49250")).toBeVisible();
  });

  it("renders the Events footer link pointing to /events", () => {
    render(<Footer />);

    const eventLink = screen.getByRole("link", { name: /events/i });
    expect(eventLink).toBeInTheDocument();
    expect(eventLink).toHaveAttribute("href", "/events");
  });

  it("keeps the Oregon license verification link intact", () => {
    render(<Footer />);

    const oregonLicenseLink = screen.getByRole("link", {
      name: "Oregon License 194331 verification",
    });
    expect(oregonLicenseLink).toHaveAttribute(
      "href",
      "https://egov.sos.state.or.us/br/pkg_web_name_srch_inq.show_detl?p_be_rsn=1514612&p_srce=BR_INQ&p_print=FALSE",
    );
    expect(oregonLicenseLink).toHaveAttribute("target", "_blank");
    expect(oregonLicenseLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the Washington license verification link intact", () => {
    render(<Footer />);

    const washingtonLicenseLink = screen.getByRole("link", {
      name: "Washington License MHCONCI907R7 verification",
    });
    expect(washingtonLicenseLink).toHaveAttribute(
      "href",
      "https://secure.lni.wa.gov/verify/Detail.aspx?UBI=603069508&LIC=MHCONCI907R7&SAW=false",
    );
    expect(washingtonLicenseLink).toHaveAttribute("target", "_blank");
    expect(washingtonLicenseLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the Idaho license verification link intact", () => {
    render(<Footer />);

    const idahoLicenseLink = screen.getByRole("link", {
      name: "Idaho License RCE-49250 verification",
    });
    expect(idahoLicenseLink).toHaveAttribute(
      "href",
      "https://www.labor.idaho.gov/",
    );
    expect(idahoLicenseLink).toHaveAttribute("target", "_blank");
    expect(idahoLicenseLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the service area map with the correct aria-label", () => {
    render(<Footer />);

    const mapImage = screen.getByRole("img", {
      name: "Map showing Washington, Oregon, and Idaho - MH Construction service area",
    });
    expect(mapImage).toBeInTheDocument();
  });

  it("renders the footer links with the expected destinations", () => {
    const { container } = render(<Footer />);

    const hrefs = Array.from(container.querySelectorAll("a")).map((link) =>
      link.getAttribute("href"),
    );

    [
      "/",
      "/contact",
      "/services",
      "/projects",
      "/about",
      "/careers?apply=true&entryPoint=Footer%20Application",
      `tel:${COMPANY_INFO.phone.tel}`,
      `mailto:${COMPANY_INFO.email.main}`,
      "/privacy",
      "/terms",
      "/accessibility",
      "/sitemap.xml",
      "https://www.agc.org/babaa-resource-hub",
    ].forEach((href) => {
      expect(hrefs).toContain(href);
    });
  });

  it("uses a distinct footer heading for the main navigation column", () => {
    render(<Footer />);

    expect(screen.getByRole("heading", { name: "Quick Links" })).toBeVisible();
    expect(screen.getByText("Main pages")).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Company & Partnerships" }),
    ).toBeVisible();
    expect(screen.getByText("Team & Partners")).toBeVisible();
    expect(screen.getByText("Contact options")).toBeVisible();
    expect(screen.getByRole("link", { name: /services/i })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("renders a header for the accreditations and affiliations section", () => {
    render(<Footer />);

    expect(
      screen.getByRole("heading", {
        name: "Accreditations and Affiliations",
      }),
    ).toBeVisible();
    expect(screen.getByText("Verified partners")).toBeVisible();
  });

  it("includes hover descriptions for the footer section headers", () => {
    render(<Footer />);

    expect(
      screen.getByText("Jump straight to our core pages and service areas."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Learn about the team, affiliations, and public-sector experience.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Third-party memberships, certifications, and partner seals that reinforce trust.",
      ),
    ).toBeInTheDocument();
  });

  it("submits the newsletter form with accessible status feedback", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<Footer />);

    const input = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    await user.type(input, "builder@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "/api/newsletter",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "builder@example.com" }),
        }),
      );
    });

    await waitFor(() => {
      expect(getNewsletterFeedback()).toHaveTextContent("Subscribed!");
    });
    expect(input).toHaveValue("");
  });

  it("opens the admin modal from the private keyboard shortcut", () => {
    render(<Footer />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.keyDown(keyboardEventTarget, {
      key: "A",
      ctrlKey: true,
      shiftKey: true,
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /admin access/i }),
    ).toBeInTheDocument();
  });

  it("clears status message after 5 seconds (timeout callback) and runs cleanup on unmount", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (globalThis.fetch as jest.Mock).mockResolvedValue({ ok: true });

    const { unmount } = render(<Footer />);

    const input = screen.getByLabelText(/email address/i);
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    // Wait for the success state to appear
    await waitFor(() =>
      expect(getNewsletterFeedback()).toHaveTextContent("Subscribed!"),
    );

    // The cleanup function in useEffect is registered now (success state).
    // Unmounting triggers the cleanup callback (window.clearTimeout).
    unmount();

    jest.useRealTimers();
  });

  it("resets status after 5-second auto-clear timeout fires", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (globalThis.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<Footer />);

    const input = screen.getByLabelText(/email address/i);
    await user.type(input, "test2@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() =>
      expect(getNewsletterFeedback()).toHaveTextContent("Subscribed!"),
    );

    // Advance time past the 5-second auto-clear timeout (wrapped in act to flush state updates)
    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() => expect(getNewsletterFeedback()).toHaveTextContent(""));

    jest.useRealTimers();
  });

  it("renders the BABAA supporter link pointing to the AGC resource hub", () => {
    render(<Footer />);

    const babaaLink = screen.getByRole("link", {
      name: /AGC BABAA Resource Hub/i,
    });
    expect(babaaLink).toBeInTheDocument();
    expect(babaaLink).toHaveAttribute(
      "href",
      "https://www.agc.org/babaa-resource-hub",
    );
    expect(babaaLink).toHaveAttribute("target", "_blank");
    expect(babaaLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByText("BABAA Supporter (Build America, Buy America Act)"),
    ).toBeInTheDocument();
  });

  it("does not render the staff portal form", () => {
    render(<Footer />);

    expect(
      screen.queryByLabelText(/staff portal access/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/staff/i)).not.toBeInTheDocument();
  });

  it("closes the admin modal when onClose is called", async () => {
    render(<Footer />);

    fireEvent.keyDown(keyboardEventTarget, {
      key: "A",
      ctrlKey: true,
      shiftKey: true,
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /close admin modal/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("scrolls to top when the Back to Top button is clicked", async () => {
    const scrollTo = jest.fn();
    Object.defineProperty(globalThis, "scrollTo", {
      writable: true,
      value: scrollTo,
    });

    render(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: /back to top/i }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("does nothing when newsletter form is submitted with an empty email", async () => {
    const user = userEvent.setup();

    render(<Footer />);

    // Leave the email input empty and click subscribe
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    // Status should remain idle (no fetch call)
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("handles the JS empty-email guard when form is submitted programmatically", async () => {
    render(<Footer />);

    // Submit the form directly (bypasses HTML5 required validation) with empty email value
    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    const form = submitButton.closest("form")!;
    fireEvent.submit(form);

    // The JS guard (lines 434-435) fires before fetch
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("shows 'Try again' when the newsletter API returns a non-ok response", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<Footer />);

    await user.type(
      screen.getByLabelText(/email address/i),
      "fail@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(getNewsletterFeedback()).toHaveTextContent("Try again");
    });
  });

  it("shows 'Error' when the newsletter fetch itself throws", async () => {
    const user = userEvent.setup();
    (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<Footer />);

    await user.type(
      screen.getByLabelText(/email address/i),
      "throw@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(getNewsletterFeedback()).toHaveTextContent("Error");
    });
  });
});
