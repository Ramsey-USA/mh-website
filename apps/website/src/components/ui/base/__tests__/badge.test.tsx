import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary">Beta</Badge>);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<Badge variant="outline">Draft</Badge>);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Badge className="custom-badge" data-testid="badge">
        Tag
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("custom-badge");
  });
});
