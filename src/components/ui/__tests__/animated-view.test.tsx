import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AnimatedView from "../animated-view";

describe("AnimatedView Component", () => {
  test("renders children correctly", () => {
    render(
      <AnimatedView data-testid="animated-view">
        <div>Child</div>
      </AnimatedView>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  test("passes animation props correctly", () => {
    const animationProps = {
      animate: { opacity: 1 },
      initial: { opacity: 0.8 },
      exit: { opacity: 0 },
    };

    const { container } = render(
      <AnimatedView {...animationProps}>
        <div>Child</div>
      </AnimatedView>
    );

    const motionDiv = container.firstChild;
    expect(motionDiv).toHaveAttribute(
      "style",
      expect.stringContaining("opacity: 0.8")
    );
  });
});
