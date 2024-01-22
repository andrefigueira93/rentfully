/* eslint-disable @typescript-eslint/no-explicit-any */
import TestWrapper from "@/__tests__/wrapper";
import { PopularPropertiesAtomType } from "@/store/properties-store";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import LovedByGuestsCard from "./index";

const mockProperty = {
  id: 1,
  name: "Test Property",
  description: "Test Description",
  address: "Test Address",
  city: "Test City",
  country: "Test Country",
  price: 100,
  image: "test-image.jpg",
} as PopularPropertiesAtomType[number];

vi.mock("@/hooks/useBooking", async () => {
  const actualModule = await vi.importActual("@/hooks/useBooking");
  return {
    ...(actualModule as any),
    useBooking: () => ({
      newBooking: vi.fn(),
    }),
  };
});

describe("LovedByGuestsCard Component", () => {
  test("renders correctly with property data", () => {
    render(<LovedByGuestsCard {...mockProperty} />, { wrapper: TestWrapper });

    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockProperty.address}, ${mockProperty.city} - ${mockProperty.country}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`from $${mockProperty.price}.00 / day`)
    ).toBeInTheDocument();
    expect(screen.getByText("Book now")).toBeInTheDocument();
  });
});
