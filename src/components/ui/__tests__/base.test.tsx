import { render, screen } from "@testing-library/react";
import { Button } from "../base/button";
import { Badge } from "../base/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../base/card";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders as a button element by default", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it.each(["default", "destructive", "ghost", "link", "outline"] as const)(
    "renders variant=%s without crashing",
    (variant) => {
      const { container } = render(<Button variant={variant}>Btn</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    },
  );

  it.each(["sm", "default", "lg", "icon"] as const)(
    "renders size=%s without crashing",
    (size) => {
      const { container } = render(<Button size={size}>Btn</Button>);
      expect(container.querySelector("button")).toBeInTheDocument();
    },
  );

  it("forwards className", () => {
    const { container } = render(
      <Button className="my-custom-class">Btn</Button>,
    );
    expect(container.querySelector("button")?.className).toContain(
      "my-custom-class",
    );
  });

  it("forwards onClick handler", () => {
    const handler = jest.fn();
    render(<Button onClick={handler}>Click</Button>);
    screen.getByRole("button").click();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it.each(["default", "secondary", "destructive", "outline"] as const)(
    "renders variant=%s without crashing",
    (variant) => {
      const { container } = render(<Badge variant={variant}>Badge</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    },
  );

  it("forwards className", () => {
    const { container } = render(<Badge className="extra-class">Tag</Badge>);
    expect((container.firstChild as HTMLElement)?.className).toContain(
      "extra-class",
    );
  });
});

describe("Card components", () => {
  it("Card renders children", () => {
    render(<Card>card content</Card>);
    expect(screen.getByText("card content")).toBeInTheDocument();
  });

  it("CardHeader renders children", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("CardContent renders children", () => {
    render(
      <Card>
        <CardContent>Body text</CardContent>
      </Card>,
    );
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("CardFooter renders children", () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("CardTitle renders as h3", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
        </CardHeader>
      </Card>,
    );
    const heading = screen.getByText("My Title");
    expect(heading.tagName).toBe("H3");
  });

  it("CardDescription renders as p", () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>A description</CardDescription>
        </CardHeader>
      </Card>,
    );
    const p = screen.getByText("A description");
    expect(p.tagName).toBe("P");
  });
});
