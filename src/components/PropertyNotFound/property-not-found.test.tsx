import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import PropertyNotFound from "./index";

describe("PropertyNotFound Component", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <PropertyNotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("Whoops!")).toBeInTheDocument();
  });
});
