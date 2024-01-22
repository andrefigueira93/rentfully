import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Calendar } from "../calendar";

describe("Calendar Component", () => {
  test("renders with default props", () => {
    render(<Calendar data-testid="calendar" />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const customClass = "custom-calendar";
    render(<Calendar className={customClass} data-testid="calendar" />);
    expect(screen.getByTestId("calendar")).toHaveClass(customClass);
  });

  test("renders with custom classNames", () => {
    const customClassNames = {
      nav: "custom-nav",
      day: "custom-day",
    };
    render(<Calendar classNames={customClassNames} data-testid="calendar" />);
    // Check if custom classNames are applied in the rendered component
    // This might need querying specific parts of the DayPicker component
  });

  test("renders left and right navigation icons", () => {
    render(<Calendar data-testid="calendar" />);
    // Test if the left and right icons are present in the component
    // This might involve querying the icons specifically
  });
});
