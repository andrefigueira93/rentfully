/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import TestWrapper from "@/__tests__/wrapper";
import { useAtomValue } from "jotai";
import PropertiesPanel from "./index";

vi.mock("@/hooks/useScrollPosition", async () => {
  const actual = await vi.importActual("@/hooks/useScrollPosition");
  return {
    ...(actual as any),
    useScrollPosition: vi.fn(),
  };
});
vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return {
    ...(actual as any),
    useAtomValue: vi.fn(),
  };
});

describe("PropertiesPanel Component", () => {
  const mockFilteredProperties = [
    { id: 1, name: "Property 1" },
    { id: 2, name: "Property 2" },
    { id: 3, name: "Property 3" },
  ];

  beforeEach(() => {
    vi.mocked(useAtomValue).mockReturnValue(mockFilteredProperties);
    vi.mocked(useScrollPosition).mockReturnValue({
      scrollPosition: {
        x: 0,
        y: 0,
      },
    });
  });

  test("renders the correct number of PropertyCard components", () => {
    const { container } = render(<PropertiesPanel />, { wrapper: TestWrapper });

    const propertyCards = screen.getAllByTestId("property-card");
    expect(propertyCards.length).toBe(mockFilteredProperties.length);
    expect(container).toMatchSnapshot();
  });

  test("passes the correct property to each PropertyCard component", () => {
    const { container } = render(<PropertiesPanel />, { wrapper: TestWrapper });

    const propertyCards = screen.getAllByTestId("property-card");
    propertyCards.forEach((card, index) => {
      expect(card).toHaveTextContent(mockFilteredProperties[index].name);
    });
    expect(container).toMatchSnapshot();
  });
});
