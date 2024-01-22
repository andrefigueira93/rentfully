import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "../alert";

describe("Alert Component", () => {
  test("renders with default styles", () => {
    render(<Alert data-testid="alert" />);
    expect(screen.getByTestId("alert")).toHaveClass(
      "bg-background text-foreground"
    );
  });

  test.each([
    ["default", "bg-background text-foreground"],
    ["destructive", "border-destructive/50 text-destructive"],
  ])("renders %s variant correctly", (variant, expectedClass) => {
    render(
      <Alert
        variant={variant as "destructive" | "default"}
        data-testid="alert"
      />
    );
    expect(screen.getByTestId("alert")).toHaveClass(expectedClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("AlertTitle Component", () => {
  test("renders correctly", () => {
    render(<AlertTitle data-testid="alert-title">Title</AlertTitle>);
    expect(screen.getByTestId("alert-title")).toHaveTextContent("Title");
    expect(screen.getByTestId("alert-title")).toHaveClass(
      "mb-1 font-medium leading-none tracking-tight"
    );
  });

  test("applies custom class name", () => {
    const customClass = "custom-class";
    render(<AlertTitle className={customClass} data-testid="alert-title" />);
    expect(screen.getByTestId("alert-title")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<AlertTitle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe("AlertDescription Component", () => {
  test("renders correctly", () => {
    render(
      <AlertDescription data-testid="alert-description">
        Description
      </AlertDescription>
    );
    expect(screen.getByTestId("alert-description")).toHaveTextContent(
      "Description"
    );
    expect(screen.getByTestId("alert-description")).toHaveClass(
      "text-sm [&_p]:leading-relaxed"
    );
  });

  test("applies custom class name", () => {
    const customClass = "custom-class";
    render(
      <AlertDescription
        className={customClass}
        data-testid="alert-description"
      />
    );
    expect(screen.getByTestId("alert-description")).toHaveClass(customClass);
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AlertDescription ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
