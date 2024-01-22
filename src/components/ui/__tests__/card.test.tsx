import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, test } from "vitest";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

describe("Card Component", () => {
  test("renders correctly", () => {
    render(<Card data-testid="card" />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  test("applies custom class name", () => {
    const customClass = "custom-class";
    render(<Card className={customClass} data-testid="card" />);
    expect(screen.getByTestId("card")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("CardHeader Component", () => {
  test("renders correctly", () => {
    render(<CardHeader data-testid="card-header" />);
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
  });

  test("applies custom class name", () => {
    const customClass = "custom-header";
    render(<CardHeader className={customClass} data-testid="card-header" />);
    expect(screen.getByTestId("card-header")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("CardTitle Component", () => {
  test("renders correctly", () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    expect(screen.getByTestId("card-title")).toHaveTextContent("Title");
  });

  test("applies custom class name", () => {
    const customClass = "custom-title";
    render(<CardTitle className={customClass} data-testid="card-title" />);
    expect(screen.getByTestId("card-title")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardTitle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe("CardDescription Component", () => {
  test("renders correctly", () => {
    render(
      <CardDescription data-testid="card-description">
        Description
      </CardDescription>
    );
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Description"
    );
  });

  test("applies custom class name", () => {
    const customClass = "custom-description";
    render(
      <CardDescription className={customClass} data-testid="card-description" />
    );
    expect(screen.getByTestId("card-description")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe("CardContent Component", () => {
  test("renders correctly", () => {
    render(
      <CardContent data-testid="card-content">
        <div>Content</div>
      </CardContent>
    );
    expect(screen.getByTestId("card-content")).toHaveTextContent("Content");
  });

  test("applies custom class name", () => {
    const customClass = "custom-content";
    render(<CardContent className={customClass} data-testid="card-content" />);
    expect(screen.getByTestId("card-content")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardContent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("CardFooter Component", () => {
  test("renders correctly", () => {
    render(
      <CardFooter data-testid="card-footer">
        <div>Footer</div>
      </CardFooter>
    );
    expect(screen.getByTestId("card-footer")).toHaveTextContent("Footer");
  });

  test("applies custom class name", () => {
    const customClass = "custom-footer";
    render(<CardFooter className={customClass} data-testid="card-footer" />);
    expect(screen.getByTestId("card-footer")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
