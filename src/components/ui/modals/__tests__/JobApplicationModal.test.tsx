import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JobApplicationModal } from "../JobApplicationModal";

jest.mock("@/lib/analytics/tracking", () => ({
  trackFormSubmit: jest.fn(),
}));

describe("JobApplicationModal", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("shows veteran application context and preselects veteran status", () => {
    render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="Veteran Application"
      />,
    );

    expect(screen.getByText("Veteran Application")).toBeInTheDocument();
    expect(screen.getByText("Start Your Application")).toBeInTheDocument();
    expect(screen.getByLabelText(/Veteran Status/i)).toHaveValue("veteran");
  });

  it("submits the streamlined form without requiring a resume upload", async () => {
    const user = userEvent.setup();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Jordan");
    await user.type(screen.getByLabelText(/Last Name/i), "Lee");
    await user.type(
      screen.getByLabelText(/Email Address/i),
      "jordan@example.com",
    );
    await user.selectOptions(
      screen.getByLabelText(/Position of Interest/i),
      "Project Manager",
    );

    await user.click(screen.getByRole("button", { name: /Send Application/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/job-applications",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );

    const requestBody = JSON.parse(
      (mockFetch.mock.calls[0]?.[1] as RequestInit).body as string,
    );

    expect(requestBody).toMatchObject({
      firstName: "Jordan",
      lastName: "Lee",
      email: "jordan@example.com",
      position: "Project Manager",
      resumeUrl: "",
      resumeKey: "",
    });

    expect(screen.getByText("Application Received")).toBeInTheDocument();
  });

  it("calls onClose when escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <JobApplicationModal
        isOpen
        onClose={onClose}
        entryPoint="General Inquiry"
      />,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("handleFileChange: removes resumeFile from state when no file is selected", () => {
    const { container } = render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    const fileInput = container.querySelector('input[name="resume"]')!;
    // Trigger change with no files — exercises the `if (!file)` branch in handleFileChange
    fireEvent.change(fileInput, { target: { files: [] } });

    // No error should appear — the function returns early
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("handleFileChange: shows an error for files larger than 10 MB", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    const oversizedFile = new File(["x"], "big.pdf", {
      type: "application/pdf",
    });
    Object.defineProperty(oversizedFile, "size", {
      value: 11 * 1024 * 1024,
    });

    const fileInput = container.querySelector(
      'input[name="resume"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, oversizedFile);

    expect(screen.getByText(/10 MB or smaller/i)).toBeInTheDocument();
  });

  it("handleFileChange: accepts a valid file and clears any previous error", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    const validFile = new File(["pdf content"], "resume.pdf", {
      type: "application/pdf",
    });

    const fileInput = container.querySelector(
      'input[name="resume"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, validFile);

    // File name shown means the valid-file branch ran
    expect(screen.getByText(/Selected: resume.pdf/i)).toBeInTheDocument();
  });

  it("handleSubmit: uploads resume and submits application on success", async () => {
    const user = userEvent.setup();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    // First call: resume upload succeeds
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { url: "https://r2.example/file.pdf", key: "file-key" },
      }),
    } as Response);
    // Second call: application submit succeeds
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const { container } = render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Jane");
    await user.type(screen.getByLabelText(/Last Name/i), "Doe");
    await user.type(
      screen.getByLabelText(/Email Address/i),
      "jane@example.com",
    );
    await user.selectOptions(
      screen.getByLabelText(/Position of Interest/i),
      "Project Manager",
    );

    const validFile = new File(["pdf content"], "resume.pdf", {
      type: "application/pdf",
    });
    const fileInput = container.querySelector(
      'input[name="resume"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, validFile);

    await user.click(screen.getByRole("button", { name: /Send Application/i }));

    // Should call upload endpoint first, then job-applications
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/upload/resume",
        expect.any(Object),
      );
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/job-applications",
        expect.any(Object),
      );
    });

    expect(await screen.findByText("Application Received")).toBeInTheDocument();
  });

  it("handleSubmit: shows error when resume upload fails", async () => {
    const user = userEvent.setup();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Upload rejected" }),
    } as Response);

    const { container } = render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Jane");
    await user.type(screen.getByLabelText(/Last Name/i), "Doe");
    await user.type(
      screen.getByLabelText(/Email Address/i),
      "jane@example.com",
    );
    await user.selectOptions(
      screen.getByLabelText(/Position of Interest/i),
      "Project Manager",
    );

    const validFile = new File(["pdf"], "resume.pdf", {
      type: "application/pdf",
    });
    const fileInput = container.querySelector(
      'input[name="resume"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, validFile);

    await user.click(screen.getByRole("button", { name: /Send Application/i }));

    await waitFor(() =>
      expect(screen.getByText(/Upload rejected/i)).toBeInTheDocument(),
    );
  });

  it("handleSubmit: shows error when job-applications API returns non-ok", async () => {
    const user = userEvent.setup();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error" }),
    } as Response);

    render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Tom");
    await user.type(screen.getByLabelText(/Last Name/i), "Smith");
    await user.type(screen.getByLabelText(/Email Address/i), "tom@example.com");
    await user.selectOptions(
      screen.getByLabelText(/Position of Interest/i),
      "Project Manager",
    );

    await user.click(screen.getByRole("button", { name: /Send Application/i }));

    await waitFor(() =>
      expect(screen.getByText(/Server error/i)).toBeInTheDocument(),
    );
  });

  it("handleSubmit: swallows analytics errors and still shows success", async () => {
    const user = userEvent.setup();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
    const { trackFormSubmit } = await import("@/lib/analytics/tracking");

    (trackFormSubmit as jest.Mock).mockImplementationOnce(() => {
      throw new Error("analytics down");
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Ana");
    await user.type(screen.getByLabelText(/Last Name/i), "Rivera");
    await user.type(screen.getByLabelText(/Email Address/i), "ana@example.com");
    await user.selectOptions(
      screen.getByLabelText(/Position of Interest/i),
      "Project Manager",
    );

    await user.click(screen.getByRole("button", { name: /Send Application/i }));

    // Despite the analytics error, success state is shown
    expect(await screen.findByText("Application Received")).toBeInTheDocument();
  });

  it("resets entered data when the modal is reopened with a different entry point", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const { rerender } = render(
      <JobApplicationModal
        isOpen
        onClose={onClose}
        entryPoint="General Inquiry"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Alex");
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("Alex");

    rerender(
      <JobApplicationModal
        isOpen={false}
        onClose={onClose}
        entryPoint="General Inquiry"
      />,
    );

    rerender(
      <JobApplicationModal
        isOpen
        onClose={onClose}
        entryPoint="Veteran Application"
      />,
    );

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Veteran Status/i)).toHaveValue("veteran");
    expect(screen.getByText("Veteran Application")).toBeInTheDocument();
  });
});
