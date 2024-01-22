import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Badge, BadgeProps } from "../badge";

describe("Badge Component", () => {
  test("renders with default styles", () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toHaveClass(
      "bg-primary text-primary-foreground"
    );
  });

  test.each([
    ["default", "bg-primary text-primary-foreground"],
    ["secondary", "bg-secondary text-secondary-foreground"],
    ["destructive", "bg-destructive text-destructive-foreground"],
    ["outline", "text-foreground"],
  ])("renders %s variant correctly", (variant, expectedClass) => {
    const { container } = render(
      <Badge variant={variant as BadgeProps["variant"]} />
    );
    expect(container.firstChild).toHaveClass(expectedClass);
  });

  test("applies custom class name", () => {
    const customClass = "custom-class";
    const { container } = render(<Badge className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });

  test("passes HTML attributes to the component", () => {
    const { getByTestId } = render(<Badge data-testid="badge" />);
    expect(getByTestId("badge")).toBeInTheDocument();
  });
});
